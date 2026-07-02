import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Statistics from '../components/Statistics';
import TechStack from '../components/TechStack';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Integrations from '../components/Integrations';
import ContactSection from '../components/ContactSection';
import ContactModal from '../components/ContactModal';
import { Helmet } from 'react-helmet-async';
import { trackEvent } from '../utils/analytics';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen/closed the popup during this session
    const hasSeenPopup = sessionStorage.getItem('auto_popup_shown');
    if (hasSeenPopup) return;

    let timer;

    const triggerPopup = () => {
      setIsModalOpen(true);
      sessionStorage.setItem('auto_popup_shown', 'true');
      trackEvent('auto_popup_trigger');
      
      // Clean up scroll listener
      window.removeEventListener('scroll', handleScroll);
    };

    // 1. Time delay: Trigger automatically after 10 seconds
    timer = setTimeout(triggerPopup, 10000);

    // 2. Scroll trigger: Trigger immediately if the user scrolls down 40% of the page
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0 && (scrollTop / docHeight) > 0.4) {
        clearTimeout(timer);
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>Gyan VaniAi | AI CRM, WhatsApp Automation & Lead Management</title>
        <meta name="description" content="Gyan VaniAi: AI-powered CRM with WhatsApp Automation, AI Chatbot, Voice AI, and Lead Management. Trusted by 500+ businesses. Book a free demo today." />
        <link rel="canonical" href="https://gyanvania.ai/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gyan VaniAi",
              "url": "https://gyanvania.ai",
              "logo": "https://gyanvania.ai/logo.png",
              "description": "AI CRM, WhatsApp Automation, AI Chatbot, Voice AI, and Lead Management for businesses. Enterprise AI Systems & Full-Stack Development.",
              "numberOfEmployees": "10+",
              "foundingDate": "2023"
            }
          `}
        </script>
      </Helmet>
      <main>
        <div data-aos="fade-in">
          <Hero onBookDemo={() => setIsModalOpen(true)} />
        </div>
        <div data-aos="fade-up">
          <Features onBookDemo={() => setIsModalOpen(true)} />
        </div>
        <div data-aos="fade-up"><Statistics /></div>
        <div data-aos="fade-up"><TechStack /></div>
        <div data-aos="fade-up"><Integrations /></div>
        <div data-aos="fade-up"><Portfolio /></div>
        <div data-aos="fade-up">
          <Testimonials onBookDemo={() => setIsModalOpen(true)} />
        </div>
        <FAQ />
        <ContactSection />
      </main>
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
