import React from 'react';

interface PermitInfo {
  type: string;
  description: string;
  cost: string;
  timeline: string;
  requirements: string[];
}

const permits: PermitInfo[] = [
  {
    type: 'Building Permit - Exterior Waterproofing',
    description: 'Required for excavation and foundation work',
    cost: '$500 - $2,000',
    timeline: '10-15 business days',
    requirements: [
      'Site plan and drawings',
      'Engineering report (if structural)',
      'Contractor insurance documents',
      'Property survey'
    ]
  },
  {
    type: 'Plumbing Permit - Interior Systems',
    description: 'For sump pump and drainage installations',
    cost: '$200 - $500',
    timeline: '5-7 business days',
    requirements: [
      'Plumbing diagram',
      'Licensed plumber credentials',
      'Backflow prevention details',
      'Discharge location plan'
    ]
  },
  {
    type: 'Street Occupation Permit',
    description: 'For equipment or bins on city property',
    cost: '$150 - $400/week',
    timeline: '3-5 business days',
    requirements: [
      'Traffic management plan',
      'Insurance certificate',
      'Site safety plan',
      'Neighbor notification'
    ]
  },
  {
    type: 'Excavation Permit',
    description: 'Deep excavation near property lines',
    cost: '$300 - $800',
    timeline: '7-10 business days',
    requirements: [
      'Shoring plan if needed',
      'Utility locates',
      'Neighbor agreements',
      'Soil management plan'
    ]
  }
];

const cityPrograms = [
  {
    city: 'Toronto',
    program: 'Basement Flooding Protection Subsidy',
    rebate: 'Up to $3,400',
    covers: ['Backwater valve', 'Sump pump', 'Severance of storm connection'],
    link: 'https://www.toronto.ca/basement-flooding'
  },
  {
    city: 'Mississauga',
    program: 'Flood Mitigation Subsidy',
    rebate: 'Up to $3,000',
    covers: ['Backwater valve', 'Sump pump', 'Foundation drain disconnect'],
    link: 'https://www.mississauga.ca/flooding'
  },
  {
    city: 'Brampton',
    program: 'Basement Flooding Subsidy',
    rebate: 'Up to $3,000',
    covers: ['Backwater valve', 'Sump pump', 'Weeping tile'],
    link: 'https://www.brampton.ca/flooding'
  }
];

const WaterproofingPermits: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Permits & Rebates Made Simple
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We handle all permit requirements and help you maximize government rebates. 
            Full compliance with Ontario Building Code 2024 and municipal regulations.
          </p>
        </div>

        {/* Permits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {permits.map((permit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">{permit.type}</h3>
                <span className="text-sm font-medium text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                  {permit.timeline}
                </span>
              </div>
              
              <p className="text-slate-600 mb-4">{permit.description}</p>
              
              <div className="mb-4">
                <span className="text-sm font-semibold text-slate-700">Typical Cost: </span>
                <span className="text-lg font-bold text-cyan-600">{permit.cost}</span>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Requirements:</p>
                <ul className="space-y-1">
                  {permit.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* What We Handle */}
        <div className="bg-cyan-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">We Handle Everything For You</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Application Preparation</h4>
              <p className="text-sm text-slate-600">Complete permit applications with all required documentation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Rebate Applications</h4>
              <p className="text-sm text-slate-600">Maximize your savings with all available government programs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Inspection Coordination</h4>
              <p className="text-sm text-slate-600">Schedule and manage all required inspections</p>
            </div>
          </div>
        </div>

        {/* Government Rebates */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Government Rebate Programs</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {cityPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold">{program.city}</h4>
                  <span className="text-2xl font-bold text-cyan-600">{program.rebate}</span>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">{program.program}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Covers:</p>
                  <ul className="space-y-1">
                    {program.covers.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-cyan-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-600 hover:underline font-medium"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Info */}
        <div className="bg-slate-100 rounded-xl p-8">
          <h3 className="text-xl font-bold text-center mb-6">Full Regulatory Compliance</h3>
          
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">📋</div>
              <h4 className="font-semibold text-sm mb-1">OBC 2024</h4>
              <p className="text-xs text-slate-600">Ontario Building Code compliant</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold text-sm mb-1">WSIB & Insurance</h4>
              <p className="text-xs text-slate-600">Full coverage & clearance</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">⏰</div>
              <h4 className="font-semibold text-sm mb-1">Work Hours</h4>
              <p className="text-xs text-slate-600">Mon-Fri 7am-6pm, Sat 9am-5pm</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl mb-2">🔊</div>
              <h4 className="font-semibold text-sm mb-1">Noise Bylaw</h4>
              <p className="text-xs text-slate-600">Chapter 591 compliant</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-lg mb-2">Typical Permit Timeline</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <p>• <strong>Day 1-3:</strong> We prepare and submit all permit applications</p>
                <p>• <strong>Day 5-15:</strong> City reviews and approves permits</p>
                <p>• <strong>Day 16:</strong> Work begins once permits are issued</p>
                <p>• <strong>Project End:</strong> Final inspection and permit closure</p>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Note: Emergency repairs may proceed immediately with retroactive permits
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Let Us Handle Your Permits & Rebates</h3>
          <p className="text-slate-600 mb-6">
            Save time and maximize your rebates with our complete permit service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Get Started Today
            </a>
            <a
              href="tel:437-545-0067"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-cyan-600 font-medium rounded-lg border border-blue-200 hover:bg-cyan-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 437-545-0067
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterproofingPermits;