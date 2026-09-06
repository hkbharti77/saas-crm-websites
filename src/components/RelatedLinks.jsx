import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './RelatedLinks.css';

/**
 * RelatedLinks Component
 * Internal linking strategy for SEO and user navigation
 * Shows related pages, services, or articles to improve site structure
 */

// Predefined related content for different page types
const relatedContent = {
  'whatsapp-automation': [
    { title: 'WhatsApp Coexistence', url: '/services/whatsapp-coexistence', description: 'Use mobile app + business API simultaneously' },
    { title: 'AI Chatbots', url: '/services/ai-chatbots', description: 'Intelligent WhatsApp chatbots with RAG' },
    { title: 'CRM Development', url: '/services/crm-development', description: 'WhatsApp-integrated CRM systems' },
    { title: 'Sales Automation', url: '/services/sales-automation', description: 'Automate your sales workflows' }
  ],
  'whatsapp-coexistence': [
    { title: 'WhatsApp Automation', url: '/services/whatsapp-automation', description: 'Official WhatsApp Business API' },
    { title: 'CRM Development', url: '/services/crm-development', description: 'Custom CRM with WhatsApp' },
    { title: 'Lead Management', url: '/services/lead-management', description: 'Capture and manage leads' }
  ],
  'crm-development': [
    { title: 'Sales Automation', url: '/services/sales-automation', description: 'Automate your sales process' },
    { title: 'Lead Management', url: '/services/lead-management', description: 'Lead tracking and scoring' },
    { title: 'WhatsApp Automation', url: '/services/whatsapp-automation', description: 'WhatsApp-powered CRM' },
    { title: 'AI Agent Development', url: '/services/ai-agent-development', description: 'AI-powered business agents' }
  ],
  'ai-chatbots': [
    { title: 'AI Agent Development', url: '/services/ai-agent-development', description: 'Multi-agent AI systems' },
    { title: 'Voice Bot Assistant', url: '/services/voice-bot-assistant', description: 'Conversational voice AI' },
    { title: 'WhatsApp Automation', url: '/services/whatsapp-automation', description: 'WhatsApp chatbot integration' },
    { title: 'AI Development', url: '/services/ai-development', description: 'Custom AI solutions' }
  ],
  'ai-agent-development': [
    { title: 'AI Chatbots', url: '/services/ai-chatbots', description: 'RAG-powered chatbots' },
    { title: 'AI Development', url: '/services/ai-development', description: 'Custom AI software' },
    { title: 'Sales Automation', url: '/services/sales-automation', description: 'AI-powered sales workflows' }
  ],
  'voice-bot-assistant': [
    { title: 'WhatsApp Calling Agent', url: '/services/whatsapp-calling-agent', description: 'Voice calls via WhatsApp' },
    { title: 'Phone Call Agent', url: '/services/phone-call-agent', description: 'Traditional phone AI agents' },
    { title: 'IVR Solutions', url: '/services/ivr-solutions', description: 'Smart IVR systems' },
    { title: 'AI Chatbots', url: '/services/ai-chatbots', description: 'Text-based AI assistants' }
  ],
  'sales-automation': [
    { title: 'Lead Management', url: '/services/lead-management', description: 'Lead capture and nurturing' },
    { title: 'CRM Development', url: '/services/crm-development', description: 'Custom CRM solutions' },
    { title: 'AI Agent Development', url: '/services/ai-agent-development', description: 'Autonomous sales agents' }
  ],
  'home': [
    { title: 'WhatsApp Coexistence', url: '/services/whatsapp-coexistence', description: 'Revolutionary WhatsApp solution' },
    { title: 'AI CRM Development', url: '/services/crm-development', description: 'Intelligent CRM systems' },
    { title: 'AI Chatbots', url: '/services/ai-chatbots', description: 'Smart conversational AI' },
    { title: 'Sales Automation', url: '/services/sales-automation', description: 'Automate your revenue ops' }
  ]
};

export default function RelatedLinks({ currentPage = 'home', title = 'Related Services', maxLinks = 4 }) {
  const links = relatedContent[currentPage] || relatedContent['home'];
  const displayLinks = links.slice(0, maxLinks);

  if (!displayLinks || displayLinks.length === 0) {
    return null;
  }

  return (
    <section className="related-links-section" aria-labelledby="related-links-heading">
      <div className="related-links-container">
        <h2 id="related-links-heading" className="related-links-title">
          {title}
        </h2>
        <div className="related-links-grid">
          {displayLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.url}
              className="related-link-card"
            >
              <div className="related-link-content">
                <h3 className="related-link-title">{link.title}</h3>
                <p className="related-link-description">{link.description}</p>
              </div>
              <ArrowRight className="related-link-arrow" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * InlineRelatedLinks - Smaller version for inline content
 */
export function InlineRelatedLinks({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="inline-related-links">
      <p className="inline-related-title">See also:</p>
      <ul className="inline-related-list">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.url} className="inline-related-link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Service Categories - For footer or sidebar
 */
export function ServiceCategories() {
  const categories = [
    {
      name: 'WhatsApp Solutions',
      links: [
        { title: 'WhatsApp Coexistence', url: '/services/whatsapp-coexistence' },
        { title: 'WhatsApp Automation', url: '/services/whatsapp-automation' },
        { title: 'WhatsApp Calling Agent', url: '/services/whatsapp-calling-agent' }
      ]
    },
    {
      name: 'AI Solutions',
      links: [
        { title: 'AI Chatbots', url: '/services/ai-chatbots' },
        { title: 'AI Agent Development', url: '/services/ai-agent-development' },
        { title: 'Voice Bot Assistant', url: '/services/voice-bot-assistant' },
        { title: 'AI Development', url: '/services/ai-development' }
      ]
    },
    {
      name: 'Business Software',
      links: [
        { title: 'CRM Development', url: '/services/crm-development' },
        { title: 'Sales Automation', url: '/services/sales-automation' },
        { title: 'Lead Management', url: '/services/lead-management' },
        { title: 'HRMS Development', url: '/services/hrms-development' },
        { title: 'ERP Development', url: '/services/erp-development' }
      ]
    }
  ];

  return (
    <div className="service-categories">
      {categories.map((category, index) => (
        <div key={index} className="service-category">
          <h3 className="category-name">{category.name}</h3>
          <ul className="category-links">
            {category.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
