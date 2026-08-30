import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BookOpen, Layers, Bot, MessageSquare, Zap, LifeBuoy } from 'lucide-react';
import './Documentation.css';

export default function Documentation() {
  const sections = [
    {
      title: "Platform Overview",
      icon: <Layers className="doc-icon" />,
      items: [
        { title: "AI CRM", desc: "Understand the core architecture of Gyan VaniAi CRM." },
        { title: "Lead Management", desc: "How leads are captured, scored, and routed." },
        { title: "AI Agents", desc: "Deploying autonomous agents for sales and support." },
        { title: "WhatsApp Coexistence", desc: "Running Business API alongside the mobile app." },
        { title: "Voice AI", desc: "Configuring conversational voice agents." }
      ]
    },
    {
      title: "Getting Started",
      icon: <BookOpen className="doc-icon" />,
      items: [
        { title: "Platform overview", desc: "A high-level look at the dashboard and modules." },
        { title: "Account setup", desc: "Initial configuration and user role management." },
        { title: "CRM workflow basics", desc: "Setting up your first pipeline stages." },
        { title: "Demo environment", desc: "Using the 7-day trial sandbox." }
      ]
    },
    {
      title: "AI & Automation",
      icon: <Zap className="doc-icon" />,
      items: [
        { title: "AI agents", desc: "Configuring agent behaviors and knowledge bases." },
        { title: "Lead qualification", desc: "Setting up AI-driven lead scoring rules." },
        { title: "Sales automation", desc: "Automating follow-ups and task creation." },
        { title: "Workflow automation", desc: "Triggering actions based on CRM events." }
      ]
    },
    {
      title: "WhatsApp Coexistence",
      icon: <MessageSquare className="doc-icon" />,
      items: [
        { title: "Business WhatsApp workflows", desc: "Managing conversations across devices." },
        { title: "CRM communication", desc: "Syncing chats with lead records." },
        { title: "Automation concepts", desc: "Setting up auto-replies and routing." }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Documentation & Platform Technical Guides | Gyan VaniAi</title>
        <meta name="description" content="Official documentation for Gyan VaniAi: AI CRM architecture, WhatsApp Coexistence setup, low-latency RAG pipelines, voice bots, and API integration guides." />
        <link rel="canonical" href="https://www.gyanvaniai.online/documentation" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gyanvaniai.online/documentation" />
        <meta property="og:title" content="Documentation & Platform Technical Guides | Gyan VaniAi" />
        <meta property="og:description" content="Official documentation for Gyan VaniAi: AI CRM architecture, WhatsApp Coexistence setup, low-latency RAG pipelines, voice bots, and API integration guides." />
        <meta property="og:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Documentation & Platform Technical Guides | Gyan VaniAi" />
        <meta name="twitter:description" content="Official documentation for Gyan VaniAi: AI CRM architecture, WhatsApp Coexistence setup, low-latency RAG pipelines, voice bots, and API integration guides." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Gyan VaniAi Documentation & Platform Technical Guides",
            "url": "https://www.gyanvaniai.online/documentation",
            "description": "Explore Gyan VaniAi platform capabilities, CRM workflows, AI automation, WhatsApp coexistence, and integration guidance.",
            "publisher": { "@id": "https://www.gyanvaniai.online/#organization" }
          })}
        </script>
      </Helmet>

      <div className="docs-page">
        {/* Hero Section */}
        <section className="docs-hero">
          <div className="docs-hero-content">
            <h1>Documentation</h1>
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
                    <a key={i} href="#support" className="doc-item">
                      <div className="doc-item-content">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <ArrowRight className="doc-item-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Integrations */}
            <div className="doc-category-card">
              <div className="doc-category-header">
                <Bot className="doc-icon" />
                <h2>Integrations</h2>
              </div>
              <div className="doc-items">
                <a href="#support" className="doc-item">
                  <div className="doc-item-content">
                    <h3>WhatsApp Cloud API</h3>
                    <p>Official Meta integration for messaging.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </a>
                <a href="#support" className="doc-item">
                  <div className="doc-item-content">
                    <h3>Webhooks</h3>
                    <p>Receive real-time lead and event data.</p>
                  </div>
                  <ArrowRight className="doc-item-arrow" />
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="doc-category-card" id="support">
              <div className="doc-category-header">
                <LifeBuoy className="doc-icon" />
                <h2>Support</h2>
              </div>
              <div className="doc-items">
                <a href="mailto:contact@gyanvaniai.online" className="doc-item">
                  <div className="doc-item-content">
                    <h3>Contact Support</h3>
                    <p>Get help from our technical team.</p>
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
