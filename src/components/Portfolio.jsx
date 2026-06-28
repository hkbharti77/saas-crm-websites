import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    title: 'AI Stock Kundli',
    category: 'Enterprise Investment Platform',
    image: 'url("/portfolio_stock.webp") center/cover',
    stats: '8 Parallel AI Agents'
  },
  {
    title: 'CRMLite',
    category: 'Multi-Tenant WhatsApp CRM',
    image: 'url("/portfolio_crm.webp") center/cover',
    stats: 'React Native & Spring'
  },
  {
    title: 'Enterprise AI Platform',
    category: 'RAG & Workflow Automation',
    image: 'url("/portfolio_ai.webp") center/cover',
    stats: 'Secure PII Masking'
  }
];

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 className="h2">Proven Results</h2>
            <p className="text-lg text-muted" style={{ marginTop: '1rem' }}>See how we've helped businesses transform their operations.</p>
          </div>
          <button className="btn btn-outline" style={{ display: 'none' }}>View All Cases</button>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div className="portfolio-card" key={index}>
              <div className="portfolio-image" style={{ background: project.image }}>
                <div className="portfolio-stats-badge">{project.stats}</div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="h3 portfolio-title">
                  {project.title}
                  <ArrowUpRight size={20} className="portfolio-icon" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
