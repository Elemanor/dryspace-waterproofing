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

console.log(`🎨 Fixing remaining contrast issues in ${files.length} files\n`);

let totalFixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let modified = false;
  const relativePath = path.relative(path.join(__dirname, '..'), file);
  
  // More aggressive fixes for remaining issues
  
  // Fix label elements specifically
  content = content.replace(/<label([^>]*?)class="([^"]*?)text-white([^"]*?)"([^>]*?)>/g, (match, before, classStart, classEnd, after) => {
    // Labels should generally be dark text
    modified = true;
    return `<label${before}class="${classStart}text-gray-900${classEnd}"${after}>`;
  });
  
  // Fix any remaining text-white in sections with white/light backgrounds
  const sectionPattern = /<(section|div|article|main|header)([^>]*?)bg-(white|gray-50|gray-100)([^>]*?)>([\s\S]*?)<\/\1>/g;
  content = content.replace(sectionPattern, (match, tag, before, bgColor, after, innerContent) => {
    const newInnerContent = innerContent.replace(/text-white/g, 'text-gray-900');
    if (newInnerContent !== innerContent) {
      modified = true;
      return `<${tag}${before}bg-${bgColor}${after}>${newInnerContent}</${tag}>`;
    }
    return match;
  });
  
  // Fix text colors in specific problem areas
  const specificFixes = [
    // Labels and form elements
    [/block text-white font-medium/g, 'block text-gray-900 font-medium'],
    
    // Headings on light backgrounds
    [/text-4xl font-bold text-white/g, 'text-4xl font-bold text-gray-900'],
    [/text-3xl font-bold text-white/g, 'text-3xl font-bold text-gray-900'],
    [/text-2xl font-bold text-white/g, 'text-2xl font-bold text-gray-900'],
    [/text-xl font-bold text-white/g, 'text-xl font-bold text-gray-900'],
    
    // Fix specific problematic patterns in calculators and forms
    [/bg-gray-50 text-white/g, 'bg-gray-50 text-gray-900'],
    [/bg-white text-white/g, 'bg-white text-gray-900'],
    [/bg-gray-100 text-white/g, 'bg-gray-100 text-gray-900'],
    
    // Fix buttons with poor contrast
    [/bg-gray-50 text-white font-semibold/g, 'bg-yellow-500 text-gray-900 font-semibold'],
    
    // Fix spans and divs with wrong colors
    [/text-white font-medium">$/, 'text-gray-900 font-medium">'],
    [/text-white font-bold">$/, 'text-gray-900 font-bold">'],
    
    // Fix specific table and list issues
    [/text-white">(\d+)/g, 'text-gray-900">$1'],
    
    // Fix construction-themed colors that were missed
    [/text-construction-gray-900/g, 'text-gray-900'],
    [/bg-construction-blue/g, 'bg-blue-600'],
    [/bg-construction-orange/g, 'bg-yellow-500'],
    [/bg-construction-green/g, 'bg-green-600'],
    [/bg-construction-red/g, 'bg-red-600'],
    [/text-construction-blue/g, 'text-blue-600'],
    [/text-construction-orange/g, 'text-yellow-500'],
    [/text-construction-green/g, 'text-green-600'],
    [/text-construction-red/g, 'text-red-600'],
    [/border-construction-gray-/g, 'border-gray-'],
    [/ring-construction-orange/g, 'ring-yellow-500'],
    
    // Fix divider and stat elements
    [/stat-value text-white/g, 'stat-value text-gray-900'],
    [/stat-title">([^<]+)</g, (match, text) => {
      return `stat-title text-gray-700">${text}<`;
    }],
  ];
  
  // Apply specific fixes
  specificFixes.forEach(([pattern, replacement]) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  // Final pass - ensure no white text remains on white/light backgrounds
  // This is more aggressive and looks for patterns
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // If line has bg-white, bg-gray-50, or bg-gray-100, replace any text-white with text-gray-900
    if ((line.includes('bg-white') || line.includes('bg-gray-50') || line.includes('bg-gray-100')) && line.includes('text-white')) {
      lines[i] = line.replace(/text-white/g, 'text-gray-900');
      modified = true;
    }
    
    // If line has bg-gray-900 or bg-gray-800, ensure text is white
    if ((line.includes('bg-gray-900') || line.includes('bg-gray-800')) && line.includes('text-gray-900')) {
      lines[i] = line.replace(/text-gray-900/g, 'text-white');
      modified = true;
    }
    
    // Fix colored backgrounds
    if (line.includes('bg-yellow-500') && line.includes('text-yellow-500')) {
      lines[i] = line.replace(/text-yellow-500/g, 'text-gray-900');
      modified = true;
    }
    if (line.includes('bg-green-600') && line.includes('text-green-600')) {
      lines[i] = line.replace(/text-green-600/g, 'text-white');
      modified = true;
    }
    if (line.includes('bg-red-600') && line.includes('text-red-600')) {
      lines[i] = line.replace(/text-red-600/g, 'text-white');
      modified = true;
    }
  }
  
  if (modified) {
    content = lines.join('\n');
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed contrast in ${relativePath}`);
    totalFixed++;
  }
});

console.log(`\n🎨 Remaining Contrast Issues Fixed!`);
console.log(`Fixed ${totalFixed} files`);
console.log('\nFinal contrast rules applied:');
console.log('  • All labels changed to dark text');
console.log('  • White/light backgrounds forced to dark text');
console.log('  • Dark backgrounds forced to light text');
console.log('  • Construction theme colors standardized');
console.log('  • Form elements fixed for readability');