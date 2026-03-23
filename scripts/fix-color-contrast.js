import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all .astro files
function getAllAstroFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      getAllAstroFiles(fullPath, files);
    } else if (item.isFile() && item.name.endsWith('.astro')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const srcDir = path.join(__dirname, '..', 'src');
const files = getAllAstroFiles(srcDir);

console.log(`🎨 Fixing color contrast issues in ${files.length} files\n`);

let totalFixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;
  const relativePath = path.relative(path.join(__dirname, '..'), file);
  
  // Fix common contrast issues
  const fixes = [
    // White text on white/light backgrounds - change to dark text
    [/text-white(?=.*?bg-white)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-gray-50)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-gray-100)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-yellow-50)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-green-50)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-blue-50)/g, 'text-gray-900'],
    [/text-white(?=.*?bg-red-50)/g, 'text-gray-900'],
    
    // Fix specific patterns where white is on light background
    [/bg-white.*?text-white/g, (match) => match.replace(/text-white/g, 'text-gray-900')],
    [/bg-gray-50.*?text-white/g, (match) => match.replace(/text-white/g, 'text-gray-900')],
    [/bg-gray-100.*?text-white/g, (match) => match.replace(/text-white/g, 'text-gray-900')],
    
    // Yellow text on yellow background - change to dark text
    [/text-yellow-500(?=.*?bg-yellow-500)/g, 'text-gray-900'],
    [/bg-yellow-500.*?text-yellow-500/g, (match) => match.replace(/text-yellow-500/g, 'text-gray-900')],
    
    // Green text on green background
    [/text-green-600(?=.*?bg-green-600)/g, 'text-white'],
    [/bg-green-600.*?text-green-600/g, (match) => match.replace(/text-green-600/g, 'text-white')],
    
    // Red text on red background
    [/text-red-600(?=.*?bg-red-600)/g, 'text-white'],
    [/bg-red-600.*?text-red-600/g, (match) => match.replace(/text-red-600/g, 'text-white')],
    
    // Gray text on gray background
    [/text-gray-900(?=.*?bg-gray-900)/g, 'text-white'],
    [/bg-gray-900.*?text-gray-900/g, (match) => match.replace(/text-gray-900/g, 'text-white')],
    
    // Fix headers that have wrong colors
    [/<h1.*?text-white.*?>/g, (match) => {
      // If it's in a section with light background, make text dark
      if (match.includes('bg-white') || match.includes('bg-gray-50')) {
        return match.replace('text-white', 'text-gray-900');
      }
      return match;
    }],
    [/<h2.*?text-white.*?>/g, (match) => {
      if (match.includes('bg-white') || match.includes('bg-gray-50')) {
        return match.replace('text-white', 'text-gray-900');
      }
      return match;
    }],
    [/<h3.*?text-white.*?>/g, (match) => {
      if (match.includes('bg-white') || match.includes('bg-gray-50')) {
        return match.replace('text-white', 'text-gray-900');
      }
      return match;
    }],
    
    // Fix specific problematic patterns
    [/class="[^"]*bg-white[^"]*text-white[^"]*"/g, (match) => {
      return match.replace(/text-white/g, 'text-gray-900');
    }],
    [/class="[^"]*text-white[^"]*bg-white[^"]*"/g, (match) => {
      return match.replace(/text-white/g, 'text-gray-900');
    }],
    
    // Fix badges and labels with poor contrast
    [/bg-green-600 text-green-600/g, 'bg-green-600 text-white'],
    [/bg-yellow-500 text-yellow-500/g, 'bg-yellow-500 text-gray-900'],
    [/bg-red-600 text-red-600/g, 'bg-red-600 text-white'],
    [/bg-gray-900 text-gray-900/g, 'bg-gray-900 text-white'],
    
    // Fix inverse patterns (colored background with same color text)
    [/bg-(\w+)-(\d+)\s+text-\1-\2/g, (match, color, shade) => {
      const shadeNum = parseInt(shade);
      if (shadeNum >= 500) {
        return `bg-${color}-${shade} text-white`;
      } else {
        return `bg-${color}-${shade} text-gray-900`;
      }
    }],
  ];
  
  // Apply fixes
  fixes.forEach(([pattern, replacement]) => {
    if (typeof pattern === 'string') {
      if (content.includes(pattern)) {
        content = content.replace(new RegExp(pattern, 'g'), replacement);
        modified = true;
      }
    } else {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }
  });
  
  // Fix sections where background and text are explicitly set to conflicting colors
  // Look for sections/divs with backgrounds
  content = content.replace(/<(section|div|article|main)([^>]*?)class="([^"]*?)"([^>]*?)>/g, (match, tag, before, classes, after) => {
    let newClasses = classes;
    
    // If has white/light background, ensure dark text
    if (classes.includes('bg-white') || classes.includes('bg-gray-50') || classes.includes('bg-gray-100')) {
      newClasses = newClasses.replace(/text-white/g, 'text-gray-900');
    }
    
    // If has dark background, ensure light text
    if (classes.includes('bg-gray-900') || classes.includes('bg-gray-800')) {
      newClasses = newClasses.replace(/text-gray-900/g, 'text-white');
      newClasses = newClasses.replace(/text-gray-800/g, 'text-white');
    }
    
    // If has colored background, ensure contrasting text
    if (classes.includes('bg-yellow-500')) {
      newClasses = newClasses.replace(/text-yellow-500/g, 'text-gray-900');
    }
    if (classes.includes('bg-green-600')) {
      newClasses = newClasses.replace(/text-green-600/g, 'text-white');
    }
    if (classes.includes('bg-red-600')) {
      newClasses = newClasses.replace(/text-red-600/g, 'text-white');
    }
    
    if (newClasses !== classes) {
      modified = true;
      return `<${tag}${before}class="${newClasses}"${after}>`;
    }
    
    return match;
  });
  
  // Fix heading elements specifically
  content = content.replace(/<(h[1-6])([^>]*?)class="([^"]*?)"([^>]*?)>/g, (match, tag, before, classes, after) => {
    let newClasses = classes;
    
    // Check parent context - if we can determine background color
    const beforeMatch = content.substring(Math.max(0, content.indexOf(match) - 500), content.indexOf(match));
    
    if (beforeMatch.includes('bg-white') || beforeMatch.includes('bg-gray-50')) {
      newClasses = newClasses.replace(/text-white/g, 'text-gray-900');
    }
    
    if (newClasses !== classes) {
      modified = true;
      return `<${tag}${before}class="${newClasses}"${after}>`;
    }
    
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed contrast in ${relativePath}`);
    totalFixed++;
  }
});

console.log(`\n🎨 Color Contrast Fix Complete!`);
console.log(`Fixed ${totalFixed} files with contrast issues`);
console.log('\nContrast rules applied:');
console.log('  • White/light backgrounds → dark text (gray-900)');
console.log('  • Dark backgrounds → light text (white)');
console.log('  • Colored backgrounds → contrasting text');
console.log('  • Same color text/background → fixed to contrast');