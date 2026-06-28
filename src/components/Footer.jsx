import React from 'react';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';
import './Footer.css';

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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
              <a href="https://www.facebook.com/gyanvaniai/" target="_blank" rel="noopener noreferrer" className="social-icon"><FacebookIcon size={20} /></a>
              <a href="https://www.linkedin.com/company/gyan-vaniai" target="_blank" rel="noopener noreferrer" className="social-icon"><LinkedinIcon size={20} /></a>
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
