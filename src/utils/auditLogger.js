import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs an event to the blog_activity collection.
 * @param {string} blogId - The ID of the blog post.
 * @param {string} action - The action performed (e.g. 'CREATED', 'PUBLISHED', 'ARCHIVED', 'RESTORED', 'DELETED', 'UPDATED').
 * @param {Object} details - Additional metadata about the action (e.g. title, changes).
 */
export async function logActivity(blogId, action, details = {}) {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, 'blog_activity'), {
      blogId,
      action,
      details,
      timestamp: serverTimestamp(),
      userId: user?.uid || 'unknown',
      userEmail: user?.email || 'unknown',
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
