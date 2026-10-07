import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {
  RefreshCw,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
  Compass,
  ExternalLink,
  Eye,
  X,
  Copy,
  Check,
  ShieldCheck,
  MapPin,
  Laptop
} from 'lucide-react';
import './CookieConsentAnalytics.css';

const STATUS_LABELS = {
  all: 'Accept All',
  essential: 'Essential Only',
  rejected: 'Reject All',
  custom: 'Custom',
};

const STATUS_COLORS = {
  all: 'var(--primary-color, #2563eb)',
  essential: '#f59e0b',
  rejected: '#ef4444',
  custom: '#8b5cf6',
};

const getPageNumbers = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push('...');
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push(1);
    pages.push('...');
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('...');
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push('...');
    pages.push(total);
  }
  return pages;
};

export default function CookieConsentAnalytics() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all_status');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchConsents = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const q = query(collection(db, 'cookie_consents'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      if (err.code === 'permission-denied' || err.message?.includes('permission')) {
        setError('permission-denied');
      } else {
        setError('Failed to load consent data.');
      }
      console.warn('CookieConsentAnalytics warning:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      try {
        const q = query(collection(db, 'cookie_consents'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (isMounted) {
          setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        if (isMounted) {
          if (err.code === 'permission-denied' || err.message?.includes('permission')) {
            setError('permission-denied');
          } else {
            setError('Failed to load consent data.');
          }
        }
        console.warn('CookieConsentAnalytics warning:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadInitial();
    return () => { isMounted = false; };
  }, []);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (val) => {
    setPageSize(val);
    setCurrentPage(1);
  };

  const [tooltipState, setTooltipState] = useState(null);

  useEffect(() => {
    const handleScroll = () => setTooltipState(null);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterCell = (e, record) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 360;
    const padding = 12;
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    // Use cursor X position, or center of the cell
    const clientX = e.clientX || (rect.left + rect.width / 2);

    // Show above if space is available (cell is at least 150px from top)
    const showAbove = rect.top > 150;
    const targetY = showAbove ? rect.top - 8 : rect.bottom + 8;

    let cardLeft = clientX - tooltipWidth / 2;
    if (cardLeft < padding) cardLeft = padding;
    if (cardLeft + tooltipWidth > winWidth - padding) {
      cardLeft = winWidth - tooltipWidth - padding;
    }

    const arrowLeft = Math.min(Math.max(clientX - cardLeft, 22), tooltipWidth - 22);

    setTooltipState({
      top: targetY,
      left: cardLeft,
      arrowLeft,
      showAbove,
      pageUrl: record.pageUrl || '-',
      referrer: record.referrer || null,
      userAgent: record.userAgent || null,
      language: record.language || null,
    });
  };

  const handleMouseLeaveCell = () => {
    setTooltipState(null);
  };

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRecord(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedRecord && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    };
  }, [selectedRecord]);

  const total = records.length;
  const counts = useMemo(() => {
    return records.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {});
  }, [records]);

  const pct = (key) => (total ? Math.round(((counts[key] || 0) / total) * 100) : 0);

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (statusFilter !== 'all_status' && r.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase();
        const loc = [r.city, r.region, r.country, r.countryCode].filter(Boolean).join(' ').toLowerCase();
        const ip = (r.ip || '').toLowerCase();
        const isp = (r.isp || '').toLowerCase();
        const status = (r.status || '').toLowerCase();
        if (!loc.includes(queryLower) && !ip.includes(queryLower) && !isp.includes(queryLower) && !status.includes(queryLower)) {
          return false;
        }
      }
      return true;
    });
  }, [records, statusFilter, searchQuery]);

  const totalFiltered = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRecords = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, safeCurrentPage, pageSize]);

  const startRecord = totalFiltered === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRecord = Math.min(safeCurrentPage * pageSize, totalFiltered);

  if (loading) {
    return (
      <div className="cca-card">
        <div className="cca-loading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <RefreshCw size={18} className="cca-spinner-icon" />
          <span>Loading consent analytics...</span>
        </div>
      </div>
    );
  }

  if (error === 'permission-denied') {
    return (
      <div className="cca-card">
        <div className="cca-card-header">
          <div className="cca-title-group">
            <span className="cca-icon">🔒</span>
            <div>
              <h3 className="cca-title">Firestore Security Rules Setup Required</h3>
              <p className="cca-subtitle">Your Firebase Firestore rules need to permit reading the <code>cookie_consents</code> collection.</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '1.25rem', marginTop: '0.5rem' }}>
          <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            To enable analytics, ensure this rule is deployed in Firebase Console &gt; Firestore Database &gt; Rules:
          </p>
          <pre style={{ background: '#0a0f1d', color: '#38bdf8', padding: '1rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.5' }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cookie consent logging & analytics
    match /cookie_consents/{docId} {
      allow create: if request.resource.data.status in ['all', 'essential', 'rejected', 'custom']
                    && request.resource.data.keys().hasAll(['status', 'preferences', 'createdAt']);
      allow read, update, delete: if request.auth != null;
    }
  }
}`}
          </pre>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cca-card">
        <div className="cca-error">{error}</div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => fetchConsents()}
            className="cca-btn-refresh"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cca-card">
      <div className="cca-card-header">
        <div className="cca-title-group">
          <span className="cca-icon">🍪</span>
          <div>
            <h3 className="cca-title">Cookie Consent Overview</h3>
            <p className="cca-subtitle">{total} total consent decisions logged across all visitors</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchConsents(true)}
          disabled={refreshing}
          className="cca-btn-refresh"
          title="Refresh real-time data from Firestore"
        >
          <RefreshCw size={14} className={refreshing ? 'cca-spinning' : ''} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <p className="cca-empty" style={{ margin: 0 }}>
            No consent events recorded yet. Events appear when visitors click Accept, Reject, or Essential Cookies on the public website.
          </p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="cca-stats-grid">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <div
                className={`cca-stat-card ${statusFilter === key ? 'active-filter' : ''}`}
                key={key}
                style={{ '--accent': STATUS_COLORS[key], cursor: 'pointer' }}
                onClick={() => handleStatusFilterChange(statusFilter === key ? 'all_status' : key)}
                title={`Filter table by ${label}`}
              >
                <div className="cca-stat-count">{counts[key] || 0}</div>
                <div className="cca-stat-label">{label}</div>
                <div className="cca-stat-pct">{pct(key)}% of total</div>
                <div className="cca-bar-track">
                  <div className="cca-bar-fill" style={{ width: `${pct(key)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Filter and Search Bar */}
          <div className="cca-controls-bar">
            <div className="cca-search-box">
              <Search size={15} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by city, country, IP..."
                className="cca-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 4px' }}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="cca-filter-pills">
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
              <button
                type="button"
                className={`cca-pill ${statusFilter === 'all_status' ? 'active' : ''}`}
                onClick={() => handleStatusFilterChange('all_status')}
              >
                All ({total})
              </button>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`cca-pill ${statusFilter === key ? 'active' : ''}`}
                  onClick={() => handleStatusFilterChange(key)}
                >
                  {label} ({counts[key] || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Recent Events Table Header with PageSize Selector */}
          <div className="cca-recent-header">
            <div>
              <h4 className="cca-recent-title">
                Consent Audit Trail
              </h4>
              <p className="cca-recent-subtitle">
                Showing {startRecord}–{endRecord} of {totalFiltered} {totalFiltered === 1 ? 'event' : 'events'}
              </p>
            </div>

            <div className="cca-pagesize-wrapper">
              <label htmlFor="cca-pagesize-select" className="cca-pagesize-label">Show:</label>
              <select
                id="cca-pagesize-select"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="cca-pagesize-select"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>

          <div className="cca-table-wrapper">
            <table className="cca-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Analytics</th>
                  <th>Marketing</th>
                  <th>Page / Referrer</th>
                  <th>Date / Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No consent records match your current filter or search query.
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((r, i) => {
                    const rowNum = (safeCurrentPage - 1) * pageSize + i + 1;
                    const ts = r.createdAt?.toDate ? r.createdAt.toDate() : (r.createdAt ? new Date(r.createdAt) : null);
                    const locationStr = [r.city, r.region, r.country].filter(Boolean).join(', ') || r.countryCode || '-';
                    return (
                      <tr
                        key={r.id}
                        className="cca-table-row"
                        onClick={() => { setTooltipState(null); setSelectedRecord(r); }}
                        title="Click to view full consent audit record"
                      >
                        <td className="cca-row-num">{rowNum}</td>
                        <td>
                          <span
                            className="cca-status-badge"
                            style={{ '--accent': STATUS_COLORS[r.status] || '#64748b' }}
                          >
                            {STATUS_LABELS[r.status] || r.status}
                          </span>
                        </td>
                        <td className="cca-location">
                          {locationStr}
                        </td>
                        <td className={r.preferences?.analytics ? 'cca-yes' : 'cca-no'}>
                          {r.preferences?.analytics ? '✓ Accepted' : '✗ Denied'}
                        </td>
                        <td className={r.preferences?.marketing ? 'cca-yes' : 'cca-no'}>
                          {r.preferences?.marketing ? '✓ Accepted' : '✗ Denied'}
                        </td>
                        <td
                          className="cca-cell-url"
                          onMouseEnter={(e) => handleMouseEnterCell(e, r)}
                          onMouseLeave={handleMouseLeaveCell}
                          onClick={() => { setTooltipState(null); setSelectedRecord(r); }}
                          title="Click to view full record screen"
                        >
                          <div className="cca-url-row">
                            <span className="cca-url-path">
                              {r.pageUrl ? (r.pageUrl.replace(/^https?:\/\/[^/]+/, '') || '/') : '-'}
                            </span>
                            {r.referrer && (
                              <span className="cca-ref-badge" title="Has Referrer">
                                ref
                              </span>
                            )}
                            <Info size={13} className="cca-url-info-icon" />
                          </div>
                        </td>
                        <td className="cca-date">
                          {ts
                            ? ts.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                            : '-'}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => { setTooltipState(null); setSelectedRecord(r); }}
                            className="cca-btn-details"
                            title="Open full audit record popup"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Navigation */}
          {totalPages > 1 && (
            <div className="cca-pagination">
              <div className="cca-pagination-info">
                Page {safeCurrentPage} of {totalPages}
              </div>

              <div className="cca-pagination-buttons">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  disabled={safeCurrentPage === 1}
                  className="cca-page-btn"
                  title="First page"
                >
                  <ChevronsLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="cca-page-btn"
                  title="Previous page"
                >
                  <ChevronLeft size={15} />
                </button>

                {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => (
                  p === '...' ? (
                    <span key={`ellipsis-${idx}`} className="cca-page-ellipsis">…</span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPage(p)}
                      className={`cca-page-btn ${safeCurrentPage === p ? 'active' : ''}`}
                    >
                      {p}
                    </button>
                  )
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="cca-page-btn"
                  title="Next page"
                >
                  <ChevronRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={safeCurrentPage === totalPages}
                  className="cca-page-btn"
                  title="Last page"
                >
                  <ChevronsRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Floating Detailed Tooltip for Page / Referrer (Portaled directly to document.body) */}
      {tooltipState && typeof document !== 'undefined' && createPortal(
        <div
          className={`cca-floating-tooltip ${tooltipState.showAbove ? 'pos-above' : 'pos-below'}`}
          style={{
            top: `${tooltipState.top}px`,
            left: `${tooltipState.left}px`,
          }}
        >
          <div className="cca-tooltip-card">
            <div
              className="cca-tooltip-arrow"
              style={{ left: `${tooltipState.arrowLeft}px` }}
            />
            <div className="cca-tooltip-header">
              <Compass size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Page & Traffic Details</span>
            </div>

            <div className="cca-tooltip-row">
              <span className="cca-tooltip-label">Full Page URL</span>
              <div className="cca-tooltip-val">
                <a
                  href={tooltipState.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cca-tooltip-link"
                >
                  <span>{tooltipState.pageUrl}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="cca-tooltip-row">
              <span className="cca-tooltip-label">Referrer Source</span>
              <div className="cca-tooltip-val">
                {tooltipState.referrer ? (
                  <span className="cca-referrer-pill">
                    {tooltipState.referrer}
                  </span>
                ) : (
                  <span className="cca-direct-pill">
                    Direct Traffic / No Referrer
                  </span>
                )}
              </div>
            </div>

            {tooltipState.userAgent && (
              <div className="cca-tooltip-row">
                <span className="cca-tooltip-label">Device & Browser User-Agent</span>
                <div className="cca-tooltip-val cca-tooltip-mono">
                  {tooltipState.userAgent}
                </div>
              </div>
            )}

            {tooltipState.language && (
              <div className="cca-tooltip-row">
                <span className="cca-tooltip-label">Browser Language</span>
                <div className="cca-tooltip-val">
                  <span className="cca-lang-pill">{tooltipState.language}</span>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Full Details Modal Screen (Portaled to document.body) */}
      {selectedRecord && typeof document !== 'undefined' && createPortal(
        <div
          className="cca-modal-overlay"
          onClick={() => setSelectedRecord(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cca-modal-title"
        >
          <div
            className="cca-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="cca-modal-header">
              <div className="cca-modal-title-group">
                <div
                  className="cca-modal-status-icon"
                  style={{ '--accent': STATUS_COLORS[selectedRecord.status] || '#64748b' }}
                >
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="cca-modal-badges-row">
                    <h3 id="cca-modal-title" className="cca-modal-title">
                      Consent Audit Record
                    </h3>
                    <span
                      className="cca-status-badge large"
                      style={{ '--accent': STATUS_COLORS[selectedRecord.status] || '#64748b' }}
                    >
                      {STATUS_LABELS[selectedRecord.status] || selectedRecord.status}
                    </span>
                  </div>
                  <p className="cca-modal-subtitle">
                    Recorded on {selectedRecord.createdAt?.toDate ? selectedRecord.createdAt.toDate().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'medium' }) : (selectedRecord.createdAt ? new Date(selectedRecord.createdAt).toLocaleString('en-IN') : 'Just now')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="cca-modal-close-btn"
                title="Close modal (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="cca-modal-body">
              {/* Cookie Categories Grid */}
              <div className="cca-modal-section">
                <div className="cca-modal-section-title">
                  <ShieldCheck size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Cookie Categories Consent</span>
                </div>
                <div className="cca-prefs-grid">
                  <div className="cca-pref-item allowed">
                    <div className="cca-pref-top">
                      <span className="cca-pref-name">Strictly Necessary</span>
                      <span className="cca-pref-badge active">Always Active</span>
                    </div>
                    <p className="cca-pref-desc">Core session security, CSRF protection, and page navigation.</p>
                  </div>

                  <div className={`cca-pref-item ${selectedRecord.preferences?.functional ? 'allowed' : 'denied'}`}>
                    <div className="cca-pref-top">
                      <span className="cca-pref-name">Functional</span>
                      <span className={`cca-pref-badge ${selectedRecord.preferences?.functional ? 'active' : 'inactive'}`}>
                        {selectedRecord.preferences?.functional ? '✓ Accepted' : '✗ Denied'}
                      </span>
                    </div>
                    <p className="cca-pref-desc">Theme mode, regional currency, and language preferences.</p>
                  </div>

                  <div className={`cca-pref-item ${selectedRecord.preferences?.analytics ? 'allowed' : 'denied'}`}>
                    <div className="cca-pref-top">
                      <span className="cca-pref-name">Analytics & Performance</span>
                      <span className={`cca-pref-badge ${selectedRecord.preferences?.analytics ? 'active' : 'inactive'}`}>
                        {selectedRecord.preferences?.analytics ? '✓ Accepted' : '✗ Denied'}
                      </span>
                    </div>
                    <p className="cca-pref-desc">Traffic metrics, page engagement, and dwell statistics.</p>
                  </div>

                  <div className={`cca-pref-item ${selectedRecord.preferences?.marketing ? 'allowed' : 'denied'}`}>
                    <div className="cca-pref-top">
                      <span className="cca-pref-name">Marketing & Targeting</span>
                      <span className={`cca-pref-badge ${selectedRecord.preferences?.marketing ? 'active' : 'inactive'}`}>
                        {selectedRecord.preferences?.marketing ? '✓ Accepted' : '✗ Denied'}
                      </span>
                    </div>
                    <p className="cca-pref-desc">Ad campaigns, cross-device attribution, and personalized ads.</p>
                  </div>
                </div>
              </div>

              {/* Traffic & Navigation Section */}
              <div className="cca-modal-section">
                <div className="cca-modal-section-title">
                  <Compass size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Traffic & Landing URL</span>
                </div>
                <div className="cca-detail-list">
                  <div className="cca-detail-row">
                    <span className="cca-detail-label">Full Page URL</span>
                    <div className="cca-detail-content">
                      <a
                        href={selectedRecord.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cca-modal-link"
                      >
                        <span>{selectedRecord.pageUrl || '-'}</span>
                        <ExternalLink size={13} />
                      </a>
                      {selectedRecord.pageUrl && (
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedRecord.pageUrl, 'url')}
                          className="cca-btn-copy"
                          title="Copy URL"
                        >
                          {copiedKey === 'url' ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="cca-detail-row">
                    <span className="cca-detail-label">Referrer Source</span>
                    <div className="cca-detail-content">
                      {selectedRecord.referrer ? (
                        <a
                          href={selectedRecord.referrer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cca-referrer-pill"
                          style={{ textDecoration: 'none' }}
                        >
                          <span>{selectedRecord.referrer}</span>
                          <ExternalLink size={11} style={{ marginLeft: 4 }} />
                        </a>
                      ) : (
                        <span className="cca-direct-pill">Direct Traffic (URL bar or bookmark)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Geolocation & Network Section */}
              <div className="cca-modal-section">
                <div className="cca-modal-section-title">
                  <MapPin size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Visitor Location & Network</span>
                </div>
                <div className="cca-detail-grid">
                  <div className="cca-detail-item">
                    <span className="cca-detail-label">Geographic Location</span>
                    <span className="cca-detail-value">
                      {[selectedRecord.city, selectedRecord.region, selectedRecord.country].filter(Boolean).join(', ') || selectedRecord.countryCode || 'Unknown'}
                    </span>
                  </div>

                  <div className="cca-detail-item">
                    <span className="cca-detail-label">Country Code</span>
                    <span className="cca-detail-value font-mono">
                      {selectedRecord.countryCode || '-'}
                    </span>
                  </div>

                  <div className="cca-detail-item">
                    <span className="cca-detail-label">IP Address</span>
                    <span className="cca-detail-value font-mono">
                      {selectedRecord.ip || 'Masked / Privacy Protected'}
                    </span>
                  </div>

                  <div className="cca-detail-item">
                    <span className="cca-detail-label">ISP / Organization</span>
                    <span className="cca-detail-value">
                      {selectedRecord.isp || '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Device & Client Info */}
              <div className="cca-modal-section">
                <div className="cca-modal-section-title">
                  <Laptop size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Device & Client Specifications</span>
                </div>
                <div className="cca-detail-list">
                  <div className="cca-detail-row">
                    <span className="cca-detail-label">Browser Language</span>
                    <span className="cca-lang-pill">
                      {selectedRecord.language || 'Not reported'}
                    </span>
                  </div>

                  <div className="cca-detail-row">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.35rem' }}>
                      <span className="cca-detail-label">Full User-Agent String</span>
                      {selectedRecord.userAgent && (
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedRecord.userAgent, 'ua')}
                          className="cca-btn-copy-text"
                        >
                          {copiedKey === 'ua' ? (
                            <>
                              <Check size={12} style={{ color: '#10b981' }} />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy User-Agent</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="cca-modal-ua-box">
                      {selectedRecord.userAgent || 'None reported'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="cca-modal-footer">
              <button
                type="button"
                onClick={() => handleCopy(JSON.stringify(selectedRecord, null, 2), 'json')}
                className="cca-btn-copy-json"
              >
                {copiedKey === 'json' ? (
                  <>
                    <Check size={14} style={{ color: '#10b981' }} />
                    <span>JSON Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Audit Record (JSON)</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="cca-btn-modal-close"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
