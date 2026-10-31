import { useEffect, useRef } from 'react';
import { trackScroll50, trackScroll90 } from '../utils/analytics';

/**
 * useScrollDepth
 *
 * Fires analytics events at 50% and 90% scroll depth milestones.
 * Uses a passive, RAF-throttled scroll listener with refs to ensure each milestone
 * fires only once per page load without causing forced reflows.
 */
export function useScrollDepth() {
  const fired50 = useRef(false);
  const fired90 = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

          if (docHeight > 0) {
            const pct = (scrollTop / docHeight) * 100;

            if (!fired50.current && pct >= 50) {
              fired50.current = true;
              trackScroll50();
            }

            if (!fired90.current && pct >= 90) {
              fired90.current = true;
              trackScroll90();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
