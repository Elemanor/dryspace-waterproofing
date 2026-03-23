const fs = require('fs');
const path = require('path');

// Service pages to update with their corresponding image gallery service codes
const serviceUpdates = [
  { file: 'interior-waterproofing.astro', service: 'interior-waterproofing' },
  { file: 'foundation-repair.astro', service: 'foundation-repair' },
  { file: 'foundation-crack-repair.astro', service: 'foundation-repair' },
  { file: 'french-drain.astro', service: 'french-drain' },
  { file: 'sump-pump-installation.astro', service: 'sump-pump' },
  { file: 'mold-remediation.astro', service: 'mold-remediation' },
  { file: 'mold-remediation-complete.astro', service: 'mold-remediation' },
  { file: 'emergency-waterproofing.astro', service: 'emergency' },
  { file: 'backwater-valve-installation.astro', service: 'backwater-valve' },
  { file: 'underpinning.astro', service: 'underpinning' }
];

const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');

// Check if ServiceImageGallery import exists
function hasImageGalleryImport(content) {
  return content.includes("import ServiceImageGallery from '../../components/ServiceImageGallery.astro'");
}

// Check if ServiceImageGallery component is used
function hasImageGalleryComponent(content) {
  return content.includes('<ServiceImageGallery');
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
    
    const newImport = "\nimport ServiceImageGallery from '../../components/ServiceImageGallery.astro';";
    return content.slice(0, insertPosition) + newImport + content.slice(insertPosition);
  }
  
  return content;
}

// Add gallery component after Process or before pricing/testimonials
function addGalleryComponent(content, serviceName) {
  if (hasImageGalleryComponent(content)) {
    console.log(`  Gallery component already exists`);
    return content;
  }
  
  // Try to find good insertion points
  const insertionPatterns = [
    { pattern: /<Process\s*\/>\s*\n/, after: true },
    { pattern: /<!-- Process.*?-->\s*\n.*?\n/, after: true },
    { pattern: /<!-- Pricing.*?-->\s*\n/, after: false },
    { pattern: /<!-- Testimonials.*?-->\s*\n/, after: false },
    { pattern: /<!-- FAQ.*?-->\s*\n/, after: false },
    { pattern: /<Testimonials/, after: false },
    { pattern: /<FAQ/, after: false },
    { pattern: /<ContactForm/, after: false }
  ];
  
  for (const { pattern, after } of insertionPatterns) {
    const match = content.match(pattern);
    if (match) {
      const insertIndex = after ? 
        content.indexOf(match[0]) + match[0].length :
        content.indexOf(match[0]);
      
      const galleryCode = `
  <!-- Service Image Gallery -->
  <ServiceImageGallery service="${serviceName}" />
`;
      
      return content.slice(0, insertIndex) + galleryCode + '\n' + content.slice(insertIndex);
    }
  }
  
  // If no good spot found, add before closing PageLayout tag
  const closingTag = '</PageLayout>';
  const closingIndex = content.lastIndexOf(closingTag);
  if (closingIndex > -1) {
    const galleryCode = `
  <!-- Service Image Gallery -->
  <ServiceImageGallery service="${serviceName}" />

`;
    return content.slice(0, closingIndex) + galleryCode + content.slice(closingIndex);
  }
  
  return content;
}

// Process each service file
console.log('🖼️ Adding image galleries to service pages...\n');

let updatedCount = 0;
let skippedCount = 0;

serviceUpdates.forEach(({ file, service }) => {
  const filePath = path.join(servicesDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    return;
  }
  
  console.log(`Processing ${file}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Add import if needed
    content = addImport(content);
    
    // Add gallery component if needed
    content = addGalleryComponent(content, service);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${file} with image gallery for "${service}"\n`);
      updatedCount++;
    } else {
      console.log(`⏭️ Skipped ${file} (already has gallery)\n`);
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log('\n✨ Image gallery update complete!');
console.log(`📝 Updated: ${updatedCount} files`);
console.log(`⏭️ Skipped: ${skippedCount} files`);
console.log('\n💡 Remember to:');
console.log('  1. Check that images display correctly');
console.log('  2. Verify image paths are correct');
console.log('  3. Test on mobile devices');
console.log('  4. Restart dev server to see changes');