import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  FileText,
  ChevronRight,
  ChevronLeft,
  Copy,
  Printer,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
} from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  address: string;
  city: string;
  policyNumber: string;
  insuranceCompany: string;
  adjusterName: string;
  phone: string;
}

interface IncidentDetails {
  discoveryDate: string;
  startDate: string;
  startDateType: 'same' | 'different' | 'unknown';
  eventType: string;
  waterCategory: string;
}

interface DamageAssessment {
  squareFeet: string;
  rooms: string[];
  waterDepth: string;
  damageClass: string;
}

interface DamagedItem {
  id: string;
  description: string;
  category: string;
  value: string;
  age: string;
  condition: string;
}

interface Documentation {
  actionsTaken: string[];
  professionalServices: string[];
}

export default function InsuranceClaimWriter() {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    address: '',
    city: 'Toronto',
    policyNumber: '',
    insuranceCompany: '',
    adjusterName: '',
    phone: '',
  });

  const [incidentDetails, setIncidentDetails] = useState<IncidentDetails>({
    discoveryDate: '',
    startDate: '',
    startDateType: 'same',
    eventType: '',
    waterCategory: '',
  });

  const [damageAssessment, setDamageAssessment] = useState<DamageAssessment>({
    squareFeet: '',
    rooms: [],
    waterDepth: '',
    damageClass: '',
  });

  const [damagedItems, setDamagedItems] = useState<DamagedItem[]>([]);
  const [documentation, setDocumentation] = useState<Documentation>({
    actionsTaken: [],
    professionalServices: [],
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [showResult, setShowResult] = useState(false);

  const eventTypes = [
    { value: 'sewer-backup', label: 'Sewer backup' },
    { value: 'foundation-leak', label: 'Foundation leak / seepage' },
    { value: 'sump-failure', label: 'Sump pump failure' },
    { value: 'plumbing-burst', label: 'Plumbing burst / leak' },
    { value: 'overland-flood', label: 'Overland flooding (surface water)' },
    { value: 'ice-dam', label: 'Ice dam / roof leak into basement' },
    { value: 'unknown', label: 'Unknown / multiple causes' },
  ];

  const waterCategories = [
    {
      value: 'cat1',
      label: 'Category 1 — Clean water',
      description: 'Broken supply pipe, rainwater',
    },
    {
      value: 'cat2',
      label: 'Category 2 — Grey water',
      description: 'Washing machine, dishwasher, sump overflow',
    },
    {
      value: 'cat3',
      label: 'Category 3 — Black water',
      description: 'Sewer backup, toilet overflow, river flood',
    },
    { value: 'unsure', label: 'Not sure', description: 'Will suggest based on event type' },
  ];

  const roomOptions = [
    'Basement living room',
    'Basement bedroom',
    'Basement bathroom',
    'Laundry room',
    'Utility/mechanical room',
    'Storage area',
    'Home office',
    'Entire basement',
  ];

  const waterDepthOptions = [
    { value: 'damp', label: 'Damp/wet but no standing water' },
    { value: 'less-1', label: 'Less than 1 inch' },
    { value: '1-6', label: '1-6 inches' },
    { value: '6-12', label: '6-12 inches' },
    { value: 'over-12', label: 'Over 12 inches' },
  ];

  const damageClassOptions = [
    {
      value: 'class1',
      label: 'Class 1 — Least damage',
      description: 'Part of a room, minimal moisture',
    },
    {
      value: 'class2',
      label: 'Class 2 — Significant damage',
      description: 'Entire room, water wicked up walls <24"',
    },
    {
      value: 'class3',
      label: 'Class 3 — Greatest damage',
      description: 'Water from overhead, walls saturated >24"',
    },
    {
      value: 'class4',
      label: 'Class 4 — Specialty drying',
      description: 'Hardwood, plaster, concrete',
    },
  ];

  const itemCategories = [
    'Electronics',
    'Furniture',
    'Flooring',
    'Appliance',
    'Personal items',
    'Documents',
    'Other',
  ];

  const commonItems = [
    'Carpet/flooring',
    'Drywall',
    'Baseboards',
    'Furniture',
    'Electronics',
    'Washer/Dryer',
    'Hot water tank',
    'Furnace/HVAC',
  ];

  const actionOptions = [
    'Called insurance company',
    'Took photos/video of damage',
    'Removed standing water',
    'Called plumber / waterproofing company',
    'Moved undamaged items to dry area',
    'Set up fans / dehumidifier',
    'Called restoration company',
    'Filed police report (for break-in related)',
    'None yet',
  ];

  const serviceOptions = [
    'Water extraction company',
    'Mold testing',
    'Structural assessment',
    'Plumbing repair',
    'Waterproofing company',
    'Contents restoration',
    'None yet',
  ];

  const addDamagedItem = (description = '') => {
    const newItem: DamagedItem = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      category: 'Other',
      value: '',
      age: '1-3 years',
      condition: 'Good',
    };
    setDamagedItems([...damagedItems, newItem]);
  };

  const removeDamagedItem = (id: string) => {
    setDamagedItems(damagedItems.filter((item) => item.id !== id));
  };

  const updateDamagedItem = (id: string, field: keyof DamagedItem, value: string) => {
    setDamagedItems(
      damagedItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const calculateTotal = () => {
    return damagedItems.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0);
  };

  const autoCalculateDamageClass = () => {
    const sqft = parseInt(damageAssessment.squareFeet) || 0;
    const depth = damageAssessment.waterDepth;

    if (depth === 'damp' && sqft < 100) return 'class1';
    if (depth === 'over-12' || sqft > 500) return 'class3';
    if (sqft > 100 || depth === '6-12' || depth === '1-6') return 'class2';
    return 'class1';
  };

  const suggestWaterCategory = () => {
    const event = incidentDetails.eventType;
    if (event === 'sewer-backup') return 'cat3';
    if (event === 'foundation-leak' || event === 'plumbing-burst') return 'cat1';
    if (event === 'sump-failure' || event === 'overland-flood') return 'cat2';
    return 'cat1';
  };

  const getEventTypeLabel = (value: string) => {
    return eventTypes.find((e) => e.value === value)?.label || value;
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      cat1: 'clean water from a sanitary source',
      cat2: 'grey water with some contamination',
      cat3: 'black water containing sewage or gross contamination',
    };
    return descriptions[cat] || 'water';
  };

  const getClassDescription = (cls: string) => {
    const descriptions: Record<string, string> = {
      class1:
        'This represents minimal moisture absorption, affecting only part of a room with materials that have absorbed minimal moisture.',
      class2:
        'This represents significant moisture absorption, with water affecting an entire room and wicking up walls to less than 24 inches.',
      class3:
        'This represents the highest level of absorption, with water coming from overhead or saturating walls and insulation more than 24 inches from the floor.',
      class4:
        'This requires specialty drying procedures due to materials with very low permeance or porosity, such as hardwood floors, plaster, concrete, or crawlspace areas.',
    };
    return descriptions[cls] || '';
  };

  const generateLetter = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const category = incidentDetails.waterCategory === 'unsure'
      ? suggestWaterCategory()
      : incidentDetails.waterCategory;

    const damageClass = damageAssessment.damageClass || autoCalculateDamageClass();

    const classNum = damageClass.replace('class', '');
    const catNum = category.replace('cat', '');

    let letter = `${today}\n\n`;
    letter += `${personalInfo.fullName}\n`;
    letter += `${personalInfo.address}\n`;
    letter += `${personalInfo.city}, ON\n\n`;
    letter += `${personalInfo.insuranceCompany}\n`;
    letter += `Claims Department\n\n`;
    letter += `RE: Water Damage Claim`;
    if (personalInfo.policyNumber) {
      letter += ` — Policy #${personalInfo.policyNumber}`;
    }
    letter += `\n    Property: ${personalInfo.address}\n`;
    letter += `    Date of Loss: ${incidentDetails.discoveryDate}\n\n`;

    const greeting = personalInfo.adjusterName
      ? `Dear ${personalInfo.adjusterName}`
      : 'To Whom It May Concern';
    letter += `${greeting},\n\n`;

    letter += `I am writing to formally submit a claim for water damage at my property located at ${personalInfo.address}. This letter documents the incident, extent of damage, and actions taken.\n\n`;

    letter += `INCIDENT DESCRIPTION\n`;
    letter += `On ${incidentDetails.discoveryDate}, I discovered water damage in my basement caused by ${getEventTypeLabel(incidentDetails.eventType).toLowerCase()}. `;

    if (incidentDetails.startDateType === 'different' && incidentDetails.startDate) {
      letter += `The damage appears to have begun on or around ${incidentDetails.startDate}. `;
    }

    letter += `\n\nThe water has been classified as Category ${catNum} (${getCategoryDescription(category)}) based on the source type. `;
    letter += `This represents a Class ${classNum} water loss affecting approximately ${damageAssessment.squareFeet} square feet across ${damageAssessment.rooms.length} affected area(s).\n\n`;

    letter += `EXTENT OF DAMAGE\n`;
    letter += `The following areas of my home were affected:\n`;
    damageAssessment.rooms.forEach((room) => {
      letter += `- ${room}\n`;
    });

    const depthLabel = waterDepthOptions.find(
      (d) => d.value === damageAssessment.waterDepth
    )?.label;
    letter += `\nWater reached a depth of approximately ${depthLabel?.toLowerCase()} at its worst point. `;
    letter += `${getClassDescription(damageClass)}\n\n`;

    if (damagedItems.length > 0) {
      letter += `DAMAGED PROPERTY\n`;
      letter += `The following personal property and structural elements were damaged:\n\n`;
      letter += `Item                          | Category        | Est. Value | Age        | Condition\n`;
      letter += `------------------------------|-----------------|------------|------------|-----------\n`;
      damagedItems.forEach((item) => {
        const desc = item.description.padEnd(29);
        const cat = item.category.padEnd(15);
        const val = `$${parseFloat(item.value || '0').toFixed(2)}`.padEnd(10);
        const age = item.age.padEnd(11);
        letter += `${desc} | ${cat} | ${val} | ${age} | ${item.condition}\n`;
      });
      letter += `\nTotal estimated damages: $${calculateTotal().toFixed(2)}\n\n`;
      letter += `Note: This is a preliminary estimate. Final costs may be determined by professional assessment.\n\n`;
    }

    letter += `ACTIONS TAKEN\n`;
    letter += `Upon discovery, I took the following immediate actions:\n`;
    if (documentation.actionsTaken.length > 0 && !documentation.actionsTaken.includes('None yet')) {
      documentation.actionsTaken.forEach((action) => {
        if (action !== 'None yet') {
          letter += `- ${action}\n`;
        }
      });
    } else {
      letter += `- Notified insurance company\n`;
    }
    letter += `\n`;

    if (documentation.professionalServices.length > 0 && !documentation.professionalServices.includes('None yet')) {
      letter += `PROFESSIONAL SERVICES\n`;
      letter += `The following professional services have been engaged:\n`;
      documentation.professionalServices.forEach((service) => {
        if (service !== 'None yet') {
          letter += `- ${service}\n`;
        }
      });
      letter += `\n`;
    }

    letter += `DOCUMENTATION\n`;
    const hasPhotos = documentation.actionsTaken.includes('Took photos/video of damage');
    const hasMold = documentation.professionalServices.includes('Mold testing');

    letter += `I have ${hasPhotos ? 'photographs and video' : 'documentation'} of the damage and am prepared to provide these to your adjuster. `;
    if (hasMold) {
      letter += `Mold testing has been conducted and results are available. `;
    }
    letter += `\n\n`;

    letter += `REQUEST\n`;
    letter += `I respectfully request that this claim be processed promptly. I am available for an adjuster visit at your earliest convenience. Please contact me at your earliest opportunity to discuss next steps.\n\n`;
    letter += `I understand my obligations under the policy to mitigate further damage and am taking appropriate steps to do so.\n\n`;

    letter += `Sincerely,\n\n`;
    letter += `${personalInfo.fullName}\n`;
    if (personalInfo.phone) {
      letter += `${personalInfo.phone}\n`;
    }
    letter += `\n`;

    letter += `Enclosures:\n`;
    if (hasPhotos) {
      letter += `- Photographs and video documentation of damage\n`;
    }
    if (documentation.professionalServices.filter(s => s !== 'None yet').length > 0) {
      letter += `- Professional service reports\n`;
    }
    letter += `- Receipts for emergency mitigation services\n`;

    setGeneratedLetter(letter);
    setShowResult(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const printLetter = () => {
    window.print();
  };

  const downloadLetter = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insurance-claim-${personalInfo.fullName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setStep(1);
    setPersonalInfo({
      fullName: '',
      address: '',
      city: 'Toronto',
      policyNumber: '',
      insuranceCompany: '',
      adjusterName: '',
      phone: '',
    });
    setIncidentDetails({
      discoveryDate: '',
      startDate: '',
      startDateType: 'same',
      eventType: '',
      waterCategory: '',
    });
    setDamageAssessment({
      squareFeet: '',
      rooms: [],
      waterDepth: '',
      damageClass: '',
    });
    setDamagedItems([]);
    setDocumentation({
      actionsTaken: [],
      professionalServices: [],
    });
    setGeneratedLetter('');
    setShowResult(false);
  };

  const canProceed = () => {
    if (step === 1) {
      return (
        personalInfo.fullName &&
        personalInfo.address &&
        personalInfo.city &&
        personalInfo.insuranceCompany
      );
    }
    if (step === 2) {
      return (
        incidentDetails.discoveryDate &&
        incidentDetails.eventType &&
        incidentDetails.waterCategory
      );
    }
    if (step === 3) {
      return (
        damageAssessment.squareFeet &&
        damageAssessment.rooms.length > 0 &&
        damageAssessment.waterDepth
      );
    }
    if (step === 4) {
      return true; // Optional items
    }
    if (step === 5) {
      return true; // Optional documentation
    }
    return false;
  };

  if (showResult) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6 print:max-w-none">
        <Card className="bg-white shadow-lg print:shadow-none">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white print:bg-white print:text-black print:border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <CardTitle className="text-2xl font-bold">Your Insurance Claim Letter</CardTitle>
              </div>
              <div className="flex gap-2 print:hidden">
                <Button onClick={copyToClipboard} variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={printLetter} variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button onClick={downloadLetter} variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 print:bg-white print:border-0">
              <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {generatedLetter}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="print:break-before-page">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Documentation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Photographs of all damaged areas',
                'Photos of the water source/entry point',
                'Video walkthrough of damage',
                'List of damaged items with values',
                'Receipts for damaged items (if available)',
                'Professional assessment reports',
                'Emergency service receipts',
                'Copy of insurance policy',
                'Police report (if applicable)',
                'This claim letter',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 print:break-before-page">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Tips for a Successful Claim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'File within 24 hours of discovery for fastest processing',
                "Don't throw anything away until the adjuster has seen it",
                "Don't make permanent repairs before the adjuster visit",
                'Keep all receipts for emergency mitigation work',
                'Document everything with timestamps and detailed notes',
                'Get multiple repair estimates to support your claim',
                'Know your policy limits, coverage, and deductible amount',
                'Follow up regularly with your insurance company',
                'Consider hiring a public adjuster for complex claims',
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 print:hidden">
          <Card className="border-teal-200 bg-teal-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Need Professional Water Damage Assessment?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Get a free inspection from DrySpace Waterproofing. We'll assess the damage and provide
                a detailed report for your insurance claim.
              </p>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Schedule Free Inspection
              </Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                24/7 Emergency Service
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Water damage requires immediate action. Call DrySpace now for emergency water extraction
                and mitigation services.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Call Now: 437-545-0067
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center print:hidden">
          <Button onClick={resetForm} variant="outline" size="lg" className="gap-2">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl font-bold">Insurance Claim Letter Generator</CardTitle>
              <p className="text-sm text-gray-300 mt-1">
                Answer a few questions to generate a professional claim letter
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'flex-1 h-2 rounded-full transition-colors',
                      s <= step ? 'bg-teal-400' : 'bg-white/20'
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Step {step} of 5:{' '}
                {
                  ['Your Information', 'Incident Details', 'Damage Assessment', 'Damaged Items', 'Documentation'][
                    step - 1
                  ]
                }
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-base font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-base font-semibold">
                  Property Address *
                </Label>
                <Input
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, address: e.target.value })
                  }
                  placeholder="123 Main Street"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-base font-semibold">
                  City *
                </Label>
                <Input
                  id="city"
                  value={personalInfo.city}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                  placeholder="Toronto"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="policyNumber" className="text-base font-semibold">
                  Policy Number
                </Label>
                <Input
                  id="policyNumber"
                  value={personalInfo.policyNumber}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, policyNumber: e.target.value })
                  }
                  placeholder="POL-123456789"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="insuranceCompany" className="text-base font-semibold">
                  Insurance Company Name *
                </Label>
                <Input
                  id="insuranceCompany"
                  value={personalInfo.insuranceCompany}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, insuranceCompany: e.target.value })
                  }
                  placeholder="ABC Insurance"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="adjusterName" className="text-base font-semibold">
                  Adjuster Name (if assigned)
                </Label>
                <Input
                  id="adjusterName"
                  value={personalInfo.adjusterName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, adjusterName: e.target.value })
                  }
                  placeholder="Jane Smith"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold">
                  Your Phone Number
                </Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="(416) 555-0123"
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="discoveryDate" className="text-base font-semibold">
                  Date You Discovered the Damage *
                </Label>
                <Input
                  id="discoveryDate"
                  type="date"
                  value={incidentDetails.discoveryDate}
                  onChange={(e) =>
                    setIncidentDetails({ ...incidentDetails, discoveryDate: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  When Did the Damage Likely Start?
                </Label>
                <RadioGroup
                  value={incidentDetails.startDateType}
                  onValueChange={(value: 'same' | 'different' | 'unknown') =>
                    setIncidentDetails({ ...incidentDetails, startDateType: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="same" id="start-same" />
                    <Label htmlFor="start-same" className="font-normal cursor-pointer">
                      Same as discovery date
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="different" id="start-different" />
                    <Label htmlFor="start-different" className="font-normal cursor-pointer">
                      Different date
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="start-unknown" />
                    <Label htmlFor="start-unknown" className="font-normal cursor-pointer">
                      Unknown
                    </Label>
                  </div>
                </RadioGroup>

                {incidentDetails.startDateType === 'different' && (
                  <Input
                    type="date"
                    value={incidentDetails.startDate}
                    onChange={(e) =>
                      setIncidentDetails({ ...incidentDetails, startDate: e.target.value })
                    }
                    className="mt-3"
                  />
                )}
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Type of Water Event *
                </Label>
                <RadioGroup
                  value={incidentDetails.eventType}
                  onValueChange={(value) =>
                    setIncidentDetails({ ...incidentDetails, eventType: value })
                  }
                >
                  {eventTypes.map((event) => (
                    <div key={event.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={event.value} id={`event-${event.value}`} />
                      <Label
                        htmlFor={`event-${event.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Water Category *</Label>
                <RadioGroup
                  value={incidentDetails.waterCategory}
                  onValueChange={(value) =>
                    setIncidentDetails({ ...incidentDetails, waterCategory: value })
                  }
                >
                  {waterCategories.map((cat) => (
                    <div key={cat.value} className="flex items-start space-x-2 mb-3">
                      <RadioGroupItem value={cat.value} id={`cat-${cat.value}`} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={`cat-${cat.value}`} className="font-medium cursor-pointer">
                          {cat.label}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="squareFeet" className="text-base font-semibold">
                  Affected Area (Square Feet) *
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="squareFeet"
                    type="number"
                    value={damageAssessment.squareFeet}
                    onChange={(e) =>
                      setDamageAssessment({ ...damageAssessment, squareFeet: e.target.value })
                    }
                    placeholder="500"
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDamageAssessment({ ...damageAssessment, squareFeet: '50' })
                      }
                    >
                      Small (&lt;100)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDamageAssessment({ ...damageAssessment, squareFeet: '300' })
                      }
                    >
                      Medium (100-500)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDamageAssessment({ ...damageAssessment, squareFeet: '700' })
                      }
                    >
                      Large (500+)
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Rooms Affected * (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {roomOptions.map((room) => (
                    <div key={room} className="flex items-center space-x-2">
                      <Checkbox
                        id={`room-${room}`}
                        checked={damageAssessment.rooms.includes(room)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDamageAssessment({
                              ...damageAssessment,
                              rooms: [...damageAssessment.rooms, room],
                            });
                          } else {
                            setDamageAssessment({
                              ...damageAssessment,
                              rooms: damageAssessment.rooms.filter((r) => r !== room),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={`room-${room}`} className="font-normal cursor-pointer">
                        {room}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Water Depth at Worst *</Label>
                <RadioGroup
                  value={damageAssessment.waterDepth}
                  onValueChange={(value) =>
                    setDamageAssessment({ ...damageAssessment, waterDepth: value })
                  }
                >
                  {waterDepthOptions.map((depth) => (
                    <div key={depth.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={depth.value} id={`depth-${depth.value}`} />
                      <Label
                        htmlFor={`depth-${depth.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {depth.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Damage Class (Auto-calculated or manual)
                </Label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-blue-900">
                    <strong>Suggested:</strong>{' '}
                    {damageClassOptions.find((c) => c.value === autoCalculateDamageClass())?.label}
                  </p>
                </div>
                <RadioGroup
                  value={damageAssessment.damageClass || autoCalculateDamageClass()}
                  onValueChange={(value) =>
                    setDamageAssessment({ ...damageAssessment, damageClass: value })
                  }
                >
                  {damageClassOptions.map((cls) => (
                    <div key={cls.value} className="flex items-start space-x-2 mb-3">
                      <RadioGroupItem value={cls.value} id={`class-${cls.value}`} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={`class-${cls.value}`} className="font-medium cursor-pointer">
                          {cls.label}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{cls.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">Damaged Items (Optional)</Label>
                  <Button
                    type="button"
                    onClick={() => addDamagedItem()}
                    size="sm"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium mb-2">Quick Add Common Items:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonItems.map((item) => (
                      <Button
                        key={item}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addDamagedItem(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>

                {damagedItems.length > 0 && (
                  <div className="space-y-4">
                    {damagedItems.map((item, idx) => (
                      <Card key={item.id} className="p-4 bg-white">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-sm">Item {idx + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDamagedItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="md:col-span-2">
                            <Label htmlFor={`desc-${item.id}`} className="text-sm">
                              Description
                            </Label>
                            <Input
                              id={`desc-${item.id}`}
                              value={item.description}
                              onChange={(e) =>
                                updateDamagedItem(item.id, 'description', e.target.value)
                              }
                              placeholder="Samsung 55&quot; TV"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`cat-${item.id}`} className="text-sm">
                              Category
                            </Label>
                            <select
                              id={`cat-${item.id}`}
                              value={item.category}
                              onChange={(e) =>
                                updateDamagedItem(item.id, 'category', e.target.value)
                              }
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                              {itemCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label htmlFor={`value-${item.id}`} className="text-sm">
                              Estimated Value ($)
                            </Label>
                            <Input
                              id={`value-${item.id}`}
                              type="number"
                              value={item.value}
                              onChange={(e) =>
                                updateDamagedItem(item.id, 'value', e.target.value)
                              }
                              placeholder="500"
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`age-${item.id}`} className="text-sm">
                              Age
                            </Label>
                            <select
                              id={`age-${item.id}`}
                              value={item.age}
                              onChange={(e) => updateDamagedItem(item.id, 'age', e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                              <option value="<1 year">&lt;1 year</option>
                              <option value="1-3 years">1-3 years</option>
                              <option value="3-5 years">3-5 years</option>
                              <option value="5-10 years">5-10 years</option>
                              <option value="10+ years">10+ years</option>
                            </select>
                          </div>

                          <div>
                            <Label htmlFor={`cond-${item.id}`} className="text-sm">
                              Condition Before Damage
                            </Label>
                            <select
                              id={`cond-${item.id}`}
                              value={item.condition}
                              onChange={(e) =>
                                updateDamagedItem(item.id, 'condition', e.target.value)
                              }
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                              <option value="Excellent">Excellent</option>
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                            </select>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">Total Estimated Damages:</span>
                        <span className="font-bold text-2xl text-teal-700">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {damagedItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-2">No items added yet.</p>
                    <p className="text-sm">
                      Click "Add Item" or use the quick-add buttons above to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Actions Already Taken (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {actionOptions.map((action) => (
                    <div key={action} className="flex items-center space-x-2">
                      <Checkbox
                        id={`action-${action}`}
                        checked={documentation.actionsTaken.includes(action)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDocumentation({
                              ...documentation,
                              actionsTaken: [...documentation.actionsTaken, action],
                            });
                          } else {
                            setDocumentation({
                              ...documentation,
                              actionsTaken: documentation.actionsTaken.filter((a) => a !== action),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={`action-${action}`} className="font-normal cursor-pointer">
                        {action}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Professional Services Obtained (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={documentation.professionalServices.includes(service)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDocumentation({
                              ...documentation,
                              professionalServices: [
                                ...documentation.professionalServices,
                                service,
                              ],
                            });
                          } else {
                            setDocumentation({
                              ...documentation,
                              professionalServices: documentation.professionalServices.filter(
                                (s) => s !== service
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={`service-${service}`} className="font-normal cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Important Reminder
                </h4>
                <ul className="text-sm space-y-1 ml-7">
                  <li>Take photos and videos before any cleanup or repairs</li>
                  <li>Keep all damaged items until the adjuster has seen them</li>
                  <li>Save all receipts for emergency services and temporary repairs</li>
                  <li>Document all communication with your insurance company</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>

        <div className="border-t p-6 flex items-center justify-between bg-gray-50">
          <Button
            onClick={() => setStep(step - 1)}
            variant="outline"
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {step < 5 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="gap-2 bg-teal-600 hover:bg-teal-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={generateLetter}
              disabled={!canProceed()}
              className="gap-2 bg-teal-600 hover:bg-teal-700"
            >
              Generate Letter
              <FileText className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
