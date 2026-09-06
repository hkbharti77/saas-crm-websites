import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import AdminBlogEditor from '../../components/admin/AdminBlogEditor';

export default function AdminEditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostData({
            id: docSnap.id,
            title: data.title || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            category: data.category || '',
            readTime: data.readTime || '',
            imageUrl: data.imageUrl || '',
            date: data.date || '',
            content: data.content || '',
            status: data.status || 'published' // Preserve legacy posts as published
          });
        } else {
          alert('Post not found in database.');
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to fetch post.');
      } finally {
        setLoading(false);
      }
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchPost();
      }
    });

    return () => unsubscribe();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner">Loading post for editing...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Post: {postData?.title || 'CMS'} | GyanVaniAi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminBlogEditor isEditing={true} postId={id} initialData={postData} />
    </>
  );
}
