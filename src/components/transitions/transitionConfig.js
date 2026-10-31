/**
 * Global 3D Book Page-Turn Transition Configuration
 * GyanVaniAI Enterprise Book Page-Flip Navigation
 */

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
 * Determine navigation direction (+1 = Next / Forward, -1 = Previous / Back)
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

  const currRank = getRank(currentPath);
  const prevRank = getRank(prevPath);

  if (currRank < prevRank) return -1;
  return 1;
}

/**
 * 3D Book Page-Flip Variants
 * Turns pages like a physical book:
 * - Forward (Next): spine on left, flips leftward (-68deg), incoming unfolds from 52deg to 0deg.
 * - Backward (Prev): spine on right, flips rightward (+68deg), incoming unfolds from -52deg to 0deg.
 */
export function getBookPageVariants(prefersReducedMotion = false) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: 0.14, ease: 'linear' },
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.1, ease: 'linear' },
      },
    };
  }

  return {
    initial: (direction = 1) => {
      const isBack = direction === -1;
      return {
        transformOrigin: isBack ? 'right center' : 'left center',
        rotateY: isBack ? -52 : 52,
        x: isBack ? -28 : 28,
        scale: 0.975,
        opacity: 0,
        filter: 'brightness(0.92)',
        boxShadow: isBack
          ? 'inset 24px 0 28px -10px rgba(0, 0, 0, 0.22)'
          : 'inset -24px 0 28px -10px rgba(0, 0, 0, 0.22)',
      };
    },
    animate: (direction = 1) => {
      const isBack = direction === -1;
      return {
        transformOrigin: isBack ? 'right center' : 'left center',
        rotateY: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        filter: 'brightness(1)',
        boxShadow: 'inset 0 0 0 rgba(0, 0, 0, 0)',
        transition: {
          duration: 0.36,
          ease: [0.22, 1, 0.36, 1],
        },
      };
    },
    exit: (direction = 1) => {
      const isBack = direction === -1;
      return {
        transformOrigin: isBack ? 'right center' : 'left center',
        rotateY: isBack ? 68 : -68,
        x: isBack ? 20 : -20,
        scale: 0.965,
        opacity: 0,
        filter: 'brightness(0.88)',
        boxShadow: isBack
          ? 'inset -30px 0 35px -8px rgba(0, 0, 0, 0.32), 16px 0 32px rgba(0, 0, 0, 0.2)'
          : 'inset 30px 0 35px -8px rgba(0, 0, 0, 0.32), -16px 0 32px rgba(0, 0, 0, 0.2)',
        transition: {
          duration: 0.32,
          ease: [0.4, 0, 0.7, 1],
        },
      };
    },
  };
}

/**
 * Backward compatibility alias for getRouteTransitionVariants
 */
export function getRouteTransitionVariants(pathname, prefersReducedMotion = false) {
  return getBookPageVariants(prefersReducedMotion);
}

/**
 * Backward compatibility helper for route classification
 */
export function getRouteType(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/pricing')) return 'pricing';
  if (pathname.startsWith('/blog') || pathname.startsWith('/category') || pathname === '/documentation') return 'blog';
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/security' || pathname === '/unsubscribe') return 'legal';
  return 'services';
}
