import React from 'react';
import { ArrowRight, MessageCircle, Bot, Users, Mic } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Hero.css';

const featurePills = [
  { icon: <MessageCircle size={14} />, label: 'WhatsApp Automation' },
  { icon: <Bot size={14} />, label: 'AI Chatbot' },
  { icon: <Users size={14} />, label: 'Lead Management' },
  { icon: <Mic size={14} />, label: 'Voice AI' },
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
          <div className="hero-badge">🤖 AI CRM for Businesses</div>
          <h1 className="h1 hero-title">
            Automate Sales with{' '}
            <span className="gradient-text-premium">AI-Powered CRM</span>{' '}
            &amp; WhatsApp
          </h1>
          <p className="hero-subtitle text-lg text-muted">
            Automate your entire customer journey — from WhatsApp lead capture to AI-driven follow-ups, voice bots, and intelligent CRM workflows. Trusted by 500+ businesses worldwide.
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
              Book Free Demo <ArrowRight size={20} />
            </button>
          </div>
          <div className="hero-trust">
            <p className="text-sm text-muted">
              ✅ No credit card required &nbsp;·&nbsp; ✅ 500+ businesses served
            </p>
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
              <img src="/hero_dashboard.webp" alt="AI CRM Dashboard – WhatsApp Automation & Lead Management" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
