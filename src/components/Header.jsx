import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <a href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>
            Features
          </a>
          <Link to="/services/whatsapp-coexistence" className="nav-link" onClick={() => setIsOpen(false)}>
            WhatsApp Coexistence
          </Link>
          <a href="/#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>
            Portfolio
          </a>
          <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>
            Blog
          </Link>

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
