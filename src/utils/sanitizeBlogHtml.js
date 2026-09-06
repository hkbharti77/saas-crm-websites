import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content for blog rendering (Preview & Public article).
 * Prevents XSS attacks (e.g. <script>, onerror attributes, javascript: URLs)
 * while preserving safe semantic formatting (h2, h3, p, strong, em, ul, ol, blockquote, code, a, img).
 */
export function sanitizeBlogHtml(dirtyHtml) {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  if (typeof window !== 'undefined') {
    try {
      const purifier = typeof DOMPurify.sanitize === 'function' ? DOMPurify : DOMPurify(window);
      return purifier.sanitize(dirtyHtml, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
          'ul', 'ol', 'li',
          'blockquote', 'pre', 'code', 'hr', 'br',
          'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'width', 'height', 'loading', 'id'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
      });
    } catch (e) {
      console.warn('DOMPurify error, applying fallback sanitizer:', e);
    }
  }

  // Safe fallback for SSR or environments without window
  return dirtyHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s+on[a-z0-9_-]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\s+on[a-z0-9_-]+\s*=\s*'[^']*'/gi, '')
    .replace(/\s+on[a-z0-9_-]+\s*=\s*[^\s>]+/gi, '')
    .replace(/\s+href\s*=\s*["']\s*javascript:[^"']*["']/gi, ' href="#"')
    .replace(/\s+src\s*=\s*["']\s*javascript:[^"']*["']/gi, ' src="#"');
}
