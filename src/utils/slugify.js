/**
 * Standardized slug generation for URLs.
 * Requirements:
 * - lowercase
 * - spaces -> hyphens
 * - remove unsafe punctuation and special characters
 * - collapse duplicate hyphens
 * - trim leading/trailing hyphens
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove non-word characters except spaces and hyphens
    .replace(/[\s_]+/g, '-')     // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
}

/**
 * Validates whether a slug is well-formed.
 */
export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
