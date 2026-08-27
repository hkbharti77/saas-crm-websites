import React from 'react';
import { MessageSquare, Share2, Cloud, Database, ShoppingBag, CreditCard, Mail, Zap, Globe, Layers } from 'lucide-react';

const tools = [
  { name: 'WhatsApp CRM', icon: <MessageSquare size={16} color="#25D366" /> },
  { name: 'Meta / Facebook', icon: <Share2 size={16} color="#1877F2" /> },
  { name: 'Salesforce', icon: <Cloud size={16} color="#00A1E0" /> },
  { name: 'HubSpot', icon: <Layers size={16} color="#FF7A59" /> },
  { name: 'Slack', icon: <MessageSquare size={16} color="#4A154B" /> },
  { name: 'Zapier', icon: <Zap size={16} color="#FF4A00" /> },
  { name: 'Shopify', icon: <ShoppingBag size={16} color="#96BF48" /> },
  { name: 'Mailchimp', icon: <Mail size={16} color="#FFE01B" /> },
  { name: 'Stripe', icon: <CreditCard size={16} color="#635BFF" /> },
  { name: 'Google Workspace', icon: <Globe size={16} color="#4285F4" /> },
  { name: 'PostgreSQL / SQL', icon: <Database size={16} color="#336791" /> },
];

export default function Integrations() {
  return (
    <section className="section" id="integrations">
      <div className="container text-center">
        <div className="section-header section-header--center">
          <h2 className="h2">Works with your stack</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Connect custom systems to the tools your teams already open every morning.
          </p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...tools, ...tools].map((tool, index) => (
              <div key={`${tool.name}-${index}`} className="integration-chip">
                {tool.icon}
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
