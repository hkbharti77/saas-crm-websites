import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  { id: 'midnight', name: 'Enterprise Midnight', color: '#050811', accent: '#6366f1', description: 'Pure obsidian black tech dark theme with indigo glow' },
  { id: 'aurora', name: 'Aurora AI Glass', color: '#041a18', accent: '#10b981', description: 'Cosmic glowing emerald & mint AI mesh gradient' },
  { id: 'slate', name: 'Corporate Slate', color: '#0f172a', accent: '#38bdf8', description: 'Clean titanium slate finish with steel sky blue accents' },
  { id: 'quantum', name: 'Quantum Cyan Tech', color: '#021820', accent: '#06b6d4', description: 'Cyberpunk deep aqua & electric cyan glow gradient' },
  { id: 'amber', name: 'Sunset Amber Tech', color: '#140b04', accent: '#f59e0b', description: 'Warm obsidian amber gold & bronze tech gradient' },
  { id: 'light', name: 'Light Pearl Enterprise', color: '#f8fafc', accent: '#2563eb', description: 'Modern pearl white & ice blue light theme' },
  { id: 'sapphire', name: 'Sapphire Amethyst Tech', color: '#0c071e', accent: '#8b5cf6', description: 'High-security royal amethyst purple & cobalt glow' }
];

// 7-day automatic daily theme rotation schedule (Sun = 0 to Sat = 6) - 7 distinct themes for 7 days
export const DAILY_SCHEDULE = [
  { day: 'Sunday', themeId: 'amber', name: 'Sunset Amber Tech' },
  { day: 'Monday', themeId: 'aurora', name: 'Aurora AI Glass' },
  { day: 'Tuesday', themeId: 'slate', name: 'Corporate Slate' },
  { day: 'Wednesday', themeId: 'quantum', name: 'Quantum Cyan Tech' },
  { day: 'Thursday', themeId: 'light', name: 'Light Pearl Enterprise' },
  { day: 'Friday', themeId: 'midnight', name: 'Enterprise Midnight' },
  { day: 'Saturday', themeId: 'sapphire', name: 'Sapphire Amethyst Tech' }
];

export function getTodayAutoTheme() {
  const dayIndex = new Date().getDay();
  return DAILY_SCHEDULE[dayIndex].themeId;
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme mode: 'auto' (7-day daily rotation) or 'fixed' (admin choice)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('app-theme-mode');
      return savedMode ? savedMode : 'auto';
    }
    return 'auto';
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

  // Calculate effective active theme
  const activeTheme = themeMode === 'auto' ? getTodayAutoTheme() : fixedTheme;

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
        setThemeMode,
        fixedTheme,
        setFixedTheme,
        themes: THEMES,
        dailySchedule: DAILY_SCHEDULE,
        todayAutoTheme: getTodayAutoTheme()
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
