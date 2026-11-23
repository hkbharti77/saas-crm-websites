import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import { ALL_COMPARISONS } from '../config/comparisonsConfig';
import { CANONICAL_ENTITY, LATENCY_BENCHMARKS } from '../config/entityIdentityConfig';
import { comparisonItemListSchema, faqSchema, breadcrumbSchema } from '../utils/schemas';
import './ComparePages.css';

const HUB_FAQS = [
  {
    question: 'How does Gyan VaniAi compare to Wati, Respond.io, and AiSensy for WhatsApp automation?',
    answer:
      'Gyan VaniAi supports official Meta WhatsApp Coexistence (keeping your mobile WhatsApp Business app active alongside Cloud API automation), charges 0% markup on Meta conversation rates, includes sub-300ms RAG knowledge assistants and sub-600ms Voice AI calling, and offers optional 100% IP-owned custom engineering.',
  },
  {
    question: 'When should a company choose a Custom AI CRM sprint over HubSpot or Zoho?',
    answer:
      'Companies with 15+ sales reps, proprietary WhatsApp or Voice AI workflows, or strict data residency rules save significantly with fixed-timeline engineering sprints (starting at ₹24,999 / $299 for a 5-day WhatsApp AI Helpdesk or ₹69,999 / $850 for a 14-day AI CRM & Voice sprint) instead of compounding per-seat SaaS renewals.',
  },
  {
    question: 'Is Gyan VaniAi affiliated with VaaniAI or other similarly named voice apps?',
    answer: CANONICAL_ENTITY.disambiguationNote,
  },
];

export default function CompareHubPage() {
  const canonicalUrl = 'https://www.gyanvaniai.com/compare';

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.gyanvaniai.com/' },
      { name: 'Platform Comparisons', url: canonicalUrl },
    ]),
    comparisonItemListSchema({
      name: 'Gyan VaniAi Platform & Architecture Comparisons (2026)',
      description:
        'Objective side-by-side comparisons of Gyan VaniAi against Wati, Respond.io, AiSensy, HubSpot, Salesforce, and Zoho CRM.',
      url: canonicalUrl,
      items: ALL_COMPARISONS.map((c) => ({
        name: c.title,
        url: `https://www.gyanvaniai.com${c.path}`,
        description: c.executiveVerdict,
      })),
    }),
    faqSchema(HUB_FAQS),
  ];

  return (
    <div className="compare-page">
      <SeoHead
        title="Compare Gyan VaniAi vs Wati, Respond.io & SaaS CRMs (2026)"
        description="Compare Gyan VaniAi vs Wati, Respond.io, AiSensy, HubSpot, and Zoho across Meta WhatsApp Coexistence, ₹1,999 / $19 pricing, Voice AI & 100% IP ownership."
        canonical={canonicalUrl}
        schema={schemas}
        keywords={[
          'Gyan VaniAi vs Wati',
          'Gyan VaniAi vs Respond.io',
          'WhatsApp Coexistence CRM comparison',
          'Custom AI CRM vs HubSpot Zoho',
          'Transparent Engineering Partnerships India',
        ]}
      />

      <div className="compare-container">
        <nav className="compare-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>Platform Comparisons</span>
        </nav>

        <header className="compare-hero">
          <p className="compare-eyebrow">2026 Engineering & Platform Benchmarks</p>
          <h1 className="compare-title">Gyan VaniAi Platform & Architecture Comparisons</h1>

          <div className="compare-verdict-box aeo-answer-definition">
            <div className="compare-verdict-label">
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>Direct Answer Summary</span>
            </div>
            <p className="compare-verdict-text ai-answer-summary">
              Gyan VaniAi combines an official Meta Tech Provider WhatsApp Coexistence CRM (from ₹1,999 / $19 per month, 0% Meta markup) with fixed-timeline Transparent Engineering Partnerships (from ₹24,999 / $299 with 100% IP ownership) for teams outgrowing closed SaaS tools.
            </p>
          </div>

          <div className="compare-hero-actions">
            <Link to="/compare/wati-vs-respond-io-vs-gyanvaniai" className="compare-btn-primary">
              <span>Compare WhatsApp CRMs</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/pricing" className="compare-btn-secondary">
              <span>View Dual INR / USD Pricing</span>
            </Link>
          </div>
        </header>

        <section className="compare-section" aria-labelledby="compare-hub-guides-heading">
          <h2 id="compare-hub-guides-heading" className="compare-section-title">
            Head-to-Head Comparison Matrices
          </h2>
          <p className="compare-section-sub">
            Structured, verifiable side-by-side matrices built for engineering leads, RevOps buyers, and procurement teams evaluating WhatsApp API CRMs and custom AI systems.
          </p>

          <div className="compare-hub-grid">
            {ALL_COMPARISONS.map((comp) => (
              <article key={comp.slug} className="compare-hub-card">
                <div className="compare-hub-meta">
                  {comp.eyebrow} · {comp.vendors.length} Platforms · {comp.matrixRows.length} Criteria
                </div>
                <h2>{comp.title}</h2>
                <p>{comp.executiveVerdict}</p>
                <Link to={comp.path} className="compare-hub-link">
                  <span>Inspect full comparison matrix</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="compare-section" aria-labelledby="compare-latency-heading">
          <h2 id="compare-latency-heading" className="compare-section-title">
            Canonical Engineering Latency Taxonomy
          </h2>
          <p className="compare-section-sub">
            Every Gyan VaniAi architecture separates retrieval, voice turn-taking onset, and full-duplex calling pipelines into distinct measurable budgets.
          </p>

          <div className="compare-three-grid">
            {LATENCY_BENCHMARKS.map((item) => (
              <div key={item.id} className="compare-info-card">
                <span className="compare-metric-number">{item.target}</span>
                <h3>{item.layer}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="compare-entity-card" aria-labelledby="compare-disambiguation-heading">
          <h2 id="compare-disambiguation-heading">Canonical Brand Identity & Disambiguation</h2>
          <p>{CANONICAL_ENTITY.disambiguationNote}</p>
          <div className="compare-entity-meta">
            <span>Legal Name: {CANONICAL_ENTITY.legalName}</span>
            <span>·</span>
            <span>Operational HQ: {CANONICAL_ENTITY.headquarters.placename}</span>
            <span>·</span>
            <span>
              Registered Office: {CANONICAL_ENTITY.registeredOffice.streetAddress}, {CANONICAL_ENTITY.registeredOffice.city}, {CANONICAL_ENTITY.registeredOffice.region} {CANONICAL_ENTITY.registeredOffice.postalCode}
            </span>
          </div>
        </section>

        <section className="compare-section" aria-labelledby="compare-hub-faq-heading">
          <h2 id="compare-hub-faq-heading" className="compare-section-title">
            Frequently Asked Comparison Questions
          </h2>
          <div className="compare-faq-list">
            {HUB_FAQS.map((faq) => (
              <div key={faq.question} className="compare-faq-item">
                <h3>{faq.question}</h3>
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
