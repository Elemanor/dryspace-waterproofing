// Fix all broken internal links in the project
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const replacements = [
  // Service fixes - handle both quote types
  ['/services/sump-pump"', '/services/sump-pump-installation"'],
  ["/services/sump-pump'", "/services/sump-pump-installation'"],
  ['/services/french-drain-system', '/services/interior-drainage-systems'],
  ['/services/weeping-tile', '/services/interior-drainage-systems'],
  ['/services/underpinning', '/services/basement-lowering'],
  ['/services/foundation-settlement-repair', '/services/foundation-repair'],
  ['/services/concrete-repair', '/services/foundation-repair'],
  ['/services/crack-injection', '/services/foundation-crack-repair'],
  ['/services/grading-drainage', '/services/exterior-drainage-solutions'],
  ['/services/emergency-water-removal', '/services/emergency-waterproofing'],
  
  // Location fixes
  ['/locations/downtown-toronto', '/locations/toronto'],
  ['/locations/cabbagetown', '/neighborhoods/the-annex'],
  ['/locations/leslieville', '/neighborhoods/the-beaches'],
  ['/locations/east-york', '/locations/north-york'],
  
  // Tool fixes
  ['/tools/detailed-cost-estimator', '/tools/waterproofing-cost-calculator'],
];

async function fixBrokenLinks() {
  const files = await glob('src/**/*.astro');
  let totalFixes = 0;
  
  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    let changed = false;
    
    for (const [oldLink, newLink] of replacements) {
      if (content.includes(oldLink)) {
        const occurrences = (content.match(new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        content = content.replaceAll(oldLink, newLink);
        changed = true;
        totalFixes += occurrences;
        console.log(`✅ Fixed ${occurrences}x: ${oldLink} → ${newLink} in ${file.replace(/^.*[\\\/]/, '')}`);
      }
    }
    
    if (changed) {
      writeFileSync(file, content);
    }
  }
  
  console.log(`\n✨ Total fixes applied: ${totalFixes}`);
  return totalFixes;
}

// Run the fix
fixBrokenLinks().then(fixes => {
  if (fixes > 0) {
    console.log('🎉 All broken links have been fixed!');
  } else {
    console.log('✓ No broken links found to fix.');
  }
}).catch(error => {
  console.error('❌ Error fixing links:', error);
});