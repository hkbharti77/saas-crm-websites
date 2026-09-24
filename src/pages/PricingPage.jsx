import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, RefreshCcw, Gauge } from 'lucide-react';
import SEOHead from '../components/SeoHead';
import Pricing from '../components/Pricing';
import { PRICING_CONFIG } from '../config/pricingConfig';
import { pricingProductSchema, pricingFaqSchema } from '../utils/pricingSchemas';
import './PricingPages.css';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: '7-day free trial' },
  { icon: CreditCard, label: 'No credit card required' },
  { icon: RefreshCcw, label: 'Upgrade or downgrade anytime' },
  { icon: Gauge, label: 'Transparent usage limits' },
];

export default function PricingPage() {
  const schema = [pricingProductSchema(), pricingFaqSchema(PRICING_CONFIG.faqs)];

  return (
    <div className="pricing-page-root">
      <SEOHead
        title="Gyan VaniAi Pricing | AI CRM Plans from ₹1,999/mo"
        description="Simple, affordable pricing for Gyan VaniAi: Starter ₹1,999, Growth ₹4,999, Scale ₹9,999 per month, and custom Enterprise plans. Every plan includes WhatsApp CRM, AI RAG chatbot, and a 7-day free trial."
        canonical="https://www.gyanvaniai.online/pricing"
        keywords="AI CRM pricing, WhatsApp CRM price, Gyan VaniAi plans, AI chatbot pricing, voice bot pricing, AI calling agent price, CRM subscription India"
        schema={schema}
        aeoQuestion="How much does Gyan VaniAi AI CRM platform cost?"
        aeoAnswer="Gyan VaniAi offers four SaaS pricing tiers: Starter at ₹1,999/mo (₹1,599/mo billed yearly), Growth at ₹4,999/mo (₹3,999/mo billed yearly), Scale at ₹9,999/mo (₹7,999/mo billed yearly), and custom Enterprise plans. Every plan includes a 7-day free trial with no credit card required."
      />

      {/* Hero */}
      <header className="pricing-hero">
        <div className="container pricing-hero-inner">
          <nav className="pricing-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Pricing</span>
          </nav>

          <p className="pricing-hero-eyebrow">Pricing &amp; Plans</p>
          <h1 className="pricing-hero-title">Scale your AI-powered customer operations</h1>
          <p className="pricing-hero-lead">
            Flexible plans for teams using AI, WhatsApp, CRM, automation, voice assistants
            and AI calling, with transparent usage limits and no long-term commitment.
          </p>

          <ul className="pricing-hero-trust" role="list">
            {TRUST_ITEMS.map(({ icon: TrustIcon, label }) => (
              <li key={label} className="pricing-hero-trust-item">
                <TrustIcon size={15} className="pricing-hero-trust-icon" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <Pricing />

      {/* Detailed per-plan breakdown links */}
      <div className="container pricing-page-links" data-aos="fade-up">
        <p>
          Compare plans above, or read a detailed breakdown of the{' '}
          <Link to="/pricing/starter">Starter</Link>,{' '}
          <Link to="/pricing/growth">Growth</Link>,{' '}
          <Link to="/pricing/scale">Scale</Link>, and{' '}
          <Link to="/pricing/enterprise">Enterprise</Link> plans.
        </p>
      </div>
    </div>
  );
}
