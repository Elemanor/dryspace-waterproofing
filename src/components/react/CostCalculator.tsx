import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Home, Wrench, AlertCircle, DollarSign } from 'lucide-react';

interface Service {
  name: string;
  minPrice: number;
  maxPrice: number;
  subsidyEligible: boolean;
  subsidyAmount: number;
}

const services: Record<string, Service> = {
  exterior: {
    name: 'Exterior Waterproofing',
    minPrice: 5000,
    maxPrice: 15000,
    subsidyEligible: false,
    subsidyAmount: 0
  },
  interior: {
    name: 'Interior Waterproofing',
    minPrice: 3000,
    maxPrice: 8000,
    subsidyEligible: false,
    subsidyAmount: 0
  },
  'sump-pump': {
    name: 'Sump Pump Installation',
    minPrice: 2000,
    maxPrice: 4000,
    subsidyEligible: true,
    subsidyAmount: 1750
  },
  'french-drain': {
    name: 'French Drain System',
    minPrice: 4000,
    maxPrice: 10000,
    subsidyEligible: false,
    subsidyAmount: 0
  },
  'backwater-valve': {
    name: 'Backwater Valve',
    minPrice: 2500,
    maxPrice: 3500,
    subsidyEligible: true,
    subsidyAmount: 1250
  },
  'foundation-repair': {
    name: 'Foundation Crack Repair',
    minPrice: 1500,
    maxPrice: 5000,
    subsidyEligible: false,
    subsidyAmount: 0
  },
  underpinning: {
    name: 'Basement Underpinning',
    minPrice: 15000,
    maxPrice: 50000,
    subsidyEligible: false,
    subsidyAmount: 0
  },
  'drain-tile': {
    name: 'Drain Tile Replacement',
    minPrice: 3500,
    maxPrice: 8000,
    subsidyEligible: true,
    subsidyAmount: 400
  }
};

const accessMultipliers = {
  good: { min: 1.0, max: 1.0, label: 'Standard Pricing', icon: '✓' },
  limited: { min: 1.2, max: 1.3, label: 'Limited Access (+20-30%)', icon: '⚠' },
  difficult: { min: 1.4, max: 1.5, label: 'Difficult Access (+40-50%)', icon: '⚡' }
};

export default function CostCalculator() {
  const [selectedService, setSelectedService] = useState('exterior');
  const [squareFootage, setSquareFootage] = useState([1000]);
  const [siteAccess, setSiteAccess] = useState('good');
  const [showDetails, setShowDetails] = useState(false);

  const calculatePrice = () => {
    const service = services[selectedService];
    const footage = squareFootage[0];
    const footageRatio = footage / 1000;
    
    const baseMin = service.minPrice * Math.sqrt(footageRatio);
    const baseMax = service.maxPrice * Math.sqrt(footageRatio);
    
    const accessMult = accessMultipliers[siteAccess as keyof typeof accessMultipliers];
    const finalMin = Math.round(baseMin * accessMult.min / 100) * 100;
    const finalMax = Math.round(baseMax * accessMult.max / 100) * 100;
    
    const subsidy = service.subsidyEligible ? service.subsidyAmount : 0;
    const afterSubsidyMin = Math.max(0, finalMin - subsidy);
    const afterSubsidyMax = Math.max(0, finalMax - subsidy);
    
    return { finalMin, finalMax, subsidy, afterSubsidyMin, afterSubsidyMax };
  };

  const { finalMin, finalMax, subsidy, afterSubsidyMin, afterSubsidyMax } = calculatePrice();

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Advanced Project Cost Calculator
        </CardTitle>
        <CardDescription className="text-cyan-100">
          Get an instant estimate with site conditions and government rebates included
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Service Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Select Service
          </label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(services).map(([key, service]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center justify-between w-full">
                    <span>{service.name}</span>
                    {service.subsidyEligible && (
                      <Badge variant="secondary" className="ml-2">Rebate Available</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Square Footage Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Home className="w-4 h-4" />
            Square Footage: {squareFootage[0]} sq ft
          </label>
          <Slider
            value={squareFootage}
            onValueChange={setSquareFootage}
            min={500}
            max={3000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>500 sq ft</span>
            <span>1500 sq ft</span>
            <span>3000 sq ft</span>
          </div>
        </div>

        {/* Site Access Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Site Access Conditions
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(accessMultipliers).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSiteAccess(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  siteAccess === key
                    ? 'border-cyan-600 bg-cyan-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{value.icon}</div>
                <div className="text-xs font-medium capitalize">{key}</div>
                <div className="text-xs text-slate-500">{value.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Estimated Cost Range</p>
              <p className="text-3xl font-bold text-slate-900">
                ${finalMin.toLocaleString()} - ${finalMax.toLocaleString()}
              </p>
            </div>
            
            {subsidy > 0 && (
              <>
                <div className="border-t pt-4">
                  <Badge className="bg-cyan-50 text-cyan-700 mb-2">
                    City of Toronto Rebate Available!
                  </Badge>
                  <p className="text-sm text-slate-600">Rebate Amount: <span className="font-bold text-cyan-600">-${subsidy.toLocaleString()}</span></p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600 mb-1">After Rebate</p>
                  <p className="text-2xl font-bold text-cyan-700">
                    ${afterSubsidyMin.toLocaleString()} - ${afterSubsidyMax.toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Button */}
        <Button 
          onClick={() => setShowDetails(!showDetails)}
          variant="outline"
          className="w-full"
        >
          {showDetails ? 'Hide' : 'Show'} Detailed Breakdown
        </Button>

        {/* Detailed Breakdown */}
        {showDetails && (
          <Alert className="bg-cyan-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-cyan-600" />
            <AlertDescription className="text-sm space-y-2">
              <p className="font-semibold text-cyan-800">Price Breakdown:</p>
              <ul className="space-y-1 text-slate-700">
                <li>• Base Service: ${services[selectedService].minPrice.toLocaleString()} - ${services[selectedService].maxPrice.toLocaleString()}</li>
                <li>• Square Footage Adjustment: {squareFootage[0]} sq ft</li>
                <li>• Site Access: {accessMultipliers[siteAccess as keyof typeof accessMultipliers].label}</li>
                {subsidy > 0 && <li className="text-cyan-700">• Government Rebate: -${subsidy.toLocaleString()}</li>}
              </ul>
              <p className="text-xs text-slate-600 mt-2">
                *Actual costs may vary based on specific site conditions. Price includes materials, labor, and 25-year warranty.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700" asChild>
            <a href="/contact">
              <DollarSign className="w-4 h-4 mr-2" />
              Get Exact Quote
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="/free-inspection">Book Free Inspection</a>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-slate-500 text-center space-y-1">
          <p>✓ 0% Financing Available</p>
          <p>✓ 25-Year Transferable Warranty</p>
          <p>✓ Licensed & Insured (WSIB Cleared)</p>
        </div>
      </CardContent>
    </Card>
  );
}