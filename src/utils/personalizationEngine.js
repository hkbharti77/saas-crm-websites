/**
 * personalizationEngine.js
 * Lightweight, privacy-preserving in-browser personalization engine.
 *
 * PRIVACY GUARANTEES:
 * - NO user login or account creation
 * - NO server-side tracking or profile storage
 * - All signals stored strictly in browser localStorage
 * - NO PII collected
 * - Controls provided to reset/clear reading preferences
 */

const RECENT_VIEWS_KEY = 'gyanvaniai_recent_blogs';
const READ_PROGRESS_KEY = 'gyanvaniai_read_progress';
const MAX_RECENT_ITEMS = 10;

/**
 * Record a blog post view in localStorage.
 * @param {Object} post
 */
export function recordRecentView(post) {
  if (typeof window === 'undefined' || !post?.id || post.status !== 'published') return;
  try {
    const raw = localStorage.getItem(RECENT_VIEWS_KEY);
    let list = raw ? JSON.parse(raw) : [];

    // Remove existing duplicate entry for same post ID/slug
    list = list.filter(item => item.id !== post.id && item.slugId !== post.slugId);

    const entry = {
      id: post.id,
      slugId: post.slugId || post.id,
      title: post.title,
      category: post.category || '',
      tags: post.tags || [],
      timestamp: Date.now(),
    };

    list.unshift(entry);
    list = list.slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(list));
  } catch (err) {
    if (import.meta.env.DEV) console.debug('[Personalization] LocalStorage write failed:', err);
  }
}

/**
 * Get recently viewed articles from localStorage.
 * @returns {Array}
 */
export function getRecentViews() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_VIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Record reading progress percentage for a blog post.
 * @param {string} blogId
 * @param {number} progress
 */
export function recordReadingProgress(blogId, progress) {
  if (typeof window === 'undefined' || !blogId) return;
  try {
    const raw = localStorage.getItem(READ_PROGRESS_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[blogId] = Math.max(map[blogId] || 0, Math.round(progress));
    localStorage.setItem(READ_PROGRESS_KEY, JSON.stringify(map));
  } catch { /* fail silently */ }
}

/**
 * Get reading progress for a blog post.
 * @param {string} blogId
 * @returns {number}
 */
export function getReadingProgress(blogId) {
  if (typeof window === 'undefined' || !blogId) return 0;
  try {
    const raw = localStorage.getItem(READ_PROGRESS_KEY);
    const map = raw ? JSON.parse(raw) : {};
    return map[blogId] || 0;
  } catch {
    return 0;
  }
}

/**
 * Clear all local personalization data (reset preferences).
 */
export function clearPersonalizationData() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_VIEWS_KEY);
    localStorage.removeItem(READ_PROGRESS_KEY);
  } catch { /* fail silently */ }
}

/**
 * Infer recommended published articles based on user's recent reading context.
 * @param {Array} allPublishedBlogs
 * @returns {Array} Array of recommended articles
 */
export function getRecommendedArticles(allPublishedBlogs = []) {
  if (!allPublishedBlogs || allPublishedBlogs.length === 0) return [];
  const publishedOnly = allPublishedBlogs.filter(b => b.status === 'published');
  if (publishedOnly.length === 0) return [];

  const recent = getRecentViews();
  if (recent.length === 0) {
    // Fallback: Return top 3 latest published posts
    return publishedOnly.slice(0, 3);
  }

  // Count category and tag view frequencies
  const categoryFreq = {};
  const tagFreq = {};
  const recentIds = new Set(recent.map(r => r.id));

  recent.forEach(item => {
    if (item.category) {
      categoryFreq[item.category] = (categoryFreq[item.category] || 0) + 1;
    }
    (item.tags || []).forEach(tag => {
      tagFreq[tag] = (tagFreq[tag] || 0) + 1;
    });
  });

  // Score candidate posts
  const candidates = publishedOnly.map(post => {
    let score = 0;
    // Boost matching category
    if (post.category && categoryFreq[post.category]) {
      score += categoryFreq[post.category] * 5;
    }
    // Boost matching tags
    (post.tags || []).forEach(tag => {
      if (tagFreq[tag]) score += tagFreq[tag] * 3;
    });
    // Slight penalty if already viewed recently (encourage discovery)
    if (recentIds.has(post.id)) score -= 2;

    return { post, score };
  });

  // Sort by score desc, then recency
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.post.createdAt?.toMillis ? b.post.createdAt.toMillis() : 0) -
           (a.post.createdAt?.toMillis ? a.post.createdAt.toMillis() : 0);
  });

  return candidates.slice(0, 3).map(c => c.post);
}
