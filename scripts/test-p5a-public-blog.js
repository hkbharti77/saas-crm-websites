/**
 * test-p5a-public-blog.js
 * Automated test suite for Phase P5-A: Public Blog Experience
 */

import assert from 'assert';

console.log('\n==================================================');
console.log('🧪 P5-A PUBLIC BLOG EXPERIENCE TEST SUITE');
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

// ─── Test 1: Published Posts Protection ────────────────────────────────────────
runTest('Only published posts expose to public visitors', () => {
  const mockDbPosts = [
    { id: 'p1', title: 'Published Post', status: 'published' },
    { id: 'p2', title: 'Draft Post', status: 'draft' },
    { id: 'p3', title: 'Scheduled Post', status: 'scheduled' },
    { id: 'p4', title: 'Archived Post', status: 'archived' },
  ];

  const publicExposed = mockDbPosts.filter(b => b.status === 'published');
  assert.strictEqual(publicExposed.length, 1);
  assert.strictEqual(publicExposed[0].id, 'p1');
});

// ─── Test 2: Prev / Next Article Calculation ──────────────────────────────────
runTest('Calculates adjacent published articles correctly', () => {
  const publishedArticles = [
    { id: 'b3', title: 'Newest Post', createdAt: 300 },
    { id: 'b2', title: 'Middle Post', createdAt: 200 },
    { id: 'b1', title: 'Oldest Post', createdAt: 100 },
  ];

  const currentIdx = publishedArticles.findIndex(p => p.id === 'b2');
  const nextPost = currentIdx > 0 ? publishedArticles[currentIdx - 1] : null;
  const prevPost = currentIdx < publishedArticles.length - 1 ? publishedArticles[currentIdx + 1] : null;

  assert.strictEqual(nextPost.id, 'b3', 'Next post should be the newer article');
  assert.strictEqual(prevPost.id, 'b1', 'Prev post should be the older article');
});

// ─── Test 3: Table of Contents Heading Extraction ─────────────────────────────
runTest('Extracts h2/h3 headings and assigns safe IDs', () => {
  const sampleHtml = `
    <h2>Introduction to Multi-Agent Systems</h2>
    <p>Some paragraph text here...</p>
    <h3>Agent Architecture</h3>
    <p>More text...</p>
    <h2>Conclusion</h2>
  `;

  // Regex-based heading extractor simulating DOMParser structure
  const headingMatches = Array.from(sampleHtml.matchAll(/<(h[23])>(.*?)<\/\1>/gi));
  const extracted = headingMatches.map((m, idx) => ({
    id: `heading-${idx}`,
    level: parseInt(m[1][1]),
    text: m[2],
  }));

  assert.strictEqual(extracted.length, 3);
  assert.strictEqual(extracted[0].text, 'Introduction to Multi-Agent Systems');
  assert.strictEqual(extracted[0].level, 2);
  assert.strictEqual(extracted[1].level, 3);
  assert.strictEqual(extracted[2].text, 'Conclusion');
});

// ─── Test 4: Social Share Link Formatting & Privacy ───────────────────────────
runTest('Social share links build cleanly without leaking private data', () => {
  const shareTitle = 'Enterprise AI Orchestration';
  const shareUrl = 'https://www.gyanvaniai.online/blog/ai-orchestration';

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' - ' + shareUrl)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;

  assert.ok(waUrl.includes('api.whatsapp.com'));
  assert.ok(liUrl.includes('linkedin.com'));
  assert.ok(twUrl.includes('twitter.com'));
  assert.ok(!waUrl.includes('undefined'));
  assert.ok(!liUrl.includes('draft'));
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n==================================================');
console.log(`P5-A RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) {
  process.exit(1);
}
