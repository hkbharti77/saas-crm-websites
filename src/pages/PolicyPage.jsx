import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SeoHead from '../components/SeoHead';

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

  return (
    <div style={{ minHeight: '100vh' }}>
      <SeoHead
        title="Privacy Policy | Gyan VaniAi"
        description="Privacy Policy and Data Handling practices for Gyan VaniAi."
        canonical="https://www.gyanvaniai.online/privacy"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Privacy Policy | Gyan VaniAi",
                "url": "https://www.gyanvaniai.online/privacy",
                "publisher": {
                  "@id": "https://www.gyanvaniai.online/#organization"
                }
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
                    "name": "Privacy Policy",
                    "item": "https://www.gyanvaniai.online/privacy"
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>
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
          <a href="#data" className={`legal-nav-link ${activeSection === 'data' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('data'); }}>1. Data Collection</a>
          <a href="#cookie-consent-data" className={`legal-nav-link ${activeSection === 'cookie-consent-data' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('cookie-consent-data'); }}>2. Cookie Consent Data</a>
          <a href="#whatsapp" className={`legal-nav-link ${activeSection === 'whatsapp' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('whatsapp'); }}>3. WhatsApp &amp; Comm Consent</a>
          <a href="#thirdparty" className={`legal-nav-link ${activeSection === 'thirdparty' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('thirdparty'); }}>4. Meta &amp; Third-Party APIs</a>
          <a href="#security" className={`legal-nav-link ${activeSection === 'security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('security'); }}>5. Security &amp; Storage</a>
          <a href="#deletion" className={`legal-nav-link ${activeSection === 'deletion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('deletion'); }}>6. Data Deletion</a>
          <a href="#privacy-contact" className={`legal-nav-link ${activeSection === 'privacy-contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('privacy-contact'); }}>7. Contact Us</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="data" className="legal-section">
            <h2 className="h2">1. Data Collection</h2>
            <p className="text-muted">We collect information you provide directly to us when you request a demo, sign up for our CRM, or communicate with our automated agents. This includes your name, email, phone number, and business details.</p>
            <p className="text-muted">We may also automatically collect metadata related to your usage of our AI platforms to improve response latency and model accuracy.</p>
          </section>

          <section id="cookie-consent-data" className="legal-section">
            <h2 className="h2">2. Cookie Consent Data &amp; IP Address Collection 🍪</h2>
            <p className="text-muted">When you interact with our cookie consent banner by clicking <strong>Accept All</strong>, <strong>Reject All</strong>, <strong>Essential Cookies</strong>, or <strong>Manage Preferences</strong>, we automatically record the following data solely for the purpose of maintaining a legally required audit trail of your consent decision:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>IP Address:</strong> Your public IP address at the time of your consent decision.</li>
              <li><strong>Approximate Location:</strong> City, region, and country derived from your IP address via a third-party geolocation service (ipapi.co).</li>
              <li><strong>ISP / Organisation:</strong> The internet service provider or organisation associated with your IP.</li>
              <li><strong>Browser &amp; Device:</strong> Your browser type, operating system, and preferred language.</li>
              <li><strong>Consent Choice:</strong> Which option you selected (Accept All / Reject All / Essential / Custom) and which individual cookie categories you enabled or disabled.</li>
              <li><strong>Page URL &amp; Referrer:</strong> The page you were visiting and the source URL when you made your consent decision.</li>
              <li><strong>Timestamp:</strong> The exact date and time (UTC) of your consent action.</li>
            </ul>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Legal Basis</h3>
            <p className="text-muted">This data is collected under the legal basis of <strong>Legal Obligation</strong> and <strong>Legitimate Interest</strong> (GDPR Article 6(1)(c) and 6(1)(f); India DPDP Act 2023 Section 6). As a Data Fiduciary, we are required by law to be able to demonstrate that valid, informed consent was obtained. Recording your IP and timestamp is the industry-standard method for this proof.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>How We Use This Data</h3>
            <p className="text-muted">This consent audit data is <strong>used exclusively</strong> for compliance verification and legal evidence purposes. It is <strong>never</strong> used for advertising, marketing profiling, or sold to any third party.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Retention Period</h3>
            <p className="text-muted">Consent audit records, including IP address and location data, are retained for a maximum of <strong>12 months</strong> from the date of collection, after which they are permanently deleted.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Your Rights</h3>
            <p className="text-muted">You have the right to request access to, correction of, or deletion of your consent record at any time by contacting us at <a href="mailto:contact@gyanvaniai.online">contact@gyanvaniai.online</a> with the subject line <em>"Consent Data Request"</em>.</p>
          </section>

          <section id="whatsapp" className="legal-section">
            <h2 className="h2">2. WhatsApp & Communications Consent</h2>
            <p className="text-muted">By submitting your phone number via our forms or interacting with our WhatsApp chatbots, you provide explicit, affirmative consent (opt-in) to receive automated messages, account notifications, and marketing communications from Gyan VaniAi via WhatsApp and SMS.</p>
            <p className="text-muted"><strong>Opting Out:</strong> You may revoke this consent and opt out of these communications at any time by replying "STOP" to any of our WhatsApp messages or by contacting our support team. Standard message and data rates may apply.</p>
          </section>

          <section id="thirdparty" className="legal-section">
            <h2 className="h2">3. Meta & Third-Party APIs</h2>
            <p className="text-muted">Because our core infrastructure utilizes the official WhatsApp Business API, data transmitted via our chatbots is securely routed through Meta's infrastructure. We ensure that this data is handled in strict compliance with Meta's Business Policies.</p>
            <p className="text-muted">We do not sell your personal data to any third-party brokers. Data is only shared with essential sub-processors (like AWS or Vertex AI) required to provide the core service.</p>
          </section>

          <section id="security" className="legal-section">
            <h2 className="h2">4. Security & Storage</h2>
            <p className="text-muted">We implement enterprise-grade security, including JWT authentication and secure PII masking, to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section id="deletion" className="legal-section">
            <h2 className="h2">5. User Data Deletion & GDPR Compliance</h2>
            <p className="text-muted">In strict compliance with international and national data protection laws, including the <strong>General Data Protection Regulation (GDPR)</strong> (Article 17: Right to Erasure / "Right to be forgotten") and applicable local privacy frameworks (such as CCPA), you have the absolute right to request the complete deletion of your personal data stored within our systems.</p>
            <h3 className="h3" style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>How to Request Data Deletion</h3>
            <p className="text-muted">To exercise your right to erasure, please submit a formal data deletion request by emailing our Data Protection Officer at <a href="mailto:contact@gyanvaniai.online">contact@gyanvaniai.online</a> with the subject line "Data Deletion Request".</p>
            <h3 className="h3" style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Our Deletion Process</h3>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Verification:</strong> We will verify your identity within 7 business days to prevent unauthorized data removal.</li>
              <li><strong>Complete Erasure:</strong> Upon verification, we will permanently delete or cryptographically anonymize your personal data across all our active databases, internal systems, and third-party sub-processors within a maximum of <strong>30 days</strong>.</li>
              <li><strong>Legal Exceptions:</strong> Data will be completely erased except where strict retention is explicitly mandated by national/international financial laws, legal obligations, or active dispute resolutions.</li>
            </ul>
          </section>

          <section id="privacy-contact" className="legal-section">
            <h2 className="h2">6. Contact Us</h2>
            <p className="text-muted">If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer via the contact form at the bottom of our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
