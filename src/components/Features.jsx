import React from 'react';
import { Database, Users, Bot, GitMerge, Smartphone, Layout, ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './Features.css';

const services = [
  {
    icon: <Bot size={24} />,
    title: 'AI Solutions',
    description: 'AI Chatbots, AI Voice Agents, AI Sales Agents, AI Customer Support, AI Workflow Automation.',
    color: '#8b5cf6'
  },
  {
    icon: <Users size={24} />,
    title: 'CRM Development',
    description: 'Sales CRM, Healthcare CRM, Education CRM, Manufacturing CRM, Custom CRM.',
    color: '#3b82f6'
  },
  {
    icon: <GitMerge size={24} />,
    title: 'HRMS',
    description: 'Employee Management, Payroll, Attendance, Leave Management, Recruitment.',
    color: '#22c55e'
  },
  {
    icon: <Database size={24} />,
    title: 'ERP Solutions',
    description: 'Inventory, Finance, Procurement, Operations, Asset Management.',
    color: '#f59e0b'
  },
  {
    icon: <Layout size={24} />,
    title: 'Website Development',
    description: 'Business Websites, Corporate Websites, E-commerce, Landing Pages, SEO-Friendly Sites.',
    color: '#06b6d4'
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile App Development',
    description: 'Android, iOS, Flutter, React Native.',
    color: '#ec4899'
  }
];

export default function Features({ onBookDemo }) {
  return (
    <section className="section bg-alt" id="features">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Complete Digital Solutions for Modern Businesses</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            Whether you're a startup, SME, or enterprise, we build intelligent software that automates operations, streamlines workflows, and accelerates business growth.
          </p>
        </div>
        
        <div className="features-grid">
          {services.map((service, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                {service.icon}
              </div>
              <h3 className="h3 feature-title">{service.title}</h3>
              <p className="text-muted">{service.description}</p>
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
