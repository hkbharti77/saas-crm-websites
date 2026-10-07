import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Database, 
  ArrowRight 
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './GuidesAndResources.css';

export default function CrmMigrationGuidePage() {
  const aiSummaryItems = [
    {
      question: "What is the Gyan VaniAi CRM Migration Guide?",
      answer: "A production engineering blueprint for migrating customer records, sales pipelines, communication timelines, and WhatsApp numbers from legacy CRMs to Gyan VaniAi with zero operational downtime."
    },
    {
      question: "How does Gyan VaniAi prevent WhatsApp downtime during migration?",
      answer: "By utilizing Meta WhatsApp Coexistence mode. Instead of de-registering your phone number and losing live conversations, Coexistence keeps your existing WhatsApp Business mobile app online throughout the migration process."
    },
    {
      question: "How long does a typical CRM migration take?",
      answer: "Standard SME migrations (under 50,000 records) complete within 24 to 48 hours. Enterprise deployments with custom schema mappings, role hierarchies, and complex webhooks typically take 3 to 7 business days."
    },
    {
      question: "What data formats are supported for migration?",
      answer: "Automated ingestion via REST APIs, CSV/JSON bulk uploads, and direct database webhooks. Pre-built mapping templates are provided for standard objects, customer contacts, deals, and custom CRM modules."
    }
  ];

  const migrationSteps = [
    {
      step: "01",
      title: "Schema Auditing & Custom Field Mapping",
      desc: "Audit source CRM data dictionaries. Map standard objects (Leads, Contacts, Accounts, Opportunities) and custom attributes to Gyan VaniAi's flexible schema with strict type validation."
    },
    {
      step: "02",
      title: "Historical Data Ingestion & Sanitization",
      desc: "Extract historical data via bulk API endpoints or CSV exports. De-duplicate customer records, validate phone number E.164 formats, and clean international country codes."
    },
    {
      step: "03",
      title: "WhatsApp Coexistence Zero-Downtime Binding",
      desc: "Authenticate your WhatsApp Business Account (WABA) using Meta 1-Click Embedded Signup. Enable Coexistence mode to preserve your active phone app without losing chat histories."
    },
    {
      step: "04",
      title: "Webhook Routing & Trigger Cutover",
      desc: "Redirect inbound lead forms, Click-to-WhatsApp ad webhooks, and e-commerce cart events to Gyan VaniAi ingestion endpoints while maintaining shadow logs."
    },
    {
      step: "05",
      title: "Team Onboarding & Shadow Run Verification",
      desc: "Provision team seats, configure role-based permissions (RBAC), and run 48-hour parallel telemetry to verify pipeline status consistency and SLA compliance."
    }
  ];

  const faqs = [
    {
      q: "Will our sales reps lose access to active WhatsApp customer chats during migration?",
      a: "No. With WhatsApp Coexistence mode, your sales reps continue replying to customer inquiries directly from their mobile phones without any disruption while Gyan VaniAi synchronizes data in the background."
    },
    {
      q: "Can custom deal pipeline stages be replicated in Gyan VaniAi?",
      a: "Yes. Gyan VaniAi allows you to build custom pipeline boards matching your exact multi-stage sales cycles, complete with automated stage-change webhooks."
    },
    {
      q: "How are past communication notes and timeline entries handled?",
      a: "Our migration scripts import historical call logs, notes, and activity milestones as chronological entries on each contact's unified timeline."
    }
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Enterprise CRM Migration Guide: Zero-Downtime Data & WhatsApp Transfer',
    description: 'Technical blueprint for migrating leads, pipelines, and WhatsApp numbers from legacy CRMs to Gyan VaniAi with zero downtime.',
    author: {
      '@type': 'Organization',
      name: 'Gyan VaniAi'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gyan VaniAi',
      url: 'https://www.gyanvaniai.com',
      logo: 'https://www.gyanvaniai.com/logo.webp'
    },
    url: 'https://www.gyanvaniai.com/guides/crm-migration',
    datePublished: '2026-10-07'
  };

  return (
    <div className="guide-page">
      <SeoHead
        title="Enterprise CRM Migration Guide 2026 | Zero-Downtime Blueprint | Gyan VaniAi"
        description="Step-by-step engineering guide for migrating from legacy systems to Gyan VaniAi. Zero-downtime WhatsApp transfer, schema mapping, and pipeline import."
        canonical="https://www.gyanvaniai.com/guides/crm-migration"
        schema={articleSchema}
        keywords="CRM Migration Guide, Zero Downtime CRM Migration, WhatsApp CRM Transfer, Legacy CRM Data Import"
      />

      {/* Hero */}
      <section className="guide-hero">
        <div className="container">
          <div className="guide-hero-badge">
            <Database size={16} />
            <span>Technical Engineering Blueprint</span>
          </div>
          <h1 className="guide-hero-title">
            Enterprise CRM Migration Guide: Zero-Downtime Transfer
          </h1>
          <p className="guide-hero-subtitle">
            A battle-tested architectural roadmap for transferring contacts, pipelines, timeline histories, and official WhatsApp numbers to Gyan VaniAi without dropping a single customer conversation.
          </p>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="Executive Summary: CRM Migration Architecture" />

      {/* Migration Steps Section */}
      <section className="guide-steps-section">
        <div className="container">
          <div className="guide-section-header">
            <span className="guide-pill">Implementation Phases</span>
            <h2 className="guide-section-title">The 5-Phase Zero-Downtime Migration Framework</h2>
            <p className="guide-section-desc">
              Follow this phased methodology to ensure complete data integrity, E.164 phone validation, and uninterrupted customer messaging.
            </p>
          </div>

          <div className="guide-steps-list">
            {migrationSteps.map((step, idx) => (
              <div key={idx} className="guide-step-card">
                <div className="guide-step-num">{step.step}</div>
                <div className="guide-step-content">
                  <h3 className="guide-step-title">{step.title}</h3>
                  <p className="guide-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cluster Navigation */}
      <section className="guide-cluster-section">
        <div className="container">
          <div className="guide-cluster-card">
            <h3 className="guide-cluster-title">Explore Related Architectural Benchmarks</h3>
            <div className="guide-cluster-links">
              <Link to="/services/whatsapp-coexistence" className="guide-link-pill">
                <span>WhatsApp Coexistence Mode</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/whatsapp-catalog-crm" className="guide-link-pill">
                <span>WhatsApp Catalog CRM</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/tools/whatsapp-pricing-calculator" className="guide-link-pill">
                <span>WhatsApp Pricing Calculator</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/resources/voice-ai-latency-benchmark" className="guide-link-pill">
                <span>Voice AI Latency Benchmark</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on CRM Migration" />
      </div>

      <ContactSection />
    </div>
  );
}
