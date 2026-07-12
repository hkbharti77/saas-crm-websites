import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'Apex Healthcare',
    role: 'Operations Director',
    review: 'Gyan VaniAi transformed our patient booking system. The custom CRM they built completely automated our appointment scheduling and reduced our staff workload by half.',
    image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D8ABC&color=fff'
  },
  {
    name: 'Priya Sharma',
    company: 'EduTech Solutions',
    role: 'Founder',
    review: 'Their team delivered an exceptional AI learning platform. The chatbot integration has been a game-changer for student engagement, resolving queries instantly 24/7.',
    image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10B981&color=fff'
  },
  {
    name: 'Amit Patel',
    company: 'Global Logistics',
    role: 'Supply Chain Manager',
    review: 'We were struggling with legacy ERP systems. Gyan VaniAi migrated us to a modern, cloud-based solution that gave us real-time visibility and saved us countless hours.',
    image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=F59E0B&color=fff'
  }
];

export default function Testimonials() {
  return (
    <section className="section bg-alt" id="testimonials">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">What Our Clients Say</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            Don't just take our word for it. Read how we've helped businesses achieve real results.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((item, index) => (
            <div className="premium-card" key={index} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <Quote size={40} style={{ color: 'var(--primary-color)', opacity: 0.2, marginBottom: '1.5rem' }} />
              <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '2rem', flex: 1, lineHeight: '1.7' }}>
                "{item.review}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{item.name}</h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {item.role}, <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
