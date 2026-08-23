import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemePicker from './ThemePicker';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <a href="/" className="logo">
          <img
            src="/logo.webp"
            alt="Gyan VaniAi Logo"
            width="38"
            height="38"
            className="logo-img"
            style={{ display: 'block' }}
            fetchPriority="high"
          />
          <span className="logo-text">Gyan VaniAi</span>
        </a>

        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <a href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>
            Features
          </a>
          <NavLink
            to="/services/whatsapp-coexistence"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title="WhatsApp Coexistence Platform"
            onClick={() => setIsOpen(false)}
          >
            WhatsApp
          </NavLink>
          <a href="/#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>
            Portfolio
          </a>
          <NavLink
            to="/blog"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </NavLink>

          <button
            className="nav-link demo-nav-trigger"
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('open-live-demo'));
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#6366f1', fontWeight: '600' }}
          >
            <span>Try Live Demo</span>
            <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>7-Day Trial</span>
          </button>

          <a href="/#contact" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>
            <span>Get Started</span>
            <Sparkles size={15} />
          </a>
        </nav>

        <div className="header-actions">
          <ThemePicker />
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
