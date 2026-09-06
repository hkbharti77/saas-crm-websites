import fs from 'fs';
import path from 'path';

// Auto-load .env file into process.env before importing aiService
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valParts] = trimmed.split('=');
        const val = valParts.join('=').replace(/^["']|["']$/g, '').trim();
        if (key && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    });
  }
} catch {
  // ignore
}

const { aiService } = await import('../src/services/ai/aiService.js');
const { ALLOWED_OPERATIONS, buildAiPrompt } = await import('../src/services/ai/aiPrompts.js');
const { sanitizeBlogHtml } = await import('../src/utils/sanitizeBlogHtml.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runP4cTests() {
  console.log('====================================================');
  console.log('RUNNING P4-C AI SEO + CONTENT BRIEFS TEST SUITE');
  console.log('====================================================\n');

  // Test 1: Verify 8 P4-C operations registered in ALLOWED_OPERATIONS
  console.log('TEST 1: Checking P4-C Operations Registration');
  const expectedP4cOps = [
    'aiSeoAnalyze',
    'aiSeoTitleSuggestions',
    'aiMetaDescriptionSuggestions',
    'aiSlugSuggestions',
    'aiHeadingAnalysis',
    'aiSearchIntent',
    'aiContentBrief',
    'aiFaqSuggestions'
  ];

  expectedP4cOps.forEach((op) => {
    assert(ALLOWED_OPERATIONS.has(op), `Operation '${op}' is registered in ALLOWED_OPERATIONS`);
  });

  // Test 2: Verify Prompt Construction for P4-C operations
  console.log('\nTEST 2: Verifying System Prompt Construction for P4-C Operations');
  const sampleArticle = {
    title: 'How to Build AI-Powered SaaS CRM Pipelines in 2026',
    excerpt: 'Discover step-by-step how AI agents automate lead scoring and CRM deal flows.',
    category: 'Sales Automation',
    content: '<h2>Introduction</h2><p>AI pipelines transform lead management...</p><h2>Key Features</h2><p>Automated follow-ups and lead scoring.</p>'
  };

  expectedP4cOps.forEach((op) => {
    try {
      const prompt = buildAiPrompt({
        operation: op,
        text: sampleArticle.title,
        tone: 'informative',
        context: sampleArticle
      });
      assert(prompt && prompt.systemPrompt && prompt.userPrompt, `Prompt generated successfully for '${op}'`);
      assert(prompt.systemPrompt.includes('JSON'), `System prompt for '${op}' mandates JSON output format`);
    } catch (err) {
      assert(false, `Prompt generation failed for '${op}': ${err.message}`);
    }
  });

  // Test 3: Test HTML Sanitization on AI Generated FAQ / Content
  console.log('\nTEST 3: Testing HTML Sanitization on AI Output');
  const dirtyAiHtml = `
    <h2>Frequently Asked Questions</h2>
    <p>Here is an answer <script>alert("xss")</script></p>
    <a href="javascript:void(0)" onclick="steal()">Click Here</a>
    <p>Safe content</p>
  `;
  const cleanHtml = sanitizeBlogHtml(dirtyAiHtml);
  assert(!cleanHtml.includes('<script>'), 'Sanitizer strips unsafe <script> tags from AI output');
  assert(!cleanHtml.includes('onclick='), 'Sanitizer strips inline onclick event handlers from AI output');
  assert(!cleanHtml.includes('javascript:'), 'Sanitizer strips javascript: URIs');
  assert(cleanHtml.includes('<h2>Frequently Asked Questions</h2>'), 'Sanitizer preserves valid <h2> structure');

  // Test 4: Provider & Environment Verification
  console.log('\nTEST 4: Checking AI Provider Configuration');
  const activeProviderName = aiService.getProviderName();
  assert(activeProviderName === 'openrouter' || activeProviderName === 'openai' || activeProviderName === 'mock', `Active AI provider name is '${activeProviderName}'`);

  // Test 5: End-to-End Operation Execution (Live Provider or Mock fallback)
  console.log('\nTEST 5: Executing AI SEO Operations');
  try {
    const briefRes = await aiService.generateContent({
      operation: 'aiContentBrief',
      text: 'Automated CRM Deal Scoring with AI',
      tone: 'informative',
      context: {
        targetAudience: 'B2B Sales Directors',
        contentType: 'how-to',
        category: 'Sales Automation'
      }
    });

    assert(briefRes && briefRes.success === true, 'aiContentBrief executed successfully');
    assert(briefRes.data && (briefRes.data.workingTitle || briefRes.data.suggestedTitle || briefRes.data.title || briefRes.data.outline || briefRes.data.recommendedH2s), 'aiContentBrief returned structured JSON data');
  } catch (err) {
    assert(false, `Execution of aiContentBrief failed: ${err.message}`);
  }

  try {
    const intentRes = await aiService.generateContent({
      operation: 'aiSearchIntent',
      text: 'Best CRM tools for small business 2026',
      context: { title: 'Best CRM tools for small business 2026' }
    });

    assert(intentRes && intentRes.success === true, 'aiSearchIntent executed successfully');
    assert(intentRes.data && (intentRes.data.intent || intentRes.data.primaryIntent), 'aiSearchIntent returned intent classification');
  } catch (err) {
    assert(false, `Execution of aiSearchIntent failed: ${err.message}`);
  }

  // Summary
  console.log('\n====================================================');
  console.log(`P4-C TEST SUITE COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runP4cTests().catch((err) => {
  console.error('P4-C Test runner fatal error:', err);
  process.exit(1);
});
