import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock, Search, TrendingUp, Tag as TagIcon, Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ContactModal from '../components/ContactModal';
import { trackBookDemo } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import { buildBlogIndexSchema } from '../utils/blogSeo';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import './Blog.css';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brokenImages, setBrokenImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchBlogs() {
      try {
        let querySnapshot;
        try {
          const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
          querySnapshot = await getDocs(q);
        } catch (idxErr) {
          console.warn('Firestore index fallback: fetching blogs without orderBy:', idxErr);
          querySnapshot = await getDocs(collection(db, 'blogs'));
        }

        if (querySnapshot && !querySnapshot.empty) {
          const blogsList = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            // Strictly expose ONLY published posts to public visitors
            .filter((b) => b.status === 'published')
            .sort((a, b) => {
              const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || a.date || 0).getTime();
              const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || b.date || 0).getTime();
              return dateB - dateA;
            });
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

  // Categories list derived from published posts
  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [blogs]);

  // All tags derived from published posts
  const allTags = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      (b.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 12);
  }, [blogs]);

  // Filtered posts based on category and tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchTag = !selectedTag || (b.tags && b.tags.includes(selectedTag));
      return matchCategory && matchTag;
    });
  }, [blogs, selectedCategory, selectedTag]);

  // Featured article: top post or explicitly flagged featured post
  const featuredArticle = useMemo(() => {
    if (blogs.length === 0) return null;
    return blogs.find((b) => b.isFeatured) || blogs[0];
  }, [blogs]);

  // Remaining articles excluding featured (when viewing All without filters)
  const regularArticles = useMemo(() => {
    if (selectedCategory !== 'All' || selectedTag) return filteredBlogs;
    if (!featuredArticle) return filteredBlogs;
    return filteredBlogs.filter((b) => b.id !== featuredArticle.id);
  }, [filteredBlogs, featuredArticle, selectedCategory, selectedTag]);

  // Trending / Popular articles check based on real views
  const trendingArticles = useMemo(() => {
    const withViews = blogs.filter((b) => Number(b.views || b.viewCount || 0) > 0);
    if (withViews.length >= 2) {
      return [...withViews].sort((a, b) => Number(b.views || b.viewCount || 0) - Number(a.views || a.viewCount || 0)).slice(0, 3);
    }
    // Fallback: Insufficient analytics data -> do NOT fabricate popularity numbers
    return null;
  }, [blogs]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
            <span className="blog-hero-badge">
              <Sparkles size={14} style={{ marginRight: '6px' }} /> Gyan VaniAi Publication
            </span>
            <h1 className="blog-hero-title">Latest Insights & Updates</h1>
            <p className="blog-hero-sub">
              Deep dives into multi-agent orchestration, enterprise AI security, WhatsApp Coexistence, and customer experience automation, written for operators building with Gyan VaniAi.
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="blog-hero-search-form" role="search">
              <div className="blog-search-input-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="search"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-hero-search-input"
                  aria-label="Search articles"
                />
                <button type="submit" className="btn btn-primary blog-search-btn">
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 2. FEATURED ARTICLE SECTION */}
        {featuredArticle && selectedCategory === 'All' && !selectedTag && (
          <section className="featured-article-section container" aria-label="Featured Article">
            <Link to={`/blog/${featuredArticle.slugId || featuredArticle.id}`} className="featured-article-card">
              <div className="featured-image-container">
                {featuredArticle.imageUrl && !brokenImages[featuredArticle.id] ? (
                  <img
                    src={featuredArticle.imageUrl}
                    alt={`${featuredArticle.title} | Featured Article`}
                    className="featured-image"
                    loading="eager"
                    width="720"
                    height="405"
                    onError={() => handleImageError(featuredArticle.id)}
                  />
                ) : (
                  <div className="featured-image-fallback">
                    <span>Featured Article</span>
                  </div>
                )}
                <span className="featured-badge">Featured Story</span>
              </div>
              <div className="featured-content">
                <span className="blog-category">{featuredArticle.category || 'Insights'}</span>
                <h2 className="featured-title">{featuredArticle.title}</h2>
                <p className="featured-excerpt">{featuredArticle.excerpt}</p>
                <div className="featured-meta">
                  <span>{featuredArticle.author || 'Gyan VaniAi Team'}</span>
                  <span className="dot">•</span>
                  <span><Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />{featuredArticle.date}</span>
                  {featuredArticle.readTime && (
                    <>
                      <span className="dot">•</span>
                      <span><Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />{featuredArticle.readTime}</span>
                    </>
                  )}
                </div>
                <div className="featured-read-link">
                  Read Full Article <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 3. CATEGORY & TAG NAVIGATION */}
        <div className="container">
          <nav className="blog-category-nav" aria-label="Blog categories">
            <div className="category-scroll-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag('');
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </nav>

          {allTags.length > 0 && (
            <div className="blog-tags-bar">
              <TagIcon size={14} className="tag-bar-icon" />
              <span className="tag-bar-label">Filter by Tag:</span>
              <div className="tag-pills-list">
                {selectedTag && (
                  <button
                    type="button"
                    className="tag-pill active-tag"
                    onClick={() => setSelectedTag('')}
                  >
                    Clear: #{selectedTag} ✕
                  </button>
                )}
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. TRENDING / POPULAR ARTICLES (Real Analytics Only) */}
        {trendingArticles && selectedCategory === 'All' && !selectedTag && (
          <section className="container trending-section" aria-label="Popular Articles">
            <div className="section-header-compact">
              <TrendingUp size={18} className="trending-icon" />
              <h3>Popular Articles</h3>
            </div>
            <div className="trending-grid">
              {trendingArticles.map((item) => (
                <Link key={item.id} to={`/blog/${item.slugId || item.id}`} className="trending-card">
                  <span className="trending-category">{item.category}</span>
                  <h4 className="trending-title">{item.title}</h4>
                  <span className="trending-readtime">{item.readTime || '5 min read'}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 5. LIGHTWEIGHT PERSONALIZATION (Phase P5-E Widget) */}
        <div className="container">
          <PersonalizedRecommendations blogs={blogs} />
        </div>

        {/* 6. MAIN BLOG CONTENT GRID */}
        <div className="blog-grid-container container">
          <div className="section-header-compact">
            <h3>{selectedCategory !== 'All' ? `${selectedCategory} Articles` : selectedTag ? `Articles tagged #${selectedTag}` : 'Latest Articles'}</h3>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Loading posts...
            </div>
          ) : regularArticles.length === 0 ? (
            <div style={{ padding: '3rem 0', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>
                No published articles found in this category or tag.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedTag('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {regularArticles.map((post) => {
                  const slug = post.slugId || post.id;
                  const hasImage = post.imageUrl && !brokenImages[post.id];

                  return (
                    <Link
                      to={`/blog/${slug}`}
                      key={post.id}
                      className="blog-card"
                    >
                      <div className="blog-card-image-wrap">
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
                          <span className="blog-author">{post.author || 'Gyan VaniAi'}</span>
                          <span className="blog-read-more">
                            Read Article <ArrowRight size={15} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* 7. BLOG CTA BANNER */}
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

