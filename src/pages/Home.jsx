import React, { useState, Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';

const Features = lazy(() => import('../components/Features'));
const Process = lazy(() => import('../components/Process'));
const Industries = lazy(() => import('../components/Industries'));
const OmnichannelSection = lazy(() => import('../components/OmnichannelSection'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
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
        <title>Autonomous AI CRM & Revenue Operations | Gyan VaniAi</title>
        <meta name="description" content="Autonomous AI CRM platform for high-velocity revenue teams. Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows." />
        <link rel="canonical" href="https://www.gyanvaniai.online/" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gyanvaniai.online/" />
        <meta property="og:title" content="Autonomous AI CRM & Revenue Operations | Gyan VaniAi" />
        <meta property="og:description" content="Autonomous AI CRM platform for high-velocity revenue teams. Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows." />
        <meta property="og:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.gyanvaniai.online/" />
        <meta name="twitter:title" content="Autonomous AI CRM & Revenue Operations | Gyan VaniAi" />
        <meta name="twitter:description" content="Autonomous AI CRM platform for high-velocity revenue teams. Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows." />
        <meta name="twitter:image" content="https://www.gyanvaniai.online/hero_dashboard.webp" />

        {/* Structured Schema */}
        <script type="application/ld+json">
          {`
            [
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.gyanvaniai.online/#website",
                "url": "https://www.gyanvaniai.online/",
                "name": "Gyan VaniAi",
                "description": "Enterprise AI CRM, Autonomous Revenue Operations, and WhatsApp Coexistence Platform",
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
                "description": "Autonomous AI CRM and revenue operations platform with lead scoring, auto-enrichment, intelligent assignment, and WhatsApp Coexistence.",
                "email": "contact@gyanvaniai.online",
                "areaServed": ["Europe", "Asia", "Africa", "North America", "Worldwide"],
                "priceRange": "$$",
                "sameAs": [
                  "https://www.facebook.com/gyanvaniai/",
                  "https://www.linkedin.com/company/gyan-vaniai"
                ]
              }
            ]
          `}
        </script>
      </Helmet>

      <div>
        {/* 1 & 2. Hero Section */}
        <Hero onBookDemo={() => setIsModalOpen(true)} />

        {/* 3. Trust & Integrations Bar */}
        <TrustBar />

        {/* 4. AI CRM Capabilities */}
        <Suspense fallback={<div style={{ minHeight: '300px' }}></div>}>
          <div data-aos="fade-up">
            <Features onBookDemo={() => setIsModalOpen(true)} />
          </div>

          {/* 5. How It Works (Visual Workflow) */}
          <div data-aos="fade-up">
            <Process />
          </div>

        {/* 6. Industries Grid */}
        <div data-aos="fade-up">
          <Industries />
        </div>

        {/* 7. Omnichannel & AI Agent Section */}
        <div data-aos="fade-up">
          <OmnichannelSection onBookDemo={() => setIsModalOpen(true)} />
        </div>

        {/* 8. Enterprise Security */}
        <div data-aos="fade-up">
          <WhyChooseUs />
        </div>

        {/* 9. Results / Social Proof & Case Studies */}
          <div data-aos="fade-up">
            <Portfolio />
          </div>

          <FAQ />

          {/* 10 & 11. Final CTA & Lead Form */}
          <ContactSection />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
}
