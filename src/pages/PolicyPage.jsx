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
        preloadImage="/privacy_image.webp"
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
          <a href="#cookie-consent-data" className={`legal-nav-link ${activeSection === 'cookie-consent-data' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('cookie-consent-data'); }}>2. Cookie Consent Data &amp; IP Address Collection</a>
          <a href="#whatsapp" className={`legal-nav-link ${activeSection === 'whatsapp' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('whatsapp'); }}>3. WhatsApp &amp; Communications Consent</a>
          <a href="#thirdparty" className={`legal-nav-link ${activeSection === 'thirdparty' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('thirdparty'); }}>4. Meta &amp; Third-Party APIs</a>
          <a href="#security" className={`legal-nav-link ${activeSection === 'security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('security'); }}>5. Security &amp; Storage</a>
          <a href="#deletion" className={`legal-nav-link ${activeSection === 'deletion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('deletion'); }}>6. User Data Deletion &amp; GDPR Compliance</a>
          <a href="#privacy-contact" className={`legal-nav-link ${activeSection === 'privacy-contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('privacy-contact'); }}>7. Contact Us</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="data" className="legal-section">
            <h2 className="h2">1. Data Collection</h2>
            <p className="text-muted">We collect information you provide directly to us when you request a demo, sign up for our CRM, or communicate with our automated agents. This includes your name, email, phone number, and business details.</p>
            <p className="text-muted">We may also automatically collect metadata related to your usage of our AI platforms to improve response latency and model accuracy.</p>
          </section>

          <section id="cookie-consent-data" className="legal-section">
            <h2 className="h2">2. Cookie Consent Data &amp; IP Address Collection</h2>
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
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Legal Basis Under DPDP Act, 2023 &amp; International Frameworks</h3>
            <p className="text-muted">Personal data processing is carried out strictly under the legal grounds of <strong>Verifiable Consent</strong> (India DPDP Act 2023 Section 6; GDPR Article 6(1)(a)) and specified <strong>Legitimate Uses / Legal Obligations</strong> (India DPDP Act 2023 Section 7; GDPR Article 6(1)(c)). As a Data Fiduciary, we maintain verifiable consent audit records to demonstrate compliance.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>How We Use This Data</h3>
            <p className="text-muted">This consent audit data is <strong>used exclusively</strong> for compliance verification and legal evidence purposes. It is <strong>never</strong> used for advertising, marketing profiling, or sold to any third party.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Retention Period</h3>
            <p className="text-muted">Consent audit records, including IP address and location data (where consent was granted), are retained for a maximum of <strong>12 months</strong> from the date of collection, after which they are permanently deleted.</p>
            <h3 className="h3" style={{ fontSize: '1.2rem', marginTop: '1.25rem', marginBottom: '0.75rem' }}>Your Data Principal Rights</h3>
            <p className="text-muted">Under the DPDP Act 2023 (Sections 11–14), you have the right to request access to, correction of, updating, or complete erasure of your personal data, as well as the right to withdraw consent at any time by contacting our Grievance Officer at <a href="mailto:dpo@gyanvaniai.online">dpo@gyanvaniai.online</a>.</p>
          </section>

          <section id="whatsapp" className="legal-section">
            <h2 className="h2">3. WhatsApp &amp; Communications Consent</h2>
            <p className="text-muted">By submitting your phone number via our forms or interacting with our WhatsApp chatbots, you provide explicit, affirmative consent (opt-in) to receive automated messages, account notifications, and marketing communications from Gyan VaniAi via WhatsApp and SMS.</p>
            <p className="text-muted"><strong>Opting Out:</strong> You may revoke this consent and opt out of these communications at any time by replying "STOP" to any of our WhatsApp messages or by contacting our support team. Standard message and data rates may apply.</p>
          </section>

          <section id="thirdparty" className="legal-section">
            <h2 className="h2">4. Meta &amp; Third-Party APIs</h2>
            <p className="text-muted">Because our core infrastructure utilizes the official WhatsApp Business API, data transmitted via our chatbots is securely routed through Meta's infrastructure. We ensure that this data is handled in strict compliance with Meta's Business Policies.</p>
            <p className="text-muted">We do not sell your personal data to any third-party brokers. Data is only shared with essential sub-processors (like AWS, Firebase, or Vertex AI) required to provide the core service.</p>
          </section>

          <section id="security" className="legal-section">
            <h2 className="h2">5. Security &amp; Storage</h2>
            <p className="text-muted">We implement enterprise-grade security, including JWT authentication, TLS encryption, and secure PII masking, to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section id="deletion" className="legal-section">
            <h2 className="h2">6. User Data Deletion &amp; DPDP / GDPR Compliance</h2>
            <p className="text-muted">In strict compliance with the Indian <strong>Digital Personal Data Protection Act, 2023</strong> (Section 12: Right to Erasure) and international frameworks (such as GDPR Article 17), you have the absolute right to request the complete deletion of your personal data stored within our systems.</p>
            <h3 className="h3" style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>How to Request Data Deletion</h3>
            <p className="text-muted">To exercise your right to erasure, please submit a formal data deletion request by emailing our Grievance Officer at <a href="mailto:dpo@gyanvaniai.online">dpo@gyanvaniai.online</a> with the subject line "Data Deletion Request".</p>
            <h3 className="h3" style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Our Deletion Process</h3>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Verification:</strong> We will verify your identity within 7 business days to prevent unauthorized data removal.</li>
              <li><strong>Complete Erasure:</strong> Upon verification, we will permanently delete or cryptographically anonymize your personal data across all our active databases, internal systems, and third-party sub-processors within a maximum of <strong>30 days</strong>.</li>
              <li><strong>Legal Exceptions:</strong> Data will be completely erased except where strict retention is explicitly mandated by national/international financial laws, legal obligations, or active dispute resolutions.</li>
            </ul>
          </section>

          <section id="privacy-contact" className="legal-section">
            <h2 className="h2">7. Grievance Redressal &amp; Data Protection Board (DPBI) Appeals</h2>
            <p className="text-muted">In compliance with Section 5(2) and Section 13 of the Digital Personal Data Protection Act, 2023, Gyan VaniAi has appointed a designated Grievance Officer to address any privacy concerns, data rights requests, or grievances:</p>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '1rem 0' }}>
              <p style={{ margin: '0 0 0.4rem 0', fontWeight: 'bold', color: 'var(--text-primary)' }}>Grievance Officer Details:</p>
              <ul className="text-muted" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' }}>
                <li><strong>Name:</strong> Himanshu Bharti</li>
                <li><strong>Designation:</strong> Chief Data Protection &amp; Grievance Redressal Officer</li>
                <li><strong>Email:</strong> <a href="mailto:dpo@gyanvaniai.online" style={{ color: 'var(--primary-color)' }}>dpo@gyanvaniai.online</a> / <a href="mailto:contact@gyanvaniai.online" style={{ color: 'var(--primary-color)' }}>contact@gyanvaniai.online</a></li>
                <li><strong>Address:</strong> Gyan VaniAi Data Protection Office, Sector 62, Noida, Uttar Pradesh 201309, India</li>
              </ul>
            </div>
            <h3 className="h3" style={{ fontSize: '1.15rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Procedure for Filing Grievance &amp; Appeals to DPBI:</h3>
            <p className="text-muted">1. <strong>Internal Grievance Redressal:</strong> Submit your privacy complaint or rights request directly to the Grievance Officer above. We will acknowledge receipt within 24 hours and resolve your request within 15 business days.</p>
            <p className="text-muted">2. <strong>Appeal to Data Protection Board of India (DPBI):</strong> If you are unsatisfied with our Grievance Officer's response or if no response is provided within statutory timelines, you have the statutory right under DPDP Act Section 13(3) &amp; Section 18 to file an appeal directly with the <strong>Data Protection Board of India (DPBI)</strong> via their official portal at <a href="https://dpbi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>dpbi.gov.in</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
