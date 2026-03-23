import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllAstroFiles(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'api' && item !== 'layouts' && item !== 'components') {
        files.push(...getAllAstroFiles(fullPath));
      } else if (stat.isFile() && item.endsWith('.astro')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return files;
}

const srcDir = path.join(__dirname, '..', 'src');
const allFiles = getAllAstroFiles(srcDir);

console.log(`Checking ${allFiles.length} .astro files for PageLayout import issues...`);

let fixedCount = 0;

allFiles.forEach(filePath => {
  const relativePath = path.relative(srcDir, filePath);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Calculate correct relative path to layouts directory
  const fileDir = path.dirname(filePath);
  const layoutsDir = path.join(srcDir, 'layouts');
  let relativeLevels = path.relative(fileDir, layoutsDir).split(path.sep).join('/');
  
  // Fix the import path if it exists and is incorrect
  if (content.includes('import PageLayout from')) {
    const importRegex = /import PageLayout from ['"]([^'"]+)['"]/g;
    const originalContent = content;
    
    content = content.replace(importRegex, (match, currentPath) => {
      const correctPath = `${relativeLevels}/PageLayout.astro`;
      if (currentPath !== correctPath) {
        console.log(`  📍 ${relativePath}:`);
        console.log(`     ❌ Old: ${currentPath}`);
        console.log(`     ✅ New: ${correctPath}`);
        modified = true;
        return `import PageLayout from '${correctPath}'`;
      }
      return match;
    });
  }
  
  // Also fix SEOLayout imports that should be PageLayout
  if (content.includes('import SEOLayout from')) {
    const fileDir = path.dirname(filePath);
    const layoutsDir = path.join(srcDir, 'layouts');
    let relativeLevels = path.relative(fileDir, layoutsDir).split(path.sep).join('/');
    
    content = content.replace(/import SEOLayout from ['"][^'"]+['"]/g, 
      `import PageLayout from '${relativeLevels}/PageLayout.astro'`);
    content = content.replace(/<SEOLayout/g, '<PageLayout');
    content = content.replace(/<\/SEOLayout>/g, '</PageLayout>');
    
    const relPath = path.relative(srcDir, filePath);
    console.log(`  🔄 ${relPath}: Replaced SEOLayout with PageLayout`);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files with incorrect PageLayout imports`);
console.log('✨ All import paths are now correct!');