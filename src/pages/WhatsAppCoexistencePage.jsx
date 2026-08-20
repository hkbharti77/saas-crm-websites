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
  HelpCircle
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import { trackBookDemo, trackEvent } from '../utils/analytics';
import './Blog.css';

const faqs = [
  {
    q: "What is WhatsApp Coexistence Mode?",
    a: "WhatsApp Coexistence is an official Meta WhatsApp Business Platform feature allowing your business to operate the standard WhatsApp Business mobile app on your phone AND Gyan VaniAi's AI CRM & Cloud API on the exact same phone number simultaneously. Messages, read receipts, and chat histories sync in real time across both your phone and our web dashboard."
  },
  {
    q: "Will I lose my existing WhatsApp chat history or contacts?",
    a: "No! Unlike standard API migrations that force you to delete or reset your mobile app, Coexistence keeps your existing WhatsApp Business app intact. Your previous chat history, contact lists, and labels remain completely safe on your phone."
  },
  {
    q: "Can my team reply from their phones while AI handles automated queries?",
    a: "Yes! That is the core benefit of Coexistence. Your team or business owner can continue replying to customers from their phone app as usual. Meanwhile, Gyan VaniAi's AI agents handle 24/7 automated replies, bulk campaign broadcasts, and multi-agent CRM tracking in parallel."
  },
  {
    q: "How long does it take to set up WhatsApp Coexistence with Gyan VaniAi?",
    a: "Setup takes under 5 minutes. Using Meta's 1-Click Embedded Signup directly inside our platform, you log in with your Facebook account, verify your number, select Coexistence mode, and you are ready to go immediately with zero downtime."
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
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
    trackEvent('faq_toggle', { index, question: faqs[index].q });
  };

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
        <meta property="og:image" content="https://www.gyanvaniai.online/portfolio_crm.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content="WhatsApp Business Automation & Coexistence | Gyan VaniAi" />
        <meta name="twitter:description" content="Unlock WhatsApp Business automation using the official Cloud API. Integrate WhatsApp CRM and Coexistence mode without losing your mobile app access." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/portfolio_crm.webp" />

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

      <div style={{ paddingTop: '130px', paddingBottom: '80px' }}>
        
        {/* HERO SECTION */}
        <section className="container" style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'color-mix(in srgb, var(--primary-color) 12%, transparent)', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              <ShieldCheck size={18} /> Official Meta Tech Provider Feature
            </div>
            
            <h1 className="h1" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              WhatsApp Business Automation<br />
              <span style={{ color: 'var(--primary-color)' }}>
                Phone App + AI CRM on the Same Number
              </span>
            </h1>

            <p className="text-lg text-muted" style={{ marginBottom: '2.5rem', lineHeight: '1.7', fontSize: '1.2rem' }}>
              Stop choosing between your phone inbox and enterprise automation. With Meta’s official Coexistence Mode, your team keeps replying from their WhatsApp Business mobile app while <strong>Gyan VaniAi</strong> adds 24/7 AI auto-replies, bulk broadcasts, and CRM lead tracking on the exact same number.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                id="btn-coexistence-hero-demo"
                className="btn btn-primary" 
                onClick={() => { trackBookDemo('coexistence-hero'); setIsModalOpen(true); }}
                style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              >
                Connect Your WhatsApp Number <ArrowRight size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <span>✓ Zero Chat Loss</span>
              <span>✓ No Phone Reset</span>
              <span>✓ 1-Click Embedded Signup</span>
              <span>✓ 100% Reversible</span>
            </div>
          </div>
        </section>

        {/* 8 UNLOCKED SUPERPOWERS GRID */}
        <section className="section bg-alt" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
              <h2 className="h2">What Coexistence Unlocks On Top of Your Phone App</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                Keep your existing workflow while unlocking 8 powerful enterprise capabilities your phone app cannot do alone.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              
              <div className="premium-card" style={{ padding: '2rem' }}>
                <Smartphone size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Single Number, Dual Surface</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Customers reach your one official number. Your team sees messages on the mobile app AND the Gyan VaniAi web dashboard simultaneously.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <RefreshCw size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Real-Time Bidirectional Sync</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Customer pings show up instantly on both surfaces. Replies sent from the phone app reflect in the CRM web inbox immediately.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <Bot size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. 24/7 AI Auto-Replies</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  AI agents answer FAQs overnight under 300ms latency. The conversation appears on your phone app next morning for seamless hand-off.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <Send size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Unlimited Bulk Broadcasts</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Bypass the phone app's 256 recipient limit. Send broadcasts to 10,000+ contacts via Cloud API while keeping one-on-one phone chats free.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <Users size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Shared Team Inbox & SLA</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Multiple agents handle conversations from individual logins with chat assignments, while the owner mirrors everything on mobile.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <Zap size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Click-to-WhatsApp Ad Capture</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Leads from Meta ads receive instant automated welcome messages via API, then pop up on your mobile app for personal follow-up.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <Layers size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>7. Automatic CRM Lead Logging</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Every chat auto-logs into Gyan VaniAi CRM pipelines, capturing lead data, stage changes, and deal amounts without manual typing.
                </p>
              </div>

              <div className="premium-card" style={{ padding: '2rem' }}>
                <ShieldCheck size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>8. 100% Reversible</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  No lock-in door. You can disconnect the API integration from Meta Business Manager anytime. Your phone app and chats remain intact.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="section container" style={{ padding: '5rem 0' }}>
          <div className="section-header section-header--center">
            <h2 className="h2">Comparing Setup Paths</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              Why WhatsApp Coexistence with Gyan VaniAi is the best setup for growing businesses.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <thead>
                <tr style={{ background: 'color-mix(in srgb, var(--primary-color) 12%, transparent)', color: 'var(--text-primary)', textAlign: 'left' }}>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-color)' }}>Feature / Capability</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-color)' }}>Mobile App Only</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-color)' }}>Old API Migration</th>
                  <th style={{ padding: '1.2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--primary-color)', color: '#ffffff' }}>Gyan VaniAi Coexistence</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-primary)' }}>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>Keep Phone App Working</td>
                  <td style={{ padding: '1rem' }}>✓ Yes</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>❌ Lost Completely</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>✓ Yes (Simultaneous)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>Keep Existing Chat History</td>
                  <td style={{ padding: '1rem' }}>✓ Yes</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>❌ Wiped</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>✓ 100% Preserved</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>24/7 AI Auto-Replies</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>❌ Basic Auto-text</td>
                  <td style={{ padding: '1rem' }}>✓ Yes</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>✓ Sub-300ms LLM AI Agents</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>Bulk Broadcast Capacity</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>Max 256 contacts</td>
                  <td style={{ padding: '1rem' }}>Unlimited</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>✓ Unlimited (10,000+)</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem' }}>Onboarding Setup Time</td>
                  <td style={{ padding: '1rem' }}>Instant</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>Days to Weeks</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>⚡ Under 5 Minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3-STEP SETUP GUIDE */}
        <section className="section bg-alt" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
              <h2 className="h2">Enable Coexistence in 3 Simple Steps</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                No app reinstall, no phone reset, no complicated Meta forms.
              </p>
            </div>

            <div className="coexistence-steps">
              
              <div className="premium-card coexistence-step">
                <div className="coexistence-step-num">1</div>
                <h3 className="h3 coexistence-step-title">Open Meta Embedded Signup</h3>
                <p className="text-muted coexistence-step-desc">
                  Log in with your Facebook business manager directly inside the Gyan VaniAi dashboard.
                </p>
              </div>

              <div className="premium-card coexistence-step">
                <div className="coexistence-step-num">2</div>
                <h3 className="h3 coexistence-step-title">Select &quot;Coexistence Mode&quot;</h3>
                <p className="text-muted coexistence-step-desc">
                  Select Coexistence when prompted by Meta. This keeps your phone app installed and active.
                </p>
              </div>

              <div className="premium-card coexistence-step">
                <div className="coexistence-step-num">3</div>
                <h3 className="h3 coexistence-step-title">Instant Bidirectional Sync</h3>
                <p className="text-muted coexistence-step-desc">
                  Send a test message. It reflects immediately on both your mobile phone and Gyan VaniAi CRM.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="section container" style={{ padding: '5rem 0' }}>
          <div className="section-header section-header--center">
            <h2 className="h2">Frequently Asked Questions</h2>
            <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
              Everything you need to know about WhatsApp Coexistence Mode.
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item"
                style={{
                  background: 'var(--card-bg, var(--bg-alt))',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={20} color="var(--primary-color)" />
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={20} 
                    style={{ 
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </button>
                {openFaq === index && (
                  <div style={{ padding: '0 1.5rem 1.25rem 3.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="blog-cta-box" style={{ padding: '4rem 2rem', background: 'color-mix(in srgb, var(--primary-color) 10%, transparent)', borderRadius: '1.5rem', border: '1px solid color-mix(in srgb, var(--primary-color) 28%, transparent)' }}>
            <h2 className="h2" style={{ marginBottom: '1rem' }}>Ready to Enable WhatsApp Coexistence?</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6', fontSize: '1.1rem' }}>
              Connect your official WhatsApp number in under 5 minutes with our Meta Embedded Signup integration. Get a free tailored demo today.
            </p>
            <button 
              id="btn-coexistence-cta-demo"
              className="btn btn-primary"
              onClick={() => { trackBookDemo('coexistence-bottom'); setIsModalOpen(true); }}
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Book a Free Live Demo <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="container" style={{ padding: '2rem 0', textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ padding: '2rem', background: 'color-mix(in srgb, var(--primary-color) 6%, transparent)', borderRadius: '1rem' }}>
            <h2 className="h3" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Related Services</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/services/crm-development" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.target.style.borderBottom = '1px solid var(--primary-color)'} onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}>
                Custom CRM Software Development →
              </a>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <a href="/services/ai-development" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.target.style.borderBottom = '1px solid var(--primary-color)'} onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}>
                AI Software Development →
              </a>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <a href="/blog" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.target.style.borderBottom = '1px solid var(--primary-color)'} onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}>
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
