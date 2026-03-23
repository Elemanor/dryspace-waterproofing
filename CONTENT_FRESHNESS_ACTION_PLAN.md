# Content Freshness Action Plan
## DrySpace Waterproofing - Q2 2026 Content Updates

**Date:** March 23, 2026
**Priority:** HIGH - Implement within 2 weeks for maximum seasonal impact

---

## PART 1: IMMEDIATE BLOG DATE UPDATES (1 Hour)

### Current State
All blog articles have `publishDate: 2024-12-20` (~92 days old in March 2026)

### Action Items

**1. Update All Blog File Publish Dates**

**Files to Update (20 blog posts):**

1. `basement-smells-musty-after-rain.astro`
2. `basement-underpinning-cost-toronto-2025.astro` → rename to `-2026`
3. `basement-waterproofing-cost-toronto-2025.astro` → rename to `-2026`
4. `concrete-waterproofing-safety-protocols.astro`
5. `diy-vs-professional-waterproofing.astro`
6. `french-drain-vs-weeping-tile.astro`
7. `interior-vs-exterior-waterproofing.astro`
8. `living-at-home-during-underpinning.astro`
9. `reshoring-load-bearing-safety-guide.astro`
10. `signs-your-foundation-needs-repair.astro`
11. `sump-pump-types-comparison-guide.astro`
12. `underpinning-concrete-strength-requirements.astro`
13. `underpinning-methods-bench-flush-projection.astro`
14. `underpinning-structural-safety-protocols.astro`
15. `water-coming-through-basement-floor.astro`
16. `waterproofing-materials-sump-pump-diy-guide.astro`
17. `white-powder-on-basement-walls.astro`
18. `why-is-my-basement-leaking.astro`
19. `winter-underpinning-requirements-toronto.astro`
20. `index.astro` (blog index)

**Change Template:**
```diff
- const publishDate = new Date('2024-12-20');
+ const publishDate = new Date('2026-03-20');  // or spread across March
+ const lastModified = new Date('2026-03-20');

// Add to frontmatter if not present:
+ import { lastModified } from '../lib/metadata';  // or inline date
```

**Spread Publish Dates Across March:**
- 5 posts: 2026-03-08
- 5 posts: 2026-03-15
- 5 posts: 2026-03-20
- 5 posts: 2026-03-22

This gives appearance of continuous content updates vs. "batch published all at once"

---

### 2. Update ALL Title Tags with Year Change

**Current Titles Using "2025" (must change to "2026"):**

| Current Title | New Title |
|---------------|-----------|
| "Basement Underpinning Cost Toronto 2025" | "Basement Underpinning Cost Toronto 2026" |
| "Basement Waterproofing Cost Toronto 2025" | "Basement Waterproofing Cost Toronto 2026" |
| "Winter Underpinning Requirements Toronto 2025" | "Winter Underpinning Requirements Toronto 2026 [Updated]" |

**Files:**
- `src/pages/blog/basement-underpinning-cost-toronto-2025.astro` (line ~10 in title)
- `src/pages/blog/basement-waterproofing-cost-toronto-2025.astro` (line ~42 in title)

---

### 3. Add "Updated: March 2026" Badges to Posts

**Implementation:**
Add this section to all blog article headers:

```astro
<div class="flex flex-wrap gap-2 mb-6">
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700">
    Updated: March 2026
  </span>
  <!-- Existing category badge -->
</div>
```

**Visual Signal:**
Readers immediately see "this is current" instead of "stale 2024 content"

---

## PART 2: SERVICE PAGE PRICING UPDATES (1.5 Hours)

### Current Issue
Service pages show pricing from ~2024, no inflation adjustment for 2026

### Files to Update (47 service pages)
All files in `/src/pages/services/`

### Pricing Update Template

**For each service page, find pricing section and update:**

```diff
- price: "$12,000 - $40,000",
+ price: "$12,500 - $41,500",  // ~4% inflation adjustment
  description: "Complete protection plus structural upgrades"
```

### CPI Adjustments (Canada 2024-2026)
- 2024: ~2.1% inflation
- 2025 (est.): ~2.5% inflation
- Total ~4.5% adjustment reasonable

### Example Updates

**Exterior Waterproofing (exterior-waterproofing.astro)**
```diff
- price: "$200-$350 per linear foot"
+ price: "$210-$365 per linear foot"  // 5% adjustment
```

**Interior Waterproofing (interior-waterproofing.astro)**
```diff
- price: "$150-$300 per linear foot"
+ price: "$155-$315 per linear foot"  // 3.5% adjustment
```

**Underpinning (underpinning.astro)**
```diff
- price: "Starting at $15,000"
+ price: "Starting at $15,750"  // 5% adjustment
```

---

## PART 3: CREATE 5 NEW BLOG POSTS (8 Hours)

### Post 1: SEASONAL - Spring Flooding Prevention (2,500 words)
**URL:** `/guides/spring-basement-flooding-prevention-2026/`
**Priority:** HIGHEST (Spring = peak flood season in Toronto)
**Publish Date:** 2026-03-22

**Outline:**
1. Why Spring is Peak Flooding Season in GTA (soil saturation, melt water)
2. Early Warning Signs Your Basement Will Flood
3. 10-Point Spring Basement Inspection Checklist
4. Quick Fixes Before Heavy Rains (caulk, downspouts, grading)
5. When to Call Professionals (vs DIY)
6. Emergency Response Timeline
7. Insurance Coverage for Spring Floods
8. CTA: Free Inspection Before Rain Season

**SEO Keywords:**
- spring basement flooding toronto
- prevent basement flooding
- basement flooding season
- gta spring water damage

**Expected Impact:** +50-100 monthly impressions, 5-10 clicks

---

### Post 2: PRODUCT COMPARISON - Membranes & Waterproofing Materials 2026 (2,000 words)
**URL:** `/guides/waterproofing-membranes-comparison-2026/`
**Priority:** MEDIUM-HIGH (product comparison = research phase keywords)
**Publish Date:** 2026-03-20

**Outline:**
1. Types of Waterproofing Membranes (liquid, sheet, crystalline)
2. Aqua-Bloc 720 vs Competitors (what DrySpace uses)
3. Lifespan & Durability Comparison
4. Cost-Benefit Analysis 2026
5. Which Material Works Best in Toronto Climate
6. Installation Complexity
7. Warranty Comparison
8. Case Study: DrySpace Material Choices

**Keywords:**
- waterproofing membrane types
- aqua-bloc vs competitor
- best waterproofing materials
- toronto waterproofing membranes

---

### Post 3: COST DEEP DIVE - Why Prices Increased 2025-2026 (1,800 words)
**URL:** `/guides/basement-waterproofing-cost-increase-2026/`
**Priority:** MEDIUM (addresses "why is it so expensive" question)
**Publish Date:** 2026-03-18

**Outline:**
1. What Changed Since 2025 (supply chain, labor, materials)
2. Labour Cost Breakdown (excavation, membrane, drainage)
3. Material Cost Increases (where inflation hit hardest)
4. Geographic Price Variance (Toronto vs GTA)
5. Financing Solutions for Budget Constraints
6. Are Government Rebates Still Available? (2026 status)
7. ROI: Cost vs. Property Value Protection
8. How to Budget for Your Project

**Keywords:**
- waterproofing cost increase 2026
- why waterproofing expensive
- toronto basement repair costs

---

### Post 4: EMERGENCY - What to Do When Basement Floods (2,000 words)
**URL:** `/guides/basement-flood-emergency-response-2026/`
**Priority:** HIGH (emergency keyword = high urgency, but lower volume)
**Publish Date:** 2026-03-15

**Outline:**
1. First 24 Hours: Immediate Actions
2. Water Removal Methods (DIY vs professional)
3. Drying Out Your Basement (equipment, timeline)
4. Mold Prevention During Water Damage
5. Insurance Claim Documentation
6. DrySpace Emergency Response (24/7 service pitch)
7. Cost of Emergency Response vs. Preventive Waterproofing
8. Preventing Future Emergencies

**Keywords:**
- basement flood emergency
- water damage toronto
- emergency waterproofing
- wet basement cleanup

---

### Post 5: MARKET TRENDS - Toronto Basement Trends Q2 2026 (1,500 words)
**URL:** `/guides/toronto-basement-trends-q2-2026/`
**Priority:** MEDIUM (trend content = editorial authority)
**Publish Date:** 2026-03-25

**Outline:**
1. More Homeowners Converting Basements to Living Space (legal basement apartments in Ontario)
2. Underpinning Demand Up 40% (why? new code, property values)
3. Proactive Waterproofing (people learning from past floods)
4. DIY Waterproofing Products Failing (trend: people come back to professionals)
5. Financing Changes & New Lender Programs
6. Government Rebate Program 2026 Updates
7. New Ontario Building Code Requirements Affecting Basements
8. What This Means for Property Values

**Keywords:**
- basement renovation trends
- toronto basement trends 2026
- foundation repair trends

---

## PART 4: LOCATION PAGE REFRESH (2 Hours)

### Files to Update (17 location pages)
```
src/pages/locations/
├── brampton.astro (or similar pattern)
├── burlington.astro
├── etobicoke.astro
├── hamilton.astro
├── markham.astro
├── mississauga.astro
├── north-york.astro
├── oakville.astro
├── pickering.astro
├── richmond-hill.astro
├── scarborough.astro
├── thornhill.astro
├── toronto.astro (if exists)
├── vaughan.astro
└── [12 more neighborhood pages]
```

### Update Template for Each Location Page

**What to Update:**

1. **Add Last Modified Date**
```astro
+ const lastModified = new Date('2026-03-20');
```

2. **Update Statistics Section**
```diff
- "We've completed 250+ projects in [City]"
+ "We've completed 280+ projects in [City]"  // Updated stat

- "Average response time: 45 minutes"
+ "Average response time: 35-40 minutes"  // Improved metric
```

3. **Add Spring-Specific Content Section**
```astro
<section class="bg-cyan-50 rounded-lg p-6 my-8">
  <h3>Spring Waterproofing Prep for [City]</h3>
  <p>With spring rains arriving in [Month], now is the ideal time to prepare your [City] home for heavy rainfall. Many [City] neighborhoods sit in areas prone to spring flooding due to clay soil and drainage patterns specific to the GTA.</p>
  <a href="/guides/spring-basement-flooding-prevention-2026/">Spring Prevention Checklist</a>
</section>
```

4. **Update Neighborhood/Area-Specific Soil Information**
```diff
- "The [neighborhood] area has sandy soil with high water table"
+ "Updated 2026: The [neighborhood] area experiences [specific seasonal water issues]. Our team completed [X] projects in this neighborhood with [success metric]."
```

5. **Add 2026 Market Context**
Example for Mississauga:
```astro
<p>In 2026, Mississauga has seen a 15% increase in basement waterproofing projects, primarily due to Spring flooding and increased home renovations for basement conversions to secondary suites.</p>
```

---

## PART 5: HOMEPAGE & MAIN PAGE UPDATES (1 Hour)

### File: `/src/pages/index.astro`

**Updates:**

1. **Add "As of March 2026" to hero section**
```diff
  subtitle="Protecting local homes from moisture damage since 1999. Under 60-minute emergency response, lifetime transferable warranty, and government rebates available."
+ <span class="text-sm text-cyan-600">Last updated: March 2026</span>
```

2. **Update Review Count If Changed**
```diff
- "487+ 5-star reviews"
+ "500+ 5-star reviews"  // If Google reviews updated
```

3. **Add Spring CTA Banner**
```astro
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
  <p><strong>Spring Flood Season Alert:</strong> Heavy rains expected. Get your basement inspected before April.</p>
  <a href="/free-inspection">Schedule Free Spring Inspection</a>
</div>
```

---

## PART 6: PRICING PAGE UPDATES (30 Minutes)

### File: `/src/pages/pricing.astro`

**Updates:**

1. **Add Date Stamp**
```astro
+ <p class="text-sm text-slate-500">Pricing updated: March 2026</p>
```

2. **Update All Price Points**
- Interior Waterproofing: Add 3-5% to all prices shown
- Exterior Waterproofing: Add 4-5%
- Underpinning: Add 5%
- Sump Pump: Add 2-3%

3. **Add CPI Adjustment Note**
```astro
<p class="bg-blue-50 p-4 rounded">
  Prices have been adjusted for 2026 inflation and market conditions.
  All quotes include HST and are valid for 30 days from inspection date.
</p>
```

---

## PART 7: CONTACT & CTA PAGE UPDATES (30 Minutes)

### File: `/src/pages/contact.astro`

**Add Urgency Section:**
```astro
<div class="bg-red-50 border-l-4 border-red-500 p-6 my-8">
  <h3>Spring Flood Season Alert</h3>
  <p>Q2 brings heavy rains to the GTA. Flooding is preventable with early action.</p>
  <p><strong>Current Wait Times:</strong></p>
  <ul>
    <li>Free inspections: 3-5 days</li>
    <li>Emergency response: Under 1 hour</li>
    <li>Project start: 1-2 weeks</li>
  </ul>
</div>
```

---

## PART 8: GOVERNMENT REBATES PAGE UPDATE (30 Minutes)

### File: `/src/pages/government-rebates.astro`

**Critical: Update 2026 Program Status**

```diff
- Federal/Provincial rebate programs offer up to $3,400 (2025)
+ Federal/Provincial rebate programs offer up to $3,400-$3,600 (2026)

- Application deadline: [2025 date]
+ Application deadline: [2026 date]

- "As of January 2025..."
+ "Updated March 2026: The following rebate programs remain active:"
```

**Verify Current Info:**
- Ontario Greenbelt Foundation rebates (verify still active)
- Federal Canada Greener Homes Grant (verify 2026 status)
- City of Toronto rebate programs (verify active)
- Municipal incentives for each location

---

## PART 9: FAQ PAGE REFRESH (30 Minutes)

### File: `/src/pages/faq.astro`

**Add 2026-Specific FAQs:**

1. "What changed in 2026 for waterproofing costs?"
   - Answer: Pricing adjusted for inflation, new materials

2. "Is the $3,400 rebate still available in 2026?"
   - Answer: Yes, with updated application requirements

3. "What should I prepare for this spring's flood season?"
   - Answer: Link to new spring prevention guide

4. "How long does basement waterproofing take in 2026?"
   - Answer: Updated timeline with current wait times

5. "What's the best time to do waterproofing in 2026?"
   - Answer: Before spring rains (March-April), or fall prep

---

## PART 10: INTERNAL LINKING STRATEGY (1 Hour)

### Cross-Link New Content to Existing Pages

**In all service pages, add:**
```astro
<div class="related-content">
  <h3>Related Guides</h3>
  <ul>
    <li><a href="/guides/spring-basement-flooding-prevention-2026/">Spring Prevention Guide</a></li>
    <li><a href="/guides/waterproofing-membranes-comparison-2026/">Material Comparison</a></li>
  </ul>
</div>
```

**In Homepage hero:**
```astro
<a href="/guides/spring-basement-flooding-prevention-2026/" class="btn-secondary">
  Spring Prep Guide
</a>
```

**In Blog index:**
Add featured section:
```astro
<section class="featured-guides">
  <h2>2026 Updated Guides</h2>
  <CardGrid>
    - Spring Basement Flooding Prevention
    - Waterproofing Membranes Comparison
    - Why Costs Increased 2026
  </CardGrid>
</section>
```

---

## IMPLEMENTATION TIMELINE

### Week 1 (Priority 1)
- [ ] Update all blog publish dates (1 hour)
- [ ] Update blog titles with 2026 (30 min)
- [ ] Add "Updated March 2026" badges (30 min)
- [ ] Update service page pricing (1.5 hours)
- [ ] Deploy and test (30 min)
**Total: 4 hours** → Deploy immediately for SEO signal refresh

### Week 2 (Priority 2)
- [ ] Write new blog post #1: Spring Prevention (3 hours)
- [ ] Write new blog post #2: Membrane Comparison (2 hours)
- [ ] Update all 17 location pages (1.5 hours)
- [ ] Update homepage, pricing, FAQ (1 hour)
- [ ] Internal linking updates (1 hour)
- [ ] Deploy and monitor (1 hour)
**Total: 9.5 hours** → Spread across the week

### Week 3-4 (Priority 3)
- [ ] Write remaining blog posts #3-5 (6 hours)
- [ ] Final content review and editing (2 hours)
- [ ] Optimization and internal link refinement (1 hour)
- [ ] Monitor Google Search Console impact (ongoing)
**Total: 9 hours** → Publish 1 post every 2-3 days

---

## SEO MONITORING AFTER UPDATES

### Expected Changes

**Week 1 (Date & Pricing Updates)**
- Position improvement: +2-4 positions
- CTR improvement: 0.15% → 0.18%
- Click improvement: 20 → 25-30 clicks/month

**Week 2-3 (New Content)**
- Position improvement: +5-8 positions (for new keywords)
- CTR improvement: 0.18% → 0.35%
- Click improvement: 25 → 75-100 clicks/month

**Week 4+ (Full Implementation)**
- Position improvement: +10-15 positions
- CTR improvement: 0.35% → 0.8-1.2%
- Click improvement: 100 → 200-300 clicks/month

### Tools to Monitor
1. **Google Search Console**
   - Weekly position tracking
   - Watch for clicks on new pages

2. **PageSpeed Insights**
   - Verify no page speed regression
   - Monitor Core Web Vitals

3. **Ahrefs/SEMrush** (Optional)
   - Track keyword position changes
   - Monitor competitor positioning

---

## CONTENT CALENDAR FOR FUTURE UPDATES

### Q2 2026 (March-May)
- Week 1: Spring Prevention Guide ✓ (in this plan)
- Week 2: Membrane Comparison ✓ (in this plan)
- Week 3: Cost Increase Explainer ✓ (in this plan)
- Week 4: Emergency Response Guide ✓ (in this plan)

### Q3 2026 (June-Aug)
- June: Summer Foundation Care Guide
- July: Sump Pump Maintenance During Heat
- August: Water Table Seasonal Changes

### Q4 2026 (Sept-Nov)
- Sept: Fall Waterproofing Prep
- Oct: Leaf & Debris Prevention
- Nov: Winter Foundation Stress Guide

### Q1 2027 (Jan-Mar)
- Jan: New Year Home Inspection Resolutions
- Feb: Winter Damage Assessment
- Mar: Spring Prevention 2027 (yearly refresh)

---

## CHECKPOINTS & VALIDATION

### Before Publishing Any Content
- [ ] Check for typos and grammar (Grammarly)
- [ ] Verify all facts and data (2026 specific)
- [ ] Test all links work
- [ ] Verify images have alt text
- [ ] Check page loads <3 seconds
- [ ] Mobile responsive test
- [ ] Schema markup validation

### After Publishing
- [ ] Submit to Google Search Console manually
- [ ] Add to internal sitemap
- [ ] Share on social media
- [ ] Monitor CTR for 1 week
- [ ] Track position changes week 1, 2, 4

---

## SUCCESS METRICS

### Goal: Increase organic traffic 200% in 90 days

| Metric | Current | 30 Days | 60 Days | 90 Days |
|--------|---------|---------|---------|---------|
| Monthly Clicks | 20 | 50-75 | 100-150 | 200-300 |
| CTR | 0.15% | 0.3-0.4% | 0.5-0.7% | 1-1.5% |
| Avg Position | 64 | 54 | 44 | 34 |
| Top 10 Keywords | 0 | 2-3 | 5-8 | 10-15 |

**Success Threshold:**
- 2x increase in organic clicks = 40+ clicks/month by week 4
- 3x increase in CTR = 0.45%+ by week 4
- 20+ position improvement = position 44 or better

---

## NOTES

- All publish dates should be staggered (not all on same day)
- Use "Updated March 2026" for older posts, "Published March 2026" for new posts
- Cross-reference new blog posts from old posts (related reading)
- Monitor competitor activity (do they have spring guides?)
- Consider email marketing of new guides to past customers

