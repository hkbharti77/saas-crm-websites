import React, { useState, useId } from 'react';
import { 
  Zap, 
  BarChart2, 
  ChevronDown, 
  ShieldCheck, 
  GitFork, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Send,
  Lock,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './MetaInteractiveSandbox.css';

const TIER_CONFIG = {
  tier1: { label: 'Tier 1 (1k msg/day)', speed: 1000 },
  tier2: { label: 'Tier 2 (10k msg/day)', speed: 10000 },
  tier3: { label: 'Tier 3 (100k msg/day)', speed: 40000 },
  tier4: { label: 'Tier 4 (Unlimited msgs/day)', speed: 100000 },
};

export default function MetaInteractiveSandbox({ onBookDemo }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState('campaign'); // 'campaign' | 'hsm' | 'readiness'
  
  // Simulator State
  const [audience, setAudience] = useState(25000);
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'instagram'
  const [tier, setTier] = useState('tier2');

  const audienceInputId = useId();
  const tierSelectId = useId();

  // HSM Sandbox State
  const [selectedHsm, setSelectedHsm] = useState('marketing');
  const [hsmRecipientName, setHsmRecipientName] = useState('Alex Morgan');
  const [hsmDiscountCode, setHsmDiscountCode] = useState('VIP25');
  const [testSent, setTestSent] = useState(false);

  // Dynamic Calculations
  const currentSpeed = TIER_CONFIG[tier]?.speed || 10000;
  const openRate = channel === 'whatsapp' ? 0.98 : 0.78;
  const engagementRate = channel === 'whatsapp' ? 0.42 : 0.28;

  const estimatedOpens = Math.round(audience * openRate);
  const estimatedClicks = Math.round(audience * engagementRate);

  // Time in minutes: (audience / speed) * 60
  const estimatedDispatchMinutes = Math.max(1, Math.round((audience / currentSpeed) * 60));

  // Range slider background gradient percentage
  const minAudience = 1000;
  const maxAudience = 200000;
  const sliderPercent = Math.min(
    100,
    Math.max(0, ((audience - minAudience) / (maxAudience - minAudience)) * 100)
  );

  const handleSendHsmTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3500);
  };

  return (
    <div className="meta-sandbox-container" id="meta-sandbox">
      <div className="meta-sandbox-glow" aria-hidden="true" />

      {/* Header with Title and Segmented Tab Controls */}
      <div className="meta-sandbox-header">
        <div>
          <div className="meta-sandbox-eyebrow">
            <Zap size={14} className="fill-current" />
            <span>Live Meta Interactive Sandbox</span>
          </div>
          <h2 className="meta-sandbox-title">
            Test WhatsApp &amp; Instagram Integration Tools
          </h2>
        </div>

        {/* Tab Switcher Pills */}
        <div className="meta-sandbox-tabs" role="tablist" aria-label="Meta Sandbox Tool Tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'campaign'}
            className={`meta-sandbox-tab-btn ${activeTab === 'campaign' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaign')}
          >
            Campaign Simulator
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'hsm'}
            className={`meta-sandbox-tab-btn ${activeTab === 'hsm' ? 'active' : ''}`}
            onClick={() => setActiveTab('hsm')}
          >
            HSM &amp; DM Sandbox
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'readiness'}
            className={`meta-sandbox-tab-btn ${activeTab === 'readiness' ? 'active' : ''}`}
            onClick={() => setActiveTab('readiness')}
          >
            Tech Provider Readiness
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: CAMPAIGN SIMULATOR (FAITHFULLY MATCHING REFERENCE IMAGE)
          ========================================================================= */}
      {activeTab === 'campaign' && (
        <div className="meta-sandbox-grid">
          {/* Left Column: Interactive Sliders and Pickers */}
          <div className="meta-control-card">
            
            {/* Target Audience Slider */}
            <div className="meta-slider-group">
              <div className="meta-slider-header">
                <label htmlFor={audienceInputId} className="meta-control-label">
                  Target Audience Size (Recipients)
                </label>
                <span className="meta-audience-val" aria-live="polite">
                  {audience.toLocaleString()} users
                </span>
              </div>

              <input
                id={audienceInputId}
                type="range"
                min={minAudience}
                max={maxAudience}
                step={1000}
                value={audience}
                onChange={(e) => setAudience(Number(e.target.value))}
                className="meta-range-slider"
                style={{
                  background: isLight
                    ? `linear-gradient(to right, var(--primary-color, #0f766e) ${sliderPercent}%, #cbd5e1 ${sliderPercent}%)`
                    : `linear-gradient(to right, #06b6d4 ${sliderPercent}%, #334155 ${sliderPercent}%)`
                }}
                aria-label="Target Audience Size in Recipients"
              />

              <div className="meta-slider-ticks" aria-hidden="true">
                <span>1,000</span>
                <span>50,000</span>
                <span>100,000</span>
                <span>200,000+</span>
              </div>
            </div>

            {/* Channel & Tier Controls Row */}
            <div className="meta-controls-row">
              {/* Broadcast Channel Toggle */}
              <div className="meta-channel-group">
                <span className="meta-control-label">Broadcast Channel</span>
                <div className="meta-channel-buttons">
                  <button
                    type="button"
                    className={`meta-channel-btn whatsapp ${channel === 'whatsapp' ? 'active' : ''}`}
                    onClick={() => setChannel('whatsapp')}
                    aria-pressed={channel === 'whatsapp'}
                  >
                    {/* Official WhatsApp SVG Icon */}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className={`meta-channel-btn instagram ${channel === 'instagram' ? 'active' : ''}`}
                    onClick={() => setChannel('instagram')}
                    aria-pressed={channel === 'instagram'}
                  >
                    {/* Official Instagram SVG Icon */}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span>Instagram</span>
                  </button>
                </div>
              </div>

              {/* Meta Throughput Tier Dropdown */}
              <div className="meta-tier-group">
                <label htmlFor={tierSelectId} className="meta-control-label">
                  Meta Throughput Tier
                </label>
                <div className="meta-tier-select-wrap">
                  <select
                    id={tierSelectId}
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="meta-tier-select"
                  >
                    <option value="tier1">Tier 1 (1k msg/day)</option>
                    <option value="tier2">Tier 2 (10k msg/day)</option>
                    <option value="tier3">Tier 3 (100k msg/day)</option>
                    <option value="tier4">Tier 4 (Unlimited msg/day)</option>
                  </select>
                  <ChevronDown size={16} className="meta-tier-chevron" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Broadcast Simulation Result Card */}
          <div className="meta-result-card" aria-label="Live Broadcast Simulation Result">
            <div className="meta-result-header">
              <div className="meta-result-title">
                <BarChart2 size={16} />
                <span>Live Broadcast Simulation Result</span>
              </div>
              <div className="meta-sync-badge">
                <span className="meta-sync-dot" />
                <span>Meta Cloud Synced</span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="meta-metric-boxes">
              <div className="meta-metric-box">
                <span className="meta-metric-label">Estimated Message Opens</span>
                <span className="meta-metric-number">{estimatedOpens.toLocaleString()}</span>
                <span className="meta-metric-sub">
                  ({Math.round(openRate * 100)}% Open Rate)
                </span>
              </div>

              <div className="meta-metric-box">
                <span className="meta-metric-label">Estimated Clicks / Replies</span>
                <span className="meta-metric-number">{estimatedClicks.toLocaleString()}</span>
                <span className="meta-metric-sub">
                  ({Math.round(engagementRate * 100)}% Engagement)
                </span>
              </div>
            </div>

            {/* Key Value Details Rows */}
            <div className="meta-result-rows">
              <div className="meta-result-row">
                <span className="meta-row-label">Dispatch Speed:</span>
                <span className="meta-row-value">{currentSpeed.toLocaleString()} msgs / hr</span>
              </div>

              <div className="meta-result-row">
                <span className="meta-row-label">Est. Broadcast Dispatch Time:</span>
                <span className="meta-row-value">{estimatedDispatchMinutes} minutes</span>
              </div>

              <div className="meta-result-row">
                <span className="meta-row-label">Meta Rate Limit Status:</span>
                <span className="meta-row-value status-cyan">
                  100% Compliant (Redis Token Bucket)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: HSM & DM SANDBOX (INTERACTIVE TEMPLATE PREVIEW & COEXISTENCE TEST)
          ========================================================================= */}
      {activeTab === 'hsm' && (
        <div className="meta-hsm-container">
          <div className="meta-hsm-selector">
            <span className="meta-control-label">Select Meta HSM Template to Test:</span>
            
            <div className="meta-hsm-template-list">
              <button
                type="button"
                className={`meta-hsm-template-btn ${selectedHsm === 'marketing' ? 'active' : ''}`}
                onClick={() => setSelectedHsm('marketing')}
              >
                <span className="meta-hsm-template-tag">Marketing HSM</span>
                <div className="meta-hsm-template-name">VIP Cart Recovery &amp; Promo Code</div>
              </button>

              <button
                type="button"
                className={`meta-hsm-template-btn ${selectedHsm === 'utility' ? 'active' : ''}`}
                onClick={() => setSelectedHsm('utility')}
              >
                <span className="meta-hsm-template-tag">Utility HSM</span>
                <div className="meta-hsm-template-name">Live Delivery &amp; Tracking Update</div>
              </button>

              <button
                type="button"
                className={`meta-hsm-template-btn ${selectedHsm === 'auth' ? 'active' : ''}`}
                onClick={() => setSelectedHsm('auth')}
              >
                <span className="meta-hsm-template-tag">Authentication HSM</span>
                <div className="meta-hsm-template-name">One-Time Password (OTP) 2FA Verification</div>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <label className="meta-control-label" style={{ fontSize: '0.8rem' }}>
                Recipient Name Variable {'{{1}}'}:
              </label>
              <input
                type="text"
                value={hsmRecipientName}
                onChange={(e) => setHsmRecipientName(e.target.value)}
                className="meta-tier-select"
                style={{ padding: '0.5rem 0.75rem' }}
              />
            </div>
          </div>

          {/* WhatsApp Chat Preview */}
          <div className="meta-chat-mockup">
            <div className="meta-chat-bubble">
              <div className="meta-chat-badge">
                <ShieldCheck size={14} />
                <span>Official Business Account</span>
              </div>
              
              {selectedHsm === 'marketing' && (
                <>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Hi {hsmRecipientName || 'there'}! 🎉 Your VIP cart is waiting.
                  </p>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.82rem', opacity: 0.9 }}>
                    Use code <strong>{hsmDiscountCode}</strong> within the next 2 hours to get free express dispatch on your order.
                  </p>
                  <div className="meta-chat-button-row">
                    <button type="button" className="meta-chat-action-btn">
                      Claim {hsmDiscountCode} Promo →
                    </button>
                    <button type="button" className="meta-chat-action-btn">
                      Chat with Rep
                    </button>
                  </div>
                </>
              )}

              {selectedHsm === 'utility' && (
                <>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Order #GV-8491 Dispatched! 🚚
                  </p>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.82rem', opacity: 0.9 }}>
                    Hello {hsmRecipientName || 'Customer'}, your package is out for delivery. Real-time ETA: Today by 4:30 PM.
                  </p>
                  <div className="meta-chat-button-row">
                    <button type="button" className="meta-chat-action-btn">
                      Live GPS Tracking →
                    </button>
                  </div>
                </>
              )}

              {selectedHsm === 'auth' && (
                <>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Gyan VaniAi Security Code: <strong>948-210</strong>
                  </p>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.82rem', opacity: 0.9 }}>
                    Never share this passcode with anyone. Valid for 10 minutes.
                  </p>
                  <div className="meta-chat-button-row">
                    <button type="button" className="meta-chat-action-btn">
                      Copy Code
                    </button>
                  </div>
                </>
              )}

              <div className="meta-chat-footer">
                <span>10:42 AM</span>
                <span style={{ color: '#53bdeb' }}>✓✓ Delivered &amp; Read</span>
              </div>
            </div>

            {/* Test Simulation Button & Live Telemetry */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="meta-channel-btn whatsapp active"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                onClick={handleSendHsmTest}
              >
                <Send size={15} />
                <span>{testSent ? 'Packet Dispatched (180ms) ✓' : 'Dispatch Test HSM Event'}</span>
              </button>

              <span style={{ fontSize: '0.75rem', color: testSent ? '#25D366' : '#94a3b8' }}>
                {testSent ? '● Dual Fanout Synced to Phone & CRM' : 'Meta Cloud API v20.0 Ready'}
              </span>
            </div>

            <div className="meta-telemetry-badge-grid">
              <div className="meta-telemetry-item">
                <span>Mobile App Status</span>
                <strong>Mirrored to Phone (0.2s)</strong>
              </div>
              <div className="meta-telemetry-item">
                <span>Gyan VaniAi CRM Pipeline</span>
                <strong>Lead Logged into Pipeline</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: TECH PROVIDER READINESS DIAGNOSTIC
          ========================================================================= */}
      {activeTab === 'readiness' && (
        <div>
          <div className="meta-readiness-grid">
            
            <div className="meta-readiness-item">
              <div className="meta-readiness-head">
                <div className="meta-readiness-icon-wrap">
                  <GitFork size={18} />
                </div>
                <span className="meta-readiness-status">✓ 100% OPERATIONAL</span>
              </div>
              <h3 className="meta-readiness-title">WABA Dual Coexistence Hook</h3>
              <p className="meta-readiness-desc">
                Enables simultaneous mobile app operation and CRM Cloud API automation on the same phone number without packet collision.
              </p>
            </div>

            <div className="meta-readiness-item">
              <div className="meta-readiness-head">
                <div className="meta-readiness-icon-wrap">
                  <Cpu size={18} />
                </div>
                <span className="meta-readiness-status">✓ COMPLIANT</span>
              </div>
              <h3 className="meta-readiness-title">Redis Token Bucket Limiter</h3>
              <p className="meta-readiness-desc">
                Distributed queuing engine dynamically meters broadcast bursts against Meta API limits to protect your number from rate-limiting.
              </p>
            </div>

            <div className="meta-readiness-item">
              <div className="meta-readiness-head">
                <div className="meta-readiness-icon-wrap">
                  <Lock size={18} />
                </div>
                <span className="meta-readiness-status">✓ E2E SECURE</span>
              </div>
              <h3 className="meta-readiness-title">Signal Protocol &amp; TLS 1.3</h3>
              <p className="meta-readiness-desc">
                End-to-end Signal encryption maintained on phone handsets paired with ISO-27001 / SOC-2 Type II encrypted cloud webhook infrastructure.
              </p>
            </div>

            <div className="meta-readiness-item">
              <div className="meta-readiness-head">
                <div className="meta-readiness-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <span className="meta-readiness-status">✓ PRE-QUALIFIED</span>
              </div>
              <h3 className="meta-readiness-title">Meta Green Tick Verification</h3>
              <p className="meta-readiness-desc">
                Official Business Account badge assistance with Meta Business Manager identity approval and guaranteed zero-downtime onboarding.
              </p>
            </div>

          </div>

          <div className="meta-readiness-footer">
            <div className="meta-readiness-score">
              <div className="meta-score-circle">100%</div>
              <div>
                <span style={{ display: 'block', fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                  Meta Cloud API Coexistence Verified
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Enterprise throughput ready up to 250,000+ daily contacts
                </span>
              </div>
            </div>

            {onBookDemo && (
              <button
                type="button"
                className="meta-readiness-cta-btn"
                onClick={onBookDemo}
              >
                <span>Request Enterprise Setup</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
