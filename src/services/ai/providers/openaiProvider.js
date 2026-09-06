/**
 * openaiProvider.js
 * Provider adapter for OpenAI REST API (Chat Completions API).
 * Executed server-side only. Uses native fetch with AbortController.
 */

export async function generateText({
  prompt,
  systemPrompt = '',
  model = 'gpt-4o-mini',
  apiKey,
  maxTokens = 1000,
  temperature = 0.7,
  timeoutMs = 15000,
}) {
  if (!apiKey) {
    return { success: false, error: 'OpenAI API key is missing' };
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      const cleanErr = apiKey ? errBody.replaceAll(apiKey, '[REDACTED]') : errBody;
      return {
        success: false,
        status: res.status,
        error: `OpenAI API returned status ${res.status}: ${cleanErr.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';

    if (!text) {
      return { success: false, error: 'OpenAI API returned empty response' };
    }

    return {
      success: true,
      text,
      usage: data.usage || null,
      provider: 'openai',
      model,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { success: false, error: `OpenAI request timed out after ${timeoutMs}ms` };
    }
    return { success: false, error: err.message || 'OpenAI network error' };
  }
}

export async function generateStructured({
  prompt,
  systemPrompt = '',
  schema,
  model = 'gpt-4o-mini',
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
    // Remove markdown ```json ... ``` wrapper if present
    cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    const data = JSON.parse(cleanText);
    return {
      success: true,
      data,
      rawText: result.text,
      provider: 'openai',
      model,
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse OpenAI JSON response: ${err.message}`,
      rawText: result.text,
    };
  }
}
