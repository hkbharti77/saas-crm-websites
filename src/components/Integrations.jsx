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
        
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...tools, ...tools].map((tool, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'var(--glass-bg)', 
                  padding: '1rem 3rem', 
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--shadow-sm)',
                  backdropFilter: 'blur(10px)',
                  whiteSpace: 'nowrap'
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
