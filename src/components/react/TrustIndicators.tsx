import React from 'react';
import { Shield, Award, FileCheck, Clock, Star, CheckCircle, Users, Briefcase } from 'lucide-react';

interface TrustIndicator {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlight?: boolean;
}

const indicators: TrustIndicator[] = [
  { icon: <Shield className="w-6 h-6" />, title: "25-Year Warranty", subtitle: "Fully transferable", highlight: true },
  { icon: <Award className="w-6 h-6" />, title: "25+ Years", subtitle: "Industry experience" },
  { icon: <FileCheck className="w-6 h-6" />, title: "Fully Licensed", subtitle: "OBC 2024 compliant" },
  { icon: <Clock className="w-6 h-6" />, title: "<60 Minutes", subtitle: "Emergency response", highlight: true },
  { icon: <Star className="w-6 h-6" />, title: "4.9/5 Rating", subtitle: "487+ reviews" },
  { icon: <CheckCircle className="w-6 h-6" />, title: "WSIB Cleared", subtitle: "Full compliance" },
  { icon: <Users className="w-6 h-6" />, title: "15,000+", subtitle: "Homes protected" },
  { icon: <Briefcase className="w-6 h-6" />, title: "$5M Insurance", subtitle: "Liability coverage" },
];

export default function TrustIndicators() {
  return (
    <div className="w-full">
      {/* Compact trust strip */}
      <div className="bg-navy-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {indicators.map((indicator, index) => (
              <div key={index} className="text-center group">
                <div className={`mx-auto mb-2 transition-colors ${indicator.highlight ? 'text-amber-400' : 'text-cyan-400 group-hover:text-cyan-300'}`}>
                  {indicator.icon}
                </div>
                <div className="text-sm font-semibold">{indicator.title}</div>
                <div className="text-xs text-slate-400">{indicator.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust detail cards */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-label-pill mb-3">Why Choose Us</p>
            <h3 className="text-headline text-slate-900">Why Toronto Trusts Dryspace</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-interactive p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-7 h-7 text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Permit Excellence</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We handle all permits and inspections. Stand-alone drain permits processed in ~10 business days.
              </p>
            </div>

            <div className="card-interactive p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-cyan-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Lifetime Protection</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our 25-year transferable warranty protects your investment and adds value to your home.
              </p>
            </div>

            <div className="card-interactive p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Rapid Response</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                24/7 emergency service with response under 60 minutes. Flooding doesn't wait, neither do we.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance banner */}
      <div className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-xl border border-cyan-100 bg-white p-6 shadow-card">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1.5">
                  Full Compliance with Ontario Building Code 2024
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Licensed and WSIB-cleared teams installing to Ontario's latest Building Code requirements.
                  We handle all permits, inspections, and City of Toronto subsidy applications up to $3,400.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">Building Code 2024</span>
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">WSIB Cleared</span>
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">OHSA Compliant</span>
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">$3,400 Rebate Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
