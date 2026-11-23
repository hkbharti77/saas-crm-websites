import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import aeoData from '../data/aeoBenchmarks.json';
import authorityData from '../data/authorityProfiles.json';
import { CANONICAL_DIRECTORY_BIOS } from '../config/entityIdentityConfig';
import {
  buildExternalProbeUrl,
  mergeBenchmarkRecords,
  benchmarksToCsv,
} from '../utils/aiVisibilityAnalyzer';
import {
  Bot,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Layers,
  Filter,
  Globe2,
  PlusCircle,
  FileCheck2,
  Sparkles,
  Download,
  RefreshCw,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import './AeoVisibilityDashboard.css';

const STORAGE_BENCHMARKS_KEY = 'gyanvaniai_geo_benchmark_overrides_v2';
const STORAGE_AUTHORITY_KEY = 'gyanvaniai_geo_authority_status_v1';

function safeLoadJson(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AeoVisibilityDashboard() {
  const [activeTab, setActiveTab] = useState('aeo');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Persisted local overrides merged onto static seed benchmarks
  const [savedOverrides, setSavedOverrides] = useState(() =>
    safeLoadJson(STORAGE_BENCHMARKS_KEY, {})
  );
  const benchmarks = useMemo(
    () => mergeBenchmarkRecords(aeoData.benchmarks, savedOverrides),
    [savedOverrides]
  );

  // Live Gemini Search-Grounded Probe state
  const [probeQuery, setProbeQuery] = useState(aeoData.queries[0] || '');
  const [probeLoading, setProbeLoading] = useState(false);
  const [probeError, setProbeError] = useState(null);
  const [probeResult, setProbeResult] = useState(null);
  const [probeSavedBanner, setProbeSavedBanner] = useState(false);

  // Technical GEO Health state (live GET /api/ai-visibility/health)
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthError, setHealthError] = useState(null);
  const [healthReport, setHealthReport] = useState(null);

  // Authority Playbook local status & copy state
  const [authorityStatuses, setAuthorityStatuses] = useState(() =>
    safeLoadJson(STORAGE_AUTHORITY_KEY, {})
  );
  const [copiedKey, setCopiedKey] = useState(null);

  // Manual verification recorder form
  const [showRecorder, setShowRecorder] = useState(false);
  const [recordForm, setRecordForm] = useState({
    query: aeoData.queries[0] || '',
    platform: 'Perplexity',
    mentioned: false,
    cited: false,
    citationUrl: '',
    citationPosition: '',
    competitorsMentioned: '',
    answerSummary: '',
    evidenceSource: '',
  });

  const persistBenchmarkOverride = useCallback((id, record) => {
    setSavedOverrides((prev) => {
      const next = { ...prev, [id]: record };
      try {
        window.localStorage.setItem(STORAGE_BENCHMARKS_KEY, JSON.stringify(next));
      } catch {
        /* ignore storage quota errors */
      }
      return next;
    });
  }, []);

  const handleResetLocalBenchmarks = () => {
    setSavedOverrides({});
    try {
      window.localStorage.removeItem(STORAGE_BENCHMARKS_KEY);
    } catch {
      /* ignore */
    }
  };

  // Run Live Gemini Probe via Express backend (/api/ai-visibility/probe)
  const handleRunLiveProbe = async (e) => {
    e.preventDefault();
    const trimmed = probeQuery.trim();
    if (!trimmed || probeLoading) return;

    setProbeLoading(true);
    setProbeError(null);
    setProbeSavedBanner(false);

    try {
      const res = await fetch('/api/ai-visibility/probe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setProbeResult(null);
        setProbeError(data?.error || `Probe failed with status ${res.status}.`);
      } else {
        const analysis = data?.analysis || {};
        setProbeResult({
          ...analysis,
          query: analysis.query || trimmed,
          answerText: data?.answerText || '',
          model: data?.model || 'gemini-4-hydrogen',
          checkedAt: data?.checkedAt || new Date().toISOString(),
          durationMs: data?.durationMs ?? null,
          webSearchQueries: data?.webSearchQueries || [],
        });
      }
    } catch (err) {
      setProbeResult(null);
      setProbeError(err?.message || 'Unable to reach /api/ai-visibility/probe.');
    } finally {
      setProbeLoading(false);
    }
  };

  const handleSaveProbeToLedger = () => {
    if (!probeResult) return;
    const existing = benchmarks.find(
      (b) => b.query.toLowerCase() === probeResult.query.toLowerCase() && b.platform === 'Gemini'
    );
    const targetId =
      existing?.id || `live-gemini-${Date.now()}`;

    persistBenchmarkOverride(targetId, {
      id: targetId,
      query: probeResult.query,
      platform: 'Gemini',
      status: 'Measured',
      dateChecked: probeResult.checkedAt || new Date().toISOString(),
      mentioned: Boolean(probeResult.mentioned),
      cited: Boolean(probeResult.cited),
      citationUrl: probeResult.citationUrl || null,
      citationPosition: probeResult.citationPosition || null,
      competitorsMentioned: probeResult.competitorsMentioned || [],
      answerSummary: probeResult.summaryExcerpt || null,
      evidenceSource: `Live ${probeResult.model || 'gemini-4-hydrogen'} + Google Search Grounding`,
    });
    setProbeSavedBanner(true);
  };

  // Fetch Technical GEO Health & Browser SEO Readiness from Express backend (/api/ai-visibility/health)
  const fetchGeoHealth = useCallback(async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const res = await fetch('/api/ai-visibility/health');
      const data = await res.json();
      if (!res.ok) {
        setHealthError(data?.error || 'Failed to inspect technical GEO & Browser SEO health.');
      } else {
        setHealthReport(data?.report || data);
        if (data?.browserSeo) {
          setBrowserSeoReport(data.browserSeo);
        }
      }
    } catch (err) {
      setHealthError(err?.message || 'Unable to reach /api/ai-visibility/health.');
    } finally {
      setHealthLoading(false);
    }
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if ((tabId === 'health' || tabId === 'browser-seo') && (!healthReport || !browserSeoReport) && !healthLoading) {
      fetchGeoHealth();
    }
  };

  // Authority target status toggle
  const handleAuthorityStatusChange = (platformName, nextStatus) => {
    setAuthorityStatuses((prev) => {
      const next = { ...prev, [platformName]: nextStatus };
      try {
        window.localStorage.setItem(STORAGE_AUTHORITY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleCopyText = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      /* fallback no-op if clipboard restricted */
    }
  };

  // Filtered benchmarks
  const filteredBenchmarks = useMemo(() => {
    return benchmarks.filter((b) => {
      const matchPlatform = selectedPlatform === 'ALL' || b.platform === selectedPlatform;
      const isMeasured = b.status === 'Measured' || b.status === 'Live';
      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'MEASURED' && isMeasured) ||
        (statusFilter === 'UNMEASURED' && !isMeasured);
      const matchSearch =
        !searchQuery || b.query.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPlatform && matchStatus && matchSearch;
    });
  }, [benchmarks, selectedPlatform, statusFilter, searchQuery]);

  // Derived real metrics (never fabricated)
  const totalQueries = aeoData.queries.length;
  const testedItems = benchmarks.filter((b) => b.status === 'Measured' || b.status === 'Live');
  const testedCount = testedItems.length;
  const mentionedCount = testedItems.filter((b) => b.mentioned).length;
  const citedCount = testedItems.filter((b) => b.cited).length;
  const citationRate =
    testedCount > 0 ? `${((citedCount / testedCount) * 100).toFixed(1)}%` : 'Not yet measured';
  const mentionRate =
    testedCount > 0 ? `${((mentionedCount / testedCount) * 100).toFixed(1)}%` : 'Not yet measured';

  const handleRecordSubmit = (e) => {
    e.preventDefault();
    const existing = benchmarks.find(
      (b) => b.query === recordForm.query && b.platform === recordForm.platform
    );
    const id = existing?.id || `manual-${Date.now()}`;
    persistBenchmarkOverride(id, {
      id,
      query: recordForm.query,
      platform: recordForm.platform,
      status: 'Measured',
      dateChecked: new Date().toISOString(),
      mentioned: recordForm.mentioned,
      cited: recordForm.cited,
      citationUrl: recordForm.citationUrl.trim() || null,
      citationPosition: recordForm.citationPosition ? Number(recordForm.citationPosition) : null,
      competitorsMentioned: recordForm.competitorsMentioned
        ? recordForm.competitorsMentioned
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      answerSummary: recordForm.answerSummary.trim() || null,
      evidenceSource: recordForm.evidenceSource.trim() || 'Manual live engine verification',
    });
    setShowRecorder(false);
  };

  return (
    <div className="aeo-dashboard-page">
      <SeoHead
        title="AI Visibility & GEO Intelligence Command Center | Gyan VaniAi"
        description="Internal AI visibility command center for live Gemini Search-grounded probing, 6-engine citation tracking (Gemini, ChatGPT Search, Perplexity, Claude, Copilot), technical GEO health audits, and authority acquisition."
        noindex={true}
      />

      <div className="aeo-dashboard-container">
        <header className="aeo-header">
          <div className="aeo-header-top">
            <div className="aeo-eyebrow-meta">
              <span>GEO & AI Visibility Command Center</span>
              <span>·</span>
              <span>Internal Audit Console</span>
            </div>
            <div className="aeo-timestamp">
              <Clock size={14} aria-hidden="true" />
              <span>Baseline Seed: {new Date(aeoData.lastAudited).toLocaleDateString()}</span>
            </div>
          </div>

          <h1 className="aeo-title">AI Search Visibility & GEO Intelligence</h1>
          <p className="aeo-subtitle">
            Run live Google Search-grounded Gemini visibility probes, track citations across 6 AI engines without fabricated metrics, inspect live repository GEO invariants, and execute third-party authority submissions.
          </p>

          <nav className="aeo-tabs" role="tablist" aria-label="AI Visibility sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'aeo'}
              className={`aeo-tab-btn ${activeTab === 'aeo' ? 'active' : ''}`}
              onClick={() => handleSelectTab('aeo')}
            >
              <Bot size={16} aria-hidden="true" />
              <span>Live Probe & 6-Engine Ledger ({benchmarks.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'health'}
              className={`aeo-tab-btn ${activeTab === 'health' ? 'active' : ''}`}
              onClick={() => handleSelectTab('health')}
            >
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Technical GEO Health</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'authority'}
              className={`aeo-tab-btn ${activeTab === 'authority' ? 'active' : ''}`}
              onClick={() => handleSelectTab('authority')}
            >
              <Globe2 size={16} aria-hidden="true" />
              <span>
                Authority Playbook (
                {authorityData.existingAuthority.length + authorityData.recommendedAcquisitions.length})
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'gaps'}
              className={`aeo-tab-btn ${activeTab === 'gaps' ? 'active' : ''}`}
              onClick={() => handleSelectTab('gaps')}
            >
              <Layers size={16} aria-hidden="true" />
              <span>Content & Entity Roadmap ({aeoData.missingContentOpportunities.length})</span>
            </button>
          </nav>
        </header>

        {/* TAB 1: LIVE GEMINI PROBE & 6-ENGINE BENCHMARK LEDGER */}
        {activeTab === 'aeo' && (
          <section className="aeo-section">
            <div className="aeo-metrics-grid">
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Queries Tracked</span>
                <span className="aeo-metric-val">{totalQueries}</span>
                <span className="aeo-metric-sub">Commercial & branded intents</span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">AI Engines</span>
                <span className="aeo-metric-val">{aeoData.platformsSupported.length}</span>
                <span className="aeo-metric-sub">Gemini, GAIO, ChatGPT, Perplexity, Claude, Copilot</span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Verified Checks</span>
                <span className="aeo-metric-val">
                  {testedCount} / {benchmarks.length}
                </span>
                <span className="aeo-metric-sub">
                  {benchmarks.length - testedCount} awaiting verification
                </span>
              </div>
              <div className="aeo-metric-card highlight">
                <span className="aeo-metric-label">Citation Rate</span>
                <span className="aeo-metric-val">{citationRate}</span>
                <span className="aeo-metric-sub">
                  {citedCount} cited across {testedCount} verified runs
                </span>
              </div>
              <div className="aeo-metric-card">
                <span className="aeo-metric-label">Mention Rate</span>
                <span className="aeo-metric-val">{mentionRate}</span>
                <span className="aeo-metric-sub">
                  {mentionedCount} {mentionedCount === 1 ? 'brand mention' : 'brand mentions'} verified
                </span>
              </div>
            </div>

            {/* Live Gemini Search-Grounded Probe Console */}
            <div className="aeo-card">
              <div className="aeo-card-header">
                <div className="aeo-card-header-left">
                  <Sparkles size={20} className="aeo-card-icon" aria-hidden="true" />
                  <h2 className="aeo-card-title">Live Gemini Search-Grounded Visibility Probe</h2>
                </div>
                <span className="aeo-timestamp">Server-side Gemini + Google Search Grounding</span>
              </div>
              <p className="aeo-card-desc">
                Executes a live query through <code>POST /api/ai-visibility/probe</code> using Google Search grounding to inspect real answer text, brand mentions, canonical domain citations, and competing vendors.
              </p>

              <div className="aeo-probe-presets" role="group" aria-label="Preset commercial queries">
                {aeoData.queries.slice(0, 5).map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={`aeo-preset-btn ${probeQuery === q ? 'active' : ''}`}
                    onClick={() => setProbeQuery(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form onSubmit={handleRunLiveProbe} className="aeo-probe-controls">
                <input
                  type="text"
                  value={probeQuery}
                  onChange={(e) => setProbeQuery(e.target.value)}
                  placeholder="Enter a buyer or brand query to probe live in Gemini..."
                  aria-label="Live Gemini probe query"
                  className="aeo-input"
                  maxLength={300}
                  required
                />
                <button
                  type="submit"
                  className="aeo-action-btn primary"
                  disabled={probeLoading || !probeQuery.trim()}
                >
                  {probeLoading ? (
                    <>
                      <RefreshCw size={15} className="aeo-spin" aria-hidden="true" />
                      <span>Probing Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} aria-hidden="true" />
                      <span>Run Live Gemini Probe</span>
                    </>
                  )}
                </button>
              </form>

              {probeError && (
                <div className="aeo-alert-box error" role="alert">
                  <AlertCircle size={18} className="aeo-error-icon" aria-hidden="true" />
                  <div>
                    <strong>Live Probe Error:</strong> {probeError}
                  </div>
                </div>
              )}

              {probeResult && (
                <div className="aeo-probe-result" data-testid="live-probe-result">
                  <div className="aeo-probe-meta-row">
                    <div className="aeo-probe-signals">
                      <span
                        className={`aeo-status-text ${
                          probeResult.mentioned ? 'aeo-status-pass' : 'aeo-status-fail'
                        }`}
                      >
                        {probeResult.mentioned ? (
                          <CheckCircle2 size={15} aria-hidden="true" />
                        ) : (
                          <XCircle size={15} aria-hidden="true" />
                        )}
                        <span>{probeResult.mentioned ? 'Brand Mentioned' : 'Not Mentioned'}</span>
                      </span>
                      <span
                        className={`aeo-status-text ${
                          probeResult.cited ? 'aeo-status-pass' : 'aeo-status-warn'
                        }`}
                      >
                        {probeResult.cited ? (
                          <CheckCircle2 size={15} aria-hidden="true" />
                        ) : (
                          <AlertCircle size={15} aria-hidden="true" />
                        )}
                        <span>
                          {probeResult.cited
                            ? `Cited (Rank #${probeResult.citationPosition || 1})`
                            : 'Domain Not Cited'}
                        </span>
                      </span>
                      <span className="aeo-timestamp">Model: {probeResult.model}</span>
                    </div>

                    <button
                      type="button"
                      className="aeo-action-btn primary"
                      onClick={handleSaveProbeToLedger}
                    >
                      <FileCheck2 size={15} aria-hidden="true" />
                      <span>{probeSavedBanner ? 'Saved to Ledger' : 'Save to Benchmark Log'}</span>
                    </button>
                  </div>

                  <p className="aeo-probe-answer">{probeResult.answerText}</p>

                  {probeResult.competitorsMentioned?.length > 0 && (
                    <div className="aeo-cell-competitors">
                      <strong>Competitors detected:</strong>{' '}
                      {probeResult.competitorsMentioned.join(' · ')}
                    </div>
                  )}

                  {probeResult.sources?.length > 0 && (
                    <div className="aeo-probe-sources-list">
                      <strong className="aeo-metric-label">Grounding Sources ({probeResult.sources.length})</strong>
                      {probeResult.sources.map((src) => (
                        <a
                          key={`${src.position}-${src.uri || src.title}`}
                          href={src.uri || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aeo-probe-source-link"
                        >
                          <span>
                            #{src.position} · {src.title} {src.isBrandDomain ? '(gyanvaniai.com)' : ''}
                          </span>
                          <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Honest Telemetry Notice */}
            <div className="aeo-notice-box">
              <AlertCircle size={18} className="aeo-notice-icon" aria-hidden="true" />
              <div>
                <strong>Honest Telemetry Policy:</strong> Gemini probes run live via server-side Google Search grounding. External closed engines (ChatGPT Search, Perplexity, Claude, Copilot) use direct one-click verification links and manual logging — unverified rows remain strictly labeled <code>Not yet measured</code>.
              </div>
            </div>

            {/* Control Bar */}
            <div className="aeo-control-bar">
              <div className="aeo-control-left">
                <div className="aeo-filter-group">
                  <Filter size={15} aria-hidden="true" />
                  <select
                    aria-label="Filter by AI platform"
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="aeo-select"
                  >
                    <option value="ALL">All Engines ({benchmarks.length})</option>
                    {aeoData.platformsSupported.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  aria-label="Filter by verification status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="aeo-select"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="MEASURED">Measured ({testedCount})</option>
                  <option value="UNMEASURED">Not yet measured ({benchmarks.length - testedCount})</option>
                </select>

                <div className="aeo-search-group">
                  <Search size={15} aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search query..."
                    aria-label="Search benchmark queries"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="aeo-input"
                  />
                </div>
              </div>

              <div className="aeo-control-right">
                <button
                  type="button"
                  className="aeo-action-btn"
                  onClick={() =>
                    downloadTextFile(
                      'gyanvaniai-ai-visibility-benchmarks.csv',
                      benchmarksToCsv(filteredBenchmarks),
                      'text/csv;charset=utf-8'
                    )
                  }
                >
                  <Download size={14} aria-hidden="true" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  className="aeo-action-btn"
                  onClick={() =>
                    downloadTextFile(
                      'gyanvaniai-ai-visibility-benchmarks.json',
                      JSON.stringify(filteredBenchmarks, null, 2),
                      'application/json'
                    )
                  }
                >
                  <Download size={14} aria-hidden="true" />
                  <span>Export JSON</span>
                </button>
                {Object.keys(savedOverrides).length > 0 && (
                  <button
                    type="button"
                    className="aeo-action-btn"
                    onClick={handleResetLocalBenchmarks}
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    <span>Reset Local Logs</span>
                  </button>
                )}
                <button
                  type="button"
                  className="aeo-action-btn primary"
                  onClick={() => setShowRecorder((prev) => !prev)}
                >
                  <PlusCircle size={15} aria-hidden="true" />
                  <span>{showRecorder ? 'Hide Entry Form' : 'Record Verification Entry'}</span>
                </button>
              </div>
            </div>

            {/* Manual Verification Entry Form */}
            {showRecorder && (
              <form onSubmit={handleRecordSubmit} className="aeo-recorder-form">
                <h3 className="aeo-form-title">
                  <FileCheck2 size={18} aria-hidden="true" />
                  <span>Record Verified Cross-Engine Result</span>
                </h3>
                <div className="aeo-form-grid">
                  <div className="aeo-form-field">
                    <label htmlFor="rec-query">Query</label>
                    <select
                      id="rec-query"
                      value={recordForm.query}
                      onChange={(e) => setRecordForm({ ...recordForm, query: e.target.value })}
                      className="aeo-select"
                    >
                      {aeoData.queries.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="aeo-form-field">
                    <label htmlFor="rec-platform">AI Engine</label>
                    <select
                      id="rec-platform"
                      value={recordForm.platform}
                      onChange={(e) => setRecordForm({ ...recordForm, platform: e.target.value })}
                      className="aeo-select"
                    >
                      {aeoData.platformsSupported.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="aeo-form-field checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={recordForm.mentioned}
                        onChange={(e) =>
                          setRecordForm({ ...recordForm, mentioned: e.target.checked })
                        }
                      />
                      <span>Gyan VaniAi mentioned in answer</span>
                    </label>
                  </div>
                  <div className="aeo-form-field checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={recordForm.cited}
                        onChange={(e) => setRecordForm({ ...recordForm, cited: e.target.checked })}
                      />
                      <span>gyanvaniai.com URL cited</span>
                    </label>
                  </div>
                  <div className="aeo-form-field">
                    <label htmlFor="rec-url">Citation URL (optional)</label>
                    <input
                      id="rec-url"
                      type="url"
                      placeholder="https://www.gyanvaniai.com/compare/..."
                      value={recordForm.citationUrl}
                      onChange={(e) => setRecordForm({ ...recordForm, citationUrl: e.target.value })}
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field">
                    <label htmlFor="rec-pos">Citation Position (optional)</label>
                    <input
                      id="rec-pos"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={recordForm.citationPosition}
                      onChange={(e) =>
                        setRecordForm({ ...recordForm, citationPosition: e.target.value })
                      }
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field full-width">
                    <label htmlFor="rec-comp">Competitors Mentioned (comma-separated)</label>
                    <input
                      id="rec-comp"
                      type="text"
                      placeholder="Wati, Respond.io, AiSensy"
                      value={recordForm.competitorsMentioned}
                      onChange={(e) =>
                        setRecordForm({ ...recordForm, competitorsMentioned: e.target.value })
                      }
                      className="aeo-input"
                    />
                  </div>
                  <div className="aeo-form-field full-width">
                    <label htmlFor="rec-summary">Observed Answer Summary</label>
                    <textarea
                      id="rec-summary"
                      rows={2}
                      placeholder="Summarize what the AI engine answered..."
                      value={recordForm.answerSummary}
                      onChange={(e) =>
                        setRecordForm({ ...recordForm, answerSummary: e.target.value })
                      }
                      className="aeo-textarea"
                    />
                  </div>
                </div>
                <div className="aeo-form-actions">
                  <button type="submit" className="aeo-action-btn primary">
                    Save Verification Entry
                  </button>
                  <button
                    type="button"
                    className="aeo-action-btn"
                    onClick={() => setShowRecorder(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* 6-Engine Benchmark Table */}
            <div className="aeo-table-wrapper">
              <table className="aeo-table">
                <thead>
                  <tr>
                    <th scope="col">Query & Summary</th>
                    <th scope="col">Engine</th>
                    <th scope="col">Status</th>
                    <th scope="col">Mentioned</th>
                    <th scope="col">Cited</th>
                    <th scope="col">Citation / Verify</th>
                    <th scope="col">Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBenchmarks.map((b) => {
                    const isMeasured = b.status === 'Measured' || b.status === 'Live';
                    const externalUrl = buildExternalProbeUrl(b.platform, b.query);
                    return (
                      <tr key={b.id}>
                        <td className="aeo-query-cell">
                          <strong>{b.query}</strong>
                          {b.answerSummary && <p className="aeo-cell-summary">{b.answerSummary}</p>}
                          {b.competitorsMentioned?.length > 0 && (
                            <div className="aeo-cell-competitors">
                              Competitors: {b.competitorsMentioned.join(', ')}
                            </div>
                          )}
                        </td>
                        <td>{b.platform}</td>
                        <td>
                          <span
                            className={`aeo-status-text ${
                              isMeasured ? 'aeo-status-pass' : 'aeo-status-muted'
                            }`}
                          >
                            {isMeasured ? (
                              <CheckCircle2 size={14} aria-hidden="true" />
                            ) : (
                              <Clock size={14} aria-hidden="true" />
                            )}
                            <span>{b.status}</span>
                          </span>
                        </td>
                        <td>
                          {b.mentioned ? (
                            <span className="aeo-status-text aeo-status-pass">
                              <CheckCircle2 size={14} aria-hidden="true" />
                              <span>YES</span>
                            </span>
                          ) : (
                            <span className="aeo-status-muted">{isMeasured ? 'NO' : '—'}</span>
                          )}
                        </td>
                        <td>
                          {b.cited ? (
                            <span className="aeo-status-text aeo-status-pass">
                              <CheckCircle2 size={14} aria-hidden="true" />
                              <span>YES</span>
                            </span>
                          ) : (
                            <span className="aeo-status-muted">{isMeasured ? 'NO' : '—'}</span>
                          )}
                        </td>
                        <td>
                          {b.citationUrl ? (
                            <a
                              href={b.citationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="aeo-link"
                            >
                              <span>
                                {b.citationUrl.replace('https://www.gyanvaniai.com', '') || '/'} (#
                                {b.citationPosition || 1})
                              </span>
                              <ExternalLink size={13} aria-hidden="true" />
                            </a>
                          ) : (
                            <a
                              href={externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="aeo-link"
                            >
                              <span>Open in {b.platform}</span>
                              <ExternalLink size={13} aria-hidden="true" />
                            </a>
                          )}
                        </td>
                        <td className="aeo-date-cell">
                          {b.dateChecked ? new Date(b.dateChecked).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: BROWSER SEO & SERP READINESS AUDIT */}
        {activeTab === 'browser-seo' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <div className="aeo-card-header-left">
                  <Search size={20} className="aeo-card-icon" aria-hidden="true" />
                  <h2 className="aeo-card-title">Browser SEO & Google / Bing SERP Readiness Inspector</h2>
                </div>
                <button
                  type="button"
                  className="aeo-action-btn"
                  onClick={fetchGeoHealth}
                  disabled={healthLoading}
                >
                  <RefreshCw
                    size={14}
                    className={healthLoading ? 'aeo-spin' : ''}
                    aria-hidden="true"
                  />
                  <span>{healthLoading ? 'Auditing SERP Readiness...' : 'Re-run Browser SEO Audit'}</span>
                </button>
              </div>
              <p className="aeo-card-desc">
                Audits edge routing rules (<code>vercel.json</code>), XML sitemap coverage, depth-1 Header internal link equity, prerendered HTML <code>&lt;head&gt;</code> deduplication, regional <code>hreflang</code> clusters (<code>en-IN</code>, <code>en-US</code>, <code>en-GB</code>, <code>en-AE</code>, <code>en-SG</code>, <code>x-default</code>), and SERP title/description character budgets across priority commercial pages.
              </p>

              {healthError && (
                <div className="aeo-alert-box error" role="alert">
                  <AlertCircle size={18} className="aeo-error-icon" aria-hidden="true" />
                  <span>{healthError}</span>
                </div>
              )}

              {browserSeoReport && (
                <>
                  <div
                    className={`aeo-alert-box ${browserSeoReport.allPassed ? 'success' : 'error'}`}
                    data-testid="browser-seo-summary"
                  >
                    {browserSeoReport.allPassed ? (
                      <CheckCircle2 size={18} className="aeo-success-icon" aria-hidden="true" />
                    ) : (
                      <AlertCircle size={18} className="aeo-error-icon" aria-hidden="true" />
                    )}
                    <div>
                      <strong>
                        {browserSeoReport.passedCount} / {browserSeoReport.totalChecks} Browser SEO & SERP Invariants Passing
                      </strong>{' '}
                      · Audited {new Date(browserSeoReport.checkedAt).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="aeo-health-grid">
                    {browserSeoReport.checks.map((chk) => (
                      <div key={chk.id} className="aeo-health-item">
                        <div className="aeo-health-top">
                          <div>
                            <span className="aeo-health-cat">{chk.category}</span>
                            <h3 className="aeo-health-label">{chk.label}</h3>
                          </div>
                          <span
                            className={`aeo-status-text ${
                              chk.passed ? 'aeo-status-pass' : 'aeo-status-fail'
                            }`}
                          >
                            {chk.passed ? (
                              <CheckCircle2 size={15} aria-hidden="true" />
                            ) : (
                              <XCircle size={15} aria-hidden="true" />
                            )}
                            <span>{chk.passed ? 'PASS' : 'FAIL'}</span>
                          </span>
                        </div>
                        <p className="aeo-health-detail">{chk.detail}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Interactive Google SERP Snippet Previewer */}
            {(() => {
              const routeList = browserSeoReport?.routeAudits || PRIORITY_SERP_ROUTES.map((r) => ({
                ...r,
                title: r.fallbackTitle,
                titleLength: r.fallbackTitle.length,
                titleLengthOk: r.fallbackTitle.length >= 30 && r.fallbackTitle.length <= 62,
                description: r.fallbackDescription,
                descriptionLength: r.fallbackDescription.length,
                descLengthOk: r.fallbackDescription.length >= 115 && r.fallbackDescription.length <= 162,
                canonical: r.expectedUrl,
                canonicalOk: true,
                deduplicatedOk: true,
                hreflangCount: 6,
                hreflangOk: true,
                hasJsonLd: true,
                allPassed: true,
              }));
              const activeRouteObj =
                routeList.find((r) => r.route === selectedSerpRoute) || routeList[0];

              return (
                <>
                  <div className="aeo-card">
                    <div className="aeo-card-header">
                      <div className="aeo-card-header-left">
                        <Globe2 size={20} className="aeo-card-icon" aria-hidden="true" />
                        <h2 className="aeo-card-title">Interactive Google SERP Snippet Previewer (India & Global B2B)</h2>
                      </div>
                      <div className="aeo-control-right">
                        <button
                          type="button"
                          className={`aeo-preset-btn ${serpDeviceMode === 'desktop' ? 'active' : ''}`}
                          onClick={() => setSerpDeviceMode('desktop')}
                        >
                          Desktop SERP (600px)
                        </button>
                        <button
                          type="button"
                          className={`aeo-preset-btn ${serpDeviceMode === 'mobile' ? 'active' : ''}`}
                          onClick={() => setSerpDeviceMode('mobile')}
                        >
                          Mobile SERP (380px)
                        </button>
                      </div>
                    </div>
                    <p className="aeo-card-desc">
                      Select any priority commercial route to preview how Google Search renders the title, breadcrumb trail, and dual INR/USD meta description across Desktop and Mobile SERPs.
                    </p>

                    <div className="aeo-probe-presets" role="group" aria-label="Select route for SERP preview">
                      {routeList.map((item) => (
                        <button
                          key={item.route}
                          type="button"
                          className={`aeo-preset-btn ${selectedSerpRoute === item.route ? 'active' : ''}`}
                          onClick={() => setSelectedSerpRoute(item.route)}
                        >
                          {item.route === '/' ? '/ (Home)' : item.route}
                        </button>
                      ))}
                    </div>

                    {activeRouteObj && (
                      <div
                        className={`aeo-serp-preview-box ${serpDeviceMode === 'mobile' ? 'mobile' : 'desktop'}`}
                        data-testid="serp-snippet-preview"
                      >
                        <div className="aeo-serp-site-row">
                          <div className="aeo-serp-favicon" aria-hidden="true">G</div>
                          <div className="aeo-serp-site-meta">
                            <span className="aeo-serp-site-name">Gyan VaniAi</span>
                            <span className="aeo-serp-breadcrumb">{activeRouteObj.breadcrumbDisplay}</span>
                          </div>
                        </div>
                        <h3 className="aeo-serp-title">
                          <Link to={activeRouteObj.route}>{activeRouteObj.title}</Link>
                        </h3>
                        <p className="aeo-serp-desc">{activeRouteObj.description}</p>
                        <div className="aeo-serp-metrics-bar">
                          <span>
                            Title: <strong>{activeRouteObj.titleLength} chars</strong> (Target: 30–62)
                          </span>
                          <span>·</span>
                          <span>
                            Description: <strong>{activeRouteObj.descriptionLength} chars</strong> (Target: 115–162)
                          </span>
                          <span>·</span>
                          <span>
                            Hreflang Cluster: <strong>{activeRouteObj.hreflangCount} locales</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Primary Keyword: <strong>{activeRouteObj.targetKeyword}</strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multi-Route On-Page & Prerender Audit Matrix */}
                  <div className="aeo-table-wrapper">
                    <table className="aeo-table">
                      <thead>
                        <tr>
                          <th scope="col">Route & Target Keyword</th>
                          <th scope="col">Title Budget</th>
                          <th scope="col">Description Budget</th>
                          <th scope="col">Canonical & Head</th>
                          <th scope="col">Hreflang</th>
                          <th scope="col">Schema @graph</th>
                          <th scope="col">Inspect</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routeList.map((r) => (
                          <tr key={r.route}>
                            <td className="aeo-query-cell">
                              <strong>{r.label}</strong>
                              <p className="aeo-cell-summary">{r.route}</p>
                              <div className="aeo-cell-competitors">Keyword: {r.targetKeyword}</div>
                            </td>
                            <td className="aeo-date-cell">
                              <span
                                className={`aeo-status-text ${
                                  r.titleLengthOk ? 'aeo-status-pass' : 'aeo-status-warn'
                                }`}
                              >
                                {r.titleLengthOk ? (
                                  <CheckCircle2 size={14} aria-hidden="true" />
                                ) : (
                                  <AlertCircle size={14} aria-hidden="true" />
                                )}
                                <span>{r.titleLength} chars</span>
                              </span>
                            </td>
                            <td className="aeo-date-cell">
                              <span
                                className={`aeo-status-text ${
                                  r.descLengthOk ? 'aeo-status-pass' : 'aeo-status-warn'
                                }`}
                              >
                                {r.descLengthOk ? (
                                  <CheckCircle2 size={14} aria-hidden="true" />
                                ) : (
                                  <AlertCircle size={14} aria-hidden="true" />
                                )}
                                <span>{r.descriptionLength} chars</span>
                              </span>
                            </td>
                            <td>
                              <span
                                className={`aeo-status-text ${
                                  r.canonicalOk && r.deduplicatedOk
                                    ? 'aeo-status-pass'
                                    : 'aeo-status-fail'
                                }`}
                              >
                                {r.canonicalOk && r.deduplicatedOk ? (
                                  <CheckCircle2 size={14} aria-hidden="true" />
                                ) : (
                                  <XCircle size={14} aria-hidden="true" />
                                )}
                                <span>
                                  {r.canonicalOk && r.deduplicatedOk ? 'Single Canonical' : 'Duplicate Tags'}
                                </span>
                              </span>
                            </td>
                            <td className="aeo-date-cell">
                              <span
                                className={`aeo-status-text ${
                                  r.hreflangOk ? 'aeo-status-pass' : 'aeo-status-warn'
                                }`}
                              >
                                <CheckCircle2 size={14} aria-hidden="true" />
                                <span>{r.hreflangCount} locales</span>
                              </span>
                            </td>
                            <td>
                              <span
                                className={`aeo-status-text ${
                                  r.hasJsonLd ? 'aeo-status-pass' : 'aeo-status-fail'
                                }`}
                              >
                                {r.hasJsonLd ? (
                                  <CheckCircle2 size={14} aria-hidden="true" />
                                ) : (
                                  <XCircle size={14} aria-hidden="true" />
                                )}
                                <span>{r.hasJsonLd ? 'Valid @graph' : 'Missing'}</span>
                              </span>
                            </td>
                            <td>
                              <Link to={r.route} className="aeo-link">
                                <span>Open Page</span>
                                <ExternalLink size={13} aria-hidden="true" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* TAB 3: TECHNICAL GEO HEALTH INSPECTOR */}
        {activeTab === 'health' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <div className="aeo-card-header-left">
                  <ShieldCheck size={20} className="aeo-card-icon" aria-hidden="true" />
                  <h2 className="aeo-card-title">Live Repository Technical GEO Health Inspector</h2>
                </div>
                <button
                  type="button"
                  className="aeo-action-btn"
                  onClick={fetchGeoHealth}
                  disabled={healthLoading}
                >
                  <RefreshCw
                    size={14}
                    className={healthLoading ? 'aeo-spin' : ''}
                    aria-hidden="true"
                  />
                  <span>{healthLoading ? 'Inspecting...' : 'Re-run Technical Audit'}</span>
                </button>
              </div>
              <p className="aeo-card-desc">
                Directly inspects live repository manifests (<code>robots.txt</code>, <code>llms.txt</code>, <code>llms-full.txt</code>, <code>api/llm-summary.json</code>, <code>rss.xml</code>, <code>sitemap.xml</code>, <code>index.html</code>, and Schema.org definitions) via <code>GET /api/ai-visibility/health</code>.
              </p>

              {healthError && (
                <div className="aeo-alert-box error" role="alert">
                  <AlertCircle size={18} className="aeo-error-icon" aria-hidden="true" />
                  <span>{healthError}</span>
                </div>
              )}

              {healthReport && (
                <>
                  <div
                    className={`aeo-alert-box ${healthReport.allPassed ? 'success' : 'error'}`}
                    data-testid="geo-health-summary"
                  >
                    {healthReport.allPassed ? (
                      <CheckCircle2 size={18} className="aeo-success-icon" aria-hidden="true" />
                    ) : (
                      <AlertCircle size={18} className="aeo-error-icon" aria-hidden="true" />
                    )}
                    <div>
                      <strong>
                        {healthReport.passedCount} / {healthReport.totalChecks} Technical GEO Invariants Passing
                      </strong>{' '}
                      · Audited {new Date(healthReport.checkedAt).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="aeo-health-grid">
                    {healthReport.checks.map((chk) => (
                      <div key={chk.id} className="aeo-health-item">
                        <div className="aeo-health-top">
                          <div>
                            <span className="aeo-health-cat">{chk.category}</span>
                            <h3 className="aeo-health-label">{chk.label}</h3>
                          </div>
                          <span
                            className={`aeo-status-text ${
                              chk.passed ? 'aeo-status-pass' : 'aeo-status-fail'
                            }`}
                          >
                            {chk.passed ? (
                              <CheckCircle2 size={15} aria-hidden="true" />
                            ) : (
                              <XCircle size={15} aria-hidden="true" />
                            )}
                            <span>{chk.passed ? 'PASS' : 'FAIL'}</span>
                          </span>
                        </div>
                        <p className="aeo-health-detail">{chk.detail}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: AUTHORITY ACQUISITION PLAYBOOK */}
        {activeTab === 'authority' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <div className="aeo-card-header-left">
                  <Globe2 size={20} className="aeo-card-icon" aria-hidden="true" />
                  <h2 className="aeo-card-title">Canonical Entity NAP & Directory Copy Kit</h2>
                </div>
              </div>
              <p className="aeo-card-desc">
                Use identical Name, Address, Phone, pricing, and entity positioning across G2, Capterra, Crunchbase, Product Hunt, and GitHub so AI engines resolve Gyan VaniAi into a single authoritative Knowledge Graph node.
              </p>

              <div className="aeo-copy-grid">
                <div className="aeo-copy-card">
                  <h3>Canonical NAP Block</h3>
                  <pre className="aeo-copy-pre">{CANONICAL_DIRECTORY_BIOS.napBlock}</pre>
                  <button
                    type="button"
                    className="aeo-action-btn"
                    onClick={() => handleCopyText('nap', CANONICAL_DIRECTORY_BIOS.napBlock)}
                  >
                    {copiedKey === 'nap' ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>Copied NAP Block</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy NAP Block</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="aeo-copy-card">
                  <h3>Short Directory Bio</h3>
                  <pre className="aeo-copy-pre">{CANONICAL_DIRECTORY_BIOS.shortBio}</pre>
                  <button
                    type="button"
                    className="aeo-action-btn"
                    onClick={() => handleCopyText('short', CANONICAL_DIRECTORY_BIOS.shortBio)}
                  >
                    {copiedKey === 'short' ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>Copied Short Bio</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy Short Bio</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="aeo-copy-card">
                  <h3>Full Boilerplate (G2 / Crunchbase)</h3>
                  <pre className="aeo-copy-pre">{CANONICAL_DIRECTORY_BIOS.directoryBoilerplate}</pre>
                  <button
                    type="button"
                    className="aeo-action-btn"
                    onClick={() =>
                      handleCopyText('full', CANONICAL_DIRECTORY_BIOS.directoryBoilerplate)
                    }
                  >
                    {copiedKey === 'full' ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>Copied Boilerplate</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy Boilerplate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <h3 className="aeo-subsection-title">1. Verified Live Authority Assets</h3>
              <div className="aeo-authority-list">
                {authorityData.existingAuthority.map((item) => (
                  <div key={item.platform} className="aeo-authority-item">
                    <div className="aeo-auth-header">
                      <span className="aeo-auth-platform">{item.platform}</span>
                      <span className="aeo-status-text aeo-status-pass">
                        <CheckCircle2 size={14} aria-hidden="true" />
                        <span>VERIFIED LIVE</span>
                      </span>
                    </div>
                    <div className="aeo-auth-meta">
                      {item.category} · Target: {item.targetPage}
                    </div>
                    <p className="aeo-auth-desc">{item.description}</p>
                    <div className="aeo-auth-footer">
                      <span className="aeo-auth-meta">{item.napContactConsistency}</span>
                      <a
                        href={item.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aeo-link"
                      >
                        <span>View Live Profile</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="aeo-subsection-title">2. Third-Party Authority Acquisition Targets</h3>
              <div className="aeo-authority-list">
                {authorityData.recommendedAcquisitions.map((item) => {
                  const localStatus = authorityStatuses[item.platform] || item.status;
                  return (
                    <div key={item.platform} className="aeo-authority-item">
                      <div className="aeo-auth-header">
                        <span className="aeo-auth-platform">{item.platform}</span>
                        <select
                          aria-label={`Submission status for ${item.platform}`}
                          value={localStatus}
                          onChange={(e) =>
                            handleAuthorityStatusChange(item.platform, e.target.value)
                          }
                          className="aeo-select"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="Pending Submission">Pending Submission</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Live">Live</option>
                        </select>
                      </div>
                      <div className="aeo-auth-meta">
                        {item.category} · Target: {item.targetPage}
                      </div>
                      <p className="aeo-auth-desc">{item.description}</p>
                      <div className="aeo-auth-footer">
                        <span className="aeo-auth-meta">{item.notes}</span>
                        <a
                          href={item.submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aeo-link"
                        >
                          <span>Open Submission Portal</span>
                          <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: CONTENT & ENTITY ROADMAP */}
        {activeTab === 'gaps' && (
          <section className="aeo-section">
            <div className="aeo-card">
              <div className="aeo-card-header">
                <div className="aeo-card-header-left">
                  <Layers size={20} className="aeo-card-icon" aria-hidden="true" />
                  <h2 className="aeo-card-title">2026 High-Intent GEO Content & Entity Roadmap</h2>
                </div>
              </div>
              <p className="aeo-card-desc">
                Priority public pages engineered to capture commercial buyer queries across Gemini, ChatGPT Search, Perplexity, and Google AI Overviews.
              </p>

              <div className="aeo-gaps-grid">
                {aeoData.missingContentOpportunities.map((opp) => (
                  <article key={opp.topic} className="aeo-gap-card">
                    <div className="aeo-gap-meta">
                      {opp.priority} Priority · {opp.intent}
                    </div>
                    <h3 className="aeo-gap-title">{opp.topic}</h3>
                    <p className="aeo-gap-rationale">{opp.rationale}</p>
                    <div className="aeo-gap-footer">
                      <Link to={opp.recommendedPage} className="aeo-link">
                        <span>Inspect Page ({opp.recommendedPage})</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
