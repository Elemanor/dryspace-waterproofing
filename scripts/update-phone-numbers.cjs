const fs = require('fs');
const path = require('path');

// Define the phone number replacements
const replacements = [
  // Old phone numbers to new
  { from: /416-301-2344/g, to: '437-545-0067' },
  { from: /\+1-416-301-2344/g, to: '+1-437-545-0067' },
  { from: /4163012344/g, to: '4375450067' },
  
  // 1-800 numbers
  { from: /1-800-DRYSPACE/g, to: '437-545-0067' },
  { from: /1-800-DRYSPAC/g, to: '437-545-0067' },
  { from: /1-800-SPADERS/g, to: '437-545-0067' },
  { from: /1800DRYSPACE/g, to: '4375450067' },
  { from: /1800SPADERS/g, to: '4375450067' },
  
  // Tel links
  { from: /tel:416-301-2344/g, to: 'tel:437-545-0067' },
  { from: /tel:4163012344/g, to: 'tel:4375450067' },
  { from: /tel:\+14163012344/g, to: 'tel:+14375450067' },
  
  // Formatted variations
  { from: /\(416\) 301-2344/g, to: '(437) 545-0067' },
  { from: /416\.301\.2344/g, to: '437.545.0067' },
  { from: /416 301 2344/g, to: '437 545 0067' },
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

console.log('📞 Starting phone number update...\n');
console.log('Changing all phone numbers to: 437-545-0067');
console.log('Including 1-800 numbers and all variations\n');

let totalFiles = 0;
directories.forEach(dir => {
  console.log(`📁 Processing directory: ${dir}`);
  totalFiles += processDirectory(dir);
});

console.log(`\n✨ Phone number update complete! Updated ${totalFiles} files.`);
console.log('📝 All phone numbers have been standardized to 437-545-0067');
console.log('📝 Remember to:');
console.log('  1. Update any external services with new phone number');
console.log('  2. Update Google Business Profile');
console.log('  3. Update any printed materials');
console.log('  4. Restart the dev server to see changes');