import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import ContactModal from '../components/ContactModal';
import { Helmet } from 'react-helmet-async';
import { trackEvent } from '../utils/analytics';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('auto_popup_shown');
    if (hasSeenPopup) return;

    let timer;

    const triggerPopup = () => {
      setIsModalOpen(true);
      sessionStorage.setItem('auto_popup_shown', 'true');
      trackEvent('auto_popup_trigger');
      window.removeEventListener('scroll', handleScroll);
    };

    timer = setTimeout(triggerPopup, 10000);

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
        <title>Enterprise AI & Software Development Solutions | Gyan VaniAi</title>
        <meta name="description" content="We design and develop AI Agents, CRM, HRMS, ERP, Business Websites, Mobile Apps, and Enterprise Software that automate operations and generate revenue." />
        <link rel="canonical" href="https://gyanvaniai.online/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Gyan VaniAi",
              "url": "https://gyanvaniai.online",
              "logo": "https://gyanvaniai.online/logo.png",
              "description": "Enterprise software development company specializing in AI, CRM, HRMS, ERP, and Mobile Apps.",
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
      </main>
      
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
