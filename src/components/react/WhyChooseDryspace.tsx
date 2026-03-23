"use client"

import * as React from "react"
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Shield, 
  Clock,
  Award,
  TrendingUp,
  Calculator,
  Users,
  Zap,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Info,
  FileCheck,
  Stamp,
  ClipboardCheck,
  Building2,
  Calendar,
  AlertCircle,
  Sparkles,
  BadgeCheck
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Subsidy data with enhanced details
const subsidyPrograms = [
  {
    id: "sump-pump",
    name: "Sump Pump Installation",
    amount: 1750,
    icon: Zap,
    color: "blue",
    description: "Professional installation with battery backup",
    requirements: [
      "Must have experienced flooding",
      "Licensed contractor required",
      "Includes battery backup system"
    ],
    coverage: "100% of installation costs",
    processingTime: "4-6 weeks",
    popularityScore: 95
  },
  {
    id: "backwater-valve",
    name: "Backwater Valve",
    amount: 1250,
    icon: Shield,
    color: "green",
    description: "Prevent sewage backup with approved valves",
    requirements: [
      "City-approved valve models",
      "Stand-alone drain permit",
      "Professional certification"
    ],
    coverage: "80% of total costs",
    processingTime: "3-4 weeks",
    popularityScore: 88
  },
  {
    id: "drain-severance",
    name: "Drain Severance",
    amount: 400,
    icon: FileCheck,
    color: "purple",
    description: "Disconnect foundation drain from sewer",
    requirements: [
      "Foundation drain present",
      "Sewer connection verified",
      "City inspection required"
    ],
    coverage: "100% up to $400",
    processingTime: "2-3 weeks",
    popularityScore: 72
  }
];

// Engineering services data
const engineeringServices = [
  {
    category: "Technical Documentation",
    icon: FileText,
    services: [
      { name: "CAD Site Plans", status: "included", detail: "2D/3D drawings" },
      { name: "Structural Cross-Sections", status: "included", detail: "Detailed views" },
      { name: "Engineer Stamps (P.Eng)", status: "included", detail: "Licensed approval" },
      { name: "As-Built Drawings", status: "included", detail: "Final documentation" }
    ]
  },
  {
    category: "Permit Management",
    icon: Building2,
    services: [
      { name: "Building Permit Application", status: "2-3 days", detail: "Fast processing" },
      { name: "Code Compliance Review", status: "100%", detail: "Guaranteed approval" },
      { name: "Inspection Scheduling", status: "handled", detail: "We coordinate" },
      { name: "Permit Fees", status: "transparent", detail: "No hidden costs" }
    ]
  }
];

// Why choose us features
const whyChooseFeatures = [
  {
    icon: Clock,
    title: "25+ Years Experience",
    description: "Serving Toronto since 1999"
  },
  {
    icon: Award,
    title: "Licensed & Insured",
    description: "$5M liability coverage"
  },
  {
    icon: Users,
    title: "10,000+ Homes",
    description: "Protected across GTA"
  },
  {
    icon: BadgeCheck,
    title: "Lifetime Warranty",
    description: "Transferable protection"
  }
];

export function WhyChooseDryspace() {
  const [selectedSubsidy, setSelectedSubsidy] = React.useState<string | null>(null);
  const [calculatedSavings, setCalculatedSavings] = React.useState(0);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  // Calculate total subsidy
  React.useEffect(() => {
    const total = selectedServices.reduce((sum, serviceId) => {
      const program = subsidyPrograms.find(p => p.id === serviceId);
      return sum + (program?.amount || 0);
    }, 0);
    setCalculatedSavings(Math.min(total, 3400)); // Max subsidy is $3,400
  }, [selectedServices]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const colorMap = {
    blue: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-blue-200", badge: "bg-cyan-50" },
    green: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-green-200", badge: "bg-cyan-50" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", badge: "bg-purple-100" }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="mr-1 h-3 w-3" />
            MAXIMUM VALUE & EXPERTISE
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Dryspace
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete waterproofing solutions with maximum savings and professional expertise
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {whyChooseFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex p-3 rounded-full bg-cyan-50 mb-3">
                    <Icon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="subsidies" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="subsidies" className="flex items-center gap-2 py-3">
              <DollarSign className="h-4 w-4" />
              <span>Subsidy Program</span>
              <Badge variant="secondary" className="ml-2">Save $3,400</Badge>
            </TabsTrigger>
            <TabsTrigger value="engineering" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span>Permits & Engineering</span>
              <Badge variant="secondary" className="ml-2">Full Service</Badge>
            </TabsTrigger>
          </TabsList>

          {/* Subsidies Tab */}
          <TabsContent value="subsidies" className="space-y-6">
            {/* Alert Banner */}
            <Alert className="border-green-200 bg-cyan-50">
              <DollarSign className="h-5 w-5 text-cyan-600" />
              <AlertDescription className="text-cyan-800">
                <strong>Toronto Basement Flooding Protection Subsidy Program</strong>
                <p className="mt-1">City of Toronto provides up to $3,400 in financial assistance for approved waterproofing installations</p>
              </AlertDescription>
            </Alert>

            {/* Subsidy Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {subsidyPrograms.map((program) => {
                const Icon = program.icon;
                const colors = colorMap[program.color as keyof typeof colorMap];
                const isSelected = selectedServices.includes(program.id);
                
                return (
                  <Card 
                    key={program.id}
                    className={cn(
                      "relative overflow-hidden cursor-pointer transition-all duration-300",
                      isSelected && "ring-2 ring-blue-500 shadow-lg",
                      "hover:shadow-xl"
                    )}
                    onClick={() => toggleService(program.id)}
                  >
                    {/* Popularity Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className="text-xs text-slate-500">
                        <Progress value={program.popularityScore} className="w-16 h-1.5" />
                        <span className="text-[10px]">{program.popularityScore}% choose this</span>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className={cn("p-3 rounded-lg", colors.bg)}>
                          <Icon className={cn("h-6 w-6", colors.text)} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{program.name}</CardTitle>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold text-slate-900">
                              ${program.amount.toLocaleString()}
                            </span>
                            <Badge variant="outline" className={colors.badge}>
                              {program.coverage}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="text-sm text-slate-600">{program.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-700">Requirements:</p>
                        {program.requirements.map((req, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-cyan-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-slate-600">{req}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{program.processingTime}</span>
                        </div>
                        {isSelected && (
                          <Badge className="bg-cyan-600">Selected</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Savings Calculator */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Estimated Savings</span>
                  <Calculator className="h-5 w-5 text-slate-600" />
                </CardTitle>
                <CardDescription>
                  Select services above to calculate your total subsidy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-cyan-600">
                      ${calculatedSavings.toLocaleString()}
                    </p>
                    {calculatedSavings >= 3400 && (
                      <Badge className="mt-2" variant="default">
                        Maximum Subsidy Reached!
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Selected Services:</p>
                    <p className="text-2xl font-bold">{selectedServices.length}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:flex-1" size="lg" asChild>
                  <a href="/subsidies" className="flex items-center justify-center">
                    <span className="truncate">View Subsidy Details</span>
                    <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:flex-1" asChild>
                  <a href="tel:437-545-0067" className="flex items-center justify-center">
                    <PhoneCall className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Free Assessment</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Eligibility Notice */}
            <Alert className="border-yellow-200 bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <AlertDescription>
                <strong className="text-amber-800">Eligibility Requirements:</strong>
                <ul className="mt-2 space-y-1 text-sm text-amber-700">
                  <li>• Property must have experienced basement flooding or sewage backup</li>
                  <li>• Licensed contractor required (we're fully licensed)</li>
                  <li>• We handle all paperwork and applications for you</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Engineering Tab */}
          <TabsContent value="engineering" className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Complete Permit & Engineering Service</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Full-service permit handling and technical documentation for all waterproofing projects
                    </CardDescription>
                  </div>
                  <div className="hidden md:block">
                    <Badge className="bg-cyan-600 text-white px-4 py-2">
                      <Stamp className="mr-2 h-4 w-4" />
                      P.Eng Licensed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Engineering Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {engineeringServices.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-cyan-50">
                          <Icon className="h-5 w-5 text-cyan-600" />
                        </div>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{service.name}</p>
                              <p className="text-xs text-slate-600">{service.detail}</p>
                            </div>
                            <Badge 
                              variant={service.status === "included" ? "default" : "secondary"}
                              className="ml-2"
                            >
                              {service.status.toUpperCase()}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Process Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Our Streamlined Process</CardTitle>
                <CardDescription>From application to approval in record time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200" />
                  
                  {/* Timeline Steps */}
                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Initial Consultation", time: "Day 1", description: "Site assessment and documentation" },
                      { step: 2, title: "Drawing Preparation", time: "Day 2-3", description: "CAD drawings and engineering stamps" },
                      { step: 3, title: "Permit Submission", time: "Day 4", description: "Complete application to city" },
                      { step: 4, title: "Approval & Start", time: "Day 7-10", description: "Begin work upon approval" }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative z-10">
                          <div className="w-16 h-16 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                        </div>
                        <div className="flex-1 pt-3">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <Badge variant="outline">{item.time}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-cyan-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-1">No Delays</h4>
                  <p className="text-sm text-slate-600">In-house engineering team ensures fast approval</p>
                </CardContent>
              </Card>
              
              <Card className="bg-cyan-50 border-blue-200">
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-1">Code Compliant</h4>
                  <p className="text-sm text-slate-600">All drawings meet Ontario Building Code</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold mb-1">Licensed Engineers</h4>
                  <p className="text-sm text-slate-600">P.Eng certified professionals on staff</p>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="flex gap-3 justify-center pt-4">
              <Button size="lg" asChild>
                <a href="/process">
                  Learn About Our Process
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">
                  Get Free Quote
                  <DollarSign className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}