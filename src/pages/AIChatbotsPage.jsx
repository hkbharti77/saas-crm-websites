import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Bot, 
  MessageSquare, 
  Database, 
  BrainCircuit, 
  Zap, 
  Layers, 
  Headset, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Minus, 
  Calendar, 
  Globe, 
  Clock, 
  Check, 
  X, 
  Sparkles,
  Users,
  ShieldCheck,
  Cpu,
  MessageSquareCode
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import './AIChatbotsPage.css';

const SITE = 'https://www.gyanvaniai.online';

export default function AIChatbotsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const expandAllFaqs = () => {
    setOpenFaq(openFaq === -2 ? -1 : -2);
  };

  const heroBullets = [
    { text: 'Context-Aware Conversations', icon: <BrainCircuit size={16} /> },
    { text: 'RAG Knowledge Grounding', icon: <Database size={16} /> },
    { text: 'Autonomous API & CRM Actions', icon: <Zap size={16} /> },
    { text: 'Seamless Human Handoff', icon: <Headset size={16} /> }
  ];

  const diffFeatures = [
    {
      title: 'Context-Aware Conversations',
      icon: <MessageSquareCode size={22} />,
      desc: 'Understands customer intent, nuanced phrasing, and previous dialogue history across multi-turn sessions.'
    },
    {
      title: 'RAG Knowledge Retrieval',
      icon: <Database size={22} />,
      desc: 'Retrieves verified facts from your approved manuals, PDFs, and documentation with zero hallucinations.'
    },
    {
      title: 'Autonomous Actions',
      icon: <Zap size={22} />,
      desc: 'Executes real-time tasks—scheduling meetings, creating tickets, and checking order status on the fly.'
    },
    {
      title: 'CRM & API Integration',
      icon: <Layers size={22} />,
      desc: 'Reads and writes directly to custom CRMs, databases, payment gateways, and backend endpoints.'
    },
    {
      title: 'Omnichannel Conversations',
      icon: <Globe size={22} />,
      desc: 'Deploys seamlessly across WhatsApp Business API, website chat widgets, and mobile apps with synchronized state.'
    },
    {
      title: 'Human Handoff',
      icon: <Headset size={22} />,
      desc: 'Detects complex queries or customer frustration to escalate to live agents with full context briefs.'
    }
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'User Message',
      category: 'Intake',
      icon: <MessageSquare size={18} />,
      desc: 'Customer initiates conversation via website widget, mobile app, or WhatsApp Business channel.',
      status: 'Web & WhatsApp Ingest'
    },
    {
      num: '02',
      title: 'Intent Detection',
      category: 'NLP Engine',
      icon: <BrainCircuit size={18} />,
      desc: 'Natural language understanding parses core intent, entity parameters, and emotional sentiment.',
      status: 'Intent & Entity Parsed'
    },
    {
      num: '03',
      title: 'Knowledge Retrieval',
      category: 'RAG System',
      icon: <Database size={18} />,
      desc: 'Retrieves relevant text chunks from tenant-isolated vector databases containing your business docs.',
      status: 'Vector Context Injected'
    },
    {
      num: '04',
      title: 'AI Response',
      category: 'LLM Generation',
      icon: <Bot size={18} />,
      desc: 'Generates a precise, brand-aligned, empathetic answer grounded strictly in verified knowledge.',
      status: 'Sub-300ms Generation'
    },
    {
      num: '05',
      title: 'Tool / API Action',
      category: 'Execution',
      icon: <Zap size={18} />,
      desc: 'Triggers connected APIs—books calendar slots, issues return labels, or calculates custom pricing.',
      status: 'API Function Executed'
    },
    {
      num: '06',
      title: 'CRM Update',
      category: 'Sync Engine',
      icon: <Layers size={18} />,
      desc: 'Automatically creates or updates lead records, conversation tags, and interaction transcripts.',
      status: 'CRM Record Synchronized'
    },
    {
      num: '07',
      title: 'Human Handoff',
      category: 'Escalation',
      icon: <Headset size={18} />,
      desc: 'Seamlessly transfers dialogue to a live representative if requested or flagged by sentiment rules.',
      status: 'Live Rep Context Brief'
    }
  ];

  const capabilities = [
    {
      title: 'Natural Language Understanding',
      icon: <BrainCircuit size={20} />,
      desc: 'Accurately parses user intentions, colloquial language, and domain terminology across 30+ languages.'
    },
    {
      title: 'RAG / Knowledge Base',
      icon: <Database size={20} />,
      desc: 'Dynamic vector search over manuals, policy docs, and product catalogs with strict hallucination guardrails.'
    },
    {
      title: 'Multi-Turn Memory',
      icon: <Clock size={20} />,
      desc: 'Retains conversation state throughout extended sessions, remembering past inputs and user preferences.'
    },
    {
      title: 'CRM Integration',
      icon: <Layers size={20} />,
      desc: 'Bidirectional sync with custom CRMs, HubSpot, and Salesforce to log interactions and manage pipeline deals.'
    },
    {
      title: 'API & Tool Calling',
      icon: <Zap size={20} />,
      desc: 'Connects directly to backend databases, payment processors, and internal microservices in real time.'
    },
    {
      title: 'Lead Qualification',
      icon: <CheckCircle2 size={20} />,
      desc: 'Dynamically scores prospect budget, authority, need, and urgency before scheduling sales calls.'
    },
    {
      title: 'Appointment Booking',
      icon: <Calendar size={20} />,
      desc: 'Direct calendar integration with Google Calendar and Outlook to schedule demos with zero human delay.'
    },
    {
      title: 'Human Escalation',
      icon: <Headset size={20} />,
      desc: 'Intelligent routing rules transfer complex queries to live agents along with an instant AI summary.'
    }
  ];

  const faqs = [
    {
      q: 'What is an AI chatbot?',
      a: 'An AI chatbot is an intelligent conversational application that uses Natural Language Processing (NLP) and Large Language Models (LLMs) to understand open-ended customer messages, retrieve accurate business knowledge, execute workflows, and hold natural human-like conversations.'
    },
    {
      q: 'Can the chatbot use our business knowledge?',
      a: 'Yes. We implement Retrieval-Augmented Generation (RAG) with tenant-isolated vector databases. The chatbot searches your approved documents, FAQs, catalogs, and policies in real time to generate accurate answers with zero hallucination.'
    },
    {
      q: 'Can it connect with our CRM?',
      a: 'Yes. Our AI chatbots integrate bidirectionally with custom CRMs, HubSpot, Salesforce, Zoho, and custom SQL databases to look up existing customer records, log transcripts, update deal stages, and create contacts automatically.'
    },
    {
      q: 'Can it perform actions through APIs?',
      a: 'Absolutely. Using autonomous tool calling, the chatbot can query inventory databases, book appointments on Google/Outlook calendars, process lead forms, trigger webhooks, and call custom REST APIs during live conversations.'
    },
    {
      q: 'Can it support WhatsApp and website chat?',
      a: 'Yes. We engineer omnichannel chatbots that operate seamlessly across the official WhatsApp Business API, customizable website chat widgets, and mobile applications with synchronized conversational memory.'
    },
    {
      q: 'Can conversations be handed to humans?',
      a: 'Yes. When a user requests a human agent or when sentiment analysis detects frustration, the chatbot executes a seamless warm handoff to your live team, providing an instant summary and chat history.'
    },
    {
      q: 'Can the chatbot qualify leads?',
      a: 'Yes. The chatbot asks conversational qualifying questions (BANT/MEDDIC framework), evaluates lead fit, assigns qualification scores, and routes high-intent prospects straight to your sales team\'s calendar.'
    },
    {
      q: 'How long does AI chatbot development take?',
      a: 'A standard custom AI chatbot with knowledge base ingestion and CRM integration typically takes 2 to 3 weeks for end-to-end development, testing, security guardrail validation, and deployment.'
    }
  ];

  const relatedServices = [
    {
      title: 'AI Agent Development',
      url: '/services/ai-agent-development',
      icon: <Cpu size={20} />,
      desc: 'Autonomous multi-step agents that execute complex business workflows.'
    },
    {
      title: 'Voice Bot Assistants',
      url: '/services/voice-bot-assistant',
      icon: <Headset size={20} />,
      desc: 'Human-like AI voice agents for inbound support and outbound calls.'
    },
    {
      title: 'Lead Management',
      url: '/services/lead-management',
      icon: <Layers size={20} />,
      desc: 'End-to-end lead capture, enrichment, scoring, and automated distribution.'
    },
    {
      title: 'WhatsApp Coexistence',
      url: '/services/whatsapp-coexistence',
      icon: <Globe size={20} />,
      desc: 'Unify official WhatsApp API automation with live team chat access.'
    },
    {
      title: 'Custom CRM Development',
      url: '/services/crm-development',
      icon: <Database size={20} />,
      desc: 'Bespoke CRM architecture designed around your organizational workflows.'
    }
  ];

  return (
    <div className="chatbots-page">
      <Helmet>
        <title>AI Chatbot Development Company | Custom RAG Chatbots | Gyan VaniAi</title>
        <meta 
          name="description" 
          content="Build intelligent AI chatbots with RAG knowledge grounding, autonomous API actions, CRM sync, and human handoff. Deploy across WhatsApp and web." 
        />
        <link rel="canonical" href={`${SITE}/services/ai-chatbots`} />
      </Helmet>

      {/* ==========================================================================
         1. HERO SECTION
         ========================================================================== */}
      <section className="chatbots-hero-section">
        <div className="chatbots-container">
          <nav className="chatbots-hero-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li style={{ color: 'var(--primary-color)' }}>AI Chatbot Development</li>
            </ol>
          </nav>

          <div className="chatbots-hero-grid">
            <div className="chatbots-hero-content">
              <div className="chatbots-hero-eyebrow-pill">
                <span className="chatbots-hero-pulse-dot"></span>
                AI Chatbot Platform
              </div>

              <h1 className="chatbots-hero-title">
                AI Chatbot Development
              </h1>

              <p className="chatbots-hero-desc">
                Build intelligent AI chatbots that understand customer intent, retrieve business knowledge, perform actions, and hand conversations to human teams when needed.
              </p>

              <div className="chatbots-hero-bullets">
                {heroBullets.map((item, idx) => (
                  <div key={idx} className="chatbots-hero-bullet-item">
                    <div className="chatbots-hero-bullet-icon">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="chatbots-hero-actions">
                <button
                  type="button"
                  className="chatbots-btn-primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get a Free Consultation <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="chatbots-btn-secondary"
                  onClick={() => document.getElementById('chatbot-workflow')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Purpose-Built AI Chatbot Hero Visual */}
            <div className="chatbots-mockup-wrapper">
              <img
                src="/hero-ai-chatbots.svg"
                alt="Enterprise AI Chatbot & RAG Assistant Platform by Gyan VaniAi"
                width="1000"
                height="750"
                className="chatbots-hero-img"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem', boxShadow: 'var(--shadow-hover)' }}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         2. OVERVIEW / WHO IT'S FOR / WHAT YOU GET (3 CARDS)
         ========================================================================== */}
      <section className="chatbots-overview-section">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Enterprise Foundations</span>
            <h2 className="chatbots-section-title">Built for Scalable Customer Conversations</h2>
            <p className="chatbots-section-subtitle">
              Empower your business with autonomous AI assistants that resolve inquiries instantly, qualify opportunities, and streamline operations.
            </p>
          </div>

          <div className="chatbots-overview-grid">
            {/* Card 1: Overview */}
            <div className="chatbots-overview-card">
              <div className="chatbots-overview-card-top">
                <span className="chatbots-overview-badge">01 OVERVIEW</span>
                <div className="chatbots-overview-icon-wrap">
                  <Bot size={22} />
                </div>
              </div>
              <h3 className="chatbots-overview-heading">Intelligent Conversational AI</h3>
              <p className="chatbots-overview-desc">
                Build intelligent AI chatbots that understand customer intent, retrieve business knowledge, perform actions, and hand conversations to human teams when needed.
              </p>
              <ul className="chatbots-overview-checklist">
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Context-aware multi-turn conversations</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Sub-300ms latency grounded in approved data</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Zero hallucination via tenant-isolated RAG</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Who It's For */}
            <div className="chatbots-overview-card">
              <div className="chatbots-overview-card-top">
                <span className="chatbots-overview-badge">02 WHO IT'S FOR</span>
                <div className="chatbots-overview-icon-wrap">
                  <Users size={22} />
                </div>
              </div>
              <h3 className="chatbots-overview-heading">Modern Customer-Facing Teams</h3>
              <p className="chatbots-overview-desc">
                Designed for high-growth businesses and enterprise operations needing 24/7 responsiveness without losing brand tone or personal care.
              </p>
              <ul className="chatbots-overview-checklist">
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Customer support & service teams</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Sales & lead qualification reps</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>E-commerce, SaaS & service businesses</span>
                </li>
              </ul>
            </div>

            {/* Card 3: What You Get */}
            <div className="chatbots-overview-card">
              <div className="chatbots-overview-card-top">
                <span className="chatbots-overview-badge">03 WHAT YOU GET</span>
                <div className="chatbots-overview-icon-wrap">
                  <ShieldCheck size={22} />
                </div>
              </div>
              <h3 className="chatbots-overview-heading">Complete Chatbot Infrastructure</h3>
              <p className="chatbots-overview-desc">
                An end-to-end conversational AI suite connecting your data, business tools, and customer communication channels.
              </p>
              <ul className="chatbots-overview-checklist">
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>RAG knowledge base integration</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>CRM sync & autonomous API tool calling</span>
                </li>
                <li className="chatbots-overview-check-item">
                  <CheckCircle2 size={16} className="chatbots-overview-check-icon" />
                  <span>Omnichannel web & WhatsApp deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         3. WHAT MAKES OUR AI CHATBOTS DIFFERENT (6 CARDS)
         ========================================================================== */}
      <section className="chatbots-diff-section">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Why Choose Our Platform</span>
            <h2 className="chatbots-section-title">What Makes Our AI Chatbots Different</h2>
            <p className="chatbots-section-subtitle">
              Move beyond rigid script-based bots with autonomous conversational intelligence that connects to your business systems.
            </p>
          </div>

          <div className="chatbots-diff-grid">
            {diffFeatures.map((item, idx) => (
              <div key={idx} className="chatbots-diff-card">
                <div className="chatbots-diff-icon-wrap">
                  {item.icon}
                </div>
                <h3 className="chatbots-diff-title">{item.title}</h3>
                <p className="chatbots-diff-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         4. WORKFLOW SECTION
         ========================================================================== */}
      <section className="chatbots-workflow-section" id="chatbot-workflow">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Conversational Workflow</span>
            <h2 className="chatbots-section-title">How Your AI Chatbot Handles Every Conversation</h2>
            <p className="chatbots-section-subtitle">
              From incoming message to verified action and human escalation, see how intelligent dialogue flows through each stage.
            </p>
          </div>

          <div className="chatbots-workflow-grid">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="chatbots-workflow-card">
                <div className="chatbots-workflow-top">
                  <span className="chatbots-workflow-idx">{step.num} · {step.category}</span>
                  <div className="chatbots-workflow-icon-wrap">
                    {step.icon}
                  </div>
                </div>
                <h3 className="chatbots-workflow-title">{step.title}</h3>
                <p className="chatbots-workflow-desc">{step.desc}</p>
                <div className="chatbots-workflow-status">
                  <Sparkles size={11} /> {step.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         5. AI CHATBOT CAPABILITIES (8 GRID)
         ========================================================================== */}
      <section className="chatbots-cap-section">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Core Capabilities</span>
            <h2 className="chatbots-section-title">Enterprise Chatbot Capabilities</h2>
            <p className="chatbots-section-subtitle">
              Engineered for scale, enterprise security, and measurable operational efficiency across departments.
            </p>
          </div>

          <div className="chatbots-cap-grid">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="chatbots-cap-card">
                <div className="chatbots-cap-icon-wrap">
                  {cap.icon}
                </div>
                <h3 className="chatbots-cap-title">{cap.title}</h3>
                <p className="chatbots-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         6. TRADITIONAL VS AI CHATBOT COMPARISON
         ========================================================================== */}
      <section className="chatbots-compare-section">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Direct Comparison</span>
            <h2 className="chatbots-section-title">Traditional Chatbot vs AI-Powered Chatbot</h2>
            <p className="chatbots-section-subtitle">
              Compare rigid legacy decision trees with modern context-aware conversational AI.
            </p>
          </div>

          <div className="chatbots-compare-grid">
            {/* Left: Traditional Chatbot */}
            <div className="chatbots-compare-card">
              <div className="chatbots-compare-header">
                <X size={24} color="var(--error-color, #ef4444)" />
                <h3 className="chatbots-compare-title">Traditional Chatbot</h3>
              </div>
              <ul className="chatbots-compare-list">
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Rule-based rigid decision trees</span>
                </li>
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Static, pre-written canned responses</span>
                </li>
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Limited context & zero memory across turns</span>
                </li>
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>No real reasoning or semantic understanding</span>
                </li>
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Limited integrations & manual spreadsheet updates</span>
                </li>
                <li className="chatbots-compare-item">
                  <X size={16} color="var(--error-color, #ef4444)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Frequent dead-ends and customer frustration</span>
                </li>
              </ul>
            </div>

            {/* Right: Gyan VaniAi AI Chatbot */}
            <div className="chatbots-compare-card ai-enhanced">
              <div className="chatbots-compare-header">
                <Check size={24} color="var(--primary-color)" />
                <h3 className="chatbots-compare-title" style={{ color: 'var(--primary-color)' }}>Gyan VaniAi AI Chatbot</h3>
              </div>
              <ul className="chatbots-compare-list">
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Context-aware, human-like fluid conversations</span>
                </li>
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>RAG-powered answers from your verified data</span>
                </li>
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Multi-step reasoning and dynamic intent parsing</span>
                </li>
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Autonomous CRM & API tool execution in real time</span>
                </li>
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Contextual human escalation with full summaries</span>
                </li>
                <li className="chatbots-compare-item">
                  <Check size={16} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Continuous learning from business knowledge updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         7. FAQ SECTION (SINGLE, CLEAN)
         ========================================================================== */}
      <section className="chatbots-faq-section">
        <div className="chatbots-container chatbots-faq-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Frequently Asked Questions</span>
            <h2 className="chatbots-section-title">Everything You Need to Know</h2>
            <p className="chatbots-section-subtitle">
              Clear answers about architecture, integrations, RAG knowledge grounding, and development timelines.
            </p>
          </div>

          <div className="chatbots-faq-controls">
            <button
              type="button"
              className="chatbots-faq-toggle-all-btn"
              onClick={expandAllFaqs}
            >
              {openFaq === -2 ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          <div className="chatbots-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === -2 || openFaq === idx;
              return (
                <div key={idx} className={`chatbots-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="chatbots-faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <div className="chatbots-faq-icon-wrapper">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <div
                    className="chatbots-faq-answer"
                    style={{
                      maxHeight: isOpen ? '400px' : '0px',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <p className="chatbots-faq-answer-inner">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         8. RELATED SERVICES
         ========================================================================== */}
      <section className="chatbots-related-section">
        <div className="chatbots-container">
          <div className="chatbots-section-header">
            <span className="chatbots-section-eyebrow">Explore More</span>
            <h2 className="chatbots-section-title">Related AI & Automation Services</h2>
          </div>

          <div className="chatbots-related-grid">
            {relatedServices.map((service, idx) => (
              <Link key={idx} to={service.url} className="chatbots-related-card">
                <div className="chatbots-related-card-top">
                  <div className="chatbots-related-icon-wrap">
                    {service.icon}
                  </div>
                  <ArrowRight size={18} className="chatbots-related-arrow" />
                </div>
                <h3 className="chatbots-related-title">{service.title}</h3>
                <p className="chatbots-related-desc">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         9. FINAL CTA SECTION
         ========================================================================== */}
      <div id="contact">
        <ContactSection
          eyebrow="START BUILDING"
          title="Ready to Build Your AI Chatbot?"
          subtitle="Gyan VaniAi designs, develops, integrates, and deploys custom AI chatbots tailored to your business data, workflows, and customer channels."
          checklist={[
            'Context-Aware AI Architecture',
            'RAG Knowledge Grounding',
            'CRM & API Tool Calling',
            'Omnichannel WhatsApp & Web Deploy'
          ]}
        />
      </div>
    </div>
  );
}
