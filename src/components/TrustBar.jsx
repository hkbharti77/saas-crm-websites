import React from 'react';
import { ShieldCheck, Zap, Server } from 'lucide-react';
import './TrustBar.css';

const integrations = [
  { name: 'WhatsApp Cloud API', type: 'Meta Tech Provider' },
  { name: 'Salesforce', type: 'Two-Way Sync' },
  { name: 'HubSpot', type: 'Real-Time Pipeline' },
  { name: 'Zapier', type: 'Webhook Triggers' },
  { name: 'OpenAI / Claude', type: 'RAG Intelligence' },
  { name: 'PostgreSQL', type: 'Isolated Tenant DB' },
];

export default function TrustBar() {
  return (
    <section className="trust-section" aria-label="Enterprise integrations and trust indicators">
      <div className="container">
        <div className="trust-inner">
          <p className="trust-heading">
            Trusted by modern revenue teams and integrated with your core tech stack
          </p>

          <div className="trust-logos-grid">
            {integrations.map((item) => (
              <div key={item.name} className="trust-logo-card">
                <span className="trust-logo-name">{item.name}</span>
                <span className="trust-logo-type">{item.type}</span>
              </div>
            ))}
          </div>

          <div className="trust-badges-row">
            <div className="trust-badge-item">
              <ShieldCheck size={16} className="trust-badge-icon" />
              <span>SOC2 Ready Architecture</span>
            </div>
            <div className="trust-badge-dot">•</div>
            <div className="trust-badge-item">
              <Zap size={16} className="trust-badge-icon" />
              <span>Official Meta Tech Provider</span>
            </div>
            <div className="trust-badge-dot">•</div>
            <div className="trust-badge-item">
              <Server size={16} className="trust-badge-icon" />
              <span>99.9% Platform SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
