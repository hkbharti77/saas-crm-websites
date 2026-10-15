// Client-side landing page data loader with local caching & instant fallbacks
import { API_BASE_URL } from '../config/apiConfig';

const CACHE_KEY = 'gyanvani_public_landing_page_v1';
let memoryCache = null;

// Cross-tab real-time sync with CMS Admin Portal
if (typeof window !== 'undefined' && window.BroadcastChannel) {
  try {
    const channel = new BroadcastChannel('gyanvani_cms_channel');
    channel.onmessage = (event) => {
      if (event.data?.type === 'LANDING_PAGE_PUBLISHED') {
        clearLandingPageCache();
        fetchLandingPageData({ force: true }).then((fresh) => {
          if (fresh && typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gyanvani:landing_page_updated', { detail: fresh }));
          }
        });
      }
    };
  } catch (_) {}
}

export function clearLandingPageCache() {
  memoryCache = null;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      sessionStorage.removeItem(CACHE_KEY);
    } catch (_) {}
  }
}

export async function fetchLandingPageData(options = {}) {
  const { force = false } = options;

  // 1. Check memory cache first (unless forced)
  if (!force && memoryCache) {
    return memoryCache;
  }

  // 2. Check session storage cache for sub-5ms render (unless forced)
  if (!force && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        memoryCache = parsed;
        // Revalidate in background asynchronously
        refreshLandingPageDataInBackground();
        return parsed;
      }
    } catch (e) {
      // Ignore sessionStorage read errors
    }
  }

  // 3. Network fetch
  try {
    const cacheBuster = `?_t=${Date.now()}`;
    const res = await fetch(`${API_BASE_URL}/api/public/landing-page${cacheBuster}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      memoryCache = data;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch (_) {}
      }
      return data;
    }
  } catch (err) {
    console.warn('Landing page dynamic fetch notice (using defaults):', err.message);
  }

  return null;
}

export async function refreshLandingPageDataInBackground() {
  try {
    const cacheBuster = `?_t=${Date.now()}`;
    const res = await fetch(`${API_BASE_URL}/api/public/landing-page${cacheBuster}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const fresh = await res.json();
      const previousVersion = memoryCache?.version;
      const previousTimestamp = memoryCache?.publishedAt;

      memoryCache = fresh;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        } catch (_) {}
      }

      // If version or published content changed, notify live page components to re-render immediately!
      if (
        typeof window !== 'undefined' &&
        (previousVersion !== fresh.version || previousTimestamp !== fresh.publishedAt)
      ) {
        window.dispatchEvent(new CustomEvent('gyanvani:landing_page_updated', { detail: fresh }));
      }
    }
  } catch (_) {
    // Silent background revalidation failure
  }
}
