import React from 'react';
import { CheckCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

/**
 * AEOAnswerBlock Component
 * Answer Engine Optimization (AEO) direct-answer content block.
 * Provides high-density, structured, snippet-friendly answers and key takeaways
 * designed for instant extraction by AI search engines (ChatGPT, Perplexity, Claude, Gemini, SearchGPT).
 *
 * @param {string} question - Direct high-intent user/AI question
 * @param {string} answer - Concise 1-3 sentence direct definition/answer
 * @param {Array<string>} takeaways - 3-5 bulleted key takeaway facts
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
      className="aeo-answer-block my-6 p-5 md:p-7 rounded-2xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-teal-950/40 text-white shadow-xl backdrop-blur-md relative overflow-hidden"
      aria-label="Direct AI Answer Summary"
      data-aeo-block="true"
      data-speakable="true"
      itemScope
      itemType="https://schema.org/Question"
    >
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          {badge}
        </span>
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-teal-400" /> AI Citation & Key Insights
        </span>
      </div>

      {/* Question / Heading */}
      {formattedQuestion && (
        <h2 
          className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight flex items-start gap-2"
          itemProp="name"
        >
          {isQuestionFormat && <span className="text-teal-400 font-serif italic text-xl leading-none">Q.</span>}
          <span>{formattedQuestion}</span>
        </h2>
      )}

      {/* Answer Body */}
      {answer && (
        <div 
          itemProp="acceptedAnswer" 
          itemScope 
          itemType="https://schema.org/Answer" 
          className="mb-5"
        >
          <div 
            className="aeo-answer-definition text-slate-200 text-sm md:text-base leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/60"
            itemProp="text"
          >
            <span className="font-semibold text-teal-300">Direct Answer: </span>
            {answer}
          </div>
        </div>
      )}

      {/* Key Takeaways Grid */}
      {takeaways && takeaways.length > 0 && (
        <div className="aeo-key-takeaways mb-6">
          <h3 className="text-xs font-uppercase tracking-wider text-slate-400 font-semibold mb-3 uppercase">
            Key Technical Takeaways & Capabilities
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {takeaways.map((item, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-2.5 text-sm text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Line */}
      {ctaText && (
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Need a custom deployment for your enterprise?
          </p>
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-colors duration-200 shadow-md hover:shadow-teal-500/20"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
