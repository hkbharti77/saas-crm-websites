import React, { useState, Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Industries from '../components/Industries';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
const Integrations = lazy(() => import('../components/Integrations'));
const Portfolio = lazy(() => import('../components/Portfolio'));

const FAQ = lazy(() => import('../components/FAQ'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const ContactModal = lazy(() => import('../components/ContactModal'));
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Enterprise AI, CRM & Automation Solutions | Gyan VaniAi</title>
        <meta name="description" content="Gyan VaniAi builds AI software, CRM, WhatsApp automation, chatbots and custom business solutions to automate operations, generate leads and scale growth." />
        <link rel="canonical" href="https://www.gyanvaniai.online/" />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gyanvaniai.online/" />
        <meta property="og:title" content="Enterprise AI, CRM & Automation Solutions | Gyan VaniAi" />
        <meta property="og:description" content="Gyan VaniAi builds AI software, CRM, WhatsApp automation, chatbots and custom business solutions to automate operations, generate leads and scale growth." />
        <meta property="og:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.gyanvaniai.online/" />
        <meta name="twitter:title" content="Enterprise AI, CRM & Automation Solutions | Gyan VaniAi" />
        <meta name="twitter:description" content="Gyan VaniAi builds AI software, CRM, WhatsApp automation, chatbots and custom business solutions to automate operations, generate leads and scale growth." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />

        {/* Structured Schema with Global & Regional GEO Targets */}
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.gyanvaniai.online/#website",
                "url": "https://www.gyanvaniai.online/",
                "name": "Gyan VaniAi",
                "description": "Enterprise AI, CRM, WhatsApp Coexistence and Custom Software Development",
                "publisher": {
                  "@id": "https://www.gyanvaniai.online/#organization"
                },
                "inLanguage": "en-US"
              },
              {
                "@context": "https://schema.org",
                "@type": ["ProfessionalService", "Organization"],
                "@id": "https://www.gyanvaniai.online/#organization",
                "name": "Gyan VaniAi",
                "url": "https://www.gyanvaniai.online/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.gyanvaniai.online/logo.png",
                  "width": "512",
                  "height": "512"
                },
                "image": "https://www.gyanvaniai.online/hero_dashboard.webp",
                "description": "Enterprise software development company specializing in AI CRM, WhatsApp Automation & Coexistence, AI Agents, Voice Calling Bots, HRMS, and ERP development.",
                "email": "contact@gyanvaniai.online",
                "areaServed": ["Europe", "Asia", "Africa", "North America", "Worldwide"],
                "priceRange": "$$",
                "sameAs": [
                  "https://www.facebook.com/gyanvaniai/",
                  "https://www.linkedin.com/company/gyan-vaniai"
                ],
                "knowsAbout": [
                  "Artificial Intelligence",
                  "WhatsApp Coexistence",
                  "WhatsApp Business Cloud API",
                  "CRM Development",
                  "Voice AI Bots",
                  "Autonomous AI Agents",
                  "Smart IVR Solutions",
                  "Retrieval Augmented Generation",
                  "HRMS Software",
                  "ERP Software",
                  "Full Stack Web Development"
                ],
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "email": "contact@gyanvaniai.online",
                    "contactType": "customer service",
                    "availableLanguage": ["English", "Hindi"]
                  },
                  {
                    "@type": "ContactPoint",
                    "email": "contact@gyanvaniai.online",
                    "contactType": "sales",
                    "availableLanguage": ["English", "Hindi"]
                  }
                ]
              }
            ]
          `}
        </script>
      </Helmet>
      <div>
        <Hero onBookDemo={() => setIsModalOpen(true)} />
        <div data-aos="fade-up">
          <Features onBookDemo={() => setIsModalOpen(true)} />
        </div>
        <div data-aos="fade-up">
          <Industries />
        </div>
        <div data-aos="fade-up">
          <WhyChooseUs />
        </div>
        <Suspense fallback={<div style={{ minHeight: '300px' }}></div>}>
          <div data-aos="fade-up">
            <Portfolio />
          </div>
          <div data-aos="fade-up">
            <Process />
          </div>
          <div data-aos="fade-up">
            <TechStack />
          </div>
          <div data-aos="fade-up">
            <Integrations />
          </div>
          <FAQ />
          <ContactSection />
        </Suspense>
      </div>
      
      <Suspense fallback={null}>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
}
