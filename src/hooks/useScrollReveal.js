import { useMemo, useRef } from 'react';
import {
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  MOTION_DURATION,
  MOTION_EASE,
  SCROLL_REVEAL_CONFIG,
  createFadeInVariants,
} from '../lib/motion.config';

/**
 * Custom scroll-reveal hook backed by motion/react's useScroll, useTransform,
 * useInView, and useReducedMotion, aligned with src/lib/motion.config.js.
 *
 * Sections reveal once upon entering the viewport and stay settled at full
 * opacity while scrolling back up, paired with subtle compositor-only scroll
 * parallax motion (disabled automatically under prefers-reduced-motion).
 */
export function useScrollReveal({
  yOffset = SCROLL_REVEAL_CONFIG.yOffset,
  delay = SCROLL_REVEAL_CONFIG.delay,
  duration = SCROLL_REVEAL_CONFIG.duration,
  threshold = SCROLL_REVEAL_CONFIG.threshold,
  once = SCROLL_REVEAL_CONFIG.once,
  offset = SCROLL_REVEAL_CONFIG.offset,
  parallaxRange = SCROLL_REVEAL_CONFIG.parallaxRange,
  enableParallax = SCROLL_REVEAL_CONFIG.enableParallax,
} = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [parallaxStart, parallaxEnd] = parallaxRange;
  const shouldUseParallax = Boolean(enableParallax) && !prefersReducedMotion;

  const inView = useInView(ref, {
    once,
    amount: threshold,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldUseParallax ? [parallaxStart, parallaxEnd] : [0, 0]
  );

  const isInView = prefersReducedMotion ? true : inView;

  const variants = useMemo(
    () =>
      createFadeInVariants({
        yOffset,
        delay,
        duration,
        prefersReducedMotion,
      }),
    [yOffset, delay, duration, prefersReducedMotion]
  );

  const transition = useMemo(
    () =>
      prefersReducedMotion
        ? {
            duration: MOTION_DURATION.reduced,
            delay: 0,
            ease: MOTION_EASE.linear,
          }
        : {
            duration,
            delay,
            ease: MOTION_EASE.enter,
          },
    [duration, delay, prefersReducedMotion]
  );

  const style = useMemo(
    () => (shouldUseParallax ? { y: parallaxY } : undefined),
    [shouldUseParallax, parallaxY]
  );

  const motionProps = useMemo(
    () => ({
      initial: prefersReducedMotion ? false : 'hidden',
      animate: isInView ? 'visible' : 'hidden',
      variants,
      transition,
    }),
    [prefersReducedMotion, isInView, variants, transition]
  );

  return {
    ref,
    isInView,
    prefersReducedMotion,
    scrollYProgress,
    parallaxY,
    variants,
    transition,
    style,
    motionProps,
  };
}

export default useScrollReveal;
