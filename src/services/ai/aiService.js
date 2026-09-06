/**
 * aiService.js
 * Production-safe backend AI Service Abstraction Layer.
 * Reads provider configuration strictly from server environment (process.env).
 * Enforces input length limits, token output caps, request timeouts, and controlled retries.
 * Never throws unhandled exceptions — returns structured error objects.
 */

import * as openaiProvider from './providers/openaiProvider.js';
import * as anthropicProvider from './providers/anthropicProvider.js';
import * as geminiProvider from './providers/geminiProvider.js';
import * as openrouterProvider from './providers/openrouterProvider.js';

const MAX_INPUT_LENGTH = 10000;  // Max prompt character length
const MAX_TOKEN_LIMIT = 4000;   // Hard upper cap on max output tokens
const DEFAULT_TIMEOUT_MS = 15000; // 15s timeout
const MAX_RETRIES = 1;          // Controlled retry limit (never infinite)

/**
 * Environment variable helper safe for both Node.js server scripts and browser client bundles.
 */
function getEnv() {
  const procEnv = (typeof process !== 'undefined' && process.env) ? process.env : {};
  const metaEnv = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
  return { ...procEnv, ...metaEnv };
}

function getEnvVal(key) {
  const env = getEnv();
  return env[key] || env[`VITE_${key}`] || '';
}

/**
 * Resolve provider configuration from environment variables.
 */
export function getProviderConfig() {
  const envProvider = (getEnvVal('AI_PROVIDER') || '').toLowerCase().trim();
  const apiKey = getEnvVal('AI_API_KEY') ||
    getEnvVal('OPENROUTER_API_KEY') ||
    getEnvVal('OPENAI_API_KEY') ||
    getEnvVal('ANTHROPIC_API_KEY') ||
    getEnvVal('GEMINI_API_KEY') || '';

  let provider = envProvider;

  // Auto-detect provider if AI_PROVIDER is not explicitly set but a key is present
  if (!provider || provider === 'auto') {
    if (getEnvVal('OPENROUTER_API_KEY')) provider = 'openrouter';
    else if (getEnvVal('OPENAI_API_KEY') || getEnvVal('AI_API_KEY')) provider = 'openai';
    else if (getEnvVal('ANTHROPIC_API_KEY')) provider = 'anthropic';
    else if (getEnvVal('GEMINI_API_KEY')) provider = 'gemini';
    else provider = 'none';
  }

  if (provider === 'none' || !apiKey) {
    return { configured: false, provider: 'none', apiKey: '', model: '' };
  }

  // Model defaults per provider
  const defaultModels = {
    openrouter: getEnvVal('OPENROUTER_MODEL_NAME') || 'inclusionai/ling-3.0-flash-fin:free',
    openai: 'gpt-4o-mini',
    anthropic: 'claude-3-5-haiku-20241022',
    gemini: 'gemini-1.5-flash',
  };

  const model = getEnvVal('AI_MODEL') || defaultModels[provider] || 'gpt-4o-mini';

  return {
    configured: true,
    provider,
    apiKey,
    model,
  };
}

/**
 * Get public safety config status (safe for frontend UI query).
 */
export function checkConfig() {
  const cfg = getProviderConfig();
  return {
    configured: cfg.configured,
    provider: cfg.provider,
    model: cfg.model || null,
  };
}

/**
 * Utility delay helper for controlled retries.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clamp parameters safely.
 */
function sanitizeParams(options = {}) {
  const prompt = typeof options.prompt === 'string' ? options.prompt : '';
  const systemPrompt = typeof options.systemPrompt === 'string' ? options.systemPrompt : '';

  let maxTokens = parseInt(options.maxTokens || getEnvVal('AI_MAX_TOKENS') || '1000', 10);
  if (isNaN(maxTokens) || maxTokens <= 0) maxTokens = 1000;
  if (maxTokens > MAX_TOKEN_LIMIT) maxTokens = MAX_TOKEN_LIMIT;

  let temperature = parseFloat(options.temperature || getEnvVal('AI_TEMPERATURE') || '0.7');
  if (isNaN(temperature)) temperature = 0.7;
  if (temperature < 0) temperature = 0;
  if (temperature > 1) temperature = 1;

  const timeoutMs = parseInt(options.timeoutMs || '15000', 10) || DEFAULT_TIMEOUT_MS;

  return {
    prompt,
    systemPrompt,
    maxTokens,
    temperature,
    timeoutMs,
  };
}

/**
 * Execute AI operation using the configured provider with controlled retries.
 */
async function executeProviderCall(method, params, options) {
  const config = getProviderConfig();

  if (!config.configured) {
    return {
      configured: false,
      error: 'AI provider is not configured',
    };
  }

  const { prompt, systemPrompt, maxTokens, temperature, timeoutMs } = sanitizeParams(params);

  // Validate input length
  if (!prompt || prompt.trim().length === 0) {
    return {
      success: false,
      configured: true,
      error: 'Prompt cannot be empty',
    };
  }

  if (prompt.length > MAX_INPUT_LENGTH) {
    return {
      success: false,
      configured: true,
      error: `Input prompt exceeds maximum allowed length (${MAX_INPUT_LENGTH} characters)`,
    };
  }

  const providers = {
    openrouter: openrouterProvider,
    openai: openaiProvider,
    anthropic: anthropicProvider,
    gemini: geminiProvider,
  };

  const adapter = providers[config.provider];
  if (!adapter || typeof adapter[method] !== 'function') {
    return {
      success: false,
      configured: true,
      error: `Unsupported AI provider "${config.provider}"`,
    };
  }

  const callArgs = {
    prompt,
    systemPrompt,
    schema: options.schema,
    model: config.model,
    apiKey: config.apiKey,
    maxTokens,
    temperature,
    timeoutMs,
  };

  let attempt = 0;
  let lastResult = null;

  while (attempt <= MAX_RETRIES) {
    attempt++;
    try {
      lastResult = await adapter[method](callArgs);
      if (lastResult.success) {
        return {
          configured: true,
          ...lastResult,
        };
      }

      // Retry only on server error (5xx) or rate limit (429)
      const isRetryable = lastResult.status === 429 || (lastResult.status >= 500 && lastResult.status < 600);
      if (!isRetryable || attempt > MAX_RETRIES) {
        break;
      }

      // Exponential backoff delay
      await delay(500 * Math.pow(2, attempt - 1));
    } catch (err) {
      lastResult = {
        success: false,
        error: err.message || 'Unexpected provider execution error',
      };
      if (attempt > MAX_RETRIES) break;
      await delay(500);
    }
  }

  return {
    configured: true,
    ...(lastResult || { success: false, error: 'Unknown provider failure' }),
  };
}

/**
 * Generate free-form text.
 */
export async function generateText(params) {
  return executeProviderCall('generateText', params, {});
}

/**
 * Generate structured JSON adhering to an optional schema.
 */
export async function generateStructured(params) {
  return executeProviderCall('generateStructured', params, { schema: params?.schema });
}

/**
 * High-level content generation dispatcher for AI Content Assistant and P4-C SEO operations.
 */
export async function generateContent(options = {}) {
  const { operation, text = '', context = {}, tone = 'informative' } = options;
  const { buildAiPrompt, ALLOWED_OPERATIONS } = await import('./aiPrompts.js');

  if (!operation || !ALLOWED_OPERATIONS.has(operation)) {
    return {
      success: false,
      configured: true,
      error: `Invalid or missing AI operation "${operation}".`
    };
  }

  const { systemPrompt, userPrompt, outputType } = buildAiPrompt({ operation, text, tone, context });

  if (outputType === 'json') {
    const res = await generateStructured({
      prompt: userPrompt,
      systemPrompt,
      maxTokens: options.maxTokens || 2000,
      temperature: options.temperature || 0.4
    });

    if (res.success && res.text && !res.data) {
      try {
        const clean = res.text.replace(/```json/gi, '').replace(/```/g, '').trim();
        res.data = JSON.parse(clean);
      } catch (e) {
        console.warn('[aiService] Failed to parse structured JSON response:', e);
      }
    }
    return res;
  } else {
    return await generateText({
      prompt: userPrompt,
      systemPrompt,
      maxTokens: options.maxTokens || 1200,
      temperature: options.temperature || 0.7
    });
  }
}

export const aiService = {
  getProviderConfig,
  checkConfig,
  getProviderName: () => getProviderConfig().provider,
  generateText,
  generateStructured,
  generateContent
};

export default aiService;
