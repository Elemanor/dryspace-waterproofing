import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, ChevronDown } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  date: string;
  rating: number;
  text: string;
  project: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    name: 'Michael Chen', location: 'Forest Hill', date: 'December 2024', rating: 5,
    text: 'Dryspace saved our home during the spring flooding. Their emergency response team arrived within an hour and immediately started pumping water. The permanent waterproofing solution they installed has kept our basement completely dry through several storms.',
    project: 'Emergency Flooding & Exterior Waterproofing', verified: true
  },
  {
    name: 'Sarah Thompson', location: 'Mississauga', date: 'November 2024', rating: 5,
    text: 'Professional from start to finish. They handled all the rebate paperwork for the city subsidy program and saved us $3,000. The 25-year warranty gives us complete peace of mind. Highly recommend!',
    project: 'Interior Waterproofing & Sump Pump', verified: true
  },
  {
    name: 'David Martinez', location: 'North York', date: 'October 2024', rating: 5,
    text: 'We had water coming through foundation cracks for years. Dryspace injected all the cracks and installed a French drain system. Haven\'t had a drop of water since. Worth every penny.',
    project: 'Foundation Crack Repair & French Drain', verified: true
  },
  {
    name: 'Jennifer Park', location: 'Etobicoke', date: 'September 2024', rating: 5,
    text: 'Needed basement underpinning to add height. Complex job but they handled everything including permits and engineering. Now we have a beautiful legal basement apartment generating rental income.',
    project: 'Basement Underpinning & Waterproofing', verified: true
  },
  {
    name: 'Robert Wilson', location: 'Scarborough', date: 'August 2024', rating: 5,
    text: 'Our 100-year-old home had serious water issues. Dryspace did a complete exterior excavation and membrane installation. They were careful with our landscaping and cleaned up perfectly.',
    project: 'Heritage Home Exterior Waterproofing', verified: true
  },
  {
    name: 'Lisa Chang', location: 'Vaughan', date: 'July 2024', rating: 5,
    text: 'After sewage backup, we were devastated. Dryspace not only cleaned everything but installed a backwater valve to prevent future issues. Insurance covered most of it thanks to their documentation.',
    project: 'Sewage Cleanup & Backwater Valve', verified: true
  },
  {
    name: 'Mark Anderson', location: 'Oakville', date: 'June 2024', rating: 5,
    text: 'The team was amazing. They worked around our finished basement, installing interior drainage without damaging anything. The WiFi sump pump monitoring gives us peace of mind when traveling.',
    project: 'Interior Drainage in Finished Basement', verified: true
  },
  {
    name: 'Emily Foster', location: 'Brampton', date: 'May 2024', rating: 5,
    text: 'Spring thaw caused major foundation issues. Dryspace provided emergency shoring, then completed permanent repairs. They coordinated with our structural engineer perfectly.',
    project: 'Foundation Repair & Stabilization', verified: true
  },
  {
    name: 'James Liu', location: 'Richmond Hill', date: 'April 2024', rating: 5,
    text: 'Proactive waterproofing before finishing our basement. Smart decision! They installed everything needed to keep it dry forever. The warranty transfers to future owners which adds value.',
    project: 'Preventive Waterproofing System', verified: true
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
      />
    ))}
  </div>
);

const CustomerReviews: React.FC = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [filterLocation, setFilterLocation] = useState('all');

  const locations = ['all', ...Array.from(new Set(reviews.map(r => r.location)))];

  const filteredReviews = filterLocation === 'all'
    ? reviews
    : reviews.filter(r => r.location === filterLocation);

  const displayedReviews = filteredReviews.slice(0, visibleReviews);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label-pill mb-4">Testimonials</p>
          <h2 className="text-headline text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners across Toronto who trust Dryspace
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {[
            { value: 'A+', label: 'Google Verified', sub: 'Business' },
            { value: 'A+', label: 'BBB Rating', sub: 'Accredited' },
            { value: '2024', label: 'HomeStars', sub: 'Best of Winner' },
            { value: '25+', label: 'Years', sub: 'Since 1999' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm font-medium text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Location filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap gap-2 justify-center">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => { setFilterLocation(location); setVisibleReviews(6); }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filterLocation === location
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-200 hover:text-cyan-600'
                }`}
              >
                {location === 'all' ? 'All Locations' : location}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-8">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <StarRating rating={review.rating} />
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-cyan-600 mt-1 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Verified Customer
                    </span>
                  )}
                </div>
                <svg className="w-7 h-7 text-cyan-100 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">"{review.text}"</p>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {review.location} &middot; {review.date}
                </div>
                <p className="text-xs text-cyan-600 font-medium mt-1">{review.project}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {visibleReviews < filteredReviews.length && (
          <div className="text-center mb-12">
            <button
              onClick={() => setVisibleReviews(prev => prev + 6)}
              className="btn-secondary"
            >
              <ChevronDown className="w-4 h-4" />
              Load More Reviews ({filteredReviews.length - visibleReviews} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
