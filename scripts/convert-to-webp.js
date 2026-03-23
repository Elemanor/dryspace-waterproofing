/**
 * SuperClaude Image Optimization Script
 * Converts all JPG/PNG images to WebP format
 * Using Factory Pattern for image processing
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🖼️  SuperClaude Image Optimizer - WebP Conversion\n');
console.log('=' .repeat(60));

// Image processing factory
class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0
    };
  }

  async processDirectory(dir) {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        await this.processDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(entry).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          await this.convertToWebP(fullPath);
        }
      }
    }
  }

  async convertToWebP(inputPath) {
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Skip if WebP already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping: ${path.basename(inputPath)} (WebP exists)`);
      this.stats.skipped++;
      return;
    }

    try {
      const inputSize = fs.statSync(inputPath).size;
      this.stats.totalSizeBefore += inputSize;

      console.log(`🔄 Converting: ${path.basename(inputPath)}`);
      
      // Use sharp to convert to WebP with quality optimization
      await sharp(inputPath)
        .webp({ 
          quality: 85,  // Good quality/size balance
          effort: 6,    // Maximum compression effort
          lossless: false
        })
        .toFile(outputPath);
      
      const outputSize = fs.statSync(outputPath).size;
      this.stats.totalSizeAfter += outputSize;
      
      const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
      console.log(`   ✅ Saved ${reduction}% (${this.formatBytes(inputSize)} → ${this.formatBytes(outputSize)})`);
      
      this.stats.processed++;
    } catch (error) {
      console.error(`   ❌ Error converting ${path.basename(inputPath)}: ${error.message}`);
      this.stats.errors++;
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  printReport() {
    console.log('\n' + '=' .repeat(60));
    console.log('\n📊 Conversion Summary:\n');
    console.log(`   Images processed: ${this.stats.processed}`);
    console.log(`   Images skipped: ${this.stats.skipped}`);
    console.log(`   Errors: ${this.stats.errors}`);
    
    if (this.stats.processed > 0) {
      const totalReduction = ((this.stats.totalSizeBefore - this.stats.totalSizeAfter) / this.stats.totalSizeBefore * 100).toFixed(1);
      console.log(`\n   Total size before: ${this.formatBytes(this.stats.totalSizeBefore)}`);
      console.log(`   Total size after: ${this.formatBytes(this.stats.totalSizeAfter)}`);
      console.log(`   Total reduction: ${totalReduction}%`);
    }
    
    console.log('\n✅ WebP conversion complete!\n');
  }
}

// Check if sharp is installed
try {
  const optimizer = new ImageOptimizer();
  
  // Process both public and assets directories
  const directories = [
    path.join(process.cwd(), 'public', 'images'),
    path.join(process.cwd(), 'assets', 'waterproofing')
  ];
  
  console.log('\n📁 Processing directories:');
  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`   - ${dir}`);
      await optimizer.processDirectory(dir);
    }
  }
  
  optimizer.printReport();
  
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log('⚠️  Sharp not installed. Installing now...\n');
    console.log('Run: npm install sharp');
    console.log('Then run this script again.');
  } else {
    console.error('Error:', error);
  }
}