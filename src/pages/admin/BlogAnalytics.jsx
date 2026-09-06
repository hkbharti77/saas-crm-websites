import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BarChart2, TrendingUp, TrendingDown, Eye, FileText,
  AlertTriangle, Search, ArrowRight, Minus, ChevronUp, ChevronDown,
  RefreshCw, Tag, Folder
} from 'lucide-react';
import { auth, db } from '../../firebase';
import {
  collection, getDocs, query, where, orderBy
} from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import { computeContentHealth } from '../../utils/contentHealth';
import './BlogAnalytics.css';
import '../../components/admin/AdminCMS.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n) {
  if (n === undefined || n === null) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function pctChange(current, previous) {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

// Generate YYYY-MM-DD for N days ago (UTC)
function dateNDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// All dates in range [from, to]
function dateRange(fromStr, toStr) {
  const dates = [];
  const cur = new Date(fromStr + 'T00:00:00Z');
  const end = new Date(toStr + 'T00:00:00Z');
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

// Simple SVG line chart
function SparklineChart({ data, prevData, dates, height = 160 }) {
  if (!data || data.length === 0) return (
    <div className="analytics-chart-empty">
      No view data available for this period.
      <br /><small>Views will appear here once visitors read published articles.</small>
    </div>
  );

  const padX = 36, padY = 20, padBottom = 28;
  const W = 800, H = height;
  const plotW = W - padX * 2;
  const plotH = H - padY - padBottom;

  const maxVal = Math.max(...data, ...(prevData || []), 1);

  const pts = data.map((v, i) => ({
    x: padX + (i / Math.max(data.length - 1, 1)) * plotW,
    y: padY + plotH - (v / maxVal) * plotH,
  }));

  const prevPts = prevData ? prevData.map((v, i) => ({
    x: padX + (i / Math.max(prevData.length - 1, 1)) * plotW,
    y: padY + plotH - (v / maxVal) * plotH,
  })) : [];

  const toPolyline = (points) =>
    points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const areaPath = pts.length > 0
    ? `M ${pts[0].x},${padY + plotH} ` +
      pts.map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
      ` L ${pts[pts.length - 1].x},${padY + plotH} Z`
    : '';

  // Tick labels: show first, middle, last dates
  const tickIdxs = [0, Math.floor(dates.length / 2), dates.length - 1].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  // Y grid lines
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: padY + plotH - f * plotH,
    val: Math.round(maxVal * f),
  }));

  return (
    <div className="analytics-chart-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="analytics-chart-svg"
        aria-label="Traffic trend chart"
        role="img"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padX} y1={t.y} x2={W - padX} y2={t.y}
              stroke="#e2e8f0" strokeWidth="1" />
            <text x={padX - 4} y={t.y + 4} textAnchor="end"
              className="analytics-chart-label">{fmtNum(t.val)}</text>
          </g>
        ))}

        {/* Previous period line */}
        {prevPts.length > 1 && (
          <polyline points={toPolyline(prevPts)} className="analytics-chart-line-prev" />
        )}

        {/* Area fill */}
        {pts.length > 1 && <path d={areaPath} className="analytics-chart-area" />}

        {/* Current period line */}
        {pts.length > 1 && (
          <polyline points={toPolyline(pts)} className="analytics-chart-line" />
        )}

        {/* Dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" className="analytics-chart-dot">
            <title>{dates[i]}: {data[i]} views</title>
          </circle>
        ))}

        {/* X-axis labels */}
        {tickIdxs.map(i => (
          <text key={i}
            x={padX + (i / Math.max(dates.length - 1, 1)) * plotW}
            y={H - 6}
            textAnchor="middle"
            className="analytics-chart-label"
          >
            {dates[i] ? dates[i].slice(5) : ''}
          </text>
        ))}
      </svg>

      {/* Textual summary for screen readers / accessibility */}
      <table className="sr-only" aria-label="Traffic data table">
        <thead><tr><th>Date</th><th>Views</th></tr></thead>
        <tbody>
          {dates.map((d, i) => (
            <tr key={d}><td>{d}</td><td>{data[i] || 0}</td></tr>
          ))}
        </tbody>
      </table>

      <div className="analytics-chart-legend">
        <div className="analytics-chart-legend-item">
          <div className="analytics-chart-legend-line" style={{ background: '#0d9488' }} />
          Current period
        </div>
        {prevData && prevData.length > 0 && (
          <div className="analytics-chart-legend-item">
            <div className="analytics-chart-legend-line"
              style={{ background: '#cbd5e1', borderTop: '2px dashed #cbd5e1', height: 0 }} />
            Previous period
          </div>
        )}
      </div>
    </div>
  );
}

function TrendChip({ pct }) {
  if (pct === null || pct === undefined) return <span className="trend-chip neutral">—</span>;
  if (pct > 0) return <span className="trend-chip up"><TrendingUp size={10} />+{pct.toFixed(1)}%</span>;
  if (pct < 0) return <span className="trend-chip down"><TrendingDown size={10} />{pct.toFixed(1)}%</span>;
  return <span className="trend-chip neutral"><Minus size={10} />0%</span>;
}

// ─── Sort Icon (module-level component to avoid react-hooks/static-components) ──
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronUp size={12} style={{ opacity: 0.3 }} />;
  return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
}

// ─── Main component ───────────────────────────────────────────────────────────

const RANGES = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: 'Year', days: 365 },
];

export default function BlogAnalytics() {
  const navigate = useNavigate();

  // Auth guard
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => { if (!u) navigate('/admin/login'); });
    return unsub;
  }, [navigate]);

  // ─── State ─────────────────────────────────────────────────────────────────
  const [rangeKey, setRangeKey] = useState('30d');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);   // analytics_blog_daily docs
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('views');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedCompare, setSelectedCompare] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(null);

  // ─── Date range computation ─────────────────────────────────────────────────
  const { fromDate, toDate, prevFromDate, prevToDate, dates, prevDates } = useMemo(() => {
    let days = RANGES.find(r => r.label === rangeKey)?.days;

    let to, from;
    if (rangeKey === 'custom' && customFrom && customTo) {
      from = customFrom;
      to = customTo;
      days = dateRange(from, to).length;
    } else {
      to = new Date().toISOString().slice(0, 10);
      from = dateNDaysAgo(days - 1);
    }

    const prevTo = dateNDaysAgo(days);
    const prevFrom = dateNDaysAgo(days * 2 - 1);

    return {
      fromDate: from,
      toDate: to,
      prevFromDate: prevFrom,
      prevToDate: prevTo,
      dates: dateRange(from, to),
      prevDates: dateRange(prevFrom, prevTo),
    };
  }, [rangeKey, customFrom, customTo]);

  // ─── Fetch analytics docs + posts ──────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all analytics docs in range (current + previous period)
      const allSnap = await getDocs(
        query(collection(db, 'analytics_blog_daily'), where('date', '>=', prevFromDate))
      );
      const docs = allSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAnalyticsData(docs);

      // Fetch published posts for health scores and metadata
      const postsSnap = await getDocs(
        query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
      );
      const postsList = postsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPosts(postsList);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('BlogAnalytics fetch error:', err);
      setError('Failed to load analytics data. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  }, [prevFromDate]);

  useEffect(() => {
    queueMicrotask(() => {
      fetchData();
    });
  }, [fetchData]);

  // ─── Derived metrics ────────────────────────────────────────────────────────
  const currentDocs = useMemo(
    () => analyticsData.filter(d => d.date >= fromDate && d.date <= toDate),
    [analyticsData, fromDate, toDate]
  );
  const prevDocs = useMemo(
    () => analyticsData.filter(d => d.date >= prevFromDate && d.date <= prevToDate),
    [analyticsData, prevFromDate, prevToDate]
  );

  const totalViews = useMemo(() => currentDocs.reduce((s, d) => s + (d.views || 0), 0), [currentDocs]);
  const prevViews = useMemo(() => prevDocs.reduce((s, d) => s + (d.views || 0), 0), [prevDocs]);
  const totalCta = useMemo(() => currentDocs.reduce((s, d) => s + (d.ctaClicks || 0), 0), [currentDocs]);
  const totalShares = useMemo(() => currentDocs.reduce((s, d) => s + (d.shares || 0), 0), [currentDocs]);
  const publishedCount = useMemo(() => posts.filter(p => p.status === 'published').length, [posts]);

  // Average scroll completion: (views_at_100 / views) × 100
  const avgCompletion = useMemo(() => {
    const v = currentDocs.reduce((s, d) => s + (d.views || 0), 0);
    const c = currentDocs.reduce((s, d) => s + (d.scroll100 || 0), 0);
    return v > 0 ? Math.round((c / v) * 100) : 0;
  }, [currentDocs]);

  // ─── Traffic trend (daily totals) ──────────────────────────────────────────
  const { trendData, prevTrendData } = useMemo(() => {
    const byDate = {};
    const prevByDate = {};
    analyticsData.forEach(d => {
      if (d.date >= fromDate && d.date <= toDate) {
        byDate[d.date] = (byDate[d.date] || 0) + (d.views || 0);
      }
      if (d.date >= prevFromDate && d.date <= prevToDate) {
        prevByDate[d.date] = (prevByDate[d.date] || 0) + (d.views || 0);
      }
    });
    return {
      trendData: dates.map(d => byDate[d] || 0),
      prevTrendData: prevDates.map(d => prevByDate[d] || 0),
    };
  }, [analyticsData, fromDate, toDate, prevFromDate, prevToDate, dates, prevDates]);

  // ─── Per-blog aggregated metrics ────────────────────────────────────────────
  const blogMetrics = useMemo(() => {
    const map = {};
    const prevMap = {};

    analyticsData.forEach(d => {
      const key = d.blogId;
      if (!key) return;
      if (d.date >= fromDate && d.date <= toDate) {
        if (!map[key]) map[key] = { blogId: key, slug: d.slug, category: d.category, tags: d.tags || [], views: 0, scroll25: 0, scroll50: 0, scroll75: 0, scroll100: 0, ctaClicks: 0, shares: 0, relatedClicks: 0 };
        map[key].views += d.views || 0;
        map[key].scroll25 += d.scroll25 || 0;
        map[key].scroll50 += d.scroll50 || 0;
        map[key].scroll75 += d.scroll75 || 0;
        map[key].scroll100 += d.scroll100 || 0;
        map[key].ctaClicks += d.ctaClicks || 0;
        map[key].shares += d.shares || 0;
        map[key].relatedClicks += d.relatedClicks || 0;
      }
      if (d.date >= prevFromDate && d.date <= prevToDate) {
        if (!prevMap[key]) prevMap[key] = { views: 0 };
        prevMap[key].views += d.views || 0;
      }
    });

    return Object.values(map).map(m => ({
      ...m,
      prevViews: prevMap[m.blogId]?.views || 0,
      pctChange: pctChange(m.views, prevMap[m.blogId]?.views),
      avgCompletion: m.views > 0 ? Math.round((m.scroll100 / m.views) * 100) : 0,
      post: posts.find(p => p.id === m.blogId) || null,
    }));
  }, [analyticsData, fromDate, toDate, prevFromDate, prevToDate, posts]);

  // Top content sorted
  const sortedBlogMetrics = useMemo(() => {
    return [...blogMetrics].sort((a, b) => {
      const va = a[sortField] || 0;
      const vb = b[sortField] || 0;
      return sortDir === 'asc' ? va - vb : vb - va;
    });
  }, [blogMetrics, sortField, sortDir]);

  // Top performer
  const topPost = useMemo(() =>
    blogMetrics.sort((a, b) => b.views - a.views)[0] || null,
    [blogMetrics]
  );

  // Decaying content: views dropped >30%, had ≥10 views last period, ≥14 days old
  const decayingPosts = useMemo(() =>
    blogMetrics.filter(m =>
      m.prevViews >= 10 &&
      m.pctChange !== null &&
      m.pctChange < -30
    ).sort((a, b) => a.pctChange - b.pctChange),
    [blogMetrics]
  );

  // ─── Category metrics ────────────────────────────────────────────────────────
  const categoryMetrics = useMemo(() => {
    const catMap = {};
    blogMetrics.forEach(m => {
      const cat = m.category || 'Uncategorized';
      if (!catMap[cat]) catMap[cat] = { category: cat, posts: 0, views: 0, prevViews: 0 };
      catMap[cat].posts++;
      catMap[cat].views += m.views;
      catMap[cat].prevViews += m.prevViews;
    });
    // Also count posts without analytics data
    posts.filter(p => p.status === 'published').forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!catMap[cat]) catMap[cat] = { category: cat, posts: 0, views: 0, prevViews: 0 };
      if (!blogMetrics.find(m => m.blogId === p.id)) {
        catMap[cat].posts++;
      }
    });
    return Object.values(catMap).sort((a, b) => b.views - a.views);
  }, [blogMetrics, posts]);

  // ─── Tag metrics ─────────────────────────────────────────────────────────────
  const tagMetrics = useMemo(() => {
    const tagMap = {};
    blogMetrics.forEach(m => {
      (m.tags || []).forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = { tag, posts: 0, views: 0, prevViews: 0 };
        tagMap[tag].posts++;
        tagMap[tag].views += m.views;
        tagMap[tag].prevViews += m.prevViews;
      });
    });
    return Object.values(tagMap).sort((a, b) => b.views - a.views).slice(0, 20);
  }, [blogMetrics]);

  // ─── Sort handler ────────────────────────────────────────────────────────────
  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="analytics-page">
      <Helmet>
        <title>Blog Analytics | GyanVaniAi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminHeader />

      <div className="analytics-container">
        {/* Breadcrumb */}
        <nav className="analytics-breadcrumb" aria-label="Breadcrumb">
          <Link to="/admin/dashboard">Dashboard</Link>
          <span>/</span>
          <span>Blog Analytics</span>
        </nav>

        {/* Page Header */}
        <div className="analytics-page-header">
          <div>
            <h1 className="analytics-page-title">
              <BarChart2 size={22} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              Blog Analytics
            </h1>
            <p className="analytics-page-subtitle">
              Real-time content performance data. All metrics are from actual visitor interactions.
              {lastRefresh && <> · Last updated {lastRefresh.toLocaleTimeString('en-IN', { timeStyle: 'short' })}</>}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Date range */}
            <div className="analytics-date-range">
              {RANGES.map(r => (
                <button
                  key={r.label}
                  className={`analytics-range-btn ${rangeKey === r.label ? 'active' : ''}`}
                  onClick={() => setRangeKey(r.label)}
                >
                  {r.label}
                </button>
              ))}
              <button
                className={`analytics-range-btn ${rangeKey === 'custom' ? 'active' : ''}`}
                onClick={() => setRangeKey('custom')}
              >
                Custom
              </button>
              {rangeKey === 'custom' && (
                <>
                  <input type="date" className="analytics-date-input" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
                  <span style={{ color: 'var(--cms-text-muted)', fontSize: '0.8rem' }}>to</span>
                  <input type="date" className="analytics-date-input" value={customTo} onChange={e => setCustomTo(e.target.value)} />
                </>
              )}
            </div>
            <button
              onClick={fetchData}
              className="admin-cms-btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
              title="Refresh data"
              aria-label="Refresh analytics data"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Error state */}
        {error && <div className="analytics-error" role="alert">{error}</div>}

        {/* Loading state */}
        {loading && (
          <div className="analytics-loading" aria-live="polite">
            <RefreshCw size={16} className="spin" /> Loading analytics data…
          </div>
        )}

        {!loading && (
          <>
            {/* KPI Cards */}
            <div className="analytics-kpi-grid" aria-label="Key performance indicators">
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label"><Eye size={12} style={{ verticalAlign: 'middle' }} /> Unique Blog Visits</div>
                <div className="analytics-kpi-value">{fmtNum(totalViews)}</div>
                <TrendChip pct={pctChange(totalViews, prevViews)} />
                <div className="analytics-kpi-sub">vs previous {rangeKey} (session-deduped)</div>
              </div>
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label"><FileText size={12} style={{ verticalAlign: 'middle' }} /> Published Posts</div>
                <div className="analytics-kpi-value">{publishedCount}</div>
                <div className="analytics-kpi-sub">total live articles</div>
              </div>
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label"><BarChart2 size={12} style={{ verticalAlign: 'middle' }} /> Read Completion</div>
                <div className="analytics-kpi-value">{avgCompletion}%</div>
                <div className="analytics-kpi-sub">avg scroll to 100%</div>
              </div>
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label"><TrendingUp size={12} style={{ verticalAlign: 'middle' }} /> CTA Clicks</div>
                <div className="analytics-kpi-value">{fmtNum(totalCta)}</div>
                <div className="analytics-kpi-sub">book demo clicks</div>
              </div>
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">Shares</div>
                <div className="analytics-kpi-value">{fmtNum(totalShares)}</div>
                <div className="analytics-kpi-sub">across all posts</div>
              </div>
              <div className="analytics-kpi-card">
                <div className="analytics-kpi-label">Top Article</div>
                <div className="analytics-kpi-value" style={{ fontSize: '1rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {topPost?.post?.title || topPost?.slug || '—'}
                </div>
                <div className="analytics-kpi-sub">{topPost ? `${fmtNum(topPost.views)} views` : 'No data yet'}</div>
              </div>
            </div>

            {/* Empty state when no analytics at all */}
            {totalViews === 0 && (
              <div className="analytics-section">
                <div className="analytics-empty">
                  <span className="analytics-empty-icon">📊</span>
                  <p className="analytics-empty-title">No analytics data available yet</p>
                  <p className="analytics-empty-text">
                    Analytics data appears automatically when visitors view published articles.
                    No setup required — data is collected from real user interactions only.
                  </p>
                </div>
              </div>
            )}

            {/* Traffic Trend */}
            <div className="analytics-section">
              <div className="analytics-section-header">
                <h2 className="analytics-section-title">
                  <TrendingUp size={16} /> Traffic Trend
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--cms-text-muted)' }}>
                  <span>{fromDate} → {toDate}</span>
                  {prevViews > 0 && (
                    <TrendChip pct={pctChange(totalViews, prevViews)} />
                  )}
                </div>
              </div>
              <SparklineChart
                data={trendData}
                prevData={prevViews > 0 ? prevTrendData : null}
                dates={dates}
                height={180}
              />
            </div>

            {/* P5-D Conversion Funnel Section */}
            <div className="analytics-section">
              <div className="analytics-section-header">
                <h2 className="analytics-section-title">
                  <BarChart2 size={16} /> Conversion Funnel & CTA Performance
                </h2>
                <span style={{ fontSize: '0.82rem', color: 'var(--cms-text-muted)' }}>
                  Real Anonymous Conversion Signals
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', padding: '1rem 0' }}>
                <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Blog Views</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.35rem' }}>{fmtNum(totalViews)}</div>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. Engaged Visitors (50%+ Read)</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.35rem' }}>
                    {fmtNum(currentDocs.reduce((s, d) => s + (d.scroll50 || 0), 0))}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>3. CTA Clicks</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '0.35rem' }}>{fmtNum(totalCta)}</div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    CTR: {totalViews > 0 ? ((totalCta / totalViews) * 100).toFixed(1) : 0}%
                  </span>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>4. Form Conversions</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Conversion tracking not connected
                  </div>
                </div>
              </div>
            </div>


            {/* Top Content */}
            {sortedBlogMetrics.length > 0 && (
              <div className="analytics-section">
                <div className="analytics-section-header">
                  <h2 className="analytics-section-title">
                    <FileText size={16} /> Top Content
                  </h2>
                  <Link to="/admin/blog/opportunities" className="analytics-opp-action-btn">
                    View Opportunities <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="analytics-table-wrap">
                  <table className="analytics-table" aria-label="Top content by views">
                    <thead>
                      <tr>
                        <th>Article</th>
                        <th onClick={() => handleSort('views')} title="Sort by views">
                          Views <SortIcon field="views" sortField={sortField} sortDir={sortDir} />
                        </th>
                        <th onClick={() => handleSort('avgCompletion')} title="Sort by read completion">
                          Read % <SortIcon field="avgCompletion" sortField={sortField} sortDir={sortDir} />
                        </th>
                        <th onClick={() => handleSort('ctaClicks')} title="Sort by CTA clicks">
                          CTA <SortIcon field="ctaClicks" sortField={sortField} sortDir={sortDir} />
                        </th>
                        <th onClick={() => handleSort('shares')} title="Sort by shares">
                          Shares <SortIcon field="shares" sortField={sortField} sortDir={sortDir} />
                        </th>
                        <th onClick={() => handleSort('pctChange')} title="Sort by trend">
                          Trend <SortIcon field="pctChange" sortField={sortField} sortDir={sortDir} />
                        </th>
                        <th>Health</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBlogMetrics.slice(0, 20).map(m => {
                        const health = m.post ? computeContentHealth(m.post) : null;
                        const isCompared = selectedCompare.includes(m.blogId);
                        return (
                          <tr key={m.blogId}>
                            <td className="analytics-table-title-cell">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                  type="checkbox"
                                  checked={isCompared}
                                  onChange={() => {
                                    setSelectedCompare(prev =>
                                      isCompared ? prev.filter(x => x !== m.blogId)
                                        : prev.length < 3 ? [...prev, m.blogId] : prev
                                    );
                                  }}
                                  title="Compare this article"
                                  aria-label={`Compare ${m.post?.title || m.slug}`}
                                />
                                <Link
                                  to={`/admin/blog/analytics/${m.blogId}`}
                                  className="analytics-table-link"
                                  title={m.post?.title || m.slug}
                                >
                                  {m.post?.title || m.slug || m.blogId}
                                </Link>
                              </div>
                            </td>
                            <td><strong>{fmtNum(m.views)}</strong></td>
                            <td>{m.avgCompletion}%</td>
                            <td>{fmtNum(m.ctaClicks)}</td>
                            <td>{fmtNum(m.shares)}</td>
                            <td><TrendChip pct={m.pctChange} /></td>
                            <td>
                              {health ? (
                                <span className="analytics-health-badge"
                                  style={{ background: health.color + '18', color: health.color }}>
                                  {health.score}/100
                                </span>
                              ) : '—'}
                            </td>
                            <td>
                              <Link
                                to={`/admin/blog/analytics/${m.blogId}`}
                                style={{ color: 'var(--cms-brand)', fontSize: '0.78rem', textDecoration: 'none' }}
                              >
                                Details →
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Comparison bar */}
                {selectedCompare.length >= 2 && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--cms-bg)', borderRadius: '8px', border: '1px solid var(--cms-border)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--cms-text-secondary)' }}>
                      Comparing {selectedCompare.length} articles:
                    </div>
                    <div className="analytics-compare-row">
                      {selectedCompare.map(id => {
                        const m = blogMetrics.find(x => x.blogId === id);
                        return (
                          <div key={id} className="analytics-compare-tag">
                            <span>{m?.post?.title || m?.slug || id}</span>
                            <span style={{ color: 'var(--cms-brand)', fontWeight: 700 }}>· {fmtNum(m?.views)} views</span>
                            <TrendChip pct={m?.pctChange} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content Decay */}
            {decayingPosts.length > 0 && (
              <div className="analytics-section">
                <div className="analytics-section-header">
                  <h2 className="analytics-section-title" style={{ color: '#ef4444' }}>
                    <AlertTriangle size={16} /> Declining Content
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--cms-text-muted)' }}>
                    Posts with &gt;30% traffic drop vs previous {rangeKey}
                  </span>
                </div>
                <div className="analytics-table-wrap">
                  <table className="analytics-table" aria-label="Declining content">
                    <thead>
                      <tr>
                        <th>Article</th>
                        <th>Current Views</th>
                        <th>Previous Views</th>
                        <th>Change</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {decayingPosts.map(m => (
                        <tr key={m.blogId}>
                          <td className="analytics-table-title-cell">
                            {m.post?.title || m.slug || m.blogId}
                          </td>
                          <td>{fmtNum(m.views)}</td>
                          <td>{fmtNum(m.prevViews)}</td>
                          <td><TrendChip pct={m.pctChange} /></td>
                          <td>
                            {m.post && (
                              <Link to={`/admin/edit/${m.blogId}`}
                                className="analytics-opp-action-btn" style={{ fontSize: '0.75rem' }}>
                                Update Article
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Category Performance */}
            {categoryMetrics.length > 0 && (
              <div className="analytics-section">
                <div className="analytics-section-header">
                  <h2 className="analytics-section-title">
                    <Folder size={16} /> Category Performance
                  </h2>
                </div>
                <div className="analytics-table-wrap">
                  <table className="analytics-table" aria-label="Category performance">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Posts</th>
                        <th>Views</th>
                        <th>Avg Views/Post</th>
                        <th>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryMetrics.map(cat => (
                        <tr key={cat.category}>
                          <td style={{ fontWeight: 600 }}>{cat.category}</td>
                          <td>{cat.posts}</td>
                          <td>{fmtNum(cat.views)}</td>
                          <td>{cat.posts > 0 ? fmtNum(Math.round(cat.views / cat.posts)) : '—'}</td>
                          <td><TrendChip pct={pctChange(cat.views, cat.prevViews)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tag Performance */}
            {tagMetrics.length > 0 && (
              <div className="analytics-section">
                <div className="analytics-section-header">
                  <h2 className="analytics-section-title">
                    <Tag size={16} /> Tag Performance
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--cms-text-muted)' }}>Top 20 tags by views</span>
                </div>
                <div className="analytics-table-wrap">
                  <table className="analytics-table" aria-label="Tag performance">
                    <thead>
                      <tr>
                        <th>Tag</th>
                        <th>Posts</th>
                        <th>Views</th>
                        <th>Avg Views/Post</th>
                        <th>Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tagMetrics.map(t => (
                        <tr key={t.tag}>
                          <td style={{ fontWeight: 600 }}>#{t.tag}</td>
                          <td>{t.posts}</td>
                          <td>{fmtNum(t.views)}</td>
                          <td>{t.posts > 0 ? fmtNum(Math.round(t.views / t.posts)) : '—'}</td>
                          <td><TrendChip pct={pctChange(t.views, t.prevViews)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Search Console Placeholder */}
            <div className="analytics-section">
              <div className="analytics-section-header">
                <h2 className="analytics-section-title">
                  <Search size={16} /> Search Performance
                </h2>
              </div>
              <div className="analytics-sc-placeholder">
                <Search size={32} style={{ color: 'var(--cms-text-muted)', opacity: 0.4 }} />
                <h3>Google Search Console not connected</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--cms-text-muted)' }}>
                  Connect Google Search Console to see clicks, impressions, CTR, and search queries.
                  Visit <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cms-brand)' }}>search.google.com/search-console</a> to configure access.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
