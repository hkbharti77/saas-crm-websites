import React, { useEffect, useId, useState } from 'react';
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
  pathColor = 'rgba(15, 118, 110, 0.2)',
  pathWidth = 2,
  pathOpacity = 0.3,
  gradientStartColor = '#14b8a6',
  gradientStopColor = '#06b6d4',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0
}) {
  const id = useId();
  const [d, setD] = useState('');

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef?.current || !fromRef?.current || !toRef?.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const controlY = startY - curvature;
      const curveD = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
      setD(curveD);
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePath);
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
    >
      <path
        d={d}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      <defs>
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
            x1: reverse ? ['100%', '-10%'] : ['-10%', '100%'],
            x2: reverse ? ['110%', '0%'] : ['0%', '110%'],
            y1: ['0%', '0%'],
            y2: ['0%', '0%']
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0.2
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
