import React from 'react';

const technologies = [
  'Python', 'Java', 'TypeScript', 'FastAPI', 'Spring Boot', 'React', 'Next.js', 'LangChain', 'AWS', 'GCP Vertex AI', 'Docker', 'PostgreSQL'
];

export default function TechStack() {
  return (
    <section className="section bg-alt" id="tech-stack">
      <div className="container text-center">
        <h2 className="h2" style={{ marginBottom: '1rem' }} data-aos="fade-up">Enterprise Tech Stack</h2>
        <p className="text-lg text-muted" style={{ marginBottom: '3rem' }} data-aos="fade-up" data-aos-delay="100">
          Built with scalable, high-performance, and secure technologies.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="glass-panel"
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center'
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
