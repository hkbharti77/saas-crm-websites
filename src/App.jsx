import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlobBackground from './components/BlobBackground';
import CustomCursor from './components/CustomCursor';
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

function App() {
  useScrollDepth();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        <BlobBackground />
        <CustomCursor />
        <Header />
        <main>
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
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<AdminCreatePost />} />
              <Route path="/admin/edit/:id" element={<AdminEditPost />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </ThemeProvider>
  );
}

export default App;
