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
    throw new Error('Firebase env vars missing for blog sitemap');
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}

function toIso(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString().slice(0, 10);
  }
  if (value.seconds != null) {
    return new Date(value.seconds * 1000).toISOString().slice(0, 10);
  }
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
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
    const db = getDb();
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    const urls = snap.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slugId || doc.id;
      const lastmod = toIso(data.updatedAt || data.createdAt || data.date);
      return `  <url>
    <loc>${SITE}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
