/**
 * Centralized Backend & API Configuration for GyanVaniAi Storefront
 * Connects directly to production CMS backend or local development server
 */

export const PRODUCTION_CMS_BACKEND = 'https://api-cms.gyanvaniai.info';

const rawBackendUrl = (
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_CMS_API_URL ||
  ''
).trim().replace(/\/+$/, '');

function resolveBackendUrl() {
  const isBrowser = typeof window !== 'undefined';
  const isLocalHost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (rawBackendUrl) {
    // If on a live public domain in browser, never call localhost (prevents ERR_CONNECTION_REFUSED)
    if (isBrowser && !isLocalHost && (rawBackendUrl.includes('localhost') || rawBackendUrl.includes('127.0.0.1'))) {
      return PRODUCTION_CMS_BACKEND;
    }
    return rawBackendUrl;
  }

  // Local development fallback
  if (isBrowser && isLocalHost) {
    return 'http://localhost:5000';
  }

  // Live production storefront and SSG build fallback
  return PRODUCTION_CMS_BACKEND;
}

export const BACKEND_URL = resolveBackendUrl();
export const API_BASE_URL = BACKEND_URL;
export const IS_BACKEND_CONFIGURED = Boolean(BACKEND_URL);

/**
 * Returns full URL for an API endpoint
 * @param {string} endpoint - Path such as '/api/public/landing-page'
 * @returns {string} Fully qualified URL or empty string if not configured
 */
export function getApiUrl(endpoint = '') {
  const base = BACKEND_URL || PRODUCTION_CMS_BACKEND;
  if (!endpoint) return base;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  IS_BACKEND_CONFIGURED,
  PRODUCTION_CMS_BACKEND,
  getApiUrl,
};
