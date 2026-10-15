const SITE = 'https://www.gyanvaniai.com';

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(value) {
  if (!value) return new Date().toUTCString();
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toUTCString();
  return new Date().toUTCString();
}

function stripHtml(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const cmsApiBase = (
      process.env.VITE_BACKEND_URL ||
      process.env.VITE_API_URL ||
      process.env.VITE_CMS_API_URL ||
      process.env.CMS_API_URL ||
      process.env.BACKEND_URL ||
      'http://localhost:5000'
    ).replace(/\/+$/, '');
    const apiRes = await fetch(`${cmsApiBase}/api/public/posts?limit=100`);
    let posts = [];
    if (apiRes.ok) {
      const data = await apiRes.json();
      posts = data.posts || [];
    }

    const items = posts.map((post) => {
      const slug = post.slugId || post.slug || post.id;
      const link = `${SITE}/blog/${slug}`;
      const description = escapeXml(
        (post.seoDescription || post.excerpt || stripHtml(post.content || '')).slice(0, 300)
      );
      return `    <item>
      <title>${escapeXml(post.seoTitle || post.title || 'Untitled')}</title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${toRfc822(post.publishedAt || post.createdAt || post.date)}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    });

    const serviceItems = `
    <item>
      <title>WhatsApp Coexistence Mode: Run Phone App and AI CRM on Same Number</title>
      <link>${SITE}/services/whatsapp-coexistence</link>
      <description>Meta's official Coexistence mode shipped by Gyan VaniAi. Run your WhatsApp Business mobile app and AI CRM simultaneously with real-time bidirectional sync.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${SITE}/services/whatsapp-coexistence</guid>
    </item>`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gyan VaniAi Blog - AI CRM &amp; Automation Insights</title>
    <link>${SITE}/blog</link>
    <description>Latest insights on AI CRM, WhatsApp Coexistence, RAG pipelines, and enterprise automation from Gyan VaniAi.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
${serviceItems}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('rss error:', err);
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Gyan VaniAi Blog</title>
<link>${SITE}/blog</link>
<description>Gyan VaniAi insights</description>
</channel></rss>`);
  }
}
