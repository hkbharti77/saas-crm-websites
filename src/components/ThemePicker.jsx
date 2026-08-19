import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemePicker.css';

export default function ThemePicker() {
  const { theme, selectTheme } = useTheme();
  const isLight = theme === 'light';

  const handleToggle = () => {
    selectTheme(isLight ? 'midnight' : 'light');
  };

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={handleToggle}
      aria-label={isLight ? 'Switch to Dark mode' : 'Switch to Light mode'}
      title={isLight ? 'Switch to Dark mode' : 'Switch to Light mode'}
    >
      {isLight ? (
        <Sun size={18} className="theme-toggle-icon sun-icon" />
      ) : (
        <Moon size={18} className="theme-toggle-icon moon-icon" />
      )}
    </button>
  );
}



