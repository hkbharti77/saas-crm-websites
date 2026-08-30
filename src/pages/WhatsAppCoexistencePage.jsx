import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  Users, 
  Bot, 
  Send, 
  Layers, 
  ShieldCheck, 
  Smartphone,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Cpu,
  GitFork,
  Lock,
  Radio,
  TrendingUp
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import { trackBookDemo, trackEvent } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';
import './WhatsAppCoexistencePage.css';

const capabilitiesList = [
  {
    num: '01',
    icon: <Smartphone size={22} />,
    title: 'Single Number, Dual Surface',
    desc: 'Customers reach your official number. Your team sees messages on the phone app and Gyan VaniAi web dashboard simultaneously.'
  },
  {
    num: '02',
    icon: <RefreshCw size={22} />,
    title: 'Real-Time Bidirectional Sync',
    desc: 'Incoming messages appear instantly on both surfaces. Replies sent from mobile reflect in the CRM web inbox immediately.'
  },
  {
    num: '03',
    icon: <Bot size={22} />,
    title: '24/7 AI Auto-Replies',
    desc: 'AI agents answer customer questions overnight under 300ms latency. Chats sync to your phone app for seamless morning follow-up.'
  },
  {
    num: '04',
    icon: <Send size={22} />,
    title: 'Unlimited Bulk Broadcasts',
    desc: 'Bypass the phone app 256 contact limit. Send broadcasts to 10,000+ contacts via Cloud API while keeping one-on-one phone chats active.'
  },
  {
    num: '05',
    icon: <Users size={22} />,
    title: 'Shared Team Inbox & SLA',
    desc: 'Multiple team members handle conversations with individual logins and chat assignments, while the owner mirrors chats on mobile.'
  },
  {
    num: '06',
    icon: <Zap size={22} />,
    title: 'Click-to-WhatsApp Ad Capture',
    desc: 'Leads from Meta ads receive instant automated welcome messages via API, then populate on your mobile app for personal sales touch.'
  },
  {
    num: '07',
    icon: <Layers size={22} />,
    title: 'Automatic CRM Lead Logging',
    desc: 'Every conversation auto-logs into Gyan VaniAi CRM pipelines, capturing lead stages, buyer intent, and deal records automatically.'
  },
  {
    num: '08',
    icon: <ShieldCheck size={22} />,
    title: '100% Reversible',
    desc: 'Zero lock-in. You can disconnect the API integration anytime from Meta Business Manager. Your phone app and chats remain intact.'
  },
];

const metaArchPillars = [
  {
    icon: <GitFork size={22} />,
    title: "Dual-Surface Webhook Fanout",
    desc: "Meta Cloud API gateway receives incoming WhatsApp messages and splits the packet: one delivery stream reaches your mobile client socket, while a parallel webhook dispatches to Gyan VaniAi CRM."
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Bidirectional State Mirroring",
    desc: "When a human rep replies from their iPhone or Android app, Meta broadcasts a webhook event to Gyan VaniAi, instantly recording the conversation in the customer CRM timeline."
  },
  {
    icon: <Cpu size={22} />,
    title: "Single WABA Identity",
    desc: "Both your mobile app and enterprise Cloud API authenticate under one verified Meta WhatsApp Business Account (WABA). No need to buy secondary virtual numbers."
  },
  {
    icon: <Lock size={22} />,
    title: "Enterprise Meta Encryption",
    desc: "Messages maintain Signal-protocol encryption on phone apps combined with SOC-2 and ISO-27001 compliant Meta Cloud API encryption in transit and at rest."
  }
];

const faqs = [
  {
    q: "What is WhatsApp Coexistence Mode?",
    a: "WhatsApp Coexistence is an official Meta WhatsApp Business Platform feature allowing your business to operate the standard WhatsApp Business mobile app on your phone AND Gyan VaniAi AI CRM & Cloud API on the exact same phone number simultaneously. Messages, read receipts, and chat histories sync in real time across both your phone and our web dashboard."
  },
  {
    q: "Will I lose my existing WhatsApp chat history or contacts?",
    a: "No! Unlike standard API migrations that force you to delete or reset your mobile app, Coexistence keeps your existing WhatsApp Business app intact. Your previous chat history, contact lists, and labels remain completely safe on your phone."
  },
  {
    q: "Can my team reply from their phones while AI handles automated queries?",
    a: "Yes! That is the core benefit of Coexistence. Your team or business owner can continue replying to customers from their phone app as usual. Meanwhile, Gyan VaniAi AI agents handle 24/7 automated replies, bulk campaign broadcasts, and multi-agent CRM tracking in parallel."
  },
  {
    q: "How long does it take to set up WhatsApp Coexistence with Gyan VaniAi?",
    a: "Setup takes under 5 minutes. Using Meta 1-Click Embedded Signup directly inside our platform, you log in with your Facebook account, verify your number, select Coexistence mode, and you are ready to go immediately with zero downtime."
  },
  {
    q: "Is Coexistence reversible if I ever want to switch back?",
    a: "Yes, 100%. Coexistence is not a lock-in. You can disconnect the API integration anytime from your Meta Business Manager, and your phone app will continue working seamlessly without any data loss."
  },
  {
    q: "Can I get a Verified Green Tick on Coexistence mode?",
    a: "Yes! Meta grants Official Business Account (Green Tick) verification at the account level. It appears on both your WhatsApp mobile app and our Cloud API. Gyan VaniAi assists all clients with the Meta green tick application during onboarding."
  }
];

export default function WhatsAppCoexistencePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
    trackEvent('faq_toggle', { index, question: faqs[index].q });
  };

  const { theme } = useTheme();
  const isLight = theme === 'light';
  const pageUrl = "https://www.gyanvaniai.online/services/whatsapp-coexistence";

  return (
    <>
      <Helmet>
        <title>WhatsApp Business Automation & Coexistence | Gyan VaniAi</title>
        <meta name="description" content="Unlock WhatsApp Business automation using the official Cloud API. Integrate WhatsApp CRM and Coexistence mode without losing your mobile app access." />
        <meta name="keywords" content="WhatsApp Coexistence, WhatsApp Business Automation, Meta Tech Provider, WhatsApp CRM, Cloud API Coexistence, Dual Surface WhatsApp, WhatsApp Broadcasts" />
        <link rel="canonical" href={pageUrl} />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="WhatsApp Business Automation & Coexistence | Gyan VaniAi" />
        <meta property="og:description" content="Unlock WhatsApp Business automation using the official Cloud API. Integrate WhatsApp CRM and Coexistence mode without losing your mobile app access." />
        <meta property="og:image" content="https://www.gyanvaniai.online/whatsapp_coexistence_dark.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content="WhatsApp Business Automation & Coexistence | Gyan VaniAi" />
        <meta name="twitter:description" content="Unlock WhatsApp Business automation using the official Cloud API. Integrate WhatsApp CRM and Coexistence mode without losing your mobile app access." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/whatsapp_coexistence_dark.webp" />

        {/* Structured Schema */}
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "WhatsApp Coexistence CRM & Meta API Automation",
                "provider": {
                  "@id": "https://www.gyanvaniai.online/#organization"
                },
                "areaServed": ["Europe", "Asia", "Africa", "Worldwide"],
                "description": "Native Meta Tech Provider WhatsApp Coexistence mode enabling mobile app and AI CRM integration on the same phone number.",
                "url": "${pageUrl}"
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.gyanvaniai.online/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Services",
                    "item": "https://www.gyanvaniai.online/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "WhatsApp Coexistence",
                    "item": "${pageUrl}"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  ${faqs.map(faq => `{
                    "@type": "Question",
                    "name": ${JSON.stringify(faq.q)},
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": ${JSON.stringify(faq.a)}
                    }
                  }`).join(',')}
                ]
              }
            ]
          `}
        </script>
      </Helmet>

      <div className="coexistence-page">
        
        {/* 1. HERO SECTION WITH IMMERSIVE WHATSAPP COEXISTENCE BACKGROUND */}
        <section className="coexistence-hero-section" id="coexistence-hero" aria-label="WhatsApp Coexistence Hero">
          <div className="hero-media" aria-hidden="true">
            <picture>
              <img
                key={isLight ? 'light' : 'dark'}
                src={isLight ? '/whatsapp_coexistence_light.webp' : '/whatsapp_coexistence_dark.webp'}
                alt="WhatsApp Business mobile app and CRM dashboard dual-surface coexistence synchronization"
                width="1920"
                height="1080"
                fetchPriority="high"
                decoding="sync"
                className="hero-media-img"
              />
            </picture>
            <div className="hero-media-veil"></div>
          </div>

          <div className="container coexistence-hero-container">
            <div className="coexistence-hero-left">
              <div className="coexistence-eyebrow">
                <ShieldCheck size={16} />
                <span>Official Meta Tech Infrastructure Feature</span>
              </div>
              
              <h1 className="coexistence-hero-title">
                WhatsApp Business Automation<br />
                <span className="text-gradient">
                  Phone App + AI CRM on the Same Number
                </span>
              </h1>

              <p className="coexistence-hero-desc">
                Stop choosing between your phone inbox and enterprise automation. With official Meta Coexistence Mode, your team keeps replying from their WhatsApp Business mobile app while <strong>Gyan VaniAi</strong> adds 24/7 AI auto-replies, bulk broadcasts, and CRM lead tracking on the exact same phone number.
              </p>

              <div className="coexistence-hero-actions">
                <button 
                  id="btn-coexistence-hero-demo"
                  className="btn btn-primary coexistence-hero-btn" 
                  onClick={() => { trackBookDemo('coexistence-hero'); setIsModalOpen(true); }}
                >
                  <span>Connect Your WhatsApp Number</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Live Telemetry Row */}
              <div className="hero-telemetry-row">
                <div className="hero-telemetry-pill">
                  <span className="telemetry-dot dot-emerald"></span>
                  <Zap size={13} className="telemetry-icon" />
                  <span>Avg Response: <strong>&lt; 3 seconds</strong></span>
                </div>
                <div className="hero-telemetry-pill">
                  <span className="telemetry-dot dot-cyan"></span>
                  <TrendingUp size={13} className="telemetry-icon" />
                  <span>Conversion Lift: <strong>+4.2x Growth</strong></span>
                </div>
                <div className="hero-telemetry-pill">
                  <span className="telemetry-dot dot-green"></span>
                  <ShieldCheck size={13} className="telemetry-icon" />
                  <span>Official API: <strong>99.99% Uptime</strong></span>
                </div>
              </div>

              <div className="coexistence-hero-trust">
                <span className="coexistence-trust-pill"><span className="dot"></span> Zero Chat Loss</span>
                <span className="coexistence-trust-pill"><span className="dot"></span> No Phone Reset</span>
                <span className="coexistence-trust-pill"><span className="dot"></span> 1-Click Embedded Signup</span>
                <span className="coexistence-trust-pill"><span className="dot"></span> 100% Reversible</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 8 UNLOCKED SUPERPOWERS GRID */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-eyebrow">Enterprise Capabilities</span>
              <h2 className="h2">What Coexistence Unlocks On Top of Your Phone App</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Keep your existing workflow while unlocking 8 powerful enterprise capabilities your phone app cannot do alone.
              </p>
            </div>

            <div className="coexistence-capabilities-grid">
              {capabilitiesList.map((item) => (
                <article key={item.num} className="capability-card">
                  <div className="capability-card-top">
                    <span className="capability-num">{item.num}</span>
                    <div className="capability-icon-wrap">{item.icon}</div>
                  </div>
                  <h3 className="capability-title">{item.title}</h3>
                  <p className="capability-desc">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. META TECHNICAL ARCHITECTURE & HOW IT WORKS */}
        <section className="section container" style={{ padding: '5.25rem 0' }}>
          <div className="section-header section-header--center">
            <span className="section-eyebrow">Technical Architecture</span>
            <h2 className="h2">How Official Meta Coexistence Works Under the Hood</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              Understand the official Meta Cloud API infrastructure connecting your standard WhatsApp Business app to Gyan VaniAi enterprise CRM.
            </p>
          </div>

          <div className="coexistence-arch-grid">
            {metaArchPillars.map((p) => (
              <div key={p.title} className="coexistence-arch-card">
                <div className="coexistence-arch-card-header">
                  <div className="coexistence-arch-icon">{p.icon}</div>
                  <h3 className="coexistence-arch-card-title">{p.title}</h3>
                </div>
                <p className="coexistence-arch-card-desc">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Infrastructure Diagram Box */}
          <div className="coexistence-diagram-box">
            <h3 className="coexistence-diagram-title">Meta Coexistence Dual Routing Topology</h3>
            <p className="coexistence-diagram-sub">
              Every message travels through Meta official global gateway, fanning out in sub-300ms latency to both your physical phone and AI CRM webhook cluster.
            </p>

            <div className="coexistence-flow-pipeline">
              {/* Step 1: Customer */}
              <div className="pipeline-step-box">
                <Radio size={24} color="var(--primary-color)" style={{ margin: '0 auto 0.5rem' }} />
                <h4>Inbound Customer Message</h4>
                <p>Sent to your single business WhatsApp number.</p>
              </div>

              {/* Connector */}
              <div className="pipeline-connector">
                <ArrowRight size={22} />
              </div>

              {/* Step 2 & 3: Meta Cloud Gateway splitting into 2 Branches */}
              <div className="pipeline-branches">
                <div className="pipeline-branch-card whatsapp">
                  <Smartphone size={22} color="#25D366" />
                  <div className="pipeline-branch-info">
                    <h5>Branch A: WhatsApp Business Mobile App</h5>
                    <p>Reps read, reply, and view chats on their physical iOS/Android phone.</p>
                  </div>
                </div>

                <div className="pipeline-branch-card crm">
                  <Bot size={22} color="var(--primary-color)" />
                  <div className="pipeline-branch-info">
                    <h5>Branch B: Gyan VaniAi Cloud API & AI CRM</h5>
                    <p>Instant RAG AI auto-replies, lead assignment, and CRM pipeline tracking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPARISON TABLE */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-eyebrow">Setup Comparison</span>
              <h2 className="h2">Comparing Setup Paths</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Why WhatsApp Coexistence with Gyan VaniAi is the ideal architecture for growing businesses.
              </p>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature / Capability</th>
                    <th>Mobile App Only</th>
                    <th>Old API Migration</th>
                    <th className="col-highlight">Gyan VaniAi Coexistence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Keep Phone App Working</strong></td>
                    <td><span className="status-tag-positive">✓ Yes</span></td>
                    <td><span className="status-tag-negative">✕ Lost Completely</span></td>
                    <td className="col-highlight"><span className="status-tag-positive">✓ Yes (Simultaneous)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Keep Existing Chat History</strong></td>
                    <td><span className="status-tag-positive">✓ Yes</span></td>
                    <td><span className="status-tag-negative">✕ Wiped</span></td>
                    <td className="col-highlight"><span className="status-tag-positive">✓ 100% Preserved</span></td>
                  </tr>
                  <tr>
                    <td><strong>24/7 AI Auto-Replies</strong></td>
                    <td><span className="status-tag-negative">✕ Basic Auto-text</span></td>
                    <td><span className="status-tag-positive">✓ Yes</span></td>
                    <td className="col-highlight"><span className="status-tag-positive">✓ Sub-300ms LLM AI Agents</span></td>
                  </tr>
                  <tr>
                    <td><strong>Bulk Broadcast Capacity</strong></td>
                    <td><span className="status-tag-negative">Max 256 contacts</span></td>
                    <td><span className="status-tag-positive">✓ Unlimited</span></td>
                    <td className="col-highlight"><span className="status-tag-positive">✓ Unlimited (10,000+)</span></td>
                  </tr>
                  <tr>
                    <td><strong>Onboarding Setup Time</strong></td>
                    <td><span className="status-tag-neutral">Instant</span></td>
                    <td><span className="status-tag-negative">Days to Weeks</span></td>
                    <td className="col-highlight"><span className="status-tag-positive">⚡ Under 5 Minutes</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. 3-STEP SETUP GUIDE */}
        <section className="section container" style={{ padding: '5.25rem 0' }}>
          <div className="section-header section-header--center">
            <span className="section-eyebrow">Quick Onboarding</span>
            <h2 className="h2">Enable Coexistence in 3 Simple Steps</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              No app reinstall, no phone reset, and zero downtime.
            </p>
          </div>

          <div className="coexistence-steps-grid">
            
            <div className="coexistence-step-card">
              <div className="coexistence-step-badge">01</div>
              <h3 className="coexistence-step-title">Open Meta Embedded Signup</h3>
              <p className="coexistence-step-desc">
                Log in with your Facebook business manager directly inside the Gyan VaniAi dashboard.
              </p>
            </div>

            <div className="coexistence-step-card">
              <div className="coexistence-step-badge">02</div>
              <h3 className="coexistence-step-title">Select Coexistence Mode</h3>
              <p className="coexistence-step-desc">
                Select Coexistence when prompted by Meta. This keeps your phone app installed and active.
              </p>
            </div>

            <div className="coexistence-step-card">
              <div className="coexistence-step-badge">03</div>
              <h3 className="coexistence-step-title">Instant Bidirectional Sync</h3>
              <p className="coexistence-step-desc">
                Send a test message. It reflects immediately on both your mobile phone and Gyan VaniAi CRM.
              </p>
            </div>

          </div>
        </section>

        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
              <span className="section-eyebrow">Got Questions?</span>
              <h2 className="h2">Frequently Asked Questions</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Everything you need to know about WhatsApp Coexistence Mode.
              </p>
            </div>

            <div className="coexistence-faq-container">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="coexistence-faq-item"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="coexistence-faq-btn"
                    aria-expanded={openFaq === index}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <HelpCircle size={20} color="var(--primary-color)" />
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: 'var(--text-secondary)'
                      }} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="coexistence-faq-answer">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. BOTTOM CTA */}
        <section className="container" style={{ marginTop: '2rem' }}>
          <div className="coexistence-cta-card">
            <h2 className="coexistence-cta-heading">Ready to Enable WhatsApp Coexistence?</h2>
            <p className="coexistence-cta-sub">
              Connect your official WhatsApp number in under 5 minutes with our Meta Embedded Signup integration. Get a free tailored demo today.
            </p>
            <button 
              id="btn-coexistence-cta-demo"
              type="button"
              className="btn btn-primary"
              onClick={() => { trackBookDemo('coexistence-bottom'); setIsModalOpen(true); }}
              style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem', fontWeight: '700' }}
            >
              <span>Book a Free Live Demo</span>
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </section>

        {/* 8. RELATED SERVICES */}
        <section className="container" style={{ padding: '2rem 0' }}>
          <div className="coexistence-related-bar">
            <span className="coexistence-related-title">Related Services:</span>
            <div className="coexistence-related-links">
              <a href="/services/crm-development" className="coexistence-related-link">
                Custom CRM Software Development →
              </a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="/services/ai-development" className="coexistence-related-link">
                AI Software Development →
              </a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="/blog" className="coexistence-related-link">
                WhatsApp Automation Insights (Blog) →
              </a>
            </div>
          </div>
        </section>

      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
