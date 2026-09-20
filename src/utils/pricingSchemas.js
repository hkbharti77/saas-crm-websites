import { PRICING_CONFIG } from '../config/pricingConfig';

const BASE = 'https://www.gyanvaniai.online';
const ORG_ID = `${BASE}/#organization`;

function offerForPlan(plan) {
  if (plan.isContactUs) {
    return {
      '@type': 'Offer',
      name: `${plan.name} Plan`,
      description: 'Custom pricing with configurable usage limits. Contact sales for a quote.',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing/${plan.plan}`,
    };
  }
  return {
    '@type': 'Offer',
    name: `${plan.name} Plan`,
    price: plan.price.monthlyInr,
    priceCurrency: 'INR',
    description: `${plan.name} plan, billed monthly in INR. Annual billing saves ${PRICING_CONFIG.yearlyDiscountPct} percent.`,
    availability: 'https://schema.org/InStock',
    url: `${BASE}/pricing/${plan.plan}`,
  };
}

export function pricingProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE}/pricing#product`,
    name: 'Gyan VaniAi AI CRM Platform',
    description:
      'Multi-tenant AI CRM with WhatsApp Business API, unified inbox, AI RAG chatbot, Voice Bot Assistant, and AI Calling Agent. Plans start at ₹1,999 per month with a 7-day free trial.',
    brand: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
    image: `${BASE}/hero_dashboard.webp`,
    url: `${BASE}/pricing`,
    offers: PRICING_CONFIG.plans.map(offerForPlan),
  };
}

export function planProductSchema(plan) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE}/pricing/${plan.plan}#product`,
    name: `Gyan VaniAi ${plan.name} Plan`,
    description: plan.seoDescription,
    brand: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
    image: `${BASE}/hero_dashboard.webp`,
    url: `${BASE}/pricing/${plan.plan}`,
    offers: offerForPlan(plan),
  };
}

export function pricingFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

const PLAN_FAQ_INDEXES = {
  starter: [0, 1, 2, 3, 4, 5],
  growth: [0, 1, 2, 3, 5, 6],
  scale: [0, 1, 5, 6, 7],
  enterprise: [0, 5, 6, 7],
};

export function faqsForPlan(planId) {
  const indexes = PLAN_FAQ_INDEXES[planId] || [];
  return indexes.map((i) => PRICING_CONFIG.faqs[i]).filter(Boolean);
}
