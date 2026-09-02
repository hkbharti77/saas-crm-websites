import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import './Card3DTilt.css';

export default function Card3DTilt({
  children,
  className = '',
  maxRotation = 12,
  glare = true,
  scale = 1.02,
  style = {},
  onClick
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [maxRotation, -maxRotation]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-maxRotation, maxRotation]),
    springConfig
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card-3d-tilt-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...style
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              rotateX: isHovered ? rotateX.get() : 0,
              rotateY: isHovered ? rotateY.get() : 0,
              scale: isHovered ? scale : 1,
            }
      }
      transition={{ duration: 0.2 }}
    >
      <div className="card-3d-inner" style={{ transformStyle: 'preserve-3d' }}>
        {children}
        {glare && isHovered && !shouldReduceMotion && (
          <motion.div
            className="card-3d-glare"
            style={{
              background: `radial-gradient(circle 320px at ${x.get() * 100}% ${y.get() * 100}%, rgba(255, 255, 255, 0.12), transparent 80%)`
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
