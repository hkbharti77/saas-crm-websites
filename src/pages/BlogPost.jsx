import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, Share2, Copy, Send, ChevronLeft, ChevronRight, MessageCircle, Globe, TrendingUp, ShieldCheck } from 'lucide-react';

import ContactModal from '../components/ContactModal';
import {
  trackBlogView,
  trackBlogScroll,
  trackBlogShare,
  trackBlogRelated,
} from '../utils/blogAnalytics';
import { recordRecentView, recordReadingProgress } from '../utils/personalizationEngine';
import SeoHead from '../components/SeoHead';
import NotFound from './NotFound';
import {
  blogPostUrl,
  resolveDescription,
  buildBlogPostingSchema,
  buildBlogBreadcrumbSchema,
} from '../utils/blogSeo';
import { sanitizeBlogHtml } from '../utils/sanitizeBlogHtml';
import BlogCTA from '../components/BlogCTA';
import { STATIC_BLOG_FALLBACKS } from '../data/staticBlogData';
import { API_BASE_URL } from '../config/apiConfig';
import './BlogPost.css';

// Extract headings from HTML content for TOC and enhance HTML (code blocks, tables, FAQs)
function extractHeadingsAndTransformHtml(htmlContent) {
  if (!htmlContent) return { headings: [], modifiedHtml: '' };
  if (typeof DOMParser === 'undefined') {
    return { headings: [], modifiedHtml: htmlContent };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = [];

  // 0. Safeguard: Article body must not contain <h1> (article title in the hero is the only valid H1).
  // If an <h1> was accidentally pasted or saved into the body:
  // - If it has long prose (>100 chars or ends in sentence punctuation), convert to <p>.
  // - If it is a heading/section title, convert to <h2> so it is indexed properly in TOC and adheres to SEO rules.
  doc.querySelectorAll('h1').forEach((h1) => {
    const text = h1.textContent.trim();
    if (!text) {
      h1.remove();
      return;
    }
    if (text.length > 100 || text.includes('. ') || text.includes('.\n')) {
      const p = doc.createElement('p');
      p.innerHTML = h1.innerHTML;
      h1.parentNode.replaceChild(p, h1);
    } else {
      const h2 = doc.createElement('h2');
      h2.innerHTML = h1.innerHTML;
      h1.parentNode.replaceChild(h2, h1);
    }
  });

  // 1. Extract Headings (H2, H3) and assign safe IDs
  doc.querySelectorAll('h2, h3').forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    headings.push({
      id,
      level: parseInt(heading.tagName[1]),
      text: heading.textContent.trim(),
    });
  });

  // 2. Enhance Code Blocks with header bar and copy button
  doc.querySelectorAll('pre').forEach((pre, index) => {
    if (pre.querySelector('.code-block-header')) return;
    const code = pre.querySelector('code');
    const langClass = code ? code.className || '' : pre.className || '';
    const langMatch = langClass.match(/language-([a-z0-9]+)/i);
    const lang = langMatch ? langMatch[1] : 'code';

    const wrapper = doc.createElement('div');
    wrapper.className = 'enhanced-code-wrapper';

    const header = doc.createElement('div');
    header.className = 'code-block-header';
    header.innerHTML = `
      <span class="code-lang-label">${lang.toUpperCase()}</span>
      <button type="button" class="code-copy-btn" data-code-index="${index}" aria-label="Copy code snippet">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        <span>Copy</span>
      </button>
    `;

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });

  // 3. Wrap Tables in responsive overflow wrapper
  doc.querySelectorAll('table').forEach((table) => {
    if (table.parentElement && table.parentElement.classList.contains('responsive-table-wrapper')) return;
    const wrapper = doc.createElement('div');
    wrapper.className = 'responsive-table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // 4. Transform FAQ sections into interactive accordions if FAQ heading exists
  doc.querySelectorAll('h2').forEach((h2) => {
    const text = h2.textContent.toLowerCase();
    if (text.includes('faq') || text.includes('frequently asked questions')) {
      let next = h2.nextElementSibling;
      const faqWrapper = doc.createElement('div');
      faqWrapper.className = 'editorial-faq-container';
      const toRemove = [];

      while (next && (next.tagName === 'H3' || next.tagName === 'P' || next.tagName === 'DIV')) {
        if (next.tagName === 'H3') {
          const qText = next.textContent.trim();
          const ansNode = next.nextElementSibling;
          let aText = '';
          if (ansNode && ansNode.tagName === 'P') {
            aText = ansNode.innerHTML;
            toRemove.push(ansNode);
          }

          const item = doc.createElement('details');
          item.className = 'editorial-faq-item';
          item.innerHTML = `
            <summary class="editorial-faq-question">
              <span>${qText}</span>
              <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="editorial-faq-answer">
              <p>${aText}</p>
            </div>
          `;
          faqWrapper.appendChild(item);
        }
        toRemove.push(next);
        next = next.nextElementSibling;
      }

      if (faqWrapper.children.length > 0) {
        toRemove.forEach(node => node.parentNode && node.parentNode.removeChild(node));
        h2.parentNode.insertBefore(faqWrapper, h2.nextSibling);
      }
    }
  });

  return { headings, modifiedHtml: doc.body.innerHTML };
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(() => STATIC_BLOG_FALLBACKS[id] || null);
  const [loading, setLoading] = useState(!STATIC_BLOG_FALLBACKS[id]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [copyNotification, setCopyNotification] = useState(false);
  const scrollMilestonesRef = useRef(new Set());
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPost() {
      try {
        const cmsApiBase = API_BASE_URL;
        const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const previewToken = searchParams ? searchParams.get('preview') : null;
        const previewQuery = previewToken ? `?preview=${encodeURIComponent(previewToken)}` : '';

        const res = await fetch(`${cmsApiBase}/api/public/posts/${id}${previewQuery}`);
        if (res.ok) {
          const data = await res.json();
          if (data.post) {
            setPost(data.post);
            if (data.post.prevPost) setPrevPost(data.post.prevPost);
            if (data.post.nextPost) setNextPost(data.post.nextPost);
            setLoading(false);
            return;
          }
        }

        if (STATIC_BLOG_FALLBACKS[id]) {
          setPost(STATIC_BLOG_FALLBACKS[id]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.warn('Backend API notice: falling back to static post data:', error);
        if (STATIC_BLOG_FALLBACKS[id]) {
          setPost(STATIC_BLOG_FALLBACKS[id]);
        } else {
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.status === 'published') {
      trackBlogView(post);
      recordRecentView(post);
    }
  }, [post]);

  const [relatedPosts, setRelatedPosts] = useState([]);

  const postContent = post?.content;
  const { headings, processedContent } = useMemo(() => {
    if (!postContent) return { headings: [], processedContent: '' };
    const { headings: extractedHeadings, modifiedHtml } = extractHeadingsAndTransformHtml(postContent);
    return { headings: extractedHeadings, processedContent: modifiedHtml };
  }, [postContent]);

  // Code Copy Button Handler Delegation
  useEffect(() => {
    if (!contentRef.current) return;
    const handleContentClick = (e) => {
      const copyBtn = e.target.closest('.code-copy-btn');
      if (copyBtn) {
        const wrapper = copyBtn.closest('.enhanced-code-wrapper');
        const codeEl = wrapper ? wrapper.querySelector('pre code, pre') : null;
        if (codeEl) {
          const textToCopy = codeEl.textContent || '';
          navigator.clipboard.writeText(textToCopy).then(() => {
            const labelSpan = copyBtn.querySelector('span');
            if (labelSpan) labelSpan.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
              if (labelSpan) labelSpan.textContent = 'Copy';
              copyBtn.classList.remove('copied');
            }, 2000);
          }).catch(() => {});
        }
      }
    };

    const currentRef = contentRef.current;
    currentRef.addEventListener('click', handleContentClick);
    return () => currentRef.removeEventListener('click', handleContentClick);
  }, [processedContent]);

  useEffect(() => {
    async function fetchPrevNext() {
      if (!post || post.status !== 'published') return;
      if (prevPost && nextPost) return;
      try {
        const cmsApiBase = API_BASE_URL;
        const res = await fetch(`${cmsApiBase}/api/public/posts?limit=50`);
        if (res.ok) {
          const data = await res.json();
          const publishedList = data.posts || [];
          const currentIdx = publishedList.findIndex(p => p.id === post.id || p.slugId === post.slugId || p.slug === post.slug || p.slug === id);

          if (currentIdx !== -1) {
            if (!nextPost) setNextPost(currentIdx > 0 ? publishedList[currentIdx - 1] : null);
            if (!prevPost) setPrevPost(currentIdx < publishedList.length - 1 ? publishedList[currentIdx + 1] : null);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch prev/next articles:', err);
      }
    }
    fetchPrevNext();
  }, [post, id, prevPost, nextPost]);

  useEffect(() => {
    async function fetchRelated() {
      if (!post) return;
      try {
        const cmsApiBase = API_BASE_URL;
        const catQuery = post.category ? `?category=${encodeURIComponent(post.category)}&limit=5` : '?limit=5';
        const res = await fetch(`${cmsApiBase}/api/public/posts${catQuery}`);
        if (res.ok) {
          const data = await res.json();
          const related = (data.posts || [])
            .filter(p => p.id !== post.id && p.slug !== post.slug && p.slugId !== post.slugId)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (err) {
        console.warn('Failed to fetch related posts:', err);
      }
    }
    fetchRelated();
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (scrollHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (scrolled / scrollHeight) * 100));
      setReadProgress(progress);

      if (post && post.status === 'published') {
        recordReadingProgress(post.id, progress);

        [25, 50, 75, 100].forEach(depth => {
          if (progress >= depth && !scrollMilestonesRef.current.has(depth)) {
            scrollMilestonesRef.current.add(depth);
            trackBlogScroll(post, depth);
          }
        });
      }

      if (headings.length > 0) {
        for (let i = headings.length - 1; i >= 0; i--) {
          const el = document.getElementById(headings[i].id);
          if (el && el.getBoundingClientRect().top <= 140) {
            setActiveHeadingId(headings[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, headings]);

  const handleShare = (method) => {
    if (!post) return;
    const shareUrl = window.location.href;
    const shareTitle = post.title;

    trackBlogShare(post, method);

    if (method === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopyNotification(true);
        setTimeout(() => setCopyNotification(false), 2500);
      }).catch(() => {});
    } else if (method === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' - ' + shareUrl)}`, '_blank', 'noopener,noreferrer');
    } else if (method === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    } else if (method === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'noopener,noreferrer');
    } else if (method === 'native') {
      if (navigator.share) {
        navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
      } else {
        handleShare('copy');
      }
    }
  };

  if (loading) {
    return (
      <>
        <SeoHead
          title="Loading article… | Gyan VaniAi Blog"
          canonical={blogPostUrl(id)}
        />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading...
        </div>
      </>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const pageTitle = (post.seo?.metaTitle || post.seoTitle) 
    ? `${post.seo?.metaTitle || post.seoTitle} | Gyan VaniAi Blog` 
    : `${post.title} | Gyan VaniAi Blog`;
  const description = post.seo?.metaDescription || post.seoDescription || resolveDescription(post);
  const image = post.seo?.ogImage || post.ogImageUrl || post.imageUrl || 'https://www.gyanvaniai.com/hero_dashboard.webp';
  const canonical = post.seo?.canonicalUrl || post.canonicalUrl || blogPostUrl(id);
  const aeoQuestion = post.aeo?.directQuestion || post.aeoDirectQuestion || `What is ${post.title}?`;
  const aeoAnswer = post.aeo?.directAnswer || post.aeoDirectAnswer || post.excerpt;
  const geo = post.geo || null;
  const keywords = post.seo?.keywords || post.keywords || post.tags || [];

  const safePost = {
    ...post,
    title: post.seo?.metaTitle || post.seoTitle || post.title,
    description: description,
    geo: geo,
    keywords: keywords,
  };
  const schema = [buildBlogPostingSchema(safePost, id), buildBlogBreadcrumbSchema(safePost, id)];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={description}
        canonical={canonical}
        image={image}
        type="article"
        schema={schema.length === 1 ? schema[0] : schema}
        preloadImage={post.imageUrl}
        aeoQuestion={aeoQuestion}
        aeoAnswer={aeoAnswer}
        geo={geo}
        keywords={keywords}
      />
      <Helmet>
        {post.imageUrl && <link rel="preload" as="image" href={post.imageUrl} fetchPriority="high" />}
      </Helmet>

      {/* Reading Progress Indicator */}
      <div
        className="blog-reading-progress-bar"
        style={{ width: `${readProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <article className="blog-editorial-article">
        
        {/* Editorial Header Section */}
        <header className="blog-editorial-header">
          <div className="blog-editorial-container">
            
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="blog-breadcrumb">
              <ol className="breadcrumb-list">
                <li>
                  <Link to="/" className="breadcrumb-link">Home</Link>
                </li>
                <li aria-hidden="true" className="breadcrumb-separator">/</li>
                <li>
                  <Link to="/blog" className="breadcrumb-link">Blog</Link>
                </li>
                <li aria-hidden="true" className="breadcrumb-separator">/</li>
                <li aria-current="page" className="breadcrumb-current">
                  {post.category || 'Article'}
                </li>
              </ol>
            </nav>

            <Link to="/blog" className="back-to-blog">
              <ArrowLeft size={15} /> Back to Blog
            </Link>

            {/* Category Badge */}
            {post.category && (
              <div className="blog-category-wrap">
                <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="blog-category-badge">
                  {post.category}
                </Link>
              </div>
            )}

            {/* Title (H1) */}
            <h1 className="blog-article-h1">{post.title}</h1>

            {/* Excerpt / Lead Subtitle */}
            {post.excerpt && (
              <p className="blog-article-excerpt">{post.excerpt}</p>
            )}

            {/* Editorial Metadata Bar */}
            <div className="blog-editorial-meta">
              {post.author && (
                <div className="meta-item">
                  <User size={15} className="meta-icon" />
                  <span>{post.author}</span>
                </div>
              )}
              {post.author && post.date && <span className="meta-dot" aria-hidden="true">•</span>}
              {post.date && (
                <div className="meta-item">
                  <Calendar size={15} className="meta-icon" />
                  <span>{post.date}</span>
                </div>
              )}
              {post.date && post.readTime && <span className="meta-dot" aria-hidden="true">•</span>}
              {post.readTime && (
                <div className="meta-item">
                  <Clock size={15} className="meta-icon" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>

            {/* Social Share Toolbar */}
            <div className="blog-share-toolbar" aria-label="Social sharing options">
              <span className="share-label"><Share2 size={14} /> Share:</span>
              <button
                type="button"
                onClick={() => handleShare('copy')}
                className="share-btn"
                title="Copy link to clipboard"
                aria-label="Copy link"
              >
                <Copy size={14} />
                {copyNotification ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="share-btn share-whatsapp"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <Send size={14} /> WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleShare('linkedin')}
                className="share-btn share-linkedin"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <Globe size={14} /> LinkedIn
              </button>
              <button
                type="button"
                onClick={() => handleShare('twitter')}
                className="share-btn share-twitter"
                title="Share on X / Twitter"
                aria-label="Share on X"
              >
                <MessageCircle size={14} /> X
              </button>

              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  type="button"
                  onClick={() => handleShare('native')}
                  className="share-btn share-native"
                  title="More sharing options"
                  aria-label="Share via device options"
                >
                  More…
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {post.imageUrl && (
          <div className="blog-editorial-container blog-hero-image-wrap">
            <div className="blog-hero-image-frame">
              <img
                src={post.imageUrl || '/portfolio_crm.webp'}
                alt={`${post.title} | Gyan VaniAi`}
                width="1200"
                height="675"
                fetchPriority="high"
                decoding="sync"
                className="blog-hero-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/portfolio_crm.webp';
                }}
              />
            </div>
          </div>
        )}



        {/* Two-Column Grid: Left 760px Reading Column + Right Sticky TOC Sidebar (Desktop) */}
        <div className="blog-editorial-container blog-reading-layout">
          <div className={`blog-grid-wrapper ${headings.length > 0 ? 'has-toc' : 'no-toc'}`}>
            
            {/* Main Reading Column */}
            <main className="blog-reading-column">
              
              {/* Mobile Collapsible TOC Drawer */}
              {headings.length > 0 && (
                <details className="blog-mobile-toc-box">
                  <summary className="blog-mobile-toc-header">
                    <span className="toc-title">
                      <TrendingUp size={15} /> On this page ({headings.length} sections)
                    </span>
                    <ChevronRight size={15} className="mobile-toc-arrow" />
                  </summary>
                  <ul className="blog-toc-list mobile">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={`blog-toc-item level-${heading.level} ${activeHeadingId === heading.id ? 'active' : ''}`}
                      >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {/* Main Body HTML Content */}
              <div
                ref={contentRef}
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(processedContent) }}
              />

              {/* Tags Footer */}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-tags-footer">
                  <span className="tags-label">Tags:</span>
                  <div className="tags-list">
                    {post.tags.map((slug, idx) => (
                      <Link
                        key={slug}
                        to={`/blog?tag=${encodeURIComponent(slug)}`}
                        className="blog-tag-pill"
                      >
                        #{post.tagLabels?.[idx] || slug}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author & Editorial Credibility Card */}
              <section className="blog-author-card" aria-label="Author and editorial information">
                <div className="author-card-header">
                  <div className="author-avatar-badge">
                    <User size={24} />
                  </div>
                  <div className="author-info-main">
                    <div className="author-name-row">
                      <h3 className="author-name">{post.author || 'Gyan VaniAi Architecture Team'}</h3>
                      <span className="author-badge">Verified Expert</span>
                    </div>
                    <p className="author-role">Enterprise Systems &amp; AI Research Group at Gyan VaniAi</p>
                  </div>
                </div>

                <p className="author-bio">
                  Authored by the engineering and solutions team at Gyan VaniAi. Focused on high-throughput Meta Cloud API integrations, autonomous multi-agent tool calling, sub-400ms voice pipelines, and single-tenant enterprise CRM architecture.
                </p>

                <div className="author-editorial-bar">
                  <div className="editorial-badge">
                    <ShieldCheck size={16} color="#10b981" />
                    <span>Fact-checked &amp; reviewed under Gyan VaniAi Technical Standards.</span>
                  </div>
                  <div className="author-social-links">
                    <a href="https://github.com/gyanvaniai" target="_blank" rel="noopener noreferrer" className="author-link" aria-label="Gyan VaniAi on GitHub">
                      GitHub
                    </a>
                    <span>·</span>
                    <a href="https://www.linkedin.com/company/gyan-vaniai" target="_blank" rel="noopener noreferrer" className="author-link" aria-label="Gyan VaniAi on LinkedIn">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </section>

              {/* Integrated CTA Block */}
              <div className="blog-cta-container">
                <BlogCTA post={post} onOpenDemo={() => setIsModalOpen(true)} />
              </div>

              {/* Adjacent Article Navigation (Prev / Next) */}
              {(prevPost || nextPost) && (
                <nav className="article-prev-next-nav" aria-label="Article navigation">
                  {prevPost ? (
                    <Link to={`/blog/${prevPost.slugId || prevPost.id}`} className="nav-card prev-card">
                      <span className="nav-card-label"><ChevronLeft size={15} /> Previous Article</span>
                      <span className="nav-card-title">{prevPost.title}</span>
                    </Link>
                  ) : <div className="nav-card-empty" />}

                  {nextPost ? (
                    <Link to={`/blog/${nextPost.slugId || nextPost.id}`} className="nav-card next-card">
                      <span className="nav-card-label">Next Article <ChevronRight size={15} /></span>
                      <span className="nav-card-title">{nextPost.title}</span>
                    </Link>
                  ) : <div className="nav-card-empty" />}
                </nav>
              )}

              {/* Related Articles Cards */}
              {relatedPosts.length > 0 && (
                <section className="blog-related-section">
                  <h3 className="related-section-title">Related Articles</h3>
                  <div className="related-articles-grid">
                    {relatedPosts.map(rp => (
                      <Link
                        key={rp.id}
                        to={`/blog/${rp.slugId || rp.id}`}
                        className="blog-related-card"
                        onClick={() => { if (post) trackBlogRelated(post, rp.id); }}
                      >
                        {rp.imageUrl && (
                          <div className="related-image-frame">
                            <img src={rp.imageUrl} alt={rp.title} className="related-card-image" loading="lazy" />
                          </div>
                        )}
                        <div className="related-card-body">
                          <span className="related-category">{rp.category}</span>
                          <h4 className="related-title">{rp.title}</h4>
                          {rp.readTime && (
                            <span className="related-readtime">
                              <Clock size={12} /> {rp.readTime}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* Desktop Sticky Sidebar TOC */}
            {headings.length > 0 && (
              <aside className="blog-desktop-toc-sidebar" aria-label="Table of contents">
                <div className="blog-sticky-toc-box">
                  <div className="toc-sidebar-header">
                    <TrendingUp size={14} className="toc-icon" />
                    <span>ON THIS PAGE</span>
                  </div>
                  <ul className="toc-sidebar-list">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={`toc-sidebar-item level-${heading.level} ${activeHeadingId === heading.id ? 'active' : ''}`}
                      >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}

          </div>
        </div>
      </article>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

