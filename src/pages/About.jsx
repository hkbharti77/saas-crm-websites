import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Code2, Server, Database, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

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

      <div>
        <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-gradient)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className="h1" style={{ marginBottom: '1.5rem' }}>About Gyan VaniAi</h1>
            <p className="text-lg text-muted" style={{ maxWidth: '800px', margin: '0 auto' }}>
              We build intelligent software for operators who need CRM, WhatsApp automation, AI agents, and enterprise systems that run the business — not the other way around.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 className="h2" style={{ marginBottom: '1.25rem' }}>Who we are</h2>
            <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
              Gyan VaniAi is an enterprise AI and software development company. We design and ship custom AI CRMs, Meta WhatsApp Coexistence platforms, RAG pipelines, HRMS, ERP, web, and mobile applications for teams that outgrow off-the-shelf tools.
            </p>
            <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
              Our work spans startups, SMEs, and enterprises across <strong>Europe, Asia, Africa, North America, and worldwide</strong>. Engagements typically start with a consultation, then move into architecture, build, launch, and ongoing support.
            </p>
            <p className="text-muted" style={{ lineHeight: '1.7' }}>
              Contact:{' '}
              <a href="mailto:contact@gyanvaniai.online">contact@gyanvaniai.online</a>
              {' · '}
              <Link to="/#contact">Book a free consultation</Link>
            </p>
          </div>
        </section>

        <section className="section bg-alt">
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 className="h2" style={{ marginBottom: '1.25rem' }}>What makes us different</h2>
            <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
              We are especially known for <strong>WhatsApp Coexistence</strong>: keep the WhatsApp Business mobile app on your phone while running AI auto-replies, bulk broadcasts, and multi-agent CRM on the same number — with real-time sync and no chat wipe.
            </p>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Beyond messaging, we build secure RAG agents, industry-shaped CRMs, and operational systems (HRMS/ERP) that connect sales, support, and back-office workflows.
            </p>
            <Link to="/services/whatsapp-coexistence" className="btn btn-primary" style={{ display: 'inline-flex', marginRight: '0.75rem' }}>
              WhatsApp Coexistence <ArrowRight size={18} />
            </Link>
            <Link to="/services/ai-development" className="btn btn-outline" style={{ display: 'inline-flex' }}>
              Explore AI services <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Technical expertise</h2>
                <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                  We deliver high-performance applications — multi-tenant SaaS, custom CRM, and autonomous AI agents — on modern stacks with secure, scalable architectures and official Meta API integrations.
                </p>
                <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
                  Typical stack: React / React Native on the frontend; Spring Boot and Node.js on the backend; Firebase and cloud infrastructure for delivery and ops.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <Code2 size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                  <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Frontend</h3>
                  <p className="text-sm text-muted">React, React Native, Vite</p>
                </div>
                <div className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <Server size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                  <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Backend</h3>
                  <p className="text-sm text-muted">Spring Boot, Node.js</p>
                </div>
                <div className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <MessageSquare size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                  <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Automation</h3>
                  <p className="text-sm text-muted">WhatsApp API, AI Agents</p>
                </div>
                <div className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <Database size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                  <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Infrastructure</h3>
                  <p className="text-sm text-muted">Firebase, Secure Cloud</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-alt" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <h2 className="h3" style={{ textAlign: 'center', marginBottom: '2rem' }}>Explore our work</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/services/crm-development" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Services</Link>
              <ArrowRight size={16} color="var(--text-muted)" />
              <Link to="/industries/healthcare" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Industries</Link>
              <ArrowRight size={16} color="var(--text-muted)" />
              <a href="/#portfolio" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Case Studies</a>
              <ArrowRight size={16} color="var(--text-muted)" />
              <a href="/#contact" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Contact Us</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
