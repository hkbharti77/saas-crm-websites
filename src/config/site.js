/** Canonical production origin (www is the live primary host). */
export const SITE_ORIGIN = 'https://www.gyanvaniai.online';

export function siteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_ORIGIN}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
