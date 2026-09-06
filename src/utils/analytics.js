/**
 * Centralized analytics utility for Gyan VaniAi
 * Wraps Vercel Analytics and provides structured custom event tracking.
 *
 * Usage:
 *   import { trackEvent } from '../utils/analytics';
 *   import { EVENT_CATEGORIES } from '../utils/analyticsMap';
 *   trackEvent(EVENT_CATEGORIES.HERO_CTA_CLICK, { source: 'hero' });
 */

import { track } from '@vercel/analytics';
import { EVENT_CATEGORIES, FUNNEL_STAGES } from './analyticsMap';

/**
 * Fire a custom analytics event.
 * @param {string} eventName - The event identifier (snake_case).
 * @param {Record<string, string|number|boolean>} [properties] - Optional key/value metadata.
 */
export function trackEvent(eventName, properties = {}) {
  try {
    track(eventName, properties);
  } catch {
    // Never let analytics errors break the UI
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Analytics]', eventName, properties);
    }
  }
}

// ─── Convenience helpers ─────────────────────────────────────────────────────

/** Fired when any primary CTA (Book Demo / Start Free Trial) is clicked. */
export const trackBookDemo = (source = 'unknown') =>
  trackEvent('book_demo_click', { source });

/** Fired when a WhatsApp link is clicked anywhere on the site. */
export const trackWhatsAppClick = (source = 'unknown') =>
  trackEvent('whatsapp_click', { source });

/** Fired on successful contact form submission. */
export const trackContactFormSubmit = () =>
  trackEvent('contact_form_submit');

/** Fired when a pricing plan CTA is clicked. */
export const trackPricingPlanClick = (plan = 'unknown') =>
  trackEvent('pricing_plan_click', { plan });

/** Fired when the pricing section enters the viewport. */
export const trackPricingView = () =>
  trackEvent('pricing_view');

/** Fired when an email link is clicked. */
export const trackEmailClick = (source = 'unknown') =>
  trackEvent('email_click', { source });

/** Fired when the newsletter subscribe form is submitted. */
export const trackNewsletterSubscribe = () =>
  trackEvent('newsletter_subscribe');

/** Fired when the user scrolls to 50% of the page. */
export const trackScroll50 = () =>
  trackEvent('scroll_50');

/** Fired when the user scrolls to 90% of the page. */
export const trackScroll90 = () =>
  trackEvent('scroll_90');

/**
 * Track conversion funnel progression
 * @param {string} stage - Funnel stage (from FUNNEL_STAGES)
 * @param {Object} data - Additional data about the conversion
 */
export const trackFunnelStage = (stage, data = {}) => {
  const eventName = `funnel_${stage}`;
  trackEvent(eventName, {
    stage,
    timestamp: new Date().toISOString(),
    ...data
  });

  // Store in sessionStorage for analysis
  try {
    const funnel = JSON.parse(sessionStorage.getItem('funnel_stages') || '[]');
    funnel.push({ stage, time: Date.now(), data });
    sessionStorage.setItem('funnel_stages', JSON.stringify(funnel));
  } catch {
    // Silently fail if sessionStorage is unavailable
  }
};

/**
 * Export constants for use in components
 */
export { EVENT_CATEGORIES, FUNNEL_STAGES };
