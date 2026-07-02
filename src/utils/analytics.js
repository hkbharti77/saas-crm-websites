/**
 * Centralized analytics utility for Gyan VaniAi
 * Wraps Vercel Analytics and provides structured custom event tracking.
 *
 * Usage:
 *   import { trackEvent } from '../utils/analytics';
 *   trackEvent('book_demo_click', { source: 'hero' });
 */

import { track } from '@vercel/analytics';

/**
 * Fire a custom analytics event.
 * @param {string} eventName - The event identifier (snake_case).
 * @param {Record<string, string|number|boolean>} [properties] - Optional key/value metadata.
 */
export function trackEvent(eventName, properties = {}) {
  try {
    track(eventName, properties);
  } catch (err) {
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
