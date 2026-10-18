import React, { useEffect, useState } from 'react';
import SeoHead from '../components/SeoHead';

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState('agreement');
  
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

  const termsWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms & Conditions | Gyan VaniAi",
    "url": "https://www.gyanvaniai.com/terms",
    "description": "Terms of Service and API usage guidelines for Gyan VaniAi platforms.",
    "publisher": {
      "@id": "https://www.gyanvaniai.com/#organization"
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <SeoHead
        title="Terms & Conditions | Gyan VaniAi"
        description="Terms of Service and API usage guidelines for Gyan VaniAi platforms."
        canonical="https://www.gyanvaniai.com/terms"
        preloadImage="/terms_image.webp"
        schema={termsWebPageSchema}
      />
      <div className="legal-hero">
        <div className="container legal-hero-content">
          <img src="/terms_image.webp" alt="" width="400" height="400" className="legal-hero-img" fetchPriority="high" decoding="sync" />
          <div>
            <h1 className="h1">Terms and Conditions</h1>
            <p className="text-lg text-muted" style={{ marginTop: '0.5rem' }}>Effective Date: June 14, 2026</p>
          </div>
        </div>
      </div>
      
      <div className="legal-container">
        <aside className="legal-sidebar">
          <h4 className="h4" style={{ marginBottom: '1.5rem' }}>Table of Contents</h4>
          <a href="#agreement" className={`legal-nav-link ${activeSection === 'agreement' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('agreement'); }}>1. Agreement to Terms</a>
          <a href="#messaging" className={`legal-nav-link ${activeSection === 'messaging' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('messaging'); }}>2. Messaging Opt-in &amp; Compliance</a>
          <a href="#cookie-processing" className={`legal-nav-link ${activeSection === 'cookie-processing' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('cookie-processing'); }}>3. Cookie Consent Data Processing</a>
          <a href="#usage" className={`legal-nav-link ${activeSection === 'usage' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('usage'); }}>4. Platform Usage &amp; Intellectual Property</a>
          <a href="#liability" className={`legal-nav-link ${activeSection === 'liability' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('liability'); }}>5. Limitation of Liability</a>
          <a href="#demo-policy" className={`legal-nav-link ${activeSection === 'demo-policy' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('demo-policy'); }}>6. Live Demo &amp; 7-Day Retention</a>
          <a href="#deletion" className={`legal-nav-link ${activeSection === 'deletion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('deletion'); }}>7. User Data Deletion &amp; Rights</a>
          <a href="#governing-law" className={`legal-nav-link ${activeSection === 'governing-law' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('governing-law'); }}>8. Governing Law &amp; Jurisdiction</a>
          <a href="#dark-patterns" className={`legal-nav-link ${activeSection === 'dark-patterns' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('dark-patterns'); }}>9. Prohibition of Dark Patterns</a>
          <a href="#grievance" className={`legal-nav-link ${activeSection === 'grievance' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('grievance'); }}>10. Grievance Redressal Mechanism</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="agreement" className="legal-section">
            <h2 className="h2">1. Agreement to Terms</h2>
            <p className="text-muted">By accessing our website and utilizing our AI platforms (including CRMLite, AI Stock Kundli, and custom workflow automations), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please discontinue use of our platforms immediately.</p>
          </section>

          <section id="messaging" className="legal-section">
            <h2 className="h2">2. Messaging Opt-in &amp; Compliance</h2>
            <p className="text-muted">Gyan VaniAi utilizes WhatsApp Business Cloud API and SMS automation to deliver core communications, appointment confirmations, and workflow notifications. By providing your phone number on our website forms, you grant affirmative consent to receive transactional and relevant service updates.</p>
            <p className="text-muted">You acknowledge that you are the authorized subscriber of the phone number provided. We enforce zero tolerance for spam: if you utilize our CRM tools or WhatsApp bots to communicate with your own clients, you warrant that you have obtained prior verifiable opt-in consent from your end-users in strict adherence to Meta WhatsApp Business Messaging Policies, TRAI regulations (TCCCPR 2018), and the Digital Personal Data Protection Act, 2023.</p>
            <p className="text-muted"><strong>1-Click Opt-Out:</strong> Any recipient may withdraw consent and immediately terminate messaging by replying <code>STOP</code>, <code>UNSUBSCRIBE</code>, or <code>CANCEL</code> to any WhatsApp message, or via our public <a href="/privacy" style={{ color: 'var(--primary-color)' }}>Privacy Rights Portal</a>.</p>
          </section>

          <section id="cookie-processing" className="legal-section">
            <h2 className="h2">3. Cookie Consent Data Processing</h2>
            <p className="text-muted">By using this website and interacting with our cookie consent banner, you acknowledge and agree to the following:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><strong>Consent Audit Logging:</strong> When you click any option on the cookie consent banner (Accept All, Reject All, Essential Only, or Save Preferences), we record your decision alongside your public IP address, approximate geographic location (city, region, country), browser type, language, the page URL, and a timestamp. This is strictly for statutory compliance verification.</li>
              <li><strong>Legal Grounds:</strong> Consent audit logging is maintained pursuant to our statutory compliance obligations under India DPDP Act 2023 Section 6 (Verifiable Consent) and Section 8 (Reasonable Security Safeguards &amp; Auditability), as well as GDPR Article 6(1)(c) and Article 7(1).</li>
              <li><strong>No Profiling:</strong> The IP address and location data recorded during consent logging is never used for behavioural profiling, advertising targeting, or sold to any third party. It is stored in an access-controlled, encrypted database visible only to authorised compliance administrators.</li>
              <li><strong>Retention TTL:</strong> In compliance with Section 8(7) of the DPDP Act 2023, consent audit records are retained for a maximum of 12 months (31,536,000 seconds) via automated database TTL indexes and then permanently expunged.</li>
              <li><strong>Your Statutory Rights:</strong> You may request access to, correction of, or complete erasure of your consent record at any time through our interactive <a href="/privacy#privacy-contact" style={{ color: 'var(--primary-color)' }}>Data Subject Rights Portal</a>.</li>
            </ul>
          </section>

          <section id="usage" className="legal-section">
            <h2 className="h2">4. Platform Usage &amp; Intellectual Property</h2>
            <p className="text-muted">Our Enterprise AI, WhatsApp automation, and custom CRM services must be used for lawful purposes only. You are strictly prohibited from utilizing our API endpoints or RAG pipelines to generate or distribute illicit, defamatory, sexually explicit, fraudulent, or harassing content.</p>
            <p className="text-muted">All software code, user interface designs, AI agent architectures, algorithms, trademarks, and documentation developed by Gyan VaniAi remain the exclusive intellectual property of Gyan VaniAi Technologies unless transferred under a separate executed Master Services Agreement (MSA).</p>
          </section>

          <section id="liability" className="legal-section">
            <h2 className="h2">5. Limitation of Liability</h2>
            <p className="text-muted">While our AI agents and CRM platforms undergo rigorous unit, integration, and security testing, Gyan VaniAi does not warrant 100% uninterrupted uptime or completely hallucination-free generative AI outputs. To the maximum extent permitted by applicable Indian law, Gyan VaniAi shall not be liable for indirect, incidental, punitive, or consequential commercial damages, loss of business revenue, or third-party service provider outages (e.g. Meta Cloud API, AWS, or telecom network latency).</p>
          </section>

          <section id="demo-policy" className="legal-section">
            <h2 className="h2">6. Live Demo Platform &amp; 7-Day Data Retention Policy</h2>
            <p className="text-muted">Gyan VaniAi provides access to an interactive software demo environment hosted at <a href="https://connect.gyanvaniai.online/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>https://connect.gyanvaniai.online/</a>. By creating a demo account or utilizing this sandbox, you agree to the following Demo Data Retention Policy:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><strong>7-Day Evaluation Period:</strong> Demo accounts are provisioned exclusively for non-production evaluation and architectural testing.</li>
              <li><strong>Automatic Purpose-Exhaustion Purge:</strong> Unless upgraded to an active enterprise subscription before the evaluation period concludes, demo records, mock leads, conversation threads, and configurations are permanently expunged in accordance with our automated purpose-exhaustion retention schedules.</li>
              <li><strong>Your Responsibility:</strong> You must not upload live unredacted customer PII or production financial credentials into public demo sandbox accounts. Please export any test datasets you wish to preserve prior to evaluation expiry.</li>
            </ul>
          </section>

          <section id="deletion" className="legal-section">
            <h2 className="h2">7. User Data Deletion &amp; Statutory Rights</h2>
            <p className="text-muted">In accordance with Section 12 of the Digital Personal Data Protection Act, 2023, you hold the statutory right to request complete erasure of your personal data when the specified purpose of processing is fulfilled. Detailed data deletion workflows and automated ticket generation are available on our <a href="/privacy" style={{ color: 'var(--primary-color)' }}>Privacy Policy page</a>.</p>
          </section>

          <section id="governing-law" className="legal-section">
            <h2 className="h2">8. Governing Law &amp; Dispute Resolution</h2>
            <p className="text-muted">These Terms and Conditions shall be governed by, construed, and enforced in accordance with the laws of the Republic of India, including the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, the Consumer Protection Act, 2019, and the Indian Contract Act, 1872.</p>
            <p className="text-muted">Any legal dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or invalidity thereof, shall be subject to the exclusive jurisdiction of the competent courts located in <strong>New Delhi, Republic of India</strong>.</p>
          </section>

          <section id="dark-patterns" className="legal-section">
            <h2 className="h2">9. Prohibition of Dark Patterns &amp; Fair Dealing</h2>
            <p className="text-muted">In strict accordance with the <em>Guidelines for Prevention and Regulation of Dark Patterns, 2023</em> issued by the Central Consumer Protection Authority (CCPA) under Section 18 of the Consumer Protection Act, 2019, Gyan VaniAi affirms:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>No False Urgency:</strong> We do not fabricate artificial scarcity or countdown timers to induce purchases.</li>
              <li><strong>No Basket Sneaking or Hidden Fees:</strong> Pricing displayed across our platforms is clear, itemized, and transparent.</li>
              <li><strong>No Confirm Shaming:</strong> Opt-out and rejection choices on cookie banners and newsletter subscriptions are neutral and free of guilt-inducing language.</li>
              <li><strong>No Forced Action:</strong> Visitors are not forced to consent to unnecessary marketing or analytics tracking as a condition of accessing public marketing content.</li>
              <li><strong>Easy Cancellation:</strong> Subscription cancellations and consent withdrawals are as easy to complete as initial signups, with zero deceptive obstacle courses.</li>
            </ul>
          </section>

          <section id="grievance" className="legal-section">
            <h2 className="h2">10. Grievance Redressal Mechanism</h2>
            <p className="text-muted">In compliance with Section 13 of the Digital Personal Data Protection Act, 2023 read with Rule 11 of the DPDP Rules, 2025, any consumer or Data Principal grievance regarding these Terms, privacy practices, or data handling will be resolved by our designated Grievance Redressal Officer:</p>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.25rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '1rem 0' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'var(--text-primary)' }}>Grievance Redressal Officer Contact Dossier:</p>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.92rem' }}>
                <li><strong>Officer Name:</strong> Himanshu Bharti</li>
                <li><strong>Designation:</strong> Lead Privacy Compliance Officer &amp; Grievance Redressal Officer</li>
                <li><strong>Entity:</strong> Gyan VaniAi Technologies</li>
                <li><strong>Address:</strong> New Delhi, 110001, India</li>
                <li><strong>Direct Email:</strong> <a href="mailto:contact@gyanvaniai.com" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>contact@gyanvaniai.com</a></li>
                <li><strong>Acknowledgment:</strong> Within 24 hours</li>
                <li><strong>Statutory Resolution Deadline:</strong> Maximum 15 business days (Rule 11)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
