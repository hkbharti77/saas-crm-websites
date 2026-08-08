import React from 'react';
import { ArrowRight, MessageCircle, Bot, Users, Mic } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Hero.css';

const featurePills = [
  { icon: <Bot size={14} />, label: 'AI Agents' },
  { icon: <Users size={14} />, label: 'CRM & HRMS' },
  { icon: <MessageCircle size={14} />, label: 'Web & Mobile' },
  { icon: <Mic size={14} />, label: 'Enterprise Software' },
];

export default function Hero({ onBookDemo }) {
  const handleBookDemo = (source) => {
    trackBookDemo(source);
    onBookDemo();
  };

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">🚀 Enterprise Software Solutions</div>
          <h1 className="h1 hero-title">
            Build AI-Powered Software That{' '}
            <span className="gradient-text-premium">Grows Your Business</span>
          </h1>
          <p className="hero-subtitle text-lg text-muted">
            We design and develop AI Agents, CRM, HRMS, ERP, Business Websites, Mobile Apps, and Enterprise Software that automate operations, increase productivity, and generate more revenue.
          </p>

          <div className="hero-feature-pills">
            {featurePills.map((pill) => (
              <span key={pill.label} className="hero-pill">
                {pill.icon} {pill.label}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <button
              id="btn-book-demo"
              className="btn btn-primary"
              onClick={() => handleBookDemo('hero')}
            >
              Book Free Consultation <ArrowRight size={20} />
            </button>
            <a href="#portfolio" className="btn btn-outline">
              View Our Portfolio
            </a>
          </div>
          <div className="hero-trust">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
              <span>✓ Enterprise-Grade Experience</span>
              <span>✓ AI-First Development</span>
              <span>✓ End-to-End Software Solutions</span>
              <span>✓ Global Standards</span>
              <span>✓ Dedicated Support</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-mockup">
            <div className="mockup-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="mockup-body" style={{ padding: 0, aspectRatio: '16/9' }}>
              <img 
                src="/hero_dashboard.webp" 
                alt="Gyan VaniAi CRM and AI Agent dashboard interface" 
                width="1280"
                height="720"
                fetchPriority="high"
                decoding="sync"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
