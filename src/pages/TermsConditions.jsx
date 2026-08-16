import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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

  return (
    <div style={{ minHeight: '100vh' }}>
      <SeoHead
        title="Terms & Conditions | Gyan VaniAi"
        description="Terms of Service and API usage guidelines for Gyan VaniAi platforms."
        canonical="https://www.gyanvaniai.online/terms"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Terms & Conditions | Gyan VaniAi",
                "url": "https://www.gyanvaniai.online/terms",
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
                    "name": "Terms & Conditions",
                    "item": "https://www.gyanvaniai.online/terms"
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>
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
          <a href="#messaging" className={`legal-nav-link ${activeSection === 'messaging' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('messaging'); }}>2. Messaging Opt-in Rules</a>
          <a href="#cookie-processing" className={`legal-nav-link ${activeSection === 'cookie-processing' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('cookie-processing'); }}>3. Cookie &amp; Consent Data</a>
          <a href="#usage" className={`legal-nav-link ${activeSection === 'usage' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('usage'); }}>4. Platform Usage</a>
          <a href="#liability" className={`legal-nav-link ${activeSection === 'liability' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('liability'); }}>5. Limitation of Liability</a>
          <a href="#deletion" className={`legal-nav-link ${activeSection === 'deletion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('deletion'); }}>6. Data Deletion</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="agreement" className="legal-section">
            <h2 className="h2">1. Agreement to Terms 🤝</h2>
            <p className="text-muted">By accessing our website and utilizing our AI platforms (including CRMLite and AI Stock Kundli), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, please do not use our services.</p>
          </section>

          <section id="messaging" className="legal-section">
            <h2 className="h2">2. Messaging Opt-in &amp; Compliance 💬</h2>
            <p className="text-muted">Gyan VaniAi utilizes WhatsApp and SMS automation to deliver core services. By opting in via our forms, you agree to receive automated interactions.</p>
            <p className="text-muted">You acknowledge that you are the authorized user of the phone number provided. We do not tolerate spam; if you use our CRM tools to automate messaging to your own clients, you are strictly responsible for ensuring you have obtained explicit opt-in consent from your end-users in accordance with WhatsApp Business API policies and local telecommunication laws.</p>
          </section>

          <section id="cookie-processing" className="legal-section">
            <h2 className="h2">3. Cookie Consent Data Processing 🍪</h2>
            <p className="text-muted">By using this website and interacting with our cookie consent banner, you acknowledge and agree to the following:</p>
            <ul className="text-muted" style={{ paddingLeft: '1.5rem', margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><strong>Consent Audit Logging:</strong> When you click any option on the cookie consent banner (Accept All, Reject All, Essential Only, or Save Preferences), we record your decision alongside your public IP address, approximate geographic location (city, region, country), browser type, language, the page URL, and a timestamp. This is strictly for legal compliance purposes.</li>
              <li><strong>Legal Basis:</strong> This processing is carried out under Legitimate Interest and Legal Obligation (GDPR Art. 6(1)(c) &amp; 6(1)(f); India DPDP Act 2023 Section 6), as we are required to maintain verifiable evidence of consent.</li>
              <li><strong>No Profiling:</strong> The IP address and location data recorded during consent logging is never used for behavioural profiling, advertising targeting, or sold to any third party. It is held in a private, access-controlled database visible only to authorised administrators.</li>
              <li><strong>Third-Party Geolocation:</strong> Geographic location data is resolved from your IP address using the ipapi.co API. By using this site, you acknowledge that your IP address may be processed by this third-party service for this purpose.</li>
              <li><strong>Retention:</strong> Consent audit records are retained for a maximum of 12 months and then permanently deleted.</li>
              <li><strong>Your Right to Access &amp; Delete:</strong> You may request access to or deletion of your consent record at any time by emailing <a href="mailto:contact@gyanvaniai.online">contact@gyanvaniai.online</a> with the subject line <em>"Consent Data Request"</em>.</li>
            </ul>
          </section>

          <section id="usage" className="legal-section">
            <h2 className="h2">3. Platform Usage 🚀</h2>
            <p className="text-muted">Our Enterprise AI and WhatsApp automation services must be used for lawful purposes only. You are strictly prohibited from utilizing our API endpoints or RAG pipelines to generate or distribute illicit, harmful, or spam content.</p>
            <p className="text-muted">All software, designs, algorithms, and logic developed by Gyan VaniAi remain our intellectual property unless explicitly transferred in a separate enterprise agreement.</p>
          </section>

          <section id="liability" className="legal-section">
            <h2 className="h2">4. Limitation of Liability ⚖️</h2>
            <p className="text-muted">While our AI agents are highly optimized, Gyan VaniAi does not guarantee 100% uptime or completely error-free AI generations. We shall not be held liable for any indirect, incidental, or consequential business damages arising from the use of our software or platforms.</p>
          </section>

          <section id="deletion" className="legal-section">
            <h2 className="h2">5. User Data Deletion 🗑️</h2>
            <p className="text-muted">In accordance with our Privacy Policy, users have the right to request the deletion of their personal data. By requesting data deletion, you acknowledge that access to certain services, accounts, and historical data will be permanently revoked.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
