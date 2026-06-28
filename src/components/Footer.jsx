import React from 'react';
import { ArrowRight, Phone, MapPin, Mail, Facebook } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <img src="/logo.webp" alt="Gyan VaniAi" className="logo-img" />
              <span className="logo-text">Gyan VaniAi</span>
            </div>
            <p className="text-muted text-sm" style={{ maxWidth: '300px' }}>
              We build intelligent CRM solutions, AI Chatbots, and automated workflows to scale your business.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Phone size={20} /></a>
              <a href="#" className="social-icon"><MapPin size={20} /></a>
              <a href="mailto:contact@gyanvaniai.online" className="social-icon"><Mail size={20} /></a>
              <a href="https://www.facebook.com/gyanvaniai/" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-title">Services</h4>
              <a href="#" className="footer-link">CRM Development</a>
              <a href="#" className="footer-link">AI Chatbots</a>
              <a href="#" className="footer-link">WhatsApp Automation</a>
            </div>
            <div className="link-group">
              <h4 className="link-title">Company</h4>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms & Conditions</a>
              <a href="/#contact-form-section" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div className="footer-cta">
            <h4 className="link-title">Ready to scale?</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="input-field" />
              <button className="btn btn-primary" style={{ padding: '0.5rem' }}>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="text-sm text-muted">© 2026 Gyan VaniAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
