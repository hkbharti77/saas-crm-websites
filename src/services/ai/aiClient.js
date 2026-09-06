/**
 * aiClient.js
 * Lightweight frontend client helper for React UI components.
 * Invokes the secure /api/ai backend endpoint.
 *
 * FAILURE ISOLATION:
 *   All methods catch network/HTTP failures and return structured error objects.
 *   AI failures will NEVER throw unhandled exceptions or crash React components.
 */

/**
 * Check if the backend AI service is configured.
 * @returns {Promise<{ configured: boolean, provider?: string, model?: string }>}
 */
export async function checkAiConfig() {
  try {
    const res = await fetch('/api/ai?action=checkConfig');
    if (!res.ok) {
      return { configured: false, error: `Backend API returned status ${res.status}` };
    }
    return await res.json();
  } catch (err) {
    return { configured: false, error: err.message || 'Network error reaching AI API' };
  }
}

/**
 * Request AI text generation.
 * @param {Object} options
 * @param {string} options.prompt - Input prompt
 * @param {string} [options.systemPrompt] - Optional system prompt
 * @param {number} [options.maxTokens] - Max tokens to generate
 * @param {number} [options.temperature] - Temperature
 * @returns {Promise<{ success: boolean, text?: string, error?: string, configured?: boolean }>}
 */
export async function generateText(options = {}) {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generateText',
        ...options,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        configured: errJson.configured ?? false,
        error: errJson.error || `HTTP error ${res.status}`,
      };
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      configured: false,
      error: err.message || 'Failed to connect to AI backend service',
    };
  }
}

/**
 * Request AI structured JSON generation.
 * @param {Object} options
 * @param {string} options.prompt - Input prompt
 * @param {string} [options.systemPrompt] - Optional system instructions
 * @param {Object} [options.schema] - Optional target JSON schema
 * @returns {Promise<{ success: boolean, data?: Object, error?: string, configured?: boolean }>}
 */
export async function generateStructured(options = {}) {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generateStructured',
        ...options,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        configured: errJson.configured ?? false,
        error: errJson.error || `HTTP error ${res.status}`,
      };
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      configured: false,
      error: err.message || 'Failed to connect to AI backend service',
    };
  }
}

/**
 * Request controlled AI Content Assistant operation.
 * @param {Object} options
 * @param {string} options.operation - One of 15 allowed operations
 * @param {string} [options.text] - Selected text or snippet
 * @param {Object} [options.context] - Article context (title, category, excerpt, existingContent)
 * @param {string} [options.tone] - Target tone if operation is change_tone
 * @returns {Promise<{ success: boolean, text?: string, operation?: string, error?: string, configured?: boolean }>}
 */
export async function aiContentAssist(options = {}) {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'aiContentAssist',
        ...options,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        configured: errJson.configured ?? false,
        error: errJson.error || `HTTP error ${res.status}`,
      };
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      configured: false,
      error: err.message || 'Failed to connect to AI backend service',
    };
  }
}
