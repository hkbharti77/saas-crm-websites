import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Code2, Server, Database, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Gyan VaniAi | Enterprise AI & Software Development</title>
        <meta name="description" content="Gyan VaniAi is a software development company specializing in custom AI CRMs, WhatsApp Coexistence, and Enterprise automation solutions." />
        <link rel="canonical" href="https://gyanvaniai.online/about" />
        <meta property="og:title" content="About Gyan VaniAi | Enterprise AI & Software Development" />
        <meta property="og:description" content="Gyan VaniAi is a software development company specializing in custom AI CRMs, WhatsApp Coexistence, and Enterprise automation solutions." />
        <meta property="og:url" content="https://gyanvaniai.online/about" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "About Gyan VaniAi",
                "url": "https://gyanvaniai.online/about",
                "description": "Gyan VaniAi is a software development company specializing in custom AI CRMs, WhatsApp Coexistence, and Enterprise automation solutions.",
                "publisher": {
                  "@id": "https://gyanvaniai.online/#organization"
                },
                "isPartOf": {
                  "@id": "https://gyanvaniai.online/#website"
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
                    "item": "https://gyanvaniai.online/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About",
                    "item": "https://gyanvaniai.online/about"
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-gradient)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className="h1" style={{ marginBottom: '1.5rem' }}>About Gyan VaniAi</h1>
            <p className="text-lg text-muted" style={{ maxWidth: '800px', margin: '0 auto' }}>
              We build intelligent software solutions designed to automate operations, manage leads efficiently, and scale your business using the latest in Artificial Intelligence and CRM architecture.
            </p>
          </div>
        </section>

        {/* Company Identity & Tech Stack */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Our Technical Expertise</h2>
                <p className="text-muted" style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                  At Gyan VaniAi, we focus on delivering robust, high-performance applications. Whether you need a multi-tenant SaaS application, a custom CRM, or autonomous AI agents, we leverage modern tech stacks to build secure and scalable architectures.
                </p>
                <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
                  Our deep expertise in official Meta API integrations enables us to deliver seamless <strong>WhatsApp Coexistence</strong> solutions, allowing your team to use their mobile apps alongside our enterprise dashboards.
                </p>
                
                <Link to="/services/ai-development" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                  Explore Our Services <ArrowRight size={18} />
                </Link>
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

        {/* Internal Linking Silo */}
        <section className="section bg-alt" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <h2 className="h3" style={{ textAlign: 'center', marginBottom: '2rem' }}>Navigate Our Expertise</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/services/crm-development" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Services</Link>
              <ArrowRight size={16} color="var(--text-muted)" />
              <a href="/#industries" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Industries</a>
              <ArrowRight size={16} color="var(--text-muted)" />
              <a href="/#portfolio" style={{ padding: '0.5rem 1rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Case Studies</a>
              <ArrowRight size={16} color="var(--text-muted)" />
              <a href="/#contact" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: '500' }}>Contact Us</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
