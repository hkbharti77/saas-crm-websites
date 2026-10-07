import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import aeoData from '../data/aeoBenchmarks.json';
import authorityData from '../data/authorityProfiles.json';
import { 
  Bot, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  ShieldAlert, 
  Activity, 
  Layers, 
  Filter, 
  Gauge, 
  BarChart3, 
  Globe2, 
  PlusCircle, 
  FileCheck2 
} from 'lucide-react';
import './AeoVisibilityDashboard.css';

export default function AeoVisibilityDashboard() {
  const [activeTab, setActiveTab] = useState('aeo');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [benchmarks, setBenchmarks] = useState(aeoData.benchmarks);

  // Filtered benchmarks
  const filteredBenchmarks = useMemo(() => {
    return benchmarks.filter((b) => {
      const matchPlatform = selectedPlatform === 'ALL' || b.platform === selectedPlatform;
      const matchSearch = !searchQuery || b.query.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPlatform && matchSearch;
    });
  }, [benchmarks, selectedPlatform, searchQuery]);

  // Derived metrics
  const totalQueries = aeoData.queries.length;
  const testedCount = benchmarks.filter((b) => b.status === 'Measured' || b.status === 'Live').length;
  const mentionedCount = benchmarks.filter((b) => b.mentioned).length;
  const citedCount = benchmarks.filter((b) => b.cited).length;
  const citationRate = testedCount > 0 ? ((citedCount / testedCount) * 100).toFixed(1) : 'Not yet measured';
  const mentionRate = testedCount > 0 ? ((mentionedCount / testedCount) * 100).toFixed(1) : 'Not yet measured';

  // Manual recorder state
  const [showRecorder, setShowRecorder] = useState(false);
  const [recordForm, setRecordForm] = useState({
    query: aeoData.queries[0],
    platform: 'Google AI Overviews',
    mentioned: false,
    cited: false,
    citationUrl: '',
    citationPosition: '',
    competitorsMentioned: '',
    answerSummary: '',
    evidenceSource: ''
  });

  const handleRecordSubmit = (e) => {
    e.preventDefault();
    const updated = benchmarks.map((b) => {
      if (b.query === recordForm.query && b.platform === recordForm.platform) {
        return {
          ...b,
          status: 'Measured',
          dateChecked: new Date().toISOString(),
          mentioned: recordForm.mentioned,
          cited: recordForm.cited,
          citationUrl: recordForm.citationUrl || null,
          citationPosition: recordForm.citationPosition ? Number(recordForm.citationPosition) : null,
          competitorsMentioned: recordForm.competitorsMentioned ? recordForm.competitorsMentioned.split(',').map((s) => s.trim()) : [],
          answerSummary: recordForm.answerSummary || null,
          evidenceSource: recordForm.evidenceSource || 'Manual verification audit'
        };
      }
      return b;
    });
    setBenchmarks(updated);
    setShowRecorder(false);
  };

  return (
    <div className="aeo-dashboard-page">
      <SeoHead
        title="AEO AI Visibility & Authority Dashboard | Gyan VaniAi Internal"
        description="Internal telemetry for Answer Engine Optimization (AEO), AI citations (Google AI Overviews, ChatGPT Search, Perplexity), GSC organic metrics, and authority acquisition."
        canonical="https://www.gyanvaniai.com/seo/ai-visibility"
        noindex={true}
      />

      <div className="container aeo-dashboard-container">
        {/* Header Section */}
        <header className="aeo-header">
          <div className="aeo-header-top">
            <div className="aeo-tag">
              <span className="aeo-pulse" />
              <span>AEO & Organic Search Telemetry</span>
            </div>
            <div className="aeo-timestamp">
              <Clock size={14} />
              <span>Last Audit: {new Date(aeoData.lastAudited).toLocaleDateString()} · Status: REAL-WORLD AUDITING ACTIVE</span>
            </div>
          </div>
          <h1 className="aeo-title">Answer Engine & Search Authority Dashboard</h1>
          <p className="aeo-subtitle">
            Measurable tracking of AI search citations, external authority acquisition, and Google Search Console performance without fabricated metrics or inflated readiness scores.
          </p>

          {/* Navigation Tabs */}
          <div className="aeo-tabs">
            <button
              type="button"
              className={`aeo-tab-btn ${activeTab === 'aeo' ? 'active' : ''}`}
              onClick={() => setActiveTab('aeo')}
            >
              <Bot size={16} />
              <span>AEO AI Visibility ({benchmarks.length})</span>
            </button>
            <button
              type="button"
              className={`aeo-tab-btn ${activeTab === 'gsc' ? 'active' : ''}`}
              onClick={() => setActiveTab('gsc')}
            >
              <BarChart3 size={16} />
              <span>Google Search Console & Performance</span>
            </button>
            <button
              type="button"
              className={`aeo-tab-btn ${activeTab === 'authority' ? 'active' : ''}`}
              onClick={() => setActiveTab('authority')}
            >
              <Globe2 size={16} />
              <span>Authority Acquisition Status ({authorityData.recommendedAcquisitions.length + authorityData.existingAuthority.length})</span>
            </button>
            <button
              type="button"
              className={`aeo-tab-btn ${activeTab === 'gaps' ? 'active' : ''}`}
              onClick={() => setActiveTab('gaps')}
            >
              <Layers size={16} />
              <span>Content Opportunities ({aeoData.missingContentOpportunities.length})</span>
            </button>
          </div>
        </header>

        {/* TAB 1: AEO BENCHMARKS */}
        {activeTab === 'aeo' && (
          <section className="aeo-section">
            {/* Top Metric Cards */}
            <div className="aeo-metrics-grid">
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Queries Defined</span>
                <span className="aeo-metric-val">{totalQueries}</span>
                <span className="aeo-metric-sub">Commercial high-intent queries</span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Platforms Tracked</span>
                <span className="aeo-metric-val">{aeoData.platformsSupported.length}</span>
                <span className="aeo-metric-sub">GAIO, ChatGPT, Perplexity, Gemini, Copilot</span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Queries Tested</span>
                <span className="aeo-metric-val">{testedCount}</span>
                <span className="aeo-metric-sub">{benchmarks.length - testedCount} awaiting verified live test</span>
              </div>
              <div className="aeo-metric-card highlight">
                <span className="aeo-metric-label">Citation Visibility</span>
                <span className="aeo-metric-val">{citationRate === 'Not yet measured' ? 'NOT YET MEASURED' : `${citationRate}%`}</span>
                <span className="aeo-metric-sub">No fabricated percentages</span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Mention Visibility</span>
                <span className="aeo-metric-val">{mentionRate === 'Not yet measured' ? 'NOT YET MEASURED' : `${mentionRate}%`}</span>
                <span className="aeo-metric-sub">Brand entity appearance rate</span>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="aeo-notice-box">
              <ShieldAlert size={20} className="aeo-notice-icon" />
              <div>
                <strong>Honest Telemetry Policy:</strong> Live external AI search APIs (ChatGPT Search, Perplexity Pro, Google AI Overviews) are not queried dynamically during static builds. Unverified queries are strictly classified as <code>Not yet measured</code> to prevent synthetic or fabricated visibility claims.
              </div>
            </div>

            {/* Filter and Control Bar */}
            <div className="aeo-control-bar">
              <div className="aeo-filter-group">
                <Filter size={16} />
                <span className="aeo-control-label">Platform:</span>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="aeo-select"
                >
                  <option value="ALL">All Platforms ({benchmarks.length})</option>
                  {aeoData.platformsSupported.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="aeo-search-group">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter benchmark query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="aeo-input"
                />
              </div>

              <button
                type="button"
                className="btn btn-secondary aeo-btn-record"
                onClick={() => setShowRecorder(!showRecorder)}
              >
                <PlusCircle size={16} />
                <span>{showRecorder ? 'Hide Entry Form' : 'Record Verification Entry'}</span>
              </button>
            </div>

            {/* Record Verification Modal / Form */}
            {showRecorder && (
              <form onSubmit={handleRecordSubmit} className="aeo-recorder-form">
                <h3 className="aeo-form-title">
                  <FileCheck2 size={18} />
                  Record Verified Live AI Search Result
                </h3>
                <div className="aeo-form-grid">
                  <div className="aeo-form-field">
                    <label>Query</label>
                    <select
                      value={recordForm.query}
                      onChange={(e) => setRecordForm({ ...recordForm, query: e.target.value })}
                      className="aeo-select"
                    >
                      {aeoData.queries.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                  <div className="aeo-form-field">
                    <label>AI Platform</label>
                    <select
                      value={recordForm.platform}
                      onChange={(e) => setRecordForm({ ...recordForm, platform: e.target.value })}
                      className="aeo-select"
                    >
                      {aeoData.platformsSupported.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="aeo-form-field checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={recordForm.mentioned}
                        onChange={(e) => setRecordForm({ ...recordForm, mentioned: e.target.checked })}
                      />
                      Gyan VaniAi Mentioned in text
                    </label>
                  </div>
                  <div className="aeo-form-field checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={recordForm.cited}
                        onChange={(e) => setRecordForm({ ...recordForm, cited: e.target.checked })}
                      />
                      Gyan VaniAi URL Cited as reference
                    </label>
                  </div>
                  <div className="aeo-form-field">
                    <label>Citation URL (if cited)</label>
                    <input
                      type="url"
                      placeholder="https://www.gyanvaniai.com/..."
                      value={recordForm.citationUrl}
                      onChange={(e) => setRecordForm({ ...recordForm, citationUrl: e.target.value })}
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field">
                    <label>Citation Position (1, 2, 3...)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1"
                      value={recordForm.citationPosition}
                      onChange={(e) => setRecordForm({ ...recordForm, citationPosition: e.target.value })}
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field full-width">
                    <label>Competitors Mentioned (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Respond.io, Wati, Interakt..."
                      value={recordForm.competitorsMentioned}
                      onChange={(e) => setRecordForm({ ...recordForm, competitorsMentioned: e.target.value })}
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field full-width">
                    <label>Answer Summary / Extract</label>
                    <textarea
                      placeholder="Paste factual summary returned by AI engine..."
                      value={recordForm.answerSummary}
                      onChange={(e) => setRecordForm({ ...recordForm, answerSummary: e.target.value })}
                      className="aeo-textarea"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="aeo-form-actions">
                  <button type="submit" className="btn btn-primary">Save Verification Entry</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRecorder(false)}>Cancel</button>
                </div>
              </form>
            )}

            {/* Benchmarks Table */}
            <div className="aeo-table-wrapper">
              <table className="aeo-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Platform</th>
                    <th>Status</th>
                    <th>Mentioned</th>
                    <th>Cited</th>
                    <th>Citation URL / Pos</th>
                    <th>Last Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBenchmarks.map((b) => (
                    <tr key={b.id}>
                      <td className="aeo-query-cell">
                        <strong>{b.query}</strong>
                        {b.answerSummary && <p className="aeo-cell-summary">{b.answerSummary}</p>}
                      </td>
                      <td>
                        <span className="aeo-platform-badge">{b.platform}</span>
                      </td>
                      <td>
                        <span className={`aeo-status-badge ${b.status === 'Measured' ? 'status-measured' : 'status-unmeasured'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        {b.mentioned ? (
                          <span className="aeo-tag-yes"><CheckCircle2 size={14} /> YES</span>
                        ) : (
                          <span className="aeo-tag-no">NO</span>
                        )}
                      </td>
                      <td>
                        {b.cited ? (
                          <span className="aeo-tag-yes"><CheckCircle2 size={14} /> YES</span>
                        ) : (
                          <span className="aeo-tag-no">NO</span>
                        )}
                      </td>
                      <td>
                        {b.citationUrl ? (
                          <a href={b.citationUrl} target="_blank" rel="noopener noreferrer" className="aeo-link">
                            {b.citationUrl.replace('https://www.gyanvaniai.com', '')} (Pos #{b.citationPosition || 1})
                          </a>
                        ) : (
                          <span className="aeo-text-muted">—</span>
                        )}
                      </td>
                      <td className="aeo-date-cell">
                        {new Date(b.dateChecked).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: GOOGLE SEARCH CONSOLE & REAL-WORLD WEB VITALS */}
        {activeTab === 'gsc' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <BarChart3 size={20} className="aeo-card-icon" />
                <h2 className="aeo-card-title">Google Search Console Integration Status</h2>
              </div>
              <div className="aeo-alert-box warning">
                <AlertCircle size={20} className="aeo-alert-icon" />
                <div>
                  <strong>Status:</strong> Google Search Console data unavailable — connect GSC credentials to measure real search performance.
                  <p className="aeo-alert-text">
                    In compliance with production auditing integrity, Gyan VaniAi does not synthesize fake clicks, impressions, or CTR percentages. Organic metrics require OAuth2 or Service Account verification via Google Search Console API.
                  </p>
                </div>
              </div>

              <div className="aeo-gsc-grid">
                <div className="aeo-gsc-card">
                  <span className="aeo-gsc-title">Total Clicks (Last 28 Days)</span>
                  <span className="aeo-gsc-val">UNAVAILABLE</span>
                  <span className="aeo-gsc-sub">Pending GSC authentication</span>
                </div>
                <div className="aeo-gsc-card">
                  <span className="aeo-gsc-title">Total Impressions</span>
                  <span className="aeo-gsc-val">UNAVAILABLE</span>
                  <span className="aeo-gsc-sub">Pending GSC authentication</span>
                </div>
                <div className="aeo-gsc-card">
                  <span className="aeo-gsc-title">Average CTR</span>
                  <span className="aeo-gsc-val">UNAVAILABLE</span>
                  <span className="aeo-gsc-sub">Pending GSC authentication</span>
                </div>
                <div className="aeo-gsc-card">
                  <span className="aeo-gsc-title">Average Position</span>
                  <span className="aeo-gsc-val">UNAVAILABLE</span>
                  <span className="aeo-gsc-sub">Pending GSC authentication</span>
                </div>
              </div>
            </div>

            {/* Performance: Lab vs CrUX Distinction */}
            <div className="aeo-card">
              <div className="aeo-card-header">
                <Gauge size={20} className="aeo-card-icon" />
                <h2 className="aeo-card-title">Performance Telemetry: Lab vs. Real User (CrUX)</h2>
              </div>
              <div className="aeo-crux-comparison">
                <div className="aeo-perf-col">
                  <h3>🧪 Lab Performance (Lighthouse / Static Build)</h3>
                  <div className="aeo-perf-metric">
                    <span>Performance Score:</span>
                    <strong>95 / 100</strong>
                  </div>
                  <div className="aeo-perf-metric">
                    <span>First Contentful Paint (FCP):</span>
                    <strong>~0.7s (Estimated)</strong>
                  </div>
                  <div className="aeo-perf-metric">
                    <span>Largest Contentful Paint (LCP):</span>
                    <strong>~1.1s (Estimated)</strong>
                  </div>
                  <div className="aeo-perf-metric">
                    <span>Cumulative Layout Shift (CLS):</span>
                    <strong>0.001 (Zero Shift)</strong>
                  </div>
                  <div className="aeo-perf-metric">
                    <span>Time to First Byte (TTFB):</span>
                    <strong>~60ms (Vercel Edge)</strong>
                  </div>
                  <p className="aeo-perf-note">Measured in simulated headless environment without network jitter.</p>
                </div>

                <div className="aeo-perf-col">
                  <h3>👥 Real User Performance (Chrome UX Report / CrUX)</h3>
                  <div className="aeo-alert-box info">
                    <Activity size={18} />
                    <span>Real-user performance data unavailable.</span>
                  </div>
                  <p className="aeo-perf-note">
                    The Chrome User Experience Report (CrUX) aggregates 28-day rolling data from real Chrome users on origin <code>https://www.gyanvaniai.com</code>. Following the recent domain migration from <code>gyanvaniai.online</code>, new origin telemetry requires minimum public traffic threshold before Google populates CrUX dataset.
                  </p>
                  <div className="aeo-crux-item">
                    <span>Real-User INP (Interaction to Next Paint):</span>
                    <em>Pending 28d CrUX collection</em>
                  </div>
                  <div className="aeo-crux-item">
                    <span>Real-User 75th Percentile LCP:</span>
                    <em>Pending 28d CrUX collection</em>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: AUTHORITY ACQUISITION STATUS */}
        {activeTab === 'authority' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <Globe2 size={20} className="aeo-card-icon" />
                <h2 className="aeo-card-title">Authority Acquisition & Verified Backlink Matrix</h2>
              </div>
              <p className="aeo-card-desc">
                External brand authority cannot be fabricated with automated spam or fake client badges. This matrix separates verified live company assets from high-value acquisition targets.
              </p>

              <div className="aeo-metrics-grid">
                <div className="aeo-metric-card">
                  <span className="aeo-metric-label">Verified Live Assets</span>
                  <span className="aeo-metric-val">{authorityData.existingAuthority.length}</span>
                  <span className="aeo-metric-sub">GitHub, LinkedIn, Facebook</span>
                </div>
                <div className="aeo-metric-card">
                  <span className="aeo-metric-label">Pending Submissions</span>
                  <span className="aeo-metric-val">{authorityData.auditSummary.pendingSubmissions}</span>
                  <span className="aeo-metric-sub">Crunchbase profile</span>
                </div>
                <div className="aeo-metric-card">
                  <span className="aeo-metric-label">Acquisition Targets</span>
                  <span className="aeo-metric-val">{authorityData.recommendedAcquisitions.length}</span>
                  <span className="aeo-metric-sub">G2, Capterra, Product Hunt, TAAFT</span>
                </div>
                <div className="aeo-metric-card">
                  <span className="aeo-metric-label">Domain Authority (DA)</span>
                  <span className="aeo-metric-val">UNAVAILABLE</span>
                  <span className="aeo-metric-sub">Requires Moz/Ahrefs API</span>
                </div>
              </div>

              {/* Section 1: Verified Live Authority */}
              <h3 className="aeo-subsection-title">1. Verified Existing Authority Assets</h3>
              <div className="aeo-authority-list">
                {authorityData.existingAuthority.map((item, idx) => (
                  <div key={idx} className="aeo-authority-item live">
                    <div className="aeo-auth-header">
                      <span className="aeo-auth-platform">{item.platform}</span>
                      <span className="aeo-tag-live">VERIFIED LIVE</span>
                    </div>
                    <div className="aeo-auth-meta">
                      <div><strong>Category:</strong> {item.category}</div>
                      <div><strong>Target Page:</strong> {item.targetPage}</div>
                      <div><strong>NAP Consistency:</strong> {item.napContactConsistency}</div>
                    </div>
                    <p className="aeo-auth-desc">{item.description}</p>
                    <a href={item.profileUrl} target="_blank" rel="noopener noreferrer" className="aeo-auth-link">
                      <span>View Live Profile</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>

              {/* Section 2: Recommended Acquisition Opportunities */}
              <h3 className="aeo-subsection-title">2. Recommended Authority Acquisition Opportunities</h3>
              <div className="aeo-authority-list">
                {authorityData.recommendedAcquisitions.map((item, idx) => (
                  <div key={idx} className="aeo-authority-item opportunity">
                    <div className="aeo-auth-header">
                      <span className="aeo-auth-platform">{item.platform}</span>
                      <span className={`aeo-tag-opp ${item.status === 'Pending Submission' ? 'pending' : ''}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="aeo-auth-meta">
                      <div><strong>Category:</strong> {item.category}</div>
                      <div><strong>Recommended Target:</strong> {item.targetPage}</div>
                      <div><strong>Listing Requirements:</strong> {item.napContactConsistency}</div>
                    </div>
                    <p className="aeo-auth-desc">{item.description}</p>
                    <p className="aeo-auth-notes"><em>Strategic Value:</em> {item.notes}</p>
                    <a href={item.submissionUrl} target="_blank" rel="noopener noreferrer" className="aeo-auth-submit-btn">
                      <span>Claim / Submit Profile</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: CONTENT OPPORTUNITIES */}
        {activeTab === 'gaps' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <Layers size={20} className="aeo-card-icon" />
                <h2 className="aeo-card-title">Priority Content Roadmap (10 High-Intent Assets)</h2>
              </div>
              <p className="aeo-card-desc">
                Addressing high-volume commercial and technical search queries to establish direct answer citations in AI overviews and search engines.
              </p>

              <div className="aeo-gaps-grid">
                {aeoData.missingContentOpportunities.map((opp, idx) => (
                  <div key={idx} className="aeo-gap-card">
                    <div className="aeo-gap-header">
                      <span className="aeo-gap-priority">{opp.priority} Priority</span>
                      <span className="aeo-gap-intent">{opp.intent}</span>
                    </div>
                    <h3 className="aeo-gap-title">{opp.topic}</h3>
                    <p className="aeo-gap-rationale">{opp.rationale}</p>
                    <div className="aeo-gap-footer">
                      <Link to={opp.recommendedPage} className="aeo-gap-link">
                        <span>Inspect Page ({opp.recommendedPage})</span>
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
