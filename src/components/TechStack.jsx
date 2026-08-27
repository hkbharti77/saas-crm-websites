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
        <div className="section-header section-header--center">
          <h2 className="h2">Proven enterprise foundation</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Modern, maintainable infrastructure chosen for high throughput and long-term stability.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {techCategories.map((category, index) => (
            <div key={index} className="premium-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{category.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {category.techs.map((tech, i) => (
                  <span key={i} style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
