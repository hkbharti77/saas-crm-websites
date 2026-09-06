import { slugify } from './slugify.js';

/**
 * Strips HTML tags and excessive whitespace from plain-text SEO fields.
 */
export function sanitizePlainText(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]*>/g, '') // Strip remaining HTML tags
    .replace(/[\r\n\t]+/g, ' ') // Collapse newlines
    .replace(/\s+/g, ' ') // Collapse spaces
    .trim();
}

/**
 * Validates a web URL strictly ensuring secure protocols (http/https)
 * and rejecting dangerous schemes like javascript:, data:, vbscript:.
 */
export function isValidWebUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim();
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Evaluates SEO Title length against industry best-practice recommendation (50-60 chars).
 */
export function getSeoTitleStatus(length) {
  if (length === 0) return { status: 'empty', label: 'Empty', color: '#94a3b8' };
  if (length < 30) return { status: 'too-short', label: 'Too short', color: '#f59e0b' };
  if (length <= 60) return { status: 'good', label: 'Good length', color: '#10b981' };
  return { status: 'too-long', label: 'Too long', color: '#ef4444' };
}

/**
 * Evaluates Meta Description length against industry recommendation (140-160 chars).
 */
export function getSeoDescriptionStatus(length) {
  if (length === 0) return { status: 'empty', label: 'Empty', color: '#94a3b8' };
  if (length < 80) return { status: 'too-short', label: 'Too short', color: '#f59e0b' };
  if (length <= 160) return { status: 'good', label: 'Good length', color: '#10b981' };
  return { status: 'too-long', label: 'Too long', color: '#ef4444' };
}

/**
 * Normalizes a tag string into a safe logical object:
 * { label: 'AI Automation', slug: 'ai-automation' }
 */
export function normalizeTag(tagStr) {
  const cleanLabel = sanitizePlainText(tagStr);
  if (!cleanLabel) return null;
  const slug = slugify(cleanLabel);
  if (!slug) return null;
  return {
    label: cleanLabel,
    slug: slug
  };
}
