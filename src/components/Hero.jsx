import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import './Hero.css';

export default function Hero({ onBookDemo }) {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">New: WhatsApp Business API Integration</div>
          <h1 className="h1 hero-title">
            Enterprise AI Systems & <br />
            <span className="gradient-text-premium">Full-Stack</span> Development
          </h1>
          <p className="hero-subtitle text-lg text-muted">
            Specializing in multi-agent orchestration, high-performance RAG pipelines, and secure backend systems to transform your business data into automated workflows.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onBookDemo}>
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline" onClick={onBookDemo}>
              <PlayCircle size={20} /> Watch Demo
            </button>
          </div>
          <div className="hero-trust">
            <p className="text-sm text-muted">Trusted by 10,000+ businesses worldwide</p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-mockup">
            <div className="mockup-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="mockup-body" style={{ padding: 0 }}>
              <img src="/hero_dashboard.webp" alt="Enterprise AI Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
