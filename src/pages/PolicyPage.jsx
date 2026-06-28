import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>Privacy Policy | Gyan VaniAi</title>
        <meta name="description" content="Privacy Policy and Data Handling practices for Gyan VaniAi." />
      </Helmet>
      <div className="legal-hero">
        <div className="container legal-hero-content">
          <img src="/privacy_image.webp" alt="Privacy Policy Graphic" className="legal-hero-img" />
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
          <a href="#whatsapp" className={`legal-nav-link ${activeSection === 'whatsapp' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('whatsapp'); }}>2. WhatsApp & Comm Consent</a>
          <a href="#thirdparty" className={`legal-nav-link ${activeSection === 'thirdparty' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('thirdparty'); }}>3. Meta & Third-Party APIs</a>
          <a href="#security" className={`legal-nav-link ${activeSection === 'security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('security'); }}>4. Security & Storage</a>
          <a href="#contact" className={`legal-nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>5. Contact Us</a>
        </aside>
        
        <main className="legal-content glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <section id="data" className="legal-section">
            <h2 className="h2">1. Data Collection</h2>
            <p className="text-muted">We collect information you provide directly to us when you request a demo, sign up for our CRM, or communicate with our automated agents. This includes your name, email, phone number, and business details.</p>
            <p className="text-muted">We may also automatically collect metadata related to your usage of our AI platforms to improve response latency and model accuracy.</p>
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

          <section id="contact" className="legal-section">
            <h2 className="h2">5. Contact Us</h2>
            <p className="text-muted">If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer via the contact form at the bottom of our website.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
