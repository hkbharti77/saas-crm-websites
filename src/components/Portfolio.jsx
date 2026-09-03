import React from 'react';
import { ArrowUpRight, TrendingUp, Clock, Zap, ShieldCheck } from 'lucide-react';
import './Portfolio.css';

const metrics = [
  {
    value: '40%',
    label: 'Faster Lead Response',
    desc: 'From hours to under 30 seconds across WhatsApp and web channels.',
    icon: <Clock size={20} />
  },
  {
    value: '3x',
    label: 'More Qualified Pipeline',
    desc: 'Autonomous AI intent scoring and real-time enrichment.',
    icon: <TrendingUp size={20} />
  },
  {
    value: '60%',
    label: 'Less Manual Data Entry',
    desc: 'Automated CRM status sync, transcript parsing, and task logging.',
    icon: <Zap size={20} />
  },
  {
    value: '99.9%',
    label: 'Platform SLA Uptime',
    desc: 'Enterprise cloud architecture with sub-100ms API response times.',
    icon: <ShieldCheck size={20} />
  }
];

const caseStudies = [
  {
    title: 'Hospital Patient Intake CRM',
    industry: 'Healthcare',
    challenge: 'Manual appointment scheduling and fragmented records across 4 clinic branches.',
    solution: 'Custom CRM with automated queue intake, electronic records, and WhatsApp patient follow-ups.',
    outcome: '65% faster check-in flow and 40% reduction in patient appointment drop-offs.',
    to: '/services/crm-development'
  },
  {
    title: 'EdTech 24/7 AI Learning Portal',
    industry: 'Education',
    challenge: 'Inconsistent student engagement and lack of centralized progress tracking.',
    solution: 'Custom LMS with an autonomous RAG-powered AI tutor for instant doubt resolution.',
    outcome: 'Increased student retention by 60% and automated 80% of routine mentor queries.',
    to: '/services/ai-development'
  },
  {
    title: 'Multi-Warehouse Supply Chain ERP',
    industry: 'Manufacturing',
    challenge: 'Inefficient multi-branch inventory tracking leading to stockouts and dispatch delays.',
    solution: 'Cloud ERP with live telemetry analytics and predictive restocking triggers.',
    outcome: 'Eliminated stockouts and reduced warehouse carrying costs by 25%.',
    to: '/services/erp-development'
  }
];

export default function Portfolio() {
  return (
    <section className="section bg-tinted" id="results">
      <div className="container">
        <div className="section-header section-header--center">
<h2 className="h2">Measurable revenue results in production</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Production systems engineered by our team, driving real operational efficiency and pipeline growth.
          </p>
        </div>

        {/* 4 Metric Stats Grid */}
        <div className="results-metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="result-metric-card">
              <div className="result-metric-top">
                <span className="result-metric-value">{m.value}</span>
                <div className="result-metric-icon">{m.icon}</div>
              </div>
              <h3 className="result-metric-label">{m.label}</h3>
              <p className="result-metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Case Study Cards Grid */}
        <div className="portfolio-showcase-grid" style={{ marginTop: '2.5rem' }}>
          {caseStudies.map((project, index) => (
            <div className="premium-card portfolio-item-card" key={index}>
              <div className="portfolio-badge-row">
                <span className="portfolio-industry-tag">
                  {project.industry}
                </span>
              </div>

              <h3 className="h3 portfolio-project-title">{project.title}</h3>

              <div className="portfolio-block">
                <strong className="portfolio-label">Challenge</strong>
                <p className="portfolio-desc">{project.challenge}</p>
              </div>

              <div className="portfolio-block">
                <strong className="portfolio-label">Solution</strong>
                <p className="portfolio-desc">{project.solution}</p>
              </div>

              <div className="portfolio-outcome-box">
                <strong className="portfolio-outcome-label">Verified Impact:</strong>
                <p className="portfolio-outcome-text">{project.outcome}</p>
              </div>

              <a href={project.to} className="portfolio-link-action">
                <span>Explore Architecture</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
