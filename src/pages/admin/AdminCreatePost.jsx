import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { Helmet } from 'react-helmet-async';
import AdminBlogEditor from '../../components/admin/AdminBlogEditor';

export default function AdminCreatePost() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Create New Blog Post | GyanVaniAi CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminBlogEditor isEditing={false} />
    </>
  );
}
