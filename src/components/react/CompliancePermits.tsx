"use client"

import * as React from "react"
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Shield, 
  Calendar,
  DollarSign,
  Building,
  Gavel,
  HardHat,
  MapPin,
  FileCheck,
  Calculator,
  ChevronRight,
  Info,
  Download,
  Phone
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Permit timeline stages
const permitStages = [
  { id: 1, name: "Application", duration: "1 day", status: "complete", icon: FileText },
  { id: 2, name: "City Review", duration: "7-10 days", status: "current", icon: Building },
  { id: 3, name: "Approval", duration: "1 day", status: "upcoming", icon: FileCheck },
  { id: 4, name: "Inspection", duration: "2 days", status: "upcoming", icon: CheckCircle },
  { id: 5, name: "Closure", duration: "1 day", status: "upcoming", icon: Shield }
];

// Compliance categories
const complianceData = {
  buildingCode: [
    { item: "Ontario Building Code 2024", status: "compliant", icon: CheckCircle },
    { item: "Toronto Municipal Requirements", status: "compliant", icon: CheckCircle },
    { item: "OHSA Safety Guidelines", status: "compliant", icon: CheckCircle },
    { item: "IHSA Protocols", status: "compliant", icon: CheckCircle }
  ],
  certifications: [
    { name: "WSIB Clearance", number: "WSB-2024-1234", valid: "2026-12-31" },
    { name: "City License", number: "T24-WP-5678", valid: "2026-12-31" },
    { name: "Master Plumber", number: "MP-ON-9012", valid: "2026-06-30" },
    { name: "Insurance", number: "5M-LIABILITY", valid: "2026-12-31" }
  ],
  subsidies: [
    { name: "Backwater Valve", amount: 1250, coverage: 80, requirements: ["City approval", "Licensed installer", "Inspection"] },
    { name: "Sump Pump", amount: 1750, coverage: 100, requirements: ["Stand-alone drain", "Proper discharge", "Battery backup"] },
    { name: "Drain Severance", amount: 400, coverage: 100, requirements: ["Foundation drain", "Disconnect proof", "City inspection"] }
  ]
};

export function CompliancePermits() {
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [subsidyCalculator, setSubsidyCalculator] = React.useState({
    backwater: false,
    sumpPump: false,
    drainSeverance: false
  });

  const calculateSubsidy = () => {
    let total = 0;
    if (subsidyCalculator.backwater) total += 1250;
    if (subsidyCalculator.sumpPump) total += 1750;
    if (subsidyCalculator.drainSeverance) total += 400;
    return Math.min(total, 3400); // Max subsidy is $3,400
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Shield className="mr-1 h-3 w-3" />
            FULLY LICENSED & COMPLIANT
          </Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Compliance & Permit Management
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We handle all permits, inspections, and City of Toronto subsidy applications. 
            Licensed and WSIB-cleared teams installing to Ontario's 2024 Building Code.
          </p>
        </div>

        {/* Alert for important notice */}
        <Alert className="mb-8 border-blue-200 bg-cyan-50">
          <Info className="h-5 w-5 text-cyan-600" />
          <AlertTitle className="text-cyan-800">Subsidy Alert: Up to $3,400 Available!</AlertTitle>
          <AlertDescription className="text-cyan-700">
            The City of Toronto's Basement Flooding Protection Subsidy Program covers up to $3,400 for eligible waterproofing work. 
            We handle all paperwork and ensure maximum rebates.
          </AlertDescription>
        </Alert>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="flex flex-col py-3">
              <Shield className="h-4 w-4 mb-1" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="permits" className="flex flex-col py-3">
              <FileText className="h-4 w-4 mb-1" />
              <span>Permits</span>
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex flex-col py-3">
              <Gavel className="h-4 w-4 mb-1" />
              <span>Requirements</span>
            </TabsTrigger>
            <TabsTrigger value="subsidies" className="flex flex-col py-3">
              <DollarSign className="h-4 w-4 mb-1" />
              <span>Subsidies</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Building Code Compliance */}
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Building Code</CardTitle>
                    <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-green-300">
                      COMPLIANT
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {complianceData.buildingCode.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-600" />
                      <span className="text-sm">{item.item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Permit Handling */}
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Permit Service</CardTitle>
                    <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-blue-300">
                      FULL SERVICE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">All permits included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">7-10 day processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Inspection scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Documentation provided</span>
                  </div>
                </CardContent>
              </Card>

              {/* Safety & Insurance */}
              <Card className="border-yellow-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Safety & Insurance</CardTitle>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-yellow-300">
                      CERTIFIED
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <HardHat className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">WSIB cleared</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">$5M liability insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Licensed master plumbers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">City of Toronto licensed</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications Display */}
            <Card>
              <CardHeader>
                <CardTitle>Our Certifications & Licenses</CardTitle>
                <CardDescription>All certifications are current and verified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {complianceData.certifications.map((cert, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                      <p className="font-semibold text-sm">{cert.name}</p>
                      <p className="text-xs text-slate-500">{cert.number}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Valid until {new Date(cert.valid).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permits Tab */}
          <TabsContent value="permits" className="space-y-6">
            {/* Permit Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Permit Processing Timeline</CardTitle>
                <CardDescription>Typical timeline from application to closure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="absolute top-8 left-0 right-0 h-2 bg-slate-200 rounded-full" />
                  <div className="absolute top-8 left-0 h-2 bg-cyan-600 rounded-full" style={{ width: '40%' }} />
                  
                  {/* Timeline Stages */}
                  <div className="relative grid grid-cols-5 gap-4">
                    {permitStages.map((stage, index) => {
                      const Icon = stage.icon;
                      const isComplete = stage.status === 'complete';
                      const isCurrent = stage.status === 'current';
                      
                      return (
                        <div key={stage.id} className="text-center">
                          <div className={cn(
                            "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2",
                            isComplete && "bg-cyan-50 text-cyan-600",
                            isCurrent && "bg-cyan-50 text-cyan-600 ring-4 ring-blue-200",
                            stage.status === 'upcoming' && "bg-slate-100 text-slate-400"
                          )}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <p className="font-semibold text-sm">{stage.name}</p>
                          <p className="text-xs text-slate-500">{stage.duration}</p>
                          {isCurrent && (
                            <Badge className="mt-1" variant="default">Current</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Permits */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Permits We Handle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">1</Badge>
                    <div>
                      <p className="font-semibold">Building Permit</p>
                      <p className="text-sm text-slate-600">For structural work and underpinning</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">2</Badge>
                    <div>
                      <p className="font-semibold">Plumbing Permit</p>
                      <p className="text-sm text-slate-600">For sump pumps and drainage systems</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">3</Badge>
                    <div>
                      <p className="font-semibold">Stand-alone Drain Permit</p>
                      <p className="text-sm text-slate-600">For backwater valves (10 days processing)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Application preparation & submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Engineering drawings (if required)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Ontario One Call locates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Inspection scheduling & attendance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Final documentation & closure</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Specific Code Requirements We Follow</CardTitle>
                <CardDescription>Click each section to see detailed requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="backwater">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-cyan-50">
                          <FileCheck className="mr-1 h-3 w-3" />
                          Code B7.4.6
                        </Badge>
                        <span>Backwater Valve Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pt-4">
                      <div className="grid gap-2">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Full-port (normally open) valves only</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Must be accessible for maintenance</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">City of Toronto approved models required</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Professional installation certification needed</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sump">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-cyan-50">
                          <Gavel className="mr-1 h-3 w-3" />
                          By-law 681
                        </Badge>
                        <span>Sump Pump Discharge Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pt-4">
                      <div className="grid gap-2">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Minimum 2m from foundation wall</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Discharge to permeable surface only</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Cannot discharge to sanitary sewer (illegal)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Proper grading away from foundation required</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="excavation">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-50">
                          <HardHat className="mr-1 h-3 w-3" />
                          OHSA Reg 213/91
                        </Badge>
                        <span>Excavation Safety Requirements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pt-4">
                      <div className="grid gap-2">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Ontario One Call locates (5 business days notice)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">OHSA trench safety requirements for 4ft+ depth</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Proper shoring or sloping for deep excavations</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Site restoration to original grade</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="waterproofing">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50">
                          <Building className="mr-1 h-3 w-3" />
                          OBC 9.13
                        </Badge>
                        <span>Waterproofing Standards</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pt-4">
                      <div className="grid gap-2">
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Dampproofing vs waterproofing based on water table</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Approved membrane materials only</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Drainage layer requirements</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-slate-400 mt-0.5" />
                          <span className="text-sm">Foundation drainage to approved outlet</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Alert className="border-yellow-200 bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-amber-800">Important Compliance Note</AlertTitle>
              <AlertDescription className="text-amber-700">
                All work must be performed by licensed contractors with valid WSIB coverage. 
                Homeowners cannot pull permits for waterproofing work that requires professional expertise. 
                We handle all permit applications and ensure full compliance with current codes.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Subsidies Tab */}
          <TabsContent value="subsidies" className="space-y-6">
            {/* Subsidy Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              {complianceData.subsidies.map((subsidy, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-50 rounded-bl-full opacity-50" />
                  <CardHeader>
                    <CardTitle className="text-lg">{subsidy.name}</CardTitle>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-cyan-600">${subsidy.amount}</span>
                      <Badge variant="secondary">{subsidy.coverage}% covered</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-3">Requirements:</p>
                    <ul className="space-y-1">
                      {subsidy.requirements.map((req, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-cyan-600" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Subsidy Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Subsidy</CardTitle>
                <CardDescription>Select the services you need to see your potential rebate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={subsidyCalculator.backwater}
                      onChange={(e) => setSubsidyCalculator(prev => ({ ...prev, backwater: e.target.checked }))}
                      className="h-4 w-4 text-cyan-600"
                    />
                    <div>
                      <p className="font-semibold">Backwater Valve</p>
                      <p className="text-sm text-slate-600">Up to $1,250</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={subsidyCalculator.sumpPump}
                      onChange={(e) => setSubsidyCalculator(prev => ({ ...prev, sumpPump: e.target.checked }))}
                      className="h-4 w-4 text-cyan-600"
                    />
                    <div>
                      <p className="font-semibold">Sump Pump</p>
                      <p className="text-sm text-slate-600">Up to $1,750</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={subsidyCalculator.drainSeverance}
                      onChange={(e) => setSubsidyCalculator(prev => ({ ...prev, drainSeverance: e.target.checked }))}
                      className="h-4 w-4 text-cyan-600"
                    />
                    <div>
                      <p className="font-semibold">Drain Severance</p>
                      <p className="text-sm text-slate-600">Up to $400</p>
                    </div>
                  </label>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-600">Your Estimated Subsidy</p>
                    <p className="text-3xl font-bold text-cyan-600">${calculateSubsidy().toLocaleString()}</p>
                    {calculateSubsidy() >= 3400 && (
                      <Badge className="mt-2" variant="default">Maximum Subsidy Reached!</Badge>
                    )}
                  </div>
                  <Calculator className="h-12 w-12 text-cyan-600" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="default" size="lg" className="flex-1" asChild>
                  <a href="/contact">
                    Apply for Subsidy
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/subsidies">
                    <Download className="mr-2 h-4 w-4" />
                    Download Guide
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Important Notes */}
            <Alert className="border-green-200 bg-cyan-50">
              <DollarSign className="h-5 w-5 text-cyan-600" />
              <AlertTitle className="text-cyan-800">We Handle Everything!</AlertTitle>
              <AlertDescription className="text-cyan-700 space-y-2">
                <p>Our team manages the entire subsidy application process:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Complete all required paperwork</li>
                  <li>Schedule and attend inspections</li>
                  <li>Submit documentation to the City</li>
                  <li>Follow up on your application</li>
                  <li>Ensure you receive maximum rebates</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-12 bg-slate-900 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Need Help with Permits or Subsidies?
            </h3>
            <p className="mb-6 text-slate-300">
              Our compliance experts are ready to guide you through the entire process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/contact">
                  Start Your Application
                  <FileText className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10" asChild>
                <a href="tel:437-545-0067">
                  <Phone className="mr-2 h-5 w-5" />
                  Call: 437-545-0067
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}