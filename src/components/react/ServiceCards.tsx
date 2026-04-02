import React from 'react';
import {
  Droplets,
  Home,
  Wrench,
  Shield,
  Zap,
  Building,
  Waves,
  HardHat,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  subsidyEligible?: boolean;
  href: string;
}

const services: Service[] = [
  {
    title: "Exterior Waterproofing",
    description: "Complete exterior protection with membrane installation and drainage",
    icon: <Shield className="w-6 h-6" />,
    price: "$5,000 - $15,000",
    duration: "3-5 days",
    features: ["Excavation to foundation", "Waterproof membrane", "Drainage tile installation", "25-year warranty"],
    popular: true,
    href: "/services/exterior-waterproofing"
  },
  {
    title: "Interior Waterproofing",
    description: "Interior drainage system to manage water infiltration",
    icon: <Home className="w-6 h-6" />,
    price: "$3,000 - $8,000",
    duration: "2-3 days",
    features: ["Interior weeping tile", "Sump pump connection", "Minimal excavation", "Less disruptive"],
    href: "/services/interior-waterproofing"
  },
  {
    title: "Sump Pump Installation",
    description: "Professional sump pump system with battery backup",
    icon: <Zap className="w-6 h-6" />,
    price: "$2,000 - $4,000",
    duration: "1 day",
    features: ["High-capacity pump", "Battery backup", "Check valve included", "Annual maintenance"],
    subsidyEligible: true,
    href: "/services/sump-pump-installation"
  },
  {
    title: "French Drain System",
    description: "Perimeter drainage to redirect water away from foundation",
    icon: <Waves className="w-6 h-6" />,
    price: "$4,000 - $10,000",
    duration: "2-4 days",
    features: ["Perforated pipe system", "Gravel bed installation", "Landscape restoration", "10-year warranty"],
    href: "/services/drainage-solutions"
  },
  {
    title: "Foundation Crack Repair",
    description: "Professional injection repair for foundation cracks",
    icon: <Wrench className="w-6 h-6" />,
    price: "$500 - $1,500/crack",
    duration: "2-4 hours",
    features: ["Polyurethane injection", "Interior & exterior", "Structural assessment", "Lifetime warranty"],
    href: "/services/foundation-repair"
  },
  {
    title: "Backwater Valve",
    description: "Prevent sewage backup with certified valve installation",
    icon: <Droplets className="w-6 h-6" />,
    price: "$2,500 - $3,500",
    duration: "1 day",
    features: ["City-approved models", "Permit handling", "Annual inspection", "Rebate assistance"],
    subsidyEligible: true,
    href: "/services/backwater-valve-installation"
  },
  {
    title: "Basement Underpinning",
    description: "Lower your basement floor for additional headroom",
    icon: <Building className="w-6 h-6" />,
    price: "$15,000 - $50,000",
    duration: "2-4 weeks",
    features: ["Structural engineering", "Permit management", "Foundation strengthening", "Increase home value"],
    popular: true,
    href: "/services/underpinning"
  },
  {
    title: "Emergency Water Removal",
    description: "24/7 emergency response for basement flooding",
    icon: <HardHat className="w-6 h-6" />,
    price: "$500 - $2,000",
    duration: "Same day",
    features: ["<60 min response", "Industrial pumps", "Drying equipment", "Insurance assistance"],
    href: "/services/emergency-waterproofing"
  },
];

export default function ServiceCards() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="section-label-pill mb-4">Our Services</p>
        <h2 className="text-headline text-slate-900 mb-4">Complete Waterproofing Solutions</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Comprehensive solutions for every water problem. All services include free inspection,
          professional installation, and warranty protection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <a
            key={index}
            href={service.href}
            className="group relative rounded-xl border border-slate-200/60 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
          >
            {/* Badges */}
            {service.popular && (
              <span className="absolute -top-2.5 right-4 rounded-full bg-cyan-500 px-3 py-0.5 text-[11px] font-semibold text-white">
                Popular
              </span>
            )}
            {service.subsidyEligible && (
              <span className="absolute -top-2.5 left-4 rounded-full bg-amber-500 px-3 py-0.5 text-[11px] font-semibold text-navy-900">
                Rebate
              </span>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                {service.icon}
              </div>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {service.duration}
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">{service.description}</p>

            {/* Price */}
            <p className="text-sm font-bold text-cyan-600 mb-3">{service.price}</p>

            {/* Features */}
            <ul className="space-y-1.5 mb-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Learn more */}
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-cyan-500 transition-colors">
              Learn more
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-navy-900 to-cyan-900 p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">Not Sure Which Service You Need?</h3>
        <p className="text-slate-300 mb-6 text-sm">
          Our experts will inspect your property for FREE and recommend the best solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/free-inspection" className="btn-primary">
            Book Free Inspection
          </a>
          <a href="tel:437-545-0067" className="btn-ghost border-2 border-white/20">
            Call 437-545-0067
          </a>
        </div>
      </div>
    </div>
  );
}
