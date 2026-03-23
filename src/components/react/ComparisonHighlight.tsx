import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Sparkles, TrendingUp, Shield, Clock } from 'lucide-react';

interface Enhancement {
  feature: string;
  before: string;
  after: string;
  impact: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

const enhancements: Enhancement[] = [
  {
    feature: "Cost Estimation",
    before: "Static pricing ranges only",
    after: "Interactive calculator with site conditions, rebates, and financing",
    impact: "high",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    feature: "Service Display",
    before: "Basic text descriptions",
    after: "Interactive cards with pricing, duration, and instant quotes",
    impact: "high",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    feature: "Emergency Response",
    before: "Phone number in header",
    after: "Multiple CTAs: floating button, banner, and animated alerts",
    impact: "high",
    icon: <Clock className="w-5 h-5" />
  },
  {
    feature: "Compliance Info",
    before: "Basic permit mention",
    after: "Detailed Building Code, WSIB, permit timeline, and subsidy details",
    impact: "medium",
    icon: <Shield className="w-5 h-5" />
  },
  {
    feature: "Customer Reviews",
    before: "Static testimonials",
    after: "Auto-playing carousel with verified reviews and trust badges",
    impact: "medium",
    icon: <CheckCircle className="w-5 h-5" />
  },
  {
    feature: "FAQ Section",
    before: "Static Q&A list",
    after: "Interactive accordion with search and categorization",
    impact: "medium",
    icon: <Sparkles className="w-5 h-5" />
  }
];

export default function ComparisonHighlight() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="mb-4 px-4 py-1 text-sm bg-cyan-50 text-cyan-700 border-blue-300">
          Enhancement Summary
        </Badge>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          How We've Enhanced Your Experience
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          We've integrated advanced features from industry leaders to provide you with the most comprehensive
          waterproofing service platform in Toronto.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {enhancements.map((item, index) => (
          <Card key={index} className="relative overflow-hidden border-2 hover:shadow-xl transition-shadow">
            {item.impact === 'high' && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl">
                HIGH IMPACT
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  item.impact === 'high' ? 'bg-red-100 text-red-600' :
                  item.impact === 'medium' ? 'bg-cyan-50 text-cyan-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {item.icon}
                </div>
                <span className="text-lg">{item.feature}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Before:</span>
                    <p className="text-sm text-slate-600">{item.before}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-cyan-600 uppercase font-semibold">Now:</span>
                    <p className="text-sm font-medium text-slate-900">{item.after}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">6+</div>
              <div className="text-sm opacity-90">Interactive Components Added</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-90">Faster Quote Generation</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Emergency Response CTAs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Mobile Responsive Design</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Powered By Modern Technology</h3>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Badge variant="outline" className="px-4 py-2">
            <span className="font-semibold">Astro.js</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <span className="font-semibold">React 18</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <span className="font-semibold">shadcn/ui</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <span className="font-semibold">Tailwind CSS</span>
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <span className="font-semibold">TypeScript</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}