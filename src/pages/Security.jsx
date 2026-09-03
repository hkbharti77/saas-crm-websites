import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ShieldCheck, Key, Users, Lock, Server, Database, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Security.css';

export default function Security() {
  return (
    <>
      <Helmet>
        <title>Enterprise AI Security & Data Protection | Gyan VaniAi</title>
        <meta name="description" content="Explore Gyan VaniAi enterprise security controls: multi-tenant isolation, AES-256 encryption, zero cross-tenant RAG pipelines, RBAC, and SOC2 compliant architecture." />
        <link rel="canonical" href="https://www.gyanvaniai.online/security" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gyanvaniai.online/security" />
        <meta property="og:title" content="Enterprise AI Security & Data Protection | Gyan VaniAi" />
        <meta property="og:description" content="Explore Gyan VaniAi enterprise security controls: multi-tenant isolation, AES-256 encryption, zero cross-tenant RAG pipelines, RBAC, and SOC2 compliant architecture." />
        <meta property="og:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Enterprise AI Security & Data Protection | Gyan VaniAi" />
        <meta name="twitter:description" content="Explore Gyan VaniAi enterprise security controls: multi-tenant isolation, AES-256 encryption, zero cross-tenant RAG pipelines, RBAC, and SOC2 compliant architecture." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Gyan VaniAi Security & Data Protection",
            "url": "https://www.gyanvaniai.online/security",
            "description": "Learn how Gyan VaniAi approaches authentication, access control, multi-tenant isolation, data protection, and platform security.",
            "publisher": { "@id": "https://www.gyanvaniai.online/#organization" }
          })}
        </script>
      </Helmet>

      <div className="security-page">
        {/* HERO */}
        <section className="sec-hero">
          <div className="sec-hero-content">
<h1>Security Built Into Every Layer</h1>
            <p className="sec-subtitle">
              Security is considered throughout the Gyan VaniAi platform, from authentication and access control to application workflows and data handling.
            </p>
            <div className="sec-hero-ctas">
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))} className="btn btn-primary">
                Talk to Our Team
              </button>
              <a href="mailto:contact@gyanvaniai.online" className="btn btn-secondary">
                Contact Support
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 1: Philosophy */}
        <section className="sec-section">
          <div className="sec-container sec-grid-2">
            <div className="sec-philosophy-content">
              <h2>Security at Gyan VaniAi</h2>
              <p>
                At Gyan VaniAi, we understand that CRM and revenue operations handle some of your most sensitive business data. Our approach to security relies on proven industry standards rather than obscurity.
              </p>
              <p>
                We build security directly into our application architecture—enforcing strict tenant isolation, role-based access control, and robust API security measures to ensure that your data remains yours, accessible only by authorized personnel within your organization.
              </p>
            </div>
            <div className="sec-philosophy-card">
              <ShieldCheck className="sec-philosophy-icon" />
              <h3>Core Principles</h3>
              <ul>
                <li>Defense in depth approach</li>
                <li>Least privilege access</li>
                <li>Strict tenant boundaries</li>
                <li>Continuous monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Security Controls */}
        <section className="sec-section bg-alt">
          <div className="sec-container">
            <h2 className="sec-section-title">Security Controls</h2>
            <div className="sec-controls-grid">
              <div className="sec-control-card">
                <Key className="sec-icon" />
                <h3>Authentication</h3>
                <p>We utilize secure, stateless JSON Web Tokens (JWT) for authentication across all APIs, ensuring sessions are strongly validated and tamper-resistant.</p>
              </div>
              <div className="sec-control-card">
                <Users className="sec-icon" />
                <h3>Authorization (RBAC)</h3>
                <p>The platform enforces strict Role-Based Access Control (Owner, Admin, Agent) to ensure users only access the data and actions necessary for their jobs.</p>
              </div>
              <div className="sec-control-card">
                <Server className="sec-icon" />
                <h3>Tenant Isolation</h3>
                <p>Data is logically separated using tenant identifiers at the database layer. Cross-tenant access is strictly prohibited at the application level.</p>
              </div>
              <div className="sec-control-card">
                <Lock className="sec-icon" />
                <h3>Application Security</h3>
                <p>We enforce strict CORS policies, rate limiting, and robust input validation to protect against automated abuse and injection attacks.</p>
              </div>
              <div className="sec-control-card">
                <Database className="sec-icon" />
                <h3>Data Protection</h3>
                <p>All communication between our servers and client applications is transmitted over secure HTTPS, encrypting data in transit.</p>
              </div>
              <div className="sec-control-card">
                <Activity className="sec-icon" />
                <h3>Monitoring & Logging</h3>
                <p>Critical actions and application states are securely logged to maintain an audit trail for troubleshooting and security incident detection.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Lifecycle */}
        <section className="sec-section">
          <div className="sec-container sec-lifecycle">
            <h2>How We Protect Your Data</h2>
            <div className="sec-lifecycle-steps">
              <div className="sec-step">
                <div className="sec-step-number">1</div>
                <h4>Data Input</h4>
                <p>Secure connections & validated payloads</p>
              </div>
              <ArrowRight className="sec-step-arrow" />
              <div className="sec-step">
                <div className="sec-step-number">2</div>
                <h4>Authentication & Authorization</h4>
                <p>JWT & Role checks applied</p>
              </div>
              <ArrowRight className="sec-step-arrow" />
              <div className="sec-step">
                <div className="sec-step-number">3</div>
                <h4>Protected Storage</h4>
                <p>Logical tenant separation</p>
              </div>
              <ArrowRight className="sec-step-arrow" />
              <div className="sec-step">
                <div className="sec-step-number">4</div>
                <h4>Monitoring</h4>
                <p>Audit logging of critical events</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 & 5: Access & Infrastructure */}
        <section className="sec-section bg-alt">
          <div className="sec-container sec-grid-2">
            <div className="sec-details-card">
              <h3>Access Control & Permissions</h3>
              <p>
                Gyan VaniAi enforces strict organizational boundaries. Only authenticated users can access the platform, and every API request is checked against the user's role:
              </p>
              <ul className="sec-list">
                <li><strong>Owners:</strong> Full workspace management and billing access.</li>
                <li><strong>Admins:</strong> Operational oversight and agent management.</li>
                <li><strong>Agents:</strong> Restricted to assigned leads, tickets, and communications.</li>
              </ul>
            </div>
            <div className="sec-details-card">
              <h3>Application & Infrastructure Security</h3>
              <p>
                Our backend relies on the robust Spring Boot security ecosystem. We practice secure development lifecycles, ensuring dependencies are audited and patches are applied.
              </p>
              <ul className="sec-list">
                <li>Automated security unit testing</li>
                <li>Token expiration and session control</li>
                <li>Strict API rate limiting constraints</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Privacy Link */}
        <section className="sec-section">
          <div className="sec-container sec-privacy-link">
            <h2>Security & Privacy</h2>
            <p>
              Security is only half the equation. We are deeply committed to respecting your privacy and handling user data responsibly.
            </p>
            <Link to="/privacy" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              Read our Privacy Policy <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </section>

        {/* SECTION 7: CTA */}
        <section className="sec-section bg-alt">
          <div className="sec-container sec-cta">
            <h2>Have questions about security?</h2>
            <p>Talk with our team about your security, privacy, and implementation requirements.</p>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Talk to Our Team
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
