import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ALLOWED_QUERY_KEYS = new Set(['page', 'tab', 'sort', 'filter']);

// PII & Sensitive Identifiers
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const UUID_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
const HEX_TOKEN_REGEX = /\b[0-9a-fA-F]{24,64}\b/g;
const PHONE_INTL_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const PHONE_IN_REGEX = /(?:\+?91[-.\s]?)?[6-9]\d{9}\b/g;
const CARD_NUM_REGEX = /\b(?:\d{4}[-\s]?){3}\d{1,4}\b|\b\d{13,19}\b/g;
const BASE64_TOKEN_REGEX = /\b[A-Za-z0-9+/=]{28,}\b/g;

// Sensitive keyword markers in path segments
const SENSITIVE_PATH_KEYWORDS = /(?:password|secret|token|bearer|apikey|api_key|credential|auth|session|ssn|aadhaar|pan|license)/i;

/**
 * Redacts personal data, telephone numbers, card numbers, tokens, and credentials from string payloads
 */
export function redactPII(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(EMAIL_REGEX, '[redacted_email]')
    .replace(UUID_REGEX, '[redacted_id]')
    .replace(HEX_TOKEN_REGEX, '[redacted_token]')
    .replace(BASE64_TOKEN_REGEX, '[redacted_token]')
    .replace(CARD_NUM_REGEX, '[redacted_num]')
    .replace(PHONE_INTL_REGEX, '[redacted_phone]')
    .replace(PHONE_IN_REGEX, '[redacted_phone]');
}

/**
 * Validates individual query values against strict semantic schemas
 */
function isSafeQueryValue(key, val) {
  if (typeof val !== 'string' || !val) return false;
  const trimmed = val.trim();
  if (trimmed.length > 32) return false;

  // Block any value containing sensitive marker keywords or symbols
  if (SENSITIVE_PATH_KEYWORDS.test(trimmed)) return false;
  if (/[:;@%<>{}[\]\\^`~|]/.test(trimmed)) return false;

  switch (key) {
    case 'page':
      // Must be numeric page number (1 to 9999)
      return /^\d{1,4}$/.test(trimmed);
    case 'tab':
    case 'sort':
    case 'filter':
      // Must be alphanumeric slug with hyphens or underscores
      return /^[a-zA-Z0-9_-]{1,32}$/.test(trimmed);
    default:
      return false;
  }
}

/**
 * Enforces strict multi-tier data minimization:
 * 1. Sanitizes path segments (path-traversal elimination, dynamic ID redaction, PII regex)
 * 2. Transmits only explicitly allowlisted query keys with strict type validation
 */
export function sanitizeUrlPath(pathname, search) {
  if (!pathname || typeof pathname !== 'string') pathname = '/';

  // Normalize path and eliminate path traversal attacks
  const rawSegments = pathname
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .split('/')
    .filter(Boolean);

  const cleanSegments = rawSegments.map((segment) => {
    // If the segment contains sensitive keywords or high-entropy tokens, redact it
    if (SENSITIVE_PATH_KEYWORDS.test(segment)) {
      return '[redacted_sensitive]';
    }
    return redactPII(segment);
  });

  const safePathname = '/' + cleanSegments.join('/');

  if (!search) return safePathname;

  try {
    const params = new URLSearchParams(search);
    const cleanParams = new URLSearchParams();

    for (const [key, val] of params.entries()) {
      const lowerKey = key.toLowerCase();
      if (ALLOWED_QUERY_KEYS.has(lowerKey) && isSafeQueryValue(lowerKey, val)) {
        cleanParams.set(lowerKey, redactPII(val.trim()));
      }
    }

    const queryStr = cleanParams.toString();
    return queryStr ? `${safePathname}?${queryStr}` : safePathname;
  } catch {
    return safePathname;
  }
}

export function useGAPageViews() {
  const location = useLocation();
  const lastDispatchedRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    const safePath = sanitizeUrlPath(location.pathname, location.search);
    const safeTitle = redactPII(document.title || 'Gyan VaniAi');

    // Prevent duplicate events on React StrictMode double-mounts & identical route re-renders
    if (lastDispatchedRef.current === safePath) return;
    lastDispatchedRef.current = safePath;

    window.gtag('event', 'page_view', {
      page_path: safePath,
      page_title: safeTitle,
    });
  }, [location.pathname, location.search]);
}
