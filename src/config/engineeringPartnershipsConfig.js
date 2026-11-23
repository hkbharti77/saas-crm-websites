import { formatDualCurrencyPrice } from '../utils/formatPricing';

/**
 * Pure configuration and view-mode resolver for the Transparent Engineering
 * Partnerships experience on /pricing.
 * Kept free of React/DOM imports so it can be unit-tested directly with node:test.
 */

export const PRICING_VIEW_MODES = {
  PARTNERSHIPS: 'partnerships',
  SAAS: 'saas',
};

/**
 * Resolves the active /pricing view mode from a URL query parameter value.
 * Defaults to 'partnerships' so Transparent Engineering Partnerships renders
 * immediately on /pricing while still supporting direct ?view=saas links.
 */
export function resolvePricingViewMode(rawValue) {
  if (typeof rawValue !== 'string') return PRICING_VIEW_MODES.PARTNERSHIPS;
  const normalized = rawValue.trim().toLowerCase();
  if (normalized === 'saas' || normalized === 'plans' || normalized === 'platform') {
    return PRICING_VIEW_MODES.SAAS;
  }
  return PRICING_VIEW_MODES.PARTNERSHIPS;
}

export const ENGINEERING_PARTNERSHIPS_HEADER = {
  eyebrow: 'Engineering Partnerships',
  title: 'Transparent Engineering Partnerships',
  lead: 'Predictable velocity, deterministic deliverables, and production-grade architectures designed to scale from prototype to high-throughput enterprise deployment.',
  highlights: [
    '100% IP ownership',
    'Fixed-timeline delivery',
    'Production-grade codebases',
    'Direct senior engineering',
  ],
};

const RAW_ENGINEERING_PARTNERSHIP_TIERS = [
  {
    id: 'tier-01-whatsapp-helpdesk',
    tierLabel: 'TIER 01',
    durationLabel: '5 Business Days',
    recommendedLabel: null,
    isRecommended: false,
    isEnterprise: false,
    title: 'Meta WhatsApp & AI Helpdesk Setup',
    summary:
      'Official Meta Cloud API configuration, AI RAG auto-replies, and live-agent escalation queue.',
    priceInr: 24999,
    priceUsd: 299,
    customPriceLabel: 'Custom Scope',
    priceCadence: '/ turnkey setup',
    deliveryLine: '5 business days delivery',
    deliverables: [
      'Official Meta WhatsApp Business Cloud API & Webhook ingress setup (FastAPI)',
      'Custom Knowledge Base RAG Assistant for automated 24/7 client inquiries',
      'Interactive quick-reply buttons and catalog list message templates',
      'Confidence-gated live human support queue and rep routing',
      'Encrypted PostgreSQL chat history storage and delivery status analytics',
    ],
    idealFit:
      'Businesses needing automated 24/7 customer support and verified WhatsApp presence.',
    ctaLabel: 'Deploy WhatsApp AI Helpdesk',
    ctaVariant: 'outline',
    accentColor: '#19D3C5',
    inquiryType: 'WhatsApp Coexistence & Multi-Agent CRM',
    prefillVerb: 'book',
    prefillSuffix: '5 Business Days turnkey setup',
  },
  {
    id: 'tier-02-ai-crm-voice-rag-sprint',
    tierLabel: 'TIER 02',
    durationLabel: '14 Calendar Days',
    recommendedLabel: 'Recommended Velocity',
    isRecommended: true,
    isEnterprise: false,
    title: 'AI CRM, Voice & Hybrid RAG Sprint',
    summary:
      'Full-duplex Voice AI agents, multi-format RAG pipelines, or custom CRM platform.',
    priceInr: 69999,
    priceUsd: 850,
    customPriceLabel: 'Custom Scope',
    priceCadence: '/ per 2-week sprint',
    deliveryLine: '2 weeks dedicated engineering',
    deliverables: [
      'Sub-600ms AI Voice Calling Agent (Deepgram STT + ElevenLabs TTS over WebSockets)',
      'Enterprise Hybrid RAG (PDF, DOCX, XLSX parsing with FAISS vector search & cross-encoder rerank)',
      'FastAPI or Java Spring Boot microservice with Redis caching and JWT authentication',
      'Comprehensive unit and integration test suite with >80% test coverage',
      'Docker Compose deployment with multi-tenant database isolation',
    ],
    idealFit:
      'Growing companies needing dedicated engineering velocity to ship mission-critical AI features.',
    ctaLabel: 'Reserve Sprint Slot',
    ctaVariant: 'primary',
    accentColor: '#19D3C5',
    inquiryType: 'Custom AI CRM Development',
    prefillVerb: 'reserve a sprint slot for',
    prefillSuffix: '14 Calendar Days',
  },
  {
    id: 'tier-03-enterprise-meta-suite',
    tierLabel: 'TIER 03',
    durationLabel: '4 to 8 Weeks',
    recommendedLabel: null,
    isRecommended: false,
    isEnterprise: true,
    title: 'Full Enterprise AI & Meta Tech Suite',
    summary:
      'Turnkey distributed architecture: Meta Tech Provider status, Bulk Broadcasting, and custom ERP.',
    priceInr: null,
    priceUsd: null,
    customPriceLabel: 'Custom Scope',
    priceCadence: '/ multi-milestone engagement',
    deliveryLine: '4 to 8 weeks engagement',
    deliverables: [
      'End-to-end Meta Tech Provider platform with Meta Embedded Signup (1-click WABA setup)',
      'WhatsApp bulk broadcasting engine with HSM template sync and Redis token-bucket rate limiter',
      'Instagram Graph API automation (comment-to-DM triggers and story mention lead capture)',
      'Full ERP/CRM backend (Java Spring Boot / FastAPI, PostgreSQL, Redis distributed locking)',
      'Docker / Kubernetes production deployment with 99.5% uptime SLA guarantee',
    ],
    idealFit:
      'Enterprises and agencies requiring high-throughput automation and official Meta Business Partner status.',
    ctaLabel: 'Initiate Enterprise Dispatch',
    ctaVariant: 'enterprise',
    accentColor: '#c9a45c',
    inquiryType: 'Enterprise Consultation',
    prefillVerb: 'initiate',
    prefillSuffix: '4 to 8 Weeks multi-milestone engagement',
  },
];

export const ENGINEERING_PARTNERSHIP_TIERS = RAW_ENGINEERING_PARTNERSHIP_TIERS.map((tier) => {
  const pricePrimary = formatDualCurrencyPrice(tier.priceInr, tier.priceUsd, {
    fallback: tier.customPriceLabel,
  });
  const tierTitle = `${tier.tierLabel.replace('TIER', 'Tier')} — ${tier.title}`;
  return {
    ...tier,
    pricePrimary,
    prefillMessage: `I would like to ${tier.prefillVerb} ${tierTitle} (${pricePrimary}, ${tier.prefillSuffix}).`,
  };
});

export const OPERATIONAL_INVARIANTS = {
  eyebrow: 'OPERATIONAL INVARIANTS',
  title: 'Guaranteed standards on every engagement',
  items: [
    {
      id: 'ip-ownership',
      index: '01',
      title: '100% IP Ownership',
      description:
        'Full intellectual property, patents, source code, and training pipelines belong solely to your organization.',
    },
    {
      id: 'production-rigor',
      index: '02',
      title: 'Production Rigor',
      description:
        'Deterministic typing, exhaustive automated tests, Docker multi-stage builds, and zero-compromise documentation.',
    },
    {
      id: 'no-black-boxes',
      index: '03',
      title: 'No Black Boxes',
      description:
        'Modular architecture with clean abstraction barriers so your in-house engineering team can maintain and extend easily.',
    },
    {
      id: 'compute-economics',
      index: '04',
      title: 'Compute Economics',
      description:
        'Engineered with token efficiency, prompt-caching, and hardware memory saturation strategies to minimize cloud costs.',
    },
  ],
};
