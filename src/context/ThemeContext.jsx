import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BACKEND_URL } from '../config/apiConfig';

const THEMES = [
  { id: 'midnight', name: 'Enterprise Midnight', color: '#070b12', accent: '#2dd4bf', description: 'Deep ink with teal accents' },
  { id: 'aurora', name: 'Aurora AI Glass', color: '#031816', accent: '#10b981', description: 'Forest green operational mesh' },
  { id: 'slate', name: 'Corporate Slate', color: '#0f172a', accent: '#38bdf8', description: 'Steel slate with sky accents' },
  { id: 'quantum', name: 'Quantum Cyan Tech', color: '#021820', accent: '#22d3ee', description: 'Deep aqua for technical focus' },
  { id: 'amber', name: 'Sunset Amber Tech', color: '#140d06', accent: '#f59e0b', description: 'Warm amber on dark bronze' },
  { id: 'light', name: 'Light Pearl Enterprise', color: '#f0f3f6', accent: '#0f766e', description: 'Clean light with teal primary' },
  { id: 'sapphire', name: 'Cobalt Enterprise', color: '#07101f', accent: '#60a5fa', description: 'Deep cobalt for formal brand surfaces' }
];

// 7-day automatic daily theme rotation schedule (Sun = 0 to Sat = 6) - 7 distinct themes for 7 days
const DAILY_SCHEDULE = [
  { day: 'Sunday', themeId: 'amber', name: 'Sunset Amber Tech' },
  { day: 'Monday', themeId: 'aurora', name: 'Aurora AI Glass' },
  { day: 'Tuesday', themeId: 'slate', name: 'Corporate Slate' },
  { day: 'Wednesday', themeId: 'quantum', name: 'Quantum Cyan Tech' },
  { day: 'Thursday', themeId: 'light', name: 'Light Pearl Enterprise' },
  { day: 'Friday', themeId: 'midnight', name: 'Enterprise Midnight' },
  { day: 'Saturday', themeId: 'sapphire', name: 'Cobalt Enterprise' }
];

const VISITOR_OVERRIDE_KEY = 'app-theme-visitor-override';

function safeStorageGet(key) {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or sandboxed iframe security errors
  }
}

function getTodayAutoTheme() {
  const dayIndex = new Date().getDay();
  return DAILY_SCHEDULE[dayIndex].themeId;
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme mode: 'auto' (7-day daily rotation) or 'fixed' (admin/user choice)
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = safeStorageGet('app-theme-mode');
    return savedMode === 'auto' || savedMode === 'fixed' ? savedMode : 'fixed';
  });

  const [fixedTheme, setFixedTheme] = useState(() => {
    const savedTheme = safeStorageGet('app-fixed-theme');
    if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
      return savedTheme;
    }
    return 'midnight';
  });

  const [hasVisitorOverride, setHasVisitorOverride] = useState(
    () => safeStorageGet(VISITOR_OVERRIDE_KEY) === 'true'
  );
  const [todayAutoTheme, setTodayAutoTheme] = useState(() => getTodayAutoTheme());
  const [isGlobalSynced, setIsGlobalSynced] = useState(false);
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [globalSyncError, setGlobalSyncError] = useState(null);

  // Sync default theme from GyanVaniAi Admin CMS Backend API unless visitor set a local preference
  useEffect(() => {
    if (!BACKEND_URL) return;
    const backendUrl = BACKEND_URL;

    const fetchTheme = async () => {
      // Respect explicit visitor theme selection across reloads, focus, and polling
      if (hasVisitorOverride || safeStorageGet(VISITOR_OVERRIDE_KEY) === 'true') {
        return;
      }

      try {
        const res = await fetch(`${backendUrl}/api/public/site-settings/theme`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && (data.themeMode || data.fixedTheme)) {
          if (safeStorageGet(VISITOR_OVERRIDE_KEY) === 'true') {
            return;
          }
          if (data.themeMode === 'auto' || data.themeMode === 'fixed') {
            setThemeMode(data.themeMode);
            safeStorageSet('app-theme-mode', data.themeMode);
          }
          if (data.fixedTheme && THEMES.some((t) => t.id === data.fixedTheme)) {
            setFixedTheme(data.fixedTheme);
            safeStorageSet('app-fixed-theme', data.fixedTheme);
          }
          setIsGlobalSynced(true);
          if (data.updatedAt) {
            setLastSyncedAt(new Date(data.updatedAt));
          }
        }
      } catch {
        // Fall back gracefully to cached theme in localStorage
      }
    };

    fetchTheme();

    // Check periodically (every 60s) or on window focus for visitors using CMS default
    const interval = setInterval(fetchTheme, 60000);
    const onFocus = () => fetchTheme();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [hasVisitorOverride]);

  // Calculate effective active theme
  const activeTheme = themeMode === 'auto' ? todayAutoTheme : fixedTheme;

  // Save theme settings locally for visitor or picker selection
  const updateGlobalTheme = useCallback(async (newMode, newThemeId) => {
    const targetMode = newMode || themeMode;
    const targetTheme = newThemeId || fixedTheme;

    setHasVisitorOverride(true);
    safeStorageSet(VISITOR_OVERRIDE_KEY, 'true');

    setThemeMode(targetMode);
    if (newThemeId) setFixedTheme(targetTheme);
    safeStorageSet('app-theme-mode', targetMode);
    if (newThemeId) safeStorageSet('app-fixed-theme', targetTheme);

    setIsSavingGlobal(true);
    setGlobalSyncError(null);
    setIsGlobalSynced(true);
    setLastSyncedAt(new Date());
    setIsSavingGlobal(false);
    return { success: true };
  }, [themeMode, fixedTheme]);

  const selectTheme = useCallback((themeId) => {
    if (!THEMES.some((t) => t.id === themeId)) return;
    setHasVisitorOverride(true);
    safeStorageSet(VISITOR_OVERRIDE_KEY, 'true');
    setThemeMode('fixed');
    setFixedTheme(themeId);
    safeStorageSet('app-theme-mode', 'fixed');
    safeStorageSet('app-fixed-theme', themeId);
  }, []);

  // Update DOM attributes for theme styling
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', activeTheme);
    body.setAttribute('data-theme', activeTheme);

    if (activeTheme === 'light') {
      root.classList.remove('dark');
      body.classList.remove('dark-theme');
      safeStorageSet('theme', 'light');
    } else {
      root.classList.add('dark');
      body.classList.add('dark-theme');
      safeStorageSet('theme', 'dark');
    }

    safeStorageSet('app-theme-mode', themeMode);
    safeStorageSet('app-fixed-theme', fixedTheme);
  }, [themeMode, fixedTheme, activeTheme]);

  // Keep React state synced when auto theme rotates across midnight
  useEffect(() => {
    if (themeMode !== 'auto') return;
    const interval = setInterval(() => {
      setTodayAutoTheme(getTodayAutoTheme());
    }, 60000 * 30);

    return () => clearInterval(interval);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        themeMode,
        setThemeMode: (mode) => updateGlobalTheme(mode, fixedTheme),
        fixedTheme,
        setFixedTheme: (themeId) => updateGlobalTheme('fixed', themeId),
        updateGlobalTheme,
        selectTheme,
        themes: THEMES,
        dailySchedule: DAILY_SCHEDULE,
        todayAutoTheme,
        isGlobalSynced,
        isSavingGlobal,
        lastSyncedAt,
        globalSyncError,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
