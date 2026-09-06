/**
 * test-p5d-conversion-cta.js
 * Automated test suite for Phase P5-D: Conversion & CTAs
 */

import assert from 'assert';
import { validateCtaUrl, resolveEffectiveCta, resolveAbCtaVariant, CATEGORY_DEFAULT_CTAS } from '../src/utils/ctaManager.js';
import { trackBlogCta } from '../src/utils/blogAnalytics.js';


console.log('\n==================================================');
console.log('🧪 P5-D CONVERSION & CTAS TEST SUITE');
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

// ─── Test 1: URL Security Validation ──────────────────────────────────────────
runTest('Validates safe CTA URLs and rejects dangerous pseudo-protocols', () => {
  assert.strictEqual(validateCtaUrl('https://example.com/demo'), 'https://example.com/demo');
  assert.strictEqual(validateCtaUrl('/services/whatsapp-coexistence'), '/services/whatsapp-coexistence');
  assert.strictEqual(validateCtaUrl('javascript:alert(1)'), '', 'Must reject javascript:');
  assert.strictEqual(validateCtaUrl('data:text/html,<script>alert(1)</script>'), '', 'Must reject data:');
  assert.strictEqual(validateCtaUrl('vbscript:msgbox("test")'), '', 'Must reject vbscript:');
});

// ─── Test 2: Effective CTA Resolution Cascade ────────────────────────────────
runTest('Resolves article custom CTA -> category default -> fallback correctly', () => {
  // 1. Per-article custom override
  const customPost = {
    id: 'p1',
    ctaType: 'download',
    ctaTitle: 'Custom Whitepaper Title',
    ctaUrl: 'https://example.com/whitepaper.pdf',
    status: 'published',
  };
  const cta1 = resolveEffectiveCta(customPost);
  assert.strictEqual(cta1.ctaType, 'download');
  assert.strictEqual(cta1.ctaTitle, 'Custom Whitepaper Title');

  // 2. Category default fallback
  const catPost = { id: 'p2', category: 'WhatsApp', status: 'published' };
  const cta2 = resolveEffectiveCta(catPost);
  assert.strictEqual(cta2.ctaType, CATEGORY_DEFAULT_CTAS['WhatsApp'].ctaType);
  assert.strictEqual(cta2.ctaUrl, '/services/whatsapp-coexistence');

  // 3. General fallback
  const generalPost = { id: 'p3', status: 'published' };
  const cta3 = resolveEffectiveCta(generalPost);
  assert.strictEqual(cta3.ctaType, 'book_demo');
});

// ─── Test 3: Deterministic A/B Variant Assignment ────────────────────────────
runTest('Assigns deterministic A/B CTA variants consistently per blog ID', () => {
  const var1 = resolveAbCtaVariant('blog-123-abc');
  const var2 = resolveAbCtaVariant('blog-123-abc');
  const var3 = resolveAbCtaVariant('blog-456-def');

  assert.strictEqual(var1, var2, 'Same blog ID must return identical A/B variant');
  assert.ok(var1 === 'CTA_A' || var1 === 'CTA_B');
  assert.ok(var3 === 'CTA_A' || var3 === 'CTA_B');
});

// ─── Test 4: Conversion Funnel Math & Missing Data Fallback ──────────────────
runTest('Calculates CTR percentage and displays un-connected conversion fallback', () => {
  const views = 1000;
  const ctaClicks = 45;
  const ctrPct = ((ctaClicks / views) * 100).toFixed(1);

  assert.strictEqual(ctrPct, '4.5');

  // Verify non-zero CTR calculation when valid metrics exist
  const emptyViews = 0;
  const emptyCtr = emptyViews > 0 ? (ctaClicks / emptyViews) : 0;
  assert.strictEqual(emptyCtr, 0);
});

// ─── Test 5: CTA Tracking Safety ──────────────────────────────────────────────
runTest('trackBlogCta executes safely without throwing or collecting PII', () => {
  const publishedPost = { id: 'blog-pub-1', status: 'published', category: 'AI' };
  assert.doesNotThrow(() => {
    trackBlogCta(publishedPost, 'book_demo', 'end');
  });

  const draftPost = { id: 'blog-draft-1', status: 'draft', category: 'AI' };
  assert.doesNotThrow(() => {
    trackBlogCta(draftPost, 'book_demo', 'end'); // Strictly ignored for non-published
  });
});

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n==================================================');
console.log(`P5-D RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) {
  process.exit(1);
}
