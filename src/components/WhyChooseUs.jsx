import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Features.css';

const reasons = [
  'Meta Tech Provider & WhatsApp Coexistence',
  '1-click Embedded Signup for WhatsApp',
  'AI-first development approach',
  'Solutions shaped to your operations',
  'Enterprise-grade security practices',
  'Scalable cloud architecture',
  'Clear UI/UX for daily operators',
  'Dedicated team and ongoing support',
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-alt" id="why-choose-us">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Why Gyan VaniAi</span>
          <h2 className="h2">A partner, not a ticket queue</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            We build software assets that operators can trust — with the delivery discipline enterprises expect.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((reason) => (
            <div key={reason} className="why-item">
              <CheckCircle2 size={20} strokeWidth={1.75} className="why-check" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
