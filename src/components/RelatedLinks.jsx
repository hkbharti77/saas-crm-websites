import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './RelatedLinks.css';

/**
 * RelatedLinks Component
 * Internal linking strategy for SEO and user navigation
 * Shows related pages, services, or articles to improve site structure
 */

// Predefined related content organized by topic clusters
const relatedContent = {
  'whatsapp-automation': [
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Run mobile app and CRM on one number simultaneously' },
    { title: 'Gyan VaniAi vs Wati & Respond.io', url: '/compare/wati-vs-respond-io-vs-gyanvaniai', description: '2026 WhatsApp AI CRM comparison on Coexistence & pricing' },
    { title: 'WhatsApp Calling Agent Bots', url: '/services/whatsapp-calling-agent', description: 'Autonomous conversational voice calls on WhatsApp' },
    { title: 'WhatsApp CRM Pricing', url: '/pricing', description: 'Turnkey SaaS plans from ₹1,999 / $19 per month with 7-day trial' }
  ],
  'whatsapp-coexistence': [
    { title: 'Gyan VaniAi vs Wati & Respond.io', url: '/compare/wati-vs-respond-io-vs-gyanvaniai', description: 'Side-by-side matrix on Coexistence, RAG & 0% Meta markup' },
    { title: 'WhatsApp CRM & Automation', url: '/services/whatsapp-automation', description: 'Official Meta Cloud API broadcasts and shared team inbox' },
    { title: 'WhatsApp Calling Agent Bots', url: '/services/whatsapp-calling-agent', description: 'Sub-600ms voice calling agents on WhatsApp' },
    { title: 'Custom AI CRM Software', url: '/services/crm-development', description: 'Bespoke CRM sprints from ₹24,999 / $299 with 100% IP' }
  ],
  'whatsapp-calling-agent': [
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Mobile app and Cloud API on a single phone number' },
    { title: 'Conversational Voice AI Assistants', url: '/services/voice-bot-assistant', description: 'Full-duplex conversational voice agents for support' },
    { title: 'Voice AI Latency Benchmark', url: '/resources/voice-ai-latency-benchmark', description: 'Sub-400ms turn-taking & sub-600ms full-duplex call specs' },
    { title: 'WhatsApp CRM Platform', url: '/services/whatsapp-automation', description: 'Omnichannel WhatsApp marketing and lead pipelines' }
  ],
  'crm-development': [
    { title: 'Custom AI CRM vs HubSpot & Zoho', url: '/compare/custom-ai-crm-vs-off-the-shelf', description: 'Compare 100% IP-owned sprints vs recurring per-seat SaaS CRMs' },
    { title: 'Engineering Partnerships & Pricing', url: '/pricing', description: 'Fixed sprints from ₹24,999 / $299 and SaaS from ₹1,999 / $19' },
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Native Meta Tech Provider WhatsApp mobile & CRM sync' },
    { title: 'Sales Automation Software', url: '/services/sales-automation', description: 'Automated deal pipelines and multi-touch follow-ups' }
  ],
  'lead-management': [
    { title: 'Sales Automation Software', url: '/services/sales-automation', description: 'Automated sales workflows and pipeline velocity' },
    { title: 'Custom CRM Development', url: '/services/crm-development', description: 'Bespoke CRM tailored to your sales methodologies' },
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Capture and convert leads directly on WhatsApp' },
    { title: 'Platform Comparisons (2026)', url: '/compare', description: 'Compare Gyan VaniAi against Wati, Respond.io, HubSpot & Zoho' }
  ],
  'ai-chatbots': [
    { title: 'AI Agent Development', url: '/services/ai-agent-development', description: 'Multi-agent systems with tool-calling and autonomous execution' },
    { title: 'Secure Enterprise RAG Guide', url: '/blog/secure-rag-pipelines-enterprise', description: 'Architecting zero-hallucination vector knowledge pipelines' },
    { title: 'AI to Human Handoff Systems', url: '/services/human-handoff-systems', description: 'Contextual escalation to human agents with full transcripts' },
    { title: 'Conversational Voice Bots', url: '/services/voice-bot-assistant', description: 'Low-latency conversational voice AI for telephony' }
  ],
  'ai-agent-development': [
    { title: 'Multi-Agent Orchestration Guide', url: '/blog/multi-agent-orchestration-future', description: 'The future of autonomous multi-agent operational swarms' },
    { title: 'Custom AI Chatbots', url: '/services/ai-chatbots', description: 'RAG-grounded customer support and qualification chatbots' },
    { title: 'Custom AI CRM vs Off-the-Shelf', url: '/compare/custom-ai-crm-vs-off-the-shelf', description: 'Evaluate custom multi-agent CRM ownership vs SaaS seats' },
    { title: 'Custom CRM Development', url: '/services/crm-development', description: 'Integrate intelligent agents directly into your CRM' }
  ],
  'voice-bot-assistant': [
    { title: 'WhatsApp Calling Agent Bots', url: '/services/whatsapp-calling-agent', description: 'Voice calls and automated campaigns via WhatsApp' },
    { title: 'Voice AI Latency Benchmark', url: '/resources/voice-ai-latency-benchmark', description: 'Sub-400ms turn-taking & sub-600ms full-duplex voice specs' },
    { title: 'AI Phone Call Agents', url: '/services/phone-call-agent', description: 'Standard phone lines, SIP trunks, and PBX telephony' },
    { title: 'Smart IVR Solutions', url: '/services/ivr-solutions', description: 'Dynamic IVR with CRM data-dips and speech recognition' }
  ],
  'sales-automation': [
    { title: 'Lead Management Software', url: '/services/lead-management', description: 'Automated lead capture, qualification, and routing' },
    { title: 'Custom CRM Development', url: '/services/crm-development', description: 'Custom pipelines with zero per-seat SaaS license fees' },
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Close deals on WhatsApp without losing your phone app' },
    { title: 'Platform Comparisons (2026)', url: '/compare', description: 'Compare Gyan VaniAi vs Wati, Respond.io, HubSpot & Zoho' }
  ],
  'home': [
    { title: 'WhatsApp Coexistence Mode', url: '/services/whatsapp-coexistence', description: 'Run mobile app and AI CRM on 1 number simultaneously' },
    { title: 'Custom AI CRM Development', url: '/services/crm-development', description: 'Bespoke CRM sprints from ₹24,999 / $299 with 100% IP' },
    { title: 'Platform Comparisons (2026)', url: '/compare', description: 'Gyan VaniAi vs Wati, Respond.io, AiSensy, HubSpot & Zoho' },
    { title: 'Dual INR / USD Pricing', url: '/pricing', description: 'SaaS plans from ₹1,999 / $19 & fixed engineering sprints' }
  ]
};

export default function RelatedLinks({ currentPage = 'home', currentSlug = null, title = 'Related Solutions', maxLinks = 4 }) {
  const resolvedKey = currentSlug || currentPage || 'home';
  const links = relatedContent[resolvedKey] || relatedContent['home'];
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
