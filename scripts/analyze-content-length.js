import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function countWords(content) {
  // Remove HTML tags and script/style content
  let text = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Count words
  return text.split(' ').filter(word => word.length > 0).length;
}

function analyzeFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const wordCount = countWords(content);
  
  return {
    path: relativePath,
    wordCount: wordCount,
    status: wordCount >= 2000 ? '✅ Good' : wordCount >= 1500 ? '⚠️ OK' : '❌ Thin'
  };
}

// Directories to analyze
const directories = [
  { path: 'src/pages/services', name: 'Services' },
  { path: 'src/pages/locations', name: 'Locations' },
  { path: 'src/pages/blog', name: 'Blog' },
  { path: 'src/pages/resources', name: 'Resources' },
  { path: 'src/pages/neighborhoods', name: 'Neighborhoods' },
  { path: 'src/pages/case-studies', name: 'Case Studies' }
];

console.log('📊 Content Length Analysis Report\n');
console.log('═══════════════════════════════════════════════════\n');
console.log('Target: 2000+ words (Excellent), 1500+ words (Acceptable)\n');

const results = [];
const thinPages = [];
const okPages = [];
const goodPages = [];

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir.path);
  
  if (fs.existsSync(fullPath)) {
    console.log(`\n📁 ${dir.name} Pages:\n`);
    
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.astro') && f !== 'index.astro');
    
    files.forEach(file => {
      const filePath = path.join(fullPath, file);
      const result = analyzeFile(filePath, `${dir.path}/${file}`);
      results.push(result);
      
      if (result.status === '❌ Thin') {
        thinPages.push(result);
      } else if (result.status === '⚠️ OK') {
        okPages.push(result);
      } else {
        goodPages.push(result);
      }
      
      console.log(`   ${result.status} ${file.replace('.astro', '')}: ${result.wordCount.toLocaleString()} words`);
    });
  }
});

// Summary statistics
console.log('\n\n📈 SUMMARY STATISTICS\n');
console.log('═══════════════════════════════════════════════════\n');

const totalPages = results.length;
const avgWordCount = Math.round(results.reduce((sum, r) => sum + r.wordCount, 0) / totalPages);

console.log(`Total Pages Analyzed: ${totalPages}`);
console.log(`Average Word Count: ${avgWordCount.toLocaleString()}`);
console.log(`\nContent Distribution:`);
console.log(`   ✅ Excellent (2000+ words): ${goodPages.length} pages (${Math.round(goodPages.length/totalPages*100)}%)`);
console.log(`   ⚠️ Acceptable (1500-1999 words): ${okPages.length} pages (${Math.round(okPages.length/totalPages*100)}%)`);
console.log(`   ❌ Thin (<1500 words): ${thinPages.length} pages (${Math.round(thinPages.length/totalPages*100)}%)`);

// List thin pages that need expansion
if (thinPages.length > 0) {
  console.log('\n\n🔴 PAGES REQUIRING IMMEDIATE EXPANSION\n');
  console.log('═══════════════════════════════════════════════════\n');
  
  thinPages
    .sort((a, b) => a.wordCount - b.wordCount)
    .forEach((page, index) => {
      const wordsNeeded = 1500 - page.wordCount;
      console.log(`${index + 1}. ${page.path.replace('src/pages/', '').replace('.astro', '')}`);
      console.log(`   Current: ${page.wordCount} words | Need: +${wordsNeeded} words minimum`);
    });
}

// List pages that could be improved
if (okPages.length > 0) {
  console.log('\n\n🟡 PAGES THAT COULD BE ENHANCED\n');
  console.log('═══════════════════════════════════════════════════\n');
  
  okPages
    .sort((a, b) => a.wordCount - b.wordCount)
    .forEach((page, index) => {
      const wordsNeeded = 2000 - page.wordCount;
      console.log(`${index + 1}. ${page.path.replace('src/pages/', '').replace('.astro', '')}`);
      console.log(`   Current: ${page.wordCount} words | Need: +${wordsNeeded} words for excellence`);
    });
}

// Create actionable report
const report = {
  timestamp: new Date().toISOString(),
  statistics: {
    totalPages,
    avgWordCount,
    distribution: {
      excellent: goodPages.length,
      acceptable: okPages.length,
      thin: thinPages.length
    }
  },
  thinPages: thinPages.map(p => ({
    page: p.path.replace('src/pages/', '').replace('.astro', ''),
    currentWords: p.wordCount,
    wordsNeeded: Math.max(1500 - p.wordCount, 0)
  })),
  recommendations: [
    'Prioritize expanding pages with < 1000 words first',
    'Add FAQ sections to boost word count',
    'Include detailed process explanations',
    'Add case studies and examples',
    'Expand technical specifications',
    'Include seasonal maintenance tips'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '..', 'claudedocs', 'content-length-analysis.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n\n💾 Full report saved to: claudedocs/content-length-analysis.json');

// Recommendations
console.log('\n\n💡 CONTENT EXPANSION STRATEGIES\n');
console.log('═══════════════════════════════════════════════════\n');
console.log('1. Add comprehensive FAQ sections (300-500 words)');
console.log('2. Include detailed process descriptions (400-600 words)');
console.log('3. Add "Signs You Need This Service" section (200-300 words)');
console.log('4. Include maintenance tips and prevention (300-400 words)');
console.log('5. Add cost factors and pricing information (200-300 words)');
console.log('6. Include seasonal considerations (200-300 words)');
console.log('7. Add warranty and guarantee information (150-200 words)');
console.log('8. Include related services section (150-200 words)');

console.log('\n✨ Total potential addition: 1900-2900 words per page');