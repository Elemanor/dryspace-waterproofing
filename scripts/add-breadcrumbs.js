import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to extract service name from filename
function getServiceName(filename) {
  const name = path.basename(filename, '.astro')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return name === 'Index' ? 'Services' : name;
}

// Add breadcrumbs to a file
async function addBreadcrumbs(filePath, breadcrumbType) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already has breadcrumbs
  if (content.includes('Breadcrumbs from')) {
    console.log(`✓ Skipping ${filePath} - already has breadcrumbs`);
    return;
  }

  // Skip the index pages as they don't need breadcrumbs
  if (path.basename(filePath) === 'index.astro' && breadcrumbType !== 'services') {
    return;
  }

  const fileName = path.basename(filePath, '.astro');
  
  // Add import if not present
  if (!content.includes("import Breadcrumbs from")) {
    const importLine = breadcrumbType === 'services' 
      ? "import Breadcrumbs from '../../components/Breadcrumbs.astro';"
      : breadcrumbType === 'blog'
      ? "import Breadcrumbs from '../../components/Breadcrumbs.astro';"
      : breadcrumbType === 'locations' || breadcrumbType === 'neighborhoods'
      ? "import Breadcrumbs from '../../components/Breadcrumbs.astro';"
      : "import Breadcrumbs from '../../components/Breadcrumbs.astro';";

    // Find the last import statement
    const importMatch = content.match(/^import .+ from .+;$/gm);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      content = content.slice(0, lastImportIndex + lastImport.length) + 
                '\n' + importLine + 
                content.slice(lastImportIndex + lastImport.length);
    }
  }

  // Generate breadcrumb items based on type
  let breadcrumbItems = '';
  
  if (breadcrumbType === 'services') {
    const serviceName = getServiceName(filePath);
    breadcrumbItems = `[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "${serviceName}" }
      ]`;
  } else if (breadcrumbType === 'locations') {
    const locationName = getServiceName(filePath);
    breadcrumbItems = `[
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: "${locationName}" }
      ]`;
  } else if (breadcrumbType === 'neighborhoods') {
    const neighborhoodName = getServiceName(filePath);
    breadcrumbItems = `[
        { name: "Home", url: "/" },
        { name: "Toronto", url: "/locations/toronto" },
        { name: "Neighborhoods", url: "/locations/toronto#neighborhoods" },
        { name: "${neighborhoodName}" }
      ]`;
  } else if (breadcrumbType === 'blog') {
    const postTitle = getServiceName(filePath);
    breadcrumbItems = `[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: "${postTitle}" }
      ]`;
  } else if (breadcrumbType === 'resources') {
    const resourceName = getServiceName(filePath);
    breadcrumbItems = `[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "${resourceName}" }
      ]`;
  }

  // Find where to insert breadcrumbs (after opening PageLayout tag)
  const pageLayoutMatch = content.match(/<PageLayout[\s\S]*?>\s*/);
  if (pageLayoutMatch) {
    const insertIndex = pageLayoutMatch.index + pageLayoutMatch[0].length;
    const breadcrumbCode = `
  <!-- Breadcrumbs -->
  <div class="container mx-auto px-4 mt-4">
    <Breadcrumbs 
      items={${breadcrumbItems}}
    />
  </div>

`;
    
    content = content.slice(0, insertIndex) + breadcrumbCode + content.slice(insertIndex);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added breadcrumbs to ${filePath}`);
  } else {
    console.log(`⚠️ Could not find PageLayout in ${filePath}`);
  }
}

// Process all files
async function processAllPages() {
  console.log('Adding breadcrumbs to all pages...\n');
  
  // Services pages
  const serviceFiles = await glob('src/pages/services/*.astro');
  for (const file of serviceFiles) {
    if (!file.includes('exterior-waterproofing.astro')) { // Skip already done
      await addBreadcrumbs(file, 'services');
    }
  }
  
  // Location pages
  const locationFiles = await glob('src/pages/locations/*.astro');
  for (const file of locationFiles) {
    await addBreadcrumbs(file, 'locations');
  }
  
  // Neighborhood pages
  const neighborhoodFiles = await glob('src/pages/neighborhoods/*.astro');
  for (const file of neighborhoodFiles) {
    await addBreadcrumbs(file, 'neighborhoods');
  }
  
  // Blog pages
  const blogFiles = await glob('src/pages/blog/*.astro');
  for (const file of blogFiles) {
    if (!file.endsWith('index.astro')) {
      await addBreadcrumbs(file, 'blog');
    }
  }
  
  // Resource pages
  const resourceFiles = await glob('src/pages/resources/*.astro');
  for (const file of resourceFiles) {
    await addBreadcrumbs(file, 'resources');
  }
  
  console.log('\n✨ Breadcrumbs added to all pages!');
}

processAllPages().catch(console.error);