import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, User, Share2, Copy, Send, ChevronLeft, ChevronRight, MessageCircle, Globe, TrendingUp } from 'lucide-react';

import { auth, db } from '../firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
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
  resolvePostDates,
  buildBlogPostingSchema,
  buildBlogBreadcrumbSchema,
} from '../utils/blogSeo';
import { sanitizeBlogHtml } from '../utils/sanitizeBlogHtml';
import BlogCTA from '../components/BlogCTA';
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
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const q = query(collection(db, 'blogs'), where('slugId', '==', id));
        let querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const qId = query(collection(db, 'blogs'), where('__name__', '==', id));
          querySnapshot = await getDocs(qId);
        }

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const isUnpublished = docData.status === 'draft' || docData.status === 'scheduled' || docData.status === 'archived';
          if (isUnpublished && !auth.currentUser) {
            setPost(null);
          } else {
            setPost({ id: querySnapshot.docs[0].id, ...docData });
          }
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
      try {
        const q = query(
          collection(db, 'blogs'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const publishedList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          const currentIdx = publishedList.findIndex(p => p.id === post.id || p.slugId === post.slugId || p.slugId === id);

          if (currentIdx !== -1) {
            setNextPost(currentIdx > 0 ? publishedList[currentIdx - 1] : null);
            setPrevPost(currentIdx < publishedList.length - 1 ? publishedList[currentIdx + 1] : null);
          }
        }
      } catch (err) {
        console.error('Failed to fetch prev/next articles', err);
      }
    }
    fetchPrevNext();
  }, [post, id]);

  useEffect(() => {
    async function fetchRelated() {
      if (!post) return;
      try {
        const candidates = new Map();

        if (post.categoryId || post.category) {
          const catField = post.categoryId ? 'categoryId' : 'category';
          const catVal = post.categoryId || post.category;
          const catQ = query(
            collection(db, 'blogs'),
            where('status', '==', 'published'),
            where(catField, '==', catVal),
            limit(10)
          );
          const catSnap = await getDocs(catQ);
          catSnap.forEach(d => {
            if (d.id !== post.id) candidates.set(d.id, { id: d.id, ...d.data(), _score: 10 });
          });
        }

        if (post.tags && post.tags.length > 0) {
          const tagQ = query(
            collection(db, 'blogs'),
            where('status', '==', 'published'),
            where('tags', 'array-contains-any', post.tags),
            limit(10)
          );
          const tagSnap = await getDocs(tagQ);
          tagSnap.forEach(d => {
            if (d.id === post.id) return;
            const data = d.data();
            const sharedTags = (data.tags || []).filter(t => (post.tags || []).includes(t)).length;
            if (candidates.has(d.id)) {
              candidates.get(d.id)._score += sharedTags * 3;
            } else {
              candidates.set(d.id, { id: d.id, ...data, _score: sharedTags * 3 });
            }
          });
        }

        const ranked = Array.from(candidates.values()).sort((a, b) => {
          if (b._score !== a._score) return b._score - a._score;
          const tsA = a.publishedAt?.toMillis ? a.publishedAt.toMillis() : 0;
          const tsB = b.publishedAt?.toMillis ? b.publishedAt.toMillis() : 0;
          return tsB - tsA;
        }).slice(0, 3);

        setRelatedPosts(ranked);
      } catch (err) {
        console.error('Failed to fetch related posts', err);
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

  const pageTitle = post.seoTitle ? `${post.seoTitle} | Gyan VaniAi Blog` : `${post.title} | Gyan VaniAi Blog`;
  const description = post.seoDescription || resolveDescription(post);
  const { published, modified } = resolvePostDates(post);
  const image = post.ogImageUrl || post.imageUrl || 'https://www.gyanvaniai.online/hero_dashboard.webp';
  const canonical = post.canonicalUrl || blogPostUrl(id);

  const safePost = {
    ...post,
    title: post.seoTitle || post.title,
    description: description,
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
        publishedTime={published}
        modifiedTime={modified}
        author={post.author || 'Gyan VaniAi Team'}
        section={post.category}
      />
      <Helmet>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
                src={post.imageUrl}
                alt={`${post.title} | Gyan VaniAi`}
                width="1200"
                height="675"
                fetchPriority="high"
                decoding="sync"
                className="blog-hero-image"
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

