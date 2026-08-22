import React from 'react';
import { Building2, GraduationCap, Factory, Building, Home, ShoppingBag, Landmark, Truck, Coffee, Scale, Plane, Landmark as GovIcon } from 'lucide-react';
import './Features.css';

const industries = [
  { icon: <Building2 size={20} strokeWidth={1.75} />, name: 'Healthcare', color: '#0ea5e9' },
  { icon: <GraduationCap size={20} strokeWidth={1.75} />, name: 'Education', color: '#8b5cf6' },
  { icon: <Factory size={20} strokeWidth={1.75} />, name: 'Manufacturing', color: '#f59e0b' },
  { icon: <Building size={20} strokeWidth={1.75} />, name: 'Enterprise', color: '#0f766e' },
  { icon: <Home size={20} strokeWidth={1.75} />, name: 'Real Estate', color: '#ec4899' },
  { icon: <ShoppingBag size={20} strokeWidth={1.75} />, name: 'Retail', color: '#10b981' },
  { icon: <Landmark size={20} strokeWidth={1.75} />, name: 'Finance', color: '#3b82f6' },
  { icon: <Truck size={20} strokeWidth={1.75} />, name: 'Logistics', color: '#f97316' },
  { icon: <Coffee size={20} strokeWidth={1.75} />, name: 'Hospitality', color: '#d97706' },
  { icon: <Scale size={20} strokeWidth={1.75} />, name: 'Legal', color: '#6366f1' },
  { icon: <Plane size={20} strokeWidth={1.75} />, name: 'Travel', color: '#06b6d4' },
  { icon: <GovIcon size={20} strokeWidth={1.75} />, name: 'Government', color: '#64748b' },
];

export default function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Industries</span>
          <h2 className="h2">Built for the work you do</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Tailored systems for the constraints and workflows of your sector — not one template for everyone.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry) => (
            <a
              key={industry.name}
              href={`/industries/${industry.name.toLowerCase().replace(' ', '-')}`}
              className="industry-link"
            >
              <div className="industry-card">
                <div 
                  className="industry-icon"
                  style={{
                    color: industry.color,
                    background: `color-mix(in srgb, ${industry.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${industry.color} 25%, transparent)`
                  }}
                >
                  {industry.icon}
                </div>
                <h3 className="industry-name">{industry.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
