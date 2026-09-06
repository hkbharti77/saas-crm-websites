/**
 * contentGapAnalyzer.js
 * Deterministic Content Gap Analysis & Pillar Topic Cluster generator.
 * Identifies categories with thin coverage, isolated tags, and missing subtopics.
 *
 * TRUTH IN DATA:
 * - Uses real publication counts and topic relationships.
 * - Zero fake Google demand, search volume, CPC, or ranking metrics.
 */

export function analyzeContentGaps(publishedBlogs = [], categories = []) {
  const categoryCounts = {};
  const tagCounts = {};
  const pillarClusters = {};

  // 1. Map existing categories and counts
  categories.forEach(cat => {
    categoryCounts[cat.name] = 0;
    pillarClusters[cat.name] = {
      pillarName: cat.name,
      description: cat.description || `Content cluster around ${cat.name}`,
      articles: [],
      gaps: []
    };
  });

  publishedBlogs.forEach(blog => {
    if (blog.status !== 'published') return;

    const catName = blog.category || 'General';
    categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;

    if (!pillarClusters[catName]) {
      pillarClusters[catName] = {
        pillarName: catName,
        description: `Content cluster around ${catName}`,
        articles: [],
        gaps: []
      };
    }

    pillarClusters[catName].articles.push({
      id: blog.id,
      title: blog.title,
      slugId: blog.slugId,
      publishedAt: blog.publishedAt
    });

    if (Array.isArray(blog.tags)) {
      blog.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const gapRecommendations = [];

  // 2. Category Gaps: Thin categories (< 3 published articles)
  Object.keys(categoryCounts).forEach(catName => {
    const count = categoryCounts[catName];
    if (count < 3) {
      const gapObj = {
        id: `gap-cat-${catName.toLowerCase().replace(/\s+/g, '-')}`,
        topic: `${catName} Fundamental Implementation Guide`,
        category: catName,
        reason: `Category "${catName}" has only ${count} published article(s). Publishing core guides builds topical authority.`,
        suggestedAngle: `Comprehensive 101 guide covering foundational workflows and best practices for ${catName}.`,
        priority: count === 0 ? 'High' : 'Medium'
      };
      gapRecommendations.push(gapObj);
      if (pillarClusters[catName]) {
        pillarClusters[catName].gaps.push(gapObj);
      }
    }
  });

  // 3. Tag Gaps: Isolated tags (used in 1 article)
  Object.keys(tagCounts).forEach(tag => {
    if (tagCounts[tag] === 1) {
      gapRecommendations.push({
        id: `gap-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`,
        topic: `Advanced Strategies for #${tag}`,
        category: 'Topic Cluster',
        reason: `Tag "#${tag}" is currently isolated to 1 article. Adding follow-up content forms a interlinked topic cluster.`,
        suggestedAngle: `Deep-dive tactical comparison or case study focused on ${tag}.`,
        priority: 'Low'
      });
    }
  });

  return {
    gaps: gapRecommendations.slice(0, 10),
    clusters: Object.values(pillarClusters),
    summaryStats: {
      totalPublished: publishedBlogs.filter(b => b.status === 'published').length,
      categoriesCount: categories.length,
      thinCategoriesCount: Object.values(categoryCounts).filter(c => c < 3).length
    }
  };
}
