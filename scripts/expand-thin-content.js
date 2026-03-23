import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content expansion templates for different page types
const expansionTemplates = {
  location: {
    sections: [
      {
        title: "Why {city} Properties Need Professional Waterproofing",
        content: `
The unique geography and climate of {city} create specific waterproofing challenges that require professional expertise. With annual precipitation levels and seasonal temperature fluctuations, {city} homes face constant moisture threats.

Local soil conditions, particularly the clay-rich composition common in the GTA, expand and contract with moisture changes, putting tremendous pressure on foundation walls. This hydrostatic pressure can cause cracks, leaks, and structural damage if not properly managed.

Many {city} homes were built decades ago when waterproofing standards were less stringent. These aging foundations require modern solutions to meet today's moisture challenges. Our specialized knowledge of {city}'s building history and local conditions ensures effective, long-lasting waterproofing solutions.`,
        words: 100
      },
      {
        title: "{city} Neighborhood-Specific Services",
        content: `
We provide tailored waterproofing solutions for every {city} neighborhood, understanding that each area has unique challenges:

**Residential Areas**: Complete basement waterproofing, foundation repair, and drainage solutions for single-family homes and townhouses.

**Commercial Districts**: Specialized services for businesses, including parking garage waterproofing, elevator pit solutions, and commercial foundation systems.

**Heritage Properties**: Careful preservation techniques that protect historical integrity while providing modern waterproofing protection.

**New Developments**: Pre-construction consultation and new home waterproofing to prevent future issues.

Our deep knowledge of {city}'s diverse neighborhoods means we understand local water table levels, soil conditions, and common foundation types in your specific area.`,
        words: 100
      },
      {
        title: "Emergency Response in {city}",
        content: `
When water emergencies strike, every minute counts. Our {city} emergency response team guarantees:

**60-Minute Response Time**: Rapid deployment to minimize damage
**24/7 Availability**: Round-the-clock service, 365 days a year
**Fully Equipped Vehicles**: All necessary pumps, equipment, and materials
**Insurance Coordination**: Direct billing and claim assistance

Our emergency crews are strategically positioned throughout {city} to ensure the fastest possible response. We maintain fully stocked vehicles with industrial pumps, emergency waterproofing materials, and drying equipment.`,
        words: 80
      },
      {
        title: "Cost Factors for {city} Waterproofing",
        content: `
Waterproofing costs in {city} vary based on several factors:

**Foundation Type**: Poured concrete, block, stone, or brick foundations each require different approaches
**Property Age**: Older homes may need more extensive work
**Accessibility**: Landscaping, decks, and driveways affect excavation costs
**Water Table**: High water tables require more robust solutions

Average investment ranges:
- Interior waterproofing: $3,000-$7,000
- Exterior waterproofing: $8,000-$15,000
- French drains: $5,000-$10,000
- Sump pump systems: $2,000-$4,000

We offer transparent pricing with detailed quotes and multiple financing options to make protection affordable.`,
        words: 90
      }
    ]
  },
  service: {
    sections: [
      {
        title: "Comprehensive Service Process",
        content: `
Our systematic approach ensures thorough, effective solutions:

**Step 1: Assessment** - Complete inspection to identify all issues and determine root causes
**Step 2: Planning** - Custom solution design based on your specific needs and budget
**Step 3: Preparation** - Site preparation, protection of belongings, safety setup
**Step 4: Implementation** - Professional installation using industry-best practices
**Step 5: Quality Control** - Multi-point inspection to ensure proper function
**Step 6: Cleanup** - Complete site restoration and debris removal
**Step 7: Documentation** - Detailed warranty and maintenance instructions
**Step 8: Follow-up** - Scheduled check-ins to ensure continued satisfaction`,
        words: 90
      },
      {
        title: "Common Problems We Solve",
        content: `
This service addresses multiple issues that can damage your property:

**Visible Signs**: Water stains, efflorescence, mold growth, musty odors, peeling paint
**Structural Issues**: Foundation cracks, bowing walls, settling, deterioration
**Water Problems**: Flooding, seepage, high humidity, condensation
**Health Concerns**: Mold, mildew, poor air quality, allergens

Early intervention prevents minor issues from becoming major repairs. Our expertise identifies problems others might miss, saving you thousands in future repairs.`,
        words: 70
      },
      {
        title: "Benefits & Value",
        content: `
Investing in professional service provides immediate and long-term benefits:

**Property Protection**: Prevents structural damage and preserves foundation integrity
**Health & Safety**: Eliminates mold risks and improves indoor air quality
**Energy Efficiency**: Reduces humidity, lowering HVAC costs by up to 20%
**Property Value**: Increases home value and marketability
**Peace of Mind**: Comprehensive warranty and professional support

Our solutions pay for themselves through prevented damage, energy savings, and increased property value.`,
        words: 70
      },
      {
        title: "Maintenance & Prevention",
        content: `
Protect your investment with proper maintenance:

**Regular Inspections**: Check for new cracks, water stains, or changes
**Seasonal Preparation**: Spring thaw and fall freeze preparation
**Gutter Maintenance**: Keep gutters clean and properly directed
**Grading Management**: Ensure proper slope away from foundation
**Vegetation Control**: Manage roots and maintain appropriate landscaping distance

We provide detailed maintenance guides and offer annual inspection services to keep your systems functioning optimally.`,
        words: 70
      }
    ]
  }
};

function expandContent(filePath, pageType, cityName = null) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const template = expansionTemplates[pageType];
  
  if (!template) return false;
  
  let addedContent = '\n\n<!-- Expanded Content -->\n';
  let totalWordsAdded = 0;
  
  template.sections.forEach(section => {
    let sectionTitle = section.title;
    let sectionContent = section.content;
    
    if (cityName) {
      sectionTitle = sectionTitle.replace(/{city}/g, cityName);
      sectionContent = sectionContent.replace(/{city}/g, cityName);
    }
    
    addedContent += `
<section class="expanded-section">
  <div class="container">
    <h2>${sectionTitle}</h2>
    ${sectionContent}
  </div>
</section>
`;
    totalWordsAdded += section.words;
  });
  
  // Find the best place to insert (before footer or at end)
  const footerIndex = content.indexOf('<Footer');
  const seoLayoutClose = content.lastIndexOf('</SEOLayout>');
  
  let insertIndex = footerIndex > -1 ? footerIndex : seoLayoutClose;
  
  if (insertIndex > -1) {
    content = content.slice(0, insertIndex) + addedContent + content.slice(insertIndex);
    fs.writeFileSync(filePath, content);
    return totalWordsAdded;
  }
  
  return 0;
}

// Priority pages to expand
const priorityExpansions = [
  // Critical location pages
  { path: 'src/pages/locations/toronto.astro', type: 'location', city: 'Toronto' },
  { path: 'src/pages/locations/mississauga.astro', type: 'location', city: 'Mississauga' },
  { path: 'src/pages/locations/brampton.astro', type: 'location', city: 'Brampton' },
  { path: 'src/pages/locations/vaughan.astro', type: 'location', city: 'Vaughan' },
  { path: 'src/pages/locations/markham.astro', type: 'location', city: 'Markham' },
  
  // Critical service pages
  { path: 'src/pages/services/sump-pump-installation.astro', type: 'service' },
  { path: 'src/pages/services/weeping-tile.astro', type: 'service' },
  { path: 'src/pages/services/underpinning.astro', type: 'service' },
  { path: 'src/pages/services/foundation-crack-repair.astro', type: 'service' },
  { path: 'src/pages/services/interior-waterproofing.astro', type: 'service' }
];

console.log('📝 Expanding Thin Content Pages\n');
console.log('═══════════════════════════════════════════════════\n');

let totalExpanded = 0;
let totalWords = 0;

priorityExpansions.forEach(page => {
  const fullPath = path.join(__dirname, '..', page.path);
  
  if (fs.existsSync(fullPath)) {
    const wordsAdded = expandContent(fullPath, page.type, page.city);
    
    if (wordsAdded > 0) {
      console.log(`✅ Expanded ${path.basename(page.path)}: +${wordsAdded} words`);
      totalExpanded++;
      totalWords += wordsAdded;
    }
  }
});

console.log('\n═══════════════════════════════════════════════════\n');
console.log(`📊 Summary: Expanded ${totalExpanded} pages with ${totalWords} total words\n`);

if (totalExpanded > 0) {
  console.log('✨ Content expansion complete!\n');
  console.log('Benefits:');
  console.log('• Improved SEO rankings from comprehensive content');
  console.log('• Better user engagement with detailed information');
  console.log('• Increased topical authority');
  console.log('• Higher conversion rates from trust-building content\n');
}