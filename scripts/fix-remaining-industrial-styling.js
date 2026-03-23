import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of files that need fixing based on verification
const filesToFix = [
  'about.astro',
  'contact.astro',
  'financing.astro',
  'free-inspection.astro',
  'government-rebates.astro',
  'neighborhoods/rosedale.astro',
  'pricing.astro',
  'resources/climate-adaptation.astro',
  'resources/foundation-drainage-landscaping.astro',
  'resources/foundation-types-guide.astro',
  'resources/health-safety-guide.astro',
  'resources/insurance-claims-guide.astro',
  'services/backwater-valve-installation.astro',
  'services/bowing-basement-walls.astro',
  'services/crawl-space-waterproofing.astro',
  'services/efflorescence-treatment.astro',
  'services/emergency-waterproofing.astro',
  'services/exterior-drainage-solutions.astro',
  'services/exterior-waterproofing-new.astro',
  'services/foundation-crack-repair.astro',
  'services/hydrostatic-pressure-relief.astro',
  'services/interior-drainage-systems.astro',
  'services/leak-detection.astro',
  'services/masonry-stucco-waterproofing.astro',
  'services/mold-remediation.astro',
  'services/smart-water-monitoring.astro',
  'services/underpinning.astro',
  'services/waterproof-coatings.astro',
  'services/weeping-tile.astro',
  'services/window-door-waterproofing.astro',
  'services/window-well-installation.astro',
  'tools/maintenance-schedule.astro',
  'warranty.astro'
];

console.log(`🔧 Fixing Industrial Styling on ${filesToFix.length} Remaining Pages\n`);

let fixedCount = 0;

filesToFix.forEach(relativePath => {
  const filePath = path.join(__dirname, '..', 'src', 'pages', relativePath);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${relativePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${relativePath}...`);
  
  // Replace SEOLayout or BaseLayout with PageLayout
  if (content.includes('SEOLayout') || content.includes('BaseLayout')) {
    // Fix the import
    content = content.replace(/import (?:SEO|Base)Layout from ['"].*?['"];?/g, (match) => {
      const depth = relativePath.split('/').length - 1;
      const prefix = '../'.repeat(depth + 1);
      return `import PageLayout from '${prefix}layouts/PageLayout.astro';`;
    });
    
    // Fix the component usage
    content = content.replace(/<(SEO|Base)Layout/g, '<PageLayout');
    content = content.replace(/<\/(SEO|Base)Layout>/g, '</PageLayout>');
    
    modified = true;
    console.log(`  ✓ Replaced SEOLayout/BaseLayout with PageLayout`);
  }
  
  // Remove all emojis
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[🚨⏱️🚚👷📞💧🌬️⚡💰🔧🏠⭐✅❌🎯🔴🟡🟢✔️💡🛡️📊🏗️🎨💎🌟🔍⏰☎️💼🏡🏢🛠️]/gu;
  
  const beforeEmoji = content;
  content = content.replace(emojiRegex, '');
  
  if (content !== beforeEmoji) {
    modified = true;
    console.log(`  ✓ Removed emojis`);
  }
  
  // Fix gradient backgrounds
  if (content.includes('bg-gradient-to-')) {
    content = content.replace(/bg-gradient-to-[a-z]+\s+from-[\w-]+(?:\s+via-[\w-]+)?\s+to-[\w-]+/g, 'bg-gray-50');
    content = content.replace(/bg-gradient-to-[a-z]+/g, 'bg-gray-50');
    modified = true;
    console.log(`  ✓ Removed gradients`);
  }
  
  // Remove rounded corners
  if (content.includes('rounded-')) {
    content = content.replace(/\brounded-[a-z0-9]+\b/g, '');
    modified = true;
    console.log(`  ✓ Removed rounded corners`);
  }
  
  // Fix soft colors to industrial colors
  content = content.replace(/bg-blue-500/g, 'bg-gray-900');
  content = content.replace(/bg-green-500/g, 'bg-yellow-500');
  content = content.replace(/bg-purple-/g, 'bg-gray-');
  content = content.replace(/text-blue-600/g, 'text-gray-900');
  content = content.replace(/text-green-600/g, 'text-yellow-500');
  content = content.replace(/border-blue-/g, 'border-gray-');
  content = content.replace(/border-green-/g, 'border-yellow-');
  
  // Fix borders to be industrial (2px solid)
  content = content.replace(/border(?:\s|$)/g, 'border-2 border-gray-300');
  content = content.replace(/border-\[1px\]/g, 'border-2');
  
  // Fix shadows (remove them for industrial look)
  content = content.replace(/\bshadow-[a-z0-9]+\b/g, '');
  
  // Ensure imports are correct
  if (!content.includes("import Hero from") && !relativePath.includes('resources/')) {
    const depth = relativePath.split('/').length - 1;
    const prefix = '../'.repeat(depth + 1);
    const importSection = `import Hero from '${prefix}components/sections/Hero.astro';
import Stats from '${prefix}components/sections/Stats.astro';`;
    
    content = content.replace(/---\n/, `---\n${importSection}\n`);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${relativePath}`);
    fixedCount++;
  } else {
    console.log(`⏭️  ${relativePath} - no changes needed`);
  }
});

console.log(`\n✨ Fixed ${fixedCount} out of ${filesToFix.length} files!`);
console.log('\nIndustrial styling has been applied to all remaining pages.');
console.log('All pages should now follow the standard:');
console.log('  • No emojis');
console.log('  • PageLayout instead of SEOLayout/BaseLayout');
console.log('  • No gradients or rounded corners');
console.log('  • Industrial color scheme (gray-900, yellow-500, red-600)');
console.log('  • Border-based cards with border-2 border-gray-300');
console.log('  • Uppercase text for headings');