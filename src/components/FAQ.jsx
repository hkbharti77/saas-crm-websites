import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: 'How long does implementation take?',
    answer: 'Most standard CRM setups and chatbot integrations are completed within 2 weeks. Custom workflow development may take 4-6 weeks depending on complexity.'
  },
  {
    question: 'Do you integrate with my existing tools?',
    answer: 'Yes! We offer native integrations for over 50 popular tools including Salesforce, Hubspot, Zapier, Slack, and Shopify. We can also build custom API connectors.'
  },
  {
    question: 'How does the WhatsApp Automation work?',
    answer: 'We connect directly to the official WhatsApp Business API. This allows us to build chatbots that automatically answer FAQs, qualify leads, and route complex queries to your human agents.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Absolutely. All our standard plans are month-to-month with no long-term lock-in contracts unless you opt for an annual discount.'
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
              data-aos-delay={index * 100}
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
