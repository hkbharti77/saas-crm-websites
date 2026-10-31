import React, { useEffect, useState, useRef, Suspense, lazy, Component } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EnterpriseBackground from './components/EnterpriseBackground';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import PageTransitionLayout from './components/transitions/PageTransitionLayout';

const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogSearch = lazy(() => import('./pages/BlogSearch'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));
const Documentation = lazy(() => import('./pages/Documentation'));
const WhatsAppCoexistencePage = lazy(() => import('./pages/WhatsAppCoexistencePage'));
const SalesAutomationPage = lazy(() => import('./pages/SalesAutomationPage'));
const AIChatbotsPage = lazy(() => import('./pages/AIChatbotsPage'));
const WhatsAppCallingAgentPage = lazy(() => import('./pages/WhatsAppCallingAgentPage'));
const CrmDevelopmentPage = lazy(() => import('./pages/CrmDevelopmentPage'));
const HrmsDevelopmentPage = lazy(() => import('./pages/HrmsDevelopmentPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const About = lazy(() => import('./pages/About'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const PlanDetailPage = lazy(() => import('./pages/PlanDetailPage'));
const Security = lazy(() => import('./pages/Security'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const IvrSolutionsPage = lazy(() => import('./pages/IvrSolutionsPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

// New high-value SEO, AEO & resource pages
const WhatsAppCatalogCrmPage = lazy(() => import('./pages/WhatsAppCatalogCrmPage'));
const WhatsAppPricingCalculatorPage = lazy(() => import('./pages/WhatsAppPricingCalculatorPage'));
const CrmMigrationGuidePage = lazy(() => import('./pages/CrmMigrationGuidePage'));
const VoiceAiLatencyBenchmarkPage = lazy(() => import('./pages/VoiceAiLatencyBenchmarkPage'));
const SipArchitectureGuidePage = lazy(() => import('./pages/SipArchitectureGuidePage'));
const VoiceAiInfrastructurePage = lazy(() => import('./pages/VoiceAiInfrastructurePage'));
const McpToolCallingGuidePage = lazy(() => import('./pages/McpToolCallingGuidePage'));
const WhereToFindUsPage = lazy(() => import('./pages/WhereToFindUsPage'));
const AeoVisibilityDashboard = lazy(() => import('./pages/AeoVisibilityDashboard'));

import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useGAPageViews, sanitizeUrlPath } from './hooks/useGAPageViews';

const DemoModal = lazy(() => import('./components/DemoModal'));
// Lazy: pulls react-phone-number-input (~210KB) — only loaded when the modal is actually opened
const ContactModal = lazy(() => import('./components/ContactModal'));
import MobileStickyCTA from './components/MobileStickyCTA';

// Prefetch all lazy route chunks at browser idle time to eliminate navigation delays
const LAZY_ROUTE_PREFETCHES = [
  () => import('./pages/About'),
  () => import('./pages/PricingPage'),
  () => import('./pages/Blog'),
  () => import('./pages/BlogPost'),
  () => import('./pages/PolicyPage'),
  () => import('./pages/TermsConditions'),
  () => import('./pages/Security'),
  () => import('./pages/Documentation'),
  () => import('./pages/WhatsAppCoexistencePage'),
  () => import('./pages/SalesAutomationPage'),
  () => import('./pages/AIChatbotsPage'),
  () => import('./pages/WhatsAppCallingAgentPage'),
  () => import('./pages/CrmDevelopmentPage'),
  () => import('./pages/HrmsDevelopmentPage'),
  () => import('./pages/IvrSolutionsPage'),
  () => import('./pages/WhatsAppCatalogCrmPage'),
  () => import('./pages/WhatsAppPricingCalculatorPage'),
  () => import('./pages/CrmMigrationGuidePage'),
  () => import('./pages/VoiceAiLatencyBenchmarkPage'),
  () => import('./pages/SipArchitectureGuidePage'),
  () => import('./pages/VoiceAiInfrastructurePage'),
  () => import('./pages/McpToolCallingGuidePage'),
  () => import('./pages/WhereToFindUsPage'),
  () => import('./pages/SEOLandingPage'),
  () => import('./pages/PlanDetailPage'),
  () => import('./pages/BlogSearch'),
  () => import('./pages/CategoryPage'),
];

function prefetchLazyRoutes() {
  if (typeof window === 'undefined') return;
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
  LAZY_ROUTE_PREFETCHES.forEach((load, i) => {
    schedule(() => { load().catch(() => {}); }, { timeout: 4000 + i * 300 });
  });
}

class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const isChunkLoadFailed = error?.message?.match(/Failed to fetch dynamically imported module/i) || error?.name === 'ChunkLoadError';
    if (isChunkLoadFailed) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem' }}>
          <h2>Loading new updates...</h2>
          <p style={{ color: 'var(--text-muted)' }}>We are refreshing the application to serve you the latest version.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Refresh Manually</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  useGAPageViews();

  // Prefetch all lazy page chunks after first paint so subsequent navigations are instant
  useEffect(() => {
    prefetchLazyRoutes();
  }, []);

  // Vercel Analytics: Data-minimization middleware enforcing dual-layer path & query sanitization
  const handleVercelBeforeSend = (event) => {
    if (!event || !event.url) return event;
    try {
      const urlObj = new URL(event.url, window.location.origin);
      const safePath = sanitizeUrlPath(urlObj.pathname, urlObj.search);
      return {
        ...event,
        url: `${urlObj.origin}${safePath}`,
      };
    } catch {
      return event;
    }
  };
  const location = useLocation();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState('');
  const hasTriggeredRef = useRef({});

  // DPDP Act 2023 / GDPR Gating: Only mount Vercel Analytics if affirmative consent is present
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('gyanvaniai_cookie_consent');
        if (saved) {
          const parsed = JSON.parse(saved);
          return Boolean(parsed?.preferences?.analytics);
        }
      }
    } catch {
      /* ignore */
    }
    return false;
  });

  useEffect(() => {
    const handleConsentUpdate = (e) => {
      if (e?.detail?.preferences) {
        setHasAnalyticsConsent(Boolean(e.detail.preferences.analytics));
      }
    };
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    return () => window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
  }, []);

  // Canonical host enforcement: redirect old domain or non-www to canonical https://www.gyanvaniai.com
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname;
      if (hostname === 'gyanvaniai.online' || hostname === 'www.gyanvaniai.online' || hostname === 'gyanvaniai.com') {
        window.location.replace(`https://www.gyanvaniai.com${window.location.pathname}${window.location.search}${window.location.hash}`);
      }
    }
  }, []);

  // Scroll to hash target when present
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.init({
        duration: 650,
        once: true,
        easing: 'ease-out-cubic',
        offset: 60,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Auto-open Book a Demo modal when user scrolls past 75% on any page
  useEffect(() => {
    // Exclude admin dashboard/editor pages and blog pages
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/blog')) return;

    const currentPath = location.pathname;

    const handleScroll = () => {
      if (hasTriggeredRef.current[currentPath]) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 100) return; // Ignore very short pages

      const scrollPct = (scrollTop / docHeight) * 100;

      if (scrollPct >= 75) {
        hasTriggeredRef.current[currentPath] = true;
        const sessionKey = `demo_modal_75_${currentPath}`;
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, 'true');
          setIsDemoModalOpen(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Global listener for custom demo modal triggers
  useEffect(() => {
    const handleCustomOpen = (e) => {
      if (e.detail?.prefill) {
        setModalPrefill(e.detail.prefill);
      }
      setIsDemoModalOpen(true);
    };

    const handleLiveDemoOpen = () => {
      setIsLiveDemoOpen(true);
    };

    window.addEventListener('open-demo-modal', handleCustomOpen);
    window.addEventListener('open-live-demo', handleLiveDemoOpen);
    return () => {
      window.removeEventListener('open-demo-modal', handleCustomOpen);
      window.removeEventListener('open-live-demo', handleLiveDemoOpen);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        <EnterpriseBackground />
        <Header />
        <main>
          <ChunkErrorBoundary>
            <Suspense fallback={
              <div className="route-loading-fallback">
                <div className="route-spinner" aria-hidden="true" />
                <span className="route-loading-text">Loading Gyan VaniAi...</span>
              </div>
            }>
              <Routes>
                <Route element={<PageTransitionLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/search" element={<BlogSearch />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/services/whatsapp-coexistence" element={<WhatsAppCoexistencePage />} />
                  <Route path="/services/sales-automation" element={<SalesAutomationPage />} />
                  <Route path="/services/ai-chatbots" element={<AIChatbotsPage />} />
                  <Route path="/services/whatsapp-calling-agent" element={<WhatsAppCallingAgentPage />} />
                  <Route path="/services/crm-development" element={<CrmDevelopmentPage />} />
                  <Route path="/services/hrms-development" element={<HrmsDevelopmentPage />} />
                  <Route path="/services/whatsapp-calling-agent-bots" element={<Navigate to="/services/whatsapp-calling-agent" replace />} />
                  <Route path="/services/ivr-solutions" element={<IvrSolutionsPage />} />
                  <Route path="/industries/legal" element={<LegalPage />} />
                  
                  {/* Specialized Commercial & Tool Pages */}
                  <Route path="/services/whatsapp-catalog-crm" element={<WhatsAppCatalogCrmPage />} />
                  <Route path="/tools/whatsapp-pricing-calculator" element={<WhatsAppPricingCalculatorPage />} />

                  {/* Comparison Redirects */}
                  <Route path="/compare/*" element={<Navigate to="/services/crm-development" replace />} />

                  {/* Guides & Resources */}
                  <Route path="/guides/crm-migration" element={<CrmMigrationGuidePage />} />
                  <Route path="/resources/voice-ai-latency-benchmark" element={<VoiceAiLatencyBenchmarkPage />} />
                  <Route path="/resources/sip-architecture" element={<SipArchitectureGuidePage />} />
                  <Route path="/resources/voice-ai-infrastructure" element={<VoiceAiInfrastructurePage />} />
                  <Route path="/resources/mcp-ai-agent-tool-calling" element={<McpToolCallingGuidePage />} />
                  <Route path="/resources/where-to-find-us" element={<WhereToFindUsPage />} />

                  {/* AEO & Search Visibility Telemetry */}
                  <Route path="/seo/ai-visibility" element={<AeoVisibilityDashboard />} />

                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/services/:serviceId" element={<SEOLandingPage />} />
                  <Route path="/industries/:industryId" element={<SEOLandingPage />} />
                  <Route path="/privacy" element={<PolicyPage />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/pricing/:planId" element={<PlanDetailPage />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/unsubscribe" element={<Unsubscribe />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </ChunkErrorBoundary>
        </main>
        <Footer />
        <CookieConsentBanner />
        {isDemoModalOpen && (
          <Suspense fallback={null}>
            <ContactModal
              isOpen={isDemoModalOpen}
              onClose={() => {
                setIsDemoModalOpen(false);
                setModalPrefill('');
              }}
              prefillMessage={modalPrefill}
            />
          </Suspense>
        )}
        <Suspense fallback={null}>
          <DemoModal
            isOpen={isLiveDemoOpen}
            onClose={() => setIsLiveDemoOpen(false)}
          />
        </Suspense>
        <MobileStickyCTA />
        <Analytics beforeSend={handleVercelBeforeSend} />
        {hasAnalyticsConsent && <SpeedInsights />}
      </div>
    </ThemeProvider>
  );
}

export default App;
