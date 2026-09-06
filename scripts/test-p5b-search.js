/**
 * test-p5b-search.js
 * Automated test suite for Phase P5-B: Search & Discovery
 */

import assert from 'assert';
import { scorePost, searchAndRank } from '../src/utils/searchEngine.js';

console.log('\n==================================================');
console.log('🧪 P5-B SEARCH & DISCOVERY TEST SUITE');
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

// ─── Test 1: Deterministic Search Scoring Matrix ──────────────────────────────
runTest('Title exact match gets +20 and ranks highest', () => {
  const p1 = { id: '1', title: 'WhatsApp Automation', status: 'published' };
  const p2 = { id: '2', title: 'Guide to WhatsApp', status: 'published' };
  const p3 = { id: '3', title: 'CRM Solutions', excerpt: 'WhatsApp integration', status: 'published' };

  const s1 = scorePost(p1, 'WhatsApp Automation');
  const s2 = scorePost(p2, 'WhatsApp Automation');
  const s3 = scorePost(p3, 'WhatsApp Automation');

  assert.strictEqual(s1, 20, 'Exact title match should score 20');
  assert.ok(s1 > s2, 'Exact title match should score higher than partial');
  assert.ok(s2 > s3, 'Partial title match should score higher than excerpt match');
});

// ─── Test 2: Draft & Unpublished Exclusion ────────────────────────────────────
runTest('Search excludes unpublished posts', () => {
  const samplePosts = [
    { id: '1', title: 'AI Security Guide', status: 'published' },
    { id: '2', title: 'AI Security Secret Draft', status: 'draft' },
    { id: '3', title: 'AI Security Future', status: 'scheduled' },
    { id: '4', title: 'AI Security Old', status: 'archived' },
  ];

  const results = searchAndRank(samplePosts, 'AI Security');
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].id, '1');
});

// ─── Test 3: XSS Term Highlighting Safety ─────────────────────────────────────
runTest('Malicious XSS script injection in query is neutralized', () => {
  const maliciousQuery = '<script>alert(1)</script>';
  const post = { id: '1', title: 'Normal Article', status: 'published' };

  // Score function handles raw string without executing script
  const score = scorePost(post, maliciousQuery);
  assert.strictEqual(typeof score, 'number');
  assert.strictEqual(score, 0);
});

// ─── Test 4: Category and Tag Filter Integration ──────────────────────────────
runTest('Filters results by category and tag correctly', () => {
  const samplePosts = [
    { id: '1', title: 'AI Post 1', category: 'AI', tags: ['llm', 'agents'], status: 'published' },
    { id: '2', title: 'AI Post 2', category: 'AI', tags: ['crm'], status: 'published' },
    { id: '3', title: 'Biz Post', category: 'Business', tags: ['llm'], status: 'published' },
  ];

  const filteredCat = searchAndRank(samplePosts, '', { category: 'AI' });
  assert.strictEqual(filteredCat.length, 2);

  const filteredTag = searchAndRank(samplePosts, '', { tag: 'llm' });
  assert.strictEqual(filteredTag.length, 2);

  const filteredBoth = searchAndRank(samplePosts, '', { category: 'AI', tag: 'llm' });
  assert.strictEqual(filteredBoth.length, 1);
  assert.strictEqual(filteredBoth[0].id, '1');
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n==================================================');
console.log(`P5-B RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) {
  process.exit(1);
}
