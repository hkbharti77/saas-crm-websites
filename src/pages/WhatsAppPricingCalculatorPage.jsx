import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Calculator, 
  ArrowRight, 
  Globe2, 
  Sparkles
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './WhatsAppPricingCalculatorPage.css';

// Meta Conversation Rates per region (approximate standard rates in INR & USD)
const REGION_RATES = {
  IN: {
    name: 'India (+91)',
    currency: 'INR',
    symbol: '₹',
    marketing: 0.82,
    utility: 0.12,
    authentication: 0.12,
    service: 0.35,
    freeServiceTier: 1000
  },
  US: {
    name: 'United States & Canada (+1)',
    currency: 'USD',
    symbol: '$',
    marketing: 0.025,
    utility: 0.015,
    authentication: 0.0135,
    service: 0.0088,
    freeServiceTier: 1000
  },
  AE: {
    name: 'United Arab Emirates / Middle East (+971)',
    currency: 'USD',
    symbol: '$',
    marketing: 0.038,
    utility: 0.022,
    authentication: 0.020,
    service: 0.019,
    freeServiceTier: 1000
  },
  GB: {
    name: 'United Kingdom & Europe (+44)',
    currency: 'USD',
    symbol: '$',
    marketing: 0.045,
    utility: 0.028,
    authentication: 0.024,
    service: 0.022,
    freeServiceTier: 1000
  }
};

export default function WhatsAppPricingCalculatorPage() {
  const [regionKey, setRegionKey] = useState('IN');
  const [marketingVol, setMarketingVol] = useState(5000);
  const [utilityVol, setUtilityVol] = useState(2000);
  const [authVol, setAuthVol] = useState(1000);
  const [serviceVol, setServiceVol] = useState(1500);

  const region = REGION_RATES[regionKey];

  const calculation = useMemo(() => {
    const billableService = Math.max(0, serviceVol - region.freeServiceTier);
    const marketingCost = marketingVol * region.marketing;
    const utilityCost = utilityVol * region.utility;
    const authCost = authVol * region.authentication;
    const serviceCost = billableService * region.service;
    const totalMetaCost = marketingCost + utilityCost + authCost + serviceCost;

    return {
      marketingCost,
      utilityCost,
      authCost,
      serviceCost,
      billableService,
      totalMetaCost
    };
  }, [region, marketingVol, utilityVol, authVol, serviceVol]);

  const aiSummaryItems = [
    {
      question: "What is the WhatsApp Meta Pricing Calculator?",
      answer: "An interactive cost modeling tool that computes exact Meta WhatsApp Cloud API conversation charges across Marketing, Utility, Authentication, and Service categories based on recipient country and monthly volume."
    },
    {
      question: "How does Meta bill WhatsApp Business API conversations?",
      answer: "Meta charges per 24-hour conversation window, not per individual message. A conversation begins when the first message is delivered and lasts 24 hours. The first 1,000 Service (user-initiated) conversations each month are free for every WhatsApp Business Account."
    },
    {
      question: "Does Gyan VaniAi mark up Meta conversation rates?",
      answer: "No. Gyan VaniAi charges zero markup on Meta conversation fees. You pay Meta directly through your payment method linked in Meta Business Manager."
    },
    {
      question: "What are the 4 Meta conversation categories?",
      answer: "1) Marketing (promotions, offers), 2) Utility (order updates, receipts, account alerts), 3) Authentication (one-time passcodes, verification codes), and 4) Service (user-initiated customer support queries)."
    }
  ];

  const faqs = [
    {
      q: "What is a 24-hour conversation window?",
      a: "A 24-hour conversation window starts when a business sends a template message or responds to an incoming user message. Within that 24-hour window, you can exchange unlimited messages with that customer without additional Meta charges."
    },
    {
      q: "Are incoming WhatsApp messages charged by Meta?",
      a: "Receiving an incoming message is free. Meta only charges when you reply, which opens a 24-hour Service conversation window. The first 1,000 Service conversations per month per WhatsApp Business Account (WABA) are completely free."
    },
    {
      q: "Can I use Click-to-WhatsApp ads with free 72-hour windows?",
      a: "Yes! When a customer clicks on your Meta Click-to-WhatsApp Facebook or Instagram ad, Meta grants a free 72-hour conversation window during which no conversation charges apply."
    },
    {
      q: "How does Gyan VaniAi pricing compare to per-message SaaS platforms?",
      a: "Many legacy CRM vendors charge an extra ₹0.10 to ₹0.25 per message markup on top of Meta fees. Gyan VaniAi operates on transparent flat monthly SaaS plans with 0% markup on Meta conversation costs."
    }
  ];

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'WhatsApp Meta Pricing Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Calculate official WhatsApp Meta conversation costs for Marketing, Utility, Authentication, and Service categories with 0% markup.',
    url: 'https://www.gyanvaniai.com/tools/whatsapp-pricing-calculator'
  };

  return (
    <div className="pricing-calc-page">
      <SeoHead
        title="WhatsApp Meta Pricing Calculator 2026 | Cloud API Cost Estimator | Gyan VaniAi"
        description="Calculate official WhatsApp Meta Cloud API conversation costs for India and global regions. Estimate Marketing, Utility, Auth, and Service fees with 0% markup."
        canonical="https://www.gyanvaniai.com/tools/whatsapp-pricing-calculator"
        schema={toolSchema}
        keywords="WhatsApp Pricing Calculator, WhatsApp Meta API Cost, WhatsApp Business API Pricing India, WhatsApp Conversation Rates, WABA Cost Estimator"
      />

      {/* Hero Section */}
      <section className="calc-hero">
        <div className="container">
          <div className="calc-hero-badge">
            <Calculator size={16} />
            <span>Interactive Cost Estimator</span>
          </div>
          <h1 className="calc-hero-title">
            WhatsApp Meta Pricing & Conversation Calculator
          </h1>
          <p className="calc-hero-subtitle">
            Estimate your exact monthly Meta WhatsApp Cloud API costs. Choose your target country and volume to calculate Marketing, Utility, Authentication, and Service fees with zero vendor markup.
          </p>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="Meta WhatsApp Conversation Pricing Rules & Facts" />

      {/* Interactive Calculator Section */}
      <section className="calc-app-section">
        <div className="container">
          <div className="calc-card">
            {/* Region Selector */}
            <div className="calc-header-controls">
              <label className="calc-label">
                <Globe2 size={16} />
                <span>Select Target Country / Region:</span>
              </label>
              <select
                value={regionKey}
                onChange={(e) => setRegionKey(e.target.value)}
                className="calc-select"
              >
                {Object.entries(REGION_RATES).map(([k, r]) => (
                  <option key={k} value={k}>{r.name} ({r.symbol} {r.currency})</option>
                ))}
              </select>
            </div>

            <div className="calc-body-grid">
              {/* Sliders Column */}
              <div className="calc-inputs-col">
                <h3 className="calc-col-title">Monthly 24-Hour Conversation Volumes</h3>

                {/* Marketing */}
                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <span className="calc-cat-title">Marketing Conversations</span>
                    <span className="calc-rate-badge">
                      {region.symbol}{region.marketing} / conv
                    </span>
                  </div>
                  <p className="calc-cat-desc">Promotions, newsletters, product launches, discounts</p>
                  <div className="calc-slider-row">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="500"
                      value={marketingVol}
                      onChange={(e) => setMarketingVol(Number(e.target.value))}
                      className="calc-range"
                    />
                    <input
                      type="number"
                      value={marketingVol}
                      onChange={(e) => setMarketingVol(Math.max(0, Number(e.target.value)))}
                      className="calc-num-input"
                    />
                  </div>
                </div>

                {/* Utility */}
                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <span className="calc-cat-title">Utility Conversations</span>
                    <span className="calc-rate-badge">
                      {region.symbol}{region.utility} / conv
                    </span>
                  </div>
                  <p className="calc-cat-desc">Order confirmations, shipping alerts, invoice receipts</p>
                  <div className="calc-slider-row">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="250"
                      value={utilityVol}
                      onChange={(e) => setUtilityVol(Number(e.target.value))}
                      className="calc-range"
                    />
                    <input
                      type="number"
                      value={utilityVol}
                      onChange={(e) => setUtilityVol(Math.max(0, Number(e.target.value)))}
                      className="calc-num-input"
                    />
                  </div>
                </div>

                {/* Authentication */}
                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <span className="calc-cat-title">Authentication (OTP)</span>
                    <span className="calc-rate-badge">
                      {region.symbol}{region.authentication} / conv
                    </span>
                  </div>
                  <p className="calc-cat-desc">One-time passcodes, verification codes, 2FA logins</p>
                  <div className="calc-slider-row">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="250"
                      value={authVol}
                      onChange={(e) => setAuthVol(Number(e.target.value))}
                      className="calc-range"
                    />
                    <input
                      type="number"
                      value={authVol}
                      onChange={(e) => setAuthVol(Math.max(0, Number(e.target.value)))}
                      className="calc-num-input"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <span className="calc-cat-title">Service (Inbound Support)</span>
                    <span className="calc-rate-badge">
                      {region.symbol}{region.service} / conv (First 1,000 FREE)
                    </span>
                  </div>
                  <p className="calc-cat-desc">User-initiated customer inquiries and support chats</p>
                  <div className="calc-slider-row">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="250"
                      value={serviceVol}
                      onChange={(e) => setServiceVol(Number(e.target.value))}
                      className="calc-range"
                    />
                    <input
                      type="number"
                      value={serviceVol}
                      onChange={(e) => setServiceVol(Math.max(0, Number(e.target.value)))}
                      className="calc-num-input"
                    />
                  </div>
                </div>
              </div>

              {/* Summary / Output Column */}
              <div className="calc-summary-col">
                <div className="calc-summary-card">
                  <span className="calc-summary-tag">Estimated Meta Invoice</span>
                  <div className="calc-total-amount">
                    {region.symbol}{calculation.totalMetaCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="calc-total-note">
                    Paid directly to Meta with 0% Gyan VaniAi markup
                  </span>

                  <div className="calc-breakdown-list">
                    <div className="calc-breakdown-item">
                      <span>Marketing ({marketingVol.toLocaleString()})</span>
                      <strong>{region.symbol}{calculation.marketingCost.toFixed(2)}</strong>
                    </div>
                    <div className="calc-breakdown-item">
                      <span>Utility ({utilityVol.toLocaleString()})</span>
                      <strong>{region.symbol}{calculation.utilityCost.toFixed(2)}</strong>
                    </div>
                    <div className="calc-breakdown-item">
                      <span>Authentication ({authVol.toLocaleString()})</span>
                      <strong>{region.symbol}{calculation.authCost.toFixed(2)}</strong>
                    </div>
                    <div className="calc-breakdown-item">
                      <span>Service ({serviceVol.toLocaleString()} total, 1k free)</span>
                      <strong>{region.symbol}{calculation.serviceCost.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="calc-gyanvani-box">
                    <div className="calc-gyanvani-badge">
                      <Sparkles size={14} />
                      <span>Gyan VaniAi Transparency Promise</span>
                    </div>
                    <p className="calc-gyanvani-text">
                      We never mark up conversation rates. Pair your Meta Cloud API with our flat SaaS plans:
                    </p>
                    <ul className="calc-plan-bullets">
                      <li><strong>Starter:</strong> ₹1,999 / mo</li>
                      <li><strong>Growth:</strong> ₹4,999 / mo</li>
                      <li><strong>Scale:</strong> ₹9,999 / mo</li>
                    </ul>
                    <Link to="/pricing" className="btn btn-primary btn-calc-cta">
                      <span>Explore Plans & Features</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Cluster Nav */}
      <section className="calc-cluster-section">
        <div className="container">
          <div className="calc-cluster-box">
            <h3 className="calc-cluster-title">Related Technical Documentation & Guides</h3>
            <div className="calc-cluster-links">
              <Link to="/pricing" className="calc-cluster-link">Official Pricing</Link>
              <Link to="/services/whatsapp-coexistence" className="calc-cluster-link">WhatsApp Coexistence Mode</Link>
              <Link to="/services/whatsapp-catalog-crm" className="calc-cluster-link">WhatsApp Catalog CRM</Link>
              <Link to="/services/sales-automation" className="calc-cluster-link">Sales Automation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions About WhatsApp API Pricing" />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
