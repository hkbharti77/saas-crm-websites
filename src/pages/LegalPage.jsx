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
  Plus,
  Minus,
  Briefcase,
  Users,
  Database,
  Building,
  KeyRound,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  TrendingUp,
  FolderGit2
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './LegalPage.css';

const SITE = 'https://www.gyanvaniai.com';

export default function LegalPage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [caseCount, setCaseCount] = useState(65);
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

  // Legal Practice Efficiency Math
  const adminHoursSaved = Math.round(caseCount * 4.8);
  const billableHoursCaptured = Math.round(caseCount * 2.4);
  const additionalRevenueUSD = Math.round(billableHoursCaptured * 280);

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
        <div className="legal-bg-glow-1" />
        <div className="legal-bg-glow-2" />

        {/* Hero Section */}
        <section className="legal-hero">
          <div className="legal-container">
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '500' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>Industries</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: '#10b981' }}>Legal Solutions</li>
              </ol>
            </nav>

            <div className="legal-hero-grid">
              <div>
                <div className="legal-badge">
                  <Scale size={14} />
                  <span>Enterprise Legal Technology</span>
                </div>
                <h1 className="legal-hero-title">
                  Legal Practice CRM & <span className="gradient-text">Case Management</span> Software
                </h1>
                <p className="legal-hero-desc">
                  Streamline client intake, automate matter tracking pipelines, and ensure strict privilege confidentiality for modern law firms, advocates, and corporate counsel.
                </p>

                <div className="legal-hero-benefits">
                  <div className="legal-benefit-item">
                    <CheckCircle2 size={20} color="#10b981" />
                    <span>Role-based privilege protection with 256-bit AES data encryption</span>
                  </div>
                  <div className="legal-benefit-item">
                    <CheckCircle2 size={20} color="#10b981" />
                    <span>Zero-friction WhatsApp client intake & document collection</span>
                  </div>
                  <div className="legal-benefit-item">
                    <CheckCircle2 size={20} color="#10b981" />
                    <span>Automated conflict-of-interest checks across all historical records</span>
                  </div>
                  <div className="legal-benefit-item">
                    <CheckCircle2 size={20} color="#10b981" />
                    <span>Court hearing alerts & statutory deadline multi-calendar sync</span>
                  </div>
                </div>

                <div className="legal-hero-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ background: '#10b981', borderColor: '#10b981' }}
                    onClick={() => handleOpenDemo('Legal CRM Deployment Consultation')}
                  >
                    Deploy Legal CRM <ArrowRight size={18} />
                  </button>
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20am%20interested%20in%20Legal%20Practice%20CRM%20Software."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      background: '#25D366',
                      color: '#ffffff',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Consult on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="legal-hero-img-wrap">
                <img
                  src="/legal-crm-hero.webp"
                  alt="Gyan VaniAi Legal Practice CRM and Case Pipeline Dashboard"
                  width="1000"
                  height="600"
                  className="legal-hero-img"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
            </div>

            {/* Telemetry Bar */}
            <div className="legal-telemetry-bar">
              <div className="legal-telemetry-item">
                <div className="legal-telemetry-val">80%</div>
                <div className="legal-telemetry-label">Faster Client Intake</div>
              </div>
              <div className="legal-telemetry-item">
                <div className="legal-telemetry-val">0</div>
                <div className="legal-telemetry-label">Missed Court Deadlines</div>
              </div>
              <div className="legal-telemetry-item">
                <div className="legal-telemetry-val">+25%</div>
                <div className="legal-telemetry-label">Billable Capture Gain</div>
              </div>
              <div className="legal-telemetry-item">
                <div className="legal-telemetry-val">256-Bit</div>
                <div className="legal-telemetry-label">Privilege Encryption</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive Matter Simulator */}
        <section className="legal-section legal-section-alt">
          <div className="legal-container">
            <div className="legal-section-header">
              <div className="legal-badge">Interactive Matter Lifecycle</div>
              <h2 className="legal-section-title">Experience the Legal Case Workflow</h2>
              <p className="legal-section-subtitle">
                See how a prospective client is onboarded, verified against ethical conflict rosters, and managed through active litigation stages.
              </p>
            </div>

            <div className="legal-sim-container">
              <div className="legal-sim-tabs">
                {simulatorSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`legal-sim-tab-btn ${activeSimTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(idx)}
                  >
                    {step.icon}
                    <span>{step.tabTitle}</span>
                  </button>
                ))}
              </div>

              <div className="legal-sim-content">
                <div className="legal-sim-badge">
                  {simulatorSteps[activeSimTab].badge}
                </div>

                <div className="legal-call-bubble-wrap">
                  <div className="legal-bubble legal-bubble-client">
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Client Action / Stage
                    </div>
                    <div>{simulatorSteps[activeSimTab].clientMsg}</div>
                  </div>

                  <div className="legal-bubble legal-bubble-firm">
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: '#a7f3d0', marginBottom: '0.35rem' }}>
                      Gyan VaniAi Legal CRM System
                    </div>
                    <div>{simulatorSteps[activeSimTab].firmResponse}</div>
                  </div>
                </div>

                <div className="legal-sim-status-note">
                  <ShieldCheck size={18} />
                  <span>{simulatorSteps[activeSimTab].statusNote}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="legal-section">
          <div className="legal-container">
            <div className="legal-section-header">
              <div className="legal-badge">Platform Pillars</div>
              <h2 className="legal-section-title">Built for Modern Law Firms & Counsel</h2>
              <p className="legal-section-subtitle">
                Six tailored capabilities designed to remove administrative overhead and safeguard attorney-client privilege.
              </p>
            </div>

            <div className="legal-caps-grid">
              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><FolderGit2 size={24} /></div>
                <h3 className="legal-cap-title">Kanban Matter Stage Pipelines</h3>
                <p className="legal-cap-desc">Visual boards for intake, discovery, trial prep, settlement negotiations, and closure, complete with automated stage progression tasks.</p>
              </div>

              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><Lock size={24} /></div>
                <h3 className="legal-cap-title">Privileged Document Vault</h3>
                <p className="legal-cap-desc">Encrypted evidence repository with version control, automatic metadata tagging, OCR text extraction, and strict role-based access.</p>
              </div>

              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><Calendar size={24} /></div>
                <h3 className="legal-cap-title">Court Calendaring & Statutory Deadlines</h3>
                <p className="legal-cap-desc">Automated limitation date computation and hearing notifications synced directly with Google Calendar, Outlook, and client WhatsApp.</p>
              </div>

              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><Clock size={24} /></div>
                <h3 className="legal-cap-title">Billable Time & Retainer Ledger</h3>
                <p className="legal-cap-desc">One-click activity timers, automated trust account reconciliations, and itemized billing statements compliant with legal accounting standards.</p>
              </div>

              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><ShieldAlert size={24} /></div>
                <h3 className="legal-cap-title">Conflict-of-Interest Verification</h3>
                <p className="legal-cap-desc">Instant automated scans cross-check adverse parties, corporate subsidiaries, and past clients to ensure 100% ethical compliance.</p>
              </div>

              <div className="legal-cap-card">
                <div className="legal-cap-icon-wrap"><MessageSquare size={24} /></div>
                <h3 className="legal-cap-title">WhatsApp Client Portal</h3>
                <p className="legal-cap-desc">Allow verified clients to check case milestone updates, submit documents, and sign engagement agreements directly on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Efficiency Calculator */}
        <section className="legal-section legal-section-alt">
          <div className="legal-container">
            <div className="legal-section-header">
              <div className="legal-badge">Firm Productivity</div>
              <h2 className="legal-section-title">Calculate Your Law Firm Impact</h2>
              <p className="legal-section-subtitle">
                Estimate the administrative hours reclaimed and additional billable revenue captured by centralizing cases in Gyan VaniAi Legal CRM.
              </p>
            </div>

            <div className="legal-calc-card">
              <div className="legal-calc-slider-wrap">
                <div className="legal-calc-slider-header">
                  <span className="legal-calc-label">Active Matters / Cases Managed:</span>
                  <span className="legal-calc-value-display">{caseCount} Active Matters</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={caseCount}
                  onChange={(e) => setCaseCount(Number(e.target.value))}
                  className="legal-range-input"
                  aria-label="Active Matters Managed"
                />
              </div>

              <div className="legal-calc-results">
                <div className="legal-calc-res-item">
                  <div className="legal-calc-res-num">{adminHoursSaved} hrs</div>
                  <div className="legal-calc-res-lbl">Admin Hours Saved / Month</div>
                </div>

                <div className="legal-calc-res-item">
                  <div className="legal-calc-res-num">{billableHoursCaptured} hrs</div>
                  <div className="legal-calc-res-lbl">Extra Billable Hours Captured</div>
                </div>

                <div className="legal-calc-res-item">
                  <div className="legal-calc-res-num">${additionalRevenueUSD.toLocaleString()}</div>
                  <div className="legal-calc-res-lbl">Potential Monthly Revenue Gain</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: '#10b981', borderColor: '#10b981' }}
                  onClick={() => handleOpenDemo(`Legal Practice CRM Setup for ${caseCount} active cases`)}
                >
                  Schedule Practice Management Audit <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="legal-section">
          <div className="legal-container">
            <div className="legal-section-header">
              <div className="legal-badge">Practice FAQs</div>
              <h2 className="legal-section-title">Frequently Asked Questions</h2>
              <p className="legal-section-subtitle">
                Common questions on confidentiality, regulatory compliance, and migrating your firm's active caseload.
              </p>
            </div>

            <div className="legal-faq-wrap">
              {faqs.map((faq, idx) => (
                <div key={idx} className="legal-faq-item">
                  <button
                    type="button"
                    className="legal-faq-trigger"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <Minus size={20} color="#10b981" /> : <Plus size={20} color="#10b981" />}
                  </button>
                  {openFaq === idx && (
                    <div className="legal-faq-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Contact Section */}
        <ContactSection />
      </div>
    </>
  );
}
