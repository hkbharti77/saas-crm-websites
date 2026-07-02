import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';
import { trackWhatsAppClick, trackEmailClick, trackNewsletterSubscribe } from '../utils/analytics';
import './Footer.css';

const FacebookIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsappIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
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
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("_subject", "New Newsletter Subscription!");
    
    try {
      const response = await fetch("https://formspree.io/f/mzdqyerw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        trackNewsletterSubscribe();
      } else {
        alert("Oops! There was a problem subscribing.");
      }
    } catch (error) {
      alert("Oops! There was a problem subscribing.");
    }
    setIsSubmitting(false);
  };

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
              <a
                href="https://wa.me/917000000000"
                id="link-footer-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                onClick={() => trackWhatsAppClick('footer')}
              >
                <WhatsappIcon size={20} />
              </a>
              <a href="#" className="social-icon"><MapPin size={20} /></a>
              <a
                href="mailto:contact@gyanvaniai.online"
                id="link-footer-email"
                className="social-icon"
                onClick={() => trackEmailClick('footer')}
              >
                <Mail size={20} />
              </a>
              <a href="https://www.facebook.com/gyanvaniai/" target="_blank" rel="noopener noreferrer" className="social-icon"><FacebookIcon size={20} /></a>
              <a href="https://www.linkedin.com/company/gyan-vaniai" target="_blank" rel="noopener noreferrer" className="social-icon"><LinkedinIcon size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-title">Services</h4>
              <Link to="/services/crm-development" className="footer-link" onClick={() => window.scrollTo(0,0)}>CRM Development</Link>
              <Link to="/services/ai-chatbots" className="footer-link" onClick={() => window.scrollTo(0,0)}>AI Chatbots</Link>
              <Link to="/services/whatsapp-automation" className="footer-link" onClick={() => window.scrollTo(0,0)}>WhatsApp Automation</Link>
            </div>
            <div className="link-group">
              <h4 className="link-title">Company</h4>
              <Link to="/blog" className="footer-link">Blog</Link>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms & Conditions</a>
              <a href="/#contact" className="footer-link">Contact</a>
            </div>
          </div>
          
          <div className="footer-cta">
            <h4 className="link-title">Ready to scale?</h4>
            {isSuccess ? (
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input-field" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                  <ArrowRight size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="text-sm text-muted">© 2026 Gyan VaniAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
