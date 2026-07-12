import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Features.css';

const reasons = [
  'AI-First Development Approach',
  'Custom Solutions Tailored to Your Business',
  'Enterprise-Grade Security',
  'Scalable Cloud Architecture',
  'Modern UI/UX Design',
  'Dedicated Development Team',
  'Fast Project Delivery',
  'Long-Term Maintenance & Support'
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-alt" id="why-choose-us">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Why Choose Gyan VaniAi</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            We don't just write code—we partner with you to build strategic software assets that drive real business outcomes.
          </p>
        </div>
        
        <div className="premium-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {reasons.map((reason, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle2 size={24} style={{ color: 'var(--primary-color)' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
