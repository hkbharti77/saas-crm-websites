/**
 * contentStrategyEngine.js
 * Content Growth Intelligence & Deterministic Strategy Engine for GyanVaniAi Blog CMS.
 *
 * Combines P2 Content Management, P3 Analytics, P4 AI Content Intelligence, and P5 SEO/Conversion data.
 *
 * OPPORTUNITY TYPES:
 * 1. Create New Content (Content Gap)
 * 2. Refresh Existing Content (Aging / Stale)
 * 3. Improve SEO (Meta / OG / Titles)
 * 4. Add Internal Links (Link gaps)
 * 5. Improve CTA (Low CTA CTR / High views without CTA)
 * 6. Improve Content Structure (Low read completion)
 * 7. Resolve Topic Overlap (Cannibalization)
 *
 * RULES:
 * - NO fake metrics or fabricated Google data.
 * - AI output is strictly advisory; auto-publishing is strictly prohibited.
 */

import { computeContentHealth } from './contentHealth.js';

/**
 * Score an opportunity deterministically into High (0), Medium (1), or Low (2) priority.
 * @param {Object} item
 * @returns {number} 0 = High, 1 = Medium, 2 = Low
 */
export function scoreOpportunityPriority(item) {
  if (!item) return 2;

  // Urgent conditions get High Priority (0)
  if (
    item.category === 'Declining Traffic' ||
    item.category === 'Missing SEO Metadata' ||
    item.type === 'urgent' ||
    item.healthScore < 40 ||
    item.trafficDropPct > 30
  ) {
    return 0; // High Priority
  }

  // Medium conditions (1)
  if (
    item.category === 'Thin Content' ||
    item.category === 'Missing OG Image' ||
    item.category === 'CTA Optimization' ||
    item.category === 'Topic Overlap' ||
    item.type === 'warning' ||
    (item.healthScore >= 40 && item.healthScore < 70)
  ) {
    return 1; // Medium Priority
  }

  // Low conditions (2)
  return 2; // Low Priority
}

/**
 * Build unified Growth Intelligence Summary & Prioritized Priority Board.
 */
export function buildGrowthIntelligenceReport(publishedPosts = [], _analyticsDocs = []) {
  const published = publishedPosts.filter(p => p.status === 'published');
  const board = {
    highPriority: [],
    mediumPriority: [],
    lowPriority: [],
  };

  // 1. Audit published articles
  published.forEach(post => {
    const health = computeContentHealth(post);

    if (health.score < 50) {
      const opp = {
        id: `health_${post.id}`,
        postId: post.id,
        title: post.title,
        category: 'Improve Content Structure',
        reason: `Content Health Score is ${health.score}/100. ${health.checks.filter(c => !c.pass).map(c => c.label).join(', ')}.`,
        recommendedAction: 'Refresh content structure, add missing meta fields, and format headings.',
        healthScore: health.score,
        actionType: 'edit',
        actionLink: `/admin/edit/${post.id}`,
      };
      const priority = scoreOpportunityPriority(opp);
      if (priority === 0) board.highPriority.push(opp);
      else if (priority === 1) board.mediumPriority.push(opp);
      else board.lowPriority.push(opp);
    }
  });

  // 2. Category gaps
  const categoryCount = {};
  published.forEach(p => {
    if (p.category) {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    }
  });

  Object.entries(categoryCount).forEach(([cat, count]) => {
    if (count >= 5) {
      const opp = {
        id: `cluster_strong_${cat}`,
        title: `Expand Pillar Cluster: ${cat}`,
        category: 'Create New Content',
        reason: `The "${cat}" topic cluster has ${count} published articles and strong authority.`,
        recommendedAction: 'Create a new sub-topic guide or brief to capitalize on topical authority.',
        actionType: 'brief',
        suggestedTopic: `${cat} Advanced Implementation Guide`,
      };
      board.mediumPriority.push(opp);
    }
  });

  return {
    publishedCount: published.length,
    highPriorityCount: board.highPriority.length,
    mediumPriorityCount: board.mediumPriority.length,
    lowPriorityCount: board.lowPriority.length,
    board,
  };
}

/**
 * Format structured data prompt for AI Strategy Assistant ("What should I work on next?").
 * Ensures zero fabricated data and strictly structured real inputs.
 */
export function buildAiStrategyAssistantPrompt(reportData = {}) {
  return `You are GyanVaniAi's Senior Content Strategist AI.
Analyze the following REAL structured publication metrics and produce a concise, prioritized content execution roadmap for the editor.

PUBLICATION SNAPSHOT:
- Total Published Articles: ${reportData.publishedCount || 0}
- High Priority Opportunities: ${reportData.highPriorityCount || 0}
- Medium Priority Opportunities: ${reportData.mediumPriorityCount || 0}

INSTRUCTIONS:
1. Provide a 3-step prioritized action plan (e.g. 1. High-Impact Refreshes, 2. SEO Fixes, 3. Strategic Content Briefs).
2. Base ALL suggestions strictly on the supplied data. Do NOT invent fake rankings, search volumes, or impression numbers.
3. Keep recommendations actionable and advisory.`;
}
