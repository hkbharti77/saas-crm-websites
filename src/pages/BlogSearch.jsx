import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, Calendar, ArrowRight, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import SeoHead from '../components/SeoHead';
import {
  searchAndRank,
  renderHighlightedText,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
} from '../utils/searchEngine';
import { trackBlogSearch } from '../utils/blogAnalytics';
import './BlogSearch.css';

export default function BlogSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceTimerRef = useRef(null);

  // Sync state when URL query param changes
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    queueMicrotask(() => {
      setSearchTerm((prev) => (prev !== qParam ? qParam : prev));
      setDebouncedQuery((prev) => (prev !== qParam ? qParam : prev));
    });
  }, [searchParams]);

  // Load published blogs from Firestore
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const list = snap.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(b => b.status === 'published'); // Strictly published posts
          setBlogs(list);
        }
      } catch (err) {
        console.error('Error fetching blogs for search:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Debounce search input (250ms)
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setShowSuggestions(true);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(val);
      if (val.trim()) {
        setSearchParams({ q: val.trim() });
      } else {
        setSearchParams({});
      }
    }, 250);
  };

  // Perform search
  const searchResults = useMemo(() => {
    return searchAndRank(blogs, debouncedQuery, {
      category: selectedCategory,
      tag: selectedTag,
    });
  }, [blogs, debouncedQuery, selectedCategory, selectedTag]);

  // Track search analytics and save recent searches in useEffect
  useEffect(() => {
    if (debouncedQuery.trim()) {
      trackBlogSearch(debouncedQuery.trim(), searchResults.length);
      saveRecentSearch(debouncedQuery.trim());
      queueMicrotask(() => {
        setRecentSearches(getRecentSearches());
      });
    }
  }, [debouncedQuery, searchResults.length]);


  // Suggestions derived from published titles, categories, tags
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];
    const q = searchTerm.toLowerCase().trim();

    const matches = [];
    blogs.forEach(b => {
      if ((b.title || '').toLowerCase().includes(q)) {
        matches.push({ type: 'Article', text: b.title, slug: b.slugId || b.id });
      }
    });

    return matches.slice(0, 5);
  }, [blogs, searchTerm]);

  const categories = useMemo(() => {
    const set = new Set(blogs.map(b => b.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [blogs]);

  const handleClearInput = () => {
    setSearchTerm('');
    setDebouncedQuery('');
    setSearchParams({});
    setShowSuggestions(false);
  };

  const handleRecentClick = (term) => {
    setSearchTerm(term);
    setDebouncedQuery(term);
    setSearchParams({ q: term });
    setShowSuggestions(false);
  };

  const handleClearHistory = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <>
      <SeoHead
        title="Search Articles - Gyan VaniAi Blog"
        description="Search published Gyan VaniAi articles, guides, and tutorials on AI orchestration, WhatsApp integration, and CRM automation."
        canonical="https://www.gyanvaniai.online/blog/search"
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="blog-search-page container" style={{ paddingTop: '5.5rem', paddingBottom: '4rem', maxWidth: '1100px' }}>
        {/* Search Header Form */}
        <div className="search-header-box">
          <h1 className="search-title">Search Gyan VaniAi Blog</h1>
          <p className="search-sub">Find insights, guides, and architecture breakdowns across all published posts.</p>

          <form onSubmit={(e) => e.preventDefault()} className="search-form-wrap" role="search">
            <div className="search-input-group">
              <Search size={20} className="search-input-icon" />
              <input
                type="search"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search by keyword, topic, or category..."
                className="search-main-input"
                aria-label="Search articles"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Debounced Live Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions-dropdown">
                <div className="suggestions-header">Matching Articles</div>
                {suggestions.map((s, idx) => (
                  <Link
                    key={idx}
                    to={`/blog/${s.slug}`}
                    className="suggestion-item"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <span className="suggestion-type">{s.type}</span>
                    <span className="suggestion-text">{renderHighlightedText(s.text, searchTerm)}</span>
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Recent Searches Bar */}
          {recentSearches.length > 0 && (
            <div className="recent-searches-bar">
              <span className="recent-label">Recent Searches:</span>
              <div className="recent-chips">
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRecentClick(term)}
                    className="recent-chip"
                  >
                    {term}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="clear-history-btn"
                  title="Clear search history"
                >
                  <Trash2 size={13} /> Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="search-filters-bar">
          <span className="filter-label">Filter Category:</span>
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="search-results-meta">
          {debouncedQuery.trim() ? (
            <span>
              Found <strong>{searchResults.length}</strong> {searchResults.length === 1 ? 'result' : 'results'} for &ldquo;{debouncedQuery}&rdquo;
            </span>
          ) : (
            <span>Showing all <strong>{searchResults.length}</strong> published articles</span>
          )}
        </div>

        {/* Results List / Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            Searching published posts...
          </div>
        ) : searchResults.length === 0 ? (
          <div className="search-empty-state">
            <h3 className="empty-title">No articles found</h3>
            <p className="empty-sub">
              We couldn&apos;t find any published articles matching &ldquo;{debouncedQuery}&rdquo;. Try adjusting your keywords or browse popular topics below.
            </p>

            <div className="empty-fallback-box">
              <h4>Popular Topics & Categories:</h4>
              <div className="fallback-links">
                {categories.filter(c => c !== 'All').map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchTerm('');
                      setDebouncedQuery('');
                    }}
                  >
                    {cat}
                  </button>
                ))}
                <Link to="/blog" className="btn btn-primary btn-sm">
                  View All Blog Articles →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="search-results-grid">
            {searchResults.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slugId || post.id}`}
                className="search-result-card"
              >
                <div className="search-result-body">
                  <div className="search-card-meta">
                    <span className="search-card-category">{post.category}</span>
                    <span className="search-card-date">
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {post.date}
                    </span>
                  </div>

                  <h2 className="search-card-title">
                    {renderHighlightedText(post.title, debouncedQuery)}
                  </h2>

                  <p className="search-card-excerpt">
                    {renderHighlightedText(post.excerpt, debouncedQuery)}
                  </p>

                  <div className="search-card-footer">
                    <span className="search-card-author">{post.author || 'Gyan VaniAi'}</span>
                    <span className="search-card-link">
                      Read Article <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
