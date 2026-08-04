import React from 'react';
import { Palette, RefreshCw, Lock, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const {
    theme,
    themeMode,
    setThemeMode,
    fixedTheme,
    setFixedTheme,
    themes,
    dailySchedule
  } = useTheme();

  const todayIndex = new Date().getDay();

  return (
    <div className="admin-theme-panel">
      <div className="admin-theme-title">
        <Palette size={20} style={{ color: 'var(--primary-color)' }} />
        <span>Enterprise Theme Management (Admin Control)</span>
      </div>

      {/* Mode Selection */}
      <div className="theme-mode-toggle">
        <button
          className={`theme-mode-btn ${themeMode === 'auto' ? 'active' : ''}`}
          onClick={() => setThemeMode('auto')}
        >
          <RefreshCw size={16} />
          <span>Auto Daily Rotation</span>
        </button>

        <button
          className={`theme-mode-btn ${themeMode === 'fixed' ? 'active' : ''}`}
          onClick={() => setThemeMode('fixed')}
        >
          <Lock size={16} />
          <span>Fixed Enterprise Theme</span>
        </button>
      </div>

      {/* Auto Rotation Schedule Display */}
      {themeMode === 'auto' && (
        <div className="auto-theme-schedule">
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            🔄 Active Schedule: Automatically switches theme every day of the week
          </div>
          <div className="schedule-grid">
            {dailySchedule.map((item, idx) => {
              const isToday = idx === todayIndex;
              return (
                <div key={item.day} className={`schedule-day-card ${isToday ? 'today' : ''}`}>
                  <span className="schedule-day-name">{item.day} {isToday ? '(Today)' : ''}</span>
                  <span className="schedule-theme-name">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fixed Theme Selector */}
      {themeMode === 'fixed' && (
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            📌 Select Fixed Enterprise Theme (Locks across entire site):
          </div>
          <div className="fixed-themes-grid">
            {themes.map((t) => {
              const isSelected = fixedTheme === t.id;
              return (
                <button
                  key={t.id}
                  className={`fixed-theme-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setFixedTheme(t.id)}
                >
                  <div className="fixed-theme-dots">
                    <span className="fixed-dot-base" style={{ background: t.color }}></span>
                    <span className="fixed-dot-accent" style={{ background: t.accent }}></span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{t.description}</div>
                  </div>
                  {isSelected && <Check size={18} style={{ color: 'var(--primary-color)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
