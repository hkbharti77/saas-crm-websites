import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  BrainCircuit, 
  Activity, 
  Users, 
  Send, 
  Headset, 
  Trophy, 
  Inbox, 
  UserCheck, 
  RefreshCw, 
  BarChart3, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Mail, 
  Building2, 
  Bot,
  Clock,
  Check
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './SalesAutomationPage.css';

const SITE = 'https://www.gyanvaniai.online';
const PAGE_URL = `${SITE}/services/sales-automation`;

const heroBullets = [
  { text: 'Automated Follow-ups', icon: <Mail size={16} /> },
  { text: 'Pipeline Automation', icon: <Layers size={16} /> },
  { text: 'AI Qualification', icon: <BrainCircuit size={16} /> },
  { text: 'Real-time Notifications', icon: <Zap size={16} /> }
];

const overviewCards = [
  {
    num: '01',
    category: 'OVERVIEW',
    icon: <Sparkles size={22} />,
    title: 'Turn repetitive sales processes into automated revenue workflows.',
    desc: 'Gyan VaniAi builds Sales Automation Software that eliminates manual data entry and repetitive follow-ups, empowering your sales team to focus on high-value conversations that drive revenue.',
    bullets: [
      'Eliminates administrative lead logging and spreadsheet friction',
      'Synchronizes multi-channel CRM, email, and WhatsApp communications',
      'Accelerates prospect velocity across pipeline stages'
    ]
  },
  {
    num: '02',
    category: "WHO IT'S FOR",
    icon: <Users size={22} />,
    title: 'High-Velocity Sales & Revenue Teams',
    desc: 'Teams that need faster lead response, consistent follow-up, and better pipeline visibility without adding administrative overhead or extra headcount.',
    bullets: [
      'High-velocity B2B & SMB sales organizations',
      'Multi-channel outbound and inbound SDR teams',
      'Revenue operations leaders scaling conversion rates'
    ]
  },
  {
    num: '03',
    category: 'WHAT YOU GET',
    icon: <ShieldCheck size={22} />,
    title: 'Full-Stack Revenue Automation Suite',
    desc: 'An end-to-end automation toolchain to capture, score, assign, and convert prospects seamlessly across your entire sales funnel.',
    bullets: [
      'Automated lead routing & round-robin assignment',
      'Multi-touch email & WhatsApp follow-up automation',
      'Real-time pipeline visibility & stage triggers',
      'Conversion, attribution & sales activity reporting'
    ]
  }
];

const workflowPhases = [
  {
    phase: 'PHASE 01',
    name: 'CAPTURE',
    steps: [
      {
        idx: '01',
        title: 'Lead Capture',
        desc: 'Collect leads from web forms, WhatsApp, social ads, and third-party webhooks in real time.',
        icon: <Inbox size={18} />,
        status: 'Omnichannel Ingestion'
      },
      {
        idx: '02',
        title: 'Lead Enrichment',
        desc: 'Instant lookup attaches company size, revenue, industry, and contact firmographics automatically.',
        icon: <Sparkles size={18} />,
        status: 'Firmographics Synced'
      }
    ]
  },
  {
    phase: 'PHASE 02',
    name: 'QUALIFY',
    steps: [
      {
        idx: '03',
        title: 'Intent / Qualification',
        desc: 'Natural language processing detects buyer urgency, budget indicators, and specific pain points.',
        icon: <BrainCircuit size={18} />,
        status: 'NLP Intent Score 94%'
      },
      {
        idx: '04',
        title: 'Lead Scoring',
        desc: 'Predictive machine learning algorithms assign propensity scores to prioritize highest-converting deals.',
        icon: <Activity size={18} />,
        status: 'Predictive ML Score'
      }
    ]
  },
  {
    phase: 'PHASE 03',
    name: 'ENGAGE',
    steps: [
      {
        idx: '05',
        title: 'Intelligent Assignment',
        desc: 'Instant skill, territory, and round-robin matching routes opportunities to the right rep in seconds.',
        icon: <UserCheck size={18} />,
        status: 'Auto-Assigned in <1s'
      },
      {
        idx: '06',
        title: 'Automated Follow-Up',
        desc: 'Multi-channel drip sequences trigger contextual email, SMS, and WhatsApp touchpoints automatically.',
        icon: <Send size={18} />,
        status: 'Drip Sequence Active'
      }
    ]
  },
  {
    phase: 'PHASE 04',
    name: 'CONVERT',
    steps: [
      {
        idx: '07',
        title: 'Sales Handoff',
        desc: 'Sales reps take over with full interaction transcripts, CRM briefs, and objection playbooks.',
        icon: <Headset size={18} />,
        status: 'Contextual Rep Brief'
      },
      {
        idx: '08',
        title: 'Revenue Conversion',
        desc: 'Deal closed with automated contract triggers, ERP synchronization, and client onboarding workflows.',
        icon: <Trophy size={18} />,
        status: 'Closed-Won & CRM Synced'
      }
    ]
  }
];

const outcomes = [
  {
    icon: <Zap size={22} />,
    title: 'Faster Lead Response',
    desc: 'Sub-second lead ingestion and instant automated acknowledgment eliminate response lag.'
  },
  {
    icon: <RefreshCw size={22} />,
    title: 'Consistent Follow-Up',
    desc: 'Automated multi-touch sequences ensure zero prospect drop-off between sales stages.'
  },
  {
    icon: <Users size={22} />,
    title: 'Smarter Lead Routing',
    desc: 'Rule-based and AI assignment route high-value accounts to the best-fit sales reps instantly.'
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Clearer Pipeline Visibility',
    desc: 'Unified real-time dashboards track deal stages, conversion bottlenecks, and rep activity.'
  }
];

const salesFaqs = [
  {
    q: 'What kind of sales tasks can be automated?',
    a: 'We automate lead capture across channels, firmographic enrichment, AI intent and propensity scoring, round-robin lead routing, personalized email & WhatsApp follow-ups, meeting reminder triggers, task creation upon pipeline stage transitions, and CRM contact synchronization.'
  },
  {
    q: 'Will automation make our outreach feel robotic?',
    a: 'No. Our systems use highly personalized dynamic tokens, multi-turn AI context, and customizable messaging templates grounded in your business tone. Messages adapt to prospect industry, company size, and specific inquiries so every interaction feels tailored and human.'
  },
  {
    q: 'Can this integrate with our existing CRM and lead sources?',
    a: 'Yes. We build webhook and API connectors for custom CRMs, HubSpot, Salesforce, Zoho, Google Ads, Meta Lead Ads, website forms, and WhatsApp Business API so data syncs bidirectionally in real time.'
  },
  {
    q: 'How does AI lead scoring prioritize opportunities?',
    a: 'Our scoring engine evaluates demographic fit (company size, industry, seniority) alongside real-time behavioral signals (email opens, WhatsApp replies, website visits, budget indicators). Leads are assigned a 1-100 propensity score so reps focus on high-intent deals first.'
  },
  {
    q: 'Can sales reps manually override automated sequences?',
    a: 'Absolutely. Sales reps maintain full control. A rep can pause, modify, or take over an automated sequence at any time directly from the CRM interface or mobile notification.'
  },
  {
    q: 'How does multi-channel WhatsApp and email automation work?',
    a: 'When a lead enters the funnel, the automation engine orchestrates coordinated touchpoints across channels—for example, an instant WhatsApp confirmation followed by a detailed email deck and calendar booking reminder.'
  },
  {
    q: 'How quickly can we deploy sales automation workflows?',
    a: 'Core automation pipelines (capture, routing, and follow-up templates) deploy within 2 to 3 weeks. Comprehensive enterprise architectures with custom ML scoring models and multi-system integrations typically deploy in 4 to 6 weeks.'
  },
  {
    q: 'What analytics and pipeline tracking reports are provided?',
    a: 'You get real-time dashboards tracking lead conversion velocity, stage-by-stage drop-off rates, sales rep response SLAs, channel attribution performance, and projected revenue analytics.'
  }
];

const relatedServices = [
  {
    url: '/services/lead-management',
    icon: '/service-crm-development.webp',
    name: 'Lead Management',
    desc: 'Capture, qualify, score, and track leads from all channels in a unified pipeline.'
  },
  {
    url: '/services/crm-development',
    icon: '/service-crm-development.webp',
    name: 'Custom CRM Development',
    desc: 'Tailor sales pipelines, custom data models, and role-based permissions.'
  },
  {
    url: '/services/whatsapp-coexistence',
    icon: '/service-whatsapp-coexistence.webp',
    name: 'WhatsApp Coexistence',
    desc: 'Run official WhatsApp mobile app and Cloud API simultaneously on one number.'
  },
  {
    url: '/services/ai-agent-development',
    icon: '/service-ai-agent-development.webp',
    name: 'AI Agent Development',
    desc: 'Deploy autonomous multi-agent reasoning systems for sales, support, and ops.'
  }
];

export default function SalesAutomationPage() {
  const [openFaqs, setOpenFaqs] = useState(new Set([0, 1]));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleAllFaqs = () => {
    if (openFaqs.size === salesFaqs.length) {
      setOpenFaqs(new Set());
    } else {
      setOpenFaqs(new Set(salesFaqs.map((_, i) => i)));
    }
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sales Automation Software',
    serviceType: 'Sales Automation Software',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: ['Europe', 'Asia', 'Africa', 'Worldwide'],
    description: 'Automate repetitive sales workflows, prioritize opportunities, and close deals faster with AI-driven sales automation software by Gyan VaniAi.',
    url: PAGE_URL,
    image: `${SITE}/portfolio_ai.webp`
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
      { '@type': 'ListItem', position: 3, name: 'Sales Automation', item: PAGE_URL }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: salesFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Sales Automation Software | Workflow & Pipeline | Gyan VaniAi</title>
        <meta name="description" content="Automate repetitive sales workflows, prioritize opportunities, and close deals faster with AI-driven sales automation software." />
        <meta name="keywords" content="Sales Automation Software, Revenue Workflow Automation, Lead Routing, Automated Follow-ups, AI Lead Scoring, Sales Pipeline Automation, Gyan VaniAi" />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Sales Automation Software | Workflow & Pipeline | Gyan VaniAi" />
        <meta property="og:description" content="Automate repetitive sales workflows, prioritize opportunities, and close deals faster with AI-driven sales automation software." />
        <meta property="og:image" content={`${SITE}/portfolio_ai.webp`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sales Automation Software | Workflow & Pipeline | Gyan VaniAi" />
        <meta name="twitter:description" content="Automate repetitive sales workflows, prioritize opportunities, and close deals faster with AI-driven sales automation software." />
        <meta name="twitter:image" content={`${SITE}/portfolio_ai.webp`} />
        <script type="application/ld+json">
          {JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema])}
        </script>
      </Helmet>

      <div className="sales-automation-page">
        {/* ==================================================================
            1. HERO SECTION
            ================================================================== */}
        <section className="sales-hero-section">
          <div className="sales-auto-container">
            <nav aria-label="Breadcrumb" className="sales-hero-breadcrumb">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>Services</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: 'var(--primary-color)' }}>Sales Automation Software</li>
              </ol>
            </nav>

            <div className="sales-hero-grid">
              {/* Left Column */}
              <div className="sales-hero-left">
                <div className="sales-hero-eyebrow-pill">
                  <span className="sales-hero-pulse-dot" aria-hidden="true"></span>
                  <span>Sales Automation Platform</span>
                </div>
                <h1 className="sales-hero-title">
                  Sales Automation Software
                </h1>
                <p className="sales-hero-desc">
                  Automate repetitive sales workflows, prioritize opportunities, and help your team move leads through the pipeline faster.
                </p>

                {/* 4 Feature Bullets with Icons */}
                <div className="sales-hero-bullets">
                  {heroBullets.map((bullet, idx) => (
                    <div key={idx} className="sales-hero-bullet-item">
                      <div className="sales-hero-bullet-icon">
                        {bullet.icon}
                      </div>
                      <span>{bullet.text}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="sales-hero-actions">
                  <button
                    type="button"
                    className="sales-btn-primary"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={18} />
                  </button>
                  <a
                    href="#revenue-workflow"
                    className="sales-btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('revenue-workflow')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>See how it works</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset */}
              <div className="sales-mockup-wrapper">
                <img
                  src="/hero-sales-automation.svg"
                  alt="Sales & Revenue Automation Dashboard by Gyan VaniAi"
                  width="1000"
                  height="750"
                  className="sales-hero-img"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem', boxShadow: 'var(--shadow-hover)' }}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. OVERVIEW / WHO IT'S FOR / WHAT YOU GET (3 ENTERPRISE CARDS)
            ================================================================== */}
        <section className="sales-overview-section">
          <div className="sales-auto-container">
            <div className="sales-section-header">
              <span className="sales-section-eyebrow">Platform Architecture</span>
              <h2 className="sales-section-title">
                Engineered for High-Velocity Revenue Teams
              </h2>
              <p className="sales-section-subtitle">
                Transform manual sales bottlenecks into structured, self-driving pipeline automation.
              </p>
            </div>

            <div className="sales-overview-grid">
              {overviewCards.map((card) => (
                <div key={card.num} className="sales-overview-card">
                  <div className="sales-overview-card-top">
                    <span className="sales-overview-badge">
                      <span>{card.num}</span>
                      <span>{card.category}</span>
                    </span>
                    <div className="sales-overview-icon-wrap">
                      {card.icon}
                    </div>
                  </div>

                  <h3 className="sales-overview-heading">{card.title}</h3>
                  <p className="sales-overview-desc">{card.desc}</p>

                  <ul className="sales-overview-checklist">
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="sales-overview-check-item">
                        <CheckCircle2 size={16} className="sales-overview-check-icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. SALES AUTOMATION WORKFLOW ARCHITECTURE
            ================================================================== */}
        <section className="sales-workflow-section" id="revenue-workflow">
          <div className="sales-auto-container">
            <div className="sales-section-header">
              <span className="sales-section-eyebrow">Revenue Workflow</span>
              <h2 className="sales-section-title">
                How intelligent revenue automation works
              </h2>
              <p className="sales-section-subtitle">
                From new prospect to closed opportunity, automate the repetitive work while keeping your team in control.
              </p>
            </div>

            {/* Central Orchestration Engine Banner */}
            <div className="sales-engine-orchestrator-banner">
              <div>
                <div className="sales-engine-pill">
                  <span className="sales-hero-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                  <span>Sales Orchestration Pipeline · Event Bus</span>
                </div>
                <h3 className="sales-engine-title">Central Revenue Execution Engine</h3>
                <p className="sales-engine-desc">
                  Every inbound signal triggers automated validation, scoring, assignment, and multi-channel engagement in milliseconds.
                </p>
              </div>

              <div className="sales-engine-stats-pills">
                <div className="sales-engine-stat-badge">
                  <span className="sales-engine-stat-val">&lt; 300ms</span>
                  <span className="sales-engine-stat-lbl">Event Latency</span>
                </div>
                <div className="sales-engine-stat-badge">
                  <span className="sales-engine-stat-val">Omnichannel</span>
                  <span className="sales-engine-stat-lbl">WhatsApp · Web · CRM</span>
                </div>
              </div>
            </div>

            {/* 4 Grouped Phases Workflow Grid */}
            <div className="sales-workflow-phases-grid">
              {workflowPhases.map((phaseGroup) => (
                <div key={phaseGroup.phase} className="sales-workflow-phase-group">
                  <div className="sales-workflow-phase-header">
                    <span className="sales-workflow-phase-tag">
                      <span>{phaseGroup.phase}</span> · <span>{phaseGroup.name}</span>
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                      {phaseGroup.steps.length} Steps
                    </span>
                  </div>

                  {phaseGroup.steps.map((step) => (
                    <div key={step.idx} className="sales-workflow-step-card">
                      <div className="sales-workflow-step-top">
                        <span className="sales-workflow-step-idx">{step.idx}</span>
                        <div className="sales-workflow-step-icon">
                          {step.icon}
                        </div>
                      </div>

                      <h4 className="sales-workflow-step-title">{step.title}</h4>
                      <p className="sales-workflow-step-desc">{step.desc}</p>
                      
                      <span className="sales-workflow-step-status">
                        <Check size={11} /> {step.status}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. SALES AUTOMATION OUTCOME STRIP
            ================================================================== */}
        <section className="sales-outcomes-section">
          <div className="sales-auto-container">
            <div className="sales-section-header">
              <span className="sales-section-eyebrow">Measurable Impact</span>
              <h2 className="sales-section-title">
                Built to move revenue forward
              </h2>
              <p className="sales-section-subtitle">
                Empower your revenue team with structured automation that accelerates pipeline velocity.
              </p>
            </div>

            <div className="sales-outcomes-grid">
              {outcomes.map((outcome, idx) => (
                <div key={idx} className="sales-outcome-card">
                  <div className="sales-outcome-icon-wrap">
                    {outcome.icon}
                  </div>
                  <h3 className="sales-outcome-title">{outcome.title}</h3>
                  <p className="sales-outcome-desc">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. CENTRED ENTERPRISE FAQ
            ================================================================== */}
        <section className="sales-faq-section" id="faq">
          <div className="sales-auto-container sales-faq-container">
            <div className="sales-section-header" style={{ marginBottom: '1.5rem' }}>
              <span className="sales-section-eyebrow">Common Questions</span>
              <h2 className="sales-section-title">
                Frequently Asked Questions
              </h2>
              <p className="sales-section-subtitle">
                Everything you need to know about sales automation, CRM integration, and implementation timelines.
              </p>
            </div>

            <div className="sales-faq-controls">
              <button
                type="button"
                className="sales-faq-toggle-all-btn"
                onClick={toggleAllFaqs}
              >
                {openFaqs.size === salesFaqs.length ? 'Collapse All' : 'Expand All'}
              </button>
            </div>

            <div className="sales-faq-list">
              {salesFaqs.map((faq, idx) => {
                const isOpen = openFaqs.has(idx);
                return (
                  <div key={idx} className={`sales-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="sales-faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`sales-faq-ans-${idx}`}
                    >
                      <span>{faq.q}</span>
                      <span className="sales-faq-icon-wrapper">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>

                    <div
                      id={`sales-faq-ans-${idx}`}
                      className="sales-faq-answer"
                      style={{
                        maxHeight: isOpen ? '400px' : '0',
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      <p className="sales-faq-answer-inner">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. RELATED SERVICES ("EXPLORE THE PLATFORM")
            ================================================================== */}
        <section className="sales-related-section">
          <div className="sales-auto-container">
            <div className="sales-section-header">
              <span className="sales-section-eyebrow">Explore the Platform</span>
              <h2 className="sales-section-title">
                Related Revenue Solutions
              </h2>
              <p className="sales-section-subtitle">
                Connect sales automation with complementary platform capabilities.
              </p>
            </div>

            <div className="sales-related-grid">
              {relatedServices.map((service) => (
                <Link
                  key={service.url}
                  to={service.url}
                  className="sales-related-card"
                >
                  <div className="sales-related-card-top">
                    <div className="sales-related-icon-wrap">
                      <Layers size={20} />
                    </div>
                    <ArrowRight size={18} className="sales-related-arrow" />
                  </div>
                  <h3 className="sales-related-title">{service.name}</h3>
                  <p className="sales-related-desc">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. FINAL CTA / CONTACT FORM
            ================================================================== */}
        <ContactSection
          title="Ready to transform your revenue operations?"
          subtitle="Connect with our automation specialists to design a high-velocity sales pipeline tailored to your team."
        />
      </div>
    </>
  );
}
