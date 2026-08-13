import React from 'react';
import './Portfolio.css';

const projects = [
  {
    title: 'Hospital CRM',
    industry: 'Healthcare',
    challenge: 'Manual appointment scheduling and fragmented patient records.',
    solution: 'Built a custom CRM with appointment automation, patient management, and WhatsApp notifications.',
    outcome: 'Reduced administrative workload and improved appointment efficiency.'
  },
  {
    title: 'EdTech Learning Portal',
    industry: 'Education',
    challenge: 'Inconsistent student engagement and lack of centralized progress tracking.',
    solution: 'Developed a custom LMS with an AI chatbot for instant student query resolution.',
    outcome: 'Increased student engagement by 60% and automated 80% of routine inquiries.'
  },
  {
    title: 'Supply Chain ERP',
    industry: 'Manufacturing',
    challenge: 'Inefficient inventory tracking leading to frequent stockouts and delays.',
    solution: 'Deployed a cloud-based ERP with real-time analytics and predictive restocking algorithms.',
    outcome: 'Eliminated stockouts and reduced inventory carrying costs by 25%.'
  }
];

export default function Portfolio() {
  return (
    <section className="section bg-alt" id="portfolio">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Experience</span>
          <h2 className="h2">Work that held up in production</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Examples from enterprise builds our team has shipped — real constraints, measurable outcomes.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => (
            <div className="premium-card" key={index} style={{ padding: '2rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--bg-gradient)', color: 'var(--primary-color)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1rem' }}>
                {project.industry}
              </div>
              <h3 className="h3" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{project.title}</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Challenge:</strong>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>{project.challenge}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Solution:</strong>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>{project.solution}</p>
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)', marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', color: 'var(--primary-color)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Outcome:</strong>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>{project.outcome}</p>
              </div>
              
              <a href={index === 0 ? '/services/crm-development' : index === 1 ? '/services/ai-development' : '/services/erp-development'} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>
                View {index === 0 ? 'CRM' : index === 1 ? 'AI' : 'ERP'} Services →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
