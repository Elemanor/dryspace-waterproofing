/**
 * Accessibility Checker for Spaders Website
 * Uses pa11y to check WCAG compliance
 */

import pa11y from 'pa11y';

console.log('♿ Spaders Waterproofing - Accessibility Check\n');
console.log('=' .repeat(60));

// Pages to test
const pages = [
  'http://localhost:3000',
  'http://localhost:3000/services/exterior-waterproofing',
  'http://localhost:3000/locations/toronto',
  'http://localhost:3000/free-inspection'
];

// Test configuration
const options = {
  standard: 'WCAG2AA',
  timeout: 30000,
  wait: 1000,
  chromeLaunchConfig: {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

async function checkAccessibility() {
  const results = {};
  let totalIssues = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalNotices = 0;

  for (const url of pages) {
    console.log(`\n📍 Testing: ${url}`);
    console.log('   Checking...');
    
    try {
      const result = await pa11y(url, options);
      results[url] = result;
      
      const errors = result.issues.filter(i => i.type === 'error');
      const warnings = result.issues.filter(i => i.type === 'warning');
      const notices = result.issues.filter(i => i.type === 'notice');
      
      totalIssues += result.issues.length;
      totalErrors += errors.length;
      totalWarnings += warnings.length;
      totalNotices += notices.length;
      
      if (errors.length === 0) {
        console.log('   ✅ No errors found!');
      } else {
        console.log(`   ❌ ${errors.length} error(s) found`);
        errors.slice(0, 3).forEach(error => {
          console.log(`      - ${error.message}`);
        });
      }
      
      if (warnings.length > 0) {
        console.log(`   ⚠️  ${warnings.length} warning(s) found`);
      }
      
    } catch (error) {
      console.log(`   ❌ Error testing page: ${error.message}`);
    }
  }
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 Accessibility Summary:\n');
  console.log(`   Pages tested: ${pages.length}`);
  console.log(`   Total issues: ${totalIssues}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   ⚠️  Warnings: ${totalWarnings}`);
  console.log(`   ℹ️  Notices: ${totalNotices}`);
  
  // WCAG Compliance
  console.log('\n🎯 WCAG 2.1 AA Compliance:');
  if (totalErrors === 0) {
    console.log('   ✅ PASSED - No critical accessibility errors!');
  } else {
    console.log('   ❌ FAILED - Critical errors must be fixed');
    
    // Show common issues
    console.log('\n   Most Common Issues:');
    const allIssues = {};
    Object.values(results).forEach(result => {
      result.issues.forEach(issue => {
        const key = issue.code;
        if (!allIssues[key]) {
          allIssues[key] = { count: 0, message: issue.message, type: issue.type };
        }
        allIssues[key].count++;
      });
    });
    
    const sortedIssues = Object.entries(allIssues)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5);
    
    sortedIssues.forEach(([code, data]) => {
      const icon = data.type === 'error' ? '❌' : data.type === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`   ${icon} ${data.message} (${data.count}x)`);
    });
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('   - Fix all errors (red) immediately');
  console.log('   - Review warnings (yellow) for improvements');
  console.log('   - Consider notices for enhanced accessibility');
  console.log('   - Test with screen readers (NVDA/JAWS)');
  console.log('   - Verify keyboard navigation works');
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n✅ Accessibility check complete!\n');
}

// Run the check
checkAccessibility().catch(console.error);