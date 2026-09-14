import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShoppingBag,
  ShoppingCart,
  MessageSquare,
  Truck,
  CreditCard,
  Database,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  Bot,
  BrainCircuit,
  Tag,
  Check,
  ChevronRight,
  RefreshCw,
  Layers,
  Zap,
  Store
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './RetailPage.css';

const SITE = 'https://www.gyanvaniai.online';

export default function RetailPage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [orderCount, setOrderCount] = useState(3500);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Commerce Simulator Steps
  const simulatorSteps = [
    {
      id: 'catalog',
      tabTitle: '1. WhatsApp Catalog Browse',
      icon: <ShoppingBag size={16} />,
      customerMsg: 'Hi! Show me your latest summer sneakers collection in Size 10.',
      aiResponse: 'Welcome to UrbanKicks! Here are 3 top-selling summer sneakers in Size 10. Tap below to view product details or buy with 1-click.',
      badge: 'Interactive Product Catalog',
      statusNote: 'Real-time inventory lookup & instant catalog card dispatch'
    },
    {
      id: 'assistant',
      tabTitle: '2. AI Shopping Assistant',
      icon: <BrainCircuit size={16} />,
      customerMsg: 'Do these Nike Air Max run true to size?',
      aiResponse: 'Yes! Nike Air Max fits true to size. Plus, enjoy 10% OFF today with code "SUMMER10". Here is your instant checkout link.',
      badge: 'AI Personalization Engine',
      statusNote: 'NLP query processing + automated discount code application'
    },
    {
      id: 'tracking',
      tabTitle: '3. Order Tracking Notification',
      icon: <Truck size={16} />,
      customerMsg: 'System Action',
      aiResponse: 'Order #UK-9182 confirmed! Your item has been shipped via Express Delivery. Click to track live location on Google Maps.',
      badge: 'Automated Shipping Update',
      statusNote: 'Shopify/WooCommerce webhook trigger + WhatsApp alert'
    },
    {
      id: 'loyalty',
      tabTitle: '4. Post-Purchase Loyalty Drip',
      icon: <RefreshCw size={16} />,
      customerMsg: 'System Action',
      aiResponse: 'Hope you loved your new sneakers! You earned 150 Loyalty Points. Use them for $15 OFF on your next order.',
      badge: 'CRM Retention & Re-Order',
      statusNote: 'Automated 7-day post-delivery feedback & re-order drip'
    }
  ];

  // ROI Calculator Math
  const recoveredCarts = Math.round(orderCount * 0.32);
  const supportHoursSaved = Math.round((orderCount * 2.5) / 60);
  const monthlyRevenueBoost = Math.round(orderCount * 9.8);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi Retail CRM integrate with Shopify and WooCommerce?',
      a: 'We connect directly via official API webhooks. Inventory, orders, customer profiles, and order tracking statuses sync bidirectionally in real time with zero manual data entry.'
    },
    {
      q: 'Can customers view interactive product catalogs and buy directly inside WhatsApp?',
      a: 'Yes. Using official WhatsApp Business API features, your customers can browse multi-item carousels, view HD photos/descriptions, and complete 1-click checkout via integrated payment gateways (Stripe, Razorpay).'
    },
    {
      q: 'How does the automated WhatsApp abandoned cart recovery feature work?',
      a: 'When a shopper leaves items in their cart, our system triggers a personalized WhatsApp message after 15 minutes with a 1-click checkout link and optional incentive discount code, recovering up to 32% of abandoned carts.'
    },
    {
      q: 'Can we send broadcast promotional campaigns to our existing customer list?',
      a: 'Yes. You can send segmented WhatsApp broadcast campaigns for new arrivals, flash sales, and restock alerts with up to 98% open rates while remaining fully compliant with Meta messaging policies.'
    },
    {
      q: 'How long does setup take for an e-commerce D2C brand or multi-store retailer?',
      a: 'Shopify and WooCommerce stores can complete initial setup and go live in 3 to 5 business days. Custom enterprise ERP systems take 2 to 3 weeks.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Retail CRM & WhatsApp Commerce Automation 2026 | Gyan VaniAi</title>
        <meta
          name="description"
          content="Modern 2026 Retail CRM with WhatsApp product catalog automation, AI shopping assistant, abandoned cart recovery, and Shopify E-Commerce integration."
        />
        <meta
          name="keywords"
          content="Retail CRM, WhatsApp Commerce, E-Commerce Automation, Abandoned Cart Recovery, Shopify WhatsApp Integration, D2C Customer Retention"
        />
        <link rel="canonical" href={`${SITE}/industries/retail`} />
        <meta property="og:title" content="Retail CRM & WhatsApp Commerce Automation | Gyan VaniAi" />
        <meta
          property="og:description"
          content="Turn WhatsApp into a high-converting storefront with interactive catalogs, abandoned cart recovery, and automated order tracking."
        />
        <meta property="og:image" content={`${SITE}/retail_hero_platform.jpg`} />
      </Helmet>

      <div className="retail-page">
        {/* Ambient Glow Aura */}
        <div className="rt-bg-glow-1"></div>

        {/* --- HIGH-IMPACT 2026 HERO SECTION --- */}
        <section className="rt-hero">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li>/</li>
                <li>Industries</li>
                <li>/</li>
                <li style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Retail</li>
              </ol>
            </nav>

            <div className="rt-hero-grid">
              {/* Left Column */}
              <div>
                <div className="rt-hero-badge">
                  <span className="rt-pulse-dot"></span>
                  <span>RETAIL CRM & WHATSAPP COMMERCE (2026)</span>
                </div>

                <h1 className="rt-hero-title">
                  Retail CRM & <span className="rt-gradient-text">WhatsApp Commerce</span>
                </h1>

                <p className="rt-hero-subtitle">
                  Turn WhatsApp into a high-converting storefront with interactive catalogs, abandoned cart recovery, automated order tracking, and 2-way CRM support.
                </p>

                <div className="rt-hero-cta-group">
                  <button
                    type="button"
                    className="rt-btn-primary"
                    onClick={() => handleOpenDemo('Retail CRM Consultation')}
                  >
                    Schedule Retail Demo <ArrowRight size={18} />
                  </button>
                  <button
                    type="button"
                    className="rt-btn-secondary"
                    onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Calculate Revenue ROI
                  </button>
                </div>

                <div className="rt-hero-stats">
                  <div className="rt-stat-card">
                    <div className="rt-stat-val">32%</div>
                    <div className="rt-stat-lbl">Cart Recovery Rate</div>
                  </div>
                  <div className="rt-stat-card">
                    <div className="rt-stat-val">4.6x</div>
                    <div className="rt-stat-lbl">Higher Conversions</div>
                  </div>
                  <div className="rt-stat-card">
                    <div className="rt-stat-val">98%</div>
                    <div className="rt-stat-lbl">Open Rate on Chat</div>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Showcase Frame with Floating Badges */}
              <div className="rt-hero-visual-wrapper">
                <div className="rt-float-badge rt-float-1">
                  <ShoppingCart size={20} color="var(--primary-color)" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>Cart Recovery Engine</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+32% Abandoned Sales Recovered</div>
                  </div>
                </div>

                <div className="rt-float-badge rt-float-2">
                  <MessageSquare size={20} color="var(--rt-emerald)" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>WhatsApp Commerce Desk</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1-Click Product Checkout</div>
                  </div>
                </div>

                <div className="rt-hero-frame">
                  <img
                    src="/retail_hero_platform.jpg"
                    alt="2026 Retail CRM and WhatsApp Commerce Platform Dashboard by Gyan VaniAi"
                    width="1000"
                    height="562"
                    className="rt-hero-img"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMMERCE & PAYMENTS TRUST MARQUEE --- */}
        <section className="rt-trust-bar">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="rt-trust-grid">
              <div className="rt-trust-item"><ShoppingBag size={18} color="var(--primary-color)" /> Shopify Direct Integration</div>
              <div className="rt-trust-item"><Store size={18} color="var(--rt-emerald)" /> WooCommerce Connector</div>
              <div className="rt-trust-item"><MessageSquare size={18} color="var(--primary-color)" /> Official WhatsApp API</div>
              <div className="rt-trust-item"><CreditCard size={18} color="var(--rt-emerald)" /> Stripe & Razorpay Payments</div>
              <div className="rt-trust-item"><ShieldCheck size={18} color="var(--primary-color)" /> 256-Bit SSL Encrypted</div>
            </div>
          </div>
        </section>

        {/* --- DEDICATED INTERACTIVE RETAIL SIMULATOR SECTION --- */}
        <section className="container" style={{ maxWidth: '1280px' }}>
          <div className="rt-sim-section">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="rt-hero-badge">INTERACTIVE SIMULATOR</span>
              <h2 className="h2" style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>
                Test the Live WhatsApp Commerce Simulator
              </h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Click tabs below to simulate how shoppers browse catalogs, receive recommendations, track orders, and join loyalty drips.
              </p>
            </div>

            <div className="rt-simulator-container">
              <div className="rt-simulator-header">
                <div className="rt-window-dots">
                  <span className="rt-dot rt-dot-red"></span>
                  <span className="rt-dot rt-dot-yellow"></span>
                  <span className="rt-dot rt-dot-green"></span>
                </div>
                <span style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> WHATSAPP COMMERCE ENGINE SIMULATOR
                </span>
              </div>

              <div className="rt-sim-tabs">
                {simulatorSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`rt-sim-tab ${activeSimTab === index ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(index)}
                  >
                    {step.icon}
                    {step.tabTitle}
                  </button>
                ))}
              </div>

              <div className="rt-sim-body">
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="rt-chip">{simulatorSteps[activeSimTab].badge}</span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {simulatorSteps[activeSimTab].statusNote}
                  </span>
                </div>

                <div className="rt-chat-preview">
                  <div className="rt-chat-msg rt-chat-customer">
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.2rem', fontWeight: '600' }}>Customer Message (WhatsApp)</div>
                    <div>{simulatorSteps[activeSimTab].customerMsg}</div>
                  </div>

                  <div className="rt-chat-msg rt-chat-ai">
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Bot size={15} /> AI Commerce Engine
                    </div>
                    <div>{simulatorSteps[activeSimTab].aiResponse}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID SOLUTIONS SHOWCASE WITH DIVERSE BACKGROUNDS --- */}
        <section className="section" style={{ padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '3.5rem' }}>
              <span className="rt-hero-badge">RETAIL CAPABILITIES</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800' }}>
                Built for High-Growth D2C & Multi-Store Brands
              </h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', marginTop: '1rem' }}>
                From interactive WhatsApp catalog sales to automated abandoned cart recovery and unified support CRM.
              </p>
            </div>

            <div className="rt-bento-grid">
              {/* Card 1 */}
              <div className="rt-bento-card rt-bento-card-1 rt-bento-col-8">
                <div className="rt-bento-icon-wrapper">
                  <MessageSquare size={24} />
                </div>
                <h3 className="rt-bento-title">WhatsApp Interactive Product Catalog</h3>
                <p className="rt-bento-desc">
                  Showcase multi-item carousels, HD product photos, stock availability, and 1-click checkout links directly inside WhatsApp. Allow buyers to complete transactions without leaving their favorite chat app.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="rt-chip">In-Chat Checkout</span>
                  <span className="rt-chip">Shopify Inventory Sync</span>
                  <span className="rt-chip">1-Click Payment</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rt-bento-card rt-bento-card-2 rt-bento-col-4">
                <div className="rt-bento-icon-wrapper">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="rt-bento-title">AI Shopping Assistant</h3>
                <p className="rt-bento-desc">
                  Provide instant product recommendations, answer sizing & material FAQs, and guide buyers to the right SKU with natural conversational AI.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rt-bento-card rt-bento-card-3 rt-bento-col-4">
                <div className="rt-bento-icon-wrapper">
                  <ShoppingCart size={24} />
                </div>
                <h3 className="rt-bento-title">Automated Abandoned Cart Recovery</h3>
                <p className="rt-bento-desc">
                  Automatically trigger targeted WhatsApp messages 15 minutes after checkout abandonment. Recover up to 32% of lost cart sales with instant discount codes.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rt-bento-card rt-bento-card-4 rt-bento-col-8">
                <div className="rt-bento-icon-wrapper">
                  <Truck size={24} />
                </div>
                <h3 className="rt-bento-title">Live Order Tracking & Post-Purchase Loyalty</h3>
                <p className="rt-bento-desc">
                  Deliver instant order confirmations, live shipping updates, and automated delivery notifications. Send automated post-purchase review requests and loyalty reward drips that drive repeat purchases.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="rt-chip">Live Shipping Tracking</span>
                  <span className="rt-chip">Review Automation</span>
                  <span className="rt-chip">Repeat Order Drips</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE ROI CALCULATOR --- */}
        <section id="roi-calculator" className="container" style={{ maxWidth: '1280px' }}>
          <div className="rt-roi-box">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="rt-hero-badge">ESTIMATE YOUR REVENUE RECOVERY</span>
                <h2 className="h2" style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>
                  Calculate Your Monthly E-Commerce Sales Boost
                </h2>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>
                  Adjust the slider to your store’s average monthly order volume to calculate estimated recovered abandoned carts and monthly revenue growth.
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <span>Monthly Store Orders</span>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem' }}>{orderCount.toLocaleString()} Orders</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={orderCount}
                    onChange={(e) => setOrderCount(Number(e.target.value))}
                    className="rt-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>500</span>
                    <span>25,000</span>
                    <span>50,000+</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div className="rt-roi-stat-box">
                  <ShoppingCart size={28} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    +{recoveredCarts.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Recovered Carts / Mo</div>
                </div>

                <div className="rt-roi-stat-box">
                  <Clock size={28} color="var(--rt-emerald)" style={{ marginInline: 'auto', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--rt-emerald)' }}>
                    {supportHoursSaved.toLocaleString()} hrs
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Support Hours Saved / Mo</div>
                </div>

                <div className="rt-roi-stat-box" style={{ gridColumn: 'span 2' }}>
                  <TrendingUp size={28} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    +${monthlyRevenueBoost.toLocaleString()} / mo
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Estimated Additional E-Commerce Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- RETAIL WORKFLOW SECTION WITH GENERATED ARCHITECTURE VISUAL --- */}
        <section className="section" style={{ padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '3rem' }}>
              <span className="rt-hero-badge">WORKFLOW ARCHITECTURE</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800' }}>
                End-to-End WhatsApp Commerce Architecture
              </h2>
              <p className="text-muted" style={{ fontSize: '1rem', marginTop: '0.75rem' }}>
                From initial customer inquiry on WhatsApp to AI product recommendation, automated checkout, order tracking, and re-order loyalty drips.
              </p>
            </div>

            <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', marginBottom: '3rem' }}>
              <img
                src="/retail_workflow_preview.jpg"
                alt="Modern Retail WhatsApp Commerce Workflow Architecture - Node 1 Inbound WhatsApp Product Inquiry, Node 2 AI Shopping Assistant, Node 3 Automated Checkout & Order Tracking, Node 4 CRM Support & Re-Order Drip"
                width="1200"
                height="675"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>

            <div className="rt-workflow-steps">
              <div className="rt-workflow-step">
                <div className="rt-step-number">NODE 01</div>
                <h3 className="h3" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Product Inquiry</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Customer browses product catalog via WhatsApp Business API, website widget, or social ad click.
                </p>
              </div>

              <div className="rt-workflow-step">
                <div className="rt-step-number">NODE 02</div>
                <h3 className="h3" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>AI Assistant</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Conversational AI evaluates customer preferences, answers FAQs, and generates 1-click checkout links.
                </p>
              </div>

              <div className="rt-workflow-step">
                <div className="rt-step-number">NODE 03</div>
                <h3 className="h3" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Order Tracking</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Automated Shopify order status webhooks send instant shipping updates and live tracking pins to WhatsApp.
                </p>
              </div>

              <div className="rt-workflow-step">
                <div className="rt-step-number">NODE 04</div>
                <h3 className="h3" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>CRM Loyalty Drip</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                  Post-delivery review requests, loyalty points logging, and automated re-order drips drive repeat sales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- RETAIL CASE STUDIES / IMPACT --- */}
        <section className="rt-case-section">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '3rem' }}>
              <span className="rt-hero-badge">E-COMMERCE BENCHMARKS & WORKFLOWS</span>
              <h2 className="h2" style={{ fontSize: '2.25rem', fontWeight: '800' }}>
                Retail & WhatsApp Commerce Performance Benchmarks
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1.25rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <ShoppingBag size={24} color="var(--primary-color)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.1rem', margin: 0 }}>D2C Fashion & Apparel Brands</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Use Case: Abandoned Cart & Checkout Recovery</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Automating WhatsApp abandoned cart messages with instant 1-click discount checkout links targets recovery of up to 32% of abandoned carts that otherwise convert to lost revenue.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-color)' }}>Up to 32%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cart Recovery Target</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--rt-emerald)' }}>3.8x</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Repeat Order Multiplier</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1.25rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Store size={24} color="var(--rt-emerald)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.1rem', margin: 0 }}>Multi-Store Electronics & Lifestyle</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Use Case: Order Tracking & Support Offloading</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Automating order shipping tracking and automated FAQs over WhatsApp offloads customer support tickets by up to 78% while maintaining instant 24/7 buyer satisfaction.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--rt-emerald)' }}>98%+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WhatsApp Open Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-color)' }}>Up to -78%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Support Ticket Deflection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="section" style={{ padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="rt-hero-badge">GOT QUESTIONS?</span>
              <h2 className="h2" style={{ fontSize: '2.25rem', fontWeight: '800' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {faqs.map((faq, index) => (
                <div key={index} className={`rt-faq-item ${openFaq === index ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="rt-faq-button"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? <Minus size={20} color="var(--primary-color)" /> : <Plus size={20} />}
                  </button>
                  {openFaq === index && (
                    <div className="rt-faq-answer">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT & DEMO CTA --- */}
        <div id="contact">
          <ContactSection
            title="Ready to Automate Your Retail E-Commerce Revenue?"
            subtitle="Book a custom demo with our retail solutions engineering team to evaluate WhatsApp catalog automation and Shopify integration."
          />
        </div>
      </div>
    </>
  );
}
