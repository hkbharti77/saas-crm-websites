import React, { useState } from 'react';
import { Palette, RefreshCw, Lock, Check, Globe, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const {
    themeMode,
    setThemeMode,
    fixedTheme,
    setFixedTheme,
    themes,
    dailySchedule,
    isSavingGlobal,
    isGlobalSynced,
    lastSyncedAt,
    globalSyncError,
    updateGlobalTheme
  } = useTheme();

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const todayIndex = new Date().getDay();
  const todayItem = dailySchedule[todayIndex];
  const activeFixedThemeObj = themes.find(t => t.id === fixedTheme) || themes[0];

  const handleModeChange = async (newMode) => {
    const res = await setThemeMode(newMode);
    if (res?.success) {
      showToast(newMode === 'auto' ? 'Auto Daily Rotation enabled for all visitors!' : 'Fixed Enterprise Theme enabled for all visitors!');
    }
  };

  const handleSelectTheme = async (themeId) => {
    const res = await setFixedTheme(themeId);
    const chosen = themes.find(t => t.id === themeId);
    if (res?.success) {
      showToast(`Site theme locked to "${chosen?.name || themeId}" for all incoming visitors!`);
    }
  };

  const handleForceSync = async () => {
    const res = await updateGlobalTheme(themeMode, fixedTheme);
    if (res?.success) {
      showToast('Theme successfully published & synced live across entire website!');
    }
  };

  return (
    <div className="admin-theme-panel">
      {/* Header with Title and Global Sync Status */}
      <div className="admin-theme-header">
        <div className="admin-theme-title">
          <Palette size={20} style={{ color: 'var(--primary-color)' }} />
          <span>Enterprise Theme Management (Admin Control)</span>
        </div>

        <div className="admin-theme-status-group">
          {isSavingGlobal ? (
            <span className="theme-sync-badge saving">
              <RefreshCw size={13} className="theme-spin-icon" />
              <span>Broadcasting to Live Site...</span>
            </span>
          ) : isGlobalSynced ? (
            <span className="theme-sync-badge synced" title={lastSyncedAt ? `Last synced: ${lastSyncedAt.toLocaleTimeString()}` : 'Connected to live database'}>
              <Globe size={13} />
              <span>Active For All Visitors</span>
            </span>
          ) : null}

          <button
            type="button"
            onClick={handleForceSync}
            disabled={isSavingGlobal}
            className="theme-sync-btn"
            title="Publish and re-sync current enterprise theme to all live website visitors"
          >
            <RefreshCw size={12} className={isSavingGlobal ? 'theme-spin-icon' : ''} />
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Global Audience Banner */}
      <div className="admin-theme-global-banner">
        <div className="admin-theme-banner-icon">
          <Globe size={16} />
        </div>
        <div className="admin-theme-banner-text">
          {themeMode === 'auto' ? (
            <>
              <strong>Auto Daily Rotation Active:</strong> Every visitor arriving at your website across all devices automatically sees today&apos;s theme (<strong>{todayItem.name}</strong>). Themes rotate daily at 12:00 AM midnight.
            </>
          ) : (
            <>
              <strong>Fixed Enterprise Theme Active:</strong> All visitors arriving at your website across all pages and devices are locked to <strong>{activeFixedThemeObj.name}</strong>.
            </>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="theme-toast-banner">
          <Check size={15} style={{ color: '#10b981', flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Banner */}
      {globalSyncError && (
        <div className="theme-error-banner">
          <AlertCircle size={15} style={{ color: '#ef4444', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <span>{globalSyncError}</span>
          </div>
          <button type="button" onClick={handleForceSync} className="theme-retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Mode Selection */}
      <div className="theme-mode-toggle">
        <button
          type="button"
          className={`theme-mode-btn ${themeMode === 'auto' ? 'active' : ''}`}
          onClick={() => handleModeChange('auto')}
          disabled={isSavingGlobal}
        >
          <RefreshCw size={16} />
          <span>Auto Daily Rotation</span>
        </button>

        <button
          type="button"
          className={`theme-mode-btn ${themeMode === 'fixed' ? 'active' : ''}`}
          onClick={() => handleModeChange('fixed')}
          disabled={isSavingGlobal}
        >
          <Lock size={16} />
          <span>Fixed Enterprise Theme</span>
        </button>
      </div>

      {/* Auto Rotation Schedule Display */}
      {themeMode === 'auto' && (
        <div className="auto-theme-schedule">
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            🔄 Active Schedule: Automatically switches theme every day of the week for all visitors
          </div>
          <div className="schedule-grid">
            {dailySchedule.map((item, idx) => {
              const isToday = idx === todayIndex;
              return (
                <div key={item.day} className={`schedule-day-card ${isToday ? 'today' : ''}`}>
                  <span className="schedule-day-name">{item.day} {isToday ? '(Active Today)' : ''}</span>
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
            📌 Select Fixed Enterprise Theme (Locks across entire site for all visitors):
          </div>
          <div className="fixed-themes-grid">
            {themes.map((t) => {
              const isSelected = fixedTheme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`fixed-theme-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectTheme(t.id)}
                  disabled={isSavingGlobal}
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
