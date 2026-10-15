/**
 * Centralized Backend & API Configuration for GyanVaniAi Storefront
 * Reads exclusively from environment variables (import.meta.env)
 */

export const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_CMS_API_URL ||
  'http://localhost:5000'
).replace(/\/+$/, '');

export const API_BASE_URL = BACKEND_URL;

/**
 * Returns full URL for an API endpoint
 * @param {string} endpoint - Path such as '/api/public/landing-page'
 * @returns {string} Fully qualified URL
 */
export function getApiUrl(endpoint = '') {
  if (!endpoint) return BACKEND_URL;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BACKEND_URL}${cleanEndpoint}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  getApiUrl,
};
