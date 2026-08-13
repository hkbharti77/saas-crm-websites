import React from 'react';

const tools = [
  'WhatsApp CRM', 'Facebook', 'Slack', 'Salesforce', 'HubSpot', 'Zapier', 'Shopify', 'Mailchimp', 'Stripe', 'Google Workspace'
];

export default function Integrations() {
  return (
    <section className="section" id="integrations">
      <div className="container text-center">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Integrations</span>
          <h2 className="h2">Works with your stack</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Connect custom systems to the tools your teams already open every morning.
          </p>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...tools, ...tools].map((tool, index) => (
              <div key={`${tool}-${index}`} className="integration-chip">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
