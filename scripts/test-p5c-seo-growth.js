/**
 * test-p5c-seo-growth.js
 * Automated test suite for Phase P5-C: SEO Growth
 */

import assert from 'assert';
import { getSearchConsoleStatus, getSearchConsoleMetrics } from '../src/utils/searchConsoleService.js';
import {
  detectContentCannibalization,
  detectCtrOpportunities,
  detectPositionOpportunities,
  generateSeoOpportunities,
} from '../src/utils/seoGrowthEngine.js';

console.log('\n==================================================');
console.log('🧪 P5-C SEO GROWTH TEST SUITE');
console.log('==================================================\n');

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  ✅ PASS: ${name}`);
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// ─── Test 1: Disconnected Search Console Handling ────────────────────────────
runTest('Returns clear un-connected status without fake data when Search Console is disconnected', async () => {
  const status = getSearchConsoleStatus();
  assert.strictEqual(status.connected, false);
  assert.strictEqual(status.message, 'Search Console not connected');

  const metrics = await getSearchConsoleMetrics('28d');
  assert.strictEqual(metrics.connected, false);
  assert.strictEqual(metrics.totals.clicks, 0);
  assert.strictEqual(metrics.totals.impressions, 0);
});

// ─── Test 2: Content Cannibalization & Overlap Detector ──────────────────────
runTest('Detects topic cannibalization when articles share significant keyword overlap', () => {
  const articles = [
    {
      id: 'a1',
      title: 'WhatsApp Automation Integration Guide for Enterprise',
      excerpt: 'Comprehensive guide to building WhatsApp automation pipelines with custom AI agents.',
      category: 'Automation',
      tags: ['whatsapp', 'automation', 'crm'],
      status: 'published',
    },
    {
      id: 'a2',
      title: 'WhatsApp Automation Integration Tutorial for Enterprise',
      excerpt: 'Complete tutorial on setting up WhatsApp automation pipelines with AI agents.',
      category: 'Automation',
      tags: ['whatsapp', 'automation', 'crm'],
      status: 'published',
    },
    {
      id: 'a3',
      title: 'Unrelated Cloud Security Guide',
      excerpt: 'Enterprise cloud infrastructure security standards.',
      category: 'Security',
      tags: ['cloud', 'security'],
      status: 'published',
    },
  ];

  const warnings = detectContentCannibalization(articles);
  assert.strictEqual(warnings.length, 1);
  assert.strictEqual(warnings[0].articleA.id, 'a1');
  assert.strictEqual(warnings[0].articleB.id, 'a2');
  assert.ok(warnings[0].similarityScore >= 40);
});

// ─── Test 3: CTR Opportunity Detection ────────────────────────────────────────
runTest('Identifies high-impression, low-CTR articles as optimization opportunities', () => {
  const articles = [
    { id: 'b1', title: 'High Impression Low CTR Article', slugId: 'high-imp', status: 'published' },
    { id: 'b2', title: 'High Impression High CTR Article', slugId: 'high-ctr', status: 'published' },
  ];

  const mockGscPages = [
    { page: '/blog/high-imp', impressions: 1200, ctr: 0.012 }, // 1.2% CTR (< 2%)
    { page: '/blog/high-ctr', impressions: 1500, ctr: 0.085 }, // 8.5% CTR
  ];

  const ops = detectCtrOpportunities(articles, mockGscPages);
  assert.strictEqual(ops.length, 1);
  assert.strictEqual(ops[0].articleId, 'b1');
  assert.ok(ops[0].recommendation.includes('stronger title'));
});

// ─── Test 4: Position Opportunity Detection ──────────────────────────────────
runTest('Identifies page 1-2 ranking articles (positions 5-20) for push optimization', () => {
  const articles = [
    { id: 'c1', title: 'Ranking Position 8 Article', slugId: 'pos-8', status: 'published' },
    { id: 'c2', title: 'Ranking Position 1 Article', slugId: 'pos-1', status: 'published' },
  ];

  const mockGscPages = [
    { page: '/blog/pos-8', position: 8.4 },
    { page: '/blog/pos-1', position: 1.2 },
  ];

  const ops = detectPositionOpportunities(articles, mockGscPages);
  assert.strictEqual(ops.length, 1);
  assert.strictEqual(ops[0].articleId, 'c1');
  assert.strictEqual(ops[0].position, '8.4');
});

// ─── Test 5: Working Draft Safety Enforcement ────────────────────────────────
runTest('SEO Opportunity engine only generates advisory recommendations without auto-publishing', () => {
  const articles = [
    { id: 'd1', title: 'Short', status: 'published', excerpt: 'Short' }
  ];

  const report = generateSeoOpportunities(articles);
  assert.ok(Array.isArray(report.metaAuditOps));
  assert.ok(report.metaAuditOps.length > 0);
  // Ensure status of original article is unchanged
  assert.strictEqual(articles[0].status, 'published');
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n==================================================');
console.log(`P5-C RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) {
  process.exit(1);
}
