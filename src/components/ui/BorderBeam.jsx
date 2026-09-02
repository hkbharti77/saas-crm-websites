import React from 'react';
import { motion } from 'motion/react';
import './BorderBeam.css';

export default function BorderBeam({
  className = '',
  size = 120,
  duration = 8,
  delay = 0,
  colorFrom = '#14b8a6',
  colorTo = '#06b6d4',
  borderWidth = 1.5,
  reverse = false,
  style = {}
}) {
  return (
    <div
      className={`border-beam-container ${className}`}
      style={{
        '--border-beam-width': `${borderWidth}px`,
        ...style
      }}
    >
      <motion.div
        className="border-beam-line"
        style={{
          width: size,
          '--color-from': colorFrom,
          '--color-to': colorTo
        }}
        animate={{
          offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay
        }}
      />
    </div>
  );
}
