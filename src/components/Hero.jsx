import React from 'react';
import { ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Hero.css';

export default function Hero({ onBookDemo }) {
  const handleBookDemo = (source) => {
    trackBookDemo(source);
    onBookDemo();
  };

  return (
    <section className="hero">
      <div className="hero-media">
        <img
          src="/hero_dashboard.webp"
          alt="Gyan VaniAi enterprise CRM and AI operations dashboard"
          width="1280"
          height="720"
          fetchPriority="high"
          decoding="sync"
          className="hero-media-img"
        />
        <div className="hero-media-veil"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>AI-POWERED REVENUE PLATFORM</span>
          </div>

          <h1 className="hero-title">
            Autonomous AI CRM for <span className="text-gradient">high-velocity revenue teams</span>
          </h1>

          <p className="hero-subtitle">
            Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows.
          </p>

          <div className="hero-actions">
            <button
              id="btn-hero-book-demo"
              type="button"
              className="btn btn-primary hero-btn-primary"
              onClick={() => handleBookDemo('hero-primary')}
            >
              <span>Book a Demo</span>
              <ArrowRight size={18} />
            </button>
            <a
              id="btn-hero-explore"
              href="#capabilities"
              className="btn btn-outline hero-btn-secondary"
            >
              <span>Explore Platform</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-trust-bar">
            <div
              className="trust-item"
              onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
              title="Click to view 7-Day Demo Terms"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && window.dispatchEvent(new CustomEvent('open-live-demo'))}
            >
              <span className="trust-dot"></span>
              <span><strong>Live Demo:</strong> 7-Day Sandbox</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Official WhatsApp Cloud API</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Enterprise SOC2 Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
