import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read navigation.ts file
const navigationPath = path.join(__dirname, '..', 'src', 'navigation.ts');
const navigationContent = fs.readFileSync(navigationPath, 'utf8');

// Extract all href values from navigation.ts
const hrefRegex = /href:\s*(?:getPermalink\(['"`]([^'"`]+)['"`]\)|getBlogPermalink\(\)|['"`]([^'"`]+)['"`])/g;
const links = [];
let match;

while ((match = hrefRegex.exec(navigationContent)) !== null) {
  const link = match[1] || match[2];
  if (link && !link.startsWith('tel:') && !link.startsWith('http')) {
    links.push(link);
  }
}

// Special case for getBlogPermalink()
if (navigationContent.includes('getBlogPermalink()')) {
  links.push('/blog');
}

// Check if corresponding .astro files exist
const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const missingPages = [];
const existingPages = [];

links.forEach(link => {
  // Remove leading slash and add .astro extension
  let pagePath = link.substring(1) + '.astro';
  
  // Special handling for index pages
  if (pagePath.endsWith('/.astro')) {
    pagePath = pagePath.replace('/.astro', '/index.astro');
  }
  
  const fullPath = path.join(pagesDir, pagePath);
  
  if (fs.existsSync(fullPath)) {
    existingPages.push({ link, file: pagePath });
  } else {
    // Check if it's a directory with index.astro
    const indexPath = path.join(pagesDir, link.substring(1), 'index.astro');
    if (fs.existsSync(indexPath)) {
      existingPages.push({ link, file: link.substring(1) + '/index.astro' });
    } else {
      missingPages.push({ link, expectedFile: pagePath });
    }
  }
});

// Output results
console.log('=== Navigation Links Test Report ===\n');
console.log(`Total links found: ${links.length}`);
console.log(`Working links: ${existingPages.length}`);
console.log(`Broken links: ${missingPages.length}\n`);

if (existingPages.length > 0) {
  console.log('✅ Working Links:');
  existingPages.forEach(({ link, file }) => {
    console.log(`  ✓ ${link} → ${file}`);
  });
}

if (missingPages.length > 0) {
  console.log('\n❌ Broken Links:');
  missingPages.forEach(({ link, expectedFile }) => {
    console.log(`  ✗ ${link} → Missing: ${expectedFile}`);
  });
} else {
  console.log('\n🎉 All navigation links are working correctly!');
}