import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';

interface CalculationResult {
  cubicYards: number;
  cubicMeters: number;
  bags40lb: number;
  bags60lb: number;
  bags80lb: number;
  estimatedCost: {
    min: number;
    max: number;
  };
}

export default function ConcreteCalculator() {
  const [projectType, setProjectType] = useState('slab');
  const [dimensions, setDimensions] = useState({
    length: 20,
    width: 20,
    thickness: 4,
    diameter: 10
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateConcrete = () => {
    let cubicFeet = 0;
    
    if (projectType === 'slab' || projectType === 'driveway' || projectType === 'patio') {
      // Rectangle calculation
      const thicknessInFeet = dimensions.thickness / 12;
      cubicFeet = dimensions.length * dimensions.width * thicknessInFeet;
    } else if (projectType === 'sidewalk') {
      // Sidewalk (typically 4 feet wide)
      const width = 4;
      const thicknessInFeet = 4 / 12; // 4 inches standard
      cubicFeet = dimensions.length * width * thicknessInFeet;
    } else if (projectType === 'circular') {
      // Circular patio
      const radius = dimensions.diameter / 2;
      const area = Math.PI * radius * radius;
      const thicknessInFeet = dimensions.thickness / 12;
      cubicFeet = area * thicknessInFeet;
    }

    const cubicYards = cubicFeet / 27;
    const cubicMeters = cubicFeet * 0.0283168;
    
    // Add 10% waste factor
    const withWaste = cubicYards * 1.1;
    
    // Calculate bags needed (based on cubic feet)
    const bags40lb = Math.ceil((cubicFeet * 1.1) / 0.30); // 40lb bag = 0.30 cu ft
    const bags60lb = Math.ceil((cubicFeet * 1.1) / 0.45); // 60lb bag = 0.45 cu ft
    const bags80lb = Math.ceil((cubicFeet * 1.1) / 0.60); // 80lb bag = 0.60 cu ft
    
    // Estimate cost based on project type
    let minPrice, maxPrice;
    switch(projectType) {
      case 'slab':
        minPrice = 8;
        maxPrice = 12;
        break;
      case 'driveway':
        minPrice = 12;
        maxPrice = 18;
        break;
      case 'patio':
        minPrice = 10;
        maxPrice = 15;
        break;
      case 'sidewalk':
        minPrice = 8;
        maxPrice = 12;
        break;
      case 'stamped':
        minPrice = 15;
        maxPrice = 25;
        break;
      default:
        minPrice = 10;
        maxPrice = 15;
    }
    
    const area = projectType === 'circular' 
      ? Math.PI * (dimensions.diameter / 2) * (dimensions.diameter / 2)
      : projectType === 'sidewalk'
      ? dimensions.length * 4
      : dimensions.length * dimensions.width;
    
    setResult({
      cubicYards: withWaste,
      cubicMeters: cubicMeters * 1.1,
      bags40lb,
      bags60lb,
      bags80lb,
      estimatedCost: {
        min: area * minPrice,
        max: area * maxPrice
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Concrete Volume & Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Project Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Project Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { value: 'slab', label: 'Concrete Slab' },
                { value: 'driveway', label: 'Driveway' },
                { value: 'patio', label: 'Patio' },
                { value: 'sidewalk', label: 'Sidewalk' },
                { value: 'circular', label: 'Circular Patio' },
                { value: 'stamped', label: 'Stamped Concrete' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setProjectType(type.value)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    projectType === type.value
                      ? 'border-cyan-600 bg-cyan-50 text-cyan-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions Input */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {projectType === 'circular' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Diameter (ft)</label>
                  <input
                    type="number"
                    value={dimensions.diameter}
                    onChange={(e) => setDimensions({...dimensions, diameter: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Thickness (inches)</label>
                  <input
                    type="number"
                    value={dimensions.thickness}
                    onChange={(e) => setDimensions({...dimensions, thickness: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="2"
                    max="12"
                  />
                </div>
              </>
            ) : projectType === 'sidewalk' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Length (ft)</label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({...dimensions, length: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <input
                    type="text"
                    value="4 ft (standard)"
                    className="w-full px-4 py-2 border rounded-lg bg-slate-50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Thickness</label>
                  <input
                    type="text"
                    value="4 inches"
                    className="w-full px-4 py-2 border rounded-lg bg-slate-50"
                    disabled
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Length (ft)</label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({...dimensions, length: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width (ft)</label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({...dimensions, width: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Thickness (inches)</label>
                  <select
                    value={dimensions.thickness}
                    onChange={(e) => setDimensions({...dimensions, thickness: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="4">4 inches (standard slab)</option>
                    <option value="6">6 inches (driveway)</option>
                    <option value="8">8 inches (heavy duty)</option>
                    <option value="10">10 inches (commercial)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <Button 
            onClick={calculateConcrete}
            className="w-full mb-6"
            size="lg"
          >
            Calculate Concrete Needed
          </Button>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Volume Results */}
              <div className="bg-cyan-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Concrete Volume Required
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Cubic Yards (with 10% waste)</p>
                    <p className="text-2xl font-bold text-cyan-600">{result.cubicYards.toFixed(2)} yards³</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Cubic Meters</p>
                    <p className="text-2xl font-bold text-cyan-600">{result.cubicMeters.toFixed(2)} m³</p>
                  </div>
                </div>
              </div>

              {/* Bag Calculations */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">If Using Bagged Concrete</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-600">40 lb bags</p>
                    <p className="text-xl font-bold">{result.bags40lb} bags</p>
                    <p className="text-xs text-slate-500">~${(result.bags40lb * 5.50).toFixed(0)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">60 lb bags</p>
                    <p className="text-xl font-bold">{result.bags60lb} bags</p>
                    <p className="text-xs text-slate-500">~${(result.bags60lb * 7.50).toFixed(0)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">80 lb bags</p>
                    <p className="text-xl font-bold">{result.bags80lb} bags</p>
                    <p className="text-xs text-slate-500">~${(result.bags80lb * 9.50).toFixed(0)}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  * For projects over 1 cubic yard, ready-mix delivery is more economical
                </p>
              </div>

              {/* Cost Estimate */}
              <div className="bg-cyan-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Professional Installation Estimate
                </h3>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Total Project Cost Range</p>
                  <p className="text-3xl font-bold text-cyan-600">
                    ${result.estimatedCost.min.toLocaleString()} - ${result.estimatedCost.max.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Includes materials, labor, equipment, and finishing
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-amber-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm">
                  <strong>Note:</strong> Actual costs may vary based on site conditions, accessibility, 
                  reinforcement requirements, and finish type. Contact us for a detailed quote.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}