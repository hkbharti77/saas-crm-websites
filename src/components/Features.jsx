import React from 'react';
import { Link } from 'react-router-dom';
import { Database, UserCheck, Activity, Bot, MessageSquare, Workflow, Target, BarChart3, ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import Card3DTilt from './ui/Card3DTilt';
import { renderLucideIcon } from '../utils/iconMap';
import './Features.css';

const DEFAULT_CAPABILITIES = [
  {
    icon: 'Database',
    title: 'AI Lead Enrichment',
    description: 'Auto-enrich prospect profiles with verified business intelligence, company size, and technographics.',
    to: '/services/crm-development',
    tag: 'Intelligence'
  },
  {
    icon: 'UserCheck',
    title: 'Intelligent Lead Assignment',
    description: 'Route high-value leads to the best-suited reps instantly using dynamic skill-based matching.',
    to: '/services/crm-development',
    tag: 'Routing'
  },
  {
    icon: 'Activity',
    title: 'AI Intent Scoring',
    description: 'Analyze buyer sentiment and engagement signals in real-time to rank conversion readiness.',
    to: '/services/ai-agent-development',
    tag: 'Scoring'
  },
  {
    icon: 'Bot',
    title: 'RAG-Based AI Assistant',
    description: 'Query company knowledge, sales playbooks, and docs with verified facts and tenant isolation.',
    to: '/services/ai-chatbots',
    tag: 'RAG Knowledge'
  },
  {
    icon: 'MessageSquare',
    title: 'Omnichannel Communication',
    description: 'Engage prospects seamlessly across WhatsApp, voice calls, email, and web chat from a unified inbox.',
    to: '/services/whatsapp-coexistence',
    tag: 'Omnichannel'
  },
  {
    icon: 'Workflow',
    title: 'Sales Automation',
    description: 'Automate multi-step drip campaigns, task reminders, and deal pipeline status updates.',
    to: '/services/sales-automation',
    tag: 'Automation'
  },
  {
    icon: 'Target',
    title: 'Lead Qualification',
    description: 'Autonomous AI agents qualify inbound traffic 24/7 before booking meetings on rep calendars.',
    to: '/services/ai-agent-development',
    tag: '24/7 Agents'
  },
  {
    icon: 'BarChart3',
    title: 'Revenue Analytics',
    description: 'Gain real-time visibility into conversion velocity, rep performance, and pipeline revenue forecasts.',
    to: '/services/crm-development',
    tag: 'Analytics'
  },
];

export default function Features({
  onBookDemo,
  heading: customHeading,
  subtitle: customSubtitle,
  capabilities: dynamicCapabilities,
  bottomCta,
}) {
  const heading = customHeading || 'Everything your revenue team needs, powered by AI';
  const subtitle = customSubtitle || 'Autonomous intelligence across the entire sales cycle, from first contact to deal closure.';
  const capabilities = dynamicCapabilities && dynamicCapabilities.length > 0 ? dynamicCapabilities : DEFAULT_CAPABILITIES;

  return (
    <section className="section bg-alt" id="capabilities">
      <div className="container">
        <div className="section-header section-header--center">
          <h2 className="h2">{heading}</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            {subtitle}
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item, idx) => (
            <Link to={item.to || '/services/crm-development'} className="feature-card-link" key={item.title || idx}>
              <Card3DTilt className="feature-card-3d-wrap" maxRotation={10} scale={1.03}>
                <article className="feature-card capability-card">
                  <div className="capability-top elevate-3d-sm">
                    <div className="feature-icon">
                      {renderLucideIcon(item.icon, { size: 22, strokeWidth: 1.75 }) || <Database size={22} strokeWidth={1.75} />}
                    </div>
                    {item.tag && <span className="capability-tag">{item.tag}</span>}
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
          <p className="text-muted">{bottomCta?.text || 'Need a custom AI pipeline shaped for your sales org?'}</p>
          <button
            id="btn-capabilities-book-demo"
            className="btn btn-primary"
            onClick={() => {
              trackBookDemo('capabilities');
              onBookDemo && onBookDemo();
            }}
          >
            <span>{bottomCta?.buttonText || 'Book a Demo'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
