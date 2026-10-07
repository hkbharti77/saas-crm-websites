import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { ArrowRight, BookOpen, Layers, Bot, MessageSquare, Zap, LifeBuoy, Code2 } from 'lucide-react';
import './Documentation.css';

export default function Documentation() {
  const sections = [
    {
      title: "Platform Overview",
      icon: <Layers className="doc-icon" />,
      items: [
        { title: "AI CRM Architecture", desc: "Understand the core multi-tenant architecture of Gyan VaniAi CRM.", to: "/services/crm-development" },
        { title: "Lead Ingestion & Scoring", desc: "How inbound leads are captured, enriched, scored, and routed.", to: "/services/lead-management" },
        { title: "AI Agent Orchestration", desc: "Deploying autonomous tool-calling agents for sales and operations.", to: "/blog/multi-agent-orchestration-future" },
        { title: "WhatsApp Coexistence", desc: "Running Business Cloud API alongside the mobile app on 1 number.", to: "/services/whatsapp-coexistence" },
        { title: "Conversational Voice AI", desc: "Configuring sub-400ms speech synthesis and telephony agents.", to: "/services/voice-bot-assistant" }
      ]
    },
    {
      title: "Getting Started",
      icon: <BookOpen className="doc-icon" />,
      items: [
        { title: "Platform Modules & Setup", desc: "A high-level look at dashboard telemetry and module configurations.", to: "/services/crm-development" },
        { title: "Tiered Pricing & Plans", desc: "Explore Starter, Growth, Scale, and Enterprise subscription specs.", to: "/pricing" },
        { title: "Pipeline & Stage Movement", desc: "Configuring deal stages, automated actions, and rep assignment.", to: "/services/sales-automation" },
        { title: "Live Sandbox Demo", desc: "Testing the 7-day live evaluation environment.", to: "/terms#demo-policy" }
      ]
    },
    {
      title: "AI & Automation",
      icon: <Zap className="doc-icon" />,
      items: [
        { title: "Autonomous Reasoning", desc: "Configuring agent behaviors, tools, and multi-step execution.", to: "/blog/multi-agent-orchestration-future" },
        { title: "RAG Knowledge Bases", desc: "Tenant-isolated vector retrieval with sub-300ms latency SLAs.", to: "/blog/secure-rag-pipelines-enterprise" },
        { title: "Sales Automation", desc: "Automating follow-up sequences, task triggers, and lead alerts.", to: "/services/sales-automation" },
        { title: "Conversational AI Chatbots", desc: "Customer support deflection and interactive lead qualification.", to: "/services/ai-chatbots" }
      ]
    },
    {
      title: "WhatsApp Coexistence",
      icon: <MessageSquare className="doc-icon" />,
      items: [
        { title: "Dual-Surface Architecture", desc: "Meta Tech Provider dual-sync between mobile app and web CRM.", to: "/services/whatsapp-coexistence" },
        { title: "Broadcast Campaigns", desc: "Pre-approved Meta template messaging to 10,000+ opted-in contacts.", to: "/services/whatsapp-automation" },
        { title: "In-App WhatsApp Voice", desc: "Automated VoIP outbound calls and phone bots inside WhatsApp.", to: "/services/whatsapp-calling-agent" },
        { title: "Cloud API Integration Guide", desc: "Comprehensive webhook fanout and payload architecture.", to: "/blog/whatsapp-business-api-automation" }
      ]
    }
  ];

  return (
    <>
      <SeoHead
        title="Documentation & Platform Technical Guides | Gyan VaniAi"
        description="Official documentation for Gyan VaniAi: AI CRM architecture, WhatsApp Coexistence setup, low-latency RAG pipelines, voice bots, and API integration guides."
        canonical="https://www.gyanvaniai.com/documentation"
        image="https://www.gyanvaniai.com/hero_dashboard.webp"
        schema={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "Gyan VaniAi Documentation & Platform Technical Guides",
          "url": "https://www.gyanvaniai.com/documentation",
          "description": "Explore Gyan VaniAi platform capabilities, CRM workflows, AI automation, WhatsApp coexistence, and integration guidance.",
          "image": ["https://www.gyanvaniai.com/hero_dashboard.webp"],
          "author": {
            "@type": "Organization",
            "name": "Gyan VaniAi",
            "url": "https://www.gyanvaniai.com/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Gyan VaniAi",
            "url": "https://www.gyanvaniai.com/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.gyanvaniai.com/logo.png"
            }
          },
          "datePublished": "2024-01-01T00:00:00.000Z",
          "dateModified": "2026-03-01T00:00:00.000Z"
        }}
      />

      <div className="docs-page">
        {/* Hero Section */}
        <section className="docs-hero">
          <div className="docs-hero-content">
            <h1>Documentation &amp; Technical Architecture</h1>
            <p className="docs-subtitle">
              Explore Gyan VaniAi platform capabilities, CRM workflows, AI automation, WhatsApp coexistence, and integration guidance.
            </p>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="docs-content-section section">
          <div className="docs-grid">
            {sections.map((section, idx) => (
              <div key={idx} className="doc-category-card">
                <div className="doc-category-header">
                  {section.icon}
                  <h2>{section.title}</h2>
                </div>
                <div className="doc-items">
                  {section.items.map((item, i) => (
                    <Link key={i} to={item.to} className="doc-item">
                      <div className="doc-item-content">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <ArrowRight className="doc-item-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Integrations & Developer SDKs */}
            <div className="doc-category-card">
              <div className="doc-category-header">
                <Bot className="doc-icon" />
                <h2>Integrations</h2>
              </div>
              <div className="doc-items">
                <Link to="/blog/whatsapp-business-api-automation" className="doc-item">
                  <div className="doc-item-content">
                    <h3>WhatsApp Cloud API</h3>
                    <p>Official Meta integration for messaging &amp; coexistence.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </Link>
                <Link to="/blog/whatsapp-business-api-automation" className="doc-item">
                  <div className="doc-item-content">
                    <h3>Webhooks &amp; Event Fanout</h3>
                    <p>Receive real-time lead updates and chat payloads.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </Link>
              </div>
            </div>

            {/* Developer Resources & Open Source */}
            <div className="doc-category-card">
              <div className="doc-category-header">
                <Code2 className="doc-icon" />
                <h2>Developer Resources</h2>
              </div>
              <div className="doc-items">
                <a href="https://github.com/gyanvaniai" target="_blank" rel="noopener noreferrer" className="doc-item">
                  <div className="doc-item-content">
                    <h3>GitHub Organization &amp; SDKs</h3>
                    <p>Explore public SDKs, webhook templates, and community tools.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </a>
                <Link to="/services/crm-development" className="doc-item">
                  <div className="doc-item-content">
                    <h3>Bespoke Enterprise API</h3>
                    <p>Single-tenant API endpoints, PostgreSQL schemas, and Spring Boot.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="doc-category-card" id="support">
              <div className="doc-category-header">
                <LifeBuoy className="doc-icon" />
                <h2>Support</h2>
              </div>
              <div className="doc-items">
                <a href="mailto:contact@gyanvaniai.com" className="doc-item">
                  <div className="doc-item-content">
                    <h3>Contact Technical Support</h3>
                    <p>Get direct architectural assistance from our engineering team.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
