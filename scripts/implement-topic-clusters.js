#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define topic clusters based on the INTERNAL_LINKING_MASTER.md strategy
const topicClusters = {
  'Waterproofing Methods': {
    pillar: '/services/exterior-waterproofing',
    spokes: [
      { url: '/services/interior-waterproofing', text: 'interior waterproofing solutions' },
      { url: '/services/waterproof-coatings', text: 'waterproof coating options' },
      { url: '/services/crawl-space-waterproofing', text: 'crawl space waterproofing' },
      { url: '/blog/interior-vs-exterior-waterproofing', text: 'compare waterproofing methods' },
      { url: '/tools/waterproofing-cost-calculator', text: 'calculate waterproofing cost' }
    ]
  },
  'Drainage Systems': {
    pillar: '/services/interior-drainage-systems',
    spokes: [
      { url: '/services/weeping-tile', text: 'weeping tile installation' },
      { url: '/services/sump-pump-installation', text: 'sump pump systems' },
      { url: '/services/exterior-drainage-solutions', text: 'exterior drainage' },
      { url: '/services/backwater-valve-installation', text: 'backwater valve protection' },
      { url: '/blog/french-drain-vs-weeping-tile', text: 'drainage system comparison' }
    ]
  },
  'Foundation Repair': {
    pillar: '/services/foundation-repair',
    spokes: [
      { url: '/services/foundation-crack-repair', text: 'foundation crack injection' },
      { url: '/services/underpinning', text: 'basement underpinning' },
      { url: '/services/bowing-basement-walls', text: 'wall straightening' },
      { url: '/blog/signs-your-foundation-needs-repair', text: 'foundation problem signs' },
      { url: '/case-studies/stone-foundation-cabbagetown', text: 'foundation repair case study' }
    ]
  },
  'Emergency Services': {
    pillar: '/emergency',
    spokes: [
      { url: '/services/emergency-waterproofing', text: '24/7 emergency waterproofing' },
      { url: '/services/leak-detection', text: 'professional leak detection' },
      { url: '/services/mold-remediation', text: 'mold removal services' },
      { url: '/blog/water-coming-through-basement-floor', text: 'emergency flooding solutions' }
    ]
  }
};

// Create Related Services component for each service page
const relatedServicesHTML = (currentPage, cluster) => {
  const relatedLinks = cluster.spokes
    .filter(spoke => spoke.url !== currentPage)
    .slice(0, 3)
    .map(spoke => `
      <a href="${spoke.url}" class="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
        <span class="text-blue-600 hover:text-blue-800">${spoke.text} →</span>
      </a>
    `).join('');

  return `
  <!-- Related Services Section -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold mb-6">Related Services & Resources</h2>
      <div class="grid md:grid-cols-3 gap-6">
        ${relatedLinks}
      </div>
    </div>
  </section>`;
};

// Process all service pages
const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');
const serviceFiles = fs.readdirSync(servicesDir).filter(file => file.endsWith('.astro'));

serviceFiles.forEach(file => {
  const filePath = path.join(servicesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const currentUrl = `/services/${file.replace('.astro', '')}`;
  
  // Find which cluster this page belongs to
  let belongsToCluster = null;
  for (const [clusterName, cluster] of Object.entries(topicClusters)) {
    if (cluster.pillar === currentUrl || cluster.spokes.some(s => s.url === currentUrl)) {
      belongsToCluster = cluster;
      break;
    }
  }
  
  if (belongsToCluster) {
    // Check if related services section already exists
    if (!content.includes('<!-- Related Services Section -->')) {
      // Find </Footer> or end of main content to insert before
      const footerIndex = content.lastIndexOf('</Footer>') || content.lastIndexOf('</footer>');
      if (footerIndex > -1) {
        const relatedSection = relatedServicesHTML(currentUrl, belongsToCluster);
        content = content.slice(0, footerIndex) + relatedSection + '\n  ' + content.slice(footerIndex);
        fs.writeFileSync(filePath, content);
        console.log(`✅ Added topic cluster links to ${file}`);
      }
    } else {
      console.log(`⏭️ ${file} already has related services section`);
    }
  }
});

// Create cross-linking between location pages
const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');
const locationFiles = fs.readdirSync(locationsDir).filter(file => file.endsWith('.astro'));

const locationClusters = {
  'Toronto Core': ['toronto', 'north-york', 'scarborough', 'etobicoke'],
  'West GTA': ['mississauga', 'brampton', 'oakville', 'burlington'],
  'York Region': ['vaughan', 'markham', 'richmond-hill'],
  'Durham Region': ['ajax', 'pickering', 'whitby', 'oshawa'],
  'Other': ['hamilton', 'kitchener', 'waterloo', 'milton', 'georgetown']
};

// Function to get nearby locations
const getNearbyLocations = (currentLocation) => {
  for (const [region, locations] of Object.entries(locationClusters)) {
    if (locations.includes(currentLocation)) {
      return locations.filter(loc => loc !== currentLocation).slice(0, 3);
    }
  }
  return [];
};

// Add nearby location links to each location page
locationFiles.forEach(file => {
  const filePath = path.join(locationsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const locationName = file.replace('.astro', '');
  const nearbyLocations = getNearbyLocations(locationName);
  
  if (nearbyLocations.length > 0 && !content.includes('<!-- Nearby Service Areas -->')) {
    const nearbyHTML = `
  <!-- Nearby Service Areas -->
  <section class="py-8 bg-blue-50">
    <div class="max-w-6xl mx-auto px-4">
      <h3 class="text-xl font-bold mb-4">We Also Serve Nearby Areas:</h3>
      <div class="flex flex-wrap gap-4">
        ${nearbyLocations.map(loc => {
          const cityName = loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          return `<a href="/locations/${loc}" class="inline-block px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition">
            ${cityName} Waterproofing
          </a>`;
        }).join('')}
      </div>
    </div>
  </section>`;
    
    const footerIndex = content.lastIndexOf('</Footer>') || content.lastIndexOf('</footer>');
    if (footerIndex > -1) {
      content = content.slice(0, footerIndex) + nearbyHTML + '\n  ' + content.slice(footerIndex);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added location cross-links to ${file}`);
    }
  }
});

console.log('\n✨ Topic clusters and internal linking implemented successfully!');
console.log('- Service pages now have related service links');
console.log('- Location pages now cross-link to nearby areas');
console.log('- Link equity will flow strategically through the site');