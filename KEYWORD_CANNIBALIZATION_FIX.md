# Keyword Cannibalization Fix Action Plan
## DrySpace Waterproofing - Content Consolidation Strategy

Generated: January 9, 2025
Status: **CRITICAL - Immediate Action Required**

---

## 🚨 Executive Summary

**56+ pages** are competing for the same keywords, causing:
- Diluted ranking signals
- Confused search engines
- Lower CTR (currently 0.15%)
- Position 64 instead of top 10

**Expected Impact After Fix:**
- 40-60% improvement in rankings
- 200-300% increase in CTR
- Clear content hierarchy
- Better user experience

---

## 📋 Phase 1: Critical Redirects (IMMEDIATE)

### Redirects to Implement in `netlify.toml`:

```toml
# Fix Toronto cannibalization
[[redirects]]
  from = "/enhanced"
  to = "/"
  status = 301

# Fix Mississauga duplication
[[redirects]]
  from = "/locations/mississauga"
  to = "/basement-waterproofing-mississauga"
  status = 301

# Fix Brampton duplication  
[[redirects]]
  from = "/locations/brampton"
  to = "/basement-waterproofing-brampton"
  status = 301

# Fix calculator duplication
[[redirects]]
  from = "/tools/waterproofing-cost-calculator"
  to = "/basement-waterproofing-cost-toronto"
  status = 301

# Fix Toronto location to homepage
[[redirects]]
  from = "/locations/toronto"
  to = "/"
  status = 301
```

---

## 🎯 Phase 2: Content Differentiation Strategy

### Primary Keyword Assignments

| **Page** | **Primary Keywords** | **Search Intent** | **Content Focus** |
|----------|---------------------|-------------------|-------------------|
| `/index.astro` | basement waterproofing toronto, toronto waterproofing | Commercial | Emergency service, rebates, city-wide |
| `/basement-waterproofing-mississauga` | basement waterproofing mississauga, mississauga waterproofing | Commercial | Mississauga-specific, neighborhoods |
| `/basement-waterproofing-brampton` | basement waterproofing brampton, brampton waterproofing | Commercial | Brampton-specific, new homes |
| `/basement-waterproofing-cost-toronto` | basement waterproofing cost toronto, waterproofing calculator | Transactional | Pricing, calculator, cost factors |
| `/services/interior-waterproofing` | interior basement waterproofing, internal waterproofing | Informational | Method details, process |
| `/services/exterior-waterproofing` | exterior basement waterproofing, external waterproofing | Informational | Method details, process |
| `/services/sump-pump-installation` | sump pump installation toronto, sump pump repair | Commercial | Installation, maintenance |
| `/services/foundation-repair` | foundation repair toronto, foundation crack repair | Commercial | Repair methods, costs |

---

## 🔧 Phase 3: Content Consolidation Actions

### Homepage (`/index.astro`)
**REMOVE:**
- Detailed service descriptions
- Neighborhood-specific content
- Duplicate cost calculators

**KEEP/ADD:**
- Toronto-wide service focus
- Emergency response emphasis
- Government rebate information
- Brief service overview with links

**Meta Title:** "Basement Waterproofing Toronto | 24/7 Emergency | $3,400 Rebate"
**Meta Description:** Focus on Toronto, emergency, rebates

---

### Mississauga Page (`/basement-waterproofing-mississauga.astro`)
**REMOVE:**
- Generic Toronto content
- Duplicate service processes

**KEEP/ADD:**
- Mississauga neighborhoods (Port Credit, Streetsville, etc.)
- Local building codes
- Mississauga-specific case studies
- Credit River flooding issues

**Meta Title:** "Basement Waterproofing Mississauga | Port Credit to Meadowvale | 24/7"
**Meta Description:** Focus on Mississauga neighborhoods and local issues

---

### Brampton Page (`/basement-waterproofing-brampton.astro`)
**REMOVE:**
- Generic GTA content
- Duplicate pricing tables

**KEEP/ADD:**
- New home warranty issues
- Brampton-specific soil conditions
- Local permit requirements
- Bramalea, Heart Lake content

**Meta Title:** "Basement Waterproofing Brampton | New Home Warranty Issues | Same Day"
**Meta Description:** Focus on Brampton's unique challenges

---

### Cost Page (`/basement-waterproofing-cost-toronto.astro`)
**REMOVE:**
- Location-specific content
- Service process details

**KEEP/ADD:**
- Comprehensive pricing tables
- Cost calculator tool
- Factors affecting price
- Financing options
- Rebate calculations

**Meta Title:** "Basement Waterproofing Cost Toronto 2025 | Calculator | $3,400 Rebates"
**Meta Description:** Focus on pricing, calculator, rebates

---

## 📝 Phase 4: Meta Tag Optimization

### Unique Title Formulas by Page Type

**Service Pages:**
```
[Service Name] in Toronto | [Unique Benefit] | DrySpace
Example: "Interior Waterproofing Toronto | No Excavation Required | DrySpace"
```

**Location Pages (Keep):**
```
[Service] in [Neighborhood] | [Local Issue] | DrySpace
Example: "Waterproofing in Scarborough | Bluffs Erosion Solutions | DrySpace"
```

**Blog Posts:**
```
[Educational Topic] | [Year] Guide | DrySpace Blog
Example: "Why Basements Leak After Rain | 2025 Guide | DrySpace Blog"
```

---

## 🔗 Phase 5: Internal Linking Structure

### New Linking Hierarchy:

```
Homepage (Toronto)
├── Primary Service Pages
│   ├── Interior Waterproofing
│   ├── Exterior Waterproofing
│   ├── Sump Pump Installation
│   └── Foundation Repair
├── Major City Pages
│   ├── Mississauga (dedicated page)
│   └── Brampton (dedicated page)
├── Cost/Calculator Page
└── Blog (Educational content only)
```

### Linking Rules:
1. **Service pages** → Link to relevant city pages
2. **City pages** → Link to relevant service pages
3. **Blog posts** → Link to service pages (not competing city pages)
4. **Never** → Create circular links between competing pages

---

## 📊 Phase 6: Content Rewriting Priority

### High Priority Rewrites (Week 1):
1. **Homepage** - Remove duplicate content, focus on Toronto
2. **Enhanced page** - Delete or redirect (duplicate of homepage)
3. **Location pages** - Differentiate from main city pages

### Medium Priority (Week 2):
1. **Service pages** - Remove location-specific content
2. **Blog posts** - Shift to educational intent only
3. **FAQ pages** - Consolidate duplicate questions

### Low Priority (Week 3):
1. **Neighborhood pages** - Add unique local content
2. **Product pages** - Focus on product, not service
3. **Resource pages** - Educational focus only

---

## 🎬 Implementation Checklist

### Week 1: Immediate Actions
- [ ] Add 301 redirects to netlify.toml
- [ ] Deploy redirects to production
- [ ] Update internal links to avoid redirect chains
- [ ] Remove `/enhanced.astro` page
- [ ] Update sitemap.xml

### Week 2: Content Updates
- [ ] Rewrite homepage to focus on Toronto only
- [ ] Update Mississauga page - remove Toronto content
- [ ] Update Brampton page - remove generic content
- [ ] Consolidate cost content to single page
- [ ] Update all meta titles/descriptions

### Week 3: Service Page Cleanup
- [ ] Remove location content from service pages
- [ ] Add clear CTAs to appropriate location pages
- [ ] Update service page meta tags
- [ ] Fix internal linking structure

### Week 4: Blog & Resources
- [ ] Shift blog posts to educational intent
- [ ] Update blog meta tags for informational queries
- [ ] Remove commercial CTAs from educational content
- [ ] Add "Related Services" sections instead

---

## 📈 Success Metrics

### Track Weekly in Search Console:
1. **Average Position** - Target: 64 → 30 → 15 → Top 10
2. **CTR** - Target: 0.15% → 0.5% → 1.5% → 3%
3. **Impressions** - Should increase as rankings improve
4. **Pages per Keyword** - Should decrease to 1 primary page

### Monthly Reviews:
- Check for new cannibalization issues
- Monitor redirect performance
- Update content based on ranking changes
- Adjust strategy based on results

---

## ⚠️ Critical Warnings

### DO NOT:
- Create new pages targeting existing keywords
- Copy content between location pages
- Use identical meta titles/descriptions
- Target the same keyword on multiple pages

### ALWAYS:
- Check existing pages before creating new ones
- Use unique meta tags for every page
- Assign one primary keyword per page
- Link to (not duplicate) related content

---

## 🚀 Expected Results Timeline

### Week 1-2: 
- Google recognizes redirects
- Ranking signals start consolidating

### Week 3-4:
- Rankings begin improving
- CTR increases as better pages rank

### Month 2:
- 20-30 position improvement expected
- CTR should double or triple

### Month 3:
- Target top 20 positions achieved
- Significant traffic increase

### Month 4:
- Top 10 rankings for primary keywords
- 10x improvement in organic traffic

---

## 📞 Support & Monitoring

### Weekly Tasks:
1. Check Search Console for ranking changes
2. Monitor 404 errors from redirects
3. Update internal links as needed
4. Document ranking improvements

### Tools to Use:
- Google Search Console - Primary monitoring
- Screaming Frog - Find redirect chains
- Ahrefs/SEMrush - Track keyword rankings
- Google Analytics - Monitor traffic changes

---

*This plan addresses all 56+ instances of keyword cannibalization. Proper implementation will significantly improve search rankings and organic traffic.*