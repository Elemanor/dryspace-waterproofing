import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Droplets,
  AlertTriangle,
  Shield,
  TrendingDown,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from 'lucide-react';

interface FloodZoneData {
  risk: 'low' | 'moderate' | 'high';
  score: number;
  zone: string;
  drainage: 'combined' | 'separated';
  waterTable: 'low' | 'medium' | 'high';
  historicalFloods: number;
  avgClaimValue: number;
}

const floodRiskData: Record<string, FloodZoneData> = {
  // Toronto core - high density, combined sewers, high risk
  'M5A': { risk: 'high', score: 82, zone: 'Old Toronto', drainage: 'combined', waterTable: 'high', historicalFloods: 12, avgClaimValue: 43000 },
  'M4K': { risk: 'high', score: 78, zone: 'East York', drainage: 'combined', waterTable: 'high', historicalFloods: 9, avgClaimValue: 38000 },
  'M6J': { risk: 'high', score: 75, zone: 'West Queen West', drainage: 'combined', waterTable: 'high', historicalFloods: 8, avgClaimValue: 41000 },
  'M4E': { risk: 'high', score: 80, zone: 'The Beaches', drainage: 'combined', waterTable: 'high', historicalFloods: 11, avgClaimValue: 45000 },
  'M6H': { risk: 'moderate', score: 62, zone: 'Dovercourt', drainage: 'combined', waterTable: 'medium', historicalFloods: 6, avgClaimValue: 32000 },

  // Scarborough - clay soil, moderate-high
  'M1E': { risk: 'high', score: 73, zone: 'West Hill', drainage: 'separated', waterTable: 'high', historicalFloods: 7, avgClaimValue: 35000 },
  'M1G': { risk: 'moderate', score: 58, zone: 'Woburn', drainage: 'separated', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 28000 },
  'M1H': { risk: 'moderate', score: 55, zone: 'Cedarbrae', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 26000 },
  'M1K': { risk: 'high', score: 71, zone: 'Birch Cliff', drainage: 'combined', waterTable: 'high', historicalFloods: 8, avgClaimValue: 37000 },

  // Etobicoke
  'M8V': { risk: 'high', score: 76, zone: 'Humber Bay', drainage: 'combined', waterTable: 'high', historicalFloods: 9, avgClaimValue: 40000 },
  'M8W': { risk: 'moderate', score: 60, zone: 'Long Branch', drainage: 'separated', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 30000 },
  'M9A': { risk: 'moderate', score: 52, zone: 'Islington', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 27000 },
  'M9B': { risk: 'low', score: 35, zone: 'West Deane Park', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 18000 },

  // North York
  'M2J': { risk: 'moderate', score: 58, zone: 'Henry Farm', drainage: 'separated', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 29000 },
  'M2K': { risk: 'moderate', score: 55, zone: 'Bayview Village', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 27000 },
  'M3H': { risk: 'low', score: 40, zone: 'Bathurst Manor', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 22000 },
  'M3J': { risk: 'low', score: 38, zone: 'York University Heights', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 20000 },

  // Mississauga
  'L5A': { risk: 'moderate', score: 55, zone: 'Cooksville', drainage: 'separated', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 28000 },
  'L5B': { risk: 'moderate', score: 52, zone: 'City Centre', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 26000 },
  'L5E': { risk: 'high', score: 70, zone: 'Port Credit', drainage: 'combined', waterTable: 'high', historicalFloods: 7, avgClaimValue: 36000 },
  'L5G': { risk: 'moderate', score: 48, zone: 'Malton', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 23000 },
  'L5H': { risk: 'moderate', score: 58, zone: 'Lakeview', drainage: 'separated', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 30000 },

  // Brampton
  'L6P': { risk: 'moderate', score: 50, zone: 'Sandalwood', drainage: 'separated', waterTable: 'medium', historicalFloods: 3, avgClaimValue: 24000 },
  'L6R': { risk: 'moderate', score: 48, zone: 'Bramalea', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 22000 },
  'L6S': { risk: 'low', score: 38, zone: 'Heart Lake', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 18000 },
  'L6T': { risk: 'moderate', score: 52, zone: 'Central Brampton', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 25000 },
  'L6V': { risk: 'low', score: 42, zone: 'Brampton North', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 20000 },
  'L6W': { risk: 'low', score: 35, zone: 'Castlemore', drainage: 'separated', waterTable: 'low', historicalFloods: 1, avgClaimValue: 16000 },
  'L6X': { risk: 'moderate', score: 50, zone: 'Downtown Brampton', drainage: 'combined', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 24000 },
  'L6Y': { risk: 'low', score: 40, zone: 'Fletcher\'s Meadow', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 19000 },
  'L6Z': { risk: 'moderate', score: 48, zone: 'Springdale', drainage: 'separated', waterTable: 'medium', historicalFloods: 3, avgClaimValue: 23000 },

  // Vaughan
  'L4J': { risk: 'low', score: 40, zone: 'Thornhill', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 22000 },
  'L4K': { risk: 'low', score: 35, zone: 'Concord', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 18000 },
  'L4L': { risk: 'low', score: 38, zone: 'Maple', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 20000 },
  'L6A': { risk: 'low', score: 32, zone: 'Kleinburg', drainage: 'separated', waterTable: 'low', historicalFloods: 1, avgClaimValue: 16000 },

  // Markham
  'L3P': { risk: 'moderate', score: 55, zone: 'Old Markham', drainage: 'combined', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 28000 },
  'L3R': { risk: 'moderate', score: 50, zone: 'Unionville', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 25000 },
  'L3S': { risk: 'low', score: 40, zone: 'Milliken', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 20000 },
  'L3T': { risk: 'low', score: 42, zone: 'Thornhill East', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 21000 },
  'L6B': { risk: 'low', score: 38, zone: 'Cornell', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 19000 },
  'L6C': { risk: 'low', score: 36, zone: 'Cathedraltown', drainage: 'separated', waterTable: 'low', historicalFloods: 1, avgClaimValue: 17000 },
  'L6E': { risk: 'moderate', score: 48, zone: 'Markham South', drainage: 'separated', waterTable: 'medium', historicalFloods: 3, avgClaimValue: 23000 },

  // Oakville
  'L6H': { risk: 'moderate', score: 55, zone: 'Old Oakville', drainage: 'combined', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 30000 },
  'L6J': { risk: 'moderate', score: 52, zone: 'Bronte', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 28000 },
  'L6K': { risk: 'low', score: 42, zone: 'Glen Abbey', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 22000 },
  'L6L': { risk: 'low', score: 38, zone: 'River Oaks', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 20000 },
  'L6M': { risk: 'low', score: 35, zone: 'North Oakville', drainage: 'separated', waterTable: 'low', historicalFloods: 1, avgClaimValue: 17000 },

  // Burlington
  'L7L': { risk: 'moderate', score: 55, zone: 'Downtown Burlington', drainage: 'combined', waterTable: 'medium', historicalFloods: 5, avgClaimValue: 29000 },
  'L7M': { risk: 'low', score: 42, zone: 'North Burlington', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 21000 },
  'L7N': { risk: 'moderate', score: 50, zone: 'Central Burlington', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 26000 },
  'L7P': { risk: 'low', score: 38, zone: 'Alton', drainage: 'separated', waterTable: 'low', historicalFloods: 2, avgClaimValue: 19000 },
  'L7R': { risk: 'high', score: 68, zone: 'Lakeside Burlington', drainage: 'combined', waterTable: 'high', historicalFloods: 7, avgClaimValue: 35000 },
  'L7S': { risk: 'moderate', score: 52, zone: 'Burlington East', drainage: 'separated', waterTable: 'medium', historicalFloods: 4, avgClaimValue: 25000 },
  'L7T': { risk: 'moderate', score: 48, zone: 'Burlington Plains', drainage: 'separated', waterTable: 'low', historicalFloods: 3, avgClaimValue: 23000 },
};

export default function FloodRiskChecker() {
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [results, setResults] = useState<FloodZoneData | null>(null);
  const [error, setError] = useState('');
  const [isDataNotFound, setIsDataNotFound] = useState(false);

  const formatPostalCode = (value: string) => {
    // Remove spaces and convert to uppercase
    const cleaned = value.replace(/\s/g, '').toUpperCase();

    // Add space after 3rd character
    if (cleaned.length > 3) {
      return cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
    }
    return cleaned;
  };

  const validatePostalCode = (code: string): boolean => {
    // Ontario postal codes start with K, L, M, N, or P
    const ontarioPattern = /^[KLMNP]\d[A-Z]\s?\d[A-Z]\d$/i;
    return ontarioPattern.test(code);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPostalCode(e.target.value);
    if (formatted.length <= 7) {
      setPostalCode(formatted);
      setError('');
    }
  };

  const simulateLoading = async () => {
    const messages = [
      'Analyzing flood zone data...',
      'Checking drainage infrastructure...',
      'Calculating risk score...',
    ];

    for (let i = 0; i < messages.length; i++) {
      setLoadingMessage(messages[i]);

      // Animate progress for each stage
      const startProgress = (i / messages.length) * 100;
      const endProgress = ((i + 1) / messages.length) * 100;
      const steps = 20;
      const increment = (endProgress - startProgress) / steps;

      for (let j = 0; j < steps; j++) {
        await new Promise(resolve => setTimeout(resolve, 40));
        setLoadingProgress(startProgress + (increment * (j + 1)));
      }
    }
  };

  const handleCheckRisk = async () => {
    if (!validatePostalCode(postalCode)) {
      setError('Please enter a valid Ontario postal code (e.g., M5V 2T6)');
      return;
    }

    setIsLoading(true);
    setLoadingProgress(0);
    setError('');

    await simulateLoading();

    // Look up FSA (first 3 characters)
    const fsa = postalCode.replace(/\s/g, '').slice(0, 3).toUpperCase();
    const data = floodRiskData[fsa];

    if (data) {
      setResults(data);
      setIsDataNotFound(false);
    } else {
      // General GTA estimate
      setResults({
        risk: 'moderate',
        score: 50,
        zone: 'Greater Toronto Area',
        drainage: 'separated',
        waterTable: 'medium',
        historicalFloods: 4,
        avgClaimValue: 25000,
      });
      setIsDataNotFound(true);
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setPostalCode('');
    setResults(null);
    setError('');
    setIsDataNotFound(false);
    setLoadingProgress(0);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'moderate':
        return 'text-amber-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-cyan-400';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-500/20 border-green-500/50';
      case 'moderate':
        return 'bg-amber-500/20 border-amber-500/50';
      case 'high':
        return 'bg-red-500/20 border-red-500/50';
      default:
        return 'bg-cyan-500/20 border-cyan-500/50';
    }
  };

  const getRecommendations = (risk: string) => {
    switch (risk) {
      case 'high':
        return [
          'Backwater valve installation ($800-$1,200)',
          'Sump pump with battery backup ($1,500-$2,500)',
          'Exterior waterproofing membrane',
          'Foundation crack repair and sealing',
          'Annual professional inspection',
        ];
      case 'moderate':
        return [
          'Sump pump inspection and maintenance',
          'Backwater valve installation',
          'Interior drainage assessment',
          'Window well covers',
          'Gutter and downspout optimization',
        ];
      case 'low':
        return [
          'Annual sump pump testing',
          'Regular gutter maintenance',
          'Property grading inspection',
          'Foundation crack monitoring',
          'Emergency flood kit preparation',
        ];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-900 border-slate-800 text-white p-8 md:p-12">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <Droplets className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">{loadingMessage}</h3>
            <Progress value={loadingProgress} className="h-2 bg-slate-800" />
          </div>
        </div>
      </Card>
    );
  }

  if (results) {
    return (
      <div className="space-y-6">
        {/* Risk Score Gauge */}
        <Card className="bg-slate-900 border-slate-800 text-white p-8 md:p-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <p className="text-slate-400">{results.zone}</p>
            </div>

            {isDataNotFound && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm text-amber-400">
                  Exact data not available for this postal code. Showing general GTA estimate.
                </p>
              </div>
            )}

            <div className="relative inline-flex items-center justify-center w-48 h-48 md:w-56 md:h-56 mx-auto">
              {/* Circular progress background */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - results.score / 100)}
                  className={cn(
                    'transition-all duration-1000',
                    results.risk === 'low' && 'text-green-500',
                    results.risk === 'moderate' && 'text-amber-500',
                    results.risk === 'high' && 'text-red-500'
                  )}
                  strokeLinecap="round"
                />
              </svg>

              {/* Score display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={cn('text-5xl md:text-6xl font-bold', getRiskColor(results.risk))}>
                  {results.score}
                </div>
                <div className="text-slate-400 text-sm mt-1">out of 100</div>
              </div>
            </div>

            <div>
              <Badge
                className={cn(
                  'text-lg px-4 py-2 uppercase tracking-wider',
                  results.risk === 'low' && 'bg-green-500/20 text-green-400 border-green-500/50',
                  results.risk === 'moderate' && 'bg-amber-500/20 text-amber-400 border-amber-500/50',
                  results.risk === 'high' && 'bg-red-500/20 text-red-400 border-red-500/50'
                )}
              >
                {results.risk} Risk
              </Badge>
            </div>
          </div>
        </Card>

        {/* Risk Factors Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900 border-slate-800 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Drainage Type</h4>
                <Badge
                  className={cn(
                    'mb-2',
                    results.drainage === 'combined'
                      ? 'bg-red-500/20 text-red-400 border-red-500/50'
                      : 'bg-green-500/20 text-green-400 border-green-500/50'
                  )}
                >
                  {results.drainage === 'combined' ? 'Combined Sewer' : 'Separated System'}
                </Badge>
                <p className="text-sm text-slate-400">
                  {results.drainage === 'combined'
                    ? 'Storm and sanitary water share pipes. Higher backup risk during heavy rain.'
                    : 'Separated systems reduce flooding risk by keeping storm water separate.'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <TrendingDown className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Water Table</h4>
                <Badge
                  className={cn(
                    'mb-2',
                    results.waterTable === 'high' && 'bg-red-500/20 text-red-400 border-red-500/50',
                    results.waterTable === 'medium' && 'bg-amber-500/20 text-amber-400 border-amber-500/50',
                    results.waterTable === 'low' && 'bg-green-500/20 text-green-400 border-green-500/50'
                  )}
                >
                  {results.waterTable.toUpperCase()}
                </Badge>
                <p className="text-sm text-slate-400">
                  {results.waterTable === 'high' && 'High water table increases hydrostatic pressure on foundations.'}
                  {results.waterTable === 'medium' && 'Moderate water table levels in your area.'}
                  {results.waterTable === 'low' && 'Lower water table reduces foundation water pressure.'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Historical Floods</h4>
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {results.historicalFloods}
                </div>
                <p className="text-sm text-slate-400">
                  Flooding events in your area since 2010
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-white p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Avg Insurance Claim</h4>
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  ${results.avgClaimValue.toLocaleString()}
                </div>
                <p className="text-sm text-slate-400">
                  Average water damage claim in your area
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="bg-slate-900 border-slate-800 text-white p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p className="text-slate-400">
                {results.risk === 'high' && 'Your area has significant flood risk. We strongly recommend:'}
                {results.risk === 'moderate' && 'Your area has moderate flood risk. Recommended:'}
                {results.risk === 'low' && 'Your area has lower flood risk, but protection is still smart. Consider:'}
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {getRecommendations(results.risk).map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Insurance Tip */}
        <Card className="bg-amber-500/10 border-amber-500/30 text-white p-6 md:p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Insurance Savings Opportunity</h3>
              <p className="text-slate-300">
                Homes in {results.zone} with {results.drainage === 'combined' ? 'combined sewers' : 'separated systems'}
                {results.drainage === 'combined' && ' pay 15-30% more for water damage riders. '}
                Installing a backwater valve and sump pump can qualify you for insurance discounts of $200-$400 per year.
              </p>
            </div>
          </div>
        </Card>

        {/* Rebate Eligibility */}
        <Card className="bg-cyan-500/10 border-cyan-500/30 text-white p-6 md:p-8">
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Rebate Eligibility</h3>
              <p className="text-slate-300 mb-4">
                Toronto residents: You may qualify for up to <strong>$3,400</strong> in basement flooding protection subsidies through the city's Basement Flooding Protection Subsidy Program.
              </p>
              <a
                href="/government-rebates"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Learn about available rebates
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => window.location.href = '/free-inspection'}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-14 text-lg rounded-xl"
          >
            Book Free Inspection
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-slate-700 text-white hover:bg-slate-800 h-14 text-lg rounded-xl"
          >
            Check Another Address
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-800 text-white p-8 md:p-12">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full mb-4">
            <Droplets className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Check Your Flood Risk</h2>
          <p className="text-slate-400">
            Enter your GTA postal code to get a personalized flood risk assessment and protection recommendations.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="M5V 2T6"
              className={cn(
                'h-14 text-lg text-center bg-slate-800 border-slate-700 text-white placeholder:text-slate-500',
                'focus:border-cyan-500 focus:ring-cyan-500',
                error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
              )}
              maxLength={7}
            />
            <p className="text-sm text-slate-500 mt-2 text-center">
              Enter your Ontario postal code
            </p>
            {error && (
              <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
            )}
          </div>

          <Button
            onClick={handleCheckRisk}
            className="w-full h-14 text-lg bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl"
            disabled={postalCode.length < 6}
          >
            Check My Risk
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            Data based on City of Toronto flood zone maps, historical weather events, and insurance industry reports. For informational purposes only.
          </p>
        </div>
      </div>
    </Card>
  );
}
