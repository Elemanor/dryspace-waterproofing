import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  // Check for misplaced imports (not in frontmatter)
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterCount = 0;
  
  lines.forEach((line, index) => {
    if (line === '---') {
      frontmatterCount++;
      inFrontmatter = frontmatterCount === 1;
    }
    
    // Check for import statements outside frontmatter
    if (line.includes('import ') && line.includes('from ') && !inFrontmatter && frontmatterCount >= 2) {
      issues.push(`Line ${index + 1}: Import statement outside frontmatter: ${line.trim()}`);
    }
  });
  
  // Check if SchemaMarkup is used but not imported
  if (content.includes('<SchemaMarkup')) {
    const frontmatterEnd = content.indexOf('---', 3);
    const frontmatter = content.substring(0, frontmatterEnd);
    if (!frontmatter.includes("import SchemaMarkup")) {
      issues.push('SchemaMarkup used but not imported in frontmatter');
    }
  }
  
  if (issues.length > 0) {
    console.log(`\n❌ ${fileName}:`);
    issues.forEach(issue => console.log(`   ${issue}`));
    return false;
  }
  
  return true;
}

// Check all pages
const directories = [
  path.join(__dirname, '..', 'src', 'pages', 'locations'),
  path.join(__dirname, '..', 'src', 'pages', 'services')
];

let totalFiles = 0;
let validFiles = 0;

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      totalFiles++;
      if (checkFile(filePath, `${path.basename(dir)}/${file}`)) {
        validFiles++;
      }
    });
  }
});

console.log(`\n📊 Summary: ${validFiles}/${totalFiles} files are valid`);

if (validFiles < totalFiles) {
  console.log('\n💡 Run the fix-all-schema-issues.js script to fix these issues');
}