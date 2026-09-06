/**
 * test-p5f-content-growth.js
 * Automated test suite for Phase P5-F: Content Growth Intelligence
 */

import assert from 'assert';
import {
  scoreOpportunityPriority,
  buildGrowthIntelligenceReport,
  buildAiStrategyAssistantPrompt,
} from '../src/utils/contentStrategyEngine.js';

console.log('\n==================================================');
console.log('🧪 P5-F CONTENT GROWTH INTELLIGENCE TEST SUITE');
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

// ─── Test 1: Priority Scoring Formula ──────────────────────────────────────────
runTest('Scores urgent traffic drops / low health as High Priority (0)', () => {
  const urgentItem = { category: 'Declining Traffic', trafficDropPct: 45 };
  const mediumItem = { category: 'Thin Content', healthScore: 55 };
  const lowItem = { category: 'Taxonomy', healthScore: 85 };

  assert.strictEqual(scoreOpportunityPriority(urgentItem), 0, 'Declining traffic should be High Priority (0)');
  assert.strictEqual(scoreOpportunityPriority(mediumItem), 1, 'Thin content should be Medium Priority (1)');
  assert.strictEqual(scoreOpportunityPriority(lowItem), 2, 'High health score should be Low Priority (2)');
});

// ─── Test 2: Growth Intelligence Report & Board Matrix ────────────────────────
runTest('Generates prioritized opportunity board matrix from published articles', () => {
  const publishedArticles = [
    { id: 'p1', title: 'Low Health Post', status: 'published', category: 'AI', content: '<p>Short</p>' },
    { id: 'p2', title: 'Strong AI Post 1', status: 'published', category: 'AI', content: '<p>Full content</p>' },
    { id: 'p3', title: 'Strong AI Post 2', status: 'published', category: 'AI', content: '<p>Full content</p>' },
    { id: 'p4', title: 'Strong AI Post 3', status: 'published', category: 'AI', content: '<p>Full content</p>' },
    { id: 'p5', title: 'Strong AI Post 4', status: 'published', category: 'AI', content: '<p>Full content</p>' },
    { id: 'p6', title: 'Strong AI Post 5', status: 'published', category: 'AI', content: '<p>Full content</p>' },
  ];

  const report = buildGrowthIntelligenceReport(publishedArticles);
  assert.strictEqual(report.publishedCount, 6);
  assert.ok(report.board.highPriority.length >= 1, 'Should flag low health post in High Priority');
  assert.ok(report.board.mediumPriority.length >= 1, 'Should suggest expanding pillar cluster in Medium Priority');
});

// ─── Test 3: AI Strategy Prompt Safety & Zero-Fabrication Guarantee ────────────
runTest('Builds AI strategy assistant prompt with structured stats without fake numbers', () => {
  const reportData = {
    publishedCount: 12,
    highPriorityCount: 2,
    mediumPriorityCount: 4,
  };

  const prompt = buildAiStrategyAssistantPrompt(reportData);
  assert.ok(prompt.includes('Total Published Articles: 12'));
  assert.ok(prompt.includes('High Priority Opportunities: 2'));
  assert.ok(prompt.includes('Do NOT invent fake rankings'));
});

// ─── Test 4: Non-Publishing Safety Guarantee ──────────────────────────────────
runTest('Growth Intelligence actions only route to Brief Creation or Editor Working Drafts', () => {
  const sampleArticles = [
    { id: 'sec-1', title: 'Security Audit', status: 'published' }
  ];

  const report = buildGrowthIntelligenceReport(sampleArticles);
  // Verify all board items point to edit links or brief creation actions
  const allBoardItems = [...report.board.highPriority, ...report.board.mediumPriority, ...report.board.lowPriority];
  allBoardItems.forEach(item => {
    assert.ok(item.actionType === 'edit' || item.actionType === 'brief');
    assert.ok(!item.autoPublish, 'Auto-publishing must never be enabled');
  });
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n==================================================');
console.log(`P5-F RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) {
  process.exit(1);
}
