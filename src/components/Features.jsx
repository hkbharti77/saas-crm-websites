import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Bot, GitMerge, Smartphone, Layout, ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Features.css';

const services = [
  {
    icon: <Bot size={22} strokeWidth={1.75} />,
    title: 'AI Solutions',
    description: 'Chatbots, voice agents, sales agents, support flows, and workflow automation that fit how your teams already work.',
    to: '/services/ai-development',
  },
  {
    icon: <Users size={22} strokeWidth={1.75} />,
    title: 'CRM Development',
    description: 'Sales, healthcare, education, and manufacturing CRMs — shaped around your pipeline, not a generic template.',
    to: '/services/crm-development',
  },
  {
    icon: <GitMerge size={22} strokeWidth={1.75} />,
    title: 'HRMS',
    description: 'Employee records, payroll, attendance, leave, and recruitment in one operational system.',
    to: '/services/hrms-development',
  },
  {
    icon: <Database size={22} strokeWidth={1.75} />,
    title: 'ERP Solutions',
    description: 'Inventory, finance, procurement, operations, and asset management connected end to end.',
    to: '/services/erp-development',
  },
  {
    icon: <Layout size={22} strokeWidth={1.75} />,
    title: 'Website Development',
    description: 'Corporate sites, ecommerce, and landing pages built for performance, SEO, and conversion.',
    to: '/services/web-development',
  },
  {
    icon: <Smartphone size={22} strokeWidth={1.75} />,
    title: 'Mobile App Development',
    description: 'Android, iOS, Flutter, and React Native apps designed for daily use — not demo day.',
    to: '/services/mobile-app-development',
  },
];

export default function Features({ onBookDemo }) {
  return (
    <section className="section bg-alt" id="features">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">What we build</span>
          <h2 className="h2">Systems for modern operations</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            From startups to enterprises — software that automates work, tightens workflows, and gives leadership a clear picture.
          </p>
        </div>

        <div className="features-grid">
          {services.map((service) => (
            <Link to={service.to} className="feature-card-link" key={service.title}>
              <article className="feature-card">
                <div className="feature-icon">{service.icon}</div>
                <h3 className="h3 feature-title">{service.title}</h3>
                <p className="text-muted feature-desc">{service.description}</p>
              </article>
            </Link>
          ))}
        </div>

        <div className="features-cta">
          <p className="text-muted">Want to walk through a fit for your team?</p>
          <button
            id="btn-features-book-demo"
            className="btn btn-primary"
            onClick={() => {
              trackBookDemo('features');
              onBookDemo && onBookDemo();
            }}
          >
            Book a free demo <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
