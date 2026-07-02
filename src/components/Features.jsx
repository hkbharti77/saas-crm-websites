import React from 'react';
import { Database, Users, MessageCircle, Bot, GitMerge, Code, Smartphone, Layout, Calendar, ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Features.css';

const features = [
  {
    icon: <Database size={24} />,
    title: 'Multi-Tenant Backends',
    description: 'Scalable Spring Boot and FastAPI architectures ensuring strict data isolation and ACID compliance.',
    color: '#3b82f6'
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Omnichannel Automation',
    description: 'WhatsApp Business and Slack integrations with Agent Handoff triggers to reduce support times.',
    color: '#22c55e'
  },
  {
    icon: <Bot size={24} />,
    title: 'RAG Knowledge Systems',
    description: 'Optimized hybrid search pipelines (FAISS/LangChain) reducing query latency to sub-300ms.',
    color: '#8b5cf6'
  },
  {
    icon: <Code size={24} />,
    title: 'Enterprise APIs & Security',
    description: 'Secure RESTful APIs protected by JWT, OAuth2, and Role-Based Access Control (RBAC).',
    color: '#ef4444'
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile Engineering',
    description: 'Robust React Native applications built for cross-platform scalability and native device performance.',
    color: '#ec4899'
  },
  {
    icon: <Layout size={24} />,
    title: 'Scalable Frontends',
    description: 'High-performance React and Next.js applications engineered for maximum UX and SEO visibility.',
    color: '#06b6d4'
  },
  {
    icon: <Calendar size={24} />,
    title: 'Distributed Systems',
    description: 'High-concurrency logic using Redis distributed locking to prevent data races during traffic spikes.',
    color: '#84cc16'
  },
  {
    icon: <Users size={24} />,
    title: 'Secure Data Pipelines',
    description: 'Automated PII masking and document ingestion ensuring strict zero cross-tenant data exposure.',
    color: '#10b981'
  },
  {
    icon: <GitMerge size={24} />,
    title: 'Agentic AI Orchestration',
    description: 'Multi-agent orchestration systems performing complex parallel tasks under strict SLAs.',
    color: '#f59e0b'
  }
];

export default function Features({ onBookDemo }) {
  return (
    <section className="section bg-alt" id="features">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Everything you need to scale</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '1rem auto 0' }}>
            Our comprehensive suite of AI and CRM tools helps you close more deals and build better customer relationships.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="h3 feature-title">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p className="text-muted" style={{ marginBottom: '1rem' }}>
            Ready to see these features in action?
          </p>
          <button
            id="btn-features-book-demo"
            className="btn btn-primary"
            onClick={() => { trackBookDemo('features'); onBookDemo && onBookDemo(); }}
          >
            Book a Free Demo <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
