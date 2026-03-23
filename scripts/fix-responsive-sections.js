#!/usr/bin/env node

/**
 * SuperClaude Responsive Section Updater
 * Updates all section components to use consistent responsive design system
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sectionsToUpdate = [
  'Process.astro',
  'Testimonials.astro',
  'FAQ.astro',
  'Features.astro',
  'Gallery.astro',
  'Contact.astro',
  'CTA.astro'
];

const replacements = [
  // Section containers
  { 
    pattern: /<section class="py-\d+[^"]*">/g,
    replacement: '<section class="section">'
  },
  {
    pattern: /<section class="py-\d+\s+bg-[^"]*">/g,
    replacement: (match) => {
      const bgMatch = match.match(/bg-[^\s"]+/);
      const bg = bgMatch ? bgMatch[0] : '';
      return `<section class="section ${bg}">`;
    }
  },
  // Container fixes
  {
    pattern: /<div class="container mx-auto px-\d+">/g,
    replacement: '<div class="container">'
  },
  // Section headers
  {
    pattern: /<div class="text-center max-w-\w+ mx-auto mb-\d+">/g,
    replacement: '<div class="section-header">'
  },
  // Headings
  {
    pattern: /<h2 class="text-\d+xl[^"]*">/g,
    replacement: '<h2 class="h2 section-title text-gray-900 dark:text-white">'
  },
  {
    pattern: /<h3 class="text-\d+xl[^"]*">/g,
    replacement: '<h3 class="h3 text-gray-900 dark:text-white">'
  },
  // Subtitles
  {
    pattern: /<p class="text-lg text-gray-\d+ dark:text-gray-\d+">/g,
    replacement: '<p class="section-subtitle text-gray-600 dark:text-gray-400">'
  },
  // Grid systems
  {
    pattern: /grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-\d+/g,
    replacement: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg'
  },
  {
    pattern: /grid grid-cols-1 md:grid-cols-2 gap-\d+/g,
    replacement: 'grid grid-cols-1 md:grid-cols-2 gap-lg'
  },
  // Card classes
  {
    pattern: /bg-white dark:bg-gray-800 rounded-lg shadow-lg p-\d+/g,
    replacement: 'card'
  },
  // Button classes
  {
    pattern: /px-\d+ py-\d+ bg-blue-600 text-white font-semibold rounded-lg/g,
    replacement: 'btn btn-primary'
  }
];

async function updateSectionFile(filename) {
  const filePath = path.join(__dirname, '..', 'src', 'components', 'sections', filename);
  
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let updatedContent = content;
    let changesMade = false;
    
    // Apply all replacements
    for (const { pattern, replacement } of replacements) {
      const before = updatedContent;
      if (typeof replacement === 'function') {
        updatedContent = updatedContent.replace(pattern, replacement);
      } else {
        updatedContent = updatedContent.replace(pattern, replacement);
      }
      if (before !== updatedContent) {
        changesMade = true;
      }
    }
    
    // Additional specific fixes for each component
    if (filename === 'FAQ.astro') {
      updatedContent = updatedContent.replace(
        /space-y-\d+/g,
        'space-y-md'
      );
    }
    
    if (filename === 'Testimonials.astro') {
      updatedContent = updatedContent.replace(
        /flex overflow-x-auto scrollbar-hide gap-\d+/g,
        'flex overflow-x-auto scrollbar-hide gap-lg'
      );
    }
    
    if (filename === 'CTA.astro') {
      updatedContent = updatedContent.replace(
        /min-h-\[\d+px\]/g,
        'min-h-[400px]'
      );
    }
    
    if (changesMade) {
      await fs.writeFile(filePath, updatedContent, 'utf-8');
      console.log(`✅ Updated ${filename}`);
      return true;
    } else {
      console.log(`ℹ️ No changes needed for ${filename}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 SuperClaude Responsive Section Updater');
  console.log('=========================================\n');
  
  let updated = 0;
  let failed = 0;
  
  for (const filename of sectionsToUpdate) {
    const result = await updateSectionFile(filename);
    if (result) updated++;
    else if (result === false) continue;
    else failed++;
  }
  
  console.log('\n=========================================');
  console.log(`✅ Successfully updated: ${updated} files`);
  if (failed > 0) {
    console.log(`❌ Failed to update: ${failed} files`);
  }
  console.log('\n📝 Next steps:');
  console.log('1. Run npm run dev to see changes');
  console.log('2. Test responsiveness at all breakpoints');
  console.log('3. Verify dark mode styling');
}

main().catch(console.error);