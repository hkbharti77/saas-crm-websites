/**
 * Validate CTA destination URL to prevent XSS / malicious schemes.
 */
export function validateCtaUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();

  // Reject unsafe protocol schemes
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '';
  }

  // Allow safe relative paths or https URLs
  if (trimmed.startsWith('/') || trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  return '';
}

export const CTA_TYPES = [

  { id: 'book_demo', label: 'Book Demo' },
  { id: 'contact_us', label: 'Contact Us' },
  { id: 'get_started', label: 'Get Started' },
  { id: 'request_consultation', label: 'Request Consultation' },
  { id: 'newsletter', label: 'Newsletter Signup' },
  { id: 'download', label: 'Download Guide' },
  { id: 'learn_more', label: 'Learn More' },
];

export const CATEGORY_DEFAULT_CTAS = {
  AI: {
    ctaType: 'get_started',
    ctaTitle: 'Build Enterprise AI Workflows with Gyan VaniAi',
    ctaDescription: 'Deploy autonomous AI agents and multi-LLM orchestration pipelines customized for your operations.',
    ctaLabel: 'Start Building',
    ctaUrl: '/services/ai-development',
  },
  Automation: {
    ctaType: 'book_demo',
    ctaTitle: 'Automate Customer Operations at Scale',
    ctaDescription: 'See how Gyan VaniAi connects WhatsApp, CRM, and voice workflows with zero latency.',
    ctaLabel: 'Book Automation Demo',
    ctaUrl: '/services/sales-automation',
  },
  WhatsApp: {
    ctaType: 'book_demo',
    ctaTitle: 'Unlock WhatsApp Coexistence for Your CRM',
    ctaDescription: 'Keep your existing phone numbers while supercharging sales teams with AI calling agents.',
    ctaLabel: 'Explore WhatsApp Coexistence',
    ctaUrl: '/services/whatsapp-coexistence',
  },
};

/**
 * Resolve effective CTA configuration for a given post.
 * Checks per-article custom CTA first, then category default, then fallback.
 */
export function resolveEffectiveCta(post = {}) {
  if (!post) return null;

  if (post.ctaType || post.ctaUrl || post.ctaTitle) {
    return {
      ctaType: post.ctaType || 'book_demo',
      ctaTitle: post.ctaTitle || '',
      ctaDescription: post.ctaDescription || '',
      ctaLabel: post.ctaLabel || '',
      ctaUrl: validateCtaUrl(post.ctaUrl),
      ctaPosition: post.ctaPosition || 'end',
    };
  }

  // Category default lookup
  const categoryDefault = post.category ? CATEGORY_DEFAULT_CTAS[post.category] : null;
  if (categoryDefault) {
    return {
      ...categoryDefault,
      ctaPosition: 'end',
    };
  }

  // Ultimate fallback
  return {
    ctaType: 'book_demo',
    ctaTitle: 'Ready to Transform Your Workflow?',
    ctaDescription: 'Join hundreds of enterprises automating operations with AI agents and intelligent CRM pipelines.',
    ctaLabel: 'Book a Free Demo',
    ctaUrl: '',
    ctaPosition: 'end',
  };
}

/**
 * Deterministically resolve A/B CTA variant (Variant A or Variant B)
 * using anonymous session/blog hash without user tracking.
 * @param {string} blogId
 * @returns {'CTA_A' | 'CTA_B'}
 */
export function resolveAbCtaVariant(blogId = '') {
  if (typeof window === 'undefined' || !blogId) return 'CTA_A';

  try {
    // Generate deterministic hash code from blogId string
    let hash = 0;
    for (let i = 0; i < blogId.length; i++) {
      hash = (hash << 5) - hash + blogId.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 2 === 0 ? 'CTA_A' : 'CTA_B';
  } catch {
    return 'CTA_A';
  }
}
