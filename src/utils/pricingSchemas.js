import { PRICING_CONFIG } from '../config/pricingConfig';
import { ENGINEERING_PARTNERSHIP_TIERS } from '../config/engineeringPartnershipsConfig';

const BASE = 'https://www.gyanvaniai.com';
const ORG_ID = `${BASE}/#organization`;

function offerForPlan(plan) {
  if (plan.isContactUs) {
    return {
      '@type': 'Offer',
      name: `${plan.name} Plan`,
      price: '0',
      priceCurrency: 'INR',
      description: 'Custom Enterprise pricing based on team volume and dedicated SLAs. Contact sales for quote.',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing/${plan.plan}`,
      seller: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Gyan VaniAi',
      },
    };
  }
  return {
    '@type': 'Offer',
    name: `${plan.name} Plan`,
    price: plan.price.monthlyInr,
    priceCurrency: 'INR',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: plan.price.monthlyInr,
        priceCurrency: 'INR',
        unitCode: 'MON',
      },
      ...(plan.price.monthlyUsd
        ? [
            {
              '@type': 'UnitPriceSpecification',
              price: plan.price.monthlyUsd,
              priceCurrency: 'USD',
              unitCode: 'MON',
            },
          ]
        : []),
    ],
    description: `${plan.name} plan (${plan.price.monthlyInr} INR / ${plan.price.monthlyUsd} USD per month). Annual billing saves ${PRICING_CONFIG.yearlyDiscountPct} percent.`,
    availability: 'https://schema.org/InStock',
    url: `${BASE}/pricing/${plan.plan}`,
    seller: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Gyan VaniAi',
    },
  };
}

export function engineeringPartnershipsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE}/pricing#engineering-partnerships`,
    name: 'Gyan VaniAi Transparent Engineering Partnerships',
    description:
      'Predictable velocity, deterministic deliverables, and production-grade AI architectures: Meta WhatsApp & AI Helpdesk Setup (₹24,999 / $299), AI CRM, Voice & Hybrid RAG Sprint (₹69,999 / $850), and Full Enterprise AI & Meta Tech Suite.',
    provider: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Gyan VaniAi',
    },
    url: `${BASE}/pricing`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Partnership Tiers',
      itemListElement: ENGINEERING_PARTNERSHIP_TIERS.map((tier) => ({
        '@type': 'Offer',
        name: `${tier.tierLabel}: ${tier.title}`,
        description: `${tier.summary} Delivery: ${tier.deliveryLine}. Pricing: ${tier.pricePrimary}.`,
        price: tier.priceInr ?? '0',
        priceCurrency: 'INR',
        ...(tier.priceInr != null && tier.priceUsd != null
          ? {
              priceSpecification: [
                { '@type': 'PriceSpecification', price: tier.priceInr, priceCurrency: 'INR' },
                { '@type': 'PriceSpecification', price: tier.priceUsd, priceCurrency: 'USD' },
              ],
            }
          : {}),
        availability: 'https://schema.org/InStock',
        url: `${BASE}/pricing?view=partnerships`,
      })),
    },
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
    brand: {
      '@type': 'Brand',
      name: 'Gyan VaniAi',
    },
    image: `${BASE}/hero_dashboard.webp`,
    url: `${BASE}/pricing`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '1999',
      highPrice: '9999',
      offerCount: '4',
      offers: PRICING_CONFIG.plans.map(offerForPlan),
    },
  };
}

export function planProductSchema(plan) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE}/pricing/${plan.plan}#product`,
    name: `Gyan VaniAi ${plan.name} Plan`,
    description: plan.seoDescription,
    brand: {
      '@type': 'Brand',
      name: 'Gyan VaniAi',
    },
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
