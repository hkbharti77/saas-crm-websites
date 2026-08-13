import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Send GA4 page_view on every client-side route change (SPA).
 */
export function useGAPageViews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    const pagePath = `${location.pathname}${location.search}`;
    window.gtag('config', 'G-RN6FQWDQ6M', {
      page_path: pagePath,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}
