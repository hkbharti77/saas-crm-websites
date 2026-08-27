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

import { Helmet } from 'react-helmet-async';

export default function FAQ({ includeSchema = true }) {
  // Allow multiple FAQs to be open simultaneously (defaults to first 2 open for instant reading)
  const [openSet, setOpenSet] = useState(new Set([0, 1]));

  const allOpen = openSet.size === faqs.length;

  const toggleFAQ = (index) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allOpen) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(faqs.map((_, i) => i)));
    }
  };

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="section bg-alt" id="faq">
      {includeSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}
      <div className="container" style={{ maxWidth: '920px' }}>
        <div className="faq-header-row" data-aos="fade-up">
          <div className="section-header section-header--center" style={{ marginBottom: '1.5rem' }}>
            <h2 className="h2">Frequently Asked Questions</h2>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>
              Everything you need to know about our AI CRMs, integrations, and deployment timelines.
            </p>
          </div>

          <div className="faq-controls">
            <button
              type="button"
              className="faq-toggle-all-btn"
              onClick={toggleAll}
              aria-label={allOpen ? "Collapse all FAQs" : "Expand all FAQs to read"}
            >
              {allOpen ? "Collapse all" : "Expand all answers"}
            </button>
          </div>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openSet.has(index);
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                data-aos="fade-up"
                data-aos-delay={index * 35}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="faq-question-title">{faq.question}</h3>
                  <span className="faq-icon-wrapper">
                    {isOpen ? <ChevronUp size={20} className="faq-icon" /> : <ChevronDown size={20} className="faq-icon" />}
                  </span>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

