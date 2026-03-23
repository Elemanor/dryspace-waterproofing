import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all location files
const locationsDir = path.join(__dirname, '..', 'src', 'pages', 'locations');
const files = fs.readdirSync(locationsDir).filter(f => f.endsWith('.astro'));

console.log(`Found ${files.length} location files to process`);

files.forEach(file => {
  const filePath = path.join(locationsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  console.log(`Processing ${file}...`);
  
  // Fix Local Information Section - remove rounded corners and gradients
  if (content.includes('rounded-xl')) {
    content = content.replace(/rounded-xl/g, '');
    modified = true;
  }
  
  if (content.includes('rounded-full')) {
    // Keep rounded-full only for small badges/pills if needed
    // but remove from main sections
    content = content.replace(/(<div[^>]*class="[^"]*)(rounded-full)([^"]*"[^>]*>)/g, (match, p1, p2, p3) => {
      // Only keep rounded-full for small neighborhood badges
      if (match.includes('px-4 py-2')) {
        return match;
      }
      return p1 + p3;
    });
    modified = true;
  }
  
  // Replace gradient backgrounds with solid colors
  if (content.includes('bg-gray-50 dark:bg-gray-800')) {
    content = content.replace(/bg-gray-50 dark:bg-gray-800/g, 'bg-white border-2 border-gray-300');
    modified = true;
  }
  
  if (content.includes('bg-blue-50 dark:bg-blue-900/20')) {
    content = content.replace(/bg-blue-50 dark:bg-blue-900\/20/g, 'bg-gray-900 border-2 border-gray-300');
    modified = true;
  }
  
  // Fix text colors for the gray-900 background
  if (content.includes('text-blue-900 dark:text-blue-100')) {
    content = content.replace(/text-blue-900 dark:text-blue-100/g, 'text-white');
    modified = true;
  }
  
  if (content.includes('text-blue-800 dark:text-blue-200')) {
    content = content.replace(/text-blue-800 dark:text-blue-200/g, 'text-gray-300');
    modified = true;
  }
  
  // Convert h3 headings in Local Information to uppercase
  content = content.replace(
    /<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">\s*([^<]+)\s*<\/h3>/g,
    (match, text) => {
      const upperText = text.trim().toUpperCase();
      return `<h3 class="text-xl font-bold text-gray-900 mb-6 uppercase">${upperText}</h3>`;
    }
  );
  
  content = content.replace(
    /<h3 class="text-xl font-bold text-white mb-4">\s*([^<]+)\s*<\/h3>/g,
    (match, text) => {
      const upperText = text.trim().toUpperCase();
      return `<h3 class="text-xl font-bold text-white mb-6 uppercase">${upperText}</h3>`;
    }
  );
  
  // Fix the main section backgrounds
  if (content.includes('bg-white dark:bg-gray-900')) {
    content = content.replace(/py-20 bg-white dark:bg-gray-900/g, 'py-16 bg-gray-50');
    modified = true;
  }
  
  // Fix main heading styles in Local Information
  content = content.replace(
    /<h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">\s*([^<]+)\s*<\/h2>/g,
    (match, text) => {
      const upperText = text.trim().toUpperCase();
      return `<h2 class="text-4xl font-bold text-gray-900 mb-4 uppercase">${upperText}</h2>`;
    }
  );
  
  // Remove all dark mode classes
  content = content.replace(/dark:[a-z0-9-/]+/g, '');
  
  // Fix prose classes
  content = content.replace(/prose prose-lg max-w-none/g, 'max-w-3xl mx-auto');
  content = content.replace(/text-gray-600\s+/g, 'text-gray-700 ');
  
  // Fix the neighborhood badges - convert to industrial style
  content = content.replace(
    /bg-gray-100\s+px-4 py-2 rounded-full/g,
    'border-2 border-gray-300 px-4 py-2'
  );
  
  // Fix bullet points styling
  content = content.replace(
    /<li>([^<]+)<\/li>/g,
    (match, text) => {
      if (text.includes(':')) {
        const [label, value] = text.split(':');
        return `<li class="flex justify-between items-center pb-2 border-b border-gray-200">
                <span class="text-sm font-semibold text-gray-700 uppercase">${label.trim()}</span>
                <span class="text-sm font-bold text-gray-900">${value ? value.trim().toUpperCase() : ''}</span>
              </li>`;
      }
      return `<li class="text-sm text-gray-300 flex items-start">
                <span class="mr-2 text-yellow-500">•</span>
                <span>${text.trim()}</span>
              </li>`;
    }
  );
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`⏭️  ${file} already styled correctly`);
  }
});

console.log('\n✨ All location pages have been updated with industrial styling!');