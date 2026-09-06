/**
 * blogAnalytics.js
 * Blog-specific analytics tracker that writes aggregated metrics to Firestore & GA4.
 * Uses analytics_blog_daily collection (one document per blog per day).
 *
 * PRIVACY:
 *   - No PII collected (no names, emails, IPs, passwords, or form content)
 *   - Only public, published article metadata (blogId, slug, category, date)
 *   - Draft, scheduled, and archived posts are NEVER tracked
 *
 * VIEW SEMANTICS:
 *   - `views` represents "Unique Blog Visits" (session-deduplicated once per blog post per session).
 *   - Consecutive reloads or re-navigations within the same session are deduplicated.
 *
 * ARCHITECTURE:
 *   Firestore doc ID: {blogId}_{YYYY-MM-DD}
 *   Increments counters atomically using FieldValue.increment()
 *   GA4 Custom Events fired safely via trackGA4Event adapter
 *   Fire-and-forget: never throws, never blocks the UI
 */

import { db } from '../firebase.js';

import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';

// ─── GA4 Safe Adapter ─────────────────────────────────────────────────────────

/**
 * Safe helper to send GA4 custom events without throwing or breaking the app.
 * Reuses existing gtag instance configured in index.html (Measurement ID: G-RN6FQWDQ6M).
 * Does not fire on localhost / 127.0.0.1.
 *
 * @param {string} eventName - Custom event name (e.g. blog_post_view, blog_scroll)
 * @param {Object} parameters - Minimal, non-PII params (blog_id, category, scroll_depth, etc.)
 */
function trackGA4Event(eventName, parameters = {}) {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;
    // Suppress in local development environment
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;

    window.gtag('event', eventName, parameters);
  } catch (err) {
    // Fail silently: analytics failure must NEVER break the application
    if (import.meta.env.DEV) console.debug('[GA4] Event tracking skipped:', err);
  }
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
function getUtcDateString() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

function getDocId(blogId) {
  return `${blogId}_${getUtcDateString()}`;
}

// ─── Seen-session guard ────────────────────────────────────────────────────────
// Track which (blogId, event) pairs we've already sent this session
// to avoid double-counting on React strict-mode double-mounts or re-navigations.
const _fired = new Set();

function hasFired(blogId, event) {
  const key = `${blogId}:${event}`;
  if (_fired.has(key)) return true;
  _fired.add(key);
  return false;
}

// ─── Core write function ───────────────────────────────────────────────────────
async function writeIncrement(blogId, post, fields) {
  if (typeof window === 'undefined') return; // SSG/SSR guard
  if (!blogId) return;

  const docId = getDocId(blogId);
  const docRef = doc(db, 'analytics_blog_daily', docId);

  const base = {
    blogId,
    slug: post?.slugId || post?.id || blogId,
    category: post?.category || '',
    tags: post?.tags || [],
    date: getUtcDateString(),
    lastUpdated: serverTimestamp(),
  };

  try {
    await setDoc(docRef, { ...base, ...fields }, { merge: true });
  } catch (err) {
    // Never break the UI for analytics failures
    if (import.meta.env.DEV) console.debug('[BlogAnalytics] write failed', err);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Track a blog page view.
 * Should be called once per published post load in BlogPost.jsx.
 * Deduplicated once per browser session per blog ID.
 */
export function trackBlogView(post) {
  if (!post?.id || post?.status !== 'published') return;
  if (hasFired(post.id, 'view')) return;

  // Build optional referrer field (domain only, non-PII)
  let lastReferrer;
  try {
    if (typeof document !== 'undefined' && document.referrer) {
      const refUrl = new URL(document.referrer);
      if (typeof window !== 'undefined' && refUrl.hostname !== window.location.hostname) {
        lastReferrer = refUrl.hostname;
      }
    }
  } catch { /* ignore malformed referrer */ }

  // 1. Write to Firestore
  writeIncrement(post.id, post, {
    views: increment(1),
    ...(lastReferrer ? { lastReferrer } : {}),
  });

  // 2. Fire GA4 custom event
  trackGA4Event('blog_post_view', {
    blog_id: post.id,
    category: post.category || '',
  });
}

/**
 * Track scroll depth milestone (25%, 50%, 75%, 100%).
 * @param {Object} post - The blog post object
 * @param {25|50|75|100} depth - Scroll percentage milestone
 */
export function trackBlogScroll(post, depth) {
  if (!post?.id || post?.status !== 'published') return;
  const eventKey = `scroll_${depth}`;
  if (hasFired(post.id, eventKey)) return;

  const fieldMap = {
    25: { scroll25: increment(1) },
    50: { scroll50: increment(1) },
    75: { scroll75: increment(1) },
    100: { scroll100: increment(1) },
  };
  const fields = fieldMap[depth];
  if (fields) writeIncrement(post.id, post, fields);

  // GA4 event: blog_scroll
  trackGA4Event('blog_scroll', {
    blog_id: post.id,
    scroll_depth: depth,
  });

  // GA4 event: blog_read_complete (when scroll reaches 100%)
  if (depth === 100) {
    trackGA4Event('blog_read_complete', {
      blog_id: post.id,
      category: post.category || '',
    });
  }
}

/**
 * Track CTA button click on a blog post.
 */
export function trackBlogCta(post, ctaName = 'book_demo') {
  if (!post?.id || post?.status !== 'published') return;
  writeIncrement(post.id, post, { ctaClicks: increment(1) });

  // GA4 event: blog_cta_click
  trackGA4Event('blog_cta_click', {
    blog_id: post.id,
    cta_name: ctaName,
  });
}

/**
 * Track a share action on a blog post.
 * @param {Object} post
 * @param {string} method - 'copy' | 'twitter' | 'linkedin' | 'whatsapp' | 'native'
 */
export function trackBlogShare(post, method = 'unknown') {
  if (!post?.id || post?.status !== 'published') return;
  writeIncrement(post.id, post, { shares: increment(1) });

  // GA4 event: blog_share
  trackGA4Event('blog_share', {
    blog_id: post.id,
    share_method: method,
  });

  // Also fire existing Vercel analytics event safely
  try {
    import('./analytics').then(({ trackEvent }) => {
      trackEvent('blog_share', { blogId: post.id, method });
    }).catch(() => {});
  } catch { /* non-fatal */ }
}

/**
 * Track a related article click.
 * @param {Object} post - Current post
 * @param {string} [relatedBlogId] - ID of target related article clicked
 */
export function trackBlogRelated(post, relatedBlogId = null) {
  if (!post?.id || post?.status !== 'published') return;
  writeIncrement(post.id, post, { relatedClicks: increment(1) });

  // GA4 event: blog_related_click
  trackGA4Event('blog_related_click', {
    blog_id: post.id,
    ...(relatedBlogId ? { related_blog_id: relatedBlogId } : {}),
  });
}

/**
 * Track a tag click from a blog post.
 */
export function trackBlogTagClick(post, tag) {
  if (!post?.id || post?.status !== 'published') return;
  try {
    import('./analytics').then(({ trackEvent }) => {
      trackEvent('blog_tag_click', { blogId: post.id, tag });
    }).catch(() => {});
  } catch { /* non-fatal */ }
}

/**
 * Track a category click from a blog post.
 */
export function trackBlogCategoryClick(post) {
  if (!post?.id || post?.status !== 'published') return;
  try {
    import('./analytics').then(({ trackEvent }) => {
      trackEvent('blog_category_click', { blogId: post.id, category: post.category });
    }).catch(() => {});
  } catch { /* non-fatal */ }
}

/**
 * Track public blog search queries.
 * @param {string} searchTerm
 * @param {number} resultCount
 */
export function trackBlogSearch(searchTerm, resultCount = 0) {
  if (!searchTerm || typeof searchTerm !== 'string') return;
  const cleanTerm = searchTerm.trim().slice(0, 100);
  if (!cleanTerm) return;
  trackGA4Event('blog_search', {
    search_term: cleanTerm,
    result_count: Number(resultCount) || 0,
  });
}


