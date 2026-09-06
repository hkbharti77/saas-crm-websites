import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BarChart2, TrendingUp, TrendingDown, Eye, ExternalLink,
  Edit3, Minus, RefreshCw, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { auth, db } from '../../firebase';
import {
  collection, getDocs, query, where, getDoc, doc
} from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import { computeContentHealth } from '../../utils/contentHealth';
import './BlogAnalytics.css';
import '../../components/admin/AdminCMS.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtNum(n) {
  if (n === undefined || n === null) return '—';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function pctChange(current, previous) {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function dateNDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

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

function TrendChip({ pct }) {
  if (pct === null || pct === undefined) return <span className="trend-chip neutral">—</span>;
  if (pct > 0) return <span className="trend-chip up"><TrendingUp size={10} />+{pct.toFixed(1)}%</span>;
  if (pct < 0) return <span className="trend-chip down"><TrendingDown size={10} />{pct.toFixed(1)}%</span>;
  return <span className="trend-chip neutral"><Minus size={10} />0%</span>;
}

// Mini sparkline
function MiniSparkline({ data, dates }) {
  if (!data || data.length < 2) return <span style={{ color: 'var(--cms-text-muted)', fontSize: '0.8rem' }}>Insufficient data</span>;

  const W = 300, H = 60;
  const padX = 4, padY = 6;
  const plotW = W - padX * 2;
  const plotH = H - padY * 2;
  const maxVal = Math.max(...data, 1);

  const pts = data.map((v, i) => ({
    x: padX + (i / Math.max(data.length - 1, 1)) * plotW,
    y: padY + plotH - (v / maxVal) * plotH,
  }));
  const polyline = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: '300px', height: '60px' }} aria-hidden="true">
      <polyline points={polyline} fill="none" stroke="var(--cms-brand,#0d9488)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--cms-brand,#0d9488)">
          <title>{dates[i]}: {data[i]} views</title>
        </circle>
      ))}
    </svg>
  );
}

const RANGES = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

export default function ArticleAnalytics() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => { if (!u) navigate('/admin/login'); });
    return unsub;
  }, [navigate]);

  const [post, setPost] = useState(null);
  const [analyticsDocs, setAnalyticsDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rangeKey, setRangeKey] = useState('30d');

  const { fromDate, toDate, prevFromDate, prevToDate, dates } = useMemo(() => {
    const r = RANGES.find(r => r.label === rangeKey);
    const days = r?.days || 30;
    const to = new Date().toISOString().slice(0, 10);
    const from = dateNDaysAgo(days - 1);
    const prevTo = dateNDaysAgo(days);
    const prevFrom = dateNDaysAgo(days * 2 - 1);
    return { fromDate: from, toDate: to, prevFromDate: prevFrom, prevToDate: prevTo, dates: dateRange(from, to) };
  }, [rangeKey]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Load post
        const postDoc = await getDoc(doc(db, 'blogs', blogId));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });
        }

        // Load analytics docs for this blog (both periods)
        const snap = await getDocs(
          query(
            collection(db, 'analytics_blog_daily'),
            where('blogId', '==', blogId),
            where('date', '>=', prevFromDate)
          )
        );
        setAnalyticsDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError('Failed to load analytics: ' + (err.message || ''));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [blogId, prevFromDate]);

  const currentDocs = useMemo(
    () => analyticsDocs.filter(d => d.date >= fromDate && d.date <= toDate),
    [analyticsDocs, fromDate, toDate]
  );
  const prevDocs = useMemo(
    () => analyticsDocs.filter(d => d.date >= prevFromDate && d.date <= prevToDate),
    [analyticsDocs, prevFromDate, prevToDate]
  );

  const totals = useMemo(() => ({
    views: currentDocs.reduce((s, d) => s + (d.views || 0), 0),
    scroll25: currentDocs.reduce((s, d) => s + (d.scroll25 || 0), 0),
    scroll50: currentDocs.reduce((s, d) => s + (d.scroll50 || 0), 0),
    scroll75: currentDocs.reduce((s, d) => s + (d.scroll75 || 0), 0),
    scroll100: currentDocs.reduce((s, d) => s + (d.scroll100 || 0), 0),
    ctaClicks: currentDocs.reduce((s, d) => s + (d.ctaClicks || 0), 0),
    shares: currentDocs.reduce((s, d) => s + (d.shares || 0), 0),
    relatedClicks: currentDocs.reduce((s, d) => s + (d.relatedClicks || 0), 0),
  }), [currentDocs]);

  const prevViews = useMemo(() => prevDocs.reduce((s, d) => s + (d.views || 0), 0), [prevDocs]);

  const trendData = useMemo(() => {
    const byDate = {};
    currentDocs.forEach(d => { byDate[d.date] = (byDate[d.date] || 0) + (d.views || 0); });
    return dates.map(d => byDate[d] || 0);
  }, [currentDocs, dates]);

  const health = useMemo(() => post ? computeContentHealth(post) : null, [post]);

  if (loading) return (
    <div className="analytics-page">
      <AdminHeader />
      <div className="analytics-loading"><RefreshCw size={16} /> Loading article analytics…</div>
    </div>
  );

  return (
    <div className="analytics-page">
      <Helmet>
        <title>{post?.title ? `Analytics: ${post.title}` : 'Article Analytics'} | GyanVaniAi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminHeader />

      <div className="analytics-container">
        {/* Breadcrumb */}
        <nav className="analytics-breadcrumb" aria-label="Breadcrumb">
          <Link to="/admin/dashboard">Dashboard</Link>
          <span>/</span>
          <Link to="/admin/blog/analytics">Analytics</Link>
          <span>/</span>
          <span>{post?.title || blogId}</span>
        </nav>

        {/* Header */}
        <div className="analytics-page-header">
          <div>
            <h1 className="analytics-page-title" style={{ fontSize: '1.35rem' }}>
              {post?.title || blogId}
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.35rem' }}>
              {post?.category && (
                <span style={{ fontSize: '0.8rem', color: 'var(--cms-text-muted)' }}>
                  📁 {post.category}
                </span>
              )}
              {post?.readTime && (
                <span style={{ fontSize: '0.8rem', color: 'var(--cms-text-muted)' }}>
                  ⏱ {post.readTime}
                </span>
              )}
              {post?.status && (
                <span style={{
                  fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem',
                  borderRadius: '4px', textTransform: 'uppercase',
                  background: post.status === 'published' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                  color: post.status === 'published' ? '#10b981' : '#f59e0b',
                }}>
                  {post.status}
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {post?.slugId && (
              <a href={`/blog/${post.slugId}`} target="_blank" rel="noopener noreferrer"
                className="analytics-opp-action-btn">
                <ExternalLink size={13} /> View Live
              </a>
            )}
            <Link to={`/admin/edit/${blogId}`} className="analytics-opp-action-btn">
              <Edit3 size={13} /> Edit Article
            </Link>
          </div>
        </div>

        {error && <div className="analytics-error" role="alert">{error}</div>}

        {/* Date range */}
        <div className="analytics-date-range" style={{ marginBottom: '1.5rem' }}>
          {RANGES.map(r => (
            <button key={r.label}
              className={`analytics-range-btn ${rangeKey === r.label ? 'active' : ''}`}
              onClick={() => setRangeKey(r.label)}>{r.label}</button>
          ))}
        </div>

        {/* KPIs */}
        <div className="analytics-kpi-grid">
          <div className="analytics-kpi-card">
            <div className="analytics-kpi-label"><Eye size={12} style={{ verticalAlign: 'middle' }} /> Unique Visits</div>
            <div className="analytics-kpi-value">{fmtNum(totals.views)}</div>
            <TrendChip pct={pctChange(totals.views, prevViews)} />
            <div className="analytics-kpi-sub">session-deduped</div>
          </div>
          <div className="analytics-kpi-card">
            <div className="analytics-kpi-label">Read Completion</div>
            <div className="analytics-kpi-value">
              {totals.views > 0 ? Math.round((totals.scroll100 / totals.views) * 100) : 0}%
            </div>
            <div className="analytics-kpi-sub">readers who finished</div>
          </div>
          <div className="analytics-kpi-card">
            <div className="analytics-kpi-label">CTA Clicks</div>
            <div className="analytics-kpi-value">{fmtNum(totals.ctaClicks)}</div>
            <div className="analytics-kpi-sub">book demo clicks</div>
          </div>
          <div className="analytics-kpi-card">
            <div className="analytics-kpi-label">Shares</div>
            <div className="analytics-kpi-value">{fmtNum(totals.shares)}</div>
          </div>
          <div className="analytics-kpi-card">
            <div className="analytics-kpi-label">Related Clicks</div>
            <div className="analytics-kpi-value">{fmtNum(totals.relatedClicks)}</div>
            <div className="analytics-kpi-sub">to other articles</div>
          </div>
        </div>

        {totals.views === 0 && (
          <div className="analytics-section">
            <div className="analytics-empty">
              <span className="analytics-empty-icon">📈</span>
              <p className="analytics-empty-title">No data for this period</p>
              <p className="analytics-empty-text">
                Analytics data appears when visitors view this article. No data has been recorded for the selected date range.
              </p>
            </div>
          </div>
        )}

        {/* Traffic Trend */}
        {totals.views > 0 && (
          <div className="analytics-section">
            <div className="analytics-section-header">
              <h2 className="analytics-section-title"><TrendingUp size={16} /> Traffic Trend</h2>
              <span style={{ fontSize: '0.82rem', color: 'var(--cms-text-muted)' }}>{fromDate} → {toDate}</span>
            </div>
            <MiniSparkline data={trendData} dates={dates} />
          </div>
        )}

        {/* Engagement Funnel */}
        {totals.views > 0 && (
          <div className="analytics-section">
            <div className="analytics-section-header">
              <h2 className="analytics-section-title"><BarChart2 size={16} /> Engagement Funnel</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--cms-text-muted)' }}>
                How far readers scroll through this article
              </span>
            </div>

            <div className="analytics-funnel" aria-label="Reading engagement funnel">
              {[
                { label: 'Page View', count: totals.views, key: 'views' },
                { label: '25% Scroll', count: totals.scroll25, key: 'scroll25' },
                { label: '50% Scroll', count: totals.scroll50, key: 'scroll50' },
                { label: '75% Scroll', count: totals.scroll75, key: 'scroll75' },
                { label: '100% Read', count: totals.scroll100, key: 'scroll100' },
              ].map(step => {
                const pct = totals.views > 0 ? Math.round((step.count / totals.views) * 100) : 0;
                return (
                  <div key={step.key} className="analytics-funnel-step">
                    <span className="analytics-funnel-label">{step.label}</span>
                    <div className="analytics-funnel-bar-wrap" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100" aria-label={`${step.label}: ${pct}%`}>
                      <div className="analytics-funnel-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="analytics-funnel-count">{fmtNum(step.count)} ({pct}%)</span>
                  </div>
                );
              })}
            </div>

            {/* Accessible table equivalent */}
            <table style={{ marginTop: '1rem', width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}
              aria-label="Engagement funnel data table">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--cms-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--cms-text-muted)' }}>Stage</th>
                  <th style={{ textAlign: 'right', padding: '0.4rem 0.5rem', color: 'var(--cms-text-muted)' }}>Count</th>
                  <th style={{ textAlign: 'right', padding: '0.4rem 0.5rem', color: 'var(--cms-text-muted)' }}>% of Views</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Page View', count: totals.views },
                  { label: '25% Scroll', count: totals.scroll25 },
                  { label: '50% Scroll', count: totals.scroll50 },
                  { label: '75% Scroll', count: totals.scroll75 },
                  { label: '100% Read', count: totals.scroll100 },
                ].map(s => (
                  <tr key={s.label} style={{ borderBottom: '1px solid var(--cms-border-subtle)' }}>
                    <td style={{ padding: '0.4rem 0.5rem' }}>{s.label}</td>
                    <td style={{ textAlign: 'right', padding: '0.4rem 0.5rem', fontWeight: 600 }}>{s.count}</td>
                    <td style={{ textAlign: 'right', padding: '0.4rem 0.5rem' }}>
                      {totals.views > 0 ? Math.round((s.count / totals.views) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Content Health */}
        {health && (
          <div className="analytics-section">
            <div className="analytics-section-header">
              <h2 className="analytics-section-title">
                Content Health Score
              </h2>
              <span className="analytics-health-badge"
                style={{ background: health.color + '22', color: health.color, fontSize: '1rem', fontWeight: 800, padding: '0.3rem 0.8rem' }}>
                {health.score}/100 — {health.label}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--cms-text-muted)', marginBottom: '1rem' }}>
              This is a deterministic score based on measurable content signals. It is NOT a Google ranking score.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {health.checks.map(check => (
                <div key={check.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem' }}>
                  {check.pass
                    ? <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '1px' }} />
                    : <AlertTriangle size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '1px' }} />
                  }
                  <div>
                    <span style={{ fontWeight: 600 }}>{check.label}</span>
                    {!check.pass && check.tip && (
                      <span style={{ color: 'var(--cms-text-muted)', marginLeft: '0.4rem' }}>— {check.tip}</span>
                    )}
                    <span style={{ marginLeft: '0.4rem', color: 'var(--cms-text-muted)', fontSize: '0.75rem' }}>
                      (+{check.earned}/{check.points} pts)
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {health.checks.some(c => !c.pass) && (
              <div style={{ marginTop: '1rem' }}>
                <Link to={`/admin/edit/${blogId}`} className="analytics-opp-action-btn">
                  <Edit3 size={13} /> Fix in Editor
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
