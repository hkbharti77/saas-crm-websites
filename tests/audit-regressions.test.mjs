import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function walkFiles(dir, ext) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkFiles(full, ext));
    } else if (full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

test('SSR entry-server.jsx maintains parity with client App.jsx for key static routes', () => {
  const appSrc = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const ssrSrc = fs.readFileSync(path.join(ROOT, 'src/entry-server.jsx'), 'utf8');

  const requiredRoutes = [
    '/services/hrms-development',
    '/services/ivr-solutions',
    '/industries/legal',
    '/unsubscribe',
    '/resources/sip-architecture',
    '/pricing',
    '/compare',
    '/compare/wati-vs-respond-io-vs-gyanvaniai',
    '/compare/custom-ai-crm-vs-off-the-shelf',
    '/seo/ai-visibility',
  ];

  for (const route of requiredRoutes) {
    assert.ok(appSrc.includes(route), `App.jsx should define route ${route}`);
    assert.ok(ssrSrc.includes(route), `entry-server.jsx should define SSR route ${route}`);
  }
});

test('Global CSS maintains typography scale, Tailwind v4 layers, and token integrity', () => {
  const indexCss = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert.ok(indexCss.includes('@custom-variant dark'), 'src/index.css must define Tailwind v4 dark custom variant');
  assert.ok(indexCss.includes('@layer base'), 'src/index.css must wrap base resets in @layer base');
  assert.ok(indexCss.includes('--font-mono'), 'src/index.css must define --font-mono token');

  const aeoCss = fs.readFileSync(path.join(ROOT, 'src/components/AEOAnswerBlock.css'), 'utf8');
  assert.equal(aeoCss.includes('!important'), false, 'AEOAnswerBlock.css should have zero !important overrides');

  const cssFiles = walkFiles(path.join(ROOT, 'src'), '.css');
  const syntheticWeightViolations = [];
  const sub12pxViolations = [];

  for (const file of cssFiles) {
    const rel = path.relative(ROOT, file);
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
      if (/font-weight\s*:\s*(450|550|650|750|850|900)\b/.test(line)) {
        syntheticWeightViolations.push(`${rel}:${i + 1}: ${trimmed}`);
      }
      const rem = line.match(/font-size\s*:\s*([0-9]*\.?[0-9]+)rem\b/);
      if (rem && parseFloat(rem[1]) > 0 && parseFloat(rem[1]) < 0.75) {
        sub12pxViolations.push(`${rel}:${i + 1}: ${trimmed}`);
      }
      const px = line.match(/font-size\s*:\s*([0-9]*\.?[0-9]+)px\b/);
      if (px && parseFloat(px[1]) > 0 && parseFloat(px[1]) < 12) {
        sub12pxViolations.push(`${rel}:${i + 1}: ${trimmed}`);
      }
    });
  }

  assert.deepEqual(syntheticWeightViolations, [], 'No unloaded synthetic font weights in CSS');
  assert.deepEqual(sub12pxViolations, [], 'No sub-12px font sizes in CSS');
});

test('Security and iframe safety regressions stay resolved', () => {
  const firebaseSrc = fs.readFileSync(path.join(ROOT, 'src/firebase.js'), 'utf8');
  assert.equal(/app\s*password/i.test(firebaseSrc), false, 'firebase.js must not contain app password comments');

  const contactModalSrc = fs.readFileSync(path.join(ROOT, 'src/components/ContactModal.jsx'), 'utf8');
  assert.equal(/\balert\s*\(/.test(contactModalSrc), false, 'ContactModal.jsx must not call window.alert');

  const noWindowOpenFiles = [
    'src/components/DemoModal.jsx',
    'src/components/BlogCTA.jsx',
    'src/pages/BlogPost.jsx',
  ];
  for (const rel of noWindowOpenFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.equal(/\bwindow\.open\s*\(/.test(content), false, `${rel} must not call window.open`);
  }
});

test('landingPageService deduplicates concurrent /api/public/landing-page fetches', async () => {
  const originalFetch = global.fetch;
  let fetchCount = 0;

  global.fetch = async () => {
    fetchCount += 1;
    await new Promise((r) => setTimeout(r, 25));
    return {
      ok: true,
      json: async () => ({
        success: true,
        data: { hero: { titlePrefix: 'Enterprise AI', titleGradient: 'for modern teams' } },
      }),
    };
  };

  try {
    const mod = await import('../src/services/landingPageService.js');
    mod.clearLandingPageCache();
    const results = await Promise.all([
      mod.fetchLandingPageData(),
      mod.fetchLandingPageData(),
      mod.fetchLandingPageData(),
      mod.fetchLandingPageData(),
    ]);
    assert.equal(fetchCount, 1, '4 concurrent fetchLandingPageData() calls should trigger exactly 1 fetch');
    assert.equal(results[0]?.data?.hero?.titlePrefix, 'Enterprise AI');
    assert.equal(results[3]?.data?.hero?.titlePrefix, 'Enterprise AI');
  } finally {
    global.fetch = originalFetch;
  }
});

test('Page transitions wrap App.jsx routes in AnimatePresence + motion.div with 150ms pageTransitionVariants', async () => {
  const configSrc = fs.readFileSync(path.join(ROOT, 'src/components/transitions/transitionConfig.js'), 'utf8');
  const appCss = fs.readFileSync(path.join(ROOT, 'src/App.css'), 'utf8');
  const heroSrc = fs.readFileSync(path.join(ROOT, 'src/components/Hero.jsx'), 'utf8');
  const appSrc = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');

  assert.ok(appSrc.includes('<AnimatePresence'), 'App.jsx must wrap application routes in AnimatePresence');
  assert.ok(appSrc.includes('<motion.div'), 'App.jsx must render a motion.div route transition wrapper');
  assert.ok(appSrc.includes('pageTransitionVariants'), 'App.jsx must use pageTransitionVariants from motion.config');
  assert.ok(appSrc.includes('<Routes location={location}>'), 'App.jsx must pass location to Routes for clean AnimatePresence exit');
  assert.ok(appSrc.includes('initial={false}'), 'AnimatePresence must skip initial fade-in for instant LCP');
  assert.ok(appSrc.includes('exit="exit"'), 'App.jsx motion wrapper must declare exit="exit"');
  assert.equal(configSrc.includes('rotateY'), false, 'transitionConfig must not use 3D rotateY book-flip');
  assert.equal(appCss.includes('preserve-3d'), false, 'App.css must not set transform-style: preserve-3d (breaks position: sticky)');
  assert.equal(heroSrc.includes('mode="wait"'), false, 'Hero slider must not block slide changes with mode="wait"');
  assert.equal(heroSrc.includes('blur('), false, 'Hero slider must not animate expensive CSS blur filters');
  assert.ok(appSrc.includes('<RouteProgressBar />'), 'App.jsx must render RouteProgressBar');

  const { getPageEnterVariants, ROUTE_TRANSITION_DURATION, ROUTE_EXIT_DURATION } = await import('../src/components/transitions/transitionConfig.js');
  assert.equal(ROUTE_TRANSITION_DURATION, 0.15, 'Route fade-in/lift duration must be 150ms');
  assert.ok(ROUTE_EXIT_DURATION <= 0.1, 'Route exit fade-out must be <= 100ms');
  const variants = getPageEnterVariants(false);
  assert.equal(variants.animate.transition.duration, 0.15);
  assert.equal(variants.animate.transitionEnd.transform, 'none');
  assert.equal(variants.exit.opacity, 0);

  const { resolveRouteLoader } = await import('../src/utils/routePrefetch.js');
  assert.equal(typeof resolveRouteLoader('/pricing'), 'function');
  assert.equal(typeof resolveRouteLoader('/industries/finance'), 'function');
  assert.equal(typeof resolveRouteLoader('/blog/enterprise-voice-ai'), 'function');
  assert.equal(resolveRouteLoader('/industries/finance'), resolveRouteLoader('/services/ai-agent-development'));
});

test('src/lib/motion.config.js exposes standardized variants and transitions for stagger, fade-ins, and page-lift', async () => {
  const motionConfig = await import('../src/lib/motion.config.js');

  assert.equal(motionConfig.MOTION_TRANSITIONS.pageEnter.duration, 0.15);
  assert.equal(motionConfig.MOTION_TRANSITIONS.pageExit.duration, 0.08);
  assert.equal(motionConfig.pageTransitionVariants.initial.y, 8);
  assert.equal(motionConfig.pageTransitionVariants.animate.transition.duration, 0.15);
  assert.equal(motionConfig.pageTransitionVariants.animate.transitionEnd.transform, 'none');
  assert.equal(motionConfig.pageLiftVariants, motionConfig.pageTransitionVariants);
  assert.equal(motionConfig.fadeInVariants.hidden.opacity, 0);
  assert.equal(motionConfig.fadeInVariants.visible.opacity, 1);
  assert.equal(motionConfig.staggerContainerVariants.show.transition.staggerChildren, 0.05);
  assert.equal(motionConfig.staggerItemVariants.hidden.y, 10);
  assert.equal(motionConfig.heroMediaVariants.center.opacity, 0.94);

  const reducedPage = motionConfig.createPageTransitionVariants(true);
  assert.equal(reducedPage.initial.y, undefined);
  assert.equal(reducedPage.animate.transition.ease, 'linear');
});

test('useScrollReveal integrates motion/react useScroll & useTransform with motion.config.js and powers ScrollReveal + Home sections', async () => {
  const motionConfig = await import('../src/lib/motion.config.js');
  const hookSrc = fs.readFileSync(path.join(ROOT, 'src/hooks/useScrollReveal.js'), 'utf8');
  const revealSrc = fs.readFileSync(path.join(ROOT, 'src/components/transitions/ScrollReveal.jsx'), 'utf8');
  const homeSrc = fs.readFileSync(path.join(ROOT, 'src/pages/Home.jsx'), 'utf8');

  assert.equal(motionConfig.SCROLL_REVEAL_CONFIG.once, true);
  assert.equal(motionConfig.SCROLL_REVEAL_CONFIG.yOffset, 12);
  assert.equal(motionConfig.SCROLL_REVEAL_CONFIG.duration, motionConfig.MOTION_DURATION.fadeIn);
  assert.deepEqual(motionConfig.SCROLL_REVEAL_CONFIG.parallaxRange, [10, -10]);
  assert.equal(motionConfig.SCROLL_REVEAL_CONFIG.enableParallax, true);

  assert.ok(hookSrc.includes("from 'motion/react'"), 'useScrollReveal must import from motion/react');
  assert.ok(hookSrc.includes('useScroll'), 'useScrollReveal must integrate useScroll');
  assert.ok(hookSrc.includes('useTransform'), 'useScrollReveal must integrate useTransform');
  assert.ok(hookSrc.includes('useInView'), 'useScrollReveal must integrate useInView for one-time reveal');
  assert.ok(hookSrc.includes('useReducedMotion'), 'useScrollReveal must respect prefers-reduced-motion');
  assert.ok(hookSrc.includes('../lib/motion.config'), 'useScrollReveal must consume tokens from motion.config.js');

  assert.ok(revealSrc.includes('useScrollReveal'), 'ScrollReveal component must consume useScrollReveal');
  assert.ok(revealSrc.includes("position: 'relative'"), 'ScrollReveal must provide non-static relative target container for useScroll');

  assert.ok(homeSrc.includes('ScrollReveal'), 'Home.jsx must import and use ScrollReveal');
  assert.equal(homeSrc.includes('data-aos='), false, 'Home.jsx must not retain legacy data-aos wrappers');
  assert.ok(homeSrc.includes('SECTION_CONTAINMENT_STYLES'), 'Home.jsx must preserve CLS containment styles');
});

test('Hero carousel uses calm 9s/550ms pacing, 3D perspective Revenue Card Deck, scroll parallax, Pause/Play toggle, and reactive Card3DTilt springs', async () => {
  const motionConfig = await import('../src/lib/motion.config.js');
  const heroSrc = fs.readFileSync(path.join(ROOT, 'src/components/Hero.jsx'), 'utf8');
  const heroCss = fs.readFileSync(path.join(ROOT, 'src/components/Hero.css'), 'utf8');
  const tiltSrc = fs.readFileSync(path.join(ROOT, 'src/components/ui/Card3DTilt.jsx'), 'utf8');

  assert.equal(motionConfig.HERO_CAROUSEL_CONFIG.dwellMs, 9000, 'Hero carousel dwell time must be 9000ms (9s)');
  assert.equal(motionConfig.HERO_CAROUSEL_CONFIG.transitionDuration, 0.55, 'Hero transition duration must be 550ms');
  assert.equal(motionConfig.MOTION_DURATION.heroSwap, 0.55);
  assert.equal(motionConfig.heroDeckVariants.enter(1).rotateY, motionConfig.HERO_CAROUSEL_CONFIG.deckRotateY);
  assert.equal(motionConfig.heroDeckVariants.center.rotateY, 0);

  assert.ok(heroSrc.includes('HERO_CAROUSEL_CONFIG'), 'Hero must use HERO_CAROUSEL_CONFIG');
  assert.ok(heroSrc.includes('useScroll'), 'Hero must integrate useScroll for depth parallax');
  assert.ok(heroSrc.includes('useTransform'), 'Hero must integrate useTransform for depth parallax');
  assert.ok(heroSrc.includes('createHeroDeckVariants'), 'Hero must use 3D perspective deck variants');
  assert.equal(heroSrc.includes('carousel-pause-btn'), false, 'Hero must not render the Pause/Play button');
  assert.equal(heroSrc.includes('carousel-slide-counter'), false, 'Hero must not render the slide number counter');
  assert.equal(heroSrc.includes('carousel-playback-status'), false, 'Hero must not render the Paused status text');
  assert.ok(heroCss.includes('var(--hero-slide-duration, 9000ms)'), 'Hero.css must sync dot progress duration via --hero-slide-duration');

  assert.equal(tiltSrc.includes('rotateX.get()'), false, 'Card3DTilt must bind reactive MotionValues instead of calling .get() in animate');
  assert.ok(tiltSrc.includes('useMotionTemplate'), 'Card3DTilt must bind glare reactively with useMotionTemplate');
  assert.ok(tiltSrc.includes('card-3d-perspective'), 'Card3DTilt must wrap the motion surface in an outer perspective container');
  assert.ok(heroSrc.includes('hero-card-perspective-wrap'), 'Hero carousel cards must be wrapped in dedicated perspective containers');
  assert.ok(heroCss.includes('.hero-card-perspective-wrap'), 'Hero.css must style the outer perspective container separately from the inner tilted card');
});

test('Hero playback controller respects user-initiated pause and resumes interaction pauses only after 15s inactivity', async () => {
  const { HERO_INACTIVITY_RESUME_MS, resolveHeroPlaybackState } = await import('../src/utils/heroPlayback.js');
  const heroSrc = fs.readFileSync(path.join(ROOT, 'src/components/Hero.jsx'), 'utf8');

  assert.equal(HERO_INACTIVITY_RESUME_MS, 15000, 'Inactivity auto-resume delay must be exactly 15 seconds');

  // Playing normally
  const playing = resolveHeroPlaybackState({ slidesCount: 4 });
  assert.equal(playing.mode, 'playing');
  assert.equal(playing.isAutoAdvancing, true);
  assert.equal(playing.shouldRunInactivityTimer, false);
  assert.equal(playing.statusLabel, '');

  // User-initiated pause must NOT start the 15s auto-resume timer even if interaction pause was set
  const userPaused = resolveHeroPlaybackState({
    slidesCount: 4,
    isUserPaused: true,
    isInteractionPaused: true,
    resumeSecondsLeft: 12,
  });
  assert.equal(userPaused.mode, 'user-paused');
  assert.equal(userPaused.isPaused, true);
  assert.equal(userPaused.isAutoAdvancing, false);
  assert.equal(userPaused.shouldRunInactivityTimer, false);
  assert.equal(userPaused.statusLabel, 'Paused');

  // Interaction pause without user pause runs 15s inactivity timer and shows subtle countdown label
  const interactionPaused = resolveHeroPlaybackState({
    slidesCount: 4,
    isInteractionPaused: true,
    resumeSecondsLeft: 15,
  });
  assert.equal(interactionPaused.mode, 'inactivity-paused');
  assert.equal(interactionPaused.isPaused, true);
  assert.equal(interactionPaused.shouldRunInactivityTimer, true);
  assert.equal(interactionPaused.statusLabel, 'Resumes in 15s');

  // Hovering holds pause without counting down until pointer leaves
  const hoverPaused = resolveHeroPlaybackState({
    slidesCount: 4,
    isHovered: true,
    isInteractionPaused: true,
    resumeSecondsLeft: 15,
  });
  assert.equal(hoverPaused.mode, 'hover-paused');
  assert.equal(hoverPaused.shouldRunInactivityTimer, false);
  assert.equal(hoverPaused.statusLabel, 'Paused');

  // Reduced motion keeps auto-advance disabled
  const reduced = resolveHeroPlaybackState({ slidesCount: 4, prefersReducedMotion: true });
  assert.equal(reduced.isAutoAdvancing, false);
  assert.equal(reduced.shouldRunInactivityTimer, false);

  assert.ok(heroSrc.includes('HERO_INACTIVITY_RESUME_MS'), 'Hero.jsx must wire HERO_INACTIVITY_RESUME_MS into useEffect');
});

test('Pricing page exposes Transparent Engineering Partnerships tiers, Operational Invariants, mode switcher, and Book a Demo prefill', async () => {
  const {
    PRICING_VIEW_MODES,
    resolvePricingViewMode,
    ENGINEERING_PARTNERSHIPS_HEADER,
    ENGINEERING_PARTNERSHIP_TIERS,
    OPERATIONAL_INVARIANTS,
  } = await import('../src/config/engineeringPartnershipsConfig.js');
  const { engineeringPartnershipsSchema } = await import('../src/utils/pricingSchemas.js');

  assert.equal(resolvePricingViewMode(null), PRICING_VIEW_MODES.PARTNERSHIPS);
  assert.equal(resolvePricingViewMode('partnerships'), PRICING_VIEW_MODES.PARTNERSHIPS);
  assert.equal(resolvePricingViewMode('saas'), PRICING_VIEW_MODES.SAAS);
  assert.equal(resolvePricingViewMode('SAAS'), PRICING_VIEW_MODES.SAAS);
  assert.equal(resolvePricingViewMode('unknown-value'), PRICING_VIEW_MODES.PARTNERSHIPS);

  assert.equal(ENGINEERING_PARTNERSHIPS_HEADER.title, 'Transparent Engineering Partnerships');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS.length, 3);

  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[0].tierLabel, 'TIER 01');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[0].durationLabel, '5 Business Days');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[0].pricePrimary, '₹24,999 / $299');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[0].ctaLabel, 'Deploy WhatsApp AI Helpdesk');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[0].deliverables.length, 5);

  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].tierLabel, 'TIER 02');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].durationLabel, '14 Calendar Days');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].recommendedLabel, 'Recommended Velocity');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].pricePrimary, '₹69,999 / $850');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].ctaLabel, 'Reserve Sprint Slot');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[1].deliverables.length, 5);

  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[2].tierLabel, 'TIER 03');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[2].durationLabel, '4 to 8 Weeks');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[2].pricePrimary, 'Custom Scope');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[2].ctaLabel, 'Initiate Enterprise Dispatch');
  assert.equal(ENGINEERING_PARTNERSHIP_TIERS[2].deliverables.length, 5);

  assert.equal(OPERATIONAL_INVARIANTS.eyebrow, 'OPERATIONAL INVARIANTS');
  assert.equal(OPERATIONAL_INVARIANTS.title, 'Guaranteed standards on every engagement');
  assert.deepEqual(
    OPERATIONAL_INVARIANTS.items.map((item) => item.title),
    ['100% IP Ownership', 'Production Rigor', 'No Black Boxes', 'Compute Economics']
  );

  const schema = engineeringPartnershipsSchema();
  assert.equal(schema['@type'], 'Service');
  assert.equal(schema.hasOfferCatalog.itemListElement.length, 3);

  const pricingPageSrc = fs.readFileSync(path.join(ROOT, 'src/pages/PricingPage.jsx'), 'utf8');
  const appSrc = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const contactModalSrc = fs.readFileSync(path.join(ROOT, 'src/components/ContactModal.jsx'), 'utf8');

  assert.ok(pricingPageSrc.includes('role="tablist"'), 'PricingPage must expose accessible mode switcher tablist');
  assert.ok(pricingPageSrc.includes('EngineeringPartnerships'), 'PricingPage must render EngineeringPartnerships');
  assert.ok(appSrc.includes('prefillInquiryType={modalInquiryType}'), 'App.jsx must forward prefillInquiryType to ContactModal');
  assert.ok(contactModalSrc.includes('prefillInquiryType'), 'ContactModal must support prefillInquiryType');
});

test('Dual-currency pricing helper formats INR and USD dynamically across all pricing tiers', async () => {
  const {
    formatCurrencyAmount,
    formatDualCurrencyPrice,
    formatPlanDualPrice,
    formatPlanYearlyTotals,
  } = await import('../src/utils/formatPricing.js');

  assert.equal(formatCurrencyAmount(24999, 'INR'), '₹24,999');
  assert.equal(formatCurrencyAmount(100000, 'INR'), '₹1,00,000');
  assert.equal(formatCurrencyAmount(299, 'USD'), '$299');
  assert.equal(formatCurrencyAmount(1200, 'USD'), '$1,200');
  assert.equal(formatCurrencyAmount(null, 'INR'), null);

  // Dual-currency formatting across Engineering Partnership and SaaS tiers
  assert.equal(formatDualCurrencyPrice(24999, 299), '₹24,999 / $299');
  assert.equal(formatDualCurrencyPrice(69999, 850), '₹69,999 / $850');
  assert.equal(formatDualCurrencyPrice(null, null, { fallback: 'Custom Scope' }), 'Custom Scope');
  assert.equal(formatDualCurrencyPrice(24999, null), '₹24,999');
  assert.equal(formatDualCurrencyPrice(null, 299), '$299');

  // SaaS monthly / yearly dual-currency formatting & totals
  const starterPrice = { monthlyInr: 1999, yearlyInr: 1599, monthlyUsd: 19, yearlyUsd: 15 };
  assert.equal(formatPlanDualPrice(starterPrice, 'monthly'), '₹1,999 / $19');
  assert.equal(formatPlanDualPrice(starterPrice, 'yearly'), '₹1,599 / $15');
  assert.equal(formatPlanDualPrice(null, 'monthly', { fallback: 'Custom' }), 'Custom');

  const yearlyTotals = formatPlanYearlyTotals(starterPrice);
  assert.equal(yearlyTotals.annualTotal, '₹19,188 / $180');
  assert.equal(yearlyTotals.annualSavings, '₹4,800 / $48');
  assert.equal(yearlyTotals.hasSavings, true);

  // Verify all pricing card components consume the shared helpers
  const epSrc = fs.readFileSync(path.join(ROOT, 'src/components/EngineeringPartnerships.jsx'), 'utf8');
  const pricingSrc = fs.readFileSync(path.join(ROOT, 'src/components/Pricing.jsx'), 'utf8');
  const detailSrc = fs.readFileSync(path.join(ROOT, 'src/pages/PlanDetailPage.jsx'), 'utf8');

  assert.ok(epSrc.includes('formatDualCurrencyPrice'), 'EngineeringPartnerships.jsx must use formatDualCurrencyPrice');
  assert.ok(pricingSrc.includes('formatPlanDualPrice'), 'Pricing.jsx must use formatPlanDualPrice');
  assert.ok(pricingSrc.includes('formatDualCurrencyPrice'), 'Pricing.jsx must use formatDualCurrencyPrice for add-ons');
  assert.ok(detailSrc.includes('formatPlanDualPrice'), 'PlanDetailPage.jsx must use formatPlanDualPrice');
});

test('AI visibility analyzer detects Gyan VaniAi mentions/citations without VaaniAI false positives and builds CSV/URLs', async () => {
  const {
    analyzeVisibilityProbeResult,
    buildExternalProbeUrl,
    mergeBenchmarkRecords,
    benchmarksToCsv,
  } = await import('../src/utils/aiVisibilityAnalyzer.js');

  // 1. Positive brand mention + grounding chunk citation + competitor extraction
  const positive = analyzeVisibilityProbeResult({
    query: 'best WhatsApp Coexistence CRM India',
    answerText: 'Gyan VaniAi offers native Meta WhatsApp Coexistence alongside Wati and Respond.io.',
    groundingChunks: [
      { web: { uri: 'https://www.wati.io/pricing', title: 'wati.io' } },
      { web: { uri: 'https://www.gyanvaniai.com/compare/wati-vs-respond-io-vs-gyanvaniai', title: 'gyanvaniai.com' } },
    ],
  });
  assert.equal(positive.mentioned, true);
  assert.equal(positive.cited, true);
  assert.equal(positive.citationPosition, 2);
  assert.equal(positive.citationUrl, 'https://www.gyanvaniai.com/compare/wati-vs-respond-io-vs-gyanvaniai');
  assert.ok(positive.competitorsMentioned.includes('Wati'));
  assert.ok(positive.competitorsMentioned.includes('Respond.io'));
  assert.equal(positive.competitorsMentioned.includes('VaaniAI'), false, 'Gyan VaniAi must not false-positive as VaaniAI');

  // 2. Unrelated VaaniAI mention must NOT false-positive as Gyan VaniAi
  const unrelated = analyzeVisibilityProbeResult({
    query: 'what is VaaniAI',
    answerText: 'VaaniAI is an unrelated consumer voice tool, distinct from Respond.io.',
    groundingChunks: [{ web: { uri: 'https://example.com/vaaniai', title: 'example.com' } }],
  });
  assert.equal(unrelated.mentioned, false);
  assert.equal(unrelated.cited, false);
  assert.ok(unrelated.competitorsMentioned.includes('VaaniAI'));

  // 3. External verification URLs & RFC-4180 CSV export
  assert.ok(buildExternalProbeUrl('Perplexity', 'Gyan VaniAi pricing').startsWith('https://www.perplexity.ai/search?q='));
  assert.ok(buildExternalProbeUrl('ChatGPT Search', 'Gyan VaniAi pricing').startsWith('https://chatgpt.com/?q='));
  assert.ok(buildExternalProbeUrl('Claude', 'Gyan VaniAi pricing').startsWith('https://claude.ai/new?q='));

  const merged = mergeBenchmarkRecords(
    [{ id: 'b1', query: 'q1', platform: 'Gemini', status: 'Not yet measured', mentioned: false, cited: false }],
    { b1: { status: 'Measured', mentioned: true, cited: true } }
  );
  assert.equal(merged.length, 1);
  assert.equal(merged[0].status, 'Measured');
  assert.equal(merged[0].mentioned, true);

  const csv = benchmarksToCsv(merged);
  assert.ok(csv.includes('ID,Query,Platform,Status,Mentioned,Cited'));
  assert.ok(csv.includes('b1,q1,Gemini,Measured,YES,YES'));
});

test('Comparison config formats dual INR/USD/single currency dynamically and preserves canonical entity identity', async () => {
  const {
    ALL_COMPARISONS,
    formatComparisonPrice,
  } = await import('../src/config/comparisonsConfig.js');
  const { CANONICAL_ENTITY, LATENCY_BENCHMARKS } = await import('../src/config/entityIdentityConfig.js');

  assert.equal(ALL_COMPARISONS.length, 2);
  assert.equal(formatComparisonPrice({ inr: 1999, usd: 19, suffix: '/mo' }, 'dual'), '₹1,999 / $19/mo');
  assert.equal(formatComparisonPrice({ inr: 1999, usd: 19, suffix: '/mo' }, 'inr'), '₹1,999/mo');
  assert.equal(formatComparisonPrice({ inr: 1999, usd: 19, suffix: '/mo' }, 'usd'), '$19/mo');
  assert.equal(formatComparisonPrice(null, 'dual'), 'Custom Scope');

  assert.equal(CANONICAL_ENTITY.headquarters.city, 'Noida');
  assert.equal(CANONICAL_ENTITY.registeredOffice.city, 'Simri Bakhtiarpur');
  assert.deepEqual(
    LATENCY_BENCHMARKS.map((b) => b.target),
    ['< 300ms', '< 400ms', '< 600ms']
  );
});

test('Live repository manifests, schemas, RSS, sitemap, and HTML pass all 8 2026 Technical GEO Health checks', async () => {
  const { evaluateTechnicalGeoHealth } = await import('../src/utils/aiVisibilityAnalyzer.js');

  const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const report = evaluateTechnicalGeoHealth({
    robotsTxt: read('public/robots.txt'),
    llmsTxt: read('public/llms.txt'),
    llmsFullTxt: read('public/llms-full.txt'),
    llmSummaryRaw: read('public/api/llm-summary.json'),
    rssXml: read('public/rss.xml'),
    sitemapXml: read('public/sitemap.xml'),
    indexHtml: read('index.html'),
    schemasJs: read('src/utils/schemas.js'),
  });

  const failed = report.checks.filter((c) => !c.passed).map((c) => `${c.id}: ${c.detail}`);
  assert.deepEqual(failed, [], 'All 8 2026 Technical GEO Health checks must pass on live repository files');
  assert.equal(report.passedCount, 8);
  assert.equal(report.totalChecks, 8);
  assert.equal(report.allPassed, true);

  // Also ensure AeoVisibilityDashboard never calls window.open or window.alert
  const dashSrc = read('src/pages/AeoVisibilityDashboard.jsx');
  assert.equal(/\bwindow\.open\s*\(/.test(dashSrc), false, 'AeoVisibilityDashboard must not call window.open');
  assert.equal(/\balert\s*\(/.test(dashSrc), false, 'AeoVisibilityDashboard must not call window.alert');
});

test('Browser SEO & SERP Readiness passes edge routing, depth-1 Header link equity, hreflang, and SERP snippet checks', async () => {
  const { evaluateBrowserSeoReadiness, PRIORITY_SERP_ROUTES } = await import(
    '../src/utils/aiVisibilityAnalyzer.js'
  );
  const { generateHreflangTags } = await import('../src/utils/seoHelpers.js');

  const hreflangs = generateHreflangTags('/compare');
  assert.equal(hreflangs.length, 5);
  assert.deepEqual(
    hreflangs.map((h) => h.hreflang),
    ['en-IN', 'en-US', 'en-GB', 'en-AE', 'en-SG']
  );
  assert.equal(hreflangs[0].href, 'https://www.gyanvaniai.com/compare');

  const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const viteConfigSrc = read('vite.config.js');
  const prerenderSrc = read('scripts/prerender.js');
  assert.ok(
    viteConfigSrc.includes('cssCodeSplit: false'),
    'vite.config.js must disable cssCodeSplit so all prerendered routes load complete CSS immediately'
  );
  assert.ok(
    prerenderSrc.includes('CRITICAL SSG ASSET ERROR'),
    'scripts/prerender.js must assert that Vite production CSS and JS bundles exist in <head>'
  );

  const prerenderedPages = {};
  for (const item of PRIORITY_SERP_ROUTES) {
    const cleanRoute = item.route.replace(/^\/+|\/+$/g, '');
    const distRelPath = cleanRoute ? `dist/${cleanRoute}/index.html` : 'dist/index.html';
    const fullPath = path.join(ROOT, distRelPath);
    if (fs.existsSync(fullPath)) {
      const html = fs.readFileSync(fullPath, 'utf8');
      prerenderedPages[item.route] = html;

      const cssMatch = html.match(/<link\s+rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"/i);
      const jsMatch = html.match(/<script\s+type="module"[^>]+src="(\/assets\/[^"]+\.js)"/i);
      assert.ok(cssMatch, `${distRelPath} must contain a compiled /assets/*.css stylesheet link in <head>`);
      assert.ok(jsMatch, `${distRelPath} must contain a compiled /assets/*.js module script in <head>`);

      const cssDiskPath = path.join(ROOT, 'dist', cssMatch[1].replace(/^\/+/, ''));
      const jsDiskPath = path.join(ROOT, 'dist', jsMatch[1].replace(/^\/+/, ''));
      assert.ok(fs.existsSync(cssDiskPath), `Referenced CSS asset ${cssMatch[1]} must exist on disk in dist/`);
      assert.ok(fs.existsSync(jsDiskPath), `Referenced JS asset ${jsMatch[1]} must exist on disk in dist/`);
    }
  }

  const browserSeo = evaluateBrowserSeoReadiness({
    vercelJsonRaw: read('vercel.json'),
    sitemapXml: read('public/sitemap.xml'),
    headerJsx: read('src/components/Header.jsx'),
    prerenderedPages,
  });

  const failed = browserSeo.checks.filter((c) => !c.passed).map((c) => `${c.id}: ${c.detail}`);
  assert.deepEqual(failed, [], 'All 6 Browser SEO & SERP Readiness checks must pass');
  assert.equal(browserSeo.allPassed, true);
  assert.equal(browserSeo.routeAudits.length, 7);
});

test('Global CSS isolates resets/primitives in Tailwind v4 layers and prevents cross-file selector collisions in production', () => {
  const indexCss = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  const appCss = fs.readFileSync(path.join(ROOT, 'src/App.css'), 'utf8');

  // 1. Both global stylesheets must use @layer base and @layer components
  assert.ok(indexCss.includes('@layer base'), 'src/index.css must wrap element defaults in @layer base');
  assert.ok(indexCss.includes('@layer components'), 'src/index.css must wrap shared primitives in @layer components');
  assert.ok(appCss.includes('@layer base'), 'src/App.css must wrap <main> defaults in @layer base');
  assert.ok(appCss.includes('@layer components'), 'src/App.css must wrap shell helpers in @layer components');

  // 2. Regression guards for previously identified global bleeds and typos
  assert.equal(appCss.includes('justifyContent:'), false, 'src/App.css must not contain camelCase justifyContent typo');
  assert.equal(/\bbutton:active\b/.test(appCss), false, 'src/App.css must not bleed global button:active transforms onto dynamic components');
  assert.equal(/^\.(?:text-xs|text-sm|text-base|text-lg|tabular-nums)\s*\{/m.test(indexCss), false, 'src/index.css must not redefine unlayered Tailwind typography utilities');

  // 3. Verify zero unlayered bare element rules in index.css / App.css (outside @layer base and #crm-chat-widget)
  for (const rel of ['src/index.css', 'src/App.css']) {
    const css = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    let depth = 0;
    let inLayer = false;
    let layerDepth = -1;
    let inKf = false;
    let kfDepth = -1;
    let buf = '';
    const unlayeredViolations = [];

    for (let i = 0; i < css.length; i++) {
      const ch = css[i];
      if (ch === '{') {
        const sel = buf.trim();
        buf = '';
        if (/^@layer\s+(?:base|components|utilities)\b/i.test(sel)) {
          inLayer = true;
          layerDepth = depth;
        } else if (/^@(-webkit-)?keyframes\b/i.test(sel)) {
          inKf = true;
          kfDepth = depth;
        } else if (sel && !sel.startsWith('@') && !inKf && !inLayer) {
          for (const part of sel.split(',').map((s) => s.trim())) {
            if (
              /^(\*|html|body|main|section|h[1-6]|p|a|button|ul|ol|li|img)\b/i.test(part) &&
              !part.startsWith('body.dark-theme')
            ) {
              unlayeredViolations.push(`${rel}: ${part}`);
            }
          }
        }
        depth++;
      } else if (ch === '}') {
        depth--;
        if (inLayer && depth === layerDepth) { inLayer = false; layerDepth = -1; }
        if (inKf && depth === kfDepth) { inKf = false; kfDepth = -1; }
        buf = '';
      } else if (ch === ';') {
        buf = '';
      } else {
        buf += ch;
      }
    }
    assert.deepEqual(unlayeredViolations, [], `${rel} must not contain unlayered bare element selectors`);
  }

  // 4. Verify zero unscoped top-level class collisions across all CSS files in src/
  const cssFiles = walkFiles(path.join(ROOT, 'src'), '.css');
  const topClassFiles = new Map();
  for (const file of cssFiles) {
    const rel = path.relative(ROOT, file);
    const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    let depth = 0;
    let inKf = false;
    let kfDepth = -1;
    let buf = '';

    for (let i = 0; i < css.length; i++) {
      const ch = css[i];
      if (ch === '{') {
        const sel = buf.trim();
        buf = '';
        if (/^@(-webkit-)?keyframes\b/i.test(sel)) {
          inKf = true;
          kfDepth = depth;
        } else if (sel && !sel.startsWith('@') && !inKf) {
          for (const part of sel.split(',').map((s) => s.trim())) {
            const match = part.match(/^\.([a-zA-Z0-9_-]+)(?::[a-zA-Z-]+(?:\([^)]*\))?)?$/);
            if (match) {
              const cls = `.${match[1]}`;
              if (!topClassFiles.has(cls)) topClassFiles.set(cls, new Set());
              topClassFiles.get(cls).add(rel);
            }
          }
        }
        depth++;
      } else if (ch === '}') {
        depth--;
        if (inKf && depth === kfDepth) { inKf = false; kfDepth = -1; }
        buf = '';
      } else if (ch === ';') {
        buf = '';
      } else {
        buf += ch;
      }
    }
  }

  const collisions = [...topClassFiles.entries()]
    .filter(([, set]) => set.size >= 2)
    .map(([cls, set]) => `${cls} (${Array.from(set).join(', ')})`);

  assert.deepEqual(collisions, [], 'Production CSS bundle must have zero unscoped cross-file class collisions');
});





