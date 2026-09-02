import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ArrowRight, 
  Zap,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Bot,
  Layers,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import ParticleGlobe3D from './ui/ParticleGlobe3D';
import Card3DTilt from './ui/Card3DTilt';
import './Hero.css';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'AI-POWERED REVENUE PLATFORM',
    badgeIcon: Zap,
    titlePrefix: 'Autonomous AI CRM for ',
    titleGradient: 'high-velocity revenue teams',
    subtitle: 'Capture, enrich, qualify, assign and convert leads with intelligent AI-powered workflows.',
    imageDark: '/hero_robot_dark.webp',
    imageLight: '/hero_robot_light.webp',
    altText: 'Autonomous AI Humanoid Robot orchestrating enterprise CRM revenue operations',
    telemetry: [
      { dot: 'dot-emerald', icon: Zap, text: 'AI Lead Scoring: ', value: '98/100 Intent' },
      { dot: 'dot-cyan', icon: TrendingUp, text: 'Pipeline: ', value: '$2.4M ARR (+38%)' },
      { dot: 'dot-green', icon: MessageSquare, text: 'WhatsApp AI: ', value: '42s Auto-Response' }
    ]
  },
  {
    id: 'slide-2',
    badge: 'OFFICIAL WHATSAPP CLOUD API',
    badgeIcon: MessageSquare,
    titlePrefix: 'Zero-Latency AI Agents for ',
    titleGradient: 'instant customer conversion',
    subtitle: 'Engage high-intent prospects on WhatsApp in real-time with automated qualifying dialogues and instant CRM sync.',
    imageDark: '/hero_slide_2_dark.webp',
    imageLight: '/hero_slide_2_light.webp',
    altText: 'Humanoid AI Assistant managing multichannel WhatsApp conversations and CRM bookings',
    telemetry: [
      { dot: 'dot-emerald', icon: Zap, text: 'Avg Response: ', value: '< 3 seconds' },
      { dot: 'dot-cyan', icon: TrendingUp, text: 'Conversion Lift: ', value: '+4.2x Growth' },
      { dot: 'dot-green', icon: ShieldCheck, text: 'Official API: ', value: '99.99% Uptime' }
    ]
  },
  {
    id: 'slide-3',
    badge: 'PREDICTIVE REVENUE INTELLIGENCE',
    badgeIcon: TrendingUp,
    titlePrefix: 'Automated Pipeline & ML for ',
    titleGradient: 'modern enterprise sales',
    subtitle: 'Enrich incoming leads with 50+ firmographic data points and predict deal win probabilities with ML precision.',
    imageDark: '/hero_slide_3_dark.webp',
    imageLight: '/hero_slide_3_light.webp',
    altText: 'AI Robot analyzing 3D revenue forecasting curves and predictive sales pipelines',
    telemetry: [
      { dot: 'dot-emerald', icon: CheckCircle2, text: 'Win Probability: ', value: '88% Accuracy' },
      { dot: 'dot-cyan', icon: Layers, text: 'Firmographics: ', value: '50+ Live Signals' },
      { dot: 'dot-green', icon: Activity, text: 'Data Enrichment: ', value: 'Zero Manual Entry' }
    ]
  },
  {
    id: 'slide-4',
    badge: 'ENTERPRISE AGENTIC ORCHESTRATION',
    badgeIcon: Bot,
    titlePrefix: 'Autonomous Agent Pods for ',
    titleGradient: 'complex multi-tier workflows',
    subtitle: 'Deploy intelligent AI agent swarms that orchestrate cross-department handoffs, SLA monitoring, and ERP execution.',
    imageDark: '/hero_slide_4_dark.webp',
    imageLight: '/hero_slide_4_light.webp',
    altText: 'Enterprise AI Robot orchestrating neural network workflow nodes and automated agents',
    telemetry: [
      { dot: 'dot-emerald', icon: Bot, text: 'Active Agent Pods: ', value: '18 Swarms' },
      { dot: 'dot-cyan', icon: Activity, text: 'Cross-Team SLA: ', value: '99.4% Standard' },
      { dot: 'dot-green', icon: ShieldCheck, text: 'Security: ', value: 'SOC2 Type II Ready' }
    ]
  }
];

const AUTO_SCROLL_INTERVAL = 6000; // 6 seconds per slide

export default function Hero({ onBookDemo }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = useReducedMotion();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollTimerRef = useRef(null);

  const handleBookDemo = (source) => {
    trackBookDemo(source);
    onBookDemo();
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) return;

    autoScrollTimerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isPaused, nextSlide, currentSlide]);

  const activeSlideData = HERO_SLIDES[currentSlide];
  const BadgeIcon = activeSlideData.badgeIcon;

  return (
    <section 
      className="hero" 
      id="hero-section" 
      aria-label="Gyan VaniAI Hero Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Subtle Ambient Media Layer with Fluid Framer Motion */}
      <div className="hero-media-container" aria-hidden="true">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div 
            key={`${currentSlide}-${isLight ? 'light' : 'dark'}`}
            custom={direction}
            variants={{
              enter: (dir) => ({
                x: prefersReducedMotion ? 0 : (dir > 0 ? 110 : -110),
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 1.06,
                filter: prefersReducedMotion ? 'none' : 'blur(8px)',
              }),
              center: {
                x: 0,
                opacity: 0.94,
                scale: 1,
                filter: 'blur(0px)',
                transition: {
                  x: { type: 'spring', stiffness: 230, damping: 28 },
                  opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 0.5 }
                }
              },
              exit: (dir) => ({
                x: prefersReducedMotion ? 0 : (dir > 0 ? -110 : 110),
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.96,
                filter: prefersReducedMotion ? 'none' : 'blur(8px)',
                transition: {
                  x: { type: 'spring', stiffness: 230, damping: 28 },
                  opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.65 },
                  filter: { duration: 0.4 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="hero-media-slide-motion"
          >
            <img
              src={isLight ? activeSlideData.imageLight : activeSlideData.imageDark}
              alt={activeSlideData.altText}
              width="1920"
              height="1080"
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              decoding={currentSlide === 0 ? 'sync' : 'async'}
              className="hero-media-img"
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero-media-veil"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-grid-layout">
          {/* Left: Value Proposition & Navigation */}
          <div className="hero-content">
            {/* Active Slide Content with Direction-Aware Motion Transition */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div 
                key={`content-${currentSlide}`} 
                custom={direction}
                variants={{
                  enter: (dir) => ({
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : (dir > 0 ? 22 : -22),
                    filter: prefersReducedMotion ? 'none' : 'blur(4px)',
                  }),
                  center: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  },
                  exit: (dir) => ({
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : (dir > 0 ? -18 : 18),
                    filter: prefersReducedMotion ? 'none' : 'blur(4px)',
                    transition: {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="hero-text-animator"
              >
                <div className="hero-badge">
                  <span className="badge-pulse"></span>
                  <BadgeIcon size={13} className="hero-badge-icon" />
                  <span>{activeSlideData.badge}</span>
                </div>

                <h1 className="hero-title">
                  {activeSlideData.titlePrefix}
                  <span className="text-gradient">{activeSlideData.titleGradient}</span>
                </h1>

                <p className="hero-subtitle">
                  {activeSlideData.subtitle}
                </p>

                <div className="hero-actions">
                  <button
                    id="btn-hero-book-demo"
                    type="button"
                    className="btn btn-primary hero-btn-primary"
                    onClick={() => handleBookDemo(`hero-slide-${currentSlide + 1}`)}
                  >
                    <span>Book a Demo</span>
                    <ArrowRight size={18} />
                  </button>
                  <a
                    id="btn-hero-explore"
                    href="#capabilities"
                    className="btn btn-outline hero-btn-secondary"
                  >
                    <span>Explore Platform</span>
                    <ArrowRight size={18} />
                  </a>
                </div>

                {/* Dynamic Telemetry Row */}
                <div className="hero-telemetry-row">
                  {activeSlideData.telemetry.map((item, tIdx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={tIdx} className="hero-telemetry-pill">
                        <span className={`telemetry-dot ${item.dot}`}></span>
                        <ItemIcon size={13} className="telemetry-icon" />
                        <span>{item.text}<strong>{item.value}</strong></span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Controls (Dots & Arrows) */}
            <div className="hero-carousel-controls">
              <button 
                type="button"
                className="carousel-nav-btn" 
                onClick={prevSlide}
                aria-label="Previous slide"
                title="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="carousel-dots" role="tablist" aria-label="Hero Slides">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentSlide}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                  >
                    <span key={`dot-progress-${idx}-${currentSlide === idx}`} className="dot-progress-bar"></span>
                  </button>
                ))}
              </div>

              <button 
                type="button"
                className="carousel-nav-btn" 
                onClick={nextSlide}
                aria-label="Next slide"
                title="Next slide"
              >
                <ChevronRight size={16} />
              </button>

              <div className="carousel-slide-counter">
                <span>0{currentSlide + 1}</span>
                <span className="counter-sep">/</span>
                <span>0{HERO_SLIDES.length}</span>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="hero-trust-bar">
              <div
                className="trust-item"
                onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
                title="Click to view 7-Day Demo Terms"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && window.dispatchEvent(new CustomEvent('open-live-demo'))}
              >
                <span className="trust-dot"></span>
                <span><strong>Live Demo:</strong> 7-Day Sandbox</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-dot"></span>
                <span>Official WhatsApp Cloud API</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <ShieldCheck size={14} className="trust-shield" />
                <span>Enterprise SOC2 Ready</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Motion Stage */}
          <div className="hero-3d-stage" aria-label="3D AI Revenue Hub">
            <div className="hero-3d-stage-halo"></div>
            
            <div className="hero-3d-canvas-wrapper">
              <ParticleGlobe3D size={420} isLight={isLight} dotCount={150} />
            </div>

            {/* Floating 3D Perspective Telemetry Cards with Spring Motion on Slide Change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`floating-cards-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="hero-3d-floating-layer"
              >
                <Card3DTilt className="hero-3d-float-card hero-3d-card-top" maxRotation={12} scale={1.04}>
                  <div className="hero-float-content">
                    <div className="hero-float-header">
                      <span className="hero-float-dot pulse-emerald"></span>
                      <span className="hero-float-title">{activeSlideData.badge}</span>
                    </div>
                    <div className="hero-float-metric">{activeSlideData.telemetry[0].value}</div>
                    <div className="hero-float-label">{activeSlideData.telemetry[0].text.replace(':', '')}</div>
                  </div>
                </Card3DTilt>

                <Card3DTilt className="hero-3d-float-card hero-3d-card-bottom" maxRotation={12} scale={1.04}>
                  <div className="hero-float-content">
                    <div className="hero-float-header">
                      <span className="hero-float-dot pulse-cyan"></span>
                      <span className="hero-float-title">Continuous Sync</span>
                    </div>
                    <div className="hero-float-metric">{activeSlideData.telemetry[1].value}</div>
                    <div className="hero-float-label">{activeSlideData.telemetry[1].text.replace(':', '')}</div>
                  </div>
                </Card3DTilt>

                <Card3DTilt className="hero-3d-float-card hero-3d-card-status" maxRotation={12} scale={1.04}>
                  <div className="hero-float-status-pill">
                    <span className="hero-status-live-pulse"></span>
                    <span>99.99% Cloud SLA</span>
                  </div>
                </Card3DTilt>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
