import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: 'How long does a CRM project take?',
    answer: 'Timelines vary based on complexity. Standard CRM implementations take 2-4 weeks, while custom enterprise CRM systems with complex workflows can take 2-3 months.'
  },
  {
    question: 'Do you build custom software?',
    answer: 'Yes! We specialize in custom software development, including AI agents, HRMS, ERP systems, and business portals tailored to your exact operational needs.'
  },
  {
    question: 'Can you integrate with existing systems?',
    answer: 'Absolutely. Our solutions are designed to seamlessly integrate with your existing databases, legacy software, and third-party APIs like Salesforce, Stripe, or SAP.'
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we view deployment as the beginning of our partnership. We offer comprehensive maintenance, updates, security patching, and ongoing support.'
  },
  {
    question: 'Which industries do you specialize in?',
    answer: 'We have delivered solutions across Healthcare, Education, Manufacturing, Real Estate, Logistics, Finance, and Enterprise IT.'
  },
  {
    question: 'Can you develop mobile apps?',
    answer: 'Yes, we build high-performance native (iOS/Android) and cross-platform (React Native/Flutter) mobile applications for businesses and consumers.'
  },
  {
    question: 'Do you offer AI automation services?',
    answer: 'Yes. We build intelligent chatbots, voice agents, and multi-agent workflows that automate customer support, sales qualification, and internal operations.'
  },
  {
    question: 'How do I get a project estimate?',
    answer: 'Simply book a free consultation with our team. We will discuss your requirements, perform a technical feasibility check, and provide a detailed estimate.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section bg-alt" id="faq">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="h2 text-center" style={{ marginBottom: '3rem' }} data-aos="fade-up">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="faq-question">
                <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{faq.question}</h4>
                {openIndex === index ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
              </div>
              <div className="faq-answer">
                <p className="text-muted">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
