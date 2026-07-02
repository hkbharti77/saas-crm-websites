import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { trackPricingPlanClick, trackPricingView } from '../utils/analytics';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/month',
    description: 'Perfect for small teams getting started with automation.',
    features: ['Basic CRM Setup', '1 AI Chatbot', 'Lead Capture Form', 'Email Support'],
    isPopular: false,
    cta: 'Get Started'
  },
  {
    name: 'Professional',
    price: '$999',
    period: '/month',
    description: 'Advanced workflows and WhatsApp integration for growing teams.',
    features: ['Custom CRM Workflows', '3 AI Chatbots', 'WhatsApp API Access', 'Priority Support', 'Custom Dashboard'],
    isPopular: true,
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Bespoke solutions and dedicated support for large organizations.',
    features: ['Unlimited Workflows', 'Unlimited Bots', 'Dedicated Account Manager', 'Custom Development', 'SLA Guarantee'],
    isPopular: false,
    cta: 'Contact Sales'
  }
];

export default function Pricing({ onSelectPlan }) {
  const sectionRef = useRef(null);
  const hasFiredView = useRef(false);

  // Fire pricing_view event when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFiredView.current) {
          hasFiredView.current = true;
          trackPricingView();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section pricing" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="h2">Transparent Pricing</h2>
          <p className="text-lg text-muted" style={{ marginTop: '1rem' }}>Invest in automation that pays for itself.</p>
        </div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div className={`pricing-card ${plan.isPopular ? 'popular' : ''}`} key={index}>
              {plan.isPopular && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-header">
                <h3 className="h3">{plan.name}</h3>
                <div className="price-container">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <p className="text-muted" style={{ minHeight: '48px' }}>{plan.description}</p>
              </div>
              <div className="pricing-features">
                {plan.features.map((feature, i) => (
                  <div className="feature-item" key={i}>
                    <Check size={20} className="check-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="pricing-footer">
                <button 
                  id={`btn-pricing-${plan.name.toLowerCase()}`}
                  className={`btn ${plan.isPopular ? 'btn-primary' : 'btn-outline'}`} 
                  style={{ width: '100%' }}
                  onClick={() => {
                    trackPricingPlanClick(plan.name);
                    onSelectPlan && onSelectPlan(plan.name);
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
