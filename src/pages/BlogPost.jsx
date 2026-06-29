import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const q = query(collection(db, 'blogs'), where('slugId', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setPost({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
      }
    } catch (error) {
      console.error("Error fetching post: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Gyan VaniAi</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} - Gyan VaniAi`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gyanvania.ai/blog/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://gyanvania.ai/blog/${id}`} />
      </Helmet>

      <article className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <Link to="/blog" className="back-to-blog">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header className="blog-post-header" data-aos="fade-up">
            <span className="blog-category" style={{ fontSize: '1rem' }}>{post.category}</span>
            <h1 className="h1" style={{ marginTop: '1rem', marginBottom: '0' }}>{post.title}</h1>
            
            <div className="blog-post-meta">
              <div className="blog-post-meta-item">
                <User size={16} /> {post.author}
              </div>
              <div className="blog-post-meta-item">
                <Calendar size={16} /> {post.date}
              </div>
              <div className="blog-post-meta-item">
                <Clock size={16} /> {post.readTime}
              </div>
            </div>
          </header>

          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="blog-post-image" 
            data-aos="fade-up" 
            data-aos-delay="100"
          />

          <div 
            className="blog-post-content" 
            data-aos="fade-up" 
            data-aos-delay="200"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>
    </>
  );
}
