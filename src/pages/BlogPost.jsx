import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import NotFound from './NotFound';
import {
  blogPostUrl,
  resolveDescription,
  resolvePostDates,
  buildBlogPostingSchema,
  buildBlogBreadcrumbSchema,
} from '../utils/blogSeo';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPost() {
      try {
        const q = query(collection(db, 'blogs'), where('slugId', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPost({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post: ', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading article… | Gyan VaniAi Blog</title>
          <meta name="robots" content="noindex" />
          <link rel="canonical" href={blogPostUrl(id)} />
        </Helmet>
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading...
        </div>
      </>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const description = resolveDescription(post);
  const { published, modified } = resolvePostDates(post);
  const image = post.imageUrl || 'https://www.gyanvaniai.online/hero_dashboard.webp';
  const canonical = blogPostUrl(id);
  const schema = [buildBlogPostingSchema(post, id), buildBlogBreadcrumbSchema(post, id)];

  return (
    <>
      <SeoHead
        title={`${post.title} | Gyan VaniAi Blog`}
        description={description}
        canonical={canonical}
        image={image}
        type="article"
        publishedTime={published}
        modifiedTime={modified}
        author={post.author || 'Gyan VaniAi Team'}
        section={post.category}
      />
      <Helmet>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="section" style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
              <li>
                <Link to="/" style={{ color: 'inherit' }}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" style={{ color: 'inherit' }}>
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li style={{ color: 'var(--text-primary)' }}>{post.title}</li>
            </ol>
          </nav>

          <Link to="/blog" className="back-to-blog">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <header className="blog-post-header" data-aos="fade-up">
            {post.category && (
              <span className="blog-category" style={{ fontSize: '1rem' }}>
                {post.category}
              </span>
            )}
            <h1 className="h1" style={{ marginTop: '1rem', marginBottom: '0' }}>
              {post.title}
            </h1>

            <div className="blog-post-meta">
              {post.author && (
                <div className="blog-post-meta-item">
                  <User size={16} /> {post.author}
                </div>
              )}
              {post.date && (
                <div className="blog-post-meta-item">
                  <Calendar size={16} /> {post.date}
                </div>
              )}
              {post.readTime && (
                <div className="blog-post-meta-item">
                  <Clock size={16} /> {post.readTime}
                </div>
              )}
            </div>
          </header>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={`${post.title} — Gyan VaniAi`}
              width="800"
              height="450"
              fetchPriority="high"
              decoding="sync"
              className="blog-post-image"
              data-aos="fade-up"
              data-aos-delay="100"
            />
          )}

          <div
            className="blog-post-content"
            data-aos="fade-up"
            data-aos-delay="200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div
            className="blog-cta-box"
            style={{
              marginTop: '4rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'color-mix(in srgb, var(--primary-color) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--primary-color) 22%, transparent)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h2 className="h3" style={{ marginBottom: '0.75rem' }}>Ready to Automate Your Business with AI?</h2>
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
            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                fontSize: '0.9rem',
              }}
            >
              <Link to="/services/ai-development" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>
                Explore our AI Development Services →
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <Link to="/services/whatsapp-coexistence" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>
                Learn about WhatsApp Coexistence →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
