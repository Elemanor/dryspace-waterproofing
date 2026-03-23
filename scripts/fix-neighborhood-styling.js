import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all neighborhood files
const neighborhoodsDir = path.join(__dirname, '..', 'src', 'pages', 'neighborhoods');
const files = fs.readdirSync(neighborhoodsDir).filter(f => f.endsWith('.astro'));

console.log(`Found ${files.length} neighborhood files to check`);

// Files to skip (already properly styled)
const skipFiles = [
  'cabbagetown.astro',
  'distillery-district.astro',
  'regent-park.astro',
  'leslieville.astro',
  'east-york.astro',
  'danforth.astro',
  'riverdale.astro',
  'willowdale.astro',
  'high-park.astro',
  'parkdale.astro',
  'the-junction.astro',
  'roncesvalles.astro'
];

files.forEach(file => {
  if (skipFiles.includes(file)) {
    console.log(`⏭️  ${file} already properly styled`);
    return;
  }

  const filePath = path.join(neighborhoodsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${file}...`);
  
  // Replace SEOLayout with PageLayout
  if (content.includes('SEOLayout')) {
    content = content.replace(/import SEOLayout from ['"]\.\.\/\.\.\/layouts\/SEOLayout\.astro['"];?/g, 
      "import PageLayout from '../../layouts/PageLayout.astro';");
    content = content.replace(/<SEOLayout/g, '<PageLayout');
    content = content.replace(/<\/SEOLayout>/g, '</PageLayout>');
    modified = true;
    console.log(`  - Replaced SEOLayout with PageLayout`);
  }
  
  // Add missing imports if needed
  if (!content.includes("import Hero from") && content.includes('<Hero')) {
    const importLine = "import Hero from '../../components/sections/Hero.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
    console.log(`  - Added Hero import`);
  }
  
  if (!content.includes("import Stats from") && !content.includes('<Stats')) {
    const importLine = "import Stats from '../../components/sections/Stats.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
    console.log(`  - Added Stats import`);
  }
  
  if (!content.includes("import Services from") && !content.includes('<Services')) {
    const importLine = "import Services from '../../components/sections/Services.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
    console.log(`  - Added Services import`);
  }
  
  if (!content.includes("import Process from") && !content.includes('<Process')) {
    const importLine = "import Process from '../../components/sections/Process.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
    console.log(`  - Added Process import`);
  }
  
  if (!content.includes("import Testimonials from") && !content.includes('<Testimonials')) {
    const importLine = "import Testimonials from '../../components/sections/Testimonials.astro';\n";
    content = content.replace(/---\n/, `---\n${importLine}`);
    modified = true;
    console.log(`  - Added Testimonials import`);
  }
  
  // Remove all emoji icons
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  if (emojiRegex.test(content)) {
    content = content.replace(emojiRegex, '');
    modified = true;
    console.log(`  - Removed emoji icons`);
  }
  
  // Remove custom CSS classes and replace with industrial style
  content = content.replace(/class="neighborhood-hero[^"]*"/g, 'class="py-16 bg-gray-900"');
  content = content.replace(/class="hero-content"/g, 'class="container mx-auto px-4 text-center"');
  content = content.replace(/class="hero-subtitle"/g, 'class="text-xl text-gray-300 mb-8"');
  content = content.replace(/class="local-stats"/g, 'class="grid grid-cols-3 gap-4 mb-8"');
  content = content.replace(/class="stat"/g, 'class="bg-white border-2 border-gray-300 p-4"');
  content = content.replace(/class="stat-value"/g, 'class="text-2xl font-bold text-gray-900"');
  content = content.replace(/class="stat-label"/g, 'class="text-sm text-gray-700 uppercase"');
  content = content.replace(/class="hero-cta"/g, 'class="flex gap-4 justify-center"');
  content = content.replace(/class="btn-primary"/g, 'class="bg-yellow-500 text-black px-8 py-4 text-lg font-bold hover:bg-yellow-400 transition-colors uppercase"');
  content = content.replace(/class="btn-secondary"/g, 'class="border-2 border-white text-white px-8 py-4 text-lg font-bold hover:bg-white hover:text-black transition-colors uppercase"');
  
  // Replace challenge cards with industrial style
  content = content.replace(/class="challenge-card"/g, 'class="bg-white border-2 border-gray-300 p-6"');
  content = content.replace(/class="challenge-icon">[^<]*/g, 'class="hidden"');
  content = content.replace(/<div class="hidden"><\/div>\s*/g, '');
  
  // Fix gradient backgrounds
  content = content.replace(/bg-gradient-to-[a-z]+\s+from-[a-z-0-9]+\s+to-[a-z-0-9]+/g, 'bg-gray-50');
  
  // Convert text to uppercase in headings
  content = content.replace(/<h1([^>]*)>([^<]+)<\/h1>/g, (match, attrs, text) => {
    return `<h1${attrs} class="text-5xl font-bold text-white mb-6 uppercase">${text.trim().toUpperCase()}</h1>`;
  });
  
  content = content.replace(/<h2([^>]*)>([^<]+)<\/h2>/g, (match, attrs, text) => {
    if (!attrs.includes('class=')) {
      return `<h2 class="text-4xl font-bold text-gray-900 mb-4 uppercase">${text.trim().toUpperCase()}</h2>`;
    }
    return match;
  });
  
  content = content.replace(/<h3([^>]*)>([^<]+)<\/h3>/g, (match, attrs, text) => {
    if (!attrs.includes('class=')) {
      return `<h3 class="text-xl font-bold text-gray-900 mb-3 uppercase">${text.trim().toUpperCase()}</h3>`;
    }
    return match;
  });
  
  // Remove rounded corners
  content = content.replace(/rounded-[a-z]+/g, '');
  
  // Remove shadows
  content = content.replace(/shadow-[a-z]+/g, '');
  
  // Fix button styles
  content = content.replace(/bg-blue-[0-9]+/g, 'bg-yellow-500');
  content = content.replace(/hover:bg-blue-[0-9]+/g, 'hover:bg-yellow-400');
  content = content.replace(/text-blue-[0-9]+/g, 'text-gray-900');
  
  if (modified) {
    // Add Stats component after Hero if not present
    if (!content.includes('<Stats')) {
      content = content.replace(/(<\/Hero>|<\/section>\s*<!--[^>]*Hero[^>]*-->)/, '$1\n\n  <!-- Stats -->\n  <Stats />');
      console.log(`  - Added Stats component`);
    }
    
    // Add Services component if not present
    if (!content.includes('<Services')) {
      const servicesSection = '\n  <!-- Services -->\n  <Services />\n';
      // Add after local information section
      content = content.replace(/(<\/section>\s*<!--[^>]*Local Information[^>]*-->|<\/section>\s*<!--[^>]*Quick Facts[^>]*-->)/, '$1\n' + servicesSection);
      console.log(`  - Added Services component`);
    }
    
    // Add Process component if not present
    if (!content.includes('<Process')) {
      const processSection = '\n  <!-- Process -->\n  <Process />\n';
      // Add before testimonials
      if (content.includes('<Testimonials')) {
        content = content.replace(/(\s*<!-- Testimonials -->|\s*<Testimonials)/, processSection + '$1');
      } else {
        // Add before FAQ section
        content = content.replace(/(\s*<!-- FAQ Section -->|\s*<section[^>]*faq)/, processSection + '$1');
      }
      console.log(`  - Added Process component`);
    }
    
    // Add Testimonials component if not present
    if (!content.includes('<Testimonials')) {
      const testimonialsSection = '\n  <!-- Testimonials -->\n  <Testimonials />\n';
      // Add before FAQ section
      content = content.replace(/(\s*<!-- FAQ Section -->|\s*<section[^>]*faq)/, testimonialsSection + '$1');
      console.log(`  - Added Testimonials component`);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⏭️  ${file} no changes needed`);
  }
});

console.log('\n✨ All neighborhood pages have been checked and fixed!');