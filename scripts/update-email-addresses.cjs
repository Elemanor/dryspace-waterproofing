const fs = require('fs');
const path = require('path');

// Define the email replacements
const replacements = [
  // Old email addresses to new
  { from: /info@dryspace\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /privacy@dryspace\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /contact@dryspace\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /support@dryspace\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /info@spaders\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /privacy@spaders\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /contact@spaders\.ca/g, to: 'p.vysotckii@gmail.com' },
  { from: /support@spaders\.ca/g, to: 'p.vysotckii@gmail.com' },
  
  // Mailto links
  { from: /mailto:info@dryspace\.ca/g, to: 'mailto:p.vysotckii@gmail.com' },
  { from: /mailto:privacy@dryspace\.ca/g, to: 'mailto:p.vysotckii@gmail.com' },
  { from: /mailto:contact@dryspace\.ca/g, to: 'mailto:p.vysotckii@gmail.com' },
  { from: /mailto:support@dryspace\.ca/g, to: 'mailto:p.vysotckii@gmail.com' },
  { from: /mailto:info@spaders\.ca/g, to: 'mailto:p.vysotckii@gmail.com' },
  
  // Schema email fields
  { from: /"email":\s*"[^"]*@dryspace\.ca"/g, to: '"email": "p.vysotckii@gmail.com"' },
  { from: /"email":\s*"[^"]*@spaders\.ca"/g, to: '"email": "p.vysotckii@gmail.com"' },
];

// Directories to process
const directories = [
  path.join(__dirname, '..', 'src'),
  path.join(__dirname, '..', 'public'),
];

// File extensions to process
const extensions = ['.astro', '.tsx', '.ts', '.js', '.jsx', '.css', '.md', '.mdx', '.yaml', '.yml', '.json', '.html'];

function shouldProcessFile(filePath) {
  return extensions.some(ext => filePath.endsWith(ext));
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ from, to }) => {
      const newContent = content.replace(from, to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  let totalUpdated = 0;
  
  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️ Directory does not exist: ${dirPath}`);
    return 0;
  }
  
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist' && item !== '.astro') {
        totalUpdated += processDirectory(itemPath);
      }
    } else if (stat.isFile() && shouldProcessFile(itemPath)) {
      if (processFile(itemPath)) {
        totalUpdated++;
      }
    }
  });
  
  return totalUpdated;
}

console.log('📧 Starting email address update...\n');
console.log('Changing all email addresses to: p.vysotckii@gmail.com');
console.log('This includes contact forms, schemas, and mailto links\n');

let totalFiles = 0;
directories.forEach(dir => {
  console.log(`📁 Processing directory: ${dir}`);
  totalFiles += processDirectory(dir);
});

console.log(`\n✨ Email address update complete! Updated ${totalFiles} files.`);
console.log('📝 All email addresses now forward to p.vysotckii@gmail.com');
console.log('📝 Remember to:');
console.log('  1. Set up email forwarding on the domain');
console.log('  2. Update any external services');
console.log('  3. Update contact forms if they submit to external services');
console.log('  4. Restart the dev server to see changes');