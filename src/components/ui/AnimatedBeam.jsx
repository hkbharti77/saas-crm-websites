import React, { useEffect, useId, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import './AnimatedBeam.css';

export default function AnimatedBeam({
  className = '',
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = 'rgba(20, 184, 166, 0.25)',
  pathWidth = 2,
  pathOpacity = 0.6,
  gradientStartColor = '#14b8a6',
  gradientStopColor = '#06b6d4',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0
}) {
  const rawId = useId();
  const id = useMemo(() => `beam-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`, [rawId]);
  const [d, setD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = useMemo(() => {
    return reverse
      ? {
          x1: ['90%', '-10%'],
          x2: ['100%', '0%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%']
        }
      : {
          x1: ['10%', '110%'],
          x2: ['0%', '100%'],
          y1: ['0%', '0%'],
          y2: ['0%', '0%']
        };
  }, [reverse]);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef?.current || !fromRef?.current || !toRef?.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const svgWidth = Math.round(containerRect.width);
      const svgHeight = Math.round(containerRect.height);

      if (svgWidth <= 0 || svgHeight <= 0) return;

      setSvgDimensions(prev => {
        if (prev.width === svgWidth && prev.height === svgHeight) return prev;
        return { width: svgWidth, height: svgHeight };
      });

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      let startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      let endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      // Lock horizontal beam if vertical difference is small (e.g. flex row layout, subpixel reflow)
      if (curvature === 0 && Math.abs(startY - endY) <= 12) {
        const midY = (startY + endY) / 2;
        startY = midY;
        endY = midY;
      }

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 + curvature;
      const curveD = `M ${startX.toFixed(1)},${startY.toFixed(1)} Q ${controlX.toFixed(1)},${controlY.toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`;

      setD(prev => (prev === curveD ? prev : curveD));
    };

    updatePath();

    // Multi-phase sync for font loading, AOS transforms, and container layout stabilization
    const rafId = requestAnimationFrame(updatePath);
    const timer1 = setTimeout(updatePath, 60);
    const timer2 = setTimeout(updatePath, 250);
    const timer3 = setTimeout(updatePath, 600);

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(updatePath).catch(() => {});
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef?.current) resizeObserver.observe(containerRef.current);
    if (fromRef?.current) resizeObserver.observe(fromRef.current);
    if (toRef?.current) resizeObserver.observe(toRef.current);

    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', updatePath, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePath);
      window.removeEventListener('scroll', updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  if (!d) return null;

  return (
    <svg
      fill="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={`animated-beam-svg ${className}`}
      viewBox={svgDimensions.width && svgDimensions.height ? `0 0 ${svgDimensions.width} ${svgDimensions.height}` : undefined}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: '0%',
            x2: '0%',
            y1: '0%',
            y2: '0%'
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
      {/* Underlying static trace line */}
      <path
        d={d}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {/* Animated gradient beam */}
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth + 1}
        strokeLinecap="round"
        filter={`url(#glow-${id})`}
      />
      {/* High-visibility flowing laser pulse bullet */}
      <motion.path
        d={d}
        stroke={gradientStopColor}
        strokeWidth={pathWidth + 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0.18, pathOffset: reverse ? 1 : -0.2, opacity: 0 }}
        animate={{
          pathOffset: reverse ? [1, -0.2] : [-0.2, 1],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          delay,
          duration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.1
        }}
        filter={`url(#glow-${id})`}
      />
    </svg>
  );
}
