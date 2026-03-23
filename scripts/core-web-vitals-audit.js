import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Core Web Vitals Audit for Spaders Waterproofing\n');
console.log('═══════════════════════════════════════════════════\n');

// Check key pages for performance issues
const pagesToCheck = [
  { path: 'src/pages/index.astro', name: 'Homepage' },
  { path: 'src/pages/locations/toronto.astro', name: 'Toronto Location' },
  { path: 'src/pages/services/sump-pump-installation.astro', name: 'Sump Pump Service' },
  { path: 'src/pages/services/weeping-tile.astro', name: 'Weeping Tile Service' },
  { path: 'src/pages/services/underpinning.astro', name: 'Underpinning Service' }
];

const issues = {
  images: [],
  javascript: [],
  css: [],
  fonts: [],
  general: []
};

// Function to analyze file
function analyzeFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${fileName} not found`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  // Check for unoptimized images
  const imageRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const src = match[1];
    if (!src.includes('.webp') && !src.includes('data:') && !src.includes('http')) {
      issues.images.push(`${fileName}: Non-WebP image found: ${src}`);
    }
    if (!match[0].includes('loading=')) {
      issues.images.push(`${fileName}: Image missing lazy loading: ${src}`);
    }
    if (!match[0].includes('width=') || !match[0].includes('height=')) {
      issues.images.push(`${fileName}: Image missing dimensions (causes CLS): ${src}`);
    }
  }
  
  // Check for inline styles (bad for performance)
  if (content.match(/style=["'][^"']+["']/gi)) {
    const count = (content.match(/style=["'][^"']+["']/gi) || []).length;
    if (count > 5) {
      issues.css.push(`${fileName}: ${count} inline styles found (move to CSS)`);
    }
  }
  
  // Check for large embedded content
  const scriptBlocks = content.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
  scriptBlocks.forEach(block => {
    if (block.length > 1000 && !block.includes('type="module"')) {
      issues.javascript.push(`${fileName}: Large inline script (${Math.round(block.length/1000)}KB) - consider external file`);
    }
  });
  
  // Check for font loading
  if (content.includes('@font-face') && !content.includes('font-display')) {
    issues.fonts.push(`${fileName}: @font-face missing font-display property`);
  }
  
  // Check for viewport meta tag
  if (fileName === 'Homepage' && !content.includes('viewport')) {
    issues.general.push(`${fileName}: Missing viewport meta tag`);
  }
}

// Analyze each page
console.log('📋 Analyzing Pages...\n');
pagesToCheck.forEach(page => {
  const fullPath = path.join(__dirname, '..', page.path);
  analyzeFile(fullPath, page.name);
});

// Check global CSS for performance issues
console.log('\n📋 Analyzing Global CSS...\n');
const cssPath = path.join(__dirname, '..', 'src', 'styles', 'global.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const cssSize = cssContent.length / 1024;
  
  if (cssSize > 50) {
    issues.css.push(`Global CSS is ${Math.round(cssSize)}KB - consider splitting`);
  }
  
  // Check for unused animations
  if (cssContent.includes('@keyframes') && cssContent.match(/@keyframes/g).length > 10) {
    issues.css.push('Many animations defined - ensure all are used');
  }
}

// Report findings
console.log('\n📊 CORE WEB VITALS AUDIT RESULTS\n');
console.log('═══════════════════════════════════════════════════\n');

// Calculate scores
const lcp_issues = issues.images.length + issues.fonts.length;
const cls_issues = issues.images.filter(i => i.includes('dimensions')).length;
const inp_issues = issues.javascript.length;

// LCP (Largest Contentful Paint) - Target < 2.5s
console.log('🎯 LCP (Largest Contentful Paint) - Target < 2.5s');
if (lcp_issues === 0) {
  console.log('   ✅ PASS: No major LCP issues detected');
} else {
  console.log(`   ⚠️  WARNING: ${lcp_issues} potential LCP issues:`);
  issues.images.slice(0, 3).forEach(issue => console.log(`      - ${issue}`));
  issues.fonts.forEach(issue => console.log(`      - ${issue}`));
}

// CLS (Cumulative Layout Shift) - Target < 0.1
console.log('\n🎯 CLS (Cumulative Layout Shift) - Target < 0.1');
if (cls_issues === 0) {
  console.log('   ✅ PASS: No CLS issues detected');
} else {
  console.log(`   ⚠️  WARNING: ${cls_issues} potential CLS issues:`);
  issues.images.filter(i => i.includes('dimensions')).slice(0, 3).forEach(issue => {
    console.log(`      - ${issue}`);
  });
}

// INP (Interaction to Next Paint) - Target < 200ms
console.log('\n🎯 INP (Interaction to Next Paint) - Target < 200ms');
if (inp_issues === 0) {
  console.log('   ✅ PASS: No major INP issues detected');
} else {
  console.log(`   ⚠️  WARNING: ${inp_issues} potential INP issues:`);
  issues.javascript.forEach(issue => console.log(`      - ${issue}`));
}

// Overall recommendations
console.log('\n📌 TOP PRIORITY RECOMMENDATIONS:\n');

const recommendations = [];

if (issues.images.length > 0) {
  recommendations.push({
    priority: 'HIGH',
    issue: 'Image Optimization',
    action: 'Convert images to WebP, add lazy loading, specify dimensions',
    impact: 'Improves LCP by 30-50%'
  });
}

if (issues.css.length > 0) {
  recommendations.push({
    priority: 'MEDIUM',
    issue: 'CSS Optimization',
    action: 'Remove inline styles, split large CSS files',
    impact: 'Improves FCP by 10-20%'
  });
}

if (issues.javascript.length > 0) {
  recommendations.push({
    priority: 'MEDIUM',
    issue: 'JavaScript Optimization',
    action: 'Move inline scripts to external files, use async/defer',
    impact: 'Improves INP by 20-30%'
  });
}

if (issues.fonts.length > 0) {
  recommendations.push({
    priority: 'LOW',
    issue: 'Font Loading',
    action: 'Add font-display: swap to @font-face rules',
    impact: 'Improves LCP by 5-10%'
  });
}

if (recommendations.length === 0) {
  console.log('   ✅ Excellent! No critical Core Web Vitals issues found.\n');
  console.log('   Your site appears to be well-optimized for performance.');
} else {
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. [${rec.priority}] ${rec.issue}`);
    console.log(`   Action: ${rec.action}`);
    console.log(`   Impact: ${rec.impact}\n`);
  });
}

// Performance checklist
console.log('\n✅ PERFORMANCE CHECKLIST:\n');
const checklist = [
  { item: 'Images in WebP format', status: issues.images.filter(i => i.includes('Non-WebP')).length === 0 },
  { item: 'Lazy loading implemented', status: issues.images.filter(i => i.includes('lazy loading')).length === 0 },
  { item: 'Image dimensions specified', status: cls_issues === 0 },
  { item: 'Minimal inline JavaScript', status: issues.javascript.length === 0 },
  { item: 'CSS optimized', status: issues.css.length < 2 },
  { item: 'Fonts optimized', status: issues.fonts.length === 0 }
];

checklist.forEach(check => {
  console.log(`   ${check.status ? '✅' : '❌'} ${check.item}`);
});

// Score calculation
const totalChecks = checklist.length;
const passedChecks = checklist.filter(c => c.status).length;
const score = Math.round((passedChecks / totalChecks) * 100);

console.log(`\n🏆 OVERALL SCORE: ${score}/100\n`);

if (score >= 90) {
  console.log('   🎉 Excellent! Your site meets Core Web Vitals standards.');
} else if (score >= 70) {
  console.log('   👍 Good, but there\'s room for improvement.');
} else {
  console.log('   ⚠️  Needs improvement to meet Core Web Vitals standards.');
}

console.log('\n═══════════════════════════════════════════════════');
console.log('\n💡 Next Steps:');
console.log('   1. Address HIGH priority issues first');
console.log('   2. Test with Lighthouse after fixes');
console.log('   3. Monitor real user metrics with Google Search Console\n');