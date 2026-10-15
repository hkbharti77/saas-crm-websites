import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

async function testFetch() {
  console.log('Connecting to Firebase project:', firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const collections = ['blogs', 'cookie_consents', 'categories', 'media', 'site_settings'];
  for (const colName of collections) {
    try {
      const snap = await getDocs(collection(db, colName));
      console.log(`Collection "${colName}": ${snap.size} documents found.`);
      if (snap.size > 0) {
        const sample = snap.docs[0].data();
        console.log(`  Sample doc from ${colName} keys:`, Object.keys(sample));
      }
    } catch (err) {
      console.error(`Error querying "${colName}":`, err.message);
    }
  }
}

testFetch().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
