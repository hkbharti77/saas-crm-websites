import React from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Layers,
  Cpu,
} from 'lucide-react';
import { ScrollReveal } from './transitions/ScrollReveal';
import { trackPricingPlanClick } from '../utils/analytics';
import {
  ENGINEERING_PARTNERSHIP_TIERS,
  OPERATIONAL_INVARIANTS,
} from '../config/engineeringPartnershipsConfig';
import { formatDualCurrencyPrice } from '../utils/formatPricing';
import './EngineeringPartnerships.css';

const INVARIANT_ICONS = {
  'ip-ownership': ShieldCheck,
  'production-rigor': Terminal,
  'no-black-boxes': Layers,
  'compute-economics': Cpu,
};

export default function EngineeringPartnerships() {
  const handleTierAction = (tier) => {
    trackPricingPlanClick(tier.title);
    window.dispatchEvent(
      new CustomEvent('open-demo-modal', {
        detail: {
          prefill: tier.prefillMessage,
          inquiryType: tier.inquiryType,
        },
      })
    );
  };

  return (
    <section
      className="section ep-section"
      aria-label="Transparent Engineering Partnerships"
    >
      <div className="container">
        {/* 3-Column Engineering Tiers */}
        <div className="ep-tier-grid">
          {ENGINEERING_PARTNERSHIP_TIERS.map((tier) => {
            const formattedPrice = formatDualCurrencyPrice(
              tier.priceInr,
              tier.priceUsd,
              { fallback: tier.customPriceLabel || 'Custom Scope' }
            );
            return (
              <article
                key={tier.id}
                className={`ep-card${tier.isRecommended ? ' ep-card--recommended' : ''}${tier.isEnterprise ? ' ep-card--enterprise' : ''}`}
                style={{ '--ep-accent': tier.accentColor }}
              >
                {tier.recommendedLabel && (
                  <div className="ep-recommended-banner">
                    {tier.recommendedLabel}
                  </div>
                )}

                {/* Clean unboxed typographic metadata header */}
                <div className="ep-card-meta">
                  <span className="ep-tier-label">{tier.tierLabel}</span>
                  <span className="ep-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="ep-duration-label">{tier.durationLabel}</span>
                </div>

                <div className="ep-card-header">
                  <h2 className="ep-card-title">{tier.title}</h2>
                  <p className="ep-card-summary">{tier.summary}</p>
                </div>

                {/* Dual-currency investment block */}
                <div className="ep-price-block">
                  <div className="ep-price-row">
                    <span
                      className={`ep-price-primary${tier.isEnterprise ? ' ep-price-primary--custom' : ''}`}
                    >
                      {formattedPrice}
                    </span>
                  </div>
                <div className="ep-price-subrow">
                  <span className="ep-price-cadence">{tier.priceCadence}</span>
                  <span className="ep-meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="ep-delivery-line">{tier.deliveryLine}</span>
                </div>
              </div>

              {/* Scope & Deliverables */}
              <div className="ep-deliverables">
                <p className="ep-section-label">Scope &amp; Deliverables:</p>
                <ul className="ep-deliverables-list">
                  {tier.deliverables.map((item) => (
                    <li key={item} className="ep-deliverable-item">
                      <Check
                        size={15}
                        className="ep-check-icon"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Fit + Action anchored to bottom */}
              <div className="ep-card-footer">
                <div className="ep-ideal-fit">
                  <p className="ep-ideal-fit-label">IDEAL FIT:</p>
                  <p className="ep-ideal-fit-text">{tier.idealFit}</p>
                </div>

                <button
                  type="button"
                  id={`btn-${tier.id}`}
                  className={`ep-cta ep-cta--${tier.ctaVariant}`}
                  onClick={() => handleTierAction(tier)}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight size={15} className="ep-cta-arrow" aria-hidden="true" />
                </button>
              </div>
              </article>
            );
          })}
        </div>

        {/* Operational Invariants */}
        <ScrollReveal className="ep-invariants-wrap" enableParallax={false}>
          <div className="ep-invariants-head">
            <p className="ep-invariants-eyebrow">
              {OPERATIONAL_INVARIANTS.eyebrow}
            </p>
            <h2 className="ep-invariants-title">
              {OPERATIONAL_INVARIANTS.title}
            </h2>
          </div>

          <div className="ep-invariants-grid">
            {OPERATIONAL_INVARIANTS.items.map((item) => {
              const IconComponent = INVARIANT_ICONS[item.id] || ShieldCheck;
              return (
                <article key={item.id} className="ep-invariant-item">
                  <div className="ep-invariant-top">
                    <span className="ep-invariant-index">{item.index}</span>
                    <IconComponent
                      size={18}
                      className="ep-invariant-icon"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="ep-invariant-title">{item.title}</h3>
                  <p className="ep-invariant-desc">{item.description}</p>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
