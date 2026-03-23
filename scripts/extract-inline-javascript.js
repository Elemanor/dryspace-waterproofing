import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create assets/js directory if it doesn't exist
const jsDir = path.join(__dirname, '..', 'public', 'assets', 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

function extractJavaScript(filePath, fileName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let extracted = false;
  
  // Extract script tags with inline JavaScript (excluding type="module" which are usually small)
  const scriptRegex = /<script(?![^>]*type=["']module["'])(?![^>]*src=)([^>]*)>([\s\S]*?)<\/script>/gi;
  const scripts = [];
  let match;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    const scriptContent = match[2].trim();
    // Only extract scripts larger than 500 characters
    if (scriptContent.length > 500) {
      scripts.push(scriptContent);
    }
  }
  
  if (scripts.length > 0) {
    // Generate JavaScript filename based on page name
    const baseName = path.basename(fileName, '.astro');
    const jsFileName = `${baseName}.js`;
    const jsFilePath = path.join(jsDir, jsFileName);
    
    // Combine all scripts into one file
    const combinedScript = scripts.join('\n\n// --- Section Break ---\n\n');
    
    // Wrap in IIFE to avoid global scope pollution
    const wrappedScript = `(function() {
  'use strict';
  
${combinedScript}
})();`;
    
    // Save the JavaScript file
    fs.writeFileSync(jsFilePath, wrappedScript);
    
    // Replace inline scripts with external reference
    content = content.replace(scriptRegex, (match, attributes, scriptContent) => {
      if (scriptContent.trim().length > 500) {
        // Return empty string to remove the inline script
        return '';
      }
      return match; // Keep small scripts
    });
    
    // Add external script reference before closing body tag
    const bodyCloseIndex = content.lastIndexOf('</body>');
    if (bodyCloseIndex > -1) {
      const scriptTag = `  <script src="/assets/js/${jsFileName}" defer></script>\n`;
      content = content.slice(0, bodyCloseIndex) + scriptTag + content.slice(bodyCloseIndex);
    } else {
      // If no body tag, add at the end
      content += `\n<script src="/assets/js/${jsFileName}" defer></script>\n`;
    }
    
    // Save the modified file
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Extracted JavaScript from ${fileName}`);
    console.log(`   Created: public/assets/js/${jsFileName} (${Math.round(wrappedScript.length / 1024)}KB)`);
    
    return true;
  }
  
  return false;
}

// Check specific pages identified in the audit
const problematicPages = [
  'src/pages/services/sump-pump-installation.astro',
  'src/pages/services/weeping-tile.astro',
  'src/pages/services/underpinning.astro'
];

console.log('🔧 Extracting Inline JavaScript to External Files\n');
console.log('═══════════════════════════════════════════════════\n');

let totalExtracted = 0;

// First check the specific problematic pages
problematicPages.forEach(page => {
  const fullPath = path.join(__dirname, '..', page);
  if (fs.existsSync(fullPath)) {
    if (extractJavaScript(fullPath, page)) {
      totalExtracted++;
    }
  }
});

// Then check all service pages for other large scripts
const servicesDir = path.join(__dirname, '..', 'src', 'pages', 'services');
if (fs.existsSync(servicesDir)) {
  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.astro'));
  
  files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    
    // Skip if already processed
    if (!problematicPages.includes(relativePath.replace(/\\/g, '/'))) {
      if (extractJavaScript(filePath, relativePath)) {
        totalExtracted++;
      }
    }
  });
}

console.log('\n═══════════════════════════════════════════════════\n');
console.log(`📊 Summary: Extracted JavaScript from ${totalExtracted} files\n`);

if (totalExtracted > 0) {
  console.log('✨ JavaScript extraction complete!\n');
  console.log('Benefits:');
  console.log('• Improved INP (Interaction to Next Paint)');
  console.log('• Better caching of JavaScript files');
  console.log('• Reduced HTML file sizes');
  console.log('• Scripts load with defer for better performance\n');
  
  console.log('Next steps:');
  console.log('1. Test the pages to ensure JavaScript still works');
  console.log('2. Minify the extracted JavaScript files');
  console.log('3. Consider bundling common functions');
}