import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SeoHead';
import ContactSection from '../components/ContactSection';
import RelatedLinks from '../components/RelatedLinks';
import EnterpriseCRMHeroVisual from '../components/EnterpriseCRMHeroVisual';
import Card3DTilt from '../components/ui/Card3DTilt';
import NumberTicker from '../components/ui/NumberTicker';
import BorderBeam from '../components/ui/BorderBeam';
import Particles from '../components/ui/Particles';
import SpotlightCard from '../components/ui/SpotlightCard';
import Meteors from '../components/ui/Meteors';
import ShimmerButton from '../components/ui/ShimmerButton';

import { 
  Sparkles,
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Database, 
  BrainCircuit, 
  ShieldCheck, 
  Users, 
  Layers, 
  Bot, 
  Smartphone, 
  RefreshCw, 
  Sliders, 
  DollarSign, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  Code, 
  Workflow, 
  Lock, 
  Building2, 
  Check, 
  X, 
  HelpCircle, 
  Send, 
  Radio,
  FileSpreadsheet,
  TrendingUp,
  Cpu,
  Inbox,
  UserCheck,
  Briefcase
} from 'lucide-react';
import './CrmDevelopmentPage.css';

const SITE_URL = 'https://www.gyanvaniai.online';
const PAGE_URL = `${SITE_URL}/services/crm-development`;

export default function CrmDevelopmentPage() {
  // Calculator State
  const [teamSize, setTeamSize] = useState(25);
  const [provider, setProvider] = useState('salesforce'); // 'salesforce' | 'hubspot' | 'zoho'

  // Sandbox Tabs State
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'coexistence' | 'ai_scoring' | 'rbac'

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Pricing & ROI Calculations
  const getProviderCostPerSeat = () => {
    switch (provider) {
      case 'salesforce': return 165; // $165/user/mo Enterprise
      case 'hubspot': return 150; // $150/user/mo Sales Hub Pro/Enterprise
      case 'zoho': return 95; // $95/user/mo Ultimate
      default: return 150;
    }
  };

  const costPerSeatMo = getProviderCostPerSeat();
  const annualSeatSpend = teamSize * costPerSeatMo * 12;
  const addonFeesAnnual = Math.round(teamSize * 30 * 12); // Extra tools: WhatsApp wrappers, AI tools, data storage
  const totalLegacy3Year = (annualSeatSpend + addonFeesAnnual) * 3;

  // Custom CRM estimated 3-year TCO (1-time dev + minimal cloud infra)
  const customCrmDevEstimate = Math.min(45000 + teamSize * 350, 95000);
  const customCrmInfraAnnual = 2400 + teamSize * 120;
  const totalCustom3Year = customCrmDevEstimate + (customCrmInfraAnnual * 3);

  const netSavings3Year = Math.max(0, totalLegacy3Year - totalCustom3Year);
  const percentageSavings = totalLegacy3Year > 0 ? Math.round((netSavings3Year / totalLegacy3Year) * 100) : 0;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured Data Schemas
  const customCrmServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    "name": "Custom AI CRM Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Gyan VaniAi",
      "url": SITE_URL
    },
    "serviceType": "Custom Software Development",
    "description": "Bespoke AI-powered CRM software development with Meta Tech Provider WhatsApp Coexistence, automated lead scoring, zero per-seat fees, and custom workflow engines.",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom AI CRM Development Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meta Tech Provider WhatsApp Coexistence Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Lead Qualification & Intent Scoring Engine"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Zero Per-Seat Licensing Custom CRM Platform"
          }
        }
      ]
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Gyan VaniAi Enterprise Custom CRM Architecture",
    "operatingSystem": "Web, Cloud, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Zero recurring per-seat user licensing fees."
    },
    "featureList": [
      "Meta Tech Provider WhatsApp Coexistence Mode",
      "Sub-300ms AI Lead Scoring & Intent Detection",
      "Custom Visual Pipeline Canvas & KanBan Automation",
      "Multi-Tenant Role-Based Access Control (RBAC)",
      "Zero Per-Seat SaaS Subscription Fees"
    ]
  };

  const faqData = [
    {
      q: "Why should we build a Custom AI CRM instead of buying Salesforce or HubSpot?",
      a: "Off-the-shelf platforms charge heavy recurring per-seat fees ($95-$165+/user/mo), lock down your database schema, and charge expensive add-ons for WhatsApp or AI capabilities. A custom CRM built by Gyan VaniAi is 100% tailored to your exact sales process, includes native Meta WhatsApp Coexistence, grants complete data ownership, and eliminates per-seat SaaS licensing costs."
    },
    {
      q: "Does your custom CRM support Meta WhatsApp Coexistence?",
      a: "Yes! As an official Meta Tech Provider ecosystem builder, Gyan VaniAi integrates WhatsApp Coexistence natively. Your sales reps can keep using the official WhatsApp mobile app while every conversation automatically mirrors bidirectionally inside your custom CRM desktop inbox."
    },
    {
      q: "How long does it take to develop and deploy a custom CRM?",
      a: "A typical custom CRM project is delivered in 4 to 8 weeks depending on your database complexity, legacy data migration needs, and custom integration requirements. We deliver working milestones in agile sprints so your team can test early."
    },
    {
      q: "Can you migrate existing records from Salesforce, HubSpot, or Excel spreadsheets?",
      a: "Absolutely. We perform seamless ETL (Extract, Transform, Load) data migrations from Salesforce, HubSpot, Zoho, Pipedrive, or CSV databases into your custom CRM schema with zero data loss and automated field mapping."
    },
    {
      q: "Who owns the code and database of the custom CRM?",
      a: "You do! You own 100% of the database architecture, custom code, and deployment assets. We can host it on your cloud infrastructure (AWS, Google Cloud, Azure, DigitalOcean) or manage it under a guaranteed enterprise SLA."
    },
    {
      q: "How does AI lead qualification work inside the CRM?",
      a: "Our AI engine analyzes incoming messages, form submissions, and buyer interactions across WhatsApp, email, and web. It extracts key metadata (budget, timeline, industry, intent), assigns a qualification score (1-100), and auto-routes high-intent leads to the best-suited sales rep in real time."
    }
  ];

  return (
    <div className="crm-dev-page">
      <SEOHead
        title="Custom AI CRM Development Company | Zero Seat Fees | Gyan VaniAi"
        description="Engineered custom AI CRM software with native Meta WhatsApp Coexistence, automated lead scoring, zero per-seat licensing fees, and 100% tailored data architecture."
        canonical={PAGE_URL}
        keywords={[
          "Custom CRM Development Company",
          "Custom AI CRM Software",
          "WhatsApp Integrated CRM System",
          "Zero Seat Fee Custom CRM",
          "Meta Tech Provider WhatsApp CRM",
          "Enterprise AI Lead Management System",
          "Custom Salesforce Alternative"
        ]}
        schema={[customCrmServiceSchema, softwareAppSchema]}
      />

      {/* Background Particles Decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '800px', pointerEvents: 'none', zIndex: 0 }}>
        <Particles quantity={40} ease={80} color="#2dd4bf" refresh={false} />
      </div>

      <div className="crm-dev-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="crm-hero">
          <div className="crm-hero-grid">
            <div className="crm-hero-content">
              <div className="crm-hero-badge">
                <Sparkles size={16} />
                <span>#1 Custom AI CRM Development Engine</span>
              </div>

              <h1 className="crm-hero-h1">
                Custom AI CRM Software Built For Your Exact Revenue Pipeline
              </h1>

              <p className="crm-hero-subtitle">
                Stop forcing your sales team into bloated, rigid SaaS tools. We engineer high-velocity, custom AI CRMs with <strong>native Meta WhatsApp Coexistence</strong>, automated lead qualification, and <strong>zero per-seat recurring fees</strong>.
              </p>

              <div className="crm-hero-bullets">
                <div className="crm-hero-bullet-item">
                  <div className="crm-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Zero Per-Seat SaaS License Fees</span>
                </div>
                <div className="crm-hero-bullet-item">
                  <div className="crm-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Meta Tech Provider Coexistence</span>
                </div>
                <div className="crm-hero-bullet-item">
                  <div className="crm-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Sub-300ms AI Lead Scoring</span>
                </div>
                <div className="crm-hero-bullet-item">
                  <div className="crm-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>100% Custom Database Ownership</span>
                </div>
              </div>

              <div className="crm-hero-ctas">
                <Link to="/about#contact" className="crm-btn-primary">
                  <span>Schedule CRM Architecture Call</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#roi-calculator" className="crm-btn-secondary">
                  <DollarSign size={18} />
                  <span>Calculate Savings ROI</span>
                </a>
              </div>
            </div>

            <div className="crm-hero-visual-wrap">
              <Card3DTilt glowColor="rgba(45, 212, 191, 0.25)">
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                  <img 
                    src="/gyan_vaniai_crm_hero.webp" 
                    alt="Gyan VaniAi Custom AI CRM Software Dashboard Interface with Meta WhatsApp Coexistence, Lead Pipeline, and AI Qualification Metrics" 
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                    loading="eager"
                  />
                  <BorderBeam size={250} duration={12} delay={9} colorFrom="#2dd4bf" colorTo="#3b82f6" />
                </div>
              </Card3DTilt>
            </div>
          </div>

          {/* Hero Floating Metrics Banner */}
          <div className="crm-stats-banner">
            <div className="crm-stat-box">
              <div className="crm-stat-num">
                <NumberTicker value={100} suffix="%" />
              </div>
              <div className="crm-stat-label">Tailored Data Schema & Pipelines</div>
            </div>
            <div className="crm-stat-box">
              <div className="crm-stat-num">
                $<NumberTicker value={0} />
              </div>
              <div className="crm-stat-label">Per-Seat SaaS Subscription Fees</div>
            </div>
            <div className="crm-stat-box">
              <div className="crm-stat-num">
                <NumberTicker value={3} decimalPlaces={1} suffix="x" />
              </div>
              <div className="crm-stat-label">Faster Response Time to Leads</div>
            </div>
            <div className="crm-stat-box">
              <div className="crm-stat-num">
                <NumberTicker value={99} suffix=".9%" />
              </div>
              <div className="crm-stat-label">Meta Cloud API Sync Uptime SLA</div>
            </div>
          </div>
        </section>

        {/* ==========================================
            INTERACTIVE ROI SAVINGS CALCULATOR
            ========================================== */}
        <section id="roi-calculator" className="crm-calc-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <DollarSign size={14} /> ROI & Cost Comparison
            </div>
            <h2 className="crm-section-title">See How Much You Save With Custom CRM</h2>
            <p className="crm-section-subtitle">
              Calculate your total 3-year cost savings by replacing per-seat SaaS subscriptions with a custom-engineered CRM platform by Gyan VaniAi.
            </p>
          </div>

          <div className="crm-calc-card">
            <div className="crm-calc-grid">
              <div className="crm-calc-controls">
                <div className="crm-calc-group">
                  <label>
                    <span>Current CRM Provider</span>
                    <span className="crm-calc-val-highlight">{provider.toUpperCase()}</span>
                  </label>
                  <div className="crm-provider-selects">
                    <button 
                      className={`crm-provider-btn ${provider === 'salesforce' ? 'active' : ''}`}
                      onClick={() => setProvider('salesforce')}
                    >
                      Salesforce Ent ($165/mo)
                    </button>
                    <button 
                      className={`crm-provider-btn ${provider === 'hubspot' ? 'active' : ''}`}
                      onClick={() => setProvider('hubspot')}
                    >
                      HubSpot Pro ($150/mo)
                    </button>
                    <button 
                      className={`crm-provider-btn ${provider === 'zoho' ? 'active' : ''}`}
                      onClick={() => setProvider('zoho')}
                    >
                      Zoho Ult ($95/mo)
                    </button>
                  </div>
                </div>

                <div className="crm-calc-group">
                  <label>
                    <span>Number of Sales & Support Reps (Seats)</span>
                    <span className="crm-calc-val-highlight">{teamSize} Seats</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" 
                    max="250" 
                    step="5"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="crm-calc-slider"
                  />
                </div>

                <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.88rem', color: '#94a3b8' }}>
                  <p>💡 <strong>Did you know?</strong> Legacy SaaS tools also charge hidden add-ons for WhatsApp API connectors, additional custom properties, and AI feature seats.</p>
                </div>
              </div>

              <div className="crm-calc-results">
                <div className="crm-calc-res-row">
                  <span className="crm-calc-res-lbl">Annual Legacy Seat Spend ({teamSize} reps)</span>
                  <span className="crm-calc-res-val">${annualSeatSpend.toLocaleString()}/yr</span>
                </div>
                <div className="crm-calc-res-row">
                  <span className="crm-calc-res-lbl">Estimated 3-Year Legacy SaaS Cost</span>
                  <span className="crm-calc-res-val">${totalLegacy3Year.toLocaleString()}</span>
                </div>
                <div className="crm-calc-res-row">
                  <span className="crm-calc-res-lbl">Gyan VaniAi Custom CRM 3-Year TCO</span>
                  <span className="crm-calc-res-val custom-crm">${totalCustom3Year.toLocaleString()}</span>
                </div>

                <div className="crm-calc-total-savings">
                  <div className="crm-savings-label">ESTIMATED 3-YEAR NET SAVINGS</div>
                  <div className="crm-savings-amount">${netSavings3Year.toLocaleString()}</div>
                  <div className="crm-savings-sub">Cut your software licensing overhead by ~{percentageSavings}% over 3 years</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            INTERACTIVE CRM PIPELINE & WHATSAPP SIMULATOR
            ========================================== */}
        <section className="crm-sandbox-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <Sliders size={14} /> Live Architecture Preview
            </div>
            <h2 className="crm-section-title">Test-Drive Modern CRM Features</h2>
            <p className="crm-section-subtitle">
              Explore how custom AI pipeline management, native WhatsApp Coexistence, and AI lead scoring work together in a unified workspace.
            </p>
          </div>

          <div className="crm-sandbox-tabs">
            <button 
              className={`crm-tab-btn ${activeTab === 'kanban' ? 'active' : ''}`}
              onClick={() => setActiveTab('kanban')}
            >
              <Workflow size={18} /> Visual Deal Pipeline
            </button>
            <button 
              className={`crm-tab-btn ${activeTab === 'coexistence' ? 'active' : ''}`}
              onClick={() => setActiveTab('coexistence')}
            >
              <Smartphone size={18} /> WhatsApp Coexistence Sync
            </button>
            <button 
              className={`crm-tab-btn ${activeTab === 'ai_scoring' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai_scoring')}
            >
              <BrainCircuit size={18} /> AI Qualification Engine
            </button>
            <button 
              className={`crm-tab-btn ${activeTab === 'rbac' ? 'active' : ''}`}
              onClick={() => setActiveTab('rbac')}
            >
              <ShieldCheck size={18} /> Enterprise RBAC Security
            </button>
          </div>

          <div className="crm-sandbox-window">
            <div className="crm-window-header">
              <div className="crm-window-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="crm-window-title">
                <Building2 size={15} color="#2dd4bf" />
                <span>Gyan VaniAi Custom CRM · Live Interactive Sandbox</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#2dd4bf', background: 'rgba(45,212,191,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                Status: Connected to Meta API
              </div>
            </div>

            <div className="crm-sandbox-content">
              {activeTab === 'kanban' && (
                <div className="crm-kanban-board">
                  <div className="crm-kanban-col">
                    <div className="crm-col-header new">NEW INGESTION (4)</div>
                    <div className="crm-kanban-card">
                      <div className="crm-card-lead-name">Acme Tech Systems</div>
                      <div className="crm-card-lead-company">Via Meta Click-to-WhatsApp Ad</div>
                      <div className="crm-card-tags">
                        <span className="crm-tag-score">AI Score: 94</span>
                        <span className="crm-tag-value">$45,000</span>
                      </div>
                    </div>
                    <div className="crm-kanban-card">
                      <div className="crm-card-lead-name">Nexus Logistics</div>
                      <div className="crm-card-lead-company">Inbound Webform Query</div>
                      <div className="crm-card-tags">
                        <span className="crm-tag-score">AI Score: 88</span>
                        <span className="crm-tag-value">$28,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="crm-kanban-col">
                    <div className="crm-col-header qualified">AI QUALIFIED (3)</div>
                    <div className="crm-kanban-card">
                      <div className="crm-card-lead-name">Apex Global Retail</div>
                      <div className="crm-card-lead-company">Auto-assigned to Senior SDR</div>
                      <div className="crm-card-tags">
                        <span className="crm-tag-score">Intent: High</span>
                        <span className="crm-tag-value">$85,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="crm-kanban-col">
                    <div className="crm-col-header proposal">PROPOSAL / DEMO (2)</div>
                    <div className="crm-kanban-card">
                      <div className="crm-card-lead-name">Horizon Financial</div>
                      <div className="crm-card-lead-company">Custom Architecture Sent</div>
                      <div className="crm-card-tags">
                        <span className="crm-tag-score">Stage 3</span>
                        <span className="crm-tag-value">$120,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="crm-kanban-col">
                    <div className="crm-col-header won">CLOSED WON (5)</div>
                    <div className="crm-kanban-card">
                      <div className="crm-card-lead-name">Starlight Cloud Corp</div>
                      <div className="crm-card-lead-company">ERP Sync & Contract Signed</div>
                      <div className="crm-card-tags">
                        <span className="crm-tag-score">Won</span>
                        <span className="crm-tag-value">$210,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'coexistence' && (
                <div className="crm-sb-grid-2">
                  <div className="crm-sb-card">
                    <div className="crm-sb-card-header">
                      <Smartphone size={24} color="#0d9488" />
                      <div>
                        <h4 className="crm-sb-card-h4">Official WhatsApp Mobile App</h4>
                        <span className="crm-sb-card-sub">Owner / Mobile Rep View</span>
                      </div>
                    </div>
                    <div className="crm-sb-msg-left">
                      Customer: "Hi! Looking for custom CRM pricing for 40 sales reps."
                    </div>
                    <div className="crm-sb-msg-right">
                      Rep (Mobile): "Hello! We can build your custom CRM with 0 seat fees. Connecting you to our lead team."
                    </div>
                  </div>

                  <div className="crm-sb-card active-border">
                    <div className="crm-sb-card-header">
                      <RefreshCw size={24} color="#0284c7" />
                      <div>
                        <h4 className="crm-sb-card-h4">Gyan VaniAi Desktop CRM Inbox</h4>
                        <span className="crm-sb-card-sub highlight">Bidirectional Dual-Surface Sync</span>
                      </div>
                    </div>
                    <div className="crm-sb-event-box">
                      ⚡ <strong>Auto-Logged Event:</strong> WhatsApp chat synced in real time. Lead score assigned: 92/100. Created Deal Record #4812.
                    </div>
                    <div className="crm-sb-status-line">
                      ✔ Meta Tech Provider Cloud API socket active · 0 message delay
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai_scoring' && (
                <div className="crm-sb-grid-ai">
                  <div className="crm-sb-card">
                    <h4 className="crm-sb-card-h4 title-flex">
                      <BrainCircuit size={18} color="#0d9488" /> AI Intent Analysis Pipeline
                    </h4>
                    <div className="crm-sb-list-wrap">
                      <div className="crm-sb-list-item">
                        <span>Extracted Budget:</span>
                        <strong className="budget">$50,000 - $100,000</strong>
                      </div>
                      <div className="crm-sb-list-item">
                        <span>Implementation Urgency:</span>
                        <strong className="urgency">Immediate (Within 30 Days)</strong>
                      </div>
                      <div className="crm-sb-list-item">
                        <span>Target Integrations:</span>
                        <strong className="integrations">WhatsApp + ERP + Stripe</strong>
                      </div>
                    </div>
                  </div>

                  <div className="crm-sb-score-card">
                    <div className="crm-sb-score-lbl">QUALIFICATION CONFIDENCE</div>
                    <div className="crm-sb-score-val">96<span>/100</span></div>
                    <div className="crm-sb-score-badge">High-Intent Hot Prospect</div>
                  </div>
                </div>
              )}

              {activeTab === 'rbac' && (
                <div className="crm-sb-grid-3">
                  <div className="crm-sb-card">
                    <h4 className="crm-sb-card-h4 admin">Super Admin</h4>
                    <p className="crm-sb-card-p">Full system configuration, database schema edits, API webhook credentials, and audit logging.</p>
                  </div>
                  <div className="crm-sb-card">
                    <h4 className="crm-sb-card-h4 manager">Sales Manager</h4>
                    <p className="crm-sb-card-p">Pipeline overrides, team revenue quotas, lead redistribution, performance analytics.</p>
                  </div>
                  <div className="crm-sb-card">
                    <h4 className="crm-sb-card-h4 rep">Account Executive</h4>
                    <p className="crm-sb-card-p">Scraped lead inbox, assigned deal updates, WhatsApp chat responses, proposal triggers.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================
            6 CORE ARCHITECTURAL PILLARS
            ========================================== */}
        <section className="crm-pillars-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <Cpu size={14} /> Modular Engineering
            </div>
            <h2 className="crm-section-title">6 Pillars of Our Custom CRM Architecture</h2>
            <p className="crm-section-subtitle">
              Every custom CRM we deliver is engineered around enterprise scalability, bulletproof security, and seamless workflow automation.
            </p>
          </div>

          <div className="crm-pillars-grid">
            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(45, 212, 191, 0.2)">
              <div className="crm-pillar-icon"><Database size={24} /></div>
              <h3 className="crm-pillar-title">Custom Data Model & Schema</h3>
              <p className="crm-pillar-desc">
                We design custom database entities matching your exact business logic—no rigid generic objects or forced custom fields.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> PostgreSQL / MongoDB schema optimization</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Custom entity relations & lifecycle stages</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> 100% data sovereignty & zero lock-in</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(56, 189, 248, 0.2)">
              <div className="crm-pillar-icon"><Smartphone size={24} /></div>
              <h3 className="crm-pillar-title">Meta WhatsApp Coexistence</h3>
              <p className="crm-pillar-desc">
                Native integration with Meta Cloud API allows reps to use their mobile phone app while all messages sync to your CRM desktop.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Dual-surface mobile + desktop sync</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Bulk broadcast campaigns to 10k+ leads</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Shared team inbox with SLA routing</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div className="crm-pillar-icon"><BrainCircuit size={24} /></div>
              <h3 className="crm-pillar-title">AI Lead Scoring & Automation</h3>
              <p className="crm-pillar-desc">
                Autonomous AI agents evaluate incoming inquiries, calculate lead quality scores, and automatically trigger personalized follow-ups.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Real-time buyer intent detection</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Multi-channel automated drip nurture</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Sub-300ms auto-reply SLA capabilities</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(16, 185, 129, 0.2)">
              <div className="crm-pillar-icon"><ShieldCheck size={24} /></div>
              <h3 className="crm-pillar-title">Multi-Tenant RBAC Security</h3>
              <p className="crm-pillar-desc">
                Granular access control prevents data leaks. Limit viewing rights by region, department, manager hierarchy, or role.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Department & territory data scoping</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Immutable SOC2 audit log history</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Field-level encryption at rest</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="crm-pillar-icon"><BarChart3 size={24} /></div>
              <h3 className="crm-pillar-title">Revenue & Attribution Analytics</h3>
              <p className="crm-pillar-desc">
                Custom executive dashboards give real-time visibility into SDR response metrics, deal velocity, and channel ROI.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Channel-level revenue attribution</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> SDR conversion velocity tracking</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Custom exportable PDF & Excel reports</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="crm-pillar-card" spotlightColor="rgba(236, 72, 153, 0.2)">
              <div className="crm-pillar-icon"><RefreshCw size={24} /></div>
              <h3 className="crm-pillar-title">ERP & Webhook Integrations</h3>
              <p className="crm-pillar-desc">
                Connect seamlessly with Stripe, QuickBooks, SAP, Meta Ads, Zapier, or custom internal microservices via webhooks.
              </p>
              <ul className="crm-pillar-list">
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Bi-directional ERP & accounting sync</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> Payment gateway webhooks & automated receipts</li>
                <li className="crm-pillar-list-item"><Check size={14} color="#2dd4bf" /> REST & GraphQL API connectors</li>
              </ul>
            </SpotlightCard>
          </div>
        </section>

        {/* ==========================================
            COMPARISON TABLE: CUSTOM CRM VS LEGACY SAAS
            ========================================== */}
        <section className="crm-compare-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <Zap size={14} /> Competitive Advantage
            </div>
            <h2 className="crm-section-title">Custom AI CRM vs. Off-The-Shelf SaaS</h2>
            <p className="crm-section-subtitle">
              Compare how Gyan VaniAi custom-built CRM compares against legacy platforms like Salesforce, HubSpot, or Zoho.
            </p>
          </div>

          <div className="crm-compare-table-wrap">
            <table className="crm-compare-table">
              <thead>
                <tr>
                  <th>Feature / Capability</th>
                  <th>Legacy SaaS (Salesforce / HubSpot)</th>
                  <th>Gyan VaniAi Custom AI CRM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Pricing Architecture</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Expensive per-seat fees ($95-$165+/mo)</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> $0 Per-Seat Fees (Unlimited Users)</span></td>
                </tr>
                <tr>
                  <td><strong>Meta WhatsApp Coexistence</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Requires 3rd party plugins / separate app</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> Native Dual-Surface Sync Included</span></td>
                </tr>
                <tr>
                  <td><strong>Database Schema & Objects</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Rigid standardized objects & entity limits</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> 100% Tailored to Your Business Logic</span></td>
                </tr>
                <tr>
                  <td><strong>AI Lead Scoring & Bots</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Locked behind enterprise add-on packages</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> Built-in RAG & Autonomous AI Agents</span></td>
                </tr>
                <tr>
                  <td><strong>Code & Data Sovereignty</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Locked inside vendor cloud environment</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> You Own 100% Code & Database</span></td>
                </tr>
                <tr>
                  <td><strong>Custom Webhook & ERP Sync</strong></td>
                  <td><span className="crm-cross-badge"><X size={14} /> Complex API limits & expensive connectors</span></td>
                  <td><span className="crm-check-badge"><Check size={14} /> Unlimited API Webhooks & ERP Sync</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            DEVELOPMENT PROCESS LIFECYCLE
            ========================================== */}
        <section className="crm-process-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <Workflow size={14} /> Engineering Process
            </div>
            <h2 className="crm-section-title">How We Build Your Custom AI CRM</h2>
            <p className="crm-section-subtitle">
              A structured 6-step engineering methodology ensuring rapid deployment, zero operational downtime, and seamless data migration.
            </p>
          </div>

          <div className="crm-process-grid">
            <div className="crm-process-step">
              <div className="crm-step-num">01</div>
              <h3 className="crm-step-title">Discovery & Workflow Mapping</h3>
              <p className="crm-step-desc">
                We analyze your sales funnel, deal stages, team roles, communication channels, and pain points to outline your ideal CRM specification.
              </p>
            </div>

            <div className="crm-process-step">
              <div className="crm-step-num">02</div>
              <h3 className="crm-step-title">Custom Data Model Architecture</h3>
              <p className="crm-step-desc">
                Our architects model custom database entities, relationships, indexes, and field-level permissions for maximum performance.
              </p>
            </div>

            <div className="crm-process-step">
              <div className="crm-step-num">03</div>
              <h3 className="crm-step-title">AI Engine & Meta WhatsApp Wiring</h3>
              <p className="crm-step-desc">
                We integrate Meta Cloud API sockets for WhatsApp Coexistence, configure AI lead intent scoring, and build automated drip sequences.
              </p>
            </div>

            <div className="crm-process-step">
              <div className="crm-step-num">04</div>
              <h3 className="crm-step-title">Glassmorphic UI/UX Development</h3>
              <p className="crm-step-desc">
                We design an ultra-fast, responsive web & desktop interface with dark-mode glassmorphism, instant search, and visual Kanban boards.
              </p>
            </div>

            <div className="crm-process-step">
              <div className="crm-step-num">05</div>
              <h3 className="crm-step-title">Data ETL & Legacy Migration</h3>
              <p className="crm-step-desc">
                We extract, clean, and load your existing records from Salesforce, HubSpot, Excel, or SQL databases with zero data loss.
              </p>
            </div>

            <div className="crm-process-step">
              <div className="crm-step-num">06</div>
              <h3 className="crm-step-title">Deployment & SLA Training</h3>
              <p className="crm-step-desc">
                We deploy your CRM on your private cloud infrastructure, train your sales reps, and provide 24/7 technical support under SLA.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            FAQ ACCORDION SECTION
            ========================================== */}
        <section className="crm-faq-section">
          <div className="crm-section-header">
            <div className="crm-section-tag">
              <HelpCircle size={14} /> Common Questions
            </div>
            <h2 className="crm-section-title">Frequently Asked Questions</h2>
            <p className="crm-section-subtitle">
              Everything you need to know about developing a custom AI CRM platform with Gyan VaniAi.
            </p>
          </div>

          <div className="crm-faq-list">
            {faqData.map((faq, idx) => (
              <div key={idx} className={`crm-faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <div className="crm-faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={20} color="#2dd4bf" /> : <ChevronDown size={20} color="#94a3b8" />}
                </div>
                {openFaqIndex === idx && (
                  <div className="crm-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internal Cross-Linking Section */}
        <RelatedLinks currentSlug="crm-development" />

        {/* High-Converting Footer Contact CTA */}
        <ContactSection prefillService="CRM Development" />
      </div>
    </div>
  );
}
