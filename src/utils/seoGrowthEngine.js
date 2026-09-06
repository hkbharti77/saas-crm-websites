/**
 * seoGrowthEngine.js
 * Deterministic SEO opportunity and content cannibalization engine.
 *
 * RULES:
 * - Does NOT fabricate Google rankings, search volume, or impressions.
 * - Explains recommendations deterministically.
 * - Never modifies published content directly (working draft workflow enforced).
 */

import { getSearchConsoleStatus } from './searchConsoleService.js';


/**
 * Tokenize text into lowercased word set.
 */
function getTokens(text = '') {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3) // Exclude short stopwords
  );
}

/**
 * Jaccard similarity index between two token sets (0.0 to 1.0).
 */
function calculateJaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach(item => {
    if (setB.has(item)) intersection++;
  });
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? intersection / union : 0;
}

/**
 * Detect content cannibalization / topic overlap between published articles.
 * @param {Array} publishedArticles
 * @returns {Array} List of detected topic overlap warnings
 */
export function detectContentCannibalization(publishedArticles = []) {
  const publishedOnly = publishedArticles.filter(a => a.status === 'published');
  const warnings = [];

  for (let i = 0; i < publishedOnly.length; i++) {
    for (let j = i + 1; j < publishedOnly.length; j++) {
      const artA = publishedOnly[i];
      const artB = publishedOnly[j];

      const tokensA = getTokens(artA.title + ' ' + (artA.excerpt || ''));
      const tokensB = getTokens(artB.title + ' ' + (artB.excerpt || ''));

      const similarity = calculateJaccardSimilarity(tokensA, tokensB);

      // Check category match and shared tag count
      const sameCategory = artA.category && artA.category === artB.category;
      const sharedTags = (artA.tags || []).filter(t => (artB.tags || []).includes(t));

      if (similarity >= 0.4 || (sameCategory && sharedTags.length >= 3 && similarity >= 0.25)) {
        warnings.push({
          id: `cannibalization_${artA.id}_${artB.id}`,
          articleA: { id: artA.id, title: artA.title, slugId: artA.slugId },
          articleB: { id: artB.id, title: artB.title, slugId: artB.slugId },
          similarityScore: Math.round(similarity * 100),
          reason: 'Both articles target closely related topics and share significant keyword overlap.',
          recommendation: 'Consider consolidating or differentiating canonical target keywords between these two articles.',
        });
      }
    }
  }

  return warnings;
}

/**
 * Detect CTR opportunities from genuine Search Console page metrics.
 */
export function detectCtrOpportunities(publishedArticles = [], gscPageMetrics = []) {
  const opportunities = [];
  if (!gscPageMetrics || gscPageMetrics.length === 0) return opportunities;

  publishedArticles.forEach(article => {
    const slug = article.slugId || article.id;
    const pageMetric = gscPageMetrics.find(p => p.page && p.page.includes(slug));

    if (pageMetric) {
      const impressions = pageMetric.impressions || 0;
      const ctr = pageMetric.ctr || 0; // e.g. 0.015 = 1.5%

      if (impressions >= 500 && ctr < 0.02) {
        opportunities.push({
          articleId: article.id,
          title: article.title,
          slugId: slug,
          impressions,
          ctr: `${(ctr * 100).toFixed(1)}%`,
          type: 'CTR Opportunity',
          recommendation: 'High impressions with low CTR. Consider testing a stronger title and meta description.',
        });
      }
    }
  });

  return opportunities;
}

/**
 * Detect position opportunities from genuine Search Console page metrics.
 */
export function detectPositionOpportunities(publishedArticles = [], gscPageMetrics = []) {
  const opportunities = [];
  if (!gscPageMetrics || gscPageMetrics.length === 0) return opportunities;

  publishedArticles.forEach(article => {
    const slug = article.slugId || article.id;
    const pageMetric = gscPageMetrics.find(p => p.page && p.page.includes(slug));

    if (pageMetric) {
      const position = pageMetric.position || 0;

      if (position >= 5 && position <= 20) {
        opportunities.push({
          articleId: article.id,
          title: article.title,
          slugId: slug,
          position: position.toFixed(1),
          type: 'Position Opportunity',
          recommendation: 'Ranking on page 1-2 (positions 5-20). Potential optimization opportunity: refresh content, improve headings, and add internal links.',
        });
      }
    }
  });

  return opportunities;
}

/**
 * Generate full SEO opportunity engine report.
 */
export function generateSeoOpportunities(publishedArticles = [], gscData = null) {
  const published = publishedArticles.filter(a => a.status === 'published');
  const gscStatus = getSearchConsoleStatus();

  // Basic SEO metadata audit
  const metaAuditOps = [];
  published.forEach(art => {
    if (!art.seoDescription && (!art.excerpt || art.excerpt.length < 50)) {
      metaAuditOps.push({
        articleId: art.id,
        title: art.title,
        type: 'Missing Meta Description',
        priority: 'High',
        recommendation: 'Add a targeted meta description (120-160 characters).',
      });
    }
    if (!art.imageUrl && !art.ogImageUrl) {
      metaAuditOps.push({
        articleId: art.id,
        title: art.title,
        type: 'Missing OG Image',
        priority: 'Medium',
        recommendation: 'Add a featured/OG image to improve social share CTR.',
      });
    }
    if (!art.seoTitle && (art.title || '').length < 30) {
      metaAuditOps.push({
        articleId: art.id,
        title: art.title,
        type: 'Short Title',
        priority: 'Medium',
        recommendation: 'Lengthen title or SEO title to 40-60 characters for maximum search visibility.',
      });
    }
  });

  const cannibalization = detectContentCannibalization(published);
  const ctrOps = gscData?.pages ? detectCtrOpportunities(published, gscData.pages) : [];
  const positionOps = gscData?.pages ? detectPositionOpportunities(published, gscData.pages) : [];

  return {
    gscStatus,
    metaAuditOps,
    cannibalization,
    ctrOps,
    positionOps,
    totalOpportunities: metaAuditOps.length + cannibalization.length + ctrOps.length + positionOps.length,
  };
}
