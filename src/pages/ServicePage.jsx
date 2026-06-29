import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const serviceData = {
  'crm-development': {
    title: 'CRM Development',
    description: 'Custom CRM solutions tailored to your unique business workflow, ensuring high adoption rates and streamlined processes.',
    features: [
      'Multi-tenant architectures ensuring strict data isolation',
      'Integration with existing ERPs and third-party tools',
      'Custom dashboards and analytics reporting',
      'Automated workflow triggers and alerts',
      'Bank-grade security and compliance'
    ],
    imageUrl: '/extra-hero-new.png'
  },
  'ai-chatbots': {
    title: 'AI Chatbots',
    description: 'Intelligent AI agents that can handle customer support, sales inquiries, and complex operational tasks 24/7.',
    features: [
      'RAG Knowledge Systems to answer from your proprietary data',
      'Human handoff protocols with context retention',
      'Multi-language support and sentiment analysis',
      'Sub-300ms response times for fluid conversations',
      'Analytics dashboard to monitor chatbot performance'
    ],
    imageUrl: '/whatsapp-features-new.png'
  },
  'whatsapp-automation': {
    title: 'WhatsApp Automation',
    description: 'Engage customers where they already are. Automate notifications, marketing campaigns, and customer service directly on WhatsApp.',
    features: [
      'Official WhatsApp Business API integration',
      'Automated onboarding and drip campaigns',
      'Interactive messages (buttons, lists, products)',
      'Shared team inbox for manual interventions',
      'High deliverability and open rates (up to 98%)'
    ],
    imageUrl: '/ai-chatbots-hero-new.png'
  }
};

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = serviceData[serviceId];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return <Navigate to="/" />;
  }

  return (
    <div className="service-page" style={{ background: 'var(--bg-main)' }}>
      <div className="container" style={{ padding: '8rem 1rem 6rem', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="h1" style={{ marginBottom: '1.5rem', color: 'white' }}>{service.title}</h1>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {service.description}
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 4rem auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center' }}>
          <img src={service.imageUrl} alt={service.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div className="premium-card" style={{ padding: '3rem', marginBottom: '4rem', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}>
          <h2 className="h3" style={{ marginBottom: '2.5rem', color: 'white', textAlign: 'center' }}>Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {service.features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <CheckCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.5' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 className="h3" style={{ marginBottom: '1.5rem', color: 'white' }}>Ready to get started?</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}
          >
            Request a Consultation <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        prefillMessage={`I am interested in your ${service.title} services. Please provide more information.`}
      />
    </div>
  );
}
