import React from 'react';

const tools = [
  'Salesforce', 'HubSpot', 'Zapier', 'Shopify', 'Slack', 'WhatsApp', 'Mailchimp', 'Stripe'
];

export default function Integrations() {
  return (
    <section className="section" id="integrations">
      <div className="container text-center">
        <h2 className="h2" style={{ marginBottom: '1rem' }} data-aos="fade-up">Seamless Integrations</h2>
        <p className="text-lg text-muted" style={{ marginBottom: '3rem' }} data-aos="fade-up" data-aos-delay="100">
          Connect AutoCRM with the tools your team already uses every day.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {tools.map((tool, index) => (
            <div 
              key={index} 
              style={{ 
                background: 'var(--bg-color)', 
                padding: '1rem 2rem', 
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
