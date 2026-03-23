import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all neighborhoods that need pages
const neighborhoods = {
  'Toronto Core': [
    {
      name: 'Distillery District',
      avgHomeAge: '20-150 years',
      foundationType: 'Mixed (Modern & Historic)',
      soilType: 'Fill & Clay',
      waterTable: 'High',
      floodRisk: 'Moderate',
      avgProjectCost: '$10,000-$20,000',
      responseTime: '15-20 minutes',
      features: [
        { title: 'HERITAGE BUILDING EXPERTS', description: 'Specialized in converted industrial buildings and lofts.', highlight: true },
        { title: 'WATERFRONT PROXIMITY', description: 'Solutions for high water table near Lake Ontario.', highlight: true },
        { title: 'MODERN CONDO UNITS', description: 'Experience with both historic and modern construction.', highlight: true },
        { title: 'COMMERCIAL GRADE', description: 'Industrial-strength waterproofing systems.' },
        { title: 'RAPID DOWNTOWN RESPONSE', description: 'Quick access from Gardiner and DVP.' },
        { title: 'UNDERGROUND PARKING', description: 'Protect parking garages from water infiltration.' }
      ],
      challenges: [
        { problem: 'HIGH WATER TABLE', description: 'Proximity to Lake Ontario creates constant moisture pressure', solution: 'High-capacity drainage and dual sump pump systems' },
        { problem: 'HISTORIC CONVERSIONS', description: 'Old industrial buildings have unique foundation challenges', solution: 'Custom waterproofing for brick and timber structures' },
        { problem: 'UNDERGROUND PARKING', description: 'Multi-level parking susceptible to water infiltration', solution: 'Membrane systems and concrete sealants' }
      ],
      streets: ['Mill Street', 'Trinity Street', 'Cherry Street', 'Tank House Lane', 'Distillery Lane', 'Case Goods Lane', 'Gristmill Lane']
    },
    {
      name: 'Regent Park',
      avgHomeAge: '10-60 years',
      foundationType: 'Concrete Block',
      soilType: 'Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low-Moderate',
      avgProjectCost: '$6,000-$12,000',
      responseTime: '15-20 minutes',
      features: [
        { title: 'REVITALIZATION AREA', description: 'Experience with new and renovated properties.', highlight: true },
        { title: 'AFFORDABLE SOLUTIONS', description: 'Cost-effective waterproofing for all budgets.', highlight: true },
        { title: 'COMMUNITY FOCUSED', description: 'Working with TCHC and private homeowners.', highlight: true },
        { title: 'MIXED HOUSING', description: 'Townhouses, condos, and single-family homes.' },
        { title: 'RAPID RESPONSE', description: 'Central location for quick emergency service.' },
        { title: 'PREVENTIVE PROGRAMS', description: 'Maintenance plans for property managers.' }
      ],
      challenges: [
        { problem: 'VARYING CONSTRUCTION', description: 'Mix of old and new buildings with different standards', solution: 'Customized approach for each building type' },
        { problem: 'DENSE DEVELOPMENT', description: 'Close proximity affects drainage patterns', solution: 'Comprehensive neighborhood drainage solutions' },
        { problem: 'CLAY SOIL', description: 'Heavy clay causes foundation shifting', solution: 'Foundation stabilization and flexible waterproofing' }
      ],
      streets: ['Dundas Street East', 'Parliament Street', 'River Street', 'Gerrard Street', 'Sackville Street', 'Sumach Street', 'Oak Street']
    },
    {
      name: 'Leslieville',
      avgHomeAge: '80-100 years',
      foundationType: 'Brick & Block',
      soilType: 'Sandy Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$7,000-$14,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'VICTORIAN ROW HOUSES', description: 'Experts in attached home waterproofing.', highlight: true },
        { title: 'FAMILY NEIGHBORHOOD', description: 'Child-safe, low-disruption methods.', highlight: true },
        { title: 'TRENDY AREA SPECIALISTS', description: 'Preserve property values with quality work.', highlight: true },
        { title: 'NARROW LOT EXPERTS', description: 'Solutions for limited access properties.' },
        { title: 'BASEMENT CONVERSIONS', description: 'Waterproof for rental suite creation.' },
        { title: 'GREEN SOLUTIONS', description: 'Eco-friendly waterproofing options.' }
      ],
      challenges: [
        { problem: 'SHARED WALLS', description: 'Row houses require coordinated waterproofing', solution: 'Interior systems that protect without affecting neighbors' },
        { problem: 'NARROW LOTS', description: 'Limited space for exterior excavation', solution: 'Interior waterproofing and injection methods' },
        { problem: 'AGING INFRASTRUCTURE', description: 'Century-old drainage systems failing', solution: 'Modern drainage upgrades and sump pumps' }
      ],
      streets: ['Queen Street East', 'Dundas Street East', 'Gerrard Street', 'Eastern Avenue', 'Carlaw Avenue', 'Logan Avenue', 'Jones Avenue']
    }
  ],
  'East Toronto': [
    {
      name: 'East York',
      avgHomeAge: '50-70 years',
      foundationType: 'Concrete Block',
      soilType: 'Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low-Moderate',
      avgProjectCost: '$6,000-$12,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'POST-WAR HOME EXPERTS', description: 'Specialized in 1950s-60s bungalows.', highlight: true },
        { title: 'LARGE COVERAGE AREA', description: 'Serving all of former East York borough.', highlight: true },
        { title: 'FAMILY COMMUNITY', description: 'Respectful, clean work for family neighborhoods.', highlight: true },
        { title: 'BUNGALOW SPECIALISTS', description: 'Expert with single-story home challenges.' },
        { title: 'FULL BASEMENTS', description: 'Convert basements to living space.' },
        { title: 'SENIOR FRIENDLY', description: 'Patient service for elderly homeowners.' }
      ],
      challenges: [
        { problem: 'CLAY SOIL EXPANSION', description: 'Heavy clay causes seasonal foundation movement', solution: 'Flexible waterproofing membranes and proper grading' },
        { problem: 'AGING WEEPING TILES', description: '50+ year old drainage systems failing', solution: 'Complete perimeter drainage replacement' },
        { problem: 'FLAT LOT DRAINAGE', description: 'Poor natural drainage on level properties', solution: 'Engineered drainage and grading solutions' }
      ],
      streets: ['Cosburn Avenue', 'Pape Avenue', 'Donlands Avenue', 'Woodbine Avenue', 'O\'Connor Drive', 'Coxwell Avenue', 'Mortimer Avenue']
    },
    {
      name: 'Danforth',
      avgHomeAge: '70-90 years',
      foundationType: 'Brick & Block',
      soilType: 'Clay Mix',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$7,000-$13,000',
      responseTime: '15-20 minutes',
      features: [
        { title: 'GREEKTOWN SPECIALISTS', description: 'Serving the Danforth community for 20+ years.', highlight: true },
        { title: 'COMMERCIAL & RESIDENTIAL', description: 'Protect shops and homes along Danforth.', highlight: true },
        { title: 'MULTI-UNIT EXPERTS', description: 'Experience with apartments above shops.', highlight: true },
        { title: 'QUICK ACCESS', description: 'Easy access from Danforth Avenue.' },
        { title: 'WEEKEND SERVICE', description: 'Available when shops are closed.' },
        { title: 'BUSINESS CONTINUITY', description: 'Minimize disruption to commerce.' }
      ],
      challenges: [
        { problem: 'MIXED USE BUILDINGS', description: 'Commercial below, residential above creates unique issues', solution: 'Integrated waterproofing for mixed-use structures' },
        { problem: 'VIBRATION DAMAGE', description: 'Subway and traffic vibrations crack foundations', solution: 'Flexible crack injection and vibration dampening' },
        { problem: 'LIMITED ACCESS', description: 'Busy commercial area restricts work space', solution: 'Interior solutions and night/weekend work' }
      ],
      streets: ['Danforth Avenue', 'Broadview Avenue', 'Chester Avenue', 'Pape Avenue', 'Greenwood Avenue', 'Monarch Park', 'Bowden Street']
    },
    {
      name: 'Riverdale',
      avgHomeAge: '90-110 years',
      foundationType: 'Stone & Brick',
      soilType: 'Clay & Sand',
      waterTable: 'Variable',
      floodRisk: 'Moderate',
      avgProjectCost: '$8,000-$15,000',
      responseTime: '15-20 minutes',
      features: [
        { title: 'HISTORIC HOME EXPERTS', description: 'Preserve character while waterproofing.', highlight: true },
        { title: 'SLOPE SPECIALISTS', description: 'Solutions for homes on Riverdale hills.', highlight: true },
        { title: 'PARK PROXIMITY', description: 'Handle runoff from Riverdale Park.', highlight: true },
        { title: 'VICTORIAN SPECIALISTS', description: 'Expert with century homes.' },
        { title: 'ARTISTIC COMMUNITY', description: 'Respectful of neighborhood character.' },
        { title: 'DON VALLEY KNOWLEDGE', description: 'Understand valley moisture patterns.' }
      ],
      challenges: [
        { problem: 'HILLSIDE DRAINAGE', description: 'Slopes direct water toward foundations', solution: 'French drains and regrading to divert water' },
        { problem: 'DON VALLEY MOISTURE', description: 'Valley location increases humidity and water table', solution: 'Enhanced ventilation and moisture barriers' },
        { problem: 'CENTURY-OLD FOUNDATIONS', description: 'Original stone foundations deteriorating', solution: 'Stone repointing and modern membrane application' }
      ],
      streets: ['Broadview Avenue', 'Langley Avenue', 'Withrow Avenue', 'Simpson Avenue', 'Victor Avenue', 'Bain Avenue', 'Howland Avenue']
    }
  ],
  'North Toronto': [
    {
      name: 'Willowdale',
      avgHomeAge: '30-60 years',
      foundationType: 'Poured Concrete',
      soilType: 'Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$8,000-$15,000',
      responseTime: '25-30 minutes',
      features: [
        { title: 'MODERN HOME EXPERTS', description: 'Specialized in newer construction methods.', highlight: true },
        { title: 'CONDO TOWNHOUSE PRO', description: 'Experience with strata properties.', highlight: true },
        { title: 'TECH-SAVVY SERVICE', description: 'Digital quotes and progress tracking.', highlight: true },
        { title: 'LARGE PROPERTIES', description: 'Equipment for bigger homes.' },
        { title: 'POOL INTEGRATION', description: 'Coordinate with pool systems.' },
        { title: 'SMART HOME READY', description: 'IoT water detection systems.' }
      ],
      challenges: [
        { problem: 'HIGH DENSITY DEVELOPMENT', description: 'New condos affecting drainage patterns', solution: 'Comprehensive water management systems' },
        { problem: 'DEEP BASEMENTS', description: 'Modern homes with deep foundations', solution: 'Multi-level drainage and waterproofing' },
        { problem: 'POOL COMPLICATIONS', description: 'Swimming pools affecting water table', solution: 'Integrated pool and foundation drainage' }
      ],
      streets: ['Yonge Street', 'Bayview Avenue', 'Sheppard Avenue', 'Finch Avenue', 'Empress Avenue', 'Doris Avenue', 'Beecroft Road']
    },
    {
      name: 'Yorkville',
      avgHomeAge: '50-150 years',
      foundationType: 'Mixed',
      soilType: 'Variable',
      waterTable: 'Low-Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$15,000-$30,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'LUXURY HOME EXPERTS', description: 'Premium waterproofing for high-end properties.', highlight: true },
        { title: 'DISCRETE SERVICE', description: 'Minimal disruption to upscale neighborhood.', highlight: true },
        { title: 'HERITAGE SPECIALISTS', description: 'Preserve historic Yorkville properties.', highlight: true },
        { title: 'CUSTOM SOLUTIONS', description: 'Tailored to unique architecture.' },
        { title: 'WHITE GLOVE SERVICE', description: 'Premium customer experience.' },
        { title: 'WARRANTY PLUS', description: 'Extended warranties available.' }
      ],
      challenges: [
        { problem: 'LUXURY FINISHES', description: 'Protecting high-value interior improvements', solution: 'Non-invasive waterproofing methods' },
        { problem: 'HISTORIC PRESERVATION', description: 'Maintaining heritage property requirements', solution: 'Sympathetic restoration techniques' },
        { problem: 'LIMITED DISRUPTION', description: 'High-profile area requires discrete work', solution: 'Quiet equipment and clean job sites' }
      ],
      streets: ['Yorkville Avenue', 'Cumberland Street', 'Bloor Street', 'Avenue Road', 'Bay Street', 'Hazelton Avenue', 'Scollard Street']
    },
    {
      name: 'Rosedale',
      avgHomeAge: '80-120 years',
      foundationType: 'Stone & Brick',
      soilType: 'Clay & Ravine',
      waterTable: 'Variable',
      floodRisk: 'Low-Moderate',
      avgProjectCost: '$15,000-$35,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'ESTATE HOME EXPERTS', description: 'Large property waterproofing specialists.', highlight: true },
        { title: 'RAVINE SPECIALISTS', description: 'Handle unique ravine lot challenges.', highlight: true },
        { title: 'PREMIUM SERVICE', description: 'White-glove treatment for luxury homes.', highlight: true },
        { title: 'HISTORIC MANSIONS', description: 'Preserve architectural heritage.' },
        { title: 'LANDSCAPE PROTECTION', description: 'Minimal impact on gardens.' },
        { title: 'COMPREHENSIVE WARRANTY', description: 'Extended protection plans.' }
      ],
      challenges: [
        { problem: 'RAVINE WATER FLOW', description: 'Natural water courses through properties', solution: 'Engineered drainage to work with topography' },
        { problem: 'LARGE FOUNDATIONS', description: 'Extensive perimeters require comprehensive solutions', solution: 'Sectioned waterproofing with multiple systems' },
        { problem: 'HERITAGE REQUIREMENTS', description: 'Historic designation limits exterior changes', solution: 'Interior waterproofing with minimal visual impact' }
      ],
      streets: ['Rosedale Valley Road', 'Park Road', 'Cluny Drive', 'Highland Avenue', 'Elm Avenue', 'Binscarth Road', 'Glen Road']
    },
    {
      name: 'Forest Hill',
      avgHomeAge: '60-90 years',
      foundationType: 'Brick & Stone',
      soilType: 'Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$12,000-$30,000',
      responseTime: '25-30 minutes',
      features: [
        { title: 'LUXURY SPECIALISTS', description: 'Premium service for upscale homes.', highlight: true },
        { title: 'LARGE HOME EXPERTS', description: 'Equipment for substantial properties.', highlight: true },
        { title: 'DISCRETE OPERATIONS', description: 'Respectful of exclusive neighborhood.', highlight: true },
        { title: 'CUSTOM SOLUTIONS', description: 'Tailored to unique needs.' },
        { title: 'WINE CELLAR PROTECTION', description: 'Specialized humidity control.' },
        { title: 'FULL SERVICE', description: 'Complete property water management.' }
      ],
      challenges: [
        { problem: 'MATURE TREES', description: 'Large trees cause root damage and block drainage', solution: 'Root barriers and specialized drainage systems' },
        { problem: 'DEEP BASEMENTS', description: 'Wine cellars and rec rooms below grade', solution: 'Multi-layer waterproofing with climate control' },
        { problem: 'SLOPED LOTS', description: 'Hillside properties with drainage challenges', solution: 'Terraced drainage and retaining wall integration' }
      ],
      streets: ['Spadina Road', 'Forest Hill Road', 'Old Forest Hill Road', 'Dunvegan Road', 'Russell Hill Road', 'Warren Road', 'Elderwood Drive']
    }
  ],
  'West Toronto': [
    {
      name: 'High Park',
      avgHomeAge: '70-100 years',
      foundationType: 'Brick & Block',
      soilType: 'Sandy Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low-Moderate',
      avgProjectCost: '$8,000-$15,000',
      responseTime: '25-30 minutes',
      features: [
        { title: 'PARK PROXIMITY EXPERTS', description: 'Handle runoff from High Park area.', highlight: true },
        { title: 'HERITAGE HOME PROS', description: 'Preserve character homes near park.', highlight: true },
        { title: 'FAMILY FOCUSED', description: 'Safe solutions for family neighborhood.', highlight: true },
        { title: 'SLOPE MANAGEMENT', description: 'Solutions for hillside properties.' },
        { title: 'TREE ROOT EXPERTS', description: 'Deal with mature tree damage.' },
        { title: 'SEASONAL PREPARATION', description: 'Spring flood prevention programs.' }
      ],
      challenges: [
        { problem: 'PARK WATER RUNOFF', description: 'High Park slopes direct water to nearby homes', solution: 'Advanced drainage systems and barriers' },
        { problem: 'MATURE TREE ROOTS', description: 'Old growth trees damage foundations', solution: 'Root barriers and foundation reinforcement' },
        { problem: 'SPRING POND OVERFLOW', description: 'Grenadier Pond affects local water table', solution: 'Enhanced pumping during spring melt' }
      ],
      streets: ['Bloor Street West', 'Roncesvalles Avenue', 'Parkside Drive', 'Keele Street', 'High Park Avenue', 'Gothic Avenue', 'Indian Road']
    },
    {
      name: 'Parkdale',
      avgHomeAge: '90-120 years',
      foundationType: 'Brick & Stone',
      soilType: 'Sandy',
      waterTable: 'High',
      floodRisk: 'Moderate',
      avgProjectCost: '$7,000-$14,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'VICTORIAN SPECIALISTS', description: 'Expert with grand old Parkdale homes.', highlight: true },
        { title: 'LAKE PROXIMITY PROS', description: 'Handle high water table near lake.', highlight: true },
        { title: 'MULTI-UNIT EXPERTS', description: 'Converted mansions and apartments.', highlight: true },
        { title: 'AFFORDABLE OPTIONS', description: 'Solutions for every budget.' },
        { title: 'RAPID RESPONSE', description: 'Quick access from Gardiner.' },
        { title: 'COMMUNITY MINDED', description: 'Support local initiatives.' }
      ],
      challenges: [
        { problem: 'LAKE PROXIMITY', description: 'High water table from Lake Ontario', solution: 'Heavy-duty sump pumps and drainage' },
        { problem: 'CONVERTED BUILDINGS', description: 'Multi-unit conversions have complex needs', solution: 'Comprehensive building-wide solutions' },
        { problem: 'AGING INFRASTRUCTURE', description: 'Century-old sewers and water mains', solution: 'Backflow prevention and modern drainage' }
      ],
      streets: ['Queen Street West', 'King Street West', 'Jameson Avenue', 'Dowling Avenue', 'Dufferin Street', 'Lansdowne Avenue', 'Close Avenue']
    },
    {
      name: 'The Junction',
      avgHomeAge: '80-100 years',
      foundationType: 'Brick & Block',
      soilType: 'Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$7,000-$13,000',
      responseTime: '25-30 minutes',
      features: [
        { title: 'INDUSTRIAL HERITAGE', description: 'Experience with converted industrial buildings.', highlight: true },
        { title: 'ARTIST LOFT EXPERTS', description: 'Waterproof creative spaces properly.', highlight: true },
        { title: 'TRENDY AREA PROS', description: 'Modern solutions for hip neighborhood.', highlight: true },
        { title: 'MIXED USE BUILDINGS', description: 'Residential and commercial expertise.' },
        { title: 'RAILWAY KNOWLEDGE', description: 'Handle vibration-related issues.' },
        { title: 'CREATIVE SOLUTIONS', description: 'Work with unique conversions.' }
      ],
      challenges: [
        { problem: 'RAILWAY VIBRATIONS', description: 'Train traffic causes foundation cracks', solution: 'Flexible waterproofing and crack monitoring' },
        { problem: 'INDUSTRIAL CONVERSIONS', description: 'Old factories have unique foundation issues', solution: 'Custom solutions for industrial structures' },
        { problem: 'MIXED DEVELOPMENT', description: 'New condos affecting area drainage', solution: 'Adaptive drainage for changing conditions' }
      ],
      streets: ['Dundas Street West', 'Keele Street', 'Annette Street', 'Pacific Avenue', 'Indian Grove', 'High Park Avenue', 'Quebec Avenue']
    },
    {
      name: 'Roncesvalles',
      avgHomeAge: '80-100 years',
      foundationType: 'Brick & Block',
      soilType: 'Sandy Clay',
      waterTable: 'Moderate',
      floodRisk: 'Low',
      avgProjectCost: '$8,000-$14,000',
      responseTime: '20-25 minutes',
      features: [
        { title: 'POLISH QUARTER EXPERTS', description: 'Serving Roncesvalles for 25+ years.', highlight: true },
        { title: 'FAMILY HOMES FOCUS', description: 'Child-safe waterproofing methods.', highlight: true },
        { title: 'ROW HOUSE SPECIALISTS', description: 'Attached home waterproofing pros.', highlight: true },
        { title: 'STREETCAR KNOWLEDGE', description: 'Handle vibration issues from TTC.' },
        { title: 'GARDEN PROTECTION', description: 'Preserve landscaping during work.' },
        { title: 'COMMUNITY PRESENCE', description: 'Trusted local contractors.' }
      ],
      challenges: [
        { problem: 'STREETCAR VIBRATIONS', description: 'TTC traffic causes foundation stress', solution: 'Vibration-resistant waterproofing systems' },
        { problem: 'SHARED FOUNDATIONS', description: 'Row houses require coordinated solutions', solution: 'Individual unit protection without affecting neighbors' },
        { problem: 'NARROW LOTS', description: 'Limited space for exterior work', solution: 'Interior waterproofing and injection methods' }
      ],
      streets: ['Roncesvalles Avenue', 'Dundas Street West', 'Howard Park Avenue', 'Sorauren Avenue', 'Wright Avenue', 'Fern Avenue', 'Geoffrey Street']
    }
  ]
};

// Template for generating neighborhood pages
function generateNeighborhoodPage(neighborhood, category) {
  const fileName = neighborhood.name.toLowerCase().replace(/\s+/g, '-');
  
  return `---
import PageLayout from '../../layouts/PageLayout.astro';
import Hero from '../../components/sections/Hero.astro';
import Services from '../../components/sections/Services.astro';
import Process from '../../components/sections/Process.astro';
import Testimonials from '../../components/sections/Testimonials.astro';
import Stats from '../../components/sections/Stats.astro';

const pageTitle = "${neighborhood.name} Waterproofing | Basement & Foundation Solutions";
const pageDescription = "Expert waterproofing services in ${neighborhood.name} Toronto. ${neighborhood.foundationType.toLowerCase()} foundation specialists, 24/7 emergency response.";

// Local area information
const localInfo = {
  neighborhoodName: "${neighborhood.name}",
  cityName: "Toronto",
  avgHomeAge: "${neighborhood.avgHomeAge}",
  foundationType: "${neighborhood.foundationType}",
  soilType: "${neighborhood.soilType}",
  waterTable: "${neighborhood.waterTable}",
  floodRisk: "${neighborhood.floodRisk}",
  avgProjectCost: "${neighborhood.avgProjectCost}",
  responseTime: "${neighborhood.responseTime}"
};

// Neighborhood-specific features
const neighborhoodFeatures = ${JSON.stringify(neighborhood.features, null, 2).replace(/"([^"]+)":/g, '$1:')};

// Local challenges specific to neighborhood
const localChallenges = ${JSON.stringify(neighborhood.challenges, null, 2).replace(/"([^"]+)":/g, '$1:')};

// Neighborhood-specific FAQs
const neighborhoodFAQs = [
  {
    question: "Do you service all of ${neighborhood.name}?",
    answer: "Yes! We provide comprehensive waterproofing services throughout ${neighborhood.name}, with ${neighborhood.responseTime} emergency response times. Our team knows every street and the unique challenges of ${neighborhood.name} homes."
  },
  {
    question: "What are common water issues in ${neighborhood.name}?",
    answer: "${neighborhood.name} homes, typically ${neighborhood.avgHomeAge} old with ${neighborhood.foundationType.toLowerCase()} foundations, face challenges from ${neighborhood.soilType.toLowerCase()} soil and ${neighborhood.waterTable.toLowerCase()} water table levels. The area has a ${neighborhood.floodRisk.toLowerCase()} flood risk."
  },
  {
    question: "How much does waterproofing cost in ${neighborhood.name}?",
    answer: "Typical waterproofing projects in ${neighborhood.name} range from ${neighborhood.avgProjectCost}, depending on the extent of work needed. We provide free inspections and detailed quotes."
  },
  {
    question: "How quickly can you respond to emergencies in ${neighborhood.name}?",
    answer: "We guarantee ${neighborhood.responseTime} emergency response anywhere in ${neighborhood.name}. Our team is available 24/7 for flooding emergencies."
  }
];

// Schema markup for local business
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Spaders Waterproofing ${neighborhood.name}",
  "description": "Expert waterproofing services in ${neighborhood.name} Toronto. ${neighborhood.foundationType} foundation specialists.",
  "telephone": "416-301-2344",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${neighborhood.name}",
    "addressRegion": "Toronto",
    "addressCountry": "CA"
  },
  "areaServed": {
    "@type": "Place",
    "name": "${neighborhood.name}, Toronto"
  }
};
---

<PageLayout 
  title={pageTitle}
  description={pageDescription}
>
  <!-- Neighborhood Hero -->
  <Hero 
    title="Waterproofing ${neighborhood.name}"
    subtitle="Expert basement waterproofing and foundation repair for ${neighborhood.name} homes. ${neighborhood.avgHomeAge} home specialists, 24/7 emergency service."
    primaryCTA={{ text: "Get Free ${neighborhood.name} Inspection", href: "/free-inspection" }}
    secondaryCTA={{ text: "Call: 416-301-2344", href: "tel:416-301-2344" }}
    backgroundImage="/images/dryspace_hero_desktop.webp"
    badge="Serving ${neighborhood.name}"
  />

  <!-- Stats -->
  <Stats />

  <!-- Local Information Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-900 mb-4 uppercase">WATERPROOFING SERVICES IN ${neighborhood.name.toUpperCase()}</h2>
        
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 mb-6">
            ${neighborhood.name}'s homes, typically {localInfo.avgHomeAge} old with {localInfo.foundationType} foundations, 
            require specialized waterproofing expertise. Our team understands the unique challenges of {localInfo.soilType} soil 
            and {localInfo.waterTable} water table conditions in this ${category} neighborhood.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="bg-white border-2 border-gray-300 p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-6 uppercase">${neighborhood.name.toUpperCase()} QUICK FACTS</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span class="text-sm font-semibold text-gray-700 uppercase">Average Home Age</span>
                  <span class="text-sm font-bold text-gray-900">{localInfo.avgHomeAge.toUpperCase()}</span>
                </li>
                <li class="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span class="text-sm font-semibold text-gray-700 uppercase">Foundation Type</span>
                  <span class="text-sm font-bold text-gray-900">{localInfo.foundationType.toUpperCase()}</span>
                </li>
                <li class="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span class="text-sm font-semibold text-gray-700 uppercase">Soil Type</span>
                  <span class="text-sm font-bold text-gray-900">{localInfo.soilType.toUpperCase()}</span>
                </li>
                <li class="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span class="text-sm font-semibold text-gray-700 uppercase">Response Time</span>
                  <span class="text-sm font-bold text-gray-900">{localInfo.responseTime.toUpperCase()}</span>
                </li>
                <li class="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span class="text-sm font-semibold text-gray-700 uppercase">Average Cost</span>
                  <span class="text-sm font-bold text-gray-900">{localInfo.avgProjectCost}</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-gray-900 border-2 border-gray-300 p-6">
              <h3 class="text-xl font-bold text-white mb-6 uppercase">${neighborhood.name.toUpperCase()} CHALLENGES</h3>
              <ul class="space-y-2 text-gray-300">
                ${neighborhood.challenges.map(c => `<li class="text-sm text-gray-300 flex items-start">
                  <span class="mr-2 text-yellow-500">•</span>
                  <span>${c.description}</span>
                </li>`).join('\n                ')}
              </ul>
            </div>
          </div>

          <h3 class="text-2xl font-bold mt-8 mb-4 uppercase">STREETS WE SERVE IN ${neighborhood.name.toUpperCase()}</h3>
          <p class="mb-4">
            Our team provides rapid response throughout ${neighborhood.name}:
          </p>
          <div class="flex flex-wrap gap-2">
            {${JSON.stringify(neighborhood.streets)}.map((street) => (
              <span class="border-2 border-gray-300 px-4 py-2 text-sm uppercase">
                {street}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <Services />

  <!-- Neighborhood Features -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4 uppercase">WHY CHOOSE SPADERS IN ${neighborhood.name.toUpperCase()}</h2>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto">
          Specialized expertise for ${neighborhood.name} homes and properties
        </p>
      </div>
      
      <!-- Highlighted Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {neighborhoodFeatures.filter(f => f.highlight).map((feature) => (
          <div class="bg-yellow-500 border-2 border-gray-900 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3 uppercase">{feature.title}</h3>
            <p class="text-sm text-gray-900">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <!-- Regular Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {neighborhoodFeatures.filter(f => !f.highlight).map((feature) => (
          <div class="bg-white border-2 border-gray-300 p-6 hover:border-gray-400 transition-colors">
            <h3 class="text-lg font-bold text-gray-900 mb-3 uppercase">{feature.title}</h3>
            <p class="text-sm text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Local Challenges Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center uppercase">${neighborhood.name.toUpperCase()} WATER CHALLENGES</h2>
      
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {localChallenges.map((challenge) => (
          <div class="bg-white border-2 border-gray-300 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3 uppercase">{challenge.problem}</h3>
            <p class="text-sm text-gray-700 mb-4">{challenge.description}</p>
            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm font-semibold text-gray-900 uppercase mb-1">OUR SOLUTION:</p>
              <p class="text-sm text-gray-700">{challenge.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Process -->
  <Process />

  <!-- Testimonials -->
  <Testimonials />

  <!-- FAQ Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4 uppercase">${neighborhood.name.toUpperCase()} WATERPROOFING FAQS</h2>
        <p class="text-lg text-gray-700">Common questions from ${neighborhood.name} homeowners</p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        {neighborhoodFAQs.map((faq, index) => (
          <details class="mb-4 border-2 border-gray-300 bg-white">
            <summary class="cursor-pointer p-6 hover:bg-gray-50 transition-colors">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-900 uppercase pr-4">{faq.question}</h3>
                <span class="text-gray-400 flex-shrink-0 text-2xl">+</span>
              </div>
            </summary>
            <div class="px-6 pb-6 pt-0">
              <p class="text-gray-700">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-white mb-4 uppercase">PROTECT YOUR ${neighborhood.name.toUpperCase()} HOME TODAY</h2>
        <p class="text-lg text-gray-300 mb-8">
          Expert waterproofing for ${neighborhood.avgHomeAge} homes in ${neighborhood.name}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/free-inspection"
            class="bg-yellow-500 text-black px-8 py-4 text-lg font-bold hover:bg-yellow-400 transition-colors uppercase"
          >
            Schedule ${neighborhood.name} Inspection
          </a>
          <a 
            href="tel:416-301-2344"
            class="border-2 border-white text-white px-8 py-4 text-lg font-bold hover:bg-white hover:text-black transition-colors uppercase"
          >
            Call: 416-301-2344
          </a>
        </div>
        
        <div class="mt-8 inline-flex items-center text-yellow-500">
          <span class="text-sm font-bold uppercase">24/7 Emergency Service Available</span>
        </div>
      </div>
    </div>
  </section>
</PageLayout>

<script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)}></script>`;
}

// Create all neighborhood pages
let created = 0;
let skipped = 0;

for (const [category, neighborhoodList] of Object.entries(neighborhoods)) {
  console.log(`\nProcessing ${category}:`);
  
  for (const neighborhood of neighborhoodList) {
    const fileName = neighborhood.name.toLowerCase().replace(/\s+/g, '-') + '.astro';
    const filePath = path.join(__dirname, '..', 'src', 'pages', 'neighborhoods', fileName);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  ${fileName} already exists`);
      skipped++;
      continue;
    }
    
    // Generate and write the page
    const content = generateNeighborhoodPage(neighborhood, category);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${fileName}`);
    created++;
  }
}

console.log(`\n✨ Neighborhood page generation complete!`);
console.log(`   Created: ${created} new pages`);
console.log(`   Skipped: ${skipped} existing pages`);
console.log(`   Total: ${created + skipped} neighborhood pages`);