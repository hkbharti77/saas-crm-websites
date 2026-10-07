import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { defaultFaqs } from '../data/faqs';
import './FAQ.css';

export default function FAQ({ includeSchema = true, customFaqs = null, title = "Frequently Asked Questions", subtitle = "Everything you need to know about our AI CRMs, integrations, and deployment timelines." }) {
  // Allow multiple FAQs to be open simultaneously (defaults to first 2 open for instant reading)
  const [openSet, setOpenSet] = useState(new Set([0, 1]));

  const activeFaqs = customFaqs || defaultFaqs;
  const allOpen = openSet.size === activeFaqs.length;

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
      setOpenSet(new Set(activeFaqs.map((_, i) => i)));
    }
  };

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeFaqs.map(faq => ({
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
      <div className="container" style={{ maxWidth: '1024px' }}>
        <div className="faq-header-row" data-aos="fade-up">
          <div className="section-header section-header--center" style={{ marginBottom: '1.5rem' }}>
            <h2 className="h2">{title}</h2>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1.05rem' }}>
              {subtitle}
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
          {activeFaqs.map((faq, index) => {
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
                  <h3 className="faq-question-title">{faq.question || faq.q}</h3>
                  <span className="faq-icon-wrapper">
                    {isOpen ? <ChevronUp size={20} className="faq-icon" /> : <ChevronDown size={20} className="faq-icon" />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  style={{ 
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                  }}
                >
                  <p className="faq-answer-text">{faq.answer || faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

