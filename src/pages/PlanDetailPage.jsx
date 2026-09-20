import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, X, ChevronDown } from 'lucide-react';
import SEOHead from '../components/SeoHead';
import { PRICING_CONFIG, formatPrice } from '../config/pricingConfig';
import { planProductSchema, pricingFaqSchema, faqsForPlan } from '../utils/pricingSchemas';
import { trackPricingPlanClick } from '../utils/analytics';
import '../components/Pricing.css';
import './PricingPages.css';

const LIMIT_ROWS = [
  ['team_members', 'Team members'],
  ['contacts', 'Contacts'],
  ['emails', 'Emails per month'],
  ['tickets', 'Tickets per month'],
  ['wa_campaigns', 'WhatsApp campaigns per month'],
  ['ai_interactions', 'AI/RAG interactions per month'],
  ['voice_minutes', 'Voice Bot Assistant minutes per month'],
  ['calling_minutes', 'AI Calling Agent minutes per month'],
  ['virtual_numbers', 'Virtual numbers'],
];

function formatLimit(value) {
  if (value === 'unlimited') return 'Unlimited';
  if (value === 'custom') return 'Custom';
  if (value === 0) return 'Not included';
  return Number(value).toLocaleString('en-IN');
}

export default function PlanDetailPage() {
  const { planId } = useParams();
  const plan = PRICING_CONFIG.plans.find((p) => p.plan === planId);
  const [openFaq, setOpenFaq] = useState(0);

  if (!plan) return <Navigate to="/pricing" replace />;

  const PlanIcon = plan.icon;
  const faqs = faqsForPlan(plan.plan);
  const schema = [planProductSchema(plan), pricingFaqSchema(faqs)];
  const otherPlans = PRICING_CONFIG.plans.filter((p) => p.plan !== plan.plan);
  const relevantAddons = PRICING_CONFIG.addons.filter((addon) =>
    plan.plan === 'starter'
      ? true
      : plan.plan === 'enterprise'
        ? false
        : addon.id === 'voice-bot'
  );
  const flatFeatures = plan.features.flatMap((group) => group.items);

  function handleCta() {
    trackPricingPlanClick(plan.name);
    const prefill = plan.isContactUs
      ? `I'm interested in the Enterprise plan.`
      : `I'm interested in the ${plan.name} plan.`;
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  }

  return (
    <>
      <SEOHead
        title={plan.seoTitle}
        description={plan.seoDescription}
        canonical={`https://www.gyanvaniai.online/pricing/${plan.plan}`}
        keywords={`Gyan VaniAi ${plan.name} plan, ${plan.name} pricing, AI CRM ${plan.name}, WhatsApp CRM pricing India`}
        schema={schema}
      />

      <div className="plan-page container">
        <nav className="pricing-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/pricing">Pricing</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{plan.name}</span>
        </nav>

        <div className="plan-hero" style={{ '--plan-accent': plan.accentColor }}>
          <div className="plan-hero-main">
            <div className="pcard-top">
              <div className="pcard-icon">
                <PlanIcon size={20} />
              </div>
              <div>
                <h1 className="plan-h1">{plan.name} plan</h1>
                <p className="pcard-tagline">{plan.tagline}</p>
              </div>
            </div>

            <div className="pcard-price-block">
              {plan.price ? (
                <>
                  <span className="pcard-price">
                    {formatPrice(plan.price.monthlyInr, 'INR')}
                  </span>
                  <span className="pcard-period">/mo, monthly billing</span>
                  <div className="pcard-yearly-note">
                    {formatPrice(plan.price.yearlyInr, 'INR')}/mo with annual billing
                    (save {PRICING_CONFIG.yearlyDiscountPct}%, {formatPrice(plan.price.yearlyInr * 12, 'INR')}/yr).
                    USD pricing: {formatPrice(plan.price.monthlyUsd, 'USD')} monthly,
                    {' '}{formatPrice(plan.price.yearlyUsd, 'USD')} annual.
                  </div>
                </>
              ) : (
                <span className="pcard-price pcard-price--custom">Custom pricing</span>
              )}
            </div>

            <div className="pcard-limits">
              {plan.limitChips.map((chip, i) => (
                <span key={i} className="pcard-limit-chip">{chip}</span>
              ))}
            </div>

            <button
              id={`btn-pricing-${plan.plan}`}
              className={`pcard-cta plan-hero-cta${plan.isPopular ? ' pcard-cta--primary' : plan.isContactUs ? ' pcard-cta--enterprise' : ' pcard-cta--outline'}`}
              onClick={handleCta}
            >
              {plan.cta}
            </button>
          </div>

          <div className="plan-hero-side">
            <h2 className="plan-side-title">What's included</h2>
            <ul className="plan-feature-list">
              {flatFeatures.map((feat, i) => (
                <li key={i} className={`pcard-feat${feat.included ? ' pcard-feat--yes' : ' pcard-feat--no'}`}>
                  {feat.included
                    ? <Check size={13} className="pcard-feat-icon pcard-feat-icon--yes" />
                    : <X size={13} className="pcard-feat-icon pcard-feat-icon--no" />
                  }
                  <span>{feat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="plan-detail-grid">
          <section className="plan-limits" aria-labelledby="limits-heading">
            <h2 id="limits-heading" className="plan-section-title">Usage limits</h2>
            <table className="plan-limits-table">
              <caption className="sr-only">
                {plan.name} plan monthly usage limits
              </caption>
              <tbody>
                {LIMIT_ROWS.map(([key, label]) => (
                  <tr key={key}>
                    <th scope="row">{label}</th>
                    <td>{formatLimit(plan.limits[key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {plan.limits.wa_campaigns === 'unlimited' && (
              <p className="plan-limits-note">
                Unlimited WhatsApp campaigns means unlimited campaign creation.
                Meta/provider messaging charges are billed separately.
              </p>
            )}
            <p className="plan-limits-note">{PRICING_CONFIG.usageDisclaimer}</p>
          </section>

          {relevantAddons.length > 0 && (
            <section className="plan-addons" aria-labelledby="addons-heading">
              <h2 id="addons-heading" className="plan-section-title">Compatible add-ons</h2>
              {relevantAddons.map((addon) => {
                const AddonIcon = addon.icon;
                return (
                  <div key={addon.id} className="plan-addon-row">
                    <div className="pcard-icon">
                      <AddonIcon size={16} />
                    </div>
                    <div className="plan-addon-info">
                      <span className="plan-addon-name">{addon.name}</span>
                      <span className="plan-addon-price">
                        {formatPrice(addon.priceInr, 'INR')}/mo
                      </span>
                    </div>
                    <button
                      className="pcard-cta pcard-cta--outline plan-addon-btn"
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent('open-demo-modal', {
                          detail: { prefill: `I'm interested in the ${addon.name} with the ${plan.name} plan.` },
                        }))
                      }
                    >
                      {addon.cta}
                    </button>
                  </div>
                );
              })}
              <p className="plan-limits-note">{PRICING_CONFIG.addonsNote}</p>
            </section>
          )}
        </div>

        <section className="plan-faq" aria-labelledby="plan-faq-heading">
          <h2 id="plan-faq-heading" className="plan-section-title">
            {plan.name} plan questions
          </h2>
          {faqs.map((faq, i) => {
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
          <p className="pricing-compliance-note">{PRICING_CONFIG.complianceNote}</p>
        </section>

        <nav className="plan-switcher" aria-label="Compare plans">
          <span className="plan-switcher-label">Compare plans:</span>
          {otherPlans.map((p) => (
            <Link key={p.plan} to={`/pricing/${p.plan}`} className="plan-switcher-link">
              {p.name}
            </Link>
          ))}
          <Link to="/pricing" className="plan-switcher-link plan-switcher-link--all">
            View all plans
          </Link>
        </nav>
      </div>
    </>
  );
}
