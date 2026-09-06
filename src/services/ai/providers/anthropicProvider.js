/**
 * anthropicProvider.js
 * Provider adapter for Anthropic Claude REST API (Messages API).
 * Executed server-side only. Uses native fetch with AbortController.
 */

export async function generateText({
  prompt,
  systemPrompt = '',
  model = 'claude-3-5-haiku-20241022',
  apiKey,
  maxTokens = 1000,
  temperature = 0.7,
  timeoutMs = 15000,
}) {
  if (!apiKey) {
    return { success: false, error: 'Anthropic API key is missing' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const payload = {
      model,
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: 'user', content: prompt }],
    };

    if (systemPrompt) {
      payload.system = systemPrompt;
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      const cleanErr = apiKey ? errBody.replaceAll(apiKey, '[REDACTED]') : errBody;
      return {
        success: false,
        status: res.status,
        error: `Anthropic API returned status ${res.status}: ${cleanErr.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || '';

    if (!text) {
      return { success: false, error: 'Anthropic API returned empty response' };
    }

    return {
      success: true,
      text,
      usage: data.usage || null,
      provider: 'anthropic',
      model,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { success: false, error: `Anthropic request timed out after ${timeoutMs}ms` };
    }
    return { success: false, error: err.message || 'Anthropic network error' };
  }
}

export async function generateStructured({
  prompt,
  systemPrompt = '',
  schema,
  model = 'claude-3-5-haiku-20241022',
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
      provider: 'anthropic',
      model,
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse Anthropic JSON response: ${err.message}`,
      rawText: result.text,
    };
  }
}
