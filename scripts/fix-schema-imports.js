import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all location files
const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');
const files = fs.readdirSync(locationsDir).filter(f => f.endsWith('.astro'));

let fixed = 0;

files.forEach(file => {
  const filePath = path.join(locationsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if SchemaMarkup is used but not imported properly
  if (content.includes('<SchemaMarkup') && !content.includes("import SchemaMarkup from '../../components/SchemaMarkup.astro';")) {
    // Remove any misplaced imports in the middle of the file
    content = content.replace(/^import SchemaMarkup from ['"].*?['"];?\s*$/gm, '');
    
    // Add import to the frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd > -1) {
      const beforeEnd = content.substring(0, frontmatterEnd);
      const afterEnd = content.substring(frontmatterEnd);
      
      // Add import before the closing ---
      content = beforeEnd + "import SchemaMarkup from '../../components/SchemaMarkup.astro';\n" + afterEnd;
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
      fixed++;
    }
  }
});

console.log(`\n📊 Summary: Fixed ${fixed} files`);