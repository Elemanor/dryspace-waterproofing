import React, { useState } from 'react';

const faqs = [
  {
    q: 'How quickly can you respond to emergency flooding?',
    a: 'We offer 24/7 emergency response with crews available to arrive within 2 hours anywhere in the Greater Toronto Area. Our emergency teams are equipped with industrial pumps, dehumidifiers, and immediate waterproofing solutions to minimize damage to your property.'
  },
  {
    q: 'Do you handle insurance claims for water damage?',
    a: 'Yes, we work directly with all major insurance companies and can help document damage, provide detailed reports, and coordinate the claims process. We\'ll provide comprehensive documentation including photos, moisture readings, and detailed repair estimates to support your claim.'
  },
  {
    q: 'What\'s the difference between interior and exterior waterproofing?',
    a: 'Exterior waterproofing prevents water from entering foundation walls by installing membranes and drainage on the outside. Interior waterproofing manages water that enters through walls or floor using drainage systems and sump pumps. Exterior is more comprehensive but requires excavation; interior is less invasive but manages rather than prevents water entry.'
  },
  {
    q: 'How long does your waterproofing warranty last?',
    a: 'We provide a 25-year transferable warranty on all exterior waterproofing and foundation repair work. This warranty covers materials and workmanship, can be transferred to new homeowners, and includes annual inspection options. Interior systems come with a 10-year warranty on installations.'
  },
  {
    q: 'Are there government rebates available for waterproofing?',
    a: 'Yes! Toronto offers up to $3,400 through the Basement Flooding Protection Subsidy Program. Mississauga provides up to $3,000, and most GTHA municipalities have similar programs. We handle all rebate applications and documentation as part of our service, ensuring you receive maximum benefits.'
  },
  {
    q: 'Can I waterproof just one wall or area?',
    a: 'While partial waterproofing is possible, water follows the path of least resistance and may enter through untreated areas. We assess your entire foundation and recommend comprehensive solutions, but can phase work if budget is a concern. Our assessment will show which areas are priority.'
  },
  {
    q: 'How do I know if I need waterproofing or just better drainage?',
    a: 'Signs you need waterproofing include water stains, efflorescence, cracks, musty odors, or actual water entry. Poor drainage shows as pooling water, soggy yards, or overflowing gutters. Often both are needed - we provide free assessments to determine the root cause and recommend appropriate solutions.'
  },
  {
    q: 'What about waterproofing for finished basements?',
    a: 'Finished basements require special care to protect investments in flooring, drywall, and furnishings. We offer solutions that work behind finished walls including injection waterproofing for cracks, interior drainage systems that can be installed under flooring, and humidity control systems to prevent mold.'
  },
  {
    q: 'Do you waterproof concrete block foundations?',
    a: 'Yes, concrete block foundations require specialized techniques as they\'re hollow and can fill with water. We use interior drainage systems, block cavity drains, and exterior membrane systems designed specifically for block. Each foundation type - poured concrete, block, stone, or brick - requires different approaches we\'re experienced with.'
  },
  {
    q: 'What areas of Toronto do you service?',
    a: 'We service all of Greater Toronto including Toronto, North York, Scarborough, Etobicoke, York, East York, Mississauga, Brampton, Vaughan, Richmond Hill, Markham, Oakville, Burlington, Hamilton, Ajax, Pickering, and Whitby. We\'re familiar with the specific soil conditions and water table issues in each area.'
  },
  {
    q: 'How much does basement waterproofing typically cost?',
    a: 'Costs vary based on the solution: Interior waterproofing ranges from $3,000-$8,000, exterior waterproofing from $15,000-$30,000, French drains from $8,000-$15,000, and sump pump installation from $2,500-$4,500. We provide free detailed quotes after inspection and offer 0% financing options.'
  },
  {
    q: 'Can you waterproof in winter?',
    a: 'Yes! Interior waterproofing can be done year-round. Exterior work is possible in winter using heated enclosures and special concrete additives, though we prefer spring/summer/fall for exterior excavation. Emergency repairs are performed regardless of season, and we have techniques for working in all weather conditions.'
  }
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-slate-50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-slate-100 transition-colors flex justify-between items-center"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-900 pr-8">{question}</span>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const WaterproofingFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Get answers to common waterproofing questions from Toronto's trusted experts
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-cyan-50 rounded-xl">
            <h3 className="font-semibold text-slate-900 mb-2">Have a specific question?</h3>
            <p className="text-slate-600 mb-4">
              Our waterproofing experts are available 24/7 to answer your questions and provide emergency assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:437-545-0067"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: 437-545-0067
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-cyan-600 font-medium rounded-lg border border-blue-200 hover:bg-cyan-50 transition-colors"
              >
                Get Free Inspection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaterproofingFAQ;