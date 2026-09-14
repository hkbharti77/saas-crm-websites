import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Activity,
  HeartPulse,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus,
  Minus,
  Users,
  Database,
  Lock,
  Stethoscope,
  Building2,
  BrainCircuit,
  Bot,
  Zap,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  Check
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './HealthcarePage.css';

const SITE = 'https://www.gyanvaniai.online';

export default function HealthcarePage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [patientCount, setPatientCount] = useState(1500);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Simulator Steps
  const simulatorSteps = [
    {
      id: 'whatsapp',
      tabTitle: '1. WhatsApp Inquiry',
      icon: <MessageSquare size={16} />,
      patientMsg: 'Hi, I need an urgent consultation for acute knee pain with Dr. Sharma tomorrow morning.',
      aiResponse: 'Hello! Dr. Sharma has open slots tomorrow at 10:15 AM and 11:30 AM. Would you like me to reserve 10:15 AM?',
      badge: 'WhatsApp API Ingestion',
      statusNote: 'Real-time NLP intent detection & slot availability check'
    },
    {
      id: 'triage',
      tabTitle: '2. AI Symptom Triage',
      icon: <BrainCircuit size={16} />,
      patientMsg: '10:15 AM works! Pain started 2 days ago after running.',
      aiResponse: 'Slot confirmed for 10:15 AM! I have logged your symptom note: "Acute knee pain post-running (2-day onset)". Please complete the 30-sec digital triage form.',
      badge: 'Clinical Risk Stratification',
      statusNote: 'Automated triage tags generated for Doctor EMR briefing'
    },
    {
      id: 'scheduling',
      tabTitle: '3. Smart Slot Booking',
      icon: <Calendar size={16} />,
      patientMsg: 'Thank you! Sent the intake form.',
      aiResponse: 'Appointment booked! Calendar invite & directions sent. We will send a WhatsApp reminder 2 hours prior.',
      badge: 'Doctor Roster Sync',
      statusNote: 'Calendar lock + automatic SMS/WhatsApp notification trigger'
    },
    {
      id: 'ehr',
      tabTitle: '4. EMR Record Sync',
      icon: <Database size={16} />,
      patientMsg: 'System Action',
      aiResponse: 'Patient record #HC-9421 created. Symptoms, pre-consult form, and WhatsApp transcript attached to Dr. Sharma’s EHR queue.',
      badge: 'HIPAA & ABDM Compliant Sync',
      statusNote: '256-bit encrypted data dispatch to hospital EMR system'
    }
  ];

  // ROI Calculator Math
  const hoursSavedPerMonth = Math.round((patientCount * 4) / 60);
  const noShowsPrevented = Math.round(patientCount * 0.18);
  const monthlySavingsUSD = Math.round(patientCount * 6.5);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi Healthcare CRM help reduce appointment no-shows?',
      a: 'Our solution automates 2-way WhatsApp appointment confirmations, 24-hour & 2-hour reminders with 1-click rescheduling options. Automated messaging channels have a 98% open rate compared to 15% for email, reducing no-shows by up to 68%.'
    },
    {
      q: 'Is the platform HIPAA compliant and ABDM certified?',
      a: 'Yes. All patient interactions, medical records, and automated transcripts are stored in tenant-isolated, 256-bit AES encrypted environments. We enforce strict role-based access control (RBAC), audit logging, and ABDM (Ayushman Bharat Digital Mission) compliance standards.'
    },
    {
      q: 'Can the system integrate with our existing EMR / EHR software?',
      a: 'Yes. We support custom API integrations, HL7, and FHIR standards to sync patient demographics, appointment schedules, and consultation notes directly into software like Epic, Cerner, Practo, or custom hospital databases.'
    },
    {
      q: 'Can patients receive lab reports and prescription updates on WhatsApp?',
      a: 'Absolutely. Once a diagnostic lab report or prescription is signed off by a clinical physician, our pipeline delivers secure, password-protected PDF files to the patient on WhatsApp automatically.'
    },
    {
      q: 'How fast can a clinic or hospital network deploy this platform?',
      a: 'Single-location specialty clinics can go live in under 7 business days. Multi-branch hospital groups and multi-specialty diagnostic networks typically complete deployment within 3 to 4 weeks including staff training.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Healthcare CRM & Patient Automation Platform 2026 | Gyan VaniAi</title>
        <meta
          name="description"
          content="Modern 2026 Healthcare CRM with AI symptom triage, WhatsApp patient appointment automation, EMR sync, and HIPAA compliant clinical workflows."
        />
        <meta
          name="keywords"
          content="Healthcare CRM, Patient Automation, WhatsApp Appointment Booking, EMR Integration, HIPAA Compliant CRM, Clinical AI Triage, ABDM Ready"
        />
        <link rel="canonical" href={`${SITE}/industries/healthcare`} />
        <meta property="og:title" content="Healthcare CRM & Patient Automation Platform | Gyan VaniAi" />
        <meta
          property="og:description"
          content="Transform patient engagement with automated WhatsApp bookings, AI clinical triage, and secure EMR integration."
        />
        <meta property="og:image" content={`${SITE}/healthcare_hero_platform.jpg`} />
      </Helmet>

      <div className="healthcare-page">
        {/* Ambient Glow Aura */}
        <div className="hc-bg-glow-1"></div>

        {/* --- STREAMLINED ELEGANT HERO SECTION --- */}
        <section className="hc-hero">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li>/</li>
                <li>Industries</li>
                <li>/</li>
                <li style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Healthcare</li>
              </ol>
            </nav>

            <div className="hc-hero-grid">
              {/* Left Column: Focused Copy & Action CTAs */}
              <div>
                <div className="hc-hero-badge">
                  <span className="hc-pulse-dot"></span>
                  <span>HEALTHCARE CRM AUTOMATION</span>
                </div>

                <h1 className="hc-hero-title">
                  Healthcare CRM & <span className="hc-gradient-text">Patient Engagement</span>
                </h1>

                <p className="hc-hero-subtitle">
                  Automate WhatsApp patient bookings, AI symptom triage, and EMR records in one connected 2026 clinical platform.
                </p>

                <div className="hc-hero-cta-group">
                  <button
                    type="button"
                    className="hc-btn-primary"
                    onClick={() => handleOpenDemo('Healthcare CRM Consultation')}
                  >
                    Schedule Clinic Demo <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    className="hc-btn-link"
                    onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Calculate ROI <ChevronRight size={16} />
                  </button>
                </div>

                <div className="hc-hero-trust-micro">
                  <div className="hc-trust-check">
                    <Check size={16} color="var(--primary-color)" /> HIPAA & ABDM Ready
                  </div>
                  <div>•</div>
                  <div className="hc-trust-check">
                    <Check size={16} color="var(--primary-color)" /> 68% Fewer No-Shows
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Uncluttered Visual Showcase Frame */}
              <div className="hc-hero-visual-wrapper">
                <div className="hc-hero-frame">
                  <img
                    src="/healthcare_hero_platform.jpg"
                    alt="2026 Healthcare CRM and Patient Engagement Platform Dashboard by Gyan VaniAi"
                    width="1000"
                    height="562"
                    className="hc-hero-img"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMPLIANCE & INTEGRATION TRUST MARQUEE --- */}
        <section className="hc-trust-bar">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div className="hc-trust-grid">
              <div className="hc-trust-item"><ShieldCheck size={18} color="var(--primary-color)" /> HIPAA Compliant</div>
              <div className="hc-trust-item"><HeartPulse size={18} color="var(--hc-emerald)" /> ABDM Digital Ready</div>
              <div className="hc-trust-item"><Lock size={18} color="var(--primary-color)" /> 256-Bit AES Encrypted</div>
              <div className="hc-trust-item"><Database size={18} color="var(--hc-emerald)" /> Epic & Cerner FHIR Sync</div>
              <div className="hc-trust-item"><Award size={18} color="var(--primary-color)" /> SOC2 Type II Certified</div>
            </div>
          </div>
        </section>

        {/* --- DEDICATED INTERACTIVE CLINICAL SIMULATOR SECTION --- */}
        <section className="container" style={{ maxWidth: '1280px' }}>
          <div className="hc-sim-section">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="hc-hero-badge">INTERACTIVE SIMULATOR</span>
              <h2 className="h2" style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
                Test the Live Patient Journey Simulator
              </h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Click tabs below to simulate how patients inquire, triage symptoms, and sync records into your EMR.
              </p>
            </div>

            <div className="hc-simulator-container">
              <div className="hc-simulator-header">
                <div className="hc-window-dots">
                  <span className="hc-dot hc-dot-red"></span>
                  <span className="hc-dot hc-dot-yellow"></span>
                  <span className="hc-dot hc-dot-green"></span>
                </div>
                <span style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> CLINICAL AUTOMATION SIMULATOR
                </span>
              </div>

              <div className="hc-sim-tabs">
                {simulatorSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`hc-sim-tab ${activeSimTab === index ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(index)}
                  >
                    {step.icon}
                    {step.tabTitle}
                  </button>
                ))}
              </div>

              <div className="hc-sim-body">
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="hc-chip">{simulatorSteps[activeSimTab].badge}</span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {simulatorSteps[activeSimTab].statusNote}
                  </span>
                </div>

                <div className="hc-chat-preview">
                  <div className="hc-chat-msg hc-chat-patient">
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.2rem', fontWeight: '600' }}>Patient Inbound (WhatsApp)</div>
                    <div>{simulatorSteps[activeSimTab].patientMsg}</div>
                  </div>

                  <div className="hc-chat-msg hc-chat-ai">
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Bot size={15} /> Clinical AI Engine
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
              <span className="hc-hero-badge">CLINICAL CAPABILITIES</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800' }}>
                Built around how modern medical teams work
              </h2>
              <p className="text-muted" style={{ fontSize: '1rem', marginTop: '0.75rem' }}>
                Reimagining patient care management with intelligent automation, WhatsApp connectivity, and unified EHR records.
              </p>
            </div>

            <div className="hc-bento-grid">
              {/* Card 1 */}
              <div className="hc-bento-card hc-bento-card-1 hc-bento-col-8">
                <div className="hc-bento-icon-wrapper">
                  <MessageSquare size={24} />
                </div>
                <h3 className="hc-bento-title">WhatsApp Patient Communication Desk</h3>
                <p className="hc-bento-desc">
                  Automate 2-way patient inquiries, appointment confirmations, lab result dispatch, and medication reminders through official WhatsApp Business API. Prevent missed appointments with automated 1-click rescheduling.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="hc-chip">Instant Confirmation</span>
                  <span className="hc-chip">Lab PDF Dispatch</span>
                  <span className="hc-chip">2-Way Rescheduling</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="hc-bento-card hc-bento-card-2 hc-bento-col-4">
                <div className="hc-bento-icon-wrapper">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="hc-bento-title">AI Clinical Triage</h3>
                <p className="hc-bento-desc">
                  Gather preliminary symptom notes, medical histories, and risk levels prior to consultation. Physicians receive concise summary briefs before walking into the exam room.
                </p>
              </div>

              {/* Card 3 */}
              <div className="hc-bento-card hc-bento-card-3 hc-bento-col-4">
                <div className="hc-bento-icon-wrapper">
                  <Database size={24} />
                </div>
                <h3 className="hc-bento-title">360° Patient EMR Timeline</h3>
                <p className="hc-bento-desc">
                  Consolidate patient visit histories, prescription logs, lab reports, and WhatsApp chat history into one secure, searchable patient portal for clinical staff.
                </p>
              </div>

              {/* Card 4 */}
              <div className="hc-bento-card hc-bento-card-4 hc-bento-col-8">
                <div className="hc-bento-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <h3 className="hc-bento-title">Multi-Specialty Roster & Slot Management</h3>
                <p className="hc-bento-desc">
                  Manage complex doctor rosters, multi-branch clinic room allocations, and patient queues. Automatically balance appointment loads across specialists and minimize waiting room congestion.
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="hc-chip">Multi-Branch Sync</span>
                  <span className="hc-chip">Room Allocations</span>
                  <span className="hc-chip">Queue Management</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE ROI CALCULATOR --- */}
        <section id="roi-calculator" className="container" style={{ maxWidth: '1280px' }}>
          <div className="hc-roi-box">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <span className="hc-hero-badge">ESTIMATE YOUR SAVINGS</span>
                <h2 className="h2" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                  Calculate Your Monthly Efficiency & Cost Savings
                </h2>
                <p className="text-muted" style={{ marginBottom: '1.75rem' }}>
                  Adjust the slider to your clinic’s average monthly patient volume to see estimated staff hours saved and revenue recovered from prevented no-shows.
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <span>Monthly Active Patients</span>
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>{patientCount.toLocaleString()} Patients</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="10000"
                    step="100"
                    value={patientCount}
                    onChange={(e) => setPatientCount(Number(e.target.value))}
                    className="hc-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>200</span>
                    <span>5,000</span>
                    <span>10,000+</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="hc-roi-stat-box">
                  <Clock size={24} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    {hoursSavedPerMonth.toLocaleString()} hrs
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Staff Time Saved / Mo</div>
                </div>

                <div className="hc-roi-stat-box">
                  <Users size={24} color="var(--hc-emerald)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--hc-emerald)' }}>
                    {noShowsPrevented.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>No-Shows Prevented / Mo</div>
                </div>

                <div className="hc-roi-stat-box" style={{ gridColumn: 'span 2' }}>
                  <TrendingUp size={24} color="var(--primary-color)" style={{ marginInline: 'auto', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                    ${monthlySavingsUSD.toLocaleString()} / mo
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Estimated Operational Value Saved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CLINICAL WORKFLOW SECTION WITH GENERATED ARCHITECTURE VISUAL --- */}
        <section className="section" style={{ padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="hc-hero-badge">WORKFLOW ARCHITECTURE</span>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.35rem)', fontWeight: '800' }}>
                End-to-End Clinical Automation Flow
              </h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                From initial patient query on WhatsApp to secure EMR integration and post-consult follow-up.
              </p>
            </div>

            <div style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', marginBottom: '2.5rem' }}>
              <img
                src="/healthcare_workflow_preview.jpg"
                alt="Modern AI Healthcare Workflow Architecture - Node 1 Patient WhatsApp inquiry, Node 2 AI symptom triage, Node 3 Automatic doctor appointment scheduling, Node 4 Electronic Health Record EHR sync"
                width="1200"
                height="675"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>

            <div className="hc-workflow-steps">
              <div className="hc-workflow-step">
                <div className="hc-step-number">NODE 01</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Patient Inbound</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Patient initiates conversation via WhatsApp Business API, website widget, or QR code scanning at clinic desk.
                </p>
              </div>

              <div className="hc-workflow-step">
                <div className="hc-step-number">NODE 02</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>AI Symptom Triage</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Intelligent NLP evaluates symptom urgency, flags red flags for priority doctor review, and categorizes specialties.
                </p>
              </div>

              <div className="hc-workflow-step">
                <div className="hc-step-number">NODE 03</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Automated Booking</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  System syncs doctor availability calendars, locks appointment slot, and sends instant calendar invite to patient.
                </p>
              </div>

              <div className="hc-workflow-step">
                <div className="hc-step-number">NODE 04</div>
                <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Secure EHR Sync</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                  Patient intake data, pre-consult responses, and records sync into hospital EHR with 256-bit AES encryption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CLINICAL CASE STUDIES / IMPACT --- */}
        <section className="hc-case-section">
          <div className="container" style={{ maxWidth: '1280px' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', marginInline: 'auto', marginBottom: '2.5rem' }}>
              <span className="hc-hero-badge">INDUSTRY BENCHMARKS & WORKFLOWS</span>
              <h2 className="h2" style={{ fontSize: '2.1rem', fontWeight: '800' }}>
                Healthcare Automation Benchmarks & Target Outcomes
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <Building2 size={22} color="var(--primary-color)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0 }}>Multi-Specialty Hospital Network</h3>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Use Case: Booking & Triage Automation</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.925rem', lineHeight: '1.55' }}>
                  Deploying automated WhatsApp appointment scheduling and symptom triage targets up to 65% reduction in front-desk phone queue bottlenecks and cuts patient no-shows significantly.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>Up to 65%</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Call Volume Offloading</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--hc-emerald)' }}>Up to 70%</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>No-Show Reduction Target</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <Stethoscope size={22} color="var(--hc-emerald)" />
                  <div>
                    <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0 }}>Diagnostic & Pathology Chain</h3>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Use Case: Automated Lab PDF Dispatch</span>
                  </div>
                </div>
                <p className="text-muted" style={{ fontSize: '0.925rem', lineHeight: '1.55' }}>
                  Automating diagnostic test report delivery over official WhatsApp API eliminates manual front-desk retrievals. Patients receive secure lab reports within seconds of verification.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--hc-emerald)' }}>&lt; 30 Seconds</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Report Dispatch Speed</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-color)' }}>99.4%</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Message Delivery Rate</div>
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
              <span className="hc-hero-badge">GOT QUESTIONS?</span>
              <h2 className="h2" style={{ fontSize: '2.1rem', fontWeight: '800' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {faqs.map((faq, index) => (
                <div key={index} className={`hc-faq-item ${openFaq === index ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="hc-faq-button"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? <Minus size={18} color="var(--primary-color)" /> : <Plus size={18} />}
                  </button>
                  {openFaq === index && (
                    <div className="hc-faq-answer">
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
            title="Ready to Modernize Your Healthcare Platform?"
            subtitle="Book a custom demo with our clinical solutions engineering team to evaluate WhatsApp appointment automation and EHR integration."
          />
        </div>
      </div>
    </>
  );
}
