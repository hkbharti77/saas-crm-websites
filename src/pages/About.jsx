import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Code2, 
  Server, 
  Database, 
  MessageSquare, 
  ShieldCheck, 
  Bot, 
  Layers, 
  Cpu, 
  Mail,
  Zap
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

  return (
    <>
      <SeoHead
        title="About Gyan VaniAi | Enterprise AI & Software Development"
        description={description}
        canonical="https://www.gyanvaniai.online/about"
        keywords="About Gyan VaniAi, Enterprise AI Company, Software Development Agency, WhatsApp Coexistence Meta Provider, AI CRM Developers, India, Global"
        image="https://www.gyanvaniai.online/hero_dashboard.webp"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "About Gyan VaniAi",
                "url": "https://www.gyanvaniai.online/about",
                "description": "${description}",
                "publisher": {
                  "@id": "https://www.gyanvaniai.online/#organization"
                },
                "isPartOf": {
                  "@id": "https://www.gyanvaniai.online/#website"
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
                    "name": "About",
                    "item": "https://www.gyanvaniai.online/about"
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>

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
                    <span>Direct: <a href="mailto:contact@gyanvaniai.online">contact@gyanvaniai.online</a></span>
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

        {/* 5. EXPLORE OUR WORK */}
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
