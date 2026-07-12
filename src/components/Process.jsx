import React from 'react';
import { Search, LineChart, PenTool, Code2, ShieldCheck, Rocket, Wrench } from 'lucide-react';
import './Features.css';

const steps = [
  { icon: <Search size={24} />, name: 'Discovery', desc: 'Understanding your business needs' },
  { icon: <LineChart size={24} />, name: 'Business Analysis', desc: 'Defining the optimal solution' },
  { icon: <PenTool size={24} />, name: 'UI/UX Design', desc: 'Crafting intuitive user experiences' },
  { icon: <Code2 size={24} />, name: 'Development', desc: 'Building scalable software' },
  { icon: <ShieldCheck size={24} />, name: 'Testing', desc: 'Ensuring zero defects' },
  { icon: <Rocket size={24} />, name: 'Deployment', desc: 'Smooth, secure launch' },
  { icon: <Wrench size={24} />, name: 'Support & Maintenance', desc: 'Long-term partnership' },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Our Development Process</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            A proven, transparent methodology that guarantees high-quality software delivered on time and within budget.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="premium-card" 
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', margin: 0 }}
            >
              <div 
                style={{ 
                  backgroundColor: 'var(--primary-color)', 
                  color: 'white', 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}
              >
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{step.name}</h3>
                <p className="text-muted" style={{ margin: 0 }}>{step.desc}</p>
              </div>
              <div style={{ color: 'var(--primary-color)', opacity: 0.8, display: 'none' }}>
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
