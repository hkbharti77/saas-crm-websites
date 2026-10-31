import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Folder } from 'lucide-react';
import { slugify } from '../utils/slugify';
import SeoHead from '../components/SeoHead';
import NotFound from './NotFound';
import { API_BASE_URL } from '../config/apiConfig';
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
        const cmsApiBase = API_BASE_URL;

        // Fetch categories and posts matching category
        const [catRes, postsRes] = await Promise.all([
          fetch(`${cmsApiBase}/api/public/categories`),
          fetch(`${cmsApiBase}/api/public/posts?category=${encodeURIComponent(slug)}&limit=50`),
        ]);

        let resolvedName = slug;
        let resolvedCategory = null;

        if (catRes.ok) {
          const catData = await catRes.json();
          const found = (catData.categories || []).find(
            (c) => slugify(c.name) === slug || c.name.toLowerCase() === slug.toLowerCase()
          );
          if (found) {
            resolvedName = found.name;
            resolvedCategory = { name: found.name, slug, count: found.count };
          }
        }

        let categoryPosts = [];
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          categoryPosts = postsData.posts || [];
        }

        // If no posts found directly with slug, retry with resolved full name
        if (categoryPosts.length === 0 && resolvedName !== slug) {
          const retryRes = await fetch(`${cmsApiBase}/api/public/posts?category=${encodeURIComponent(resolvedName)}&limit=50`);
          if (retryRes.ok) {
            const retryData = await retryRes.json();
            categoryPosts = retryData.posts || [];
          }
        }

        if (categoryPosts.length === 0 && !resolvedCategory) {
          setNotFound(true);
          return;
        }

        setCategory(resolvedCategory || { name: resolvedName, slug });
        setBlogs(categoryPosts);
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
      <div
        className="blog-container page-loading-container"
        aria-busy="true"
        aria-label="Loading category articles"
      >
        <div className="route-spinner" aria-hidden="true" />
        <span className="route-loading-text">Loading category articles...</span>
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
        canonical={`https://www.gyanvaniai.com/category/${slug}`}
        type="website"
      />

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
