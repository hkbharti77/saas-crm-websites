import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemePicker.css';

export default function ThemePicker() {
  const { theme, themes, selectTheme, themeMode, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="theme-picker-wrapper" ref={menuRef}>
      <button
        type="button"
        className={`theme-picker-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Theme"
        aria-expanded={isOpen}
        title={`Current Theme: ${currentThemeObj.name}`}
      >
        <Palette size={16} className="theme-picker-icon" />
        <span className="theme-current-dot" style={{ background: currentThemeObj.accent }}></span>
      </button>

      {isOpen && (
        <div className="theme-dropdown-menu" role="menu">
          <div className="theme-dropdown-header">
            <div className="theme-dropdown-title">
              <Sparkles size={14} style={{ color: 'var(--primary-color)' }} />
              <span>Enterprise Theme</span>
            </div>
            <button
              type="button"
              className={`theme-auto-pill ${themeMode === 'auto' ? 'active' : ''}`}
              onClick={() => {
                setThemeMode(themeMode === 'auto' ? 'fixed' : 'auto');
              }}
              title="Rotate themes automatically each day"
            >
              {themeMode === 'auto' ? 'Auto: ON' : 'Auto: OFF'}
            </button>
          </div>

          <div className="theme-options-list">
            {themes.map((t) => {
              const isSelected = theme === t.id && themeMode !== 'auto';
              const isCurrentActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-option-item ${isCurrentActive ? 'active' : ''}`}
                  onClick={() => {
                    selectTheme(t.id);
                    setIsOpen(false);
                  }}
                  role="menuitem"
                >
                  <div className="theme-swatch-badge">
                    <span className="swatch-bg" style={{ background: t.color }}></span>
                    <span className="swatch-accent" style={{ background: t.accent }}></span>
                  </div>
                  <div className="theme-option-text">
                    <div className="theme-option-name">{t.name}</div>
                    <div className="theme-option-desc">{t.description}</div>
                  </div>
                  {isCurrentActive && (
                    <Check size={15} className="theme-check-icon" style={{ color: 'var(--primary-color)' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
