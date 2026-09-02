import React from 'react';
import { Link } from 'react-router-dom';
import { Database, UserCheck, Activity, Bot, MessageSquare, Workflow, Target, BarChart3, ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import Card3DTilt from './ui/Card3DTilt';
import './Features.css';

const capabilities = [
  {
    icon: <Database size={22} strokeWidth={1.75} />,
    title: 'AI Lead Enrichment',
    description: 'Auto-enrich prospect profiles with verified business intelligence, company size, and technographics.',
    to: '/services/crm-development',
    tag: 'Intelligence'
  },
  {
    icon: <UserCheck size={22} strokeWidth={1.75} />,
    title: 'Intelligent Lead Assignment',
    description: 'Route high-value leads to the best-suited reps instantly using dynamic skill-based matching.',
    to: '/services/crm-development',
    tag: 'Routing'
  },
  {
    icon: <Activity size={22} strokeWidth={1.75} />,
    title: 'AI Intent Scoring',
    description: 'Analyze buyer sentiment and engagement signals in real-time to rank conversion readiness.',
    to: '/services/ai-development',
    tag: 'Scoring'
  },
  {
    icon: <Bot size={22} strokeWidth={1.75} />,
    title: 'RAG-Based AI Assistant',
    description: 'Query company knowledge, sales playbooks, and docs with zero hallucination and tenant isolation.',
    to: '/services/ai-chatbots',
    tag: 'RAG Knowledge'
  },
  {
    icon: <MessageSquare size={22} strokeWidth={1.75} />,
    title: 'Omnichannel Communication',
    description: 'Engage prospects seamlessly across WhatsApp, voice calls, email, and web chat from a unified inbox.',
    to: '/services/whatsapp-automation',
    tag: 'Omnichannel'
  },
  {
    icon: <Workflow size={22} strokeWidth={1.75} />,
    title: 'Sales Automation',
    description: 'Automate multi-step drip campaigns, task reminders, and deal pipeline status updates.',
    to: '/services/crm-development',
    tag: 'Automation'
  },
  {
    icon: <Target size={22} strokeWidth={1.75} />,
    title: 'Lead Qualification',
    description: 'Autonomous AI agents qualify inbound traffic 24/7 before booking meetings on rep calendars.',
    to: '/services/ai-agent-development',
    tag: '24/7 Agents'
  },
  {
    icon: <BarChart3 size={22} strokeWidth={1.75} />,
    title: 'Revenue Analytics',
    description: 'Gain real-time visibility into conversion velocity, rep performance, and pipeline revenue forecasts.',
    to: '/services/crm-development',
    tag: 'Analytics'
  },
];

export default function Features({ onBookDemo }) {
  return (
    <section className="section bg-alt" id="capabilities">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Core Platform</span>
          <h2 className="h2">Everything your revenue team needs, powered by AI</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Autonomous intelligence across the entire sales cycle, from first contact to deal closure.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item) => (
            <Link to={item.to} className="feature-card-link" key={item.title}>
              <Card3DTilt className="feature-card-3d-wrap" maxRotation={10} scale={1.03}>
                <article className="feature-card capability-card">
                  <div className="capability-top elevate-3d-sm">
                    <div className="feature-icon">{item.icon}</div>
                    <span className="capability-tag">{item.tag}</span>
                  </div>
                  <h3 className="h3 feature-title elevate-3d-sm">{item.title}</h3>
                  <p className="text-muted feature-desc">{item.description}</p>
                  <div className="capability-action elevate-3d-sm">
                    <span>Learn more</span>
                    <ArrowRight size={15} />
                  </div>
                </article>
              </Card3DTilt>
            </Link>
          ))}
        </div>

        <div className="features-cta">
          <p className="text-muted">Need a custom AI pipeline shaped for your sales org?</p>
          <button
            id="btn-capabilities-book-demo"
            className="btn btn-primary"
            onClick={() => {
              trackBookDemo('capabilities');
              onBookDemo && onBookDemo();
            }}
          >
            <span>Book a Demo</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
