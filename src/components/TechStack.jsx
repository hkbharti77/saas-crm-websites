import React from 'react';

const techCategories = [
  {
    name: 'Frontend',
    techs: ['React', 'Next.js']
  },
  {
    name: 'Backend',
    techs: ['FastAPI', 'Spring Boot', 'Node.js']
  },
  {
    name: 'AI',
    techs: ['OpenAI', 'LangChain', 'Pinecone']
  },
  {
    name: 'Database',
    techs: ['PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    name: 'Cloud',
    techs: ['AWS', 'Docker', 'Kubernetes']
  }
];

export default function TechStack() {
  return (
    <section className="section" id="tech-stack">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Technologies We Use</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            We leverage modern, scalable, and secure technologies to build your solutions.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {techCategories.map((category, index) => (
            <div key={index} className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{category.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {category.techs.map((tech, i) => (
                  <span key={i} style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
