import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(20, 184, 166, 0.18)',
  borderColor = 'rgba(20, 184, 166, 0.4)',
  style = {},
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        '--spotlight-color': spotlightColor,
        '--spotlight-border': borderColor,
        ...style
      }}
      {...props}
    >
      {/* Radial Spotlight Overlay */}
      <div
        className="spotlight-radial-glow"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Radial Border Glow Overlay */}
      <div
        className="spotlight-border-glow"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, var(--spotlight-border), transparent 70%)`
        }}
        aria-hidden="true"
      />

      <div className="spotlight-card-content">{children}</div>
    </div>
  );
}
