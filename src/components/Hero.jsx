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
            <span>Next-Gen AI & CRM Coexistence Suite</span>
          </div>

          <h1 className="hero-title">
            Software that runs the business — <span className="text-gradient">not the other way around</span>
          </h1>

          <p className="hero-subtitle">
            Autonomous AI agents, WhatsApp Coexistence, CRM, HRMS, and enterprise automation built for operators who demand clarity, speed, and measurable revenue growth.
          </p>

          <div className="hero-actions">
            <button
              id="btn-try-live-demo"
              className="btn btn-primary hero-btn-primary"
              onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)' }}
            >
              <span>Try Live Demo</span>
              <ArrowRight size={18} />
            </button>
            <button
              id="btn-book-demo"
              className="btn btn-outline hero-btn-secondary"
              onClick={() => handleBookDemo('hero')}
            >
              <span>Book Consultation</span>
            </button>
          </div>

          <div className="hero-trust-bar">
            <div className="trust-item" onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))} style={{ cursor: 'pointer' }} title="Click to view 7-Day Demo Terms">
              <span className="trust-dot" style={{ background: '#6366f1' }}></span>
              <span><strong>Live Demo:</strong> connect.gyanvaniai.online (7-Day Purge Policy)</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Official WhatsApp API</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Enterprise SOC2 / PII Masking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
