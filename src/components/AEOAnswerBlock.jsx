import React from 'react';
import { CheckCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import './AEOAnswerBlock.css';

/**
 * AEOAnswerBlock Component
 * Answer Engine Optimization (AEO) direct-answer content block.
 * Provides high-density, structured, snippet-friendly answers and key takeaways
 * designed for instant extraction by AI search engines (ChatGPT, Perplexity, Claude, Gemini, SearchGPT).
 *
 * @param {string} question - Direct high-intent user/AI question
 * @param {string} answer - Concise 1-3 sentence direct definition/answer
 * @param {Array<string>} takeaways - 3-6 bulleted key takeaway facts
 * @param {string} ctaText - Optional Call-To-Action text
 * @param {Function} onCtaClick - Optional CTA click handler
 * @param {string} badge - Optional badge text (e.g. "AI Quick Summary", "Direct Answer")
 */
function cleanQuestionText(q) {
  if (!q) return '';
  let cleaned = String(q).trim();
  // Strip awkward "What is How..." or "What is Why..." prefixes
  if (/^What is (How|Why|What|When|Where|\d+)/i.test(cleaned)) {
    cleaned = cleaned.replace(/^What is /i, '');
  }
  return cleaned;
}

export default function AEOAnswerBlock({
  question = 'Gyan VaniAi Custom AI CRM & Automation Platform Overview',
  answer = 'Gyan VaniAi is an enterprise AI software platform featuring custom AI CRM systems, Meta Tech Provider WhatsApp Coexistence support, autonomous AI agents, sub-300ms RAG pipelines, and conversational voice bots.',
  takeaways = [
    'Official Meta Tech Provider for WhatsApp Coexistence on phone + web simultaneously.',
    'Sub-300ms latency RAG chatbot pipelines with strict multi-tenant data isolation.',
    'End-to-end sales automation with predictive AI lead scoring and round-robin routing.',
    'Conversational AI Voice Bots for inbound support and outbound phone campaigns.',
    'Flexible SaaS pricing starting at ₹1,999/month with 7-day free trial.'
  ],
  ctaText = 'Book a Free AI Consultation',
  onCtaClick = null,
  badge = 'Executive Summary & Direct AI Answer'
}) {
  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.dispatchEvent(new CustomEvent('open-demo-modal', {
        detail: { prefill: `Inquiry regarding: ${question}` }
      }));
    }
  };

  const formattedQuestion = cleanQuestionText(question);
  const isQuestionFormat = /^What|^How|^Why|^When|^Where/i.test(formattedQuestion);

  return (
    <section 
      className="aeo-answer-block"
      aria-label="Direct AI Answer Summary"
      data-aeo-block="true"
      data-speakable="true"
      itemScope
      itemType="https://schema.org/Question"
    >
      {/* Background glow decoration */}
      <div className="aeo-glow-orb" aria-hidden="true" />

      {/* Badge Header */}
      <div className="aeo-header-bar">
        <span className="aeo-badge">
          <Sparkles size={14} />
          <span>{badge}</span>
        </span>
        <span className="aeo-citation-tag">
          <HelpCircle size={13} />
          <span>AI Citation &amp; Key Insights</span>
        </span>
      </div>

      {/* Question / Heading */}
      {formattedQuestion && (
        <h2 className="aeo-question-title" itemProp="name">
          {isQuestionFormat && <span className="aeo-q-prefix">Q.</span>}
          <span>{formattedQuestion}</span>
        </h2>
      )}

      {/* Answer Body */}
      {answer && (
        <div 
          itemProp="acceptedAnswer" 
          itemScope 
          itemType="https://schema.org/Answer" 
          className="aeo-answer-wrap"
        >
          <div className="aeo-answer-box" itemProp="text">
            <strong className="aeo-direct-label">Direct Answer:</strong>
            <span>{answer}</span>
          </div>
        </div>
      )}

      {/* Key Takeaways Grid */}
      {takeaways && takeaways.length > 0 && (
        <div className="aeo-takeaways-section">
          <h3 className="aeo-takeaways-heading">
            Key Technical Takeaways &amp; Capabilities
          </h3>
          <ul className="aeo-takeaways-grid">
            {takeaways.map((item, idx) => (
              <li key={idx} className="aeo-takeaway-card">
                <CheckCircle className="aeo-check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Line */}
      {ctaText && (
        <div className="aeo-cta-row">
          <div className="aeo-cta-info">
            <span className="aeo-cta-lead">Need a custom deployment for your enterprise?</span>
            <span className="aeo-cta-sub">Our telephony engineers can configure and benchmark your PBX within 48 hours.</span>
          </div>
          <button
            onClick={handleCta}
            className="aeo-cta-btn"
            type="button"
          >
            <span>{ctaText}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
