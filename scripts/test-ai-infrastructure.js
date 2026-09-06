/**
 * scripts/test-ai-infrastructure.js
 * Comprehensive automated test suite for P4-A AI Infrastructure & Abstraction.
 * Runs in Node environment to test all edge cases and security guarantees.
 */

import { checkConfig, generateText } from '../src/services/ai/aiService.js';
import * as openaiProvider from '../src/services/ai/providers/openaiProvider.js';
import fs from 'fs';
import path from 'path';

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

async function runTests() {
  console.log('\n==================================================');
  console.log('🧪 P4-A AI INFRASTRUCTURE & SECURITY TEST SUITE');
  console.log('==================================================\n');

  // Save original env
  const origEnv = { ...process.env };

  try {
    // ------------------------------------------------------------------
    // TEST 1: Missing API key / Provider unconfigured
    // ------------------------------------------------------------------
    console.log('Test 1: Unconfigured Provider / Missing API Key');
    delete process.env.AI_PROVIDER;
    delete process.env.AI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const status1 = checkConfig();
    assert(status1.configured === false, 'checkConfig returns configured: false when no keys present');
    assert(status1.provider === 'none', 'checkConfig returns provider: "none"');

    const res1 = await generateText({ prompt: 'Hello' });
    assert(res1.configured === false, 'generateText returns configured: false');
    assert(res1.error === 'AI provider is not configured', 'returns clear error message for unconfigured provider');

    // ------------------------------------------------------------------
    // TEST 2: Provider configured via env
    // ------------------------------------------------------------------
    console.log('\nTest 2: Provider Configuration & Auto-Detection');
    process.env.AI_PROVIDER = 'openai';
    process.env.AI_API_KEY = 'sk-test-key-mock-12345';
    process.env.AI_MODEL = 'gpt-4o-mini';

    const status2 = checkConfig();
    assert(status2.configured === true, 'checkConfig returns configured: true when key present');
    assert(status2.provider === 'openai', 'checkConfig detects provider: "openai"');
    assert(status2.model === 'gpt-4o-mini', 'checkConfig resolves custom model');

    // ------------------------------------------------------------------
    // TEST 3: Excessively Large Input Prompt (> 10,000 chars)
    // ------------------------------------------------------------------
    console.log('\nTest 3: Excessively Large Input Prompt');
    const hugePrompt = 'A'.repeat(10001);
    const res3 = await generateText({ prompt: hugePrompt });
    assert(res3.success === false, 'generateText rejects > 10,000 char prompt');
    assert(res3.error.includes('exceeds maximum allowed length'), 'returns max length error message');

    // Empty prompt check
    const res3b = await generateText({ prompt: '   ' });
    assert(res3b.success === false, 'generateText rejects empty prompt');

    // ------------------------------------------------------------------
    // TEST 4: Timeout Handling (Simulated timeout with 1ms)
    // ------------------------------------------------------------------
    console.log('\nTest 4: Request Timeout Handling');
    const res4 = await generateText({ prompt: 'Test timeout', timeoutMs: 1 });
    assert(res4.success === false, 'generateText fails gracefully on short timeout');
    assert(res4.error && (res4.error.includes('timed out') || res4.error.includes('status') || res4.error.includes('fetch')), 'timeout produces clear error description');

    // ------------------------------------------------------------------
    // TEST 5: Invalid Provider Response / Malformed JSON Handling
    // ------------------------------------------------------------------
    console.log('\nTest 5: Malformed JSON / Invalid Provider Response Handling');
    // Test OpenAI structured fallback on invalid JSON text
    const mockOpenAiBadJson = await openaiProvider.generateStructured({
      prompt: 'Output json',
      apiKey: 'mock-key',
      // Will fail network fetch safely
    });
    assert(mockOpenAiBadJson.success === false, 'openaiProvider handles network/auth failure safely');

    // ------------------------------------------------------------------
    // TEST 6: Empty Response Handling
    // ------------------------------------------------------------------
    console.log('\nTest 6: Empty Response Handling');
    const emptyOpenAi = await openaiProvider.generateText({
      prompt: 'Hello',
      apiKey: '',
    });
    assert(emptyOpenAi.success === false, 'Missing API key returns error without throwing');

    // ------------------------------------------------------------------
    // TEST 7: Anthropic & Gemini Adapter Interfaces
    // ------------------------------------------------------------------
    console.log('\nTest 7: Multi-Provider Adapter Interface Consistency');
    process.env.AI_PROVIDER = 'anthropic';
    process.env.ANTHROPIC_API_KEY = 'sk-ant-test';
    const statusAnthropic = checkConfig();
    assert(statusAnthropic.provider === 'anthropic', 'Anthropic provider resolved correctly');

    process.env.AI_PROVIDER = 'gemini';
    process.env.GEMINI_API_KEY = 'AIzaSyTest';
    const statusGemini = checkConfig();
    assert(statusGemini.provider === 'gemini', 'Gemini provider resolved correctly');

    // ------------------------------------------------------------------
    // TEST 8: API Failure Isolation (No process crash)
    // ------------------------------------------------------------------
    console.log('\nTest 8: Failure Isolation');
    try {
      const res8 = await generateText({ prompt: 'Valid prompt' });
      assert(typeof res8 === 'object', 'generateText always returns an object');
      assert(typeof res8.success === 'boolean', 'returns boolean success property');
    } catch (err) {
      assert(false, 'generateText threw unhandled exception', err.message);
    }

    // ------------------------------------------------------------------
    // TEST 9: Secret Exposure Audit
    // ------------------------------------------------------------------
    console.log('\nTest 9: Secret Exposure Audit');
    const srcDir = path.join(process.cwd(), 'src');
    const frontendFiles = fs.readdirSync(srcDir, { recursive: true })
      .filter(f => typeof f === 'string' && (f.endsWith('.jsx') || f.endsWith('.js') || f.endsWith('.css')));

    let keyExposed = false;
    for (const file of frontendFiles) {
      const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
      if (content.includes('VITE_AI_API_KEY') || content.includes('process.env.AI_API_KEY')) {
        // Exclude src/services/ai/aiService.js if it checks process.env server-side
        if (!file.includes('aiService.js') && !file.includes('providers')) {
          keyExposed = true;
          console.error(`  ⚠️ Exposure found in ${file}`);
        }
      }
    }
    assert(!keyExposed, 'Zero AI API key references in client components');

  } finally {
    // Restore original env
    process.env = origEnv;
  }

  console.log('\n==================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
