import React, { useEffect, useRef, useState } from 'react';
import { Check, X, ChevronDown, ShieldCheck, CreditCard, RefreshCcw, Gauge, ShieldAlert } from 'lucide-react';
import { trackPricingPlanClick, trackPricingView } from '../utils/analytics';
import { PRICING_CONFIG, formatPrice } from '../config/pricingConfig';
import './Pricing.css';

const TRUST_STRIP_ITEMS = [
  { icon: ShieldCheck, label: '7-day free trial' },
  { icon: CreditCard, label: 'No credit card' },
  { icon: RefreshCcw, label: 'Upgrade anytime' },
  { icon: Gauge, label: 'Usage-based transparency' },
];

export default function Pricing({ onSelectPlan }) {
  const sectionRef = useRef(null);
  const hasFiredView = useRef(false);
  const [billing, setBilling] = useState('monthly');
  const [currency, setCurrency] = useState(PRICING_CONFIG.currency);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFiredView.current) {
          hasFiredView.current = true;
          trackPricingView();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function getPrice(plan) {
    if (plan.isContactUs) return null;
    if (billing === 'yearly') {
      return currency === 'INR' ? plan.price.yearlyInr : plan.price.yearlyUsd;
    }
    return currency === 'INR' ? plan.price.monthlyInr : plan.price.monthlyUsd;
  }

  function getYearlySavings(plan) {
    if (plan.isContactUs) return null;
    const monthly = currency === 'INR' ? plan.price.monthlyInr : plan.price.monthlyUsd;
    const yearly = currency === 'INR' ? plan.price.yearlyInr : plan.price.yearlyUsd;
    return (monthly - yearly) * 12;
  }

  function handleCta(plan) {
    trackPricingPlanClick(plan.name);
    if (plan.isContactUs) {
      window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill: `I'm interested in the Enterprise plan.` } }));
    } else {
      onSelectPlan && onSelectPlan(plan.name);
      window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill: `I'm interested in the ${plan.name} plan.` } }));
    }
  }

  function handleAddonCta(addon) {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill: `I'm interested in the ${addon.name}.` } }));
  }

  return (
    <section className="section pricing-section" id="pricing" ref={sectionRef}>
      <div className="container">

        {/* Billing + currency controls */}
        <div className="pricing-controls" data-aos="fade-up">
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button
              className={`billing-btn ${billing === 'monthly' ? 'billing-btn--active' : ''}`}
              onClick={() => setBilling('monthly')}
              aria-pressed={billing === 'monthly'}
            >
              Monthly
            </button>
            <button
              className={`billing-btn ${billing === 'yearly' ? 'billing-btn--active' : ''}`}
              onClick={() => setBilling('yearly')}
              aria-pressed={billing === 'yearly'}
            >
              Yearly
              <span className="billing-save-pill">Save {PRICING_CONFIG.yearlyDiscountPct}%</span>
            </button>
          </div>

          <div className="currency-toggle" role="group" aria-label="Currency">
            <button
              className={`currency-btn ${currency === 'INR' ? 'currency-btn--active' : ''}`}
              onClick={() => setCurrency('INR')}
              aria-pressed={currency === 'INR'}
            >
              ₹ INR
            </button>
            <button
              className={`currency-btn ${currency === 'USD' ? 'currency-btn--active' : ''}`}
              onClick={() => setCurrency('USD')}
              aria-pressed={currency === 'USD'}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="pricing-grid-new" data-aos="fade-up" data-aos-delay="80">
          {PRICING_CONFIG.plans.map((plan) => {
            const price = getPrice(plan);
            const yearlySavings = getYearlySavings(plan);
            const PlanIcon = plan.icon;
            const isExpanded = expandedPlan === plan.plan;

            return (
              <div
                key={plan.plan}
                className={`pricing-card-new${plan.isPopular ? ' pricing-card-new--popular' : ''}${plan.isContactUs ? ' pricing-card-new--enterprise' : ''}`}
                style={{ '--plan-accent': plan.accentColor }}
              >
                {plan.isPopular && (
                  <div className="pricing-popular-badge">Most Popular</div>
                )}

                {/* Icon + name + description */}
                <div className="pcard-top">
                  <div className="pcard-icon">
                    <PlanIcon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="pcard-name">{plan.name}</h2>
                    <p className="pcard-tagline">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price + billing period */}
                <div className="pcard-price-block">
                  {price !== null ? (
                    <>
                      <span className="pcard-price">{formatPrice(price, currency)}</span>
                      <span className="pcard-period">
                        /mo{billing === 'yearly' ? ', billed yearly' : ''}
                      </span>
                    </>
                  ) : (
                    <span className="pcard-price pcard-price--custom">Custom</span>
                  )}
                  {billing === 'yearly' && price !== null && (
                    <div className="pcard-yearly-note">
                      {formatPrice(price * 12, currency)} billed yearly
                      {yearlySavings > 0 && (
                        <> · you save {formatPrice(yearlySavings, currency)}</>
                      )}
                    </div>
                  )}
                </div>

                {/* Usage summary */}
                <div className="pcard-limits">
                  {plan.limitChips.map((lim, i) => (
                    <span key={i} className="pcard-limit-chip">{lim}</span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  id={`btn-pricing-${plan.plan}`}
                  className={`pcard-cta${plan.isPopular ? ' pcard-cta--primary' : plan.isContactUs ? ' pcard-cta--enterprise' : ' pcard-cta--outline'}`}
                  onClick={() => handleCta(plan)}
                >
                  {plan.cta}
                </button>

                {/* Categorized feature list, collapsible on mobile */}
                <div className="pcard-features-section">
                  <button
                    className="pcard-features-toggle"
                    onClick={() => setExpandedPlan(isExpanded ? null : plan.plan)}
                    aria-expanded={isExpanded}
                  >
                    <span>What&rsquo;s included</span>
                    <ChevronDown
                      size={15}
                      className={`pcard-chevron${isExpanded ? ' pcard-chevron--open' : ''}`}
                    />
                  </button>
                  {plan.featureNote && (
                    <p className="pcard-feature-note">{plan.featureNote}</p>
                  )}
                  <div className={`pcard-features-list${isExpanded ? ' pcard-features-list--open' : ''}`}>
                    {plan.features.map((group) => (
                      <div className="pcard-feat-group" key={group.category}>
                        <p className="pcard-feat-cat">{group.category}</p>
                        <ul className="pcard-feat-items">
                          {group.items.map((feat, i) => {
                            const FeatIcon = feat.icon;
                            return (
                              <li
                                key={i}
                                className={`pcard-feat${feat.included ? ' pcard-feat--yes' : ' pcard-feat--no'}`}
                              >
                                {feat.icon && feat.included ? (
                                  <FeatIcon size={13} className="pcard-feat-icon pcard-feat-icon--voice" aria-hidden="true" />
                                ) : feat.included ? (
                                  <Check size={13} className="pcard-feat-icon pcard-feat-icon--yes" aria-hidden="true" />
                                ) : (
                                  <X size={13} className="pcard-feat-icon pcard-feat-icon--no" aria-hidden="true" />
                                )}
                                <span className="pcard-feat-text">
                                  {feat.label}
                                  {feat.desc && (
                                    <span className="pcard-feat-desc">{feat.desc}</span>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {plan.cardNote && (
                  <p className="pcard-note">
                    {plan.cardNote}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Usage disclaimer */}
        <p className="pricing-disclaimer" data-aos="fade-up">
          {PRICING_CONFIG.usageDisclaimer}
        </p>

        {/* Add-ons */}
        <div className="pricing-addons" data-aos="fade-up">
          <div className="pricing-addons-head">
            <h3 className="pricing-addons-title">Extend your workspace without upgrading</h3>
            <p className="pricing-addons-sub">
              Add specialized AI capabilities when you need them.
            </p>
          </div>
          <div className="pricing-addons-grid">
            {PRICING_CONFIG.addons.map((addon) => {
              const AddonIcon = addon.icon;
              const addonPrice = currency === 'INR' ? addon.priceInr : addon.priceUsd;
              return (
                <div key={addon.id} className="addon-card" style={{ '--plan-accent': addon.accentColor }}>
                  <div className="pcard-top">
                    <div className="pcard-icon">
                      <AddonIcon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="pcard-name">{addon.name}</h4>
                      <p className="pcard-tagline">{addon.blurb}</p>
                    </div>
                  </div>
                  <div className="pcard-price-block">
                    <span className="pcard-price">{formatPrice(addonPrice, currency)}</span>
                    <span className="pcard-period">/mo</span>
                  </div>
                  <ul className="addon-includes">
                    {addon.includes.map((item, i) => (
                      <li key={i} className="pcard-feat pcard-feat--yes">
                        <Check size={13} className="pcard-feat-icon pcard-feat-icon--yes" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    id={`btn-addon-${addon.id}`}
                    className="pcard-cta pcard-cta--outline"
                    onClick={() => handleAddonCta(addon)}
                  >
                    {addon.cta}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="pricing-addons-note">{PRICING_CONFIG.addonsNote}</p>
        </div>

        {/* Trust strip */}
        <div className="pricing-trust" data-aos="fade-up">
          <h3 className="pricing-trust-title">Simple pricing. Transparent usage.</h3>
          <ul className="pricing-trust-grid" role="list">
            {TRUST_STRIP_ITEMS.map(({ icon: TrustIcon, label }) => (
              <li key={label} className="pricing-trust-item">
                <TrustIcon size={17} className="pricing-trust-icon" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trial CTA */}
        <div className="pricing-cta-band" data-aos="fade-up">
          <div className="pricing-cta-inner">
            <h3 className="pricing-cta-title">See Gyan VaniAi in action</h3>
            <p className="pricing-cta-copy">
              Start your 7-day free trial or explore the platform with a live demo.
            </p>
            <div className="pricing-cta-actions">
              <button
                className="pricing-cta-btn pricing-cta-btn--primary"
                onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
              >
                Start Free Trial
              </button>
              <button
                className="pricing-cta-btn pricing-cta-btn--ghost"
                onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
              >
                Launch Live Demo
              </button>
            </div>
            <p className="pricing-cta-note">No credit card required.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="pricing-faq" data-aos="fade-up">
          <h3 className="pricing-faq-title">Frequently asked questions</h3>
          {PRICING_CONFIG.faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className={`pricing-faq-item${isOpen ? ' pricing-faq-item--open' : ''}`}>
                <button
                  className="pricing-faq-q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={15}
                    className={`pcard-chevron${isOpen ? ' pcard-chevron--open' : ''}`}
                  />
                </button>
                <div className={`pricing-faq-a${isOpen ? ' pricing-faq-a--open' : ''}`}>
                  <p className="pricing-faq-a-text">{faq.a}</p>
                </div>
              </div>
            );
          })}

          {/* Compliance */}
          <div className="pricing-compliance-block">
            <ShieldAlert size={16} className="pricing-compliance-icon" aria-hidden="true" />
            <div>
              <p className="pricing-compliance-label">Usage &amp; compliance</p>
              <p className="pricing-compliance-text">{PRICING_CONFIG.complianceNote}</p>
            </div>
          </div>

          <button
            className="pricing-faq-link"
            onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
          >
            Talk to sales about a custom setup
          </button>
        </div>
      </div>
    </section>
  );
}
