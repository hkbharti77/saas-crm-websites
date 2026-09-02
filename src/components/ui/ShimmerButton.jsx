import React from 'react';
import './ShimmerButton.css';

export default function ShimmerButton({
  shimmerColor = '#ffffff',
  shimmerSize = '0.08em',
  shimmerDuration = '3s',
  borderRadius = '9999px',
  background = 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      style={{
        '--shimmer-color': shimmerColor,
        '--radius': borderRadius,
        '--speed': shimmerDuration,
        '--cut': shimmerSize,
        '--bg': background
      }}
      className={`shimmer-btn-root ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="shimmer-spark-wrap">
        <div className="shimmer-spark" />
      </div>
      <span className="shimmer-btn-content">{children}</span>
      <div className="shimmer-btn-highlight" />
    </button>
  );
}
