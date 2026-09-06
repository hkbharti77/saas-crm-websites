/**
 * contentHealth.js
 * Deterministic content health scoring for blog posts.
 *
 * Scores a post 0–100 based on measurable, objective signals.
 * NOT an AI score. NOT a Google ranking signal.
 * Each check is explainable and clearly labelled.
 *
 * Grade thresholds:
 *   90–100 = Excellent
 *   75–89  = Good
 *   50–74  = Needs Improvement
 *   0–49   = Poor
 */

/**
 * Count approximate words in HTML content
 */
function countWords(htmlContent) {
  if (!htmlContent) return 0;
  const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

/**
 * Count H2/H3 headings in HTML content
 */
function countHeadings(htmlContent) {
  if (!htmlContent) return 0;
  const matches = htmlContent.match(/<h[23][^>]*>/gi);
  return matches ? matches.length : 0;
}

/**
 * Determine publication age in months
 */
function getAgeMonths(post) {
  const ts = post.publishedAt?.toDate
    ? post.publishedAt.toDate()
    : post.publishedAt
      ? new Date(post.publishedAt)
      : post.createdAt?.toDate
        ? post.createdAt.toDate()
        : post.createdAt
          ? new Date(post.createdAt)
          : null;
  if (!ts) return null;
  const diffMs = Date.now() - ts.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 30);
}

/**
 * Compute a deterministic content health score for a blog post.
 *
 * @param {Object} post - Firestore blog document data
 * @param {Object} [_analyticsData] - Optional: reserved for future analytics-based checks
 * @returns {{ score: number, grade: string, label: string, checks: Array }}
 */
export function computeContentHealth(post, _analyticsData = null) {
  const checks = [];
  let score = 0;

  // ─── SEO Metadata (40 points) ─────────────────────────────────────────────

  // SEO Title (15 pts)
  const hasSeoTitle = !!(post.seoTitle && post.seoTitle.trim().length >= 10);
  checks.push({
    key: 'seo_title',
    label: 'SEO Title',
    pass: hasSeoTitle,
    points: 15,
    earned: hasSeoTitle ? 15 : 0,
    tip: hasSeoTitle ? null : 'Add a descriptive SEO title (min 10 characters)',
  });
  if (hasSeoTitle) score += 15;

  // SEO Description (15 pts)
  const hasSeoDesc = !!(post.seoDescription && post.seoDescription.trim().length >= 50);
  checks.push({
    key: 'seo_description',
    label: 'Meta Description',
    pass: hasSeoDesc,
    points: 15,
    earned: hasSeoDesc ? 15 : 0,
    tip: hasSeoDesc ? null : 'Add a meta description (min 50 characters)',
  });
  if (hasSeoDesc) score += 15;

  // OG Image (10 pts)
  const hasOgImage = !!(post.ogImageUrl && post.ogImageUrl.trim());
  checks.push({
    key: 'og_image',
    label: 'OG Image',
    pass: hasOgImage,
    points: 10,
    earned: hasOgImage ? 10 : 0,
    tip: hasOgImage ? null : 'Add an Open Graph image for social sharing',
  });
  if (hasOgImage) score += 10;

  // ─── Content Structure (30 points) ────────────────────────────────────────

  // Featured Image (10 pts)
  const hasFeaturedImage = !!(post.imageUrl && post.imageUrl.trim());
  checks.push({
    key: 'featured_image',
    label: 'Featured Image',
    pass: hasFeaturedImage,
    points: 10,
    earned: hasFeaturedImage ? 10 : 0,
    tip: hasFeaturedImage ? null : 'Add a featured image to improve visual appeal',
  });
  if (hasFeaturedImage) score += 10;

  // H2/H3 Structure (10 pts)
  const headingCount = countHeadings(post.content);
  const hasHeadings = headingCount >= 2;
  checks.push({
    key: 'headings',
    label: 'H2/H3 Structure',
    pass: hasHeadings,
    points: 10,
    earned: hasHeadings ? 10 : 0,
    tip: hasHeadings ? null : `Add at least 2 H2/H3 subheadings (found ${headingCount})`,
  });
  if (hasHeadings) score += 10;

  // Content Length ≥ 500 words (10 pts)
  const wordCount = countWords(post.content);
  const hasGoodLength = wordCount >= 500;
  checks.push({
    key: 'content_length',
    label: `Content Length (${wordCount} words)`,
    pass: hasGoodLength,
    points: 10,
    earned: hasGoodLength ? 10 : 0,
    tip: hasGoodLength ? null : `Content is short (${wordCount} words). Aim for 500+ words.`,
  });
  if (hasGoodLength) score += 10;

  // ─── Taxonomy (20 points) ─────────────────────────────────────────────────

  // Category assigned (10 pts)
  const hasCategory = !!(post.category && post.category.trim());
  checks.push({
    key: 'category',
    label: 'Category',
    pass: hasCategory,
    points: 10,
    earned: hasCategory ? 10 : 0,
    tip: hasCategory ? null : 'Assign a category to this post',
  });
  if (hasCategory) score += 10;

  // Tags present (10 pts)
  const hasTags = Array.isArray(post.tags) && post.tags.length >= 1;
  checks.push({
    key: 'tags',
    label: 'Tags',
    pass: hasTags,
    points: 10,
    earned: hasTags ? 10 : 0,
    tip: hasTags ? null : 'Add at least one tag for discoverability',
  });
  if (hasTags) score += 10;

  // ─── Freshness (10 points) ────────────────────────────────────────────────

  // Read time set (5 pts)
  const hasReadTime = !!(post.readTime && post.readTime.trim());
  checks.push({
    key: 'read_time',
    label: 'Read Time',
    pass: hasReadTime,
    points: 5,
    earned: hasReadTime ? 5 : 0,
    tip: hasReadTime ? null : 'Set an estimated read time',
  });
  if (hasReadTime) score += 5;

  // Published within 18 months (5 pts)
  const ageMonths = getAgeMonths(post);
  const isFresh = ageMonths === null || ageMonths <= 18;
  checks.push({
    key: 'freshness',
    label: 'Content Freshness',
    pass: isFresh,
    points: 5,
    earned: isFresh ? 5 : 0,
    tip: isFresh
      ? null
      : `Article is ${Math.round(ageMonths)} months old — consider a refresh`,
  });
  if (isFresh) score += 5;

  // ─── Grade ────────────────────────────────────────────────────────────────

  const clampedScore = Math.min(100, Math.max(0, score));
  let grade, label, color;
  if (clampedScore >= 90) { grade = 'A'; label = 'Excellent'; color = '#10b981'; }
  else if (clampedScore >= 75) { grade = 'B'; label = 'Good'; color = '#3b82f6'; }
  else if (clampedScore >= 50) { grade = 'C'; label = 'Needs Improvement'; color = '#f59e0b'; }
  else { grade = 'D'; label = 'Poor'; color = '#ef4444'; }

  return { score: clampedScore, grade, label, color, checks };
}

/**
 * Compute health scores for an array of posts.
 * Returns array sorted by score ascending (worst first, for opportunity surfacing).
 */
export function computeHealthForPosts(posts) {
  return posts.map(post => ({
    post,
    health: computeContentHealth(post),
  })).sort((a, b) => a.health.score - b.health.score);
}

/**
 * Count SEO opportunity issues for a list of posts.
 * Returns { total, missingTitle, missingDesc, missingOg, missingImage, missingCategory, missingTags }
 */
export function countSeoOpportunities(posts) {
  const published = posts.filter(p => p.status === 'published');
  return {
    total: published.reduce((acc, p) => {
      const h = computeContentHealth(p);
      return acc + h.checks.filter(c => !c.pass).length;
    }, 0),
    missingTitle: published.filter(p => !(p.seoTitle && p.seoTitle.trim().length >= 10)).length,
    missingDesc: published.filter(p => !(p.seoDescription && p.seoDescription.trim().length >= 50)).length,
    missingOg: published.filter(p => !(p.ogImageUrl && p.ogImageUrl.trim())).length,
    missingImage: published.filter(p => !(p.imageUrl && p.imageUrl.trim())).length,
    missingCategory: published.filter(p => !(p.category && p.category.trim())).length,
    missingTags: published.filter(p => !Array.isArray(p.tags) || p.tags.length === 0).length,
  };
}
