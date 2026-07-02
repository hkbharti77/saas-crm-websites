import React from 'react';
import { ArrowRight, TrendingUp, Clock, MessageCircle, Users, BarChart2 } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Testimonials.css';

const results = [
  {
    icon: <Clock size={28} />,
    metric: 'Hours → Seconds',
    label: 'Lead Response Time',
    detail: 'AI instantly qualifies and responds to new leads on WhatsApp — no human delay.',
    color: '#3b82f6',
  },
  {
    icon: <MessageCircle size={28} />,
    metric: '80%',
    label: 'Support Queries Automated',
    detail: 'Our WhatsApp bots handle tier-1 queries so your team focuses on closing deals.',
    color: '#22c55e',
  },
  {
    icon: <TrendingUp size={28} />,
    metric: '3x',
    label: 'Average ROI',
    detail: 'Clients typically recover their investment within the first 60 days.',
    color: '#8b5cf6',
  },
  {
    icon: <BarChart2 size={28} />,
    metric: '40%+',
    label: 'Conversion Lift',
    detail: 'Automated follow-ups and AI lead scoring convert more pipeline into revenue.',
    color: '#f59e0b',
  },
  {
    icon: <Users size={28} />,
    metric: '500+',
    label: 'Businesses Served',
    detail: 'From lean startups to large enterprises across India, USA, and beyond.',
    color: '#06b6d4',
  },
];

const socialProofStats = [
  { value: '500+', label: 'Businesses Served' },
  { value: '10M+', label: 'AI Conversations' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '3x', label: 'Average ROI' },
];

export default function Testimonials({ onBookDemo }) {
  return (
    <section className="section bg-alt testimonials" id="results">
      <div className="container">

        {/* Social Proof Stats Bar */}
        <div className="testimonials-stats">
          {socialProofStats.map((stat) => (
            <div className="testimonials-stat" key={stat.label}>
              <span className="testimonials-stat-value">{stat.value}</span>
              <span className="testimonials-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="h2">Results You Can Expect</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '580px', margin: '1rem auto 0' }}>
            Here's what our AI CRM and automation systems consistently deliver for businesses like yours.
          </p>
        </div>

        {/* Results Grid */}
        <div className="results-grid">
          {results.map((item) => (
            <div className="result-card" key={item.label}>
              <div className="result-icon" style={{ color: item.color, background: `${item.color}18` }}>
                {item.icon}
              </div>
              <div className="result-metric" style={{ color: item.color }}>{item.metric}</div>
              <h3 className="result-label">{item.label}</h3>
              <p className="result-detail text-muted">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* ── Option 2: Design Partner / Early Access CTA ── */}
        <div className="early-access-card">
          <div className="early-access-badge">🚀 Limited Spots</div>
          <h3 className="h3" style={{ marginBottom: '0.75rem' }}>
            Be One of Our First 10 Design Partners
          </h3>
          <p className="text-muted" style={{ maxWidth: '520px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
            We're onboarding a select group of early clients at a <strong>special founding rate</strong>.
            You get a fully custom AI CRM setup, priority support, and direct input into our roadmap.
          </p>
          <div className="early-access-actions">
            <button
              id="btn-early-access-demo"
              className="btn btn-primary"
              onClick={() => { trackBookDemo('early-access'); onBookDemo && onBookDemo(); }}
            >
              Claim Your Spot <ArrowRight size={18} />
            </button>
          </div>
          <p className="text-sm text-muted" style={{ marginTop: '1.25rem' }}>
            No credit card · Cancel anytime
          </p>
        </div>

      </div>
    </section>
  );
}
