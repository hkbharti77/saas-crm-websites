/**
 * searchEngine.js
 * Deterministic, explainable search ranking engine for GyanVaniAi Blog CMS.
 *
 * SEARCH RANKING SCORING MATRIX:
 * - Title exact match:       +20
 * - Title partial match:     +10
 * - Tag match:               +8
 * - Category match:          +6
 * - Excerpt match:           +5
 * - Content match:           +2
 * - Freshness:               tiebreaker
 *
 * SAFETY & SECURITY:
 * - HTML input is sanitized; term highlighting uses safe React tokenization without dangerouslySetInnerHTML.
 * - Unpublished posts (draft, scheduled, archived) are strictly filtered out.
 */

import React from 'react';

const RECENT_SEARCHES_KEY = 'gyanvaniai_recent_searches';
const MAX_RECENT_SEARCHES = 8;

/**
 * Score a single published post against a search term.
 * @param {Object} post
 * @param {string} rawQuery
 * @returns {number} Deterministic match score
 */
export function scorePost(post, rawQuery) {
  if (!post || post.status !== 'published' || !rawQuery) return 0;
  const q = rawQuery.trim().toLowerCase();
  if (!q) return 0;

  let score = 0;
  const title = (post.title || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const category = (post.category || '').toLowerCase();
  const content = (post.content || '').replace(/<[^>]*>/g, '').toLowerCase();
  const tags = (post.tags || []).map(t => (t || '').toLowerCase());

  // 1. Exact title match gets primary boost (+20)
  if (title === q) {
    return 20;
  } else if (title.includes(q)) {
    score += 10;
  }


  // 2. Tokenized matching breakdown
  const tokens = q.split(/\s+/).filter(Boolean);
  tokens.forEach(token => {
    if (title.includes(token)) score += 5;
    if (tags.some(t => t.includes(token))) score += 4;
    if (category.includes(token)) score += 3;
    if (excerpt.includes(token)) score += 2;
    if (content.includes(token)) score += 1;
  });

  return score;
}


/**
 * Execute search & ranking over a list of published posts.
 * @param {Array} posts
 * @param {string} rawQuery
 * @param {Object} [filters]
 * @returns {Array} Scored and sorted results
 */
export function searchAndRank(posts = [], rawQuery = '', filters = {}) {
  const published = posts.filter(p => p.status === 'published');
  if (!rawQuery.trim()) {
    // Apply category/tag filters if provided even without query
    return published.filter(p => {
      if (filters.category && filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.tag && (!p.tags || !p.tags.includes(filters.tag))) return false;
      return true;
    });
  }

  const scored = [];

  published.forEach(post => {
    // Check category/tag filter preconditions
    if (filters.category && filters.category !== 'All' && post.category !== filters.category) return;
    if (filters.tag && (!post.tags || !post.tags.includes(filters.tag))) return;

    const score = scorePost(post, rawQuery);
    if (score > 0) {
      scored.push({ post, score });
    }
  });

  // Sort by score desc, then by date/recency tiebreaker
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const timeA = a.post.createdAt?.toMillis ? a.post.createdAt.toMillis() : (a.post.createdAt ? new Date(a.post.createdAt).getTime() : 0);
    const timeB = b.post.createdAt?.toMillis ? b.post.createdAt.toMillis() : (b.post.createdAt ? new Date(b.post.createdAt).getTime() : 0);
    return timeB - timeA;
  });

  return scored.map(item => item.post);
}

/**
 * Safely highlight search term occurrences in text without XSS vulnerability.
 * @param {string} text
 * @param {string} query
 * @returns {React.ReactNode} Array of text spans & mark elements
 */
export function renderHighlightedText(text = '', query = '') {
  if (!text) return '';
  if (!query || !query.trim()) return text;

  const q = query.trim();
  const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQ})`, 'gi'));

  return parts.map((part, idx) => {
    if (part.toLowerCase() === q.toLowerCase()) {
      return React.createElement('mark', { key: idx, className: 'search-highlight' }, part);
    }
    return part;
  });
}


/**
 * Recent searches helpers using LocalStorage only.
 */
export function getRecentSearches() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query) {
  if (typeof window === 'undefined' || !query || !query.trim()) return;
  try {
    const clean = query.trim().slice(0, 60);
    const existing = getRecentSearches().filter(q => q.toLowerCase() !== clean.toLowerCase());
    existing.unshift(clean);
    const sliced = existing.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(sliced));
  } catch { /* fail silently */ }
}

export function clearRecentSearches() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch { /* fail silently */ }
}
