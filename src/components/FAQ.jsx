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
    answer: 'Absolutely. Our solutions are designed to seamlessly integrate with your existing databases, legacy software, and third-party APIs like Salesforce, HubSpot, Zoho, Stripe, or SAP.'
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
  },
  // High-intent commercial queries
  {
    question: 'What is the difference between WhatsApp Coexistence and WhatsApp Business API?',
    answer: 'WhatsApp Coexistence lets you keep your personal WhatsApp app running on your existing number while Gyan VaniAi runs business automation in parallel — no number change needed. The standard WhatsApp Business API replaces personal access entirely. Our Coexistence solution is Meta Tech Provider certified and ideal for sales teams that need both personal and business messaging on one device.'
  },
  {
    question: 'How much does an AI CRM system cost?',
    answer: 'Pricing depends on features and team size. Our AI CRM packages start from ₹8,000/month for India-based clients and $99/month for international clients. Enterprise custom builds are scoped per project with a detailed technical proposal. Book a free consultation for an exact quote tailored to your requirements.'
  },
  {
    question: 'Can your AI chatbots handle voice calls?',
    answer: 'Yes. Our Voice AI agents handle both inbound support calls and outbound lead qualification campaigns. They use natural speech synthesis with sub-300ms response times and can seamlessly hand off to a live human agent when needed, with full conversation context preserved.'
  },
  {
    question: 'Is my data secure? What compliance standards do you follow?',
    answer: 'All our platforms are built with SOC2 Type II readiness, end-to-end encryption, and role-based access control. Your data is never used to train third-party AI models. We support GDPR compliance for EU clients and follow ISO 27001 security best practices across all deployments.'
  },
  {
    question: 'Do you offer a free trial or demo environment?',
    answer: 'Yes — we provide a 7-day sandbox demo environment with real data simulation at no cost, no credit card required. You can explore the full AI CRM, WhatsApp automation, and lead management features before committing. Click "Book a Demo" to get started.'
  },
  {
    question: 'How does your AI lead scoring work?',
    answer: 'Our ML models score leads on 50+ behavioral and firmographic signals — including page visits, WhatsApp interaction patterns, email opens, company size, and job title. Scores update in real-time and automatically trigger routing rules to assign the right lead to the right rep at the right moment.'
  },
  {
    question: 'Can your AI agents work in multiple languages?',
    answer: 'Yes. Our AI chatbots and voice agents support 30+ languages including Hindi, Arabic, Spanish, French, German, Mandarin, Bahasa Indonesia, and more. Language detection is automatic based on the customer\'s input, with zero configuration required on your end.'
  },
  {
    question: 'What happens if the AI cannot answer a customer question?',
    answer: 'The AI intelligently escalates to a human agent via live chat handoff, email ticket creation, or WhatsApp transfer. The complete conversation history is preserved so your agent has full context and never needs to ask the customer to repeat themselves.'
  },
  {
    question: 'Do you offer white-label solutions for agencies?',
    answer: 'Yes. We offer white-label versions of our AI CRM, WhatsApp automation, and chatbot platforms for digital agencies and resellers. Your clients see your brand, not ours. Contact our partnerships team for white-label pricing and onboarding details.'
  },
  {
    question: 'Can I use your WhatsApp automation without changing my existing phone number?',
    answer: 'Yes, through our WhatsApp Coexistence platform. You keep your existing personal number active on your phone app while our system handles business automation, broadcasts, and team inbox management on the same number simultaneously. This is unique to our Meta Tech Provider certified solution.'
  }
];

import { Helmet } from 'react-helmet-async';

export default function FAQ({ includeSchema = true, customFaqs = null, title = "Frequently Asked Questions", subtitle = "Everything you need to know about our AI CRMs, integrations, and deployment timelines." }) {
  // Allow multiple FAQs to be open simultaneously (defaults to first 2 open for instant reading)
  const [openSet, setOpenSet] = useState(new Set([0, 1]));

  const activeFaqs = customFaqs || faqs;
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

