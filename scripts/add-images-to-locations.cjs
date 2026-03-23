const fs = require('fs');
const path = require('path');

// Location pages to update
const locationPages = [
  'ajax.astro',
  'burlington.astro',
  'brampton.astro',
  'etobicoke.astro',
  'georgetown.astro',
  'kitchener.astro',
  'hamilton.astro',
  'markham.astro',
  'milton.astro',
  'north-york.astro',
  'mississauga.astro',
  'oshawa.astro',
  'oakville.astro',
  'richmond-hill.astro',
  'scarborough.astro',
  'pickering.astro',
  'toronto.astro',
  'whitby.astro',
  'waterloo.astro',
  'vaughan.astro'
];

const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');

// Check if LocationImageShowcase import exists
function hasImageShowcaseImport(content) {
  return content.includes("import LocationImageShowcase from '../../components/LocationImageShowcase.astro'");
}

// Check if LocationImageShowcase component is used
function hasImageShowcaseComponent(content) {
  return content.includes('<LocationImageShowcase');
}

// Add import if not present
function addImport(content) {
  if (hasImageShowcaseImport(content)) {
    return content;
  }
  
  // Find the last import statement
  const importRegex = /import .+ from .+;/g;
  const imports = content.match(importRegex);
  
  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertPosition = lastImportIndex + lastImport.length;
    
    const newImport = "\nimport LocationImageShowcase from '../../components/LocationImageShowcase.astro';";
    return content.slice(0, insertPosition) + newImport + content.slice(insertPosition);
  }
  
  return content;
}

// Extract city name from page content
function getCityName(content, filename) {
  // Try to find cityName in localInfo
  const cityNameMatch = content.match(/cityName:\s*["']([^"']+)["']/);
  if (cityNameMatch) {
    return cityNameMatch[1];
  }
  
  // Fallback to filename-based extraction
  const cityMap = {
    'ajax.astro': 'Ajax',
    'burlington.astro': 'Burlington',
    'brampton.astro': 'Brampton',
    'etobicoke.astro': 'Etobicoke',
    'georgetown.astro': 'Georgetown',
    'kitchener.astro': 'Kitchener',
    'hamilton.astro': 'Hamilton',
    'markham.astro': 'Markham',
    'milton.astro': 'Milton',
    'north-york.astro': 'North York',
    'mississauga.astro': 'Mississauga',
    'oshawa.astro': 'Oshawa',
    'oakville.astro': 'Oakville',
    'richmond-hill.astro': 'Richmond Hill',
    'scarborough.astro': 'Scarborough',
    'pickering.astro': 'Pickering',
    'toronto.astro': 'Toronto',
    'whitby.astro': 'Whitby',
    'waterloo.astro': 'Waterloo',
    'vaughan.astro': 'Vaughan'
  };
  
  return cityMap[filename] || 'Toronto';
}

// Add showcase component after Process or before Testimonials
function addShowcaseComponent(content, cityName, filename) {
  if (hasImageShowcaseComponent(content)) {
    console.log(`  Showcase component already exists`);
    return content;
  }
  
  // Try to find good insertion points
  const insertionPatterns = [
    { pattern: /<Process\s*\/>\s*\n/, after: true },
    { pattern: /<!-- Process Section -->\s*\n.*?\n/, after: true },
    { pattern: /<Services\s*\/>\s*\n/, after: true },
    { pattern: /<!-- Services -->\s*\n.*?\n/, after: true },
    { pattern: /<!-- Testimonials -->\s*\n/, after: false },
    { pattern: /<Testimonials/, after: false },
    { pattern: /<!-- Final CTA -->\s*\n/, after: false },
    { pattern: /<section[^>]*class="[^"]*py-16[^"]*bg-black[^"]*"/, after: false } // Before final CTA section
  ];
  
  for (const { pattern, after } of insertionPatterns) {
    const match = content.match(pattern);
    if (match) {
      const insertIndex = after ? 
        content.indexOf(match[0]) + match[0].length :
        content.indexOf(match[0]);
      
      const showcaseCode = `
  <!-- Location Image Showcase -->
  <LocationImageShowcase city="${cityName}" />
`;
      
      return content.slice(0, insertIndex) + showcaseCode + '\n' + content.slice(insertIndex);
    }
  }
  
  // If no good spot found, add before closing PageLayout tag
  const closingTag = '</PageLayout>';
  const closingIndex = content.lastIndexOf(closingTag);
  if (closingIndex > -1) {
    const showcaseCode = `
  <!-- Location Image Showcase -->
  <LocationImageShowcase city="${cityName}" />

`;
    return content.slice(0, closingIndex) + showcaseCode + content.slice(closingIndex);
  }
  
  console.log(`  ⚠️ Could not find suitable insertion point for ${filename}`);
  return content;
}

// Process each location file
console.log('🖼️ Adding image showcases to location pages...\n');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

locationPages.forEach((file) => {
  const filePath = path.join(locationsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    errorCount++;
    return;
  }
  
  console.log(`Processing ${file}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Get city name
    const cityName = getCityName(content, file);
    console.log(`  City: ${cityName}`);
    
    // Add import if needed
    content = addImport(content);
    
    // Add showcase component if needed
    content = addShowcaseComponent(content, cityName, file);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${file} with image showcase for ${cityName}\n`);
      updatedCount++;
    } else {
      console.log(`⏭️ Skipped ${file} (already has showcase or no changes needed)\n`);
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log('\n✨ Location page image showcase update complete!');
console.log(`📝 Updated: ${updatedCount} files`);
console.log(`⏭️ Skipped: ${skippedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('\n💡 Remember to:');
console.log('  1. Check that images display correctly');
console.log('  2. Verify city names are correct');
console.log('  3. Test on mobile devices');
console.log('  4. Restart dev server to see changes');