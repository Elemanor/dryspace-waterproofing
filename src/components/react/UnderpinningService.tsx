"use client"

import * as React from "react"
import { 
  Calculator,
  Home,
  DollarSign,
  Clock,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Building,
  Hammer,
  Ruler,
  FileText,
  MapPin,
  Phone,
  ChevronRight,
  Info,
  ArrowRight,
  Zap,
  Users,
  Calendar,
  BarChart3,
  Layers,
  Sparkles,
  BadgeCheck,
  CircleDollarSign,
  HardHat,
  Wrench
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Method comparison data
const underpinningMethods = [
  {
    id: "traditional",
    name: "Traditional Underpinning",
    description: "Maximum space utilization with straight foundation walls",
    price: "$45-55/sq ft",
    timeline: "5-6 weeks",
    spaceUtilization: "100%",
    ceilingHeight: "8'6\" - 9'",
    valueAdded: "$420-500/sq ft",
    roi: "120-140%",
    pros: [
      "Maximum usable floor space",
      "Full ceiling height throughout",
      "Allows walkout entrances",
      "Best for rental suites"
    ],
    cons: [
      "Higher initial investment",
      "Longer construction time",
      "More complex engineering"
    ],
    bestFor: "Rental income maximization",
    color: "blue"
  },
  {
    id: "bench",
    name: "Bench Footing Method",
    description: "Cost-effective solution with perimeter bench",
    price: "$35-45/sq ft",
    timeline: "3-4 weeks",
    spaceUtilization: "75%",
    ceilingHeight: "8' - 8'6\"",
    valueAdded: "$350-420/sq ft",
    roi: "100-120%",
    pros: [
      "Lower cost option",
      "Faster completion",
      "Less structural risk",
      "Bench provides storage"
    ],
    cons: [
      "Reduced floor space",
      "Bench along perimeter",
      "Limited layout options"
    ],
    bestFor: "Budget-conscious projects",
    color: "green"
  }
];

// Process timeline data
const processSteps = [
  {
    phase: "Engineering & Permits",
    duration: "2-3 weeks",
    icon: FileText,
    color: "blue",
    tasks: [
      "Structural assessment",
      "Engineering drawings",
      "City permit application",
      "Utility coordination"
    ]
  },
  {
    phase: "Excavation & Shoring",
    duration: "1 week",
    icon: HardHat,
    color: "yellow",
    tasks: [
      "Hand excavation in sections",
      "Steel shoring installation",
      "Foundation exposure",
      "Dewatering if needed"
    ]
  },
  {
    phase: "Foundation Construction",
    duration: "1-2 weeks",
    icon: Building,
    color: "green",
    tasks: [
      "Rebar reinforcement",
      "Concrete footing pour",
      "Wall construction",
      "Waterproof membrane"
    ]
  },
  {
    phase: "Finishing & Drainage",
    duration: "3-5 days",
    icon: CheckCircle,
    color: "purple",
    tasks: [
      "Weeping tile installation",
      "Sump pump connection",
      "Backfilling",
      "New floor pour"
    ]
  }
];

// Toronto-specific challenges
const torontoChallenges = [
  {
    title: "Clay Soil Conditions",
    description: "Toronto's expansive clay requires specialized techniques",
    icon: Layers,
    solution: "Engineered drainage and proper backfill materials"
  },
  {
    title: "High Water Table",
    description: "Near-lake properties face groundwater challenges",
    icon: Wrench,
    solution: "Comprehensive waterproofing and sump pump systems"
  },
  {
    title: "Heritage Homes",
    description: "Pre-1920 stone/brick foundations need special care",
    icon: Home,
    solution: "Heritage-appropriate reinforcement techniques"
  },
  {
    title: "Utility Relocation",
    description: "Complex utility layouts in older neighborhoods",
    icon: Zap,
    solution: "Coordinated utility relocation and protection"
  }
];

// FAQs
const faqs = [
  {
    question: "How much does basement underpinning cost in Toronto?",
    answer: "Underpinning typically costs $35,000-$55,000 for an average Toronto home (1000 sq ft basement). Traditional underpinning runs $45-55/sq ft while bench footing is $35-45/sq ft. This includes engineering, permits, excavation, foundation work, waterproofing, and finishing. The investment typically adds $350-500/sq ft in home value."
  },
  {
    question: "What's the return on investment for underpinning?",
    answer: "Underpinning offers exceptional ROI: typically 120-140% immediate value increase, plus $25,000-35,000 annual rental income potential. Most projects pay for themselves in 1.5-3 years through rental income alone. Adding 800-1200 sq ft of legal living space is worth $350-500/sq ft in Toronto's market."
  },
  {
    question: "How long does underpinning take?",
    answer: "Most underpinning projects take 3-6 weeks total: 2-3 weeks for engineering and permits, 1 week for excavation, 1-2 weeks for foundation work, and 3-5 days for finishing. You can typically remain in your home during construction as we work in sections to maintain stability."
  },
  {
    question: "Do I need permits for underpinning in Toronto?",
    answer: "Yes, all underpinning requires structural engineering and City of Toronto building permits. Our licensed engineers handle all permit applications, structural drawings, and inspections. Permits typically take 2-3 weeks for approval and cost $2,000-4,000 depending on project scope."
  },
  {
    question: "Traditional vs bench footing - which is better?",
    answer: "Traditional underpinning maximizes space (100% utilization) but costs more. Bench footing is 20-30% cheaper and faster but reduces floor space by about 25%. Traditional is best for rental suites and maximum ROI. Bench footing works well for recreation rooms and storage needs."
  },
  {
    question: "Can underpinning create legal rental income?",
    answer: "Yes! Underpinning creates legal ceiling height (8-9 feet) required for habitable space. This allows for legal secondary suites generating $2,500-3,500/month in Toronto. We ensure all work meets Ontario Building Code requirements for legal rental units."
  }
];

export function UnderpinningService() {
  const [basementSize, setBasementSize] = React.useState([1000]);
  const [homeValue, setHomeValue] = React.useState([1200000]);
  const [method, setMethod] = React.useState("traditional");
  const [selectedTab, setSelectedTab] = React.useState("overview");

  // ROI Calculations
  const calculateROI = React.useMemo(() => {
    const size = basementSize[0];
    const value = homeValue[0];
    const isTraditional = method === "traditional";
    
    const costPerSqFt = isTraditional ? 50 : 40;
    const valuePerSqFt = isTraditional ? 450 : 385;
    const monthlyRent = isTraditional ? 3000 : 2500;
    
    const investment = size * costPerSqFt;
    const addedValue = size * valuePerSqFt;
    const annualRental = monthlyRent * 12;
    const paybackYears = investment / annualRental;
    const roi = ((addedValue - investment) / investment) * 100;
    const homeValueIncrease = value * 0.20; // 20% increase
    
    return {
      investment,
      addedValue,
      annualRental,
      monthlyRent,
      paybackYears,
      roi,
      homeValueIncrease,
      totalValue: addedValue + homeValueIncrease
    };
  }, [basementSize, homeValue, method]);

  const colorMap = {
    blue: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-blue-200" },
    green: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-green-200" },
    yellow: { bg: "bg-amber-50", text: "text-amber-500", border: "border-yellow-200" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-amber-500 text-black">
              <TrendingUp className="mr-1 h-3 w-3" />
              Add $150K-$300K Value
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Basement Underpinning Toronto
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transform your Toronto basement into valuable living space. Lower basement floor for additional headroom. 
              Increase property value by 15-20% with professional underpinning.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="outline" className="text-white border-white px-4 py-2">
                <CircleDollarSign className="mr-2 h-4 w-4" />
                $350-500/sq ft Value Increase
              </Badge>
              <Badge variant="outline" className="text-white border-white px-4 py-2">
                <Home className="mr-2 h-4 w-4" />
                $25K-35K Annual Rental Income
              </Badge>
              <Badge variant="outline" className="text-white border-white px-4 py-2">
                <Shield className="mr-2 h-4 w-4" />
                25-Year Warranty
              </Badge>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-amber-500 text-black hover:bg-amber-400">
                Get Free Inspection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <a href="tel:437-545-0067">
                  <Phone className="mr-2 h-5 w-5" />
                  437-545-0067
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
              <TabsTrigger value="overview" className="flex flex-col py-3">
                <Home className="h-4 w-4 mb-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex flex-col py-3">
                <Calculator className="h-4 w-4 mb-1" />
                ROI Calculator
              </TabsTrigger>
              <TabsTrigger value="methods" className="flex flex-col py-3">
                <Layers className="h-4 w-4 mb-1" />
                Methods
              </TabsTrigger>
              <TabsTrigger value="process" className="flex flex-col py-3">
                <Clock className="h-4 w-4 mb-1" />
                Process
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex flex-col py-3">
                <Info className="h-4 w-4 mb-1" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">What is Basement Underpinning?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Basement underpinning is the process of lowering your basement floor to create additional headroom and usable 
                    living space. This structural enhancement not only adds valuable square footage to your home but can increase 
                    property value by 15-20%.
                  </p>
                  <p className="text-slate-600">
                    Perfect for Toronto's older homes with low basement ceilings (under 6 feet), underpinning transforms 
                    dark, cramped basements into bright, functional living areas with 8-9 foot ceilings.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-cyan-50 border-green-200">
                      <CardContent className="pt-6 text-center">
                        <TrendingUp className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                        <p className="font-semibold">15-20% Value Increase</p>
                        <p className="text-sm text-slate-600">Immediate property value boost</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyan-50 border-blue-200">
                      <CardContent className="pt-6 text-center">
                        <Home className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                        <p className="font-semibold">800-1200 sq ft Added</p>
                        <p className="text-sm text-slate-600">Legal living space created</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="pt-6 text-center">
                        <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-semibold">$2,500-3,500/month</p>
                        <p className="text-sm text-slate-600">Rental income potential</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Primary Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Create legal secondary suite for rental income",
                      "Add 800-1,200 sq ft of valuable living space",
                      "Increase ceiling height from 5-6' to 8-9'",
                      "Strengthen and stabilize foundation",
                      "Opportunity for complete waterproofing",
                      "Add walkout entrance or egress windows"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Advantages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "$350-500 per sq ft value added",
                      "$25,000-35,000 annual rental income",
                      "1.5-3 year payback period",
                      "Costs less than moving to larger home",
                      "Avoid land transfer tax and moving costs",
                      "25-year transferable warranty adds value"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CircleDollarSign className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Toronto Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle>Toronto-Specific Considerations</CardTitle>
                  <CardDescription>Unique challenges we handle expertly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {torontoChallenges.map((challenge, index) => {
                      const Icon = challenge.icon;
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="p-2 rounded-lg bg-orange-50">
                              <Icon className="h-5 w-5 text-orange-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{challenge.title}</h4>
                            <p className="text-sm text-slate-600 mb-2">{challenge.description}</p>
                            <p className="text-sm text-cyan-600 font-medium">
                              Solution: {challenge.solution}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ROI Calculator Tab */}
            <TabsContent value="calculator" className="space-y-6">
              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">ROI Calculator</CardTitle>
                  <CardDescription>Calculate your underpinning return on investment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Controls */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Basement Size: {basementSize[0]} sq ft</Label>
                        <Slider
                          value={basementSize}
                          onValueChange={setBasementSize}
                          min={600}
                          max={1500}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>600 sq ft</span>
                          <span>1500 sq ft</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Current Home Value: ${(homeValue[0] / 1000).toFixed(0)}K</Label>
                        <Slider
                          value={homeValue}
                          onValueChange={setHomeValue}
                          min={600000}
                          max={2000000}
                          step={50000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>$600K</span>
                          <span>$2M</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Underpinning Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="traditional">Traditional Underpinning (Max Space)</SelectItem>
                            <SelectItem value="bench">Bench Footing (Lower Cost)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Results Display */}
                    <div className="space-y-4">
                      <Card className="bg-white">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Your Investment Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-slate-600">Project Investment:</span>
                            <span className="font-bold text-lg">
                              ${calculateROI.investment.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-slate-600">Added Home Value:</span>
                            <span className="font-bold text-lg text-cyan-600">
                              ${calculateROI.addedValue.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-slate-600">Monthly Rental Income:</span>
                            <span className="font-bold text-lg text-cyan-600">
                              ${calculateROI.monthlyRent.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-slate-600">Annual Rental Income:</span>
                            <span className="font-bold text-lg text-cyan-600">
                              ${calculateROI.annualRental.toLocaleString()}
                            </span>
                          </div>
                          <div className="bg-cyan-50 p-4 rounded-lg mt-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold">Payback Period:</span>
                              <span className="font-bold text-cyan-600">
                                {calculateROI.paybackYears.toFixed(1)} years
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">Total ROI:</span>
                              <span className="font-bold text-cyan-600 text-xl">
                                {calculateROI.roi.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* ROI Comparison Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-cyan-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Underpinning</h4>
                          <p className="text-2xl font-bold text-cyan-600">{calculateROI.roi.toFixed(0)}% ROI</p>
                          <p className="text-sm text-slate-600 mt-1">${calculateROI.investment.toLocaleString()} investment</p>
                          <p className="text-sm text-cyan-600">${calculateROI.addedValue.toLocaleString()} value added</p>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Home Addition</h4>
                          <p className="text-2xl font-bold text-amber-500">65-75% ROI</p>
                          <p className="text-sm text-slate-600 mt-1">$800-1200/sq ft cost</p>
                          <p className="text-sm text-amber-500">Permits & disruption</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Moving Costs</h4>
                          <p className="text-2xl font-bold text-red-600">0% ROI</p>
                          <p className="text-sm text-slate-600 mt-1">Land transfer tax</p>
                          <p className="text-sm text-red-600">Lost investment</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                      Get Custom Quote
                      <Calculator className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline">
                      Download ROI Report
                      <BarChart3 className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Methods Tab */}
            <TabsContent value="methods" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {underpinningMethods.map((method) => {
                  const colors = colorMap[method.color as keyof typeof colorMap];
                  return (
                    <Card key={method.id} className="relative overflow-hidden">
                      <div className={cn("absolute top-0 left-0 right-0 h-2", 
                        method.color === "blue" ? "bg-cyan-500" : "bg-cyan-500")} />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{method.name}</CardTitle>
                            <CardDescription className="mt-2">{method.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className={colors.badge}>
                            {method.bestFor}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-500">Investment</p>
                              <p className="font-bold">{method.price}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Timeline</p>
                              <p className="font-bold">{method.timeline}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Space Utilization</p>
                              <p className="font-bold">{method.spaceUtilization}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-500">Ceiling Height</p>
                              <p className="font-bold">{method.ceilingHeight}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Value Added</p>
                              <p className="font-bold text-cyan-600">{method.valueAdded}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">ROI</p>
                              <p className="font-bold text-cyan-600">{method.roi}</p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Pros and Cons */}
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold text-sm mb-2 text-cyan-600">Advantages</p>
                            <ul className="space-y-1">
                              {method.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-sm mb-2 text-orange-600">Considerations</p>
                            <ul className="space-y-1">
                              {method.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={method.id === "traditional" ? "default" : "outline"}>
                          Get Quote for {method.name}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {/* Method Selection Helper */}
              <Alert className="border-blue-200 bg-cyan-50">
                <Info className="h-5 w-5 text-cyan-600" />
                <AlertTitle className="text-cyan-800">Which Method is Right for You?</AlertTitle>
                <AlertDescription className="text-cyan-700 space-y-2 mt-2">
                  <p><strong>Choose Traditional Underpinning if:</strong> You want maximum space for a rental suite, need every square foot, or plan to add a walkout entrance.</p>
                  <p><strong>Choose Bench Footing if:</strong> You're on a budget, want faster completion, or don't mind losing some perimeter space for storage.</p>
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-6">
              {/* Timeline Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Complete Project Timeline</CardTitle>
                  <CardDescription>From consultation to completion in 3-6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Progress Bar */}
                    <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-slate-200" />
                    
                    {/* Process Steps */}
                    <div className="space-y-8">
                      {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        const colors = colorMap[step.color as keyof typeof colorMap];
                        
                        return (
                          <div key={index} className="flex gap-4">
                            <div className="relative z-10">
                              <div className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center",
                                colors.bg, colors.border, "border-2"
                              )}>
                                <Icon className={cn("h-6 w-6", colors.text)} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{step.phase}</h3>
                                <Badge variant="outline">{step.duration}</Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.tasks.map((task, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                                    <span className="text-sm text-slate-600">{task}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Living Arrangements */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Staying in Your Home</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Most clients remain in their homes during underpinning. We work in sections to maintain stability.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Main floor remains fully functional",
                        "Utilities relocated safely during work",
                        "Daily cleanup minimizes disruption",
                        "Work hours: 8AM-5PM weekdays only",
                        "Weekend access to basement maintained"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What to Expect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600">
                      We maintain clear communication throughout your project with daily updates.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Some noise during excavation/concrete work",
                        "Temporary basement storage relocation",
                        "Scheduled utility shutoffs (advance notice)",
                        "Daily progress reports with photos",
                        "Dedicated project manager assigned"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Permit & Code Requirements */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle>Toronto Building Code Requirements</CardTitle>
                  <CardDescription>All work meets or exceeds Ontario Building Code standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Habitable Space Requirements</h4>
                      <ul className="space-y-2">
                        {[
                          "Minimum ceiling height: 6'5\" (2.0m)",
                          "Minimum room size: 70 sq ft for bedrooms",
                          "Natural light: Windows = 10% of floor area",
                          "Emergency egress: Window or separate entrance",
                          "Proper waterproofing below grade"
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Badge className="h-1 w-1 p-0 mt-2" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Secondary Suite Regulations</h4>
                      <ul className="space-y-2">
                        {[
                          "Maximum 40% of total home square footage",
                          "Separate entrance not required in Toronto",
                          "Kitchen facilities permitted",
                          "Fire separation requirements apply",
                          "Sound insulation between units required"
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Badge className="h-1 w-1 p-0 mt-2" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Everything you need to know about basement underpinning</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Alert className="border-green-200 bg-cyan-50">
                <Phone className="h-5 w-5 text-cyan-600" />
                <AlertTitle className="text-cyan-800">Have More Questions?</AlertTitle>
                <AlertDescription className="text-cyan-700">
                  <p className="mb-4">Our underpinning experts are ready to answer all your questions and provide a free consultation.</p>
                  <div className="flex gap-3">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      Schedule Consultation
                      <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-green-600 text-cyan-700 hover:bg-cyan-50" asChild>
                      <a href="tel:437-545-0067">
                        <Phone className="mr-2 h-4 w-4" />
                        437-545-0067
                      </a>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Basement?</h2>
          <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
            Get a free inspection and custom quote for your underpinning project. 
            Add valuable living space and increase your home's value today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-amber-500 text-black hover:bg-amber-400">
              Schedule Free Inspection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Download ROI Guide
              <Calculator className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UnderpinningService;