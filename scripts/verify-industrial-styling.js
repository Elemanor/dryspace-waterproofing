import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check all .astro files
const checkDirectory = (dir, results = { total: 0, issues: [] }) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      checkDirectory(filePath, results);
    } else if (file.endsWith('.astro')) {
      results.total++;
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      
      // Check for issues
      const issues = [];
      
      // Check for emojis (excluding comments)
      const emojiRegex = /[🚨⏱️🚚👷📞💧🌬️⚡💰🔧🏠⭐✅❌🎯🔴🟡🟢]/g;
      const nonCommentContent = content.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\/.*$/gm, '');
      if (emojiRegex.test(nonCommentContent)) {
        issues.push('Contains emojis');
      }
      
      // Check for SEOLayout or BaseLayout (should use PageLayout)
      if (content.includes('SEOLayout') || content.includes('BaseLayout')) {
        issues.push('Uses SEOLayout or BaseLayout instead of PageLayout');
      }
      
      // Check for gradient classes (not industrial)
      if (content.includes('bg-gradient-to-') && !content.includes('components/')) {
        issues.push('Contains gradients');
      }
      
      // Check for rounded corners (not industrial)
      if (content.includes('rounded-') && !content.includes('components/')) {
        issues.push('Contains rounded corners');
      }
      
      if (issues.length > 0) {
        results.issues.push({
          file: relativePath,
          problems: issues
        });
      }
    }
  });
  
  return results;
};

console.log('🔍 Verifying Industrial Styling Across All Pages\n');
console.log('=' .repeat(60));

const srcDir = path.join(__dirname, '..', 'src', 'pages');
const results = checkDirectory(srcDir);

console.log(`\n📊 Results:`);
console.log(`Total .astro files checked: ${results.total}`);
console.log(`Files with styling issues: ${results.issues.length}`);

if (results.issues.length > 0) {
  console.log('\n⚠️  Files with potential styling issues:\n');
  results.issues.forEach(issue => {
    console.log(`📄 ${issue.file}`);
    issue.problems.forEach(problem => {
      console.log(`   - ${problem}`);
    });
  });
} else {
  console.log('\n✅ All pages follow industrial styling standards!');
}

console.log('\n' + '=' .repeat(60));
console.log('Industrial Styling Checklist:');
console.log('✓ No emojis in content');
console.log('✓ Using PageLayout (not SEOLayout/BaseLayout)');
console.log('✓ No gradients (solid colors only)');
console.log('✓ No rounded corners (sharp edges)');
console.log('✓ Uppercase text for headings');
console.log('✓ Border-based cards (border-2 border-gray-300)');
console.log('✓ Color scheme: gray-900, yellow-500, red-600');