const SITE = 'https://www.gyanvaniai.com';

function toIso(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

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

    const urls = posts.map((post) => {
      const slug = post.slugId || post.slug || post.id;
      const lastmod = toIso(post.updatedAt || post.publishedAt || post.createdAt || post.date);
      const priority = post.isFeatured || post.featured ? '0.9' : '0.8';
      const image = post.imageUrl || post.image || post.thumbnail || post.coverImage;
      const title = post.title || 'Blog Post';

      const imageTag = image
        ? `
    <image:image>
      <image:loc>${escapeXml(image)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
    </image:image>`
        : '';

      return `  <url>
    <loc>${SITE}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);
  } catch (err) {
    console.error('blog-sitemap error:', err);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`);
  }
}
