import React from 'react';
import { Building2, GraduationCap, Factory, Building, Home, ShoppingBag, Landmark, Truck, Coffee, Scale, Plane, Landmark as GovIcon } from 'lucide-react';
import './Features.css';

const industries = [
  { icon: <Building2 size={20} strokeWidth={1.75} />, name: 'Healthcare' },
  { icon: <GraduationCap size={20} strokeWidth={1.75} />, name: 'Education' },
  { icon: <Factory size={20} strokeWidth={1.75} />, name: 'Manufacturing' },
  { icon: <Building size={20} strokeWidth={1.75} />, name: 'Enterprise' },
  { icon: <Home size={20} strokeWidth={1.75} />, name: 'Real Estate' },
  { icon: <ShoppingBag size={20} strokeWidth={1.75} />, name: 'Retail' },
  { icon: <Landmark size={20} strokeWidth={1.75} />, name: 'Finance' },
  { icon: <Truck size={20} strokeWidth={1.75} />, name: 'Logistics' },
  { icon: <Coffee size={20} strokeWidth={1.75} />, name: 'Hospitality' },
  { icon: <Scale size={20} strokeWidth={1.75} />, name: 'Legal' },
  { icon: <Plane size={20} strokeWidth={1.75} />, name: 'Travel' },
  { icon: <GovIcon size={20} strokeWidth={1.75} />, name: 'Government' },
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
                <div className="industry-icon">{industry.icon}</div>
                <h3 className="industry-name">{industry.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
