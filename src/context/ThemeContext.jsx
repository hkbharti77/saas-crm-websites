import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

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

function getTodayAutoTheme() {
  const dayIndex = new Date().getDay();
  return DAILY_SCHEDULE[dayIndex].themeId;
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme mode: 'auto' (7-day daily rotation) or 'fixed' (admin/user choice)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('app-theme-mode');
      return savedMode ? savedMode : 'fixed';
    }
    return 'fixed';
  });

  const [fixedTheme, setFixedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-fixed-theme');
      if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
        return savedTheme;
      }
    }
    return 'midnight';
  });

  const [isGlobalSynced, setIsGlobalSynced] = useState(false);
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [globalSyncError, setGlobalSyncError] = useState(null);

  // Real-time Firestore sync: Any visitor anywhere automatically receives the theme chosen by the admin
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const themeDocRef = doc(db, 'site_settings', 'theme');
      unsubscribe = onSnapshot(
        themeDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data.themeMode === 'auto' || data.themeMode === 'fixed') {
              setThemeMode(data.themeMode);
              if (typeof window !== 'undefined') {
                localStorage.setItem('app-theme-mode', data.themeMode);
              }
            }
            if (data.fixedTheme && THEMES.some((t) => t.id === data.fixedTheme)) {
              setFixedTheme(data.fixedTheme);
              if (typeof window !== 'undefined') {
                localStorage.setItem('app-fixed-theme', data.fixedTheme);
              }
            }
            setIsGlobalSynced(true);
            if (data.updatedAt?.toDate) {
              setLastSyncedAt(data.updatedAt.toDate());
            } else if (data.updatedAt) {
              setLastSyncedAt(new Date(data.updatedAt));
            }
          } else {
            // First time setup: document not created yet
            setIsGlobalSynced(true);
          }
        },
        (err) => {
          console.warn('Theme Firestore listener notice (using local cached theme):', err);
        }
      );
    } catch (err) {
      console.warn('Could not initialize Theme Firestore listener:', err);
    }

    return () => unsubscribe();
  }, []);

  // Calculate effective active theme
  const activeTheme = themeMode === 'auto' ? getTodayAutoTheme() : fixedTheme;

  // Admin function to save and broadcast theme settings globally to all visitors
  const updateGlobalTheme = useCallback(async (newMode, newThemeId) => {
    const targetMode = newMode || themeMode;
    const targetTheme = newThemeId || fixedTheme;

    // Immediately update local state & cache for zero-latency UI response
    setThemeMode(targetMode);
    if (newThemeId) setFixedTheme(targetTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme-mode', targetMode);
      if (newThemeId) localStorage.setItem('app-fixed-theme', targetTheme);
    }

    setIsSavingGlobal(true);
    setGlobalSyncError(null);

    try {
      const themeDocRef = doc(db, 'site_settings', 'theme');
      await setDoc(
        themeDocRef,
        {
          themeMode: targetMode,
          fixedTheme: targetTheme,
          updatedAt: serverTimestamp(),
          updatedBy: auth.currentUser?.email || 'admin',
        },
        { merge: true }
      );
      setIsGlobalSynced(true);
      setLastSyncedAt(new Date());
      return { success: true };
    } catch (err) {
      console.error('Failed to update global enterprise theme in Firestore:', err);
      setGlobalSyncError(err.message || 'Failed to sync with live site database');
      return { success: false, error: err };
    } finally {
      setIsSavingGlobal(false);
    }
  }, [themeMode, fixedTheme]);

  const selectTheme = useCallback((themeId) => {
    // Visitor local toggle
    setThemeMode('fixed');
    setFixedTheme(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme-mode', 'fixed');
      localStorage.setItem('app-fixed-theme', themeId);
    }
  }, []);

  // Update DOM attributes for theme styling
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', activeTheme);
    body.setAttribute('data-theme', activeTheme);

    if (activeTheme === 'light') {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }

    localStorage.setItem('app-theme-mode', themeMode);
    localStorage.setItem('app-fixed-theme', fixedTheme);
  }, [themeMode, fixedTheme, activeTheme]);

  // Check every 30 mins to update auto theme if day changes
  useEffect(() => {
    if (themeMode !== 'auto') return;
    const interval = setInterval(() => {
      const currentAuto = getTodayAutoTheme();
      document.documentElement.setAttribute('data-theme', currentAuto);
      document.body.setAttribute('data-theme', currentAuto);
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
        todayAutoTheme: getTodayAutoTheme(),
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

