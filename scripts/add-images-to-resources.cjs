const fs = require('fs');
const path = require('path');

// Resource pages with their corresponding image categories
const resourceMappings = [
  { file: 'foundation-types-guide.astro', resource: 'foundation-types' },
  { file: 'foundation-types-comparison.astro', resource: 'foundation-types' },
  { file: 'foundation-crack-analysis.astro', resource: 'foundation-cracks' },
  { file: 'foundation-problems-diagnosis.astro', resource: 'foundation-cracks' },
  { file: 'foundation-drainage-landscaping.astro', resource: 'drainage-systems' },
  { file: 'waterproofing-technical-specifications.astro', resource: 'technical-specs' },
  { file: 'foundation-moisture-guide.astro', resource: 'moisture-problems' },
  { file: 'basement-excavation-guide.astro', resource: 'excavation' },
  { file: 'foundation-installation-guide.astro', resource: 'waterproofing-methods' },
  { file: 'flood-recovery-guide.astro', resource: 'flood-recovery' },
  { file: 'building-envelope-guide.astro', resource: 'building-envelope' },
  { file: 'inspection-checklist.astro', resource: 'inspection' },
  { file: 'basement-finishing-fundamentals.astro', resource: 'waterproofing-methods' },
  { file: 'climate-adaptation.astro', resource: 'drainage-systems' },
  { file: 'insurance-claims-guide.astro', resource: 'flood-recovery' },
  { file: 'contractor-standards.astro', resource: 'technical-specs' },
  { file: 'health-safety-guide.astro', resource: 'moisture-problems' },
  { file: 'waterproofing-glossary.astro', resource: 'technical-specs' }
];

const resourcesDir = path.join(__dirname, '..', 'src', 'pages', 'resources');

// Check if ResourceImageGallery import exists
function hasImageGalleryImport(content) {
  return content.includes("import ResourceImageGallery from '../../components/ResourceImageGallery.astro'");
}

// Check if ResourceImageGallery component is used
function hasImageGalleryComponent(content) {
  return content.includes('<ResourceImageGallery');
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
    
    const newImport = "\nimport ResourceImageGallery from '../../components/ResourceImageGallery.astro';";
    return content.slice(0, insertPosition) + newImport + content.slice(insertPosition);
  }
  
  return content;
}

// Add gallery component to the page
function addGalleryComponent(content, resourceType, filename) {
  if (hasImageGalleryComponent(content)) {
    console.log(`  Gallery component already exists`);
    return content;
  }
  
  // Try to find good insertion points
  const insertionPatterns = [
    // Before the conclusion or CTA section
    { pattern: /<!-- Conclusion -->\s*\n/, after: false },
    { pattern: /<section[^>]*class="[^"]*bg-gray-900[^"]*"/, after: false },
    { pattern: /<!-- CTA Section -->\s*\n/, after: false },
    // After main content
    { pattern: /<\/article>\s*\n/, after: true },
    // Before testimonials or FAQs
    { pattern: /<!-- Testimonials -->\s*\n/, after: false },
    { pattern: /<!-- FAQ -->\s*\n/, after: false },
    // Generic section patterns
    { pattern: /<section[^>]*class="[^"]*py-16[^"]*bg-black[^"]*"/, after: false }
  ];
  
  for (const { pattern, after } of insertionPatterns) {
    const match = content.match(pattern);
    if (match) {
      const insertIndex = after ? 
        content.indexOf(match[0]) + match[0].length :
        content.indexOf(match[0]);
      
      const galleryCode = `
  <!-- Resource Images and Diagrams -->
  <ResourceImageGallery resource="${resourceType}" />
`;
      
      return content.slice(0, insertIndex) + galleryCode + '\n' + content.slice(insertIndex);
    }
  }
  
  // If no good spot found, add before closing PageLayout tag
  const closingTag = '</PageLayout>';
  const closingIndex = content.lastIndexOf(closingTag);
  if (closingIndex > -1) {
    const galleryCode = `
  <!-- Resource Images and Diagrams -->
  <ResourceImageGallery resource="${resourceType}" />

`;
    return content.slice(0, closingIndex) + galleryCode + content.slice(closingIndex);
  }
  
  console.log(`  ⚠️ Could not find suitable insertion point for ${filename}`);
  return content;
}

// Process each resource file
console.log('📚 Adding image galleries to resource pages...\n');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

resourceMappings.forEach(({ file, resource }) => {
  const filePath = path.join(resourcesDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    errorCount++;
    return;
  }
  
  console.log(`Processing ${file}...`);
  console.log(`  Resource type: ${resource}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Add import if needed
    content = addImport(content);
    
    // Add gallery component if needed
    content = addGalleryComponent(content, resource, file);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${file} with ${resource} images\n`);
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

console.log('\n✨ Resource page image gallery update complete!');
console.log(`📝 Updated: ${updatedCount} files`);
console.log(`⏭️ Skipped: ${skippedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('\n💡 Remember to:');
console.log('  1. Check that technical diagrams display correctly');
console.log('  2. Verify image relevance to content');
console.log('  3. Test image loading performance');
console.log('  4. Restart dev server to see changes');