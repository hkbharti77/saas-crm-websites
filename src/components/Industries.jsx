import React from 'react';
import { Building2, GraduationCap, Factory, Building, Home, ShoppingBag, Landmark, Truck, Coffee, Scale, Plane, Landmark as GovIcon } from 'lucide-react';
import './Features.css'; // Reuse feature card styles

const industries = [
  { icon: <Building2 size={24} />, name: 'Healthcare', color: '#ef4444' },
  { icon: <GraduationCap size={24} />, name: 'Education', color: '#f59e0b' },
  { icon: <Factory size={24} />, name: 'Manufacturing', color: '#64748b' },
  { icon: <Building size={24} />, name: 'Enterprise', color: '#3b82f6' },
  { icon: <Home size={24} />, name: 'Real Estate', color: '#10b981' },
  { icon: <ShoppingBag size={24} />, name: 'Retail', color: '#ec4899' },
  { icon: <Landmark size={24} />, name: 'Finance', color: '#8b5cf6' },
  { icon: <Truck size={24} />, name: 'Logistics', color: '#06b6d4' },
  { icon: <Coffee size={24} />, name: 'Hospitality', color: '#f97316' },
  { icon: <Scale size={24} />, name: 'Legal', color: '#475569' },
  { icon: <Plane size={24} />, name: 'Travel', color: '#14b8a6' },
  { icon: <GovIcon size={24} />, name: 'Government', color: '#6366f1' },
];

export default function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Industries We Serve</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            We deliver tailored software solutions designed to solve the unique challenges of your industry.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="premium-card" 
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}
            >
              <div 
                style={{ 
                  backgroundColor: `${industry.color}15`, 
                  color: industry.color, 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                {industry.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
