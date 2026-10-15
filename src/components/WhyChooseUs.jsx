import React from 'react';
import { ShieldCheck, Lock, Database, FileText, KeyRound, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { renderLucideIcon } from '../utils/iconMap';
import './WhyChooseUs.css';

const DEFAULT_SECURITY_CARDS = [
  {
    icon: 'KeyRound',
    title: 'Role-Based Access Control',
    desc: 'Granular permissions by team, role, and branch location to prevent unauthorized data exposure.'
  },
  {
    icon: 'Database',
    title: 'Cryptographic Tenant Isolation',
    desc: 'Vector stores and relational databases are completely siloed per tenant with zero cross-leakage.'
  },
  {
    icon: 'Lock',
    title: 'End-to-End Data Encryption',
    desc: 'All communications encrypted in transit with TLS 1.3 and at rest with military-grade AES-256.'
  },
  {
    icon: 'FileText',
    title: 'Immutable Audit Logs',
    desc: 'Complete chronological audit trails for every rep action, AI response, and webhook event.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Meta Tech Provider Verification',
    desc: 'Official Meta Cloud API integration adhering strictly to Meta business and privacy compliance.'
  },
  {
    icon: 'Server',
    title: 'PII Masking & Privacy Guardrails',
    desc: 'Automatic redaction of sensitive payment and personal identification data before LLM processing.'
  }
];

export default function WhyChooseUs({
  title: customTitle,
  subtitle: customSubtitle,
  cards: dynamicCards,
  cta: customCta,
}) {
  const title = customTitle || 'Enterprise security without enterprise complexity';
  const subtitle = customSubtitle || 'Engineered from the ground up for strict data privacy, zero cross-tenant exposure, and regulatory compliance.';
  const securityCards = dynamicCards && dynamicCards.length > 0 ? dynamicCards : DEFAULT_SECURITY_CARDS;
  const cta = customCta || { buttonText: 'Explore Security', buttonUrl: '/security' };

  return (
    <section className="section bg-alt" id="security">
      <div className="container">
        <div className="section-header section-header--center">
          <h2 className="h2">{title}</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            {subtitle}
          </p>
        </div>

        <div className="security-grid">
          {securityCards.map((card, index) => (
            <div key={card.title || index} className="security-card">
              <div className="security-icon-wrap">
                {renderLucideIcon(card.icon, { size: 22, strokeWidth: 1.75 }) || <KeyRound size={22} strokeWidth={1.75} />}
              </div>
              <div className="security-content">
                <h3 className="security-title">{card.title}</h3>
                <p className="security-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to={cta.buttonUrl || '/security'} className="btn btn-outline">
            {cta.buttonText || 'Explore Security'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
