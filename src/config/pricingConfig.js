import { Zap, BarChart2, Globe, Building2, PhoneCall, Bot, Mic } from 'lucide-react';

/**
 * Single source of truth for pricing page content.
 * Shape follows the PRD "Plan Configuration" section:
 * { plan, price, currency, interval, limits { team_members, contacts, emails,
 *   tickets, wa_campaigns, ai_interactions, voice_minutes, calling_minutes,
 *   virtual_numbers } }
 * Values here are display config; in production they are managed from the
 * admin pricing screen, not hardcoded in components.
 *
 * features is grouped: [{ category, items: [{ label, included, desc?, icon? }] }]
 * so cards can render small uppercase category labels. Voice items carry
 * distinct icons + one-line descriptions to separate Voice Bot Assistant
 * (inbound) from AI Calling Agent (outbound).
 */
export const PRICING_CONFIG = {
  currency: 'INR',
  interval: 'month',
  yearlyDiscountPct: 20,
  usageDisclaimer:
    'Voice, calling, WhatsApp messaging, email delivery and AI usage include the allowances shown above. Additional usage may be charged separately depending on the service and provider.',
  complianceNote:
    'Calling and messaging features must be used lawfully. Customers are responsible for obtaining required consent and complying with applicable telecom, messaging, Meta and third-party provider policies.',
  plans: [
    {
      plan: 'starter',
      name: 'Starter',
      tagline: 'For small businesses starting with AI-powered CRM and WhatsApp.',
      seoTitle: 'Starter Plan: ₹1,999/mo AI CRM & WhatsApp | Gyan VaniAi',
      seoDescription:
        'Gyan VaniAi Starter plan at ₹1,999 per month: 3 team members, 5,000 contacts, WhatsApp campaigns, email campaign studio, AI RAG Knowledge Base chatbot, and 100 Voice Bot Assistant minutes. Add an AI Calling Agent from ₹999.',
      icon: Zap,
      accentColor: '#19D3C5',
      isPopular: false,
      isContactUs: false,
      cta: 'Get Started Free',
      price: { monthlyInr: 1999, yearlyInr: 1599, monthlyUsd: 19, yearlyUsd: 15 },
      limits: {
        team_members: 3,
        contacts: 5000,
        emails: 2000,
        tickets: 200,
        wa_campaigns: 2,
        ai_interactions: 2000,
        voice_minutes: 100,
        calling_minutes: 0,
        virtual_numbers: 1,
      },
      limitChips: [
        '3 Team Members',
        '5,000 Contacts',
        '2,000 Emails/mo',
        '200 Tickets/mo',
        '2 WhatsApp Campaigns/mo',
        '2,000 AI Interactions/mo',
        '100 Voice Bot minutes/month',
        '1 Virtual Number',
      ],
      features: [
        {
          category: 'Core Platform',
          items: [
            { label: 'Unified Inbox', included: true },
            { label: 'WhatsApp + WebChat', included: true },
            { label: 'Contact Management', included: true },
            { label: 'Kanban Sales Pipeline', included: true },
            { label: 'API & Webhooks', included: false },
          ],
        },
        {
          category: 'AI & Automation',
          items: [
            { label: 'AI RAG Knowledge Base', included: true },
            { label: 'AI Chatbot', included: true },
            { label: 'Automation', included: true },
            { label: 'AI Workflows', included: false },
          ],
        },
        {
          category: 'Messaging',
          items: [
            { label: 'WhatsApp Business API', included: true },
            { label: 'WhatsApp Campaigns', included: true },
            { label: 'Email Campaign Studio', included: true },
            { label: 'WhatsApp Payments', included: false },
          ],
        },
        {
          category: 'Voice',
          items: [
            {
              label: 'AI Voice Bot Assistant',
              included: true,
              icon: Mic,
              desc: 'AI assistant for inbound customer conversations.',
            },
            {
              label: 'AI Calling Agent',
              included: false,
              icon: PhoneCall,
              desc: 'AI agent for lead qualification, follow-ups and business calling.',
            },
          ],
        },
        {
          category: 'Analytics',
          items: [
            { label: 'Basic Analytics', included: true },
            { label: 'Reports', included: false },
          ],
        },
      ],
    },
    {
      plan: 'growth',
      name: 'Growth',
      tagline: 'For growing sales and support teams.',
      seoTitle: 'Growth Plan ₹4,999/mo: AI CRM + Calling Agent | Gyan VaniAi',
      seoDescription:
        'Gyan VaniAi Growth plan at ₹4,999 per month: 10 team members, 25,000 contacts, WhatsApp payments, AI workflows, 500 Voice Bot Assistant minutes, and a 250-minute AI Calling Agent with recording, transcription, and AI summaries.',
      icon: BarChart2,
      accentColor: '#19D3C5',
      isPopular: true,
      isContactUs: false,
      cta: 'Start Free Trial',
      price: { monthlyInr: 4999, yearlyInr: 3999, monthlyUsd: 59, yearlyUsd: 47 },
      limits: {
        team_members: 10,
        contacts: 25000,
        emails: 10000,
        tickets: 1000,
        wa_campaigns: 10,
        ai_interactions: 10000,
        voice_minutes: 500,
        calling_minutes: 250,
        virtual_numbers: 1,
      },
      limitChips: [
        '10 Team Members',
        '25,000 Contacts',
        '10,000 Emails/mo',
        '1,000 Tickets/mo',
        '10 WhatsApp Campaigns/mo',
        '10,000 AI Interactions/mo',
        '500 Voice Bot minutes/month',
        '250 Calling Agent minutes/month',
        '1 Virtual Number',
      ],
      featureNote: 'Everything in Starter, plus',
      features: [
        {
          category: 'Core Platform',
          items: [
            { label: 'Advanced Lead Segmentation', included: true },
            { label: 'Custom Branding', included: true },
            { label: 'API & Webhooks', included: true },
            { label: 'Custom Domain', included: false },
            { label: 'Full White-label', included: false },
          ],
        },
        {
          category: 'AI & Automation',
          items: [
            { label: 'AI Workflows', included: true },
            { label: 'Advanced Automation', included: true },
          ],
        },
        {
          category: 'Messaging',
          items: [{ label: 'WhatsApp Payments', included: true }],
        },
        {
          category: 'Voice',
          items: [
            {
              label: 'AI Calling Agent',
              included: true,
              icon: PhoneCall,
              desc: 'AI agent for lead qualification, follow-ups and business calling.',
            },
            { label: 'Call Recording, Transcription & AI Call Summary', included: true },
            { label: 'CRM Call Integration', included: true },
            { label: 'Multiple AI Voice Bot Assistants & Advanced IVR', included: false },
          ],
        },
        {
          category: 'Analytics',
          items: [
            { label: 'Advanced Analytics', included: true },
            { label: 'Reports', included: true },
          ],
        },
      ],
    },
    {
      plan: 'scale',
      name: 'Scale',
      tagline: 'For high-volume sales, support and automation.',
      seoTitle: 'Scale Plan ₹9,999/mo for High-Volume Teams | Gyan VaniAi',
      seoDescription:
        'Gyan VaniAi Scale plan at ₹9,999 per month: 30 team members, 100,000 contacts, unlimited tickets and campaign creation, 2,000 Voice Bot Assistant minutes, 1,000 AI Calling Agent minutes, advanced IVR, call routing, and audit logs.',
      icon: Globe,
      accentColor: '#2563EB',
      isPopular: false,
      isContactUs: false,
      cta: 'Start Free Trial',
      cardNote: 'Built for high-volume operations',
      price: { monthlyInr: 9999, yearlyInr: 7999, monthlyUsd: 119, yearlyUsd: 95 },
      limits: {
        team_members: 30,
        contacts: 100000,
        emails: 50000,
        tickets: 'unlimited',
        wa_campaigns: 'unlimited',
        ai_interactions: 50000,
        voice_minutes: 2000,
        calling_minutes: 1000,
        virtual_numbers: 3,
      },
      limitChips: [
        '30 Team Members',
        '100,000 Contacts',
        '50,000 Emails/mo',
        'Unlimited Tickets',
        'Unlimited Campaign Creation',
        '50,000 AI Interactions/mo',
        '2,000 Voice Bot minutes/month',
        '1,000 Calling Agent minutes/month',
        '3 Virtual Numbers',
      ],
      featureNote: 'Everything in Growth, plus',
      features: [
        {
          category: 'Core Platform',
          items: [
            { label: 'Audit Logs', included: true },
            { label: 'Custom Domain', included: true },
            { label: 'Priority Support', included: true },
            { label: 'SSO / SAML & Advanced RBAC', included: false },
          ],
        },
        {
          category: 'AI & Automation',
          items: [{ label: 'Advanced AI Automation', included: true }],
        },
        {
          category: 'Voice',
          items: [
            { label: 'Multiple AI Voice Bot Assistants', included: true, icon: Mic },
            { label: 'Multiple AI Calling Agents', included: true, icon: PhoneCall },
            { label: 'Advanced IVR & Call Routing', included: true },
          ],
        },
        {
          category: 'Analytics',
          items: [
            { label: 'Advanced Call Analytics', included: true },
            { label: 'Reports & AI Insights', included: true },
          ],
        },
      ],
    },
    {
      plan: 'enterprise',
      name: 'Enterprise',
      tagline: 'Bespoke infrastructure, security and dedicated support.',
      seoTitle: 'Enterprise Plan: Custom AI CRM Pricing | Gyan VaniAi',
      seoDescription:
        'Gyan VaniAi Enterprise plan with custom usage limits: SSO/SAML, advanced RBAC, audit logs, SLA, dedicated support, custom integrations, dedicated infrastructure option, full white-label, onboarding, and migration assistance.',
      icon: Building2,
      accentColor: '#c9a45c',
      isPopular: false,
      isContactUs: true,
      cta: 'Contact Sales',
      price: null,
      limits: {
        team_members: 'custom',
        contacts: 'custom',
        emails: 'custom',
        tickets: 'custom',
        wa_campaigns: 'custom',
        ai_interactions: 'custom',
        voice_minutes: 'custom',
        calling_minutes: 'custom',
        virtual_numbers: 'custom',
      },
      limitChips: [
        'Custom Team Members',
        'Custom Contacts',
        'Custom Email Volume',
        'Custom AI Usage',
        'Custom Voice Usage',
        'Custom Calling Usage',
        'Multiple Virtual Numbers',
      ],
      featureNote: 'Everything in Scale, plus',
      features: [
        {
          category: 'Security & Access',
          items: [
            { label: 'SSO / SAML', included: true },
            { label: 'Advanced RBAC', included: true },
            { label: 'Audit Logs', included: true },
          ],
        },
        {
          category: 'Support & SLA',
          items: [
            { label: 'SLA', included: true },
            { label: 'Dedicated Support', included: true },
            { label: 'Custom Onboarding & Migration', included: true },
          ],
        },
        {
          category: 'Platform & Infrastructure',
          items: [
            { label: 'Custom Integrations', included: true },
            { label: 'Dedicated Infrastructure', included: true },
            { label: 'Full White-label', included: true },
          ],
        },
      ],
    },
  ],
  addons: [
    {
      id: 'calling-agent',
      name: 'AI Calling Agent Add-on',
      icon: PhoneCall,
      accentColor: '#2563EB',
      priceInr: 999,
      priceUsd: 12,
      blurb: 'AI agent for lead qualification, follow-ups and business calling.',
      includes: [
        '1 AI Calling Agent',
        '1 Virtual Number',
        '250 Calling Agent minutes/month',
        'Call Recording',
        'Call Transcription',
        'AI Call Summary',
        'CRM Integration',
      ],
      cta: 'Add Calling Agent',
    },
    {
      id: 'voice-bot',
      name: 'Voice Bot Add-on',
      icon: Bot,
      accentColor: '#19D3C5',
      priceInr: 499,
      priceUsd: 6,
      blurb: 'AI assistant for inbound customer conversations.',
      includes: [
        '1 AI Voice Bot Assistant',
        '100 Voice Bot minutes/month',
        'RAG Knowledge Integration',
        'Call History',
        'Basic Transcription',
      ],
      cta: 'Add Voice Bot',
    },
  ],
  addonsNote:
    'Additional usage is billed separately according to the applicable service and provider.',
  faqs: [
    {
      q: 'Is WhatsApp messaging included?',
      a: 'Every plan includes WhatsApp functionality and campaign capabilities. Meta conversation and messaging charges are billed separately by Meta at cost, with no markup from us.',
    },
    {
      q: 'Are voice calls unlimited?',
      a: 'No. Each plan includes a set monthly allowance of Voice Bot Assistant minutes and, from Growth onward, AI Calling Agent minutes. You can extend either with an add-on, and additional usage is billed separately according to the applicable service and provider.',
    },
    {
      q: 'What is Voice Bot Assistant?',
      a: 'The AI Voice Bot Assistant is an inbound AI customer assistant. When a customer calls your connected business number, it answers, understands the caller, responds from your AI RAG Knowledge Base, creates tickets and leads, updates your CRM, and transfers to a human when needed.',
    },
    {
      q: 'What is Calling Agent?',
      a: 'The AI Calling Agent runs outbound business calling workflows: calling new leads, introducing your business, qualifying the lead, asking configured questions, booking appointments, and updating your CRM. Usage is subject to applicable laws, consent requirements, and provider policies.',
    },
    {
      q: 'Can I buy Calling Agent without upgrading?',
      a: 'Yes. The AI Calling Agent add-on gives you one agent, one virtual number, and 250 Calling Agent minutes per month on any plan, including Starter.',
    },
    {
      q: 'What happens when I reach my limit?',
      a: 'We warn you at 80% and again at 90% of any allowance. At 100% you can upgrade your plan, activate an add-on, or continue with metered overage where enabled. We never block you without explaining why.',
    },
    {
      q: 'Can I change my plan?',
      a: 'Yes. You can upgrade or downgrade at any time from your workspace settings. Changes apply to future billing per the subscription terms.',
    },
    {
      q: 'Can I cancel?',
      a: 'Yes, according to the subscription terms. Your data export options are described in our privacy policy.',
    },
  ],
};

export function formatPrice(amount, currency) {
  if (amount === null || amount === undefined) return null;
  if (currency === 'INR') return `₹${Number(amount).toLocaleString('en-IN')}`;
  return `$${amount}`;
}
