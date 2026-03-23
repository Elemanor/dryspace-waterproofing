"use client"

import * as React from "react"
import { 
  Calculator, Home, DollarSign, Clock, Shield, Award, TrendingUp,
  CheckCircle, AlertCircle, Building, Hammer, Ruler, FileText,
  MapPin, Phone, ChevronRight, Info, ArrowRight, Zap, Users,
  Calendar, BarChart3, Layers, Sparkles, BadgeCheck, CircleDollarSign,
  HardHat, Wrench, Star, Download, Play, ExternalLink, Share2,
  MessageSquare, CreditCard, BookOpen, AlertTriangle, ChevronDown
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Related services for internal linking
const relatedServices = [
  { name: "Exterior Waterproofing", href: "/services/exterior-waterproofing", icon: Shield },
  { name: "Interior Waterproofing", href: "/services/interior-waterproofing", icon: Home },
  { name: "Foundation Repair", href: "/services/foundation-repair", icon: Building },
  { name: "French Drain Systems", href: "/services/french-drain", icon: Layers },
  { name: "Sump Pump Installation", href: "/services/sump-pump-installation", icon: Zap },
  { name: "Emergency Service", href: "/services/emergency-waterproofing", icon: AlertTriangle }
];

// Service areas for internal linking
const serviceAreas = [
  { name: "Toronto", href: "/locations/toronto" },
  { name: "Mississauga", href: "/locations/mississauga" },
  { name: "Brampton", href: "/locations/brampton" },
  { name: "Vaughan", href: "/locations/vaughan" },
  { name: "Markham", href: "/locations/markham" },
  { name: "North York", href: "/locations/north-york" }
];

// Testimonials data
const testimonials = [
  {
    name: "John M.",
    location: "Toronto",
    rating: 5,
    text: "Underpinning added 9 feet of ceiling height to our basement. Now renting for $3,200/month!",
    project: "Traditional Underpinning",
    value: "$280K added value"
  },
  {
    name: "Sarah L.",
    location: "Mississauga",
    rating: 5,
    text: "Professional team, finished on time. The bench method saved us money and looks great.",
    project: "Bench Footing",
    value: "$180K added value"
  },
  {
    name: "Mike R.",
    location: "Brampton",
    rating: 5,
    text: "Investment paid for itself in 2 years through rental income. Best decision ever!",
    project: "Traditional Underpinning",
    value: "$2,800/month rental"
  }
];

// Certifications and warranties
const certifications = [
  { name: "Licensed Structural Engineers", icon: Award },
  { name: "City of Toronto Permits", icon: FileText },
  { name: "25-Year Transferable Warranty", icon: Shield },
  { name: "WSIB Coverage", icon: BadgeCheck },
  { name: "$5M Liability Insurance", icon: Shield },
  { name: "HomeStars Verified", icon: Star }
];

// Financing options
const financingOptions = [
  { 
    type: "0% for 12 Months",
    description: "No interest for first year",
    minAmount: "$15,000",
    requirements: "Approved credit"
  },
  {
    type: "Low Monthly Payments",
    description: "As low as $299/month",
    minAmount: "$10,000",
    requirements: "5-year term"
  },
  {
    type: "Home Equity Line",
    description: "Use your home equity",
    minAmount: "No minimum",
    requirements: "Equity available"
  }
];

// Method comparison data
const underpinningMethods = [
  {
    id: "traditional",
    name: "Traditional Underpinning",
    description: "Maximum space utilization with straight foundation walls",
    price: "$50-60/sq ft",
    timeline: "5-6 weeks",
    spaceUtilization: "100%",
    ceilingHeight: "8'6\" - 9'",
    valueAdded: "$450-500/sq ft",
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
    price: "$40-50/sq ft",
    timeline: "3-4 weeks",
    spaceUtilization: "75%",
    ceilingHeight: "8' - 8'6\"",
    valueAdded: "$385-420/sq ft",
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
    phase: "Planning & Permits",
    duration: "2-3 weeks",
    description: "Engineering assessment, drawings, City permits",
    tasks: [
      "Site inspection & measurements",
      "Structural engineering plans",
      "City permit application",
      "Utility locates"
    ],
    icon: FileText
  },
  {
    phase: "Excavation & Shoring",
    duration: "1 week",
    description: "Careful excavation with temporary supports",
    tasks: [
      "Hand excavation in sections",
      "Install steel shoring",
      "Dewatering if needed",
      "Foundation exposure"
    ],
    icon: Hammer
  },
  {
    phase: "Foundation Construction",
    duration: "1-2 weeks",
    description: "New foundation walls and footings",
    tasks: [
      "Rebar installation",
      "Concrete footings",
      "Wall construction",
      "Waterproof membrane"
    ],
    icon: Building
  },
  {
    phase: "Finishing & Drainage",
    duration: "3-5 days",
    description: "Final touches and drainage systems",
    tasks: [
      "Weeping tile installation",
      "Sump pump connection",
      "New concrete floor",
      "Final inspections"
    ],
    icon: CheckCircle
  }
];

// FAQ data
const faqs = [
  {
    question: "How much does basement underpinning cost in Toronto?",
    answer: "Underpinning typically costs $40,000-80,000 for an average Toronto home. Traditional underpinning runs $50-60/sq ft while bench footing costs $40-50/sq ft. All projects include engineering, permits, and warranty. The investment typically adds $350-500/sq ft in home value."
  },
  {
    question: "What's the ROI on underpinning?",
    answer: "Excellent! Most projects see 120-140% ROI through increased home value alone. Add rental income of $2,500-3,500/month and the payback period is typically 2-3 years. A $50,000 investment often adds $150,000-250,000 in property value."
  },
  {
    question: "Can I live in my home during underpinning?",
    answer: "Yes, most families stay in their homes during underpinning. We work in sections to maintain structural integrity. The main floor remains fully functional. Some noise and dust are expected during work hours (8am-5pm weekdays)."
  },
  {
    question: "Do I need permits for underpinning?",
    answer: "Yes, all underpinning requires City of Toronto building permits and structural engineering. We handle everything - engineering assessments, permit applications, and inspections. Permits typically take 2-3 weeks for approval."
  },
  {
    question: "What's better - traditional or bench footing?",
    answer: "It depends on your goals. Traditional maximizes space and is best for rental suites but costs more. Bench footing is 20-30% less expensive and faster but reduces floor space by 2-3 feet around the perimeter. We'll recommend the best option for your situation."
  },
  {
    question: "How long does underpinning take?",
    answer: "Most projects take 4-6 weeks total: 2-3 weeks for permits, 1 week for excavation, 1-2 weeks for foundation work, and 3-5 days for finishing. Weather and soil conditions can affect timeline."
  }
];

export default function UnderpinningServiceEnhanced() {
  const [basementSize, setBasementSize] = React.useState([1000]);
  const [homeValue, setHomeValue] = React.useState([1200000]);
  const [method, setMethod] = React.useState("traditional");
  const [showQuoteDialog, setShowQuoteDialog] = React.useState(false);

  // Enhanced ROI calculations
  const calculateROI = React.useMemo(() => {
    const size = basementSize[0];
    const value = homeValue[0];
    const isTraditional = method === "traditional";
    
    const costPerSqFt = isTraditional ? 50 : 40;
    const valuePerSqFt = isTraditional ? 450 : 385;
    const monthlyRent = isTraditional ? 3000 : 2500;
    
    const projectCost = size * costPerSqFt;
    const addedValue = size * valuePerSqFt;
    const annualRental = monthlyRent * 12;
    const paybackYears = projectCost / annualRental;
    const totalROI = ((addedValue - projectCost) / projectCost) * 100;
    const homeValueIncrease = value * 0.18;
    
    return {
      projectCost,
      addedValue,
      monthlyRent,
      annualRental,
      paybackYears,
      totalROI,
      homeValueIncrease,
      netGain: addedValue - projectCost
    };
  }, [basementSize, homeValue, method]);

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Breadcrumbs for SEO */}
        <nav className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
                  <Home className="h-3 w-3 mr-1" />
                  Home
                </a>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <a href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li className="text-foreground font-semibold">Underpinning</li>
            </ol>
          </div>
        </nav>

        {/* Emergency Alert Bar */}
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base sm:text-lg">Foundation Issues? We Offer Emergency Assessments</p>
                  <p className="text-sm text-white/90">
                    Same-day structural inspection • Free consultation • 25-year transferable warranty
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-white text-red-600 hover:bg-white/90 font-bold shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  437-545-0067
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="container mx-auto px-4">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Building className="h-4 w-4 mr-2 hidden sm:inline" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="calculator" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Calculator className="h-4 w-4 mr-2 hidden sm:inline" />
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="methods" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Layers className="h-4 w-4 mr-2 hidden sm:inline" />
                  Methods
                </TabsTrigger>
                <TabsTrigger value="process" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Clock className="h-4 w-4 mr-2 hidden sm:inline" />
                  Process
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Sparkles className="h-4 w-4 mr-2 hidden sm:inline" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Star className="h-4 w-4 mr-2 hidden sm:inline" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="financing" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <CreditCard className="h-4 w-4 mr-2 hidden sm:inline" />
                  Financing
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <MessageSquare className="h-4 w-4 mr-2 hidden sm:inline" />
                  FAQ
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground">ROI Average</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">120-140</p>
                      <span className="text-lg text-muted-foreground">%</span>
                    </div>
                    <Progress value={130} className="mt-2 h-1" />
                  </CardContent>
                </Card>
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Value Added</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg text-muted-foreground">$</span>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">350-500</p>
                      <span className="text-lg text-muted-foreground">/ft²</span>
                    </div>
                    <Progress value={75} className="mt-2 h-1" />
                  </CardContent>
                </Card>
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Rental Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg text-muted-foreground">$</span>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">2.5-3.5K</p>
                      <span className="text-lg text-muted-foreground">/mo</span>
                    </div>
                    <Progress value={85} className="mt-2 h-1" />
                  </CardContent>
                </Card>
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Payback Period</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">2-3</p>
                      <span className="text-lg text-muted-foreground">years</span>
                    </div>
                    <Progress value={60} className="mt-2 h-1" />
                  </CardContent>
                </Card>
              </div>

              {/* What is Underpinning */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">What is Basement Underpinning?</CardTitle>
                      <CardDescription>Transform your basement into valuable living space</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Basement underpinning is the process of lowering your basement floor to create additional headroom 
                    and usable living space. This structural enhancement transforms dark, cramped basements with 5-6 foot 
                    ceilings into bright, functional areas with 8-9 foot ceilings.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <Card className="bg-cyan-50/50 border-green-200/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <div className="p-1.5 bg-cyan-50 rounded-md mr-2">
                            <CheckCircle className="h-4 w-4 text-cyan-600" />
                          </div>
                          Perfect For
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {[
                            'Toronto homes built before 1950',
                            'Creating legal rental suites',
                            'Adding home offices or gyms',
                            'Increasing property value',
                            'Fixing foundation issues'
                          ].map((item) => (
                            <li key={item} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-cyan-50/50 border-blue-200/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <div className="p-1.5 bg-cyan-50 rounded-md mr-2">
                            <TrendingUp className="h-4 w-4 text-cyan-600" />
                          </div>
                          Financial Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {[
                            'Add 800-1,200 sq ft of living space',
                            'Generate $30,000-42,000 annual rental income',
                            'Increase home value by 15-20%',
                            'Cheaper than buying a bigger home',
                            'Tax benefits for rental income'
                          ].map((item) => (
                            <li key={item} className="flex items-start">
                              <TrendingUp className="h-4 w-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Related Services Links */}
                  <Alert className="mt-6 bg-primary/5 border-primary/20">
                    <Info className="h-4 w-4 text-primary" />
                    <AlertTitle>Complete Basement Solutions</AlertTitle>
                    <AlertDescription className="mt-2">
                      <span className="block mb-3">Underpinning works best when combined with our other services:</span>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {relatedServices.map((service) => (
                          <a 
                            key={service.href}
                            href={service.href}
                            className="group flex items-center p-2 rounded-md bg-background hover:bg-primary/10 transition-colors border border-border hover:border-primary/20"
                          >
                            <service.icon className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary" />
                            <span className="text-sm font-medium">{service.name}</span>
                          </a>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Certifications & Trust */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Award className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Certifications & Warranties</CardTitle>
                      <CardDescription>Licensed, insured, and guaranteed</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {certifications.map((cert) => (
                      <TooltipProvider key={cert.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="group cursor-pointer">
                              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-4 mb-2 group-hover:from-secondary/20 group-hover:to-secondary/10 transition-colors">
                                <cert.icon className="h-8 w-8 mx-auto text-secondary" />
                              </div>
                              <p className="text-xs font-medium text-center">{cert.name}</p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified and Active</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Service Areas</CardTitle>
                      <CardDescription>Serving the Greater Toronto Area</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <a
                        key={area.href}
                        href={area.href}
                        className="group inline-flex items-center px-4 py-2 rounded-full bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors font-medium text-sm"
                      >
                        <MapPin className="h-3 w-3 mr-1.5 group-hover:animate-pulse" />
                        {area.name}
                      </a>
                    ))}
                  </div>
                  <Alert className="mt-4 border-amber-200 bg-amber-50/50">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-sm">
                      Emergency service available 24/7 across all GTA locations
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ROI Calculator Tab */}
            <TabsContent value="calculator" className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Underpinning ROI Calculator</CardTitle>
                      <CardDescription>Calculate your return on investment and payback timeline</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="basement-size">Basement Size (sq ft)</Label>
                        <Slider
                          id="basement-size"
                          min={600}
                          max={1500}
                          step={50}
                          value={basementSize}
                          onValueChange={setBasementSize}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-slate-600 mt-1">
                          <span>600</span>
                          <span className="font-bold text-black">{basementSize[0]} sq ft</span>
                          <span>1500</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="home-value">Current Home Value</Label>
                        <Slider
                          id="home-value"
                          min={600000}
                          max={2000000}
                          step={50000}
                          value={homeValue}
                          onValueChange={setHomeValue}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-slate-600 mt-1">
                          <span>$600K</span>
                          <span className="font-bold text-black">${(homeValue[0] / 1000000).toFixed(1)}M</span>
                          <span>$2M</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="method">Underpinning Method</Label>
                        <RadioGroup value={method} onValueChange={setMethod} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="traditional" id="traditional" />
                            <Label htmlFor="traditional">Traditional (Maximum Space)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bench" id="bench" />
                            <Label htmlFor="bench">Bench Footing (Lower Cost)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Your ROI Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                            <span className="text-muted-foreground">Project Investment:</span>
                            <Badge variant="outline" className="text-base font-bold">
                              ${calculateROI.projectCost.toLocaleString()}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 rounded-lg bg-cyan-50/50">
                            <span className="text-muted-foreground">Added Home Value:</span>
                            <Badge className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50 text-base font-bold">
                              +${calculateROI.addedValue.toLocaleString()}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 rounded-lg bg-cyan-50/50">
                            <span className="text-muted-foreground">Monthly Rental Income:</span>
                            <Badge className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50 text-base font-bold">
                              ${calculateROI.monthlyRent.toLocaleString()}/mo
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50/50">
                            <span className="text-muted-foreground">Annual Rental Income:</span>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-base font-bold">
                              ${calculateROI.annualRental.toLocaleString()}/yr
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Net Gain:</span>
                              <span className="text-xl font-bold text-cyan-700">
                                ${calculateROI.netGain.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Payback Period:</span>
                              <span className="text-xl font-bold text-cyan-700">
                                {calculateROI.paybackYears.toFixed(1)} years
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total ROI:</span>
                              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {calculateROI.totalROI.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex-col gap-3">
                        <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
                          <DialogTrigger asChild>
                            <Button className="w-full" size="lg">
                              Get Custom Quote
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Get Your Custom Underpinning Quote</DialogTitle>
                              <DialogDescription>
                                We'll provide a detailed quote within 24 hours
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John Smith" />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                              </div>
                              <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" placeholder="416-555-0123" />
                              </div>
                              <div>
                                <Label htmlFor="address">Property Address</Label>
                                <Input id="address" placeholder="123 Main St, Toronto" />
                              </div>
                              <div>
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Textarea id="notes" placeholder="Tell us about your project..." />
                              </div>
                              <Button className="w-full">Submit Quote Request</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-5 w-5" />
                          Download ROI Report
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {/* Additional Calculator Features */}
                  <Alert className="mt-6 bg-primary/5 border-primary/20">
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Market Insight</AlertTitle>
                    <AlertDescription>
                      Average Toronto home values have increased 8.2% annually over the last decade. 
                      Underpinning typically adds 15-20% to your home value immediately.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Methods Comparison Tab */}
            <TabsContent value="methods" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-6">
                {underpinningMethods.map((method) => (
                  <Card key={method.id} className="relative overflow-hidden">
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10",
                      method.color === "blue" ? "bg-cyan-500" : "bg-cyan-500"
                    )} />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{method.name}</CardTitle>
                          <CardDescription>{method.description}</CardDescription>
                        </div>
                        <Badge variant={method.color === "blue" ? "default" : "secondary"}>
                          {method.bestFor}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Investment</p>
                          <p className="font-bold">{method.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Timeline</p>
                          <p className="font-bold">{method.timeline}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Space Used</p>
                          <p className="font-bold">{method.spaceUtilization}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Ceiling Height</p>
                          <p className="font-bold">{method.ceilingHeight}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-cyan-600 mr-2" />
                          Advantages
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {method.pros.map((pro) => (
                            <li key={pro}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-600 mr-2" />
                          Considerations
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {method.cons.map((con) => (
                            <li key={con}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Alert>
                        <TrendingUp className="h-4 w-4" />
                        <AlertTitle>ROI Potential</AlertTitle>
                        <AlertDescription>
                          {method.roi} return • Adds {method.valueAdded} in value
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Method Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>Traditional</TableHead>
                        <TableHead>Bench Footing</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Cost per sq ft</TableCell>
                        <TableCell>$50-60</TableCell>
                        <TableCell>$40-50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total for 1000 sq ft</TableCell>
                        <TableCell>$50,000-60,000</TableCell>
                        <TableCell>$40,000-50,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Completion Time</TableCell>
                        <TableCell>5-6 weeks</TableCell>
                        <TableCell>3-4 weeks</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Usable Space</TableCell>
                        <TableCell>100% (1000 sq ft)</TableCell>
                        <TableCell>75% (750 sq ft)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Final Ceiling Height</TableCell>
                        <TableCell>8'6" - 9'</TableCell>
                        <TableCell>8' - 8'6"</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Value Added</TableCell>
                        <TableCell className="text-cyan-600 font-bold">$450-500/sq ft</TableCell>
                        <TableCell className="text-cyan-600 font-bold">$385-420/sq ft</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Monthly Rental Potential</TableCell>
                        <TableCell className="text-cyan-600 font-bold">$3,000-3,500</TableCell>
                        <TableCell className="text-cyan-600 font-bold">$2,500-3,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Best For</TableCell>
                        <TableCell>Rental suites, maximum ROI</TableCell>
                        <TableCell>Personal use, budget projects</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Underpinning Process</CardTitle>
                  <CardDescription>Professional execution from start to finish</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {processSteps.map((step, index) => (
                      <div key={step.phase} className="relative">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            {index < processSteps.length - 1 && (
                              <div className="w-0.5 h-24 bg-slate-300 mx-auto mt-2" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="bg-slate-50 rounded-lg p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-bold text-lg">{step.phase}</h3>
                                  <p className="text-sm text-slate-600">{step.description}</p>
                                </div>
                                <Badge variant="secondary">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {step.duration}
                                </Badge>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2">
                                {step.tasks.map((task) => (
                                  <div key={task} className="flex items-center text-sm">
                                    <CheckCircle className="h-4 w-4 text-cyan-600 mr-2 flex-shrink-0" />
                                    {task}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Gallery</CardTitle>
                  <CardDescription>Before and after transformations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Before Underpinning</h3>
                      <div className="bg-slate-200 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-slate-500">5'8" ceiling height</p>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-slate-600">
                        <li>• Unusable for legal living space</li>
                        <li>• Dark and cramped</li>
                        <li>• Limited storage only</li>
                        <li>• No rental potential</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">After Underpinning</h3>
                      <div className="bg-cyan-50 rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-cyan-700 font-bold">9' ceiling height</p>
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-cyan-600">
                        <li>✓ Legal secondary suite</li>
                        <li>✓ Bright and spacious</li>
                        <li>✓ Full living space</li>
                        <li>✓ $3,000/month rental income</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Alert className="mt-6">
                    <Play className="h-4 w-4" />
                    <AlertTitle>Video Tours Available</AlertTitle>
                    <AlertDescription>
                      <Button variant="link" className="p-0 h-auto">
                        Watch full project walkthroughs →
                      </Button>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-8">
              <div className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {testimonial.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {testimonial.location} • {testimonial.project}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <blockquote className="text-muted-foreground italic mb-4">
                        "{testimonial.text}"
                      </blockquote>
                      <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-cyan-700 border-green-200">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {testimonial.value}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/80 rounded-lg shadow-sm">
                        <Star className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Read More Reviews</h3>
                        <p className="text-sm text-muted-foreground">See what our 500+ customers say</p>
                      </div>
                    </div>
                    <Button size="lg" className="shadow-lg">
                      View All Reviews
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financing Tab */}
            <TabsContent value="financing" className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                      <CreditCard className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Financing Options</CardTitle>
                      <CardDescription>Make your underpinning project affordable</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {financingOptions.map((option, index) => (
                      <Card key={option.type} className="relative border-2 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {index === 0 && (
                          <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-amber-400 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                            POPULAR
                          </div>
                        )}
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CircleDollarSign className="h-5 w-5 text-emerald-600" />
                            {option.type}
                          </CardTitle>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                              <span className="text-sm text-muted-foreground">Minimum:</span>
                              <Badge variant="outline">{option.minAmount}</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                              <span className="text-sm text-muted-foreground">Requirements:</span>
                              <Badge variant="secondary">{option.requirements}</Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Apply Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <Alert className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <Info className="h-4 w-4 text-cyan-600" />
                    <AlertTitle className="text-cyan-800">Government Programs Available</AlertTitle>
                    <AlertDescription className="text-cyan-700">
                      <div className="mt-2">
                        <p>You may qualify for the Canada Greener Homes Loan (up to $40,000 interest-free) 
                        when combining underpinning with energy efficiency improvements.</p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-cyan-600">
                          Learn about government rebates 
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent/10 via-muted/10 to-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                      <MessageSquare className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                      <CardDescription>Everything you need to know about underpinning</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-4 data-[state=open]:bg-muted/30">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                          <p className="text-muted-foreground pl-9">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  <Alert className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <AlertTitle>Have More Questions?</AlertTitle>
                    <AlertDescription>
                      <div className="flex gap-4 mt-3 flex-wrap">
                        <Button size="sm" className="shadow-md">
                          <Phone className="mr-2 h-4 w-4" />
                          Call 437-545-0067
                        </Button>
                        <Button size="sm" variant="outline" className="shadow-sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Live Chat
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              
              {/* Resources */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Helpful Resources</CardTitle>
                      <CardDescription>Download guides and checklists</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start h-auto py-3 hover:bg-primary/5 hover:border-primary/30 group">
                      <Download className="mr-2 h-4 w-4 group-hover:text-primary" />
                      <span className="text-left">
                        <div className="font-medium">ROI Calculator</div>
                        <div className="text-xs text-muted-foreground">PDF Download</div>
                      </span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 hover:bg-primary/5 hover:border-primary/30 group">
                      <BookOpen className="mr-2 h-4 w-4 group-hover:text-primary" />
                      <span className="text-left">
                        <div className="font-medium">Complete Guide</div>
                        <div className="text-xs text-muted-foreground">40 Pages</div>
                      </span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 hover:bg-primary/5 hover:border-primary/30 group">
                      <FileText className="mr-2 h-4 w-4 group-hover:text-primary" />
                      <span className="text-left">
                        <div className="font-medium">Permit Checklist</div>
                        <div className="text-xs text-muted-foreground">City Requirements</div>
                      </span>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3 hover:bg-primary/5 hover:border-primary/30 group">
                      <Home className="mr-2 h-4 w-4 group-hover:text-primary" />
                      <span className="text-left">
                        <div className="font-medium">Rental Planning</div>
                        <div className="text-xs text-muted-foreground">Suite Guide</div>
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Bottom CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 px-4 py-1.5">
              <Sparkles className="h-3 w-3 mr-1" />
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Basement?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Get a free inspection and custom quote. Add valuable living space 
              and increase your home's value by $150,000-300,000.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl px-8 py-6 text-lg font-semibold">
                Schedule Free Inspection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/20 backdrop-blur px-8 py-6 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                437-545-0067
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 pb-4">
                  <p className="text-4xl font-bold mb-1">500+</p>
                  <p className="text-sm text-white/80">Projects Completed</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 pb-4">
                  <p className="text-4xl font-bold mb-1">25 Years</p>
                  <p className="text-sm text-white/80">Warranty</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 pb-4">
                  <p className="text-4xl font-bold mb-1">4.9★</p>
                  <p className="text-sm text-white/80">Google Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="pt-6 pb-4">
                  <p className="text-4xl font-bold mb-1">24/7</p>
                  <p className="text-sm text-white/80">Emergency Service</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}