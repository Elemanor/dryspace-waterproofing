const fs = require('fs');
const path = require('path');

// Blog posts with their corresponding image topics
const blogMappings = [
  { file: 'basement-waterproofing-cost-toronto-2025.astro', topic: 'waterproofing-cost' },
  { file: 'signs-your-foundation-needs-repair.astro', topic: 'foundation-repair' },
  { file: 'why-is-my-basement-leaking.astro', topic: 'basement-leaking' },
  { file: 'water-coming-through-basement-floor.astro', topic: 'basement-leaking' },
  { file: 'sump-pump-types-comparison-guide.astro', topic: 'sump-pump' },
  { file: 'french-drain-vs-weeping-tile.astro', topic: 'french-drain' },
  { file: 'white-powder-on-basement-walls.astro', topic: 'efflorescence' },
  { file: 'basement-smells-musty-after-rain.astro', topic: 'musty-smell' },
  { file: 'diy-vs-professional-waterproofing.astro', topic: 'diy-vs-pro' },
  { file: 'interior-vs-exterior-waterproofing.astro', topic: 'waterproofing-cost' }
];

const blogDir = path.join(__dirname, '..', 'src', 'pages', 'blog');

// Check if BlogImageGallery import exists
function hasImageGalleryImport(content) {
  return content.includes("import BlogImageGallery from '../../components/BlogImageGallery.astro'");
}

// Check if BlogImageGallery component is used
function hasImageGalleryComponent(content) {
  return content.includes('<BlogImageGallery');
}

// Add import if not present
function addImport(content) {
  if (hasImageGalleryImport(content)) {
    return content;
  }
  
  // Find the last import statement
  const importRegex = /import .+ from .+;/g;
  const imports = content.match(importRegex);
  
  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertPosition = lastImportIndex + lastImport.length;
    
    const newImport = "\nimport BlogImageGallery from '../../components/BlogImageGallery.astro';";
    return content.slice(0, insertPosition) + newImport + content.slice(insertPosition);
  }
  
  return content;
}

// Add gallery component to blog post
function addGalleryComponent(content, topic, filename) {
  if (hasImageGalleryComponent(content)) {
    console.log(`  Gallery component already exists`);
    return content;
  }
  
  // Try to find good insertion points - typically after a major section
  const insertionPatterns = [
    // After cost calculator section
    { pattern: /<\/section>\s*\n\s*<!-- .*Cost Calculator.*-->/i, after: false },
    // After quick overview section
    { pattern: /<\/section>\s*\n\s*<!-- .*Quick.*Overview.*-->/i, after: false },
    // After a pricing table
    { pattern: /<\/table>\s*<\/div>\s*<\/section>/g, after: true, offset: 1 },
    // After a major heading section (h2)
    { pattern: /<\/section>\s*\n\s*<section[^>]*id="[^"]*cost[^"]*"[^>]*>/i, after: false },
    // After the third section
    { pattern: /(<\/section>\s*\n){3}/, after: false },
    // Before the financing section
    { pattern: /<!-- .*Financing.*-->\s*\n\s*<section/i, after: false },
    // Before FAQ section
    { pattern: /<!-- .*FAQ.*-->\s*\n\s*<section/i, after: false },
    // Before conclusion
    { pattern: /<!-- .*Conclusion.*-->\s*\n\s*<section/i, after: false }
  ];
  
  for (const { pattern, after, offset = 0 } of insertionPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      const match = matches[offset] || matches[0];
      const insertIndex = after ? 
        content.indexOf(match) + match.length :
        content.indexOf(match);
      
      const galleryCode = `
      <!-- Related Images Gallery -->
      <BlogImageGallery topic="${topic}" />
`;
      
      return content.slice(0, insertIndex) + galleryCode + '\n' + content.slice(insertIndex);
    }
  }
  
  // If no good spot found, add before the conclusion/CTA
  const conclusionPattern = /<section[^>]*class="[^"]*bg-yellow-500[^"]*"/;
  const conclusionMatch = content.match(conclusionPattern);
  if (conclusionMatch) {
    const insertIndex = content.indexOf(conclusionMatch[0]);
    const galleryCode = `
      <!-- Related Images Gallery -->
      <BlogImageGallery topic="${topic}" />

`;
    return content.slice(0, insertIndex) + galleryCode + content.slice(insertIndex);
  }
  
  // Last resort: add before closing article tag
  const closingArticle = '</article>';
  const articleIndex = content.lastIndexOf(closingArticle);
  if (articleIndex > -1) {
    const galleryCode = `
      <!-- Related Images Gallery -->
      <BlogImageGallery topic="${topic}" />

`;
    return content.slice(0, articleIndex) + galleryCode + content.slice(articleIndex);
  }
  
  console.log(`  ⚠️ Could not find suitable insertion point for ${filename}`);
  return content;
}

// Process each blog file
console.log('📝 Adding image galleries to blog posts...\n');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

blogMappings.forEach(({ file, topic }) => {
  const filePath = path.join(blogDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    errorCount++;
    return;
  }
  
  console.log(`Processing ${file}...`);
  console.log(`  Topic: ${topic}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Add import if needed
    content = addImport(content);
    
    // Add gallery component if needed
    content = addGalleryComponent(content, topic, file);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${file} with ${topic} images\n`);
      updatedCount++;
    } else {
      console.log(`⏭️ Skipped ${file} (already has gallery or no changes needed)\n`);
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log('\n✨ Blog post image gallery update complete!');
console.log(`📝 Updated: ${updatedCount} files`);
console.log(`⏭️ Skipped: ${skippedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('\n💡 Remember to:');
console.log('  1. Check that images display correctly in blog posts');
console.log('  2. Verify image relevance to content');
console.log('  3. Test responsive display on mobile');
console.log('  4. Restart dev server to see changes');