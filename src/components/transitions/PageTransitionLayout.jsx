import React, { useState, useCallback } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import AOS from 'aos';
import { getPageEnterVariants } from './transitionConfig';

/**
 * Freezes the outgoing route element during its brief 80ms fade-out so
 * AnimatePresence never flashes incoming content inside an exiting wrapper.
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

/**
 * Framer Motion AnimatePresence Page Transition Layout
 * - Preserves instant first-paint LCP (initial={false}).
 * - Wraps main route content in AnimatePresence for crisp 80ms fade-out ->
 *   150ms fade-in + subtle 8px upward lift across all page switches.
 * - Resets scroll cleanly on exit completion and clears transform at rest
 *   so native position: sticky works on every child page.
 */
export default function PageTransitionLayout() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const variants = getPageEnterVariants(prefersReducedMotion);

  const handleExitComplete = useCallback(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  const handleAnimationComplete = useCallback((definition) => {
    if (definition !== 'animate') return;
    requestAnimationFrame(() => {
      try {
        AOS.refresh();
      } catch {
        /* ignore */
      }
    });
  }, []);

  return (
    <div className="page-transition-viewport">
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={handleExitComplete}
      >
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          onAnimationComplete={handleAnimationComplete}
          className="page-transition-wrapper"
        >
          <FrozenOutlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
