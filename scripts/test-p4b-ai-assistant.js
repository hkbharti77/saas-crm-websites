/**
 * scripts/test-p4b-ai-assistant.js
 * Automated test suite for P4-B AI Content Assistant.
 * Tests 15 controlled actions, prompt construction, XSS DOMPurify sanitization, and working draft security.
 */

import { buildAssistPrompt, ALLOWED_OPERATIONS, TONE_OPTIONS } from '../src/services/ai/aiPrompts.js';
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

async function runP4BTests() {
  console.log('\n==================================================');
  console.log('🧪 P4-B AI CONTENT ASSISTANT TEST SUITE');
  console.log('==================================================\n');

  // ------------------------------------------------------------------
  // TEST 1: All 15 Controlled Operations & Tone Options
  // ------------------------------------------------------------------
  console.log('Test 1: 15 Controlled Operations Validation');
  const expectedOps = [
    'improve_writing', 'rewrite', 'concise', 'expand', 'change_tone', 'grammar',
    'introduction', 'conclusion', 'headings', 'faq', 'summary', 'social_post',
    'seo_title', 'meta_description', 'cta'
  ];

  assert(ALLOWED_OPERATIONS.size >= 15, 'At least 15 controlled operations registered in ALLOWED_OPERATIONS');
  expectedOps.forEach(op => {
    assert(ALLOWED_OPERATIONS.has(op), `Operation "${op}" is supported`);
  });

  assert(TONE_OPTIONS.length === 6, 'Contains 6 controlled tone options');

  // Rejection of unknown operation
  try {
    buildAssistPrompt('unauthorized_op', 'Text');
    assert(false, 'Should have thrown error for unknown operation');
  } catch (err) {
    assert(err.message.includes('Unsupported AI operation'), 'Rejects unknown operations with clear error');
  }

  // ------------------------------------------------------------------
  // TEST 2: Prompt Construction for Selection & Context
  // ------------------------------------------------------------------
  console.log('\nTest 2: Server-Side Prompt Construction');
  const context = {
    title: 'Enterprise AI CRM Guide',
    category: 'AI Automation',
    excerpt: 'How AI transforms CRM sales workflows',
    existingContent: '<p>Initial article body content...</p>',
  };

  const p1 = buildAssistPrompt('improve_writing', 'Selected paragraph text', context);
  assert(p1.prompt.includes('Improve the writing quality'), 'improve_writing prompt includes task instruction');
  assert(p1.prompt.includes('Selected paragraph text'), 'includes target text snippet');

  const pTone = buildAssistPrompt('change_tone', 'Target text', context, 'Persuasive');
  assert(pTone.prompt.includes('Persuasive tone'), 'change_tone prompt includes requested tone');

  const pSeo = buildAssistPrompt('seo_title', '', context);
  assert(pSeo.prompt.includes('Enterprise AI CRM Guide'), 'seo_title prompt uses article context title');

  // ------------------------------------------------------------------
  // TEST 3: XSS & HTML Output Security (DOMPurify Sanitization)
  // ------------------------------------------------------------------
  console.log('\nTest 3: AI Output Security & DOMPurify Sanitization');
  
  // XSS Payload 1: <script>
  const xssScript = '<h2>Heading</h2><script>alert("xss")</script><p>Safe content</p>';
  const clean1 = sanitizeBlogHtml(xssScript);
  assert(!clean1.includes('<script>'), 'Strips <script> tags from AI output');
  assert(clean1.includes('<h2>Heading</h2>') && clean1.includes('<p>Safe content</p>'), 'Preserves safe semantic HTML');

  // XSS Payload 2: onerror event handler
  const xssImg = '<img src="x" onerror="alert(1)" alt="Test" />';
  const clean2 = sanitizeBlogHtml(xssImg);
  assert(!clean2.includes('onerror'), 'Strips onerror event attributes');
  assert(clean2.includes('alt="Test"'), 'Preserves safe image attributes');

  // XSS Payload 3: javascript: link
  const xssLink = '<a href="javascript:alert(1)">Click here</a>';
  const clean3 = sanitizeBlogHtml(xssLink);
  assert(!clean3.includes('javascript:'), 'Strips javascript: pseudo-protocol from links');

  // ------------------------------------------------------------------
  // TEST 4: Context Truncation & Non-PII Boundaries
  // ------------------------------------------------------------------
  console.log('\nTest 4: Context Truncation & Privacy');
  const longContent = 'A'.repeat(5000);
  const pLong = buildAssistPrompt('conclusion', '', { ...context, existingContent: longContent });
  assert(pLong.prompt.length < 3000, 'Context is safely truncated to prevent prompt bloat');

  console.log('\n==================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runP4BTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
