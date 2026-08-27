import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import { buildBlogIndexSchema } from '../utils/blogSeo';
import { blogPosts } from '../data/blogData';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState(blogPosts || []);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const blogsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogs(blogsList);
        }
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const handleImageError = (postId) => {
    setBrokenImages((prev) => ({ ...prev, [postId]: true }));
  };

  const indexSchema = buildBlogIndexSchema(blogs);

  return (
    <>
      <SeoHead
        title="Blog - Gyan VaniAi | Insights on AI & CRM"
        description="Deep dives into multi-agent orchestration, enterprise AI security, WhatsApp Coexistence, and customer experience automation, written for operators building with Gyan VaniAi."
        canonical="https://www.gyanvaniai.online/blog"
        image="https://www.gyanvaniai.online/hero_dashboard.webp"
      />
      <Helmet>
        <link rel="alternate" type="application/rss+xml" title="Gyan VaniAi Blog RSS" href="https://www.gyanvaniai.online/rss.xml" />
        <script type="application/ld+json">{JSON.stringify(indexSchema)}</script>
      </Helmet>

      <div className="blog-page">
        {/* 1. HERO / BLOG HEADER */}
        <section className="blog-hero-section">
          <div className="container">
            <div className="blog-eyebrow">
              <Sparkles size={15} />
              <span>GYAN VANI AI INSIGHTS</span>
            </div>
            <h1 className="blog-hero-title">Latest Insights & Updates</h1>
            <p className="blog-hero-sub">
              Deep dives into multi-agent orchestration, enterprise AI security, WhatsApp Coexistence, and customer experience automation, written for operators building with Gyan VaniAi.
            </p>
          </div>
        </section>

        {/* 2. BLOG CONTENT GRID */}
        <div className="blog-grid-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Loading posts...
            </div>
          ) : blogs.length === 0 ? (
            <div style={{ padding: '3rem 0', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>
                New articles are publishing soon. Meanwhile, explore our flagship guides on WhatsApp Coexistence and custom AI CRM development.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/services/whatsapp-coexistence" className="btn btn-primary">
                  WhatsApp Coexistence
                </Link>
                <Link to="/services/ai-development" className="btn btn-outline">
                  AI Development
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {blogs.map((post, index) => {
                  const slug = post.slugId || post.id;
                  const isFirst = index === 0;
                  const hasImage = post.imageUrl && !brokenImages[post.id];

                  return (
                    <Link
                      to={`/blog/${slug}`}
                      key={post.id}
                      className={`blog-card ${isFirst ? 'featured-card' : ''}`}
                    >
                      <div className="blog-card-image-wrap">
                        {isFirst && (
                          <span className="blog-card-featured-badge">Featured</span>
                        )}
                        {hasImage ? (
                          <img
                            src={post.imageUrl}
                            alt={`${post.title} | Gyan VaniAi Blog`}
                            width="600"
                            height="338"
                            className="blog-card-image"
                            loading="lazy"
                            decoding="async"
                            onError={() => handleImageError(post.id)}
                          />
                        ) : (
                          <div className="blog-card-image-fallback">
                            <span className="blog-fallback-tag">Gyan VaniAi Insights</span>
                          </div>
                        )}
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-meta">
                          <span className="blog-category">{post.category}</span>
                          <span className="blog-date">
                            <Calendar size={13} />
                            {post.date}
                          </span>
                        </div>

                        <h2 className="blog-title">{post.title}</h2>
                        <p className="blog-excerpt">{post.excerpt}</p>

                        <div className="blog-footer">
                          <span className="blog-author">{post.author}</span>
                          <span className="blog-read-more">
                            Read Article <ArrowRight size={15} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* 3. BLOG CTA BANNER */}
              <div className="blog-feed-cta">
                <h2 className="blog-feed-cta-title">
                  Want to See What We Can Build for You?
                </h2>
                <p className="blog-feed-cta-sub">
                  Get a personalized, live demo showing how Gyan VaniAi can configure WhatsApp automation and AI CRM pipelines specifically for your workflow.
                </p>
                <button
                  id="btn-blog-feed-book-demo"
                  className="btn btn-primary"
                  onClick={() => {
                    trackBookDemo('blog-feed-bottom');
                    setIsModalOpen(true);
                  }}
                  style={{ padding: '0.9rem 2.25rem', fontSize: '1.025rem', fontWeight: '700' }}
                >
                  <span>Book a Free Demo</span>
                  <ArrowRight size={17} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
