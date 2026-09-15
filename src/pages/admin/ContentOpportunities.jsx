import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lightbulb, Plus, RefreshCw, Layers } from 'lucide-react';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import { buildGrowthIntelligenceReport } from '../../utils/contentStrategyEngine';
import './BlogAnalytics.css';
import '../../components/admin/AdminCMS.css';

function dateNDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}


export default function ContentOpportunities() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => { if (!u) navigate('/admin/login'); });
    return unsub;
  }, [navigate]);

  const [posts, setPosts] = useState([]);
  const [analyticsDocs, setAnalyticsDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const postsSnap = await getDocs(
          query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        );
        const postsList = postsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPosts(postsList);

        const sixtyDaysAgo = dateNDaysAgo(59);
        const snap = await getDocs(
          query(
            collection(db, 'analytics_blog_daily'),
            where('date', '>=', sixtyDaysAgo)
          )
        );
        setAnalyticsDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError('Failed to load opportunities: ' + (err.message || ''));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const intelligenceReport = useMemo(() => {
    return buildGrowthIntelligenceReport(posts, analyticsDocs);
  }, [posts, analyticsDocs]);

  const handleCreateNewPost = () => {
    navigate('/admin/create');
  };

  return (
    <div className="analytics-page">
      <Helmet>
        <title>Content Growth Intelligence | GyanVaniAi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminHeader />

      <div className="analytics-container" style={{ paddingBottom: '4rem' }}>
        {/* Breadcrumb */}
        <nav className="analytics-breadcrumb" aria-label="Breadcrumb">
          <Link to="/admin/dashboard">Dashboard</Link>
          <span>/</span>
          <Link to="/admin/blog/analytics">Analytics</Link>
          <span>/</span>
          <span>Growth Intelligence</span>
        </nav>

        <div className="analytics-page-header">
          <div>
            <h1 className="analytics-page-title">
              <Lightbulb size={22} style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--primary-color)' }} />
              Content Growth Intelligence
            </h1>
            <p className="analytics-page-subtitle">
              Strategic priority matrix answering: &ldquo;What should we publish, refresh, or optimize next?&rdquo;
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleCreateNewPost}
            >
              <Plus size={14} style={{ marginRight: '4px' }} /> Create Article
            </button>
          </div>
        </div>

        {error && <div className="analytics-error" role="alert">{error}</div>}

        {loading ? (
          <div className="analytics-loading"><RefreshCw size={16} /> Computing Content Growth Priorities…</div>
        ) : (
          <>
            {/* Priority Board Matrix */}
            <div className="analytics-section">
              <h2 className="analytics-section-title" style={{ marginBottom: '1.25rem' }}>
                <Layers size={16} /> Content Priority Board
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* High Priority Column */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, #ef4444 30%, var(--border-color))', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>High Priority ({intelligenceReport.highPriorityCount})</span>
                  </div>

                  {intelligenceReport.board.highPriority.length === 0 ? (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>No high-priority issues detected.</div>
                  ) : (
                    intelligenceReport.board.highPriority.map(item => (
                      <div key={item.id} style={{ padding: '1rem', background: 'color-mix(in srgb, #ef4444 5%, var(--bg-card))', borderRadius: '10px', marginBottom: '0.85rem', border: '1px solid color-mix(in srgb, #ef4444 20%, var(--border-color))' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>{item.title}</strong>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                          <strong>WHY:</strong> {item.reason}
                        </p>
                        <Link to={item.actionLink || '/admin/create'} className="btn btn-outline btn-xs" style={{ width: '100%', justifyContent: 'center' }}>
                          {item.recommendedAction}
                        </Link>
                      </div>
                    ))
                  )}
                </div>

                {/* Medium Priority Column */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, #f59e0b 30%, var(--border-color))', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>Medium Priority ({intelligenceReport.mediumPriorityCount})</span>
                  </div>

                  {intelligenceReport.board.mediumPriority.length === 0 ? (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>No medium-priority items detected.</div>
                  ) : (
                    intelligenceReport.board.mediumPriority.map(item => (
                      <div key={item.id} style={{ padding: '1rem', background: 'color-mix(in srgb, #f59e0b 5%, var(--bg-card))', borderRadius: '10px', marginBottom: '0.85rem', border: '1px solid color-mix(in srgb, #f59e0b 20%, var(--border-color))' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>{item.title}</strong>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                          <strong>WHY:</strong> {item.reason}
                        </p>
                        <Link to={item.actionLink || '/admin/create'} className="btn btn-outline btn-xs" style={{ width: '100%', justifyContent: 'center' }}>
                          {item.recommendedAction}
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

