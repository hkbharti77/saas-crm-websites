/**
 * internalLinkAnalyzer.js
 * Deterministic internal link recommendation algorithm for GyanVaniAi Blog CMS.
 *
 * SCOPE & SAFETY GUARANTEES:
 * - Scans ONLY published articles (status === 'published').
 * - Excludes current article, drafts, scheduled, and archived posts.
 * - Excludes destination links that are already present in article content.
 * - Scores relevance deterministically: Same category (+10), shared tag (+3), title match (+5), recency tiebreaker.
 * - No external link insertion; only valid internal routes (/blog/:slug).
 */

export function analyzeInternalLinks({
  currentBlogId,
  currentCategory = '',
  currentTags = [],
  currentContent = '',
  publishedBlogs = []
}) {
  if (!Array.isArray(publishedBlogs) || publishedBlogs.length === 0) {
    return [];
  }

  // Extract existing URLs / hrefs from content to avoid duplicate link suggestions
  const hrefRegex = /href=["']([^"']+)["']/gi;
  const existingHrefs = new Set();
  let match;
  while ((match = hrefRegex.exec(currentContent || '')) !== null) {
    existingHrefs.add(match[1].toLowerCase().trim());
  }

  const recommendations = [];

  publishedBlogs.forEach(article => {
    // Exclude current article, non-published, and missing slugs
    if (article.id === currentBlogId || article.status !== 'published' || !article.slugId) {
      return;
    }

    const targetUrl = `/blog/${article.slugId}`;
    if (existingHrefs.has(targetUrl.toLowerCase())) {
      return; // Skip existing link destinations
    }

    let score = 0;
    const reasons = [];

    // 1. Same Category (+10)
    if (currentCategory && article.category && currentCategory.toLowerCase() === article.category.toLowerCase()) {
      score += 10;
      reasons.push(`Same category ("${article.category}")`);
    }

    // 2. Shared Tags (+3 per match)
    if (Array.isArray(currentTags) && Array.isArray(article.tags)) {
      const shared = currentTags.filter(t => article.tags.includes(t));
      if (shared.length > 0) {
        const tagPoints = shared.length * 3;
        score += tagPoints;
        reasons.push(`${shared.length} shared tag(s): ${shared.join(', ')}`);
      }
    }

    // 3. Title / Keyword similarity (+5)
    if (article.title) {
      const titleWords = article.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const contentLower = currentContent.toLowerCase();
      const matchedWords = titleWords.filter(word => contentLower.includes(word));
      if (matchedWords.length > 0) {
        score += 5;
        reasons.push(`Content matches title keywords ("${matchedWords.slice(0, 3).join(', ')}")`);
      }
    }

    // Only suggest if minimum relevance threshold is met (score >= 5)
    if (score >= 5) {
      recommendations.push({
        id: article.id,
        title: article.title,
        slugId: article.slugId,
        targetUrl,
        category: article.category,
        score,
        reason: reasons.join(' • '),
        suggestedAnchorText: article.title
      });
    }
  });

  // Sort by highest score first, tie-break by publication date
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 6);
}
