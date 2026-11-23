import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './RouteProgressBar.css';

const ROUTE_LOADING_START = 'gyanvani:route-loading-start';
const ROUTE_LOADING_END = 'gyanvani:route-loading-end';

/**
 * Lightweight Suspense fallback that signals the top progress bar immediately
 * and delays rendering a centered spinner by 250ms so cached/fast routes never flash.
 */
export function RouteSuspenseFallback() {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(ROUTE_LOADING_START));
    const timer = setTimeout(() => setShowSpinner(true), 250);

    return () => {
      clearTimeout(timer);
      window.dispatchEvent(new CustomEvent(ROUTE_LOADING_END));
    };
  }, []);

  return (
    <div className="route-loading-fallback" aria-busy="true" aria-live="polite">
      {showSpinner && (
        <>
          <div className="route-spinner" aria-hidden="true" />
          <span className="route-loading-text">Loading page...</span>
        </>
      )}
    </div>
  );
}

/**
 * Sleek 2px top viewport progress bar for route changes and lazy chunk loads.
 * Uses compositor-only transform: scaleX() and opacity with zero layout shift.
 */
export default function RouteProgressBar() {
  const location = useLocation();
  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'completing'
  const isFirstRender = useRef(true);
  const suspenseCountRef = useRef(0);
  const completeTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const clearTimers = () => {
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  // Trigger brief top-bar sweep on client route changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    clearTimers();
    const rafId = requestAnimationFrame(() => {
      setPhase('loading');
      completeTimerRef.current = setTimeout(() => {
        if (suspenseCountRef.current === 0) {
          setPhase('completing');
          hideTimerRef.current = setTimeout(() => {
            setPhase('idle');
          }, 200);
        }
      }, 110);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimers();
    };
  }, [location.pathname]);

  // Listen to Suspense chunk-loading start/end signals
  useEffect(() => {
    const handleStart = () => {
      suspenseCountRef.current += 1;
      clearTimers();
      setPhase('loading');
    };

    const handleEnd = () => {
      suspenseCountRef.current = Math.max(0, suspenseCountRef.current - 1);
      if (suspenseCountRef.current === 0) {
        clearTimers();
        setPhase('completing');
        hideTimerRef.current = setTimeout(() => {
          setPhase('idle');
        }, 200);
      }
    };

    window.addEventListener(ROUTE_LOADING_START, handleStart);
    window.addEventListener(ROUTE_LOADING_END, handleEnd);
    return () => {
      window.removeEventListener(ROUTE_LOADING_START, handleStart);
      window.removeEventListener(ROUTE_LOADING_END, handleEnd);
      clearTimers();
    };
  }, []);

  if (phase === 'idle') return null;

  return (
    <div
      className={`route-progress-track route-progress-track--${phase}`}
      role="progressbar"
      aria-label="Page navigation progress"
      aria-busy={phase === 'loading'}
    >
      <div className="route-progress-bar" />
    </div>
  );
}
