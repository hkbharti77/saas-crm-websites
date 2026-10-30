import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  Scale,
  ShieldCheck,
  Lock,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Check,
  Plus,
  Minus,
  KeyRound,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  TrendingUp,
  FolderGit2,
  Bot
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './LegalPage.css';

const SITE = 'https://www.gyanvaniai.com';

export default function LegalPage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [caseCount, setCaseCount] = useState(40);
  const [currency, setCurrency] = useState('INR');
  const [openFaq, setOpenFaq] = useState(0);

  // Live Matter Lifecycle Steps
  const simulatorSteps = [
    {
      id: 'intake',
      tabTitle: '1. Encrypted Intake',
      icon: <FileText size={16} />,
      clientMsg: 'Prospective corporate client submits confidential intake form regarding Cross-Border M&A Advisory along with registration disclosures.',
      firmResponse: 'Matter #LG-2026-89 created. Automated NDA dispatched via E-Sign. Client encrypted file vault initialized with 256-bit AES protection.',
      badge: 'Automated Client Onboarding',
      statusNote: 'Immediate KYC extraction & encrypted document ingestion'
    },
    {
      id: 'conflict',
      tabTitle: '2. Conflict Check',
      icon: <ShieldCheck size={16} />,
      clientMsg: 'Adverse & Affiliated Parties Screening',
      firmResponse: 'Zero conflicts detected. Scanned 4,200+ historical firm matters, adverse parties, and corporate subsidiaries in 85ms. Ethical Clearance Certificate generated.',
      badge: 'Real-Time Ethical Conflict Scan',
      statusNote: 'Automated entity resolution across all active & historical firm records'
    },
    {
      id: 'retainer',
      tabTitle: '3. Retainer & E-Sign',
      icon: <KeyRound size={16} />,
      clientMsg: 'Digital Engagement Letter Acceptance',
      firmResponse: 'Engagement Agreement executed via tamper-evident digital signature. Trust account deposit receipt issued and synced to firm accounting ledger.',
      badge: 'Trust Accounting & Engagement',
      statusNote: 'E-signature audit trail locked + retainer funds credited to IOLTA ledger'
    },
    {
      id: 'matter_kanban',
      tabTitle: '4. Case Milestones & Calendar',
      icon: <Calendar size={16} />,
      clientMsg: 'Discovery & Hearing Milestone Triggered',
      firmResponse: 'Matter moved to "Active Litigation - Discovery". Automated statutory deadline alerts pushed to assigned partner, associates, and client WhatsApp.',
      badge: 'Court Calendaring & Task Engine',
      statusNote: 'Rule-based limitation date computation & multi-calendar sync'
    }
  ];

  // Realistic Legal Practice Economics:
  // - Reclaims ~2.2 administrative hours per active matter/month (intake KYC, conflict checks, court calendar sync, WhatsApp status follow-ups)
  // - Converts ~45% of reclaimed time into billable advisory hours or drafting capacity (~1.0 billable hr / matter)
  // - India (INR): Billable Advocate Rate = ₹1,500/hr | Paralegal/Admin overhead = ₹400/hr | CRM Plan = ₹4,999/mo ($59/mo)
  // - Global (USD): Boutique Attorney Billing = $175/hr | Paralegal/Admin overhead = $35/hr | CRM Plan = $59/mo
  const deflectionAdminHoursPerCase = 2.2;
  const adminHoursSaved = Math.round(caseCount * deflectionAdminHoursPerCase);
  const billableHoursCaptured = Math.round(adminHoursSaved * 0.45);

  const isINR = currency === 'INR';
  const currencySymbol = isINR ? '₹' : '$';
  const hourlyBillableRate = isINR ? 1500 : 175;
  const adminHourlyCost = isINR ? 400 : 35;
  const softwareCost = isINR ? 4999 : 59;

  const billableRevenueGain = billableHoursCaptured * hourlyBillableRate;
  const adminCostSavings = adminHoursSaved * adminHourlyCost;
  const totalMonthlyImpact = billableRevenueGain + adminCostSavings;
  const projectedAnnualImpact = totalMonthlyImpact * 12;
  // Net ROI (%) = ((total benefit - subscription cost) / subscription cost) × 100
  // Guard against division-by-zero if softwareCost is 0 or invalid
  const roiPct = softwareCost > 0
    ? Math.round(((totalMonthlyImpact - softwareCost) / softwareCost) * 100)
    : 0;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi Legal CRM safeguard attorney-client privilege and confidentiality?',
      a: 'We architect our legal platforms with bank-grade 256-bit AES encryption at rest and TLS 1.3 in transit. Our infrastructure features strict multi-tenant isolation, granular role-based permissions (attorney, paralegal, client), and immutable access audit trails to ensure compliance with Bar ethics guidelines and global data protection laws (GDPR, CCPA, DPDP Act 2023).'
    },
    {
      q: 'Does the system automatically detect potential conflicts of interest?',
      a: 'Yes. Whenever a new intake or adverse party is logged, the platform executes a comprehensive phonetic and semantic scan across active clients, past matters, corporate affiliations, and opposing counsels to instantly flag ethical conflicts before engagement letters are dispatched.'
    },
    {
      q: 'Can clients securely upload evidence and receive hearing updates on WhatsApp?',
      a: 'Yes. Through official WhatsApp Business API integration, clients can receive automated court date alerts, billing reminders, and submit case documents through secure, encrypted links without cluttering email inboxes.'
    },
    {
      q: 'Does the platform support trust accounting and retainer tracking?',
      a: 'Yes. Our platform provides compliant trust accounting modules that clearly segregate unearned retainer funds from operating firm revenue, providing one-click billable hour tracking, trust ledgers, and automated monthly statement dispatches.'
    },
    {
      q: 'Can we migrate existing case records and client documents from legacy software?',
      a: 'Yes. We provide end-to-end data migration from legacy legal software, Clio, PracticePanther, spreadsheets, and on-premise document servers, preserving all matter metadata, notes, and file hierarchies.'
    }
  ];

  const pageUrl = `${SITE}/industries/legal`;
  const pageTitle = 'Legal Practice CRM & Case Management Software | Gyan VaniAi';
  const pageDescription = 'Legal CRM for client intake, matter tracking, and privileged communication. Automate follow-ups, conflict checks, and document workflows for law firms.';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Legal Practice CRM & Case Management Software',
    serviceType: 'Legal CRM & Matter Management Software',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: ['India', 'United States', 'United Kingdom', 'Middle East', 'Worldwide'],
    description: pageDescription,
    url: pageUrl,
    image: `${SITE}/legal-crm-hero.webp`
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE}/` },
      { '@type': 'ListItem', position: 3, name: 'Legal Solutions', item: pageUrl }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a }
    }))
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        keywords="Legal CRM, Law Firm Case Management, Legal Practice Software, Matter Management, Conflict Check Software, Legal Intake Portal, Court Calendaring, Attorney-Client Privilege, Gyan VaniAi"
        canonical={pageUrl}
        image={`${SITE}/legal-crm-hero.webp`}
        schema={[serviceSchema, breadcrumbSchema, faqSchema]}
        aeoQuestion="What is Gyan VaniAi Legal Practice CRM?"
        aeoAnswer="Gyan VaniAi Legal Practice CRM is a secure matter management and client intake platform for law firms and legal teams, featuring automated conflict checks, case kanban pipelines, court deadline calendaring, and 256-bit encrypted communication."
      />

      <div className="legal-page">
        {/* Ambient Glow Aura */}
        <div className="lg-bg-glow-1" />

        {/* --- EXECUTIVE HERO SECTION --- */}
        <section className="lg-hero">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>Industries</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: 'var(--lg-emerald)', fontWeight: '600' }}>Legal Practice</li>
              </ol>
            </nav>

            <div className="lg-hero-grid">
              {/* Left Column: Focused Copy & Action CTAs */}
              <div>
                <div className="lg-hero-badge">
                  <span className="lg-pulse-dot" />
                  <span>2026 LEGAL CRM & CASE PLATFORM</span>
                </div>

                <h1 className="lg-hero-title">
                  Legal Practice CRM & <span className="lg-gradient-text">Case Management</span> Software
                </h1>

                <p className="lg-hero-subtitle">
                  Streamline client intake, automate matter tracking pipelines, and ensure strict privilege confidentiality for modern law firms, advocates, and corporate legal teams.
                </p>

                <div className="lg-hero-checklist">
                  <div className="lg-checklist-item">
                    <CheckCircle2 size={16} color="var(--lg-emerald)" />
                    <span>256-Bit AES privilege vault protection</span>
                  </div>
                  <div className="lg-checklist-item">
                    <CheckCircle2 size={16} color="var(--lg-emerald)" />
                    <span>Zero-friction WhatsApp client intake</span>
                  </div>
                  <div className="lg-checklist-item">
                    <CheckCircle2 size={16} color="var(--lg-emerald)" />
                    <span>Automated ethical conflict screening</span>
                  </div>
                  <div className="lg-checklist-item">
                    <CheckCircle2 size={16} color="var(--lg-emerald)" />
                    <span>Court statutory deadline calendar sync</span>
                  </div>
                </div>

                <div className="lg-hero-cta-group">
                  <button
                    type="button"
                    className="lg-btn-hero-primary"
                    onClick={() => handleOpenDemo('Legal Practice CRM Consultation')}
                  >
                    Schedule Practice Demo <ArrowRight size={18} />
                  </button>
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20am%20interested%20in%20Legal%20Practice%20CRM%20Software."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg-btn-hero-whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Consult on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    className="lg-btn-hero-link"
                    onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Calculate ROI <ChevronRight size={16} />
                  </button>
                </div>

                <div className="lg-hero-trust-micro">
                  <div className="lg-trust-check">
                    <Check size={16} color="var(--lg-emerald)" /> Bar Ethics Ready
                  </div>
                  <div>•</div>
                  <div className="lg-trust-check">
                    <Check size={16} color="var(--lg-emerald)" /> Zero Privilege Leaks
                  </div>
                  <div>•</div>
                  <div className="lg-trust-check">
                    <Check size={16} color="var(--lg-emerald)" /> SOC2 Compliant
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Browser Frame Mockup & Floating Badges */}
              <div className="lg-hero-stage">
                <div className="lg-hero-stage-glow" />

                {/* Floating Badge 1: Conflict Scan Status */}
                <div className="lg-float-badge lg-float-badge-1">
                  <div className="lg-float-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="lg-float-title">Conflict Screening</div>
                    <div className="lg-float-val">
                      <span className="lg-pulse-dot" style={{ width: 6, height: 6 }} /> Zero Conflicts (85ms)
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2: Privilege Vault */}
                <div className="lg-float-badge lg-float-badge-2">
                  <div className="lg-float-icon" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.12)' }}>
                    <Lock size={19} />
                  </div>
                  <div>
                    <div className="lg-float-title">Privilege File Vault</div>
                    <div className="lg-float-val">256-Bit AES Encrypted</div>
                  </div>
                </div>

                {/* macOS / Browser Mockup Window */}
                <div className="lg-mockup-window">
                  <div className="lg-mockup-header">
                    <div className="lg-window-dots">
                      <span className="lg-dot lg-dot-red" />
                      <span className="lg-dot lg-dot-yellow" />
                      <span className="lg-dot lg-dot-green" />
                    </div>
                    <div className="lg-mockup-url">
                      <Lock size={12} color="var(--lg-emerald)" />
                      <span>app.gyanvaniai.com/legal/cases/active</span>
                    </div>
                    <div className="lg-mockup-secure">
                      <Sparkles size={13} />
                      <span>Privilege Secured</span>
                    </div>
                  </div>
                  <img
                    src="/legal-crm-hero.webp"
                    alt="Gyan VaniAi Legal Practice CRM and Case Pipeline Dashboard"
                    width="1000"
                    height="562"
                    className="lg-mockup-img"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
              </div>
            </div>

            {/* --- Hero Telemetry / Metrics Banner --- */}
            <div className="lg-hero-metrics">
              <div className="lg-metric-card">
                <div className="lg-metric-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="lg-metric-val">80% Faster</div>
                  <div className="lg-metric-lbl">Confidential Client Intake</div>
                </div>
              </div>

              <div className="lg-metric-card">
                <div className="lg-metric-icon">
                  <Calendar size={22} />
                </div>
                <div>
                  <div className="lg-metric-val">0 Missed</div>
                  <div className="lg-metric-lbl">Statutory Court Deadlines</div>
                </div>
              </div>

              <div className="lg-metric-card">
                <div className="lg-metric-icon">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <div className="lg-metric-val">+25% Gain</div>
                  <div className="lg-metric-lbl">Billable Hours Captured</div>
                </div>
              </div>

              <div className="lg-metric-card">
                <div className="lg-metric-icon">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="lg-metric-val">256-Bit AES</div>
                  <div className="lg-metric-lbl">Privilege Vault Encryption</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMPLIANCE & TRUST MARQUEE BAR --- */}
        <section className="lg-trust-bar">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="lg-trust-grid">
              <div className="lg-trust-item"><Scale size={18} color="var(--lg-emerald)" /> Bar Ethics Compliant</div>
              <div className="lg-trust-item"><Lock size={18} color="var(--lg-emerald)" /> 256-Bit AES Encryption</div>
              <div className="lg-trust-item"><ShieldCheck size={18} color="var(--lg-emerald)" /> Automated Conflict Check</div>
              <div className="lg-trust-item"><FileText size={18} color="var(--lg-emerald)" /> Tamper-Evident E-Sign</div>
              <div className="lg-trust-item"><Calendar size={18} color="var(--lg-emerald)" /> Statutory Deadline Sync</div>
            </div>
          </div>
        </section>

        {/* --- DEDICATED INTERACTIVE MATTER SIMULATOR SECTION --- */}
        <section className="container" style={{ maxWidth: '1280px' }}>
          <div className="lg-sim-section">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="lg-hero-badge">INTERACTIVE MATTER LIFECYCLE</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
                Experience the Legal Case Workflow
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '680px', marginInline: 'auto' }}>
                See how a prospective client is onboarded, verified against ethical conflict rosters, and guided through active litigation stages.
              </p>
            </div>

            <div className="lg-simulator-container">
              <div className="lg-simulator-header">
                <div className="lg-window-dots">
                  <span className="lg-dot lg-dot-red" />
                  <span className="lg-dot lg-dot-yellow" />
                  <span className="lg-dot lg-dot-green" />
                </div>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--lg-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> LIVE CASE LIFECYCLE SIMULATOR
                </span>
              </div>

              <div className="lg-sim-tabs">
                {simulatorSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`lg-sim-tab ${activeSimTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(idx)}
                  >
                    {step.icon}
                    <span>{step.tabTitle}</span>
                  </button>
                ))}
              </div>

              <div className="lg-sim-body">
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="lg-chip">{simulatorSteps[activeSimTab].badge}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={16} color="var(--lg-emerald)" />
                    {simulatorSteps[activeSimTab].statusNote}
                  </span>
                </div>

                <div className="lg-chat-preview">
                  <div className="lg-chat-msg lg-chat-client">
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.25rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      Client Stage / Inbound Inquiry
                    </div>
                    <div>{simulatorSteps[activeSimTab].clientMsg}</div>
                  </div>

                  <div className="lg-chat-msg lg-chat-firm">
                    <div style={{ fontSize: '0.75rem', color: 'var(--lg-emerald)', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Bot size={15} /> Gyan VaniAi Legal CRM System
                    </div>
                    <div>{simulatorSteps[activeSimTab].firmResponse}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID CAPABILITIES SHOWCASE --- */}
        <section style={{ padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="lg-hero-badge">PLATFORM PILLARS</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
                Built for Modern Law Firms & Counsel
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Enterprise capabilities designed to remove administrative overhead, protect attorney-client privilege, and capture every billable hour.
              </p>
            </div>

            <div className="lg-bento-grid">
              {/* Card 1 (Col 8) */}
              <div className="lg-bento-card lg-bento-card-1 lg-bento-col-8">
                <div className="lg-bento-icon-wrapper">
                  <FolderGit2 size={24} />
                </div>
                <h3 className="lg-bento-title">Kanban Matter Pipelines & Case Milestones</h3>
                <p className="lg-bento-desc">
                  Visual stage management from initial intake to discovery, trial preparation, settlement, and matter archiving. Automatically compute statutory limitation dates, assign action items to associates, and track billable milestones seamlessly.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="lg-chip">Visual Stage Pipeline</span>
                  <span className="lg-chip">Statutory Deadline Engine</span>
                  <span className="lg-chip">Multi-Calendar Sync</span>
                </div>
              </div>

              {/* Card 2 (Col 4) */}
              <div className="lg-bento-card lg-bento-card-2 lg-bento-col-4">
                <div className="lg-bento-icon-wrapper">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="lg-bento-title">Automated Conflict Screening</h3>
                <p className="lg-bento-desc">
                  Instant phonetic and entity scans across active clients, past matters, corporate subsidiaries, and opposing counsels before engagement letters are dispatched.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="lg-chip">Sub-Second Scan</span>
                  <span className="lg-chip">Ethics Clearance Logs</span>
                </div>
              </div>

              {/* Card 3 (Col 4) */}
              <div className="lg-bento-card lg-bento-card-3 lg-bento-col-4">
                <div className="lg-bento-icon-wrapper">
                  <Clock size={24} />
                </div>
                <h3 className="lg-bento-title">Billable Time & Retainer Ledger</h3>
                <p className="lg-bento-desc">
                  One-click activity timers, automated trust account reconciliations (IOLTA compliant), and transparent LEDES/UTBMS itemized billing statements.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="lg-chip">IOLTA Compliant</span>
                  <span className="lg-chip">1-Click Timers</span>
                </div>
              </div>

              {/* Card 4 (Col 8) */}
              <div className="lg-bento-card lg-bento-card-4 lg-bento-col-8">
                <div className="lg-bento-icon-wrapper">
                  <Lock size={24} />
                </div>
                <h3 className="lg-bento-title">Privileged Document Vault & WhatsApp Portal</h3>
                <p className="lg-bento-desc">
                  Role-based encrypted evidence repository with version control and OCR search. Allow verified clients to check case milestone updates, submit court documents, and sign engagement agreements directly on WhatsApp with zero friction.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="lg-chip">256-Bit AES Vault</span>
                  <span className="lg-chip">WhatsApp Direct Intake</span>
                  <span className="lg-chip">Granular Access Control</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE ROI CALCULATOR --- */}
        <section id="roi-calculator" className="container" style={{ maxWidth: '1280px' }}>
          <div className="lg-roi-box">
            <div className="lg-roi-grid">
              <div>
                <span className="lg-hero-badge">PRACTICE PRODUCTIVITY CALCULATOR</span>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, margin: '0.5rem 0 0.85rem 0', color: 'var(--text-primary)' }}>
                  Calculate Your Law Firm Impact
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Adjust the slider to your firm's average monthly active caseload to calculate estimated administrative hours reclaimed and billable capacity unlocked.
                </p>

                {/* Currency toggle and benchmark badge */}
                <div className="lg-calc-header-controls">
                  <div className="lg-currency-toggle" role="group" aria-label="Select Currency">
                    <button
                      type="button"
                      className={`lg-currency-btn ${currency === 'INR' ? 'active' : ''}`}
                      onClick={() => setCurrency('INR')}
                    >
                      ₹ INR (India)
                    </button>
                    <button
                      type="button"
                      className={`lg-currency-btn ${currency === 'USD' ? 'active' : ''}`}
                      onClick={() => setCurrency('USD')}
                    >
                      $ USD (Global)
                    </button>
                  </div>
                  <div className="lg-calc-benchmark-tag">
                    <Sparkles size={14} color="var(--lg-emerald)" />
                    <span>Benchmark: 2.2h Admin Saved/Matter • Plans from ₹1,999/mo ($19/mo)</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Active Matters Managed:</span>
                    <span style={{ color: 'var(--lg-emerald)', fontSize: '1.25rem', fontWeight: 850 }}>{caseCount} Active Matters</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={caseCount}
                    onChange={(e) => setCaseCount(Number(e.target.value))}
                    className="lg-slider"
                    aria-label="Active Matters Managed"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>10 Matters (Solo)</span>
                    <span>100 Matters</span>
                    <span>200+ Matters (Firm)</span>
                  </div>
                </div>

                {/* Economics Breakdown Pill */}
                <div className="lg-calc-breakdown-pill">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={16} color="var(--lg-emerald)" />
                    <span>
                      <strong>Practice Economics:</strong> Saves <strong>2.2 admin hrs</strong> (~{isINR ? '₹400/hr' : '$35/hr'}) + Recaptures <strong>1.0 billable hr</strong> (~{isINR ? '₹1,500/hr' : '$175/hr'}) per matter
                    </span>
                  </div>
                  <div style={{ fontWeight: '750', color: 'var(--lg-emerald)', whiteSpace: 'nowrap' }}>
                    Estimated ROI: {roiPct.toLocaleString()}%
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem' }}>
                  <button
                    type="button"
                    className="lg-btn-primary"
                    onClick={() => handleOpenDemo(`Legal Practice CRM Setup for ${caseCount} active matters (${currency})`)}
                  >
                    Schedule Practice Management Audit <ArrowRight size={17} />
                  </button>
                </div>
              </div>

              <div className="lg-roi-stats-wrap">
                <div className="lg-roi-stat-box">
                  <div className="lg-roi-val">{adminHoursSaved} hrs</div>
                  <div className="lg-roi-lbl">Admin Hours Saved / Month</div>
                  <div className="lg-roi-sub">Intake, conflicts, court calendar & WhatsApp queries</div>
                </div>

                <div className="lg-roi-stat-box">
                  <div className="lg-roi-val">{billableHoursCaptured} hrs</div>
                  <div className="lg-roi-lbl">Billable Hours Recaptured</div>
                  <div className="lg-roi-sub">High-value drafting & legal counsel capacity</div>
                </div>

                <div className="lg-roi-stat-box lg-roi-stat-box-highlight">
                  <div className="lg-roi-val">{currencySymbol}{totalMonthlyImpact.toLocaleString()}</div>
                  <div className="lg-roi-lbl">Estimated Monthly Value</div>
                  <div className="lg-roi-sub">Billable recovery + paralegal overhead savings</div>
                </div>

                <div className="lg-roi-stat-box lg-roi-stat-box-highlight">
                  <div className="lg-roi-val">{currencySymbol}{projectedAnnualImpact.toLocaleString()}</div>
                  <div className="lg-roi-lbl">Projected Annual Impact</div>
                  <div className="lg-roi-sub">Compounded practice expansion & matter velocity</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="container" style={{ maxWidth: '1280px', padding: '3.5rem 1.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
            <span className="lg-hero-badge">PRACTICE FAQS</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Common questions regarding attorney-client confidentiality, Bar ethics compliance, and migrating your caseload.
            </p>
          </div>

          <div className="lg-faq-wrap">
            {faqs.map((faq, idx) => (
              <div key={idx} className="lg-faq-item">
                <button
                  type="button"
                  className="lg-faq-trigger"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <Minus size={20} color="var(--lg-emerald)" /> : <Plus size={20} color="var(--lg-emerald)" />}
                </button>
                {openFaq === idx && (
                  <div className="lg-faq-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- GLOBAL CONTACT SECTION --- */}
        <ContactSection />
      </div>
    </>
  );
}
