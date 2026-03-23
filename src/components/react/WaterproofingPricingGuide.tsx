import React from 'react';

interface PricingItem {
  service: string;
  typicalScope: string;
  range: string;
  drivesUp: string[];
  drivesDown: string[];
}

const pricingData: PricingItem[] = [
  {
    service: 'Exterior Waterproofing',
    typicalScope: '100-150 linear feet',
    range: '$15,000 - $30,000',
    drivesUp: ['Deep excavation (>8ft)', 'Poor soil conditions', 'Landscaping restoration', 'Multiple foundation types'],
    drivesDown: ['Good access', 'Single wall treatment', 'Minimal landscaping', 'Summer scheduling']
  },
  {
    service: 'Interior Waterproofing',
    typicalScope: 'Full basement perimeter',
    range: '$3,000 - $8,000',
    drivesUp: ['Finished basement', 'Multiple sump pumps', 'Battery backup systems', 'Extensive crack repair'],
    drivesDown: ['Unfinished basement', 'Single sump pump', 'Good drainage', 'Partial perimeter']
  },
  {
    service: 'French Drain System',
    typicalScope: '100-200 linear feet',
    range: '$8,000 - $15,000',
    drivesUp: ['Rock excavation', 'Deep installation', 'Multiple discharge points', 'Permit complications'],
    drivesDown: ['Sandy soil', 'Gravity drainage', 'Simple discharge', 'Good access']
  },
  {
    service: 'Sump Pump Installation',
    typicalScope: 'Single or dual pump system',
    range: '$2,500 - $4,500',
    drivesUp: ['Dual pump system', 'Battery backup', 'WiFi monitoring', 'Concrete breaking'],
    drivesDown: ['Single pump', 'Existing pit', 'Standard discharge', 'Easy access']
  },
  {
    service: 'Foundation Crack Injection',
    typicalScope: 'Per crack repair',
    range: '$400 - $800 per crack',
    drivesUp: ['Wide cracks (>1/4")', 'Multiple injections', 'Structural repair', 'Interior/exterior combo'],
    drivesDown: ['Hairline cracks', 'Single injection', 'Easy access', 'Preventive treatment']
  },
  {
    service: 'Basement Underpinning',
    typicalScope: 'Lower basement 2-3 feet',
    range: '$350 - $450 per sq ft',
    drivesUp: ['Poor soil conditions', 'Bench footing required', 'Utilities relocation', 'Engineering complexity'],
    drivesDown: ['Good soil', 'Partial underpinning', 'Open access', 'Standard depth']
  },
  {
    service: 'Emergency Water Removal',
    typicalScope: '24/7 response service',
    range: '$1,500 - $5,000',
    drivesUp: ['Sewage backup', 'Extensive damage', 'Mold remediation', 'Contents restoration'],
    drivesDown: ['Clean water', 'Quick response', 'Limited area', 'No contents damage']
  },
  {
    service: 'Backwater Valve',
    typicalScope: 'City rebate eligible',
    range: '$3,000 - $4,500',
    drivesUp: ['Deep sewer line', 'Multiple fixtures', 'Difficult access', 'Permit delays'],
    drivesDown: ['Shallow installation', 'Single line', 'Good access', 'Rebate eligible']
  }
];

const WaterproofingPricingGuide: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Waterproofing Pricing Guide
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Transparent pricing for Toronto waterproofing services. Every property is unique—these ranges 
            help you understand typical investments for protecting your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {pricingData.map((item) => (
            <div key={item.service} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.service}</h3>
                <p className="text-sm text-slate-600 mb-4">Typical: {item.typicalScope}</p>
                
                <div className="bg-cyan-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Typical Range (GTA)</p>
                  <p className="text-2xl font-bold text-cyan-600">{item.range}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p className="text-sm font-semibold text-slate-700">Increases cost:</p>
                    </div>
                    <ul className="space-y-1">
                      {item.drivesUp.map((factor) => (
                        <li key={factor} className="text-xs text-slate-600 flex items-start gap-1">
                          <span className="text-red-500 mt-1">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      <p className="text-sm font-semibold text-slate-700">Reduces cost:</p>
                    </div>
                    <ul className="space-y-1">
                      {item.drivesDown.map((factor) => (
                        <li key={factor} className="text-xs text-slate-600 flex items-start gap-1">
                          <span className="text-cyan-500 mt-1">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-4xl mx-auto mb-12">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Important Pricing Notes</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Free inspection and detailed quote provided before any work begins</li>
                <li>• 25-year transferable warranty on exterior waterproofing included</li>
                <li>• Government rebates available - we handle all paperwork</li>
                <li>• 0% financing available for 12-24 months</li>
                <li>• Emergency services available 24/7 with 2-hour response</li>
                <li>• All prices include permits, labor, materials, and cleanup</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-cyan-50 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-cyan-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-semibold text-slate-900 mb-2">Government Rebates</h4>
            <p className="text-sm text-slate-600">Up to $3,400 available through municipal programs</p>
          </div>

          <div className="bg-cyan-50 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-cyan-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h4 className="font-semibold text-slate-900 mb-2">25-Year Warranty</h4>
            <p className="text-sm text-slate-600">Transferable warranty on all exterior work</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-purple-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h4 className="font-semibold text-slate-900 mb-2">Flexible Financing</h4>
            <p className="text-sm text-slate-600">0% interest for 12-24 months available</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-slate-600 mb-6">
            Want an accurate quote for your specific waterproofing needs?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/cost-calculator"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Try Our Cost Calculator
            </a>
            <a
              href="tel:437-545-0067"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-cyan-600 font-medium rounded-lg border border-blue-200 hover:bg-cyan-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Get Free Quote: 437-545-0067
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterproofingPricingGuide;