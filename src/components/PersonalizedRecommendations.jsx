import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, RefreshCw, Bookmark } from 'lucide-react';
import { getRecentViews, clearPersonalizationData } from '../utils/personalizationEngine';

export default function PersonalizedRecommendations({ _blogs = [] }) {
  const [recentList, setRecentList] = useState(() => getRecentViews());

  const handleReset = () => {
    clearPersonalizationData();
    setRecentList([]);
  };

  if (!recentList || recentList.length === 0) {
    return null; // Silent fallback: when no reading history exists, main homepage feed shows Latest/Popular
  }

  return (
    <section className="personalized-recommendations-widget" style={{
      marginBottom: '2.5rem',
      padding: '1.5rem 1.75rem',
      background: 'color-mix(in srgb, var(--primary-color) 4%, var(--bg-card))',
      border: '1px solid color-mix(in srgb, var(--primary-color) 20%, var(--border-color))',
      borderRadius: 'var(--radius-lg, 16px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bookmark size={18} style={{ color: 'var(--primary-color)' }} />
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '750', color: 'var(--text-primary)' }}>Recently Viewed</h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: 'transparent', border: 'none', color: 'var(--text-muted)',
            fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600',
          }}
          title="Reset reading history"
        >
          <RefreshCw size={13} /> Reset Preferences
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {recentList.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            to={`/blog/${item.slugId || item.id}`}
            style={{
              padding: '0.85rem 1rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',

              transition: 'transform 0.15s, border-color 0.15s',
            }}
            className="recent-view-card"
          >
            <div>
              {item.category && (
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>
                  {item.category}
                </span>
              )}
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0.3rem 0 0.5rem 0', lineHeight: 1.35, color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={11} /> Viewed recently
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
