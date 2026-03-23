// Script to clean up missing imports from location pages
import fs from 'fs';
import { glob } from 'glob';

async function cleanLocationImports() {
  try {
    const files = await glob('src/pages/locations/*.astro');
    
    let updatedCount = 0;
    
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf-8');
      let updated = false;
      
      // Remove CTA import
      if (content.includes('import CTA from')) {
        content = content.replace(/import CTA from.*?\n/g, '');
        content = content.replace(/<CTA\s*\/>/g, '');
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`✅ Cleaned: ${file}`);
      }
    }
    
    console.log(`\n🎉 Successfully cleaned ${updatedCount} location files!`);
    
  } catch (error) {
    console.error('Error cleaning files:', error);
  }
}

cleanLocationImports();