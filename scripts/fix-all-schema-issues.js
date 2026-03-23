import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixFile(filePath, fileName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let fixed = false;
  
  // Remove all misplaced import statements (outside frontmatter)
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterCount = 0;
  const cleanedLines = [];
  const removedImports = [];
  
  lines.forEach((line, index) => {
    if (line === '---') {
      frontmatterCount++;
      inFrontmatter = frontmatterCount === 1;
    }
    
    // Remove import statements outside frontmatter
    if (line.includes('import ') && line.includes('from ') && !inFrontmatter && frontmatterCount >= 2) {
      removedImports.push(line.trim());
      fixed = true;
      return; // Skip this line
    }
    
    cleanedLines.push(line);
  });
  
  content = cleanedLines.join('\n');
  
  // Now add SchemaMarkup import to frontmatter if needed
  if (content.includes('<SchemaMarkup')) {
    const firstDash = content.indexOf('---');
    const secondDash = content.indexOf('---', firstDash + 3);
    
    if (firstDash !== -1 && secondDash !== -1) {
      const frontmatter = content.substring(firstDash + 3, secondDash);
      
      if (!frontmatter.includes("import SchemaMarkup")) {
        // Add the import before the closing ---
        const beforeSecondDash = content.substring(0, secondDash);
        const afterSecondDash = content.substring(secondDash);
        
        content = beforeSecondDash + "import SchemaMarkup from '../../components/SchemaMarkup.astro';\n" + afterSecondDash;
        fixed = true;
      }
    }
  }
  
  if (fixed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${fileName}`);
    if (removedImports.length > 0) {
      console.log(`   Removed misplaced imports: ${removedImports.length}`);
    }
    return true;
  }
  
  return false;
}

// Fix all pages
const directories = [
  path.join(__dirname, '..', 'src', 'pages', 'locations'),
  path.join(__dirname, '..', 'src', 'pages', 'services')
];

let totalFixed = 0;

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fixFile(filePath, `${path.basename(dir)}/${file}`)) {
        totalFixed++;
      }
    });
  }
});

console.log(`\n📊 Summary: Fixed ${totalFixed} files`);