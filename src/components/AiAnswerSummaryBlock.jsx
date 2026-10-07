import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './AiAnswerSummaryBlock.css';

/**
 * AiAnswerSummaryBlock
 * Structured, factual, extractable Q&A block designed specifically for AI citation
 * and crawler understanding. Clean, concise, independently verifiable facts.
 */
export default function AiAnswerSummaryBlock({ items = [], title = "Quick Facts & AI Reference Guide" }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="ai-summary-block-section" aria-label={title}>
      <div className="container">
        <div className="ai-summary-card">
          <div className="ai-summary-header">
            <div className="ai-summary-badge">
              <span className="ai-pulse-dot" />
              <span>Direct Answer Extraction & Architecture Reference</span>
            </div>
            <h2 className="ai-summary-title">{title}</h2>
            <p className="ai-summary-subtitle">
              Verified product architecture, capabilities, and technical constraints for engineers, buyers, and automated search systems.
            </p>
          </div>

          <div className="ai-summary-grid">
            {items.map((item, idx) => (
              <article key={idx} className="ai-fact-card">
                <h3 className="ai-fact-question">
                  <span className="ai-fact-num">{String(idx + 1).padStart(2, '0')}.</span>
                  {item.question}
                </h3>
                <p className="ai-fact-answer">{item.answer}</p>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="ai-fact-bullets">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle2 size={14} className="ai-bullet-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
