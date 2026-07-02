import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo } from '../utils/analytics';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsList);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog - Gyan VaniAi | Insights on AI & CRM</title>
        <meta name="description" content="Discover the latest trends in AI orchestration, secure RAG pipelines, and automated CRM workflows on the Gyan VaniAi blog." />
        <meta property="og:title" content="Blog - Gyan VaniAi | Insights on AI & CRM" />
        <meta property="og:description" content="Discover the latest trends in AI orchestration, secure RAG pipelines, and automated CRM workflows on the Gyan VaniAi blog." />
        <meta property="og:image" content="https://gyanvania.ai/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gyanvania.ai/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://gyanvania.ai/blog" />
      </Helmet>

      <section className="section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
        <div className="container">
          <div className="blog-header" data-aos="fade-up">
            <h1 className="h1">Latest Insights & Updates</h1>
            <p className="text-muted" style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
              Explore deep dives into multi-agent orchestration, enterprise AI security, and customer experience automation.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading posts...</div>
          ) : (
            <>
              <div className="blog-grid">
                {blogs.map((post, index) => (
                  <Link 
                    to={`/blog/${post.slugId || post.id}`} 
                    key={post.id} 
                    className="blog-card premium-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <img src={post.imageUrl} alt={post.title} className="blog-card-image" loading="lazy" />
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
                ))}
              </div>

              {/* Bottom CTA Block */}
              <div 
                className="blog-feed-cta" 
                style={{ 
                  marginTop: '5rem', 
                  padding: '4rem 2rem', 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)', 
                  border: '1px solid rgba(99, 102, 241, 0.2)', 
                  borderRadius: 'var(--radius-lg)' 
                }}
                data-aos="fade-up"
              >
                <h2 className="h2" style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Want to See What We Can Build for You?</h2>
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
