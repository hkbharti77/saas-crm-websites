import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    title: 'Hospital CRM',
    industry: 'Healthcare',
    challenge: 'Manual appointment scheduling and fragmented patient records across branches.',
    solution: 'Built a custom CRM with automated queue management, electronic records, and WhatsApp patient follow-ups.',
    outcome: '65% faster check-in flow and 40% reduction in patient appointment drop-offs.',
    to: '/services/crm-development'
  },
  {
    title: 'EdTech Learning Portal',
    industry: 'Education',
    challenge: 'Inconsistent student engagement and lack of centralized progress tracking.',
    solution: 'Developed a custom LMS with an autonomous AI tutor bot for 24/7 student doubt resolution.',
    outcome: 'Increased student engagement by 60% and automated 80% of routine mentor queries.',
    to: '/services/ai-development'
  },
  {
    title: 'Supply Chain ERP',
    industry: 'Manufacturing',
    challenge: 'Inefficient multi-warehouse inventory tracking leading to frequent stockouts and delays.',
    solution: 'Deployed a cloud-based ERP with live telemetry analytics and predictive restocking triggers.',
    outcome: 'Eliminated stockouts and reduced warehouse carrying costs by 25%.',
    to: '/services/erp-development'
  }
];

export default function Portfolio() {
  return (
    <section className="section bg-alt" id="portfolio">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Enterprise Case Studies</span>
          <h2 className="h2">Work that held up in high-throughput production</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Production systems engineered by our team — solving mission-critical operational bottlenecks.
          </p>
        </div>

        <div className="portfolio-showcase-grid">
          {projects.map((project, index) => (
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
                <strong className="portfolio-outcome-label">Key Metric Impact:</strong>
                <p className="portfolio-outcome-text">{project.outcome}</p>
              </div>

              <a href={project.to} className="portfolio-link-action">
                <span>Explore Solution Architecture</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
