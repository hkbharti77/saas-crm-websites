import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import './ParticleGlobe3D.css';

export default function ParticleGlobe3D({
  className = '',
  size = 460,
  dotCount = 140,
  isLight = false,
  interactive = true,
  onNodeHover = null
}) {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina display support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate 3D Fibonacci sphere distribution
    const dots = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      dots.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseSize: Math.random() * 1.8 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub: i % 14 === 0 // 10% are key neural AI hubs
      });
    }

    let rotationX = 0.2;
    let rotationY = 0;
    let targetSpeedY = shouldReduceMotion ? 0 : 0.0035;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0;
    let velY = 0;
    let animId;

    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      velX = deltaX * 0.005;
      velY = deltaY * 0.005;
      rotationY += velX;
      rotationX += velY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e) => {
      if (!interactive || e.touches.length !== 1) return;
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      velX = deltaX * 0.005;
      velY = deltaY * 0.005;
      rotationY += velX;
      rotationX += velY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const canvasEl = canvas;
    if (interactive) {
      canvasEl.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      canvasEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, size, size);

      // Inertia and auto-rotation
      if (!isDragging && !shouldReduceMotion) {
        velX *= 0.95;
        velY *= 0.95;
        rotationY += targetSpeedY + velX;
        rotationX += velY;
      }

      // Draw outer ambient glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius * 1.3);
      if (isLight) {
        glowGrad.addColorStop(0, 'rgba(15, 118, 110, 0.08)');
        glowGrad.addColorStop(0.7, 'rgba(20, 184, 166, 0.03)');
        glowGrad.addColorStop(1, 'transparent');
      } else {
        glowGrad.addColorStop(0, 'rgba(20, 184, 166, 0.15)');
        glowGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.05)');
        glowGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Matrix transforms for 3D rotation
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      // Projected points
      const projected = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Rotate Y
        const x1 = dot.x * cosY - dot.z * sinY;
        const z1 = dot.z * cosY + dot.x * sinY;

        // Rotate X
        const y2 = dot.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + dot.y * sinX;

        // Perspective projection
        const depth = (z2 + radius) / (2 * radius); // 0 (back) to 1 (front)
        const scale = 0.6 + depth * 0.7;
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({
          x: projX,
          y: projY,
          depth,
          z: z2,
          isHub: dot.isHub,
          baseSize: dot.baseSize,
          pulse: Math.sin(time * 2 + dot.pulseOffset)
        });
      }

      // Sort points by depth (back to front)
      projected.sort((a, b) => a.z - b.z);

      // Draw neural lines between nearby front-facing points
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.depth < 0.45) continue; // Skip back half for clean aesthetics

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.depth < 0.45) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < size * 0.16) {
            const alpha = (1 - dist / (size * 0.16)) * 0.35 * Math.min(p1.depth, p2.depth);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isLight
              ? `rgba(15, 118, 110, ${alpha * 0.8})`
              : `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = (p1.isHub || p2.isHub) ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.15, Math.min(1, 0.2 + p.depth * 0.8));
        const pointSize = (p.isHub ? p.baseSize * 1.8 : p.baseSize) * (0.6 + p.depth * 0.65);

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, pointSize), 0, Math.PI * 2);

        if (p.isHub) {
          // Key neural hub with pulsing outer corona
          const pulseR = pointSize * (1.6 + p.pulse * 0.4);
          ctx.fillStyle = isLight ? `rgba(13, 148, 136, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, pulseR), 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? `rgba(20, 184, 166, ${alpha * 0.3})`
            : `rgba(6, 182, 212, ${alpha * 0.35})`;
          ctx.fill();
        } else {
          ctx.fillStyle = isLight
            ? `rgba(15, 118, 110, ${alpha * 0.85})`
            : `rgba(45, 212, 191, ${alpha * 0.9})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      if (interactive) {
        canvasEl.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        canvasEl.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [size, dotCount, isLight, interactive, shouldReduceMotion]);

  return (
    <div className={`particle-globe-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="particle-globe-canvas"
        style={{ width: size, height: size }}
        title="Interactive 3D AI Neural Swarm (drag to rotate)"
      />
      <div className="particle-globe-drag-hint">
        <span>3D Drag to Rotate</span>
      </div>
    </div>
  );
}
