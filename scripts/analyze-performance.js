/**
 * Performance Analysis Script for Spaders Website
 * Analyzes build output and provides optimization recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Spaders Waterproofing - Performance Analysis\n');
console.log('=' .repeat(60));

// Check if dist folder exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log('⚠️  Build folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Function to get file size
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to analyze directory
function analyzeDirectory(dir, ext) {
  let files = [];
  let totalSize = 0;
  
  function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath);
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (path.extname(entry) === ext) {
        const size = getFileSize(fullPath);
        files.push({ path: fullPath.replace(distPath, ''), size });
        totalSize += size;
      }
    }
  }
  
  walkDir(dir);
  return { files, totalSize };
}

// Analyze HTML files
console.log('\n📄 HTML Analysis:');
const htmlAnalysis = analyzeDirectory(distPath, '.html');
console.log(`   Total HTML files: ${htmlAnalysis.files.length}`);
console.log(`   Total size: ${formatBytes(htmlAnalysis.totalSize)}`);
console.log(`   Average size: ${formatBytes(htmlAnalysis.totalSize / htmlAnalysis.files.length)}`);

// Find largest HTML files
const largestHTML = htmlAnalysis.files.sort((a, b) => b.size - a.size).slice(0, 3);
console.log('\n   Largest HTML files:');
largestHTML.forEach(file => {
  console.log(`   - ${file.path}: ${formatBytes(file.size)}`);
});

// Analyze CSS files
console.log('\n🎨 CSS Analysis:');
const cssAnalysis = analyzeDirectory(distPath, '.css');
console.log(`   Total CSS files: ${cssAnalysis.files.length}`);
console.log(`   Total size: ${formatBytes(cssAnalysis.totalSize)}`);

// Analyze JS files
console.log('\n📦 JavaScript Analysis:');
const jsAnalysis = analyzeDirectory(path.join(distPath, '_astro'), '.js');
console.log(`   Total JS files: ${jsAnalysis.files.length}`);
console.log(`   Total size: ${formatBytes(jsAnalysis.totalSize)}`);

// Find largest JS files
const largestJS = jsAnalysis.files.sort((a, b) => b.size - a.size).slice(0, 3);
if (largestJS.length > 0) {
  console.log('\n   Largest JS bundles:');
  largestJS.forEach(file => {
    console.log(`   - ${file.path}: ${formatBytes(file.size)}`);
  });
}

// Analyze images
console.log('\n🖼️  Image Analysis:');
const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
let totalImages = 0;
let totalImageSize = 0;
let imageTypes = {};

function analyzeImages(dir) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !entry.startsWith('_')) {
      analyzeImages(fullPath);
    } else {
      const ext = path.extname(entry).toLowerCase();
      if (imageExts.includes(ext)) {
        totalImages++;
        totalImageSize += stat.size;
        imageTypes[ext] = (imageTypes[ext] || 0) + 1;
      }
    }
  }
}

if (fs.existsSync(path.join(distPath, 'images'))) {
  analyzeImages(path.join(distPath, 'images'));
}

console.log(`   Total images: ${totalImages}`);
console.log(`   Total size: ${formatBytes(totalImageSize)}`);
if (totalImages > 0) {
  console.log(`   Average size: ${formatBytes(totalImageSize / totalImages)}`);
  console.log('\n   Image types:');
  Object.entries(imageTypes).forEach(([ext, count]) => {
    console.log(`   - ${ext}: ${count} files`);
  });
}

// Performance metrics and recommendations
console.log('\n' + '=' .repeat(60));
console.log('\n📊 Performance Metrics:\n');

const totalSize = htmlAnalysis.totalSize + cssAnalysis.totalSize + jsAnalysis.totalSize + totalImageSize;
console.log(`   Total build size: ${formatBytes(totalSize)}`);
console.log(`   HTML: ${formatBytes(htmlAnalysis.totalSize)} (${((htmlAnalysis.totalSize / totalSize) * 100).toFixed(1)}%)`);
console.log(`   CSS: ${formatBytes(cssAnalysis.totalSize)} (${((cssAnalysis.totalSize / totalSize) * 100).toFixed(1)}%)`);
console.log(`   JS: ${formatBytes(jsAnalysis.totalSize)} (${((jsAnalysis.totalSize / totalSize) * 100).toFixed(1)}%)`);
console.log(`   Images: ${formatBytes(totalImageSize)} (${((totalImageSize / totalSize) * 100).toFixed(1)}%)`);

// Performance scoring (simplified)
console.log('\n🎯 Performance Score (estimated):');
let score = 100;
const issues = [];

// Check HTML size
const avgHTMLSize = htmlAnalysis.totalSize / htmlAnalysis.files.length;
if (avgHTMLSize > 50000) {
  score -= 10;
  issues.push('HTML files are large (>50KB average)');
} else if (avgHTMLSize < 20000) {
  console.log('   ✅ HTML size: Excellent (<20KB average)');
} else {
  console.log('   ✅ HTML size: Good (<50KB average)');
}

// Check CSS size
if (cssAnalysis.totalSize > 200000) {
  score -= 15;
  issues.push('CSS bundle is large (>200KB)');
} else if (cssAnalysis.totalSize < 50000) {
  console.log('   ✅ CSS size: Excellent (<50KB)');
} else {
  console.log('   ✅ CSS size: Good (<200KB)');
}

// Check JS size
if (jsAnalysis.totalSize > 500000) {
  score -= 20;
  issues.push('JavaScript bundle is large (>500KB)');
} else if (jsAnalysis.totalSize < 100000) {
  console.log('   ✅ JS size: Excellent (<100KB)');
} else {
  console.log('   ✅ JS size: Good (<500KB)');
}

// Check image optimization
if (totalImages > 0) {
  const avgImageSize = totalImageSize / totalImages;
  if (avgImageSize > 200000) {
    score -= 15;
    issues.push('Images are not optimized (>200KB average)');
  } else if (avgImageSize < 50000) {
    console.log('   ✅ Image optimization: Excellent (<50KB average)');
  } else {
    console.log('   ✅ Image optimization: Good (<200KB average)');
  }
  
  // Check for WebP usage
  const webpPercentage = ((imageTypes['.webp'] || 0) / totalImages) * 100;
  if (webpPercentage > 80) {
    console.log(`   ✅ WebP usage: Excellent (${webpPercentage.toFixed(0)}%)`);
  } else if (webpPercentage > 50) {
    console.log(`   ✅ WebP usage: Good (${webpPercentage.toFixed(0)}%)`);
  } else {
    score -= 5;
    issues.push(`Low WebP usage (${webpPercentage.toFixed(0)}%)`);
  }
}

console.log(`\n   Overall Performance Score: ${score}/100`);

// Show issues if any
if (issues.length > 0) {
  console.log('\n⚠️  Issues Found:');
  issues.forEach(issue => {
    console.log(`   - ${issue}`);
  });
}

// Recommendations
console.log('\n💡 Recommendations:');
if (score === 100) {
  console.log('   ✨ Excellent! Your site is well optimized.');
} else {
  if (avgHTMLSize > 30000) {
    console.log('   - Consider lazy loading below-fold content');
  }
  if (cssAnalysis.totalSize > 100000) {
    console.log('   - Review CSS for unused styles');
  }
  if (jsAnalysis.totalSize > 200000) {
    console.log('   - Consider code splitting for JavaScript');
  }
  if (totalImages > 0 && totalImageSize / totalImages > 100000) {
    console.log('   - Optimize images further (use WebP, proper sizing)');
  }
}

console.log('\n' + '=' .repeat(60));
console.log('\n✅ Analysis complete!\n');
console.log('For detailed performance testing, use:');
console.log('   - Google PageSpeed Insights: https://pagespeed.web.dev');
console.log('   - Chrome DevTools Lighthouse (F12 → Lighthouse tab)');
console.log('   - GTmetrix: https://gtmetrix.com\n');