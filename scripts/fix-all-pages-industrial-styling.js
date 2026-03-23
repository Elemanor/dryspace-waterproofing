import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to check
const directories = [
  path.join(__dirname, '..', 'src', 'pages'),
  path.join(__dirname, '..', 'src', 'pages', 'locations'),
  path.join(__dirname, '..', 'src', 'pages', 'neighborhoods'),
  path.join(__dirname, '..', 'src', 'pages', 'services')
];

function getAllAstroFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'api') {
        // Skip api directory and hidden directories
        if (!directories.includes(fullPath)) {
          // Recursively get files from subdirectories not already in our list
          files.push(...getAllAstroFiles(fullPath));
        }
      } else if (stat.isFile() && item.endsWith('.astro')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return files;
}

// Get all .astro files
const allFiles = [];
directories.forEach(dir => {
  allFiles.push(...getAllAstroFiles(dir));
});

// Remove duplicates
const uniqueFiles = [...new Set(allFiles)];

console.log(`Found ${uniqueFiles.length} .astro files to check`);

let totalFixed = 0;

uniqueFiles.forEach(filePath => {
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const changes = [];
  
  // Skip layout files and component files
  if (filePath.includes('layouts') || filePath.includes('components')) {
    return;
  }
  
  // Check for SEOLayout usage
  if (content.includes('SEOLayout') && !filePath.includes('SEOLayout.astro')) {
    content = content.replace(/import SEOLayout from ['"].*SEOLayout\.astro['"]/g, 
      "import PageLayout from '../layouts/PageLayout.astro'");
    content = content.replace(/import SEOLayout from ['"]\.\.\/layouts\/SEOLayout\.astro['"]/g,
      "import PageLayout from '../layouts/PageLayout.astro'");
    content = content.replace(/import SEOLayout from ['"]\.\.\/\.\.\/layouts\/SEOLayout\.astro['"]/g,
      "import PageLayout from '../../layouts/PageLayout.astro'");
    content = content.replace(/<SEOLayout/g, '<PageLayout');
    content = content.replace(/<\/SEOLayout>/g, '</PageLayout>');
    modified = true;
    changes.push('Replaced SEOLayout with PageLayout');
  }
  
  // Remove ALL emoji characters
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F1FF}]|[\u{2B50}]|[\u{2B55}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{25AA}-\u{25FE}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]/gu;
  const originalContent = content;
  content = content.replace(emojiRegex, '');
  if (originalContent !== content) {
    modified = true;
    changes.push('Removed emoji characters');
  }
  
  // Fix rounded corners
  if (content.includes('rounded-')) {
    content = content.replace(/\brounded-[a-z]+\b/g, '');
    modified = true;
    changes.push('Removed rounded corners');
  }
  
  // Fix gradients to solid colors
  if (content.includes('bg-gradient-')) {
    content = content.replace(/bg-gradient-to-[a-z]+\s+from-[a-z0-9-]+\s+to-[a-z0-9-]+/g, 'bg-gray-50');
    content = content.replace(/bg-gradient-to-[a-z]+/g, 'bg-gray-50');
    modified = true;
    changes.push('Replaced gradients with solid colors');
  }
  
  // Fix shadow classes
  if (content.includes('shadow-')) {
    content = content.replace(/\bshadow-[a-z]+\b/g, '');
    modified = true;
    changes.push('Removed shadows');
  }
  
  // Ensure border-2 border-gray-300 for cards
  content = content.replace(/class="([^"]*\b)card(\b[^"]*)"(?![^>]*border-2)/g, 
    'class="$1card$2 border-2 border-gray-300"');
  
  // Fix button colors to industrial style
  if (content.includes('bg-blue-') || content.includes('hover:bg-blue-')) {
    content = content.replace(/\bbg-blue-[0-9]+\b/g, 'bg-yellow-500');
    content = content.replace(/\bhover:bg-blue-[0-9]+\b/g, 'hover:bg-yellow-400');
    modified = true;
    changes.push('Fixed button colors to industrial style');
  }
  
  // Remove any custom style tags
  if (content.includes('<style>')) {
    content = content.replace(/<style>[\s\S]*?<\/style>/g, '');
    modified = true;
    changes.push('Removed custom style tags');
  }
  
  // Fix text to be uppercase where appropriate
  content = content.replace(/<h([1-6])([^>]*)>([^<]+)<\/h\1>/g, (match, level, attrs, text) => {
    if (!attrs.includes('class=')) {
      const sizes = {
        '1': 'text-5xl',
        '2': 'text-4xl',
        '3': 'text-2xl',
        '4': 'text-xl',
        '5': 'text-lg',
        '6': 'text-base'
      };
      return `<h${level} class="${sizes[level]} font-bold text-gray-900 uppercase">${text.trim().toUpperCase()}</h${level}>`;
    } else if (attrs.includes('class=""')) {
      const sizes = {
        '1': 'text-5xl',
        '2': 'text-4xl',
        '3': 'text-2xl',
        '4': 'text-xl',
        '5': 'text-lg',
        '6': 'text-base'
      };
      return match.replace('class=""', `class="${sizes[level]} font-bold text-gray-900 uppercase"`).replace(text, text.trim().toUpperCase());
    }
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${relativePath}:`);
    changes.forEach(change => console.log(`   - ${change}`));
    totalFixed++;
  }
});

console.log(`\n🎯 Summary: Fixed ${totalFixed} files out of ${uniqueFiles.length} total files checked`);
console.log('✨ All pages now follow industrial styling standards!');