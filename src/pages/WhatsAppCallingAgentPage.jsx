import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  PhoneCall,
  MessageSquare,
  Bot,
  BrainCircuit,
  Activity,
  Calendar,
  Headset,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Mic,
  ChevronDown,
  Layers,
  Lock,
  Radio,
  Clock,
  Server,
  Workflow,
  Globe,
  Check
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import ContactSection from '../components/ContactSection';
import Card3DTilt from '../components/ui/Card3DTilt';
import AnimatedBeam from '../components/ui/AnimatedBeam';
import BorderBeam from '../components/ui/BorderBeam';
import Ripple from '../components/ui/Ripple';
import Particles from '../components/ui/Particles';
import SpotlightCard from '../components/ui/SpotlightCard';
import Meteors from '../components/ui/Meteors';
import { trackBookDemo, trackEvent } from '../utils/analytics';
import './WhatsAppCallingAgentPage.css';

const SITE = 'https://www.gyanvaniai.online';

// Capability Points for Section 3 & 4
const capabilityCards = [
  {
    num: '01',
    icon: <PhoneCall size={22} className="cap-icon" />,
    title: 'AI Voice Conversations',
    desc: 'Sub-300ms full-duplex conversational voice agents that understand natural cadence, handle interruptions (barge-in), and speak naturally in 30+ languages.'
  },
  {
    num: '02',
    icon: <BrainCircuit size={22} className="cap-icon" />,
    title: 'Intent & Sentiment Detection',
    desc: 'Real-time NLP intent extraction parses caller urgency, budget signals, and specific objections during ongoing conversations without awkward pauses.'
  },
  {
    num: '03',
    icon: <Activity size={22} className="cap-icon" />,
    title: 'Autonomous Lead Qualification',
    desc: 'Dynamically assesses prospect fit against your enterprise BANT criteria, assigning lead intent scores from 1 to 100 before scheduling.'
  },
  {
    num: '04',
    icon: <Database size={22} className="cap-icon" />,
    title: 'Live Bi-Directional CRM Updates',
    desc: 'Instantly logs call audio recordings, structured summaries, transcripts, and updated contact fields directly into your CRM database.'
  },
  {
    num: '05',
    icon: <Calendar size={22} className="cap-icon" />,
    title: 'Appointment & Action Automation',
    desc: 'Directly checks team availability across Google Calendar or Outlook and books meetings during the call, followed by instant WhatsApp confirmations.'
  },
  {
    num: '06',
    icon: <Headset size={22} className="cap-icon" />,
    title: 'Contextual Human Handoff',
    desc: 'Seamlessly transfers complex negotiations or VIP callers to live representatives with a comprehensive conversation summary and buyer history.'
  }
];

// 8 Pipeline Stages for Section 5
const pipelineStages = [
  {
    step: '01',
    name: 'Customer Call',
    category: 'Ingestion',
    icon: <PhoneCall size={18} />,
    headline: 'Native WhatsApp Voice Ingestion',
    detail: 'Customer initiates or receives a call over official WhatsApp Voice API without needing traditional carrier minutes.'
  },
  {
    step: '02',
    name: 'Speech ASR',
    category: 'Streaming',
    icon: <Mic size={18} />,
    headline: 'Sub-150ms Speech Recognition',
    detail: 'Streaming automatic speech recognition converts spoken voice audio to text with real-time domain vocabulary adaptation.'
  },
  {
    step: '03',
    name: 'Intent NLP',
    category: 'Understanding',
    icon: <BrainCircuit size={18} />,
    headline: 'NLU Intent & Entity Classification',
    detail: 'Extracts buyer intent, entities, pricing queries, and emotional sentiment to steer the dialogue state machine.'
  },
  {
    step: '04',
    name: 'AI Reasoning',
    category: 'Cognition',
    icon: <Bot size={18} />,
    headline: 'Contextual Dialogue Engine',
    detail: 'Enterprise LLM synthesizes natural responses respecting conversation history, tone policies, and company playbooks.'
  },
  {
    step: '05',
    name: 'RAG Retrieval',
    category: 'Knowledge',
    icon: <Layers size={18} />,
    headline: 'Tenant-Isolated Knowledge Search',
    detail: 'Queries your vector knowledge base for accurate product specs, SLAs, and pricing without model hallucinations.'
  },
  {
    step: '06',
    name: 'Tool & CRM Action',
    category: 'Execution',
    icon: <Database size={18} />,
    headline: 'Automated Backend Execution',
    detail: 'Triggers CRM pipeline mutations, availability lookup, and dynamic database queries via verified API function calling.'
  },
  {
    step: '07',
    name: 'WhatsApp Sync',
    category: 'Messaging',
    icon: <MessageSquare size={18} />,
    headline: 'Instant Text Confirmation',
    detail: 'Sends meeting links, summary notes, and brochure PDFs straight to the customer’s WhatsApp thread post-call.'
  },
  {
    step: '08',
    name: 'Human Handoff',
    category: 'Escalation',
    icon: <Headset size={18} />,
    headline: 'Warm Transfer & Rep Escalation',
    detail: 'Live agent receives the active call transfer along with the full transcript, customer profile, and suggested next steps.'
  }
];

// Integrations for Section 7
const integrationsList = [
  { name: 'WhatsApp Cloud API', type: 'Official Meta Platform', icon: <MessageSquare size={20} /> },
  { name: 'Salesforce & HubSpot', type: 'Bi-Directional CRM', icon: <Database size={20} /> },
  { name: 'Google & Outlook', type: 'Calendar Availability', icon: <Calendar size={20} /> },
  { name: 'Pinecone & Qdrant', type: 'Vector RAG Knowledge', icon: <Layers size={20} /> },
  { name: 'Twilio & SIP Trunks', type: 'Telephony Infrastructure', icon: <PhoneCall size={20} /> },
  { name: 'Slack & Teams', type: 'Internal Rep Alerts', icon: <Radio size={20} /> },
  { name: 'Custom REST Endpoints', type: 'Webhooks & ERP', icon: <Server size={20} /> },
  { name: 'Zendesk & Freshdesk', type: 'Live Agent Escalation', icon: <Headset size={20} /> }
];

// Security Pillars for Section 8
const securityPillars = [
  {
    icon: <Lock size={20} />,
    title: 'End-to-End Voice Encryption',
    desc: 'All streaming audio and transcript payloads are encrypted in transit with TLS 1.3 and at rest with AES-256 enterprise ciphers.'
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Tenant-Isolated Data Pipelines',
    desc: 'Your customer conversations, recordings, and RAG knowledge vectors never cross tenant boundaries or train third-party foundation models.'
  },
  {
    icon: <Server size={20} />,
    title: 'Role-Based Access Control (RBAC)',
    desc: 'Enforce granular permissions across sales pods, support tiers, and executive audit oversight with single sign-on (SSO).'
  },
  {
    icon: <Clock size={20} />,
    title: 'Immutable Audit Logs',
    desc: 'Every tool invocation, call transfer, and CRM record update is recorded with millisecond precision for compliance and SLA verification.'
  },
  {
    icon: <Workflow size={20} />,
    title: 'Configurable Human Guardrails',
    desc: 'Set strict deterministic boundaries. High-value transactions or sensitive inquiries immediately trigger warm human escalation.'
  },
  {
    icon: <Globe size={20} />,
    title: 'Global High-Availability Uptime',
    desc: 'Multi-region cloud infrastructure guarantees 99.99% operational uptime across APAC, EMEA, and Americas telephony zones.'
  }
];

// Page Specific FAQs for Section 9
const pageFaqs = [
  {
    q: 'What are WhatsApp Calling AI Agents?',
    a: 'WhatsApp Calling AI Agents are conversational voice bots that operate natively within the official WhatsApp Business Platform. They can answer incoming calls, conduct automated outbound outreach, understand spoken dialogue in real time, and trigger CRM actions without requiring traditional carrier phone minutes.'
  },
  {
    q: 'Can the AI qualify leads automatically during a phone conversation?',
    a: 'Yes. The agent is trained on your qualification framework (such as BANT or custom enterprise criteria). It asks structured yet natural discovery questions, analyzes caller responses, calculates an intent score (e.g., 94/100), and records the status directly in your CRM.'
  },
  {
    q: 'Does the WhatsApp calling agent integrate with our existing CRM?',
    a: 'Absolutely. We provide direct bi-directional synchronization with Gyan VaniAi CRM, Salesforce, HubSpot, Zoho, and custom PostgreSQL/MySQL backends. After every call, the complete audio recording, structured summary, transcript, and updated deal properties are synced automatically.'
  },
  {
    q: 'How does the AI hand conversations over to human team members?',
    a: 'If a caller requests a human, demonstrates high purchase intent, or asks questions outside defined guardrails, the agent initiates an instant warm transfer. The human rep receives the call along with a real-time summary so the customer never has to repeat themselves.'
  },
  {
    q: 'Can the calling agent access our internal knowledge base and pricing?',
    a: 'Yes. Our platform uses Retrieval-Augmented Generation (RAG) with tenant-isolated vector databases. The agent retrieves verified pricing, technical specifications, and policy answers from your uploaded documents with zero hallucination.'
  },
  {
    q: 'Can the calling agent schedule calendar appointments live on the call?',
    a: 'Yes. By connecting to Google Calendar, Microsoft 365, or Calendly via real-time function calling, the agent checks live availability, proposes suitable slots, confirms the booking with the caller, and immediately texts a WhatsApp confirmation message.'
  },
  {
    q: 'What WhatsApp infrastructure is required to get started?',
    a: 'You only need an official WhatsApp Business Account (WABA). As a certified Meta Tech Provider ecosystem, we configure the official WhatsApp Cloud API with Voice calling capabilities on your verified business phone number with zero downtime.'
  },
  {
    q: 'How long does implementation and deployment typically take?',
    a: 'Standard WhatsApp Calling Agent deployments typically go live in 2 to 4 weeks. This includes telephony setup, knowledge base vector ingestion, dialogue script tailoring, CRM webhook integration, and end-to-end latency testing.'
  }
];

export default function WhatsAppCallingAgentPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [openFaqIndices, setOpenFaqIndices] = useState(new Set([0, 1]));

  // Animated beam container refs for workflow section
  const beamContainerRef = useRef(null);
  const beamNode1Ref = useRef(null);
  const beamNode2Ref = useRef(null);
  const beamNode3Ref = useRef(null);
  const beamNode4Ref = useRef(null);

  // FAQ Single Toggle state
  const isAllFaqsOpen = openFaqIndices.size === pageFaqs.length;

  const handleToggleFaq = (idx) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const handleToggleAllFaqs = () => {
    if (isAllFaqsOpen) {
      setOpenFaqIndices(new Set());
    } else {
      setOpenFaqIndices(new Set(pageFaqs.map((_, i) => i)));
    }
  };

  const handleBookDemo = (source = 'whatsapp-calling-hero') => {
    trackBookDemo(source);
    setIsDemoModalOpen(true);
  };

  const canonicalUrl = `${SITE}/services/whatsapp-calling-agent`;

  // JSON-LD Schemas for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'WhatsApp Calling Agent Bots & Voice AI',
    serviceType: 'Conversational Voice AI & WhatsApp Calling Automation',
    provider: {
      '@id': `${SITE}/#organization`
    },
    areaServed: ['Europe', 'Asia', 'Africa', 'North America', 'Worldwide'],
    description: 'Autonomous WhatsApp Voice AI calling agents that hold natural conversations, qualify inbound leads, update CRM records, and escalate to human reps.',
    url: canonicalUrl,
    image: `${SITE}/hero_dashboard.webp`
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#capabilities` },
      { '@type': 'ListItem', position: 3, name: 'WhatsApp Calling Agent Bots', item: canonicalUrl }
    ]
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Calling Agent Bots | Enterprise Conversational Voice AI | Gyan VaniAi</title>
        <meta
          name="description"
          content="Deploy autonomous WhatsApp Calling Agent Bots that converse naturally, qualify leads with sub-300ms latency, sync CRM pipelines, and book meetings 24/7."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="WhatsApp Calling Agent Bots | Enterprise Conversational Voice AI" />
        <meta
          property="og:description"
          content="Autonomous WhatsApp Calling Agent Bots that talk, qualify leads, update CRM records in real time, and route deals to human sales reps."
        />
        <meta property="og:image" content={`${SITE}/hero_dashboard.webp`} />
        <meta property="og:site_name" content="Gyan VaniAi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhatsApp Calling Agent Bots | Enterprise Conversational Voice AI" />
        <meta
          name="twitter:description"
          content="Deploy autonomous WhatsApp Calling Agent Bots with sub-300ms conversational voice, automated lead scoring, and live CRM sync."
        />
        <meta name="twitter:image" content={`${SITE}/hero_dashboard.webp`} />

        {/* Structured Schema */}
        <script type="application/ld+json">
          {JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema])}
        </script>
      </Helmet>

      <div className="wa-calling-page">
        {/* =========================================================================
            1. HERO SECTION — Enterprise Product Showcase
            ========================================================================= */}
        <section className="wa-hero-section" id="hero">
          <div className="wa-hero-atmospheric-bg">
            <Particles quantity={32} color="#14b8a6" />
          </div>

          <div className="container wa-container">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="wa-breadcrumb">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/#capabilities">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li className="active" aria-current="page">WhatsApp Calling Agent Bots</li>
              </ol>
            </nav>

            <div className="wa-hero-grid">
              {/* Left Column: Value Prop & CTAs */}
              <div className="wa-hero-copy">
                <div className="wa-eyebrow-badge">
                  <span className="wa-badge-pulse"></span>
                  <MessageSquare size={13} className="wa-badge-icon" />
                  <span>Official WhatsApp Business API · Voice AI</span>
                </div>

                <h1 className="wa-hero-h1">
                  WhatsApp AI Agents That <span className="wa-text-gradient">Talk, Qualify & Convert</span>
                </h1>

                <p className="wa-hero-lead">
                  Deploy intelligent WhatsApp voice agents that converse naturally in 30+ languages, qualify inbound prospects in real time, update your CRM automatically, and route complex high-value deals to human reps.
                </p>

                <div className="wa-hero-cta-group">
                  <button
                    id="btn-hero-book-demo"
                    type="button"
                    className="btn btn-primary wa-btn-primary"
                    onClick={() => handleBookDemo('whatsapp-calling-hero-cta')}
                  >
                    <span>Book a Demo</span>
                    <ArrowRight size={18} />
                  </button>

                  <a
                    id="btn-hero-explore-agents"
                    href="#pipeline"
                    className="btn btn-outline wa-btn-secondary"
                  >
                    <span>Explore AI Agents</span>
                    <ArrowRight size={18} />
                  </a>
                </div>

                {/* Technical Trust Indicators */}
                <div className="wa-hero-trust-indicators">
                  <div className="wa-trust-chip">
                    <CheckCircle2 size={16} className="wa-chip-check" />
                    <span>WhatsApp Business Compatible</span>
                  </div>
                  <div className="wa-trust-chip">
                    <CheckCircle2 size={16} className="wa-chip-check" />
                    <span>AI Voice Conversations</span>
                  </div>
                  <div className="wa-trust-chip">
                    <CheckCircle2 size={16} className="wa-chip-check" />
                    <span>Real-time CRM Sync</span>
                  </div>
                  <div className="wa-trust-chip">
                    <CheckCircle2 size={16} className="wa-chip-check" />
                    <span>Human Handoff</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Interactive Product Showcase */}
              <div className="wa-hero-visual-wrapper">
                <Card3DTilt className="wa-product-frame-tilt" maxRotation={8} scale={1.02}>
                  <div className="wa-product-frame">
                    <BorderBeam size={220} duration={8} colorFrom="#14b8a6" colorTo="#06b6d4" borderWidth={1.5} />
                    {/* App Window Top Bar */}
                    <div className="wa-frame-header">
                      <div className="wa-frame-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="wa-frame-status">
                        <span className="wa-live-dot"></span>
                        <span className="wa-live-title">AI Call Active · 01:42</span>
                      </div>
                      <div className="wa-frame-secure-tag">
                        <Lock size={12} />
                        <span>TLS 1.3 Voice Stream</span>
                      </div>
                    </div>

                    {/* Active In-Call Dashboard */}
                    <div className="wa-frame-body">
                      <div className="wa-caller-header">
                        <div className="wa-caller-avatar">
                          <Bot size={24} color="#ffffff" />
                        </div>
                        <div className="wa-caller-meta">
                          <div className="wa-caller-name">Gyan VaniAi Voice Agent #04</div>
                          <div className="wa-caller-role">Inbound Enterprise Sales Line · WhatsApp Voice</div>
                        </div>
                        <div className="wa-caller-badge">
                          <Zap size={12} />
                          <span>Sub-300ms</span>
                        </div>
                      </div>

                      {/* Live Audio Waveform Simulation */}
                      <div className="wa-waveform-container" aria-label="Real-time voice stream visualizer">
                        <div className="wa-waveform-label">
                          <Radio size={12} className="wa-radio-pulse" />
                          <span>Streaming Full-Duplex Audio</span>
                        </div>
                        <div className="wa-audio-bars">
                          <span className="wa-bar b1"></span>
                          <span className="wa-bar b2"></span>
                          <span className="wa-bar b3"></span>
                          <span className="wa-bar b4"></span>
                          <span className="wa-bar b5"></span>
                          <span className="wa-bar b6"></span>
                          <span className="wa-bar b7"></span>
                          <span className="wa-bar b8"></span>
                          <span className="wa-bar b9"></span>
                          <span className="wa-bar b10"></span>
                          <span className="wa-bar b11"></span>
                          <span className="wa-bar b12"></span>
                        </div>
                      </div>

                      {/* Live Conversation Transcript Preview */}
                      <div className="wa-transcript-box">
                        <div className="wa-transcript-msg caller">
                          <span className="wa-msg-author">Customer (Marcus):</span>
                          <p>“We need to connect 40 sales reps on WhatsApp and automate discovery calls.”</p>
                        </div>
                        <div className="wa-transcript-msg agent">
                          <span className="wa-msg-author">AI Agent:</span>
                          <p>“We support Coexistence mode on official WABA with sub-300ms latency. Can I schedule a 15-minute live sandbox tomorrow at 11:00 AM?”</p>
                        </div>
                      </div>

                      {/* Enterprise Telemetry Chips */}
                      <div className="wa-telemetry-pills-grid">
                        <div className="wa-telemetry-chip highlight">
                          <span className="wa-chip-dot green"></span>
                          <span>Intent Detected: <strong>Enterprise Demo</strong></span>
                        </div>
                        <div className="wa-telemetry-chip">
                          <span className="wa-chip-dot cyan"></span>
                          <span>Lead Qualified: <strong>96/100 Intent</strong></span>
                        </div>
                        <div className="wa-telemetry-chip">
                          <span className="wa-chip-dot blue"></span>
                          <span>CRM Updated: <strong>Deal #8412</strong></span>
                        </div>
                        <div className="wa-telemetry-chip">
                          <span className="wa-chip-dot amber"></span>
                          <span>Human Handoff: <strong>Rep Assigned</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. TRUST / VALUE STRIP
            ========================================================================= */}
        <section className="wa-trust-strip" aria-label="Enterprise Capabilities Strip">
          <div className="container wa-container">
            <div className="wa-trust-strip-inner">
              <div className="wa-trust-item">
                <MessageSquare size={17} className="wa-trust-icon" />
                <span>WhatsApp Cloud API</span>
              </div>
              <div className="wa-trust-separator" aria-hidden="true">•</div>
              <div className="wa-trust-item">
                <Database size={17} className="wa-trust-icon" />
                <span>Bi-Directional CRM</span>
              </div>
              <div className="wa-trust-separator" aria-hidden="true">•</div>
              <div className="wa-trust-item">
                <Mic size={17} className="wa-trust-icon" />
                <span>Sub-300ms Voice AI</span>
              </div>
              <div className="wa-trust-separator" aria-hidden="true">•</div>
              <div className="wa-trust-item">
                <Layers size={17} className="wa-trust-icon" />
                <span>RAG Vector Retrieval</span>
              </div>
              <div className="wa-trust-separator" aria-hidden="true">•</div>
              <div className="wa-trust-item">
                <Workflow size={17} className="wa-trust-icon" />
                <span>Workflow Automation</span>
              </div>
              <div className="wa-trust-separator" aria-hidden="true">•</div>
              <div className="wa-trust-item">
                <Headset size={17} className="wa-trust-icon" />
                <span>SLA Human Escalation</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTRODUCTION / VALUE PROPOSITION
            ========================================================================= */}
        <section className="wa-section wa-intro-section">
          <div className="container wa-container">
            <div className="wa-intro-grid">
              <div className="wa-intro-left">
                <span className="wa-section-eyebrow">Enterprise Value Proposition</span>
                <h2 className="wa-h2">Turn WhatsApp conversations into automated customer journeys.</h2>
              </div>
              <div className="wa-intro-right">
                <p className="wa-intro-body">
                  Modern revenue teams lose up to 40% of inbound buyers due to slow text responses or missed telephone calls. Gyan VaniAi transforms your official WhatsApp number into a 24/7 autonomous conversational desk that talks naturally, resolves inquiries, and drives revenue straight into your CRM.
                </p>
                <div className="wa-intro-stats-row">
                  <div className="wa-intro-stat">
                    <div className="wa-stat-val">&lt; 300ms</div>
                    <div className="wa-stat-lbl">Conversational Latency</div>
                  </div>
                  <div className="wa-intro-stat">
                    <div className="wa-stat-val">99.4%</div>
                    <div className="wa-stat-lbl">ASR Transcription Accuracy</div>
                  </div>
                  <div className="wa-intro-stat">
                    <div className="wa-stat-val">3.8x</div>
                    <div className="wa-stat-lbl">Pipeline Velocity Lift</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Core Value Pillars */}
            <div className="wa-pillars-grid">
              <div className="wa-pillar-card">
                <div className="wa-pillar-icon-box">
                  <PhoneCall size={22} />
                </div>
                <h3 className="wa-pillar-title">AI Conversation Handling</h3>
                <p className="wa-pillar-desc">
                  Handle concurrent inbound calls without queueing. Our agents support natural interruptions, accent adaptation, and multi-turn contextual reasoning.
                </p>
              </div>

              <div className="wa-pillar-card">
                <div className="wa-pillar-icon-box">
                  <Activity size={22} />
                </div>
                <h3 className="wa-pillar-title">Autonomous Lead Qualification</h3>
                <p className="wa-pillar-desc">
                  Filter low-intent inquiries automatically while scoring high-value prospects according to company size, budget, urgency, and specific pain points.
                </p>
              </div>

              <div className="wa-pillar-card">
                <div className="wa-pillar-icon-box">
                  <Workflow size={22} />
                </div>
                <h3 className="wa-pillar-title">CRM & Workflow Automation</h3>
                <p className="wa-pillar-desc">
                  Every audio recording, AI transcript, qualification score, and next-action task is synchronized to your CRM record in real time without manual entry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. PRODUCT CAPABILITIES (3x2 Desktop Grid)
            ========================================================================= */}
        <section className="wa-section wa-capabilities-section" id="capabilities">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Platform Capabilities</span>
              <h2 className="wa-h2">What the AI agent can actually do</h2>
              <p className="wa-section-sub">
                Engineered for enterprise reliability, continuous learning, and seamless human oversight.
              </p>
            </div>

            <div className="wa-capabilities-3x2-grid">
              {capabilityCards.map((cap) => (
                <Card3DTilt key={cap.num} className="wa-cap-card-wrap" maxRotation={8} scale={1.02}>
                  <SpotlightCard
                    spotlightColor="rgba(20, 184, 166, 0.16)"
                    borderColor="rgba(20, 184, 166, 0.4)"
                    style={{ height: '100%', borderRadius: 'inherit' }}
                  >
                    <div className="wa-cap-card">
                      <div className="wa-cap-top">
                        <span className="wa-cap-num">{cap.num}</span>
                        <div className="wa-cap-icon-box">{cap.icon}</div>
                      </div>
                      <h3 className="wa-cap-title">{cap.title}</h3>
                      <p className="wa-cap-desc">{cap.desc}</p>
                    </div>
                  </SpotlightCard>
                </Card3DTilt>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. CORE WORKFLOW SECTION (Visual Connected Pipeline)
            ========================================================================= */}
        <section className="wa-section wa-pipeline-section" id="pipeline">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Visual AI Architecture</span>
              <h2 className="wa-h2">How the autonomous voice pipeline executes</h2>
              <p className="wa-section-sub">
                From incoming telephony audio to CRM synchronization and warm human escalation in under 500ms.
              </p>
            </div>

            {/* 3D Animated Laser Beam Visual Hub */}
            <div ref={beamContainerRef} className="wa-beam-stage" aria-label="3D Pipeline Connector Stage">
              <div 
                ref={beamNode1Ref} 
                className={`wa-beam-node ${activePipelineStep === 0 ? 'active' : ''}`}
                onClick={() => setActivePipelineStep(0)}
              >
                <div className="wa-beam-circle"><PhoneCall size={20} /></div>
                <span className="wa-beam-node-name">01. Call Ingestion</span>
              </div>

              <div 
                ref={beamNode2Ref} 
                className={`wa-beam-node ${activePipelineStep === 2 ? 'active' : ''}`}
                onClick={() => setActivePipelineStep(2)}
              >
                <div className="wa-beam-circle"><BrainCircuit size={20} /></div>
                <span className="wa-beam-node-name">03. NLU Intent</span>
              </div>

              <div 
                ref={beamNode3Ref} 
                className={`wa-beam-node ${activePipelineStep === 5 ? 'active' : ''}`}
                onClick={() => setActivePipelineStep(5)}
              >
                <div className="wa-beam-circle"><Database size={20} /></div>
                <span className="wa-beam-node-name">06. CRM Action</span>
              </div>

              <div 
                ref={beamNode4Ref} 
                className={`wa-beam-node ${activePipelineStep === 7 ? 'active' : ''}`}
                onClick={() => setActivePipelineStep(7)}
              >
                <div className="wa-beam-circle"><Headset size={20} /></div>
                <span className="wa-beam-node-name">08. Human Handoff</span>
              </div>

              <AnimatedBeam containerRef={beamContainerRef} fromRef={beamNode1Ref} toRef={beamNode2Ref} duration={2.6} delay={0} />
              <AnimatedBeam containerRef={beamContainerRef} fromRef={beamNode2Ref} toRef={beamNode3Ref} duration={2.6} delay={0.65} />
              <AnimatedBeam containerRef={beamContainerRef} fromRef={beamNode3Ref} toRef={beamNode4Ref} duration={2.6} delay={1.3} />
            </div>

            {/* 8 Connected Pipeline Nodes */}
            <div className="wa-pipeline-grid">
              {pipelineStages.map((stage, idx) => {
                const isActive = activePipelineStep === idx;
                return (
                  <div
                    key={stage.step}
                    className={`wa-pipeline-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActivePipelineStep(idx)}
                  >
                    <div className="wa-pipe-card-top">
                      <span className="wa-pipe-step-num">STEP {stage.step}</span>
                      <span className="wa-pipe-cat">{stage.category}</span>
                    </div>
                    <div className="wa-pipe-icon-wrap">{stage.icon}</div>
                    <h4 className="wa-pipe-name">{stage.name}</h4>
                    <p className="wa-pipe-detail">{stage.detail}</p>
                    {idx < pipelineStages.length - 1 && (
                      <div className="wa-pipe-arrow-desktop" aria-hidden="true">
                        <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Stage Detail Panel */}
            <div className="wa-stage-detail-banner">
              <BorderBeam size={180} duration={7} colorFrom="#06b6d4" colorTo="#3b82f6" borderWidth={1.5} />
              <div className="wa-stage-detail-left">
                <span className="wa-stage-badge">ACTIVE INSPECTOR · STEP {pipelineStages[activePipelineStep].step}</span>
                <h3 className="wa-stage-title">{pipelineStages[activePipelineStep].headline}</h3>
                <p className="wa-stage-desc">{pipelineStages[activePipelineStep].detail}</p>
              </div>
              <button
                type="button"
                className="btn btn-outline wa-stage-cta"
                onClick={() => handleBookDemo('whatsapp-calling-pipeline-inspect')}
              >
                <span>Deploy This Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. LIVE CONVERSATION VISUALIZATION
            ========================================================================= */}
        <section className="wa-section wa-demo-section">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Real Product Demonstration</span>
              <h2 className="wa-h2">See how a real conversation executes</h2>
              <p className="wa-section-sub">
                Watch how natural voice dialogue maps to live reasoning, knowledge retrieval, and instant CRM execution.
              </p>
            </div>

            <div className="wa-conversation-split-grid">
              {/* Left Column: WhatsApp Conversation UI */}
              <div className="wa-chat-window-card">
                <div className="wa-chat-header">
                  <div className="wa-chat-header-user">
                    <div className="wa-chat-user-avatar">MV</div>
                    <div>
                      <div className="wa-chat-user-name">Marcus Vance</div>
                      <div className="wa-chat-user-status">WhatsApp Voice · Connected</div>
                    </div>
                  </div>
                  <div className="wa-chat-duration">
                    <Clock size={13} />
                    <span>01:18</span>
                  </div>
                </div>

                <div className="wa-chat-messages-area">
                  <div className="wa-bubble customer">
                    <div className="wa-bubble-speaker">Marcus (Customer)</div>
                    <p>“Hi, can I book a demonstration of your WhatsApp Calling Agents tomorrow?”</p>
                    <span className="wa-bubble-time">10:42 AM</span>
                  </div>

                  <div className="wa-bubble system-event">
                    <Zap size={13} />
                    <span>AI Reasoning Triggered (142ms)</span>
                  </div>

                  <div className="wa-bubble agent">
                    <div className="wa-bubble-speaker">Gyan VaniAi Voice Agent</div>
                    <p>“Absolutely Marcus. I have 11:00 AM or 3:30 PM available with our Solutions Architect. Which one works best for you?”</p>
                    <span className="wa-bubble-time">10:42 AM</span>
                  </div>

                  <div className="wa-bubble customer">
                    <div className="wa-bubble-speaker">Marcus (Customer)</div>
                    <p>“11:00 AM works perfectly.”</p>
                    <span className="wa-bubble-time">10:43 AM</span>
                  </div>

                  <div className="wa-bubble agent">
                    <div className="wa-bubble-speaker">Gyan VaniAi Voice Agent</div>
                    <p>“Great! I have locked in 11:00 AM and sent a calendar invite plus WhatsApp summary to your number. Looking forward to speaking tomorrow!”</p>
                    <span className="wa-bubble-time">10:43 AM</span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Agent Reasoning & Execution Panel */}
              <div className="wa-agent-panel-card">
                <div className="wa-panel-header">
                  <BrainCircuit size={18} color="var(--primary-color)" />
                  <span>AI Agent Cognition & Tool Telemetry</span>
                  <span className="wa-panel-live-tag">LIVE TRACE</span>
                </div>

                <div className="wa-panel-steps">
                  <div className="wa-trace-row done">
                    <div className="wa-trace-icon"><Check size={14} /></div>
                    <div className="wa-trace-content">
                      <div className="wa-trace-label">1. Speech-to-Text Transcribed</div>
                      <div className="wa-trace-sub">Latency: 84ms · Confidence: 99.2%</div>
                    </div>
                  </div>

                  <div className="wa-trace-row done">
                    <div className="wa-trace-icon"><Check size={14} /></div>
                    <div className="wa-trace-content">
                      <div className="wa-trace-label">2. Intent Detected</div>
                      <div className="wa-trace-sub">Entity: Appointment Request · Urgency: High</div>
                    </div>
                  </div>

                  <div className="wa-trace-row done">
                    <div className="wa-trace-icon"><Check size={14} /></div>
                    <div className="wa-trace-content">
                      <div className="wa-trace-label">3. RAG Knowledge Retrieved</div>
                      <div className="wa-trace-sub">Document: Solutions_Architect_SLA_Policy.pdf</div>
                    </div>
                  </div>

                  <div className="wa-trace-row done">
                    <div className="wa-trace-icon"><Check size={14} /></div>
                    <div className="wa-trace-content">
                      <div className="wa-trace-label">4. Tool Executed: Calendar.bookSlot()</div>
                      <div className="wa-trace-sub">Created event: Demo · Tomorrow @ 11:00 AM</div>
                    </div>
                  </div>

                  <div className="wa-trace-row done">
                    <div className="wa-trace-icon"><Check size={14} /></div>
                    <div className="wa-trace-content">
                      <div className="wa-trace-label">5. CRM Mutation: Deal #8412 Updated</div>
                      <div className="wa-trace-sub">Stage: Qualified · Contact: Marcus Vance · Lead Score: 96/100</div>
                    </div>
                  </div>
                </div>

                <div className="wa-panel-footer">
                  <div className="wa-panel-footer-stat">
                    <span>Total Execution Time:</span>
                    <strong>286ms</strong>
                  </div>
                  <div className="wa-panel-footer-stat">
                    <span>Hallucination Rate:</span>
                    <strong>0.00%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. ENTERPRISE INTEGRATIONS
            ========================================================================= */}
        <section className="wa-section wa-integrations-section">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Ecosystem Architecture</span>
              <h2 className="wa-h2">Connect the agent to the systems your team already uses.</h2>
              <p className="wa-section-sub">
                Seamless API-first connections ensure zero disruption to your existing sales, support, and telephony stack.
              </p>
            </div>

            <div className="wa-integrations-hub">
              {/* Magic UI Ripple Behind Core */}
              <Ripple mainCircleSize={130} numCircles={5} circleColor="rgba(20, 184, 166, 0.22)" />

              {/* Central Agent Node */}
              <div className="wa-integration-core">
                <Bot size={36} color="#ffffff" />
                <div className="wa-core-label">Gyan VaniAi Agent Core</div>
                <div className="wa-core-sub">Continuous Real-time Memory</div>
              </div>

              {/* Surrounding Connected Service Cards */}
              <div className="wa-integrations-cards-grid">
                {integrationsList.map((item) => (
                  <div key={item.name} className="wa-integration-card">
                    <div className="wa-int-icon-box">{item.icon}</div>
                    <div className="wa-int-meta">
                      <div className="wa-int-name">{item.name}</div>
                      <div className="wa-int-type">{item.type}</div>
                    </div>
                    <CheckCircle2 size={16} className="wa-int-check" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. SECURITY & ENTERPRISE READINESS (Dark Navy Theme with Meteors)
            ========================================================================= */}
        <section className="wa-section wa-security-section">
          <Meteors number={18} />
          <div className="container wa-container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="wa-section-header light">
              <span className="wa-section-eyebrow light">Enterprise Trust & Compliance</span>
              <h2 className="wa-h2 light">Built for enterprise conversations.</h2>
              <p className="wa-section-sub light">
                Stringent encryption, tenant isolation, and strict audit logging satisfy corporate security standards.
              </p>
            </div>

            <div className="wa-security-grid">
              {securityPillars.map((sec) => (
                <SpotlightCard
                  key={sec.title}
                  spotlightColor="rgba(45, 212, 191, 0.2)"
                  borderColor="rgba(45, 212, 191, 0.4)"
                  style={{ background: '#0f172a', borderRadius: 'var(--wa-radius-lg)' }}
                >
                  <div className="wa-security-card" style={{ border: 'none', background: 'transparent' }}>
                    <div className="wa-sec-icon-wrap">{sec.icon}</div>
                    <h3 className="wa-sec-title">{sec.title}</h3>
                    <p className="wa-sec-desc">{sec.desc}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. REDESIGNED ACCESSIBLE FAQ
            ========================================================================= */}
        <section className="wa-section wa-faq-section" id="faq">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Knowledge & FAQs</span>
              <h2 className="wa-h2">Frequently Asked Questions</h2>
              <p className="wa-section-sub">
                Everything you need to know about deploying WhatsApp Calling Agents for your business.
              </p>
              
              {/* Single Compact Toggle Button */}
              <div className="wa-faq-toggle-bar">
                <button
                  type="button"
                  className="wa-faq-toggle-btn"
                  onClick={handleToggleAllFaqs}
                  aria-expanded={isAllFaqsOpen}
                >
                  <span>{isAllFaqsOpen ? 'Collapse all' : 'Expand all'}</span>
                  <ChevronDown
                    size={16}
                    style={{ transform: isAllFaqsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
                  />
                </button>
              </div>
            </div>

            <div className="wa-faq-list" role="region" aria-label="WhatsApp Calling Agent FAQ Accordion">
              {pageFaqs.map((faq, idx) => {
                const isOpen = openFaqIndices.has(idx);
                const buttonId = `faq-btn-${idx}`;
                const panelId = `faq-panel-${idx}`;

                return (
                  <div key={faq.q} className={`wa-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      id={buttonId}
                      type="button"
                      className="wa-faq-question-btn"
                      onClick={() => handleToggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="wa-faq-q-text">{faq.q}</span>
                      <span className="wa-faq-q-icon" aria-hidden="true">
                        <ChevronDown size={18} />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="wa-faq-answer-panel"
                      hidden={!isOpen}
                    >
                      <p className="wa-faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. RELATED SERVICES NAVIGATION
            ========================================================================= */}
        <section className="wa-section wa-related-services-section">
          <div className="container wa-container">
            <div className="wa-section-header">
              <span className="wa-section-eyebrow">Explore Connected Platforms</span>
              <h2 className="wa-h2">Related Enterprise AI Services</h2>
            </div>

            <div className="wa-related-links-bar">
              <Link to="/services/ai-agent-development" className="wa-related-pill">
                <span>AI Agent Development</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/services/whatsapp-coexistence" className="wa-related-pill">
                <span>WhatsApp Coexistence Mode</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/services/crm-development" className="wa-related-pill">
                <span>Custom CRM Software</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/services/ai-chatbots" className="wa-related-pill">
                <span>AI Chatbot Development</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. CONTACT & BOOK DEMO
            ========================================================================= */}
        <div id="contact">
          <ContactSection
            eyebrow="Schedule a Technical Walkthrough"
            title="Ready to automate customer conversations?"
            subtitle="Speak with our conversational AI architects. We will evaluate your WhatsApp infrastructure, design your voice dialogue pipeline, and demonstrate live sub-300ms agent calls."
            checklist={[
              'Official WhatsApp Cloud API verification check',
              'Custom conversational dialogue design session',
              'Full CRM & telephony integration roadmap',
              'Live sandbox trial with zero downtime'
            ]}
          />
        </div>

        {/* Demo Modal Trigger */}
        <ContactModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          prefillMessage="I would like to book a demo of the WhatsApp Calling Agent Bots."
        />
      </div>
    </>
  );
}
