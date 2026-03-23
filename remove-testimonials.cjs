const fs = require('fs');
const path = require('path');

// List of files with TestimonialsCarousel imports and usage
const filesToClean = [
  'src/pages/basement-waterproofing-cost-toronto.astro',
  'src/pages/basement-waterproofing-brampton.astro',
  'src/pages/basement-waterproofing-mississauga.astro',
  'src/pages/services/basement-walkout-door-cutting.astro',
  'src/pages/services/concrete-works.astro',
  'src/pages/services/dampproofing.astro',
  'src/pages/services/demolition-services.astro',
  'src/pages/services/design-rendering-services.astro',
  'src/pages/services/excavation-services.astro',
  'src/pages/services/permit-drawings-services.astro',
  'src/pages/services/legal-basement-conversion.astro',
  'src/pages/blog/concrete-waterproofing-safety-protocols.astro',
  'src/pages/blog/winter-underpinning-requirements-toronto.astro',
  'src/pages/blog/reshoring-load-bearing-safety-guide.astro',
  'src/pages/blog/underpinning-structural-safety-protocols.astro',
  'src/pages/blog/waterproofing-materials-sump-pump-diy-guide.astro'
];

filesToClean.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove import statements
    content = content.replace(/import TestimonialsCarousel from ['"].*TestimonialsCarousel.*['"];?\n?/g, '');
    
    // Remove TestimonialsCarousel component usage
    content = content.replace(/<TestimonialsCarousel[^>]*\/>/g, '');
    
    // Remove entire testimonial sections (common patterns)
    // Pattern 1: Section with "Testimonials" or "Reviews" in heading
    content = content.replace(/<section[^>]*>[\s\S]*?<h[1-6][^>]*>.*?(Testimonial|Review|Customer).*?<\/h[1-6]>[\s\S]*?<TestimonialsCarousel[^>]*\/>[\s\S]*?<\/section>\n?/gi, '');
    
    // Pattern 2: Div containers with testimonial carousel
    content = content.replace(/<div[^>]*>[\s\S]*?<TestimonialsCarousel[^>]*\/>[\s\S]*?<\/div>\n?/g, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Cleaned: ${filePath}`);
  } else {
    console.log(`⚠️ File not found: ${filePath}`);
  }
});

console.log('\n✨ Testimonials removal complete!');