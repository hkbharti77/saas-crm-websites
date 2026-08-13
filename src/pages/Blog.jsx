import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import { buildBlogIndexSchema } from '../utils/blogSeo';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const blogsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const indexSchema = buildBlogIndexSchema(blogs);

  return (
    <>
      <SeoHead
        title="Blog - Gyan VaniAi | Insights on AI & CRM"
        description="Discover the latest trends in AI orchestration, secure RAG pipelines, WhatsApp automation, and CRM workflows on the Gyan VaniAi blog."
        canonical="https://www.gyanvaniai.online/blog"
        image="https://www.gyanvaniai.online/hero_dashboard.webp"
      />
      <Helmet>
        <link rel="alternate" type="application/rss+xml" title="Gyan VaniAi Blog RSS" href="https://www.gyanvaniai.online/rss.xml" />
        <script type="application/ld+json">{JSON.stringify(indexSchema)}</script>
      </Helmet>

      <section className="section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
        <div className="container">
          <div className="blog-header" data-aos="fade-up">
            <h1 className="h1">Latest Insights & Updates</h1>
            <p className="text-muted" style={{ fontSize: '1.125rem', marginTop: '1rem', maxWidth: '720px' }}>
              Deep dives into multi-agent orchestration, enterprise AI security, WhatsApp Coexistence, and customer experience automation — written for operators building with Gyan VaniAi.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading posts...</div>
          ) : blogs.length === 0 ? (
            <div data-aos="fade-up" style={{ padding: '3rem 0', maxWidth: '640px' }}>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>
                New articles are publishing soon. Meanwhile, explore our flagship guides on WhatsApp Coexistence and custom AI CRM development.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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
                  return (
                    <Link
                      to={`/blog/${slug}`}
                      key={post.id}
                      className="blog-card premium-card"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={`${post.title} — Gyan VaniAi Blog`}
                          width="600"
                          height="400"
                          className="blog-card-image"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="blog-card-content">
                        <div className="blog-meta">
                          <span className="blog-category">{post.category}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} />
                            {post.date}
                          </span>
                        </div>

                        <h2 className="blog-title">{post.title}</h2>
                        <p className="blog-excerpt">{post.excerpt}</p>

                        <div className="blog-footer">
                          <span className="blog-author">{post.author}</span>
                          <span className="blog-read-more">
                            Read Article <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div
                className="blog-feed-cta"
                style={{
                  marginTop: '5rem',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  background: 'color-mix(in srgb, var(--primary-color) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--primary-color) 22%, transparent)',
                  borderRadius: 'var(--radius-lg)',
                }}
                data-aos="fade-up"
              >
                <h2 className="h2" style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>
                  Want to See What We Can Build for You?
                </h2>
                <p className="text-muted" style={{ maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                  Get a personalized, live demo showing how Gyan VaniAi can configure WhatsApp automation and AI CRM pipelines specifically for your workflow.
                </p>
                <button
                  id="btn-blog-feed-book-demo"
                  className="btn btn-primary"
                  onClick={() => {
                    trackBookDemo('blog-feed-bottom');
                    setIsModalOpen(true);
                  }}
                >
                  Book a Free Demo <ArrowRight size={18} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
