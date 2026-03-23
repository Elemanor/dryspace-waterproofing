import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Home, Hammer, Palette, Clock } from 'lucide-react';

const services = [
  {
    title: "Concrete Slabs & Floors",
    icon: Home,
    description: "Professional installation of basement floors, garage slabs, and commercial flooring",
    features: [
      "4-6 inch reinforced slabs",
      "Vapor barrier installation",
      "Heated floor systems",
      "Polished & epoxy finishes"
    ],
    price: "$8-12/sq ft"
  },
  {
    title: "Concrete Walls",
    icon: Hammer,
    description: "Poured concrete and block walls for foundations, retaining walls, and privacy",
    features: [
      "8-10 inch foundation walls",
      "Engineered retaining walls",
      "ICF insulated walls",
      "Decorative finishes"
    ],
    price: "$150-250/linear ft"
  },
  {
    title: "Outdoor Concrete",
    icon: Home,
    description: "Transform your outdoor spaces with durable concrete installations",
    features: [
      "Driveways (6\" reinforced)",
      "Patios & pool decks",
      "Sidewalks & walkways",
      "Steps & landings"
    ],
    price: "$10-18/sq ft"
  },
  {
    title: "Stamped & Decorative",
    icon: Palette,
    description: "Beautiful stamped patterns that mimic natural stone, brick, or wood",
    features: [
      "30+ pattern options",
      "Custom color blends",
      "Borders & accents",
      "Sealed & protected"
    ],
    price: "$15-25/sq ft"
  }
];

const projectTypes = [
  { name: "Basement Floors", time: "1-2 days", warranty: "25 years" },
  { name: "Driveways", time: "2-3 days", warranty: "25 years" },
  { name: "Patios", time: "1-2 days", warranty: "15 years" },
  { name: "Walkways", time: "1 day", warranty: "15 years" },
  { name: "Retaining Walls", time: "3-5 days", warranty: "25 years" },
  { name: "Stamped Concrete", time: "2-3 days", warranty: "10 years" }
];

export default function ConcreteServices() {
  return (
    <div className="w-full">
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-50 rounded-lg">
                      <Icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <span className="text-lg font-bold text-cyan-600">{service.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Timeline Table */}
      <div className="bg-slate-50 rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold mb-6">Typical Project Timelines</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {projectTypes.map((project, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border">
              <h4 className="font-semibold mb-2">{project.name}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">Completion: {project.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-600" />
                  <span className="text-slate-600">Warranty: {project.warranty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Concrete Project?</h3>
        <p className="mb-6 opacity-95">
          Get a free quote with detailed pricing and timeline for your specific needs
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-white text-cyan-600 hover:bg-slate-100">
            Get Free Quote
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            View Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}