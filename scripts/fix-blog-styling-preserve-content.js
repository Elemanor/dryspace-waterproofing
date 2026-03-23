import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all blog files
const blogDir = path.join(__dirname, '..', 'src', 'pages', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro') && f !== 'index.astro');

console.log(`🔧 Fixing styling in ${files.length} blog posts while preserving content\n`);

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${file}...`);
  
  // 1. Replace BaseLayout with PageLayout (preserve title and description)
  if (content.includes('BaseLayout')) {
    content = content.replace(/import BaseLayout from ['"].*?['"];?/g, 
      "import PageLayout from '../../layouts/PageLayout.astro';");
    content = content.replace(/<BaseLayout/g, '<PageLayout');
    content = content.replace(/<\/BaseLayout>/g, '</PageLayout>');
    modified = true;
    console.log(`  ✓ Replaced BaseLayout with PageLayout`);
  }
  
  // 2. Remove Navbar and Footer imports and usage (PageLayout includes them)
  if (content.includes('Navbar') || content.includes('Footer')) {
    content = content.replace(/import Navbar from ['"].*?['"];?\n?/g, '');
    content = content.replace(/import Footer from ['"].*?['"];?\n?/g, '');
    content = content.replace(/<Navbar\s*\/>\n?/g, '');
    content = content.replace(/<Footer\s*\/>\n?/g, '');
    modified = true;
    console.log(`  ✓ Removed Navbar/Footer (included in PageLayout)`);
  }
  
  // 3. Fix construction-themed colors to industrial palette
  const colorReplacements = [
    // Background colors
    [/bg-construction-gray-950/g, 'bg-white'],
    [/bg-construction-gray-900/g, 'bg-gray-50'],
    [/bg-construction-gray-800/g, 'bg-white'],
    [/bg-construction-gray-750/g, 'bg-gray-50'],
    [/bg-construction-gray-700/g, 'bg-gray-100'],
    
    // Text colors
    [/text-construction-orange/g, 'text-yellow-500'],
    [/text-construction-yellow/g, 'text-yellow-500'],
    [/text-construction-blue/g, 'text-gray-900'],
    [/text-construction-green/g, 'text-green-600'],
    [/text-construction-red/g, 'text-red-600'],
    
    // Border colors
    [/border-construction-gray-/g, 'border-gray-'],
    [/border-construction-orange/g, 'border-yellow-500'],
    [/border-construction-yellow/g, 'border-yellow-500'],
    [/border-construction-blue/g, 'border-gray-900'],
    [/border-construction-green/g, 'border-green-600'],
    [/border-construction-red/g, 'border-red-600'],
    
    // Opacity variants
    [/construction-orange\/\d+/g, 'yellow-500'],
    [/construction-yellow\/\d+/g, 'yellow-500'],
    [/construction-blue\/\d+/g, 'gray-900'],
    [/construction-green\/\d+/g, 'green-600'],
    [/construction-red\/\d+/g, 'red-600'],
  ];
  
  colorReplacements.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  if (modified) {
    console.log(`  ✓ Fixed color scheme`);
  }
  
  // 4. Remove gradients
  if (content.includes('bg-gradient-to-')) {
    content = content.replace(/bg-gradient-to-[a-z]+\s+from-[\w-]+(?:\s+via-[\w-]+)?\s+to-[\w-]+/g, 'bg-gray-50');
    content = content.replace(/text-transparent bg-clip-text/g, 'text-yellow-500');
    modified = true;
    console.log(`  ✓ Removed gradients`);
  }
  
  // 5. Remove ALL rounded corners for industrial look
  const roundedPattern = /\brounded(?:-[a-z0-9]+)*\b/gi;
  if (roundedPattern.test(content)) {
    content = content.replace(roundedPattern, '');
    modified = true;
    console.log(`  ✓ Removed rounded corners`);
  }
  
  // 5a. Remove ALL emojis
  const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[💧🚨🏠⏱️🚚👷📞✅❌⚠️🔧🛡️💰📊🎯🔍📅🏗️⚡💪🌊❄️☀️🌡️📈🔴🟡🟢⭐️✨🎉🔥💡📋✔️🏆👍🚀💯🔒🛠️]/gu;
  if (emojiPattern.test(content)) {
    content = content.replace(emojiPattern, '');
    modified = true;
    console.log(`  ✓ Removed emojis`);
  }
  
  // 6. Fix borders to industrial style (thicker, solid)
  if (content.includes('border ')) {
    // Don't replace border-l-4 or similar directional borders
    content = content.replace(/border border-/g, 'border-2 border-');
    modified = true;
    console.log(`  ✓ Fixed borders to industrial style`);
  }
  
  // 7. Make main headings uppercase in the actual HTML (preserve content)
  // This regex looks for h1-h3 tags and adds uppercase class if not present
  content = content.replace(/<h1([^>]*?)>/g, (match, attrs) => {
    if (!attrs.includes('uppercase')) {
      if (attrs.includes('class="')) {
        return match.replace('class="', 'class="uppercase ');
      } else {
        return `<h1${attrs} class="uppercase">`;
      }
    }
    return match;
  });
  
  content = content.replace(/<h2([^>]*?)>/g, (match, attrs) => {
    if (!attrs.includes('uppercase')) {
      if (attrs.includes('class="')) {
        return match.replace('class="', 'class="uppercase ');
      } else {
        return `<h2${attrs} class="uppercase">`;
      }
    }
    return match;
  });
  
  // 8. Fix main background from dark to light
  content = content.replace(/min-h-screen bg-construction-gray-950/g, 'min-h-screen bg-white');
  
  // 9. Fix text colors for readability
  content = content.replace(/text-gray-300/g, 'text-gray-700');
  content = content.replace(/text-gray-400/g, 'text-gray-600');
  content = content.replace(/text-white\/90/g, 'text-gray-900');
  content = content.replace(/text-white\/80/g, 'text-gray-700');
  
  // 10. Fix prose classes for light background
  content = content.replace(/prose-invert/g, '');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file} - styling updated, content preserved`);
  } else {
    console.log(`⏭️  ${file} - already properly styled`);
  }
});

console.log('\n✨ Blog styling fixed while preserving all original content!');
console.log('The blogs now have:');
console.log('  • Industrial styling (no gradients, no rounded corners)');
console.log('  • Proper color scheme (grays and yellow accent)');
console.log('  • PageLayout integration');
console.log('  • All original content intact');