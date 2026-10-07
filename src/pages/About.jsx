import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Server, 
  Database, 
  MessageSquare, 
  ShieldCheck, 
  Bot, 
  Layers, 
  Mail,
  Zap,
  Building,
  Globe,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import './About.css';

const diffPillars = [
  {
    num: '01',
    icon: <MessageSquare size={22} />,
    title: 'WhatsApp Coexistence',
    desc: 'Keep the WhatsApp Business mobile app on your phone while running AI auto-replies, bulk broadcasts, and CRM on the same number.'
  },
  {
    num: '02',
    icon: <Bot size={22} />,
    title: 'AI-First Operations',
    desc: 'Autonomous RAG agents, predictive lead property scoring, and sub-300ms conversational automation that run 24/7.'
  },
  {
    num: '03',
    icon: <Layers size={22} />,
    title: 'Enterprise Systems',
    desc: 'Custom CRM, HRMS, and ERP architecture tailored specifically to sales, operations, and back-office pipelines.'
  },
  {
    num: '04',
    icon: <ShieldCheck size={22} />,
    title: 'Secure & Scalable',
    desc: 'Multi-tenant data isolation, role-based access control, SOC-2 compliant Meta Cloud API, and high-availability cloud infrastructure.'
  }
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const description =
    'Gyan VaniAi builds custom AI CRMs, WhatsApp Coexistence, RAG agents, HRMS, and ERP systems for startups and enterprises across Europe, Asia, Africa, and worldwide.';

  const aboutWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Gyan VaniAi",
    "url": "https://www.gyanvaniai.com/about",
    "description": description,
    "publisher": {
      "@id": "https://www.gyanvaniai.com/#organization"
    },
    "isPartOf": {
      "@id": "https://www.gyanvaniai.com/#website"
    }
  };

  return (
    <>
      <SeoHead
        title="About Gyan VaniAi | Enterprise AI & Software Development"
        description={description}
        canonical="https://www.gyanvaniai.com/about"
        keywords="About Gyan VaniAi, Enterprise AI Company, Software Development Agency, WhatsApp Coexistence Meta Provider, AI CRM Developers, India, Global"
        image="https://www.gyanvaniai.com/hero_dashboard.webp"
        schema={aboutWebPageSchema}
      />

      <div className="about-page">
        
        {/* 1. HERO SECTION */}
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-grid">
              
              {/* Left Column: Heading & Mission */}
              <div className="about-hero-left">
                
                <h1 className="about-hero-title">
                  About <span className="brand-accent">Gyan VaniAi</span>
                </h1>
                
                <p className="about-hero-desc">
                  We build intelligent software for operators who need CRM, WhatsApp automation, AI agents, and enterprise systems that run the business efficiently without overhead.
                </p>

                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <Link to="/#contact" className="btn btn-primary" style={{ padding: '0.85rem 1.65rem', fontSize: '0.98rem', fontWeight: '700' }}>
                    <span>Book a Free Consultation</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/services/crm-development" className="btn btn-outline" style={{ padding: '0.85rem 1.65rem', fontSize: '0.98rem', fontWeight: '600' }}>
                    <span>Explore Solutions</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Lightweight Ecosystem Architecture Visual */}
              <div className="about-hero-visual">
                <div className="about-visual-header">
                  <span className="about-visual-badge">Gyan VaniAi Technology Core</span>
                  <span className="about-visual-live">
                    <span className="about-live-dot"></span>
                    <span>GLOBAL OPS</span>
                  </span>
                </div>

                <div className="about-visual-nodes">
                  <div className="about-node-card">
                    <div className="about-node-icon">
                      <Bot size={17} />
                    </div>
                    <div className="about-node-text">
                      <h5>AI CRM & RAG</h5>
                      <p>Pipeline telemetry</p>
                    </div>
                  </div>

                  <div className="about-node-card">
                    <div className="about-node-icon">
                      <MessageSquare size={17} />
                    </div>
                    <div className="about-node-text">
                      <h5>WhatsApp Mode</h5>
                      <p>Official Dual Sync</p>
                    </div>
                  </div>

                  <div className="about-node-card">
                    <div className="about-node-icon">
                      <Zap size={17} />
                    </div>
                    <div className="about-node-text">
                      <h5>AI Agents</h5>
                      <p>Sub-300ms SLA</p>
                    </div>
                  </div>

                  <div className="about-node-card">
                    <div className="about-node-icon">
                      <Layers size={17} />
                    </div>
                    <div className="about-node-text">
                      <h5>HRMS & ERP</h5>
                      <p>Enterprise Scale</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. WHO WE ARE (EDITORIAL TWO-COLUMN LAYOUT) */}
        <section className="section" style={{ padding: '4.75rem 0' }}>
          <div className="container">
            <div className="about-editorial-grid">
              
              <div className="about-editorial-sidebar">
                <span className="about-section-label">01 / WHO WE ARE</span>
                <h2 className="about-editorial-heading">Engineering intelligent systems for high-growth teams.</h2>
              </div>

              <div className="about-editorial-content">
                <p>
                  Gyan VaniAi is an enterprise AI and software development company. We design and ship custom AI CRMs, Meta WhatsApp Coexistence platforms, RAG pipelines, HRMS, ERP, web, and mobile applications for teams that outgrow off-the-shelf tools.
                </p>
                <p>
                  Our work spans startups, SMEs, and enterprises across <strong>Europe, Asia, Africa, North America, and worldwide</strong>. Engagements typically start with a consultation, then move into architecture, build, launch, and ongoing support.
                </p>
                
                <div className="about-contact-callout">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Mail size={17} color="var(--primary-color)" />
                    <span>Direct: <a href="mailto:contact@gyanvaniai.com">contact@gyanvaniai.com</a></span>
                  </div>
                  <span>·</span>
                  <Link to="/#contact">Book a free consultation →</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. WHY GYAN VANIAI / WHAT MAKES US DIFFERENT */}
        <section className="section bg-tinted" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-header section-header--center">
<h2 className="h2">What makes us different</h2>
              <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
                We combine deep enterprise software engineering with specialized Meta infrastructure and AI automation.
              </p>
            </div>

            <div className="about-pillars-grid">
              {diffPillars.map((pillar) => (
                <article key={pillar.num} className="about-pillar-card">
                  <div className="about-pillar-top">
                    <span className="about-pillar-num">{pillar.num}</span>
                    <div className="about-pillar-icon">{pillar.icon}</div>
                  </div>
                  <h3 className="about-pillar-title">{pillar.title}</h3>
                  <p className="about-pillar-desc">{pillar.desc}</p>
                </article>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/services/whatsapp-coexistence" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.98rem', fontWeight: '700' }}>
                <span>WhatsApp Coexistence</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/services/ai-agent-development" className="btn btn-outline" style={{ padding: '0.85rem 1.75rem', fontSize: '0.98rem', fontWeight: '600' }}>
                <span>Explore AI Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL EXPERTISE */}
        <section className="section" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="about-tech-layout">
              
              <div>
<h2 className="h2" style={{ marginBottom: '1.15rem' }}>Technical expertise</h2>
                <p className="text-muted" style={{ fontSize: '1.025rem', lineHeight: '1.65', marginBottom: '1rem' }}>
                  We deliver high-performance applications (multi-tenant SaaS, custom CRM, and autonomous AI agents) on modern stacks with secure, scalable architectures and official Meta API integrations.
                </p>
                <p className="text-muted" style={{ fontSize: '1.025rem', lineHeight: '1.65' }}>
                  Typical stack: React / React Native on the frontend; Spring Boot and Node.js on the backend; Firebase and secure cloud infrastructure for delivery and ops.
                </p>
              </div>

              <div className="about-tech-cards-grid">
                <div className="about-tech-card">
                  <div className="about-tech-card-icon">
                    <Code2 size={24} />
                  </div>
                  <h3 className="about-tech-card-title">Frontend</h3>
                  <p className="about-tech-card-desc">React, React Native, Vite</p>
                </div>

                <div className="about-tech-card">
                  <div className="about-tech-card-icon">
                    <Server size={24} />
                  </div>
                  <h3 className="about-tech-card-title">Backend</h3>
                  <p className="about-tech-card-desc">Spring Boot, Node.js</p>
                </div>

                <div className="about-tech-card">
                  <div className="about-tech-card-icon">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="about-tech-card-title">Automation</h3>
                  <p className="about-tech-card-desc">WhatsApp API, AI Agents</p>
                </div>

                <div className="about-tech-card">
                  <div className="about-tech-card-icon">
                    <Database size={24} />
                  </div>
                  <h3 className="about-tech-card-title">Infrastructure</h3>
                  <p className="about-tech-card-desc">Firebase, Secure Cloud</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. CORPORATE FACTS & MEDIA KIT FOR DIRECTORIES & PRESS */}
        <section className="section bg-tinted" style={{ padding: '4.5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ maxWidth: '850px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
              <span className="about-section-label">05 / COMPANY VERIFICATION &amp; MEDIA KIT</span>
              <h2 className="h2" style={{ marginTop: '0.5rem' }}>Corporate Profile &amp; Citation Index</h2>
              <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '1.05rem' }}>
                Verified information for ecosystem partners, industry directories, journalists, and enterprise procurement audits.
              </p>
            </div>

            <div className="about-citation-grid">
              {/* Corporate Facts Box */}
              <div className="about-citation-card">
                <div className="about-citation-header">
                  <div className="about-citation-icon">
                    <Building size={22} />
                  </div>
                  <h3 className="about-citation-title">Company Overview</h3>
                </div>

                <ul className="about-facts-list">
                  <li className="about-facts-item">
                    <span className="fact-label">Legal Brand Name</span>
                    <strong className="fact-value">Gyan VaniAi Technologies</strong>
                  </li>
                  <li className="about-facts-item">
                    <span className="fact-label">Office &amp; Location</span>
                    <a href="https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6" target="_blank" rel="noopener noreferrer" className="fact-link">
                      <span>Gyan VaniAi Technologies ↗</span>
                    </a>
                  </li>
                  <li className="about-facts-item">
                    <span className="fact-label">Founding Year</span>
                    <strong className="fact-value">2024</strong>
                  </li>
                  <li className="about-facts-item">
                    <span className="fact-label">Canonical Domain</span>
                    <strong className="fact-value">https://www.gyanvaniai.com</strong>
                  </li>
                  <li className="about-facts-item">
                    <span className="fact-label">Direct Email</span>
                    <a href="mailto:contact@gyanvaniai.com" className="fact-link">contact@gyanvaniai.com</a>
                  </li>
                  <li className="about-facts-item">
                    <span className="fact-label">Direct Line</span>
                    <strong className="fact-value">+91 87006 20913</strong>
                  </li>
                </ul>
              </div>

              {/* Media Kit & Boilerplate Box */}
              <div className="about-citation-card">
                <div className="about-citation-header">
                  <div className="about-citation-icon">
                    <Globe size={22} />
                  </div>
                  <h3 className="about-citation-title">Press &amp; Media Boilerplate</h3>
                </div>

                <p className="about-boilerplate-text">
                  <em>"Gyan VaniAi is an enterprise AI CRM and revenue automation software company specializing in official Meta WhatsApp Business API coexistence, autonomous RAG agents, and bespoke conversational telephony pipelines for scaling teams worldwide."</em>
                </p>

                <div className="about-badges-wrapper">
                  <div className="about-badge-item">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Official Meta Tech Provider architecture</span>
                  </div>
                  <div className="about-badge-item">
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>DPDP Act 2023 &amp; SOC-2 compliant data controls</span>
                  </div>
                  <div className="about-citation-actions">
                    <a href="https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6" target="_blank" rel="noopener noreferrer" className="about-action-btn">
                      <span>Google Maps</span>
                      <ExternalLink size={14} />
                    </a>
                    <a href="https://github.com/gyanvaniai" target="_blank" rel="noopener noreferrer" className="about-action-btn">
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </a>
                    <a href="https://www.linkedin.com/company/gyan-vaniai" target="_blank" rel="noopener noreferrer" className="about-action-btn">
                      <span>LinkedIn</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. EXPLORE OUR WORK */}
        <section className="about-explore-section">
          <div className="container">
            <div className="about-explore-bar">
              <h3 className="about-explore-title">Explore our work and solutions</h3>
              <nav className="about-explore-nav" aria-label="Explore categories">
                <Link to="/services/crm-development" className="explore-nav-pill outline">
                  Services
                </Link>
                <Link to="/industries/healthcare" className="explore-nav-pill outline">
                  Industries
                </Link>
                <a href="/#portfolio" className="explore-nav-pill outline">
                  Case Studies
                </a>
                <a href="/#contact" className="explore-nav-pill primary">
                  Contact Us →
                </a>
              </nav>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
