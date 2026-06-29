import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Statistics from '../components/Statistics';
import TechStack from '../components/TechStack';
import Portfolio from '../components/Portfolio';
import FAQ from '../components/FAQ';
import Integrations from '../components/Integrations';
import ContactSection from '../components/ContactSection';
import ContactModal from '../components/ContactModal';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Gyan VaniAi | Enterprise AI Solutions & WhatsApp Automation</title>
        <meta name="description" content="Gyan VaniAi offers Enterprise AI systems, RAG pipelines, and automated WhatsApp CRM solutions to scale your business operations." />
        <link rel="canonical" href="https://gyanvania.ai/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gyan VaniAi",
              "url": "https://gyanvania.ai",
              "logo": "https://gyanvania.ai/logo.png",
              "description": "Enterprise AI Systems & Full-Stack Development. Specializing in multi-agent orchestration, WhatsApp automation, and intelligent CRM solutions."
            }
          `}
        </script>
      </Helmet>
      <main>
      <div data-aos="fade-in"><Hero onBookDemo={() => setIsModalOpen(true)} /></div>
      <div data-aos="fade-up"><Features /></div>
      <div data-aos="fade-up"><Statistics /></div>
      <div data-aos="fade-up"><TechStack /></div>
      <div data-aos="fade-up"><Integrations /></div>
      <div data-aos="fade-up"><Portfolio /></div>
      <FAQ />
      <ContactSection />
      </main>
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
