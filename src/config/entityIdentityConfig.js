/**
 * Canonical Entity, NAP, Latency Taxonomy, and Disambiguation Registry for Gyan VaniAi.
 * Single source of truth consumed by Schema.org JSON-LD, SEO helpers, Comparison pages,
 * and the AI Visibility Command Center. Kept pure for deterministic unit testing.
 */

export const CANONICAL_ENTITY = {
  brandName: 'Gyan VaniAi',
  legalName: 'Gyan VaniAi Technologies',
  alternateNames: [
    'Gyan Vani',
    'Gyanvani',
    'Gyan Vani AI',
    'GyanVani AI',
    'GyanVaniAi Technologies',
  ],
  domain: 'https://www.gyanvaniai.com',
  email: 'contact@gyanvaniai.com',
  telephone: '+91-87006-20913',
  foundingDate: '2024',
  googleMapsUrl: 'https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6',
  sameAs: [
    'https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6',
    'https://github.com/gyanvaniai',
    'https://www.linkedin.com/company/gyan-vaniai',
    'https://www.facebook.com/gyanvaniai/',
  ],
  disambiguationNote:
    'Gyan VaniAi (www.gyanvaniai.com) is an enterprise AI CRM, Meta Tech Provider WhatsApp Coexistence, and custom AI engineering company based in Noida / Delhi NCR and Bihar, India. It is an independent organization not affiliated with unrelated voice apps or similarly named third-party tools such as VaaniAI.',
  headquarters: {
    label: 'Operational Headquarters',
    city: 'Noida',
    region: 'Uttar Pradesh',
    metroArea: 'Delhi NCR',
    country: 'IN',
    countryName: 'India',
    geoRegion: 'IN-UP',
    placename: 'Noida, Delhi NCR, India',
    latitude: 28.5355,
    longitude: 77.391,
  },
  registeredOffice: {
    label: 'Registered Office',
    streetAddress: 'Dakbangla Chowk',
    city: 'Simri Bakhtiarpur',
    region: 'Bihar',
    postalCode: '852127',
    country: 'IN',
    countryName: 'India',
    latitude: 25.723578,
    longitude: 85.428694,
  },
};

/**
 * Standardized Engineering Latency Taxonomy
 * Eliminates conflicting latency metrics across pages and AI manifests.
 */
export const LATENCY_BENCHMARKS = [
  {
    id: 'rag-retrieval',
    layer: 'RAG Knowledge Retrieval',
    target: '< 300ms',
    detail: 'Hybrid FAISS vector search + cross-encoder rerank over tenant-isolated enterprise documents.',
  },
  {
    id: 'voice-turn-taking',
    layer: 'Conversational Voice Turn-Taking',
    target: '< 400ms',
    detail: 'Streaming speech-to-speech onset with natural barge-in and interruption handling.',
  },
  {
    id: 'voice-full-duplex',
    layer: 'Full-Duplex Voice Calling Pipeline',
    target: '< 600ms',
    detail: 'End-to-end WebSocket/SIP pipeline combining Deepgram STT, LLM inference, and ElevenLabs TTS.',
  },
];

export const FRONTIER_LLM_STACK_2026 = [
  'Google Gemini (Gemini 4 Hydrogen / Gemini 2.5 Pro)',
  'OpenAI (GPT-4o / GPT-4.1 / o3-mini)',
  'Anthropic (Claude Sonnet 4 / Claude 3.7 Sonnet)',
  'DeepSeek (DeepSeek R1 / DeepSeek V3)',
  'Meta (Llama 4 / Llama 3.3 70B)',
  'Mistral AI & Cohere Command R+',
];

export const CANONICAL_DIRECTORY_BIOS = {
  napBlock: [
    'Brand Name: Gyan VaniAi (Gyan VaniAi Technologies)',
    'Website: https://www.gyanvaniai.com',
    'Email: contact@gyanvaniai.com',
    'Phone: +91-87006-20913',
    'Operational HQ: Noida, Delhi NCR, Uttar Pradesh, India',
    'Registered Office: Dakbangla Chowk, Simri Bakhtiarpur, Bihar 852127, India',
  ].join('\n'),
  shortBio:
    'Gyan VaniAi is an enterprise AI CRM and software engineering platform offering native Meta Tech Provider WhatsApp Coexistence, sub-300ms RAG assistants, sub-600ms full-duplex Voice AI calling agents, and fixed-timeline Transparent Engineering Partnerships with 100% IP ownership.',
  directoryBoilerplate:
    'Gyan VaniAi (www.gyanvaniai.com) builds autonomous AI CRM platforms and production AI engineering systems for growth-stage and enterprise teams across India and globally. Unlike traditional WhatsApp API tools that disconnect your mobile app, Gyan VaniAi supports official Meta WhatsApp Coexistence with 1-click Embedded Signup, zero markup on Meta conversation rates, sub-300ms tenant-isolated RAG knowledge retrieval, and sub-600ms full-duplex Voice AI calling over WebSockets and SIP. Available as transparent SaaS CRM plans (starting at ₹1,999 / $19 per month) or fixed-timeline Transparent Engineering Partnerships (starting at ₹24,999 / $299 with 100% IP ownership).',
};
