import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BookingData {
  pathway: 'emergency' | 'photo' | 'planned' | null;
  urgency: 'critical' | 'urgent' | 'medium' | 'low';
  serviceType: string;
  location: string;
  description: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  photos?: File[];
  preferredTime: string;
}

const SmartBookingWidget: React.FC = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    pathway: null,
    urgency: 'medium',
    serviceType: '',
    location: '',
    description: '',
    contact: { name: '', email: '', phone: '' },
    preferredTime: ''
  });

  const serviceComplexity = {
    'exterior-waterproofing': { complexity: 'high', licenseRequired: true, timeline: '3-5 days', price: '$8,000-$15,000' },
    'interior-waterproofing': { complexity: 'medium', licenseRequired: true, timeline: '2-3 days', price: '$3,000-$8,000' },
    'foundation-repair': { complexity: 'high', licenseRequired: true, timeline: '1-3 days', price: '$2,000-$8,000' },
    'sump-pump': { complexity: 'medium', licenseRequired: true, timeline: '1-2 days', price: '$1,500-$4,000' },
    'crack-injection': { complexity: 'low', licenseRequired: false, timeline: '2-4 hours', price: '$400-$800' },
    'french-drain': { complexity: 'high', licenseRequired: true, timeline: '2-4 days', price: '$3,000-$8,000' },
    'emergency-service': { complexity: 'high', licenseRequired: true, timeline: 'Same day', price: '$500-$2,000+' }
  };

  const getResponseTime = (urgency: string, pathway: string) => {
    if (pathway === 'emergency' || urgency === 'critical') return '< 2 hours';
    if (urgency === 'urgent') return '< 4 hours';
    if (urgency === 'medium') return 'Same day';
    return '2-3 days';
  };

  const getPriceRange = (serviceType: string, urgency: string) => {
    const base = serviceComplexity[serviceType as keyof typeof serviceComplexity];
    if (!base) return '$500 - $8,000';
    
    if (urgency === 'critical') {
      return base.price.replace(/\$(\d+)/, (match, num) => `$${parseInt(num) * 1.5}`);
    }
    return base.price;
  };

  const handlePathwaySelect = (pathway: 'emergency' | 'photo' | 'planned') => {
    setBookingData(prev => ({ 
      ...prev, 
      pathway,
      urgency: pathway === 'emergency' ? 'critical' : pathway === 'photo' ? 'urgent' : 'medium'
    }));
    setStep(2);
  };

  const renderPathwaySelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">How Would You Like to Get Started?</h3>
        <p className="text-slate-600">Choose the path that best fits your situation</p>
      </div>
      
      <div className="grid gap-6">
        {/* Emergency Path */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-red-600 bg-gradient-to-r from-red-50 to-red-100"
          onClick={() => handlePathwaySelect('emergency')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-red-600 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L2.732 15.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-red-600">🚨 Emergency Service</CardTitle>
                  <CardDescription>Active flooding, structural damage, immediate danger</CardDescription>
                </div>
              </div>
              <Badge className="bg-red-600 text-white animate-pulse">URGENT</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-red-600">&lt; 2 Hours</div>
                <div className="text-sm text-slate-600">Response</div>
              </div>
              <div>
                <div className="font-bold text-red-600">24/7</div>
                <div className="text-sm text-slate-600">Available</div>
              </div>
              <div>
                <div className="font-bold text-red-600">Licensed</div>
                <div className="text-sm text-slate-600">Professionals</div>
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-3">
              For water actively entering, structural concerns, or immediate safety issues.
            </p>
          </CardContent>
        </Card>

        {/* Photo Assessment Path */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-cyan-600"
          onClick={() => handlePathwaySelect('photo')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-600 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-cyan-600">📸 Photo Assessment</CardTitle>
                  <CardDescription>Upload photos for instant AI analysis and quote</CardDescription>
                </div>
              </div>
              <Badge className="bg-cyan-600 text-white">SMART</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-cyan-600">5 Minutes</div>
                <div className="text-sm text-slate-600">Assessment</div>
              </div>
              <div>
                <div className="font-bold text-cyan-600">AI Powered</div>
                <div className="text-sm text-slate-600">Analysis</div>
              </div>
              <div>
                <div className="font-bold text-cyan-600">Instant</div>
                <div className="text-sm text-slate-600">Quote</div>
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-3">
              Perfect for visible damage, cracks, or staining that you can photograph clearly.
            </p>
          </CardContent>
        </Card>

        {/* Planned Service Path */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-green-600"
          onClick={() => handlePathwaySelect('planned')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-600 p-2 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-cyan-600">📋 Planned Service</CardTitle>
                  <CardDescription>Schedule inspection for prevention or maintenance</CardDescription>
                </div>
              </div>
              <Badge className="bg-cyan-600 text-white">THOROUGH</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-cyan-600">Free</div>
                <div className="text-sm text-slate-600">Inspection</div>
              </div>
              <div>
                <div className="font-bold text-cyan-600">Detailed</div>
                <div className="text-sm text-slate-600">Quote</div>
              </div>
              <div>
                <div className="font-bold text-cyan-600">25 Year</div>
                <div className="text-sm text-slate-600">Warranty</div>
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-3">
              For preventive waterproofing, system upgrades, or when you want a comprehensive assessment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServiceDetails = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Details</h3>
        <p className="text-slate-600">Tell us about your waterproofing needs</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">What service do you need?</label>
          <Select onValueChange={(value) => setBookingData(prev => ({ ...prev, serviceType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exterior-waterproofing">Exterior Waterproofing</SelectItem>
              <SelectItem value="interior-waterproofing">Interior Waterproofing</SelectItem>
              <SelectItem value="foundation-repair">Foundation Repair</SelectItem>
              <SelectItem value="sump-pump">Sump Pump Services</SelectItem>
              <SelectItem value="crack-injection">Crack Injection</SelectItem>
              <SelectItem value="french-drain">French Drain System</SelectItem>
              <SelectItem value="emergency-service">Emergency Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {bookingData.serviceType && (
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-slate-700">Service Complexity:</span>
                <div className="flex items-center mt-1">
                  <Badge className={
                    serviceComplexity[bookingData.serviceType as keyof typeof serviceComplexity]?.complexity === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : serviceComplexity[bookingData.serviceType as keyof typeof serviceComplexity]?.complexity === 'medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-cyan-50 text-cyan-700'
                  }>
                    {serviceComplexity[bookingData.serviceType as keyof typeof serviceComplexity]?.complexity?.toUpperCase()}
                  </Badge>
                  {serviceComplexity[bookingData.serviceType as keyof typeof serviceComplexity]?.licenseRequired && (
                    <Badge className="bg-cyan-50 text-cyan-700 ml-2">License Required</Badge>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Estimated Timeline:</span>
                <div className="text-lg font-semibold text-slate-900">
                  {serviceComplexity[bookingData.serviceType as keyof typeof serviceComplexity]?.timeline}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-sm font-medium text-slate-700">Price Range:</span>
              <div className="text-xl font-bold text-cyan-600">
                {getPriceRange(bookingData.serviceType, bookingData.urgency)}
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Property Location</label>
          <Select onValueChange={(value) => setBookingData(prev => ({ ...prev, location: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toronto">Toronto</SelectItem>
              <SelectItem value="mississauga">Mississauga</SelectItem>
              <SelectItem value="brampton">Brampton</SelectItem>
              <SelectItem value="vaughan">Vaughan</SelectItem>
              <SelectItem value="markham">Markham</SelectItem>
              <SelectItem value="richmond-hill">Richmond Hill</SelectItem>
              <SelectItem value="north-york">North York</SelectItem>
              <SelectItem value="scarborough">Scarborough</SelectItem>
              <SelectItem value="etobicoke">Etobicoke</SelectItem>
              <SelectItem value="other">Other GTA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Describe your situation</label>
          <Textarea
            placeholder="Please describe the water problem, visible damage, or service needed..."
            value={bookingData.description}
            onChange={(e) => setBookingData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>

        {bookingData.pathway !== 'emergency' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact Time</label>
            <Select onValueChange={(value) => setBookingData(prev => ({ ...prev, preferredTime: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="When would you like us to contact you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">As soon as possible</SelectItem>
                <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                <SelectItem value="weekend">Weekends only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button 
          onClick={() => setStep(3)}
          disabled={!bookingData.serviceType || !bookingData.location || !bookingData.description}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h3>
        <p className="text-slate-600">How should we contact you?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={bookingData.contact.name}
            onChange={(e) => setBookingData(prev => ({ 
              ...prev, 
              contact: { ...prev.contact, name: e.target.value }
            }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
          <Input
            type="tel"
            placeholder="(416) 555-0123"
            value={bookingData.contact.phone}
            onChange={(e) => setBookingData(prev => ({ 
              ...prev, 
              contact: { ...prev.contact, phone: e.target.value }
            }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={bookingData.contact.email}
            onChange={(e) => setBookingData(prev => ({ 
              ...prev, 
              contact: { ...prev.contact, email: e.target.value }
            }))}
          />
          <p className="text-xs text-slate-500 mt-1">Optional - for quote and updates</p>
        </div>
      </div>

      {/* Response Time Display */}
      <div className="bg-cyan-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <div className="font-semibold text-cyan-800">Expected Response Time</div>
            <div className="text-2xl font-bold text-cyan-600">
              {getResponseTime(bookingData.urgency, bookingData.pathway || 'planned')}
            </div>
            <p className="text-sm text-cyan-700">
              {bookingData.pathway === 'emergency' 
                ? 'Emergency team will contact you immediately'
                : bookingData.pathway === 'photo'
                ? 'Assessment results and follow-up call'
                : 'Professional consultation and quote'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button 
          onClick={() => setStep(4)}
          disabled={!bookingData.contact.name || !bookingData.contact.phone}
          className="flex-1"
        >
          Complete Booking
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6 text-center">
      <div className="bg-cyan-50 p-8 rounded-lg">
        <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-cyan-700 mb-2">Booking Confirmed!</h3>
        <p className="text-cyan-700">
          {bookingData.pathway === 'emergency' 
            ? 'Emergency team has been dispatched and will contact you within 2 hours'
            : 'Your request has been received and you will be contacted soon'
          }
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-left space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Service Type:</span>
            <span>{bookingData.serviceType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{bookingData.location?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Priority:</span>
            <Badge className={
              bookingData.urgency === 'critical' ? 'bg-red-100 text-red-800' :
              bookingData.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
              bookingData.urgency === 'medium' ? 'bg-amber-50 text-amber-700' :
              'bg-cyan-50 text-cyan-700'
            }>
              {bookingData.urgency.toUpperCase()}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Response Time:</span>
            <span className="font-semibold text-cyan-600">
              {getResponseTime(bookingData.urgency, bookingData.pathway || 'planned')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Contact:</span>
            <span>{bookingData.contact.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{bookingData.contact.phone}</span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-cyan-50 p-4 rounded-lg">
        <h4 className="font-semibold text-cyan-800 mb-2">What happens next?</h4>
        <ol className="text-sm text-cyan-700 space-y-1 text-left">
          {bookingData.pathway === 'emergency' ? (
            <>
              <li>1. Emergency coordinator dispatches nearest team</li>
              <li>2. Team leader calls within 30 minutes with ETA</li>
              <li>3. Emergency assessment and immediate action</li>
              <li>4. Temporary stabilization if needed</li>
              <li>5. Complete repair plan and quote</li>
            </>
          ) : bookingData.pathway === 'photo' ? (
            <>
              <li>1. AI analysis results sent within 5 minutes</li>
              <li>2. Professional review of assessment</li>
              <li>3. Follow-up call to discuss findings</li>
              <li>4. Schedule inspection if needed</li>
              <li>5. Detailed quote for recommended services</li>
            </>
          ) : (
            <>
              <li>1. Professional contractor assigned to your case</li>
              <li>2. Confirmation call to schedule inspection</li>
              <li>3. Free on-site assessment</li>
              <li>4. Detailed written quote provided</li>
              <li>5. No obligation - decision is yours</li>
            </>
          )}
        </ol>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => {
          setStep(1);
          setBookingData({
            pathway: null,
            urgency: 'medium',
            serviceType: '',
            location: '',
            description: '',
            contact: { name: '', email: '', phone: '' },
            preferredTime: ''
          });
        }}>
          Book Another Service
        </Button>
        <Button onClick={() => window.close()}>
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Smart Booking Widget</CardTitle>
              <CardDescription>Get waterproofing help in 3 simple steps</CardDescription>
            </div>
            <Badge variant="outline">Step {step} of 4</Badge>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-cyan-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && renderPathwaySelection()}
          {step === 2 && renderServiceDetails()}
          {step === 3 && renderContactForm()}
          {step === 4 && renderConfirmation()}
        </CardContent>
      </Card>

      {step < 4 && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center">
          <p className="text-sm text-slate-600 mb-2">
            Questions? Call us directly at{' '}
            <a href="tel:437-545-0067" className="font-semibold text-cyan-600 hover:underline">
              437-545-0067
            </a>
          </p>
          <p className="text-xs text-slate-500">
            Available 24/7 for emergencies • Licensed & Insured • 25-Year Warranty
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartBookingWidget;