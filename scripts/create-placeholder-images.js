#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG placeholder generator
function createPlaceholderSVG(width, height, text, bgColor = '#3B82F6') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
      ${text}
    </text>
  </svg>`;
}

const imagePlaceholders = [
  // Service images
  { path: 'services/exterior-waterproofing-hero.jpg', width: 1920, height: 1080, text: 'Exterior Waterproofing', color: '#1E40AF' },
  { path: 'services/interior-waterproofing-hero.jpg', width: 1920, height: 1080, text: 'Interior Waterproofing', color: '#059669' },
  { path: 'services/foundation-repair-hero.jpg', width: 1920, height: 1080, text: 'Foundation Repair', color: '#DC2626' },
  { path: 'services/sump-pump-hero.jpg', width: 1920, height: 1080, text: 'Sump Pump Installation', color: '#7C3AED' },
  { path: 'services/benefits-illustration.jpg', width: 800, height: 600, text: 'Benefits', color: '#0891B2' },
  { path: 'services/process-placeholder.jpg', width: 800, height: 600, text: 'Process Step', color: '#EA580C' },
  
  // Process images
  { path: 'services/excavation-process.jpg', width: 800, height: 600, text: 'Excavation', color: '#84CC16' },
  { path: 'services/foundation-repair-process.jpg', width: 800, height: 600, text: 'Foundation Repair', color: '#F59E0B' },
  { path: 'services/membrane-application.jpg', width: 800, height: 600, text: 'Membrane Application', color: '#8B5CF6' },
  { path: 'services/drainage-installation.jpg', width: 800, height: 600, text: 'Drainage System', color: '#10B981' },
  { path: 'services/landscape-restoration.jpg', width: 800, height: 600, text: 'Restoration', color: '#F43F5E' },
  
  // Gallery images
  { path: 'gallery/exterior-project-1.jpg', width: 600, height: 400, text: 'Project 1', color: '#0EA5E9' },
  { path: 'gallery/exterior-project-2.jpg', width: 600, height: 400, text: 'Project 2', color: '#A855F7' },
  { path: 'gallery/exterior-project-3.jpg', width: 600, height: 400, text: 'Project 3', color: '#EF4444' },
  { path: 'gallery/exterior-project-4.jpg', width: 600, height: 400, text: 'Project 4', color: '#22C55E' },
  { path: 'gallery/exterior-project-5.jpg', width: 600, height: 400, text: 'Project 5', color: '#F97316' },
  { path: 'gallery/exterior-project-6.jpg', width: 600, height: 400, text: 'Project 6', color: '#06B6D4' },
  
  // Location images
  { path: 'locations/toronto-hero.jpg', width: 1920, height: 1080, text: 'Toronto', color: '#2563EB' },
  { path: 'locations/mississauga-hero.jpg', width: 1920, height: 1080, text: 'Mississauga', color: '#16A34A' },
  { path: 'locations/brampton-hero.jpg', width: 1920, height: 1080, text: 'Brampton', color: '#DC2626' },
  { path: 'locations/vaughan-hero.jpg', width: 1920, height: 1080, text: 'Vaughan', color: '#9333EA' },
  { path: 'locations/markham-hero.jpg', width: 1920, height: 1080, text: 'Markham', color: '#EA580C' },
  
  // General images
  { path: 'hero-waterproofing.jpg', width: 1920, height: 1080, text: 'Waterproofing Services', color: '#0F172A' },
  { path: 'team-photo.jpg', width: 1200, height: 800, text: 'Our Team', color: '#475569' },
  { path: 'office-building.jpg', width: 1200, height: 800, text: 'Our Office', color: '#64748B' },
];

async function createPlaceholders() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  
  console.log('🎨 Creating placeholder images...\n');
  
  for (const img of imagePlaceholders) {
    const fullPath = path.join(publicDir, img.path);
    const dir = path.dirname(fullPath);
    
    // Create directory if it doesn't exist
    await fs.mkdir(dir, { recursive: true });
    
    // Change extension to .svg for now (can be converted later)
    const svgPath = fullPath.replace('.jpg', '.svg');
    
    // Create SVG placeholder
    const svg = createPlaceholderSVG(img.width, img.height, img.text, img.color);
    
    await fs.writeFile(svgPath, svg, 'utf-8');
    console.log(`✅ Created: ${img.path.replace('.jpg', '.svg')}`);
  }
  
  console.log('\n✨ All placeholder images created!');
  console.log('Note: These are SVG placeholders. Replace with actual photos for production.');
}

createPlaceholders().catch(console.error);