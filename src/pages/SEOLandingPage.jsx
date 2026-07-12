import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Process from '../components/Process';


const seoDataMap = {
  'ai-development': {
    title: 'Top AI Development Company',
    subtitle: 'Build custom AI agents, chatbots, and automation workflows that save time and increase revenue.',
    benefits: ['Custom AI Models', 'Seamless Integration', '24/7 Automation', 'Data Security'],
    image: '/portfolio_ai.webp'
  },
  'ai-agent-development': {
    title: 'Custom AI Agent Development',
    subtitle: 'Deploy intelligent AI agents that handle sales, support, and operations autonomously.',
    benefits: ['Multi-Agent Systems', 'Workflow Automation', 'Natural Language Processing', 'Cost Reduction'],
    image: '/portfolio_ai.webp'
  },
  'crm-development': {
    title: 'Custom CRM Development Company',
    subtitle: 'Tailor-made CRM solutions to manage your leads, automate follow-ups, and close more deals.',
    benefits: ['Custom Workflows', 'WhatsApp Integration', 'Lead Scoring', 'Advanced Analytics'],
    image: '/portfolio_crm.webp'
  },
  'healthcare-crm': {
    title: 'Healthcare CRM Solutions',
    subtitle: 'HIPAA-compliant CRM systems for patient management, appointment scheduling, and telemedicine.',
    benefits: ['Patient Portals', 'Appointment Automation', 'Data Security', 'EMR Integration'],
    image: '/portfolio_crm.webp'
  },
  'whatsapp-automation': {
    title: 'WhatsApp CRM & Automation',
    subtitle: 'Turn WhatsApp into your primary revenue channel with automated replies and lead capture.',
    benefits: ['Instant Replies', 'Bulk Broadcasting', 'Chatbot Integration', 'Analytics Dashboard'],
    image: '/portfolio_crm.webp'
  },
  'hrms-development': {
    title: 'HRMS Software Development',
    subtitle: 'Streamline your HR operations with custom software for payroll, attendance, and recruitment.',
    benefits: ['Payroll Automation', 'Leave Management', 'Employee Self-Service', 'Performance Tracking'],
    image: '/portfolio_stock.webp'
  },
  'erp-development': {
    title: 'Custom ERP Solutions',
    subtitle: 'Unify your business processes with a scalable Enterprise Resource Planning system.',
    benefits: ['Inventory Management', 'Financial Reporting', 'Supply Chain Visibility', 'Operational Efficiency'],
    image: '/portfolio_stock.webp'
  },
  'web-development': {
    title: 'Business Website Development',
    subtitle: 'High-performance, SEO-optimized websites that convert visitors into paying customers.',
    benefits: ['Responsive Design', 'Fast Loading Speeds', 'SEO Optimized', 'High Conversion Rates'],
    image: '/portfolio_stock.webp'
  },
  'mobile-app-development': {
    title: 'Mobile App Development Company',
    subtitle: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    benefits: ['iOS & Android', 'React Native / Flutter', 'High Performance', 'Scalable Architecture'],
    image: '/portfolio_crm.webp'
  }
};

export default function SEOLandingPage() {
  const { serviceId, industryId } = useParams();
  
  // Determine if it's a service or industry page
  const pageId = serviceId || industryId || 'ai-development';
  
  const pageData = seoDataMap[pageId] || {
    title: 'Custom Software Development',
    subtitle: 'We build high-performance software tailored to your specific business needs.',
    benefits: ['Custom Solutions', 'Scalable Architecture', 'Secure Infrastructure', 'Dedicated Support'],
    image: '/hero_dashboard.webp'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  return (
    <>
      <Helmet>
        <title>{pageData.title} | Gyan VaniAi</title>
        <meta name="description" content={pageData.subtitle} />
      </Helmet>
      
      <main>
        {/* SEO Hero Section */}
        <section className="hero" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h1 className="h1" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                  {pageData.title}
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
                <img src={pageData.image} alt={pageData.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Reusing Core Components to build trust */}
        <Process />
        <FAQ />
        <ContactSection />
      </main>
    </>
  );
}
