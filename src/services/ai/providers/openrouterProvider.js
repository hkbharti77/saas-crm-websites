/**
 * openrouterProvider.js
 * Provider adapter for OpenRouter REST API (OpenAI-compatible Chat Completions API).
 * Executed server-side only. Uses native fetch with AbortController.
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

export async function generateText({
  prompt,
  systemPrompt = '',
  model = 'inclusionai/ling-3.0-flash-fin:free',
  apiKey,
  maxTokens = 1000,
  temperature = 0.7,
  timeoutMs = 15000,
}) {
  const resolvedApiKey = apiKey || getEnvVal('OPENROUTER_API_KEY') || getEnvVal('AI_API_KEY');
  if (!resolvedApiKey) {
    return { success: false, error: 'OpenRouter API key is missing' };
  }

  const resolvedModel = getEnvVal('OPENROUTER_MODEL_NAME') || model || 'inclusionai/ling-3.0-flash-fin:free';
  const baseUrl = getEnvVal('OPENROUTER_BASE_URL') || 'https://openrouter.ai/api/v1';

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resolvedApiKey}`,
        'HTTP-Referer': 'https://www.gyanvaniai.online',
        'X-Title': 'GyanVaniAi Blog CMS',
      },
      body: JSON.stringify({
        model: resolvedModel,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      const cleanErr = resolvedApiKey ? errBody.replaceAll(resolvedApiKey, '[REDACTED]') : errBody;
      return {
        success: false,
        status: res.status,
        error: `OpenRouter API returned status ${res.status}: ${cleanErr.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';

    if (!text) {
      return { success: false, error: 'OpenRouter API returned empty response' };
    }

    return {
      success: true,
      text,
      usage: data.usage || null,
      provider: 'openrouter',
      model: resolvedModel,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { success: false, error: `OpenRouter request timed out after ${timeoutMs}ms` };
    }
    return { success: false, error: err.message || 'OpenRouter network error' };
  }
}

export async function generateStructured({
  prompt,
  systemPrompt = '',
  schema,
  model = 'inclusionai/ling-3.0-flash-fin:free',
  apiKey,
  maxTokens = 1000,
  temperature = 0.7,
  timeoutMs = 15000,
}) {
  const schemaInstructions = schema
    ? `\n\nReturn your response ONLY as valid JSON adhering strictly to this JSON schema:\n${JSON.stringify(schema, null, 2)}`
    : '\n\nReturn your response ONLY as valid raw JSON.';

  const augmentedPrompt = `${prompt}${schemaInstructions}`;

  const result = await generateText({
    prompt: augmentedPrompt,
    systemPrompt: systemPrompt || 'You are a helpful assistant that outputs only valid JSON.',
    model,
    apiKey,
    maxTokens,
    temperature,
    timeoutMs,
  });

  if (!result.success) return result;

  try {
    let cleanText = result.text.trim();
    cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    const data = JSON.parse(cleanText);
    return {
      success: true,
      data,
      rawText: result.text,
      provider: 'openrouter',
      model: result.model,
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse OpenRouter JSON response: ${err.message}`,
      rawText: result.text,
    };
  }
}
