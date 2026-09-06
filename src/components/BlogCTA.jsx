import React from 'react';
import { ArrowRight, Sparkles, Download, Mail, Calendar, PhoneCall, HelpCircle } from 'lucide-react';
import { trackBlogCta } from '../utils/blogAnalytics';
import { validateCtaUrl } from '../utils/ctaManager';
import './BlogCTA.css';

export default function BlogCTA({ post, position = 'end', onOpenDemo }) {

  if (!post) return null;

  // Article custom CTA configuration or default fallback
  const ctaType = post.ctaType || 'book_demo';
  const rawUrl = post.ctaUrl || '';
  const safeUrl = validateCtaUrl(rawUrl);

  const titleMap = {
    contact_us: 'Have Questions About Implementation?',
    book_demo: 'Ready to Automate Your Business Workflows?',
    get_started: 'Start Building with Gyan VaniAi Today',
    request_consultation: 'Need Advice from AI Architects?',
    newsletter: 'Subscribe to AI & CRM Strategy Insights',
    download: 'Download Flagship Architecture Guide',
    learn_more: 'Explore Enterprise AI Capabilities',
  };

  const defaultDescMap = {
    contact_us: 'Get in touch with our engineering team for personalized guidance and integration support.',
    book_demo: 'Schedule a live demo to see custom WhatsApp AI agents and CRM orchestration in action.',
    get_started: 'Deploy custom conversational AI, lead routing, and omnichannel automation in minutes.',
    request_consultation: 'Book a technical session with our solution architects to plan your AI roadmap.',
    newsletter: 'Join top operators receiving actionable advice on AI security, agents, and automation.',
    download: 'Get immediate access to our technical blueprint and ROI whitepaper.',
    learn_more: 'Discover how Gyan VaniAi delivers 10x speedups for enterprise customer operations.',
  };

  const defaultLabelMap = {
    contact_us: 'Contact Support',
    book_demo: 'Book a Free Demo',
    get_started: 'Get Started Now',
    request_consultation: 'Schedule Consultation',
    newsletter: 'Subscribe Now',
    download: 'Download PDF',
    learn_more: 'Learn More',
  };

  const iconMap = {
    contact_us: Mail,
    book_demo: Calendar,
    get_started: Sparkles,
    request_consultation: PhoneCall,
    newsletter: Mail,
    download: Download,
    learn_more: HelpCircle,
  };

  const TitleIcon = iconMap[ctaType] || Sparkles;
  const titleText = post.ctaTitle || titleMap[ctaType] || titleMap.book_demo;
  const descText = post.ctaDescription || defaultDescMap[ctaType] || defaultDescMap.book_demo;
  const labelText = post.ctaLabel || defaultLabelMap[ctaType] || defaultLabelMap.book_demo;

  const handleClick = (e) => {
    trackBlogCta(post, ctaType, position);

    if (safeUrl) {
      if (safeUrl.startsWith('http')) {
        window.open(safeUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = safeUrl;
      }
    } else if (typeof onOpenDemo === 'function') {
      e.preventDefault();
      onOpenDemo();
    }
  };

  return (
    <div className={`blog-cta-component cta-pos-${position}`}>
      <div className="blog-cta-inner">
        <div className="blog-cta-header">
          <TitleIcon size={22} className="blog-cta-icon" />
          <h3 className="blog-cta-title">{titleText}</h3>
        </div>
        <p className="blog-cta-desc">{descText}</p>

        <div className="blog-cta-action">
          {safeUrl ? (
            <a href={safeUrl} onClick={handleClick} className="btn btn-primary blog-cta-button">
              <span>{labelText}</span>
              <ArrowRight size={17} style={{ marginLeft: '6px' }} />
            </a>
          ) : (
            <button type="button" onClick={handleClick} className="btn btn-primary blog-cta-button">
              <span>{labelText}</span>
              <ArrowRight size={17} style={{ marginLeft: '6px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
