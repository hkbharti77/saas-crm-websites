import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from './SeoHead';
import { 
  Scale, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import '../pages/ComparePages.css';

/**
 * Reusable Competitor Comparison Page Template
 * Clean, compact, B2B SaaS comparison architecture with zero bloat.
 */
export default function ComparisonPageTemplate({ data }) {
  // All FAQs closed by default for compact scannability
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!data) return null;

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleBookDemo = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-demo-modal', {
          detail: { prefill: `I would like to explore Gyan VaniAi vs ${data.competitorName}` }
        })
      );
    }
  };

  // Dedicated FAQPage Schema strictly matching visible FAQs
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <div className="compare-page">
      <SeoHead
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        schema={faqPageSchema}
        keywords={data.seo.keywords}
      />

      {/* Breadcrumb Navigation */}
      <div className="container">
        <nav className="compare-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="crumb-link">Home</Link>
          <ChevronRight size={13} className="crumb-sep" />
          <Link to="/pricing" className="crumb-link">Solutions</Link>
          <ChevronRight size={13} className="crumb-sep" />
          <span className="crumb-current">{data.competitorName} vs Gyan VaniAi</span>
        </nav>
      </div>

      {/* Compact Hero Section */}
      <section className="compare-hero">
        <div className="container">
          <div className="compare-hero-badge">
            <Scale size={15} />
            <span>{data.hero.badge}</span>
          </div>
          <h1 className="compare-hero-title">{data.hero.title}</h1>
          <p className="compare-hero-subtitle">{data.hero.subtitle}</p>
        </div>
      </section>

      {/* Redesigned Compact Executive Summary */}
      <section className="exec-summary-section">
        <div className="container">
          <div className="exec-summary-card">
            <div className="exec-summary-header">
              <span className="exec-tag">At a Glance</span>
              <h2 className="exec-title">{data.executiveSummary.title}</h2>
              <p className="exec-intro">{data.executiveSummary.intro}</p>
            </div>

            <div className="exec-summary-grid">
              {/* Gyan VaniAi Column */}
              <div className="choice-card choice-card-gyanvani">
                <div className="choice-card-header">
                  <span className="choice-dot dot-gyanvani" />
                  <h3 className="choice-title">{data.executiveSummary.gyanVaniTitle}</h3>
                </div>
                <ul className="choice-list">
                  {data.executiveSummary.gyanVaniPoints.map((pt, idx) => (
                    <li key={idx} className="choice-item">
                      <Check size={16} className="choice-check icon-pass" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competitor Column */}
              <div className="choice-card choice-card-competitor">
                <div className="choice-card-header">
                  <span className="choice-dot dot-competitor" />
                  <h3 className="choice-title">{data.executiveSummary.competitorTitle}</h3>
                </div>
                <ul className="choice-list">
                  {data.executiveSummary.competitorPoints.map((pt, idx) => (
                    <li key={idx} className="choice-item">
                      <Check size={16} className="choice-check icon-neutral" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature & Capability Matrix Table */}
      <section className="compare-table-section">
        <div className="container">
          <div className="compare-table-card">
            <div className="table-header-row">
              <div>
                <h2 className="compare-table-heading">Feature & Capability Matrix</h2>
                <p className="table-subheading">
                  Verified capability overview comparing core conversational, voice, and data architecture.
                </p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '28%' }}>Capability</th>
                    <th scope="col" className="highlight-col" style={{ width: '36%' }}>
                      Gyan VaniAi
                    </th>
                    <th scope="col" style={{ width: '36%' }}>
                      {data.competitorName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.matrix.map((row, idx) => (
                    <tr key={idx}>
                      <td className="compare-feat-cell">
                        <strong>{row.capability}</strong>
                      </td>
                      <td className="highlight-col">
                        <div className="compare-cell-content">
                          <Check size={16} className="icon-pass" />
                          <span>{row.gyanVani}</span>
                        </div>
                      </td>
                      <td>
                        <div className="compare-cell-content">
                          {row.competitorStatus === 'check' && (
                            <Check size={16} className="icon-neutral" />
                          )}
                          <span>{row.competitor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Related Comparisons Navigation */}
      <section className="related-compare-section">
        <div className="container">
          <div className="related-compare-box">
            <span className="related-compare-label">RELATED COMPARISONS</span>
            <div className="related-compare-pills">
              {data.related.map((item, idx) => (
                <Link key={idx} to={item.path} className="related-pill">
                  <span>{item.name}</span>
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitor-Specific FAQ Accordion (5-7 Items Only) */}
      <section className="compare-faq-section" id="compare-faq">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="faq-section-header">
            <span className="faq-pill">Common Questions</span>
            <h2 className="faq-main-title">{data.competitorName} vs Gyan VaniAi FAQs</h2>
            <p className="faq-main-sub">
              Concise, factual answers to help you evaluate architecture, integrations, and migration feasibility.
            </p>
          </div>

          <div className="compact-faq-list">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`compact-faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="compact-faq-trigger"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="compact-faq-q">{faq.q}</span>
                    <span className="compact-faq-chevron">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={`faq-answer-${idx}`} className="compact-faq-body">
                      <p className="compact-faq-a">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact Premium B2B Call to Action */}
      <section className="compact-cta-section">
        <div className="container">
          <div className="compact-cta-card">
            <div className="cta-icon-pill">
              <Sparkles size={15} />
              <span>Modern Revenue Operations</span>
            </div>
            <h2 className="compact-cta-title">
              Ready to Build a CRM Around Your Workflow?
            </h2>
            <p className="compact-cta-subtitle">
              Move beyond generic CRM workflows with AI-powered automation, WhatsApp engagement, and custom integrations.
            </p>
            <div className="compact-cta-actions">
              <button
                type="button"
                className="btn btn-primary cta-btn-main"
                onClick={handleBookDemo}
              >
                <Calendar size={16} />
                <span>Book a Demo</span>
              </button>
              <Link to="/pricing" className="btn btn-secondary cta-btn-sub">
                <span>Explore Plans & Pricing</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trademark Disclaimer */}
      <div className="container">
        <div className="compare-disclaimer-wrap">
          <p className="compare-disclaimer-text">
            <strong>Disclaimer:</strong> {data.competitorName} is a trademark of {data.trademarkOwner}. Gyan VaniAi is not affiliated with, endorsed by, or sponsored by {data.competitorName}. Competitor capabilities are summarized from publicly available documentation as of October 2026. Because software features evolve, please verify current specifications directly with the respective vendor.
          </p>
        </div>
      </div>
    </div>
  );
}
