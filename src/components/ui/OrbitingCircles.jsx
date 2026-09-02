import React from 'react';
import './OrbitingCircles.css';

export default function OrbitingCircles({
  className = '',
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  pathColor = 'rgba(15, 118, 110, 0.25)',
  style = {}
}) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="orbit-path-svg"
          style={{ width: radius * 2, height: radius * 2 }}
        >
          <circle
            className="orbit-path-circle"
            cx={radius}
            cy={radius}
            r={radius - 1}
            fill="none"
            stroke={pathColor}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <div
        style={{
          '--radius': `${radius}px`,
          '--duration': `${duration}s`,
          '--delay': `-${delay}s`,
          ...style
        }}
        className={`orbiting-circle-item ${reverse ? 'reverse' : ''} ${className}`}
      >
        <div className="orbiting-circle-child">
          {children}
        </div>
      </div>
    </>
  );
}
