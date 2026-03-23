#!/usr/bin/env node

/**
 * SuperClaude Location Page Migration Script
 * Migrates all location pages to use the new PageLayout with SEO optimization
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Location-specific data with local SEO optimization
const locationPages = {
  'toronto': {
    title: 'Waterproofing Toronto | 24/7 Emergency Service | Spaders',
    description: 'Professional waterproofing in Toronto. 25-year warranty, government rebates, emergency service. Serving all Toronto neighborhoods.',
    cityName: 'Toronto',
    population: '2.9 million',
    established: '1834',
    waterTable: 'High near Lake Ontario',
    soilType: 'Clay-rich, expansive',
    avgHomesAge: '50+ years',
    floodRisk: 'High - spring flooding common',
    neighborhoods: ['Downtown', 'North York', 'Scarborough', 'Etobicoke', 'York', 'East York'],
    uniqueChallenges: 'Lake effect moisture, aging infrastructure, high water table',
    avgRainfall: '831mm annually',
    frostLine: '1.2 meters'
  },
  'mississauga': {
    title: 'Waterproofing Mississauga | Foundation Repair Experts',
    description: 'Basement waterproofing in Mississauga. Interior, exterior, foundation repair. Free inspection, competitive pricing.',
    cityName: 'Mississauga',
    population: '721,000',
    established: '1974',
    waterTable: 'Moderate to high',
    soilType: 'Clay and sand mix',
    avgHomesAge: '30-40 years',
    floodRisk: 'Moderate - localized flooding',
    neighborhoods: ['Port Credit', 'Streetsville', 'Meadowvale', 'Cooksville', 'Clarkson', 'Lorne Park'],
    uniqueChallenges: 'Rapid development, varied soil conditions, Credit River proximity',
    avgRainfall: '807mm annually',
    frostLine: '1.2 meters'
  },
  'brampton': {
    title: 'Waterproofing Brampton | Basement & Foundation Solutions',
    description: 'Expert waterproofing services in Brampton. Sump pumps, French drains, crack repair. 24/7 emergency response.',
    cityName: 'Brampton',
    population: '656,000',
    established: '1853',
    waterTable: 'Variable',
    soilType: 'Clay dominant',
    avgHomesAge: '25-35 years',
    floodRisk: 'Moderate - storm flooding',
    neighborhoods: ['Bramalea', 'Heart Lake', 'Springdale', 'Fletcher\'s Creek', 'Mount Pleasant'],
    uniqueChallenges: 'New development settling, clay soil expansion, storm water management',
    avgRainfall: '819mm annually',
    frostLine: '1.2 meters'
  },
  'vaughan': {
    title: 'Waterproofing Vaughan | Premium Foundation Protection',
    description: 'Professional waterproofing in Vaughan. Luxury home specialists, complete solutions, warranty protection.',
    cityName: 'Vaughan',
    population: '323,000',
    established: '1850',
    waterTable: 'Moderate',
    soilType: 'Clay and till',
    avgHomesAge: '20-30 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Woodbridge', 'Thornhill', 'Maple', 'Kleinburg', 'Concord'],
    uniqueChallenges: 'Large homes, finished basements, high property values',
    avgRainfall: '810mm annually',
    frostLine: '1.2 meters'
  },
  'markham': {
    title: 'Waterproofing Markham | Reliable Basement Solutions',
    description: 'Basement waterproofing in Markham. Modern techniques, experienced team, guaranteed results. Free estimates.',
    cityName: 'Markham',
    population: '338,000',
    established: '1794',
    waterTable: 'Moderate',
    soilType: 'Clay loam',
    avgHomesAge: '25-35 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Unionville', 'Milliken', 'Cornell', 'Berczy', 'Cachet'],
    uniqueChallenges: 'Mix of old and new homes, Rouge River watershed, varied topography',
    avgRainfall: '815mm annually',
    frostLine: '1.2 meters'
  },
  'hamilton': {
    title: 'Waterproofing Hamilton | Mountain & Lower City Experts',
    description: 'Foundation waterproofing in Hamilton. Escarpment specialists, crack repair, drainage solutions.',
    cityName: 'Hamilton',
    population: '579,000',
    established: '1816',
    waterTable: 'Variable - mountain vs lower city',
    soilType: 'Limestone, clay',
    avgHomesAge: '60+ years',
    floodRisk: 'High in lower city',
    neighborhoods: ['Dundas', 'Ancaster', 'Stoney Creek', 'Waterdown', 'Flamborough'],
    uniqueChallenges: 'Escarpment drainage, older homes, industrial legacy',
    avgRainfall: '860mm annually',
    frostLine: '1.0 meters'
  },
  'oakville': {
    title: 'Waterproofing Oakville | Luxury Home Foundation Experts',
    description: 'Premium waterproofing services in Oakville. Estate homes, custom solutions, discreet service.',
    cityName: 'Oakville',
    population: '211,000',
    established: '1857',
    waterTable: 'High near lake',
    soilType: 'Sand and clay',
    avgHomesAge: '30-40 years',
    floodRisk: 'Moderate - lakefront areas',
    neighborhoods: ['Old Oakville', 'Glen Abbey', 'Bronte', 'Clearview', 'River Oaks'],
    uniqueChallenges: 'Lake proximity, luxury finishes, mature landscaping',
    avgRainfall: '799mm annually',
    frostLine: '1.0 meters'
  },
  'burlington': {
    title: 'Waterproofing Burlington | Lakefront & Escarpment Service',
    description: 'Expert waterproofing in Burlington. Handling unique lakefront and escarpment challenges. Free consultation.',
    cityName: 'Burlington',
    population: '186,000',
    established: '1873',
    waterTable: 'Variable by area',
    soilType: 'Mixed - sand to clay',
    avgHomesAge: '35-45 years',
    floodRisk: 'Moderate',
    neighborhoods: ['Aldershot', 'Roseland', 'Brant Hills', 'Tyandaga', 'Millcroft'],
    uniqueChallenges: 'Escarpment runoff, lake moisture, diverse geology',
    avgRainfall: '805mm annually',
    frostLine: '1.0 meters'
  },
  'richmond-hill': {
    title: 'Waterproofing Richmond Hill | Professional Basement Solutions',
    description: 'Basement waterproofing Richmond Hill. Interior, exterior, foundation repair. Serving all neighborhoods.',
    cityName: 'Richmond Hill',
    population: '202,000',
    established: '1873',
    waterTable: 'Moderate',
    soilType: 'Clay dominant',
    avgHomesAge: '25-35 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Oak Ridges', 'Langstaff', 'Jefferson', 'Bayview Hill'],
    uniqueChallenges: 'Oak Ridges Moraine, newer developments, clay soil',
    avgRainfall: '812mm annually',
    frostLine: '1.2 meters'
  },
  'scarborough': {
    title: 'Waterproofing Scarborough | Eastern Toronto Specialists',
    description: 'Professional waterproofing in Scarborough. Bluffs area experts, foundation repair, drainage solutions.',
    cityName: 'Scarborough',
    population: '632,000',
    established: '1850 (merged 1998)',
    waterTable: 'High near bluffs',
    soilType: 'Clay and sand',
    avgHomesAge: '40-50 years',
    floodRisk: 'High - ravine areas',
    neighborhoods: ['Agincourt', 'Malvern', 'Guildwood', 'Rouge', 'Birch Cliff'],
    uniqueChallenges: 'Scarborough Bluffs erosion, ravine flooding, aging homes',
    avgRainfall: '835mm annually',
    frostLine: '1.2 meters'
  },
  'north-york': {
    title: 'Waterproofing North York | Central Toronto Experts',
    description: 'Basement waterproofing North York. Serving Willowdale, York Mills, Lawrence Park. Same-day service.',
    cityName: 'North York',
    population: '670,000',
    established: '1922 (merged 1998)',
    waterTable: 'Moderate',
    soilType: 'Clay and till',
    avgHomesAge: '35-45 years',
    floodRisk: 'Moderate',
    neighborhoods: ['Willowdale', 'York Mills', 'Don Mills', 'Bayview Village', 'Lawrence Park'],
    uniqueChallenges: 'Don River watershed, mix of housing types, busy urban area',
    avgRainfall: '830mm annually',
    frostLine: '1.2 meters'
  },
  'etobicoke': {
    title: 'Waterproofing Etobicoke | Western Toronto Service',
    description: 'Expert waterproofing in Etobicoke. Humber River specialists, foundation experts, quick response.',
    cityName: 'Etobicoke',
    population: '365,000',
    established: '1850 (merged 1998)',
    waterTable: 'High near Humber',
    soilType: 'Clay and silt',
    avgHomesAge: '40-50 years',
    floodRisk: 'High - Humber River',
    neighborhoods: ['Islington', 'Mimico', 'The Kingsway', 'Rexdale', 'Long Branch'],
    uniqueChallenges: 'Humber River flooding, older bungalows, lake proximity',
    avgRainfall: '828mm annually',
    frostLine: '1.2 meters'
  },
  'ajax': {
    title: 'Waterproofing Ajax | Durham Region Foundation Experts',
    description: 'Professional waterproofing in Ajax. Serving all neighborhoods, competitive pricing, warranty protection.',
    cityName: 'Ajax',
    population: '126,000',
    established: '1955',
    waterTable: 'Moderate to high',
    soilType: 'Clay and sand',
    avgHomesAge: '25-35 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Downtown Ajax', 'Riverside', 'Applecroft', 'Audley'],
    uniqueChallenges: 'Lake Ontario proximity, newer developments, varied elevations',
    avgRainfall: '820mm annually',
    frostLine: '1.2 meters'
  },
  'pickering': {
    title: 'Waterproofing Pickering | Reliable Basement Solutions',
    description: 'Basement waterproofing Pickering. Foundation repair, sump pumps, French drains. Free inspection.',
    cityName: 'Pickering',
    population: '101,000',
    established: '1811',
    waterTable: 'Variable',
    soilType: 'Mixed deposits',
    avgHomesAge: '30-40 years',
    floodRisk: 'Moderate',
    neighborhoods: ['Bay Ridges', 'Rouge Park', 'Liverpool', 'Dunbarton'],
    uniqueChallenges: 'Rouge River, varied topography, mix of urban and rural',
    avgRainfall: '825mm annually',
    frostLine: '1.2 meters'
  },
  'whitby': {
    title: 'Waterproofing Whitby | Durham\'s Trusted Contractors',
    description: 'Expert waterproofing services in Whitby. Complete foundation solutions, emergency service available.',
    cityName: 'Whitby',
    population: '138,000',
    established: '1855',
    waterTable: 'Moderate',
    soilType: 'Clay till',
    avgHomesAge: '25-35 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Brooklin', 'Port Whitby', 'Downtown', 'Pringle Creek'],
    uniqueChallenges: 'Rapid growth, new construction settling, varied soil',
    avgRainfall: '822mm annually',
    frostLine: '1.2 meters'
  },
  'oshawa': {
    title: 'Waterproofing Oshawa | Foundation & Basement Experts',
    description: 'Professional waterproofing in Oshawa. Serving all neighborhoods, competitive rates, quality guaranteed.',
    cityName: 'Oshawa',
    population: '175,000',
    established: '1849',
    waterTable: 'Moderate',
    soilType: 'Clay and till',
    avgHomesAge: '40-50 years',
    floodRisk: 'Moderate',
    neighborhoods: ['Downtown', 'Windfields', 'Kedron', 'Taunton'],
    uniqueChallenges: 'Older housing stock, industrial heritage, creek systems',
    avgRainfall: '830mm annually',
    frostLine: '1.2 meters'
  },
  'milton': {
    title: 'Waterproofing Milton | Fast-Growing Community Experts',
    description: 'Basement waterproofing Milton. New home warranties, foundation protection, drainage solutions.',
    cityName: 'Milton',
    population: '125,000',
    established: '1857',
    waterTable: 'Variable',
    soilType: 'Clay and limestone',
    avgHomesAge: '15-25 years',
    floodRisk: 'Low',
    neighborhoods: ['Dempsey', 'Clarke', 'Willmont', 'Scott'],
    uniqueChallenges: 'Rapid expansion, new construction, escarpment proximity',
    avgRainfall: '815mm annually',
    frostLine: '1.2 meters'
  },
  'georgetown': {
    title: 'Waterproofing Georgetown | Halton Hills Specialists',
    description: 'Expert waterproofing in Georgetown. Heritage home specialists, modern solutions, local service.',
    cityName: 'Georgetown',
    population: '42,000',
    established: '1823',
    waterTable: 'Moderate',
    soilType: 'Clay and gravel',
    avgHomesAge: '35-45 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Downtown', 'Delrex', 'Georgetown South', 'Silver Creek'],
    uniqueChallenges: 'Heritage homes, Credit River valley, mixed housing ages',
    avgRainfall: '820mm annually',
    frostLine: '1.2 meters'
  },
  'kitchener': {
    title: 'Waterproofing Kitchener | Tri-Cities Foundation Experts',
    description: 'Professional waterproofing Kitchener. German engineering precision, quality workmanship, fair pricing.',
    cityName: 'Kitchener',
    population: '256,000',
    established: '1833',
    waterTable: 'Moderate to high',
    soilType: 'Clay and sand',
    avgHomesAge: '40-50 years',
    floodRisk: 'Moderate',
    neighborhoods: ['Downtown', 'Doon', 'Forest Heights', 'Stanley Park'],
    uniqueChallenges: 'Grand River proximity, older homes, varied topography',
    avgRainfall: '916mm annually',
    frostLine: '1.2 meters'
  },
  'waterloo': {
    title: 'Waterproofing Waterloo | University Area Specialists',
    description: 'Basement waterproofing Waterloo. Student housing experts, quick service, reliable solutions.',
    cityName: 'Waterloo',
    population: '139,000',
    established: '1857',
    waterTable: 'High in some areas',
    soilType: 'Sand and clay',
    avgHomesAge: '30-40 years',
    floodRisk: 'Low to moderate',
    neighborhoods: ['Uptown', 'Lakeshore', 'Eastbridge', 'Columbia'],
    uniqueChallenges: 'University area, rental properties, varied housing types',
    avgRainfall: '916mm annually',
    frostLine: '1.2 meters'
  }
};

// Template for location pages
const generateLocationPage = (locationKey, data) => {
  return `---
import PageLayout from '../../layouts/PageLayout.astro';
import Hero from '../../components/sections/Hero.astro';
import Services from '../../components/sections/Services.astro';
import Features from '../../components/sections/Features.astro';
import Process from '../../components/sections/Process.astro';
import Testimonials from '../../components/sections/Testimonials.astro';
import FAQ from '../../components/sections/FAQ.astro';
import CTA from '../../components/sections/CTA.astro';
import Stats from '../../components/sections/Stats.astro';

const pageTitle = "${data.title}";
const pageDescription = "${data.description}";

// Local area information
const localInfo = {
  cityName: "${data.cityName}",
  population: "${data.population}",
  waterTable: "${data.waterTable}",
  soilType: "${data.soilType}",
  avgHomesAge: "${data.avgHomesAge}",
  floodRisk: "${data.floodRisk}",
  avgRainfall: "${data.avgRainfall}"
};

// Location-specific features
const locationFeatures = [
  {
    icon: '📍',
    title: 'Local ${data.cityName} Experts',
    description: 'Serving ${data.cityName} for over 25 years with deep knowledge of local conditions.',
    highlight: true
  },
  {
    icon: '🚨',
    title: 'Fast Response Time',
    description: '2-hour emergency response anywhere in ${data.cityName}. Available 24/7.',
    highlight: true
  },
  {
    icon: '🏘️',
    title: 'All Neighborhoods',
    description: 'Serving ${data.neighborhoods.slice(0, 3).join(", ")} and all ${data.cityName} areas.',
    highlight: true
  },
  {
    icon: '💧',
    title: 'Local Challenges',
    description: 'Expert solutions for ${data.uniqueChallenges}.'
  },
  {
    icon: '🏠',
    title: 'Home Age Expertise',
    description: 'Specialized in ${data.avgHomesAge} homes common in ${data.cityName}.'
  },
  {
    icon: '📊',
    title: 'Risk Assessment',
    description: 'Understanding ${data.cityName}\'s ${data.floodRisk} flood risk areas.'
  }
];

// Location-specific FAQs
const locationFAQs = [
  {
    question: "Do you serve all areas of ${data.cityName}?",
    answer: "Yes! We serve all ${data.cityName} neighborhoods including ${data.neighborhoods.join(", ")}. Our team can reach any location within ${data.cityName} quickly."
  },
  {
    question: "What are the common waterproofing issues in ${data.cityName}?",
    answer: "${data.cityName} faces unique challenges including ${data.uniqueChallenges}. With ${data.soilType} soil and ${data.waterTable} water table, proper waterproofing is essential."
  },
  {
    question: "How quickly can you respond to emergencies in ${data.cityName}?",
    answer: "We guarantee 2-hour emergency response anywhere in ${data.cityName}. Our local team is available 24/7 for flooding emergencies."
  },
  {
    question: "Do you understand ${data.cityName}'s building codes?",
    answer: "Absolutely. We're fully licensed and familiar with all ${data.cityName} building codes and permit requirements. We handle all necessary permits for you."
  }
];

// Schema markup for local business
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spaders Waterproofing ${data.cityName}",
  "description": "${data.description}",
  "telephone": "416-301-2344",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${data.cityName}",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "areaServed": {
    "@type": "City",
    "name": "${data.cityName}"
  }
};
---

<PageLayout 
  title={pageTitle}
  description={pageDescription}
>
  <!-- Location Hero -->
  <Hero 
    title="Waterproofing ${data.cityName}"
    subtitle="Professional basement waterproofing and foundation repair serving all ${data.cityName} neighborhoods. 25-year warranty, free inspection."
    primaryCTA={{ text: "Get Free ${data.cityName} Quote", href: "/free-inspection" }}
    secondaryCTA={{ text: "Call: 416-301-2344", href: "tel:416-301-2344" }}
    backgroundImage="/images/locations/${locationKey}-hero.jpg"
    badge="Serving ${data.cityName}"
  />

  <!-- Stats -->
  <Stats />

  <!-- Local Information Section -->
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Waterproofing Services in ${data.cityName}
        </h2>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
            ${data.cityName} homeowners face unique waterproofing challenges. With a population of ${data.population} and homes averaging ${data.avgHomesAge} old, 
            foundation issues are common. Our local team understands ${data.cityName}'s ${data.soilType} soil conditions and ${data.waterTable} water table.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ${data.cityName} Quick Facts
              </h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                <li>📊 Population: ${data.population}</li>
                <li>🏠 Average Home Age: ${data.avgHomesAge}</li>
                <li>💧 Annual Rainfall: ${data.avgRainfall}</li>
                <li>🌡️ Frost Line: ${data.frostLine}</li>
                <li>⚠️ Flood Risk: ${data.floodRisk}</li>
              </ul>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Why ${data.cityName} Needs Waterproofing
              </h3>
              <ul class="space-y-2 text-blue-800 dark:text-blue-200">
                <li>✓ ${data.soilType} soil expands when wet</li>
                <li>✓ ${data.waterTable} water table issues</li>
                <li>✓ ${data.avgRainfall} of annual rainfall</li>
                <li>✓ Freeze-thaw cycles damage foundations</li>
                <li>✓ ${data.floodRisk} flood risk areas</li>
              </ul>
            </div>
          </div>

          <h3 class="text-2xl font-bold mt-8 mb-4">Neighborhoods We Serve</h3>
          <p class="mb-4">
            Our ${data.cityName} waterproofing team serves all neighborhoods including:
          </p>
          <div class="flex flex-wrap gap-2">
            {${JSON.stringify(data.neighborhoods)}.map((neighborhood) => (
              <span class="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm">
                {neighborhood}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <Services />

  <!-- Location Features -->
  <Features 
    title="Why Choose Spaders in ${data.cityName}"
    subtitle="Local expertise combined with industry-leading warranties and service"
    features={locationFeatures}
    columns={3}
  />

  <!-- Process -->
  <Process />

  <!-- Testimonials -->
  <Testimonials />

  <!-- FAQ -->
  <FAQ 
    title="${data.cityName} Waterproofing FAQs"
    subtitle="Common questions from ${data.cityName} homeowners"
    faqs={locationFAQs}
    columns={1}
  />

  <!-- CTA -->
  <CTA 
    title="Protect Your ${data.cityName} Home Today"
    subtitle="Get a free inspection and quote from ${data.cityName}'s trusted waterproofing experts."
    primaryCTA={{ text: "Schedule ${data.cityName} Inspection", href: "/free-inspection" }}
    secondaryCTA={{ text: "Call: 416-301-2344", href: "tel:416-301-2344" }}
    background="gradient"
  />
</PageLayout>

<script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)}></script>`;
};

// Main migration function
async function migrateLocationPages() {
  console.log('🚀 SuperClaude Location Page Migration Starting...\n');
  
  const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');
  let successCount = 0;
  let errorCount = 0;
  
  for (const [locationKey, locationData] of Object.entries(locationPages)) {
    const fileName = `${locationKey}.astro`;
    const filePath = path.join(locationsDir, fileName);
    
    try {
      // Backup existing file
      const backupPath = path.join(locationsDir, `backup-${fileName}`);
      const exists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (exists) {
        await fs.copyFile(filePath, backupPath);
        console.log(`📦 Backed up: ${fileName}`);
      }
      
      // Generate new content
      const newContent = generateLocationPage(locationKey, locationData);
      
      // Write new file
      await fs.writeFile(filePath, newContent);
      console.log(`✅ Migrated: ${fileName}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error migrating ${fileName}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Migration Complete!`);
  console.log(`✅ Success: ${successCount} pages`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} pages`);
  }
  console.log('='.repeat(50));
  
  console.log('\n📋 Next Steps:');
  console.log('1. Run: npm run build');
  console.log('2. Test pages locally: npm run dev');
  console.log('3. Check all location pages');
  console.log('4. Deploy to production');
}

// Run migration
migrateLocationPages().catch(console.error);