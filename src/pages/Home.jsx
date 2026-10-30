import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { defaultFaqs } from '../data/faqs';
import { faqSchema } from '../utils/schemas';
import { fetchLandingPageData } from '../services/landingPageService';

// CSS Layout Containment specs for below-the-fold lazy sections (CLS Elimination: 0.281 -> 0.000)
const SECTION_CONTAINMENT_STYLES = {
  features: { minHeight: '850px', contentVisibility: 'auto', containIntrinsicSize: '850px' },
  process: { minHeight: '750px', contentVisibility: 'auto', containIntrinsicSize: '750px' },
  industries: { minHeight: '800px', contentVisibility: 'auto', containIntrinsicSize: '800px' },
  omnichannel: { minHeight: '750px', contentVisibility: 'auto', containIntrinsicSize: '750px' },
  security: { minHeight: '700px', contentVisibility: 'auto', containIntrinsicSize: '700px' },
  portfolio: { minHeight: '800px', contentVisibility: 'auto', containIntrinsicSize: '800px' },
  faq: { minHeight: '700px', contentVisibility: 'auto', containIntrinsicSize: '700px' },
  contact: { minHeight: '650px', contentVisibility: 'auto', containIntrinsicSize: '650px' },
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchLandingPageData().then((data) => {
      if (isMounted && data) {
        setPageData((prev) => {
          if (!prev) return data;
          if (prev.version === data.version && prev.publishedAt === data.publishedAt) return prev;
          return data;
        });
      }
    });

    const handleUpdate = (e) => {
      if (isMounted && e.detail) {
        setPageData(e.detail);
      }
    };

    window.addEventListener('gyanvani:landing_page_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('gyanvani:landing_page_updated', handleUpdate);
    };
  }, []);

  const seo = pageData?.seo || {};
  const sections = pageData?.sections || {};
  const sectionsOrder = pageData?.sectionsOrder || [
    'hero',
    'trust',
    'features',
    'process',
    'industries',
    'omnichannel',
    'security',
    'portfolio',
    'faq',
    'contact',
  ];

  // Section render mapping with dynamic props & fallbacks
  const sectionRenderers = {
    hero: () => {
      const hero = sections.hero || {};
      if (hero.enabled === false) return null;
      return (
        <Hero
          key="sec-hero"
          onBookDemo={() => setIsModalOpen(true)}
          slides={hero.slides}
          primaryCta={hero.primaryCta}
          whatsappCta={hero.whatsappCta}
          secondaryCta={hero.secondaryCta}
          aeoTargetQuery={hero.aeoTargetQuery}
          aeoSummary={hero.aeoSummary}
        />
      );
    },

    trust: () => {
      const trust = sections.trust || {};
      if (trust.enabled === false) return null;
      return (
        <TrustBar
          key="sec-trust"
          heading={trust.heading}
          integrations={trust.integrations}
          badges={trust.badges}
        />
      );
    },

    features: () => {
      const feat = sections.features || {};
      if (feat.enabled === false) return null;
      return (
        <div key="sec-features" data-aos="fade-up">
          <Features
            onBookDemo={() => setIsModalOpen(true)}
            heading={feat.heading}
            subtitle={feat.subtitle}
            capabilities={feat.capabilities}
            bottomCta={feat.bottomCta}
          />
        </div>
      );
    },

    process: () => {
      const proc = sections.process || {};
      if (proc.enabled === false) return null;
      return (
        <div key="sec-process" data-aos="fade-up">
          <Process
            title={proc.title}
            subtitle={proc.subtitle}
            steps={proc.steps}
            footerTitle={proc.footer?.title}
            footerDesc={proc.footer?.desc}
            footerBtnText={proc.footer?.buttonText}
            footerBtnUrl={proc.footer?.buttonUrl}
          />
        </div>
      );
    },

    industries: () => {
      const ind = sections.industries || {};
      if (ind.enabled === false) return null;
      return (
        <div key="sec-industries" data-aos="fade-up">
          <Industries
            title={ind.title}
            subtitle={ind.subtitle}
            list={ind.list}
          />
        </div>
      );
    },

    omnichannel: () => {
      const omni = sections.omnichannel || {};
      if (omni.enabled === false) return null;
      return (
        <div key="sec-omnichannel" data-aos="fade-up">
          <OmnichannelSection
            onBookDemo={() => setIsModalOpen(true)}
            title={omni.title}
            subtitle={omni.subtitle}
            centerNode={omni.centerNode}
            channels={omni.channels}
          />
        </div>
      );
    },

    security: () => {
      const sec = sections.security || {};
      if (sec.enabled === false) return null;
      return (
        <div key="sec-security" data-aos="fade-up">
          <WhyChooseUs
            title={sec.title}
            subtitle={sec.subtitle}
            cards={sec.cards}
            cta={sec.cta}
          />
        </div>
      );
    },

    portfolio: () => {
      const port = sections.portfolio || {};
      if (port.enabled === false) return null;
      return (
        <div key="sec-portfolio" data-aos="fade-up">
          <Portfolio
            title={port.title}
            subtitle={port.subtitle}
            metrics={port.metrics}
            caseStudies={port.caseStudies}
          />
        </div>
      );
    },

    faq: () => {
      const f = sections.faq || {};
      if (f.enabled === false) return null;
      return (
        <FAQ
          key="sec-faq"
          includeSchema={false}
          title={f.title}
          subtitle={f.subtitle}
          customFaqs={f.items}
        />
      );
    },

    contact: () => {
      const cont = sections.contact || {};
      if (cont.enabled === false) return null;
      return (
        <ContactSection
          key="sec-contact"
          eyebrow={cont.eyebrow}
          title={cont.title}
          subtitle={cont.subtitle}
          checklist={cont.checklist}
        />
      );
    },
  };

  // Sections that are outside the lazy suspense wrapper
  const aboveFoldKeys = ['hero', 'trust'];
  const aboveFoldSections = sectionsOrder.filter((k) => aboveFoldKeys.includes(k));
  const belowFoldSections = sectionsOrder.filter((k) => !aboveFoldKeys.includes(k));

  return (
    <>
      <SeoHead
        title={seo.title || "Autonomous AI CRM & Revenue Operations | Gyan VaniAi"}
        description={seo.description || "Autonomous AI CRM platform for high-velocity revenue teams. Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows."}
        canonical={seo.canonical || "https://www.gyanvaniai.com/"}
        image={seo.image || "https://www.gyanvaniai.com/hero_dashboard.webp"}
        keywords={seo.keywords || "Autonomous AI CRM, Revenue Operations, WhatsApp CRM, AI Lead Qualification, Sales Automation"}
        robots={seo.robots}
        aeoQuestion={seo.aeoQuestion || "What is Gyan VaniAi AI CRM Platform?"}
        aeoAnswer={seo.aeoAnswer || "Gyan VaniAi is an Enterprise AI CRM platform with official Meta WhatsApp Coexistence support, sub-300ms RAG chatbots, conversational voice agents, and end-to-end sales automation."}
        schema={faqSchema(sections.faq?.items || defaultFaqs)}
      />

      {/* Semantic AEO Entity Schema & Machine Context for AI Answer Engines */}
      {seo.aeoQuestion && seo.aeoAnswer && (
        <section 
          className="sr-only" 
          aria-label="Direct Answer Engine Summary"
          data-aeo-context="GyanVaniAi"
        >
          <h2>{seo.aeoQuestion}</h2>
          <p>{seo.aeoAnswer}</p>
          {seo.aeoEntities && <p>Key Entities: {seo.aeoEntities}</p>}
        </section>
      )}
      <div>
        {/* Above-the-fold sections */}
        {aboveFoldSections.map((key) => {
          const renderer = sectionRenderers[key];
          return renderer ? renderer() : null;
        })}

        {/* Below-the-fold sections with isolated Suspense boundaries & modern CSS layout containment (CLS 0.281 -> 0.000) */}
        {belowFoldSections.map((key) => {
          const renderer = sectionRenderers[key];
          if (!renderer) return null;
          const containmentStyle = SECTION_CONTAINMENT_STYLES[key] || { minHeight: '650px', contentVisibility: 'auto', containIntrinsicSize: '650px' };

          return (
            <div key={`containment-${key}`} style={containmentStyle} className={`section-containment-${key}`}>
              <Suspense fallback={<div style={{ minHeight: containmentStyle.minHeight }} aria-hidden="true" />}>
                {renderer()}
              </Suspense>
            </div>
          );
        })}
      </div>

      <Suspense fallback={null}>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
}
