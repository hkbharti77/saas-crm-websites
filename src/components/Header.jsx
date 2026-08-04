import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <a href="/" className="logo">
          <img src="/logo.webp" alt="Gyan VaniAi" width="40" height="40" className="logo-img" style={{ display: 'block' }} />
          <span className="logo-text gradient-text-premium">Gyan VaniAi</span>
        </a>
        
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          <a href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>Features</a>
          <Link to="/services/whatsapp-coexistence" className="nav-link" onClick={() => setIsOpen(false)}>WhatsApp Coexistence</Link>
          <a href="/#portfolio" className="nav-link" onClick={() => setIsOpen(false)}>Portfolio</a>
          <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>Blog</Link>
          
          <a href="/#contact" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>Get Started</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu" aria-expanded={isOpen}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
