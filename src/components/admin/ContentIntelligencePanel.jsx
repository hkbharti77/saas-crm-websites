/**
 * ContentIntelligencePanel.jsx
 * Compact analytics intelligence summary for AdminDashboard.
 * Shows top performer, fastest growing, declining, health score, SEO opportunity count.
 * All data from Firestore analytics_blog_daily + post data.
 * Shows "Not enough data yet" gracefully when no analytics data exists.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ArrowRight
} from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { computeContentHealth, countSeoOpportunities } from '../../utils/contentHealth';
import '../../pages/admin/BlogAnalytics.css';

function dateNDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function pctChange(cur, prev) {
  if (!prev || prev === 0) return null;
  return ((cur - prev) / prev) * 100;
}

function fmtNum(n) {
  if (!n) return '0';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

/**
 * @param {Object[]} posts - All blog posts from Firestore
 */
export default function ContentIntelligencePanel({ posts = [] }) {
  const [analyticsDocs, setAnalyticsDocs] = useState([]);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const sixtyDaysAgo = dateNDaysAgo(59);
        const snap = await getDocs(
          query(
            collection(db, 'analytics_blog_daily'),
            where('date', '>=', sixtyDaysAgo)
          )
        );
        setAnalyticsDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        // Fail silently — analytics must not break dashboard
        console.debug('[IntelPanel] analytics load failed', err);
      } finally {
        setAnalyticsLoaded(true);
      }
    }
    loadAnalytics();
  }, []);

  const intelligence = useMemo(() => {
    if (!analyticsLoaded) return null;

    const thirtyAgo = dateNDaysAgo(29);

    // Aggregate views per blogId for current and previous 30d
    const cur = {};
    const prev = {};
    analyticsDocs.forEach(d => {
      if (!d.blogId) return;
      if (d.date >= thirtyAgo) cur[d.blogId] = (cur[d.blogId] || 0) + (d.views || 0);
      else prev[d.blogId] = (prev[d.blogId] || 0) + (d.views || 0);
    });

    const totalViews = Object.values(cur).reduce((s, v) => s + v, 0);
    const hasData = totalViews > 0;

    // Top performer
    const topEntry = Object.entries(cur).sort((a, b) => b[1] - a[1])[0];
    const topPost = topEntry ? posts.find(p => p.id === topEntry[0]) : null;
    const topViews = topEntry?.[1] || 0;

    // Fastest growing (biggest positive pct change, min 5 prev views)
    let fastestPost = null, fastestPct = null;
    Object.entries(cur).forEach(([id, views]) => {
      const pv = prev[id] || 0;
      if (pv < 5) return;
      const pct = pctChange(views, pv);
      if (pct !== null && (fastestPct === null || pct > fastestPct)) {
        fastestPct = pct;
        fastestPost = posts.find(p => p.id === id) || null;
      }
    });

    // Declining (biggest negative pct change, min 10 prev views)
    let decliningPost = null, decliningPct = null;
    Object.entries(cur).forEach(([id, views]) => {
      const pv = prev[id] || 0;
      if (pv < 10) return;
      const pct = pctChange(views, pv);
      if (pct !== null && pct < -30 && (decliningPct === null || pct < decliningPct)) {
        decliningPct = pct;
        decliningPost = posts.find(p => p.id === id) || null;
      }
    });

    // Lowest health score (published only)
    const publishedPosts = posts.filter(p => p.status === 'published');
    const healthSorted = publishedPosts
      .map(p => ({ post: p, score: computeContentHealth(p).score }))
      .sort((a, b) => a.score - b.score);
    const worstHealth = healthSorted[0] || null;

    // Best category by views
    const catViews = {};
    Object.entries(cur).forEach(([id, views]) => {
      const post = posts.find(p => p.id === id);
      const cat = post?.category || null;
      if (cat) catViews[cat] = (catViews[cat] || 0) + views;
    });
    const bestCat = Object.entries(catViews).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    // SEO opportunity count
    const seoOpps = countSeoOpportunities(posts);

    return {
      hasData,
      topPost,
      topViews,
      fastestPost,
      fastestPct,
      decliningPost,
      decliningPct,
      worstHealth,
      bestCat,
      seoOpps,
    };
  }, [analyticsDocs, analyticsLoaded, posts]);

  if (!analyticsLoaded) return null; // Don't render until loaded (avoid flicker)

  const noData = !intelligence?.hasData;

  return (
    <div className="intel-panel">
      <div className="intel-panel-header">
        <h2 className="intel-panel-title">
          <BarChart2 size={15} /> Content Intelligence
        </h2>
        <Link
          to="/admin/blog/analytics"
          style={{ fontSize: '0.78rem', color: 'var(--cms-brand)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          Full Analytics <ArrowRight size={12} />
        </Link>
      </div>

      {noData ? (
        <p style={{ fontSize: '0.82rem', color: 'var(--cms-text-muted)', margin: 0 }}>
          Not enough data yet. Analytics data appears automatically when visitors view published articles.
        </p>
      ) : (
        <div className="intel-panel-grid">
          {/* Top Performer */}
          <div className="intel-panel-item">
            <span className="intel-item-label"><TrendingUp size={10} style={{ verticalAlign: 'middle' }} /> Top Performer (30d)</span>
            <span className="intel-item-value">
              {intelligence.topPost
                ? <Link to={`/admin/blog/analytics/${intelligence.topPost.id}`}>{intelligence.topPost.title}</Link>
                : '—'}
            </span>
            <span className="intel-item-meta growing">{fmtNum(intelligence.topViews)} views</span>
          </div>

          {/* Fastest Growing */}
          <div className="intel-panel-item">
            <span className="intel-item-label">Fastest Growing</span>
            <span className="intel-item-value">
              {intelligence.fastestPost
                ? <Link to={`/admin/blog/analytics/${intelligence.fastestPost.id}`}>{intelligence.fastestPost.title}</Link>
                : 'Insufficient data'}
            </span>
            {intelligence.fastestPct !== null && (
              <span className="intel-item-meta growing">+{intelligence.fastestPct.toFixed(1)}% vs prev 30d</span>
            )}
          </div>

          {/* Declining */}
          <div className="intel-panel-item">
            <span className="intel-item-label"><TrendingDown size={10} style={{ verticalAlign: 'middle' }} /> Declining</span>
            <span className="intel-item-value">
              {intelligence.decliningPost
                ? <Link to={`/admin/blog/analytics/${intelligence.decliningPost.id}`}>{intelligence.decliningPost.title}</Link>
                : 'None detected'}
            </span>
            {intelligence.decliningPct !== null && (
              <span className="intel-item-meta declining">{intelligence.decliningPct.toFixed(1)}% vs prev 30d</span>
            )}
          </div>

          {/* Health needing attention */}
          <div className="intel-panel-item">
            <span className="intel-item-label"><AlertTriangle size={10} style={{ verticalAlign: 'middle' }} /> Health Attention</span>
            <span className="intel-item-value">
              {intelligence.worstHealth
                ? <Link to={`/admin/blog/analytics/${intelligence.worstHealth.post.id}`}>{intelligence.worstHealth.post.title}</Link>
                : '—'}
            </span>
            {intelligence.worstHealth && (
              <span className="intel-item-meta declining">Score: {intelligence.worstHealth.score}/100</span>
            )}
          </div>

          {/* Best Category */}
          <div className="intel-panel-item">
            <span className="intel-item-label">Best Category (30d)</span>
            <span className="intel-item-value">{intelligence.bestCat || '—'}</span>
          </div>

          {/* SEO Opportunities */}
          <div className="intel-panel-item">
            <span className="intel-item-label"><Lightbulb size={10} style={{ verticalAlign: 'middle' }} /> SEO Opportunities</span>
            <span className="intel-item-value">
              <Link to="/admin/blog/opportunities">
                {intelligence.seoOpps.total} issue{intelligence.seoOpps.total !== 1 ? 's' : ''}
              </Link>
            </span>
            <span className="intel-item-meta">
              {intelligence.seoOpps.missingTitle > 0 && `${intelligence.seoOpps.missingTitle} missing title · `}
              {intelligence.seoOpps.missingDesc > 0 && `${intelligence.seoOpps.missingDesc} missing desc`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
