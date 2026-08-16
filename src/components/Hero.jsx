import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
              id="btn-book-demo"
              className="btn btn-primary hero-btn-primary"
              onClick={() => handleBookDemo('hero')}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={18} />
            </button>
            <a href="#portfolio" className="btn btn-outline hero-btn-secondary">
              <span>See Our Work</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>

          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Sub-300ms AI Latency</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-dot"></span>
              <span>Official WhatsApp Cloud API</span>
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
