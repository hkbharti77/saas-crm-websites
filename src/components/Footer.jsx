import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { trackEmailClick, trackNewsletterSubscribe } from '../utils/analytics';
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

const WhatsAppIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.888 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
    } catch {
      alert("Oops! There was a problem subscribing.");
    }
    setIsSubmitting(false);
  };

  return (
    <footer className="footer" id="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <img src="/logo.webp" alt="Gyan VaniAi Logo" width="40" height="40" className="logo-img" style={{ display: 'block' }} loading="lazy" />
              <span className="logo-text">Gyan VaniAi</span>
            </div>
            <p className="text-muted text-sm" style={{ maxWidth: '300px' }}>
              Autonomous AI CRM and revenue operations software engineered for high-velocity teams.
            </p>
            <div className="social-links">
              <a
                href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20connect%20regarding%20your%20AI%20CRM%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                id="link-footer-whatsapp"
                className="social-icon"
                aria-label="Chat with us on WhatsApp"
              >
                <WhatsAppIcon size={20} color="currentColor" />
              </a>
              <a
                href="mailto:contact@gyanvaniai.online"
                id="link-footer-email"
                className="social-icon"
                onClick={() => trackEmailClick('footer')}
                aria-label="Email Us"
              >
                <Mail size={20} />
              </a>
              <a href="https://www.facebook.com/gyanvaniai/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Visit our Facebook page"><FacebookIcon size={20} /></a>
              <a href="https://www.linkedin.com/company/gyan-vaniai" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Visit our LinkedIn page"><LinkedinIcon size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h3 className="link-title">Product</h3>
              <a href="/#capabilities" className="footer-link">Platform</a>
              <Link to="/services/ai-agent-development" className="footer-link">AI Agents</Link>
              <Link to="/services/lead-management" className="footer-link">Lead Management</Link>
              <Link to="/services/whatsapp-coexistence" className="footer-link">WhatsApp Coexistence</Link>
              <Link to="/services/voice-bot-assistant" className="footer-link">Voice AI</Link>
              <button
                type="button"
                className="footer-link footer-demo-link"
                onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
              >
                Live CRM Demo (7-Day Trial)
              </button>
            </div>
            <div className="link-group">
              <h3 className="link-title">Solutions</h3>
              <Link to="/services/sales-automation" className="footer-link">Sales Automation</Link>
              <Link to="/services/ai-chatbots" className="footer-link">Inbound Qualification</Link>
              <Link to="/industries/enterprise" className="footer-link">Enterprise CRM</Link>
              <Link to="/industries/real-estate" className="footer-link">Real Estate</Link>
              <Link to="/industries/healthcare" className="footer-link">Healthcare</Link>
              <Link to="/industries/retail" className="footer-link">E-commerce & Retail</Link>
            </div>
            <div className="link-group">
              <h3 className="link-title">Company</h3>
              <Link to="/about" className="footer-link">About Us</Link>
              <a href="/#contact" className="footer-link">Contact</a>
              <Link to="/security" className="footer-link">Security</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-link">Terms & Conditions</Link>
            </div>
            <div className="link-group">
              <h3 className="link-title">Resources</h3>
              <Link to="/blog" className="footer-link">Blog & Insights</Link>
              <Link to="/documentation" className="footer-link">Documentation</Link>
              <a href="/#how-it-works" className="footer-link">How It Works</a>
              <a href="/#results" className="footer-link">Case Studies</a>
              <a href="mailto:contact@gyanvaniai.online" className="footer-link">Support</a>
            </div>
          </div>

          <div className="footer-cta">
            <h3 className="link-title">Stay updated</h3>
            {isSuccess ? (
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter work email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-label="Email for newsletter subscription"
                />
                <button type="submit" className="btn btn-primary btn-subscribe" disabled={isSubmitting} aria-label="Subscribe to newsletter">
                  <span>{isSubmitting ? '...' : 'Subscribe'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-sm text-muted">
            © 2026 Gyan VaniAi. All rights reserved. · <Link to="/privacy" className="link-inline">Privacy</Link> · <Link to="/terms" className="link-inline">Terms</Link> · <a href="/#security" className="link-inline">Security</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
