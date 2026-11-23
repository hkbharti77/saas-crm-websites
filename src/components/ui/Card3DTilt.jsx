import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import './Card3DTilt.css';

const TILT_SPRING = { damping: 24, stiffness: 210, mass: 0.55 };

export default function Card3DTilt({
  children,
  className = '',
  containerClassName = '',
  perspective = 1000,
  maxRotation = 8,
  glare = true,
  scale = 1.02,
  style = {},
  containerStyle = {},
  onClick,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const targetScale = useMotionValue(1);

  const smoothX = useSpring(pointerX, TILT_SPRING);
  const smoothY = useSpring(pointerY, TILT_SPRING);

  const rotateX = useTransform(smoothY, [0, 1], [maxRotation, -maxRotation]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxRotation, maxRotation]);
  const smoothScale = useSpring(targetScale, TILT_SPRING);

  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.14), transparent 78%)`;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const normalizedX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const normalizedY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!shouldReduceMotion) {
      targetScale.set(scale);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
    targetScale.set(1);
  };

  return (
    <div
      ref={containerRef}
      className={`card-3d-perspective ${containerClassName}`.trim()}
      style={{
        perspective: `${perspective}px`,
        ...containerStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className={`card-3d-tilt-root ${className}`.trim()}
        style={{
          transformStyle: 'preserve-3d',
          ...(shouldReduceMotion
            ? {}
            : {
                rotateX,
                rotateY,
                scale: smoothScale,
              }),
          ...style,
        }}
      >
        <div className="card-3d-inner" style={{ transformStyle: 'preserve-3d' }}>
          {children}
          {glare && !shouldReduceMotion && (
            <motion.div
              className="card-3d-glare"
              style={{
                background: glareBackground,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
