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
          <img src="/terms_image.webp" alt="" width="400" height="400" className="legal-hero-img" fetchpriority="high" decoding="sync" />
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
          <a href="#usage" className={`legal-nav-link ${activeSection === 'usage' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('usage'); }}>3. Platform Usage</a>
          <a href="#liability" className={`legal-nav-link ${activeSection === 'liability' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('liability'); }}>4. Limitation of Liability</a>
          <a href="#deletion" className={`legal-nav-link ${activeSection === 'deletion' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('deletion'); }}>5. Data Deletion</a>
        </aside>
        
        <div className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="agreement" className="legal-section">
            <h2 className="h2">1. Agreement to Terms 🤝</h2>
            <p className="text-muted">By accessing our website and utilizing our AI platforms (including CRMLite and AI Stock Kundli), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, please do not use our services.</p>
          </section>

          <section id="messaging" className="legal-section">
            <h2 className="h2">2. Messaging Opt-in & Compliance 💬</h2>
            <p className="text-muted">Gyan VaniAi utilizes WhatsApp and SMS automation to deliver core services. By opting in via our forms, you agree to receive automated interactions.</p>
            <p className="text-muted">You acknowledge that you are the authorized user of the phone number provided. We do not tolerate spam; if you use our CRM tools to automate messaging to your own clients, you are strictly responsible for ensuring you have obtained explicit opt-in consent from your end-users in accordance with WhatsApp Business API policies and local telecommunication laws.</p>
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
