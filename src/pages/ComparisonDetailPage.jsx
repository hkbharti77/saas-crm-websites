import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import {
  COMPARISON_CATEGORIES,
  CURRENCY_DISPLAY_MODES,
  formatComparisonPrice,
  ALL_COMPARISONS,
} from '../config/comparisonsConfig';
import { LATENCY_BENCHMARKS } from '../config/entityIdentityConfig';
import { comparisonItemListSchema, faqSchema, breadcrumbSchema } from '../utils/schemas';
import './ComparePages.css';

export default function ComparisonDetailPage({ comparison }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currencyMode, setCurrencyMode] = useState('dual');

  const filteredRows = useMemo(() => {
    if (selectedCategory === 'all') return comparison.matrixRows;
    return comparison.matrixRows.filter((row) => row.category === selectedCategory);
  }, [comparison.matrixRows, selectedCategory]);

  const otherComparison = useMemo(
    () => ALL_COMPARISONS.find((c) => c.slug !== comparison.slug),
    [comparison.slug]
  );

  const canonicalUrl = `https://www.gyanvaniai.com${comparison.path}`;

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://www.gyanvaniai.com/' },
      { name: 'Comparisons', url: 'https://www.gyanvaniai.com/compare' },
      { name: comparison.title, url: canonicalUrl },
    ]),
    comparisonItemListSchema({
      name: comparison.title,
      description: comparison.executiveVerdict,
      url: canonicalUrl,
      items: comparison.vendors.map((v) => ({
        name: v.name,
        description: v.highlight ? comparison.executiveVerdict : `${v.name} evaluated in ${comparison.title}`,
      })),
    }),
    faqSchema(comparison.faqs),
  ];

  const handleOpenDemo = () => {
    window.dispatchEvent(
      new CustomEvent('open-demo-modal', {
        detail: {
          inquiryType: comparison.ctaInquiryType,
          prefillMessage: comparison.ctaPrefill,
        },
      })
    );
  };

  return (
    <div className="compare-page">
      <SeoHead
        title={comparison.seoTitle}
        description={comparison.seoDescription}
        canonical={canonicalUrl}
        schema={schemas}
        aeoQuestion={comparison.faqs[0]?.question}
        aeoAnswer={comparison.faqs[0]?.answer}
      />

      <div className="compare-container">
        <nav className="compare-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/compare">Platform Comparisons</Link>
          <span aria-hidden="true">/</span>
          <span>{comparison.eyebrow}</span>
        </nav>

        <header className="compare-hero">
          <p className="compare-eyebrow">{comparison.eyebrow}</p>
          <h1 className="compare-title">{comparison.title}</h1>

          <div className="compare-verdict-box aeo-answer-definition">
            <div className="compare-verdict-label">
              <CheckCircle2 size={15} aria-hidden="true" />
              <span>Executive Verdict</span>
            </div>
            <p className="compare-verdict-text ai-answer-summary">{comparison.executiveVerdict}</p>
          </div>

          <div className="compare-hero-actions">
            <button type="button" className="compare-btn-primary" onClick={handleOpenDemo}>
              <span>{comparison.ctaLabel}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <Link to="/pricing" className="compare-btn-secondary">
              <span>Inspect Pricing & Partnerships</span>
            </Link>
          </div>
        </header>

        <section className="compare-section" aria-labelledby="compare-matrix-heading">
          <h2 id="compare-matrix-heading" className="compare-section-title">
            Side-by-Side Capability Matrix
          </h2>

          <div className="compare-controls">
            <div className="compare-segmented-group" role="tablist" aria-label="Capability category filter">
              {COMPARISON_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`compare-seg-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="compare-segmented-group" role="group" aria-label="Currency display mode">
              {CURRENCY_DISPLAY_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  aria-pressed={currencyMode === mode.id}
                  className={`compare-seg-btn ${currencyMode === mode.id ? 'active' : ''}`}
                  onClick={() => setCurrencyMode(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Capability / Criterion</th>
                  {comparison.vendors.map((vendor) => (
                    <th
                      key={vendor.id}
                      scope="col"
                      className={vendor.highlight ? 'col-highlight' : ''}
                    >
                      {vendor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td className="compare-feature-cell">{row.feature}</td>
                    {comparison.vendors.map((vendor) => {
                      const rawVal = row.values[vendor.id];
                      const displayVal =
                        rawVal && typeof rawVal === 'object'
                          ? formatComparisonPrice(rawVal, currencyMode)
                          : rawVal;
                      return (
                        <td
                          key={vendor.id}
                          className={vendor.highlight ? 'compare-value-highlight' : 'compare-value-cell'}
                        >
                          {displayVal}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="compare-section" aria-labelledby="compare-scenarios-heading">
          <h2 id="compare-scenarios-heading" className="compare-section-title">
            Honest Decision Guide: When to Choose Each Platform
          </h2>
          <p className="compare-section-sub">
            Clear architectural trade-offs to help your engineering and revenue teams pick the right fit without vendor lock-in surprises.
          </p>

          <div className="compare-three-grid">
            {comparison.decisionScenarios.map((scenario) => (
              <div key={scenario.title} className="compare-info-card">
                <h3>{scenario.title}</h3>
                <p>{scenario.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="compare-section" aria-labelledby="compare-detail-latency-heading">
          <h2 id="compare-detail-latency-heading" className="compare-section-title">
            Gyan VaniAi Measured Engineering Latency Tiers
          </h2>
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

        <section className="compare-section" aria-labelledby="compare-detail-faq-heading">
          <h2 id="compare-detail-faq-heading" className="compare-section-title">
            Frequently Asked Questions
          </h2>
          <div className="compare-faq-list">
            {comparison.faqs.map((faq) => (
              <div key={faq.question} className="compare-faq-item">
                <h3>{faq.question}</h3>
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="compare-footer-cta" aria-label="Next step">
          <div>
            <h2>Need an exact migration or architecture estimate?</h2>
            <p>
              Review Meta WhatsApp Coexistence setup, dual INR/USD SaaS plans, or fixed-timeline Transparent Engineering Partnerships with our engineers.
            </p>
          </div>
          <div className="compare-hero-actions">
            <button type="button" className="compare-btn-primary" onClick={handleOpenDemo}>
              <span>{comparison.ctaLabel}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            {otherComparison && (
              <Link to={otherComparison.path} className="compare-btn-secondary">
                <span>Read: {otherComparison.eyebrow}</span>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
