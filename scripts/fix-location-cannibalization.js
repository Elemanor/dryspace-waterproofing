#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Location pages to update
const locations = [
  'ajax', 'brampton', 'burlington', 'etobicoke', 'georgetown',
  'hamilton', 'kitchener', 'markham', 'milton', 'mississauga',
  'north-york', 'oakville', 'oshawa', 'pickering', 'richmond-hill',
  'scarborough', 'vaughan', 'waterloo', 'whitby'
];

// Fix keyword cannibalization by making each location page unique
locations.forEach(location => {
  const filePath = path.join(__dirname, '..', 'src', 'pages', 'locations', `${location}.astro`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Get proper city name
    const cityName = location.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Update title to focus on local contractors instead of generic "basement waterproofing"
    content = content.replace(
      /title=".*?Basement Waterproofing.*?"/,
      `title="${cityName} Waterproofing Contractors | Local Foundation Experts | Spaders"`
    );
    
    // Update description to emphasize local service
    content = content.replace(
      /description=".*?basement waterproofing.*?"/i,
      `description="${cityName}'s trusted waterproofing contractors. Local experts, 24/7 emergency service, 25-year warranty. Serving all ${cityName} neighborhoods since 1985. Call 416-301-2344."`
    );
    
    // Update Hero title to avoid cannibalization
    content = content.replace(
      /title=".*?Basement Waterproofing.*?"/g,
      `title="${cityName} Waterproofing Contractors"`
    );
    
    // Update H1/H2 headings to be location-specific
    content = content.replace(
      /<h1.*?>.*?Basement Waterproofing.*?<\/h1>/gi,
      `<h1>${cityName} Waterproofing Contractors & Foundation Experts</h1>`
    );
    
    content = content.replace(
      /<h2.*?>.*?Basement Waterproofing.*?<\/h2>/gi,
      `<h2>${cityName}'s Premier Waterproofing Contractors</h2>`
    );
    
    // Write updated content
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed cannibalization for ${cityName}`);
  } else {
    console.log(`⚠️ File not found: ${location}.astro`);
  }
});

console.log('\n✨ Keyword cannibalization fixed for all location pages!');
console.log('Each location now targets "[City] Waterproofing Contractors" instead of generic "Basement Waterproofing"');