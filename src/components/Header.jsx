import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageSquare, Bot, Users, PhoneCall, Building2, Home, ShoppingBag, Landmark, ArrowRight } from 'lucide-react';
import ThemePicker from './ThemePicker';
import './Header.css';

const solutionsList = [
  {
    title: 'WhatsApp Coexistence',
    badge: 'Flagship',
    desc: 'Keep your mobile app while running AI & multi-agent CRM on one number.',
    to: '/services/whatsapp-coexistence',
    icon: <MessageSquare size={18} />
  },
  {
    title: 'Custom AI CRM',
    badge: 'Popular',
    desc: 'Lead scoring, auto-assignment, and pipeline telemetry.',
    to: '/services/crm-development',
    icon: <Users size={18} />
  },
  {
    title: 'AI Agents & RAG',
    desc: 'Autonomous multi-agent workflows with zero hallucination.',
    to: '/services/ai-agent-development',
    icon: <Bot size={18} />
  },
  {
    title: 'Voice AI & Calling Bots',
    desc: 'Inbound support and outbound qualification over phone & WhatsApp.',
    to: '/services/voice-bot-assistant',
    icon: <PhoneCall size={18} />
  },
];

const industriesList = [
  { name: 'Healthcare', to: '/industries/healthcare', icon: <Building2 size={16} /> },
  { name: 'Real Estate', to: '/industries/real-estate', icon: <Home size={16} /> },
  { name: 'E-commerce & Retail', to: '/industries/retail', icon: <ShoppingBag size={16} /> },
  { name: 'Finance & FinTech', to: '/industries/finance', icon: <Landmark size={16} /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeAll}>
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
        </Link>

        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          {/* Solutions Dropdown */}
          <div
            className={`nav-dropdown ${activeDropdown === 'solutions' ? 'dropdown-open' : ''}`}
            onMouseEnter={() => window.innerWidth > 960 && setActiveDropdown('solutions')}
            onMouseLeave={() => window.innerWidth > 960 && setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle-btn"
              onClick={() => toggleDropdown('solutions')}
              aria-expanded={activeDropdown === 'solutions'}
            >
              <span>Solutions</span>
              <ChevronDown size={14} className="dropdown-chevron" />
            </button>

            <div className="dropdown-menu dropdown-menu-wide">
              <div className="dropdown-grid">
                {solutionsList.map((sol) => (
                  <Link
                    key={sol.to}
                    to={sol.to}
                    className="dropdown-item"
                    onClick={closeAll}
                  >
                    <div className="dropdown-item-icon">{sol.icon}</div>
                    <div className="dropdown-item-content">
                      <div className="dropdown-item-header">
                        <span className="dropdown-item-title">{sol.title}</span>
                        {sol.badge && <span className="dropdown-item-badge">{sol.badge}</span>}
                      </div>
                      <p className="dropdown-item-desc">{sol.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="dropdown-footer">
                <Link to="/#capabilities" className="dropdown-footer-link" onClick={closeAll}>
                  <span>Explore all 8 platform capabilities</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* WhatsApp Coexistence Flagship Link */}
          <NavLink
            to="/services/whatsapp-coexistence"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeAll}
          >
            WhatsApp
          </NavLink>

          {/* Industries Dropdown */}
          <div
            className={`nav-dropdown ${activeDropdown === 'industries' ? 'dropdown-open' : ''}`}
            onMouseEnter={() => window.innerWidth > 960 && setActiveDropdown('industries')}
            onMouseLeave={() => window.innerWidth > 960 && setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle-btn"
              onClick={() => toggleDropdown('industries')}
              aria-expanded={activeDropdown === 'industries'}
            >
              <span>Industries</span>
              <ChevronDown size={14} className="dropdown-chevron" />
            </button>

            <div className="dropdown-menu dropdown-menu-compact">
              <div className="dropdown-simple-list">
                {industriesList.map((ind) => (
                  <Link
                    key={ind.to}
                    to={ind.to}
                    className="dropdown-simple-item"
                    onClick={closeAll}
                  >
                    <span className="dropdown-simple-icon">{ind.icon}</span>
                    <span className="dropdown-simple-name">{ind.name}</span>
                  </Link>
                ))}
              </div>
              <div className="dropdown-footer">
                <Link to="/#industries" className="dropdown-footer-link" onClick={closeAll}>
                  <span>View all 8 industry solutions</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeAll}
          >
            About
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeAll}
          >
            Blog
          </NavLink>

          {/* Live Demo Trigger */}
          <button
            type="button"
            className="nav-link demo-nav-trigger"
            onClick={() => {
              closeAll();
              window.dispatchEvent(new CustomEvent('open-live-demo'));
            }}
          >
            <span>Live Demo</span>
            <span className="demo-badge-pill">7-Day Sandbox</span>
          </button>

          {/* Primary CTA */}
          <a href="/#contact" className="btn btn-primary nav-btn" onClick={closeAll}>
            <span>Book a Demo</span>
            <ArrowRight size={14} />
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
