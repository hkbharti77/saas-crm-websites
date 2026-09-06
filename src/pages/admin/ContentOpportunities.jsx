import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lightbulb, Plus, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import ContentBriefModal from '../../components/admin/ContentBriefModal';
import { buildGrowthIntelligenceReport, buildAiStrategyAssistantPrompt } from '../../utils/contentStrategyEngine';
import { generateText } from '../../services/ai/aiService';
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

  // AI Strategy Assistant State
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Content Brief Modal State
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [briefPrefillTopic, setBriefPrefillTopic] = useState('');

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

  // Handle AI Strategy Assistant Trigger
  const handleAskAiStrategy = async () => {
    setIsAiLoading(true);
    try {
      const prompt = buildAiStrategyAssistantPrompt(intelligenceReport);
      const res = await generateText({
        operation: 'strategic_recommendation',
        prompt,
        maxTokens: 500,
      });

      if (res.success && res.text) {
        setAiAnalysis(res.text);
      } else {
        setAiAnalysis('AI strategy advice is currently unavailable. Please review the deterministic priority board below.');
      }
    } catch (err) {
      setAiAnalysis('Unable to generate AI recommendations: ' + (err.message || ''));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleOpenBrief = (topic = '') => {
    setBriefPrefillTopic(topic);
    setIsBriefModalOpen(true);
  };

  const handleUseBriefInEditor = () => {
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
              className="btn btn-primary btn-sm"
              onClick={handleAskAiStrategy}
              disabled={isAiLoading}
            >
              <Sparkles size={14} style={{ marginRight: '4px' }} />
              {isAiLoading ? 'Analyzing…' : 'Ask AI Strategist'}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => handleOpenBrief('WhatsApp & CRM Automation')}
            >
              <Plus size={14} style={{ marginRight: '4px' }} /> Create Brief
            </button>
          </div>
        </div>

        {error && <div className="analytics-error" role="alert">{error}</div>}

        {/* AI Strategy Assistant Output Panel */}
        {aiAnalysis && (
          <div className="analytics-section" style={{ background: 'color-mix(in srgb, var(--primary-color) 6%, var(--bg-card))', border: '1px solid color-mix(in srgb, var(--primary-color) 25%, var(--border-color))', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>AI Content Strategy Advice</h3>
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {aiAnalysis}
            </div>
          </div>
        )}

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
                        <Link to={item.actionLink} className="btn btn-outline btn-xs" style={{ width: '100%', justifyContent: 'center' }}>
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
                        {item.actionType === 'brief' ? (
                          <button
                            type="button"
                            className="btn btn-primary btn-xs"
                            onClick={() => handleOpenBrief(item.suggestedTopic)}
                            style={{ width: '100%', justifyContent: 'center' }}
                          >
                            <Sparkles size={12} style={{ marginRight: '4px' }} /> Create Brief from Opportunity
                          </button>
                        ) : (
                          <Link to={item.actionLink} className="btn btn-outline btn-xs" style={{ width: '100%', justifyContent: 'center' }}>
                            {item.recommendedAction}
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ContentBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        initialTopic={briefPrefillTopic}
        onUseBrief={handleUseBriefInEditor}
      />
    </div>
  );
}

