import { useState } from 'react';
import {
  Shield,
  Zap,
  Sun,
  Thermometer,
  HardHat,
  Droplets,
  Wind,
  Check,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Home,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  type CitySlug,
  cities,
  buildPackages,
  addOns,
  getPackageCost,
  getAddOnCost,
  calculateBuildCost,
  getApplicableIncentives,
  calculateIncentiveTotal,
  calculateNetCost,
  calculateROI,
  formatPrice,
  formatPriceRange
} from '@/lib/data/second-unit-planner';

interface SecondUnitPlannerProps {
  citySlug: string;
}

const iconMap = {
  shield: Shield,
  zap: Zap,
  sun: Sun,
  thermometer: Thermometer,
  'hard-hat': HardHat,
  droplets: Droplets,
  wind: Wind,
};

export default function SecondUnitPlanner({ citySlug }: SecondUnitPlannerProps) {
  const city = cities[citySlug as CitySlug];

  // State
  const [selectedPackageId, setSelectedPackageId] = useState<'budget' | 'standard' | 'premium'>('standard');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<Set<string>>(new Set());
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set());

  // Guard
  if (!city) return null;

  // Get selected package
  const selectedPackage = buildPackages.find(pkg => pkg.id === selectedPackageId)!;

  // Get selected add-ons
  const selectedAddOns = addOns.filter(addon => selectedAddOnIds.has(addon.id));

  // Calculate costs
  const buildCost = calculateBuildCost(selectedPackage, selectedAddOns, city.slug);
  const applicableIncentives = getApplicableIncentives(city.slug, Array.from(selectedAddOnIds));
  const { cashIncentives, financingAvailable } = calculateIncentiveTotal(applicableIncentives);
  const netCost = calculateNetCost(buildCost.min, buildCost.max, cashIncentives);
  const roi = calculateROI(netCost.min, netCost.max, city.rentalIncome);

  // Handlers
  const toggleAddOn = (addOnId: string) => {
    const newSet = new Set(selectedAddOnIds);
    if (newSet.has(addOnId)) {
      newSet.delete(addOnId);
    } else {
      newSet.add(addOnId);
    }
    setSelectedAddOnIds(newSet);
  };

  const togglePackageDetails = (packageId: string) => {
    const newSet = new Set(expandedPackages);
    if (newSet.has(packageId)) {
      newSet.delete(packageId);
    } else {
      newSet.add(packageId);
    }
    setExpandedPackages(newSet);
  };

  return (
    <div className="space-y-10">
      {/* 1. Package Selector */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buildPackages.map((pkg) => {
            const pkgCost = getPackageCost(pkg, city.slug);
            const isSelected = selectedPackageId === pkg.id;
            const isExpanded = expandedPackages.has(pkg.id);

            return (
              <div
                key={pkg.id}
                className={cn(
                  "rounded-xl border bg-white p-6 cursor-pointer transition-all hover:shadow-md",
                  isSelected
                    ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500"
                    : "border-slate-200"
                )}
                onClick={() => setSelectedPackageId(pkg.id)}
              >
                {/* Radio button */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-slate-300"
                    )}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{pkg.description}</p>
                    <p className="text-xl font-bold text-cyan-600">
                      {formatPriceRange(pkgCost.min, pkgCost.max)}
                    </p>
                  </div>
                </div>

                {/* Includes list (collapsible) */}
                <div className="mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePackageDetails(pkg.id);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      isExpanded && "rotate-180"
                    )} />
                  </button>

                  {isExpanded && (
                    <ul className="mt-3 space-y-2">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Add-On Checklist */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Add-Ons & Upgrades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addon) => {
            const addonCost = getAddOnCost(addon, city.slug);
            const isSelected = selectedAddOnIds.has(addon.id);
            const IconComponent = iconMap[addon.icon as keyof typeof iconMap];

            return (
              <div
                key={addon.id}
                className={cn(
                  "rounded-xl border bg-white p-5 cursor-pointer transition-all hover:shadow-md",
                  isSelected
                    ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500"
                    : "border-slate-200"
                )}
                onClick={() => toggleAddOn(addon.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    isSelected ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-600"
                  )}>
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base font-bold text-slate-900">{addon.name}</h3>

                      {/* Checkbox */}
                      <div className={cn(
                        "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-cyan-500 bg-cyan-500"
                          : "border-slate-300"
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-3">{addon.description}</p>

                    <div className="flex items-center gap-3">
                      <p className="text-base font-semibold text-slate-900">
                        {formatPriceRange(addonCost.min, addonCost.max)}
                      </p>

                      {addon.rebateIds.length > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                          Rebate eligible
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Cost Waterfall */}
      <section className="rounded-2xl bg-navy-900 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Cost Breakdown</h2>

        <div className="space-y-6">
          {/* Base package + add-ons */}
          {buildCost.breakdown.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-white font-medium">{formatPriceRange(item.min, item.max)}</span>
              </div>
              <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          ))}

          {/* Subtotal line */}
          <div className="border-t border-navy-700 pt-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">Total Before Incentives</span>
              <span className="text-xl font-bold text-white">{formatPriceRange(buildCost.min, buildCost.max)}</span>
            </div>
          </div>

          {/* Incentives (negative bars) */}
          {applicableIncentives.filter(inc => inc.amountType !== 'financing').map((inc, idx) => (
            <div key={inc.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{inc.name}</span>
                <span className="text-emerald-400 font-medium">-{formatPrice(inc.amount)}</span>
              </div>
              <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                  style={{ width: '80%' }}
                />
              </div>
            </div>
          ))}

          {/* Net cost line */}
          <div className="border-t-2 border-cyan-500 pt-4 mt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">Net Cost After Incentives</span>
              <span className="text-2xl font-bold text-cyan-400">{formatPriceRange(netCost.min, netCost.max)}</span>
            </div>
          </div>

          {/* Financing note */}
          {financingAvailable > 0 && (
            <div className="mt-6 p-4 bg-navy-800 rounded-lg border border-cyan-500/30">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Low-Interest Financing Available</p>
                  <p className="text-sm text-slate-300">
                    Up to <span className="font-semibold text-cyan-400">{formatPrice(financingAvailable)}</span> in
                    {applicableIncentives.find(inc => inc.amountType === 'financing')?.name.includes('HELP')
                      ? ' Toronto HELP low-interest financing (as low as 3%)'
                      : ' low-interest financing'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. ROI Summary */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Return on Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Monthly Rental Income */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Home className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-600">Monthly Rental Income</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {formatPriceRange(city.rentalIncome.min, city.rentalIncome.max)}
            </p>
            <p className="text-xs text-slate-500 mt-1">per month</p>
          </div>

          {/* Payback Period */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-600">Payback Period</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {netCost.min === 0 && netCost.max === 0
                ? 'Immediate'
                : `${roi.paybackYearsMin}–${roi.paybackYearsMax} years`}
            </p>
            <p className="text-xs text-slate-500 mt-1">to recover investment</p>
          </div>

          {/* Annual ROI */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-600">Annual ROI</h3>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {netCost.min === 0 && netCost.max === 0
                ? '∞%'
                : `${roi.annualRoiMin}–${roi.annualRoiMax}%`}
            </p>
            <p className="text-xs text-slate-500 mt-1">return on investment</p>
          </div>

          {/* Property Value Lift */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-medium text-slate-600">Property Value Lift</h3>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {city.propertyValueLift}
            </p>
            <p className="text-xs text-slate-500 mt-1">estimated increase</p>
          </div>
        </div>

        {/* ROI explanation */}
        <div className="mt-6 p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">Why this is a smart investment:</span> With monthly rental
            income of {formatPriceRange(city.rentalIncome.min, city.rentalIncome.max)} and a net cost after incentives
            of {formatPriceRange(netCost.min, netCost.max)}, you can recover your investment in approximately {' '}
            {netCost.min === 0 && netCost.max === 0
              ? 'zero time with incentives covering all costs'
              : `${roi.paybackYearsMin}–${roi.paybackYearsMax} years`}. Plus, your property value increases by {city.propertyValueLift},
            building long-term equity.
          </p>
        </div>
      </section>
    </div>
  );
}
