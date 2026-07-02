import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo, trackEvent } from '../utils/analytics';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [id]);

  useEffect(() => {
    // Check if the user has already seen/closed the popup during this session
    const hasSeenPopup = sessionStorage.getItem('auto_popup_shown');
    if (hasSeenPopup) return;

    let timer;

    const triggerPopup = () => {
      setIsModalOpen(true);
      sessionStorage.setItem('auto_popup_shown', 'true');
      trackEvent('auto_popup_trigger', { page: 'blog-post' });
      
      // Clean up scroll listener
      window.removeEventListener('scroll', handleScroll);
    };

    // 1. Time delay: Trigger automatically after 30 seconds (gentler for readers)
    timer = setTimeout(triggerPopup, 30000);

    // 2. Scroll trigger: Trigger immediately if the user scrolls down 60% of the article
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0 && (scrollTop / docHeight) > 0.6) {
        clearTimeout(timer);
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
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
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title.replace(/"/g, '\\"')}",
              "image": "${post.imageUrl}",
              "author": {
                "@type": "Person",
                "name": "${post.author}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Gyan VaniAi",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://gyanvania.ai/logo.png"
                }
              },
              "datePublished": "${post.date || ''}",
              "description": "${post.excerpt ? post.excerpt.replace(/"/g, '\\"') : ''}"
            }
          `}
        </script>
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

          {/* Inline CTA Box */}
          <div 
            className="blog-cta-box" 
            style={{ 
              marginTop: '4rem', 
              padding: '3rem 2rem', 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)', 
              border: '1px solid rgba(99, 102, 241, 0.2)', 
              borderRadius: 'var(--radius-lg)' 
            }}
          >
            <h3 className="h3" style={{ marginBottom: '0.75rem' }}>Ready to Automate Your Business with AI?</h3>
            <p className="text-muted" style={{ maxWidth: '540px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              We build custom AI CRM systems, automated WhatsApp workflows, and voice agents for businesses. Schedule a free tailored demo today.
            </p>
            <button 
              id="btn-blog-post-book-demo"
              className="btn btn-primary"
              onClick={() => {
                trackBookDemo('blog-post-bottom');
                setIsModalOpen(true);
              }}
            >
              Book a Free Demo <ArrowRight size={18} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </article>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
