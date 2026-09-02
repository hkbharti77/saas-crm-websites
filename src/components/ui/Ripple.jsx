import React from 'react';
import './Ripple.css';

export default function Ripple({
  mainCircleSize = 180,
  mainCircleOpacity = 0.28,
  numCircles = 6,
  className = '',
  circleColor = 'rgba(20, 184, 166, 0.35)',
  style = {}
}) {
  return (
    <div className={`ripple-container ${className}`} style={style}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 55;
        const opacity = Math.max(0.04, mainCircleOpacity - i * 0.04);
        const animationDelay = `${i * 0.12}s`;

        return (
          <div
            key={i}
            className="ripple-circle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderColor: circleColor
            }}
          />
        );
      })}
    </div>
  );
}
