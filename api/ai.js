/**
 * api/ai.js
 * Vercel Serverless Function / Node API endpoint for AI operations.
 * Exposes backend AI service to frontend without revealing API keys.
 */

import { checkConfig, generateText, generateStructured } from '../src/services/ai/aiService.js';
import { buildAiPrompt, ALLOWED_OPERATIONS } from '../src/services/ai/aiPrompts.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET requests return config status
  if (req.method === 'GET') {
    const status = checkConfig();
    return res.status(200).json(status);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const action = body.action || 'generateText';

    if (action === 'checkConfig') {
      const status = checkConfig();
      return res.status(200).json(status);
    }

    if (action === 'aiContentAssist') {
      const { operation, text = '', context = {}, tone = 'Professional' } = body;
      if (!operation || !ALLOWED_OPERATIONS.has(operation)) {
        return res.status(400).json({
          success: false,
          configured: true,
          error: `Invalid or missing AI operation "${operation}". Allowed operations: ${Array.from(ALLOWED_OPERATIONS).join(', ')}.`,
        });
      }

      try {
        const { systemPrompt, userPrompt, outputType } = buildAiPrompt({ operation, text, context, tone });
        const isJson = outputType === 'json';

        const result = isJson
          ? await generateStructured({ prompt: userPrompt, systemPrompt, maxTokens: body.maxTokens || 2000, temperature: 0.4 })
          : await generateText({ prompt: userPrompt, systemPrompt, maxTokens: body.maxTokens || 1200, temperature: 0.7 });

        if (isJson && result.success && result.text && !result.data) {
          try {
            const clean = result.text.replace(/```json/gi, '').replace(/```/g, '').trim();
            result.data = JSON.parse(clean);
          } catch (e) {
            console.warn('[api/ai.js] Failed to parse JSON:', e);
          }
        }

        const statusCode = !result.configured ? 503 : (result.success ? 200 : 400);
        return res.status(statusCode).json({
          ...result,
          operation,
        });
      } catch (promptErr) {
        return res.status(400).json({
          success: false,
          configured: true,
          error: promptErr.message || 'Failed to build prompt for operation',
        });
      }
    }

    if (action === 'generateText') {
      const result = await generateText(body);
      const statusCode = !result.configured ? 503 : (result.success ? 200 : 400);
      return res.status(statusCode).json(result);
    }

    if (action === 'generateStructured') {
      const result = await generateStructured(body);
      const statusCode = !result.configured ? 503 : (result.success ? 200 : 400);
      return res.status(statusCode).json(result);
    }

    return res.status(400).json({
      success: false,
      error: `Unknown AI action "${action}". Allowed actions: checkConfig, aiContentAssist, generateText, generateStructured.`,
    });
  } catch (err) {
    console.error('[API /api/ai] Server Exception:', err);
    return res.status(500).json({
      success: false,
      configured: true,
      error: 'Internal server error processing AI request',
    });
  }
}
