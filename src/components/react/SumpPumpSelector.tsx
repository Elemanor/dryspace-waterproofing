import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Battery,
  Wrench,
  CheckCircle2,
  Phone,
  FileText,
  AlertTriangle,
  Zap,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 'result';

interface FormData {
  // Step 1
  reason: string;
  waterVolume: string;

  // Step 2
  pitDiameter: string;
  pitDepth: string;
  pipeSize: string;
  lift: string;

  // Step 3
  powerLoss: string;
  backupWant: string;
  generator: string;
  budget: string;

  // Step 4
  noise: string;
  material: string;
  brand: string;
}

interface Recommendation {
  primaryPump: {
    hp: string;
    type: string;
    flowRate: number;
    lift: number;
    switchType: string;
    material: string;
    pipeSize: string;
    costRange: string;
  };
  backupSystem: {
    type: string;
    batterySize?: string;
    runtime?: string;
    costRange: string;
  } | null;
  accessories: string[];
  totalCost: string;
  recommendations: string[];
  maintenanceTips: string[];
}

export default function SumpPumpSelector() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    reason: '',
    waterVolume: '',
    pitDiameter: '',
    pitDepth: '',
    pipeSize: '',
    lift: '',
    powerLoss: '',
    backupWant: '',
    generator: '',
    budget: '',
    noise: '',
    material: '',
    brand: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep === 4) {
      setCurrentStep('result');
    } else {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep === 'result') {
      setCurrentStep(4);
    } else if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const reset = () => {
    setCurrentStep(1);
    setFormData({
      reason: '',
      waterVolume: '',
      pitDiameter: '',
      pitDepth: '',
      pipeSize: '',
      lift: '',
      powerLoss: '',
      backupWant: '',
      generator: '',
      budget: '',
      noise: '',
      material: '',
      brand: '',
    });
  };

  const calculateRecommendation = (): Recommendation => {
    // Base GPH calculation
    const baseGPH = {
      rarely: 1500,
      moderate: 2500,
      heavy: 3500,
      severe: 5000,
    }[formData.waterVolume] || 2500;

    // Lift feet conversion
    const liftFeet = {
      'less-8': 8,
      '8-12': 10,
      '12-20': 15,
      'over-20': 25,
      'unknown': 10,
    }[formData.lift] || 10;

    // Adjust GPH for lift
    const adjustedGPH = Math.round(baseGPH * (1 + liftFeet * 0.04));

    // Calculate required HP
    let hp = '1/3';
    if (adjustedGPH >= 5000) hp = '1';
    else if (adjustedGPH >= 3500) hp = '3/4';
    else if (adjustedGPH >= 2000) hp = '1/2';

    // Determine switch type
    let switchType = 'Tethered Float';
    if (formData.pitDiameter === '14') {
      switchType = 'Vertical Float';
    } else if (formData.budget === 'over-2000' || formData.noise === 'living-space') {
      switchType = 'Electronic/Diaphragm';
    }

    // Determine material
    let material = 'Thermoplastic';
    if (formData.material === 'cast-iron') {
      material = 'Cast Iron';
    } else if (formData.material === 'thermoplastic') {
      material = 'Thermoplastic';
    } else {
      // Auto-select based on budget and noise
      if (formData.budget === 'over-2000' || formData.budget === '1000-2000') {
        material = 'Cast Iron';
      } else if (formData.noise === 'living-space' && formData.budget !== 'under-500') {
        material = 'Cast Iron';
      }
    }

    // Determine pipe size
    let pipeSize = formData.pipeSize;
    if (pipeSize === 'unknown') {
      pipeSize = adjustedGPH > 3000 ? '2"' : '1.5"';
    } else {
      pipeSize = pipeSize.replace('pipe-', '').replace('-', '.');
      if (!pipeSize.includes('"')) pipeSize += '"';
    }

    // Primary pump cost
    let pumpCostMin = 200;
    let pumpCostMax = 400;

    if (hp === '1') {
      pumpCostMin = 350;
      pumpCostMax = 600;
    } else if (hp === '3/4') {
      pumpCostMin = 300;
      pumpCostMax = 500;
    } else if (hp === '1/2') {
      pumpCostMin = 250;
      pumpCostMax = 450;
    }

    if (material === 'Cast Iron') {
      pumpCostMin += 100;
      pumpCostMax += 200;
    }

    if (switchType === 'Electronic/Diaphragm') {
      pumpCostMin += 50;
      pumpCostMax += 100;
    }

    // Backup system recommendation
    let backupSystem: Recommendation['backupSystem'] = null;
    const needsBackup =
      formData.powerLoss === 'frequently' ||
      (formData.powerLoss === 'occasionally' && formData.waterVolume === 'severe') ||
      formData.backupWant === 'essential';

    const wantsBackup = formData.backupWant === 'nice-to-have' || formData.backupWant === 'essential';

    if (needsBackup && formData.generator !== 'auto-transfer') {
      const batterySize = formData.waterVolume === 'severe' || formData.waterVolume === 'heavy' ? '140Ah' : '75Ah';
      const runtime = batterySize === '140Ah' ? '8-12 hours' : '4-6 hours';

      backupSystem = {
        type: 'Battery Backup Combo Unit',
        batterySize,
        runtime,
        costRange: batterySize === '140Ah' ? '$800-$1,200' : '$500-$800',
      };
    } else if (wantsBackup && formData.generator !== 'auto-transfer') {
      backupSystem = {
        type: 'Separate Battery Backup',
        batterySize: '75Ah',
        runtime: '4-6 hours',
        costRange: '$400-$600',
      };
    } else if (formData.backupWant === 'not-needed') {
      backupSystem = {
        type: 'Water Alarm Only',
        costRange: '$30-$60',
      };
    }

    // Accessories
    const accessories = ['Check Valve', 'Water Alarm'];
    if (backupSystem?.type.includes('Battery')) {
      accessories.push('Battery Backup System');
    }
    if (formData.pitDiameter === '14' || formData.pitDiameter === 'unknown') {
      accessories.push('Consider Pit Liner Upgrade (18")');
    }

    // Total cost
    let totalMin = pumpCostMin + 50; // Check valve & alarm
    let totalMax = pumpCostMax + 100;

    if (backupSystem) {
      const backupMin = parseInt(backupSystem.costRange.replace(/[^0-9]/g, ''));
      const backupMax = parseInt(backupSystem.costRange.split('-')[1]?.replace(/[^0-9]/g, '') || String(backupMin + 200));
      totalMin += backupMin;
      totalMax += backupMax;
    }

    // Recommendations
    const recommendations: string[] = [];

    if (formData.pitDiameter === '14') {
      recommendations.push('Your 14" pit is undersized for modern pumps. Consider upgrading to an 18" liner during installation for better performance and longevity.');
    }

    if (formData.waterVolume === 'severe' || formData.waterVolume === 'heavy') {
      if (formData.powerLoss === 'frequently') {
        recommendations.push('With heavy water volume and frequent power outages, a combo unit (primary + battery backup) is the best value and most reliable solution.');
      } else {
        recommendations.push(`A ${hp} HP pump is recommended for your high water volume. Ensure proper maintenance to handle the frequent cycling.`);
      }
    }

    if (material === 'Cast Iron' && formData.budget !== 'under-500') {
      recommendations.push('Cast iron pumps last 7-15 years vs. 3-7 years for thermoplastic. The higher upfront cost pays off in longevity and quieter operation.');
    }

    if (formData.pipeSize === '1.25' && adjustedGPH > 2500) {
      recommendations.push('Your current 1.25" discharge pipe is too small for optimal flow. Upgrade to 1.5" or 2" to prevent pump strain and improve efficiency.');
    }

    if (liftFeet > 15) {
      recommendations.push(`High lift (${liftFeet} feet) significantly reduces pump efficiency. Verify the discharge route and consider rerouting if possible to reduce lift height.`);
    }

    if (formData.generator === 'auto-transfer') {
      recommendations.push('Your automatic transfer switch provides excellent backup power. A battery backup is optional but adds redundancy during generator maintenance.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Your setup is straightforward. A quality submersible pump with proper sizing will provide reliable service for years.');
    }

    // Maintenance tips
    const maintenanceTips = [
      'Test pump monthly by pouring 5 gallons of water into the pit and verifying it activates and drains completely.',
      'Replace battery backup every 3-5 years, or sooner if runtime testing shows reduced capacity.',
      'Clean the pump intake screen semi-annually to prevent clogs from debris.',
      'Schedule professional inspection annually, especially before spring thaw and rainy season.',
      'Keep the pit lid sealed to prevent moisture, odors, and radon from entering the basement.',
    ];

    return {
      primaryPump: {
        hp,
        type: 'Submersible',
        flowRate: adjustedGPH,
        lift: liftFeet,
        switchType,
        material,
        pipeSize,
        costRange: `$${pumpCostMin}-$${pumpCostMax}`,
      },
      backupSystem,
      accessories,
      totalCost: `$${totalMin.toLocaleString()}-$${totalMax.toLocaleString()}`,
      recommendations,
      maintenanceTips,
    };
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.reason && formData.waterVolume;
      case 2:
        return formData.pitDiameter && formData.pitDepth && formData.pipeSize && formData.lift;
      case 3:
        return formData.powerLoss && formData.backupWant && formData.generator && formData.budget;
      case 4:
        return formData.noise && formData.material && formData.brand;
      default:
        return false;
    }
  };

  const getProgress = () => {
    if (currentStep === 'result') return 100;
    return (currentStep / 4) * 100;
  };

  const RadioCard = ({
    value,
    currentValue,
    onChange,
    label,
    description,
  }: {
    value: string;
    currentValue: string;
    onChange: (value: string) => void;
    label: string;
    description?: string;
  }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all hover:border-[#0fbabd] hover:shadow-md',
        currentValue === value
          ? 'border-[#0fbabd] bg-[#0fbabd]/5 shadow-md'
          : 'border-gray-200 bg-white'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 transition-all',
            currentValue === value ? 'border-[#0fbabd]' : 'border-gray-300'
          )}
        >
          {currentValue === value && (
            <div className="w-3 h-3 rounded-full bg-[#0fbabd]" />
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{label}</div>
          {description && (
            <div className="text-sm text-gray-600 mt-1">{description}</div>
          )}
        </div>
      </div>
    </button>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-[#0fbabd]" />
          Why do you need a pump?
        </h3>
        <div className="space-y-3">
          <RadioCard
            value="replacing"
            currentValue={formData.reason}
            onChange={(v) => updateField('reason', v)}
            label="Replacing an existing pump"
            description="Current pump failed or showing signs of wear"
          />
          <RadioCard
            value="new"
            currentValue={formData.reason}
            onChange={(v) => updateField('reason', v)}
            label="New installation (no pump currently)"
            description="First-time installation or new construction"
          />
          <RadioCard
            value="backup"
            currentValue={formData.reason}
            onChange={(v) => updateField('reason', v)}
            label="Adding a backup pump"
            description="Primary pump works, want redundancy"
          />
          <RadioCard
            value="upgrade"
            currentValue={formData.reason}
            onChange={(v) => updateField('reason', v)}
            label="Upgrading to a bigger pump"
            description="Current pump can't keep up with water volume"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-[#0fbabd]" />
          How much water do you deal with?
        </h3>
        <div className="space-y-3">
          <RadioCard
            value="rarely"
            currentValue={formData.waterVolume}
            onChange={(v) => updateField('waterVolume', v)}
            label="Rarely"
            description="Pump runs a few times per month"
          />
          <RadioCard
            value="moderate"
            currentValue={formData.waterVolume}
            onChange={(v) => updateField('waterVolume', v)}
            label="Moderate"
            description="Pump runs weekly or during rain events"
          />
          <RadioCard
            value="heavy"
            currentValue={formData.waterVolume}
            onChange={(v) => updateField('waterVolume', v)}
            label="Heavy"
            description="Pump runs daily or multiple times during storms"
          />
          <RadioCard
            value="severe"
            currentValue={formData.waterVolume}
            onChange={(v) => updateField('waterVolume', v)}
            label="Severe"
            description="Pump runs almost constantly during wet season"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sump pit diameter</h3>
        <div className="space-y-3">
          <RadioCard
            value="14"
            currentValue={formData.pitDiameter}
            onChange={(v) => updateField('pitDiameter', v)}
            label='14" (small, older homes)'
          />
          <RadioCard
            value="18"
            currentValue={formData.pitDiameter}
            onChange={(v) => updateField('pitDiameter', v)}
            label='18" (standard)'
          />
          <RadioCard
            value="24"
            currentValue={formData.pitDiameter}
            onChange={(v) => updateField('pitDiameter', v)}
            label='24" (large)'
          />
          <RadioCard
            value="unknown"
            currentValue={formData.pitDiameter}
            onChange={(v) => updateField('pitDiameter', v)}
            label="Don't know / no pit yet"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sump pit depth</h3>
        <div className="space-y-3">
          <RadioCard
            value="less-18"
            currentValue={formData.pitDepth}
            onChange={(v) => updateField('pitDepth', v)}
            label='Less than 18"'
          />
          <RadioCard
            value="18-24"
            currentValue={formData.pitDepth}
            onChange={(v) => updateField('pitDepth', v)}
            label='18-24" (standard)'
          />
          <RadioCard
            value="24-30"
            currentValue={formData.pitDepth}
            onChange={(v) => updateField('pitDepth', v)}
            label='24-30" (deep)'
          />
          <RadioCard
            value="over-30"
            currentValue={formData.pitDepth}
            onChange={(v) => updateField('pitDepth', v)}
            label='Over 30"'
          />
          <RadioCard
            value="unknown"
            currentValue={formData.pitDepth}
            onChange={(v) => updateField('pitDepth', v)}
            label="Don't know"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Discharge pipe diameter</h3>
        <div className="space-y-3">
          <RadioCard
            value="pipe-1.25"
            currentValue={formData.pipeSize}
            onChange={(v) => updateField('pipeSize', v)}
            label='1.25" (small)'
          />
          <RadioCard
            value="pipe-1.5"
            currentValue={formData.pipeSize}
            onChange={(v) => updateField('pipeSize', v)}
            label='1.5" (standard)'
          />
          <RadioCard
            value="pipe-2"
            currentValue={formData.pipeSize}
            onChange={(v) => updateField('pipeSize', v)}
            label='2" (large)'
          />
          <RadioCard
            value="unknown"
            currentValue={formData.pipeSize}
            onChange={(v) => updateField('pipeSize', v)}
            label="Don't know"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical lift to discharge point</h3>
        <div className="space-y-3">
          <RadioCard
            value="less-8"
            currentValue={formData.lift}
            onChange={(v) => updateField('lift', v)}
            label="Less than 8 feet"
            description="Basement to ground level (short run)"
          />
          <RadioCard
            value="8-12"
            currentValue={formData.lift}
            onChange={(v) => updateField('lift', v)}
            label="8-12 feet (standard)"
            description="Typical basement to exterior grade"
          />
          <RadioCard
            value="12-20"
            currentValue={formData.lift}
            onChange={(v) => updateField('lift', v)}
            label="12-20 feet (high lift)"
            description="Deep basement or uphill discharge"
          />
          <RadioCard
            value="over-20"
            currentValue={formData.lift}
            onChange={(v) => updateField('lift', v)}
            label="Over 20 feet"
            description="Extreme lift or long horizontal run"
          />
          <RadioCard
            value="unknown"
            currentValue={formData.lift}
            onChange={(v) => updateField('lift', v)}
            label="Don't know (assume 10 feet)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#0fbabd]" />
          Do you lose power during storms?
        </h3>
        <div className="space-y-3">
          <RadioCard
            value="rarely"
            currentValue={formData.powerLoss}
            onChange={(v) => updateField('powerLoss', v)}
            label="Rarely / never"
            description="Reliable power grid or minimal storm impact"
          />
          <RadioCard
            value="occasionally"
            currentValue={formData.powerLoss}
            onChange={(v) => updateField('powerLoss', v)}
            label="Occasionally (1-2 times per year)"
            description="Occasional outages during severe weather"
          />
          <RadioCard
            value="frequently"
            currentValue={formData.powerLoss}
            onChange={(v) => updateField('powerLoss', v)}
            label="Frequently (multiple times per year)"
            description="Regular outages during storm season"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Battery className="w-5 h-5 text-[#0fbabd]" />
          Do you want a battery backup?
        </h3>
        <div className="space-y-3">
          <RadioCard
            value="essential"
            currentValue={formData.backupWant}
            onChange={(v) => updateField('backupWant', v)}
            label="Yes, essential"
            description="Peace of mind is worth the investment"
          />
          <RadioCard
            value="nice-to-have"
            currentValue={formData.backupWant}
            onChange={(v) => updateField('backupWant', v)}
            label="Nice to have if affordable"
            description="Interested but budget-conscious"
          />
          <RadioCard
            value="not-needed"
            currentValue={formData.backupWant}
            onChange={(v) => updateField('backupWant', v)}
            label="No, not needed"
            description="Comfortable with just primary pump"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Do you have a generator?</h3>
        <div className="space-y-3">
          <RadioCard
            value="auto-transfer"
            currentValue={formData.generator}
            onChange={(v) => updateField('generator', v)}
            label="Yes, automatic transfer switch"
            description="Generator starts automatically during outages"
          />
          <RadioCard
            value="portable"
            currentValue={formData.generator}
            onChange={(v) => updateField('generator', v)}
            label="Yes, portable (manual)"
            description="Must manually connect during outages"
          />
          <RadioCard
            value="no"
            currentValue={formData.generator}
            onChange={(v) => updateField('generator', v)}
            label="No"
            description="No backup power source"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Budget range</h3>
        <div className="space-y-3">
          <RadioCard
            value="under-500"
            currentValue={formData.budget}
            onChange={(v) => updateField('budget', v)}
            label="Under $500 (basic)"
            description="Budget-friendly, essential features only"
          />
          <RadioCard
            value="500-1000"
            currentValue={formData.budget}
            onChange={(v) => updateField('budget', v)}
            label="$500-$1,000 (mid-range)"
            description="Balance of quality and value"
          />
          <RadioCard
            value="1000-2000"
            currentValue={formData.budget}
            onChange={(v) => updateField('budget', v)}
            label="$1,000-$2,000 (premium)"
            description="High-quality components, backup included"
          />
          <RadioCard
            value="over-2000"
            currentValue={formData.budget}
            onChange={(v) => updateField('budget', v)}
            label="Over $2,000 (best available)"
            description="Top-tier system with all features"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Noise sensitivity</h3>
        <div className="space-y-3">
          <RadioCard
            value="unfinished"
            currentValue={formData.noise}
            onChange={(v) => updateField('noise', v)}
            label="Basement is unfinished / noise doesn't matter"
            description="Utility space, noise is not a concern"
          />
          <RadioCard
            value="living-space"
            currentValue={formData.noise}
            onChange={(v) => updateField('noise', v)}
            label="Basement is living space / prefer quiet"
            description="Finished basement, bedroom, or office nearby"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Material preference</h3>
        <div className="space-y-3">
          <RadioCard
            value="cast-iron"
            currentValue={formData.material}
            onChange={(v) => updateField('material', v)}
            label="Cast iron (heavier, quieter, longer life)"
            description="7-15 year lifespan, quieter operation, premium cost"
          />
          <RadioCard
            value="thermoplastic"
            currentValue={formData.material}
            onChange={(v) => updateField('material', v)}
            label="Thermoplastic (lighter, cheaper)"
            description="3-7 year lifespan, easier to install, budget-friendly"
          />
          <RadioCard
            value="no-preference"
            currentValue={formData.material}
            onChange={(v) => updateField('material', v)}
            label="No preference"
            description="Recommend based on my budget and needs"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Brand matters?</h3>
        <div className="space-y-3">
          <RadioCard
            value="top-brand"
            currentValue={formData.brand}
            onChange={(v) => updateField('brand', v)}
            label="Want a top brand (Zoeller, Liberty, Wayne)"
            description="Proven reliability and widespread service network"
          />
          <RadioCard
            value="best-value"
            currentValue={formData.brand}
            onChange={(v) => updateField('brand', v)}
            label="Best value regardless of brand"
            description="Performance and warranty matter more than name"
          />
          <RadioCard
            value="no-preference"
            currentValue={formData.brand}
            onChange={(v) => updateField('brand', v)}
            label="No preference"
            description="Trust professional recommendation"
          />
        </div>
      </div>
    </div>
  );

  const renderResult = () => {
    const rec = calculateRecommendation();

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-[#0fbabd] to-[#0d9799] text-white p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Recommended System</h2>
              <p className="text-white/90">
                Based on your specific conditions, here's the optimal sump pump configuration
              </p>
            </div>
          </div>
        </div>

        {/* Primary Pump */}
        <Card className="p-6 border-2 border-[#0fbabd]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#0fbabd]/10 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-[#0fbabd]" />
            </div>
            <h3 className="text-xl font-bold">Primary Pump</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Motor Power</div>
                <div className="font-semibold text-lg">{rec.primaryPump.hp} HP</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Type</div>
                <div className="font-semibold">{rec.primaryPump.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Flow Rate</div>
                <div className="font-semibold">
                  {rec.primaryPump.flowRate.toLocaleString()} GPH at {rec.primaryPump.lift} ft lift
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Switch Type</div>
                <div className="font-semibold">{rec.primaryPump.switchType}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Material</div>
                <div className="font-semibold">{rec.primaryPump.material}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Pipe Size</div>
                <div className="font-semibold">{rec.primaryPump.pipeSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                <div className="font-bold text-xl text-[#0fbabd]">
                  {rec.primaryPump.costRange}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Backup System */}
        {rec.backupSystem && (
          <Card className="p-6 border-2 border-[#E8AA42]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E8AA42]/10 rounded-lg flex items-center justify-center">
                <Battery className="w-6 h-6 text-[#E8AA42]" />
              </div>
              <h3 className="text-xl font-bold">Backup System</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="font-semibold">{rec.backupSystem.type}</div>
                </div>
                {rec.backupSystem.batterySize && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Battery Size</div>
                    <div className="font-semibold">{rec.backupSystem.batterySize}</div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {rec.backupSystem.runtime && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Estimated Runtime</div>
                    <div className="font-semibold">{rec.backupSystem.runtime}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                  <div className="font-bold text-xl text-[#E8AA42]">
                    {rec.backupSystem.costRange}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Accessories */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-5 h-5 text-[#0fbabd]" />
            <h3 className="text-lg font-bold">Required Accessories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {rec.accessories.map((acc) => (
              <Badge key={acc} variant="secondary" className="text-sm py-1.5">
                {acc}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Total Cost */}
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total System Cost</div>
              <div className="text-3xl font-bold text-gray-900">{rec.totalCost}</div>
              <div className="text-sm text-gray-600 mt-1">Equipment only (installation extra)</div>
            </div>
            <div className="w-16 h-16 bg-[#0fbabd]/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#0fbabd]" />
            </div>
          </div>
        </Card>

        {/* Key Recommendations */}
        <Card className="p-6 border-2 border-[#0fbabd]/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#0fbabd]" />
            Key Recommendations
          </h3>
          <ul className="space-y-3">
            {rec.recommendations.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#0fbabd] rounded-full mt-2 flex-shrink-0" />
                <div className="text-gray-700">{item}</div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Maintenance Tips */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-gray-700" />
            Maintenance Tips
          </h3>
          <ul className="space-y-3">
            {rec.maintenanceTips.map((tip, idx) => (
              <li key={idx} className="flex gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-gray-600">{idx + 1}</span>
                </div>
                <div className="text-gray-700">{tip}</div>
              </li>
            ))}
          </ul>
        </Card>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="w-full bg-[#0fbabd] hover:bg-[#0d9799] text-white h-14 text-lg"
            asChild
          >
            <a href="/free-inspection">
              Get Professional Installation
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg border-2"
            asChild
          >
            <a href="tel:437-545-0067" className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call 437-545-0067
            </a>
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={reset}
            className="text-[#0fbabd] hover:text-[#0d9799] hover:bg-[#0fbabd]/5"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0fbabd] to-[#0d9799] text-white p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Sump Pump Selector
          </h1>
          <p className="text-white/90">
            Answer a few questions to get your personalized pump recommendation
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'result' && (
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">
                Step {currentStep} of 4
              </div>
              <div className="text-sm text-gray-600">
                {Math.round(getProgress())}% Complete
              </div>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 'result' && renderResult()}
        </div>

        {/* Navigation */}
        {currentStep !== 'result' && (
          <div className="border-t px-6 py-4 bg-gray-50 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className="bg-[#0fbabd] hover:bg-[#0d9799] text-white gap-2"
            >
              {currentStep === 4 ? 'Get Recommendation' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
