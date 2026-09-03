import React, { useState, useEffect, useRef } from 'react';
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
  Cpu,
  GitFork,
  Lock,
  Radio,
  TrendingUp,
  CheckCircle2,
  Check,
  Clock,
  Server
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import Card3DTilt from '../components/ui/Card3DTilt';
import AnimatedBeam from '../components/ui/AnimatedBeam';
import BorderBeam from '../components/ui/BorderBeam';
import Ripple from '../components/ui/Ripple';
import NumberTicker from '../components/ui/NumberTicker';
import Particles from '../components/ui/Particles';
import SpotlightCard from '../components/ui/SpotlightCard';
import Meteors from '../components/ui/Meteors';
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
  const [openFaqIndices, setOpenFaqIndices] = useState(new Set([0, 1]));
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Animated beam container refs for dual-fanout pipeline
  const beamContainerRef = useRef(null);
  const customerNodeRef = useRef(null);
  const metaGatewayNodeRef = useRef(null);
  const mobileNodeRef = useRef(null);
  const crmNodeRef = useRef(null);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const isAllFaqsOpen = openFaqIndices.size === faqs.length;

  const toggleFaq = (index) => {
    setOpenFaqIndices((prev) => {
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
    if (isAllFaqsOpen) {
      setOpenFaqIndices(new Set());
    } else {
      setOpenFaqIndices(new Set(faqs.map((_, i) => i)));
    }
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Coexistence Mode: Mobile App + Cloud API on One Number | Gyan VaniAi</title>
        <meta
          name="description"
          content="Operate your WhatsApp Business mobile app and enterprise Cloud API simultaneously on the exact same phone number. Zero chat loss, no phone reset, 24/7 AI auto-replies, and live CRM sync."
        />
        <link rel="canonical" href="https://www.gyanvaniai.online/services/whatsapp-coexistence" />
        <meta property="og:title" content="WhatsApp Coexistence Mode: Mobile App + Cloud API on One Number | Gyan VaniAi" />
        <meta
          property="og:description"
          content="Keep your WhatsApp Business phone app active while unlocking 24/7 AI CRM auto-replies, bulk broadcasts, and lead tracking on the exact same phone number."
        />
        <meta property="og:url" content="https://www.gyanvaniai.online/services/whatsapp-coexistence" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.gyanvaniai.online/whatsapp_coexistence_dark.webp" />

        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "WhatsApp Coexistence Mode Integration",
                "serviceType": "Conversational AI & WhatsApp Business Platform Coexistence",
                "provider": {
                  "@type": "Organization",
                  "name": "Gyan VaniAi",
                  "url": "https://www.gyanvaniai.online"
                },
                "areaServed": "Worldwide",
                "description": "Enterprise WhatsApp Coexistence Mode setup enabling simultaneous WhatsApp Business mobile app and Cloud API operation on the same verified phone number with real-time CRM synchronization.",
                "url": "https://www.gyanvaniai.online/services/whatsapp-coexistence"
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
        
        {/* =========================================================================
            1. HERO SECTION WITH 3D DUAL-SURFACE SHOWCASE & MAGIC UI COMPONENTS
            ========================================================================= */}
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
            <Particles quantity={28} color="#25D366" />
          </div>

          <div className="container coexistence-hero-container">
            <div className="coexistence-hero-grid">
              
              {/* Left Column: Copy & Actions */}
              <div className="coexistence-hero-left">
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

                {/* Live Telemetry Row with Magic UI NumberTicker */}
                <div className="hero-telemetry-row">
                  <div className="hero-telemetry-pill">
                    <span className="telemetry-dot dot-emerald"></span>
                    <Zap size={13} className="telemetry-icon" />
                    <span>Avg Latency: <strong>&lt; 300ms</strong></span>
                  </div>
                  <div className="hero-telemetry-pill">
                    <span className="telemetry-dot dot-cyan"></span>
                    <TrendingUp size={13} className="telemetry-icon" />
                    <span>Conversion Lift: <strong>+<NumberTicker value={4.2} decimalPlaces={1} />x Growth</strong></span>
                  </div>
                  <div className="hero-telemetry-pill">
                    <span className="telemetry-dot dot-green"></span>
                    <ShieldCheck size={13} className="telemetry-icon" />
                    <span>Official Meta API: <strong><NumberTicker value={99.99} decimalPlaces={2} suffix="%" /> Uptime</strong></span>
                  </div>
                </div>

                <div className="coexistence-hero-trust">
                  <span className="coexistence-trust-pill"><span className="dot"></span> Zero Chat Loss</span>
                  <span className="coexistence-trust-pill"><span className="dot"></span> No Phone Reset</span>
                  <span className="coexistence-trust-pill"><span className="dot"></span> 1-Click Embedded Signup</span>
                  <span className="coexistence-trust-pill"><span className="dot"></span> 100% Reversible</span>
                </div>
              </div>

              {/* Right Column: 3D Dual-Surface Perspective Showcase */}
              <div className="coexistence-hero-showcase">
                <Card3DTilt className="coex-tilt-wrapper" maxRotation={8} scale={1.02}>
                  <div className="coex-showcase-frame">
                    <BorderBeam size={200} duration={8} colorFrom="#10b981" colorTo="#06b6d4" borderWidth={1.5} />
                    
                    {/* Top System Status Bar */}
                    <div className="coex-frame-header">
                      <div className="coex-frame-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="coex-frame-title">
                        <span className="coex-live-pulse"></span>
                        <span>Meta WABA Coexistence Stream Active</span>
                      </div>
                      <div className="coex-frame-badge">
                        <Lock size={12} />
                        <span>Signal Protocol + TLS 1.3</span>
                      </div>
                    </div>

                    {/* Dual Surface Comparison Body */}
                    <div className="coex-dual-body">
                      {/* Left: Rep Mobile App */}
                      <div className="coex-surface-col phone">
                        <div className="coex-col-header">
                          <Smartphone size={16} color="#25D366" />
                          <span>Owner's Phone App</span>
                        </div>
                        <div className="coex-mock-chat">
                          <div className="coex-bubble in">
                            <span className="coex-bubble-author">Customer</span>
                            <p>“Need pricing for 50 licenses.”</p>
                            <span className="coex-time">10:14 AM</span>
                          </div>
                          <div className="coex-bubble out rep">
                            <span className="coex-bubble-author">Rep (Mobile)</span>
                            <p>“Sending you our enterprise quote!”</p>
                            <span className="coex-time">10:15 AM ✓✓</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Bidirectional Sync Beam */}
                      <div className="coex-sync-divider">
                        <div className="coex-sync-icon-circle">
                          <RefreshCw size={16} className="coex-spin-slow" />
                        </div>
                        <span className="coex-sync-label">Sub-300ms Real-Time Mirror</span>
                      </div>

                      {/* Right: Gyan VaniAi AI CRM Dashboard */}
                      <div className="coex-surface-col crm">
                        <div className="coex-col-header">
                          <Bot size={16} color="var(--primary-color)" />
                          <span>Gyan VaniAi Cloud CRM</span>
                        </div>
                        <div className="coex-crm-card">
                          <div className="coex-crm-row">
                            <span className="coex-crm-key">Deal Stage:</span>
                            <span className="coex-crm-val highlight">Enterprise Lead (94/100)</span>
                          </div>
                          <div className="coex-crm-row">
                            <span className="coex-crm-key">Auto Action:</span>
                            <span className="coex-crm-val">Logged into Salesforce</span>
                          </div>
                          <div className="coex-crm-row">
                            <span className="coex-crm-key">AI Agent:</span>
                            <span className="coex-crm-val green">Auto-Reply Streamed (240ms)</span>
                          </div>
                          <div className="coex-crm-row">
                            <span className="coex-crm-key">Rep Assignment:</span>
                            <span className="coex-crm-val">Marcus Vance (Synced)</span>
                          </div>
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
            2. 8 UNLOCKED SUPERPOWERS GRID (Wrapped in 3D Card Tilt)
            ========================================================================= */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
<h2 className="h2">What Coexistence Unlocks On Top of Your Phone App</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Keep your existing workflow while unlocking 8 powerful enterprise capabilities your phone app cannot do alone.
              </p>
            </div>

            <div className="coexistence-capabilities-grid">
              {capabilitiesList.map((item) => (
                <Card3DTilt key={item.num} className="coex-cap-tilt" maxRotation={8} scale={1.02}>
                  <SpotlightCard
                    spotlightColor="rgba(37, 211, 102, 0.16)"
                    borderColor="rgba(37, 211, 102, 0.4)"
                    style={{ height: '100%', borderRadius: 'inherit' }}
                  >
                    <article className="capability-card" style={{ border: 'none', background: 'transparent' }}>
                      <div className="capability-card-top">
                        <span className="capability-num">{item.num}</span>
                        <div className="capability-icon-wrap">{item.icon}</div>
                      </div>
                      <h3 className="capability-title">{item.title}</h3>
                      <p className="capability-desc">{item.desc}</p>
                    </article>
                  </SpotlightCard>
                </Card3DTilt>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. META TECHNICAL ARCHITECTURE WITH 3D ANIMATED BEAM DUAL-FANOUT
            ========================================================================= */}
        <section className="section container" style={{ padding: '5.25rem 0' }}>
          <div className="section-header section-header--center">
<h2 className="h2">How Official Meta Coexistence Works Under the Hood</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              Understand the official Meta Cloud API infrastructure connecting your standard WhatsApp Business app to Gyan VaniAi enterprise CRM.
            </p>
          </div>

          <div className="coexistence-arch-grid">
            {metaArchPillars.map((p) => (
              <Card3DTilt key={p.title} className="coex-arch-tilt" maxRotation={6} scale={1.01}>
                <SpotlightCard
                  spotlightColor="rgba(20, 184, 166, 0.18)"
                  borderColor="rgba(20, 184, 166, 0.42)"
                  style={{ height: '100%', borderRadius: 'inherit' }}
                >
                  <div className="coexistence-arch-card" style={{ border: 'none', background: 'transparent' }}>
                    <div className="coexistence-arch-card-header">
                      <div className="coexistence-arch-icon">{p.icon}</div>
                      <h3 className="coexistence-arch-card-title">{p.title}</h3>
                    </div>
                    <p className="coexistence-arch-card-desc">{p.desc}</p>
                  </div>
                </SpotlightCard>
              </Card3DTilt>
            ))}
          </div>

          {/* Interactive 3D Animated Beam Infrastructure Diagram */}
          <div className="coexistence-diagram-box">
            <h3 className="coexistence-diagram-title">Meta Coexistence Dual Routing Topology</h3>
            <p className="coexistence-diagram-sub">
              Every message travels through Meta official global gateway, fanning out in sub-300ms latency to both your physical phone and AI CRM webhook cluster.
            </p>

            <div ref={beamContainerRef} className="coex-beam-stage" aria-label="Meta Coexistence Dual Fanout Gateway Stage">
              {/* Customer Node */}
              <div ref={customerNodeRef} className="coex-beam-node customer">
                <div className="coex-beam-circle">
                  <Radio size={22} color="var(--primary-color)" />
                </div>
                <span className="coex-beam-label">Inbound Customer Message</span>
                <span className="coex-beam-sub">Official WABA Number</span>
              </div>

              {/* Central Meta Cloud Gateway with Magic UI Ripple */}
              <div ref={metaGatewayNodeRef} className="coex-beam-node meta-hub">
                <Ripple mainCircleSize={110} numCircles={4} circleColor="rgba(37, 211, 102, 0.3)" />
                <div className="coex-beam-circle meta-circle">
                  <GitFork size={26} color="#ffffff" />
                </div>
                <span className="coex-beam-label">Meta Cloud API Gateway</span>
                <span className="coex-beam-sub">Sub-300ms Dual Fanout</span>
              </div>

              {/* Branch Container */}
              <div className="coex-beam-destinations">
                {/* Branch A: Mobile App */}
                <div ref={mobileNodeRef} className="coex-beam-node branch branch-a">
                  <div className="coex-beam-circle">
                    <Smartphone size={22} color="#25D366" />
                  </div>
                  <span className="coex-beam-label">Branch A: WhatsApp Mobile</span>
                  <span className="coex-beam-sub">Reps Read & Reply on Phone</span>
                </div>

                {/* Branch B: CRM & AI Agent */}
                <div ref={crmNodeRef} className="coex-beam-node branch branch-b">
                  <div className="coex-beam-circle">
                    <Bot size={22} color="var(--primary-color)" />
                  </div>
                  <span className="coex-beam-label">Branch B: Gyan VaniAi CRM</span>
                  <span className="coex-beam-sub">24/7 AI Auto-Replies & Sync</span>
                </div>
              </div>

              {/* Animated Beams linking nodes */}
              <AnimatedBeam
                containerRef={beamContainerRef}
                fromRef={customerNodeRef}
                toRef={metaGatewayNodeRef}
                duration={2.5}
                delay={0}
              />
              <AnimatedBeam
                containerRef={beamContainerRef}
                fromRef={metaGatewayNodeRef}
                toRef={mobileNodeRef}
                duration={2.5}
                delay={0.6}
              />
              <AnimatedBeam
                containerRef={beamContainerRef}
                fromRef={metaGatewayNodeRef}
                toRef={crmNodeRef}
                duration={2.5}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. COMPARISON TABLE (Wrapped in Card Tilt with BorderBeam Highlight)
            ========================================================================= */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
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

        {/* =========================================================================
            5. 3-STEP SETUP GUIDE (3D Cards)
            ========================================================================= */}
        <section className="section container" style={{ padding: '5.25rem 0' }}>
          <div className="section-header section-header--center">
<h2 className="h2">Enable Coexistence in 3 Simple Steps</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              No app reinstall, no phone reset, and zero downtime.
            </p>
          </div>

          <div className="coexistence-steps-grid">
            <Card3DTilt className="coex-step-tilt" maxRotation={8} scale={1.02}>
              <div className="coexistence-step-card">
                <div className="coexistence-step-badge">01</div>
                <h3 className="coexistence-step-title">Open Meta Embedded Signup</h3>
                <p className="coexistence-step-desc">
                  Log in with your Facebook business manager directly inside the Gyan VaniAi dashboard.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt className="coex-step-tilt" maxRotation={8} scale={1.02}>
              <div className="coexistence-step-card">
                <div className="coexistence-step-badge">02</div>
                <h3 className="coexistence-step-title">Select Coexistence Mode</h3>
                <p className="coexistence-step-desc">
                  Select Coexistence when prompted by Meta. This keeps your phone app installed and active.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt className="coex-step-tilt" maxRotation={8} scale={1.02}>
              <div className="coexistence-step-card">
                <div className="coexistence-step-badge">03</div>
                <h3 className="coexistence-step-title">Instant Bidirectional Sync</h3>
                <p className="coexistence-step-desc">
                  Send a test message. It reflects immediately on both your mobile phone and Gyan VaniAi CRM.
                </p>
              </div>
            </Card3DTilt>
          </div>
        </section>

        {/* =========================================================================
            6. ACCESSIBLE FAQ WITH SINGLE COMPACT TOGGLE
            ========================================================================= */}
        <section className="section bg-tinted" style={{ padding: '5.25rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
<h2 className="h2">Frequently Asked Questions</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Everything you need to know about WhatsApp Coexistence Mode.
              </p>

              {/* Single Compact Toggle */}
              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="coex-faq-toggle-btn"
                  onClick={toggleAllFaqs}
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

            <div className="coexistence-faq-container">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndices.has(index);
                const buttonId = `coex-faq-btn-${index}`;
                const panelId = `coex-faq-panel-${index}`;

                return (
                  <div key={index} className={`coexistence-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="coexistence-faq-btn"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HelpCircle size={20} color="var(--primary-color)" />
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={20} 
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease',
                          color: 'var(--text-secondary)'
                        }} 
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="coexistence-faq-answer"
                      hidden={!isOpen}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. BOTTOM CTA
            ========================================================================= */}
        <section className="container" style={{ marginTop: '2rem' }}>
          <div className="coexistence-cta-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <Meteors number={16} />
            <div style={{ position: 'relative', zIndex: 1 }}>
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
          </div>
        </section>

        {/* =========================================================================
            8. RELATED SERVICES
            ========================================================================= */}
        <section className="container" style={{ padding: '2rem 0' }}>
          <div className="coexistence-related-bar">
            <span className="coexistence-related-title">Related Services:</span>
            <div className="coexistence-related-links">
              <a href="/services/whatsapp-calling-agent" className="coexistence-related-link">
                WhatsApp Calling Agent Bots →
              </a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="/services/crm-development" className="coexistence-related-link">
                Custom CRM Software Development →
              </a>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <a href="/services/ai-development" className="coexistence-related-link">
                AI Software Development →
              </a>
            </div>
          </div>
        </section>

      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
