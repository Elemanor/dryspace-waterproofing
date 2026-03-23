import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How much does basement waterproofing cost in Toronto?",
    answer: "Basement waterproofing in Toronto typically costs between $3,000-$15,000, depending on the method and scope. Interior waterproofing averages $3,000-$8,000, while exterior waterproofing ranges from $5,000-$15,000. With City of Toronto rebates up to $3,400, your actual cost can be significantly reduced."
  },
  {
    question: "Is waterproofing a basement worth it?",
    answer: "Absolutely. Waterproofing protects your home's foundation, prevents mold growth, increases property value by 5-10%, and saves thousands in potential water damage repairs. Our 25-year transferable warranty ensures long-term protection and peace of mind."
  },
  {
    question: "What is the best basement waterproofing method?",
    answer: "The best method depends on your specific situation. Exterior waterproofing with membrane installation offers the most comprehensive protection. Interior drainage systems with sump pumps are excellent for managing water table issues. We provide free inspections to recommend the optimal solution for your home."
  },
  {
    question: "How long does basement waterproofing last?",
    answer: "Professional waterproofing typically lasts 20-30 years or more. Our exterior waterproofing comes with a 25-year transferable warranty. Interior systems with proper maintenance can last indefinitely. Regular maintenance of sump pumps and drainage systems ensures longevity."
  },
  {
    question: "Can I waterproof my basement myself?",
    answer: "While minor dampness issues can be addressed with DIY solutions, professional waterproofing is recommended for comprehensive protection. We handle complex issues like foundation cracks, drainage systems, and comply with Ontario Building Code 2024 requirements. Plus, professional installation is required for warranty and rebate eligibility."
  },
  {
    question: "What are the signs I need basement waterproofing?",
    answer: "Key signs include: water stains on walls/floors, musty odors, visible mold or mildew, efflorescence (white powder on walls), cracks in foundation walls, dampness after rain, and peeling paint or wallpaper. If you notice any of these, call us for a free inspection."
  },
  {
    question: "Do you offer emergency waterproofing services?",
    answer: "Yes! We provide 24/7 emergency response for flooding and urgent water issues. Our emergency team can typically arrive within 60 minutes in the Greater Toronto Area. Call 437-545-0067 anytime for immediate assistance."
  },
  {
    question: "What permits are required for waterproofing in Toronto?",
    answer: "Most exterior waterproofing and drainage work requires permits. Backwater valve installation needs a stand-alone drain permit. We handle all permit applications and inspections for you, typically completed within 10 business days. All work meets Ontario Building Code 2024 standards."
  },
  {
    question: "How do I qualify for the City of Toronto basement flooding protection subsidy?",
    answer: "Property owners can receive up to $3,400 in rebates. Eligible items include backwater valves ($1,250), sump pumps ($1,750), and foundation drain severance ($400). We handle all paperwork and ensure your installation meets city requirements for rebate approval."
  },
  {
    question: "What's the difference between interior and exterior waterproofing?",
    answer: "Exterior waterproofing prevents water from entering your foundation walls using membranes and proper drainage. Interior waterproofing manages water that enters, directing it to drainage systems and sump pumps. Exterior is more comprehensive but requires excavation; interior is less invasive but manages rather than prevents water entry."
  }
];

export default function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-xl border border-slate-200 bg-white px-6 data-[state=open]:border-cyan-200 data-[state=open]:shadow-card transition-all"
          >
            <AccordionTrigger className="text-left text-slate-900 hover:text-cyan-600 transition-colors py-5 text-[15px] font-medium hover:no-underline [&[data-state=open]]:text-cyan-600">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 rounded-xl bg-cyan-50 border border-cyan-100 p-5">
        <p className="text-sm font-semibold text-slate-900 mb-1.5">Still have questions?</p>
        <p className="text-sm text-slate-600">
          Our experts are available 24/7 to answer your waterproofing questions.
          Call <a href="tel:437-545-0067" className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">437-545-0067</a> or
          book a <a href="/free-inspection" className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">free inspection</a>.
        </p>
      </div>
    </div>
  );
}
