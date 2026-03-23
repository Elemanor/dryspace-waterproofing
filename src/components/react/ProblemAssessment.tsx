"use client"

import * as React from "react"
import { AlertTriangle, Droplets, Home, AlertCircle, Clock, Phone, ChevronRight, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const problems = [
  {
    id: "standing-water",
    title: "STANDING WATER",
    urgency: "EMERGENCY",
    timeframe: "24-48 HOURS",
    cost: "$5,000 - $15,000",
    severity: "critical",
    icon: Droplets,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    badgeVariant: "destructive" as const,
    symptoms: [
      "Puddles on basement floor",
      "Water seeping through walls", 
      "Wet spots after rain",
      "Visible water streams"
    ],
    causes: [
      "Hydrostatic pressure",
      "Foundation cracks",
      "Poor drainage",
      "High water table"
    ],
    action: "IMMEDIATE WATERPROOFING REQUIRED"
  },
  {
    id: "foundation-cracks",
    title: "FOUNDATION CRACKS",
    urgency: "HIGH PRIORITY",
    timeframe: "1-2 WEEKS",
    cost: "$500 - $5,000",
    severity: "high",
    icon: Home,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    badgeVariant: "default" as const,
    symptoms: [
      "Visible cracks in walls",
      "Stair-step cracks in blocks",
      "Horizontal cracks",
      "Widening gaps over time"
    ],
    causes: [
      "Settling foundation",
      "Frost damage",
      "Water pressure",
      "Soil movement"
    ],
    action: "CRACK INJECTION & REINFORCEMENT"
  },
  {
    id: "mold-mildew",
    title: "MOLD & MILDEW",
    urgency: "HEALTH HAZARD",
    timeframe: "3-5 DAYS",
    cost: "$2,000 - $8,000",
    severity: "high",
    icon: AlertCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-500",
    badgeVariant: "secondary" as const,
    symptoms: [
      "Black or green spots",
      "Musty odors",
      "Allergic reactions",
      "Peeling paint"
    ],
    causes: [
      "High humidity (>60%)",
      "Poor ventilation",
      "Water leaks",
      "Condensation"
    ],
    action: "MOLD REMEDIATION & MOISTURE CONTROL"
  },
  {
    id: "efflorescence",
    title: "EFFLORESCENCE",
    urgency: "MODERATE",
    timeframe: "2-4 WEEKS",
    cost: "$3,000 - $10,000",
    severity: "moderate",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-yellow-500",
    badgeVariant: "outline" as const,
    symptoms: [
      "White powdery deposits",
      "Salt crystals on walls",
      "Chalky residue",
      "Staining on concrete"
    ],
    causes: [
      "Water moving through walls",
      "Mineral deposits",
      "Poor waterproofing",
      "Moisture penetration"
    ],
    action: "WATERPROOFING TREATMENT"
  },
  {
    id: "dampness",
    title: "DAMPNESS & HUMIDITY",
    urgency: "PREVENTIVE",
    timeframe: "1-2 WEEKS",
    cost: "$1,500 - $4,000",
    severity: "low",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-500",
    badgeVariant: "outline" as const,
    symptoms: [
      "Condensation on windows",
      "Damp walls",
      "Musty smell",
      "Warped wood"
    ],
    causes: [
      "Poor ventilation",
      "Groundwater seepage",
      "Inadequate vapor barrier",
      "Plumbing leaks"
    ],
    action: "DEHUMIDIFICATION SYSTEM"
  },
  {
    id: "bowing-walls",
    title: "BOWING WALLS",
    urgency: "EMERGENCY",
    timeframe: "IMMEDIATE",
    cost: "$10,000 - $30,000",
    severity: "critical",
    icon: AlertTriangle,
    color: "text-red-700",
    bgColor: "bg-red-100",
    borderColor: "border-red-600",
    badgeVariant: "destructive" as const,
    symptoms: [
      "Walls curving inward",
      "Horizontal cracks",
      "Gaps at floor/ceiling",
      "Doors not closing"
    ],
    causes: [
      "Hydrostatic pressure",
      "Frost pressure",
      "Expansive soil",
      "Poor drainage"
    ],
    action: "WALL ANCHORS OR REBUILD"
  }
]

export function ProblemAssessment() {
  const [selectedProblem, setSelectedProblem] = React.useState<string | null>(null)

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            BASEMENT PROBLEM ASSESSMENT
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Identify your basement issue below. Each problem requires different solutions and urgency levels.
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-500 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-bold">EXPERIENCING FLOODING RIGHT NOW?</AlertTitle>
          <AlertDescription className="text-red-800">
            <p className="mb-3">Our emergency response team is available 24/7 for immediate water removal</p>
            <Button variant="destructive" size="lg" className="font-bold" asChild>
              <a href="tel:437-545-0067">
                <Phone className="mr-2 h-5 w-5" />
                CALL EMERGENCY LINE: 437-545-0067
              </a>
            </Button>
          </AlertDescription>
        </Alert>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Card 
              key={problem.id}
              className={cn(
                "relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl",
                selectedProblem === problem.id && "ring-2 ring-offset-2 ring-blue-500",
                problem.severity === "critical" && "border-2",
                problem.borderColor
              )}
              onClick={() => setSelectedProblem(problem.id === selectedProblem ? null : problem.id)}
            >
              {/* Urgency Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={problem.badgeVariant} className="font-bold">
                  {problem.urgency}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className={cn("p-3 rounded-lg", problem.bgColor)}>
                    <problem.icon className={cn("h-6 w-6", problem.color)} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold">{problem.title}</CardTitle>
                    <CardDescription className="text-sm font-semibold mt-1">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {problem.timeframe}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Cost Estimate */}
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-600 font-medium">Est. Cost:</p>
                  <p className="text-lg font-bold text-slate-900">{problem.cost}</p>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-sm text-slate-700 mb-2">What You See:</h4>
                  <ul className="space-y-1">
                    {problem.symptoms.map((symptom, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-start">
                        <span className="text-slate-400 mr-2">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Show causes when selected */}
                {selectedProblem === problem.id && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-sm text-slate-700 mb-2">Common Causes:</h4>
                    <ul className="space-y-1">
                      {problem.causes.map((cause, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-slate-400 mr-2">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Required */}
                <div className={cn("p-3 rounded-lg text-center", problem.bgColor)}>
                  <p className={cn("text-xs font-bold uppercase tracking-wide", problem.color)}>
                    {problem.action}
                  </p>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full" 
                  variant={problem.severity === "critical" ? "destructive" : "default"}
                  asChild
                >
                  <a href="/free-inspection">
                    Get Professional Diagnosis
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-slate-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Not Sure Which Problem You Have?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Our certified inspectors will diagnose your basement issues for FREE and provide a detailed solution plan with transparent pricing.
          </p>
          <Button size="lg" className="font-bold" asChild>
            <a href="/free-inspection">
              Book Free Inspection
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}