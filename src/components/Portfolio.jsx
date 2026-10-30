import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { renderLucideIcon } from '../utils/iconMap';
import './Portfolio.css';

const DEFAULT_METRICS = [
  {
    value: '40%',
    label: 'Faster Lead Response',
    desc: 'From hours to under 30 seconds across WhatsApp and web channels.',
    icon: 'Clock'
  },
  {
    value: '3x',
    label: 'More Qualified Pipeline',
    desc: 'Autonomous AI intent scoring and real-time enrichment.',
    icon: 'TrendingUp'
  },
  {
    value: '60%',
    label: 'Less Manual Data Entry',
    desc: 'Automated CRM status sync, transcript parsing, and task logging.',
    icon: 'Zap'
  },
  {
    value: '99.9%',
    label: 'Platform SLA Uptime',
    desc: 'Enterprise cloud architecture with sub-100ms API response times.',
    icon: 'ShieldCheck'
  }
];

const DEFAULT_CASE_STUDIES = [
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
    to: '/services/crm-development'
  },
  {
    title: 'Multi-Warehouse Supply Chain ERP',
    industry: 'Manufacturing',
    challenge: 'Inefficient multi-branch inventory tracking leading to stockouts and dispatch delays.',
    solution: 'Cloud ERP with live telemetry analytics and predictive restocking triggers.',
    outcome: 'Eliminated stockouts and reduced warehouse carrying costs by 25%.',
    to: '/services/crm-development'
  }
];

export default function Portfolio({
  title: customTitle,
  subtitle: customSubtitle,
  metrics: dynamicMetrics,
  caseStudies: dynamicCaseStudies,
}) {
  const title = customTitle || 'Measurable revenue results in production';
  const subtitle = customSubtitle || 'Production systems engineered by our team, driving real operational efficiency and pipeline growth.';
  const metrics = dynamicMetrics && dynamicMetrics.length > 0 ? dynamicMetrics : DEFAULT_METRICS;
  const caseStudies = dynamicCaseStudies && dynamicCaseStudies.length > 0 ? dynamicCaseStudies : DEFAULT_CASE_STUDIES;

  return (
    <section className="section bg-tinted" id="results">
      <div className="container">
        <div className="section-header section-header--center">
          <h2 className="h2">{title}</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            {subtitle}
          </p>
        </div>

        {/* 4 Metric Stats Grid */}
        <div className="results-metrics-grid">
          {metrics.map((m, idx) => (
            <div key={m.label || idx} className="result-metric-card">
              <div className="result-metric-top">
                <span className="result-metric-value">{m.value}</span>
                <div className="result-metric-icon">
                  {renderLucideIcon(m.icon, { size: 20 }) || <Clock size={20} />}
                </div>
              </div>
              <h3 className="result-metric-label">{m.label}</h3>
              <p className="result-metric-desc">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Case Study Cards Grid */}
        <div className="portfolio-showcase-grid" style={{ marginTop: '2.5rem' }}>
          {caseStudies.map((project, index) => (
            <div className="premium-card portfolio-item-card" key={project.title || index}>
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

              <a href={project.to || '/services/crm-development'} className="portfolio-link-action">
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
