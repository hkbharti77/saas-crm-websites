/**
 * geminiProvider.js
 * Provider adapter for Google Gemini REST API (v1beta generateContent).
 * Executed server-side only. Uses native fetch with AbortController.
 */

export async function generateText({
  prompt,
  systemPrompt = '',
  model = 'gemini-1.5-flash',
  apiKey,
  maxTokens = 1000,
  temperature = 0.7,
  timeoutMs = 15000,
}) {
  if (!apiKey) {
    return { success: false, error: 'Gemini API key is missing' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const contents = [];
    if (systemPrompt) {
      contents.push({
        role: 'user',
        parts: [{ text: `System instruction: ${systemPrompt}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I will follow your system instructions.' }],
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature,
        },
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
        error: `Gemini API returned status ${res.status}: ${cleanErr.slice(0, 200)}`,
      };
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return { success: false, error: 'Gemini API returned empty response' };
    }

    return {
      success: true,
      text,
      usage: data.usageMetadata || null,
      provider: 'gemini',
      model,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      return { success: false, error: `Gemini request timed out after ${timeoutMs}ms` };
    }
    return { success: false, error: err.message || 'Gemini network error' };
  }
}

export async function generateStructured({
  prompt,
  systemPrompt = '',
  schema,
  model = 'gemini-1.5-flash',
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
      provider: 'gemini',
      model,
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to parse Gemini JSON response: ${err.message}`,
      rawText: result.text,
    };
  }
}
