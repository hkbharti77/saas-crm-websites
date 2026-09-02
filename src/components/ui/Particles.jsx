import React, { useEffect, useRef, useState } from 'react';

function hexToRgb(hex) {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export default function Particles({
  className = '',
  quantity = 35,
  staticity = 50,
  ease = 50,
  size = 0.5,
  refresh = false,
  color = '#14b8a6',
  vx = 0,
  vy = 0,
  style = {}
}) {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const rafID = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mouse.current = { x, y };
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }

    const rgb = hexToRgb(color);

    const circleParams = () => {
      const x = Math.floor(Math.random() * canvasSize.current.w);
      const y = Math.floor(Math.random() * canvasSize.current.h);
      const pSize = Math.floor(Math.random() * 2) + size;
      return {
        x,
        y,
        translateX: 0,
        translateY: 0,
        size: pSize,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.5 + 0.1).toFixed(1)),
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        magnetism: 0.1 + Math.random() * 4
      };
    };

    const drawCircle = (circle, update = false) => {
      if (!context.current) return;
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(', ')}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(1, 0, 0, 1, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    };

    const resizeCanvas = () => {
      if (canvasContainerRef.current && canvasRef.current && context.current) {
        canvasSize.current.w = canvasContainerRef.current.offsetWidth;
        canvasSize.current.h = canvasContainerRef.current.offsetHeight;
        canvasRef.current.width = canvasSize.current.w;
        canvasRef.current.height = canvasSize.current.h;

        circles.current = [];
        for (let i = 0; i < quantity; i++) {
          drawCircle(circleParams());
        }
      }
    };

    const animate = () => {
      if (!context.current) return;
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

      circles.current.forEach((circle, i) => {
        if (circle.alpha < circle.targetAlpha) {
          circle.alpha += 0.01;
        }

        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

        drawCircle(circle, true);

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1);
          drawCircle(circleParams());
        }
      });

      rafID.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafID.current) window.cancelAnimationFrame(rafID.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [color, quantity, staticity, ease, size, refresh, vx, vy]);

  return (
    <div
      ref={canvasContainerRef}
      className={`particles-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
