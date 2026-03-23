#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// City coordinates for location pages
const cityCoordinates = {
  'toronto': { lat: 43.6532, lng: -79.3832 },
  'mississauga': { lat: 43.5890, lng: -79.6441 },
  'brampton': { lat: 43.7315, lng: -79.7624 },
  'vaughan': { lat: 43.8563, lng: -79.5085 },
  'markham': { lat: 43.8561, lng: -79.3370 },
  'richmond-hill': { lat: 43.8828, lng: -79.4403 },
  'oakville': { lat: 43.4675, lng: -79.6877 },
  'burlington': { lat: 43.3255, lng: -79.7990 },
  'hamilton': { lat: 43.2557, lng: -79.8711 },
  'scarborough': { lat: 43.7764, lng: -79.2318 },
  'north-york': { lat: 43.7615, lng: -79.4111 },
  'etobicoke': { lat: 43.6205, lng: -79.5132 },
  'ajax': { lat: 43.8509, lng: -79.0204 },
  'pickering': { lat: 43.8384, lng: -79.0868 },
  'whitby': { lat: 43.8975, lng: -78.9429 },
  'oshawa': { lat: 43.8971, lng: -78.8658 },
  'milton': { lat: 43.5183, lng: -79.8774 },
  'georgetown': { lat: 43.6464, lng: -79.9186 },
  'kitchener': { lat: 43.4516, lng: -80.4925 },
  'waterloo': { lat: 43.4643, lng: -80.5204 }
};

// Add Schema to location pages
const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');
const locationFiles = fs.readdirSync(locationsDir).filter(file => file.endsWith('.astro'));

locationFiles.forEach(file => {
  const filePath = path.join(locationsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const cityName = file.replace('.astro', '');
  const properCityName = cityName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const coords = cityCoordinates[cityName] || { lat: 43.6532, lng: -79.3832 };
  
  // Check if SchemaMarkup is already imported
  if (!content.includes('import SchemaMarkup')) {
    // Add import after other imports
    const lastImportIndex = content.lastIndexOf('import');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport) + 
      "\nimport SchemaMarkup from '../../components/SchemaMarkup.astro';" + 
      content.slice(endOfLastImport);
  }
  
  // Add Schema component before closing SEOLayout if not already present
  if (!content.includes('<SchemaMarkup')) {
    const schemaComponent = `
  <SchemaMarkup 
    type="LocalBusiness"
    data={{
      city: "${properCityName}",
      description: "Professional waterproofing and foundation repair services in ${properCityName} and surrounding areas. 24/7 emergency service, 25-year warranty.",
      latitude: ${coords.lat},
      longitude: ${coords.lng},
      address: "${properCityName} Service Area"
    }}
  />
`;
    
    // Find the closing SEOLayout tag
    const closingTag = '</SEOLayout>';
    const closingIndex = content.lastIndexOf(closingTag);
    if (closingIndex > -1) {
      content = content.slice(0, closingIndex) + schemaComponent + content.slice(closingIndex);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added Schema markup to ${file}`);
    }
  } else {
    console.log(`⏭️ ${file} already has Schema markup`);
  }
});

// Add Schema to service pages
const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');
const serviceFiles = fs.readdirSync(servicesDir).filter(file => file.endsWith('.astro'));

const serviceNames = {
  'sump-pump-installation': 'Sump Pump Installation',
  'weeping-tile': 'Weeping Tile Installation',
  'underpinning': 'Basement Underpinning',
  'foundation-repair': 'Foundation Repair',
  'foundation-crack-repair': 'Foundation Crack Repair',
  'interior-waterproofing': 'Interior Basement Waterproofing',
  'exterior-waterproofing': 'Exterior Foundation Waterproofing',
  'waterproof-coatings': 'Waterproof Coating Application',
  'mold-remediation': 'Mold Remediation Services',
  'emergency-waterproofing': '24/7 Emergency Waterproofing',
  'leak-detection': 'Professional Leak Detection',
  'interior-drainage-systems': 'Interior Drainage System Installation',
  'exterior-drainage-solutions': 'Exterior Drainage Solutions',
  'backwater-valve-installation': 'Backwater Valve Installation',
  'crawl-space-waterproofing': 'Crawl Space Waterproofing',
  'bowing-basement-walls': 'Bowing Wall Repair',
  'efflorescence-treatment': 'Efflorescence Treatment',
  'hydrostatic-pressure-relief': 'Hydrostatic Pressure Relief',
  'window-well-installation': 'Window Well Installation',
  'smart-water-monitoring': 'Smart Water Monitoring Systems',
  'masonry-stucco-waterproofing': 'Masonry & Stucco Waterproofing',
  'window-door-waterproofing': 'Window & Door Waterproofing',
  'basement-lowering': 'Basement Lowering'
};

serviceFiles.forEach(file => {
  const filePath = path.join(servicesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const serviceName = file.replace('.astro', '');
  const properServiceName = serviceNames[serviceName] || serviceName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Check if SchemaMarkup is already imported
  if (!content.includes('import SchemaMarkup')) {
    // Add import after other imports
    const lastImportIndex = content.lastIndexOf('import');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport) + 
      "\nimport SchemaMarkup from '../../components/SchemaMarkup.astro';" + 
      content.slice(endOfLastImport);
  }
  
  // Add Schema component before closing SEOLayout if not already present
  if (!content.includes('<SchemaMarkup')) {
    const schemaComponent = `
  <SchemaMarkup 
    type="Service"
    data={{
      serviceName: "${properServiceName}",
      description: "Professional ${properServiceName.toLowerCase()} services in Toronto and GTA. Licensed, insured, 25-year warranty.",
      offers: [
        {
          "@type": "Offer",
          "name": "Free Inspection",
          "price": "0",
          "priceCurrency": "CAD"
        },
        {
          "@type": "Offer",
          "name": "${properServiceName}",
          "priceRange": "$$",
          "availability": "https://schema.org/InStock"
        }
      ]
    }}
  />
`;
    
    // Find the closing SEOLayout tag
    const closingTag = '</SEOLayout>';
    const closingIndex = content.lastIndexOf(closingTag);
    if (closingIndex > -1) {
      content = content.slice(0, closingIndex) + schemaComponent + content.slice(closingIndex);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added Schema markup to ${file}`);
    }
  } else {
    console.log(`⏭️ ${file} already has Schema markup`);
  }
});

console.log('\n✨ Schema markup implementation complete!');
console.log('- LocalBusiness schema added to location pages');
console.log('- Service schema added to service pages');
console.log('- Organization schema included on all pages');
console.log('- This will enable rich snippets in search results');