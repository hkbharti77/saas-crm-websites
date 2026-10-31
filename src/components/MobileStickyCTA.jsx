import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './MobileStickyCTA.css';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only show after scrolling past 300px (hero) and hide when user is at the contact form
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const contactEl = document.getElementById('contact');
          
          let nearBottom = false;
          if (contactEl) {
            const rect = contactEl.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.75) {
              nearBottom = true;
            }
          }

          if (scrollY > 320 && !nearBottom) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync body class so floating widgets (chat, cookie pill) float cleanly above sticky bar
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isVisible) {
        document.body.classList.add('has-mobile-sticky-cta');
      } else {
        document.body.classList.remove('has-mobile-sticky-cta');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('has-mobile-sticky-cta');
      }
    };
  }, [isVisible]);

  const handleClick = () => {
    trackBookDemo('mobile-sticky-cta');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.dispatchEvent(new CustomEvent('open-demo-modal'));
    }
  };

  if (!isVisible) return null;

  return (
    <aside className="mobile-sticky-bar" aria-label="Quick Action">
      <div className="mobile-sticky-inner">
        <div className="mobile-sticky-info">
          <span className="mobile-sticky-eyebrow">Ready to automate?</span>
          <span className="mobile-sticky-sub">AI CRM Platform Demo</span>
        </div>
        <button
          type="button"
          id="btn-mobile-sticky-demo"
          className="btn btn-primary mobile-sticky-btn"
          onClick={handleClick}
          aria-label="Book a Demo"
        >
          <span>Book a Demo</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}
