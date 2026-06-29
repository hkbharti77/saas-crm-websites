import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PolicyPage from './pages/PolicyPage';
import TermsConditions from './pages/TermsConditions';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ServicePage from './pages/ServicePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCreatePost from './pages/admin/AdminCreatePost';
import AdminEditPost from './pages/admin/AdminEditPost';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { Analytics } from "@vercel/analytics/react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/privacy" element={<PolicyPage />} />
          <Route path="/terms" element={<TermsConditions />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<AdminCreatePost />} />
          <Route path="/admin/edit/:id" element={<AdminEditPost />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
