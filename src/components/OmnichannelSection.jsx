import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  Database, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Zap,
  Layers,
  Activity
} from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import OrbitingCircles from './ui/OrbitingCircles';
import Card3DTilt from './ui/Card3DTilt';
import './OmnichannelSection.css';

const channels = [
  {
    id: 'whatsapp',
    icon: <MessageSquare size={24} />,
    title: 'WhatsApp Business',
    highlight: 'Coexistence Mode',
    desc: 'Keep your mobile app active while deploying AI auto-replies and shared team inboxes on the same number.',
    to: '/services/whatsapp-coexistence',
    stat: '< 3s Latency'
  },
  {
    id: 'voice',
    icon: <PhoneCall size={24} />,
    title: 'AI Voice Agents',
    highlight: 'Sub-300ms Latency',
    desc: 'Human-like conversational phone bots that handle inbound support and outbound qualification calls.',
    to: '/services/voice-bot-assistant',
    stat: '99.4% ASR Accuracy'
  },
  {
    id: 'email',
    icon: <Mail size={24} />,
    title: 'Email & Sequences',
    highlight: 'Context-Aware',
    desc: 'Personalized outreach, smart follow-up triggers, and instant reply parsing directly into CRM stages.',
    to: '/services/crm-development',
    stat: 'Automated Drips'
  },
  {
    id: 'chat',
    icon: <MessageCircle size={24} />,
    title: 'Website Live Chat',
    highlight: 'RAG Grounded',
    desc: 'Instant answers from your verified knowledge base with smooth human escalation when needed.',
    to: '/services/ai-chatbots',
    stat: '0-Hallucination'
  },
  {
    id: 'sms',
    icon: <Smartphone size={24} />,
    title: 'SMS & WhatsApp Calling',
    highlight: 'Global Reach',
    desc: 'Direct voice calls over WhatsApp and broadcast SMS templates with full delivery tracking.',
    to: '/services/whatsapp-calling-agent',
    stat: 'Global Gateways'
  },
  {
    id: 'crm',
    icon: <Database size={24} />,
    title: 'Unified CRM Context',
    highlight: 'Single Timeline',
    desc: 'Every call audio transcript, WhatsApp message, and email thread synced to the customer record in real time.',
    to: '/services/crm-development',
    stat: 'Real-Time Sync'
  },
];

export default function OmnichannelSection({ onBookDemo }) {
  const [activeChannelId, setActiveChannelId] = useState('whatsapp');

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

        {/* 3D Orbiting Circles Planetary Architecture Visual */}
        <div className="omnichannel-orbit-stage" aria-label="Interactive 3D Omnichannel Architecture">
          <div className="orbit-ambient-glow"></div>

          {/* Central AI Brain Node */}
          <div className="orbit-center-node" onClick={() => setActiveChannelId('core')}>
            <div className="orbit-center-inner">
              <Bot size={34} className="orbit-core-icon" />
              <div className="orbit-core-pulse"></div>
            </div>
            <div className="orbit-center-label">
              <span className="orbit-center-tag">Central Engine</span>
              <strong>Gyan VaniAi Brain</strong>
            </div>
          </div>

          {/* Orbit 1: Inner Orbit (WhatsApp & Voice Agents) */}
          <OrbitingCircles radius={105} duration={24} delay={0} pathColor="rgba(20, 184, 166, 0.28)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'whatsapp' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('whatsapp')}
              title="Official WhatsApp Cloud API"
            >
              <MessageSquare size={17} color="#25D366" />
              <span>WhatsApp</span>
            </div>
          </OrbitingCircles>

          <OrbitingCircles radius={105} duration={24} delay={12} pathColor="rgba(20, 184, 166, 0.28)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'voice' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('voice')}
              title="AI Voice Agents (<300ms)"
            >
              <PhoneCall size={17} color="#06b6d4" />
              <span>Voice AI</span>
            </div>
          </OrbitingCircles>

          {/* Orbit 2: Middle Orbit (Email & Live Chat) - reverse direction */}
          <OrbitingCircles radius={165} duration={32} delay={0} reverse pathColor="rgba(14, 165, 233, 0.25)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'email' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('email')}
              title="Smart Email Sequences"
            >
              <Mail size={17} color="#f59e0b" />
              <span>Email AI</span>
            </div>
          </OrbitingCircles>

          <OrbitingCircles radius={165} duration={32} delay={16} reverse pathColor="rgba(14, 165, 233, 0.25)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('chat')}
              title="Grounded Web Chatbot"
            >
              <MessageCircle size={17} color="#8b5cf6" />
              <span>Web Chat</span>
            </div>
          </OrbitingCircles>

          {/* Orbit 3: Outer Orbit (SMS Calling & CRM Sync) */}
          <OrbitingCircles radius={225} duration={42} delay={5} pathColor="rgba(16, 185, 129, 0.2)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'sms' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('sms')}
              title="VoIP & Global SMS"
            >
              <Smartphone size={17} color="#10b981" />
              <span>SMS / VoIP</span>
            </div>
          </OrbitingCircles>

          <OrbitingCircles radius={225} duration={42} delay={26} pathColor="rgba(16, 185, 129, 0.2)">
            <div 
              className={`orbit-node-pill ${activeChannelId === 'crm' ? 'active' : ''}`}
              onClick={() => setActiveChannelId('crm')}
              title="Unified CRM Timeline Sync"
            >
              <Database size={17} color="#ec4899" />
              <span>CRM Sync</span>
            </div>
          </OrbitingCircles>
        </div>

        {/* Central Hub Architecture Visual & 3D Tilt Cards */}
        <div className="omnichannel-hub-layout">
          {/* Central AI Engine Badge Bar */}
          <div className="omnichannel-central-core">
            <div className="omnichannel-core-badge">
              <Bot size={20} className="core-icon-bot" />
              <span>Gyan VaniAi Central Intelligence Engine</span>
              <span className="core-live-tag">
                <Zap size={13} />
                <span>Live 3D Sync</span>
              </span>
            </div>
            <p className="omnichannel-core-sub">
              6 Channels · 1 Unified Timeline · Shared Memory & Zero Hallucination
            </p>
          </div>

          <div className="omnichannel-cards-grid">
            {channels.map((ch) => {
              const isSelected = activeChannelId === ch.id;
              return (
                <Card3DTilt
                  key={ch.title}
                  className={`omnichannel-card-tilt-wrap ${isSelected ? 'selected' : ''}`}
                  maxRotation={10}
                  scale={1.03}
                  onClick={() => setActiveChannelId(ch.id)}
                >
                  <div className="omnichannel-card">
                    <div className="omnichannel-card-header">
                      <div className="omnichannel-icon">{ch.icon}</div>
                      <div className="omnichannel-header-right">
                        <span className="omnichannel-stat-badge">{ch.stat}</span>
                        <span className="omnichannel-badge">{ch.highlight}</span>
                      </div>
                    </div>
                    <h3 className="omnichannel-title">{ch.title}</h3>
                    <p className="omnichannel-desc">{ch.desc}</p>
                    <Link to={ch.to} className="omnichannel-link">
                      <span>Explore Channel</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </Card3DTilt>
              );
            })}
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
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
