const fs = require('fs');
const path = require('path');

// Define the replacements - more comprehensive
const replacements = [
  // Case sensitive replacements
  { from: /Spaders Waterproofing/g, to: 'Dryspace Waterproofing' },
  { from: /SPADERS WATERPROOFING/g, to: 'DRYSPACE WATERPROOFING' },
  { from: /Spaders'/g, to: "Dryspace's" },
  { from: /SPADERS'/g, to: "DRYSPACE'S" },
  { from: /Spaders/g, to: 'Dryspace' },
  { from: /SPADERS/g, to: 'DRYSPACE' },
  
  // URLs and social media
  { from: /spaders\.ca/g, to: 'dryspace.ca' },
  { from: /spadersca/g, to: 'dryspaceca' },
  { from: /company\/spaders/g, to: 'company/dryspace' },
  { from: /spaders\.review/g, to: 'dryspace.review' },
  { from: /1-800-SPADERS/g, to: '1-800-DRYSPACE' },
  
  // CSS classes (keep as lowercase)
  { from: /class="spaders"/g, to: 'class="dryspace"' },
  { from: /\.spaders\s*{/g, to: '.dryspace {' },
  { from: /\.spaders\s+/g, to: '.dryspace ' },
  
  // File paths
  { from: /spaders-/g, to: 'dryspace-' },
  { from: /\/spaders\//g, to: '/dryspace/' },
];

// Directories to process
const directories = [
  path.join(__dirname, '..', 'src'),
];

// File extensions to process
const extensions = ['.astro', '.tsx', '.ts', '.js', '.jsx', '.css', '.md', '.mdx', '.yaml', '.yml', '.json'];

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

console.log('🔄 Starting COMPLETE brand update from Spaders to Dryspace...\n');

let totalFiles = 0;
directories.forEach(dir => {
  console.log(`📁 Processing directory: ${dir}`);
  totalFiles += processDirectory(dir);
});

console.log(`\n✨ Brand update complete! Updated ${totalFiles} files.`);
console.log('📝 All mentions of Spaders (including UPPERCASE) have been updated to Dryspace.');
console.log('📝 Remember to:');
console.log('  1. Update any image file names from spaders-* to dryspace-*');
console.log('  2. Update domain settings if needed');
console.log('  3. Update any external services (analytics, etc.)');
console.log('  4. Restart the dev server to see changes');