import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Droplets,
  Shield,
  ArrowDown,
  Wrench,
  Home,
  Waves,
  Layers,
  DoorOpen,
  Construction,
  Hammer,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Lightbulb,
} from 'lucide-react';

type ProjectType =
  | 'waterproofing-interior'
  | 'waterproofing-exterior'
  | 'underpinning'
  | 'foundation-repair'
  | 'second-unit'
  | 'sump-pump'
  | 'concrete'
  | 'walkout'
  | 'drain-sewer'
  | 'general-reno';

interface Answers {
  projectType: ProjectType | null;
  scope: string;
  location: string;
  propertyType: string;
  additionalFactors: string[];
}

interface PermitResult {
  verdict: 'required' | 'not-required' | 'consult';
  permits: Array<{
    name: string;
    cost: string;
    time: string;
    department: string;
  }>;
  totalCost: string;
  timeline: string;
  tips: string[];
  municipalityNote: string;
}

const projectTypes = [
  { id: 'waterproofing-interior', label: 'Basement Waterproofing (interior)', icon: Droplets },
  { id: 'waterproofing-exterior', label: 'Basement Waterproofing (exterior)', icon: Shield },
  { id: 'underpinning', label: 'Underpinning / Lowering', icon: ArrowDown },
  { id: 'foundation-repair', label: 'Foundation Repair', icon: Wrench },
  { id: 'second-unit', label: 'Basement Second Unit / Apartment', icon: Home },
  { id: 'sump-pump', label: 'Sump Pump / Backwater Valve', icon: Waves },
  { id: 'concrete', label: 'Concrete Work (driveway, patio)', icon: Layers },
  { id: 'walkout', label: 'Walkout Basement Conversion', icon: DoorOpen },
  { id: 'drain-sewer', label: 'Drain / Sewer Replacement', icon: Construction },
  { id: 'general-reno', label: 'General Renovation', icon: Hammer },
];

const scopeOptions: Record<ProjectType, string[]> = {
  'waterproofing-interior': [
    'Minor patch/crack repair only',
    'Full interior drainage system (weeping tile)',
    'Interior drainage + sump pump',
  ],
  'waterproofing-exterior': [
    'Excavation one wall only',
    'Excavation full perimeter',
    'Excavation + membrane + drainage',
  ],
  underpinning: ['Single room/area', 'Full basement underpinning', 'Bench footing (partial lowering)'],
  'foundation-repair': [
    'Crack injection repair',
    'Wall reinforcement (carbon fiber/steel)',
    'Full wall replacement section',
  ],
  'second-unit': [
    'Adding kitchen only',
    'Full separate apartment (kitchen + bath + egress)',
    'Converting existing space (adding egress window)',
  ],
  'sump-pump': ['New sump pump installation', 'Replacing existing pump', 'Adding battery backup to existing'],
  concrete: ['Small pad/walkway (under 10 sq ft)', 'Driveway replacement', 'Garage pad / large patio'],
  walkout: ['Cutting existing wall for door', 'Full walkout conversion with retaining walls'],
  'drain-sewer': [
    'Interior drain replacement',
    'Exterior drain to city connection',
    'Full sewer line replacement',
  ],
  'general-reno': [
    'Cosmetic only (paint, flooring, trim)',
    'Structural changes (moving walls)',
    'Adding plumbing or electrical',
  ],
};

const locations = [
  'City of Toronto',
  'Mississauga',
  'Brampton',
  'Vaughan',
  'Markham',
  'Oakville',
  'Burlington',
  'Other GTA municipality',
];

const propertyTypes = ['Detached house', 'Semi-detached', 'Townhouse / Row house', 'Duplex / Triplex'];

const additionalFactors = [
  'Property is in a heritage conservation district',
  'Work involves changes to building exterior',
  'Work requires temporary street/sidewalk closure',
  'Property has a secondary suite already',
  'Work involves asbestos-containing materials',
  'Not sure about any of these',
];

const municipalityNotes: Record<string, string> = {
  'City of Toronto': 'Toronto uses the Toronto Building portal. Apply online at toronto.ca/building',
  Mississauga: "Apply through Mississauga's Online Building Permit system at mississauga.ca",
  Brampton: "Brampton requires online application through Brampton's Building Services portal",
  Vaughan: 'Vaughan uses CityView for online permit applications at vaughan.ca',
  Markham: 'Markham Building Standards accepts online applications at markham.ca',
  Oakville: 'Oakville requires in-person or online submission at oakville.ca/business/building-permits',
  Burlington: 'Burlington uses an online portal at burlington.ca/building',
  'Other GTA municipality': 'Check your local municipality website for specific permit requirements and application process',
};

export default function PermitChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    projectType: null,
    scope: '',
    location: '',
    propertyType: '',
    additionalFactors: [],
  });

  const calculateResults = (): PermitResult => {
    const { projectType, scope, location, additionalFactors } = answers;
    const permits: PermitResult['permits'] = [];
    let verdict: PermitResult['verdict'] = 'consult';
    const tips: string[] = [];

    // No permit cases
    if (
      (projectType === 'waterproofing-interior' && scope === 'Minor patch/crack repair only') ||
      (projectType === 'sump-pump' && (scope === 'Replacing existing pump' || scope === 'Adding battery backup to existing')) ||
      (projectType === 'concrete' && scope === 'Small pad/walkway (under 10 sq ft)') ||
      (projectType === 'general-reno' && scope === 'Cosmetic only (paint, flooring, trim)')
    ) {
      verdict = 'not-required';
      tips.push(
        'Most municipalities in the GTA do not require permits for minor cosmetic or maintenance work like this. However, it\'s always wise to confirm with your local building department.',
      );
    }

    // Underpinning - ALWAYS requires permit
    if (projectType === 'underpinning') {
      verdict = 'required';
      permits.push({
        name: 'Building Permit',
        cost: '$1,500 - $4,000',
        time: '6-12 weeks',
        department: 'Building Services',
      });
      permits.push({
        name: 'Engineering Review',
        cost: '$800 - $2,500',
        time: 'Included in building permit time',
        department: 'Building Services / Engineering',
      });
      tips.push('Underpinning ALWAYS requires a building permit and engineered drawings from a licensed structural engineer.');
      tips.push('Budget 8-16 weeks for permit approval. Expedited review may be available for an additional fee.');
    }

    // Second unit - ALWAYS requires multiple permits
    if (projectType === 'second-unit') {
      verdict = 'required';
      permits.push({
        name: 'Building Permit',
        cost: '$1,200 - $3,500',
        time: '8-16 weeks',
        department: 'Building Services',
      });
      permits.push({
        name: 'Plumbing Permit',
        cost: '$200 - $600',
        time: '2-4 weeks',
        department: 'Building Services / Plumbing',
      });
      permits.push({
        name: 'Electrical Permit',
        cost: '$150 - $500',
        time: '2-4 weeks',
        department: 'Building Services / ESA',
      });
      tips.push(
        'Second units require building, plumbing, electrical, AND fire separation compliance. Budget $3,000-$5,000 for permits alone.',
      );
      tips.push(
        'Ensure proper egress windows (minimum 15 sq ft opening area), ceiling height (6\'5" minimum), and separate entrance.',
      );
      if (additionalFactors.includes('Property has a secondary suite already')) {
        tips.push(
          'Since your property already has a secondary suite, additional zoning or variance applications may be required. Consult your municipality.',
        );
      }
    }

    // Walkout conversion
    if (projectType === 'walkout') {
      verdict = 'required';
      permits.push({
        name: 'Building Permit',
        cost: '$800 - $2,500',
        time: '6-10 weeks',
        department: 'Building Services',
      });
      if (scope === 'Full walkout conversion with retaining walls') {
        permits.push({
          name: 'Engineering Review',
          cost: '$500 - $1,500',
          time: 'Included in building permit time',
          department: 'Engineering',
        });
      }
      if (additionalFactors.includes('Work requires temporary street/sidewalk closure')) {
        permits.push({
          name: 'Right-of-Way Permit',
          cost: '$200 - $800',
          time: '2-4 weeks',
          department: 'Transportation / Public Works',
        });
      }
      tips.push('Walkout conversions require structural approval and may need grading/drainage plans.');
    }

    // Exterior waterproofing
    if (projectType === 'waterproofing-exterior') {
      if (scope === 'Excavation full perimeter' || scope === 'Excavation + membrane + drainage') {
        verdict = 'required';
        permits.push({
          name: 'Building Permit',
          cost: '$400 - $1,200',
          time: '4-8 weeks',
          department: 'Building Services',
        });
        tips.push('Full perimeter excavation typically requires a building permit to ensure proper foundation support during work.');
      } else {
        verdict = 'consult';
        tips.push(
          'Single wall excavation may or may not require a permit depending on depth and municipality. Consult your local building department.',
        );
      }
    }

    // Interior waterproofing (full system)
    if (
      projectType === 'waterproofing-interior' &&
      (scope === 'Full interior drainage system (weeping tile)' || scope === 'Interior drainage + sump pump')
    ) {
      verdict = 'consult';
      tips.push(
        'Interior drainage systems vary by municipality. Toronto typically does not require permits, but Mississauga and some others do. Always confirm.',
      );
    }

    // Foundation repair
    if (projectType === 'foundation-repair') {
      if (scope === 'Wall reinforcement (carbon fiber/steel)' || scope === 'Full wall replacement section') {
        verdict = 'required';
        permits.push({
          name: 'Building Permit',
          cost: '$500 - $2,000',
          time: '4-8 weeks',
          department: 'Building Services',
        });
        tips.push('Structural repairs require engineered drawings and building permit approval.');
      } else {
        verdict = 'not-required';
        tips.push('Crack injection for minor repairs typically does not require a permit, but severe cracks should be assessed by an engineer.');
      }
    }

    // Sump pump (new installation)
    if (projectType === 'sump-pump' && scope === 'New sump pump installation') {
      verdict = 'consult';
      permits.push({
        name: 'Plumbing Permit (possibly)',
        cost: '$150 - $400',
        time: '1-3 weeks',
        department: 'Building Services / Plumbing',
      });
      tips.push(
        'New sump pump installations require permits in some municipalities (e.g., Mississauga, Brampton) but not others (e.g., Toronto). Check locally.',
      );
    }

    // Drain/Sewer
    if (projectType === 'drain-sewer') {
      if (scope === 'Interior drain replacement') {
        verdict = 'consult';
        tips.push('Interior drain work may require a plumbing permit depending on scope and municipality.');
      } else {
        verdict = 'required';
        permits.push({
          name: 'Plumbing Permit',
          cost: '$300 - $800',
          time: '2-4 weeks',
          department: 'Building Services / Plumbing',
        });
        if (scope === 'Full sewer line replacement') {
          permits.push({
            name: 'Road Opening Permit',
            cost: '$500 - $2,000',
            time: '3-6 weeks',
            department: 'Transportation / Public Works',
          });
        }
        tips.push('Exterior drain and sewer work connecting to city infrastructure requires plumbing permits and possibly road opening permits.');
      }
    }

    // Concrete work
    if (projectType === 'concrete') {
      if (scope === 'Driveway replacement') {
        verdict = 'consult';
        permits.push({
          name: 'Entrance Permit (possibly)',
          cost: '$200 - $600',
          time: '2-4 weeks',
          department: 'Transportation / Public Works',
        });
        tips.push('Driveway replacement may require an entrance permit if curb cuts or municipal property are affected.');
      } else if (scope === 'Garage pad / large patio') {
        verdict = 'consult';
        tips.push('Large concrete structures may require building permits if they exceed certain size thresholds (typically over 108 sq ft).');
      }
    }

    // General renovation
    if (projectType === 'general-reno') {
      if (scope === 'Structural changes (moving walls)') {
        verdict = 'required';
        permits.push({
          name: 'Building Permit',
          cost: '$400 - $1,500',
          time: '4-8 weeks',
          department: 'Building Services',
        });
        tips.push('Removing or moving load-bearing walls requires a building permit and engineered drawings.');
      } else if (scope === 'Adding plumbing or electrical') {
        verdict = 'required';
        permits.push({
          name: 'Plumbing Permit (if applicable)',
          cost: '$150 - $500',
          time: '2-4 weeks',
          department: 'Building Services / Plumbing',
        });
        permits.push({
          name: 'Electrical Permit (if applicable)',
          cost: '$150 - $500',
          time: '2-4 weeks',
          department: 'Building Services / ESA',
        });
        tips.push('New plumbing or electrical work requires permits. Consult a licensed contractor.');
      }
    }

    // Heritage district
    if (additionalFactors.includes('Property is in a heritage conservation district')) {
      permits.push({
        name: 'Heritage Permit',
        cost: '$300 - $1,200',
        time: '4-8 weeks (add to total)',
        department: 'Heritage Planning',
      });
      tips.push(
        'Heritage properties require additional review. Expect longer timelines and restrictions on exterior alterations.',
      );
      if (verdict === 'not-required') verdict = 'consult';
    }

    // Street closure
    if (additionalFactors.includes('Work requires temporary street/sidewalk closure')) {
      permits.push({
        name: 'Right-of-Way Permit',
        cost: '$200 - $800',
        time: '2-4 weeks',
        department: 'Transportation / Public Works',
      });
    }

    // Asbestos
    if (additionalFactors.includes('Work involves asbestos-containing materials')) {
      tips.push(
        'Asbestos abatement requires a licensed contractor and notification to the Ministry of Labour. Additional permits and inspections will apply.',
      );
    }

    // Calculate totals
    let minCost = 0;
    let maxCost = 0;
    permits.forEach((p) => {
      const match = p.cost.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
      if (match) {
        minCost += parseInt(match[1].replace(/,/g, ''));
        maxCost += parseInt(match[2].replace(/,/g, ''));
      }
    });

    const totalCost = permits.length > 0 ? `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()}` : 'No permit fees';

    // Timeline
    let timeline = '';
    if (verdict === 'not-required') {
      timeline = 'No permit required - work can begin immediately';
    } else if (permits.some((p) => p.name.includes('Second Unit') || p.name === 'Building Permit (Second Unit)')) {
      timeline = '8-16 weeks for permit approval';
    } else if (permits.some((p) => p.name === 'Building Permit')) {
      timeline = '4-8 weeks for permit approval';
    } else if (permits.length > 0) {
      timeline = '2-4 weeks for permit approval';
    } else {
      timeline = 'Consult your municipality for specific timeline';
    }

    const municipalityNote = municipalityNotes[location] || municipalityNotes['Other GTA municipality'];

    return { verdict, permits, totalCost, timeline, tips, municipalityNote };
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(5); // Results
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({
      projectType: null,
      scope: '',
      location: '',
      propertyType: '',
      additionalFactors: [],
    });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return answers.projectType !== null;
      case 1:
        return answers.scope !== '';
      case 2:
        return answers.location !== '';
      case 3:
        return answers.propertyType !== '';
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const progress = ((currentStep + 1) / 5) * 100;

  if (currentStep === 5) {
    const results = calculateResults();
    const verdictColor =
      results.verdict === 'required'
        ? 'bg-amber-500'
        : results.verdict === 'not-required'
          ? 'bg-green-500'
          : 'bg-amber-500';
    const verdictText =
      results.verdict === 'required'
        ? 'PERMIT REQUIRED'
        : results.verdict === 'not-required'
          ? 'NO PERMIT NEEDED'
          : 'PERMIT LIKELY REQUIRED — Consult Your Municipality';

    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <Card className="bg-slate-900 text-white border-cyan-500/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold">Your Permit Assessment</CardTitle>
              <Badge className={cn('text-base md:text-lg px-4 py-2', verdictColor)}>{verdictText}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Permits List */}
            {results.permits.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Required Permits
                </h3>
                <div className="grid gap-4">
                  {results.permits.map((permit, idx) => (
                    <Card key={idx} className="bg-slate-800 border-slate-700">
                      <CardContent className="pt-4">
                        <h4 className="font-bold text-lg mb-2">{permit.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-slate-400">Cost:</span>
                            <p className="font-medium text-cyan-400">{permit.cost}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Time:</span>
                            <p className="font-medium">{permit.time}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Department:</span>
                            <p className="font-medium">{permit.department}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Estimate */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  Total Estimated Permit Costs
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-cyan-400">{results.totalCost}</p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Expected Timeline
                </h3>
                <p className="text-lg">{results.timeline}</p>
              </CardContent>
            </Card>

            {/* Pro Tips */}
            {results.tips.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  Pro Tips
                </h3>
                <div className="space-y-3">
                  {results.tips.map((tip, idx) => (
                    <Card key={idx} className="bg-amber-950/30 border-amber-500/30">
                      <CardContent className="pt-4">
                        <p className="text-sm">{tip}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Municipality Note */}
            <Card className="bg-cyan-950/30 border-cyan-500/30">
              <CardContent className="pt-4">
                <h3 className="text-lg font-bold mb-2 text-cyan-400">{answers.location} — Application Process</h3>
                <p className="text-sm">{results.municipalityNote}</p>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="space-y-4 pt-4">
              <Card className="bg-gradient-to-r from-cyan-900 to-cyan-800 border-cyan-500">
                <CardContent className="pt-4">
                  <h3 className="text-xl font-bold mb-2">Need Help With Permits?</h3>
                  <p className="mb-4 text-sm">
                    DrySpace handles all permit applications for our clients. We navigate the bureaucracy so you don't have to.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      <a href="/free-inspection">Book Free Consultation</a>
                    </Button>
                    <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                      <a href="/services/permits">Learn About Our Permit Services</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={handleReset} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <Card className="bg-slate-900 text-white border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold mb-4">Building Permit Checker</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Step {currentStep + 1} of 5</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 0: Project Type */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">What type of project are you planning?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card
                      key={type.id}
                      onClick={() => setAnswers({ ...answers, projectType: type.id as ProjectType, scope: '' })}
                      className={cn(
                        'cursor-pointer transition-all hover:scale-105 bg-slate-800 border-2',
                        answers.projectType === type.id ? 'border-cyan-500 bg-cyan-950/30' : 'border-slate-700 hover:border-cyan-500/50',
                      )}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <Icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                        <span className="font-medium text-sm md:text-base">{type.label}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1: Scope */}
          {currentStep === 1 && answers.projectType && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">What is the scope of work?</h2>
              <div className="space-y-3">
                {scopeOptions[answers.projectType].map((option) => (
                  <Card
                    key={option}
                    onClick={() => setAnswers({ ...answers, scope: option })}
                    className={cn(
                      'cursor-pointer transition-all hover:scale-[1.02] bg-slate-800 border-2',
                      answers.scope === option ? 'border-cyan-500 bg-cyan-950/30' : 'border-slate-700 hover:border-cyan-500/50',
                    )}
                  >
                    <CardContent className="p-4">
                      <span className="font-medium">{option}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Where is your property located?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {locations.map((location) => (
                  <Card
                    key={location}
                    onClick={() => setAnswers({ ...answers, location })}
                    className={cn(
                      'cursor-pointer transition-all hover:scale-[1.02] bg-slate-800 border-2',
                      answers.location === location ? 'border-cyan-500 bg-cyan-950/30' : 'border-slate-700 hover:border-cyan-500/50',
                    )}
                  >
                    <CardContent className="p-4">
                      <span className="font-medium">{location}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Property Type */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">What type of property is it?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {propertyTypes.map((type) => (
                  <Card
                    key={type}
                    onClick={() => setAnswers({ ...answers, propertyType: type })}
                    className={cn(
                      'cursor-pointer transition-all hover:scale-[1.02] bg-slate-800 border-2',
                      answers.propertyType === type ? 'border-cyan-500 bg-cyan-950/30' : 'border-slate-700 hover:border-cyan-500/50',
                    )}
                  >
                    <CardContent className="p-4">
                      <span className="font-medium">{type}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Additional Factors */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Any additional factors? (Optional - select all that apply)</h2>
              <div className="space-y-3">
                {additionalFactors.map((factor) => (
                  <Card
                    key={factor}
                    onClick={() => {
                      const current = answers.additionalFactors;
                      const updated = current.includes(factor) ? current.filter((f) => f !== factor) : [...current, factor];
                      setAnswers({ ...answers, additionalFactors: updated });
                    }}
                    className={cn(
                      'cursor-pointer transition-all hover:scale-[1.02] bg-slate-800 border-2',
                      answers.additionalFactors.includes(factor)
                        ? 'border-cyan-500 bg-cyan-950/30'
                        : 'border-slate-700 hover:border-cyan-500/50',
                    )}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      <div
                        className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                          answers.additionalFactors.includes(factor) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600',
                        )}
                      >
                        {answers.additionalFactors.includes(factor) && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium text-sm md:text-base">{factor}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {currentStep > 0 && (
              <Button onClick={handleBack} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={cn('ml-auto bg-cyan-500 hover:bg-cyan-600 text-white', !isStepComplete() && 'opacity-50 cursor-not-allowed')}
            >
              {currentStep === 4 ? 'See Results' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
