#!/usr/bin/env node

/**
 * SuperClaude Service Page Migration Script
 * Migrates all service pages to use the new PageLayout and modern components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Service page data with SEO-optimized content
const servicePages = {
  'exterior-waterproofing': {
    title: 'Exterior Waterproofing Toronto | Complete Foundation Protection',
    description: 'Professional exterior waterproofing in Toronto & GTA. 25-year warranty, excavation to foundation, membrane installation. Get $3,400 in rebates.',
    heroTitle: 'Exterior Waterproofing Toronto',
    heroSubtitle: 'Complete foundation protection with 25-year warranty. Excavation, membrane installation, and drainage systems.',
    badge: '$3,400 Rebate Available',
    primaryBenefit: '99% Effective Protection',
    cost: '$200-350/linear ft'
  },
  'interior-waterproofing': {
    title: 'Interior Waterproofing Toronto | Basement Drainage Systems',
    description: 'Interior basement waterproofing in Toronto. French drains, vapor barriers, sump pumps. Affordable solution starting at $3,000.',
    heroTitle: 'Interior Waterproofing Solutions',
    heroSubtitle: 'Manage water inside your basement with drainage systems and sump pumps. Quick installation, minimal disruption.',
    badge: 'Install in 1-2 Days',
    primaryBenefit: 'Affordable & Effective',
    cost: '$3,000-7,000'
  },
  'foundation-repair': {
    title: 'Foundation Repair Toronto | Cracks, Settlement, Structural',
    description: 'Expert foundation repair in Toronto. Fix cracks, settlement, bowing walls. 24/7 emergency service. Free inspection.',
    heroTitle: 'Foundation Repair Experts',
    heroSubtitle: 'Structural repairs for cracks, settlement, and bowing walls. Licensed engineers, permanent solutions.',
    badge: '24/7 Emergency Service',
    primaryBenefit: 'Structural Integrity Restored',
    cost: '$500-15,000'
  },
  'sump-pump-installation': {
    title: 'Sump Pump Installation Toronto | Battery Backup Systems',
    description: 'Professional sump pump installation in Toronto. Triple pump systems with battery backup. Never worry about flooding again.',
    heroTitle: 'Sump Pump Installation',
    heroSubtitle: 'Triple protection with primary, backup, and battery pumps. Professional installation with warranty.',
    badge: 'Power Outage Protection',
    primaryBenefit: 'Never Flood Again',
    cost: '$2,000-4,500'
  },
  'foundation-crack-repair': {
    title: 'Foundation Crack Repair Toronto | Injection & Sealing',
    description: 'Fix foundation cracks permanently. Polyurethane injection, epoxy repair, exterior sealing. Same-day service available.',
    heroTitle: 'Foundation Crack Repair',
    heroSubtitle: 'Permanent crack injection and sealing. Stop water infiltration with guaranteed repairs.',
    badge: 'Same Day Service',
    primaryBenefit: 'Permanent Crack Sealing',
    cost: '$500-2,000'
  },
  'interior-drainage-systems': {
    title: 'French Drain Installation Toronto | Interior Drainage',
    description: 'French drain and weeping tile installation in Toronto. Interior perimeter drainage systems. Lifetime warranty.',
    heroTitle: 'Interior Drainage Systems',
    heroSubtitle: 'French drains and weeping tile for complete water management. Captures and redirects water away.',
    badge: 'Lifetime Warranty',
    primaryBenefit: 'Complete Water Control',
    cost: '$5,000-12,000'
  },
  'weeping-tile': {
    title: 'Weeping Tile Installation Toronto | Drainage Solutions',
    description: 'Weeping tile replacement and installation. Interior and exterior drainage systems. Government rebates available.',
    heroTitle: 'Weeping Tile Systems',
    heroSubtitle: 'Professional weeping tile installation and replacement. Modern drainage for older homes.',
    badge: 'Rebates Available',
    primaryBenefit: 'Foundation Drainage',
    cost: '$8,000-15,000'
  },
  'emergency-waterproofing': {
    title: '24/7 Emergency Waterproofing Toronto | Immediate Response',
    description: 'Emergency basement flooding service in Toronto. 24/7 response, water extraction, temporary repairs. Call 416-301-2344.',
    heroTitle: '24/7 Emergency Waterproofing',
    heroSubtitle: 'Immediate response for basement flooding. Water extraction, temporary repairs, permanent solutions.',
    badge: '2-Hour Response',
    primaryBenefit: 'Immediate Flood Response',
    cost: 'Call for Emergency Pricing'
  },
  'crawl-space-waterproofing': {
    title: 'Crawl Space Waterproofing Toronto | Encapsulation',
    description: 'Crawl space waterproofing and encapsulation. Vapor barriers, drainage, dehumidification. Prevent mold and moisture.',
    heroTitle: 'Crawl Space Waterproofing',
    heroSubtitle: 'Complete encapsulation and moisture control for crawl spaces. Prevent mold and structural damage.',
    badge: 'Mold Prevention',
    primaryBenefit: 'Complete Encapsulation',
    cost: '$3,000-8,000'
  },
  'mold-remediation': {
    title: 'Mold Remediation Toronto | Basement Mold Removal',
    description: 'Professional mold removal and remediation in Toronto basements. Safe removal, prevention, air quality testing.',
    heroTitle: 'Mold Remediation Services',
    heroSubtitle: 'Safe mold removal and prevention. Certified technicians, air quality testing, permanent solutions.',
    badge: 'Certified Safe Removal',
    primaryBenefit: 'Healthy Home Environment',
    cost: '$1,500-5,000'
  },
  'underpinning': {
    title: 'Basement Underpinning Toronto | Lower Your Basement',
    description: 'Basement lowering and underpinning in Toronto. Add height, living space, rental income. Licensed engineers.',
    heroTitle: 'Basement Underpinning',
    heroSubtitle: 'Lower your basement for more height and living space. Add value and rental income potential.',
    badge: 'Add $100K+ Value',
    primaryBenefit: 'Create Living Space',
    cost: '$350-500/sq ft'
  },
  'window-well-installation': {
    title: 'Window Well Installation Toronto | Drainage & Covers',
    description: 'Window well installation, repair, and drainage. Prevent basement window leaks. Custom covers available.',
    heroTitle: 'Window Well Installation',
    heroSubtitle: 'Proper window well drainage and covers. Prevent water entry through basement windows.',
    badge: 'Custom Solutions',
    primaryBenefit: 'Window Leak Prevention',
    cost: '$800-2,500/window'
  },
  'backwater-valve-installation': {
    title: 'Backwater Valve Installation Toronto | Sewer Backup Prevention',
    description: 'Backwater valve installation to prevent sewer backup. City rebates up to $3,400. Licensed plumbers.',
    heroTitle: 'Backwater Valve Installation',
    heroSubtitle: 'Prevent sewage backup with backwater valves. Protect your basement from city sewer problems.',
    badge: '$3,400 City Rebate',
    primaryBenefit: 'Sewer Backup Prevention',
    cost: '$3,000-5,000'
  },
  'exterior-drainage-solutions': {
    title: 'Exterior Drainage Solutions Toronto | Grading & Downspouts',
    description: 'Exterior drainage improvements. Regrading, downspout extensions, French drains. Prevent foundation water damage.',
    heroTitle: 'Exterior Drainage Solutions',
    heroSubtitle: 'Complete exterior water management. Grading, gutters, downspouts, and surface drainage.',
    badge: 'Prevent Water Damage',
    primaryBenefit: 'Surface Water Control',
    cost: '$2,000-8,000'
  },
  'bowing-basement-walls': {
    title: 'Bowing Basement Wall Repair Toronto | Wall Straightening',
    description: 'Fix bowing, buckling basement walls. Carbon fiber reinforcement, wall anchors, rebuilding. Structural warranty.',
    heroTitle: 'Bowing Wall Repair',
    heroSubtitle: 'Straighten and reinforce bowing basement walls. Permanent structural solutions with warranty.',
    badge: 'Structural Warranty',
    primaryBenefit: 'Wall Stabilization',
    cost: '$5,000-15,000'
  },
  'efflorescence-treatment': {
    title: 'Efflorescence Removal Toronto | White Powder on Walls',
    description: 'Remove efflorescence (white powder) from basement walls. Treat the cause, prevent recurrence. Professional solutions.',
    heroTitle: 'Efflorescence Treatment',
    heroSubtitle: 'Remove white powder deposits and treat the underlying moisture problem permanently.',
    badge: 'Permanent Solution',
    primaryBenefit: 'Moisture Elimination',
    cost: '$1,000-3,000'
  },
  'leak-detection': {
    title: 'Leak Detection Toronto | Find Hidden Water Leaks',
    description: 'Advanced leak detection for hidden water problems. Thermal imaging, moisture meters, non-invasive testing.',
    heroTitle: 'Professional Leak Detection',
    heroSubtitle: 'Find hidden leaks with advanced technology. Thermal imaging and moisture detection.',
    badge: 'Non-Invasive Testing',
    primaryBenefit: 'Find Hidden Leaks',
    cost: '$300-800'
  },
  'waterproof-coatings': {
    title: 'Waterproof Coatings Toronto | Sealers & Membranes',
    description: 'Professional waterproof coatings and sealers. Crystalline, elastomeric, cementitious coatings. Interior and exterior.',
    heroTitle: 'Waterproof Coatings',
    heroSubtitle: 'Professional-grade sealers and membranes. Long-lasting protection for walls and floors.',
    badge: '10-Year Protection',
    primaryBenefit: 'Surface Protection',
    cost: '$3-8/sq ft'
  },
  'smart-water-monitoring': {
    title: 'Smart Water Monitoring Toronto | Leak Detection Systems',
    description: 'Smart water leak detection and monitoring. WiFi alerts, automatic shutoff, prevent flooding damage.',
    heroTitle: 'Smart Water Monitoring',
    heroSubtitle: 'WiFi-enabled leak detection with instant alerts. Prevent flooding before it happens.',
    badge: 'Smart Home Ready',
    primaryBenefit: '24/7 Monitoring',
    cost: '$500-2,000'
  },
  'hydrostatic-pressure-relief': {
    title: 'Hydrostatic Pressure Relief Toronto | Foundation Pressure',
    description: 'Relieve hydrostatic pressure on foundation walls. Drainage systems, relief wells, permanent solutions.',
    heroTitle: 'Hydrostatic Pressure Relief',
    heroSubtitle: 'Eliminate water pressure on foundation walls. Professional drainage and relief systems.',
    badge: 'Pressure Elimination',
    primaryBenefit: 'Foundation Protection',
    cost: '$5,000-12,000'
  },
  'window-door-waterproofing': {
    title: 'Window & Door Waterproofing Toronto | Seal Leaks',
    description: 'Waterproof windows and doors. Stop leaks, improve insulation, prevent water damage. All types of openings.',
    heroTitle: 'Window & Door Waterproofing',
    heroSubtitle: 'Seal leaks around windows and doors. Prevent water infiltration and improve efficiency.',
    badge: 'Energy Savings',
    primaryBenefit: 'Complete Sealing',
    cost: '$200-800/opening'
  },
  'masonry-stucco-waterproofing': {
    title: 'Masonry Waterproofing Toronto | Brick & Stucco Sealing',
    description: 'Waterproof brick, stone, stucco walls. Breathable sealers, tuckpointing, parging. Preserve and protect.',
    heroTitle: 'Masonry & Stucco Waterproofing',
    heroSubtitle: 'Protect brick, stone, and stucco from water damage. Breathable sealers and repairs.',
    badge: 'Preserve & Protect',
    primaryBenefit: 'Masonry Protection',
    cost: '$5-15/sq ft'
  }
};

// Template for new service page
const generateServicePage = (serviceKey, data) => {
  return `---
import PageLayout from '../../layouts/PageLayout.astro';
import Hero from '../../components/sections/Hero.astro';
import Features from '../../components/sections/Features.astro';
import Process from '../../components/sections/Process.astro';
import Gallery from '../../components/sections/Gallery.astro';
import FAQ from '../../components/sections/FAQ.astro';
import Testimonials from '../../components/sections/Testimonials.astro';
import CTA from '../../components/sections/CTA.astro';
import Stats from '../../components/sections/Stats.astro';

const pageTitle = "${data.title}";
const pageDescription = "${data.description}";

// Service-specific features
const serviceFeatures = [
  {
    icon: '🛡️',
    title: '${data.primaryBenefit}',
    description: 'Industry-leading solution with proven results and long-term protection.',
    highlight: true
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    description: 'Fair, transparent pricing. ${data.cost}. Financing available.',
    highlight: true
  },
  {
    icon: '🏆',
    title: '25-Year Warranty',
    description: 'Transferable warranty that adds value to your home.',
    highlight: true
  },
  {
    icon: '⚡',
    title: 'Fast Service',
    description: 'Quick response times with professional installation.'
  },
  {
    icon: '👨‍👔',
    title: 'Licensed & Insured',
    description: 'Fully licensed, bonded, and insured for your protection.'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Emergency service and ongoing support whenever you need it.'
  }
];

// Service process steps
const processSteps = [
  {
    number: '01',
    title: 'Free Inspection',
    description: 'Comprehensive assessment of your specific needs.',
    icon: '🔍',
    duration: 'Same day'
  },
  {
    number: '02',
    title: 'Custom Solution',
    description: 'Tailored approach for your unique situation.',
    icon: '📋',
    duration: '24 hours'
  },
  {
    number: '03',
    title: 'Professional Work',
    description: 'Expert installation by certified technicians.',
    icon: '🔨',
    duration: 'On schedule'
  },
  {
    number: '04',
    title: 'Quality Assurance',
    description: 'Testing, inspection, and warranty documentation.',
    icon: '✅',
    duration: 'Before leaving'
  }
];

// Service FAQs
const serviceFAQs = [
  {
    question: "How much does this service cost?",
    answer: "Our ${serviceKey.replace(/-/g, ' ')} service typically costs ${data.cost}. Final pricing depends on your specific needs, which we'll assess during our free inspection."
  },
  {
    question: "How long does the work take?",
    answer: "Most projects are completed within 1-5 days depending on scope. We'll provide a detailed timeline during your consultation."
  },
  {
    question: "Do you offer warranties?",
    answer: "Yes! We provide comprehensive warranties on all work, including our 25-year transferable warranty on major waterproofing projects."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. We're fully licensed by the City of Toronto, carry $5 million liability insurance, and are WSIB compliant."
  }
];

// Schema markup
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${data.heroTitle}",
  "description": "${data.description}",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Spaders Waterproofing",
    "telephone": "416-301-2344"
  },
  "areaServed": ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham"]
};
---

<PageLayout 
  title={pageTitle}
  description={pageDescription}
>
  <!-- Hero Section -->
  <Hero 
    title="${data.heroTitle}"
    subtitle="${data.heroSubtitle}"
    primaryCTA={{ text: "Get Free Inspection", href: "/free-inspection" }}
    secondaryCTA={{ text: "Call: 416-301-2344", href: "tel:416-301-2344" }}
    backgroundImage="/images/services/${serviceKey}-hero.jpg"
    badge="${data.badge}"
  />

  <!-- Stats -->
  <Stats />

  <!-- Features -->
  <Features 
    title="Why Choose Our Service"
    subtitle="Professional solutions backed by experience and warranty"
    features={serviceFeatures}
    columns={3}
  />

  <!-- Process -->
  <Process />

  <!-- Testimonials -->
  <Testimonials />

  <!-- FAQ -->
  <FAQ 
    title="Common Questions"
    subtitle="Everything you need to know about our service"
    faqs={serviceFAQs}
    columns={1}
  />

  <!-- CTA -->
  <CTA 
    title="Ready to Get Started?"
    subtitle="Schedule your free inspection today and protect your home."
    primaryCTA={{ text: "Schedule Free Inspection", href: "/free-inspection" }}
    secondaryCTA={{ text: "Call: 416-301-2344", href: "tel:416-301-2344" }}
    background="gradient"
  />
</PageLayout>

<script type="application/ld+json" set:html={JSON.stringify(serviceSchema)}></script>`;
};

// Main migration function
async function migrateServicePages() {
  console.log('🚀 SuperClaude Service Page Migration Starting...\n');
  
  const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');
  let successCount = 0;
  let errorCount = 0;
  
  for (const [serviceKey, serviceData] of Object.entries(servicePages)) {
    const fileName = `${serviceKey}.astro`;
    const filePath = path.join(servicesDir, fileName);
    
    try {
      // Backup existing file
      const backupPath = path.join(servicesDir, `backup-${fileName}`);
      const exists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (exists) {
        await fs.copyFile(filePath, backupPath);
        console.log(`📦 Backed up: ${fileName}`);
      }
      
      // Generate new content
      const newContent = generateServicePage(serviceKey, serviceData);
      
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
  console.log('3. Deploy to production');
}

// Run migration
migrateServicePages().catch(console.error);