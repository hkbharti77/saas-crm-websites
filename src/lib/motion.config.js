/**
 * Centralized Motion System Configuration
 * Standardized compositor-only easing curves, durations, transitions, and Framer Motion
 * variants for page-lift transitions, fade-ins, stagger sequences, scroll reveals, and
 * 3D perspective Hero carousel choreography.
 */

export const MOTION_EASE = {
  enter: [0.16, 1, 0.3, 1],
  smooth: [0.22, 1, 0.36, 1],
  exit: 'easeOut',
  linear: 'linear',
};

export const MOTION_DURATION = {
  pageEnter: 0.15,
  pageExit: 0.08,
  fadeIn: 0.28,
  staggerItem: 0.26,
  heroSwap: 0.55,
  heroMediaEnter: 0.55,
  heroMediaScale: 0.65,
  heroMediaExit: 0.42,
  heroDeckEnter: 0.55,
  heroDeckExit: 0.42,
  reduced: 0.08,
  reducedExit: 0.06,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.08,
};

export const SCROLL_REVEAL_CONFIG = {
  once: VIEWPORT_CONFIG.once,
  threshold: VIEWPORT_CONFIG.amount,
  yOffset: 12,
  duration: MOTION_DURATION.fadeIn,
  delay: 0,
  offset: ['start 0.92', 'end 0.15'],
  parallaxRange: [10, -10],
  enableParallax: true,
};

export const HERO_CAROUSEL_CONFIG = {
  dwellMs: 9000,
  inactivityResumeMs: 15000,
  transitionDuration: MOTION_DURATION.heroSwap,
  mediaDuration: MOTION_DURATION.heroMediaEnter,
  deckRotateY: 16,
  deckOffsetX: 34,
  stageTiltMax: 5,
  bgParallaxRange: [0, 36],
  contentParallaxRange: [0, -16],
  deckParallaxRange: [0, -32],
  deckScrollRotateX: [0, 6],
};

export const MOTION_TRANSITIONS = {
  pageEnter: {
    duration: MOTION_DURATION.pageEnter,
    ease: MOTION_EASE.enter,
  },
  pageExit: {
    duration: MOTION_DURATION.pageExit,
    ease: MOTION_EASE.exit,
  },
  fadeIn: {
    duration: MOTION_DURATION.fadeIn,
    ease: MOTION_EASE.enter,
  },
  staggerItem: {
    duration: MOTION_DURATION.staggerItem,
    ease: MOTION_EASE.enter,
  },
  heroContent: {
    duration: MOTION_DURATION.heroSwap,
    ease: MOTION_EASE.smooth,
  },
  heroDeck: {
    duration: MOTION_DURATION.heroDeckEnter,
    ease: MOTION_EASE.smooth,
  },
  reduced: {
    duration: MOTION_DURATION.reduced,
    ease: MOTION_EASE.linear,
  },
  reducedExit: {
    duration: MOTION_DURATION.reducedExit,
    ease: MOTION_EASE.linear,
  },
};

/**
 * Page-lift variants (150ms fade-in + subtle 8px upward lift, 80ms crisp fade-out).
 * Clears transform via transitionEnd so native position: sticky works inside child pages.
 */
export function createPageLiftVariants(prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: MOTION_TRANSITIONS.reduced,
      },
      exit: {
        opacity: 0,
        transition: MOTION_TRANSITIONS.reducedExit,
      },
    };
  }

  return {
    initial: {
      opacity: 0,
      y: 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: MOTION_TRANSITIONS.pageEnter,
      transitionEnd: {
        transform: 'none',
      },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: MOTION_TRANSITIONS.pageExit,
    },
  };
}

export const pageLiftVariants = createPageLiftVariants(false);
export const createPageTransitionVariants = createPageLiftVariants;
export const pageTransitionVariants = pageLiftVariants;

/**
 * Standardized scroll/section fade-in + subtle upward lift variants.
 */
export function createFadeInVariants({
  yOffset = 12,
  delay = 0,
  duration = MOTION_DURATION.fadeIn,
  prefersReducedMotion = false,
} = {}) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: MOTION_TRANSITIONS.reduced,
      },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: MOTION_EASE.enter,
      },
    },
  };
}

export const fadeInVariants = createFadeInVariants();

/**
 * Standardized stagger parent container variants.
 */
export function createStaggerContainerVariants({
  staggerChildren = 0.05,
  delayChildren = 0,
} = {}) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export const staggerContainerVariants = createStaggerContainerVariants();

/**
 * Standardized stagger child item variants.
 */
export function createStaggerItemVariants({
  yOffset = 10,
  duration = MOTION_DURATION.staggerItem,
  prefersReducedMotion = false,
} = {}) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: MOTION_TRANSITIONS.reduced,
      },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: MOTION_EASE.enter,
      },
    },
  };
}

export const staggerItemVariants = createStaggerItemVariants();

/**
 * Standardized compositor-only hero media cross-fade variants (550ms smooth glide, zero blur).
 */
export function createHeroMediaVariants(prefersReducedMotion = false) {
  return {
    enter: (direction = 1) => ({
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 1.03,
      x: prefersReducedMotion ? 0 : direction > 0 ? 18 : -18,
    }),
    center: {
      opacity: 0.94,
      scale: 1,
      x: 0,
      transition: {
        opacity: {
          duration: prefersReducedMotion ? 0.12 : MOTION_DURATION.heroMediaEnter,
          ease: MOTION_EASE.smooth,
        },
        scale: {
          duration: prefersReducedMotion ? 0.12 : MOTION_DURATION.heroMediaScale,
          ease: MOTION_EASE.smooth,
        },
        x: {
          duration: prefersReducedMotion ? 0.12 : MOTION_DURATION.heroMediaEnter,
          ease: MOTION_EASE.smooth,
        },
      },
    },
    exit: (direction = 1) => ({
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.985,
      x: prefersReducedMotion ? 0 : direction > 0 ? -14 : 14,
      transition: {
        opacity: {
          duration: prefersReducedMotion ? 0.1 : MOTION_DURATION.heroMediaExit,
          ease: MOTION_EASE.exit,
        },
        scale: {
          duration: prefersReducedMotion ? 0.1 : MOTION_DURATION.heroMediaExit,
          ease: MOTION_EASE.exit,
        },
        x: {
          duration: prefersReducedMotion ? 0.1 : MOTION_DURATION.heroMediaExit,
          ease: MOTION_EASE.exit,
        },
      },
    }),
  };
}

export const heroMediaVariants = createHeroMediaVariants(false);

/**
 * Direction-aware 550ms Hero copy column variants.
 */
export function createHeroContentVariants(prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return {
      enter: { opacity: 0 },
      center: {
        opacity: 1,
        transition: MOTION_TRANSITIONS.reduced,
      },
      exit: {
        opacity: 0,
        transition: MOTION_TRANSITIONS.reducedExit,
      },
    };
  }

  return {
    enter: (direction = 1) => ({
      opacity: 0,
      y: direction > 0 ? 16 : -16,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: MOTION_TRANSITIONS.heroContent,
    },
    exit: (direction = 1) => ({
      opacity: 0,
      y: direction > 0 ? -10 : 10,
      transition: {
        duration: MOTION_DURATION.heroDeckExit,
        ease: MOTION_EASE.exit,
      },
    }),
  };
}

export const heroContentVariants = createHeroContentVariants(false);

/**
 * Direction-aware 3D perspective card deck variants for the Hero 3D AI Revenue Hub.
 * Animates strictly compositor-only 3D transforms (rotateY, x, scale, opacity).
 */
export function createHeroDeckVariants(prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return {
      enter: { opacity: 0 },
      center: {
        opacity: 1,
        transition: MOTION_TRANSITIONS.reduced,
      },
      exit: {
        opacity: 0,
        transition: MOTION_TRANSITIONS.reducedExit,
      },
    };
  }

  return {
    enter: (direction = 1) => ({
      opacity: 0,
      x: direction > 0 ? HERO_CAROUSEL_CONFIG.deckOffsetX : -HERO_CAROUSEL_CONFIG.deckOffsetX,
      rotateY: direction > 0 ? HERO_CAROUSEL_CONFIG.deckRotateY : -HERO_CAROUSEL_CONFIG.deckRotateY,
      scale: 0.94,
    }),
    center: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: MOTION_TRANSITIONS.heroDeck,
    },
    exit: (direction = 1) => ({
      opacity: 0,
      x: direction > 0 ? -HERO_CAROUSEL_CONFIG.deckOffsetX * 0.85 : HERO_CAROUSEL_CONFIG.deckOffsetX * 0.85,
      rotateY: direction > 0 ? -HERO_CAROUSEL_CONFIG.deckRotateY * 0.85 : HERO_CAROUSEL_CONFIG.deckRotateY * 0.85,
      scale: 0.93,
      transition: {
        duration: MOTION_DURATION.heroDeckExit,
        ease: MOTION_EASE.exit,
      },
    }),
  };
}

export const heroDeckVariants = createHeroDeckVariants(false);

export default {
  MOTION_EASE,
  MOTION_DURATION,
  MOTION_TRANSITIONS,
  VIEWPORT_CONFIG,
  SCROLL_REVEAL_CONFIG,
  HERO_CAROUSEL_CONFIG,
  pageLiftVariants,
  pageTransitionVariants,
  fadeInVariants,
  staggerContainerVariants,
  staggerItemVariants,
  heroMediaVariants,
  heroContentVariants,
  heroDeckVariants,
  createPageLiftVariants,
  createPageTransitionVariants,
  createFadeInVariants,
  createStaggerContainerVariants,
  createStaggerItemVariants,
  createHeroMediaVariants,
  createHeroContentVariants,
  createHeroDeckVariants,
};
