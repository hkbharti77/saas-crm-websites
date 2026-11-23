let cachedClient = undefined;
let warnedInvalidUrl = false;

/**
 * Validates that a CLOUDINARY_URL value uses the required `cloudinary://` protocol
 * and parses as a valid URL with a cloud name (hostname).
 */
export function isValidCloudinaryUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return false;
  const trimmed = rawUrl.trim();
  if (!trimmed.toLowerCase().startsWith('cloudinary://')) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'cloudinary:' && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Validates an optional CLOUDINARY_ACCOUNT_URL value (`account://`).
 */
export function isValidCloudinaryAccountUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return false;
  const trimmed = rawUrl.trim();
  if (!trimmed.toLowerCase().startsWith('account://')) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'account:' && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Lazily imports and configures the Cloudinary v2 SDK only when a valid
 * `cloudinary://` URL is available. Returns `null` instead of crashing
 * startup when CLOUDINARY_URL is missing or malformed.
 */
export async function getCloudinaryClient(rawUrl = process.env.CLOUDINARY_URL) {
  const url = typeof rawUrl === 'string' ? rawUrl.trim() : '';

  if (!isValidCloudinaryUrl(url)) {
    if (url && !warnedInvalidUrl) {
      warnedInvalidUrl = true;
      console.warn(
        "Cloudinary disabled: CLOUDINARY_URL must begin with 'cloudinary://'."
      );
    }
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  const prevUrl = process.env.CLOUDINARY_URL;
  const prevAccountUrl = process.env.CLOUDINARY_ACCOUNT_URL;

  try {
    process.env.CLOUDINARY_URL = url;
    if (prevAccountUrl && !isValidCloudinaryAccountUrl(prevAccountUrl)) {
      delete process.env.CLOUDINARY_ACCOUNT_URL;
    }

    const { v2: cloudinary } = await import('cloudinary');
    cloudinary.config(true);
    cloudinary.config({ secure: true });
    cachedClient = cloudinary;
    return cachedClient;
  } catch (err) {
    console.warn('Cloudinary initialization failed:', err?.message || err);
    return null;
  } finally {
    if (prevUrl === undefined) {
      delete process.env.CLOUDINARY_URL;
    } else {
      process.env.CLOUDINARY_URL = prevUrl;
    }
    if (prevAccountUrl === undefined) {
      delete process.env.CLOUDINARY_ACCOUNT_URL;
    } else {
      process.env.CLOUDINARY_ACCOUNT_URL = prevAccountUrl;
    }
  }
}

export function resetCloudinaryClientCache() {
  cachedClient = undefined;
  warnedInvalidUrl = false;
}
