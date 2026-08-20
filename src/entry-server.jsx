import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import EnterpriseBackground from './components/EnterpriseBackground';
import CookieConsentBanner from './components/CookieConsentBanner';

import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PolicyPage from './pages/PolicyPage';
import TermsConditions from './pages/TermsConditions';
import SEOLandingPage from './pages/SEOLandingPage';
import WhatsAppCoexistencePage from './pages/WhatsAppCoexistencePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCreatePost from './pages/admin/AdminCreatePost';
import AdminEditPost from './pages/admin/AdminEditPost';
import NotFound from './pages/NotFound';

function ServerApp() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <EnterpriseBackground />
        <Header />
        <main>
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
        </main>
        <Footer />
        <CookieConsentBanner />
      </div>
    </ThemeProvider>
  );
}

export function render(url, helmetContext = {}) {
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <ServerApp />
      </MemoryRouter>
    </HelmetProvider>
  );

  return { appHtml, helmet: helmetContext.helmet };
}
