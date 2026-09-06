import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore';

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
    throw new Error('Firebase env vars missing for scheduled publisher');
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
}

async function notifyIndexNow(urlList) {
  if (!urlList || urlList.length === 0) return;
  try {
    const key = process.env.INDEXNOW_KEY || '22588e44b82d4310860822692ce01d81';
    const payload = {
      host: 'www.gyanvaniai.online',
      key: key,
      keyLocation: `https://www.gyanvaniai.online/${key}.txt`,
      urlList: urlList,
    };

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    await Promise.allSettled(
      endpoints.map((ep) =>
        fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        })
      )
    );
  } catch (err) {
    console.warn('IndexNow notification notice (non-fatal):', err);
  }
}

export default async function handler(req, res) {
  // Protect cron endpoint if CRON_SECRET is configured
  if (process.env.CRON_SECRET) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized cron request' });
    }
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = getDb();
    const now = Date.now();
    
    // Find all posts marked as scheduled
    const q = query(collection(db, 'blogs'), where('status', '==', 'scheduled'));
    const snap = await getDocs(q);

    const published = [];
    const urlList = [];

    for (const d of snap.docs) {
      const data = d.data();
      let scheduledTime = null;

      if (data.scheduledAt) {
        if (typeof data.scheduledAt.toMillis === 'function') {
          scheduledTime = data.scheduledAt.toMillis();
        } else {
          scheduledTime = new Date(data.scheduledAt).getTime();
        }
      }

      // If scheduled time has arrived or passed, publish the post
      if (scheduledTime && scheduledTime <= now) {
        const docRef = doc(db, 'blogs', d.id);
        await updateDoc(docRef, {
          status: 'published',
          publishedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const slug = data.slugId || d.id;
        const postUrl = `${SITE}/blog/${slug}`;
        published.push({ id: d.id, title: data.title, slug });
        urlList.push(postUrl);
      }
    }

    // Ping search engines for newly published posts
    if (urlList.length > 0) {
      await notifyIndexNow(urlList);
    }

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      checkedCount: snap.docs.length,
      publishedCount: published.length,
      published,
    });
  } catch (err) {
    console.error('Scheduled publish handler error:', err);
    return res.status(500).json({
      error: 'Failed to process scheduled posts',
      details: err.message,
    });
  }
}
