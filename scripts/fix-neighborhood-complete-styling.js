import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all neighborhood files
const neighborhoodsDir = path.join(__dirname, '..', 'src', 'pages', 'neighborhoods');
const files = fs.readdirSync(neighborhoodsDir).filter(f => f.endsWith('.astro'));

console.log(`Found ${files.length} neighborhood files to fix styling`);

files.forEach(file => {
  const filePath = path.join(neighborhoodsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${file}...`);
  
  // Remove all remaining emojis
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F1FF}]|[\u{2B50}]|[\u{2B55}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{25AA}-\u{25FE}]/gu;
  if (emojiRegex.test(content)) {
    content = content.replace(emojiRegex, '');
    modified = true;
    console.log(`  - Removed emoji icons`);
  }
  
  // Fix custom section classes
  content = content.replace(/class="local-challenges"/g, 'class="py-16 bg-gray-50"');
  content = content.replace(/class="challenges-grid"/g, 'class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"');
  content = content.replace(/class="local-weather"/g, 'class="py-16 bg-white"');
  content = content.replace(/class="weather-info"/g, 'class="grid md:grid-cols-3 gap-6"');
  content = content.replace(/class="weather-card"/g, 'class="bg-white border-2 border-gray-300 p-6"');
  content = content.replace(/class="flood-history"/g, 'class="mt-8 bg-gray-900 border-2 border-gray-300 p-6"');
  content = content.replace(/class="recent-projects"/g, 'class="py-16 bg-gray-50"');
  content = content.replace(/class="projects-grid"/g, 'class="grid md:grid-cols-3 gap-8"');
  content = content.replace(/class="project-card"/g, 'class="bg-white border-2 border-gray-300 p-6"');
  content = content.replace(/class="project-details"/g, 'class=""');
  content = content.replace(/class="project-type"/g, 'class="text-sm font-semibold text-gray-700 uppercase mb-2"');
  content = content.replace(/class="project-cost"/g, 'class="mt-4 pt-4 border-t border-gray-200 font-bold text-gray-900"');
  content = content.replace(/class="local-testimonials"/g, 'class="py-16 bg-white"');
  content = content.replace(/class="testimonials-grid"/g, 'class="grid md:grid-cols-3 gap-8"');
  content = content.replace(/class="testimonial"/g, 'class="bg-gray-50 border-2 border-gray-300 p-6"');
  content = content.replace(/class="testimonial-author"/g, 'class="mt-4 pt-4 border-t border-gray-200"');
  content = content.replace(/class="local-landmarks"/g, 'class="py-16 bg-gray-50"');
  content = content.replace(/class="landmarks-list"/g, 'class="grid md:grid-cols-2 gap-8"');
  content = content.replace(/class="landmark"/g, 'class="bg-white border-2 border-gray-300 p-6"');
  content = content.replace(/class="lake-level-alert"/g, 'class="py-16 bg-gray-900"');
  content = content.replace(/class="alert-content"/g, 'class="bg-white border-2 border-yellow-500 p-8 max-w-4xl mx-auto"');
  content = content.replace(/class="level-status"/g, 'class="flex gap-4 items-center mb-4"');
  content = content.replace(/class="current-level"/g, 'class="text-sm font-bold text-gray-900 uppercase"');
  content = content.replace(/class="flood-stage"/g, 'class="text-sm font-bold text-gray-900 uppercase"');
  content = content.replace(/class="status-indicator medium"/g, 'class="px-3 py-1 bg-yellow-500 text-black font-bold uppercase text-xs"');
  content = content.replace(/class="status-indicator high"/g, 'class="px-3 py-1 bg-red-600 text-white font-bold uppercase text-xs"');
  content = content.replace(/class="btn-alert"/g, 'class="inline-block mt-4 bg-yellow-500 text-black px-6 py-3 font-bold uppercase hover:bg-yellow-400 transition-colors"');
  content = content.replace(/class="service-area-map"/g, 'class="py-16 bg-white"');
  content = content.replace(/class="boundaries"/g, 'class="bg-gray-50 border-2 border-gray-300 p-8"');
  content = content.replace(/class="streets-served"/g, 'class="mt-8"');
  content = content.replace(/class="streets-grid"/g, 'class="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4"');
  
  // Fix risk level classes
  content = content.replace(/class="risk-level high"/g, 'class="inline-block px-3 py-1 bg-red-600 text-white font-bold uppercase text-xs mb-2"');
  content = content.replace(/class="risk-level medium"/g, 'class="inline-block px-3 py-1 bg-yellow-500 text-black font-bold uppercase text-xs mb-2"');
  content = content.replace(/class="risk-level low"/g, 'class="inline-block px-3 py-1 bg-green-600 text-white font-bold uppercase text-xs mb-2"');
  
  // Fix stars display
  content = content.replace(/class="stars">⭐⭐⭐⭐⭐/g, 'class="text-yellow-500 text-xl mb-2">★★★★★');
  
  // Fix solution divs
  content = content.replace(/class="solution"/g, 'class="mt-4 pt-4 border-t border-gray-200"');
  
  // Remove all style tags
  content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
  
  // Fix container classes
  content = content.replace(/class="container">/g, 'class="container mx-auto px-4">');
  
  // Fix list styling
  content = content.replace(/<ul>([^]*?)<\/ul>/g, (match, listContent) => {
    // Only style lists that don't already have classes
    if (!match.includes('class=')) {
      const styledList = listContent.replace(/<li>/g, '<li class="text-gray-700 mb-2">');
      return `<ul class="space-y-2">${styledList}</ul>`;
    }
    return match;
  });
  
  // Fix strong tags in lists
  content = content.replace(/<li([^>]*)><strong>([^:]+):<\/strong>/g, 
    '<li$1 class="text-gray-700"><span class="font-bold text-gray-900">$2:</span>');
  
  // Fix span tags for street names to use proper styling
  content = content.replace(/<span>([^<]+)<\/span>/g, (match, street) => {
    // Only for street grids
    if (content.indexOf(match) > content.indexOf('streets-grid') - 500 && 
        content.indexOf(match) < content.indexOf('streets-grid') + 500) {
      return `<span class="border-2 border-gray-300 px-3 py-2 text-sm uppercase text-center">${street}</span>`;
    }
    return match;
  });
  
  // Fix project image divs
  content = content.replace(/<div class="project-image[^"]*">[^<]*<\/div>/g, '');
  
  // Add consistent heading styles
  content = content.replace(/<h2([^>]*)>([^<]+)<\/h2>/g, (match, attrs, text) => {
    if (!attrs.includes('class=') || attrs.includes('class=""')) {
      return `<h2 class="text-4xl font-bold text-gray-900 mb-8 text-center uppercase">${text.trim().toUpperCase()}</h2>`;
    }
    return match;
  });
  
  content = content.replace(/<h3([^>]*)>([^<]+)<\/h3>/g, (match, attrs, text) => {
    if (!attrs.includes('class=') || attrs.includes('class=""')) {
      return `<h3 class="text-xl font-bold text-gray-900 mb-3 uppercase">${text.trim().toUpperCase()}</h3>`;
    }
    return match;
  });
  
  content = content.replace(/<h4([^>]*)>([^<]+)<\/h4>/g, (match, attrs, text) => {
    if (!attrs.includes('class=') || attrs.includes('class=""')) {
      return `<h4 class="text-lg font-bold text-gray-900 mb-2 uppercase">${text.trim().toUpperCase()}</h4>`;
    }
    return match;
  });
  
  // Fix paragraph styles
  content = content.replace(/<p>([^<]+)<\/p>/g, (match, text) => {
    // Don't style if it's already styled or has a class
    if (!match.includes('class=')) {
      return `<p class="text-gray-700">${text}</p>`;
    }
    return match;
  });
  
  // Ensure divs in the main content have proper container classes
  content = content.replace(/<div class="container mx-auto px-4">\s*<div class="container mx-auto px-4">/g, 
    '<div class="container mx-auto px-4">');
  
  if (modified || content.includes('local-challenges') || content.includes('⭐') || 
      content.includes('<style>') || content.includes('project-image')) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed styling in ${file}`);
  } else {
    console.log(`⏭️  ${file} already properly styled`);
  }
});

console.log('\n✨ All neighborhood pages have been fixed with industrial styling!');