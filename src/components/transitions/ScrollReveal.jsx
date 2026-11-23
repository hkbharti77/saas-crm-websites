import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MOTION_DURATION,
  SCROLL_REVEAL_CONFIG,
  VIEWPORT_CONFIG,
  createStaggerContainerVariants,
  createStaggerItemVariants,
} from '../../lib/motion.config';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ScrollReveal({
  children,
  className = '',
  yOffset = SCROLL_REVEAL_CONFIG.yOffset,
  delay = SCROLL_REVEAL_CONFIG.delay,
  duration = SCROLL_REVEAL_CONFIG.duration,
  threshold = SCROLL_REVEAL_CONFIG.threshold,
  once = SCROLL_REVEAL_CONFIG.once,
  offset = SCROLL_REVEAL_CONFIG.offset,
  parallaxRange = SCROLL_REVEAL_CONFIG.parallaxRange,
  enableParallax = SCROLL_REVEAL_CONFIG.enableParallax,
}) {
  const {
    ref,
    prefersReducedMotion,
    style,
    motionProps,
  } = useScrollReveal({
    yOffset,
    delay,
    duration,
    threshold,
    once,
    offset,
    parallaxRange,
    enableParallax,
  });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={{ position: 'relative' }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      {style ? (
        <motion.div style={style}>
          <motion.div {...motionProps}>{children}</motion.div>
        </motion.div>
      ) : (
        <motion.div {...motionProps}>{children}</motion.div>
      )}
    </div>
  );
}

export function StaggerContainer({
  children,
  className = '',
  staggerChildren = 0.05,
  delayChildren = 0,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_CONFIG}
      variants={createStaggerContainerVariants({ staggerChildren, delayChildren })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  yOffset = 10,
  duration = MOTION_DURATION.staggerItem,
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={createStaggerItemVariants({
        yOffset,
        duration,
        prefersReducedMotion: false,
      })}
      className={className}
    >
      {children}
    </motion.div>
  );
}
