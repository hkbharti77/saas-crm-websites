import React from 'react';
import { ShieldCheck, Lock, Database, FileText, KeyRound, Server } from 'lucide-react';
import './WhyChooseUs.css';

const securityCards = [
  {
    icon: <KeyRound size={22} strokeWidth={1.75} />,
    title: 'Role-Based Access Control',
    desc: 'Granular permissions by team, role, and branch location to prevent unauthorized data exposure.'
  },
  {
    icon: <Database size={22} strokeWidth={1.75} />,
    title: 'Cryptographic Tenant Isolation',
    desc: 'Vector stores and relational databases are completely siloed per tenant with zero cross-leakage.'
  },
  {
    icon: <Lock size={22} strokeWidth={1.75} />,
    title: 'End-to-End Data Encryption',
    desc: 'All communications encrypted in transit with TLS 1.3 and at rest with military-grade AES-256.'
  },
  {
    icon: <FileText size={22} strokeWidth={1.75} />,
    title: 'Immutable Audit Logs',
    desc: 'Complete chronological audit trails for every rep action, AI response, and webhook event.'
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.75} />,
    title: 'Meta Tech Provider Verification',
    desc: 'Official Meta Cloud API integration adhering strictly to Meta business and privacy compliance.'
  },
  {
    icon: <Server size={22} strokeWidth={1.75} />,
    title: 'PII Masking & Privacy Guardrails',
    desc: 'Automatic redaction of sensitive payment and personal identification data before LLM processing.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-alt" id="security">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Enterprise Trust</span>
          <h2 className="h2">Enterprise security without enterprise complexity</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Engineered from the ground up for strict data privacy, zero cross-tenant exposure, and regulatory compliance.
          </p>
        </div>

        <div className="security-grid">
          {securityCards.map((card, index) => (
            <div key={index} className="security-card">
              <div className="security-icon-wrap">
                {card.icon}
              </div>
              <div className="security-content">
                <h3 className="security-title">{card.title}</h3>
                <p className="security-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
