"use client"

import * as React from "react"
import { 
  Droplets, 
  Home, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Zap,
  Calendar,
  Award
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "exterior-waterproofing",
    title: "Exterior Waterproofing",
    description: "Complete exterior protection with membrane installation and drainage",
    price: "$5,000 - $15,000",
    duration: "3-5 days",
    category: "waterproofing",
    popular: true,
    rebate: false,
    icon: ShieldCheck,
    color: "blue",
    features: [
      "Excavation to foundation",
      "Waterproof membrane application",
      "Drainage tile installation",
      "Lifetime transferable warranty"
    ],
    href: "/services/exterior-waterproofing"
  },
  {
    id: "interior-waterproofing",
    title: "Interior Waterproofing",
    description: "Interior drainage system to manage water infiltration",
    price: "$3,000 - $8,000",
    duration: "2-3 days",
    category: "waterproofing",
    popular: false,
    rebate: false,
    icon: Home,
    color: "green",
    features: [
      "Interior weeping tile",
      "Connects to sump pump",
      "Minimal excavation",
      "Less disruptive"
    ],
    href: "/services/interior-waterproofing"
  },
  {
    id: "sump-pump",
    title: "Sump Pump Installation",
    description: "Professional sump pump system with battery backup",
    price: "$2,000 - $4,000",
    duration: "1 day",
    category: "drainage",
    popular: false,
    rebate: true,
    icon: Wrench,
    color: "purple",
    features: [
      "High-capacity pump",
      "Battery backup system",
      "Check valve installation",
      "Annual maintenance included",
      "Permit processing: 10 days"
    ],
    href: "/services/sump-pump-installation"
  },
  {
    id: "french-drain",
    title: "French Drain System",
    description: "Perimeter drainage to redirect water away from foundation",
    price: "$4,000 - $10,000",
    duration: "2-4 days",
    category: "drainage",
    popular: false,
    rebate: false,
    icon: Droplets,
    color: "indigo",
    features: [
      "Perforated pipe system",
      "Gravel bed installation",
      "Landscape restoration",
      "10-year warranty"
    ],
    href: "/services/french-drain"
  },
  {
    id: "foundation-crack",
    title: "Foundation Crack Repair",
    description: "Professional injection repair for foundation cracks",
    price: "$500 - $1,500/crack",
    duration: "2-4 hours",
    category: "repair",
    popular: false,
    rebate: false,
    icon: Home,
    color: "orange",
    features: [
      "Polyurethane injection",
      "Interior & exterior repair",
      "Structural assessment",
      "Lifetime transferable warranty"
    ],
    href: "/services/foundation-repair"
  },
  {
    id: "backwater-valve",
    title: "Backwater Valve",
    description: "Prevent sewage backup with certified valve installation",
    price: "$2,500 - $3,500",
    duration: "1 day",
    category: "drainage",
    popular: false,
    rebate: true,
    icon: ShieldCheck,
    color: "teal",
    features: [
      "City-approved models",
      "Permit handling included",
      "Annual inspection",
      "Permit included: 10 days",
      "Rebate assistance"
    ],
    href: "/services/backwater-valve-installation"
  },
  {
    id: "underpinning",
    title: "Basement Underpinning",
    description: "Lower your basement floor for additional headroom",
    price: "$15,000 - $50,000",
    duration: "2-4 weeks",
    category: "structural",
    popular: true,
    rebate: false,
    icon: Home,
    color: "red",
    features: [
      "Structural engineering",
      "Permit management",
      "Foundation strengthening",
      "Increase home value"
    ],
    href: "/services/underpinning"
  },
  {
    id: "emergency",
    title: "Emergency Water Removal",
    description: "24/7 emergency response for basement flooding",
    price: "$500 - $2,000",
    duration: "Same day",
    category: "emergency",
    popular: false,
    rebate: false,
    emergency: true,
    icon: Zap,
    color: "red",
    features: [
      "<60 minute response time",
      "Industrial pumps",
      "Drying equipment",
      "Insurance assistance"
    ],
    href: "/services/emergency-waterproofing"
  },
  {
    id: "window-well",
    title: "Window-Well Drainage",
    description: "Proper drainage and grading to direct water away from foundation",
    price: "$1,500 - $3,500",
    duration: "1-2 days",
    category: "drainage",
    popular: false,
    rebate: false,
    icon: Home,
    color: "yellow",
    features: [
      "Window well excavation",
      "Drainage stone installation",
      "Proper grading restoration",
      "Connects to weeping tile",
      "Permit handled: 10 days"
    ],
    href: "/services/window-well-drainage"
  }
]

const categories = [
  { id: "all", label: "All Services", count: services.length },
  { id: "waterproofing", label: "Waterproofing", count: services.filter(s => s.category === "waterproofing").length },
  { id: "drainage", label: "Drainage", count: services.filter(s => s.category === "drainage").length },
  { id: "repair", label: "Repairs", count: services.filter(s => s.category === "repair").length },
  { id: "structural", label: "Structural", count: services.filter(s => s.category === "structural").length },
  { id: "emergency", label: "Emergency", count: services.filter(s => s.category === "emergency").length }
]

const colorMap = {
  blue: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-blue-200" },
  green: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-green-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  indigo: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-indigo-200" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
  red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  yellow: { bg: "bg-amber-50", text: "text-amber-500", border: "border-yellow-200" }
}

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  
  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(s => s.category === selectedCategory)

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our Waterproofing Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive solutions for every water problem. All services include free inspection, professional installation, and warranty protection.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="flex flex-col py-3"
              >
                <span className="font-medium">{cat.label}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const colors = colorMap[service.color as keyof typeof colorMap]
            
            return (
              <Card 
                key={service.id}
                className={cn(
                  "relative overflow-hidden hover:shadow-xl transition-all duration-300",
                  service.emergency && "border-red-500 border-2"
                )}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {service.popular && (
                    <Badge variant="default" className="bg-cyan-600">
                      Popular
                    </Badge>
                  )}
                  {service.rebate && (
                    <Badge variant="secondary" className="bg-cyan-50 text-cyan-700">
                      Rebate Available
                    </Badge>
                  )}
                  {service.emergency && (
                    <Badge variant="destructive">
                      24/7
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={cn("p-3 rounded-lg", colors.bg)}>
                      <service.icon className={cn("h-6 w-6", colors.text)} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className={cn("p-4 rounded-lg", colors.bg, colors.border, "border")}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Investment</span>
                      <span className={cn("text-lg font-bold", colors.text)}>
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    variant={service.emergency ? "destructive" : "default"}
                    asChild
                  >
                    <a href="/contact">
                      Get Quote
                      <DollarSign className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-slate-900 text-white p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              All Services Include Our Industry-Leading Warranty
            </h3>
            <p className="mb-6 text-slate-300">
              Lifetime transferable warranty • 24/7 emergency support • Free annual inspections • Guaranteed workmanship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/free-inspection">
                  Book Free Inspection
                  <Calendar className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10" asChild>
                <a href="tel:437-545-0067">
                  Call: 437-545-0067
                  <AlertCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}