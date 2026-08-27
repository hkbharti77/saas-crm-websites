import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, PhoneCall, Mail, MessageCircle, Database, Smartphone, Sparkles, ArrowRight, CheckCircle2, Bot, Zap } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './OmnichannelSection.css';

const channels = [
  {
    icon: <MessageSquare size={24} />,
    title: 'WhatsApp Business',
    highlight: 'Coexistence Mode',
    desc: 'Keep your mobile app active while deploying AI auto-replies and shared team inboxes on the same number.',
    to: '/services/whatsapp-coexistence'
  },
  {
    icon: <PhoneCall size={24} />,
    title: 'AI Voice Agents',
    highlight: 'Sub-300ms Latency',
    desc: 'Human-like conversational phone bots that handle inbound support and outbound qualification calls.',
    to: '/services/voice-bot-assistant'
  },
  {
    icon: <Mail size={24} />,
    title: 'Email & Sequences',
    highlight: 'Context-Aware',
    desc: 'Personalized outreach, smart follow-up triggers, and instant reply parsing directly into CRM stages.',
    to: '/services/crm-development'
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Website Live Chat',
    highlight: 'RAG Grounded',
    desc: 'Instant answers from your verified knowledge base with smooth human escalation when needed.',
    to: '/services/ai-chatbots'
  },
  {
    icon: <Smartphone size={24} />,
    title: 'SMS & WhatsApp Calling',
    highlight: 'Global Reach',
    desc: 'Direct voice calls over WhatsApp and broadcast SMS templates with full delivery tracking.',
    to: '/services/whatsapp-calling-agent'
  },
  {
    icon: <Database size={24} />,
    title: 'Unified CRM Context',
    highlight: 'Single Timeline',
    desc: 'Every call audio transcript, WhatsApp message, and email thread synced to the customer record in real time.',
    to: '/services/crm-development'
  },
];

export default function OmnichannelSection({ onBookDemo }) {
  return (
    <section className="section bg-tinted" id="omnichannel">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Omnichannel Intelligence</span>
          <h2 className="h2">One AI agent. Every customer conversation.</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Unify your communication channels into an autonomous revenue engine with continuous CRM memory.
          </p>
        </div>

        {/* Central Hub Architecture Visual */}
        <div className="omnichannel-hub-layout">
          {/* Central AI Engine Badge Bar */}
          <div className="omnichannel-central-core">
            <div className="omnichannel-core-badge">
              <Bot size={20} className="core-icon-bot" />
              <span>Gyan VaniAi Central Intelligence Engine</span>
              <span className="core-live-tag">
                <Zap size={13} />
                <span>Live Sync</span>
              </span>
            </div>
            <p className="omnichannel-core-sub">
              6 Channels · 1 Unified Timeline · Shared Memory & Zero Hallucination
            </p>
          </div>

          <div className="omnichannel-cards-grid">
            {channels.map((ch) => (
              <div key={ch.title} className="omnichannel-card">
                <div className="omnichannel-card-header">
                  <div className="omnichannel-icon">{ch.icon}</div>
                  <span className="omnichannel-badge">{ch.highlight}</span>
                </div>
                <h3 className="omnichannel-title">{ch.title}</h3>
                <p className="omnichannel-desc">{ch.desc}</p>
                <Link to={ch.to} className="omnichannel-link">
                  <span>Explore Channel</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          <div className="omnichannel-bottom-bar">
            <div className="omnichannel-features-list">
              <div className="omnichannel-feature-item">
                <CheckCircle2 size={18} className="feature-check" />
                <span>Zero message loss or chat wipes</span>
              </div>
              <div className="omnichannel-feature-item">
                <CheckCircle2 size={18} className="feature-check" />
                <span>Real-time sentiment scoring</span>
              </div>
              <div className="omnichannel-feature-item">
                <CheckCircle2 size={18} className="feature-check" />
                <span>Sub-300ms conversational latency</span>
              </div>
            </div>

            <button
              id="btn-omnichannel-demo"
              type="button"
              className="btn btn-primary"
              onClick={() => {
                trackBookDemo('omnichannel');
                onBookDemo && onBookDemo();
              }}
            >
              <span>See Live Omnichannel Demo</span>
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
