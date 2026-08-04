import React from 'react';
import './EnterpriseBackground.css';

export default function EnterpriseBackground() {
  return (
    <div className="enterprise-bg-container" aria-hidden="true">
      {/* Cyber Grid Overlay */}
      <div className="cyber-grid-overlay"></div>

      {/* Ambient Radial Mesh Orbs */}
      <div className="mesh-orb mesh-orb-1"></div>
      <div className="mesh-orb mesh-orb-2"></div>
      <div className="mesh-orb mesh-orb-3"></div>

      {/* Ambient Ray Beam */}
      <div className="ambient-ray-beam"></div>

      {/* Micro particle motes */}
      <div className="particle-mote"></div>
      <div className="particle-mote"></div>
      <div className="particle-mote"></div>
      <div className="particle-mote"></div>
      <div className="particle-mote"></div>
    </div>
  );
}
