import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useGeoTargeting } from '../utils/geoDetection';
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
  CheckCircle2,
} from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ICON_MAP } from '../utils/iconMap';
import {
  HERO_CAROUSEL_CONFIG,
  createHeroContentVariants,
  createHeroDeckVariants,
  createHeroMediaVariants,
} from '../lib/motion.config';
import {
  HERO_INACTIVITY_RESUME_MS,
  resolveHeroPlaybackState,
} from '../utils/heroPlayback';
import Card3DTilt from './ui/Card3DTilt';
import './Hero.css';

const DEFAULT_HERO_SLIDES = [
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
      { dot: 'dot-green', icon: MessageSquare, text: 'WhatsApp AI: ', value: '42s Auto-Response' },
    ],
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
      { dot: 'dot-green', icon: ShieldCheck, text: 'Official API: ', value: '99.99% Uptime' },
    ],
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
      { dot: 'dot-green', icon: Activity, text: 'Data Enrichment: ', value: 'Zero Manual Entry' },
    ],
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
      { dot: 'dot-green', icon: ShieldCheck, text: 'Security: ', value: 'SOC2 Type II Ready' },
    ],
  },
];

const AUTO_SCROLL_INTERVAL = HERO_CAROUSEL_CONFIG.dwellMs;
const STAGE_SPRING_CONFIG = { stiffness: 140, damping: 22, mass: 0.7 };

export default function Hero({
  onBookDemo = () => {},
  slides: dynamicSlides = null,
  primaryCta = null,
  whatsappCta = null,
  secondaryCta = null,
  aeoTargetQuery = null,
  aeoSummary = null,
}) {
  const HERO_SLIDES = dynamicSlides && dynamicSlides.length > 0 ? dynamicSlides : DEFAULT_HERO_SLIDES;
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { targeting } = useGeoTargeting();

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const autoScrollTimerRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [slideChangeCount, setSlideChangeCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [interactionNonce, setInteractionNonce] = useState(0);

  // Keep currentSlide within valid bounds if slides change dynamically
  const [prevSlidesLength, setPrevSlidesLength] = useState(HERO_SLIDES.length);
  if (HERO_SLIDES.length !== prevSlidesLength) {
    setPrevSlidesLength(HERO_SLIDES.length);
    if (currentSlide >= HERO_SLIDES.length) {
      setCurrentSlide(0);
    }
  }

  // Smooth scroll-linked depth parallax across backdrop, copy, and 3D Revenue card deck
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : HERO_CAROUSEL_CONFIG.bgParallaxRange
  );
  const contentParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : HERO_CAROUSEL_CONFIG.contentParallaxRange
  );
  const deckParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : HERO_CAROUSEL_CONFIG.deckParallaxRange
  );
  const deckScrollRotateX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : HERO_CAROUSEL_CONFIG.deckScrollRotateX
  );

  // Live mouse-driven 3D stage perspective tilt for the Revenue Card Deck
  const stagePointerX = useMotionValue(0);
  const stagePointerY = useMotionValue(0);

  const smoothStageX = useSpring(stagePointerX, STAGE_SPRING_CONFIG);
  const smoothStageY = useSpring(stagePointerY, STAGE_SPRING_CONFIG);

  const stageTiltRotateY = useTransform(
    smoothStageX,
    [-0.5, 0.5],
    prefersReducedMotion
      ? [0, 0]
      : [-HERO_CAROUSEL_CONFIG.stageTiltMax, HERO_CAROUSEL_CONFIG.stageTiltMax]
  );
  const stageTiltRotateX = useTransform(
    smoothStageY,
    [-0.5, 0.5],
    prefersReducedMotion
      ? [0, 0]
      : [HERO_CAROUSEL_CONFIG.stageTiltMax, -HERO_CAROUSEL_CONFIG.stageTiltMax]
  );
  const stageShiftX = useTransform(
    smoothStageX,
    [-0.5, 0.5],
    prefersReducedMotion ? [0, 0] : [-10, 10]
  );
  const stageShiftY = useTransform(
    smoothStageY,
    [-0.5, 0.5],
    prefersReducedMotion ? [0, 0] : [-8, 8]
  );

  const handleStageMouseMove = (e) => {
    if (prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const normX = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const normY = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    stagePointerX.set(normX);
    stagePointerY.set(normY);
  };

  const handleStageMouseLeave = () => {
    stagePointerX.set(0);
    stagePointerY.set(0);
  };

  const mediaVariants = useMemo(
    () => createHeroMediaVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );
  const contentVariants = useMemo(
    () => createHeroContentVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );
  const deckVariants = useMemo(
    () => createHeroDeckVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  const handleBookDemo = (source) => {
    trackBookDemo(source);
    if (onBookDemo) {
      onBookDemo();
    } else {
      window.dispatchEvent(new CustomEvent('open-demo-modal'));
    }
  };

  const registerCarouselInteraction = useCallback(() => {
    if (prefersReducedMotion || HERO_SLIDES.length <= 1) return;
    setIsInteractionPaused(true);
    setInteractionNonce((n) => n + 1);
  }, [prefersReducedMotion, HERO_SLIDES.length]);

  const advanceSlideAuto = useCallback(() => {
    setDirection(1);
    setSlideChangeCount((c) => c + 1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, [HERO_SLIDES.length]);

  const nextSlide = useCallback(() => {
    registerCarouselInteraction();
    setDirection(1);
    setSlideChangeCount((c) => c + 1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, [HERO_SLIDES.length, registerCarouselInteraction]);

  const prevSlide = useCallback(() => {
    registerCarouselInteraction();
    setDirection(-1);
    setSlideChangeCount((c) => c + 1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [HERO_SLIDES.length, registerCarouselInteraction]);

  const goToSlide = (index) => {
    registerCarouselInteraction();
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setSlideChangeCount((c) => c + 1);
    setCurrentSlide(index);
  };

  const playbackState = resolveHeroPlaybackState({
    isUserPaused: false,
    isInteractionPaused,
    isHovered,
    isFocused,
    prefersReducedMotion,
    slidesCount: HERO_SLIDES.length,
  });

  // 15-second inactivity auto-resume timer after user interaction
  useEffect(() => {
    if (!playbackState.shouldRunInactivityTimer) return;

    const resumeTimer = setTimeout(() => {
      setIsInteractionPaused(false);
    }, HERO_INACTIVITY_RESUME_MS);

    return () => {
      clearTimeout(resumeTimer);
    };
  }, [playbackState.shouldRunInactivityTimer, interactionNonce]);

  // Calm 9-second auto-scroll loop controlled by playback state
  useEffect(() => {
    if (!playbackState.isAutoAdvancing) return;

    autoScrollTimerRef.current = setInterval(() => {
      advanceSlideAuto();
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [playbackState.isAutoAdvancing, advanceSlideAuto, currentSlide]);

  const activeSlideData = HERO_SLIDES[currentSlide] || HERO_SLIDES[0] || DEFAULT_HERO_SLIDES[0];
  const nextSlideData =
    HERO_SLIDES.length > 1
      ? HERO_SLIDES[(currentSlide + 1) % HERO_SLIDES.length]
      : activeSlideData;

  return (
    <section
      ref={heroRef}
      className={`hero${playbackState.isPaused ? ' is-paused' : ''}`}
      id="hero-section"
      aria-label="Gyan VaniAI Hero Carousel"
      style={{ '--hero-slide-duration': `${AUTO_SCROLL_INTERVAL}ms` }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        registerCarouselInteraction();
      }}
    >
      {/* Semantic AEO & LLM Retrieval Micro-markup */}
      <div
        className="sr-only"
        data-aeo-entity="GyanVaniAi"
        data-aeo-intent={aeoTargetQuery || 'What is Gyan VaniAi AI CRM Platform?'}
        data-speakable="true"
        aria-hidden="true"
      >
        <p>
          {aeoSummary ||
            `${activeSlideData.titlePrefix || 'Autonomous AI CRM for'} ${activeSlideData.titleGradient || 'high-velocity revenue teams'}: ${activeSlideData.subtitle || 'Capture, enrich, qualify, assign and convert leads.'}`}
        </p>
      </div>

      {/* Background Ambient Media Layer with 550ms Smooth Glide & Scroll Depth Parallax */}
      <motion.div
        className="hero-media-container"
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: bgParallaxY }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`${currentSlide}-${isLight ? 'light' : 'dark'}`}
            custom={direction}
            variants={mediaVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="hero-media-slide-motion"
          >
            <img
              src={
                isLight
                  ? activeSlideData.imageLight || activeSlideData.imageDark || '/hero_robot_light.webp'
                  : activeSlideData.imageDark || activeSlideData.imageLight || '/hero_robot_dark.webp'
              }
              alt={activeSlideData.altText || 'Gyan VaniAi Enterprise Autonomous AI System'}
              width="1920"
              height="1080"
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              decoding={currentSlide === 0 ? 'sync' : 'async'}
              className="hero-media-img"
            />
          </motion.div>
        </AnimatePresence>
        <div className="hero-media-veil"></div>
      </motion.div>

      <div className="container hero-container">
        <div className="hero-grid-layout">
          {/* Left: Value Proposition & Carousel Controls */}
          <motion.div
            className="hero-content"
            style={prefersReducedMotion ? undefined : { y: contentParallaxY }}
          >
            {/* Active Slide Content — Instant initial paint (LCP), smooth 550ms non-blocking slide swap */}
            <motion.div
              key={`content-${currentSlide}`}
              custom={direction}
              variants={contentVariants}
              initial={slideChangeCount === 0 ? false : 'enter'}
              animate="center"
              className="hero-text-animator"
            >
                <h1 className="hero-title">
                  {activeSlideData.titlePrefix}
                  {activeSlideData.titlePrefix &&
                  activeSlideData.titleGradient &&
                  !/\s$/.test(activeSlideData.titlePrefix) &&
                  !/^\s/.test(activeSlideData.titleGradient)
                    ? ' '
                    : ''}
                  <span className="text-gradient">{activeSlideData.titleGradient}</span>
                </h1>

                <p className="hero-subtitle">{activeSlideData.subtitle}</p>

                <div className="hero-actions">
                  <button
                    id="btn-hero-book-demo"
                    type="button"
                    className="btn btn-primary hero-btn-primary"
                    onClick={() => {
                      if (
                        primaryCta?.action === 'link' &&
                        primaryCta?.destination &&
                        primaryCta.destination !== '#contact'
                      ) {
                        window.location.href = primaryCta.destination;
                      } else {
                        handleBookDemo(`hero-slide-${currentSlide + 1}`);
                      }
                    }}
                    title={`${targeting?.country || 'Global'} - Click to ${primaryCta?.label || targeting?.cta || 'Book a Demo'}`}
                  >
                    <span>{primaryCta?.label || targeting?.cta || 'Book a Demo'}</span>
                    <ArrowRight size={18} />
                  </button>
                  <a
                    id="btn-hero-whatsapp"
                    href={
                      whatsappCta?.destination ||
                      'https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20book%20a%20consultation.'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn hero-btn-whatsapp"
                    title="Chat with Gyan VaniAi WhatsApp AI Agent"
                  >
                    <MessageSquare size={18} className="whatsapp-icon" />
                    <span>{whatsappCta?.label || 'WhatsApp AI Demo'}</span>
                  </a>
                  <a
                    id="btn-hero-explore"
                    href={secondaryCta?.destination || '#capabilities'}
                    className="btn btn-outline hero-btn-secondary"
                  >
                    <span>{secondaryCta?.label || 'Explore Platform'}</span>
                    <ArrowRight size={18} />
                  </a>
                </div>

                {/* Dynamic Telemetry Row */}
                <div className="hero-telemetry-row">
                  {(activeSlideData.telemetry || [])
                    .filter((item) => (item?.text && item.text.trim()) || (item?.value && item.value.trim()))
                    .map((item, tIdx) => {
                      const ItemIcon =
                        typeof item.icon === 'string' ? ICON_MAP[item.icon] || Zap : item.icon;
                      return (
                        <div key={tIdx} className="hero-telemetry-pill">
                          <span className={`telemetry-dot ${item.dot}`}></span>
                          {ItemIcon && <ItemIcon size={13} className="telemetry-icon" />}
                          <span>
                            {item.text}
                            <strong>{item.value}</strong>
                          </span>
                        </div>
                      );
                    })}
                </div>
            </motion.div>

            {/* Carousel Navigation Controls (Arrows & 9s Progress Dots) */}
            <div
              className="hero-carousel-controls"
              onFocus={(e) => {
                if (e.target && e.target.matches && e.target.matches(':focus-visible')) {
                  setIsFocused(true);
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsFocused(false);
                  registerCarouselInteraction();
                }
              }}
            >
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
                    <span
                      key={`dot-progress-${idx}-${currentSlide === idx}`}
                      className="dot-progress-bar"
                    ></span>
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
            </div>

            {/* Trust Strip */}
            <div className="hero-trust-bar">
              <div
                className="trust-item"
                onClick={() => window.dispatchEvent(new CustomEvent('open-live-demo'))}
                title="Click to view 7-Day Demo Terms"
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && window.dispatchEvent(new CustomEvent('open-live-demo'))
                }
              >
                <span className="trust-dot"></span>
                <span>
                  <strong>Live Demo:</strong> 7-Day Sandbox
                </span>
              </div>
              <div className="trust-divider"></div>
              <a
                href="/services/whatsapp-coexistence"
                className="trust-item trust-item-whatsapp"
                title="Learn about Official Meta WhatsApp Cloud API & Coexistence"
              >
                <span className="trust-whatsapp-badge">
                  <MessageSquare size={13} className="trust-whatsapp-icon" />
                </span>
                <span>
                  <strong>WhatsApp AI:</strong> Official Meta Cloud API
                </span>
              </a>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <ShieldCheck size={14} className="trust-shield" />
                <span>Enterprise SOC2 Ready</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive 3D Perspective Revenue Card Deck */}
          <div
            ref={stageRef}
            className="hero-3d-stage"
            aria-label="3D AI Revenue Hub"
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            {/* Scroll-linked depth pitch & vertical lift wrapper */}
            <motion.div
              className="hero-3d-deck-viewport"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: deckParallaxY,
                      rotateX: deckScrollRotateX,
                    }
              }
            >
              {/* Live mouse-driven 3D perspective stage tilt */}
              <motion.div
                className="hero-3d-deck-tilt"
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotateX: stageTiltRotateX,
                        rotateY: stageTiltRotateY,
                        x: stageShiftX,
                        y: stageShiftY,
                      }
                }
              >
                {/* Stacked next-slide depth preview card wrapped in perspective container */}
                {HERO_SLIDES.length > 1 && (
                  <Card3DTilt
                    containerClassName="hero-card-perspective-wrap hero-3d-card-backdrop"
                    className="hero-3d-deck-backdrop-shell"
                    perspective={1000}
                    maxRotation={6}
                    scale={1.03}
                  >
                    <button
                      type="button"
                      className="hero-3d-deck-backdrop-card"
                      onClick={nextSlide}
                      aria-label={`Next revenue view: ${nextSlideData?.badge || 'Next slide'}`}
                      title="Click to cycle 3D revenue deck"
                    >
                      <span className="hero-deck-backdrop-kicker">
                        Next · {String(((currentSlide + 1) % HERO_SLIDES.length) + 1).padStart(2, '0')}
                      </span>
                      <span className="hero-deck-backdrop-title">
                        {nextSlideData?.badge || 'AI REVENUE ENGINE'}
                      </span>
                      <span className="hero-deck-backdrop-metric">
                        {nextSlideData?.telemetry?.[0]?.value || '98/100 Intent'}
                      </span>
                    </button>
                  </Card3DTilt>
                )}

                {/* Active 3D Revenue Card Deck — each carousel card wrapped in its own perspective container */}
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={`floating-cards-${currentSlide}`}
                    custom={direction}
                    variants={deckVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="hero-3d-floating-layer"
                  >
                    <Card3DTilt
                      containerClassName="hero-card-perspective-wrap hero-3d-card-top"
                      className="hero-3d-float-card"
                      perspective={1000}
                      maxRotation={9}
                      scale={1.03}
                    >
                      <div className="hero-float-content elevate-3d-sm">
                        <div className="hero-float-header">
                          <span className="hero-float-dot pulse-emerald"></span>
                          <span className="hero-float-title">
                            {activeSlideData?.badge || 'AI CRM'}
                          </span>
                        </div>
                        <div className="hero-float-metric">
                          {activeSlideData?.telemetry?.[0]?.value || '98/100 Intent'}
                        </div>
                        <div className="hero-float-label">
                          {(activeSlideData?.telemetry?.[0]?.text || 'AI Lead Scoring:').replace(':', '')}
                        </div>
                      </div>
                    </Card3DTilt>

                    <Card3DTilt
                      containerClassName="hero-card-perspective-wrap hero-3d-card-bottom"
                      className="hero-3d-float-card"
                      perspective={1000}
                      maxRotation={9}
                      scale={1.03}
                    >
                      <div className="hero-float-content elevate-3d-md">
                        <div className="hero-float-header">
                          <span className="hero-float-dot pulse-cyan"></span>
                          <span className="hero-float-title">Continuous Sync</span>
                        </div>
                        <div className="hero-float-metric">
                          {activeSlideData?.telemetry?.[1]?.value || '$2.4M ARR (+38%)'}
                        </div>
                        <div className="hero-float-label">
                          {(activeSlideData?.telemetry?.[1]?.text || 'Pipeline:').replace(':', '')}
                        </div>
                      </div>
                    </Card3DTilt>

                    <Card3DTilt
                      containerClassName="hero-card-perspective-wrap hero-3d-card-status"
                      className="hero-3d-float-card hero-3d-float-card--compact"
                      perspective={1000}
                      maxRotation={7}
                      scale={1.03}
                    >
                      <div className="hero-float-status-pill elevate-3d-sm">
                        <span className="hero-status-live-pulse"></span>
                        <span>{activeSlideData?.telemetry?.[2]?.value || '99.99% Cloud SLA'}</span>
                      </div>
                    </Card3DTilt>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
