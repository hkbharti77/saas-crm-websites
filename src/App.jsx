import React, { useEffect, Suspense, lazy, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EnterpriseBackground from './components/EnterpriseBackground';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';

const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));
const WhatsAppCoexistencePage = lazy(() => import('./pages/WhatsAppCoexistencePage'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCreatePost = lazy(() => import('./pages/admin/AdminCreatePost'));
const AdminEditPost = lazy(() => import('./pages/admin/AdminEditPost'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import('./pages/About'));
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useScrollDepth } from './hooks/useScrollDepth';
import { useGAPageViews } from './hooks/useGAPageViews';

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
  useScrollDepth();
  useGAPageViews();

  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
      easing: 'ease-out-cubic',
      offset: 60,
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        <EnterpriseBackground />
        <Header />
        <main>
          <ChunkErrorBoundary>
            <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><div className="loading-spinner">Loading...</div></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/services/whatsapp-coexistence" element={<WhatsAppCoexistencePage />} />
                <Route path="/services/:serviceId" element={<SEOLandingPage />} />
                <Route path="/industries/:industryId" element={<SEOLandingPage />} />
                <Route path="/privacy" element={<PolicyPage />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/about" element={<About />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/create" element={<AdminCreatePost />} />
                <Route path="/admin/edit/:id" element={<AdminEditPost />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ChunkErrorBoundary>
        </main>
        <Footer />
        <CookieConsentBanner />
        <Analytics />
        <SpeedInsights />
      </div>
    </ThemeProvider>
  );
}

export default App;
