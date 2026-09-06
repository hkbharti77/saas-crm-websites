/**
 * searchConsoleService.js
 * Integration architecture adapter for Google Search Console data.
 *
 * RULES:
 * - Does NOT require production credentials during development.
 * - Displays "Search Console not connected" when unavailable.
 * - Does NOT fabricate fake Google metrics, search volume, or rankings when disconnected.
 */

export function getSearchConsoleStatus() {
  if (typeof window === 'undefined') return { connected: false, message: 'Search Console not connected' };

  // Check env variable or configured window state
  const isConnected = Boolean(
    (import.meta.env && import.meta.env.VITE_GSC_CONNECTED === 'true') ||
    (typeof window !== 'undefined' && window.__GSC_CONNECTED__ === true)
  );

  if (!isConnected) {
    return {
      connected: false,
      message: 'Search Console not connected',
      details: 'Connect your Google Search Console property in admin settings to enable impression, click, and keyword position tracking.',
    };
  }

  return {
    connected: true,
    message: 'Search Console connected',
    property: 'https://www.gyanvaniai.online/',
  };
}

/**
 * Fetch Search Console metrics for a date range (7d, 28d, 90d, custom).
 * Returns real data object or empty/disconnected structure.
 * @param {string} range - '7d' | '28d' | '90d'
 * @returns {Object}
 */
export async function getSearchConsoleMetrics(range = '28d') {
  const status = getSearchConsoleStatus();
  if (!status.connected) {
    return {
      connected: false,
      range,
      totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      queries: [],
      pages: [],
    };
  }

  // When genuinely connected, return real stored metrics object from window/DB
  const realData = (typeof window !== 'undefined' && window.__GSC_DATA__) || null;
  if (!realData) {
    return {
      connected: true,
      range,
      totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      queries: [],
      pages: [],
    };
  }

  return {
    connected: true,
    range,
    totals: realData.totals || { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    queries: realData.queries || [],
    pages: realData.pages || [],
  };
}
