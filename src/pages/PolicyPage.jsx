import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';
import { API_BASE_URL } from '../config/apiConfig';

function PrivacyRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: 'Data Access Request',
    description: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setResultData(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/privacy-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          requestType: formData.requestType,
          description: formData.description.trim(),
          _hp_company: honeypot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultData(data);
        setFormData({ name: '', email: '', phone: '', requestType: 'Data Access Request', description: '' });
      } else {
        setErrorMessage(data.error || 'Failed to submit privacy request. Please retry or email our Grievance Officer.');
      }
    } catch (error) {
      console.error('Privacy request submission error:', error);
      setErrorMessage('Network connection error. Please verify your connection or email our Grievance Officer directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'rgba(255, 255, 255, 0.02)',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 XXXXXXXXXX"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Request Type *</label>
        <select
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          required
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}
        >
          <option value="Data Access Request">Data Access Request</option>
          <option value="Data Deletion Request">Data Deletion Request</option>
          <option value="Data Correction Request">Data Correction Request</option>
          <option value="Privacy Complaint">Privacy Complaint</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Request Details *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Please provide details about your request..."
          rows="6"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '0.875rem 1.5rem',
          backgroundColor: isLoading ? 'var(--border-color)' : 'var(--primary-color)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Submitting...' : 'Submit Request'}
      </button>

      {errorMessage && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '6px',
          color: '#ef4444',
          fontSize: '0.92rem'
        }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {resultData && (
        <div style={{
          padding: '1.25rem',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '8px',
          color: '#10b981',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          <p style={{ fontWeight: '700', margin: '0 0 0.5rem 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✓ Statutory Privacy Request Registered (DPDP Act, 2023)
          </p>
          <p style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
            <strong>Official Reference Ticket:</strong> <code style={{ background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: '4px', color: 'var(--primary-color)', fontWeight: 'bold' }}>{resultData.ticketId}</code>
          </p>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontSize: '0.88rem' }}>
            {resultData.message}
          </p>
          {resultData.slaResolutionDueAt && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
              Statutory Resolution Due Date: <strong>{new Date(resultData.slaResolutionDueAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</strong> (within 15 business days). Please keep your ticket reference for all future communication.
            </p>
          )}
        </div>
      )}
    </form>
  );
}

export default function PolicyPage() {
  const [activeSection, setActiveSection] = useState('data');
  
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const privacyWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Gyan VaniAi",
    "url": "https://www.gyanvaniai.com/privacy",
    "description": "Privacy Policy and Data Handling practices for Gyan VaniAi.",
    "publisher": {
      "@id": "https://www.gyanvaniai.com/#organization"
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <SeoHead
        title="Privacy Policy | Gyan VaniAi"
        description="Privacy Policy and Data Handling practices for Gyan VaniAi."
        canonical="https://www.gyanvaniai.com/privacy"
        preloadImage="/privacy_image.webp"
        schema={privacyWebPageSchema}
      />
      <div className="legal-hero">
        <div className="container legal-hero-content">
          <img src="/privacy_image.webp" alt="" width="400" height="400" className="legal-hero-img" fetchPriority="high" decoding="sync" />
          <div>
            <h1 className="h1">Privacy Policy</h1>
            <p className="text-lg text-muted" style={{ marginTop: '0.5rem' }}>Effective Date: June 14, 2026</p>
          </div>
        </div>
      </div>
      
      <div className="legal-container">
        <aside className="legal-sidebar">
          <h4 className="h4" style={{ marginBottom: '1.5rem' }}>Table of Contents</h4>
          <a href="#role" className={`legal-nav-link ${activeSection === 'role' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('role'); }}>1. Who We Are &amp; Our Role</a>
          <a href="#data" className={`legal-nav-link ${activeSection === 'data' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('data'); }}>2. What We Collect &amp; AI Training</a>
          <a href="#cookie-consent-data" className={`legal-nav-link ${activeSection === 'cookie-consent-data' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('cookie-consent-data'); }}>3. Cookies &amp; Consent Audit Records</a>
          <a href="#consent" className={`legal-nav-link ${activeSection === 'consent' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('consent'); }}>4. Consent &amp; Withdrawal</a>
          <a href="#whatsapp" className={`legal-nav-link ${activeSection === 'whatsapp' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('whatsapp'); }}>5. WhatsApp &amp; Communications</a>
          <a href="#thirdparty" className={`legal-nav-link ${activeSection === 'thirdparty' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('thirdparty'); }}>6. Sub-Processors &amp; Cross-Border Transfers</a>
          <a href="#retention" className={`legal-nav-link ${activeSection === 'retention' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('retention'); }}>7. Data Retention Schedules</a>
          <a href="#security" className={`legal-nav-link ${activeSection === 'security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('security'); }}>8. Security &amp; Breach Intimation</a>
          <a href="#children" className={`legal-nav-link ${activeSection === 'children' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('children'); }}>9. Children's Data Protection (§9)</a>
          <a href="#rights" className={`legal-nav-link ${activeSection === 'rights' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('rights'); }}>10. Your Data Principal Rights</a>
          <a href="#privacy-contact" className={`legal-nav-link ${activeSection === 'privacy-contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('privacy-contact'); }}>11. Designated Grievance Officer</a>
          <a href="#changes" className={`legal-nav-link ${activeSection === 'changes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('changes'); }}>12. Policy Changes &amp; DSR Form</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          
          <div style={{ padding: '1rem 1.25rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              <strong>Statutory Compliance Statement:</strong> This Privacy Policy explains how Gyan VaniAi Technologies handles personal data under India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>DPDP Rules, 2025</strong>, and the <strong>Information Technology Act, 2000</strong>. This notice is available in English and Hindi, and is accessible in any of the 22 languages specified in the Eighth Schedule of the Constitution of India upon written request to our Grievance Officer.
            </p>
          </div>

          <section id="role" className="legal-section">
            <h2 className="h2">1. Who We Are &amp; Our Dual Role</h2>
            <p className="text-muted">Gyan VaniAi Technologies operates under two distinct legal capacities under the DPDP Act, 2023:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><strong>As a Data Fiduciary:</strong> For visitors accessing our public website, requesting demo consultations, interacting with our cookie preferences banner, and subscribing to our newsletters, we determine the purpose and means of data processing.</li>
              <li><strong>As a Data Processor:</strong> When enterprise business clients utilize our CRM platform, WhatsApp chatbots, AI voice calling infrastructure, and live agent queues to interact with their own end-customers, the business client acts as the Data Fiduciary. Gyan VaniAi processes such data strictly upon verified fiduciary instructions. End-users of our business clients should direct data access, correction, or erasure requests to the respective business first; we assist our clients in routing and fulfilling verified requests under statutory timelines.</li>
            </ul>
          </section>

          <section id="data" className="legal-section">
            <h2 className="h2">2. What We Collect, Purpose Specification &amp; AI Training</h2>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Data Category</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Specified Purpose</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Lawful Basis</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-muted)' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Contact &amp; Account Details:</strong> Name, work email, phone number, organization name.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Evaluate requirements, schedule architectural demos, provision CRM accounts, and provide requested customer support.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Verifiable Consent (DPDP Act §6)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Agent Interaction Logs:</strong> Messages and workflow inputs with our automated agents.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Deliver conversational responses, route inquiries, and facilitate human agent handoffs.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Verifiable Consent (DPDP Act §6)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Technical Metadata:</strong> IP address, response latency, HTTP status codes, browser headers.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Protect platform security, prevent brute-force attacks, and maintain service stability.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Legitimate Use &amp; Reasonable Security Safeguards (DPDP Act §7 / §8(5))</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Consent Audit Records:</strong> Selected preferences, IP, timestamp, geolocation.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Maintain legally verifiable audit evidence of consent actions.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Statutory Obligation (DPDP Act §6 &amp; §8)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Marketing Preferences:</strong> WhatsApp and email newsletter opt-in flags.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Send product updates and engineering playbooks only where explicitly requested.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Separate Affirmative Consent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '1.25rem' }}>
              <h3 className="h3" style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                🛡️ AI Models &amp; Training Commitment
              </h3>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6' }}>
                <strong>We do NOT use your personal data, confidential business workflows, or conversation logs to train, retrain, or fine-tune public foundation AI models (e.g. OpenAI, Claude, or Google Gemini).</strong> All AI agent integrations operate through zero-data-retention API endpoints or dedicated enterprise retrieval pipelines (RAG) that interrogate only your authorized organizational knowledge base.
              </p>
            </div>
          </section>

          <section id="cookie-consent-data" className="legal-section">
            <h2 className="h2">3. Cookies &amp; Consent Audit Records</h2>
            <p className="text-muted">When you interact with our cookie consent banner (Accept All, Reject All, Essential Only, or Manage Preferences), we automatically record an immutable audit log consisting of:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>IP Address &amp; Approximate Location:</strong> Public IP and city/region/country derived at the moment of your consent decision.</li>
              <li><strong>Browser &amp; Device Environment:</strong> Browser type, operating system, and language preferences.</li>
              <li><strong>Consent Decisions:</strong> Explicit status (accepted, rejected, or customized category choices across functional, analytics, session replay, and marketing).</li>
              <li><strong>Referrer URL &amp; Timestamp:</strong> The exact URL visited and the UTC timestamp of the consent decision.</li>
            </ul>
            <p className="text-muted"><strong>Purpose &amp; Non-Profiling:</strong> Consent audit logs are maintained solely to establish statutory compliance under Section 6 of the DPDP Act, 2023 and GDPR Article 7(1). This data is never used for advertising, behavioural profiling, or commercial resale.</p>
            <p className="text-muted"><strong>Retention:</strong> Consent audit records are retained for exactly <strong>12 months</strong> (31,536,000 seconds) via automated database TTL index schedules, after which they are permanently expunged.</p>

            <h3 className="h3" style={{ fontSize: '1.15rem', marginTop: '1.75rem', marginBottom: '0.75rem' }}>3.1 Telemetry, Measurement &amp; Analytics Framework</h3>
            <p className="text-muted">To maintain infrastructure reliability and understand technical performance without compromising individual privacy, our site uses the following tiered telemetry framework:</p>

            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Provider &amp; Tool</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Data Collected &amp; Flow</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>ePrivacy / Device Storage</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Lawful Basis</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Consent &amp; Revocation</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-muted)' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Vercel Web Analytics</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Aggregate page paths, device operating system, browser family. Strict pathname-only URL sanitization (query parameters stripped).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Cookieless; uses 24h rotating request-derived hash. No client-side storage.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Legitimate Interest (Aggregate operational metrics).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Operational telemetry; opt-out honored via browser privacy signals.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Cloudflare Web Analytics</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Aggregate browser performance timings (LCP, FID/INP, CLS) and HTTP response telemetry.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Cookieless beacon reading browser Performance APIs. Zero persistent identifiers.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Legitimate Interest (Service availability &amp; latency monitoring).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Non-profiling telemetry; honors Global Privacy Control (GPC).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Google Analytics 4 (GA4)</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Page navigation metrics. In default state, transmits cookieless pings without cookies. Full session metrics only on consent.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Default: Cookieless.<br />Consented: <code>_ga</code> cookies (up to 14 months).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Google Consent Mode v2 (Default: Denied; Consented: Affirmative Opt-In).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Dynamically managed via Cookie Preferences. Withdrawal updates state to <code>denied</code>.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}><strong>Microsoft Clarity</strong></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Interaction trajectories, mouse movements, scroll depth, click heatmaps for UX debugging. Sensitive text inputs automatically masked.</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Device storage: <code>_clck</code> (1yr), <code>_clsk</code> (24h).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Consent — GDPR Art.6(1)(a) &amp; ePrivacy Art.5(3).</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Strictly gated behind affirmative Session Replay consent. Revocation immediately dispatches <code>clarity("consent", false)</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="consent" className="legal-section">
            <h2 className="h2">4. Consent &amp; Ease of Withdrawal (§6(4))</h2>
            <p className="text-muted">Where processing relies on consent, consent is obtained through clear affirmative action (such as an unticked checkbox). Consent is never bundled with access to unrelated services.</p>
            <p className="text-muted"><strong>Ease of Withdrawal:</strong> Under Section 6(4) of the DPDP Act, 2023, you hold the absolute right to withdraw consent as easily as it was given. You may revoke consent at any time by:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li>Clicking the <strong>"Manage Cookies"</strong> link in our website footer.</li>
              <li>Replying <strong>STOP</strong> or <strong>UNSUBSCRIBE</strong> to any WhatsApp or SMS message.</li>
              <li>Submitting our interactive <a href="#privacy-contact" style={{ color: 'var(--primary-color)' }}>Data Subject Rights Form</a> below.</li>
              <li>Directly emailing our Grievance Officer at <a href="mailto:contact@gyanvaniai.com" style={{ color: 'var(--primary-color)' }}>contact@gyanvaniai.com</a>.</li>
            </ul>
            <p className="text-muted">Upon receiving your withdrawal, we cease processing your personal data within <strong>7 business days</strong>, unless statutory retention is required under applicable law (such as tax records or active dispute resolution).</p>
          </section>

          <section id="whatsapp" className="legal-section">
            <h2 className="h2">5. WhatsApp &amp; Communications Consent</h2>
            <p className="text-muted">We maintain a strict zero-spam communications policy in adherence to Meta WhatsApp Business Messaging Policies and TRAI regulations (TCCCPR 2018):</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Transactional Messages:</strong> Appointment reminders, demo links, and service confirmations requested by you are delivered to fulfill your explicit inquiry.</li>
              <li><strong>Marketing &amp; Playbooks:</strong> Outbound educational or marketing updates are delivered ONLY where you have provided separate, affirmative opt-in consent. Simply submitting a phone number does not opt you into marketing.</li>
              <li><strong>Instant Opt-Out:</strong> Any recipient can instantly terminate messaging by replying <code>STOP</code>, <code>CANCEL</code>, or <code>UNSUBSCRIBE</code>.</li>
            </ul>
          </section>

          <section id="thirdparty" className="legal-section">
            <h2 className="h2">6. Sub-Processors &amp; Cross-Border Data Transfers (§16)</h2>
            <p className="text-muted">We never sell, rent, or trade personal data. Data is shared only with vetted sub-processors under binding contractual agreements ensuring equivalent technical security safeguards:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Meta Platforms, Inc.:</strong> Routes official WhatsApp Cloud API messages, subject to Meta Platform Policies.</li>
              <li><strong>Amazon Web Services (AWS) &amp; Google Cloud:</strong> Secure cloud database hosting, serverless functions, and encrypted document storage.</li>
              <li><strong>Cloudflare:</strong> CDN edge caching, DDoS mitigation, and SSL/TLS 1.3 encryption.</li>
              <li><strong>ipapi.co:</strong> Anonymized IP-to-country geolocation verification for statutory consent auditing.</li>
              <li><strong>Vercel Inc.:</strong> Serverless infrastructure hosting and cookieless aggregate web analytics.</li>
              <li><strong>Google LLC:</strong> Web measurement via Google Analytics with Google Consent Mode v2.</li>
              <li><strong>Microsoft Corporation:</strong> User experience and session replay diagnostics via Microsoft Clarity (only upon explicit affirmative consent).</li>
            </ul>
            <h3 className="h3" style={{ fontSize: '1.15rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>Cross-Border Transfers under DPDP Act §16</h3>
            <p className="text-muted">Where data is transferred outside the territory of India for cloud computation, such transfer adheres strictly to Section 16 of the DPDP Act, 2023. Data is never transferred to any territory or nation restricted or blacklisted by the Central Government of India.</p>
          </section>

          <section id="retention" className="legal-section">
            <h2 className="h2">7. Data Retention &amp; Purpose-Exhaustion Erasure (§8(7))</h2>
            <p className="text-muted">In accordance with Section 8(7) of the DPDP Act, 2023, personal data is retained only for the duration necessary to satisfy the purpose for which it was collected:</p>
            <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Data Classification</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Retention Period</th>
                    <th style={{ padding: '0.75rem 0.5rem' }}>Post-Retention Action</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--text-muted)' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Demo / Commercial Inquiries</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Maximum 24 months from last correspondence</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Cryptographically anonymized / erased</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Unconfirmed Newsletter Leads</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>30 days from sign-up trigger</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Permanently deleted</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Cookie Consent Audit Logs</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>12 months (365 days)</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Automated TTL database purge</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Security &amp; Forensic Audit Trails</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>12 months minimum (CERT-In mandate)</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>Immutable append-only storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="security" className="legal-section">
            <h2 className="h2">8. Security Safeguards &amp; Incident Intimation (§8(5), §8(6))</h2>
            <p className="text-muted">We enforce reasonable security safeguards in accordance with Section 8(5) of the DPDP Act, 2023:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li><strong>Encryption:</strong> TLS 1.3 encryption for all data in transit; AES-256 / KMS encryption for sensitive credentials and tokens at rest.</li>
              <li><strong>PII Masking &amp; Hashing:</strong> Passwords and API tokens are cryptographically salted and hashed. Sensitive personal credentials are automatically redacted from logs.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Strict principle-of-least-privilege access for administrative consoles, protected by multi-factor authentication.</li>
              <li><strong>Tamper-Resistant Auditing:</strong> Security audit logs reject modification (HTTP 405 Method Not Allowed) to preserve forensic integrity.</li>
            </ul>
            <h3 className="h3" style={{ fontSize: '1.15rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>Breach Notification Protocol</h3>
            <p className="text-muted">In the event of a verified personal data breach, Gyan VaniAi will intimate the Data Protection Board of India and each affected Data Principal in the form and manner prescribed under Section 8(6) of the DPDP Act. In addition, critical cybersecurity incidents are reported to CERT-In within 6 hours pursuant to CERT-In Directions (2022).</p>
          </section>

          <section id="children" className="legal-section">
            <h2 className="h2">9. Children's Data Protection (DPDP Act §9)</h2>
            <p className="text-muted">Our enterprise CRM, AI bots, and software engineering services are strictly designed for businesses and professionals aged 18 and older. In compliance with Section 9 of the DPDP Act, 2023:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li>We do not knowingly solicit, collect, or process personal data of individuals under the age of 18 without verifiable parental consent.</li>
              <li>We strictly prohibit and refrain from undertaking <strong>tracking or behavioural monitoring</strong> of children (§9(2)).</li>
              <li>We strictly refrain from directing <strong>targeted advertising</strong> to children (§9(3)).</li>
            </ul>
            <p className="text-muted">If you believe that a minor has provided personal data through our website forms, please contact our Grievance Officer immediately for expedited erasure.</p>
          </section>

          <section id="rights" className="legal-section">
            <h2 className="h2">10. Your Statutory Data Principal Rights (§11–§14)</h2>
            <p className="text-muted">As a Data Principal under Chapter III of the DPDP Act, 2023, you hold the following statutory rights:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><strong>Right to Access Information (§11):</strong> Request a summary of your personal data processed, details of processing activities, and the identities of all third parties with whom your data was shared.</li>
              <li><strong>Right to Correction &amp; Updating (§12):</strong> Request correction of inaccurate or misleading data and completion of incomplete data.</li>
              <li><strong>Right to Erasure (§12):</strong> Demand complete erasure of personal data that is no longer necessary for the specified purpose or upon withdrawal of consent.</li>
              <li><strong>Right of Grievance Redressal (§13):</strong> Access readily available grievance redressal mechanisms with our designated officer.</li>
              <li><strong>Right to Nominate (§14):</strong> Nominate another individual who shall, in the event of death or incapacity, exercise your data rights.</li>
            </ul>
            <p className="text-muted"><strong>Procedural SLAs:</strong> Statutory requests are acknowledged within 24 hours of ticket generation. Identity verification is conducted within 7 business days, and complete resolution is executed within <strong>15 business days</strong> (our organizational SLA aligned with draft DPDP Rules and IT Rules 2021).</p>
          </section>

          <section id="privacy-contact" className="legal-section">
            <h2 className="h2">11. Designated Grievance Redressal Officer</h2>
            <p className="text-muted">In compliance with Section 5(2), Section 8(9), and Section 13 of the Digital Personal Data Protection Act, 2023, Gyan VaniAi has designated a dedicated Grievance Redressal Officer:</p>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '1rem 0' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-primary)' }}>Designated Grievance Redressal Officer Dossier:</p>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.92rem' }}>
                <li><strong>Designated Officer:</strong> Himanshu Bharti</li>
                <li><strong>Designation:</strong> Lead Privacy Compliance Officer &amp; Grievance Redressal Officer</li>
                <li><strong>Entity:</strong> Gyan VaniAi Technologies</li>
                <li><strong>Official Address:</strong> Dakbangla Chowk, Simri Bakhtiarpur, Bihar 852127, India</li>
                <li><strong>Statutory Grievance Email:</strong> <a href="mailto:contact@gyanvaniai.com" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>contact@gyanvaniai.com</a></li>
                <li><strong>Statutory Acknowledgment:</strong> Within 24 hours of ticket creation</li>
                <li><strong>Target Resolution SLA:</strong> 15 business days (Maximum 30 days for complex erasures)</li>
              </ul>
            </div>
          </section>

          <section id="changes" className="legal-section">
            <h2 className="h2">12. Policy Changes &amp; Interactive DSR Portal</h2>
            <p className="text-muted">We will post any policy updates here with an updated version number and effective date. For material changes impacting your rights, we will provide <strong>15 days' advance notice</strong> via platform banners or email notices.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Submit a Data Subject Request (DSR) or Grievance
            </h3>
            <PrivacyRequestForm />
          </section>
        </div>
      </div>
    </div>
  );
}