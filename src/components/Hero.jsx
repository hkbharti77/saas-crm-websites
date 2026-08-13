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
          <p className="hero-brand">Gyan VaniAi</p>
          <h1 className="hero-title">
            Software that runs the business — not the other way around
          </h1>
          <p className="hero-subtitle">
            AI agents, CRM, HRMS, and enterprise systems built for operators who need clarity, automation, and measurable growth.
          </p>
          <div className="hero-actions">
            <button
              id="btn-book-demo"
              className="btn btn-primary"
              onClick={() => handleBookDemo('hero')}
            >
              Book a consultation <ArrowRight size={18} />
            </button>
            <a href="#portfolio" className="btn btn-outline hero-btn-secondary">
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
