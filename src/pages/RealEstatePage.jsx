import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  Building,
  Home,
  MessageSquare,
  Calendar,
  Users,
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
  MapPin,
  Check,
  ChevronRight,
  Key,
  Layers,
  Zap,
  Tag
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './RealEstatePage.css';

const SITE = 'https://www.gyanvaniai.online';

export default function RealEstatePage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [leadCount, setLeadCount] = useState(1200);
  const [openFaq, setOpenFaq] = useState(0);

  // Live PropTech Simulator Steps
  const simulatorSteps = [
    {
      id: 'whatsapp',
      tabTitle: '1. WhatsApp Query',
      icon: <MessageSquare size={16} />,
      buyerMsg: 'Hi! Looking for a 3BHK apartment in Downtown under $1.5M with sea view.',
      aiResponse: 'Hello! I found 3 matching properties in Downtown. Here is the brochure & video walkthrough for "Azure Horizon - Tower B".',
      badge: 'WhatsApp Lead Capture',
      statusNote: 'Real-time NLP parsing of budget, location & unit preference'
    },
    {
      id: 'matching',
      tabTitle: '2. AI Property Matcher',
      icon: <BrainCircuit size={16} />,
      buyerMsg: 'Unit 42B looks perfect! Can I schedule a site visit this Saturday?',
      aiResponse: 'Azure 42B is available for viewing! Available slots: Sat 11:00 AM or 3:30 PM. Shall I reserve 11:00 AM?',
      badge: 'Inventory Auto-Match',
      statusNote: 'Live property inventory lookup & slot lock'
    },
    {
      id: 'booking',
      tabTitle: '3. Site Visit Booking',
      icon: <Calendar size={16} />,
      buyerMsg: 'Sat 11:00 AM works great!',
      aiResponse: 'Site visit confirmed for Sat 11:00 AM! Google Maps pin & property manager details sent. A reminder will be sent 2h prior.',
      badge: 'Automated Visit Lock',
      statusNote: 'Calendar sync + SMS/WhatsApp directions dispatch'
    },
    {
      id: 'crm',
      tabTitle: '4. Agent CRM Deal Sync',
      icon: <Database size={16} />,
      buyerMsg: 'System Action',
      aiResponse: 'Lead #RE-8821 assigned to Senior Agent Mark Taylor via Round-Robin. Opportunity stage moved to "Viewing Scheduled".',
      badge: 'Round-Robin Lead Sync',
      statusNote: 'Instant lead assignment & commission deal tracking'
    }
  ];

  // ROI Calculator Math
  const extraSiteVisits = Math.round(leadCount * 0.28); // 28% increase in site-visit conversions
  const responseSpeedMultiplier = '88%'; // 88% leads responded in < 2 mins
  const monthlyCommissionBoost = Math.round(leadCount * 14.5); // ~$14.50 value per lead handled

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi Real Estate CRM capture buyer leads from portals and Facebook?',
      a: 'We connect directly with Facebook Lead Ads, Zillow, Realtor.com, MagicBricks, 99acres, and your website forms via webhooks. Leads immediately trigger an automated WhatsApp conversation within 5 seconds.'
    },
    {
      q: 'Can buyers view property brochures and floor plans directly on WhatsApp?',
      a: 'Yes. Our platform sends interactive WhatsApp catalog messages, multi-property carousels, HD floor plan images, and password-protected PDF brochures automatically based on buyer criteria.'
    },
    {
      q: 'How does automated lead assignment to real estate agents work?',
      a: 'You can configure custom routing rules: round-robin distribution, property location-based matching, or agent availability. Agents get instant WhatsApp notifications with full buyer preference summaries.'
    },
    {
      q: 'Does the system send automated site-visit reminders to reduce missed viewings?',
      a: 'Yes. Automated 24-hour and 2-hour WhatsApp reminders are sent with 1-click directions and 1-click rescheduling, increasing site visit attendance by over 60%.'
    },
    {
      q: 'How fast can a real estate agency or developer go live?',
      a: 'Independent brokerages can launch in 5 to 7 business days. Large real estate developers with multi-project portfolios typically go live within 2 to 3 weeks.'
    }
  ];

  return (
    <>
      <SeoHead
        title="Real Estate CRM & WhatsApp Lead Automation 2026 | Gyan VaniAi"
        description="Modern 2026 Real Estate CRM with WhatsApp property lead capture, AI inventory matching, automated site visit booking, and agent deal tracking."
        canonical={`${SITE}/industries/real-estate`}
        image={`${SITE}/real_estate_hero_platform.jpg`}
        keywords="Real Estate CRM, WhatsApp Property Automation, PropTech Software, Site Visit Scheduling, Property Lead Management, Real Estate Lead Routing"
      />

      <div className="real-estate-page">
        {/* Ambient Glow Aura */}
        <div className="re-bg-glow-1"></div>

        {/* --- STREAMLINED ELEGANT HERO SECTION --- */}
        <section className="re-hero">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li>/</li>
                <li>Industries</li>
                <li>/</li>
                <li style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Real Estate</li>
              </ol>
            </nav>

            <div className="re-hero-grid">
              {/* Left Column: Focused Copy & Action CTAs */}
              <div>
                <div className="re-hero-badge">
                  <span className="re-pulse-dot"></span>
                  <span>REAL ESTATE CRM & PROPTECH AUTOMATION</span>
                </div>

                <h1 className="re-hero-title">
                  Real Estate CRM & <span className="re-gradient-text">WhatsApp Lead Automation</span>
                </h1>

                <p className="re-hero-subtitle">
                  Capture buyer inquiries on WhatsApp, match property listings automatically, assign leads to agents, and drive 3.4x more site visits.
                </p>

                <div className="re-hero-cta-group">
                  <button
                    type="button"
                    className="re-btn-primary"
                    onClick={() => handleOpenDemo('Real Estate CRM Consultation')}
                  >
                    Schedule Real Estate Demo <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    className="re-btn-link"
                    onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Calculate Commission ROI <ChevronRight size={16} />
                  </button>
                </div>

                <div className="re-hero-trust-micro">
                  <div className="re-trust-check">
                    <Check size={16} color="var(--primary-color)" /> Meta Tech Provider
                  </div>
                  <div>•</div>
                  <div className="re-trust-check">
                    <Check size={16} color="var(--primary-color)" /> 3.4x Site Visit Booking
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Uncluttered Visual Showcase Frame */}
              <div className="re-hero-visual-wrapper">
                <div className="re-hero-frame">
                  <img
                    src="/real_estate_hero_platform.jpg"
                    alt="2026 Real Estate CRM and Property Automation Platform Dashboard by Gyan VaniAi"
                    width="1000"
                    height="562"
                    className="re-hero-img"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PORTAL & LEAD ADS TRUST MARQUEE --- */}
        <section className="re-trust-bar">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="re-trust-grid">
              <div className="re-trust-item"><MessageSquare size={18} color="var(--primary-color)" /> WhatsApp Business API</div>
              <div className="re-trust-item"><Layers size={18} color="var(--re-amber)" /> Meta Lead Ads Sync</div>
              <div className="re-trust-item"><Building size={18} color="var(--primary-color)" /> Zillow & Realtor MLS</div>
              <div className="re-trust-item"><Database size={18} color="var(--re-amber)" /> Salesforce & Custom CRM</div>
              <div className="re-trust-item"><ShieldCheck size={18} color="var(--primary-color)" /> 256-Bit SSL Encryption</div>
            </div>
          </div>
        </section>

        {/* --- DEDICATED INTERACTIVE PROPTECH SIMULATOR SECTION --- */}
        <section className="container" style={{ maxWidth: '1280px' }}>
          <div className="re-sim-section">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="re-hero-badge">INTERACTIVE SIMULATOR</span>
              <h2 className="h2" style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
                Test the Live Buyer & Property Match Simulator
              </h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Click tabs below to simulate how buyer inquiries are matched, scheduled for site visits, and assigned to agents.
              </p>
            </div>

            <div className="re-simulator-container">
              <div className="re-simulator-header">
                <div className="re-window-dots">
                  <span className="re-dot re-dot-red"></span>
                  <span className="re-dot re-dot-yellow"></span>
                  <span className="re-dot re-dot-green"></span>
                </div>
                <span style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> PROPTECH LEAD AUTOMATION SIMULATOR
                </span>
              </div>

              <div className="re-sim-tabs">
                {simulatorSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`re-sim-tab ${activeSimTab === index ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(index)}
                  >
                    {step.icon}
                    {step.tabTitle}
                  </button>
                ))}
              </div>

              <div className="re-sim-body">
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="re-chip">{simulatorSteps[activeSimTab].badge}</span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {simulatorSteps[activeSimTab].statusNote}
                  </span>
                </div>

                <div className="re-chat-preview">
                  <div className="re-chat-msg re-chat-buyer">
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.2rem', fontWeight: '600' }}>Buyer Inquiry (WhatsApp)</div>
                    <div>{simulatorSteps[activeSimTab].buyerMsg}</div>
                  </div>

                  <div className="re-chat-msg re-chat-ai">
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Bot size={15} /> Real Estate AI Bot
                    </div>
                    <div>{simulatorSteps[activeSimTab].aiResponse}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID SOLUTIONS SHOWCASE WITH DIVERSE BACKGROUNDS --- */}
        <section className="section" style={{ padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '3rem' }}>
              <span className="re-hero-badge">PROPTECH CAPABILITIES</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800' }}>
                Engineered for High-Volume Realty Teams
              </h2>
              <p className="text-muted" style={{ fontSize: '1rem', marginTop: '0.75rem' }}>
                From portal lead capture to automated property brochures, site visits, and broker deal closing.
              </p>
            </div>

            <div className="re-bento-grid">
              {/* Card 1 */}
              <div className="re-bento-card re-bento-card-1 re-bento-col-8">
                <div className="re-bento-icon-wrapper">
                  <MessageSquare size={24} />
                </div>
                <h3 className="re-bento-title">WhatsApp Property Desk & Catalog</h3>
                <p className="re-bento-desc">
                  Instantly send property carousels, HD floor plans, PDF brochures, and video walkthroughs over WhatsApp. Capture buyer preferences automatically and eliminate lead drop-off.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="re-chip">Interactive Catalog</span>
                  <span className="re-chip">Brochure PDF Sync</span>
                  <span className="re-chip">5-Sec Response</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="re-bento-card re-bento-card-2 re-bento-col-4">
                <div className="re-bento-icon-wrapper">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="re-bento-title">AI Property Matcher</h3>
                <p className="re-bento-desc">
                  Filter available real estate inventory based on buyer budget, location preference, number of bedrooms, and possession timelines in real time.
                </p>
              </div>

              {/* Card 3 */}
              <div className="re-bento-card re-bento-card-3 re-bento-col-4">
                <div className="re-bento-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <h3 className="re-bento-title">Automated Site Visit Scheduling</h3>
                <p className="re-bento-desc">
                  Allow buyers to pick viewing slots on WhatsApp. Automated reminders with Google Maps pins increase site visit attendance by 64%.
                </p>
              </div>

              {/* Card 4 */}
              <div className="re-bento-card re-bento-card-4 re-bento-col-8">
                <div className="re-bento-icon-wrapper">
                  <Users size={24} />
                </div>
                <h3 className="re-bento-title">Agent Round-Robin & Pipeline Tracking</h3>
                <p className="re-bento-desc">
                  Automatically assign leads to property managers and brokers based on project specialty or workload. Track lead stages from "Inquiry" to "Offer" and "Closed Deal".
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="re-chip">Round-Robin Routing</span>
                  <span className="re-chip">Deal Pipeline</span>
                  <span className="re-chip">Commission Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE ROI CALCULATOR --- */}
        <section id="roi-calculator" className="container" style={{ maxWidth: '1280px' }}>
          <div className="re-roi-box">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="re-hero-badge">ESTIMATE YOUR COMMISSIONS</span>
                <h2 className="h2" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                  Calculate Your Monthly Conversion & Revenue Boost
                </h2>
                <p className="text-muted" style={{ marginBottom: '1.75rem' }}>
                  Adjust the slider to your brokerage’s average monthly inbound lead volume to see estimated extra site visits booked and commission revenue growth.
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <span>Monthly Inbound Property Leads</span>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>{leadCount.toLocaleString()} Leads</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={leadCount}
                    onChange={(e) => setLeadCount(Number(e.target.value))}
                    className="re-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>100</span>
                    <span>5,000</span>
                    <span>10,000+</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="re-roi-stat-box">
                  <Calendar size={24} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    +{extraSiteVisits.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Extra Site Visits Booked / Mo</div>
                </div>

                <div className="re-roi-stat-box">
                  <Clock size={24} color="var(--re-amber)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--re-amber)' }}>
                    {responseSpeedMultiplier}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Sub-2-Min Response Rate</div>
                </div>

                <div className="re-roi-stat-box" style={{ gridColumn: 'span 2' }}>
                  <TrendingUp size={24} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    +${monthlyCommissionBoost.toLocaleString()} / mo
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Estimated Extra Commission Value</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROPTECH WORKFLOW SECTION WITH GENERATED ARCHITECTURE VISUAL --- */}
        <section className="section" style={{ padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="re-hero-badge">WORKFLOW ARCHITECTURE</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.35rem)', fontWeight: '800' }}>
                End-to-End Real Estate Buyer Conversion Flow
              </h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                From portal lead capture on WhatsApp to property brochure matching, site visit booking, and agent CRM deal sync.
              </p>
            </div>

            <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', marginBottom: '2.5rem' }}>
              <img
                src="/real_estate_workflow_preview.jpg"
                alt="Modern Real Estate PropTech Workflow Architecture - Node 1 Inbound WhatsApp Inquiry, Node 2 AI Property Matcher, Node 3 Automated Site Visit Booking, Node 4 Agent CRM Deal Sync"
                width="1200"
                height="675"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>

            <div className="re-workflow-steps">
              <div className="re-workflow-step">
                <div className="re-step-number">NODE 01</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Lead Capture</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Inbound lead ingested instantly via Facebook Lead Ads, portal webhooks, or WhatsApp Business API.
                </p>
              </div>

              <div className="re-workflow-step">
                <div className="re-step-number">NODE 02</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>AI Matching</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  AI parses budget, bedrooms, and location to recommend matching listing brochures and floor plans.
                </p>
              </div>

              <div className="re-workflow-step">
                <div className="re-step-number">NODE 03</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Site Visit Booking</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Buyer selects site viewing slot on WhatsApp; automated calendar invite and GPS map directions sent.
                </p>
              </div>

              <div className="re-workflow-step">
                <div className="re-step-number">NODE 04</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Agent CRM Deal Sync</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Lead assigned to broker via round-robin; deal stage updated to "Viewing Scheduled" with full context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- REAL ESTATE CASE STUDIES / IMPACT --- */}
        <section className="re-case-section">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="re-hero-badge">BENCHMARKS & WORKFLOWS</span>
              <h2 className="h2" style={{ fontSize: '2.1rem', fontWeight: '800' }}>
                Real Estate Automation Benchmarks & Target Outcomes
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <Building size={22} color="var(--primary-color)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0 }}>Residential & Luxury Brokerages</h3>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Use Case: Instant Lead Qualification & Tour Booking</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.925rem', lineHeight: '1.55' }}>
                  Automating instant WhatsApp brochure dispatches and site-visit bookings increases property viewing attendance by enabling immediate buyer responses within seconds of ad inquiry.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>Up to +64%</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Site Visit Booking Boost</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--re-amber)' }}>&lt; 10s</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Instant Response Target</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <Home size={22} color="var(--re-amber)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0 }}>Commercial & Mixed-Use Developers</h3>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Use Case: Launch Event & CRM Distribution</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.925rem', lineHeight: '1.55' }}>
                  Streamlines multi-channel project launches with automated WhatsApp drip campaigns, brochure downloads, and intelligent round-robin broker lead assignment.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--re-amber)' }}>Zero Missed</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Lead Capture Target</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>Up to 4.2x</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Agent Productivity Gain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="section" style={{ padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '850px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="re-hero-badge">GOT QUESTIONS?</span>
              <h2 className="h2" style={{ fontSize: '2.1rem', fontWeight: '800' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {faqs.map((faq, index) => (
                <div key={index} className={`re-faq-item ${openFaq === index ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="re-faq-button"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? <Minus size={18} color="var(--primary-color)" /> : <Plus size={18} />}
                  </button>
                  {openFaq === index && (
                    <div className="re-faq-answer">
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
            title="Ready to Automate Your Real Estate Sales Pipeline?"
            subtitle="Book a custom demo with our PropTech solutions engineering team to evaluate WhatsApp lead capture and agent round-robin automation."
          />
        </div>
      </div>
    </>
  );
}
