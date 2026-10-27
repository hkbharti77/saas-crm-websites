import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SeoHead';
import ContactSection from '../components/ContactSection';
import RelatedLinks from '../components/RelatedLinks';
import NumberTicker from '../components/ui/NumberTicker';
import Particles from '../components/ui/Particles';
import SpotlightCard from '../components/ui/SpotlightCard';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';

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
  Clock, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  Workflow, 
  Lock, 
  Building2, 
  Check, 
  HelpCircle, 
  FileSpreadsheet, 
  UserCheck, 
  Briefcase,
  Award,
  FileText,
  Smartphone
} from 'lucide-react';

import './HrmsDevelopmentPage.css';

const SITE_URL = 'https://www.gyanvaniai.com';
const PAGE_URL = `${SITE_URL}/services/hrms-development`;

const hrmsAiFacts = [
  {
    question: "What is Gyan VaniAi HRMS Software Development?",
    answer: "A bespoke enterprise human resource software engineering service that builds custom, policy-aligned HRMS platforms with automated payroll, biometric/geo-fenced attendance, multi-tiered leave workflows, and AI talent pipelines."
  },
  {
    question: "Who is this custom HRMS solution for?",
    answer: "Mid-market companies, multi-location enterprises, manufacturing units, healthcare providers, and high-growth startups that have outgrown Excel spreadsheets or rigid off-the-shelf HR suites."
  },
  {
    question: "What problems does custom HRMS development solve?",
    answer: "It eliminates generic template constraints, automates complex local statutory compliance (PF, ESI, TDS, Gratuity), prevents payroll calculation errors, and unifies fragmented biometric devices into one live dashboard."
  },
  {
    question: "How does the custom HRMS integrate with existing systems?",
    answer: "We engineer bi-directional API connectors and secure webhooks with enterprise ERPs (SAP, Oracle, Zoho Books), biometric thumbprint and facial scanners, banking payment APIs, and WhatsApp notification channels."
  },
  {
    question: "Who owns the code and workforce database?",
    answer: "You own 100% of the custom source code, database architecture, and intellectual property with zero recurring per-employee license fees."
  },
  {
    question: "How fast can a custom HRMS be deployed?",
    answer: "Standard modular enterprise instances deploy within 2 to 4 weeks. Full custom enterprise architectures with legacy data ETL migrations launch in 6 to 8 weeks."
  }
];

export default function HrmsDevelopmentPage() {
  const [activeTab, setActiveTab] = useState('payroll'); // 'payroll' | 'attendance' | 'leave' | 'recruitment'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const customHrmsServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PAGE_URL}#service`,
    "name": "Custom HRMS Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Gyan VaniAi",
      "url": SITE_URL
    },
    "serviceType": "Custom HR Software Development",
    "description": "Enterprise custom HRMS software engineering for automated payroll, biometric attendance, dynamic leave approvals, and employee lifecycle management with full data ownership.",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom HRMS Development Deliverables",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Statutory-Compliant Automated Payroll Engine"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Biometric & Geo-Fenced Mobile Attendance Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Employee Self-Service (ESS) Portal with Dynamic Leave Workflows"
          }
        }
      ]
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Gyan VaniAi Enterprise Custom HRMS Architecture",
    "operatingSystem": "Web, Cloud, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "description": "Zero recurring per-seat user licensing fees."
    },
    "featureList": [
      "Automated Indian Statutory Payroll Engine (PF, ESI, TDS, PT)",
      "Biometric Scanner & Geo-Fencing Mobile Clock-In Sync",
      "Hierarchical Leave Approval Workflow Engine",
      "AI Resume Screening & Applicant Tracking Pipeline",
      "100% Dedicated Private Cloud / On-Premise Data Sovereignty"
    ]
  };

  const faqData = [
    {
      q: "Can this custom HRMS integrate with our existing ERP and accounting systems?",
      a: "Yes. We engineer secure bi-directional REST and GraphQL API connectors to integrate your custom HRMS with ERP systems (SAP, Oracle, Microsoft Dynamics) and accounting software like Zoho Books, Tally Prime, and QuickBooks. Payroll journal entries and vendor payments sync automatically without manual double-entry."
    },
    {
      q: "How does the system handle biometric attendance and multi-branch clock-ins?",
      a: "Our attendance architecture supports direct integration with popular biometric hardware (eSSl, ZKTeco, Matrix) via TCP/IP sockets and cloud webhooks. For remote and field sales staff, we provide GPS geo-fenced mobile punch-in with facial verification, automatically syncing punches to timesheets in real time."
    },
    {
      q: "Is the payroll engine compliant with local Indian statutory regulations?",
      a: "Yes, fully compliant. The payroll calculation engine natively computes Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT) across all states, Tax Deducted at Source (TDS) under old and new income tax regimes, Gratuity provisions, and generates statutory Form 16 and bank payout files."
    },
    {
      q: "How secure is confidential employee salary and personal information?",
      a: "We implement military-grade AES-256 encryption at rest and TLS 1.3 in transit. Detailed Multi-Tenant Role-Based Access Control (RBAC) ensures salary data is only visible to authorized HR leadership and payroll managers. Complete immutable audit logs record every profile change and document download."
    },
    {
      q: "Can you migrate historical workforce records and leave balances from Excel or legacy HRMS?",
      a: "Yes. Our team conducts end-to-end ETL (Extract, Transform, Load) data migrations. We sanitize, normalize, and import your complete employee history, historical salary slips, accrued leave balances, and tax records into your new database with zero operational downtime."
    },
    {
      q: "Who owns the HRMS source code and database?",
      a: "You retain 100% complete ownership of the source code, database architecture, and intellectual property upon deployment. You can host it on your own private cloud (AWS, Azure, Google Cloud) or on-premise servers with zero recurring per-employee SaaS licensing penalties."
    }
  ];

  const hrmsFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="hrms-dev-page">
      <SEOHead
        title="Custom HRMS Software Development Company | Payroll & Attendance | Gyan VaniAi"
        description="Bespoke HRMS software development with automated payroll, biometric attendance, hierarchical leave workflows, AI recruitment pipelines, and zero per-seat licensing fees."
        canonical={PAGE_URL}
        keywords={[
          "Custom HRMS Software Development",
          "HRMS Development Company",
          "Custom Payroll Software Development",
          "Biometric Attendance Management System",
          "Employee Self-Service Portal Development",
          "Statutory Compliant HRMS Software",
          "Enterprise HR Software India"
        ]}
        schema={[customHrmsServiceSchema, softwareAppSchema, hrmsFaqSchema]}
      />

      {/* Modern Background Particles Decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '800px', pointerEvents: 'none', zIndex: 0 }}>
        <Particles quantity={45} ease={80} color="#a78bfa" refresh={false} />
      </div>

      <div className="hrms-dev-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="hrms-hero">
          <div className="hrms-hero-grid">
            <div className="hrms-hero-content">
              <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: '500' }}>
                <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted, #94a3b8)' }}>
                  <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li>Services</li>
                  <li aria-hidden="true">/</li>
                  <li style={{ color: '#a78bfa' }}>HRMS Software Development</li>
                </ol>
              </nav>

              <div className="hrms-hero-badge">
                <Sparkles size={16} />
                <span>Enterprise Custom HRMS Engineering Engine</span>
              </div>

              <h1 className="hrms-hero-h1">
                Custom HRMS Software Engineered Around Your Workforce Policies
              </h1>

              <p className="hrms-hero-subtitle">
                Eliminate rigid spreadsheets and costly per-seat SaaS tools. We engineer bespoke Human Resource Management Systems with <strong>automated payroll</strong>, biometric attendance integration, <strong>multi-tiered leave approvals</strong>, and complete data sovereignty.
              </p>

              <div className="hrms-hero-bullets">
                <div className="hrms-hero-bullet-item">
                  <div className="hrms-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Zero Recurring Per-Employee Licensing Fees</span>
                </div>
                <div className="hrms-hero-bullet-item">
                  <div className="hrms-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Biometric & GPS Geo-fenced Attendance</span>
                </div>
                <div className="hrms-hero-bullet-item">
                  <div className="hrms-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>100% Statutory Compliant Payroll (PF/ESI/TDS)</span>
                </div>
                <div className="hrms-hero-bullet-item">
                  <div className="hrms-bullet-icon"><CheckCircle2 size={16} /></div>
                  <span>Full Database & Source Code Ownership</span>
                </div>
              </div>

              <div className="hrms-hero-ctas">
                <a href="#contact" className="hrms-btn-primary">
                  <span>Schedule HRMS Architecture Call</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#hrms-modules" className="hrms-btn-secondary">
                  <Layers size={18} />
                  <span>Explore Interactive Modules</span>
                </a>
              </div>
            </div>

            {/* CSS-Only Dashboard Hero Visual (Zero Stock Images) */}
            <div className="hrms-hero-visual-wrap">
              <div className="hrms-hero-visual">
                <div className="hrms-visual-header">
                  <div className="hrms-visual-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="hrms-visual-title">
                    <UserCheck size={16} />
                    <span>Workforce Operations Pulse (Live Sync)</span>
                  </div>
                </div>

                <div className="hrms-visual-grid">
                  <div className="hrms-mini-stat">
                    <div className="hrms-mini-stat-val">1,280</div>
                    <div className="hrms-mini-stat-lbl">Active Staff</div>
                  </div>
                  <div className="hrms-mini-stat">
                    <div className="hrms-mini-stat-val">98.4%</div>
                    <div className="hrms-mini-stat-lbl">Attendance</div>
                  </div>
                  <div className="hrms-mini-stat">
                    <div className="hrms-mini-stat-val">₹48.2L</div>
                    <div className="hrms-mini-stat-lbl">Processed Payroll</div>
                  </div>
                </div>

                <div className="hrms-visual-rows">
                  <div className="hrms-visual-row">
                    <div className="hrms-row-left">
                      <div className="hrms-row-avatar purple">SJ</div>
                      <div>
                        <div className="hrms-row-name">Sarah Jenkins</div>
                        <div className="hrms-row-dept">VP Engineering • Pune HQ</div>
                      </div>
                    </div>
                    <div className="hrms-row-right">
                      <span className="hrms-row-badge present">Biometric In 09:02 AM</span>
                    </div>
                  </div>

                  <div className="hrms-visual-row">
                    <div className="hrms-row-left">
                      <div className="hrms-row-avatar blue">RS</div>
                      <div>
                        <div className="hrms-row-name">Rahul Sharma</div>
                        <div className="hrms-row-dept">Product Lead • Bangalore</div>
                      </div>
                    </div>
                    <div className="hrms-row-right">
                      <span className="hrms-row-badge remote">Remote Punch (Geo-verified)</span>
                    </div>
                  </div>

                  <div className="hrms-visual-row">
                    <div className="hrms-row-left">
                      <div className="hrms-row-avatar teal">ER</div>
                      <div>
                        <div className="hrms-row-name">Elena Rostova</div>
                        <div className="hrms-row-dept">DevOps Architect • Remote</div>
                      </div>
                    </div>
                    <div className="hrms-row-right">
                      <span className="hrms-row-badge leave">Approved Paid Leave</span>
                    </div>
                  </div>

                  <div className="hrms-visual-row">
                    <div className="hrms-row-left">
                      <div className="hrms-row-avatar rose">MC</div>
                      <div>
                        <div className="hrms-row-name">Michael Chang</div>
                        <div className="hrms-row-dept">Senior AI Scientist • Mumbai</div>
                      </div>
                    </div>
                    <div className="hrms-row-right">
                      <span className="hrms-row-badge present">Biometric In 08:58 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Banner floating below hero */}
          <div className="hrms-stats-banner">
            <div className="hrms-stat-box">
              <div className="hrms-stat-num">
                <NumberTicker value={99.8} decimalPlaces={1} />%
              </div>
              <div className="hrms-stat-label">Payroll Calculation Accuracy</div>
            </div>
            <div className="hrms-stat-box">
              <div className="hrms-stat-num">
                <NumberTicker value={85} />%
              </div>
              <div className="hrms-stat-label">Reduction in HR Admin Overhead</div>
            </div>
            <div className="hrms-stat-box">
              <div className="hrms-stat-num">&lt; 2 Min</div>
              <div className="hrms-stat-label">Average Leave Approval Cycle</div>
            </div>
            <div className="hrms-stat-box">
              <div className="hrms-stat-num">100%</div>
              <div className="hrms-stat-label">Statutory Compliance Guarantee</div>
            </div>
          </div>
        </section>

        {/* ==========================================
            INTERACTIVE HRMS MODULE TABS
            ========================================== */}
        <section id="hrms-modules" className="hrms-modules-section">
          <div className="hrms-section-header">
            <div className="hrms-section-tag">
              <Zap size={14} /> Live System Simulation
            </div>
            <h2 className="hrms-section-title">Interactive HRMS Architecture Modules</h2>
            <p className="hrms-section-subtitle">
              Test drive the core engines of our custom HRMS platform. Experience how seamlessly our automated payroll, biometric tracking, and talent pipelines function.
            </p>
          </div>

          <div className="hrms-module-tabs" role="tablist" aria-label="HRMS Modules">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'payroll'}
              className={`hrms-tab-btn ${activeTab === 'payroll' ? 'active' : ''}`}
              onClick={() => setActiveTab('payroll')}
            >
              <DollarSign size={16} />
              <span>Automated Payroll & Compliance</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'attendance'}
              className={`hrms-tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              <Clock size={16} />
              <span>Biometric & Geo Attendance</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'leave'}
              className={`hrms-tab-btn ${activeTab === 'leave' ? 'active' : ''}`}
              onClick={() => setActiveTab('leave')}
            >
              <Calendar size={16} />
              <span>Dynamic Leave & Shift Rules</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'recruitment'}
              className={`hrms-tab-btn ${activeTab === 'recruitment' ? 'active' : ''}`}
              onClick={() => setActiveTab('recruitment')}
            >
              <Users size={16} />
              <span>AI Recruitment Pipeline</span>
            </button>
          </div>

          <div className="hrms-module-window">
            <div className="hrms-window-header">
              <div className="hrms-window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="hrms-window-title">
                {activeTab === 'payroll' && 'Module: Statutory Payroll Simulator (Formula-Driven Engine)'}
                {activeTab === 'attendance' && 'Module: Multi-Branch Attendance & Biometric Ingestion Engine'}
                {activeTab === 'leave' && 'Module: Leave Approval Engine & Multi-Tier Hierarchy'}
                {activeTab === 'recruitment' && 'Module: AI Candidate Scoring & Applicant Tracking (ATS)'}
              </div>
            </div>

            <div className="hrms-module-content" key={activeTab}>
              {/* Tab 1: Payroll */}
              {activeTab === 'payroll' && (
                <div className="hrms-payroll-grid">
                  <div className="hrms-payroll-breakdown">
                    <div className="hrms-payroll-item">
                      <span className="hrms-payroll-item-label">Basic Salary Component</span>
                      <span className="hrms-payroll-item-val">₹85,000.00</span>
                    </div>
                    <div className="hrms-payroll-item">
                      <span className="hrms-payroll-item-label">House Rent Allowance (HRA 40%)</span>
                      <span className="hrms-payroll-item-val">₹34,000.00</span>
                    </div>
                    <div className="hrms-payroll-item">
                      <span className="hrms-payroll-item-label">Special Allowance & Perks</span>
                      <span className="hrms-payroll-item-val">₹18,000.00</span>
                    </div>
                    <div className="hrms-payroll-item">
                      <span className="hrms-payroll-item-label">Provident Fund (PF Employee 12%)</span>
                      <span className="hrms-payroll-item-val deduction">- ₹4,800.00</span>
                    </div>
                    <div className="hrms-payroll-item">
                      <span className="hrms-payroll-item-label">Income Tax (TDS Slabs Deducted)</span>
                      <span className="hrms-payroll-item-val deduction">- ₹7,200.00</span>
                    </div>
                  </div>

                  <div className="hrms-payroll-summary">
                    <div className="hrms-payroll-net-label">Net Disbursable Salary</div>
                    <div className="hrms-payroll-net-val">₹1,25,000</div>
                    <div className="hrms-payroll-net-sub">
                      1-Click Bank Direct Transfer (NEFT/RTGS Batch File Generated) • Automated Payslip Dispatched via WhatsApp & Email
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Attendance */}
              {activeTab === 'attendance' && (
                <div className="hrms-attendance-grid">
                  <div className="hrms-attendance-card">
                    <div className="hrms-attendance-icon present-icon">
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="hrms-attendance-val">1,180</div>
                    <div className="hrms-attendance-lbl">Present On-Premise</div>
                  </div>
                  <div className="hrms-attendance-card">
                    <div className="hrms-attendance-icon remote-icon">
                      <Smartphone size={24} />
                    </div>
                    <div className="hrms-attendance-val">40</div>
                    <div className="hrms-attendance-lbl">Verified WFH (Geo-Fence)</div>
                  </div>
                  <div className="hrms-attendance-card">
                    <div className="hrms-attendance-icon late-icon">
                      <Clock size={24} />
                    </div>
                    <div className="hrms-attendance-val">18</div>
                    <div className="hrms-attendance-lbl">Grace Period Late-In</div>
                  </div>
                  <div className="hrms-attendance-card">
                    <div className="hrms-attendance-icon leave-icon">
                      <Calendar size={24} />
                    </div>
                    <div className="hrms-attendance-val">42</div>
                    <div className="hrms-attendance-lbl">Approved Leave Absence</div>
                  </div>
                </div>
              )}

              {/* Tab 3: Leave */}
              {activeTab === 'leave' && (
                <div className="hrms-leave-grid">
                  <div className="hrms-leave-list">
                    <div className="hrms-leave-item">
                      <div className="hrms-leave-info">
                        <div className="hrms-leave-name">Vikram Mehta (Senior Architect)</div>
                        <div className="hrms-leave-type">Annual Earned Leave • 3 Days (Oct 28 - Oct 30)</div>
                      </div>
                      <span className="hrms-leave-status approved">Approved by Manager</span>
                    </div>

                    <div className="hrms-leave-item">
                      <div className="hrms-leave-info">
                        <div className="hrms-leave-name">Priya Patel (UI/UX Designer)</div>
                        <div className="hrms-leave-type">Casual Leave • 1 Day (Nov 02)</div>
                      </div>
                      <span className="hrms-leave-status pending">Pending HR Review</span>
                    </div>

                    <div className="hrms-leave-item">
                      <div className="hrms-leave-info">
                        <div className="hrms-leave-name">Amit Sengupta (Security Analyst)</div>
                        <div className="hrms-leave-type">Medical Leave • 2 Days (Cert Uploaded)</div>
                      </div>
                      <span className="hrms-leave-status approved">Auto-Approved</span>
                    </div>
                  </div>

                  <div className="hrms-leave-balance-card">
                    <div className="hrms-leave-balance-title">Employee Balance Quotas</div>
                    <div className="hrms-leave-balance-row">
                      <span className="hrms-leave-balance-lbl">Paid Time Off (PTO)</span>
                      <span className="hrms-leave-balance-val">14 / 18 Days</span>
                    </div>
                    <div className="hrms-leave-balance-row">
                      <span className="hrms-leave-balance-lbl">Casual Leave (CL)</span>
                      <span className="hrms-leave-balance-val">8 / 12 Days</span>
                    </div>
                    <div className="hrms-leave-balance-row">
                      <span className="hrms-leave-balance-lbl">Medical Leave (ML)</span>
                      <span className="hrms-leave-balance-val">10 / 10 Days</span>
                    </div>
                    <div className="hrms-leave-balance-row">
                      <span className="hrms-leave-balance-lbl">Compensatory Off</span>
                      <span className="hrms-leave-balance-val">2 Days Available</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Recruitment */}
              {activeTab === 'recruitment' && (
                <div className="hrms-recruit-pipeline">
                  <div className="hrms-recruit-col">
                    <div className="hrms-recruit-col-header applied">
                      <span>Applied (24)</span>
                    </div>
                    <div className="hrms-recruit-card">
                      <div className="hrms-recruit-name">Ananya Roy</div>
                      <div className="hrms-recruit-role">Frontend React Lead</div>
                      <span className="hrms-recruit-score">AI Match 94%</span>
                    </div>
                    <div className="hrms-recruit-card">
                      <div className="hrms-recruit-name">Siddharth Rao</div>
                      <div className="hrms-recruit-role">DevOps Engineer</div>
                      <span className="hrms-recruit-score">AI Match 88%</span>
                    </div>
                  </div>

                  <div className="hrms-recruit-col">
                    <div className="hrms-recruit-col-header screening">
                      <span>Screening (8)</span>
                    </div>
                    <div className="hrms-recruit-card">
                      <div className="hrms-recruit-name">Kavita Nair</div>
                      <div className="hrms-recruit-role">Full-Stack Architect</div>
                      <span className="hrms-recruit-score">AI Match 96%</span>
                    </div>
                  </div>

                  <div className="hrms-recruit-col">
                    <div className="hrms-recruit-col-header interview">
                      <span>Technical Round (5)</span>
                    </div>
                    <div className="hrms-recruit-card">
                      <div className="hrms-recruit-name">Daniel Martinez</div>
                      <div className="hrms-recruit-role">Senior Cloud Engineer</div>
                      <span className="hrms-recruit-score">AI Match 92%</span>
                    </div>
                  </div>

                  <div className="hrms-recruit-col">
                    <div className="hrms-recruit-col-header offered">
                      <span>Offer Extended (2)</span>
                    </div>
                    <div className="hrms-recruit-card">
                      <div className="hrms-recruit-name">Rohan Varma</div>
                      <div className="hrms-recruit-role">Product Marketing Mgr</div>
                      <span className="hrms-recruit-score">Accepted</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================
            6 CORE HRMS MODULE PILLARS
            ========================================== */}
        <section className="hrms-pillars-section">
          <div className="hrms-section-header">
            <div className="hrms-section-tag">
              <Building2 size={14} /> Modular Architecture
            </div>
            <h2 className="hrms-section-title">6 Core Pillars of Custom HRMS Software</h2>
            <p className="hrms-section-subtitle">
              Engineered as independent, microservice-ready modules designed to scale from 50 to 50,000+ employees without performance lag.
            </p>
          </div>

          <div className="hrms-pillars-grid">
            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(124, 58, 237, 0.2)">
              <div className="hrms-pillar-icon"><DollarSign size={24} /></div>
              <h3 className="hrms-pillar-title">Statutory-Compliant Payroll</h3>
              <p className="hrms-pillar-desc">
                Automate multi-tier wage calculations, PF, ESI, state Professional Tax, and new/old income tax deductions with automatic bank disbursement files.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> 1-Click payslip generation & WhatsApp push</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Automated Form 16 & statutory tax schedules</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Bonus, arrears & loan advance adjustments</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(59, 130, 246, 0.2)">
              <div className="hrms-pillar-icon"><Clock size={24} /></div>
              <h3 className="hrms-pillar-title">Biometric & Geo Attendance</h3>
              <p className="hrms-pillar-desc">
                Unify hardware fingerprint and facial recognition scanners across multiple factory, branch, or retail sites into a unified cloud timesheet.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Real-time biometric socket sync (eSSL, ZKTeco)</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> GPS geo-fenced mobile clock-in for field reps</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Automated overtime & late-mark calculations</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(20, 184, 166, 0.2)">
              <div className="hrms-pillar-icon"><Calendar size={24} /></div>
              <h3 className="hrms-pillar-title">Leave & Shift Rostering</h3>
              <p className="hrms-pillar-desc">
                Configure your organization's exact leave policies, accrual rules, rotational night shifts, and hierarchical approval workflows.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Multi-tiered manager & HR approval trees</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Dynamic shift allocation with auto-swap alerts</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Encashment & year-end carry-forward logic</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(245, 158, 11, 0.2)">
              <div className="hrms-pillar-icon"><Award size={24} /></div>
              <h3 className="hrms-pillar-title">Performance & OKRs Engine</h3>
              <p className="hrms-pillar-desc">
                Track quantitative sales KPIs, engineering sprint completions, and 360-degree feedback reviews with customized appraisal rating scales.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Quarterly OKR setting & milestone tracking</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> 360-degree peer, manager, and self evaluations</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Automated promotion and increment modeling</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div className="hrms-pillar-icon"><Users size={24} /></div>
              <h3 className="hrms-pillar-title">AI Applicant Tracking (ATS)</h3>
              <p className="hrms-pillar-desc">
                Automate resume parsing, candidate scoring, interview scheduling, and paperless digital onboarding with e-signature capabilities.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Semantic AI resume ranking against job specs</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Automated interview invite calendar sync</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> 1-Click offer letter dispatch & digital signing</li>
              </ul>
            </SpotlightCard>

            <SpotlightCard className="hrms-pillar-card" spotlightColor="rgba(244, 63, 94, 0.2)">
              <div className="hrms-pillar-icon"><Lock size={24} /></div>
              <h3 className="hrms-pillar-title">Employee Self-Service (ESS)</h3>
              <p className="hrms-pillar-desc">
                Empower your workforce with modern web and mobile apps to download payslips, submit tax declarations, apply for leaves, and raise IT tickets.
              </p>
              <ul className="hrms-pillar-list">
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Responsive mobile PWA & iOS/Android portal</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Proof of investment & tax regime selector</li>
                <li className="hrms-pillar-list-item"><Check size={14} color="#a78bfa" /> Company announcements & document repository</li>
              </ul>
            </SpotlightCard>
          </div>
        </section>

        {/* ==========================================
            ENTERPRISE ARCHITECTURE STANDARDS & CAPABILITIES
            ========================================== */}
        <section className="hrms-capabilities-section">
          <div className="hrms-section-header">
            <div className="hrms-section-tag">
              <ShieldCheck size={14} /> Enterprise Standards
            </div>
            <h2 className="hrms-section-title">HRMS Engineering & Capability Standards</h2>
            <p className="hrms-section-subtitle">
              Engineered with enterprise security, complete data sovereignty, and unconstrained scalability for mission-critical workforce management.
            </p>
          </div>

          <div className="hrms-capabilities-table-wrap">
            <table className="hrms-capabilities-table">
              <thead>
                <tr>
                  <th>Architectural Dimension</th>
                  <th>Gyan VaniAi Custom HRMS Delivery Standards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Licensing & User Costs</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> Zero Per-Employee Fees (Flat Enterprise Tier with Unlimited Users)</span></td>
                </tr>
                <tr>
                  <td><strong>Payroll Processing</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> Fully Automated Indian & Global Multi-Entity Compliance (PF, ESI, TDS, PT)</span></td>
                </tr>
                <tr>
                  <td><strong>Attendance Ingestion</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> Hardware Biometric Device API (eSSL, ZKTeco) + GPS Mobile Geofencing</span></td>
                </tr>
                <tr>
                  <td><strong>Custom Workflow Rules</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> 100% Tailored Approval Hierarchies, Shift Policies & Leave Accrual Logic</span></td>
                </tr>
                <tr>
                  <td><strong>Data Security & Privacy</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> AES-256 Encryption at Rest, TLS 1.3, SOC2-Ready & DPDP Act 2023 Compliant</span></td>
                </tr>
                <tr>
                  <td><strong>Code & Database Ownership</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> 100% Client Ownership (Deploy to Your AWS/GCP or On-Premise Servers)</span></td>
                </tr>
                <tr>
                  <td><strong>ERP & Bank Integrations</strong></td>
                  <td><span className="hrms-check-badge"><Check size={14} /> Bi-directional sync with SAP, Oracle, Zoho Books, Tally & Bank Disbursement APIs</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            DEVELOPMENT PROCESS LIFECYCLE
            ========================================== */}
        <section className="hrms-process-section">
          <div className="hrms-section-header">
            <div className="hrms-section-tag">
              <Workflow size={14} /> Engineering Process
            </div>
            <h2 className="hrms-section-title">Our Custom HRMS Development Methodology</h2>
            <p className="hrms-section-subtitle">
              A battle-tested 6-step agile implementation roadmap that guarantees zero payroll errors, smooth biometric onboarding, and on-time go-live.
            </p>
          </div>

          <div className="hrms-process-grid">
            <div className="hrms-process-step">
              <div className="hrms-step-num">01</div>
              <h3 className="hrms-step-title">HR Policy & Compliance Audit</h3>
              <p className="hrms-step-desc">
                We analyze your employee bands, compensation structures, shift timings, state tax jurisdictions, and hierarchical approval rules.
              </p>
            </div>

            <div className="hrms-process-step">
              <div className="hrms-step-num">02</div>
              <h3 className="hrms-step-title">Database & Security Architecture</h3>
              <p className="hrms-step-desc">
                We design normalized relational database schemas with field-level encryption, multi-tenant RBAC permissions, and audit log tables.
              </p>
            </div>

            <div className="hrms-process-step">
              <div className="hrms-step-num">03</div>
              <h3 className="hrms-step-title">Biometric & Bank API Wiring</h3>
              <p className="hrms-step-desc">
                Our engineers integrate your branch biometric fingerprint/face scanners and connect banking APIs for automated salary disbursement.
              </p>
            </div>

            <div className="hrms-process-step">
              <div className="hrms-step-num">04</div>
              <h3 className="hrms-step-title">ESS & Admin Portal Engineering</h3>
              <p className="hrms-step-desc">
                We build sleek, responsive web and mobile interfaces with dark/light themes, instant leave status counters, and intuitive approval queues.
              </p>
            </div>

            <div className="hrms-process-step">
              <div className="hrms-step-num">05</div>
              <h3 className="hrms-step-title">Historical Data ETL & Parallel Runs</h3>
              <p className="hrms-step-desc">
                We migrate legacy employee records, accrued leaves, and run parallel payroll validation against your existing system to ensure 100% accuracy.
              </p>
            </div>

            <div className="hrms-process-step">
              <div className="hrms-step-num">06</div>
              <h3 className="hrms-step-title">Enterprise Deployment & SLA</h3>
              <p className="hrms-step-desc">
                We deploy the platform to your cloud infrastructure, train your HR leadership and employees, and provide 24/7 technical monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            AI FACTS ANSWER SUMMARY BLOCK (SEO/AEO)
            ========================================== */}
        <section style={{ margin: '4rem 0' }}>
          <AiAnswerSummaryBlock 
            title="Gyan VaniAi Custom HRMS Software: Key Facts"
            facts={hrmsAiFacts}
          />
        </section>

        {/* ==========================================
            FAQ ACCORDION SECTION
            ========================================== */}
        <section className="hrms-faq-section">
          <div className="hrms-section-header">
            <div className="hrms-section-tag">
              <HelpCircle size={14} /> Common Inquiries
            </div>
            <h2 className="hrms-section-title">Frequently Asked Questions</h2>
            <p className="hrms-section-subtitle">
              Clear answers regarding custom HRMS implementation, data migration, hardware integrations, and code ownership.
            </p>
          </div>

          <div className="hrms-faq-list">
            {faqData.map((faq, idx) => (
              <div key={idx} className={`hrms-faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <div className="hrms-faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={20} color="#a78bfa" /> : <ChevronDown size={20} color="#94a3b8" />}
                </div>
                {openFaqIndex === idx && (
                  <div className="hrms-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internal Cross-Linking Section */}
        <RelatedLinks currentSlug="hrms-development" />

        {/* High-Converting Footer Contact CTA */}
        <ContactSection prefillService="HRMS Development" />
      </div>
    </div>
  );
}
