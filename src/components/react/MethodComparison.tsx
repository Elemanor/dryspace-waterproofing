import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Droplets,
  Shield,
  Wrench,
  ArrowDown,
  Waves,
  ShieldCheck,
  TreePine,
  Paintbrush,
  ChevronDown,
  ChevronUp,
  Check,
  Phone,
  Calendar,
} from 'lucide-react'

interface Method {
  id: string
  name: string
  aka: string
  description: string
  costRange: { min: number; max: number }
  costUnit: string
  timeline: string
  disruption: 'minimal' | 'low' | 'moderate' | 'high' | 'very high'
  warranty: string
  effectiveness: number
  bestFor: string[]
  notIdealFor: string[]
  permitRequired: string
  invasiveness: string
  pros: string[]
  cons: string[]
  icon: string
}

const methods: Method[] = [
  {
    id: 'interior-drainage',
    name: 'Interior Drainage System',
    aka: 'Interior weeping tile, French drain',
    description: 'Channels water from inside basement walls to a sump pump via a perimeter drainage system installed along the interior footing.',
    costRange: { min: 5000, max: 15000 },
    costUnit: 'per linear foot: $50-80',
    timeline: '3-5 days',
    disruption: 'moderate',
    warranty: '25 years (DrySpace)',
    effectiveness: 90,
    bestFor: ['Active water infiltration', 'Hydrostatic pressure', 'High water table', 'Cannot excavate exterior'],
    notIdealFor: ['Structural cracks', 'Foundation settlement', 'Exterior grade issues'],
    permitRequired: 'Usually no (varies by municipality)',
    invasiveness: 'Moderate — requires breaking concrete floor along perimeter',
    pros: ['Works in any season', 'No exterior excavation needed', 'Addresses hydrostatic pressure directly', 'Can be combined with sump pump', 'Lower cost than exterior'],
    cons: ['Doesn\'t stop water from entering walls', 'Requires sump pump maintenance', 'Floor trench visible until refinished', 'Doesn\'t address exterior drainage'],
    icon: 'Droplets',
  },
  {
    id: 'exterior-membrane',
    name: 'Exterior Waterproofing Membrane',
    aka: 'Exterior excavation, tar/rubber membrane',
    description: 'Full excavation around foundation, applying waterproof membrane (rubberized asphalt or spray-applied) to exterior walls, plus new drainage board and weeping tile.',
    costRange: { min: 15000, max: 40000 },
    costUnit: 'per linear foot: $150-250',
    timeline: '5-10 days',
    disruption: 'high',
    warranty: '25 years (DrySpace)',
    effectiveness: 97,
    bestFor: ['Severe water infiltration', 'Old/failing exterior waterproofing', 'Foundation wall repairs needed', 'New construction'],
    notIdealFor: ['Tight lot lines / no access', 'Winter months', 'Budget under $15K', 'Attached homes (shared walls)'],
    permitRequired: 'Sometimes (full perimeter usually yes)',
    invasiveness: 'High — requires full excavation to footing',
    pros: ['Stops water at the source', 'Highest effectiveness rating', 'Protects foundation structure', 'New drainage tile included', 'Longest-lasting solution'],
    cons: ['Most expensive option', 'Destroys landscaping/hardscaping', 'Weather dependent (no winter)', 'Requires heavy equipment access', 'Longer project timeline'],
    icon: 'Shield',
  },
  {
    id: 'crack-injection',
    name: 'Crack Injection Repair',
    aka: 'Epoxy injection, polyurethane injection',
    description: 'Injecting epoxy or polyurethane foam directly into foundation cracks from interior. Epoxy provides structural bonding; polyurethane is flexible and expands to fill voids.',
    costRange: { min: 400, max: 1500 },
    costUnit: 'per crack: $400-800',
    timeline: '2-4 hours per crack',
    disruption: 'minimal',
    warranty: 'Lifetime (DrySpace)',
    effectiveness: 85,
    bestFor: ['Non-structural hairline cracks', 'Single crack leaks', 'Poured concrete walls', 'Quick fix needed'],
    notIdealFor: ['Block/brick foundations', 'Structural cracks (horizontal)', 'Multiple crack sources', 'Hydrostatic pressure issues'],
    permitRequired: 'No',
    invasiveness: 'Minimal — small holes drilled along crack line',
    pros: ['Lowest cost option', 'Same-day fix', 'No excavation', 'No disruption to daily life', 'Permanent seal (lifetime warranty)'],
    cons: ['Only works on poured concrete', 'Doesn\'t address root cause', 'Not for structural issues', 'New cracks may appear nearby', 'Not effective for block walls'],
    icon: 'Wrench',
  },
  {
    id: 'underpinning',
    name: 'Underpinning (Basement Lowering)',
    aka: 'Bench footing, full underpinning',
    description: 'Deepening the existing foundation to increase basement ceiling height. Done in sections (pins) to maintain structural integrity. Includes new waterproofing and drainage.',
    costRange: { min: 30000, max: 80000 },
    costUnit: 'per linear foot: $250-500',
    timeline: '4-8 weeks',
    disruption: 'very high',
    warranty: '25 years structural (DrySpace)',
    effectiveness: 95,
    bestFor: ['Low ceiling height (<6.5 ft)', 'Creating legal basement apartment', 'Adding significant home value', 'Complete basement renovation'],
    notIdealFor: ['Budget constraints', 'Quick timeline needed', 'Already adequate ceiling height', 'Poor soil conditions without engineering'],
    permitRequired: 'Always required — building permit + engineered drawings',
    invasiveness: 'Very high — involves excavation under existing foundation',
    pros: ['Adds 20-30% to home value', 'Creates usable living space', 'Includes full waterproofing', 'Enables legal second unit', 'New concrete floor and drainage'],
    cons: ['Most expensive/disruptive option', 'Permit required (8-16 weeks)', 'Must vacate during some phases', 'Engineering drawings required ($3K-5K)', 'Structural risk if not done properly'],
    icon: 'ArrowDown',
  },
  {
    id: 'sump-pump',
    name: 'Sump Pump System',
    aka: 'Sump pit, submersible pump, battery backup',
    description: 'Installing a sump pit and pump to actively remove groundwater before it floods the basement. Modern systems include battery backup and smart monitoring.',
    costRange: { min: 1500, max: 4000 },
    costUnit: 'complete system: $1,500-3,500',
    timeline: '1-2 days',
    disruption: 'low',
    warranty: '5 years pump, 25 years pit (DrySpace)',
    effectiveness: 80,
    bestFor: ['High water table', 'Complementing interior drainage', 'Areas prone to power outages (with backup)', 'Recurring basement moisture'],
    notIdealFor: ['Sole solution for wall leaks', 'Areas without water table issues', 'Properties with no power for pump'],
    permitRequired: 'Sometimes (new installation in some municipalities)',
    invasiveness: 'Low — requires cutting one section of floor',
    pros: ['Affordable and effective', 'Quick installation', 'Rebate eligible ($1,750 Toronto)', 'Smart monitoring available', 'Battery backup option'],
    cons: ['Requires electricity (needs backup)', 'Annual maintenance needed', 'Pump has limited lifespan (7-10 years)', 'Doesn\'t fix the source of water', 'Noise when operating'],
    icon: 'Waves',
  },
  {
    id: 'backwater-valve',
    name: 'Backwater Valve',
    aka: 'Backflow preventer, sewer check valve',
    description: 'A valve installed on the main sewer line that prevents sewage from backing up into the basement during heavy rainfall when city sewers overflow.',
    costRange: { min: 800, max: 2500 },
    costUnit: 'installed: $1,200-2,000',
    timeline: '4-8 hours',
    disruption: 'low',
    warranty: '10 years (DrySpace)',
    effectiveness: 95,
    bestFor: ['Sewer backup prevention', 'Areas with combined sewers', 'Toronto flood protection subsidy', 'Insurance requirement'],
    notIdealFor: ['Groundwater issues (not sewer related)', 'Foundation cracks', 'Properties on septic systems'],
    permitRequired: 'Usually yes (plumbing permit)',
    invasiveness: 'Low — requires breaking small section of basement floor',
    pros: ['Prevents sewage backup (worst type of flooding)', 'Rebate eligible ($1,250 Toronto)', 'Insurance discount eligible', 'Low maintenance', 'Quick installation'],
    cons: ['Only prevents sewer backup (not groundwater)', 'Needs periodic inspection', 'Can\'t run water during backup event', 'Floor access point needed'],
    icon: 'ShieldCheck',
  },
  {
    id: 'exterior-drainage',
    name: 'Exterior Drainage (French Drain)',
    aka: 'Perimeter drain, curtain drain, swale',
    description: 'Installing drainage channels around the exterior of the foundation to redirect surface and subsurface water away from the home before it reaches the foundation walls.',
    costRange: { min: 3000, max: 12000 },
    costUnit: 'per linear foot: $40-80',
    timeline: '2-5 days',
    disruption: 'moderate',
    warranty: '15 years (DrySpace)',
    effectiveness: 85,
    bestFor: ['Surface water issues', 'Grading problems', 'Downspout drainage', 'Preventing water from reaching foundation'],
    notIdealFor: ['High water table', 'Hydrostatic pressure from below', 'Tight lots with no yard space'],
    permitRequired: 'Usually no',
    invasiveness: 'Moderate — requires yard excavation',
    pros: ['Addresses water at the source', 'Can improve yard drainage overall', 'No interior disruption', 'Can be combined with landscaping', 'Lower cost than full exterior membrane'],
    cons: ['Disrupts landscaping', 'Weather dependent', 'Doesn\'t address wall cracks', 'May not handle high water table', 'Requires slope for gravity drainage'],
    icon: 'TreePine',
  },
  {
    id: 'waterproof-coating',
    name: 'Interior Waterproof Coating',
    aka: 'Crystalline waterproofing, Drylok, Xypex',
    description: 'Applying waterproof coatings or crystalline products to interior basement walls. Creates a barrier or chemically reacts with concrete to block moisture migration.',
    costRange: { min: 1000, max: 5000 },
    costUnit: 'per sq ft: $3-8',
    timeline: '1-2 days',
    disruption: 'minimal',
    warranty: '5-10 years',
    effectiveness: 60,
    bestFor: ['Minor dampness/moisture', 'Condensation issues', 'Cosmetic improvement before finishing', 'Supplementary to other methods'],
    notIdealFor: ['Active water leaks', 'Hydrostatic pressure', 'Structural issues', 'Sole waterproofing solution'],
    permitRequired: 'No',
    invasiveness: 'Minimal — surface application only',
    pros: ['Lowest disruption option', 'DIY-friendly (basic products)', 'Quick application', 'Good supplementary measure', 'Affordable'],
    cons: ['Least effective as standalone', 'Can\'t stop pressurized water', 'May peel/fail over time', 'Doesn\'t address root cause', 'Not a structural solution'],
    icon: 'Paintbrush',
  },
]

const situations = [
  'Active water coming in',
  'Damp walls / musty smell',
  'Visible cracks (no water yet)',
  'Planning a basement renovation',
  'Recurring flooding after rain',
  'Selling home / home inspection issue',
]

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $30,000',
  '$30,000+',
  'Not sure yet',
]

const iconMap = {
  Droplets,
  Shield,
  Wrench,
  ArrowDown,
  Waves,
  ShieldCheck,
  TreePine,
  Paintbrush,
}

const getRecommendations = (situation: string | null, budget: string | null) => {
  if (!situation) return methods

  let recommended: string[] = []
  let secondary: string[] = []

  switch (situation) {
    case 'Active water coming in':
      recommended = ['interior-drainage', 'crack-injection']
      secondary = ['sump-pump', 'exterior-membrane']
      break
    case 'Damp walls / musty smell':
      recommended = ['waterproof-coating', 'sump-pump']
      secondary = ['interior-drainage', 'exterior-drainage']
      break
    case 'Visible cracks (no water yet)':
      recommended = ['crack-injection']
      secondary = ['exterior-membrane', 'interior-drainage']
      break
    case 'Planning a basement renovation':
      recommended = ['underpinning', 'interior-drainage', 'exterior-membrane']
      secondary = []
      break
    case 'Recurring flooding after rain':
      recommended = ['interior-drainage', 'sump-pump', 'backwater-valve']
      secondary = ['exterior-membrane', 'exterior-drainage']
      break
    case 'Selling home / home inspection issue':
      recommended = ['crack-injection', 'waterproof-coating']
      secondary = ['interior-drainage']
      break
    default:
      return methods
  }

  // Budget filtering
  let filteredMethods = methods.filter(m => {
    const inBudget = !budget || budget === 'Not sure yet' || (
      (budget === 'Under $5,000' && m.costRange.max <= 5000) ||
      (budget === '$5,000 - $15,000' && m.costRange.max <= 15000) ||
      (budget === '$15,000 - $30,000' && m.costRange.max <= 30000) ||
      (budget === '$30,000+')
    )
    return inBudget
  })

  // Sort by recommendation priority
  return filteredMethods.sort((a, b) => {
    const aRec = recommended.includes(a.id) ? 0 : secondary.includes(a.id) ? 1 : 2
    const bRec = recommended.includes(b.id) ? 0 : secondary.includes(b.id) ? 1 : 2
    if (aRec !== bRec) return aRec - bRec
    return b.effectiveness - a.effectiveness
  })
}

const getBestMatch = (situation: string | null, budget: string | null): string | null => {
  if (!situation) return null

  const recommendations = getRecommendations(situation, budget)
  if (recommendations.length === 0) return null

  // Budget-specific logic
  if (situation === 'Active water coming in') {
    if (budget === 'Under $5,000') return 'crack-injection'
    return 'interior-drainage'
  }
  if (situation === 'Planning a basement renovation') {
    if (budget === '$30,000+') return 'underpinning'
    return 'interior-drainage'
  }

  return recommendations[0]?.id || null
}

export default function MethodComparison() {
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<Set<string>>(new Set())

  const filteredMethods = getRecommendations(selectedSituation, selectedBudget)
  const bestMatchId = getBestMatch(selectedSituation, selectedBudget)

  const toggleExpanded = (id: string) => {
    const newSet = new Set(expandedCards)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedCards(newSet)
  }

  const toggleComparison = (id: string) => {
    const newSet = new Set(selectedForComparison)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      if (newSet.size >= 3) return // Max 3
      newSet.add(id)
    }
    setSelectedForComparison(newSet)
  }

  const getDisruptionColor = (disruption: string) => {
    switch (disruption) {
      case 'minimal':
      case 'low':
        return 'bg-green-500/20 text-green-300'
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300'
      case 'high':
      case 'very high':
        return 'bg-red-500/20 text-red-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return 'bg-green-500'
    if (effectiveness >= 70) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const formatCost = (min: number, max: number) => {
    const format = (n: number) => {
      if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
      return `$${n}`
    }
    return `${format(min)} - ${format(max)}`
  }

  const comparedMethods = methods.filter(m => selectedForComparison.has(m.id))

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Waterproofing Method Comparison Tool
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Not sure which waterproofing solution is right for you? Use our comparison tool to find the best approach for your specific situation and budget.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => {
              setComparisonMode(!comparisonMode)
              if (!comparisonMode) {
                setSelectedForComparison(new Set())
              }
            }}
            variant="outline"
            className="bg-slate-800 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
          >
            {comparisonMode ? 'Back to Quick Filter' : 'Compare Methods Side-by-Side'}
          </Button>
        </div>

        {!comparisonMode ? (
          <>
            {/* Quick Filter Section */}
            <div className="mb-12 space-y-8">
              {/* Situation Filter */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                  What's your situation?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {situations.map((situation) => (
                    <button
                      key={situation}
                      onClick={() => setSelectedSituation(
                        selectedSituation === situation ? null : situation
                      )}
                      className={cn(
                        'px-4 py-2 rounded-lg border-2 transition-all',
                        selectedSituation === situation
                          ? 'bg-cyan-500 border-cyan-500 text-slate-900 font-semibold'
                          : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-cyan-400'
                      )}
                    >
                      {situation}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                  Budget range?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedBudget(
                        selectedBudget === range ? null : range
                      )}
                      className={cn(
                        'px-4 py-2 rounded-lg border-2 transition-all',
                        selectedBudget === range
                          ? 'bg-cyan-500 border-cyan-500 text-slate-900 font-semibold'
                          : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-cyan-400'
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {filteredMethods.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="py-12 text-center">
                    <p className="text-slate-300 text-lg">
                      No methods match your budget criteria. Consider increasing your budget or selecting "Not sure yet" to see all options.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredMethods.map((method) => {
                  const Icon = iconMap[method.icon as keyof typeof iconMap] || Wrench
                  const isExpanded = expandedCards.has(method.id)
                  const isBestMatch = method.id === bestMatchId

                  return (
                    <Card
                      key={method.id}
                      className={cn(
                        'bg-slate-800 border-slate-700 transition-all',
                        isBestMatch && 'border-cyan-400 border-2 shadow-lg shadow-cyan-500/20'
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-cyan-500 p-3 rounded-lg shrink-0">
                              <Icon className="w-6 h-6 text-slate-900" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl text-white">
                                  {method.name}
                                </CardTitle>
                                {isBestMatch && (
                                  <Badge className="bg-cyan-500 text-slate-900 border-0">
                                    Best Match
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-cyan-400 mb-2">
                                {method.aka}
                              </p>
                              <p className="text-slate-300 text-sm">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Effectiveness Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Effectiveness</span>
                            <span className="text-sm font-semibold text-white">
                              {method.effectiveness}%
                            </span>
                          </div>
                          <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'absolute left-0 top-0 h-full transition-all',
                                getEffectivenessColor(method.effectiveness)
                              )}
                              style={{ width: `${method.effectiveness}%` }}
                            />
                          </div>
                        </div>

                        {/* Key Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Cost Range</p>
                            <p className="text-lg font-bold text-cyan-400">
                              {formatCost(method.costRange.min, method.costRange.max)}
                            </p>
                            <p className="text-xs text-slate-400">{method.costUnit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Timeline</p>
                            <p className="text-sm font-semibold text-white">
                              {method.timeline}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Disruption</p>
                            <Badge className={cn('text-xs', getDisruptionColor(method.disruption))}>
                              {method.disruption}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Permit?</p>
                            <p className="text-sm text-white">{method.permitRequired.split('—')[0]}</p>
                          </div>
                        </div>

                        {/* Best For Tags */}
                        <div>
                          <p className="text-sm font-semibold text-cyan-400 mb-2">Best For:</p>
                          <div className="flex flex-wrap gap-2">
                            {method.bestFor.map((item, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-slate-700 border-slate-600 text-slate-200"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="border-t border-slate-700 pt-4 space-y-4 animate-in slide-in-from-top-2">
                            <div>
                              <p className="text-sm font-semibold text-amber-400 mb-2">
                                Not Ideal For:
                              </p>
                              <ul className="space-y-1">
                                {method.notIdealFor.map((item, idx) => (
                                  <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                    <span className="text-amber-400 mt-1">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-semibold text-green-400 mb-2">
                                  Pros:
                                </p>
                                <ul className="space-y-1">
                                  {method.pros.map((pro, idx) => (
                                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                      {pro}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-red-400 mb-2">
                                  Cons:
                                </p>
                                <ul className="space-y-1">
                                  {method.cons.map((con, idx) => (
                                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                      <span className="text-red-400 mt-1">•</span>
                                      {con}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-lg">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Warranty</p>
                                <p className="text-sm text-white">{method.warranty}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">Invasiveness</p>
                                <p className="text-sm text-white">{method.invasiveness}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Expand Button */}
                        <Button
                          onClick={() => toggleExpanded(method.id)}
                          variant="ghost"
                          className="w-full text-cyan-400 hover:text-cyan-300 hover:bg-slate-700"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Show Full Details
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </>
        ) : (
          <>
            {/* Comparison Mode */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                Select 2-3 methods to compare
                <span className="text-sm text-slate-400 ml-2">
                  ({selectedForComparison.size}/3 selected)
                </span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {methods.map((method) => {
                  const Icon = iconMap[method.icon as keyof typeof iconMap] || Wrench
                  const isSelected = selectedForComparison.has(method.id)

                  return (
                    <button
                      key={method.id}
                      onClick={() => toggleComparison(method.id)}
                      disabled={!isSelected && selectedForComparison.size >= 3}
                      className={cn(
                        'p-4 rounded-lg border-2 transition-all text-left',
                        isSelected
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'bg-slate-800 border-slate-600 hover:border-cyan-400',
                        !isSelected && selectedForComparison.size >= 3 && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={cn(
                          'w-5 h-5',
                          isSelected ? 'text-slate-900' : 'text-cyan-400'
                        )} />
                        <span className={cn(
                          'font-semibold text-sm',
                          isSelected ? 'text-slate-900' : 'text-white'
                        )}>
                          {method.name}
                        </span>
                      </div>
                      <p className={cn(
                        'text-xs',
                        isSelected ? 'text-slate-800' : 'text-slate-400'
                      )}>
                        {formatCost(method.costRange.min, method.costRange.max)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Comparison Table */}
            {comparedMethods.length >= 2 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="p-4 text-left text-cyan-400 font-semibold border border-slate-700">
                        Comparison
                      </th>
                      {comparedMethods.map((method) => {
                        const Icon = iconMap[method.icon as keyof typeof iconMap] || Wrench
                        return (
                          <th
                            key={method.id}
                            className="p-4 text-left border border-slate-700"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-cyan-400" />
                              <span className="text-white font-semibold">
                                {method.name}
                              </span>
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Cost Range Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Cost Range
                      </td>
                      {comparedMethods.map((method, idx) => {
                        const minCost = Math.min(...comparedMethods.map(m => m.costRange.min))
                        const isWinner = method.costRange.min === minCost
                        return (
                          <td
                            key={method.id}
                            className={cn(
                              'p-4 border border-slate-700',
                              isWinner && 'bg-green-500/10'
                            )}
                          >
                            <p className="font-bold text-cyan-400">
                              {formatCost(method.costRange.min, method.costRange.max)}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{method.costUnit}</p>
                            {isWinner && (
                              <Badge className="mt-2 bg-green-500 text-slate-900 border-0 text-xs">
                                Lowest Cost
                              </Badge>
                            )}
                          </td>
                        )
                      })}
                    </tr>

                    {/* Timeline Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Timeline
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <p className="text-white">{method.timeline}</p>
                        </td>
                      ))}
                    </tr>

                    {/* Effectiveness Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Effectiveness
                      </td>
                      {comparedMethods.map((method) => {
                        const maxEff = Math.max(...comparedMethods.map(m => m.effectiveness))
                        const isWinner = method.effectiveness === maxEff
                        return (
                          <td
                            key={method.id}
                            className={cn(
                              'p-4 border border-slate-700',
                              isWinner && 'bg-green-500/10'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Progress
                                value={method.effectiveness}
                                className="h-2"
                              />
                              <span className="text-white font-semibold whitespace-nowrap">
                                {method.effectiveness}%
                              </span>
                            </div>
                            {isWinner && (
                              <Badge className="mt-2 bg-green-500 text-slate-900 border-0 text-xs">
                                Most Effective
                              </Badge>
                            )}
                          </td>
                        )
                      })}
                    </tr>

                    {/* Disruption Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Disruption Level
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <Badge className={getDisruptionColor(method.disruption)}>
                            {method.disruption}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Warranty Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Warranty
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <p className="text-white">{method.warranty}</p>
                        </td>
                      ))}
                    </tr>

                    {/* Permit Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Permit Required
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <p className="text-white text-sm">{method.permitRequired}</p>
                        </td>
                      ))}
                    </tr>

                    {/* Best For Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Best For
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <ul className="space-y-1">
                            {method.bestFor.map((item, idx) => (
                              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                <Check className="w-3 h-3 text-green-400 shrink-0 mt-1" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Not Ideal For Row */}
                    <tr>
                      <td className="p-4 font-semibold text-slate-300 bg-slate-800 border border-slate-700">
                        Not Ideal For
                      </td>
                      {comparedMethods.map((method) => (
                        <td key={method.id} className="p-4 border border-slate-700">
                          <ul className="space-y-1">
                            {method.notIdealFor.map((item, idx) => (
                              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-red-400 mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {comparedMethods.length < 2 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-12 text-center">
                  <p className="text-slate-300 text-lg">
                    Select at least 2 methods above to see the comparison table.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Bottom CTA Section */}
        <Card className="mt-12 bg-gradient-to-br from-cyan-500 to-cyan-600 border-0">
          <CardContent className="py-8 px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Not sure which is right for you?
              </h3>
              <p className="text-slate-800 mb-6">
                Book a free inspection and our experts will recommend the best approach for your specific situation. No obligation, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  <a href="/free-inspection">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Inspection
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  <a href="tel:437-545-0067">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: 437-545-0067
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
