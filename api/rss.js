import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const SITE = 'https://www.gyanvaniai.online';

function getDb() {
  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
  };

  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    throw new Error('Firebase env vars missing for RSS');
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}

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
  if (typeof value?.toDate === 'function') return value.toDate().toUTCString();
  if (value.seconds != null) return new Date(value.seconds * 1000).toUTCString();
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
    const db = getDb();
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    const items = snap.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slugId || doc.id;
      const link = `${SITE}/blog/${slug}`;
      const description = escapeXml(
        (data.excerpt || stripHtml(data.content || '')).slice(0, 300)
      );
      return `    <item>
      <title>${escapeXml(data.title || 'Untitled')}</title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${toRfc822(data.createdAt || data.date)}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    });

    // Keep flagship service entries so RSS stays useful even with few posts
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
