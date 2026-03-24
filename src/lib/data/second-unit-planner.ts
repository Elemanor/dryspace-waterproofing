// ── Second Unit Planner Data ──
// City-specific cost + incentive calculator for basement second units

export type CitySlug =
  | 'toronto'
  | 'mississauga'
  | 'brampton'
  | 'vaughan'
  | 'markham'
  | 'richmond-hill'
  | 'oakville'
  | 'burlington'
  | 'hamilton'
  | 'oshawa'
  | 'pickering'
  | 'whitby'
  | 'milton'
  | 'kitchener'
  | 'scarborough';

export interface CityData {
  slug: CitySlug;
  name: string;
  region: string;
  costMultiplier: number;
  rentalIncome: { min: number; max: number };
  propertyValueLift: string;
  nearbyCities: CitySlug[];
  permitTimeline: string;
  permitCost: string;
  ceilingHeightReq: string;
  egressReq: string;
  parkingReq: string;
  fireReq: string;
  electricalReq: string;
  plumbingReq: string;
  hvacReq: string;
  zoningNotes: string;
  faqs: { question: string; answer: string }[];
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  costRange: { min: number; max: number };
  labourPercent: number;
  rebateIds: string[];
  icon: string;
}

export interface BuildPackage {
  id: 'budget' | 'standard' | 'premium';
  name: string;
  description: string;
  costRange: { min: number; max: number };
  includes: string[];
}

export interface Incentive {
  id: string;
  name: string;
  level: 'federal' | 'provincial' | 'municipal' | 'utility';
  amount: number;
  amountType: 'fixed' | 'percentage' | 'financing';
  description: string;
  eligibility: string[];
  applyUrl: string;
  applicableCities: CitySlug[] | 'all';
  projectTypes: string[];
}

// ── City Multipliers ──
// Adjusts base costs relative to Toronto (1.0)
const cityMultipliers: Record<CitySlug, number> = {
  toronto: 1.0,
  mississauga: 0.95,
  brampton: 0.90,
  vaughan: 1.02,
  markham: 0.97,
  'richmond-hill': 0.98,
  oakville: 1.05,
  burlington: 0.93,
  hamilton: 0.85,
  oshawa: 0.82,
  pickering: 0.88,
  whitby: 0.85,
  milton: 0.90,
  kitchener: 0.83,
  scarborough: 0.96,
};

// ── Cities ──
export const cities: Record<CitySlug, CityData> = {
  toronto: {
    slug: 'toronto',
    name: 'Toronto',
    region: 'City of Toronto',
    costMultiplier: 1.0,
    rentalIncome: { min: 2000, max: 2500 },
    propertyValueLift: '15–25%',
    nearbyCities: ['scarborough', 'mississauga', 'vaughan'],
    permitTimeline: '4–8 weeks',
    permitCost: '$2,500–$5,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening, each bedroom + living area',
    parkingReq: '1 additional space required (may apply for variance)',
    fireReq: '1-hour fire separation floor/ceiling, interconnected smoke/CO alarms, fire-rated doors',
    electricalReq: '100A sub-panel minimum, separate meter recommended, GFCI in wet areas',
    plumbingReq: 'Separate shutoff, backwater valve mandatory, sump pump if below sewer',
    hvacReq: 'Separate heating zone, HRV recommended, min ventilation per OBC',
    zoningNotes: 'As-of-right in most residential zones since 2024. No owner-occupancy requirement.',
    faqs: [
      { question: 'How much does a legal basement apartment cost in Toronto?', answer: 'A legal basement apartment in Toronto costs $50,000–$250,000 depending on scope. Budget conversions with existing ceiling height start at $50,000. Standard full conversions average $80,000–$175,000. Premium suites with underpinning and high-end finishes reach $250,000+.' },
      { question: 'What incentives are available for basement apartments in Toronto?', answer: 'Toronto homeowners can access up to $60,000+ in stacked incentives: Ontario Secondary Suite Program ($40,000 forgivable loan), MHRTC federal tax credit ($7,500), Toronto Basement Flooding Subsidy ($3,400), Enbridge rebates ($5,000), and Toronto HELP financing ($125,000 at low interest).' },
      { question: 'Do I need a permit for a basement apartment in Toronto?', answer: 'Yes. Building permits are required for all basement second units in Toronto. You need permits for structural work, plumbing, electrical, and HVAC. The City of Toronto now allows secondary suites as-of-right in most residential zones since 2024.' },
      { question: 'How long does it take to build a legal basement apartment in Toronto?', answer: 'A typical basement apartment conversion takes 3–6 months: permit approval (4–8 weeks), structural work/underpinning (4–6 weeks), rough-ins (2–3 weeks), finishing (4–6 weeks), and final inspections (1–2 weeks).' },
      { question: 'What is the ROI on a basement apartment in Toronto?', answer: 'At $2,000–$2,500/month rental income and a net cost of $27,000–$130,000 after incentives, payback is typically 1–5 years. Property value increases 15–25%. This is one of the best ROI home investments in the GTA.' },
      { question: 'Does DrySpace handle permits and inspections for basement apartments?', answer: 'Yes. DrySpace manages the entire process from architectural drawings and permit applications to construction, inspections, and final occupancy. We also help you apply for all available government incentives.' },
    ],
  },
  mississauga: {
    slug: 'mississauga',
    name: 'Mississauga',
    region: 'Peel Region',
    costMultiplier: 0.95,
    rentalIncome: { min: 1800, max: 2200 },
    propertyValueLift: '12–20%',
    nearbyCities: ['toronto', 'brampton', 'oakville'],
    permitTimeline: '4–6 weeks',
    permitCost: '$2,000–$4,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional parking space required',
    fireReq: '1-hour fire separation, interconnected alarms, self-closing fire doors',
    electricalReq: '100A sub-panel, separate meter, arc-fault protection on bedrooms',
    plumbingReq: 'Separate shutoff, backwater valve required per Peel Region bylaw',
    hvacReq: 'Separate heating, mechanical ventilation per OBC 9.32',
    zoningNotes: 'Second units permitted in all residential zones. Zoning bylaw 0225-2007 updated 2024.',
    faqs: [
      { question: 'How much does a basement apartment cost in Mississauga?', answer: 'Basement apartments in Mississauga cost $47,500–$237,500. Labour and materials are about 5% lower than Toronto. Budget conversions start at $47,500, standard at $76,000–$166,000, and premium at $142,500–$237,500.' },
      { question: 'What rebates are available in Mississauga for basement conversions?', answer: 'Mississauga homeowners can stack: Ontario Secondary Suite Program ($40,000), MHRTC federal credit ($7,500), Mississauga Basement Flooding Subsidy ($2,500), and Enbridge energy rebates ($5,000). Total potential savings exceed $55,000.' },
      { question: 'Is a building permit required in Mississauga?', answer: 'Yes. All basement second units require building permits from the City of Mississauga. Permits cover structural, plumbing, electrical, and HVAC work. Processing takes 4–6 weeks.' },
      { question: 'What are Mississauga zoning rules for basement apartments?', answer: 'Since zoning bylaw updates in 2024, second units are permitted in all residential zones in Mississauga. One additional parking space is required. The unit must comply with OBC and Peel Region building standards.' },
      { question: 'How much rent can I charge for a basement apartment in Mississauga?', answer: 'Legal basement apartments in Mississauga command $1,800–$2,200/month depending on size, finishes, and location. Areas near Square One, Port Credit, and Lakeshore command the highest rents.' },
      { question: 'Does DrySpace build basement apartments in Mississauga?', answer: 'Yes. DrySpace provides full-service basement apartment construction in Mississauga including permits, underpinning, waterproofing, egress windows, plumbing, electrical, and finishing. We also handle all incentive applications.' },
    ],
  },
  brampton: {
    slug: 'brampton',
    name: 'Brampton',
    region: 'Peel Region',
    costMultiplier: 0.90,
    rentalIncome: { min: 1600, max: 2000 },
    propertyValueLift: '10–18%',
    nearbyCities: ['mississauga', 'vaughan', 'milton'],
    permitTimeline: '3–6 weeks',
    permitCost: '$1,800–$4,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space or variance application',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel minimum, GFCI in wet areas',
    plumbingReq: 'Backwater valve required, separate shutoff',
    hvacReq: 'Separate heating zone, HRV recommended',
    zoningNotes: 'Second units broadly permitted since 2018 zoning update. High demand area.',
    faqs: [
      { question: 'How much does a basement apartment cost in Brampton?', answer: 'Brampton basement apartments cost $45,000–$225,000. Costs are about 10% lower than Toronto. Budget starts at $45,000, standard $72,000–$157,500, premium $135,000–$225,000.' },
      { question: 'What incentives are available in Brampton?', answer: 'Brampton homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC federal credit ($7,500), Brampton Flood Protection ($2,000), and Enbridge rebates ($5,000). Total potential: $54,500+.' },
      { question: 'Is a basement apartment legal in Brampton?', answer: 'Yes. Brampton has permitted second units in most residential zones since 2018. A building permit and compliance with OBC are required. Brampton is one of the GTA cities with the most basement apartment demand.' },
      { question: 'How much rent can I charge in Brampton?', answer: 'Legal basement apartments in Brampton rent for $1,600–$2,000/month. Areas near Bramalea City Centre, downtown Brampton, and near GO stations command premium rents.' },
      { question: 'How long does construction take in Brampton?', answer: 'Typical Brampton basement conversion takes 3–5 months: permits (3–6 weeks), structural (4–6 weeks), rough-ins (2–3 weeks), finishing (3–5 weeks), inspections (1–2 weeks).' },
      { question: 'Does DrySpace serve Brampton?', answer: 'Yes. DrySpace provides complete basement apartment construction services throughout Brampton. We handle everything from permits to final inspection, including all incentive applications.' },
    ],
  },
  vaughan: {
    slug: 'vaughan',
    name: 'Vaughan',
    region: 'York Region',
    costMultiplier: 1.02,
    rentalIncome: { min: 1900, max: 2300 },
    propertyValueLift: '14–22%',
    nearbyCities: ['toronto', 'markham', 'richmond-hill'],
    permitTimeline: '4–8 weeks',
    permitCost: '$2,200–$5,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space (enforcement varies by area)',
    fireReq: '1-hour fire separation, interconnected smoke/CO alarms',
    electricalReq: '100A sub-panel, separate meter for metered billing',
    plumbingReq: 'Backwater valve, sump pump in flood-prone areas',
    hvacReq: 'Separate HVAC zone, mechanical ventilation required',
    zoningNotes: 'Permitted in most residential zones under York Region official plan. Maple, Woodbridge, Kleinburg areas eligible.',
    faqs: [
      { question: 'How much does a basement apartment cost in Vaughan?', answer: 'Vaughan basement apartments cost $51,000–$255,000. Costs are about 2% higher than Toronto due to premium construction standards. Budget starts at $51,000, standard $81,600–$178,500, premium $153,000–$255,000.' },
      { question: 'What incentives are available in Vaughan?', answer: 'Vaughan homeowners can stack: Ontario Secondary Suite Program ($40,000), MHRTC federal credit ($7,500), and Enbridge rebates ($5,000). Municipal flood protection program is under development. Total current potential: $52,500+.' },
      { question: 'Are basement apartments legal in Vaughan?', answer: 'Yes. Second units are permitted in most residential zones in Vaughan under the York Region official plan. Building permits and OBC compliance are mandatory.' },
      { question: 'How much rent can I get in Vaughan?', answer: 'Legal basement apartments in Vaughan rent for $1,900–$2,300/month. Woodbridge, Maple, and areas near Vaughan Metropolitan Centre command the highest rents.' },
      { question: 'What permits do I need in Vaughan?', answer: 'You need building permits from the City of Vaughan for structural, plumbing, electrical, and HVAC work. Processing takes 4–8 weeks. DrySpace handles all permit applications.' },
      { question: 'Does DrySpace build basement apartments in Vaughan?', answer: 'Yes. DrySpace serves all of Vaughan including Woodbridge, Maple, Kleinburg, and Concord with full basement conversion services.' },
    ],
  },
  markham: {
    slug: 'markham',
    name: 'Markham',
    region: 'York Region',
    costMultiplier: 0.97,
    rentalIncome: { min: 1800, max: 2200 },
    propertyValueLift: '12–20%',
    nearbyCities: ['scarborough', 'richmond-hill', 'vaughan'],
    permitTimeline: '4–7 weeks',
    permitCost: '$2,000–$4,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space required',
    fireReq: '1-hour fire separation, interconnected alarms, fire-rated doors',
    electricalReq: '100A sub-panel, GFCI in wet areas, arc-fault on bedrooms',
    plumbingReq: 'Backwater valve mandatory, separate shutoff',
    hvacReq: 'Separate heating, mechanical ventilation per OBC',
    zoningNotes: 'Second units permitted under York Region official plan. Unionville, Cornell, Berczy eligible.',
    faqs: [
      { question: 'How much does a basement apartment cost in Markham?', answer: 'Markham basement apartments cost $48,500–$242,500. Costs are about 3% below Toronto. Budget starts at $48,500, standard $77,600–$169,750, premium $145,500–$242,500.' },
      { question: 'What incentives are available in Markham?', answer: 'Markham homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC federal credit ($7,500), Markham Flooding Reduction ($1,800), and Enbridge rebates ($5,000). Total: $54,300+.' },
      { question: 'Are basement apartments legal in Markham?', answer: 'Yes. Second units are permitted in most residential zones. Building permits are required. Markham has seen strong growth in legal basement suite construction since 2020.' },
      { question: 'How much rent can I charge in Markham?', answer: 'Legal basement apartments rent for $1,800–$2,200/month in Markham. Unionville, Cornell, and areas near highway 7 corridor command premium rents.' },
      { question: 'Does Markham require owner occupancy?', answer: 'No. Ontario regulations removed owner-occupancy requirements for secondary suites. You can rent both the main unit and the basement unit.' },
      { question: 'Does DrySpace work in Markham?', answer: 'Yes. DrySpace provides complete basement conversion services throughout Markham including Unionville, Cornell, Berczy, Milliken, and all surrounding communities.' },
    ],
  },
  'richmond-hill': {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    region: 'York Region',
    costMultiplier: 0.98,
    rentalIncome: { min: 1800, max: 2200 },
    propertyValueLift: '12–20%',
    nearbyCities: ['markham', 'vaughan', 'toronto'],
    permitTimeline: '4–7 weeks',
    permitCost: '$2,000–$4,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space required',
    fireReq: '1-hour fire separation, interconnected smoke/CO alarms',
    electricalReq: '100A sub-panel minimum',
    plumbingReq: 'Backwater valve required per municipal bylaw',
    hvacReq: 'Separate heating zone, HRV required for energy compliance',
    zoningNotes: 'Permitted under York Region official plan. Oak Ridges, Elgin Mills corridors eligible.',
    faqs: [
      { question: 'How much does a basement apartment cost in Richmond Hill?', answer: 'Richmond Hill basement apartments cost $49,000–$245,000. Budget starts at $49,000, standard $78,400–$171,500, premium $147,000–$245,000.' },
      { question: 'What incentives are available in Richmond Hill?', answer: 'Stack Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), Richmond Hill Residential Subsidy ($1,000), and Enbridge ($5,000). Total: $53,500+.' },
      { question: 'How much rent can I charge in Richmond Hill?', answer: 'Legal basement apartments in Richmond Hill rent for $1,800–$2,200/month. Oak Ridges, Bayview corridor, and Yonge/16th Ave areas are premium.' },
      { question: 'Does Richmond Hill allow basement apartments?', answer: 'Yes. Secondary suites are permitted in most residential zones under the York Region official plan and local zoning updates.' },
      { question: 'What is the construction timeline in Richmond Hill?', answer: 'Typical construction takes 3–5 months: permits (4–7 weeks), structural work (4–6 weeks), rough-ins (2–3 weeks), finishing (3–5 weeks), inspections (1–2 weeks).' },
      { question: 'Does DrySpace serve Richmond Hill?', answer: 'Yes. DrySpace provides full-service basement apartment construction throughout Richmond Hill including Oak Ridges, Elgin Mills, and Bayview areas.' },
    ],
  },
  oakville: {
    slug: 'oakville',
    name: 'Oakville',
    region: 'Halton Region',
    costMultiplier: 1.05,
    rentalIncome: { min: 2000, max: 2400 },
    propertyValueLift: '15–22%',
    nearbyCities: ['burlington', 'mississauga', 'milton'],
    permitTimeline: '4–8 weeks',
    permitCost: '$2,500–$5,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom, window well required',
    parkingReq: '1 additional space required',
    fireReq: '1-hour fire separation, interconnected alarms, sprinkler consideration',
    electricalReq: '100A sub-panel, separate meter recommended',
    plumbingReq: 'Backwater valve mandatory (Halton program), sump pump',
    hvacReq: 'Separate HVAC, HRV mandatory for new units',
    zoningNotes: 'Second units permitted under Halton Region official plan. Premium Lakeshore and Bronte areas eligible.',
    faqs: [
      { question: 'How much does a basement apartment cost in Oakville?', answer: 'Oakville basement apartments cost $52,500–$262,500. Premium market means costs are about 5% above Toronto. Budget at $52,500, standard $84,000–$183,750, premium $157,500–$262,500.' },
      { question: 'What incentives are available in Oakville?', answer: 'Oakville homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), Halton Region flood subsidies, and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I get in Oakville?', answer: 'Legal basements in Oakville rent for $2,000–$2,400/month. Lakeshore, Bronte, and Old Oakville command the highest rents in the GTA suburbs.' },
      { question: 'Are basement suites legal in Oakville?', answer: 'Yes. Oakville permits secondary suites under the Halton Region official plan. Building permits and full OBC compliance required.' },
      { question: 'Does Oakville have special requirements?', answer: 'Oakville follows Halton Region standards which include mandatory HRV systems and enhanced window well requirements. Permits may take slightly longer due to design review.' },
      { question: 'Does DrySpace build in Oakville?', answer: 'Yes. DrySpace provides premium basement conversion services throughout Oakville including Bronte, Glen Abbey, River Oaks, and Lakeshore communities.' },
    ],
  },
  burlington: {
    slug: 'burlington',
    name: 'Burlington',
    region: 'Halton Region',
    costMultiplier: 0.93,
    rentalIncome: { min: 1700, max: 2100 },
    propertyValueLift: '12–18%',
    nearbyCities: ['oakville', 'hamilton', 'milton'],
    permitTimeline: '3–6 weeks',
    permitCost: '$1,800–$4,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space or transit proximity exemption',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel, GFCI required',
    plumbingReq: 'Backwater valve required, separate shutoff',
    hvacReq: 'Separate heating, mechanical ventilation required',
    zoningNotes: 'Permitted under Halton Region official plan. Downtown Burlington and Aldershot areas see highest demand.',
    faqs: [
      { question: 'How much does a basement apartment cost in Burlington?', answer: 'Burlington basement apartments cost $46,500–$232,500. Costs are about 7% below Toronto. Budget at $46,500, standard $74,400–$162,750, premium $139,500–$232,500.' },
      { question: 'What incentives are available in Burlington?', answer: 'Burlington homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I charge in Burlington?', answer: 'Legal basements in Burlington rent for $1,700–$2,100/month. Aldershot, downtown Burlington, and Lakeshore areas command premium rents.' },
      { question: 'Are basement apartments legal in Burlington?', answer: 'Yes. Second units are permitted under Halton Region and Burlington zoning bylaws in most residential zones.' },
      { question: 'How long does construction take?', answer: 'Typical Burlington basement conversion takes 3–5 months from permit application to final inspection.' },
      { question: 'Does DrySpace work in Burlington?', answer: 'Yes. DrySpace serves all Burlington neighborhoods including Aldershot, Tyandaga, Palmer, and downtown.' },
    ],
  },
  hamilton: {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'City of Hamilton',
    costMultiplier: 0.85,
    rentalIncome: { min: 1500, max: 1900 },
    propertyValueLift: '10–16%',
    nearbyCities: ['burlington', 'oakville', 'kitchener'],
    permitTimeline: '3–6 weeks',
    permitCost: '$1,500–$3,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space (relaxed in urban core)',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel minimum',
    plumbingReq: 'Backwater valve recommended, separate shutoff',
    hvacReq: 'Separate heating zone, ventilation per OBC',
    zoningNotes: 'Hamilton actively encourages secondary suites. Reduced fees and expedited permits for ADUs since 2023.',
    faqs: [
      { question: 'How much does a basement apartment cost in Hamilton?', answer: 'Hamilton basement apartments cost $42,500–$212,500. Labour costs are about 15% below Toronto. Budget at $42,500, standard $68,000–$148,750, premium $127,500–$212,500.' },
      { question: 'What incentives are available in Hamilton?', answer: 'Hamilton homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Hamilton also offers reduced permit fees for secondary suites. Total: $52,500+.' },
      { question: 'How much rent can I charge in Hamilton?', answer: 'Legal basements in Hamilton rent for $1,500–$1,900/month. Westdale, Dundas, Locke Street, and Stoney Creek areas have strong rental demand.' },
      { question: 'Is Hamilton a good market for basement apartments?', answer: 'Yes. Hamilton has strong rental demand driven by McMaster University, hospital workers, and Toronto commuters. Lower construction costs make ROI particularly attractive.' },
      { question: 'Does Hamilton have special ADU incentives?', answer: 'Yes. Hamilton has reduced permit fees and expedited processing for secondary suites since 2023. The city actively encourages gentle densification.' },
      { question: 'Does DrySpace serve Hamilton?', answer: 'Yes. DrySpace provides basement conversion services throughout Hamilton including the Mountain, Dundas, Ancaster, Stoney Creek, and Waterdown.' },
    ],
  },
  oshawa: {
    slug: 'oshawa',
    name: 'Oshawa',
    region: 'Durham Region',
    costMultiplier: 0.82,
    rentalIncome: { min: 1400, max: 1800 },
    propertyValueLift: '10–16%',
    nearbyCities: ['whitby', 'pickering', 'scarborough'],
    permitTimeline: '3–5 weeks',
    permitCost: '$1,500–$3,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel',
    plumbingReq: 'Backwater valve recommended, separate shutoff',
    hvacReq: 'Separate heating zone required',
    zoningNotes: 'Second units permitted under Durham Region official plan. Strong demand from university students and commuters.',
    faqs: [
      { question: 'How much does a basement apartment cost in Oshawa?', answer: 'Oshawa basement apartments cost $41,000–$205,000. Among the lowest costs in the GTA. Budget at $41,000, standard $65,600–$143,500, premium $123,000–$205,000.' },
      { question: 'What incentives are available in Oshawa?', answer: 'Oshawa homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I charge in Oshawa?', answer: 'Legal basements in Oshawa rent for $1,400–$1,800/month. Areas near Ontario Tech University and downtown Oshawa have strong demand.' },
      { question: 'Is Oshawa good for basement apartment investment?', answer: 'Excellent. Low construction costs combined with strong rental demand from Ontario Tech/Durham College students make Oshawa one of the best ROI markets in the GTA.' },
      { question: 'How long does construction take in Oshawa?', answer: 'Typical Oshawa basement conversion takes 2.5–4.5 months. Durham Region permits process faster than Toronto.' },
      { question: 'Does DrySpace serve Oshawa?', answer: 'Yes. DrySpace provides full basement conversion services throughout Oshawa and Durham Region.' },
    ],
  },
  pickering: {
    slug: 'pickering',
    name: 'Pickering',
    region: 'Durham Region',
    costMultiplier: 0.88,
    rentalIncome: { min: 1600, max: 2000 },
    propertyValueLift: '11–18%',
    nearbyCities: ['scarborough', 'oshawa', 'whitby'],
    permitTimeline: '3–6 weeks',
    permitCost: '$1,800–$4,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel, GFCI in wet areas',
    plumbingReq: 'Backwater valve required, separate shutoff',
    hvacReq: 'Separate heating zone, ventilation per OBC',
    zoningNotes: 'Second units permitted under Durham Region official plan. Pickering Town Centre area has strong demand.',
    faqs: [
      { question: 'How much does a basement apartment cost in Pickering?', answer: 'Pickering basement apartments cost $44,000–$220,000. Costs are about 12% below Toronto. Budget at $44,000, standard $70,400–$154,000, premium $132,000–$220,000.' },
      { question: 'What incentives are available in Pickering?', answer: 'Pickering homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I charge in Pickering?', answer: 'Legal basements in Pickering rent for $1,600–$2,000/month. The Pickering Town Centre area and waterfront communities command premium rents.' },
      { question: 'Are basement apartments legal in Pickering?', answer: 'Yes. Second units are permitted in most residential zones under Durham Region and Pickering zoning bylaws.' },
      { question: 'How long does the process take?', answer: 'Typical timeline is 3–5 months from permit application to move-in ready.' },
      { question: 'Does DrySpace work in Pickering?', answer: 'Yes. DrySpace provides complete basement conversion services throughout Pickering and eastern GTA.' },
    ],
  },
  whitby: {
    slug: 'whitby',
    name: 'Whitby',
    region: 'Durham Region',
    costMultiplier: 0.85,
    rentalIncome: { min: 1500, max: 1900 },
    propertyValueLift: '10–16%',
    nearbyCities: ['oshawa', 'pickering', 'scarborough'],
    permitTimeline: '3–5 weeks',
    permitCost: '$1,500–$3,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel',
    plumbingReq: 'Backwater valve recommended, separate shutoff',
    hvacReq: 'Separate heating zone required',
    zoningNotes: 'Second units permitted in residential zones. Downtown Whitby and Brooklin areas see highest demand.',
    faqs: [
      { question: 'How much does a basement apartment cost in Whitby?', answer: 'Whitby basement apartments cost $42,500–$212,500. Costs are about 15% below Toronto. Budget at $42,500, standard $68,000–$148,750, premium $127,500–$212,500.' },
      { question: 'What incentives are available in Whitby?', answer: 'Whitby homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I charge in Whitby?', answer: 'Legal basements in Whitby rent for $1,500–$1,900/month. Downtown Whitby and Brooklin have strong rental markets.' },
      { question: 'Is Whitby a good market?', answer: 'Yes. Growing population, proximity to the 401, and strong commuter demand make Whitby a solid investment for basement apartments.' },
      { question: 'How long does construction take?', answer: 'Typical timeline is 2.5–4.5 months from permits to completion.' },
      { question: 'Does DrySpace serve Whitby?', answer: 'Yes. DrySpace provides full-service basement apartment construction throughout Whitby and Durham Region.' },
    ],
  },
  milton: {
    slug: 'milton',
    name: 'Milton',
    region: 'Halton Region',
    costMultiplier: 0.90,
    rentalIncome: { min: 1700, max: 2100 },
    propertyValueLift: '12–18%',
    nearbyCities: ['brampton', 'oakville', 'burlington'],
    permitTimeline: '4–6 weeks',
    permitCost: '$2,000–$4,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel, GFCI in wet areas',
    plumbingReq: 'Backwater valve required per Halton bylaw',
    hvacReq: 'Separate heating zone, HRV recommended',
    zoningNotes: 'Second units permitted under Halton Region official plan. Rapid growth area with high demand.',
    faqs: [
      { question: 'How much does a basement apartment cost in Milton?', answer: 'Milton basement apartments cost $45,000–$225,000. Costs are about 10% below Toronto. Budget at $45,000, standard $72,000–$157,500, premium $135,000–$225,000.' },
      { question: 'What incentives are available in Milton?', answer: 'Milton homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), and Enbridge ($5,000). Total: $52,500+.' },
      { question: 'How much rent can I charge in Milton?', answer: 'Legal basements in Milton rent for $1,700–$2,100/month. Milton is one of Canada fastest-growing towns with high rental demand.' },
      { question: 'Is Milton good for basement apartment investment?', answer: 'Excellent. Milton has one of the youngest demographics in Ontario, creating strong demand for affordable rental units.' },
      { question: 'How long does the process take?', answer: 'Typical timeline is 3–5 months from permit application to completion.' },
      { question: 'Does DrySpace serve Milton?', answer: 'Yes. DrySpace provides complete basement apartment construction services throughout Milton and Halton Region.' },
    ],
  },
  kitchener: {
    slug: 'kitchener',
    name: 'Kitchener',
    region: 'Waterloo Region',
    costMultiplier: 0.83,
    rentalIncome: { min: 1400, max: 1800 },
    propertyValueLift: '10–16%',
    nearbyCities: ['hamilton', 'milton', 'burlington'],
    permitTimeline: '3–5 weeks',
    permitCost: '$1,500–$3,500',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space (relaxed near LRT)',
    fireReq: '1-hour fire separation, interconnected alarms',
    electricalReq: '100A sub-panel',
    plumbingReq: 'Backwater valve recommended, separate shutoff',
    hvacReq: 'Separate heating zone required',
    zoningNotes: 'Kitchener actively promotes secondary suites with reduced fees and expedited permits. LRT corridor sees highest demand.',
    faqs: [
      { question: 'How much does a basement apartment cost in Kitchener?', answer: 'Kitchener basement apartments cost $41,500–$207,500. Among the lowest costs in our service area. Budget at $41,500, standard $66,400–$145,250, premium $124,500–$207,500.' },
      { question: 'What incentives are available in Kitchener?', answer: 'Kitchener homeowners can access: Ontario Secondary Suite Program ($40,000), MHRTC ($7,500), Enbridge ($5,000), plus Kitchener offers reduced permit fees for ADUs. Total: $52,500+.' },
      { question: 'How much rent can I charge in Kitchener?', answer: 'Legal basements in Kitchener rent for $1,400–$1,800/month. Strong demand from University of Waterloo, WLU, and tech sector workers.' },
      { question: 'Is Kitchener good for investment?', answer: 'Excellent. Kitchener has the best cost-to-rent ratio for basement apartments in our service area. Low construction costs and strong university/tech demand create fast payback.' },
      { question: 'Does Kitchener have special ADU programs?', answer: 'Yes. Kitchener offers reduced permit fees and expedited processing for secondary suites. Parking requirements are relaxed near the ION LRT corridor.' },
      { question: 'Does DrySpace serve Kitchener?', answer: 'Yes. DrySpace provides basement conversion services in Kitchener-Waterloo, including downtown, University district, and all surrounding areas.' },
    ],
  },
  scarborough: {
    slug: 'scarborough',
    name: 'Scarborough',
    region: 'City of Toronto',
    costMultiplier: 0.96,
    rentalIncome: { min: 1800, max: 2200 },
    propertyValueLift: '13–20%',
    nearbyCities: ['toronto', 'pickering', 'markham'],
    permitTimeline: '4–8 weeks',
    permitCost: '$2,500–$5,000',
    ceilingHeightReq: "Min 6'5\" (1.95m) finished ceiling",
    egressReq: 'Min 3.8 sq ft opening per bedroom',
    parkingReq: '1 additional space (City of Toronto rules)',
    fireReq: '1-hour fire separation, interconnected smoke/CO alarms, fire-rated doors',
    electricalReq: '100A sub-panel, separate meter recommended',
    plumbingReq: 'Backwater valve mandatory, sump pump if below sewer',
    hvacReq: 'Separate heating zone, HRV recommended',
    zoningNotes: 'Same as City of Toronto: as-of-right in most residential zones since 2024. Scarborough has many older bungalows ideal for conversion.',
    faqs: [
      { question: 'How much does a basement apartment cost in Scarborough?', answer: 'Scarborough basement apartments cost $48,000–$240,000. Costs are about 4% below downtown Toronto. Budget at $48,000, standard $76,800–$168,000, premium $144,000–$240,000.' },
      { question: 'What incentives are available in Scarborough?', answer: 'Same as Toronto: Ontario Secondary Suite ($40,000), MHRTC ($7,500), Toronto Flooding Subsidy ($3,400), Enbridge ($5,000), Toronto HELP financing ($125,000). Total: $60,000+.' },
      { question: 'How much rent can I charge in Scarborough?', answer: 'Legal basements in Scarborough rent for $1,800–$2,200/month. Areas near Scarborough Town Centre, UTSC, and waterfront command premium rents.' },
      { question: 'Why is Scarborough good for basement apartments?', answer: 'Scarborough has many older detached bungalows and raised ranches with deep lots — ideal for basement conversion. Strong rental demand from Centennial College, UTSC, and immigrant families.' },
      { question: 'Does Scarborough follow Toronto building rules?', answer: 'Yes. Scarborough is part of the City of Toronto and follows the same building code, permit, and zoning requirements.' },
      { question: 'Does DrySpace work in Scarborough?', answer: 'Yes. DrySpace serves all of Scarborough including Agincourt, Malvern, Rouge, Bendale, and Highland Creek.' },
    ],
  },
};

export const cityList = Object.values(cities);
export const citySlugs = Object.keys(cities) as CitySlug[];

// ── Build Packages ──
export const buildPackages: BuildPackage[] = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Basic legal compliance. No lowering, basic finishes, existing ceiling height.',
    costRange: { min: 50000, max: 80000 },
    includes: [
      'Building permits & drawings',
      'Egress windows (2)',
      'Fire separation (1-hour)',
      'Basic plumbing rough-in',
      'Electrical sub-panel',
      'Basic kitchen & bath',
      'Smoke/CO alarms',
      'Basic finishes (paint, LVP)',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Complete legal apartment. Full conversion with quality finishes.',
    costRange: { min: 80000, max: 175000 },
    includes: [
      'Everything in Budget, plus:',
      'Underpinning (if needed)',
      'Egress windows (3–4)',
      'Separate entrance',
      'Full kitchen with appliances',
      'Full bathroom with tiled shower',
      'Laundry hookups',
      'Quality finishes (quartz, tile)',
      'Separate HVAC zone',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'High-end luxury suite. Premium finishes, smart home, maximum value.',
    costRange: { min: 150000, max: 250000 },
    includes: [
      'Everything in Standard, plus:',
      'Deep underpinning (9ft ceilings)',
      'Walkout or separate side entrance',
      'Premium kitchen (waterfall island)',
      'Luxury bathroom (rain shower)',
      'In-floor radiant heating',
      'Sound insulation (STC 55+)',
      'Smart home integration',
      'Premium appliances',
    ],
  },
];

// ── Add-Ons ──
export const addOns: AddOn[] = [
  {
    id: 'backwater-valve',
    name: 'Backwater Valve',
    description: 'Prevents sewage backup into your basement. Required by most municipalities.',
    costRange: { min: 2000, max: 4000 },
    labourPercent: 60,
    rebateIds: ['toronto-bfp', 'mississauga-bfp', 'brampton-bfp', 'markham-bfp', 'richmond-hill-bfp'],
    icon: 'shield',
  },
  {
    id: 'sump-pump',
    name: 'Sump Pump + Battery Backup',
    description: 'Primary sump pump with battery backup for power outages.',
    costRange: { min: 800, max: 2000 },
    labourPercent: 55,
    rebateIds: ['toronto-bfp', 'mississauga-bfp', 'brampton-bfp', 'markham-bfp'],
    icon: 'zap',
  },
  {
    id: 'energy-windows',
    name: 'Energy-Efficient Egress Windows (x4)',
    description: 'Triple-pane, argon-filled egress windows with insulated wells.',
    costRange: { min: 3200, max: 6000 },
    labourPercent: 40,
    rebateIds: ['enbridge', 'greener-homes'],
    icon: 'sun',
  },
  {
    id: 'insulation',
    name: 'Basement Wall Insulation (Spray Foam)',
    description: 'Closed-cell spray foam insulation for maximum energy efficiency.',
    costRange: { min: 1800, max: 3600 },
    labourPercent: 45,
    rebateIds: ['enbridge', 'greener-homes'],
    icon: 'thermometer',
  },
  {
    id: 'underpinning',
    name: 'Underpinning (if ceiling < 6\'5")',
    description: 'Lower basement floor to achieve legal ceiling height. Major structural work.',
    costRange: { min: 75000, max: 150000 },
    labourPercent: 62,
    rebateIds: [],
    icon: 'hard-hat',
  },
  {
    id: 'exterior-waterproofing',
    name: 'Exterior Waterproofing',
    description: 'Full exterior excavation, membrane, weeping tile, and drainage.',
    costRange: { min: 18000, max: 40000 },
    labourPercent: 65,
    rebateIds: ['toronto-bfp'],
    icon: 'droplets',
  },
  {
    id: 'hrv',
    name: 'HRV Ventilation System',
    description: 'Heat recovery ventilator for fresh air without energy loss.',
    costRange: { min: 3000, max: 6000 },
    labourPercent: 50,
    rebateIds: ['enbridge', 'greener-homes'],
    icon: 'wind',
  },
];

// ── Incentives ──
export const incentives: Incentive[] = [
  {
    id: 'mhrtc',
    name: 'Multigenerational Home Renovation Tax Credit (MHRTC)',
    level: 'federal',
    amount: 7500,
    amountType: 'fixed',
    description: '15% refundable tax credit on up to $50,000 of renovation costs for creating a secondary suite for a senior or disabled family member.',
    eligibility: [
      'Canadian taxpayer',
      'Creating a self-contained secondary unit',
      'For a senior (65+) or disabled family member',
      'Unit must have separate entrance, kitchen, bathroom',
    ],
    applyUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/line-45355-multigenerational-home-renovation.html',
    applicableCities: 'all',
    projectTypes: ['adu', 'secondary-suite'],
  },
  {
    id: 'ontario-secondary-suite',
    name: 'Ontario Secondary Suite Program',
    level: 'provincial',
    amount: 40000,
    amountType: 'fixed',
    description: 'Up to $40,000 forgivable loan for creating a legal secondary suite. Forgiven after 10 years of maintaining the unit as affordable rental.',
    eligibility: [
      'Ontario homeowner',
      'Creating a new secondary suite or legalizing existing',
      'Unit must be rented at or below average market rent',
      'Must maintain as rental for 10 years',
    ],
    applyUrl: 'https://www.ontario.ca/page/ontario-secondary-suite-program',
    applicableCities: 'all',
    projectTypes: ['adu', 'secondary-suite'],
  },
  {
    id: 'toronto-bfp',
    name: 'Toronto Basement Flooding Protection Subsidy',
    level: 'municipal',
    amount: 3400,
    amountType: 'fixed',
    description: 'Up to $3,400 for basement flood protection including backwater valves, sump pumps, and waterproofing.',
    eligibility: [
      'Property within City of Toronto',
      'Residential property owner',
      'Licensed contractor performs work',
      'Apply before work begins',
    ],
    applyUrl: 'https://www.toronto.ca/services-payments/water-environment/managing-rain-melted-snow/basement-flooding/basement-flooding-protection-subsidy-program/',
    applicableCities: ['toronto', 'scarborough'],
    projectTypes: ['flood-protection', 'backwater-valve', 'sump-pump'],
  },
  {
    id: 'mississauga-bfp',
    name: 'Mississauga Basement Flooding Protection Subsidy',
    level: 'municipal',
    amount: 2500,
    amountType: 'fixed',
    description: 'Up to $2,500 for sump pump, backwater valve, and lot grading.',
    eligibility: [
      'Property within Mississauga',
      'Residential property owner',
      'Licensed contractor',
    ],
    applyUrl: 'https://www.mississauga.ca/',
    applicableCities: ['mississauga'],
    projectTypes: ['flood-protection', 'backwater-valve', 'sump-pump'],
  },
  {
    id: 'brampton-bfp',
    name: 'Brampton Residential Flood Protection Program',
    level: 'municipal',
    amount: 2000,
    amountType: 'fixed',
    description: 'Up to $2,000 for sump pump, backwater valve, and foundation drainage.',
    eligibility: [
      'Property within Brampton',
      'Residential property owner',
      'Licensed contractor',
    ],
    applyUrl: 'https://www.brampton.ca/',
    applicableCities: ['brampton'],
    projectTypes: ['flood-protection', 'backwater-valve', 'sump-pump'],
  },
  {
    id: 'markham-bfp',
    name: 'Markham Basement Flooding Reduction Program',
    level: 'municipal',
    amount: 1800,
    amountType: 'fixed',
    description: 'Up to $1,800 for sump pump and backwater valve installation.',
    eligibility: [
      'Property within Markham',
      'Residential property owner',
      'Licensed contractor',
    ],
    applyUrl: 'https://www.markham.ca/',
    applicableCities: ['markham'],
    projectTypes: ['flood-protection', 'backwater-valve', 'sump-pump'],
  },
  {
    id: 'richmond-hill-bfp',
    name: 'Richmond Hill Residential Subsidy Program',
    level: 'municipal',
    amount: 1000,
    amountType: 'fixed',
    description: 'Up to $1,000 for backwater valve installation.',
    eligibility: [
      'Property within Richmond Hill',
      'Residential property owner',
      'Backwater valve work only',
    ],
    applyUrl: 'https://www.richmondhill.ca/',
    applicableCities: ['richmond-hill'],
    projectTypes: ['backwater-valve'],
  },
  {
    id: 'enbridge',
    name: 'Enbridge Home Efficiency Rebate',
    level: 'utility',
    amount: 5000,
    amountType: 'fixed',
    description: 'Up to $5,000 for insulation, windows, and HRV systems through Enbridge Gas.',
    eligibility: [
      'Enbridge Gas customer',
      'Home energy audit completed',
      'Qualifying upgrades (insulation, windows, HRV)',
    ],
    applyUrl: 'https://www.enbridgegas.com/residential/rebates-energy-conservation',
    applicableCities: 'all',
    projectTypes: ['energy', 'insulation', 'windows', 'hrv'],
  },
  {
    id: 'greener-homes',
    name: 'Canada Greener Homes Grant',
    level: 'federal',
    amount: 5000,
    amountType: 'fixed',
    description: 'Up to $5,000 for energy-efficient home improvements including insulation, windows, and ventilation.',
    eligibility: [
      'Canadian homeowner',
      'Home built before 2022',
      'EnerGuide assessment completed',
      'Qualifying energy upgrades',
    ],
    applyUrl: 'https://www.nrcan.gc.ca/energy-efficiency/homes/canada-greener-homes-initiative/24831',
    applicableCities: 'all',
    projectTypes: ['energy', 'insulation', 'windows', 'hrv'],
  },
  {
    id: 'toronto-help',
    name: 'Toronto HELP (Home Energy Loan Program)',
    level: 'municipal',
    amount: 125000,
    amountType: 'financing',
    description: 'Up to $125,000 in low-interest financing (as low as 3%) for home improvements including secondary suites. Repaid through property tax.',
    eligibility: [
      'Property within City of Toronto',
      'Residential property owner',
      'Good standing on property taxes',
      'Qualifying home improvements',
    ],
    applyUrl: 'https://www.toronto.ca/services-payments/water-environment/net-zero-homes-buildings/home-energy-loan-program-help/',
    applicableCities: ['toronto', 'scarborough'],
    projectTypes: ['adu', 'energy', 'secondary-suite'],
  },
];

// ── OBC Universal Requirements ──
export const obcRequirements = [
  { category: 'Ceiling Height', requirement: "Minimum 6'5\" (1.95m) clear finished ceiling height in habitable rooms" },
  { category: 'Egress Windows', requirement: 'Minimum 3.8 sq ft (0.35 m\u00B2) unobstructed opening in each bedroom and living area' },
  { category: 'Fire Separation', requirement: '1-hour fire-resistance rating between units (floor/ceiling assembly)' },
  { category: 'Smoke Alarms', requirement: 'Interconnected smoke alarms on each level, CO alarms near sleeping areas' },
  { category: 'Separate Entrance', requirement: 'Separate entrance required (can be interior or exterior)' },
  { category: 'Kitchen', requirement: 'Sink, cooking appliance, refrigerator, and food preparation space required' },
  { category: 'Bathroom', requirement: 'Toilet, sink, and shower/tub required. GFCI protection within 1.5m of water' },
  { category: 'Ventilation', requirement: 'Mechanical ventilation per OBC 9.32 — HRV recommended for efficiency' },
  { category: 'Electrical', requirement: 'Minimum 100A sub-panel, separate circuits for kitchen, bath, and laundry' },
  { category: 'Plumbing', requirement: 'Separate shutoff valve, backwater valve where required by municipality' },
  { category: 'Sound', requirement: 'STC 50 minimum between units (STC 55+ recommended for comfort)' },
  { category: 'Accessibility', requirement: 'Barrier-free path of travel to unit entrance recommended (not always mandatory)' },
];

// ── Helper Functions ──

export function getCityAdjustedPrice(baseMin: number, baseMax: number, city: CitySlug): { min: number; max: number } {
  const mult = cityMultipliers[city] ?? 1.0;
  return {
    min: Math.round(baseMin * mult / 500) * 500,
    max: Math.round(baseMax * mult / 500) * 500,
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(amount);
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)}–${formatPrice(max)}`;
}

export function getPackageCost(pkg: BuildPackage, city: CitySlug): { min: number; max: number } {
  return getCityAdjustedPrice(pkg.costRange.min, pkg.costRange.max, city);
}

export function getAddOnCost(addOn: AddOn, city: CitySlug): { min: number; max: number } {
  return getCityAdjustedPrice(addOn.costRange.min, addOn.costRange.max, city);
}

export function calculateBuildCost(
  pkg: BuildPackage,
  selectedAddOns: AddOn[],
  city: CitySlug
): { min: number; max: number; breakdown: { name: string; min: number; max: number }[] } {
  const pkgCost = getPackageCost(pkg, city);
  const breakdown: { name: string; min: number; max: number }[] = [
    { name: `${pkg.name} Package`, ...pkgCost },
  ];

  let totalMin = pkgCost.min;
  let totalMax = pkgCost.max;

  for (const addOn of selectedAddOns) {
    const cost = getAddOnCost(addOn, city);
    breakdown.push({ name: addOn.name, ...cost });
    totalMin += cost.min;
    totalMax += cost.max;
  }

  return { min: totalMin, max: totalMax, breakdown };
}

export function getApplicableIncentives(city: CitySlug, addOnIds: string[]): Incentive[] {
  return incentives.filter((inc) => {
    // Check city eligibility
    if (inc.applicableCities !== 'all' && !inc.applicableCities.includes(city)) return false;

    // Universal programs (adu/secondary-suite) always apply
    if (inc.projectTypes.includes('adu') || inc.projectTypes.includes('secondary-suite')) return true;

    // Energy programs apply if energy-related add-ons selected
    const energyAddOns = ['energy-windows', 'insulation', 'hrv'];
    if (inc.projectTypes.includes('energy') && addOnIds.some((id) => energyAddOns.includes(id))) return true;

    // Flood protection programs apply if flood-related add-ons selected
    const floodAddOns = ['backwater-valve', 'sump-pump', 'exterior-waterproofing'];
    if (inc.projectTypes.some((t) => ['flood-protection', 'backwater-valve', 'sump-pump'].includes(t)) && addOnIds.some((id) => floodAddOns.includes(id))) return true;

    return false;
  });
}

export function calculateIncentiveTotal(applicableIncentives: Incentive[]): { cashIncentives: number; financingAvailable: number } {
  let cashIncentives = 0;
  let financingAvailable = 0;

  for (const inc of applicableIncentives) {
    if (inc.amountType === 'financing') {
      financingAvailable += inc.amount;
    } else {
      cashIncentives += inc.amount;
    }
  }

  return { cashIncentives, financingAvailable };
}

export function calculateNetCost(totalMin: number, totalMax: number, cashIncentives: number): { min: number; max: number } {
  return {
    min: Math.max(0, totalMin - cashIncentives),
    max: Math.max(0, totalMax - cashIncentives),
  };
}

export function calculateROI(netCostMin: number, netCostMax: number, rentalIncome: { min: number; max: number }): {
  paybackYearsMin: number;
  paybackYearsMax: number;
  annualRoiMin: number;
  annualRoiMax: number;
  monthlyCashFlowMin: number;
  monthlyCashFlowMax: number;
} {
  const annualIncomeMin = rentalIncome.min * 12;
  const annualIncomeMax = rentalIncome.max * 12;
  const avgNetCost = (netCostMin + netCostMax) / 2;

  return {
    paybackYearsMin: avgNetCost > 0 ? Math.round((netCostMin / annualIncomeMax) * 10) / 10 : 0,
    paybackYearsMax: avgNetCost > 0 ? Math.round((netCostMax / annualIncomeMin) * 10) / 10 : 0,
    annualRoiMin: avgNetCost > 0 ? Math.round((annualIncomeMin / netCostMax) * 1000) / 10 : 0,
    annualRoiMax: avgNetCost > 0 ? Math.round((annualIncomeMax / netCostMin) * 1000) / 10 : 0,
    monthlyCashFlowMin: rentalIncome.min,
    monthlyCashFlowMax: rentalIncome.max,
  };
}

export function getMaxIncentives(city: CitySlug): number {
  const allAddOnIds = addOns.map((a) => a.id);
  const applicable = getApplicableIncentives(city, allAddOnIds);
  const { cashIncentives } = calculateIncentiveTotal(applicable);
  return cashIncentives;
}
