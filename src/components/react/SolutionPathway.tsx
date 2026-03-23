import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  ArrowRight, 
  ArrowLeft, 
  Droplets, 
  Home, 
  Shield, 
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    icon?: React.ReactNode;
    nextQuestion?: string;
    solution?: string;
  }[];
}

interface Solution {
  id: string;
  title: string;
  description: string;
  services: string[];
  timeline: string;
  priceRange: string;
  urgency: 'low' | 'medium' | 'high';
  warranty: string;
  icon: React.ReactNode;
  features: string[];
  nextSteps: string[];
}

const questions: Question[] = [
  {
    id: 'problem-type',
    question: 'What type of water problem are you experiencing?',
    options: [
      {
        id: 'wet-basement',
        text: 'Water in basement/crawl space',
        icon: <Droplets className="w-5 h-5" />,
        nextQuestion: 'water-source'
      },
      {
        id: 'foundation-cracks',
        text: 'Cracks in foundation walls',
        icon: <AlertTriangle className="w-5 h-5" />,
        nextQuestion: 'crack-details'
      },
      {
        id: 'flooding',
        text: 'Basement flooding',
        icon: <Home className="w-5 h-5" />,
        nextQuestion: 'flood-frequency'
      },
      {
        id: 'prevention',
        text: 'Prevention/proactive waterproofing',
        icon: <Shield className="w-5 h-5" />,
        nextQuestion: 'home-details'
      }
    ]
  },
  {
    id: 'water-source',
    question: 'Where is the water coming from?',
    options: [
      {
        id: 'walls',
        text: 'Through foundation walls',
        nextQuestion: 'home-details'
      },
      {
        id: 'floor',
        text: 'Coming up through floor',
        nextQuestion: 'sump-pump-check'
      },
      {
        id: 'multiple',
        text: 'Multiple locations',
        nextQuestion: 'severity-level'
      },
      {
        id: 'unknown',
        text: 'Not sure/need inspection',
        solution: 'professional-assessment'
      }
    ]
  },
  {
    id: 'crack-details',
    question: 'Tell us about the cracks:',
    options: [
      {
        id: 'small-cracks',
        text: 'Small hairline cracks, no water',
        solution: 'crack-injection'
      },
      {
        id: 'active-leaks',
        text: 'Cracks with water coming through',
        solution: 'crack-repair-waterproofing'
      },
      {
        id: 'large-structural',
        text: 'Large cracks or bowing walls',
        solution: 'structural-repair'
      }
    ]
  },
  {
    id: 'flood-frequency',
    question: 'How often does flooding occur?',
    options: [
      {
        id: 'first-time',
        text: 'First time flooding',
        nextQuestion: 'sump-pump-check'
      },
      {
        id: 'occasional',
        text: 'During heavy rains only',
        nextQuestion: 'sump-pump-check'
      },
      {
        id: 'frequent',
        text: 'Multiple times per year',
        solution: 'comprehensive-waterproofing'
      },
      {
        id: 'emergency',
        text: 'Currently flooding',
        solution: 'emergency-response'
      }
    ]
  },
  {
    id: 'sump-pump-check',
    question: 'Do you currently have a sump pump?',
    options: [
      {
        id: 'no-sump',
        text: 'No sump pump',
        solution: 'sump-pump-system'
      },
      {
        id: 'has-sump',
        text: 'Yes, but still getting water',
        nextQuestion: 'severity-level'
      },
      {
        id: 'pump-failed',
        text: 'Pump failed during storm',
        solution: 'backup-sump-system'
      }
    ]
  },
  {
    id: 'home-details',
    question: 'What type of foundation do you have?',
    options: [
      {
        id: 'poured-concrete',
        text: 'Poured concrete',
        nextQuestion: 'home-age'
      },
      {
        id: 'concrete-block',
        text: 'Concrete block',
        nextQuestion: 'home-age'
      },
      {
        id: 'stone-brick',
        text: 'Stone or brick',
        nextQuestion: 'home-age'
      },
      {
        id: 'unsure',
        text: 'Not sure',
        solution: 'professional-assessment'
      }
    ]
  },
  {
    id: 'home-age',
    question: 'How old is your home?',
    options: [
      {
        id: 'new-home',
        text: 'Less than 10 years',
        solution: 'interior-waterproofing'
      },
      {
        id: 'modern-home',
        text: '10-30 years',
        nextQuestion: 'severity-level'
      },
      {
        id: 'older-home',
        text: '30+ years',
        solution: 'exterior-waterproofing'
      }
    ]
  },
  {
    id: 'severity-level',
    question: 'How severe is the water problem?',
    options: [
      {
        id: 'minor',
        text: 'Minor dampness, no standing water',
        solution: 'interior-waterproofing'
      },
      {
        id: 'moderate',
        text: 'Some water entry, drying between rains',
        solution: 'drainage-system'
      },
      {
        id: 'severe',
        text: 'Standing water, mold concerns',
        solution: 'comprehensive-waterproofing'
      }
    ]
  }
];

const solutions: Record<string, Solution> = {
  'crack-injection': {
    id: 'crack-injection',
    title: 'Crack Injection Repair',
    description: 'Seal foundation cracks with polyurethane injection to prevent future water entry.',
    services: ['Crack Assessment', 'Polyurethane Injection', 'Interior Sealing'],
    timeline: '1-2 days',
    priceRange: '$800 - $2,500',
    urgency: 'low',
    warranty: '25-year warranty',
    icon: <Wrench className="w-8 h-8" />,
    features: [
      'Permanent crack sealing',
      'Interior application',
      'Minimal disruption',
      'Same-day completion'
    ],
    nextSteps: [
      'Schedule free crack assessment',
      'Get detailed quote',
      'Book installation appointment'
    ]
  },
  'interior-waterproofing': {
    id: 'interior-waterproofing',
    title: 'Interior Waterproofing System',
    description: 'Manage water with interior drainage, sump pump, and vapor barriers.',
    services: ['Interior Drainage', 'Sump Pump', 'Vapor Barrier', 'Dehumidification'],
    timeline: '3-5 days',
    priceRange: '$8,000 - $15,000',
    urgency: 'medium',
    warranty: '25-year transferable warranty',
    icon: <Home className="w-8 h-8" />,
    features: [
      'No excavation required',
      'Works year-round',
      'Maintains property value',
      'Quick installation'
    ],
    nextSteps: [
      'Free basement inspection',
      'Custom system design',
      'Financing options available'
    ]
  },
  'exterior-waterproofing': {
    id: 'exterior-waterproofing',
    title: 'Exterior Waterproofing',
    description: 'Complete exterior foundation waterproofing with excavation and membrane.',
    services: ['Full Excavation', 'Membrane Application', 'Weeping Tile', 'Backfill'],
    timeline: '5-10 days',
    priceRange: '$25,000 - $45,000',
    urgency: 'medium',
    warranty: '25-year transferable warranty',
    icon: <Shield className="w-8 h-8" />,
    features: [
      'Most comprehensive solution',
      'Addresses root cause',
      'Increases home value',
      'Long-term solution'
    ],
    nextSteps: [
      'Site evaluation',
      'Permit applications',
      'Utility locates',
      'Construction scheduling'
    ]
  },
  'sump-pump-system': {
    id: 'sump-pump-system',
    title: 'Sump Pump Installation',
    description: 'Primary and backup sump pump system with battery backup.',
    services: ['Pit Installation', 'Primary Pump', 'Battery Backup', 'Alarm System'],
    timeline: '1-2 days',
    priceRange: '$2,500 - $4,500',
    urgency: 'high',
    warranty: '10-year pump warranty',
    icon: <Droplets className="w-8 h-8" />,
    features: [
      'Automatic operation',
      'Battery backup protection',
      'High-water alarm',
      'Quick installation'
    ],
    nextSteps: [
      'Emergency installation available',
      'Same-day quotes',
      'Government rebates available'
    ]
  },
  'comprehensive-waterproofing': {
    id: 'comprehensive-waterproofing',
    title: 'Complete Waterproofing Solution',
    description: 'Combination of interior and exterior systems for maximum protection.',
    services: ['Exterior Waterproofing', 'Interior Drainage', 'Sump Systems', 'Foundation Repair'],
    timeline: '7-14 days',
    priceRange: '$35,000 - $65,000',
    urgency: 'high',
    warranty: '25-year comprehensive warranty',
    icon: <Shield className="w-8 h-8" />,
    features: [
      'Maximum protection',
      'Multiple backup systems',
      'Structural improvements',
      'Comprehensive warranty'
    ],
    nextSteps: [
      'Comprehensive assessment',
      'Phased construction plan',
      'Financing options',
      'Government rebate applications'
    ]
  },
  'emergency-response': {
    id: 'emergency-response',
    title: '24/7 Emergency Response',
    description: 'Immediate water removal and emergency waterproofing services.',
    services: ['Emergency Pumping', 'Water Removal', 'Temporary Measures', 'Damage Assessment'],
    timeline: 'Immediate response',
    priceRange: 'Quote on arrival',
    urgency: 'high',
    warranty: 'Emergency service warranty',
    icon: <AlertTriangle className="w-8 h-8" />,
    features: [
      '2-hour response time',
      '24/7 availability',
      'Insurance claim assistance',
      'Emergency equipment'
    ],
    nextSteps: [
      'Call (437) 545-0067 now',
      'Emergency crew dispatched',
      'Assessment and action plan'
    ]
  },
  'professional-assessment': {
    id: 'professional-assessment',
    title: 'Professional Water Assessment',
    description: 'Comprehensive inspection to identify water sources and recommend solutions.',
    services: ['Moisture Detection', 'Structural Assessment', 'Solution Design', 'Detailed Report'],
    timeline: '2-3 hours',
    priceRange: 'Free assessment',
    urgency: 'low',
    warranty: 'Assessment warranty',
    icon: <CheckCircle className="w-8 h-8" />,
    features: [
      'Thermal imaging',
      'Moisture mapping',
      'Written report',
      'Multiple solution options'
    ],
    nextSteps: [
      'Schedule free inspection',
      'Receive detailed report',
      'Compare solution options'
    ]
  }
};

const SolutionPathway: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('problem-type');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finalSolution, setFinalSolution] = useState<string | null>(null);
  const [questionHistory, setQuestionHistory] = useState<string[]>(['problem-type']);

  const currentQ = questions.find(q => q.id === currentQuestion);
  const solution = finalSolution ? solutions[finalSolution] : null;

  const selectOption = (optionId: string) => {
    const option = currentQ?.options.find(o => o.id === optionId);
    if (!option) return;

    const newAnswers = { ...answers, [currentQuestion]: optionId };
    setAnswers(newAnswers);

    if (option.solution) {
      setFinalSolution(option.solution);
    } else if (option.nextQuestion) {
      const newHistory = [...questionHistory, option.nextQuestion];
      setQuestionHistory(newHistory);
      setCurrentQuestion(option.nextQuestion);
    }
  };

  const goBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      setQuestionHistory(newHistory);
      setCurrentQuestion(newHistory[newHistory.length - 1]);
      setFinalSolution(null);
    }
  };

  const restart = () => {
    setCurrentQuestion('problem-type');
    setAnswers({});
    setFinalSolution(null);
    setQuestionHistory(['problem-type']);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-500 bg-amber-50 border-yellow-200';
      default: return 'text-cyan-600 bg-cyan-50 border-green-200';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'High Priority';
      case 'medium': return 'Moderate Priority';
      default: return 'Low Priority';
    }
  };

  if (solution) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  {solution.icon}
                  Your Recommended Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-lg">
                      {solution.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-cyan-50 rounded-lg">
                        <Clock className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-slate-900">{solution.timeline}</div>
                        <div className="text-xs text-slate-600">Timeline</div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-slate-900">{solution.priceRange}</div>
                        <div className="text-xs text-slate-600">Investment</div>
                      </div>
                    </div>

                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-6 ${getUrgencyColor(solution.urgency)}`}>
                      {getUrgencyText(solution.urgency)}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-cyan-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 mb-6">
                      <div className="font-medium text-cyan-800 mb-1">{solution.warranty}</div>
                      <div className="text-sm text-cyan-700">
                        Backed by Dryspace's comprehensive warranty program
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-slate-50 rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-slate-900 mb-4">Services Included:</h4>
                      <ul className="space-y-2">
                        {solution.services.map((service, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Next Steps:</h4>
                      <ol className="space-y-2">
                        {solution.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="bg-cyan-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {solution.urgency === 'high' && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                          <div>
                            <p className="text-sm text-red-800 font-medium">
                              High Priority Issue
                            </p>
                            <p className="text-sm text-red-700 mt-1">
                              We recommend addressing this water problem as soon as possible to prevent further damage.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {solution.urgency === 'high' ? (
                        <Button size="lg" className="w-full bg-red-600 hover:bg-red-700">
                          Call Emergency Line: (437) 545-0067
                        </Button>
                      ) : (
                        <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          Get Free Consultation
                        </Button>
                      )}
                      
                      <Button size="lg" variant="outline" className="w-full">
                        Schedule Inspection
                      </Button>
                      
                      <Button variant="ghost" onClick={restart} className="w-full text-slate-600">
                        Start Over
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Find Your Waterproofing Solution
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Answer a few quick questions to get a personalized recommendation for your water problem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  Step {questionHistory.length} of 5-7
                </CardTitle>
                {questionHistory.length > 1 && (
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(questionHistory.length / 6) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {currentQ && (
                <>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
                    {currentQ.question}
                  </h3>
                  <div className="grid gap-4">
                    {currentQ.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => selectOption(option.id)}
                        className="flex items-center gap-4 p-6 rounded-lg border-2 border-slate-200 hover:border-cyan-600 hover:bg-cyan-50 transition-colors text-left group"
                      >
                        <div className="text-cyan-600 group-hover:text-cyan-700">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-lg font-medium text-slate-900">
                            {option.text}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-600" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionPathway;