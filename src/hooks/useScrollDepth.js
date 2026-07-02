import { useEffect, useRef } from 'react';
import { trackScroll50, trackScroll90 } from '../utils/analytics';

/**
 * useScrollDepth
 *
 * Fires analytics events at 50% and 90% scroll depth milestones.
 * Uses a passive scroll listener with refs to ensure each milestone
 * fires only once per page load (not per component mount).
 */
export function useScrollDepth() {
  const fired50 = useRef(false);
  const fired90 = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const pct = (scrollTop / docHeight) * 100;

      if (!fired50.current && pct >= 50) {
        fired50.current = true;
        trackScroll50();
      }

      if (!fired90.current && pct >= 90) {
        fired90.current = true;
        trackScroll90();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
