import { ALLOWED_OPERATIONS, buildAssistPrompt } from '../src/services/ai/aiPrompts.js';

console.log('==================================================');
console.log('🧪 AI IMAGE PROMPTS GENERATOR TEST SUITE');
console.log('==================================================\n');

let total = 0;
let passed = 0;

function assert(condition, desc) {
  total++;
  if (condition) {
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${desc}`);
  }
}

// Test 1: Operation registration
assert(ALLOWED_OPERATIONS.has('image_prompts'), 'Operation "image_prompts" is registered in ALLOWED_OPERATIONS');
assert(ALLOWED_OPERATIONS.has('aiImagePrompts'), 'Operation "aiImagePrompts" alias is registered');

// Test 2: Prompt builder construction
const promptRes = buildAssistPrompt({
  operation: 'image_prompts',
  text: 'Multi-Agent AI Orchestration in Enterprise',
  context: {
    title: 'Multi-Agent AI Orchestration in Enterprise',
    category: 'AI Automation',
    excerpt: 'How modern businesses scale autonomous AI agents.',
    existingContent: 'Multi-agent orchestration allows complex LLM workflows...'
  }
});

assert(promptRes.outputType === 'json', 'image_prompts specifies JSON output type');
assert(promptRes.systemPrompt.includes('creative AI visual director'), 'systemPrompt includes visual director instructions');
assert(promptRes.prompt.includes('hero_banner'), 'Prompt instructions request structured JSON schema with image prompts');
assert(promptRes.systemPrompt.includes('Midjourney') || promptRes.prompt.includes('Midjourney'), 'Prompt or system instructions mention key AI image generators (Midjourney, DALL-E, FLUX, Stable Diffusion)');

console.log('\n==================================================');
console.log(`RESULTS: ${passed} PASSED, ${total - passed} FAILED`);
console.log('==================================================\n');

if (passed !== total) process.exit(1);
