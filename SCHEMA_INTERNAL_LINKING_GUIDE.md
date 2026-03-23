# Schema Markup & Internal Linking Implementation Guide

## Overview
This guide explains how to implement structured data (schema markup) and internal linking across all pages for maximum SEO benefit.

---

## 1. SCHEMA MARKUP IMPLEMENTATION

### Available Schema Components

#### A. ServiceSchema Component
**Location:** `/src/components/ServiceSchema.astro`
**Use on:** All service pages

```astro
---
import ServiceSchema from "../../components/ServiceSchema.astro";

const serviceFAQs = [
  {
    question: "Your question here",
    answer: "Detailed answer"
  }
];

const serviceOffers = [
  {
    name: "Service Option Name",
    price: "$X,XXX-XX,XXX",
    description: "What's included"
  }
];
---

<ServiceSchema
  serviceName="Your Service Name"
  description="Comprehensive service description"
  priceRange="$X,XXX-$XX,XXX"
  offers={serviceOffers}
  faqs={serviceFAQs}
/>
```

#### B. SchemaMarkup Component (Existing)
**Location:** `/src/components/SchemaMarkup.astro`
**Types Available:**
- LocalBusiness (location pages)
- Service (service pages)
- FAQPage (FAQ sections)
- BreadcrumbList (all pages)
- Organization (homepage)
- WebPage (all pages)

```astro
<SchemaMarkup
  type="LocalBusiness"
  data={{
    city: "Toronto",
    description: "Local service description",
    latitude: 43.6532,
    longitude: -79.3832
  }}
/>
```

### Schema Implementation by Page Type

#### Service Pages
Every service page should include:
1. ServiceSchema with FAQs
2. BreadcrumbList
3. Service-specific offers/pricing

#### Location Pages
Every location page should include:
1. LocalBusiness schema
2. Service area information
3. Local reviews/ratings

#### Blog Posts
Blog posts should include:
1. Article schema
2. Author information
3. BreadcrumbList
4. FAQ schema where applicable

#### Product Pages
Product pages should include:
1. Product schema
2. Offer/pricing information
3. Reviews/ratings
4. BreadcrumbList

---

## 2. INTERNAL LINKING STRATEGY

### InternalLinks Component
**Location:** `/src/components/InternalLinks.astro`

#### Available Categories:
- `drainage` - Links to drainage-related services
- `waterproofing` - Links to waterproofing services
- `foundation` - Links to foundation repair services
- `emergency` - Links to emergency services
- `location` - Links to location pages

#### Usage:
```astro
import InternalLinks from "../../components/InternalLinks.astro";

<!-- Add contextual internal links -->
<InternalLinks 
  category="waterproofing"  // Choose relevant category
  currentPage="current-page-slug"  // Exclude current page from links
  limit={5}  // Number of links to show
/>
```

### Internal Linking Best Practices

#### 1. Contextual Placement
Add internal links where they make sense:
- After introducing a related concept
- In the middle of long content sections
- Before the final CTA
- Within FAQ answers

#### 2. Link Distribution by Page Type

**Service Pages:**
- Link to related services (3-5 links)
- Link to relevant blog posts (2-3 links)
- Link to location pages (2-3 links)
- Link to product pages if applicable

**Blog Posts:**
- Link to services mentioned (3-5 links)
- Link to other related blog posts (2-3 links)
- Link to products mentioned

**Location Pages:**
- Link to main services (5-7 links)
- Link to case studies in that area
- Link to neighboring locations

#### 3. Anchor Text Guidelines
- Use descriptive anchor text
- Vary anchor text naturally
- Include keywords but don't over-optimize
- Make links contextually relevant

---

## 3. IMPLEMENTATION CHECKLIST

### For Each Service Page:
- [ ] Add ServiceSchema with FAQs and offers
- [ ] Include 4-6 internal links using InternalLinks component
- [ ] Add manual contextual links within content
- [ ] Ensure breadcrumb schema is present
- [ ] Add related services section

### For Each Location Page:
- [ ] Add LocalBusiness schema
- [ ] Include service area details
- [ ] Link to 5-7 main services
- [ ] Add neighborhood/city specific content
- [ ] Include local testimonials/reviews

### For Each Blog Post:
- [ ] Add Article schema
- [ ] Link to mentioned services (3-5)
- [ ] Link to related posts (2-3)
- [ ] Include FAQ schema if Q&A format
- [ ] Add author information

### For Product Pages:
- [ ] Add Product schema with pricing
- [ ] Include availability information
- [ ] Link to related services
- [ ] Add installation/service links
- [ ] Include reviews/ratings

---

## 4. AUTOMATED IMPLEMENTATION

### Quick Service Page Template:
```astro
---
import Layout from "../../layouts/Layout.astro";
import ServiceSchema from "../../components/ServiceSchema.astro";
import InternalLinks from "../../components/InternalLinks.astro";

// Define your service FAQs
const serviceFAQs = [
  {
    question: "How much does [service] cost?",
    answer: "Detailed pricing explanation..."
  },
  {
    question: "How long does [service] take?",
    answer: "Timeline explanation..."
  }
];

// Define service packages/offers
const serviceOffers = [
  {
    name: "Basic Package",
    price: "$X,XXX",
    description: "What's included in basic"
  },
  {
    name: "Premium Package",
    price: "$XX,XXX",
    description: "What's included in premium"
  }
];
---

<Layout title="Service Name | DrySpace" description="Meta description">
  
  <!-- Add Schema -->
  <ServiceSchema
    serviceName="Your Service"
    description="Full service description"
    priceRange="$X,XXX-$XX,XXX"
    offers={serviceOffers}
    faqs={serviceFAQs}
  />

  <!-- Your page content -->
  <main>
    <!-- Content sections -->
    
    <!-- Add Internal Links -->
    <InternalLinks category="relevant-category" currentPage="current-slug" />
  </main>
</Layout>
```

---

## 5. MONITORING & TESTING

### Schema Testing:
1. Use Google's Rich Results Test: https://search.google.com/test/rich-results
2. Check structured data in Google Search Console
3. Validate with Schema.org validator

### Internal Linking Audit:
1. Track internal link distribution
2. Monitor click-through rates
3. Check for broken internal links
4. Ensure no orphan pages

### Performance Metrics:
- Organic traffic growth
- Average session duration
- Pages per session
- Bounce rate reduction
- SERP feature appearances

---

## 6. PRIORITY IMPLEMENTATION ORDER

### Phase 1 (Immediate):
1. Add ServiceSchema to all service pages
2. Implement InternalLinks on high-traffic pages
3. Add FAQ schema to pages with Q&A content

### Phase 2 (Week 1):
1. Add LocalBusiness schema to location pages
2. Implement breadcrumb schema site-wide
3. Add contextual internal links to blog posts

### Phase 3 (Week 2):
1. Add Product schema to product pages
2. Implement review/rating schema
3. Add HowTo schema for instructional content

### Phase 4 (Ongoing):
1. Monitor schema performance in Search Console
2. Adjust internal linking based on user behavior
3. Add new schema types as content expands

---

## 7. COMMON SCHEMA ERRORS TO AVOID

1. **Missing Required Fields:** Always include name, description, provider
2. **Invalid URLs:** Ensure all URLs are absolute and working
3. **Duplicate Schemas:** Don't repeat the same schema multiple times
4. **Incorrect Types:** Use appropriate schema type for content
5. **Missing Breadcrumbs:** Every page should have breadcrumb navigation

---

## 8. INTERNAL LINKING ERRORS TO AVOID

1. **Over-Optimization:** Don't use exact match anchor text repeatedly
2. **Irrelevant Links:** Only link when contextually appropriate
3. **Link Stuffing:** Limit to 5-10 internal links per page
4. **Broken Links:** Regularly audit and fix broken internal links
5. **Orphan Pages:** Ensure every page has internal links pointing to it

---

## EXPECTED RESULTS

With proper implementation:
- **Rich Snippets:** 30-60 days for appearance
- **Improved CTR:** 20-30% increase from rich results
- **Better Rankings:** 15-25% improvement from internal linking
- **Lower Bounce Rate:** 10-20% reduction from better navigation
- **Increased Pages/Session:** 25-40% increase from internal links

---

## SUPPORT & QUESTIONS

For implementation help:
1. Check existing implemented pages for examples
2. Test schema with Google's tools before deployment
3. Monitor Search Console for errors
4. Track internal link performance in Analytics