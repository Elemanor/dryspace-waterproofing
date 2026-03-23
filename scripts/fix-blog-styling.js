import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all blog files
const blogDir = path.join(__dirname, '..', 'src', 'pages', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro') && f !== 'index.astro');

console.log(`Found ${files.length} blog posts to fix styling`);

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${file}...`);
  
  // Replace BaseLayout with PageLayout
  if (content.includes('BaseLayout')) {
    content = content.replace(/import BaseLayout from ['"].*BaseLayout\.astro['"]/g, 
      "import PageLayout from '../../layouts/PageLayout.astro'");
    content = content.replace(/<BaseLayout/g, '<PageLayout');
    content = content.replace(/<\/BaseLayout>/g, '</PageLayout>');
    modified = true;
    console.log(`  - Replaced BaseLayout with PageLayout`);
  }
  
  // Remove Navbar and Footer imports since PageLayout includes them
  content = content.replace(/import Navbar from ['"].*Navbar\.astro['"];?\n?/g, '');
  content = content.replace(/import Footer from ['"].*Footer\.astro['"];?\n?/g, '');
  content = content.replace(/<Navbar\s*\/>\n?/g, '');
  content = content.replace(/<Footer\s*\/>\n?/g, '');
  
  // Add standard components
  if (!content.includes("import Hero from")) {
    const importLine = "import Hero from '../../components/sections/Hero.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
  }
  
  if (!content.includes("import Stats from")) {
    const importLine = "import Stats from '../../components/sections/Stats.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
  }
  
  // Remove construction-themed colors
  content = content.replace(/construction-gray-\d+/g, 'gray-900');
  content = content.replace(/construction-blue/g, 'yellow-500');
  content = content.replace(/construction-orange/g, 'yellow-500');
  content = content.replace(/construction-green/g, 'green-600');
  content = content.replace(/construction-red/g, 'red-600');
  content = content.replace(/construction-yellow/g, 'yellow-500');
  
  // Remove gradients
  content = content.replace(/bg-gradient-to-[a-z]+\s+from-[a-z0-9-]+\s+(via-[a-z0-9-]+\s+)?to-[a-z0-9-]+/g, 'bg-gray-50');
  content = content.replace(/bg-gradient-to-[a-z]+/g, 'bg-gray-50');
  content = content.replace(/text-transparent bg-clip-text/g, 'text-yellow-500');
  
  // Remove rounded corners
  content = content.replace(/\brounded-[a-z]+\b/g, '');
  
  // Fix borders to industrial style
  content = content.replace(/border border-[a-z0-9-]+\/30/g, 'border-2 border-gray-300');
  content = content.replace(/border border-[a-z0-9-]+\/20/g, 'border-2 border-gray-300');
  
  // Fix backgrounds
  content = content.replace(/bg-[a-z0-9-]+\/10/g, 'bg-gray-50');
  content = content.replace(/bg-[a-z0-9-]+\/20/g, 'bg-gray-100');
  
  // Convert text to uppercase in headings
  content = content.replace(/<h1([^>]*)>([^<]+)<\/h1>/g, (match, attrs, text) => {
    if (!attrs.includes('class=')) {
      return `<h1 class="text-5xl font-bold text-gray-900 mb-6 uppercase">${text.trim().toUpperCase()}</h1>`;
    } else {
      // Update existing classes
      return match.replace(/text-white/g, 'text-gray-900')
                  .replace(/text-4xl md:text-6xl/g, 'text-5xl')
                  .replace(text, text.trim().toUpperCase());
    }
  });
  
  content = content.replace(/<h2([^>]*)>([^<]+)<\/h2>/g, (match, attrs, text) => {
    if (!attrs.includes('class=')) {
      return `<h2 class="text-4xl font-bold text-gray-900 mb-8 uppercase">${text.trim().toUpperCase()}</h2>`;
    } else {
      return match.replace(/text-white/g, 'text-gray-900')
                  .replace(/text-3xl md:text-4xl/g, 'text-4xl')
                  .replace(text, text.trim().toUpperCase());
    }
  });
  
  content = content.replace(/<h3([^>]*)>([^<]+)<\/h3>/g, (match, attrs, text) => {
    if (!attrs.includes('class=')) {
      return `<h3 class="text-2xl font-bold text-gray-900 mb-4 uppercase">${text.trim().toUpperCase()}</h3>`;
    } else {
      return match.replace(/text-white/g, 'text-gray-900')
                  .replace(text, text.trim().toUpperCase());
    }
  });
  
  // Fix text colors
  content = content.replace(/text-gray-300/g, 'text-gray-700');
  content = content.replace(/text-gray-400/g, 'text-gray-600');
  
  // Remove shadows
  content = content.replace(/\bshadow-[a-z]+\b/g, '');
  
  // Fix background colors for sections
  content = content.replace(/bg-gray-950/g, 'bg-white');
  content = content.replace(/bg-gray-900/g, 'bg-gray-50');
  content = content.replace(/bg-gray-800/g, 'bg-white');
  
  // Add Hero and Stats components after the opening PageLayout tag
  if (modified && !content.includes('<Hero')) {
    content = content.replace(/<PageLayout([^>]*)>\n/, '<PageLayout$1>\n  <Hero />\n  <Stats />\n\n');
  }
  
  // Wrap main content in proper container
  content = content.replace(/<main[^>]*>/g, '');
  content = content.replace(/<\/main>/g, '');
  
  // Ensure sections have proper industrial styling
  content = content.replace(/class="py-16/g, 'class="py-16');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⏭️  ${file} already properly styled`);
  }
});

console.log('\n✨ All blog posts have been fixed with industrial styling!');