import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Gauge,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

type FoundationType = 'poured' | 'block' | 'stone' | 'brick' | null;
type CrackDirection = 'vertical' | 'horizontal' | 'diagonal' | 'multiple' | null;
type CrackWidth = 'hairline' | 'narrow' | 'medium' | 'wide' | 'very-wide' | null;
type CrackLocation = 'interior' | 'exterior' | 'window' | 'cove' | 'multiple-locations' | null;
type AdditionalSign = 'water' | 'efflorescence' | 'growing' | 'bowing' | 'sticking' | 'full-thickness' | 'none';

interface WizardState {
  foundationType: FoundationType;
  crackDirection: CrackDirection;
  crackWidth: CrackWidth;
  crackLocation: CrackLocation;
  additionalSigns: AdditionalSign[];
}

interface SeverityResult {
  score: number;
  classification: 'cosmetic' | 'minor' | 'moderate' | 'serious';
  color: string;
  badgeVariant: 'default' | 'secondary' | 'destructive';
  title: string;
  description: string;
  actions: string[];
  costEstimate: string;
  warnings: string[];
}

export default function CrackAnalyzer() {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [state, setState] = useState<WizardState>({
    foundationType: null,
    crackDirection: null,
    crackWidth: null,
    crackLocation: null,
    additionalSigns: [],
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const calculateSeverity = (): SeverityResult => {
    // Base severity by direction
    const directionScores: Record<string, number> = {
      vertical: 20,
      horizontal: 60,
      diagonal: 50,
      multiple: 40,
    };

    // Width multipliers
    const widthMultipliers: Record<string, number> = {
      hairline: 1.0,
      narrow: 1.3,
      medium: 1.8,
      wide: 2.5,
      'very-wide': 3.0,
    };

    // Foundation type modifiers
    const foundationMods: Record<string, number> = {
      poured: 0,
      block: 10,
      stone: 15,
      brick: 10,
    };

    // Location modifiers
    const locationMods: Record<string, number> = {
      interior: 0,
      exterior: 5,
      window: 5,
      cove: 10,
      'multiple-locations': 15,
    };

    // Additional signs points
    const signPoints: Record<string, number> = {
      water: 10,
      efflorescence: 5,
      growing: 15,
      bowing: 25,
      sticking: 10,
      'full-thickness': 15,
      none: 0,
    };

    let baseScore = directionScores[state.crackDirection || 'vertical'];
    let foundationMod = foundationMods[state.foundationType || 'poured'];
    let locationMod = locationMods[state.crackLocation || 'interior'];
    let signsMod = state.additionalSigns.reduce((sum, sign) => sum + signPoints[sign], 0);
    let widthMult = widthMultipliers[state.crackWidth || 'hairline'];

    let finalScore = Math.min(100, Math.round((baseScore + foundationMod + locationMod + signsMod) * widthMult));

    // Classify severity
    if (finalScore <= 25) {
      return {
        score: finalScore,
        classification: 'cosmetic',
        color: 'text-green-600',
        badgeVariant: 'default',
        title: 'Cosmetic — Monitor Only',
        description: 'This crack is likely from normal shrinkage or settling. While not immediately concerning, it\'s worth monitoring over time to ensure it doesn\'t worsen.',
        actions: [
          'Take clear photos from the same spot every 3-6 months',
          'Measure the width at the widest point and record it',
          'Mark the ends of the crack with pencil to track growth',
          'Check again after heavy rain or freeze-thaw cycles',
          'No immediate repair needed unless water appears',
        ],
        costEstimate: 'No cost — monitoring only',
        warnings: [
          'Don\'t ignore if the crack starts leaking water',
          'Don\'t assume all cracks are harmless — reassess if conditions change',
        ],
      };
    } else if (finalScore <= 50) {
      return {
        score: finalScore,
        classification: 'minor',
        color: 'text-yellow-600',
        badgeVariant: 'secondary',
        title: 'Minor — Seal & Monitor',
        description: 'This crack should be sealed to prevent water infiltration and further deterioration. While not an emergency, professional assessment is recommended to rule out underlying issues.',
        actions: [
          'Schedule professional assessment within 3 months',
          'Consider epoxy or polyurethane crack injection',
          'Ensure proper exterior grading away from foundation',
          'Install or repair gutters and downspouts',
          'Monitor for width changes after sealing',
        ],
        costEstimate: '$300 - $800 for professional crack injection',
        warnings: [
          'Don\'t fill structural cracks with simple caulk or mortar',
          'Don\'t delay if water staining appears or crack widens',
          'Don\'t ignore multiple cracks in the same area',
        ],
      };
    } else if (finalScore <= 75) {
      return {
        score: finalScore,
        classification: 'moderate',
        color: 'text-orange-600',
        badgeVariant: 'destructive',
        title: 'Moderate — Professional Repair Needed',
        description: 'This crack indicates potential structural movement or foundation stress. Professional assessment and repair are necessary to prevent further damage and ensure your home\'s structural integrity.',
        actions: [
          'Get professional assessment within 2-4 weeks',
          'May require carbon fiber straps or wall anchors',
          'Crack injection alone may not be sufficient',
          'Address exterior drainage issues immediately',
          'Do not proceed with cosmetic fixes only',
        ],
        costEstimate: '$1,500 - $5,000 depending on repair method',
        warnings: [
          'Don\'t ignore horizontal cracks in concrete block walls',
          'Don\'t attempt DIY repairs on structural cracks',
          'Don\'t delay — foundation issues worsen over time',
          'Don\'t hide cracks with drywall before addressing the cause',
        ],
      };
    } else {
      return {
        score: finalScore,
        classification: 'serious',
        color: 'text-red-600',
        badgeVariant: 'destructive',
        title: 'Serious — Immediate Attention Required',
        description: 'This crack indicates active structural failure or significant foundation movement. Immediate professional intervention is critical to prevent further damage, potential collapse, or major repair costs.',
        actions: [
          'Contact foundation specialist THIS WEEK',
          'Do not wait — schedule emergency assessment',
          'May require underpinning, wall replacement, or major structural work',
          'Consider temporary support if wall is bowing',
          'Document everything for insurance purposes',
        ],
        costEstimate: '$5,000 - $25,000+ for major structural repair',
        warnings: [
          'DO NOT DELAY — foundation failure accelerates rapidly',
          'Don\'t attempt any DIY repairs on serious structural cracks',
          'Don\'t ignore bowing walls or horizontal cracks',
          'Don\'t finish basement or cover walls until repaired',
          'Don\'t assume small fixes will solve large structural problems',
        ],
      };
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return state.foundationType !== null;
      case 2:
        return state.crackDirection !== null;
      case 3:
        return state.crackWidth !== null;
      case 4:
        return state.crackLocation !== null;
      case 5:
        return state.additionalSigns.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowResult(false);
    setState({
      foundationType: null,
      crackDirection: null,
      crackWidth: null,
      crackLocation: null,
      additionalSigns: [],
    });
  };

  const toggleAdditionalSign = (sign: AdditionalSign) => {
    if (sign === 'none') {
      setState({ ...state, additionalSigns: ['none'] });
    } else {
      const filtered = state.additionalSigns.filter(s => s !== 'none');
      if (filtered.includes(sign)) {
        setState({ ...state, additionalSigns: filtered.filter(s => s !== sign) });
      } else {
        setState({ ...state, additionalSigns: [...filtered, sign] });
      }
    }
  };

  if (showResult) {
    const result = calculateSeverity();

    return (
      <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
          <h2 className="text-2xl font-bold">Foundation Crack Analysis Result</h2>
        </div>

        <div className="p-8">
          {/* Severity Score */}
          <div className="text-center mb-8">
            <div className={cn("text-7xl font-bold mb-4", result.color)}>
              {result.score}
              <span className="text-2xl text-slate-500">/100</span>
            </div>
            <Badge
              variant={result.badgeVariant}
              className="text-lg px-6 py-2"
            >
              {result.title}
            </Badge>
          </div>

          {/* What This Means */}
          <Alert className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-base leading-relaxed">
              {result.description}
            </AlertDescription>
          </Alert>

          {/* Recommended Actions */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Recommended Actions
            </h3>
            <ul className="space-y-2">
              {result.actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-slate-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost Estimate */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-slate-600" />
              Estimated Cost
            </h3>
            <p className="text-slate-700 font-semibold">{result.costEstimate}</p>
          </div>

          {/* Warnings */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              What NOT to Do
            </h3>
            <ul className="space-y-2">
              {result.warnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">⚠</span>
                  <span className="text-slate-700 font-medium">{warning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = '/free-inspection'}
            >
              <Home className="mr-2 h-5 w-5" />
              Get Free Professional Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => window.location.href = 'tel:437-545-0067'}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call DrySpace: 437-545-0067
            </Button>
          </div>

          {/* Start Over */}
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-slate-600 hover:text-slate-900"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Foundation Crack Analyzer</h2>
        <p className="text-slate-300 text-sm">
          Answer 5 quick questions to assess your foundation crack severity
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="p-6 min-h-[400px]">
        {/* Step 1: Foundation Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Home className="h-6 w-6 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">
                What type of foundation do you have?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setState({ ...state, foundationType: 'poured' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.foundationType === 'poured'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Poured Concrete</div>
                <div className="text-sm text-slate-600 mt-1">
                  Solid concrete walls, no visible blocks
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, foundationType: 'block' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.foundationType === 'block'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Concrete Block (CMU)</div>
                <div className="text-sm text-slate-600 mt-1">
                  Rectangular blocks stacked together
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, foundationType: 'stone' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.foundationType === 'stone'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Stone / Rubble</div>
                <div className="text-sm text-slate-600 mt-1">
                  Natural stone or fieldstone foundation
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, foundationType: 'brick' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.foundationType === 'brick'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Brick</div>
                <div className="text-sm text-slate-600 mt-1">
                  Clay brick masonry foundation
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Crack Direction */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Which direction does the crack run?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setState({ ...state, crackDirection: 'vertical' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackDirection === 'vertical'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Vertical</div>
                <div className="text-sm text-slate-600 mt-1">
                  Runs straight up and down
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackDirection: 'horizontal' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackDirection === 'horizontal'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Horizontal</div>
                <div className="text-sm text-slate-600 mt-1">
                  Runs side to side across the wall
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackDirection: 'diagonal' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackDirection === 'diagonal'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Diagonal / Stair-Step</div>
                <div className="text-sm text-slate-600 mt-1">
                  Angles across wall, often in block mortar joints
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackDirection: 'multiple' })}
                className={cn(
                  "p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackDirection === 'multiple'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Multiple / Spiderweb</div>
                <div className="text-sm text-slate-600 mt-1">
                  Several cracks radiating from one point
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Crack Width */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Gauge className="h-6 w-6 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">
                How wide is the crack at its widest point?
              </h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setState({ ...state, crackWidth: 'hairline' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackWidth === 'hairline'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Hairline</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Less than 1mm — barely visible, paper-thin
                    </div>
                  </div>
                  <div className="w-16 h-1 bg-slate-300 rounded"></div>
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackWidth: 'narrow' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackWidth === 'narrow'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Narrow</div>
                    <div className="text-sm text-slate-600 mt-1">
                      1-3mm — width of a credit card edge
                    </div>
                  </div>
                  <div className="w-16 h-1.5 bg-slate-400 rounded"></div>
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackWidth: 'medium' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackWidth === 'medium'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Medium</div>
                    <div className="text-sm text-slate-600 mt-1">
                      3-6mm — width of a nickel edge
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-500 rounded"></div>
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackWidth: 'wide' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackWidth === 'wide'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Wide</div>
                    <div className="text-sm text-slate-600 mt-1">
                      6-12mm — you can fit a pencil tip inside
                    </div>
                  </div>
                  <div className="w-16 h-3 bg-orange-500 rounded"></div>
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackWidth: 'very-wide' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackWidth === 'very-wide'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Very Wide</div>
                    <div className="text-sm text-slate-600 mt-1">
                      More than 12mm — you can see through to the other side
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-red-600 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Where is the crack located?
              </h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setState({ ...state, crackLocation: 'interior' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackLocation === 'interior'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Interior Wall Only</div>
                <div className="text-sm text-slate-600 mt-1">
                  Only visible from inside basement/crawlspace
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackLocation: 'exterior' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackLocation === 'exterior'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Exterior Visible</div>
                <div className="text-sm text-slate-600 mt-1">
                  Can see the crack from outside the house
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackLocation: 'window' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackLocation === 'window'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Around Window or Door</div>
                <div className="text-sm text-slate-600 mt-1">
                  Crack originates at or near an opening
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackLocation: 'cove' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackLocation === 'cove'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">At Floor-Wall Joint (Cove Joint)</div>
                <div className="text-sm text-slate-600 mt-1">
                  Where the basement floor meets the wall
                </div>
              </button>

              <button
                onClick={() => setState({ ...state, crackLocation: 'multiple-locations' })}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-md",
                  state.crackLocation === 'multiple-locations'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200'
                )}
              >
                <div className="font-semibold text-slate-900">Multiple Locations</div>
                <div className="text-sm text-slate-600 mt-1">
                  Cracks in several different areas
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Additional Signs */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="h-6 w-6 text-slate-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Do you notice any of these additional signs?
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Select all that apply</p>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('water')}
                  onChange={() => toggleAdditionalSign('water')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">Water staining around crack</div>
                  <div className="text-sm text-slate-600">
                    Dark stains, mineral deposits, or evidence of moisture
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('efflorescence')}
                  onChange={() => toggleAdditionalSign('efflorescence')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">White powder / efflorescence</div>
                  <div className="text-sm text-slate-600">
                    White, chalky mineral deposits on the wall surface
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('growing')}
                  onChange={() => toggleAdditionalSign('growing')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">Crack has grown over time</div>
                  <div className="text-sm text-slate-600">
                    Crack is getting longer, wider, or both
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('bowing')}
                  onChange={() => toggleAdditionalSign('bowing')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">Wall is bowing or leaning inward</div>
                  <div className="text-sm text-slate-600">
                    Wall appears curved or pushed in from outside pressure
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('sticking')}
                  onChange={() => toggleAdditionalSign('sticking')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">Doors or windows sticking nearby</div>
                  <div className="text-sm text-slate-600">
                    Difficulty opening/closing doors or windows in that area
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('full-thickness')}
                  onChange={() => toggleAdditionalSign('full-thickness')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">Crack goes through full wall thickness</div>
                  <div className="text-sm text-slate-600">
                    You can see daylight or feel air coming through
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={state.additionalSigns.includes('none')}
                  onChange={() => toggleAdditionalSign('none')}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-slate-900">None of the above</div>
                  <div className="text-sm text-slate-600">
                    Just the crack itself, no other symptoms
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="border-t border-slate-200 p-6 bg-slate-50 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {step === totalSteps ? 'See Results' : 'Next'}
          {step < totalSteps && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
}
