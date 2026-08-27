import React from 'react';
import { ArrowRight } from 'lucide-react';
import { trackBookDemo } from '../utils/analytics';
import './MidCTA.css';

export default function MidCTA({ onBookDemo }) {
  return (
    <section className="mid-cta" aria-labelledby="mid-cta-heading">
      <div className="container mid-cta-inner">
        <h2 id="mid-cta-heading" className="mid-cta-title">
          Let&apos;s build something great together
        </h2>
        <p className="mid-cta-text">
          Tell us what you need to automate. We&apos;ll map the stack, timeline, and first win.
        </p>
        <button
          id="btn-mid-cta-demo"
          className="btn btn-primary mid-cta-btn"
          onClick={() => {
            trackBookDemo('mid-cta');
            onBookDemo && onBookDemo();
          }}
        >
          Contact Us <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
