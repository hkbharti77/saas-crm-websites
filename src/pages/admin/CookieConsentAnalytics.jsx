import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import './CookieConsentAnalytics.css';

const STATUS_LABELS = {
  all: 'Accept All',
  essential: 'Essential Only',
  rejected: 'Reject All',
  custom: 'Custom',
};

const STATUS_COLORS = {
  all: 'var(--primary-color)',
  essential: '#f59e0b',
  rejected: '#ef4444',
  custom: '#8b5cf6',
};

export default function CookieConsentAnalytics() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConsents() {
      try {
        const q = query(collection(db, 'cookie_consents'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError('Failed to load consent data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchConsents();
  }, []);

  const total = records.length;
  const counts = records.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const pct = (key) => (total ? Math.round((counts[key] || 0) / total * 100) : 0);

  if (loading) {
    return (
      <div className="cca-card">
        <div className="cca-loading">Loading consent analytics…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cca-card">
        <div className="cca-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="cca-card">
      <div className="cca-card-header">
        <div className="cca-title-group">
          <span className="cca-icon">🍪</span>
          <div>
            <h3 className="cca-title">Cookie Consent Analytics</h3>
            <p className="cca-subtitle">{total} total consent events recorded</p>
          </div>
        </div>
      </div>

      {total === 0 ? (
        <p className="cca-empty">No consent events recorded yet. Events appear when users interact with the cookie banner.</p>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="cca-stats-grid">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <div className="cca-stat-card" key={key} style={{ '--accent': STATUS_COLORS[key] }}>
                <div className="cca-stat-count">{counts[key] || 0}</div>
                <div className="cca-stat-label">{label}</div>
                <div className="cca-stat-pct">{pct(key)}%</div>
                <div className="cca-bar-track">
                  <div className="cca-bar-fill" style={{ width: `${pct(key)}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Events Table */}
          <div className="cca-recent-header">
            <h4 className="cca-recent-title">Recent Consent Events</h4>
          </div>
          <div className="cca-table-wrapper">
            <table className="cca-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>IP Address</th>
                  <th>Location</th>
                  <th>ISP / Org</th>
                  <th>Analytics</th>
                  <th>Marketing</th>
                  <th>Date / Time</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 50).map((r, i) => {
                  const ts = r.createdAt?.toDate?.();
                  return (
                    <tr key={r.id}>
                      <td className="cca-row-num">{i + 1}</td>
                      <td>
                        <span
                          className="cca-status-badge"
                          style={{ '--accent': STATUS_COLORS[r.status] || '#64748b' }}
                        >
                          {STATUS_LABELS[r.status] || r.status}
                        </span>
                      </td>
                      <td className="cca-mono">{r.ip || '—'}</td>
                      <td className="cca-location">
                        {[r.city, r.region, r.country].filter(Boolean).join(', ') || '—'}
                      </td>
                      <td className="cca-isp">{r.isp ? r.isp.replace(/^AS\d+\s+/, '') : '—'}</td>
                      <td className={r.preferences?.analytics ? 'cca-yes' : 'cca-no'}>
                        {r.preferences?.analytics ? '✓ Yes' : '✗ No'}
                      </td>
                      <td className={r.preferences?.marketing ? 'cca-yes' : 'cca-no'}>
                        {r.preferences?.marketing ? '✓ Yes' : '✗ No'}
                      </td>
                      <td className="cca-date">
                        {ts
                          ? ts.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                          : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
