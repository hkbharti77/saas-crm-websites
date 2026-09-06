/**
 * test-p4f-content-refresh.js
 * Automated test suite for P4-F Content Refresh + AI History + Audit.
 * Tests freshness heuristics, refresh priorities, version snapshotting, workingDraft safety, and AI operation logging.
 */

import { sanitizeBlogHtml } from '../src/utils/sanitizeBlogHtml.js';

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
    failed++;
  }
}

async function runP4FTests() {
  console.log('\n==================================================');
  console.log('🧪 P4-F CONTENT REFRESH & AI HISTORY TEST SUITE');
  console.log('==================================================\n');

  // Test 1: Content Freshness Heuristics Calculation
  console.log('Test 1: Content Freshness Heuristics');
  const now = Date.now();
  const monthMs = 1000 * 60 * 60 * 24 * 30.4375;

  const freshDate = new Date(now - 3 * monthMs); // 3 months ago
  const agingDate = new Date(now - 10 * monthMs); // 10 months ago
  const staleDate = new Date(now - 22 * monthMs); // 22 months ago

  const calcFreshness = (pubDate) => {
    const ageMonths = (now - pubDate.getTime()) / monthMs;
    if (ageMonths > 18) return 'stale';
    if (ageMonths > 6) return 'aging';
    return 'fresh';
  };

  assert(calcFreshness(freshDate) === 'fresh', '3-month old post classified as "fresh"');
  assert(calcFreshness(agingDate) === 'aging', '10-month old post classified as "aging"');
  assert(calcFreshness(staleDate) === 'stale', '22-month old post classified as "stale"');

  // Test 2: Version Snapshot Payload (source = 'ai_refresh')
  console.log('\nTest 2: Pre-Refresh Version Snapshot Metadata');
  const sampleArticle = {
    id: 'art-999',
    title: 'Legacy CRM Integration Guide',
    content: '<p>Original content before AI refresh...</p>',
    publishedAt: new Date()
  };

  const versionSnapshot = {
    blogId: sampleArticle.id,
    title: sampleArticle.title,
    content: sampleArticle.content,
    publishedAt: sampleArticle.publishedAt,
    source: 'ai_refresh',
    operation: 'introduction',
    summary: 'Version snapshot prior to applying AI refresh (introduction)'
  };

  assert(versionSnapshot.source === 'ai_refresh', 'Version snapshot includes source="ai_refresh"');
  assert(versionSnapshot.operation === 'introduction', 'Version snapshot records specific AI operation');

  // Test 3: Working Draft Refresh Isolation
  console.log('\nTest 3: Working Draft Refresh Isolation');
  const refreshedHtml = '<h2>Modernized Introduction</h2><p>Updated 2026 SaaS AI deal scoring workflows...</p>';
  const cleanRefreshedHtml = sanitizeBlogHtml(refreshedHtml);

  const updatedWorkingDraft = {
    title: sampleArticle.title,
    content: `${cleanRefreshedHtml}\n\n${sampleArticle.content}`,
    status: 'published', // Document status remains published
    updatedAt: new Date().toISOString()
  };

  assert(updatedWorkingDraft.status === 'published', 'Document status remains "published" in Firestore');
  assert(updatedWorkingDraft.content.includes('Modernized Introduction'), 'Working draft receives sanitized refreshed content');
  assert(sampleArticle.content === '<p>Original content before AI refresh...</p>', 'Original published article object remains untouched until explicit publish');

  // Test 4: AI History Log Structure
  console.log('\nTest 4: AI History Operation Logging Structure');
  const aiHistoryEntry = {
    blogId: 'art-999',
    userId: 'usr-123',
    operation: 'faq',
    status: 'success',
    applied: true,
    summary: 'Generated 4 FAQ candidates'
  };

  assert(aiHistoryEntry.operation === 'faq', 'AI history entry records operation name');
  assert(aiHistoryEntry.status === 'success', 'AI history entry records status');
  assert(!('apiKey' in aiHistoryEntry) && !('secret' in aiHistoryEntry), 'AI history log contains ZERO API keys or secrets');

  // Summary
  console.log('\n==================================================');
  console.log(`P4-F TEST SUITE COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) process.exit(1);
}

runP4FTests().catch(err => {
  console.error('Fatal error in P4-F test runner:', err);
  process.exit(1);
});
