import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Home, Building2, ShoppingBag, Landmark, GraduationCap, Factory, Briefcase, ArrowRight } from 'lucide-react';
import './Industries.css';

const industriesList = [
  {
    icon: <Laptop size={22} strokeWidth={1.75} />,
    name: 'SaaS & Technology',
    desc: 'Product-led trial conversions, subscription tracking, and automated onboarding drips.',
    to: '/industries/enterprise',
  },
  {
    icon: <Home size={22} strokeWidth={1.75} />,
    name: 'Real Estate',
    desc: 'Instant WhatsApp lead capture, automated site-visit scheduling, and broker routing.',
    to: '/industries/real-estate',
  },
  {
    icon: <Building2 size={22} strokeWidth={1.75} />,
    name: 'Healthcare',
    desc: 'Patient intake automation, doctor appointment booking, and WhatsApp reminders.',
    to: '/industries/healthcare',
  },
  {
    icon: <ShoppingBag size={22} strokeWidth={1.75} />,
    name: 'E-commerce & Retail',
    desc: 'WhatsApp catalog messaging, cart recovery sequences, and order dispatch updates.',
    to: '/industries/retail',
  },
  {
    icon: <Landmark size={22} strokeWidth={1.75} />,
    name: 'Finance & FinTech',
    desc: 'Encrypted client communication, KYC verification workflows, and compliance audit trails.',
    to: '/industries/finance',
  },
  {
    icon: <GraduationCap size={22} strokeWidth={1.75} />,
    name: 'Education & EdTech',
    desc: 'Student enrollment tracking, automated admissions counsel, and WhatsApp alerts.',
    to: '/industries/education',
  },
  {
    icon: <Factory size={22} strokeWidth={1.75} />,
    name: 'Manufacturing',
    desc: 'Distributor quotation pipelines, multi-warehouse sync, and automated order tracking.',
    to: '/industries/manufacturing',
  },
  {
    icon: <Briefcase size={22} strokeWidth={1.75} />,
    name: 'Professional Services',
    desc: 'Legal and consulting intake, client matter tracking, and automated retainers.',
    to: '/industries/legal',
  },
];

export default function Industries() {
  return (
    <section className="section bg-alt" id="industries">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Industry Solutions</span>
          <h2 className="h2">Built for the way your industry sells</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            Tailored data models, compliance guardrails, and communication workflows for your sector.
          </p>
        </div>

        <div className="industries-matrix-grid">
          {industriesList.map((item) => (
            <Link to={item.to} className="industry-matrix-link" key={item.name}>
              <article className="industry-matrix-card">
                <div className="industry-matrix-top">
                  <div className="industry-matrix-icon">{item.icon}</div>
                  <ArrowRight size={16} className="industry-matrix-arrow" />
                </div>
                <h3 className="industry-matrix-name">{item.name}</h3>
                <p className="industry-matrix-desc">{item.desc}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
