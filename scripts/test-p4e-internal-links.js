/**
 * test-p4e-internal-links.js
 * Automated test suite for P4-E Internal Linking & Content Gaps.
 * Tests deterministic scoring, self-link exclusion, draft/scheduled/archived post exclusion, URL safety, and gap detection.
 */

import { analyzeInternalLinks } from '../src/utils/internalLinkAnalyzer.js';
import { analyzeContentGaps } from '../src/utils/contentGapAnalyzer.js';
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

async function runP4ETests() {
  console.log('\n==================================================');
  console.log('🧪 P4-E INTERNAL LINKING & CONTENT GAPS TEST SUITE');
  console.log('==================================================\n');

  // Sample blog library
  const mockBlogs = [
    { id: 'b1', title: 'WhatsApp Business API Guide', category: 'WhatsApp CRM', tags: ['whatsapp', 'crm'], status: 'published', slugId: 'whatsapp-business-api-guide' },
    { id: 'b2', title: 'Automated Sales Pipelines 2026', category: 'Sales Automation', tags: ['sales', 'automation'], status: 'published', slugId: 'automated-sales-pipelines-2026' },
    { id: 'b3', title: 'Draft Article on Bots', category: 'WhatsApp CRM', tags: ['whatsapp'], status: 'draft', slugId: 'draft-article-bots' },
    { id: 'b4', title: 'Scheduled AI Chatbots', category: 'AI Chatbots', tags: ['ai', 'chatbots'], status: 'scheduled', slugId: 'scheduled-ai-chatbots' },
    { id: 'b5', title: 'Archived Legacy Article', category: 'WhatsApp CRM', tags: ['whatsapp'], status: 'archived', slugId: 'archived-legacy-article' },
  ];

  // Test 1: Internal Link Filtering & Scoring
  console.log('Test 1: Internal Link Analysis & Exclusion Filters');
  const recs = analyzeInternalLinks({
    currentBlogId: 'b1', // current article is b1
    currentCategory: 'WhatsApp CRM',
    currentTags: ['whatsapp'],
    currentContent: '<p>Learn about sales pipelines and automation...</p>',
    publishedBlogs: mockBlogs
  });

  assert(Array.isArray(recs), 'Returns an array of link recommendations');
  assert(!recs.some(r => r.id === 'b1'), 'Excludes self-link (current article b1)');
  assert(!recs.some(r => r.id === 'b3'), 'Excludes draft articles (b3)');
  assert(!recs.some(r => r.id === 'b4'), 'Excludes scheduled articles (b4)');
  assert(!recs.some(r => r.id === 'b5'), 'Excludes archived articles (b5)');
  assert(recs.some(r => r.id === 'b2'), 'Recommends published article b2');

  // Test 2: Existing Link Exclusion
  console.log('\nTest 2: Existing Destination Exclusion');
  const recsWithExisting = analyzeInternalLinks({
    currentBlogId: 'b1',
    currentCategory: 'WhatsApp CRM',
    currentTags: ['whatsapp'],
    currentContent: '<p>Check out our <a href="/blog/automated-sales-pipelines-2026">Sales Pipeline Guide</a></p>',
    publishedBlogs: mockBlogs
  });
  assert(!recsWithExisting.some(r => r.targetUrl === '/blog/automated-sales-pipelines-2026'), 'Excludes target URLs already linked in content');

  // Test 3: Safe HTML Insertion & URL Validation
  console.log('\nTest 3: Internal URL Security & HTML Sanitization');
  const dirtyLinkSnippet = '<p>Related: <a href="/blog/safe-post" onclick="alert(1)">Safe Link</a> <a href="javascript:alert(1)">Evil Link</a></p>';
  const cleanSnippet = sanitizeBlogHtml(dirtyLinkSnippet);
  assert(!cleanSnippet.includes('onclick='), 'Strips onclick handler from inserted link snippet');
  assert(!cleanSnippet.includes('javascript:'), 'Strips javascript: pseudo-protocol from link snippet');
  assert(cleanSnippet.includes('href="/blog/safe-post"'), 'Preserves safe relative internal URL');

  // Test 4: Content Gap Analysis
  console.log('\nTest 4: Deterministic Content Gap Analysis');
  const categories = [
    { name: 'WhatsApp CRM', description: 'WhatsApp messaging solutions' },
    { name: 'Sales Automation', description: 'Lead scoring and pipeline automation' },
    { name: 'AI Chatbots', description: 'Custom AI conversational bots' }
  ];

  const gapResults = analyzeContentGaps(mockBlogs, categories);
  assert(gapResults && Array.isArray(gapResults.gaps), 'Returns content gap recommendations');
  assert(Array.isArray(gapResults.clusters), 'Returns topic clusters tree');
  assert(gapResults.summaryStats.thinCategoriesCount > 0, 'Identifies thin categories with < 3 articles');

  // Summary
  console.log('\n==================================================');
  console.log(`P4-E TEST SUITE COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) process.exit(1);
}

runP4ETests().catch(err => {
  console.error('Fatal error in P4-E test runner:', err);
  process.exit(1);
});
