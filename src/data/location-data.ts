// Hyper-local data for all 18 DrySpace service cities
// Sources: Ontario Geological Survey, Environment Canada, municipal records, TRCA/CVC/CLOCA reports

export interface SoilLayer {
  depth: string;
  material: string;
  drainage: string;
}

export interface CityHyperLocal {
  geological: {
    soilLayers: SoilLayer[];
    waterTable: { springHigh: string; summerLow: string };
    bedrock: { type: string; depth: string; relevance: string };
  };
  seasonal: { month: string; risk: 'Low' | 'Moderate' | 'High' | 'Critical'; event: string }[];
  infrastructure: {
    sewerType: string;
    avgSewerAge: string;
    capacityIssues: string;
    combinedAreas: string[];
  };
  foundationCensus: {
    era: string;
    pct: number;
    type: string;
    failureMode: string;
    solution: string;
  }[];
  floodHistory: {
    date: string;
    cause: string;
    impact: string;
    prevention: string;
  }[];
}

export const locationData: Record<string, CityHyperLocal> = {
  // ──────────────────────────────────────────────────
  // AJAX
  // ──────────────────────────────────────────────────
  ajax: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.0 m', material: 'Glaciolacustrine clay (Lake Iroquois deposits)', drainage: 'Poor' },
        { depth: '2.0–5.0 m', material: 'Silty clay till (Halton Till)', drainage: 'Very poor' },
        { depth: '5.0–12.0 m', material: 'Glaciolacustrine sand & silt', drainage: 'Moderate' },
      ],
      waterTable: { springHigh: '0.6–1.2 m (lakefront areas)', summerLow: '2.0–3.0 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '12–20 m', relevance: 'Deep bedrock means foundations rest entirely in glacial deposits; clay behaviour dominates drainage' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, minimal infiltration' },
      { month: 'February', risk: 'Low', event: 'Deep frost, ice damming on foundations' },
      { month: 'March', risk: 'Critical', event: 'Rapid snowmelt + frozen subsoil = surface ponding against foundations' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, Lake Ontario level rising' },
      { month: 'May', risk: 'Moderate', event: 'Continued wet season, water table still elevated' },
      { month: 'June', risk: 'Moderate', event: 'Intense thunderstorms, sewer surcharging possible' },
      { month: 'July', risk: 'High', event: 'Severe summer storms, Lake Ontario storm surge events' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay shrinkage cracks open' },
      { month: 'September', risk: 'Low', event: 'Drier conditions, clay beginning to shrink' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge soil moisture' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, low infiltration' },
    ],
    infrastructure: {
      sewerType: 'Separated (post-1970 development) with combined sections near old Ajax core',
      avgSewerAge: '25–40 years',
      capacityIssues: 'Storm sewers in south Ajax near lake regularly surcharge during heavy rainfall; Duffins Creek area experiences backup during spring melt',
      combinedAreas: ['Old Ajax core (Harwood Ave south)', 'Bayly St corridor', 'Pickering Beach Rd area'],
    },
    foundationCensus: [
      { era: '1950s–1960s', pct: 15, type: 'Concrete block on strip footings', failureMode: 'Mortar joint deterioration, block cracking from frost heave', solution: 'Exterior membrane + weeping tile replacement, block repair or parging' },
      { era: '1970s–1980s', pct: 35, type: 'Poured concrete with basic damp-proofing', failureMode: 'Tar coating failure after 30+ years, cove joint leaks, clogged weeping tile', solution: 'Full exterior waterproofing membrane, new weeping tile with filter fabric' },
      { era: '1990s–2000s', pct: 35, type: 'Poured concrete with code-minimum waterproofing', failureMode: 'Builder-grade membrane failure, drainage stone insufficient, settling cracks', solution: 'Targeted exterior repair, crack injection, drainage optimization' },
      { era: '2010s–present', pct: 15, type: 'Modern poured concrete with dimple membrane', failureMode: 'Clay settlement cracks at corners, window well drainage gaps', solution: 'Crack injection, window well upgrades, preventative interior drainage' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'Remnants of Hurricane Katrina brought 150 mm rain in 4 hours', impact: 'Widespread basement flooding in south Ajax, sewer backup affected 400+ homes', prevention: 'Backwater valve installation, sump pump upgrades, exterior waterproofing' },
      { date: 'July 2013', cause: 'Greater Toronto Area flash flood — 126 mm in 2 hours', impact: 'Duffins Creek overflowed, lakefront homes experienced storm surge, major sewer surcharge', prevention: 'Enhanced storm drainage, battery backup sump pumps, lot grading corrections' },
      { date: 'April 2017', cause: 'Lake Ontario record high water levels — 75.88 m IGLD', impact: 'Sustained high water table from April through August, lakefront property flooding', prevention: 'Marine-grade exterior membranes, elevated sump discharge, flood barriers' },
      { date: 'September 2021', cause: 'Intense thunderstorm — 80 mm in 90 minutes', impact: 'Storm sewer surcharge in central Ajax, basement flooding in Westney Heights', prevention: 'Interior drainage systems, high-capacity sump pumps, sewer disconnect where possible' },
    ],
  },

  // ──────────────────────────────────────────────────
  // BRAMPTON
  // ──────────────────────────────────────────────────
  brampton: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & construction fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Halton Till — dense silty clay', drainage: 'Very poor' },
        { depth: '3.0–8.0 m', material: 'Glaciolacustrine clay & silt', drainage: 'Poor' },
        { depth: '8.0–15.0 m', material: 'Sand & gravel (inter-till aquifer)', drainage: 'Good' },
      ],
      waterTable: { springHigh: '0.8–1.5 m', summerLow: '2.5–4.0 m' },
      bedrock: { type: 'Georgian Bay Formation shale & limestone', depth: '15–30 m', relevance: 'Deep overburden means all foundations sit in clay till; Halton Till creates perched water table conditions' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground limits infiltration' },
      { month: 'February', risk: 'Moderate', event: 'Mid-winter thaw cycles stress foundations' },
      { month: 'March', risk: 'Critical', event: 'Rapid snowmelt on frozen Halton Till — water pools against foundations' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated clay, Etobicoke Creek and Humber tributaries rise' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated, clay expansion at maximum' },
      { month: 'June', risk: 'High', event: 'Intense thunderstorms, flash flooding in low-lying areas' },
      { month: 'July', risk: 'High', event: 'Severe summer storms cause Etobicoke Creek flooding, sewer surcharge' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay beginning to shrink creating foundation stress' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage opens cracks around foundations' },
      { month: 'October', risk: 'Moderate', event: 'Fall rains saturate dry clay rapidly' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing begins, frost heave risk on shallow footings' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; combined sewers remain in Heritage District and older Queen St corridor',
      avgSewerAge: '20–45 years (wide range due to rapid expansion)',
      capacityIssues: 'Rapid suburban growth outpaced sewer infrastructure upgrades; Etobicoke Creek watershed regularly exceeds capacity during summer storms',
      combinedAreas: ['Downtown Brampton / Queen St Heritage District', 'Old Main St South area', 'Nelson St / Church St core', 'Vodden St area'],
    },
    foundationCensus: [
      { era: '1950s–1970s (Heritage Brampton)', pct: 15, type: 'Concrete block and older poured concrete', failureMode: 'Block mortar deterioration, original tar damp-proofing completely failed, clogged clay tile drains', solution: 'Full exterior waterproofing with membrane, new weeping tile, block repair and parging restoration' },
      { era: '1980s–1990s (First Expansion)', pct: 25, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Damp-proofing reaching end of life, cove joint leaks, weeping tile clogged with Halton Till clay', solution: 'Exterior membrane replacement, weeping tile renewal with filter fabric, sump pump installation' },
      { era: '2000s (Rapid Growth Era)', pct: 35, type: 'Poured concrete with builder-grade membrane', failureMode: 'Construction shortcuts from rapid development — thin membranes, insufficient drainage stone, poor backfill', solution: 'Builder defect correction, proper drainage stone, code-compliant exterior membrane, grading correction' },
      { era: '2010s–present (Infill & New Subdivisions)', pct: 25, type: 'Modern poured concrete with dimple membrane', failureMode: 'Clay settlement causing corner cracks, drainage tile gaps, Tarion warranty expiration issues', solution: 'Crack injection, drainage optimization, pre-Tarion-expiry inspection and repair' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall in 3 hours', impact: 'Etobicoke Creek flooded extensively, 800+ Brampton basements flooded, Heritage District sewers overwhelmed', prevention: 'Backwater valves mandatory in flood-prone areas, exterior waterproofing, sump pump upgrades' },
      { date: 'July 2013', cause: 'Flash flood event — 126 mm in 2 hours across GTA', impact: 'Major flooding in south Brampton, Steeles Ave corridor underwater, massive sewer surcharge', prevention: 'Enhanced storm sewer capacity, battery backup sump systems, interior drainage' },
      { date: 'June 2020', cause: 'Severe thunderstorm cell — 90 mm in 1 hour over central Brampton', impact: 'Flash flooding in Queen St area, combined sewer overflow in Heritage District', prevention: 'Combined sewer separation, lot-level flood protection, rain garden installations' },
      { date: 'April 2024', cause: 'Spring melt combined with 60 mm rain on frozen ground', impact: 'Widespread foundation seepage in newer subdivisions, builder-grade systems overwhelmed', prevention: 'Exterior waterproofing upgrades, proper grading, enhanced drainage stone around foundations' },
    ],
  },

  // ──────────────────────────────────────────────────
  // BURLINGTON
  // ──────────────────────────────────────────────────
  burlington: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Halton Till — stiff silty clay to clayey silt', drainage: 'Poor to very poor' },
        { depth: '2.5–6.0 m', material: 'Glaciolacustrine clay & silt (former Lake Iroquois)', drainage: 'Poor' },
        { depth: '6.0–15.0 m', material: 'Wentworth Till — sandy silt till', drainage: 'Fair' },
      ],
      waterTable: { springHigh: '0.8–1.5 m (Escarpment base)', summerLow: '2.5–4.0 m' },
      bedrock: { type: 'Queenston Shale (plains) / Amabel Dolostone (Escarpment)', depth: '8–25 m (varies with Escarpment proximity)', relevance: 'Escarpment springs create year-round groundwater seepage in north Burlington; fractured dolostone channels water unpredictably' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, minimal infiltration' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles near Escarpment, ice damming' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt + Escarpment spring discharge = elevated water table across north Burlington' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated Halton Till, Bronte Creek rising' },
      { month: 'May', risk: 'Moderate', event: 'Continued elevated water table near Escarpment base' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms begin, sewer capacity tested' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, flash flooding in low areas near lake' },
      { month: 'August', risk: 'High', event: 'Lake Ontario storm surge, heavy rainfall events' },
      { month: 'September', risk: 'Moderate', event: 'Late summer storms, clay shrinkage cracks' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge, lower risk period' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms, ground saturation before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, limited infiltration' },
    ],
    infrastructure: {
      sewerType: 'Separated in newer areas; combined sewers remain in Downtown Burlington and older lakefront neighborhoods',
      avgSewerAge: '30–50 years (downtown), 15–30 years (newer areas)',
      capacityIssues: 'Downtown Burlington combined sewers overflow during heavy rain; Escarpment runoff overwhelms storm systems in north Burlington during spring melt',
      combinedAreas: ['Downtown Burlington (Brant St to Pearl St)', 'Old Lakeshore Rd area', 'Burlington East / Maple Ave area', 'Parts of Aldershot near waterfront'],
    },
    foundationCensus: [
      { era: '1940s–1960s (Old Burlington)', pct: 20, type: 'Concrete block and rubble stone', failureMode: 'Mortar deterioration, block cracking, no original waterproofing, stone foundation movement', solution: 'Exterior excavation, block or stone repair, full membrane installation, weeping tile replacement' },
      { era: '1970s–1980s (Suburban Expansion)', pct: 30, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Tar coating failed after 40+ years, cove joint separation, weeping tile crushed by clay pressure', solution: 'Exterior membrane replacement, new drainage system, sump pump upgrade' },
      { era: '1990s–2000s (North Burlington Growth)', pct: 30, type: 'Poured concrete with polymer membrane', failureMode: 'Escarpment groundwater infiltration, drainage stone overwhelmed by spring flow, settlement on variable soils', solution: 'Enhanced drainage capacity, Escarpment-specific waterproofing, high-flow sump systems' },
      { era: '2010s–present (Infill & Alton)', pct: 20, type: 'Modern ICF and poured concrete with dimple board', failureMode: 'Clay settlement cracks, window well leaks, builder warranty expiration', solution: 'Crack injection, drainage optimization, preventative interior systems' },
    ],
    floodHistory: [
      { date: 'August 2004', cause: 'Severe thunderstorm — 100+ mm in 2 hours', impact: 'Flash flooding in downtown Burlington, combined sewer overflow, Brant St businesses and homes flooded', prevention: 'Combined sewer separation program (ongoing), backwater valves, commercial flood barriers' },
      { date: 'July 2014', cause: 'Burlington Skyway storm — 100 mm intense rainfall', impact: 'Widespread flooding in Aldershot and south Burlington, QEW corridor impassable', prevention: 'Municipal stormwater upgrades, enhanced lot-level protection, sump pump programs' },
      { date: 'May 2017', cause: 'Record Lake Ontario levels — 75.88 m IGLD sustained for months', impact: 'Chronic high water table from May through September, lakefront property erosion and basement flooding', prevention: 'Marine-grade exterior systems, elevated sump discharge, permanent flood barriers for lakefront' },
      { date: 'September 2024', cause: 'Post-tropical storm brought 90 mm rain over 12 hours', impact: 'Bronte Creek flooding, north Burlington Escarpment runoff caused widespread seepage', prevention: 'Escarpment drainage management, enhanced weeping tile capacity, foundation monitoring' },
    ],
  },

  // ──────────────────────────────────────────────────
  // ETOBICOKE
  // ──────────────────────────────────────────────────
  etobicoke: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Urban fill & topsoil', drainage: 'Variable' },
        { depth: '0.3–3.0 m', material: 'Glaciolacustrine silty clay (Lake Iroquois deposits)', drainage: 'Poor' },
        { depth: '3.0–8.0 m', material: 'Halton Till — dense clay to silty clay', drainage: 'Very poor' },
        { depth: '8.0–15.0 m', material: 'Scarborough Bluffs sand & silt', drainage: 'Fair to good' },
      ],
      waterTable: { springHigh: '0.5–1.5 m (near Humber & Mimico Creek)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '15–30 m', relevance: 'Deep overburden; perched water table in clay creates persistent hydrostatic pressure on older foundations' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, ice damming on older roofs' },
      { month: 'February', risk: 'Moderate', event: 'Mid-winter thaw cycles, freeze-thaw foundation stress' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt + frozen subsoil, Mimico Creek and Humber River spring flow' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated clay, sewer surcharging' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated, creek levels high' },
      { month: 'June', risk: 'High', event: 'Severe thunderstorms, flash flooding in creek valleys' },
      { month: 'July', risk: 'High', event: 'Summer storm intensity peak, combined sewer overflow events' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, Lake Ontario storm surge risk' },
      { month: 'September', risk: 'Low', event: 'Drier conditions, clay shrinkage around foundations' },
      { month: 'October', risk: 'Moderate', event: 'Fall storms recharge saturated clay' },
      { month: 'November', risk: 'Moderate', event: 'Late-season rain before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on shallow footings' },
    ],
    infrastructure: {
      sewerType: 'Mixed — extensive combined sewers in older south Etobicoke; separated in newer north areas',
      avgSewerAge: '40–70 years (south), 20–40 years (north)',
      capacityIssues: 'South Etobicoke combined sewers chronically overwhelmed; Mimico Creek watershed prone to flash flooding; Toronto sewer separation program ongoing but decades from completion',
      combinedAreas: ['Mimico (Lakeshore Blvd to QEW)', 'New Toronto (Lakeshore Blvd W)', 'Long Branch waterfront', 'Islington-City Centre area', 'Kingsway / Sunnylea', 'Alderwood'],
    },
    foundationCensus: [
      { era: '1920s–1950s (Old Etobicoke)', pct: 25, type: 'Concrete block, rubble stone, and cinder block', failureMode: 'Block mortar completely deteriorated, no original waterproofing, foundation movement from tree roots', solution: 'Full exterior excavation, block/stone stabilization, membrane & drainage, root barrier installation' },
      { era: '1960s–1970s (Post-War Boom)', pct: 30, type: 'Poured concrete with tar damp-proofing', failureMode: 'Tar coating disintegrated, cove joint leaks, weeping tile crushed/clogged after 50+ years', solution: 'Exterior membrane replacement, full weeping tile renewal, sump pump installation' },
      { era: '1980s–1990s (Rexdale & Richview)', pct: 25, type: 'Poured concrete with improved damp-proofing', failureMode: 'Aging waterproofing, drainage tile deterioration, settling on clay', solution: 'Targeted exterior waterproofing, drainage upgrade, crack injection' },
      { era: '2000s–present (Condos & Infill)', pct: 20, type: 'Modern poured concrete or ICF', failureMode: 'Settlement cracks from clay compaction, window well issues, shared drainage conflicts in tight lots', solution: 'Crack injection, drainage separation, interior systems for limited-access properties' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall', impact: 'Mimico Creek overflowed, thousands of basements flooded in south Etobicoke, TTC flooded', prevention: 'Backwater valve program (Toronto mandatory), exterior waterproofing, sump upgrades' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Worst flooding in Toronto history; Mimico/Long Branch devastated, combined sewer overflow', prevention: 'Toronto Basement Flooding Protection Subsidy ($3,400), interior drainage, lot-level measures' },
      { date: 'August 2018', cause: 'Intense cell — 72 mm in 1 hour over south Etobicoke', impact: 'Flash flooding in Alderwood and New Toronto, 300+ basement flooding reports', prevention: 'Enhanced sump capacity, rain gardens, disconnected downspouts, interior waterproofing' },
      { date: 'July 2024', cause: 'Back-to-back thunderstorms — 95 mm over 3 hours', impact: 'Widespread sewer surcharge in Mimico and Kingsway, basement flooding in low-lying areas', prevention: 'Comprehensive lot-level flood protection, sewer backup prevention, exterior membrane' },
    ],
  },

  // ──────────────────────────────────────────────────
  // GEORGETOWN (Halton Hills)
  // ──────────────────────────────────────────────────
  georgetown: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Halton Till — stiff silty clay', drainage: 'Poor' },
        { depth: '2.5–6.0 m', material: 'Glaciolacustrine clay & silt', drainage: 'Poor' },
        { depth: '6.0–10.0 m', material: 'Wentworth Till — sandy silt', drainage: 'Fair' },
      ],
      waterTable: { springHigh: '1.0–2.0 m', summerLow: '3.0–5.0 m' },
      bedrock: { type: 'Amabel Dolostone (Niagara Escarpment)', depth: '5–15 m (shallow near Escarpment)', relevance: 'Close to Escarpment, fractured dolostone channels groundwater springs; Silver Creek and Credit River headwaters create high water table zones' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, higher snowfall than GTA lowlands' },
      { month: 'February', risk: 'Low', event: 'Deep snow accumulation, freeze-thaw on Escarpment face' },
      { month: 'March', risk: 'Critical', event: 'Major snowmelt from Escarpment — Silver Creek and Credit River tributaries flood' },
      { month: 'April', risk: 'High', event: 'Spring rain + continued melt, Escarpment springs at peak flow' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated from spring recharge' },
      { month: 'June', risk: 'Moderate', event: 'Summer storm season begins, localized flooding possible' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, Silver Creek flash flooding' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events on clay soils' },
      { month: 'September', risk: 'Low', event: 'Drier period, reduced groundwater pressure' },
      { month: 'October', risk: 'Low', event: 'Fall rains begin recharging soil' },
      { month: 'November', risk: 'Moderate', event: 'Late-season rain saturating clay before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, Escarpment area gets early snow' },
    ],
    infrastructure: {
      sewerType: 'Separated; no combined sewers due to newer development patterns',
      avgSewerAge: '20–35 years (most development post-1985)',
      capacityIssues: 'Silver Creek watershed storm sewers undersized for current development density; Georgetown expansion has strained original drainage infrastructure',
      combinedAreas: ['None — fully separated system'],
    },
    foundationCensus: [
      { era: '1960s–1970s (Old Georgetown)', pct: 20, type: 'Concrete block on strip footings', failureMode: 'Block mortar failure, inadequate damp-proofing, tree root intrusion in established neighborhoods', solution: 'Exterior excavation, block repair, membrane installation, root barriers' },
      { era: '1980s–1990s (Early Suburbs)', pct: 30, type: 'Poured concrete with basic tar coating', failureMode: 'Tar damp-proofing failure after 30+ years, weeping tile clogged with Halton Till fines', solution: 'Exterior membrane upgrade, weeping tile replacement with filter fabric, sump installation' },
      { era: '2000s–2010s (Rapid Expansion)', pct: 35, type: 'Poured concrete with builder-grade membrane', failureMode: 'Builder shortcuts during expansion boom, inadequate drainage stone, poor lot grading', solution: 'Targeted exterior correction, drainage stone replacement, grading restoration' },
      { era: '2015–present (New Georgetown South)', pct: 15, type: 'Modern poured concrete with dimple board', failureMode: 'Clay settlement cracks, Escarpment groundwater seepage in west Georgetown', solution: 'Crack injection, enhanced drainage for spring conditions, interior backup systems' },
    ],
    floodHistory: [
      { date: 'July 2009', cause: 'Intense thunderstorm — 80 mm in 1 hour', impact: 'Silver Creek flash flooding, downtown Georgetown businesses and homes flooded', prevention: 'Creek setback enforcement, enhanced storm sewers, lot-level flood protection' },
      { date: 'April 2013', cause: 'Rapid snowmelt combined with 40 mm spring rain', impact: 'Escarpment runoff overwhelmed Silver Creek, flooding in low-lying Georgetown West', prevention: 'Escarpment drainage management, enhanced weeping tile capacity, sump upgrades' },
      { date: 'June 2017', cause: 'Severe thunderstorm cell stalled over Georgetown', impact: 'Storm sewers overwhelmed, widespread basement seepage in newer subdivisions', prevention: 'Builder defect corrections, proper drainage stone, enhanced sump capacity' },
    ],
  },

  // ──────────────────────────────────────────────────
  // HAMILTON
  // ──────────────────────────────────────────────────
  hamilton: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Urban fill & topsoil', drainage: 'Variable' },
        { depth: '0.3–3.0 m', material: 'Glaciolacustrine clay (lower city) / Halton Till (upper city)', drainage: 'Poor to very poor' },
        { depth: '3.0–8.0 m', material: 'Wentworth Till — sandy clay till', drainage: 'Fair' },
        { depth: '8.0+ m', material: 'Queenston Shale (lower) / Amabel Dolostone (Escarpment)', drainage: 'Variable — fractured rock channels water' },
      ],
      waterTable: { springHigh: '0.5–1.5 m (lower city, near harbour)', summerLow: '2.0–4.0 m' },
      bedrock: { type: 'Queenston Shale (lower city) / Amabel Dolostone & Lockport Dolostone (Escarpment)', depth: '3–15 m (shallow on Mountain, deep in lower city)', relevance: 'Escarpment creates dramatic drainage divide; springs discharge at Escarpment base causing year-round wet conditions; lower city sits on impermeable shale with perched water table' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, lake-effect snow on Mountain' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles, ice damming on older Mountain homes' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt from Escarpment flows to lower city, Escarpment springs at peak discharge' },
      { month: 'April', risk: 'High', event: 'Spring rain compounds melt, Red Hill Creek and Chedoke Creek flooding' },
      { month: 'May', risk: 'Moderate', event: 'Water table still high in lower city and Escarpment base' },
      { month: 'June', risk: 'High', event: 'Severe thunderstorms, combined sewer overflow in lower city' },
      { month: 'July', risk: 'High', event: 'Peak storm season, harbour area at risk from high lake levels + storms' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, Hamilton Harbour storm surge' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage on Mountain' },
      { month: 'October', risk: 'Moderate', event: 'Fall storms recharge groundwater' },
      { month: 'November', risk: 'Moderate', event: 'Late storms saturate clay, early Escarpment snow' },
      { month: 'December', risk: 'Low', event: 'Ground freezing begins, lake-effect snow events' },
    ],
    infrastructure: {
      sewerType: 'Extensive combined sewer system in lower city (pre-1960 areas); separated on Hamilton Mountain and newer suburbs',
      avgSewerAge: '50–100+ years (lower city), 25–50 years (Mountain)',
      capacityIssues: 'Lower city combined sewers among oldest in Ontario; chronic overflow into Hamilton Harbour during storms; Red Hill Creek Expressway area has drainage conflicts; Mountain development strains aging trunk sewers',
      combinedAreas: ['Downtown Hamilton (James St to Wellington St)', 'North End (near harbour)', 'Corktown / Beasley', 'Strathcona / Landsdale', 'Crown Point', 'Delta / Stipley', 'Barton Village', 'Parts of Westdale near McMaster'],
    },
    foundationCensus: [
      { era: 'Pre-1940s (Old Hamilton)', pct: 25, type: 'Rubble stone, brick, and early concrete block', failureMode: 'Mortar completely deteriorated, stone movement, no waterproofing ever installed, century-old drain tiles collapsed', solution: 'Complete excavation, stone/block stabilization, modern membrane, new drainage system from scratch' },
      { era: '1950s–1970s (Mountain Development)', pct: 30, type: 'Concrete block and poured concrete with tar', failureMode: 'Block cracking from Escarpment soil movement, tar coating failed, weeping tile clogged with mountain soil', solution: 'Exterior membrane, block repair, new weeping tile, enhanced drainage for Escarpment conditions' },
      { era: '1980s–2000s (Suburban Expansion)', pct: 30, type: 'Poured concrete with improving damp-proofing', failureMode: 'Aging waterproofing systems, Halton Till clay pressure, settlement on variable Mountain soils', solution: 'Targeted exterior repair, drainage optimization, crack injection with structural warranties' },
      { era: '2010s–present (Infill & New Mountain)', pct: 15, type: 'Modern poured concrete and ICF', failureMode: 'Clay settlement, tight urban lot drainage conflicts, Escarpment groundwater in west Mountain', solution: 'Crack injection, interior drainage for limited-access lots, Escarpment spring management' },
    ],
    floodHistory: [
      { date: 'July 2009', cause: 'Severe thunderstorm — 80 mm in 2 hours over Hamilton Mountain', impact: 'Red Hill Creek flooded, combined sewer overflow in lower city, 500+ basements flooded', prevention: 'Enhanced stormwater management, backwater valves, exterior waterproofing in flood zones' },
      { date: 'December 2016', cause: 'Ice jam on Red Hill Creek combined with rapid thaw', impact: 'Unusual winter flooding in southeast Hamilton, sewer backup in low-lying areas', prevention: 'Creek maintenance, backup sump systems, interior drainage for creek-adjacent homes' },
      { date: 'August 2019', cause: 'Back-to-back storms — 120 mm over 4 hours', impact: 'Widespread combined sewer overflow, lower city flooding from harbour to Escarpment base', prevention: 'Toronto model subsidy program, lot-level protection, sewer separation advocacy' },
      { date: 'May 2024', cause: 'Escarpment spring discharge at record levels combined with heavy rain', impact: 'Groundwater flooding in Escarpment base neighborhoods, Chedoke Creek overflow', prevention: 'Escarpment spring management, enhanced foundation drainage, high-capacity sump systems' },
    ],
  },

  // ──────────────────────────────────────────────────
  // KITCHENER
  // ──────────────────────────────────────────────────
  kitchener: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Port Stanley Till — sandy silt to silty clay', drainage: 'Fair to poor' },
        { depth: '3.0–8.0 m', material: 'Maryhill Till — dense clay till', drainage: 'Very poor' },
        { depth: '8.0–20.0 m', material: 'Waterloo Moraine sand & gravel (aquifer)', drainage: 'Excellent' },
      ],
      waterTable: { springHigh: '1.0–2.0 m', summerLow: '3.0–5.0 m' },
      bedrock: { type: 'Salina Formation dolostone & shale', depth: '20–40+ m', relevance: 'Very deep bedrock under Waterloo Moraine; the moraine acts as major aquifer, creating complex groundwater flow patterns that affect foundations differently across the city' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, higher snowfall than GTA' },
      { month: 'February', risk: 'Low', event: 'Deep frost, continued snow accumulation' },
      { month: 'March', risk: 'Critical', event: 'Heavy snowmelt — Grand River tributaries peak, moraine aquifer recharge floods low areas' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated moraine, Grand River at high stage' },
      { month: 'May', risk: 'Moderate', event: 'Water table still high from moraine recharge' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms begin, localized flash flooding' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, urban flooding in older neighborhoods' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events on clay-capped moraine' },
      { month: 'September', risk: 'Low', event: 'Drier conditions, groundwater declining' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge, generally lower risk' },
      { month: 'November', risk: 'Moderate', event: 'Late fall storms saturate soil before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on clay soils' },
    ],
    infrastructure: {
      sewerType: 'Separated in newer areas; significant combined sewer infrastructure in downtown and older neighborhoods',
      avgSewerAge: '40–80 years (downtown), 20–40 years (suburbs)',
      capacityIssues: 'Downtown Kitchener combined sewers regularly overflow during moderate rainfall; Victoria Park area chronically wet from both sewer and groundwater; rapid intensification straining aging infrastructure',
      combinedAreas: ['Downtown Kitchener (King St to Frederick St)', 'Victoria Park area', 'Rockway / Midtown', 'Cedar Hill / Highland area', 'Mill-Courtland / Woodside Park'],
    },
    foundationCensus: [
      { era: 'Pre-1940s (Historic Kitchener)', pct: 15, type: 'Rubble stone, brick, and early concrete block', failureMode: 'Stone mortar failure, no waterproofing, century-old clay tile drainage collapsed', solution: 'Full excavation, stone stabilization, modern membrane, complete new drainage system' },
      { era: '1950s–1970s (Post-War Expansion)', pct: 30, type: 'Concrete block and poured concrete with tar', failureMode: 'Block deterioration, tar coating failed, weeping tile clogged with till fines', solution: 'Exterior membrane, block repair, weeping tile replacement, sump pump installation' },
      { era: '1980s–2000s (Suburban Growth)', pct: 35, type: 'Poured concrete with improving waterproofing', failureMode: 'Moraine groundwater infiltration, variable soil settlement, aging membrane systems', solution: 'Targeted exterior repair, enhanced drainage for moraine conditions, crack injection' },
      { era: '2010s–present (Intensification)', pct: 20, type: 'Modern poured concrete and ICF', failureMode: 'Settlement on variable moraine soils, drainage conflicts on tight infill lots', solution: 'Crack injection, interior drainage for limited-access properties, groundwater management' },
    ],
    floodHistory: [
      { date: 'June 2010', cause: 'Severe thunderstorm — 90 mm in 2 hours', impact: 'Downtown Kitchener flooding, combined sewer overflow, 400+ basements affected', prevention: 'Backwater valve installation, enhanced sump capacity, lot-level stormwater management' },
      { date: 'April 2018', cause: 'Grand River spring flooding combined with heavy rain', impact: 'River-adjacent areas flooded, elevated water table caused widespread basement seepage', prevention: 'Enhanced foundation drainage, river setback waterproofing, backup sump systems' },
      { date: 'August 2022', cause: 'Stalled thunderstorm cell — 100 mm in 90 minutes', impact: 'Flash flooding in Midtown area, Victoria Park area underwater, sewer surcharge', prevention: 'Combined sewer separation (city program), interior drainage, enhanced downspout disconnection' },
    ],
  },

  // ──────────────────────────────────────────────────
  // MARKHAM
  // ──────────────────────────────────────────────────
  markham: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & construction fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Halton Till — dense clay to silty clay', drainage: 'Very poor' },
        { depth: '3.0–8.0 m', material: 'Newmarket Till — sandy silt till', drainage: 'Poor to fair' },
        { depth: '8.0–20.0 m', material: 'Oak Ridges Moraine sand & gravel (north Markham)', drainage: 'Good' },
      ],
      waterTable: { springHigh: '0.6–1.5 m (Rouge River corridor)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '20–40 m', relevance: 'Deep overburden from glacial deposits; Rouge River corridor creates seasonal water table fluctuations; clay dominates foundation behaviour throughout city' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, limited infiltration' },
      { month: 'February', risk: 'Low', event: 'Deep frost, ice damming on newer subdivision roofs' },
      { month: 'March', risk: 'Critical', event: 'Rapid snowmelt + frozen clay subsoil = severe ponding, Rouge River tributaries flood' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, water table at peak near Rouge River' },
      { month: 'May', risk: 'Moderate', event: 'Continued wet conditions, subdivision drainage systems stressed' },
      { month: 'June', risk: 'Moderate', event: 'Summer storm season begins, flash flooding in low areas' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, sewer surcharging in rapid-growth subdivisions' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay shrinkage creates foundation cracks' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay contracting away from foundations' },
      { month: 'October', risk: 'Low', event: 'Fall rains begin soil recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms saturate clay before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave in shallow-footing areas' },
    ],
    infrastructure: {
      sewerType: 'Fully separated (most development post-1980); some older combined sections in Unionville core',
      avgSewerAge: '15–35 years (rapid 1990s-2010s development)',
      capacityIssues: 'Subdivision storm sewers in Cornell, Berczy, and Box Grove undersized for actual development density; shared drainage routes between properties overwhelmed during heavy rain; Rouge River tributaries exceed capacity during spring melt',
      combinedAreas: ['Historic Unionville Main Street area', 'Parts of old Markham Village'],
    },
    foundationCensus: [
      { era: '1950s–1970s (Heritage Unionville)', pct: 10, type: 'Concrete block and older poured concrete', failureMode: 'Block mortar deterioration, no modern waterproofing, clogged century-old drains', solution: 'Heritage-sensitive exterior waterproofing, block repair, full drainage replacement' },
      { era: '1980s–1990s (First Planned Communities)', pct: 25, type: 'Poured concrete with basic damp-proofing', failureMode: 'Builder-grade systems failing after 25-35 years, drainage tile clogged with clay sediment', solution: 'Full exterior membrane replacement, new drainage tile with proper stone bedding' },
      { era: '2000s (Rapid Expansion Era)', pct: 40, type: 'Poured concrete on former farmland clay', failureMode: 'Subdivision drainage shortcuts, inadequate lot grading, clay settlement, shared drainage overwhelmed', solution: 'Comprehensive exterior waterproofing, drainage correction, grading restoration, sump upgrades' },
      { era: '2010s–present (Modern Subdivisions)', pct: 25, type: 'Code-compliant concrete with synthetic membranes', failureMode: 'Clay settlement cracks, high water table near Rouge tributaries, dense development limits drainage', solution: 'Targeted crack injection, enhanced sump capacity, preventative interior drainage' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall in 3 hours', impact: 'Rouge River tributaries overflowed, widespread basement flooding in Milliken and Rouge areas', prevention: 'Enhanced storm drainage, sump pump upgrades with battery backup, exterior waterproofing' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Cornell and Berczy subdivisions experienced massive flooding; shared drainage systems failed', prevention: 'Individual lot drainage independence, backwater valves, interior backup systems' },
      { date: 'May 2017', cause: 'Prolonged spring rain on saturated clay', impact: 'Extended period of basement seepage across Markham, builder-grade systems overwhelmed', prevention: 'Comprehensive drainage upgrades, exterior waterproofing, proper backfill with clear stone' },
      { date: 'August 2023', cause: 'Severe thunderstorm — 85 mm in 90 minutes', impact: 'Flash flooding in Box Grove and Wismer, sewer surcharge in newer subdivisions', prevention: 'Enhanced sump capacity, lot grading correction, downspout disconnection to grade' },
    ],
  },

  // ──────────────────────────────────────────────────
  // MILTON
  // ──────────────────────────────────────────────────
  milton: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & construction fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Halton Till — stiff clayey silt to silty clay', drainage: 'Poor' },
        { depth: '2.5–6.0 m', material: 'Glaciolacustrine silt & clay', drainage: 'Poor' },
        { depth: '6.0–12.0 m', material: 'Wentworth Till — sandy silt till', drainage: 'Fair' },
      ],
      waterTable: { springHigh: '1.0–2.0 m', summerLow: '3.0–5.0 m' },
      bedrock: { type: 'Amabel Dolostone (near Escarpment) / Queenston Shale (east Milton)', depth: '8–20 m', relevance: 'Proximity to Niagara Escarpment creates Escarpment springs and variable groundwater; Sixteen Mile Creek headwaters drain through the town' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, higher snowfall from Escarpment effect' },
      { month: 'February', risk: 'Low', event: 'Deep frost, snow accumulation on Escarpment slopes' },
      { month: 'March', risk: 'Critical', event: 'Heavy snowmelt from Escarpment + frozen Halton Till = severe runoff and ponding' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, Sixteen Mile Creek at peak flow' },
      { month: 'May', risk: 'Moderate', event: 'Escarpment springs still active, water table elevated' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms, flash flooding risk in new subdivisions' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, storm sewers in new subdivisions tested' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain on clay, builder-grade drainage stressed' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage around foundations' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge soil moisture' },
      { month: 'November', risk: 'Moderate', event: 'Late storms, Escarpment area early precipitation' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, higher snow than surrounding areas' },
    ],
    infrastructure: {
      sewerType: 'Fully separated (most development post-2000)',
      avgSewerAge: '10–25 years (one of Ontario\'s fastest-growing towns)',
      capacityIssues: 'Explosive growth (population tripled 2001-2021) outpaced infrastructure; storm sewers in early subdivisions undersized for current density; Sixteen Mile Creek watershed strained',
      combinedAreas: ['None — fully separated system'],
    },
    foundationCensus: [
      { era: 'Pre-1980s (Old Milton)', pct: 10, type: 'Concrete block and older poured concrete', failureMode: 'Block deterioration, tar coating failed, tree root intrusion in established lots', solution: 'Full exterior excavation, block repair, membrane installation, drainage replacement' },
      { era: '1990s–2000s (First Boom)', pct: 25, type: 'Poured concrete with basic waterproofing', failureMode: 'Builder-grade systems aging, Halton Till clogging drainage, settlement from rapid construction', solution: 'Exterior membrane replacement, weeping tile with filter fabric, sump pump installation' },
      { era: '2000s–2010s (Hyper Growth)', pct: 40, type: 'Poured concrete with builder-grade membrane', failureMode: 'Mass-production construction shortcuts, inadequate drainage stone, poor lot grading on former farmland', solution: 'Builder defect correction, proper drainage restoration, code-compliant membrane upgrade' },
      { era: '2015–present (New Milton)', pct: 25, type: 'Modern poured concrete with dimple board', failureMode: 'Clay settlement cracks at 5-10 years, Escarpment groundwater in west Milton, Tarion warranty issues', solution: 'Crack injection before finishes, drainage optimization, Tarion claim support' },
    ],
    floodHistory: [
      { date: 'August 2009', cause: 'Intense thunderstorm — 75 mm in 1 hour over new subdivisions', impact: 'Flash flooding in Scott and Coates areas, new storm sewers overwhelmed, 200+ basements flooded', prevention: 'Enhanced storm sewer capacity, builder-grade waterproofing upgrades, sump systems' },
      { date: 'June 2015', cause: 'Severe storm cell — 90 mm rain with Escarpment runoff', impact: 'Sixteen Mile Creek flooding, basement seepage widespread in older Milton', prevention: 'Creek setback enforcement, exterior waterproofing, lot grading correction' },
      { date: 'July 2022', cause: 'Back-to-back thunderstorms — 110 mm over 4 hours', impact: 'Flash flooding in newer Bristol Survey and Willmott subdivisions, sewer surcharge', prevention: 'Lot-level flood protection, enhanced drainage stone, interior backup systems' },
    ],
  },

  // ──────────────────────────────────────────────────
  // NORTH YORK
  // ──────────────────────────────────────────────────
  "north-york": {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Urban fill & topsoil', drainage: 'Variable' },
        { depth: '0.3–3.0 m', material: 'Halton Till — silty clay to clay', drainage: 'Poor to very poor' },
        { depth: '3.0–8.0 m', material: 'Newmarket Till — sandy silt till', drainage: 'Fair' },
        { depth: '8.0–15.0 m', material: 'Thorncliffe Formation — sand, silt, clay', drainage: 'Variable' },
      ],
      waterTable: { springHigh: '0.5–1.5 m (Don River & Black Creek valleys)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '15–30 m', relevance: 'Deep overburden means foundations sit in glacial deposits; Don River valley and Black Creek create drainage corridors with high water tables; clay till dominates throughout' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, reduced infiltration' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles, ice damming on post-war homes' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt on frozen clay, Don River and Black Creek rise rapidly' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, combined sewer areas overflow' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated, creek valleys at capacity' },
      { month: 'June', risk: 'High', event: 'Severe thunderstorms, flash flooding in Don Valley corridor' },
      { month: 'July', risk: 'High', event: 'Peak storm intensity, widespread sewer surcharging' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay shrinkage creating cracks' },
      { month: 'September', risk: 'Low', event: 'Drier period, reduced groundwater pressure' },
      { month: 'October', risk: 'Moderate', event: 'Fall storms recharge clay soils' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on older footings' },
    ],
    infrastructure: {
      sewerType: 'Mixed — extensive combined sewers in older neighborhoods (pre-1965); separated in post-1970 developments',
      avgSewerAge: '40–70 years (older areas), 25–45 years (newer developments)',
      capacityIssues: 'Large portions of central and west North York still on combined sewers; Black Creek area chronic overflow; Don Valley corridor sewer capacity severely strained; Toronto sewer separation decades from completion',
      combinedAreas: ['Downsview / Wilson Heights', 'Lawrence Manor / Lawrence Heights', 'Bathurst Manor', 'Yorkdale area', 'Jane-Finch area (partial)', 'Don Mills south (partial)', 'Lansing / Willowdale south'],
    },
    foundationCensus: [
      { era: '1940s–1960s (Post-War North York)', pct: 30, type: 'Concrete block and cinder block on strip footings', failureMode: 'Block mortar completely deteriorated, no waterproofing, tree root intrusion, weeping tile collapsed', solution: 'Full exterior excavation, block stabilization, membrane installation, new drainage, root barriers' },
      { era: '1960s–1970s (Suburban Boom)', pct: 25, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Tar coating failed after 50+ years, cove joint separation, clay pressure crushing old weeping tile', solution: 'Exterior membrane replacement, weeping tile renewal, sump pump installation' },
      { era: '1980s–1990s (Infill & Condos)', pct: 25, type: 'Poured concrete with improved coatings', failureMode: 'Aging waterproofing, drainage deterioration, settlement on variable soils', solution: 'Targeted exterior repair, drainage optimization, crack injection' },
      { era: '2000s–present (Intensification)', pct: 20, type: 'Modern poured concrete and ICF', failureMode: 'Tight lot drainage conflicts, settlement cracks, shared grading issues between properties', solution: 'Interior drainage for limited-access lots, crack injection, drainage separation' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall', impact: 'Black Creek flooded Rockcliffe-Smythe area, Don Valley inundated, thousands of basements flooded', prevention: 'Toronto Basement Flooding Protection Subsidy, backwater valves, exterior waterproofing' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Worst flooding in city history; Don Valley flooded, Sheppard subway station submerged, massive sewer overflow', prevention: 'City-wide flood protection program, enhanced sump systems, lot-level protection' },
      { date: 'August 2018', cause: 'Intense thunderstorm — 70+ mm in 1 hour', impact: 'Flash flooding in Lawrence-Bathurst area, sewer surcharge in Downsview, 400+ homes affected', prevention: 'Enhanced interior drainage, battery backup sumps, downspout disconnection program' },
      { date: 'June 2024', cause: 'Slow-moving storm system — 100 mm over 4 hours', impact: 'Combined sewer overflow in multiple North York neighborhoods, Don River at flood stage', prevention: 'Comprehensive lot-level protection, sewer backup prevention, foundation monitoring' },
    ],
  },

  // ──────────────────────────────────────────────────
  // OAKVILLE
  // ──────────────────────────────────────────────────
  oakville: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Halton Till — stiff silty clay', drainage: 'Poor' },
        { depth: '3.0–6.0 m', material: 'Glaciolacustrine clay (Lake Iroquois deposits)', drainage: 'Poor to very poor' },
        { depth: '6.0–15.0 m', material: 'Wentworth Till / inter-till sand & gravel', drainage: 'Fair to good' },
      ],
      waterTable: { springHigh: '0.8–1.5 m (creek valleys & lakefront)', summerLow: '2.5–4.0 m' },
      bedrock: { type: 'Queenston Shale (south) / Amabel Dolostone (north near Escarpment)', depth: '10–25 m', relevance: 'Sixteen Mile Creek and Bronte Creek create drainage valleys with elevated water tables; Halton Till clay dominates foundation behaviour; north Oakville closer to Escarpment springs' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, lake-effect snow along lakeshore' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles, ice damming' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt + spring rain, Sixteen Mile and Bronte Creek flooding' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated Halton Till, creek levels peak' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated near creeks' },
      { month: 'June', risk: 'Moderate', event: 'Summer storm season begins' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, flash flooding in creek valleys' },
      { month: 'August', risk: 'High', event: 'Lake Ontario storm surge, heavy rainfall' },
      { month: 'September', risk: 'Moderate', event: 'Late summer storms, clay shrinkage cracks' },
      { month: 'October', risk: 'Low', event: 'Fall rains, generally lower risk' },
      { month: 'November', risk: 'Moderate', event: 'Late storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, limited infiltration' },
    ],
    infrastructure: {
      sewerType: 'Separated in newer areas; combined sections remain in Old Oakville and Bronte Village',
      avgSewerAge: '30–60 years (old Oakville), 15–30 years (north Oakville)',
      capacityIssues: 'Old Oakville combined sewers overflow during moderate storms; Bronte Creek area storm sewers undersized; north Oakville new subdivision infrastructure being stress-tested',
      combinedAreas: ['Old Oakville / Downtown (Lakeshore to Rebecca)', 'Bronte Village / Bronte Harbour area', 'East Oakville near Sixteen Mile Creek mouth'],
    },
    foundationCensus: [
      { era: '1930s–1960s (Old Oakville)', pct: 20, type: 'Rubble stone, concrete block, early poured concrete', failureMode: 'Stone mortar failure, no waterproofing, lakefront moisture damage, tree root intrusion', solution: 'Heritage-sensitive exterior excavation, stone/block repair, membrane, new drainage' },
      { era: '1970s–1980s (South Oakville Estates)', pct: 25, type: 'Poured concrete with tar damp-proofing', failureMode: 'Tar coating failed, cove joint leaks, weeping tile clogged, Halton Till pressure', solution: 'Exterior membrane replacement, drainage renewal, sump pump upgrade' },
      { era: '1990s–2000s (Central Oakville)', pct: 25, type: 'Poured concrete with polymer membrane', failureMode: 'Aging membrane, drainage stone insufficient, clay settlement in creek valley areas', solution: 'Targeted exterior repair, enhanced drainage, crack injection' },
      { era: '2010s–present (North Oakville)', pct: 30, type: 'Modern poured concrete with dimple board', failureMode: 'Builder shortcuts in rapid north Oakville expansion, clay settlement, grading issues', solution: 'Builder defect correction, proper drainage, Tarion claim support, preventative systems' },
    ],
    floodHistory: [
      { date: 'August 2004', cause: 'Intense rainfall — 80 mm in 2 hours', impact: 'Bronte Creek flooding, old Oakville sewer overflow, lakefront property damage', prevention: 'Combined sewer separation, backwater valves, exterior waterproofing' },
      { date: 'July 2013', cause: 'GTA-wide flash flood event', impact: 'Sixteen Mile Creek overflow, basement flooding in central Oakville', prevention: 'Creek setback protection, enhanced storm drainage, lot-level measures' },
      { date: 'May 2017', cause: 'Lake Ontario record high water levels', impact: 'Sustained high water table affected south Oakville, lakefront erosion, chronic basement moisture', prevention: 'Marine-grade membranes, elevated drainage systems, foundation monitoring' },
      { date: 'September 2021', cause: 'Post-tropical storm — 90 mm over 6 hours', impact: 'Widespread flooding in north Oakville new subdivisions, builder-grade drainage overwhelmed', prevention: 'Builder defect corrections, enhanced sump capacity, proper lot grading' },
    ],
  },

  // ──────────────────────────────────────────────────
  // OSHAWA
  // ──────────────────────────────────────────────────
  oshawa: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Glaciolacustrine clay — heavy, plastic (Lake Iroquois deposits)', drainage: 'Very poor' },
        { depth: '2.5–6.0 m', material: 'Halton Till — silty clay till', drainage: 'Poor' },
        { depth: '6.0–15.0 m', material: 'Sand & gravel (Oak Ridges Moraine influence in north)', drainage: 'Good (north), poor (south)' },
      ],
      waterTable: { springHigh: '0.6–1.5 m (Oshawa Creek corridor)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '15–25 m', relevance: 'Deep overburden; Oshawa Creek and Harmony Creek create flood-prone valleys; heavy Lake Iroquois clay in south Oshawa creates extreme hydrostatic pressure on foundations' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, lake-effect snow events' },
      { month: 'February', risk: 'Moderate', event: 'Ice damming, mid-winter thaw cycles on lakefront' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt from Oak Ridges Moraine flows south through Oshawa, creeks flood' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, Oshawa Creek at peak' },
      { month: 'May', risk: 'Moderate', event: 'Water table still high, clay expansion maximum' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms begin, localized flooding' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, flash flooding in creek corridors' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, lakefront storm surge possible' },
      { month: 'September', risk: 'Low', event: 'Drier conditions, clay shrinkage' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge soil' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave in clay' },
    ],
    infrastructure: {
      sewerType: 'Separated in newer areas; combined sections in older Downtown Oshawa and South Oshawa',
      avgSewerAge: '35–60 years (old areas), 20–35 years (newer suburbs)',
      capacityIssues: 'Downtown combined sewers regularly overflow; Oshawa Creek watershed stormwater management inadequate for growing development; south Oshawa lakefront areas chronically wet',
      combinedAreas: ['Downtown Oshawa (Simcoe St to Centre St)', 'South Oshawa near lakefront', 'McLaughlin neighbourhood', 'Parts of Lakeview Park'],
    },
    foundationCensus: [
      { era: '1930s–1960s (Old Oshawa / GM Era)', pct: 25, type: 'Concrete block, brick, and older poured concrete', failureMode: 'Block mortar failure, industrial vibration damage from decades of GM factory operations, no waterproofing', solution: 'Full exterior excavation, block repair, membrane installation, drainage replacement, vibration damage assessment' },
      { era: '1970s–1980s (Post-War Suburbs)', pct: 30, type: 'Poured concrete with tar damp-proofing', failureMode: 'Tar coating failed, cove joint leaks, Lake Iroquois clay crushing old weeping tile', solution: 'Exterior membrane upgrade, new weeping tile with filter fabric, sump pump installation' },
      { era: '1990s–2000s (North Oshawa Growth)', pct: 30, type: 'Poured concrete with builder-grade membrane', failureMode: 'Builder shortcuts, inadequate drainage, Oak Ridges groundwater in north Oshawa', solution: 'Targeted exterior correction, enhanced drainage for moraine conditions, grading restoration' },
      { era: '2010s–present (Windfields & Kedron)', pct: 15, type: 'Modern poured concrete with dimple board', failureMode: 'Clay settlement, drainage gaps, Tarion warranty issues', solution: 'Crack injection, preventative interior drainage, pre-Tarion-expiry repair' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm remnants — 100+ mm rainfall', impact: 'Oshawa Creek overflowed, hundreds of basements flooded in south Oshawa, combined sewer overflow', prevention: 'Backwater valve program, exterior waterproofing in flood zones, sump upgrades' },
      { date: 'April 2014', cause: 'Rapid spring melt combined with heavy rain', impact: 'Oshawa Creek and Harmony Creek flooding, McLaughlin area sewer backup', prevention: 'Creek corridor protection, enhanced weeping tile, battery backup sumps' },
      { date: 'July 2020', cause: 'Intense thunderstorm — 80 mm in 90 minutes', impact: 'Flash flooding in central Oshawa, storm sewer surcharge, downtown combined sewer overflow', prevention: 'Combined sewer separation (Durham program), lot-level flood protection, interior drainage' },
    ],
  },

  // ──────────────────────────────────────────────────
  // PICKERING
  // ──────────────────────────────────────────────────
  pickering: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Glaciolacustrine silty clay (Lake Iroquois deposits)', drainage: 'Poor' },
        { depth: '2.5–6.0 m', material: 'Halton Till — dense silty clay', drainage: 'Very poor' },
        { depth: '6.0–15.0 m', material: 'Sand & silt (inter-till deposits)', drainage: 'Fair' },
      ],
      waterTable: { springHigh: '0.6–1.5 m (Rouge River & Duffins Creek areas)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '12–25 m', relevance: 'Deep clay overburden; Rouge River and Duffins Creek create flood-prone corridors; Lake Iroquois clay in south Pickering retains water and creates hydrostatic pressure' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, limited infiltration' },
      { month: 'February', risk: 'Low', event: 'Deep frost, ice damming on older homes' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt on frozen clay, Rouge River & Duffins Creek flood' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated clay, Lake Ontario level rising' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated near creeks and lake' },
      { month: 'June', risk: 'Moderate', event: 'Summer storm season begins' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, flash flooding in creek valleys' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain, Lake Ontario storm surge risk at Frenchman Bay' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing begins' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; some combined sections in old Pickering Village and Bay Ridges',
      avgSewerAge: '25–40 years',
      capacityIssues: 'Duffins Creek watershed storm sewers under pressure from Seaton development; Frenchman Bay area experiences lakefront-related drainage issues; older Bay Ridges infrastructure aging',
      combinedAreas: ['Old Pickering Village / Kingston Rd area', 'Parts of Bay Ridges near lakefront'],
    },
    foundationCensus: [
      { era: '1950s–1970s (Old Pickering Village & Bay Ridges)', pct: 20, type: 'Concrete block and older poured concrete', failureMode: 'Block mortar failure, no modern waterproofing, lakefront moisture damage, clogged clay tile drains', solution: 'Full exterior excavation, block repair, membrane installation, complete drainage replacement' },
      { era: '1980s–1990s (Liverpool Rd & Brock Rd corridors)', pct: 30, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Tar coating failing, cove joint leaks, weeping tile clogged with Lake Iroquois clay fines', solution: 'Exterior membrane replacement, new weeping tile with filter fabric, sump installation' },
      { era: '2000s–2010s (Duffin Heights & Brock North)', pct: 35, type: 'Poured concrete with builder-grade membrane', failureMode: 'Builder shortcuts, inadequate drainage stone, poor grading on former farmland clay', solution: 'Builder defect correction, proper drainage stone, grading restoration, code-compliant membrane' },
      { era: '2015–present (Seaton Community)', pct: 15, type: 'Modern poured concrete with dimple board', failureMode: 'Clay settlement on new development, drainage tile gaps, Tarion warranty issues', solution: 'Crack injection, drainage optimization, pre-Tarion-expiry assessment' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — heavy rainfall', impact: 'Duffins Creek and Rouge River flooding, widespread basement flooding in south Pickering', prevention: 'Backwater valves, sump pump upgrades, exterior waterproofing in flood zones' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Bay Ridges and Frenchman Bay area flooded, Lake Ontario storm surge compound effect', prevention: 'Enhanced lot-level protection, lakefront-specific waterproofing, battery backup sumps' },
      { date: 'May 2017', cause: 'Record Lake Ontario levels', impact: 'Sustained high water table in south Pickering, Frenchman Bay flooding', prevention: 'Marine-grade exterior systems, elevated sump discharge, lakefront barriers' },
      { date: 'August 2023', cause: 'Severe thunderstorm — 85 mm in 2 hours', impact: 'Flash flooding in newer Duffin Heights subdivisions, storm sewer surcharge', prevention: 'Enhanced sump capacity, builder defect corrections, lot grading restoration' },
    ],
  },

  // ──────────────────────────────────────────────────
  // RICHMOND HILL
  // ──────────────────────────────────────────────────
  "richmond-hill": {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & construction fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Halton Till — dense silty clay to clay', drainage: 'Very poor' },
        { depth: '3.0–8.0 m', material: 'Newmarket Till — sandy silt till', drainage: 'Fair' },
        { depth: '8.0–20.0 m', material: 'Oak Ridges Moraine sand & gravel (north Richmond Hill)', drainage: 'Good' },
      ],
      waterTable: { springHigh: '0.8–1.5 m', summerLow: '2.5–4.0 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '20–40 m', relevance: 'Deep overburden; Oak Ridges Moraine in north creates significant groundwater recharge zones; clay till throughout creates persistent hydrostatic pressure; East Don River headwaters drain through the city' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, limited infiltration' },
      { month: 'February', risk: 'Low', event: 'Deep frost, foundation stress from frost heave' },
      { month: 'March', risk: 'Critical', event: 'Heavy snowmelt + frozen clay = surface water ponding, Don River tributaries flood' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated Halton Till, water table at peak' },
      { month: 'May', risk: 'Moderate', event: 'Continued elevated water table, clay expansion' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms begin, flash flooding in creek valleys' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, sewer surcharging in older areas' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay shrinkage opens foundation cracks' },
      { month: 'September', risk: 'Low', event: 'Drier period, groundwater declining' },
      { month: 'October', risk: 'Low', event: 'Fall rains begin soil recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late storms saturate clay before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on shallow footings' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; some combined sections in historic Richmond Hill village core',
      avgSewerAge: '20–40 years',
      capacityIssues: 'Rapid growth in 1990s-2000s strained sewer infrastructure; Bayview/Elgin Mills corridor subdivisions have undersized storm sewers; East Don tributaries exceed capacity during major storms',
      combinedAreas: ['Historic Richmond Hill village (Yonge St & Major Mackenzie area)', 'Parts of old Elgin Mills area'],
    },
    foundationCensus: [
      { era: '1960s–1970s (Old Richmond Hill)', pct: 15, type: 'Concrete block and older poured concrete', failureMode: 'Block mortar deterioration, tar damp-proofing failed, tree root intrusion', solution: 'Exterior excavation, block repair, membrane installation, root barriers' },
      { era: '1980s–1990s (First Suburban Wave)', pct: 30, type: 'Poured concrete with basic damp-proofing', failureMode: 'Builder-grade waterproofing failing at 30+ years, clay clogging drainage, settlement', solution: 'Full exterior membrane replacement, drainage renewal, sump installation' },
      { era: '2000s (Rapid Expansion)', pct: 35, type: 'Poured concrete on clay farmland', failureMode: 'Mass-construction shortcuts, inadequate drainage, poor grading, shared drainage issues', solution: 'Comprehensive exterior waterproofing, drainage correction, lot grading restoration' },
      { era: '2010s–present (Infill & North Hills)', pct: 20, type: 'Modern poured concrete with dimple membrane', failureMode: 'Clay settlement, Oak Ridges groundwater in north, Tarion warranty expiration', solution: 'Crack injection, enhanced drainage for moraine conditions, preventative systems' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall', impact: 'Don River tributaries flooded, basement flooding in Bayview corridor, sewer surcharge', prevention: 'Backwater valves, exterior waterproofing, enhanced sump systems' },
      { date: 'July 2013', cause: 'GTA flash flood event', impact: 'Widespread flooding in south Richmond Hill, 300+ basement flooding reports', prevention: 'Lot-level flood protection, interior drainage, battery backup sumps' },
      { date: 'June 2020', cause: 'Severe thunderstorm — 75 mm in 1 hour', impact: 'Flash flooding in Elgin Mills subdivisions, builder-grade drainage overwhelmed', prevention: 'Builder defect corrections, enhanced drainage stone, sump capacity upgrades' },
      { date: 'April 2024', cause: 'Spring melt + heavy rain on frozen ground', impact: 'Widespread seepage in newer subdivisions, water table exceptionally high', prevention: 'Exterior waterproofing upgrades, proper backfill with clear stone, foundation monitoring' },
    ],
  },

  // ──────────────────────────────────────────────────
  // SCARBOROUGH
  // ──────────────────────────────────────────────────
  scarborough: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Urban fill & topsoil', drainage: 'Variable' },
        { depth: '0.3–3.0 m', material: 'Glaciolacustrine clay — heavy, plastic (Lake Iroquois deposits)', drainage: 'Very poor' },
        { depth: '3.0–8.0 m', material: 'Scarborough Bluffs sand & silt inter-bedded with clay', drainage: 'Variable' },
        { depth: '8.0–20.0 m', material: 'Halton Till / Newmarket Till sequence', drainage: 'Poor' },
      ],
      waterTable: { springHigh: '0.5–1.5 m (Rouge Valley & Highland Creek)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '25–40 m', relevance: 'Famous Scarborough Bluffs expose thick glacial sequence; Lake Iroquois clay in south creates extreme hydrostatic pressure; Rouge River valley and Highland Creek create flood-prone drainage corridors' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, lake-effect snow in southeast' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles, ice damming on post-war bungalows' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt on frozen Lake Iroquois clay, Highland Creek & Rouge River flood' },
      { month: 'April', risk: 'High', event: 'Spring rains on saturated heavy clay, combined sewer overflow' },
      { month: 'May', risk: 'Moderate', event: 'Water table still high in creek valleys' },
      { month: 'June', risk: 'High', event: 'Severe thunderstorms, flash flooding in ravines' },
      { month: 'July', risk: 'High', event: 'Peak storm intensity, Bluffs erosion events, sewer surcharge' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain, Lake Ontario storm surge on Bluffs' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage opens foundation cracks' },
      { month: 'October', risk: 'Moderate', event: 'Fall storms recharge saturated clay' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on older shallow footings' },
    ],
    infrastructure: {
      sewerType: 'Mixed — combined sewers in older southwest Scarborough; separated in newer areas and northern suburbs',
      avgSewerAge: '40–60 years (older areas), 25–40 years (newer)',
      capacityIssues: 'Highland Creek watershed sewer capacity severely strained; southwest Scarborough combined sewers chronically overwhelmed; Bluffs area drainage complicated by erosion; Rouge River corridor exceeds capacity during spring melt',
      combinedAreas: ['West Hill / Kingston Rd corridor', 'Scarborough Village', 'Cliffcrest / Bluffs area', 'Parts of Eglinton East', 'Wexford / Maryvale (partial)'],
    },
    foundationCensus: [
      { era: '1950s–1960s (Post-War Scarborough)', pct: 30, type: 'Concrete block and cinder block on strip footings', failureMode: 'Block mortar completely gone, no waterproofing, tree root penetration, century-old drain tiles collapsed', solution: 'Full exterior excavation, block stabilization or replacement, membrane, complete new drainage' },
      { era: '1970s–1980s (Suburban Build-Out)', pct: 30, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Tar coating disintegrated, cove joint separation, Lake Iroquois clay crushing weeping tile', solution: 'Exterior membrane replacement, heavy-duty weeping tile for clay conditions, sump installation' },
      { era: '1990s–2000s (Infill & Renewal)', pct: 25, type: 'Poured concrete with improved waterproofing', failureMode: 'Aging systems, ravine-edge foundation stress, clay settlement in Highland Creek area', solution: 'Targeted exterior repair, ravine-specific drainage, crack injection with monitoring' },
      { era: '2010s–present (Intensification)', pct: 15, type: 'Modern poured concrete and ICF', failureMode: 'Tight lot drainage conflicts, settlement on Lake Iroquois clay, shared grading issues', solution: 'Interior drainage for limited-access lots, crack injection, lot grading separation' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm rainfall', impact: 'Highland Creek devastated, Rouge Valley flooded, thousands of basements in south Scarborough flooded', prevention: 'Toronto Basement Flooding Protection Subsidy ($3,400), exterior waterproofing, sump upgrades' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Worst flood event in Scarborough history; Highland Creek destroyed roads and bridges, massive sewer overflow', prevention: 'City-wide flood protection program, enhanced sump systems, lot-level protection' },
      { date: 'August 2018', cause: 'Intense thunderstorm cell over southeast Scarborough', impact: 'Flash flooding in Cliffcrest and West Hill, Bluffs erosion, sewer backup in combined areas', prevention: 'Enhanced interior drainage, battery backup sumps, disconnected downspouts' },
      { date: 'May 2024', cause: 'Extended spring rain on saturated Lake Iroquois clay', impact: 'Chronic seepage across south Scarborough, Highland Creek at flood stage for 3 weeks', prevention: 'Comprehensive exterior waterproofing, foundation monitoring, high-capacity drainage' },
    ],
  },

  // ──────────────────────────────────────────────────
  // VAUGHAN
  // ──────────────────────────────────────────────────
  vaughan: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & construction fill', drainage: 'Moderate' },
        { depth: '0.3–3.0 m', material: 'Halton Till — clay-till mix with sand pockets', drainage: 'Poor to fair (variable)' },
        { depth: '3.0–8.0 m', material: 'Newmarket Till — dense sandy silt till', drainage: 'Fair' },
        { depth: '8.0–20.0 m', material: 'Thorncliffe Formation — sand, silt, clay', drainage: 'Variable' },
      ],
      waterTable: { springHigh: '0.6–1.5 m (Woodbridge / Humber River)', summerLow: '2.5–4.0 m' },
      bedrock: { type: 'Georgian Bay Formation shale', depth: '20–35 m', relevance: 'Deep overburden; Humber River creates major flood corridor through Woodbridge; variable clay-till with sand pockets creates unpredictable drainage; former farmland clay consolidates under building loads' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, limited infiltration' },
      { month: 'February', risk: 'Moderate', event: 'Mid-winter thaw cycles stress foundations in Woodbridge' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt + frozen clay = Humber River flood conditions, severe ponding in subdivisions' },
      { month: 'April', risk: 'High', event: 'Spring rain compounds melt, Humber at peak stage, clay expansion maximum' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated, subdivision drainage stressed' },
      { month: 'June', risk: 'High', event: 'Severe thunderstorms, Humber River flash flooding risk' },
      { month: 'July', risk: 'High', event: 'Peak storm intensity, sewer surcharging in rapid-growth areas' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain events, clay shrinkage opens cracks' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay contracting' },
      { month: 'October', risk: 'Low', event: 'Fall rains begin soil recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late storms saturate clay before freeze' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on shallow footings' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; some combined sections remain in historic Woodbridge core',
      avgSewerAge: '15–35 years (rapid 1990s-2010s growth)',
      capacityIssues: 'Humber River watershed sewer capacity strained during major storms; Maple and Concord subdivision storm sewers undersized for actual density; Woodbridge combined sewers overflow during moderate rainfall',
      combinedAreas: ['Historic Woodbridge core (Woodbridge Ave / Islington Ave)', 'Parts of old Thornhill (Yonge St corridor)'],
    },
    foundationCensus: [
      { era: '1970s–1990s (Established Woodbridge/Thornhill)', pct: 20, type: 'Poured concrete with tar or basic damp-proofing', failureMode: 'Original waterproofing aging out, Humber River water table pressure, mature tree root intrusion, weeping tile clogged', solution: 'Full exterior membrane replacement, new weeping tile, dual sump pumps with battery backup, backwater valve' },
      { era: '2000s (Maple/Concord Boom)', pct: 35, type: 'Poured concrete with variable quality control', failureMode: 'Builder shortcuts from fast-track construction — thin parging, inadequate drainage stone, improper backfill, window wells without drains', solution: 'Targeted exterior repair, drainage stone correction, code-compliant membrane, window well upgrades' },
      { era: '2010s (Vellore/Sonoma Heights)', pct: 30, type: 'Modern poured concrete with synthetic membranes, some ICF', failureMode: 'Clay settlement causing cracks, drainage tile gaps at corners, Tarion warranty expiration leaving homeowners exposed', solution: 'Crack injection before finishes, drainage optimization, Tarion claim documentation and support' },
      { era: '2020s (New Kleinburg/Patterson)', pct: 15, type: 'ICF and modern poured concrete with dimple board', failureMode: 'Settlement on former farmland clay, drainage conflicts between tight lots, grading issues', solution: 'Preventative waterproofing before luxury finishes, lot grading correction, enhanced drainage' },
    ],
    floodHistory: [
      { date: 'October 1954 (Hurricane Hazel)', cause: 'Hurricane Hazel dumped 285 mm — the flood that shaped Woodbridge', impact: 'Humber River devastation, 81 deaths in GTA, Woodbridge neighborhood destroyed, led to TRCA creation', prevention: 'TRCA flood plain regulations, Woodbridge-specific building codes, enhanced community flood protection' },
      { date: 'August 2005', cause: 'GTA superstorm — 153 mm in 3 hours', impact: 'Humber River flooding in Woodbridge, 500+ basements flooded, sewer backup widespread', prevention: 'Backwater valve installation, exterior waterproofing, dual sump systems with backup power' },
      { date: 'July 2013', cause: 'GTA flash flood — 126 mm in 2 hours', impact: 'Major flooding across Vaughan, Maple subdivisions overwhelmed, Humber at critical levels', prevention: 'Enhanced lot-level protection, builder defect corrections, interior drainage backup systems' },
      { date: 'June 2020', cause: 'Severe thunderstorm cell — 90 mm in 90 minutes over central Vaughan', impact: 'Flash flooding in Vellore and Maple, new subdivision drainage systems overwhelmed', prevention: 'Upgraded sump capacity, proper drainage stone, foundation crack monitoring' },
    ],
  },

  // ──────────────────────────────────────────────────
  // WATERLOO
  // ──────────────────────────────────────────────────
  waterloo: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Port Stanley Till — sandy silt to silty clay', drainage: 'Fair to poor' },
        { depth: '2.5–8.0 m', material: 'Waterloo Moraine — complex sand, gravel, clay layers', drainage: 'Highly variable' },
        { depth: '8.0–25.0 m', material: 'Maryhill Till / Catfish Creek Till — dense clay', drainage: 'Very poor' },
      ],
      waterTable: { springHigh: '1.0–2.5 m (Waterloo Moraine recharge zone)', summerLow: '3.0–6.0 m' },
      bedrock: { type: 'Salina Formation dolostone & shale', depth: '25–40+ m', relevance: 'Waterloo Moraine is the region\'s primary aquifer; complex internal drainage creates unpredictable groundwater conditions; homes near moraine features may encounter sand lenses that channel water unexpectedly toward foundations' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, higher snowfall than GTA' },
      { month: 'February', risk: 'Low', event: 'Deep frost, accumulated snowpack' },
      { month: 'March', risk: 'Critical', event: 'Heavy snowmelt — Waterloo receives more snow than Toronto; Grand River tributaries flood' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated moraine, Laurel Creek at peak flow' },
      { month: 'May', risk: 'Moderate', event: 'Moraine aquifer recharged, water table high' },
      { month: 'June', risk: 'Moderate', event: 'Summer storms begin, urban flash flooding possible' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, Laurel Creek flash flooding' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain on variable moraine soils' },
      { month: 'September', risk: 'Low', event: 'Drier conditions, groundwater declining' },
      { month: 'October', risk: 'Low', event: 'Fall rains begin recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late fall storms, early snow possible' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave on variable soils' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; combined sewers in older uptown core and university area',
      avgSewerAge: '30–50 years (uptown), 15–30 years (newer developments)',
      capacityIssues: 'Laurel Creek watershed storm capacity strained by intensification near universities; uptown Waterloo combined sewers overflow; rapid student housing development creating drainage conflicts',
      combinedAreas: ['Uptown Waterloo (King St to Erb St)', 'University Ave / Weber St area', 'Parts of Westmount / Mary-Allen neighbourhood'],
    },
    foundationCensus: [
      { era: 'Pre-1950s (Historic Waterloo)', pct: 10, type: 'Rubble stone and early concrete block', failureMode: 'Stone mortar failure, no waterproofing, century-old drainage collapsed', solution: 'Full excavation, stone stabilization, modern membrane, complete new drainage' },
      { era: '1950s–1970s (University Area Growth)', pct: 25, type: 'Concrete block and poured concrete with tar', failureMode: 'Block deterioration, tar coating failed, weeping tile clogged with moraine fines', solution: 'Exterior membrane, block repair, new weeping tile, sump pump installation' },
      { era: '1980s–2000s (Suburban Expansion)', pct: 40, type: 'Poured concrete with improving waterproofing', failureMode: 'Variable moraine soils cause differential settlement, aging membranes, drainage overwhelmed', solution: 'Targeted exterior repair, enhanced drainage for moraine conditions, crack injection' },
      { era: '2010s–present (Intensification)', pct: 25, type: 'Modern poured concrete and ICF', failureMode: 'Tight lot drainage conflicts from infill, variable moraine groundwater, settlement', solution: 'Interior drainage for limited-access lots, moraine-specific groundwater management' },
    ],
    floodHistory: [
      { date: 'June 2010', cause: 'Severe thunderstorm — 80 mm in 2 hours', impact: 'Laurel Creek flooding near universities, combined sewer overflow in uptown, 200+ basements', prevention: 'Enhanced storm drainage, backwater valves, lot-level stormwater management' },
      { date: 'April 2018', cause: 'Grand River spring flooding + heavy rain', impact: 'Elevated water table across region, basement seepage widespread', prevention: 'Foundation drainage upgrades, moraine-specific waterproofing, backup sump systems' },
      { date: 'July 2023', cause: 'Stalled thunderstorm — 90 mm in 90 minutes', impact: 'Flash flooding in uptown core, Laurel Creek overflow, sewer surcharge in university area', prevention: 'Combined sewer separation advocacy, interior drainage, enhanced downspout disconnection' },
    ],
  },

  // ──────────────────────────────────────────────────
  // WHITBY
  // ──────────────────────────────────────────────────
  whitby: {
    geological: {
      soilLayers: [
        { depth: '0–0.3 m', material: 'Topsoil & fill', drainage: 'Moderate' },
        { depth: '0.3–2.5 m', material: 'Glaciolacustrine clay (Lake Iroquois deposits)', drainage: 'Poor to very poor' },
        { depth: '2.5–6.0 m', material: 'Halton Till — dense silty clay', drainage: 'Very poor' },
        { depth: '6.0–15.0 m', material: 'Sand & silt inter-till deposits', drainage: 'Fair' },
      ],
      waterTable: { springHigh: '0.6–1.5 m (Lynde Creek & Pringle Creek corridors)', summerLow: '2.0–3.5 m' },
      bedrock: { type: 'Georgian Bay Formation shale (Whitby Formation)', depth: '10–20 m', relevance: 'Whitby is actually named after the shale formation beneath it; shallow bedrock in some areas creates perched water table; Lynde Creek and Pringle Creek create flood-prone drainage corridors' },
    },
    seasonal: [
      { month: 'January', risk: 'Low', event: 'Frozen ground, lake-effect snow events' },
      { month: 'February', risk: 'Moderate', event: 'Freeze-thaw cycles, ice damming near lakefront' },
      { month: 'March', risk: 'Critical', event: 'Snowmelt on frozen clay, Lynde Creek and Pringle Creek flood' },
      { month: 'April', risk: 'High', event: 'Spring rain on saturated Lake Iroquois clay, Lake Ontario level rising' },
      { month: 'May', risk: 'Moderate', event: 'Water table still elevated near creeks' },
      { month: 'June', risk: 'Moderate', event: 'Summer storm season begins' },
      { month: 'July', risk: 'High', event: 'Severe thunderstorms, flash flooding in creek valleys' },
      { month: 'August', risk: 'Moderate', event: 'Heavy rain, lakefront storm surge risk' },
      { month: 'September', risk: 'Low', event: 'Drier period, clay shrinkage' },
      { month: 'October', risk: 'Low', event: 'Fall rains recharge' },
      { month: 'November', risk: 'Moderate', event: 'Late-season storms before freeze-up' },
      { month: 'December', risk: 'Low', event: 'Ground freezing, frost heave in clay' },
    ],
    infrastructure: {
      sewerType: 'Mostly separated; limited combined sections in Downtown Whitby core',
      avgSewerAge: '25–40 years (older areas), 10–25 years (new subdivisions)',
      capacityIssues: 'Brooklin expansion straining trunk sewer capacity; Lynde Creek watershed storm sewers undersized for new development density; south Whitby lakefront areas have aging infrastructure',
      combinedAreas: ['Downtown Whitby / Dundas St W core area', 'Parts of old Port Whitby near harbour'],
    },
    foundationCensus: [
      { era: '1950s–1970s (Old Whitby)', pct: 20, type: 'Concrete block and older poured concrete', failureMode: 'Block mortar failure, tar coating disintegrated, clay tile drains collapsed', solution: 'Full exterior excavation, block repair, membrane installation, drainage replacement' },
      { era: '1980s–1990s (South Whitby Growth)', pct: 30, type: 'Poured concrete with tar-based damp-proofing', failureMode: 'Tar coating failing at 30-40 years, Lake Iroquois clay clogging weeping tile, cove joint leaks', solution: 'Exterior membrane replacement, weeping tile renewal with filter fabric, sump installation' },
      { era: '2000s–2010s (North Whitby Expansion)', pct: 35, type: 'Poured concrete with builder-grade membrane', failureMode: 'Builder shortcuts during rapid expansion, inadequate drainage stone, poor grading', solution: 'Builder defect correction, proper drainage, grading restoration, code-compliant membrane' },
      { era: '2015–present (Brooklin)', pct: 15, type: 'Modern poured concrete with dimple board', failureMode: 'Clay settlement in new Brooklin development, drainage tile gaps, Tarion issues', solution: 'Crack injection, drainage optimization, Tarion claim support' },
    ],
    floodHistory: [
      { date: 'August 2005', cause: 'GTA superstorm remnants — heavy rainfall', impact: 'Lynde Creek and Pringle Creek flooding, south Whitby basement flooding widespread', prevention: 'Backwater valves, sump pump upgrades, exterior waterproofing in flood zones' },
      { date: 'July 2013', cause: 'GTA flash flood event', impact: 'Major flooding in central Whitby, creek corridors overflowed, sewer surcharge', prevention: 'Enhanced lot-level protection, creek setback waterproofing, interior drainage' },
      { date: 'May 2017', cause: 'Lake Ontario record high water levels', impact: 'Sustained high water table in south Whitby, Port Whitby harbour flooding', prevention: 'Marine-grade exterior systems, elevated sump discharge, lakefront-specific protection' },
      { date: 'June 2022', cause: 'Severe thunderstorm — 80 mm in 1 hour', impact: 'Flash flooding in Brooklin subdivisions, new storm sewers overwhelmed', prevention: 'Enhanced sump capacity, builder defect corrections, lot grading restoration' },
    ],
  },
};
