import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Shield, CheckCircle } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  service: string;
  location: string;
  date: string;
  image: string;
  description: string;
  features: string[];
  customer: {
    name: string;
    testimonial: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Complete Exterior Waterproofing",
    service: "Exterior Waterproofing",
    location: "North York",
    date: "November 2024",
    image: "/images/waterproofing/exterior-project-1.webp",
    description: "Full excavation and membrane installation for a 1960s home experiencing severe water infiltration.",
    features: ["25-year warranty", "Drainage tile", "Membrane application", "Permit handled"],
    customer: {
      name: "Sarah M.",
      testimonial: "Completely transformed our basement. No leaks even during the heaviest storms!"
    }
  },
  {
    id: 2,
    title: "Emergency Sump Pump Installation",
    service: "Sump Pump System",
    location: "Etobicoke",
    date: "October 2024",
    image: "/images/waterproofing/sump-pump-project.webp",
    description: "Emergency installation with battery backup during flooding event. Response time: 45 minutes.",
    features: ["Battery backup", "24/7 response", "$1,750 subsidy", "Annual maintenance"],
    customer: {
      name: "Michael R.",
      testimonial: "Saved our basement during power outage. Incredible response time!"
    }
  },
  {
    id: 3,
    title: "Foundation Crack Injection",
    service: "Crack Repair",
    location: "Scarborough",
    date: "September 2024",
    image: "/images/waterproofing/crack-repair-project.webp",
    description: "Polyurethane injection repair for multiple foundation cracks. Lifetime warranty provided.",
    features: ["4-hour completion", "Lifetime warranty", "No excavation", "Immediate results"],
    customer: {
      name: "David L.",
      testimonial: "5-year leak stopped in just 4 hours. Amazing work!"
    }
  },
  {
    id: 4,
    title: "French Drain Installation",
    service: "French Drain System",
    location: "Mississauga",
    date: "August 2024",
    image: "/images/waterproofing/french-drain-project.webp",
    description: "Complete perimeter drainage system installation with connection to existing sump pump.",
    features: ["Perforated pipe", "Gravel bed", "Landscape restored", "10-year warranty"],
    customer: {
      name: "Jennifer K.",
      testimonial: "No more water pooling around foundation. Professional team!"
    }
  },
  {
    id: 5,
    title: "Basement Underpinning",
    service: "Underpinning",
    location: "Toronto",
    date: "July 2024",
    image: "/images/waterproofing/underpinning-project.webp",
    description: "Lowered basement floor by 2 feet, adding significant value and living space.",
    features: ["Structural engineering", "All permits", "2 feet added", "Increased value"],
    customer: {
      name: "Robert T.",
      testimonial: "Major project handled perfectly. Passed all city inspections!"
    }
  },
  {
    id: 6,
    title: "Window Well Drainage",
    service: "Window Well System",
    location: "Vaughan",
    date: "June 2024",
    image: "/images/waterproofing/window-well-project.webp",
    description: "New window well drainage system preventing water accumulation and basement flooding.",
    features: ["Proper grading", "Drainage stone", "Connected to tile", "Custom solution"],
    customer: {
      name: "Lisa W.",
      testimonial: "Finally solved our window well flooding problem!"
    }
  }
];

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Recent Projects Gallery</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Real projects, real results. See how we've protected GTA homes from water damage.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Image */}
            <div className="relative h-48 bg-slate-200">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/waterproofing/placeholder.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-white/90 text-slate-900">
                  {project.service}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{project.title}</h3>
              
              {/* Location and Date */}
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-4">{project.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Customer Quote */}
              <div className="border-t pt-4">
                <p className="text-sm italic text-slate-600">
                  "{project.customer.testimonial}"
                </p>
                <p className="text-xs text-slate-500 mt-1">- {project.customer.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">10,847</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">25+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Licensed & Insured</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-90">Emergency Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Showcase */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">Before & After Results</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="relative">
              <img 
                src="/images/waterproofing/before-basement.webp" 
                alt="Before waterproofing"
                className="w-full rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/waterproofing/placeholder.webp';
                }}
              />
              <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                BEFORE
              </Badge>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-900 mb-1">Common Problems</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Water seepage through walls</li>
                <li>• Efflorescence (white deposits)</li>
                <li>• Mold and mildew growth</li>
                <li>• Foundation cracks</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <img 
                src="/images/waterproofing/after-basement.webp" 
                alt="After waterproofing"
                className="w-full rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/waterproofing/placeholder.webp';
                }}
              />
              <Badge className="absolute top-4 left-4 bg-cyan-600 text-white">
                AFTER
              </Badge>
            </div>
            <div className="bg-cyan-50 border-l-4 border-green-500 p-4">
              <h4 className="font-bold text-cyan-800 mb-1">Our Solutions</h4>
              <ul className="text-sm text-cyan-700 space-y-1">
                <li>• Complete waterproofing system</li>
                <li>• Lifetime transferable warranty</li>
                <li>• Dry, healthy basement</li>
                <li>• Increased home value</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center bg-slate-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Ready to Protect Your Home?
        </h3>
        <p className="text-slate-600 mb-6">
          Join thousands of satisfied GTA homeowners. Get your free inspection today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
            Book Free Inspection
          </Button>
          <Button size="lg" variant="outline">
            View More Projects
          </Button>
        </div>
      </div>

      {/* Project Detail Modal (if needed) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              {/* Add more detailed project view here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}