import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Search,
  X,
} from 'lucide-react';
import {
  LEGAL_META,
  TRUST_HUB_LINKS,
  filterLegalSections,
} from '../../config/legalDocumentsConfig';
import {
  downloadLegalPdf,
  triggerPrintWithPdfFallback,
} from '../../utils/legalPdfExport';
import '../../pages/LegalTrustCenter.css';

export default function TrustCenterShell({
  activeDocId,
  kicker,
  title,
  deck,
  summaryStrip,
  sections,
  quickActions = [],
  children,
}) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [exportFeedback, setExportFeedback] = useState('');
  const [pdfJustSaved, setPdfJustSaved] = useState(false);
  const articleRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const filteredSections = useMemo(
    () => filterLegalSections(sections, searchQuery),
    [sections, searchQuery]
  );

  const matchedIds = useMemo(
    () => new Set(filteredSections.map((s) => s.id)),
    [filteredSections]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeDocId]);

  // Compositor-friendly scroll reading progress
  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, scrollTop / docHeight));
      setReadingProgress(next);
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-spy via IntersectionObserver for active TOC chapter
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (sectionElements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-88px 0px -58% 0px',
        threshold: 0.01,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, searchQuery]);

  const handleJumpToSection = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 104;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveSectionId(id);
    setMobileTocOpen(false);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const showTemporaryFeedback = (message, markSaved = false) => {
    setExportFeedback(message);
    if (markSaved) setPdfJustSaved(true);
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }
    feedbackTimerRef.current = window.setTimeout(() => {
      setExportFeedback('');
      setPdfJustSaved(false);
    }, 4500);
  };

  const handleDownloadPdf = () => {
    const filename = downloadLegalPdf({
      activeDocId,
      title,
      deck,
      articleElement: articleRef.current,
    });
    showTemporaryFeedback(`Downloaded ${filename}`, true);
  };

  const handlePrint = () => {
    triggerPrintWithPdfFallback({
      activeDocId,
      title,
      deck,
      articleElement: articleRef.current,
      onFallback: (filename) => {
        showTemporaryFeedback(
          `Print dialog is restricted in embedded preview — downloaded ${filename} instead.`,
          true
        );
      },
    });
  };

  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <div className="trust-ed-page">
      {/* Reading progress rail */}
      <div
        className="trust-ed-progress-track"
        role="progressbar"
        aria-label="Document reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readingProgress * 100)}
      >
        <div
          className="trust-ed-progress-bar"
          style={{ transform: `scaleX(${readingProgress})` }}
        />
      </div>

      {/* Institutional Masthead */}
      <header className="trust-ed-masthead">
        <div className="trust-ed-masthead-inner">
          <div className="trust-ed-toolbar">
            <nav
              className="trust-ed-switcher"
              aria-label="Legal and trust documents"
            >
              {TRUST_HUB_LINKS.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  aria-current={activeDocId === item.id ? 'page' : undefined}
                  className={`trust-ed-switch-link ${
                    activeDocId === item.id ? 'is-active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="trust-ed-actions">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="trust-ed-print-btn trust-ed-save-btn"
              >
                {pdfJustSaved ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    <span>PDF Saved</span>
                  </>
                ) : (
                  <>
                    <Download size={16} aria-hidden="true" />
                    <span>Save PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="trust-ed-print-btn"
              >
                <Printer size={16} aria-hidden="true" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {exportFeedback && (
            <p className="trust-ed-export-status" role="status" aria-live="polite">
              {exportFeedback}
            </p>
          )}

          <div className="trust-ed-title-block">
            <p className="trust-ed-kicker">{kicker}</p>
            <h1 className="trust-ed-h1">{title}</h1>
            <p className="trust-ed-deck">{deck}</p>
            <div className="trust-ed-meta-row">
              <span>Effective Date: {LEGAL_META.effectiveDate}</span>
              <span className="trust-ed-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{LEGAL_META.legalEntity}</span>
              <span className="trust-ed-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>{LEGAL_META.jurisdiction}</span>
            </div>
          </div>

          <div className="trust-ed-summary-strip" aria-label="Document key facts">
            {summaryStrip.map((item) => (
              <div key={item.label} className="trust-ed-summary-item">
                <span className="trust-ed-summary-label">{item.label}</span>
                <span className="trust-ed-summary-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main 2-Column Editorial Canvas */}
      <div className="trust-ed-layout">
        <aside className="trust-ed-sidebar" aria-label="Document navigation">
          <button
            type="button"
            className="trust-ed-mobile-toc-trigger"
            aria-expanded={mobileTocOpen}
            aria-controls="trust-ed-sidebar-panel"
            onClick={() => setMobileTocOpen((prev) => !prev)}
          >
            <span>
              Contents &amp; Search ({filteredSections.length}/{sections.length})
            </span>
            {mobileTocOpen ? (
              <ChevronUp size={18} aria-hidden="true" />
            ) : (
              <ChevronDown size={18} aria-hidden="true" />
            )}
          </button>

          <div
            id="trust-ed-sidebar-panel"
            className={`trust-ed-sidebar-body ${mobileTocOpen ? 'is-open' : ''}`}
          >
            <div className="trust-ed-search-wrap">
              <Search
                size={15}
                className="trust-ed-search-icon"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections or topics..."
                aria-label="Search sections in this document"
                className="trust-ed-search-input"
              />
              {hasActiveSearch && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear section search"
                  className="trust-ed-search-clear"
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>

            <p className="trust-ed-search-status" aria-live="polite">
              {hasActiveSearch
                ? `Showing ${filteredSections.length} of ${sections.length} chapters`
                : `${sections.length} chapters`}
            </p>

            <p className="trust-ed-toc-heading">On this page</p>
            <nav aria-label="Table of contents">
              <ul className="trust-ed-toc-list">
                {filteredSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleJumpToSection(e, section.id)}
                      className={`trust-ed-toc-link ${
                        activeSectionId === section.id ? 'is-active' : ''
                      }`}
                    >
                      <span className="trust-ed-toc-num">{section.number}</span>
                      <span>{section.shortTitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {quickActions.length > 0 && (
              <div className="trust-ed-sidebar-actions">
                {quickActions.map((action) =>
                  action.to ? (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="trust-ed-sidebar-cta"
                    >
                      <span>{action.label}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      key={action.label}
                      href={action.href}
                      onClick={
                        action.sectionId
                          ? (e) => handleJumpToSection(e, action.sectionId)
                          : undefined
                      }
                      className="trust-ed-sidebar-cta"
                    >
                      <span>{action.label}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </aside>

        <article className="trust-ed-article" ref={articleRef}>
          {hasActiveSearch && filteredSections.length === 0 ? (
            <div className="trust-ed-empty-state" role="status">
              <h2 className="trust-ed-empty-title">
                No chapters matched &ldquo;{searchQuery.trim()}&rdquo;
              </h2>
              <p className="trust-ed-empty-desc">
                Try searching for a broader term such as Google, WhatsApp,
                Razorpay, Stripe, retention, consent, or grievance.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="trust-ed-reset-btn"
              >
                Reset search
              </button>
            </div>
          ) : (
            children({ matchedIds, hasActiveSearch, jumpTo: handleJumpToSection })
          )}
        </article>
      </div>
    </div>
  );
}
