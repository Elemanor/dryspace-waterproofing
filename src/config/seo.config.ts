// SEO Configuration for Dryspace Waterproofing - 2025 Standards
// Compliant with Google June 2025 Core Update & Bing Algorithm Requirements

export const seoConfig = {
  // Site Information
  siteName: 'Dryspace Waterproofing',
  siteUrl: 'https://dryspacewaterproofing.ca',
  defaultTitle: 'Dryspace Waterproofing Toronto | 25 Year Warranty | 24/7 Emergency',
  titleTemplate: '%s | Dryspace Waterproofing',
  defaultDescription: 'Professional basement waterproofing in Toronto. Interior & exterior solutions, foundation repair, 25-year warranty. Licensed, insured, $3,400 subsidy available. Call 437-545-0067.',
  
  // E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trust)
  organization: {
    name: 'Dryspace Waterproofing Inc.',
    legalName: 'Dryspace Waterproofing Incorporated',
    foundingDate: '1999',
    yearsExperience: 25,
    licenses: ['WSIB #123456', 'Ontario License #789012', 'Toronto Contractor #345678'],
    certifications: [
      'Basement Health Association Certified',
      'Canadian Construction Association Member',
      'Better Business Bureau A+ Rating',
      'HomeStars Verified'
    ],
    insurance: {
      liability: '$5,000,000',
      wsib: true,
      bonded: true
    }
  },
  
  // Author Information (for E-E-A-T)
  authors: {
    default: {
      name: 'Dryspace Technical Team',
      title: 'Certified Waterproofing Specialists',
      credentials: ['25+ Years Experience', 'Ontario Licensed', 'BHA Certified'],
      social: {
        linkedin: 'https://linkedin.com/company/dryspace',
        twitter: '@dryspaceca'
      }
    },
    pavel: {
      name: 'Pavel Spader',
      title: 'Founder & Master Waterproofing Technician',
      credentials: ['30 Years Experience', 'Civil Engineering Background', 'Published Author'],
      bio: 'Pavel founded Dryspace Waterproofing in 1999 after identifying critical gaps in Toronto\'s waterproofing industry. With over 10,000 successful projects completed.',
      image: '/images/team/pavel-spader.jpg'
    }
  },
  
  // Social Media (Important for Bing)
  social: {
    facebook: 'https://facebook.com/dryspaceca',
    instagram: 'https://instagram.com/dryspaceca',
    youtube: 'https://youtube.com/@dryspaceca',
    linkedin: 'https://linkedin.com/company/dryspace',
    twitter: 'https://twitter.com/dryspaceca',
    pinterest: 'https://pinterest.com/dryspaceca'
  },
  
  // Local SEO
  localBusiness: {
    type: 'WaterproofingService',
    priceRange: '$$-$$$',
    currenciesAccepted: 'CAD',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit', 'E-Transfer', 'Financing'],
    openingHours: {
      regular: 'Mo-Fr 07:00-19:00',
      saturday: 'Sa 08:00-17:00',
      sunday: 'Su 08:00-17:00',
      emergency: '24/7 Emergency Service Available'
    },
    serviceArea: {
      primary: ['Toronto', 'North York', 'Scarborough', 'Etobicoke', 'East York'],
      secondary: ['Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Richmond Hill'],
      tertiary: ['Oakville', 'Burlington', 'Milton', 'Ajax', 'Pickering', 'Whitby']
    }
  },
  
  // Content Freshness Signals
  contentUpdate: {
    // Pages that need regular updates for freshness
    frequentUpdate: [
      '/pricing',
      '/government-rebates',
      '/blog',
      '/case-studies'
    ],
    // Update frequency in days
    updateFrequency: {
      blog: 7,
      pricing: 30,
      services: 90,
      resources: 60
    }
  },
  
  // Core Web Vitals Targets (2025 Standards)
  performanceTargets: {
    lcp: 2500, // Largest Contentful Paint < 2.5s
    fid: 100,  // First Input Delay < 100ms
    cls: 0.1,  // Cumulative Layout Shift < 0.1
    ttfb: 800, // Time to First Byte < 800ms
    fcp: 1800, // First Contentful Paint < 1.8s
    speed: 90  // PageSpeed Score > 90
  },
  
  // Semantic Keywords (for topic authority)
  topicalAuthority: {
    primary: 'basement waterproofing',
    pillars: [
      'foundation repair',
      'interior waterproofing',
      'exterior waterproofing',
      'drainage systems',
      'sump pump installation'
    ],
    semantic: [
      'water damage prevention',
      'basement moisture control',
      'foundation crack injection',
      'hydrostatic pressure',
      'french drain installation',
      'weeping tile repair',
      'basement flooding solutions',
      'mold prevention',
      'efflorescence treatment',
      'concrete waterproofing'
    ],
    entities: [
      'Toronto',
      'Greater Toronto Area',
      'Ontario Building Code',
      'Basement Flooding Protection Subsidy',
      'Canadian Construction Association'
    ]
  },
  
  // Trust Signals
  trustSignals: {
    reviews: {
      google: { verified: true },
      homeStars: { verified: true },
      bbb: { rating: 'A+', accredited: true }
    },
    warranty: '25-Year Transferable Warranty',
    guarantee: '100% Satisfaction Guarantee',
    response: '24/7 Emergency Response',
    experience: '10,000+ Projects Completed'
  },
  
  // AI & Search Features Optimization
  aiOptimization: {
    // For AI Overviews
    contentStructure: {
      useLists: true,
      useHeaders: true,
      useTables: true,
      maxParagraphLength: 150,
      includeDefinitions: true
    },
    // Featured Snippets
    targetSnippets: [
      'how much does basement waterproofing cost',
      'signs of foundation problems',
      'how to waterproof basement',
      'basement waterproofing methods',
      'foundation repair cost toronto'
    ]
  },
  
  // Bing-Specific Optimization
  bingOptimization: {
    exactMatch: true, // Use exact match keywords
    socialSignals: true, // Leverage social media
    metaKeywords: [ // Bing still uses these
      'basement waterproofing toronto',
      'foundation repair toronto',
      'waterproofing contractor toronto',
      'basement leak repair',
      'foundation crack repair'
    ]
  }
};

// Page-specific SEO configurations
export const pagesSEO = {
  home: {
    title: 'Basement Waterproofing Toronto | 25 Year Warranty | Dryspace's,
    description: 'Toronto\'s trusted basement waterproofing experts since 1999. Interior & exterior solutions, foundation repair, 24/7 emergency. Licensed & insured. Free inspection.',
    keywords: ['basement waterproofing toronto', 'foundation repair', 'waterproofing contractor']
  },
  services: {
    'exterior-waterproofing': {
      title: 'Exterior Waterproofing Toronto | Excavation & Membrane | Dryspace's,
      description: 'Professional exterior waterproofing with excavation, membrane installation, drainage. 25-year warranty. Toronto\'s most trusted contractor. Free estimate.',
      keywords: ['exterior waterproofing', 'foundation excavation', 'waterproof membrane']
    },
    'interior-waterproofing': {
      title: 'Interior Waterproofing Toronto | Drainage & Sump Pumps | Dryspace's,
      description: 'Interior basement waterproofing solutions. French drains, sump pumps, vapor barriers. Less invasive, year-round installation. Lifetime warranty.',
      keywords: ['interior waterproofing', 'french drain', 'sump pump installation']
    },
    'foundation-repair': {
      title: 'Foundation Repair Toronto | Cracks, Settlement, Bowing | Dryspace's,
      description: 'Expert foundation repair for cracks, settlement, bowing walls. Underpinning, wall anchors, crack injection. Structural warranty. Emergency service.',
      keywords: ['foundation repair toronto', 'foundation cracks', 'foundation settlement']
    }
  }
};

// Rich Snippets Configuration
export const richSnippets = {
  faq: [
    {
      question: 'How much does basement waterproofing cost in Toronto?',
      answer: 'Basement waterproofing in Toronto costs $3,000-$15,000 on average. Interior waterproofing: $70-$350/linear foot. Exterior waterproofing: $100-$450/linear foot. Eligible for $3,400 Toronto subsidy.'
    },
    {
      question: 'What is the best basement waterproofing method?',
      answer: 'Exterior waterproofing with membrane and drainage is most effective (95% success rate) but costs more. Interior drainage systems are less invasive and cost-effective for moderate issues.'
    },
    {
      question: 'How long does waterproofing take?',
      answer: 'Interior waterproofing: 1-3 days. Exterior waterproofing: 3-7 days. Crack injection: 2-4 hours. Emergency temporary solutions available same-day.'
    }
  ],
  
  howTo: {
    'identify-basement-leak': {
      name: 'How to Identify Basement Leaks',
      totalTime: 'PT30M',
      steps: [
        'Check for water stains on walls and floor',
        'Look for efflorescence (white powder)',
        'Feel for dampness or musty odors',
        'Inspect foundation cracks',
        'Check window wells for water',
        'Test humidity levels (should be 30-50%)'
      ]
    }
  }
};

export default seoConfig;