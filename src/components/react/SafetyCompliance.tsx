import React from 'react';

interface SafetyFeature {
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const safetyFeatures: SafetyFeature[] = [
  {
    title: 'WSIB Coverage',
    description: 'Full workers compensation and liability insurance',
    icon: '🛡️',
    details: [
      'Active WSIB clearance certificate',
      '$5 million liability insurance',
      'Bonded and insured workers',
      'Complete coverage documentation'
    ]
  },
  {
    title: 'Safety Equipment',
    description: 'Professional PPE and safety protocols on every site',
    icon: '⚠️',
    details: [
      'Hard hats and safety boots',
      'Fall protection harnesses',
      'Respirators for confined spaces',
      'Gas detection equipment'
    ]
  },
  {
    title: 'Property Protection',
    description: 'Complete protection of your home during work',
    icon: '🏠',
    details: [
      'Floor coverings and protection',
      'Dust containment barriers',
      'Landscaping preservation',
      'Clean work areas daily'
    ]
  },
  {
    title: 'Environmental Safety',
    description: 'Responsible handling of water and materials',
    icon: '🌱',
    details: [
      'Proper water drainage',
      'Safe material disposal',
      'No harmful chemicals',
      'Eco-friendly solutions'
    ]
  }
];

const complianceItems = [
  {
    category: 'Building Codes',
    icon: '📋',
    items: [
      'Ontario Building Code 2024 compliant',
      'Toronto Building permit requirements',
      'ESA electrical safety compliance',
      'Plumbing code adherence'
    ]
  },
  {
    category: 'Permits & Approvals',
    icon: '✅',
    items: [
      'Building permits handled',
      'Excavation permits when required',
      'Street occupation permits',
      'Utility locate requests'
    ]
  },
  {
    category: 'Work Standards',
    icon: '⏰',
    items: [
      'Work hours: Mon-Fri 7am-6pm, Sat 9am-5pm',
      'No Sunday or holiday work',
      'Noise bylaw compliance',
      'Neighbor notification provided'
    ]
  }
];

const SafetyCompliance: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-50 rounded-full mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Safety & Compliance First
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            WSIB cleared, fully insured, and compliant with all Toronto building codes. 
            Your safety and property protection are our top priorities.
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-1">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-500 flex items-start gap-1">
                    <span className="text-cyan-500 mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Section */}
        <div className="bg-cyan-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Full Regulatory Compliance</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {complianceItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="text-lg font-semibold">{item.category}</h4>
                </div>
                <ul className="space-y-2">
                  {item.items.map((compliance, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {compliance}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Site Promise */}
        <div className="mt-12 bg-slate-50 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Clean Site Promise</h3>
              <p className="text-slate-600 mb-6">
                We don't just waterproof—we ensure your property is perfectly clean and 
                protected throughout the entire process.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Daily cleanup of work areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Protection of landscaping and property</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Complete debris removal and disposal</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Restoration of disturbed areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Final inspection walkthrough with homeowner</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-lg mb-4">Safety Certifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="font-medium">WSIB Clearance</span>
                  <span className="text-cyan-600 font-semibold">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="font-medium">Liability Insurance</span>
                  <span className="text-cyan-600 font-semibold">$5M</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="font-medium">BBB Rating</span>
                  <span className="text-cyan-600 font-semibold">A+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="font-medium">Safety Training</span>
                  <span className="text-cyan-600 font-semibold">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Safety */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-2">24/7 Emergency Safety Response</h4>
              <p className="text-slate-700 mb-3">
                For emergency flooding or structural concerns, our safety-trained crews respond within 2 hours 
                to secure your property and prevent further damage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:437-545-0067" 
                  className="inline-flex items-center justify-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Emergency: 437-545-0067
                </a>
                <span className="text-sm text-slate-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Average response time: Under 2 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyCompliance;