"use client"

import * as React from "react"
import { Menu, X, Phone, ChevronDown, ChevronRight, Droplets, Shield, Wrench, Building2, Hammer, PenTool, HardHat, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

/* ──────────────────────── Data ──────────────────────── */

const serviceCategories = [
  {
    label: "Waterproofing",
    items: [
      { title: "Exterior Waterproofing", href: "/services/exterior-waterproofing", icon: Droplets },
      { title: "Interior Waterproofing", href: "/services/interior-waterproofing", icon: Droplets },
      { title: "Dampproofing", href: "/services/dampproofing", icon: Shield },
      { title: "French Drain Systems", href: "/services/drainage-solutions", icon: Layers },
    ],
  },
  {
    label: "Foundation",
    items: [
      { title: "Foundation Repair", href: "/services/foundation-repair", icon: Wrench },
      { title: "Underpinning", href: "/services/underpinning", icon: Building2 },
      { title: "Footings & Foundations", href: "/services/footings-foundations", icon: Hammer },
      { title: "Sump Pump Installation", href: "/services/sump-pump-installation", icon: Shield },
    ],
  },
  {
    label: "Construction",
    items: [
      { title: "Concrete Works", href: "/services/concrete-works", icon: HardHat },
      { title: "Legal Basement Conversion", href: "/services/legal-basement-conversion", icon: Building2 },
      { title: "Basement Walkout & Door Cutting", href: "/services/basement-walkout-door-cutting", icon: Hammer },
      { title: "Excavation Services", href: "/services/excavation-services", icon: HardHat },
    ],
  },
  {
    label: "Specialty",
    items: [
      { title: "Demolition Services", href: "/services/demolition-services", icon: Hammer },
      { title: "Radon Mitigation", href: "/services/radon-mitigation", icon: Shield },
      { title: "General Contracting", href: "/services/general-contracting", icon: HardHat },
      { title: "Permits & Drawings", href: "/services/permits", icon: PenTool },
      { title: "Design-Build", href: "/services/design-build", icon: Building2 },
    ],
  },
]

const locations = [
  { title: "Toronto", href: "/locations/toronto" },
  { title: "Mississauga", href: "/locations/mississauga" },
  { title: "Brampton", href: "/locations/brampton" },
  { title: "Vaughan", href: "/locations/vaughan" },
  { title: "Markham", href: "/locations/markham" },
  { title: "View All Areas", href: "/service-areas" },
]

const resources = [
  { title: "Cost Calculator", href: "/tools/waterproofing-cost-calculator" },
  { title: "Second Unit Planner", href: "/second-unit" },
  { title: "Blog & Guides", href: "/blog" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Government Rebates", href: "/government-rebates" },
  { title: "Financing", href: "/financing" },
  { title: "Warranty", href: "/warranty" },
]

/* ──────────────────────── Nav ──────────────────────── */

export function ModernNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null)
  const dropdownTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const openDropdown = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(name)
  }
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100"
            : "bg-white border-b border-slate-100"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 group">
            <Droplets className="h-7 w-7 text-cyan-500 transition-transform group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-slate-900">DRYSPACE</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-600">Waterproofing</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {/* Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("services")}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeDropdown === "services"
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-slate-700 hover:text-cyan-600 hover:bg-slate-50"
                )}
                aria-expanded={activeDropdown === "services"}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", activeDropdown === "services" && "rotate-180")} />
              </button>

              {/* Mega menu */}
              {activeDropdown === "services" && (
                <div
                  className="absolute left-1/2 top-full pt-2 -translate-x-1/2"
                  onMouseEnter={() => openDropdown("services")}
                  onMouseLeave={closeDropdown}
                >
                  <div className="w-[720px] rounded-xl border border-slate-200 bg-white p-6 shadow-float animate-fade-in">
                    <div className="grid grid-cols-4 gap-6">
                      {serviceCategories.map((cat) => (
                        <div key={cat.label}>
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-500">
                            {cat.label}
                          </p>
                          <ul className="space-y-1">
                            {cat.items.map((item) => (
                              <li key={item.href}>
                                <a
                                  href={item.href}
                                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                                >
                                  <item.icon className="h-3.5 w-3.5 text-slate-400" />
                                  {item.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <a href="/services" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors">
                        View all services &rarr;
                      </a>
                      <a href="/free-inspection" className="btn-primary !py-2 !px-4 !text-sm">
                        Get Free Inspection
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("locations")}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeDropdown === "locations"
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-slate-700 hover:text-cyan-600 hover:bg-slate-50"
                )}
                aria-expanded={activeDropdown === "locations"}
                aria-haspopup="true"
              >
                Areas
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", activeDropdown === "locations" && "rotate-180")} />
              </button>

              {activeDropdown === "locations" && (
                <div
                  className="absolute left-0 top-full pt-2"
                  onMouseEnter={() => openDropdown("locations")}
                  onMouseLeave={closeDropdown}
                >
                  <div className="w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-float animate-fade-in">
                    {locations.map((loc) => (
                      <a
                        key={loc.href}
                        href={loc.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        {loc.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("resources")}
              onMouseLeave={closeDropdown}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeDropdown === "resources"
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-slate-700 hover:text-cyan-600 hover:bg-slate-50"
                )}
                aria-expanded={activeDropdown === "resources"}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", activeDropdown === "resources" && "rotate-180")} />
              </button>

              {activeDropdown === "resources" && (
                <div
                  className="absolute left-0 top-full pt-2"
                  onMouseEnter={() => openDropdown("resources")}
                  onMouseLeave={closeDropdown}
                >
                  <div className="w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-float animate-fade-in">
                    {resources.map((r) => (
                      <a
                        key={r.href}
                        href={r.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        {r.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <a href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-cyan-600 hover:bg-slate-50">About</a>
            <a href="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-cyan-600 hover:bg-slate-50">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:437-545-0067"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              437-545-0067
            </a>
            <a href="/free-inspection" className="btn-primary !py-2 !px-5 !text-sm">
              Free Inspection
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* ──────── Mobile Full-Screen Overlay ──────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-navy-900 overflow-y-auto lg:hidden animate-fade-in">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <a href="/" className="flex items-center gap-1">
              <Droplets className="h-7 w-7 text-cyan-400" />
              <span className="text-xl font-bold text-white">DRYSPACE</span>
            </a>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="p-6 space-y-2" aria-label="Mobile navigation">
            {/* Services accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                aria-expanded={mobileExpanded === "services"}
              >
                Services
                <ChevronDown className={cn("h-5 w-5 text-cyan-400 transition-transform", mobileExpanded === "services" && "rotate-180")} />
              </button>
              {mobileExpanded === "services" && (
                <div className="mt-1 ml-4 space-y-4 pb-2">
                  {serviceCategories.map((cat) => (
                    <div key={cat.label}>
                      <p className="px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">{cat.label}</p>
                      {cat.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  ))}
                  <a href="/services" className="block px-4 py-2 text-cyan-400 font-medium" onClick={() => setMobileOpen(false)}>
                    View all services &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Locations accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileExpanded(mobileExpanded === "locations" ? null : "locations")}
                aria-expanded={mobileExpanded === "locations"}
              >
                Service Areas
                <ChevronDown className={cn("h-5 w-5 text-cyan-400 transition-transform", mobileExpanded === "locations" && "rotate-180")} />
              </button>
              {mobileExpanded === "locations" && (
                <div className="mt-1 ml-4 pb-2">
                  {locations.map((loc) => (
                    <a
                      key={loc.href}
                      href={loc.href}
                      className="block rounded-md px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {loc.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Resources accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-white/5 transition-colors"
                onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
                aria-expanded={mobileExpanded === "resources"}
              >
                Resources
                <ChevronDown className={cn("h-5 w-5 text-cyan-400 transition-transform", mobileExpanded === "resources" && "rotate-180")} />
              </button>
              {mobileExpanded === "resources" && (
                <div className="mt-1 ml-4 pb-2">
                  {resources.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="block rounded-md px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {r.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Direct links */}
            <a
              href="/about"
              className="block rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="block rounded-lg px-4 py-3 text-lg font-medium text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>

            {/* Mobile CTA */}
            <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
              <a
                href="tel:437-545-0067"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-500 px-6 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-amber-400"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-5 w-5" />
                437-545-0067
              </a>
              <a
                href="/free-inspection"
                className="flex items-center justify-center w-full rounded-lg border-2 border-cyan-500 px-6 py-4 text-lg font-semibold text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Free Inspection
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
