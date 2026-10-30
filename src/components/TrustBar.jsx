import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { renderLucideIcon } from '../utils/iconMap';
import './TrustBar.css';

const DEFAULT_INTEGRATIONS = [
  { name: 'WhatsApp Cloud API', type: 'Meta Tech Provider' },
  { name: 'CRM Integrations', type: 'REST API & Webhooks' },
  { name: 'Custom Pipelines', type: 'Real-Time Sync' },
  { name: 'Zapier', type: 'Webhook Triggers' },
  { name: 'OpenAI / Claude', type: 'RAG Intelligence' },
  { name: 'PostgreSQL', type: 'Isolated Tenant DB' },
];

const DEFAULT_BADGES = [
  { label: 'SOC2 Ready Architecture', icon: 'ShieldCheck' },
  { label: 'Official Meta Tech Provider', icon: 'Zap' },
  { label: '99.9% Platform SLA', icon: 'Server' },
];

export default function TrustBar({
  heading: customHeading,
  integrations: dynamicIntegrations,
  badges: dynamicBadges,
}) {
  const heading = customHeading || 'Built to connect with your core tech stack';
  const integrations = dynamicIntegrations && dynamicIntegrations.length > 0 ? dynamicIntegrations : DEFAULT_INTEGRATIONS;
  const badges = dynamicBadges && dynamicBadges.length > 0 ? dynamicBadges : DEFAULT_BADGES;

  return (
    <section className="trust-section" aria-label="Enterprise integrations and trust indicators">
      <div className="container">
        <div className="trust-inner">
          <p className="trust-heading">
            {heading}
          </p>

          <div className="trust-logos-grid">
            {integrations.map((item, idx) => (
              <div key={item.name || idx} className="trust-logo-card">
                <span className="trust-logo-name">{item.name}</span>
                <span className="trust-logo-type">{item.type}</span>
              </div>
            ))}
          </div>

          <div className="trust-badges-row">
            {badges.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="trust-badge-dot">•</div>}
                <div className="trust-badge-item">
                  {renderLucideIcon(b.icon, { size: 16, className: 'trust-badge-icon' }) || (
                    <ShieldCheck size={16} className="trust-badge-icon" />
                  )}
                  <span>{b.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
