import { lazy } from 'react';

/**
 * Wraps React.lazy with bounded exponential-backoff retries for transient
 * dynamic import failures (e.g., dev server restarts or Vite dep re-optimization).
 */
export function lazyWithRetry(importer, { retries = 2, delayMs = 350 } = {}) {
  return lazy(async () => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await importer();
      } catch (err) {
        lastError = err;
        const msg = String(err?.message || '');
        const isTransientImportError =
          /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
            msg
          ) || err?.name === 'ChunkLoadError';

        if (!isTransientImportError || attempt === retries) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
    throw lastError;
  });
}
