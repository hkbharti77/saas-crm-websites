const INDEXNOW_KEY = 'e58f9214b74a49c693a19b88c42ef84a';
const HOST = 'www.gyanvaniai.online';

/**
 * Notify IndexNow when a blog URL is created or updated (client-side, best-effort).
 */
export async function pingBlogIndexNow(slugId) {
  if (!slugId || typeof fetch === 'undefined') return;

  const url = `https://${HOST}/blog/${slugId}`;
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: [url, `https://${HOST}/blog`, `https://${HOST}/rss.xml`],
  };

  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('IndexNow ping failed (non-blocking):', err);
  }
}
