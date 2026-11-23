import React, { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, CreditCard, RefreshCcw, Gauge } from 'lucide-react';
import SEOHead from '../components/SeoHead';
import Pricing from '../components/Pricing';
import EngineeringPartnerships from '../components/EngineeringPartnerships';
import { PRICING_CONFIG } from '../config/pricingConfig';
import {
  PRICING_VIEW_MODES,
  ENGINEERING_PARTNERSHIPS_HEADER,
  resolvePricingViewMode,
} from '../config/engineeringPartnershipsConfig';
import {
  engineeringPartnershipsSchema,
  pricingProductSchema,
  pricingFaqSchema,
} from '../utils/pricingSchemas';
import { MOTION_EASE } from '../lib/motion.config';
import './PricingPages.css';

const SAAS_TRUST_ITEMS = [
  { icon: ShieldCheck, label: '7-day free trial' },
  { icon: CreditCard, label: 'No credit card required' },
  { icon: RefreshCcw, label: 'Upgrade or downgrade anytime' },
  { icon: Gauge, label: 'Transparent usage limits' },
];

const VIEW_TABS = [
  {
    id: PRICING_VIEW_MODES.PARTNERSHIPS,
    label: 'Engineering Partnerships',
  },
  {
    id: PRICING_VIEW_MODES.SAAS,
    label: 'SaaS Platform Plans',
  },
];

export default function PricingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef([]);

  const activeMode = resolvePricingViewMode(searchParams.get('view'));
  const isPartnerships = activeMode === PRICING_VIEW_MODES.PARTNERSHIPS;

  const schema = [
    engineeringPartnershipsSchema(),
    pricingProductSchema(),
    pricingFaqSchema(PRICING_CONFIG.faqs),
  ];

  const handleModeChange = (nextMode) => {
    if (nextMode === activeMode) return;
    const nextParams = new URLSearchParams(searchParams);
    if (nextMode === PRICING_VIEW_MODES.PARTNERSHIPS) {
      nextParams.delete('view');
    } else {
      nextParams.set('view', nextMode);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % VIEW_TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + VIEW_TABS.length) % VIEW_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = VIEW_TABS.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      handleModeChange(VIEW_TABS[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const panelMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.12, ease: 'linear' } },
        exit: { opacity: 0, transition: { duration: 0.1, ease: 'linear' } },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.16, ease: MOTION_EASE.enter },
        },
        exit: {
          opacity: 0,
          y: -4,
          transition: { duration: 0.11, ease: MOTION_EASE.exit },
        },
      };

  return (
    <div className="pricing-page-root">
      <SEOHead
        title="AI CRM Pricing & Engineering Partnerships | Gyan VaniAi"
        description="Transparent Engineering Partnerships from ₹24,999 / $299 (5-day WhatsApp AI Helpdesk) and ₹69,999 / $850 (2-week Voice & RAG sprint), plus SaaS from ₹1,999/mo."
        canonical="https://www.gyanvaniai.com/pricing"
        keywords="AI CRM pricing, Transparent Engineering Partnerships, Meta WhatsApp AI Helpdesk setup, Voice AI RAG sprint, Gyan VaniAi plans, Enterprise Meta Tech Provider"
        schema={schema}
        aeoQuestion="How much do Gyan VaniAi Engineering Partnerships and AI CRM plans cost?"
        aeoAnswer="Gyan VaniAi offers three Transparent Engineering Partnership tiers—Tier 01 Meta WhatsApp & AI Helpdesk Setup (₹24,999 / $299 in 5 business days), Tier 02 AI CRM, Voice & Hybrid RAG Sprint (₹69,999 / $850 per 2-week sprint), and Tier 03 Full Enterprise AI & Meta Tech Suite (Custom Scope, 4 to 8 weeks)—plus SaaS plans starting at ₹1,999/mo with a 7-day free trial."
      />

      {/* Hero */}
      <header className="pricing-hero">
        <div className="container pricing-hero-inner">
          <nav className="pricing-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Pricing</span>
          </nav>

          {/* Segmented pricing model switcher */}
          <div
            className="pricing-mode-switcher"
            role="tablist"
            aria-label="Pricing model"
          >
            {VIEW_TABS.map((tab, index) => {
              const selected = activeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`pricing-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`pricing-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`pricing-mode-tab${selected ? ' pricing-mode-tab--active' : ''}`}
                  onClick={() => handleModeChange(tab.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <p className="pricing-hero-kicker">
            {isPartnerships
              ? ENGINEERING_PARTNERSHIPS_HEADER.eyebrow
              : 'Pricing & Plans'}
          </p>

          <h1 className="pricing-hero-title">
            {isPartnerships
              ? ENGINEERING_PARTNERSHIPS_HEADER.title
              : 'Scale your AI-powered customer operations'}
          </h1>

          <p className="pricing-hero-lead">
            {isPartnerships
              ? ENGINEERING_PARTNERSHIPS_HEADER.lead
              : 'Flexible plans for teams using AI, WhatsApp, CRM, automation, voice assistants and AI calling, with transparent usage limits and no long-term commitment.'}
          </p>

          {isPartnerships ? (
            <ul className="pricing-hero-highlights" role="list">
              {ENGINEERING_PARTNERSHIPS_HEADER.highlights.map((label, idx) => (
                <li key={label} className="pricing-hero-highlight-item">
                  {idx > 0 && (
                    <span className="pricing-hero-highlight-sep" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="pricing-hero-trust" role="list">
              {SAAS_TRUST_ITEMS.map(({ icon: TrustIcon, label }) => (
                <li key={label} className="pricing-hero-trust-item">
                  <TrustIcon size={15} className="pricing-hero-trust-icon" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {isPartnerships ? (
          <motion.div
            key="partnerships"
            id="pricing-panel-partnerships"
            role="tabpanel"
            aria-labelledby="pricing-tab-partnerships"
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
          >
            <EngineeringPartnerships />
          </motion.div>
        ) : (
          <motion.div
            key="saas"
            id="pricing-panel-saas"
            role="tabpanel"
            aria-labelledby="pricing-tab-saas"
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
          >
            <Pricing />

            {/* Detailed per-plan breakdown links */}
            <div className="container pricing-page-links">
              <p>
                Compare plans above, or read a detailed breakdown of the{' '}
                <Link to="/pricing/starter">Starter</Link>,{' '}
                <Link to="/pricing/growth">Growth</Link>,{' '}
                <Link to="/pricing/scale">Scale</Link>, and{' '}
                <Link to="/pricing/enterprise">Enterprise</Link> plans.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
