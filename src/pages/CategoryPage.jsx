import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Folder } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { slugify } from '../utils/slugify';
import SeoHead from '../components/SeoHead';
import NotFound from './NotFound';
import './Blog.css';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchCategoryAndPosts() {
      setLoading(true);
      try {
        // Try to find category by slug
        const catSnap = await getDocs(
          query(collection(db, 'categories'), where('slug', '==', slug))
        );

        let resolvedCategory = null;

        if (!catSnap.empty) {
          const catDoc = catSnap.docs[0];
          resolvedCategory = { id: catDoc.id, ...catDoc.data() };
        }

        // Fetch published posts
        if (resolvedCategory) {
          // Match by categoryId (preferred) or by category name
          const byIdSnap = await getDocs(
            query(
              collection(db, 'blogs'),
              where('status', '==', 'published'),
              where('categoryId', '==', resolvedCategory.id),
              orderBy('publishedAt', 'desc')
            )
          );

          if (!byIdSnap.empty) {
            const posts = byIdSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            setBlogs(posts);
            setCategory(resolvedCategory);
            return;
          }

          // Fallback to category name match
          const byNameSnap = await getDocs(
            query(
              collection(db, 'blogs'),
              where('status', '==', 'published'),
              where('category', '==', resolvedCategory.name),
              orderBy('publishedAt', 'desc')
            )
          );
          const posts = byNameSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setBlogs(posts);
          setCategory(resolvedCategory);
        } else {
          // Try matching slug against slugified category name on blog posts
          const allSnap = await getDocs(
            query(collection(db, 'blogs'), where('status', '==', 'published'))
          );
          const matched = allSnap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(b => b.category && slugify(b.category) === slug)
            .sort((a, b) => {
              const ta = a.publishedAt?.toMillis ? a.publishedAt.toMillis() : 0;
              const tb = b.publishedAt?.toMillis ? b.publishedAt.toMillis() : 0;
              return tb - ta;
            });

          if (matched.length === 0) {
            setNotFound(true);
            return;
          }

          setCategory({ name: matched[0].category, slug });
          setBlogs(matched);
        }
      } catch (error) {
        console.error('Error fetching category page:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryAndPosts();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (notFound) return <NotFound />;

  const pageTitle = category ? `${category.name} Articles | GyanVaniAi Blog` : 'Category | GyanVaniAi Blog';
  const pageDesc = category?.description || `Browse all articles in the ${category?.name || slug} category on GyanVaniAi Blog.`;

  return (
    <div className="blog-container">
      <SeoHead
        title={pageTitle}
        description={pageDesc}
        url={`https://www.gyanvaniai.online/category/${slug}`}
        type="website"
      />
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://www.gyanvaniai.online/category/${slug}`} />
      </Helmet>

      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Folder size={16} />
            <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span>{category?.name}</span>
          </div>
          <h1 className="blog-hero-title">{category?.name}</h1>
          {category?.description && (
            <p className="blog-hero-subtitle">{category.description}</p>
          )}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {blogs.length} article{blogs.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="blog-main">
        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <p>No published articles in this category yet.</p>
            <Link to="/blog" style={{ color: 'var(--primary-color)', marginTop: '1rem', display: 'inline-block' }}>
              ← Back to all articles
            </Link>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slugId || post.id}`} className="blog-card-image-link">
                  <img
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'}
                    alt={post.title}
                    className="blog-card-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </Link>
                <div className="blog-card-content">
                  {post.category && (
                    <span className="blog-card-category">{post.category}</span>
                  )}
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.slugId || post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span className="blog-card-date">
                      <Calendar size={13} />
                      {post.date || post.publishedAt?.toDate?.().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    {post.readTime && (
                      <span className="blog-card-read-time">{post.readTime}</span>
                    )}
                  </div>
                  <Link to={`/blog/${post.slugId || post.id}`} className="blog-card-link">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/blog" className="blog-load-more-btn">
            ← View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
