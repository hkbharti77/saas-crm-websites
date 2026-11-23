import { HERO_CAROUSEL_CONFIG } from '../lib/motion.config.js';

export const HERO_INACTIVITY_RESUME_MS = HERO_CAROUSEL_CONFIG.inactivityResumeMs;
export const HERO_INACTIVITY_RESUME_SECONDS = Math.round(HERO_INACTIVITY_RESUME_MS / 1000);

/**
 * Resolves Hero carousel playback state cleanly so user-initiated pauses are
 * always respected while interaction-driven pauses resume only after 15 seconds
 * of inactivity.
 */
export function resolveHeroPlaybackState({
  isUserPaused = false,
  isInteractionPaused = false,
  isHovered = false,
  isFocused = false,
  prefersReducedMotion = false,
  slidesCount = 0,
  resumeSecondsLeft = HERO_INACTIVITY_RESUME_SECONDS,
} = {}) {
  if (slidesCount <= 1) {
    return {
      mode: 'single-slide',
      isPaused: true,
      isAutoAdvancing: false,
      shouldRunInactivityTimer: false,
      statusLabel: '',
    };
  }

  if (prefersReducedMotion) {
    return {
      mode: 'reduced-motion',
      isPaused: true,
      isAutoAdvancing: false,
      shouldRunInactivityTimer: false,
      statusLabel: '',
    };
  }

  if (isUserPaused) {
    return {
      mode: 'user-paused',
      isPaused: true,
      isAutoAdvancing: false,
      shouldRunInactivityTimer: false,
      statusLabel: 'Paused',
    };
  }

  if (isHovered || isFocused) {
    return {
      mode: 'hover-paused',
      isPaused: true,
      isAutoAdvancing: false,
      shouldRunInactivityTimer: false,
      statusLabel: 'Paused',
    };
  }

  if (isInteractionPaused) {
    const safeSeconds = Math.max(1, Math.ceil(resumeSecondsLeft));
    return {
      mode: 'inactivity-paused',
      isPaused: true,
      isAutoAdvancing: false,
      shouldRunInactivityTimer: true,
      statusLabel: `Resumes in ${safeSeconds}s`,
    };
  }

  return {
    mode: 'playing',
    isPaused: false,
    isAutoAdvancing: true,
    shouldRunInactivityTimer: false,
    statusLabel: '',
  };
}
