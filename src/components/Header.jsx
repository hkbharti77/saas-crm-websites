import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Bot,
  MessageSquare,
  PhoneCall,
  Users,
  Workflow,
  Building2,
  GraduationCap,
  Home,
  ShoppingBag,
  Landmark,
  Scale,
  BookOpen,
  FileText,
  Calculator,
  MapPin,
  Sparkles,
} from 'lucide-react';
import ThemePicker from './ThemePicker';
import './Header.css';

/* ── Solutions 3-Column Categorized Data ──────────────────── */
const SOLUTIONS_CATEGORIES = [
  {
    category: 'AI & Automation',
    items: [
      {
        title: 'AI Agent Development',
        desc: 'Custom multi-agent workflows with RAG',
        to: '/services/ai-agent-development',
        icon: <Bot size={16} />,
      },
      {
        title: 'WhatsApp Automation',
        desc: 'Keep phone active + multi-agent CRM',
        to: '/services/whatsapp-coexistence',
        badge: 'Flagship',
        icon: <MessageSquare size={16} />,
        prefetch: () => import('../pages/WhatsAppCoexistencePage'),
      },
      {
        title: 'Voice Bot Assistant',
        desc: 'Sub-300ms voice AI over phone & WhatsApp',
        to: '/services/voice-bot-assistant',
        icon: <PhoneCall size={16} />,
      },
    ],
  },
  {
    category: 'Business Tools',
    items: [
      {
        title: 'CRM Platform',
        desc: 'Lead scoring, auto-assignment & pipelines',
        to: '/services/crm-development',
        badge: 'Popular',
        icon: <Users size={16} />,
        prefetch: () => import('../pages/CrmDevelopmentPage'),
      },
      {
        title: 'Sales Automation',
        desc: 'Automate outbound sequences & SLA triggers',
        to: '/services/sales-automation',
        icon: <Workflow size={16} />,
        prefetch: () => import('../pages/SalesAutomationPage'),
      },
      {
        title: 'Enterprise Solutions',
        desc: 'High-volume infrastructure & RBAC security',
        to: '/industries/enterprise',
        icon: <Building2 size={16} />,
      },
    ],
  },
  {
    category: 'By Industry',
    items: [
      {
        title: 'Healthcare',
        desc: 'Patient engagement & automated booking',
        to: '/industries/healthcare',
        icon: <Building2 size={16} />,
      },
      {
        title: 'Education',
        desc: 'Student admissions & campus alerts',
        to: '/industries/education',
        icon: <GraduationCap size={16} />,
      },
      {
        title: 'Real Estate',
        desc: 'Automated property triage & site visits',
        to: '/industries/real-estate',
        icon: <Home size={16} />,
      },
    ],
  },
];

/* ── Industries Dropdown Data ─────────────────────────────── */
const INDUSTRIES_LIST = [
  {
    title: 'Healthcare',
    desc: 'Patient care, clinic visits & automated reminders',
    to: '/industries/healthcare',
    icon: <Building2 size={16} />,
  },
  {
    title: 'Real Estate',
    desc: 'Lead qualification & automated site-visit triage',
    to: '/industries/real-estate',
    icon: <Home size={16} />,
  },
  {
    title: 'E-commerce & Retail',
    desc: 'WhatsApp catalog & cart abandonment recovery',
    to: '/industries/retail',
    icon: <ShoppingBag size={16} />,
  },
  {
    title: 'Finance & FinTech',
    desc: 'KYC collection, payments & loan qualification',
    to: '/industries/finance',
    icon: <Landmark size={16} />,
  },
  {
    title: 'Legal Practices',
    desc: 'Client intake, case vetting & consultations',
    to: '/industries/legal',
    icon: <Scale size={16} />,
    prefetch: () => import('../pages/LegalPage'),
  },
  {
    title: 'Enterprise Operations',
    desc: 'Dedicated clusters, audit logs & custom SLA',
    to: '/industries/enterprise',
    icon: <Building2 size={16} />,
  },
];

/* ── Resources Dropdown Data ──────────────────────────────── */
const RESOURCES_LIST = [
  {
    title: 'Blog & Tech Insights',
    desc: 'Articles on autonomous CRM & AI engineering',
    to: '/blog',
    icon: <BookOpen size={16} />,
    prefetch: () => import('../pages/Blog'),
  },
  {
    title: 'Documentation',
    desc: 'API guides, SDK references & webhooks',
    to: '/documentation',
    icon: <FileText size={16} />,
    prefetch: () => import('../pages/Documentation'),
  },
  {
    title: 'CRM Migration Guide',
    desc: 'Zero-downtime database migration blueprint',
    to: '/guides/crm-migration',
    icon: <Workflow size={16} />,
    prefetch: () => import('../pages/CrmMigrationGuidePage'),
  },
  {
    title: 'Voice AI Latency Benchmark',
    desc: 'Sub-300ms audio telemetry & benchmark stats',
    to: '/resources/voice-ai-latency-benchmark',
    icon: <PhoneCall size={16} />,
    prefetch: () => import('../pages/VoiceAiLatencyBenchmarkPage'),
  },
  {
    title: 'WhatsApp Cost Calculator',
    desc: 'Calculate Meta conversation fees & savings',
    to: '/tools/whatsapp-pricing-calculator',
    icon: <Calculator size={16} />,
    prefetch: () => import('../pages/WhatsAppPricingCalculatorPage'),
  },
  {
    title: 'Where to Find Us',
    desc: 'Corporate offices, physical map & direct contacts',
    to: '/resources/where-to-find-us',
    icon: <MapPin size={16} />,
    prefetch: () => import('../pages/WhereToFindUsPage'),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Scroll detection for subtle elevation styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menus on outside click or escape key
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Automatically close all dropdowns and mobile drawer on route navigation
  const currentLocationKey = location.pathname + location.hash;
  const [prevLocationKey, setPrevLocationKey] = useState(currentLocationKey);
  if (currentLocationKey !== prevLocationKey) {
    setPrevLocationKey(currentLocationKey);
    setActiveDropdown(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }

  const closeAll = useCallback(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMobileGroup = (name) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  const handleOpenLiveDemo = () => {
    closeAll();
    window.dispatchEvent(new CustomEvent('open-live-demo'));
  };

  // Determine active states for parent category dropdowns
  const isSolutionsActive =
    location.pathname.startsWith('/services') &&
    location.pathname !== '/services/whatsapp-coexistence';
  const isIndustriesActive = location.pathname.startsWith('/industries');
  const isResourcesActive =
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/documentation') ||
    location.pathname.startsWith('/guides') ||
    location.pathname.startsWith('/resources') ||
    location.pathname.startsWith('/tools');

  return (
    <header className="header" ref={headerRef}>
      <div className={`hdr-bar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="hdr-container">
          {/* ── Left Zone: Brand Logo & Tagline ── */}
          <div className="hdr-left">
            <Link to="/" className="hdr-logo" onClick={closeAll} aria-label="Gyan VaniAI Home">
              <img
                src="/logo.webp"
                alt="Gyan VaniAI"
                width="34"
                height="34"
                className="hdr-logo-img"
                decoding="async"
              />
              <div className="hdr-logo-content">
                <span className="hdr-logo-title">Gyan VaniAI</span>
                <span className="hdr-logo-tagline">AI-Powered Business Automation</span>
              </div>
            </Link>
          </div>

          {/* ── Center Zone: Desktop Organized Navigation ── */}
          <nav className="hdr-center" aria-label="Main Navigation">
            {/* 1. Solutions Dropdown */}
            <div
              className={`hdr-dd-root ${activeDropdown === 'solutions' ? 'is-open' : ''}`}
              onMouseEnter={() => window.innerWidth > 1080 && setActiveDropdown('solutions')}
              onMouseLeave={() => window.innerWidth > 1080 && setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`hdr-nav-btn ${isSolutionsActive ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('solutions')}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="true"
              >
                <span>Solutions</span>
                <ChevronDown size={14} className="hdr-chevron" aria-hidden="true" />
              </button>

              <div className="hdr-dd-panel hdr-dd-solutions" role="menu">
                <div className="hdr-solutions-grid">
                  {SOLUTIONS_CATEGORIES.map((col, idx) => (
                    <div key={idx} className="hdr-solutions-col">
                      <div className="hdr-col-heading">{col.category}</div>
                      <div className="hdr-col-list">
                        {col.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="hdr-dd-card"
                            onClick={closeAll}
                            onMouseEnter={() => item.prefetch?.().catch(() => {})}
                            role="menuitem"
                          >
                            <span className="hdr-card-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                            <div className="hdr-card-body">
                              <div className="hdr-card-header">
                                <span className="hdr-card-title">{item.title}</span>
                                {item.badge && (
                                  <span className="hdr-card-badge">{item.badge}</span>
                                )}
                              </div>
                              <p className="hdr-card-desc">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hdr-dd-footer">
                  <Link
                    to="/#capabilities"
                    className="hdr-footer-link"
                    onClick={closeAll}
                    role="menuitem"
                  >
                    <span>View all 8 platform capabilities</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. WhatsApp Direct Link */}
            <NavLink
              to="/services/whatsapp-coexistence"
              className={({ isActive }) => `hdr-nav-link ${isActive ? 'is-active' : ''}`}
              onClick={closeAll}
              onMouseEnter={() => import('../pages/WhatsAppCoexistencePage').catch(() => {})}
            >
              WhatsApp
            </NavLink>

            {/* 3. Industries Dropdown */}
            <div
              className={`hdr-dd-root ${activeDropdown === 'industries' ? 'is-open' : ''}`}
              onMouseEnter={() => window.innerWidth > 1080 && setActiveDropdown('industries')}
              onMouseLeave={() => window.innerWidth > 1080 && setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`hdr-nav-btn ${isIndustriesActive ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('industries')}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown size={14} className="hdr-chevron" aria-hidden="true" />
              </button>

              <div className="hdr-dd-panel hdr-dd-industries" role="menu">
                <div className="hdr-two-col-grid">
                  {INDUSTRIES_LIST.map((ind) => (
                    <Link
                      key={ind.to}
                      to={ind.to}
                      className="hdr-dd-card"
                      onClick={closeAll}
                      role="menuitem"
                    >
                      <span className="hdr-card-icon" aria-hidden="true">
                        {ind.icon}
                      </span>
                      <div className="hdr-card-body">
                        <span className="hdr-card-title">{ind.title}</span>
                        <p className="hdr-card-desc">{ind.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="hdr-dd-footer">
                  <Link
                    to="/#industries"
                    className="hdr-footer-link"
                    onClick={closeAll}
                    role="menuitem"
                  >
                    <span>View all 8 industry solutions</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Resources Dropdown */}
            <div
              className={`hdr-dd-root ${activeDropdown === 'resources' ? 'is-open' : ''}`}
              onMouseEnter={() => window.innerWidth > 1080 && setActiveDropdown('resources')}
              onMouseLeave={() => window.innerWidth > 1080 && setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`hdr-nav-btn ${isResourcesActive ? 'is-active' : ''}`}
                onClick={() => toggleDropdown('resources')}
                aria-expanded={activeDropdown === 'resources'}
                aria-haspopup="true"
              >
                <span>Resources</span>
                <ChevronDown size={14} className="hdr-chevron" aria-hidden="true" />
              </button>

              <div className="hdr-dd-panel hdr-dd-resources" role="menu">
                <div className="hdr-two-col-grid">
                  {RESOURCES_LIST.map((res) => (
                    <Link
                      key={res.to}
                      to={res.to}
                      className="hdr-dd-card"
                      onClick={closeAll}
                      onMouseEnter={() => res.prefetch?.().catch(() => {})}
                      role="menuitem"
                    >
                      <span className="hdr-card-icon" aria-hidden="true">
                        {res.icon}
                      </span>
                      <div className="hdr-card-body">
                        <span className="hdr-card-title">{res.title}</span>
                        <p className="hdr-card-desc">{res.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="hdr-dd-footer">
                  <Link
                    to="/documentation"
                    className="hdr-footer-link"
                    onClick={closeAll}
                    role="menuitem"
                  >
                    <span>Explore full documentation & API references</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 5. Pricing Direct Link */}
            <NavLink
              to="/pricing"
              className={({ isActive }) => `hdr-nav-link ${isActive ? 'is-active' : ''}`}
              onClick={closeAll}
              onMouseEnter={() => import('../pages/PricingPage').catch(() => {})}
            >
              Pricing
            </NavLink>

            {/* 6. About Direct Link */}
            <NavLink
              to="/about"
              className={({ isActive }) => `hdr-nav-link ${isActive ? 'is-active' : ''}`}
              onClick={closeAll}
              onMouseEnter={() => import('../pages/About').catch(() => {})}
            >
              About
            </NavLink>
          </nav>

          {/* ── Right Zone: Exactly ONE Live Demo, ONE Theme Toggle, ONE Book CTA ── */}
          <div className="hdr-right">
            {/* Desktop Live Demo link with single 7-DAY badge */}
            <button
              type="button"
              className="hdr-live-demo-link"
              onClick={handleOpenLiveDemo}
              aria-label="Open 7-Day Live Demo Sandbox"
            >
              <span>Live Demo</span>
              <span className="hdr-live-demo-badge">7-DAY</span>
            </button>

            {/* Theme Switcher Toggle */}
            <div className="hdr-theme-wrapper">
              <ThemePicker />
            </div>

            {/* Desktop Primary CTA: Book a Demo */}
            <a href="/#contact" className="hdr-primary-cta" onClick={closeAll}>
              <span>Book a Demo</span>
              <ArrowRight size={14} className="hdr-cta-arrow" aria-hidden="true" />
            </a>

            {/* Mobile Hamburger Toggle Button (Hidden on Desktop) */}
            <button
              type="button"
              className="hdr-hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Accessible Mobile Navigation Drawer (Hidden on Desktop) ── */}
      <div
        id="mobile-navigation-drawer"
        className={`hdr-mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="hdr-mobile-inner">
          <div className="hdr-mobile-nav">
            {/* Accordion: Solutions */}
            <div className="hdr-mobile-accordion">
              <button
                type="button"
                className={`hdr-mobile-trigger ${mobileExpanded === 'solutions' ? 'is-expanded' : ''}`}
                onClick={() => toggleMobileGroup('solutions')}
                aria-expanded={mobileExpanded === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown size={18} className="hdr-mobile-chevron" aria-hidden="true" />
              </button>

              {mobileExpanded === 'solutions' && (
                <div className="hdr-mobile-sublist">
                  {SOLUTIONS_CATEGORIES.flatMap((c) => c.items).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="hdr-mobile-sublink"
                      onClick={closeAll}
                    >
                      <span className="hdr-mobile-subicon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div className="hdr-mobile-subbody">
                        <div className="hdr-mobile-subtitle-row">
                          <span className="hdr-mobile-subtitle">{item.title}</span>
                          {item.badge && (
                            <span className="hdr-card-badge">{item.badge}</span>
                          )}
                        </div>
                        <span className="hdr-mobile-subdesc">{item.desc}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/#capabilities"
                    className="hdr-mobile-footer-link"
                    onClick={closeAll}
                  >
                    <span>View all 8 platform capabilities</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            {/* Direct: WhatsApp */}
            <NavLink
              to="/services/whatsapp-coexistence"
              className={({ isActive }) =>
                `hdr-mobile-direct-link ${isActive ? 'is-active' : ''}`
              }
              onClick={closeAll}
            >
              WhatsApp
            </NavLink>

            {/* Accordion: Industries */}
            <div className="hdr-mobile-accordion">
              <button
                type="button"
                className={`hdr-mobile-trigger ${mobileExpanded === 'industries' ? 'is-expanded' : ''}`}
                onClick={() => toggleMobileGroup('industries')}
                aria-expanded={mobileExpanded === 'industries'}
              >
                <span>Industries</span>
                <ChevronDown size={18} className="hdr-mobile-chevron" aria-hidden="true" />
              </button>

              {mobileExpanded === 'industries' && (
                <div className="hdr-mobile-sublist">
                  {INDUSTRIES_LIST.map((ind) => (
                    <Link
                      key={ind.to}
                      to={ind.to}
                      className="hdr-mobile-sublink"
                      onClick={closeAll}
                    >
                      <span className="hdr-mobile-subicon" aria-hidden="true">
                        {ind.icon}
                      </span>
                      <div className="hdr-mobile-subbody">
                        <span className="hdr-mobile-subtitle">{ind.title}</span>
                        <span className="hdr-mobile-subdesc">{ind.desc}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/#industries"
                    className="hdr-mobile-footer-link"
                    onClick={closeAll}
                  >
                    <span>View all 8 industry solutions</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Resources */}
            <div className="hdr-mobile-accordion">
              <button
                type="button"
                className={`hdr-mobile-trigger ${mobileExpanded === 'resources' ? 'is-expanded' : ''}`}
                onClick={() => toggleMobileGroup('resources')}
                aria-expanded={mobileExpanded === 'resources'}
              >
                <span>Resources</span>
                <ChevronDown size={18} className="hdr-mobile-chevron" aria-hidden="true" />
              </button>

              {mobileExpanded === 'resources' && (
                <div className="hdr-mobile-sublist">
                  {RESOURCES_LIST.map((res) => (
                    <Link
                      key={res.to}
                      to={res.to}
                      className="hdr-mobile-sublink"
                      onClick={closeAll}
                    >
                      <span className="hdr-mobile-subicon" aria-hidden="true">
                        {res.icon}
                      </span>
                      <div className="hdr-mobile-subbody">
                        <span className="hdr-mobile-subtitle">{res.title}</span>
                        <span className="hdr-mobile-subdesc">{res.desc}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/documentation"
                    className="hdr-mobile-footer-link"
                    onClick={closeAll}
                  >
                    <span>Explore full documentation</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>

            {/* Direct: Pricing */}
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `hdr-mobile-direct-link ${isActive ? 'is-active' : ''}`
              }
              onClick={closeAll}
            >
              Pricing
            </NavLink>

            {/* Direct: About */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hdr-mobile-direct-link ${isActive ? 'is-active' : ''}`
              }
              onClick={closeAll}
            >
              About
            </NavLink>
          </div>

          {/* Mobile Bottom CTA Section */}
          <div className="hdr-mobile-actions">
            <button
              type="button"
              className="hdr-mobile-demo-btn"
              onClick={handleOpenLiveDemo}
            >
              <Sparkles size={16} aria-hidden="true" />
              <span>Live Demo Sandbox</span>
              <span className="hdr-live-demo-badge">7-DAY</span>
            </button>

            <a href="/#contact" className="hdr-mobile-cta-btn" onClick={closeAll}>
              <span>Book a Demo</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
