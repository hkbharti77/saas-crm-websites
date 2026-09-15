import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  Landmark,
  ShieldCheck,
  Lock,
  Zap,
  CreditCard,
  TrendingUp,
  Coins,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Plus,
  Minus,
  Users,
  Database,
  BrainCircuit,
  Bot,
  ChevronRight,
  Award,
  Sparkles,
  Check,
  FileText,
  BarChart3,
  PieChart,
  Building,
  Scale,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './FinancePage.css';

const SITE = 'https://www.gyanvaniai.online';

export default function FinancePage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [applicantCount, setApplicantCount] = useState(2500);
  const [openFaq, setOpenFaq] = useState(0);

  // Live FinTech Simulator Steps
  const simulatorSteps = [
    {
      id: 'kyc_inquiry',
      tabTitle: '1. WhatsApp Onboarding',
      icon: <MessageSquare size={16} />,
      applicantMsg: 'Hi, I would like to apply for a personal loan of $15,000 for home renovation.',
      aiResponse: 'Hello! I can process your pre-approval in 60 seconds. Please confirm your monthly net income and share your Govt ID card for instant KYC verification.',
      badge: 'Conversational Banking API',
      statusNote: 'Real-time NLP intent detection & digital application initiation'
    },
    {
      id: 'ocr_verification',
      tabTitle: '2. Instant OCR & KYC Sync',
      icon: <FileText size={16} />,
      applicantMsg: 'Uploaded ID Document (PDF / Image attached)',
      aiResponse: 'Identity verified via official registry OCR! Name, DOB, and Tax ID extracted with 99.8% match confidence score. Initial credit check in progress.',
      badge: 'Automated OCR & Liveness Check',
      statusNote: 'Biometric liveness matching + instant bureau API lookup'
    },
    {
      id: 'underwriting',
      tabTitle: '3. Algorithmic Underwriting',
      icon: <BrainCircuit size={16} />,
      applicantMsg: 'Processing Credit Score & DTI Ratio...',
      aiResponse: 'Pre-Approved! Credit Score: 780. DTI Ratio: 22%. Pre-approved loan offer: $15,000 at 8.9% APR for 36 months. Digital E-Sign link generated.',
      badge: 'Risk Telemetry Engine',
      statusNote: 'Automated credit policy evaluation & risk tier assignment'
    },
    {
      id: 'disbursement',
      tabTitle: '4. Instant Disbursement',
      icon: <CreditCard size={16} />,
      applicantMsg: 'E-Sign Completed on Contract.',
      aiResponse: 'Transaction Complete! $15,000 disbursed to Account #****8491 via Instant ACH/UPI API. Repayment schedule & e-mandate active on WhatsApp.',
      badge: 'Core Banking API Sync',
      statusNote: 'Bank-grade AES-256 encrypted wire dispatch & audit log lock'
    }
  ];

  // Financial ROI Calculator Math
  const hoursSavedPerMonth = Math.round((applicantCount * 18) / 60);
  const turnaroundImprovementPct = 78;
  const monthlySavingsUSD = Math.round(applicantCount * 14.5);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi ensure compliance with PCI-DSS, SOC2, and Banking Regulations?',
      a: 'Our platform is engineered for zero-trust financial environments. All data is encrypted in transit (TLS 1.3) and at rest (AES-256) with tenant-isolated database architectures, HSM tokenization for sensitive PII/PAN data, and continuous immutable audit logging ready for FINRA, SEC, RBI, and GDPR audits.'
    },
    {
      q: 'Can Gyan VaniAi integrate with legacy Core Banking Systems and Payment Gateways?',
      a: 'Yes. We provide pre-built REST & gRPC connectors for core banking software like Finacle, FIS, Temenos T24, Mambu, and Thought Machine, alongside payment providers including Stripe, Razorpay, Plaid, and Yodlee.'
    },
    {
      q: 'How does the WhatsApp Banking solution handle loan collection and payment reminders?',
      a: 'Our automated collections engine triggers personalized, multi-lingual WhatsApp reminders prior to EMI due dates with embedded 1-click UPI/Stripe payment links. For overdue accounts, smart AI voice bots initiate compliant outreach calls, reducing NPA/default rates by up to 34%.'
    },
    {
      q: 'Can wealth management and insurance teams use this for client onboarding?',
      a: 'Absolutely. Financial advisors use our CRM for automated portfolio updates, risk profile questionnaires, instant policy renewal links, and automated lead scoring across digital advertising campaigns.'
    },
    {
      q: 'What is the implementation timeline for a bank or licensed FinTech firm?',
      a: 'Digital-first FinTech startups can launch within 10 business days using standard API webhooks. Licensed commercial banks and credit unions typically deploy within 3 to 6 weeks, including security audit sign-offs and UAT testing.'
    }
  ];

  const financialSolutions = [
    {
      icon: <MessageSquare size={24} className="fin-icon-accent" />,
      title: 'WhatsApp Conversational Banking',
      desc: 'Deliver 24/7 balance checks, mini-statements, instant loan applications, and fund transfers directly over WhatsApp Business API.'
    },
    {
      icon: <ShieldCheck size={24} className="fin-icon-accent" />,
      title: 'Automated e-KYC & OCR Pipeline',
      desc: 'Instant document extraction, biometric liveness verification, and sanction list screening (AML/PEP) with zero manual intervention.'
    },
    {
      icon: <TrendingUp size={24} className="fin-icon-accent" />,
      title: 'Algorithmic Lead Scoring & Underwriting',
      desc: 'Prioritize high-value wealth prospects and loan applicants automatically using real-time debt-to-income and bureau credit telemetry.'
    },
    {
      icon: <Zap size={24} className="fin-icon-accent" />,
      title: 'Collections & Automated EMI Recovery Bot',
      desc: 'Proactive payment reminders, smart payment link dispatch, and automated voice qualification that cuts loan default rates significantly.'
    },
    {
      icon: <Coins size={24} className="fin-icon-accent" />,
      title: 'Wealth Management & Insurance CRM',
      desc: 'Unified client 360° telemetry, portfolio rebalancing notifications, automated policy renewals, and advisor activity tracking.'
    },
    {
      icon: <Lock size={24} className="fin-icon-accent" />,
      title: 'Bank-Grade Zero-Trust Security',
      desc: 'Tenant-isolated infrastructure, 256-bit AES encryption, HSM tokenization, and SOC2 / PCI-DSS compliance built from the ground up.'
    }
  ];

  // Financial Product Schema Data for SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Gyan VaniAi Finance & FinTech CRM',
    description: 'Next-generation AI FinTech CRM, WhatsApp Banking automation, automated e-KYC telemetry, and core banking integration.',
    provider: {
      '@type': 'Organization',
      name: 'Gyan VaniAi',
      url: SITE
    },
    areaServed: 'Worldwide',
    category: 'FinTech Software & Banking CRM'
  };

  return (
    <>
      <SeoHead
        title="FinTech CRM & Conversational Banking Platform 2026 | Gyan VaniAi"
        description="Enterprise FinTech CRM with automated WhatsApp banking, e-KYC OCR telemetry, credit score pre-approval, EMI collections, and SOC2/PCI-DSS compliance."
        canonical={`${SITE}/industries/finance`}
        image={`${SITE}/logo.png`}
        keywords="FinTech CRM, WhatsApp Banking, Financial Services Automation, eKYC Automation, Core Banking CRM, EMI Collections Bot, Credit Scoring Engine"
        schema={jsonLdData}
      />

      <div className="finance-page">
        {/* Ambient Glow Atmosphere */}
        <div className="fin-bg-glow-1"></div>
        <div className="fin-bg-glow-2"></div>

        {/* --- ELEGANT FINTECH HERO SECTION --- */}
        <section className="fin-hero">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li>/</li>
                <li>Industries</li>
                <li>/</li>
                <li style={{ color: '#10b981', fontWeight: '600' }}>Finance & FinTech</li>
              </ol>
            </nav>

            <div className="fin-hero-grid">
              <div className="fin-hero-text">
                <div className="fin-eyebrow">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span>FINANCIAL AUTOMATION & COMPLIANCE PLATFORM 2026</span>
                </div>

                <h1 className="fin-hero-title">
                  AI FinTech CRM, <span className="fin-gradient-text">WhatsApp Banking</span> & Automated Telemetry
                </h1>

                <p className="fin-hero-subtext">
                  Supercharge financial customer acquisition, automate e-KYC verification, and disburse loans 78% faster with zero-trust bank security and seamless core banking APIs.
                </p>

                <div className="fin-hero-actions">
                  <button
                    type="button"
                    className="btn btn-emerald"
                    onClick={() => handleOpenDemo('FinTech & WhatsApp Banking Solution')}
                  >
                    <span>Book FinTech Demo</span>
                    <ArrowRight size={16} />
                  </button>
                  <a href="#simulator" className="btn btn-glass">
                    <span>Explore Live Simulator</span>
                    <ChevronRight size={16} />
                  </a>
                </div>

                {/* Key Metrics Strip */}
                <div className="fin-trust-metrics">
                  <div className="fin-metric-item">
                    <span className="fin-metric-val">99.8%</span>
                    <span className="fin-metric-lbl">OCR Accuracy</span>
                  </div>
                  <div className="fin-metric-divider"></div>
                  <div className="fin-metric-item">
                    <span className="fin-metric-val">78%</span>
                    <span className="fin-metric-lbl">Faster Disbursal</span>
                  </div>
                  <div className="fin-metric-divider"></div>
                  <div className="fin-metric-item">
                    <span className="fin-metric-val">SOC2 Type II</span>
                    <span className="fin-metric-lbl">Bank Compliance</span>
                  </div>
                </div>
              </div>

              {/* Interactive FinTech Telemetry Card */}
              <div className="fin-hero-visual-card">
                <div className="fin-card-header">
                  <div className="fin-card-badge">
                    <span className="fin-live-dot"></span>
                    <span>LIVE CORE BANKING FEED</span>
                  </div>
                  <Lock size={14} className="text-emerald-400" />
                </div>

                <div className="fin-telemetry-body">
                  <div className="fin-stat-box">
                    <div className="fin-stat-top">
                      <span className="fin-stat-label">Loan Pre-Approvals (24h)</span>
                      <TrendingUp size={16} className="text-emerald-400" />
                    </div>
                    <div className="fin-stat-val">$4,280,500</div>
                    <div className="fin-stat-sub">↑ 24.8% vs last week</div>
                  </div>

                  <div className="fin-flow-list">
                    <div className="fin-flow-item">
                      <div className="fin-flow-icon success"><CheckCircle2 size={16} /></div>
                      <div className="fin-flow-info">
                        <div className="fin-flow-title">Instant KYC Verified</div>
                        <div className="fin-flow-desc">Applicant #FIN-9042 • PAN & Aadhaar Matched</div>
                      </div>
                      <span className="fin-flow-time">Just now</span>
                    </div>

                    <div className="fin-flow-item">
                      <div className="fin-flow-icon active"><Zap size={16} /></div>
                      <div className="fin-flow-info">
                        <div className="fin-flow-title">Instant Disbursement</div>
                        <div className="fin-flow-desc">$25,000 sent via Core API (ACH/UPI)</div>
                      </div>
                      <span className="fin-flow-time">12s ago</span>
                    </div>

                    <div className="fin-flow-item">
                      <div className="fin-flow-icon alert"><ShieldCheck size={16} /></div>
                      <div className="fin-flow-info">
                        <div className="fin-flow-title">AML / Sanction Check</div>
                        <div className="fin-flow-desc">Zero risk flag • Bureau Score 810</div>
                      </div>
                      <span className="fin-flow-time">45s ago</span>
                    </div>
                  </div>

                  <div className="fin-compliance-pill">
                    <ShieldCheck size={14} />
                    <span>256-Bit Encrypted • PCI-DSS Level 1 Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- LIVE INTERACTIVE SIMULATOR SECTION --- */}
        <section id="simulator" className="fin-section fin-section-dark">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="fin-section-header">
              <span className="fin-section-tag">INTERACTIVE WORKFLOW</span>
              <h2 className="fin-section-title">Experience the Automated FinTech Journey</h2>
              <p className="fin-section-desc">
                Click through each phase of our conversational banking & instant loan onboarding pipeline.
              </p>
            </div>

            <div className="fin-sim-container">
              {/* Tab Selector */}
              <div className="fin-sim-tabs">
                {simulatorSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`fin-sim-tab ${activeSimTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(idx)}
                  >
                    {step.icon}
                    <span>{step.tabTitle}</span>
                  </button>
                ))}
              </div>

              {/* Active Tab View */}
              <div className="fin-sim-display">
                <div className="fin-sim-header">
                  <span className="fin-sim-badge">{simulatorSteps[activeSimTab].badge}</span>
                  <span className="fin-sim-status">{simulatorSteps[activeSimTab].statusNote}</span>
                </div>

                <div className="fin-sim-chat-window">
                  {/* User Message */}
                  <div className="fin-chat-bubble user">
                    <div className="fin-chat-sender">Applicant / Customer</div>
                    <div className="fin-chat-text">{simulatorSteps[activeSimTab].applicantMsg}</div>
                  </div>

                  {/* AI System Response */}
                  <div className="fin-chat-bubble ai">
                    <div className="fin-chat-sender">
                      <Bot size={14} />
                      <span>Gyan VaniAi FinTech Bot</span>
                    </div>
                    <div className="fin-chat-text">{simulatorSteps[activeSimTab].aiResponse}</div>
                  </div>
                </div>

                <div className="fin-sim-footer">
                  <div className="fin-sim-nav">
                    <button
                      type="button"
                      className="fin-sim-btn"
                      disabled={activeSimTab === 0}
                      onClick={() => setActiveSimTab(prev => Math.max(0, prev - 1))}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="fin-sim-btn primary"
                      disabled={activeSimTab === simulatorSteps.length - 1}
                      onClick={() => setActiveSimTab(prev => Math.min(simulatorSteps.length - 1, prev + 1))}
                    >
                      Next Phase <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- KEY FINANCIAL SOLUTIONS GRID --- */}
        <section className="fin-section">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="fin-section-header">
              <span className="fin-section-tag">ENTERPRISE CAPABILITIES</span>
              <h2 className="fin-section-title">Built specifically for Banks, Lenders & Wealth Firms</h2>
              <p className="fin-section-desc">
                Everything you need to automate customer acquisition, risk assessment, and lifetime customer retention.
              </p>
            </div>

            <div className="fin-solutions-grid">
              {financialSolutions.map((sol, index) => (
                <div key={index} className="fin-solution-card">
                  <div className="fin-solution-icon-wrap">{sol.icon}</div>
                  <h3 className="fin-solution-title">{sol.title}</h3>
                  <p className="fin-solution-desc">{sol.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE FINANCIAL ROI CALCULATOR --- */}
        <section className="fin-section fin-section-alt">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="fin-calc-card">
              <div className="fin-calc-left">
                <span className="fin-section-tag">FINANCIAL ROI ENGINE</span>
                <h2 className="fin-calc-title">Calculate Your Monthly Efficiency & Disbursal Velocity</h2>
                <p className="fin-calc-desc">
                  Drag the slider to match your institution’s monthly loan application or client inquiry volume.
                </p>

                <div className="fin-slider-group">
                  <div className="fin-slider-label">
                    <span>Monthly Applicants / Inquiries:</span>
                    <strong className="fin-emerald-val">{applicantCount.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={applicantCount}
                    onChange={(e) => setApplicantCount(Number(e.target.value))}
                    className="fin-range-slider"
                  />
                  <div className="fin-slider-marks">
                    <span>500</span>
                    <span>10,000</span>
                    <span>20,000+</span>
                  </div>
                </div>
              </div>

              <div className="fin-calc-right">
                <div className="fin-result-box">
                  <div className="fin-result-item">
                    <span className="fin-result-lbl">Hours Saved in Manual KYC</span>
                    <span className="fin-result-val">{hoursSavedPerMonth.toLocaleString()} hrs / mo</span>
                  </div>

                  <div className="fin-result-item">
                    <span className="fin-result-lbl">Disbursal Velocity Boost</span>
                    <span className="fin-result-val">{turnaroundImprovementPct}% Faster</span>
                  </div>

                  <div className="fin-result-item highlight">
                    <span className="fin-result-lbl">Estimated Operational Cost Reduction</span>
                    <span className="fin-result-val">${monthlySavingsUSD.toLocaleString()} / mo</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-emerald full-w"
                    onClick={() => handleOpenDemo(`Custom FinTech ROI Calculation for ${applicantCount} monthly applicants`)}
                  >
                    <span>Get Custom FinTech Audit</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BANK-GRADE SECURITY & COMPLIANCE DEEP DIVE --- */}
        <section className="fin-section">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="fin-section-header">
              <span className="fin-section-tag">BANK-GRADE SECURITY</span>
              <h2 className="fin-section-title">Zero-Trust Security & Regulatory Compliance</h2>
              <p className="fin-section-desc">
                Architected from the ground up for strict global financial mandates and banking standards.
              </p>
            </div>

            <div className="fin-security-grid">
              <div className="fin-sec-card">
                <Lock size={28} className="fin-sec-icon" />
                <h4>AES-256 & TLS 1.3 Encryption</h4>
                <p>All sensitive financial records, PII data, and chat transcripts are encrypted end-to-end.</p>
              </div>

              <div className="fin-sec-card">
                <KeyRound size={28} className="fin-sec-icon" />
                <h4>HSM PII Tokenization</h4>
                <p>Hardware Security Module (HSM) tokenization ensures raw account numbers are never exposed.</p>
              </div>

              <div className="fin-sec-card">
                <Scale size={28} className="fin-sec-icon" />
                <h4>SOC2 & PCI-DSS Ready</h4>
                <p>Continuous compliance monitoring with detailed role-based access control (RBAC) and audit trails.</p>
              </div>

              <div className="fin-sec-card">
                <Database size={28} className="fin-sec-icon" />
                <h4>Tenant Isolation</h4>
                <p>Each financial institution operates on isolated database containers with zero cross-tenant data leak.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ ACCORDION SECTION --- */}
        <section className="fin-section fin-section-alt">
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="fin-section-header">
              <span className="fin-section-tag">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="fin-section-title">FinTech Platform FAQs</h2>
              <p className="fin-section-desc">
                Common technical and regulatory questions answered for CTOs and Compliance Leads.
              </p>
            </div>

            <div className="fin-faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`fin-faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="fin-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div className="fin-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MID / BOTTOM CTA BANNER --- */}
        <section className="fin-cta-banner">
          <div className="container" style={{ maxWidth: '1100px' }}>
            <div className="fin-cta-box">
              <h2 className="fin-cta-title">Ready to Transform Your FinTech Customer Pipeline?</h2>
              <p className="fin-cta-desc">
                Schedule a 30-minute tailored demonstration with our banking solution architects.
              </p>
              <div className="fin-cta-buttons">
                <button
                  type="button"
                  className="btn btn-emerald"
                  onClick={() => handleOpenDemo('FinTech Bottom Banner CTA')}
                >
                  <span>Request Architect Consultation</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/contact" className="btn btn-glass">
                  <span>Contact Sales Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Contact Section Component */}
        <ContactSection />
      </div>
    </>
  );
}
