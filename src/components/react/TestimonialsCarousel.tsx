import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael R.",
    location: "North York",
    service: "Exterior Waterproofing",
    rating: 5,
    text: "After dealing with basement flooding for years, Dryspace completely transformed our home. Their exterior waterproofing system has kept our basement dry through multiple storms. The 25-year warranty gives us incredible peace of mind.",
    date: "November 2024",
    verified: true
  },
  {
    id: 2,
    name: "Sarah L.",
    location: "Etobicoke",
    service: "Sump Pump Installation",
    rating: 5,
    text: "Professional from start to finish! They installed a battery backup sump pump system that saved us during the last power outage. The team was respectful of our property and completed everything in one day.",
    date: "October 2024",
    verified: true
  },
  {
    id: 3,
    name: "David K.",
    location: "Scarborough",
    service: "French Drain System",
    rating: 5,
    text: "The French drain system they installed works perfectly. No more water pooling around our foundation! They handled all the permits and the City inspection passed without issues. Highly recommend!",
    date: "September 2024",
    verified: true
  },
  {
    id: 4,
    name: "Jennifer M.",
    location: "Mississauga",
    service: "Foundation Crack Repair",
    rating: 5,
    text: "Emergency service at 2 AM when our basement started flooding. They arrived within an hour and had the crack sealed by morning. Can't thank them enough for their rapid response!",
    date: "August 2024",
    verified: true
  },
  {
    id: 5,
    name: "Robert T.",
    location: "Toronto",
    service: "Basement Underpinning",
    rating: 5,
    text: "Major underpinning project to lower our basement. The structural engineers were excellent, and the work passed all City inspections. Added 2 feet of height and significantly increased our home value.",
    date: "July 2024",
    verified: true
  },
  {
    id: 6,
    name: "Lisa W.",
    location: "Vaughan",
    service: "Interior Waterproofing",
    rating: 5,
    text: "They helped us get the maximum City of Toronto rebate of $3,400! The interior waterproofing system works great and the rebate covered a significant portion of the cost. Excellent service!",
    date: "June 2024",
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-play carousel
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
        <p className="text-lg text-slate-600">
          Real reviews from verified GTA homeowners
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-amber-400" />
            ))}
          </div>
          <span className="text-lg font-semibold">4.9/5</span>
          <span className="text-slate-600">(287 reviews)</span>
        </div>
      </div>

      <div className="relative">
        {/* Main Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <Quote className="w-12 h-12 text-cyan-600 opacity-20 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-lg text-slate-700 italic mb-6">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900">{testimonial.name}</span>
                              {testimonial.verified && (
                                <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                                  Verified Customer
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-slate-600">
                              {testimonial.location} • {testimonial.service}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {testimonial.date}
                            </div>
                          </div>
                          
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Hidden on Mobile */}
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white shadow-lg"
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white shadow-lg"
          onClick={handleNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-600 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Google Reviews 4.9★</span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012 2v1h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">BBB A+ Rating</span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">HomeStars Verified</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <p className="text-lg text-slate-700 mb-6">
          Join thousands of satisfied GTA homeowners who trust Dryspace
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
            Get Your Free Inspection
          </Button>
          <Button size="lg" variant="outline">
            Read All Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}