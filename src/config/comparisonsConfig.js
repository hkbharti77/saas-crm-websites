import { formatDualCurrencyPrice } from '../utils/formatPricing';

/**
 * Pure structured data for /compare Hub and head-to-head GEO Comparison pages.
 * Designed for Answer-First extraction (<= 40-word executive verdicts), honest
 * trade-offs, and structured FAQPage / ItemList JSON-LD generation.
 */

export const COMPARISON_CATEGORIES = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'whatsapp', label: 'WhatsApp & Coexistence' },
  { id: 'ai-voice', label: 'AI & Voice Agents' },
  { id: 'pricing-ip', label: 'Pricing & IP Ownership' },
];

export const CURRENCY_DISPLAY_MODES = [
  { id: 'dual', label: 'Dual (INR / USD)' },
  { id: 'inr', label: 'INR (₹)' },
  { id: 'usd', label: 'USD ($)' },
];

export function formatComparisonPrice(priceObj, mode = 'dual') {
  if (!priceObj) return 'Custom Scope';
  if (typeof priceObj === 'string') return priceObj;
  const { inr, usd, suffix = '' } = priceObj;
  if (mode === 'inr' && inr != null) {
    return `${formatDualCurrencyPrice(inr, null)}${suffix}`;
  }
  if (mode === 'usd' && usd != null) {
    return `${formatDualCurrencyPrice(null, usd)}${suffix}`;
  }
  return `${formatDualCurrencyPrice(inr, usd, { fallback: 'Custom Scope' })}${suffix}`;
}

export const WHATSAPP_CRM_COMPARISON = {
  slug: 'wati-vs-respond-io-vs-gyanvaniai',
  path: '/compare/wati-vs-respond-io-vs-gyanvaniai',
  eyebrow: 'WhatsApp AI CRM Comparison',
  title: 'Gyan VaniAi vs. Wati vs. Respond.io vs. AiSensy (2026)',
  seoTitle: 'Gyan VaniAi vs Wati, Respond.io & AiSensy (2026) | Compare',
  seoDescription:
    'Compare Gyan VaniAi vs Wati, Respond.io, and AiSensy on Meta WhatsApp Coexistence, ₹1,999 / $19 pricing, sub-300ms RAG, Voice AI calling & IP ownership.',
  executiveVerdict:
    'Gyan VaniAi stands out from Wati, Respond.io, and AiSensy by combining native Meta WhatsApp Coexistence (keeping your mobile app active), zero markup on Meta conversation rates, sub-300ms RAG chatbots, sub-600ms Voice AI calling, and optional 100% IP-owned custom engineering.',
  ctaLabel: 'Book a Comparison Walkthrough',
  ctaInquiryType: 'WhatsApp Coexistence & Multi-Agent CRM',
  ctaPrefill:
    'I reviewed the Gyan VaniAi vs. Wati / Respond.io / AiSensy comparison and want a technical walkthrough of WhatsApp Coexistence and pricing.',
  vendors: [
    { id: 'gyanvaniai', name: 'Gyan VaniAi', highlight: true },
    { id: 'wati', name: 'Wati', highlight: false },
    { id: 'respondio', name: 'Respond.io', highlight: false },
    { id: 'aisensy', name: 'AiSensy', highlight: false },
  ],
  matrixRows: [
    {
      id: 'starting-price',
      category: 'pricing-ip',
      feature: 'Entry SaaS Plan Pricing',
      values: {
        gyanvaniai: { inr: 1999, usd: 19, suffix: '/mo' },
        wati: { inr: 2499, usd: 49, suffix: '/mo (approx.)' },
        respondio: { inr: 6600, usd: 79, suffix: '/mo (Starter)' },
        aisensy: { inr: 1500, usd: 20, suffix: '/mo (Basic)' },
      },
    },
    {
      id: 'meta-markup',
      category: 'pricing-ip',
      feature: 'Meta Conversation Rate Markup',
      values: {
        gyanvaniai: '0% markup (direct Meta billing)',
        wati: 'Platform markup on conversation credits',
        respondio: '0% markup (higher base seat tiers)',
        aisensy: 'Small credit markup on lower tiers',
      },
    },
    {
      id: 'coexistence',
      category: 'whatsapp',
      feature: 'Official Meta WhatsApp Coexistence (Keep Phone App)',
      values: {
        gyanvaniai: 'Native 1-Click Embedded Signup, zero chat loss',
        wati: 'Traditional Cloud API migration default',
        respondio: 'Supported on select higher plans',
        aisensy: 'Cloud API focused; limited mobile coexistence',
      },
    },
    {
      id: 'rag-chatbot',
      category: 'ai-voice',
      feature: 'Enterprise Hybrid RAG Knowledge Assistant',
      values: {
        gyanvaniai: 'Included (< 300ms retrieval, PDF/DOCX/XLSX)',
        wati: 'Rule-based flows + add-on AI KnowBot',
        respondio: 'AI Assist & prompt agents on Growth+',
        aisensy: 'Flow builder + optional Dialogflow/GPT add-on',
      },
    },
    {
      id: 'voice-calling',
      category: 'ai-voice',
      feature: 'Full-Duplex Voice AI & WhatsApp Calling',
      values: {
        gyanvaniai: 'Native (< 400ms turn-taking, < 600ms full-duplex)',
        wati: 'Not native (chat-only platform)',
        respondio: 'WhatsApp voice calling beta; no native SIP AI stack',
        aisensy: 'Not native (chat & broadcast focus)',
      },
    },
    {
      id: 'india-workflows',
      category: 'whatsapp',
      feature: 'India-Ready Workflows (UPI, GST, DLT, Hinglish)',
      values: {
        gyanvaniai: 'Native UPI links, GST billing, DLT help & Hindi/English Voice',
        wati: 'India pricing + Razorpay/PayU plugins',
        respondio: 'Global focus; requires custom webhook middleware',
        aisensy: 'Strong India UPI & Razorpay integrations',
      },
    },
    {
      id: 'custom-ip',
      category: 'pricing-ip',
      feature: 'Custom Source Code & 100% IP Ownership Option',
      values: {
        gyanvaniai: 'Yes — Turnkey setups from ₹24,999 / $299 & 2-week sprints',
        wati: 'No (closed multi-tenant SaaS)',
        respondio: 'No (closed multi-tenant SaaS)',
        aisensy: 'No (closed multi-tenant SaaS)',
      },
    },
    {
      id: 'deployment',
      category: 'pricing-ip',
      feature: 'Self-Hosted / Single-Tenant Docker Deployment',
      values: {
        gyanvaniai: 'Supported via Engineering Partnerships & Enterprise',
        wati: 'Cloud-only SaaS',
        respondio: 'Cloud-only SaaS',
        aisensy: 'Cloud-only SaaS',
      },
    },
  ],
  decisionScenarios: [
    {
      title: 'Choose Gyan VaniAi when',
      summary:
        'You need official Meta WhatsApp Coexistence without wiping phone chats, want combined RAG chat + Voice AI calling in one CRM, or require a custom self-hosted codebase with 100% IP ownership.',
    },
    {
      title: 'Choose Wati or AiSensy when',
      summary:
        'You only run template-based WhatsApp marketing broadcasts for an e-commerce store and do not need custom CRM engineering, SIP telephony, or multi-tenant RAG pipelines.',
    },
    {
      title: 'Choose Respond.io when',
      summary:
        'You are a global support organization prioritizing out-of-the-box omnichannel inbox routing across Telegram, Messenger, and Viber with higher per-month software budgets.',
    },
  ],
  faqs: [
    {
      question: 'What is the best WhatsApp CRM alternative to Wati and Respond.io with mobile app coexistence?',
      answer:
        'Gyan VaniAi is built specifically around official Meta Tech Provider WhatsApp Coexistence, letting teams keep their WhatsApp Business mobile app active on the same number while running AI RAG replies, bulk broadcasts, and multi-agent CRM tracking with 0% Meta conversation markup.',
    },
    {
      question: 'Does Gyan VaniAi charge a markup on Meta WhatsApp conversation fees?',
      answer:
        'No. Gyan VaniAi passes through Meta Cloud API conversation charges at exact official Meta rates with zero platform markup, alongside transparent dual INR/USD software plans starting at ₹1,999 / $19 per month.',
    },
    {
      question: 'Can we own the source code instead of paying recurring SaaS fees forever?',
      answer:
        'Yes. Through Transparent Engineering Partnerships (Tier 01 turnkey setup at ₹24,999 / $299 in 5 business days, or Tier 02 14-day AI CRM & Voice sprint at ₹69,999 / $850), Gyan VaniAi delivers modular Dockerized codebases with 100% IP ownership.',
    },
  ],
};

export const CUSTOM_CRM_COMPARISON = {
  slug: 'custom-ai-crm-vs-off-the-shelf',
  path: '/compare/custom-ai-crm-vs-off-the-shelf',
  eyebrow: 'Build vs. Buy Architecture Comparison',
  title: 'Custom AI CRM Engineering vs. Off-the-Shelf SaaS CRMs (2026)',
  seoTitle: 'Custom AI CRM vs HubSpot, Salesforce & Zoho (2026) | Compare',
  seoDescription:
    'Compare fixed-timeline Custom AI CRM Sprints (₹24,999 / $299 to ₹69,999 / $850, 100% IP ownership) vs recurring per-seat SaaS CRMs like HubSpot and Zoho.',
  executiveVerdict:
    'Off-the-shelf CRMs penalize growing teams with escalating per-seat licenses and rigid workflows. Gyan VaniAi bridges the gap with fixed-timeline engineering sprints (starting at ₹24,999 / $299) delivering single-tenant AI CRM, Hybrid RAG, and Voice AI with 100% IP ownership.',
  ctaLabel: 'Scope a Custom Sprint',
  ctaInquiryType: 'Custom AI CRM Development',
  ctaPrefill:
    'I reviewed Custom AI CRM vs. Off-the-Shelf SaaS and want to discuss a fixed-timeline Transparent Engineering Partnership.',
  vendors: [
    { id: 'gyanvaniai', name: 'Gyan VaniAi Engineering', highlight: true },
    { id: 'hubspot', name: 'HubSpot / Salesforce', highlight: false },
    { id: 'zoho', name: 'Zoho CRM', highlight: false },
  ],
  matrixRows: [
    {
      id: 'cost-model',
      category: 'pricing-ip',
      feature: 'Pricing & Ownership Model',
      values: {
        gyanvaniai: { inr: 69999, usd: 850, suffix: ' / 2-week sprint (100% IP)' },
        hubspot: '$90–$165/seat/month recurring',
        zoho: '₹1,400–₹3,200/seat/month recurring',
      },
    },
    {
      id: 'ip-ownership',
      category: 'pricing-ip',
      feature: 'Source Code & Database Ownership',
      values: {
        gyanvaniai: '100% IP ownership, private PostgreSQL + Docker',
        hubspot: 'Vendor-locked SaaS; API rate limits',
        zoho: 'Vendor-locked SaaS; Deluge scripting constraints',
      },
    },
    {
      id: 'whatsapp-native',
      category: 'whatsapp',
      feature: 'WhatsApp Coexistence & Broadcast Engine',
      values: {
        gyanvaniai: 'Built-in Meta Cloud API + Redis rate-limited broadcaster',
        hubspot: 'Requires paid third-party marketplace connectors',
        zoho: 'Add-on connectors with per-message middleware fees',
      },
    },
    {
      id: 'voice-rag',
      category: 'ai-voice',
      feature: 'Sub-300ms RAG & Sub-600ms Voice AI',
      values: {
        gyanvaniai: 'Hybrid FAISS + Cross-Encoder RAG & Deepgram/ElevenLabs Voice',
        hubspot: 'Generic AI copilot; no custom SIP voice agents',
        zoho: 'Zia assistant; no full-duplex WebSocket voice pipeline',
      },
    },
    {
      id: 'delivery-speed',
      category: 'pricing-ip',
      feature: 'Time to Production Deployment',
      values: {
        gyanvaniai: '5 business days (Tier 01) or 14 calendar days (Tier 02)',
        hubspot: '4–12 weeks via paid implementation partners',
        zoho: '2–6 weeks configuration & customization',
      },
    },
    {
      id: 'operational-rigor',
      category: 'ai-voice',
      feature: 'Testing, Typing & Cloud Cost Control',
      values: {
        gyanvaniai: '>80% test coverage, prompt-caching, no black boxes',
        hubspot: 'Opaque platform internals & AI credit overages',
        zoho: 'Opaque platform internals',
      },
    },
  ],
  decisionScenarios: [
    {
      title: 'Choose a Gyan VaniAi Engineering Partnership when',
      summary:
        'Your team has 15+ reps, proprietary WhatsApp/Voice workflows, strict DPDP/enterprise data residency rules, or wants to eliminate compounding per-seat SaaS renewals.',
    },
    {
      title: 'Choose Gyan VaniAi SaaS CRM when',
      summary:
        'You want to start immediately with a 7-day free trial from ₹1,999 / $19 per month before commissioning custom microservices.',
    },
    {
      title: 'Choose HubSpot or Salesforce when',
      summary:
        'Your enterprise already standardizes on hundreds of legacy marketing-hub integrations and has dedicated RevOps admins managing those ecosystems.',
    },
  ],
  faqs: [
    {
      question: 'How much does a custom AI CRM & Voice AI sprint cost with Gyan VaniAi?',
      answer:
        'Gyan VaniAi offers transparent fixed-scope engagements: Tier 01 Meta WhatsApp & AI Helpdesk Setup is ₹24,999 / $299 (5 business days), Tier 02 AI CRM, Voice & Hybrid RAG Sprint is ₹69,999 / $850 (14 calendar days), and Tier 03 Full Enterprise AI & Meta Tech Suite is custom scoped over 4 to 8 weeks.',
    },
    {
      question: 'What are Gyan VaniAi Operational Invariants?',
      answer:
        'Every engagement guarantees four standards: 100% IP Ownership (source code and pipelines belong to you), Production Rigor (>80% automated tests and Docker builds), No Black Boxes (clean modular abstractions), and Compute Economics (token efficiency and prompt caching).',
    },
  ],
};

export const ALL_COMPARISONS = [WHATSAPP_CRM_COMPARISON, CUSTOM_CRM_COMPARISON];
