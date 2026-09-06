import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import { getSearchConsoleMetrics } from '../../utils/searchConsoleService';
import { generateSeoOpportunities } from '../../utils/seoGrowthEngine';
import './SeoDashboard.css';
import './BlogAnalytics.css';

export default function SeoDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [gscMetrics, setGscMetrics] = useState(null);
  const [dateRange, setDateRange] = useState('28d');
  const [, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setBlogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }

        const metrics = await getSearchConsoleMetrics(dateRange);
        setGscMetrics(metrics);
      } catch (err) {
        console.error('Error loading SEO dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dateRange]);

  const publishedBlogs = useMemo(() => {
    return blogs.filter(b => b.status === 'published');
  }, [blogs]);

  const seoReport = useMemo(() => {
    return generateSeoOpportunities(publishedBlogs, gscMetrics);
  }, [publishedBlogs, gscMetrics]);

  const gscStatus = seoReport.gscStatus;

  return (
    <>
      <Helmet>
        <title>SEO Performance Dashboard | Gyan VaniAi Admin</title>
      </Helmet>

      <div className="admin-page-container">
        <AdminHeader title="SEO Growth & Search Console Dashboard" />

        <div className="admin-content-wrap container" style={{ padding: '2rem 1.5rem 4rem' }}>
          {/* Header Bar */}
          <div className="seo-dash-header">
            <div>
              <h1 className="dash-title">SEO Growth Engine</h1>
              <p className="dash-sub">Monitor search console performance, CTR opportunities, and topic cannibalization.</p>
            </div>

            {/* Date Range Selector */}
            <div className="date-range-selector">
              {['7d', '28d', '90d'].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`range-btn ${dateRange === r ? 'active' : ''}`}
                  onClick={() => setDateRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Search Console Connection Status Banner */}
          <div className={`gsc-status-banner ${gscStatus.connected ? 'status-connected' : 'status-disconnected'}`}>
            <div className="status-banner-content">
              {gscStatus.connected ? (
                <CheckCircle2 size={20} className="status-icon-success" />
              ) : (
                <AlertCircle size={20} className="status-icon-warn" />
              )}
              <div>
                <strong className="status-title">{gscStatus.message}</strong>
                <p className="status-desc">
                  {gscStatus.connected
                    ? `Connected property: ${gscStatus.property}`
                    : 'Search Console property is not connected. Real search performance metrics will display once connected.'}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards (Real Analytics / GSC Data) */}
          <div className="seo-metrics-grid">
            <div className="seo-metric-card">
              <span className="metric-label">Organic Clicks</span>
              <div className="metric-value">
                {gscStatus.connected ? (gscMetrics?.totals?.clicks || 0) : 'Not connected'}
              </div>
              <span className="metric-sub">Search Console ({dateRange})</span>
            </div>

            <div className="seo-metric-card">
              <span className="metric-label">Impressions</span>
              <div className="metric-value">
                {gscStatus.connected ? (gscMetrics?.totals?.impressions || 0) : 'Not connected'}
              </div>
              <span className="metric-sub">Search Console ({dateRange})</span>
            </div>

            <div className="seo-metric-card">
              <span className="metric-label">Average CTR</span>
              <div className="metric-value">
                {gscStatus.connected ? `${((gscMetrics?.totals?.ctr || 0) * 100).toFixed(1)}%` : 'Not connected'}
              </div>
              <span className="metric-sub">Search Console ({dateRange})</span>
            </div>

            <div className="seo-metric-card">
              <span className="metric-label">Average Position</span>
              <div className="metric-value">
                {gscStatus.connected ? (gscMetrics?.totals?.position || 0).toFixed(1) : 'Not connected'}
              </div>
              <span className="metric-sub">Search Console ({dateRange})</span>
            </div>
          </div>

          {/* Content Cannibalization & Topic Overlap */}
          <section className="seo-section-card">
            <div className="section-title-wrap">
              <Layers size={18} className="section-title-icon" />
              <h2>Content Cannibalization & Topic Overlap</h2>
            </div>
            <p className="section-desc">Detects published articles targeting identical or highly overlapping keywords.</p>

            {seoReport.cannibalization.length === 0 ? (
              <div className="clean-state">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <span>No topic cannibalization detected among published posts.</span>
              </div>
            ) : (
              <div className="cannibalization-list">
                {seoReport.cannibalization.map(item => (
                  <div key={item.id} className="cannibalization-item">
                    <div className="cannibalization-header">
                      <span className="overlap-badge">
                        {item.similarityScore}% Keyword Similarity
                      </span>
                      <span className="overlap-reason">{item.reason}</span>
                    </div>

                    <div className="overlap-articles-pair">
                      <div className="overlap-art">
                        <span className="art-label">Article A:</span>
                        <Link to={`/blog/${item.articleA.slugId}`} target="_blank" className="art-link">
                          {item.articleA.title} <ExternalLink size={12} />
                        </Link>
                      </div>
                      <div className="overlap-art">
                        <span className="art-label">Article B:</span>
                        <Link to={`/blog/${item.articleB.slugId}`} target="_blank" className="art-link">
                          {item.articleB.title} <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>

                    <div className="overlap-action">
                      <strong>Recommendation:</strong> {item.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Meta & Structure Audit Opportunities */}
          <section className="seo-section-card">
            <div className="section-title-wrap">
              <TrendingUp size={18} className="section-title-icon" />
              <h2>SEO Technical & Meta Audit Opportunities</h2>
            </div>

            {seoReport.metaAuditOps.length === 0 ? (
              <div className="clean-state">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <span>All published articles pass basic meta description, OG image, and title length checks.</span>
              </div>
            ) : (
              <table className="seo-ops-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Issue Type</th>
                    <th>Priority</th>
                    <th>Recommendation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {seoReport.metaAuditOps.map((op, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{op.title}</strong>
                      </td>
                      <td>
                        <span className="op-type-tag">{op.type}</span>
                      </td>
                      <td>
                        <span className={`priority-pill priority-${op.priority.toLowerCase()}`}>
                          {op.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        {op.recommendation}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline btn-xs"
                          onClick={() => navigate(`/admin/edit/${op.articleId}`)}
                        >
                          Edit Working Draft <ArrowUpRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
