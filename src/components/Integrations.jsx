import React from 'react';

const tools = [
  'WhatsApp CRM', 'Facebook', 'Slack', 'Salesforce', 'HubSpot', 'Zapier', 'Shopify', 'Mailchimp', 'Stripe', 'Google Workspace'
];

export default function Integrations() {
  return (
    <section className="section" id="integrations">
      <div className="container text-center">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="h2" data-aos="fade-up">Seamless Integrations</h2>
          <p className="text-lg text-muted" data-aos="fade-up" data-aos-delay="100" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            We seamlessly connect our custom solutions with the tools your team already uses every day.
          </p>
        </div>
        
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
