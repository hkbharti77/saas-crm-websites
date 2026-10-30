import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, ArrowRight } from 'lucide-react';
import { renderLucideIcon } from '../utils/iconMap';
import './Industries.css';

const DEFAULT_INDUSTRIES = [
  {
    icon: 'Laptop',
    name: 'SaaS & Technology',
    desc: 'Product-led trial conversions, subscription tracking, and automated onboarding drips.',
    to: '/industries/enterprise',
  },
  {
    icon: 'Home',
    name: 'Real Estate',
    desc: 'Instant WhatsApp lead capture, automated site-visit scheduling, and broker routing.',
    to: '/industries/real-estate',
  },
  {
    icon: 'Building2',
    name: 'Healthcare',
    desc: 'Patient intake automation, doctor appointment booking, and WhatsApp reminders.',
    to: '/industries/healthcare',
  },
  {
    icon: 'ShoppingBag',
    name: 'E-commerce & Retail',
    desc: 'WhatsApp catalog messaging, cart recovery sequences, and order dispatch updates.',
    to: '/industries/retail',
  },
  {
    icon: 'Landmark',
    name: 'Finance & FinTech',
    desc: 'Encrypted client communication, KYC verification workflows, and compliance audit trails.',
    to: '/industries/finance',
  },
  {
    icon: 'GraduationCap',
    name: 'Education & EdTech',
    desc: 'Student enrollment tracking, automated admissions counsel, and WhatsApp alerts.',
    to: '/industries/education',
  },
  {
    icon: 'Factory',
    name: 'Manufacturing',
    desc: 'Distributor quotation pipelines, multi-warehouse sync, and automated order tracking.',
    to: '/industries/manufacturing',
  },
  {
    icon: 'Briefcase',
    name: 'Professional Services',
    desc: 'Legal and consulting intake, client matter tracking, and automated retainers.',
    to: '/industries/legal',
  },
];

export default function Industries({
  title: customTitle,
  subtitle: customSubtitle,
  list: dynamicList,
}) {
  const title = customTitle || 'Built for the way your industry sells';
  const subtitle = customSubtitle || 'Tailored data models, compliance guardrails, and communication workflows for your sector.';
  const industriesList = dynamicList && dynamicList.length > 0 ? dynamicList : DEFAULT_INDUSTRIES;

  return (
    <section className="section bg-alt" id="industries">
      <div className="container">
        <div className="section-header section-header--center">
          <h2 className="h2">{title}</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            {subtitle}
          </p>
        </div>

        <div className="industries-matrix-grid">
          {industriesList.map((item, idx) => (
            <Link to={item.to || '/industries/enterprise'} className="industry-matrix-link" key={item.name || idx}>
              <article className="industry-matrix-card">
                <div className="industry-matrix-top">
                  <div className="industry-matrix-icon">
                    {renderLucideIcon(item.icon, { size: 22, strokeWidth: 1.75 }) || <Laptop size={22} strokeWidth={1.75} />}
                  </div>
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
