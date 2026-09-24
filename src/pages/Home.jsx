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
import SeoHead from '../components/SeoHead';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SeoHead
        title="Autonomous AI CRM & Revenue Operations | Gyan VaniAi"
        description="Autonomous AI CRM platform for high-velocity revenue teams. Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows."
        canonical="https://www.gyanvaniai.online/"
        image="https://www.gyanvaniai.online/hero_dashboard.webp"
        keywords="Autonomous AI CRM, Revenue Operations, WhatsApp CRM, AI Lead Qualification, Sales Automation"
        aeoQuestion="What is Gyan VaniAi AI CRM Platform?"
        aeoAnswer="Gyan VaniAi is an Enterprise AI CRM platform with official Meta WhatsApp Coexistence support, sub-300ms RAG chatbots, conversational voice agents, and end-to-end sales automation."
      />
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

          {/* 11 & 12. Final CTA & Lead Form */}
          <ContactSection />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
}
