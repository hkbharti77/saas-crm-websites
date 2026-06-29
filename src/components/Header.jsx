import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only auto-switch if the user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };
    
    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <a href="/" className="logo">
          <img src="/logo.webp" alt="Gyan VaniAi" className="logo-img" />
          <span className="logo-text gradient-text-premium">Gyan VaniAi</span>
        </a>
        
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          <a href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>Features</a>
          <a href="/#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>Portfolio</a>
          <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>Blog</Link>
          
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="/#contact" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>Get Started</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
