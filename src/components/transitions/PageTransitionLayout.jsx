import React, { useState, useEffect } from 'react';
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import AOS from 'aos';
import { getBookPageVariants, getNavigationDirection } from './transitionConfig';

function FrozenOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);

  // Scroll to top upon entering a new route (if no anchor hash present)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return outlet;
}

export default function PageTransitionLayout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prefersReducedMotion = useReducedMotion();

  // State-driven navigation tracking compliant with React 19 rules
  const [navState, setNavState] = useState({
    activePath: location.pathname,
    prevPath: location.pathname,
    prevIdx: typeof window !== 'undefined' ? (window.history.state?.idx ?? 0) : 0,
    direction: 1,
  });

  // Adjust direction state during render phase on route navigation
  if (location.pathname !== navState.activePath) {
    const currentIdx = typeof window !== 'undefined' ? (window.history.state?.idx ?? 0) : 0;
    const newDir = getNavigationDirection({
      currentPath: location.pathname,
      prevPath: navState.activePath,
      navigationType,
      currentHistoryIdx: currentIdx,
      prevHistoryIdx: navState.prevIdx,
      explicitDirection: location.state?.direction,
    });

    setNavState({
      activePath: location.pathname,
      prevPath: navState.activePath,
      prevIdx: currentIdx,
      direction: newDir,
    });
  }

  const variants = getBookPageVariants(prefersReducedMotion);

  const handleAnimationComplete = () => {
    // Re-synchronize AOS viewport reveal triggers in an animation frame to prevent forced synchronous reflow
    requestAnimationFrame(() => {
      try {
        AOS.refresh();
      } catch {
        /* ignore */
      }
    });
  };

  return (
    <div className="book-turn-viewport">
      <AnimatePresence mode="wait" initial={false} custom={navState.direction}>
        <motion.div
          key={location.pathname}
          custom={navState.direction}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          onAnimationComplete={handleAnimationComplete}
          className="page-transition-wrapper book-page-sheet"
        >
          <FrozenOutlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
