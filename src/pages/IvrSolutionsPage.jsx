import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import {
  PhoneCall,
  Headset,
  Mic,
  BrainCircuit,
  Database,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  MessageSquare,
  Activity,
  Layers,
  Sparkles,
  Plus,
  Minus,
  Bot,
  Sliders,
  TrendingUp,
  Clock,
  Radio,
  Server,
  ChevronRight,
  Check,
  Globe,
  Headphones
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './IvrSolutionsPage.css';

const SITE = 'https://www.gyanvaniai.com';

export default function IvrSolutionsPage() {
  const [activeSimTab, setActiveSimTab] = useState(0);
  const [callVolume, setCallVolume] = useState(8000);
  const [currency, setCurrency] = useState('INR');
  const [openFaq, setOpenFaq] = useState(0);

  // Live Call Simulation Steps
  const simulatorSteps = [
    {
      id: 'natural_speech',
      tabTitle: '1. Spoken Request',
      icon: <Mic size={16} />,
      callerMsg: '"Hi, I placed an order yesterday for priority delivery, but I need to update my shipping address before it leaves the warehouse."',
      aiResponse: 'Caller detected: Phone matching account #GV-8921 (Arjun Mehta). ASR confidence: 99.4%. Intent: "Address Change - Active Order". Querying live logistics database...',
      badge: 'Natural Acoustic ASR Ingestion',
      statusNote: 'Sub-180ms neural speech transcription with regional accent modeling'
    },
    {
      id: 'crm_dip',
      tabTitle: '2. Instant CRM Data Dip',
      icon: <Database size={16} />,
      callerMsg: 'Customer Verification',
      aiResponse: 'Hello Arjun! I see order #GV-9821 placed yesterday for express delivery is currently in processing. Would you like to update the delivery address to your registered office address or specify a new one?',
      badge: 'Real-Time CRM Data Dip',
      statusNote: 'Sub-120ms webhook query to enterprise CRM and warehouse management system'
    },
    {
      id: 'autonomous_resolution',
      tabTitle: '3. Voice Self-Service',
      icon: <BrainCircuit size={16} />,
      callerMsg: '"Please change it to my office address in Connaught Place."',
      aiResponse: 'Done! Your order #GV-9821 has been updated to your Connaught Place office. I have also sent an instant tracking confirmation and receipt link directly to your WhatsApp.',
      badge: 'Autonomous Task Completion',
      statusNote: 'Warehouse API update + immediate WhatsApp confirmation dispatch'
    },
    {
      id: 'sip_escalation',
      tabTitle: '4. Contextual SIP Transfer',
      icon: <PhoneCall size={16} />,
      callerMsg: '"Can I also speak to a logistics specialist regarding recurring bulk shipping rates?"',
      aiResponse: 'Transferring to VIP Enterprise Logistics queue via SIP REFER. Agent Screen-Pop initiated: Complete audio transcript, verified account #GV-8921, and inquiry summary attached.',
      badge: 'Zero-Drop Human Handoff',
      statusNote: 'Telephony SIP handoff completed without caller repeating any information'
    }
  ];

  // Realistic Enterprise Telephony Economics:
  // - 65% tier-1 inquiry deflection rate (order tracking, cancellations, FAQs, scheduling)
  // - Average Handle Time (AHT) = 4.5 minutes
  // - India (INR): Live agent call cost = ₹10 | Smart IVR automated call cost = ₹1.80 | Net savings = ₹8.20/call
  // - Global (USD): Live agent call cost = $1.25 | Smart IVR automated call cost = $0.22 | Net savings = $0.95/call
  const deflectionRate = 0.65;
  const deflectedCalls = Math.round(callVolume * deflectionRate);
  const hoursSavedPerMonth = Math.round((deflectedCalls * 4.5) / 60);

  const isINR = currency === 'INR';
  const currencySymbol = isINR ? '₹' : '$';
  const humanCallCost = isINR ? '₹10' : '$1.25';
  const ivrCallCost = isINR ? '₹1.80' : '$0.22';
  const netSavingsPerCall = isINR ? 8.20 : 0.95;

  const monthlySavings = Math.round(deflectedCalls * netSavingsPerCall);
  const annualSavings = monthlySavings * 12;
  const fcrImprovement = 42;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleOpenDemo = (prefill) => {
    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { prefill } }));
  };

  const faqs = [
    {
      q: 'How does Gyan VaniAi Smart IVR identify callers before they even press a key?',
      a: 'When an incoming call connects through our SIP trunking gateway, the system performs a sub-200ms real-time database dip using the caller’s phone number (ANI/CLI). It queries your CRM or ERP to pull the customer profile, open tickets, recent orders, or subscription tier, allowing the voice AI to greet the caller by name and anticipate their request.'
    },
    {
      q: 'Can the Smart IVR system understand Indian accents and multiple languages?',
      a: 'Yes. Our neural speech recognition (ASR) engine is trained on diverse acoustic models covering English, Hindi, Hinglish, and over 40+ regional dialects. It handles ambient noise, interruptions, and natural colloquial speech effortlessly without forcing users into rigid touch-tone menus.'
    },
    {
      q: 'What PBX systems, telephony carriers, and SIP gateways are supported?',
      a: 'We integrate with all industry-standard telephony stacks: Asterisk, FreeSWITCH, Twilio, Exotel, Tata Tele Business Services, Cisco Webex, Avaya, and Microsoft Teams Phone via standard RFC-compliant SIP trunking and WebSockets.'
    },
    {
      q: 'How does live human escalation work when a caller asks for an agent?',
      a: 'The system performs a contextual warm transfer via SIP REFER or softswitch bridge. Before the human agent answers, an automated screen-pop displays the caller’s verified identity, full conversational transcript, sentiment score, and recommended next action so the caller never repeats themselves.'
    },
    {
      q: 'Can callers receive receipts or documents over WhatsApp during the call?',
      a: 'Yes. Through our unified Omnichannel Engine, the voice IVR can trigger official WhatsApp Business API templates in real-time. Callers can receive payment links, address confirmation forms, or ticket numbers directly to their WhatsApp while staying on the line or after concluding the call.'
    }
  ];

  const pageUrl = `${SITE}/services/ivr-solutions`;
  const pageTitle = 'Smart IVR Solutions & Conversational Voice Routing | Gyan VaniAi';
  const pageDescription = 'Enterprise Conversational IVR systems with real-time speech recognition (ASR), CRM database-dips, and sub-second SIP call escalation.';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Smart IVR Solutions & Conversational Voice Routing',
    serviceType: 'Intelligent Telephony & Conversational IVR',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: ['India', 'United States', 'United Kingdom', 'Middle East', 'Worldwide'],
    description: pageDescription,
    url: pageUrl,
    image: `${SITE}/ivr-solutions-hero.webp`
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/` },
      { '@type': 'ListItem', position: 3, name: 'Smart IVR Solutions', item: pageUrl }
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
        keywords="Smart IVR, Conversational IVR, Speech Recognition ASR, CRM Data Dip, Intelligent Call Routing, SIP Trunking, Contact Center Automation, Gyan VaniAi"
        canonical={pageUrl}
        image={`${SITE}/ivr-solutions-hero.webp`}
        schema={[serviceSchema, breadcrumbSchema, faqSchema]}
        aeoQuestion="What is Gyan VaniAi Smart IVR?"
        aeoAnswer="Gyan VaniAi Smart IVR is an enterprise conversational voice telephony system that replaces rigid DTMF touch-tone menus with real-time speech recognition, sub-200ms CRM database dips, and instant SIP agent transfer."
      />

      <div className="ivr-page">
        <div className="ivr-bg-glow-1" />
        <div className="ivr-bg-glow-2" />

        {/* --- EXECUTIVE HERO SECTION --- */}
        <section className="ivr-hero">
          <div className="ivr-container">
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>Services</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Smart IVR Solutions</li>
              </ol>
            </nav>

            <div className="ivr-hero-grid">
              {/* Left Column: Focused Copy & Action CTAs */}
              <div>
                <div className="ivr-badge">
                  <span className="ivr-pulse-dot" />
                  <span>2026 CONVERSATIONAL TELEPHONY & IVR</span>
                </div>

                <h1 className="ivr-hero-title">
                  Smart IVR & <span className="gradient-text">Conversational Voice</span> Routing
                </h1>

                <p className="ivr-hero-desc">
                  Replace frustrating "Press 1 for Sales" phone trees with natural voice speech recognition, real-time CRM database dips, and sub-second SIP call escalation.
                </p>

                <div className="ivr-hero-benefits">
                  <div className="ivr-benefit-item">
                    <CheckCircle2 size={16} color="var(--primary-color)" />
                    <span>Spoken speech recognition in 40+ languages</span>
                  </div>
                  <div className="ivr-benefit-item">
                    <CheckCircle2 size={16} color="var(--primary-color)" />
                    <span>Sub-200ms real-time CRM database dips</span>
                  </div>
                  <div className="ivr-benefit-item">
                    <CheckCircle2 size={16} color="var(--primary-color)" />
                    <span>Zero-drop warm agent SIP transfer</span>
                  </div>
                  <div className="ivr-benefit-item">
                    <CheckCircle2 size={16} color="var(--primary-color)" />
                    <span>Live WhatsApp continuation & payment links</span>
                  </div>
                </div>

                <div className="ivr-hero-actions">
                  <button
                    type="button"
                    className="ivr-btn-hero-primary"
                    onClick={() => handleOpenDemo('Smart IVR Deployment Inquiry')}
                  >
                    Deploy Smart IVR <ArrowRight size={18} />
                  </button>
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20am%20interested%20in%20Smart%20IVR%20Solutions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ivr-btn-hero-whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Test on WhatsApp</span>
                  </a>
                </div>

                <div className="ivr-hero-trust-micro">
                  <div className="ivr-trust-check">
                    <Check size={16} color="var(--primary-color)" /> Sub-180ms Latency
                  </div>
                  <div>•</div>
                  <div className="ivr-trust-check">
                    <Check size={16} color="var(--primary-color)" /> 99.99% SIP Uptime
                  </div>
                  <div>•</div>
                  <div className="ivr-trust-check">
                    <Check size={16} color="var(--primary-color)" /> RFC-Compliant WebSockets
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Browser Frame Mockup & Floating Badges */}
              <div className="ivr-hero-stage">
                <div className="ivr-hero-stage-glow" />

                {/* Floating Badge 1: ASR Latency */}
                <div className="ivr-float-badge ivr-float-badge-1">
                  <div className="ivr-float-icon">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <div className="ivr-float-title">Speech Recognition</div>
                    <div className="ivr-float-val">
                      <span className="ivr-pulse-dot" style={{ width: 6, height: 6 }} /> Sub-180ms Latency (ASR)
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2: Database Dip */}
                <div className="ivr-float-badge ivr-float-badge-2">
                  <div className="ivr-float-icon" style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.12)' }}>
                    <Database size={19} />
                  </div>
                  <div>
                    <div className="ivr-float-title">CRM Database Dip</div>
                    <div className="ivr-float-val">Caller Verified (85ms)</div>
                  </div>
                </div>

                {/* macOS / WebSoftswitch Mockup Window */}
                <div className="ivr-mockup-window">
                  <div className="ivr-mockup-header">
                    <div className="ivr-window-dots">
                      <span className="ivr-dot ivr-dot-red" />
                      <span className="ivr-dot ivr-dot-yellow" />
                      <span className="ivr-dot ivr-dot-green" />
                    </div>
                    <div className="ivr-mockup-url">
                      <Radio size={12} color="var(--primary-color)" />
                      <span>app.gyanvaniai.com/telephony/sip-trunk/live</span>
                    </div>
                    <div className="ivr-mockup-secure">
                      <Sparkles size={13} />
                      <span>Active SIP Bridge</span>
                    </div>
                  </div>
                  <img
                    src="/ivr-solutions-hero.webp"
                    alt="Gyan VaniAi Smart IVR and Intelligent Call Routing System Dashboard"
                    width="1000"
                    height="562"
                    className="ivr-mockup-img"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
              </div>
            </div>

            {/* --- Hero Telemetry / Metrics Banner --- */}
            <div className="ivr-hero-metrics">
              <div className="ivr-metric-card">
                <div className="ivr-metric-icon">
                  <Zap size={22} />
                </div>
                <div>
                  <div className="ivr-metric-val">70% Deflected</div>
                  <div className="ivr-metric-lbl">First-Call Automated Resolution</div>
                </div>
              </div>

              <div className="ivr-metric-card">
                <div className="ivr-metric-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="ivr-metric-val">&lt; 180ms</div>
                  <div className="ivr-metric-lbl">Spoken ASR Intent Latency</div>
                </div>
              </div>

              <div className="ivr-metric-card">
                <div className="ivr-metric-icon">
                  <Globe size={22} />
                </div>
                <div>
                  <div className="ivr-metric-val">40+ Languages</div>
                  <div className="ivr-metric-lbl">Global Dialects & Accents</div>
                </div>
              </div>

              <div className="ivr-metric-card">
                <div className="ivr-metric-icon">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="ivr-metric-val">99.99% SLA</div>
                  <div className="ivr-metric-lbl">Carrier SIP Telephony Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive Call Simulator */}
        <section className="ivr-section ivr-section-alt">
          <div className="ivr-container">
            <div className="ivr-section-header">
              <div className="ivr-badge">Interactive Telephony Sandbox</div>
              <h2 className="ivr-section-title">Experience the Smart IVR Call Journey</h2>
              <p className="ivr-section-subtitle">
                See how an incoming voice call is transcribed, verified against live CRM records, and resolved autonomously or escalated seamlessly.
              </p>
            </div>

            <div className="ivr-sim-container">
              <div className="ivr-sim-tabs">
                {simulatorSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    className={`ivr-sim-tab-btn ${activeSimTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveSimTab(idx)}
                  >
                    {step.icon}
                    <span>{step.tabTitle}</span>
                  </button>
                ))}
              </div>

              <div className="ivr-sim-content">
                <div className="ivr-sim-badge">
                  {simulatorSteps[activeSimTab].badge}
                </div>

                <div className="ivr-call-bubble-wrap">
                  <div className="ivr-bubble ivr-bubble-caller">
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      Caller Audio
                    </div>
                    <div>{simulatorSteps[activeSimTab].callerMsg}</div>
                  </div>

                  <div className="ivr-bubble ivr-bubble-agent">
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: '#5eead4', marginBottom: '0.35rem' }}>
                      Gyan VaniAi Smart IVR
                    </div>
                    <div>{simulatorSteps[activeSimTab].aiResponse}</div>
                  </div>
                </div>

                <div className="ivr-sim-status-note">
                  <Activity size={18} />
                  <span>{simulatorSteps[activeSimTab].statusNote}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="ivr-section">
          <div className="ivr-container">
            <div className="ivr-section-header">
              <div className="ivr-badge">Architecture & Engine</div>
              <h2 className="ivr-section-title">Engineered for High-Velocity Contact Centers</h2>
              <p className="ivr-section-subtitle">
                Six core technological pillars that transform legacy telecommunication trees into intelligent, real-time revenue and support engines.
              </p>
            </div>

            <div className="ivr-caps-grid">
              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><Mic size={24} /></div>
                <h3 className="ivr-cap-title">Adaptive Speech Recognition (ASR)</h3>
                <p className="ivr-cap-desc">Neural acoustic models transcribe spoken requests in real-time, accurately decoding accents, local dialects, and noisy caller environments.</p>
              </div>

              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><Database size={24} /></div>
                <h3 className="ivr-cap-title">Sub-200ms CRM Data-Dips</h3>
                <p className="ivr-cap-desc">Instant webhook integrations query caller ID against CRM, ERP, and payment databases to greet customers by name and anticipate intent.</p>
              </div>

              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><Server size={24} /></div>
                <h3 className="ivr-cap-title">SIP Trunking & Softswitch Telephony</h3>
                <p className="ivr-cap-desc">Native support for Asterisk, FreeSWITCH, Twilio, Cisco, and cloud PBX carriers with sub-second signaling and carrier-grade 99.99% uptime.</p>
              </div>

              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><Headset size={24} /></div>
                <h3 className="ivr-cap-title">Zero-Loss Human Handoff</h3>
                <p className="ivr-cap-desc">Callers requiring live support are transferred smoothly via SIP REFER alongside live screen-pops of the transcript, account tier, and sentiment.</p>
              </div>

              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><MessageSquare size={24} /></div>
                <h3 className="ivr-cap-title">Omnichannel WhatsApp Deflection</h3>
                <p className="ivr-cap-desc">Seamlessly push payment links, documents, address forms, or ticket links to caller WhatsApp in real-time during or after the call.</p>
              </div>

              <div className="ivr-cap-card">
                <div className="ivr-cap-icon-wrap"><BrainCircuit size={24} /></div>
                <h3 className="ivr-cap-title">Dynamic Priority Queuing</h3>
                <p className="ivr-cap-desc">Detect VIP clients, high-risk churn signals, or high-value purchase inquiries to automatically jump standard hold queues.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="ivr-section ivr-section-alt">
          <div className="ivr-container">
            <div className="ivr-section-header">
              <div className="ivr-badge">Operational ROI</div>
              <h2 className="ivr-section-title">Calculate Your Contact Center Savings</h2>
              <p className="ivr-section-subtitle">
                Estimate the direct reduction in agent handle time and monthly operational telecom expense by deploying Conversational Smart IVR.
              </p>
            </div>

            <div className="ivr-calc-card">
              <div className="ivr-calc-header-controls">
                <div className="ivr-currency-toggle" role="group" aria-label="Select Currency">
                  <button
                    type="button"
                    className={`ivr-currency-btn ${currency === 'INR' ? 'active' : ''}`}
                    onClick={() => setCurrency('INR')}
                  >
                    ₹ INR (India)
                  </button>
                  <button
                    type="button"
                    className={`ivr-currency-btn ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => setCurrency('USD')}
                  >
                    $ USD (Global)
                  </button>
                </div>
                <div className="ivr-calc-benchmark-tag">
                  <Sparkles size={14} color="var(--primary-color)" />
                  <span>Benchmark: 4.5m AHT • 65% Automated Resolution • Plans from ₹1,999/mo ($19/mo)</span>
                </div>
              </div>

              <div className="ivr-calc-slider-wrap">
                <div className="ivr-calc-slider-header">
                  <span className="ivr-calc-label">Monthly Inbound Call Volume:</span>
                  <span className="ivr-calc-value-display">{callVolume.toLocaleString()} calls / mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={callVolume}
                  onChange={(e) => setCallVolume(Number(e.target.value))}
                  className="ivr-range-input"
                  aria-label="Monthly Inbound Call Volume"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span>1,000 calls</span>
                  <span>50,000 calls</span>
                  <span>100,000+ calls</span>
                </div>
              </div>

              {/* Per-Call Comparison Pill */}
              <div className="ivr-calc-breakdown-pill">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} color="var(--primary-color)" />
                  <span><strong>Cost Per Call:</strong> Live Agent: <span style={{ textDecoration: 'line-through', opacity: 0.75 }}>{humanCallCost}</span> → Smart IVR: <span style={{ color: 'var(--primary-color)', fontWeight: '750' }}>{ivrCallCost}</span></span>
                </div>
                <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                  Save 82% per automated call
                </div>
              </div>

              <div className="ivr-calc-results">
                <div className="ivr-calc-res-item">
                  <div className="ivr-calc-res-num">{hoursSavedPerMonth.toLocaleString()} hrs</div>
                  <div className="ivr-calc-res-lbl">Agent Time Saved / Month</div>
                </div>

                <div className="ivr-calc-res-item">
                  <div className="ivr-calc-res-num">{deflectedCalls.toLocaleString()}</div>
                  <div className="ivr-calc-res-lbl">Calls Resolved Autonomously (65%)</div>
                </div>

                <div className="ivr-calc-res-item ivr-calc-res-item-highlight">
                  <div className="ivr-calc-res-num">{currencySymbol}{monthlySavings.toLocaleString()}</div>
                  <div className="ivr-calc-res-lbl">Estimated Monthly Savings</div>
                </div>

                <div className="ivr-calc-res-item ivr-calc-res-item-highlight">
                  <div className="ivr-calc-res-num">{currencySymbol}{annualSavings.toLocaleString()}</div>
                  <div className="ivr-calc-res-lbl">Projected Annual Savings</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
                <button
                  type="button"
                  className="ivr-btn-hero-primary"
                  onClick={() => handleOpenDemo(`Smart IVR ROI Estimate for ${callVolume.toLocaleString()} calls/mo (${currency})`)}
                >
                  Request Detailed Contact Center Audit <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="ivr-section">
          <div className="ivr-container">
            <div className="ivr-section-header">
              <div className="ivr-badge">Knowledge Base</div>
              <h2 className="ivr-section-title">Frequently Asked Questions</h2>
              <p className="ivr-section-subtitle">
                Everything you need to know about implementing Gyan VaniAi Smart IVR in your existing telephony infrastructure.
              </p>
            </div>

            <div className="ivr-faq-wrap">
              {faqs.map((faq, idx) => (
                <div key={idx} className="ivr-faq-item">
                  <button
                    type="button"
                    className="ivr-faq-trigger"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <Minus size={20} color="var(--primary-color)" /> : <Plus size={20} color="var(--primary-color)" />}
                  </button>
                  {openFaq === idx && (
                    <div className="ivr-faq-body">
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
