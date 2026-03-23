import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calculator, Home, Ruler, DollarSign, Info, AlertTriangle, MapPin } from 'lucide-react';

interface EstimateData {
  serviceType: string;
  measurementType: 'sqft' | 'linft';
  area: number;
  problemSeverity: 'minor' | 'moderate' | 'severe' | 'emergency';
  foundationType: string;
  homeAge: string;
  urgency: 'planned' | 'urgent' | 'emergency';
  rebatesApplicable: boolean;
}

const serviceTypes = [
  { 
    id: 'interior', 
    label: 'Interior Waterproofing', 
    basePrice: 85, 
    measurement: 'sqft',
    description: 'Internal drainage, sump pump, vapor barriers'
  },
  { 
    id: 'exterior', 
    label: 'Exterior Waterproofing', 
    basePrice: 350, 
    measurement: 'linft',
    description: 'Full excavation, membrane, weeping tile'
  },
  { 
    id: 'crack-repair', 
    label: 'Crack Injection', 
    basePrice: 800, 
    measurement: 'linft',
    description: 'Polyurethane or epoxy crack sealing'
  },
  { 
    id: 'sump-pump', 
    label: 'Sump Pump System', 
    basePrice: 2500, 
    measurement: 'sqft',
    description: 'Primary + backup pump installation'
  },
  { 
    id: 'french-drain', 
    label: 'French Drain System', 
    basePrice: 120, 
    measurement: 'linft',
    description: 'Interior or exterior drainage system'
  },
  { 
    id: 'underpinning', 
    label: 'Underpinning', 
    basePrice: 450, 
    measurement: 'linft',
    description: 'Foundation lowering and reinforcement'
  }
];

const severityMultipliers = {
  minor: 1,
  moderate: 1.3,
  severe: 1.8,
  emergency: 2.5
};

const urgencyMultipliers = {
  planned: 1,
  urgent: 1.15,
  emergency: 1.4
};

const homeAgeMultipliers = {
  'new': 0.9,        // 0-10 years
  'modern': 1,       // 11-25 years  
  'mature': 1.2,     // 26-50 years
  'heritage': 1.5    // 50+ years
};

const rebateAmounts = {
  'sump-pump': 1250,
  'exterior': 5000,
  'interior': 2000,
  'underpinning': 3500,
  'french-drain': 1500,
  'crack-repair': 0
};

const FoundationCostEstimator: React.FC = () => {
  const [formData, setFormData] = useState<EstimateData>({
    serviceType: 'interior',
    measurementType: 'sqft',
    area: 800,
    problemSeverity: 'moderate',
    foundationType: 'poured-concrete',
    homeAge: 'modern',
    urgency: 'planned',
    rebatesApplicable: true
  });

  const calculateEstimate = () => {
    const service = serviceTypes.find(s => s.id === formData.serviceType);
    if (!service) return { low: 0, high: 0, rebate: 0 };

    let basePrice = service.basePrice;
    
    // For fixed-price services like sump pumps
    if (service.id === 'sump-pump') {
      basePrice = service.basePrice;
    } else {
      basePrice = service.basePrice * formData.area;
    }

    const severityMultiplier = severityMultipliers[formData.problemSeverity];
    const urgencyMultiplier = urgencyMultipliers[formData.urgency];
    const ageMultiplier = homeAgeMultipliers[formData.homeAge];

    const totalMultiplier = severityMultiplier * urgencyMultiplier * ageMultiplier;
    const adjustedPrice = basePrice * totalMultiplier;

    const rebate = formData.rebatesApplicable ? (rebateAmounts[formData.serviceType] || 0) : 0;

    return {
      low: Math.round(adjustedPrice * 0.85),
      high: Math.round(adjustedPrice * 1.15),
      rebate: rebate,
      basePrice: Math.round(adjustedPrice)
    };
  };

  const estimate = calculateEstimate();
  const selectedService = serviceTypes.find(s => s.id === formData.serviceType);

  const updateServiceType = (serviceId: string) => {
    const service = serviceTypes.find(s => s.id === serviceId);
    if (service) {
      setFormData({ 
        ...formData, 
        serviceType: serviceId,
        measurementType: service.measurement as 'sqft' | 'linft',
        area: service.measurement === 'sqft' ? 800 : 100
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Foundation Waterproofing Cost Estimator
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get an instant estimate for your waterproofing project. Includes Toronto rebate information.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calculator className="w-7 h-7" />
                Waterproofing Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Service Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Waterproofing Service Type
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {serviceTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => updateServiceType(type.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-colors ${
                            formData.serviceType === type.id
                              ? 'border-cyan-600 bg-cyan-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-medium text-slate-900">{type.label}</div>
                          <div className="text-sm text-slate-600 mt-1">{type.description}</div>
                          <div className="text-xs text-cyan-600 mt-2">
                            Starting at ${type.basePrice}/{type.measurement}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area Measurement */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Ruler className="inline w-4 h-4 mr-1" />
                      {formData.measurementType === 'sqft' ? 'Area (Square Feet)' : 'Length (Linear Feet)'}
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="1"
                      max="5000"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {formData.measurementType === 'sqft' 
                        ? 'Typical basement: 800-1200 sq ft' 
                        : 'Typical perimeter: 80-120 linear feet'
                      }
                    </p>
                  </div>

                  {/* Problem Severity */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <AlertTriangle className="inline w-4 h-4 mr-1" />
                      Problem Severity
                    </label>
                    <div className="space-y-2">
                      {Object.entries(severityMultipliers).map(([level, multiplier]) => (
                        <button
                          key={level}
                          onClick={() => setFormData({ ...formData, problemSeverity: level as any })}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                            formData.problemSeverity === level
                              ? 'border-cyan-600 bg-cyan-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium capitalize">{level}</span>
                            <span className="text-sm text-slate-500">
                              {level === 'minor' && 'Light dampness, prevention'}
                              {level === 'moderate' && 'Some water entry, staining'}
                              {level === 'severe' && 'Active leaks, mold concerns'}
                              {level === 'emergency' && 'Flooding, structural damage'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Home Age */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Home className="inline w-4 h-4 mr-1" />
                      Home Age
                    </label>
                    <select
                      value={formData.homeAge}
                      onChange={(e) => setFormData({ ...formData, homeAge: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">0-10 years (New Construction)</option>
                      <option value="modern">11-25 years (Modern)</option>
                      <option value="mature">26-50 years (Mature)</option>
                      <option value="heritage">50+ years (Heritage)</option>
                    </select>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Project Timeline
                    </label>
                    <div className="space-y-2">
                      {Object.entries(urgencyMultipliers).map(([level, multiplier]) => (
                        <button
                          key={level}
                          onClick={() => setFormData({ ...formData, urgency: level as any })}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                            formData.urgency === level
                              ? 'border-cyan-600 bg-cyan-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium capitalize">{level}</span>
                            <span className="text-sm text-slate-500">
                              {level === 'planned' && '2-4 weeks scheduling'}
                              {level === 'urgent' && 'Within 1 week'}
                              {level === 'emergency' && '24-48 hours'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Government Rebates */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rebatesApplicable}
                        onChange={(e) => setFormData({ ...formData, rebatesApplicable: e.target.checked })}
                        className="w-4 h-4 text-cyan-600 rounded"
                      />
                      <span className="text-sm">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Apply available government rebates
                      </span>
                    </label>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Estimated Project Cost
                    </h3>
                    <div className="text-center py-6">
                      <p className="text-sm text-slate-600 mb-2">Your estimated range:</p>
                      <div className="text-3xl font-bold text-cyan-600 mb-2">
                        ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
                      </div>
                      {estimate.rebate > 0 && (
                        <div className="bg-cyan-50 border border-green-300 rounded-lg p-3 mt-4">
                          <p className="text-sm text-cyan-700 font-medium">
                            Potential Government Rebate: ${estimate.rebate.toLocaleString()}
                          </p>
                          <p className="text-xs text-cyan-700 mt-1">
                            Net cost after rebate: ${(estimate.low - estimate.rebate).toLocaleString()} - ${(estimate.high - estimate.rebate).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-600 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="font-medium">{selectedService?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="font-medium">
                          {formData.area} {formData.measurementType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Severity:</span>
                        <span className="font-medium capitalize">{formData.problemSeverity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline:</span>
                        <span className="font-medium capitalize">{formData.urgency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Alert */}
                  {formData.urgency === 'emergency' && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                      <div className="flex">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div className="ml-3">
                          <p className="text-sm text-red-800 font-medium">
                            Emergency Service Available 24/7
                          </p>
                          <p className="text-sm text-red-700 mt-1">
                            Call (437) 545-0067 for immediate response
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Important Notes */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-semibold mb-2">Estimate includes:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Materials and installation</li>
                          <li>• 25-year transferable warranty</li>
                          <li>• Permit applications (where required)</li>
                          <li>• Site cleanup and restoration</li>
                          <li>• Free pre-work inspection</li>
                        </ul>
                        <p className="mt-2 text-xs">
                          Final costs vary based on site conditions, soil type, and access. Schedule your free consultation for an accurate quote.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      asChild
                    >
                      <a href="/contact">
                        <DollarSign className="mr-2 w-4 h-4" />
                        Get Detailed Quote
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                      asChild
                    >
                      <a href="/free-inspection">Schedule Free Inspection</a>
                    </Button>

                    {formData.urgency === 'emergency' && (
                      <Button 
                        size="lg" 
                        className="w-full bg-red-600 hover:bg-red-700 animate-pulse"
                        asChild
                      >
                        <a href="tel:437-545-0067">Call Emergency Line: (437) 545-0067</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FoundationCostEstimator;