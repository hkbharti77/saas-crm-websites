import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Process from '../components/Process';


const seoDataMap = {
  'ai-development': {
    metaTitle: 'AI Software Development Company | Gyan VaniAi',
    metaDescription: 'Custom AI software development, AI chatbots, and RAG applications. Integrate LLMs and autonomous AI agents to automate your business operations.',
    h1: 'Custom AI Software Development',
    subtitle: 'Build custom AI agents, chatbots, and automation workflows that save time and increase revenue.',
    benefits: ['Custom AI Models', 'Seamless Integration', '24/7 Automation', 'Data Security'],
    image: '/portfolio_ai.webp',
    imageAlt: 'AI Software Development Dashboard',
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/ai-agent-development', text: 'RAG & AI Agent Solutions' }
    ]
  },
  'ai-agent-development': {
    metaTitle: 'Custom AI Agent Development | Gyan VaniAi',
    metaDescription: 'Deploy intelligent AI agents that handle sales, support, and operations autonomously.',
    h1: 'Custom AI Agent Development',
    subtitle: 'Deploy intelligent AI agents that handle sales, support, and operations autonomously.',
    benefits: ['Multi-Agent Systems', 'Workflow Automation', 'Natural Language Processing', 'Cost Reduction'],
    image: '/portfolio_ai.webp',
    imageAlt: 'AI Agent Development Workflow',
    relatedLinks: [{ url: '/services/whatsapp-coexistence', text: 'Integrate Agents with WhatsApp Coexistence' }]
  },
  'crm-development': {
    metaTitle: 'Custom CRM Software Development | Gyan VaniAi',
    metaDescription: 'Scale with custom CRM software development. We build intelligent AI CRM systems with lead management and built-in automation to drive sales.',
    h1: 'Custom CRM Software Development',
    subtitle: 'Tailor-made CRM with built-in WhatsApp Coexistence & Meta Tech Provider support to connect and grow instantly.',
    benefits: ['Meta Tech Provider Coexistence', '1-Click Embedded Signup', 'Custom Sales Workflows', 'Advanced Lead Analytics'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Custom AI CRM Dashboard',
    relatedLinks: [
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence Mode' },
      { url: '/services/ai-development', text: 'AI Software Development' }
    ]
  },
  'healthcare': {
    metaTitle: 'Healthcare CRM Solutions | Gyan VaniAi',
    metaDescription: 'HIPAA-compliant CRM systems with WhatsApp appointment automation & patient management.',
    h1: 'Healthcare CRM Solutions',
    subtitle: 'HIPAA-compliant CRM systems with WhatsApp appointment automation & patient management.',
    benefits: ['Patient Portals', 'Appointment Automation', 'Data Security', 'EMR Integration'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Healthcare CRM System',
    relatedLinks: [{ url: '/services/crm-development', text: 'Learn about Custom CRM Development' }]
  },
  'education': {
    metaTitle: 'Education Software Development | Gyan VaniAi',
    metaDescription: 'Custom software solutions for the education sector, including Student Information Systems and learning portals.',
    h1: 'Education Software Development',
    subtitle: 'Scalable software solutions designed specifically for educational institutions.',
    benefits: ['Student Portals', 'Attendance Tracking', 'E-Learning Integration', 'Data Security'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Education Software Development',
    relatedLinks: [{ url: '/services/web-development', text: 'Explore Custom Web Development' }]
  },
  'finance': {
    metaTitle: 'Financial Software Development | Gyan VaniAi',
    metaDescription: 'Secure, high-performance financial software development including FinTech platforms and ERP solutions.',
    h1: 'Financial Software Development',
    subtitle: 'Secure and scalable software solutions for the finance and FinTech industries.',
    benefits: ['High Security', 'Regulatory Compliance', 'Real-time Analytics', 'Custom ERP'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Financial Software Development Dashboard',
    relatedLinks: [{ url: '/services/erp-development', text: 'Learn about ERP Development' }]
  },
  'manufacturing': {
    metaTitle: 'Manufacturing Software Solutions | Gyan VaniAi',
    metaDescription: 'Custom ERP and automation software tailored for the manufacturing industry to streamline operations.',
    h1: 'Manufacturing Software Solutions',
    subtitle: 'Optimize your manufacturing operations with custom ERP and automation systems.',
    benefits: ['Inventory Management', 'Supply Chain Tracking', 'Process Automation', 'Cost Reduction'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Manufacturing Software Dashboard',
    relatedLinks: [{ url: '/services/erp-development', text: 'Explore ERP Development' }]
  },
  'enterprise': {
    metaTitle: 'Enterprise IT Solutions | Gyan VaniAi',
    metaDescription: 'Custom enterprise software development, including AI integrations, CRMs, and comprehensive business automation.',
    h1: 'Enterprise IT Solutions',
    subtitle: 'Comprehensive IT solutions and custom software development for large-scale enterprises.',
    benefits: ['Scalable Architecture', 'High Performance', 'Custom AI Integration', 'Dedicated Support'],
    image: '/hero_dashboard.webp',
    imageAlt: 'Enterprise Software Solutions Dashboard',
    relatedLinks: [{ url: '/services/ai-development', text: 'Learn about AI Software Development' }]
  },
  'whatsapp-automation': {
    metaTitle: 'WhatsApp CRM & Meta Coexistence Automation | Gyan VaniAi',
    metaDescription: 'Built-in Meta Tech Provider with WhatsApp Coexistence & 1-Click Embedded Signup. Connect your existing WhatsApp number in minutes.',
    h1: 'WhatsApp CRM & Meta Coexistence',
    subtitle: 'Built-in Meta Tech Provider with WhatsApp Coexistence & 1-Click Embedded Signup. Connect your existing WhatsApp number in minutes without complex Meta setup.',
    benefits: ['Built-in WhatsApp Coexistence', '1-Click Embedded Signup', 'Official Meta API Integration', 'Instant Replies & Broadcasts'],
    image: '/portfolio_crm.webp',
    imageAlt: 'WhatsApp Automation Dashboard',
    relatedLinks: [{ url: '/services/whatsapp-coexistence', text: 'View the Full WhatsApp Coexistence Guide' }]
  },
  'hrms-development': {
    metaTitle: 'HRMS Software Development | Gyan VaniAi',
    metaDescription: 'Custom HRMS software development for employee management, attendance tracking, and HR automation to streamline your workforce.',
    h1: 'HRMS Software Development',
    subtitle: 'Streamline your HR operations with custom software for payroll, attendance, and recruitment.',
    benefits: ['Payroll Automation', 'Leave Management', 'Employee Self-Service', 'Performance Tracking'],
    image: '/portfolio_stock.webp',
    imageAlt: 'HRMS Employee Management Software',
    relatedLinks: [{ url: '/services/erp-development', text: 'Explore Custom ERP Software Development' }]
  },
  'erp-development': {
    metaTitle: 'Custom ERP Software Development | Gyan VaniAi',
    metaDescription: 'Custom ERP software development to unify your business automation, inventory, finance, and operations in a single scalable system.',
    h1: 'Custom ERP Software Development',
    subtitle: 'Unify your business processes with a scalable Enterprise Resource Planning system.',
    benefits: ['Inventory Management', 'Financial Reporting', 'Supply Chain Visibility', 'Operational Efficiency'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Enterprise Resource Planning Dashboard',
    relatedLinks: [{ url: '/services/hrms-development', text: 'Learn about HRMS Software Development' }]
  },
  'web-development': {
    metaTitle: 'Custom Web Application Development | Gyan VaniAi',
    metaDescription: 'Enterprise web development and custom business web applications with seamless API integrations and responsive, high-performance architecture.',
    h1: 'Custom Web Application Development',
    subtitle: 'High-performance, SEO-optimized websites that convert visitors into paying customers.',
    benefits: ['Responsive Design', 'Fast Loading Speeds', 'SEO Optimized', 'High Conversion Rates'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Custom Business Web Application Interface',
    relatedLinks: [{ url: '/services/mobile-app-development', text: 'Explore Mobile App Development' }]
  },
  'mobile-app-development': {
    metaTitle: 'Business Mobile App Development | Gyan VaniAi',
    metaDescription: 'Custom mobile app development for Android and iOS using React Native and Flutter. We build scalable business mobile applications.',
    h1: 'Mobile App Development',
    subtitle: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    benefits: ['iOS & Android', 'React Native / Flutter', 'High Performance', 'Scalable Architecture'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Business Mobile Application Development',
    relatedLinks: [{ url: '/services/web-development', text: 'Learn about Web Application Development' }]
  }
};

export default function SEOLandingPage() {
  const { serviceId, industryId } = useParams();
  
  // Determine if it's a service or industry page
  const pageId = serviceId || industryId || 'ai-development';
  
  const pageData = seoDataMap[pageId] || {
    metaTitle: 'Custom Software Development | Gyan VaniAi',
    metaDescription: 'We build high-performance software tailored to your specific business needs.',
    h1: 'Custom Software Development',
    subtitle: 'We build high-performance software tailored to your specific business needs.',
    benefits: ['Custom Solutions', 'Scalable Architecture', 'Secure Infrastructure', 'Dedicated Support'],
    image: '/hero_dashboard.webp',
    imageAlt: 'Custom Software Development Dashboard',
    relatedLinks: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  const pathPrefix = industryId ? 'industries' : 'services';
  const pageUrl = `https://gyanvaniai.online/${pathPrefix}/${pageId}`;

  return (
    <>
      <Helmet>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageData.metaTitle} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:image" content={`https://gyanvaniai.online${pageData.image}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metaTitle} />
        <meta name="twitter:description" content={pageData.metaDescription} />
        <meta name="twitter:image" content={`https://gyanvaniai.online${pageData.image}`} />
        <script type="application/ld+json">
          {`
            [
              ${pathPrefix === 'services' ? `
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "${pageData.h1.replace(/"/g, '\\"')}",
                "provider": {
                  "@id": "https://gyanvaniai.online/#organization"
                },
                "areaServed": ["Europe", "Asia", "Africa", "Worldwide"],
                "description": "${pageData.metaDescription.replace(/"/g, '\\"')}",
                "url": "${pageUrl}"
              },` : `
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "${pageData.h1.replace(/"/g, '\\"')}",
                "description": "${pageData.metaDescription.replace(/"/g, '\\"')}",
                "url": "${pageUrl}",
                "publisher": {
                  "@id": "https://gyanvaniai.online/#organization"
                },
                "about": {
                  "@type": "Thing",
                  "name": "${pageData.h1.replace(/"/g, '\\"')}"
                }
              },`}
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
                    "name": "${pathPrefix === 'industries' ? 'Industries' : 'Services'}",
                    "item": "https://gyanvaniai.online/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "${pageData.h1.replace(/"/g, '\\"')}",
                    "item": "${pageUrl}"
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>
      
      <main>
        {/* SEO Hero Section */}
        <section className="hero" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h1 className="h1" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                  {pageData.h1}
                </h1>
                <p className="text-lg text-muted" style={{ marginBottom: '2rem' }}>
                  {pageData.subtitle}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                  {pageData.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={20} color="var(--primary-color)" />
                      <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  Get a Free Consultation <ArrowRight size={20} />
                </button>
              </div>
              <div className="hero-visual" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img src={pageData.image} alt={pageData.imageAlt} width="800" height="600" style={{ width: '100%', height: 'auto', display: 'block' }} fetchpriority="high" decoding="sync" />
              </div>
            </div>
          </div>
        </section>

        {/* Reusing Core Components to build trust */}
        <Process />
        <FAQ />
        
        {/* Internal Linking Section */}
        {pageData.relatedLinks && pageData.relatedLinks.length > 0 && (
          <section className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <div style={{ padding: '2rem', background: 'var(--card-bg, rgba(99, 102, 241, 0.05))', borderRadius: '1rem' }}>
              <h2 className="h3" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Related Services</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {pageData.relatedLinks.map((link, idx) => (
                  <a key={idx} href={link.url} style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={(e) => e.target.style.borderBottom = '1px solid var(--primary-color)'} onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}>
                    {link.text} →
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactSection />
      </main>
    </>
  );
}
