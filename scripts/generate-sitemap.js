// Sitemap Generator for Spaders Waterproofing
// Generates XML sitemap with priority and update frequency based on 2025 SEO requirements

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const DOMAIN = 'https://spaderswaterproofing.ca';
const TODAY = new Date().toISOString().split('T')[0];

// Page priorities based on business value and search intent
const priorities = {
  '/': 1.0,
  '/services/exterior-waterproofing': 0.9,
  '/services/interior-waterproofing': 0.9,
  '/services/foundation-repair': 0.9,
  '/services/emergency-waterproofing': 0.9,
  '/free-inspection': 0.9,
  '/government-rebates': 0.8,
  '/services': 0.8,
  '/pricing': 0.8,
  '/contact': 0.8,
  '/service-areas': 0.7,
  '/about': 0.7,
  '/blog': 0.7,
  '/resources': 0.6,
  '/case-studies': 0.6,
  '/tools': 0.5,
  '/warranty': 0.5,
  '/financing': 0.5
};

// Update frequencies based on content type
const changefreq = {
  '/': 'weekly',
  '/blog': 'weekly',
  '/pricing': 'monthly',
  '/government-rebates': 'monthly',
  '/services': 'monthly',
  '/case-studies': 'monthly',
  '/resources': 'monthly',
  '/about': 'yearly',
  '/warranty': 'yearly',
  '/contact': 'yearly'
};

async function generateSitemap() {
  try {
    // Get all .astro files
    const files = await glob('src/pages/**/*.astro', {
      ignore: ['src/pages/api/**', 'src/pages/_**']
    });
    
    // Convert file paths to URLs
    const urls = files.map(file => {
      let url = file
        .replace('src/pages', '')
        .replace('.astro', '')
        .replace('/index', '');
      
      // Handle Windows paths
      url = url.replace(/\\/g, '/');
      
      // Remove trailing slash except for homepage
      if (url !== '/' && url.endsWith('/')) {
        url = url.slice(0, -1);
      }
      
      return url || '/';
    });
    
    // Sort URLs by priority
    urls.sort((a, b) => {
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);
      return priorityB - priorityA;
    });
    
    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => {
  const fullUrl = `${DOMAIN}${url}`.replace('src/pages', '');
  const priority = getPriority(url);
  const freq = getChangefreq(url);
  const lastmod = getLastmod(url);
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}).join('\n')}
</urlset>`;
    
    // Write sitemap
    fs.writeFileSync('public/sitemap.xml', xml);
    console.log(`✅ Sitemap generated with ${urls.length} URLs`);
    
    // Generate sitemap index for large sites
    if (urls.length > 1000) {
      generateSitemapIndex();
    }
    
    // Generate robots.txt
    generateRobotsTxt();
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

function getPriority(url) {
  // Check exact match
  if (priorities[url] !== undefined) {
    return priorities[url];
  }
  
  // Check patterns
  if (url.startsWith('/services/')) return 0.8;
  if (url.startsWith('/locations/')) return 0.7;
  if (url.startsWith('/blog/')) return 0.6;
  if (url.startsWith('/resources/')) return 0.6;
  if (url.startsWith('/case-studies/')) return 0.6;
  if (url.startsWith('/tools/')) return 0.5;
  
  return 0.5; // Default priority
}

function getChangefreq(url) {
  // Check exact match
  if (changefreq[url]) return changefreq[url];
  
  // Check patterns
  for (const [pattern, freq] of Object.entries(changefreq)) {
    if (url.startsWith(pattern)) return freq;
  }
  
  return 'monthly'; // Default frequency
}

function getLastmod(url) {
  // For blog posts, use current date to signal freshness
  if (url.startsWith('/blog/')) {
    return TODAY;
  }
  
  // For pricing and rebates, use recent date
  if (url === '/pricing' || url === '/government-rebates') {
    const date = new Date();
    date.setDate(date.getDate() - 7); // 1 week ago
    return date.toISOString().split('T')[0];
  }
  
  // For everything else, use last month
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split('T')[0];
}

function generateSitemapIndex() {
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-images.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  fs.writeFileSync('public/sitemap-index.xml', indexXml);
}

function generateRobotsTxt() {
  const robotsTxt = `# Robots.txt for Spaders Waterproofing
# Updated: ${TODAY}

# Allow all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_astro/
Disallow: /thank-you
Disallow: /404

# Specific crawler rules
User-agent: Googlebot
Crawl-delay: 0
Allow: /

User-agent: Bingbot
Crawl-delay: 0
Allow: /

User-agent: Slurp
Crawl-delay: 0
Allow: /

User-agent: DuckDuckBot
Crawl-delay: 0
Allow: /

# Block bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Crawl-delay: 10

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml
Sitemap: ${DOMAIN}/sitemap-images.xml

# Host preference (for Yandex)
Host: ${DOMAIN}`;
  
  fs.writeFileSync('public/robots.txt', robotsTxt);
  console.log('✅ robots.txt generated');
}

// Run the generator
generateSitemap();