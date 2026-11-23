/**
 * Enterprise Route Transition Configuration
 * Delegates standardized page-lift timing & variants to src/lib/motion.config.js.
 */

import {
  MOTION_EASE,
  MOTION_DURATION,
  createPageLiftVariants,
} from '../../lib/motion.config';

export const ROUTE_TRANSITION_EASE = MOTION_EASE.enter;
export const ROUTE_TRANSITION_DURATION = MOTION_DURATION.pageEnter;
export const ROUTE_EXIT_DURATION = MOTION_DURATION.pageExit;

export const BOOK_PAGES = [
  { path: '/', title: 'Home' },
  { path: '/services/whatsapp-coexistence', title: 'WhatsApp Coexistence' },
  { path: '/services/sales-automation', title: 'Sales Automation' },
  { path: '/services/ai-chatbots', title: 'AI Chatbots' },
  { path: '/services/whatsapp-calling-agent', title: 'WhatsApp Calling Agent' },
  { path: '/services/crm-development', title: 'CRM Development' },
  { path: '/services/hrms-development', title: 'HRMS Development' },
  { path: '/services/ivr-solutions', title: 'IVR Solutions' },
  { path: '/services/whatsapp-catalog-crm', title: 'Catalog CRM' },
  { path: '/tools/whatsapp-pricing-calculator', title: 'Pricing Calculator' },
  { path: '/pricing', title: 'Pricing Plans' },
  { path: '/blog', title: 'Blog & Insights' },
  { path: '/documentation', title: 'Documentation' },
  { path: '/about', title: 'About Us' },
  { path: '/security', title: 'Security & Trust' },
  { path: '/privacy', title: 'Privacy Policy' },
  { path: '/terms', title: 'Terms & Conditions' },
];

/**
 * Determine navigation direction (+1 = Forward, -1 = Back)
 */
export function getNavigationDirection({
  currentPath,
  prevPath,
  navigationType,
  currentHistoryIdx,
  prevHistoryIdx,
  explicitDirection,
}) {
  if (explicitDirection === 'next' || explicitDirection === 'forward') return 1;
  if (explicitDirection === 'prev' || explicitDirection === 'back' || explicitDirection === 'previous') return -1;

  if (navigationType === 'POP' && typeof currentHistoryIdx === 'number' && typeof prevHistoryIdx === 'number') {
    return currentHistoryIdx < prevHistoryIdx ? -1 : 1;
  }

  const getRank = (path) => {
    if (!path) return 999;
    const clean = path.replace(/\/$/, '') || '/';
    const index = BOOK_PAGES.findIndex(
      (p) => clean === p.path || (p.path !== '/' && clean.startsWith(p.path))
    );
    return index === -1 ? 999 : index;
  };

  return getRank(currentPath) < getRank(prevPath) ? -1 : 1;
}

/**
 * Crisp 150ms fade-in + subtle 8px lift variants for Framer Motion AnimatePresence.
 */
export function getPageEnterVariants(prefersReducedMotion = false) {
  return createPageLiftVariants(prefersReducedMotion);
}

/**
 * Backward compatibility aliases
 */
export function getBookPageVariants(prefersReducedMotion = false) {
  return createPageLiftVariants(prefersReducedMotion);
}

export function getRouteTransitionVariants(_pathname, prefersReducedMotion = false) {
  return createPageLiftVariants(prefersReducedMotion);
}

export function getRouteType(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/pricing')) return 'pricing';
  if (pathname.startsWith('/blog') || pathname.startsWith('/category') || pathname === '/documentation') return 'blog';
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/security' || pathname === '/unsubscribe') return 'legal';
  return 'services';
}
