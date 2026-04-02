"use client"

import * as React from "react"
import { Calendar, Shield, Clock, Star, Home, Award, CheckCircle } from "lucide-react"

const stats = [
  { icon: Calendar, value: "25+", label: "Years", sublabel: "Est. 1999" },
  { icon: Home, value: "15,000+", label: "Projects", sublabel: "Completed" },
  { icon: Shield, value: "100%", label: "Licensed", sublabel: "& Insured" },
  { icon: Clock, value: "24/7", label: "Emergency", sublabel: "Response" },
  { icon: Star, value: "A+", label: "BBB", sublabel: "Accredited" },
  { icon: Award, value: "A+", label: "BBB", sublabel: "Accredited" },
]

export function StatsBar() {
  return (
    <section className="bg-navy-900 py-12">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 mb-3 transition-colors group-hover:bg-cyan-500/20">
                <stat.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs text-slate-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
            {[
              "City of Toronto Licensed",
              "WSIB Cleared",
              "$5M Liability Insurance",
              "HomeStars Verified"
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 border border-white/10">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-slate-300 font-medium text-xs uppercase tracking-wider">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
