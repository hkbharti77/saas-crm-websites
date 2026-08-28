import React, { useState } from 'react';
import { UserPlus, Sparkles, BrainCircuit, Activity, Users, Bot, Headset, CheckCircle2, ArrowRight } from 'lucide-react';
import './Process.css';

const workflowSteps = [
  {
    stepNum: '01',
    category: 'Capture',
    icon: <UserPlus size={20} />,
    title: 'Inbound Capture',
    desc: 'Capture leads across WhatsApp, website forms, ad campaigns, and direct phone calls in real time.'
  },
  {
    stepNum: '02',
    category: 'AI Enrichment',
    icon: <Sparkles size={20} />,
    title: 'Profile Enrichment',
    desc: 'Instant lookup attaches company size, revenue, industry, and contact firmographics automatically.'
  },
  {
    stepNum: '03',
    category: 'Intent Detection',
    icon: <BrainCircuit size={20} />,
    title: 'Buyer Intent NLP',
    desc: 'Natural language analysis classifies buyer purchase urgency, budget signals, and specific pain points.'
  },
  {
    stepNum: '04',
    category: 'Lead Scoring',
    icon: <Activity size={20} />,
    title: 'Propensity Scoring',
    desc: 'Predictive algorithm assigns real-time deal conversion score from 1 to 100.'
  },
  {
    stepNum: '05',
    category: 'Smart Routing',
    icon: <Users size={20} />,
    title: 'Intelligent Assignment',
    desc: 'Instant rule and skill-based matching assigns the opportunity to the ideal sales representative.'
  },
  {
    stepNum: '06',
    category: '24/7 AI Agent',
    icon: <Bot size={20} />,
    title: 'Autonomous Outreach',
    desc: 'AI agent responds in seconds, answers questions from approved playbooks, and books calendar meetings.'
  },
  {
    stepNum: '07',
    category: 'Human Handoff',
    icon: <Headset size={20} />,
    title: 'Seamless Rep Handoff',
    desc: 'Sales reps take over with full conversation summary, customer history, and objection preparation.'
  },
  {
    stepNum: '08',
    category: 'Closed-Won',
    icon: <CheckCircle2 size={20} />,
    title: 'Revenue Conversion',
    desc: 'Deal closed with automated contract triggers, ERP synchronization, and client onboarding sequences.'
  },
];

export default function Process({ 
  title = "How intelligent revenue automation works", 
  subtitle = "From raw prospect capture to closed-won revenue in seconds.", 
  steps,
  engineBanner,
  integrations,
  workflowVisual,
  workflowVisualAlt = "AI Agent Workflow Architecture",
  footerLabel,
  footerTitle,
  footerDesc,
  footerBtnText = "Explore Pipeline Architecture",
  footerBtnUrl = "/services/crm-development"
}) {
  const [activeStep, setActiveStep] = useState(0);
  const currentSteps = steps || workflowSteps;
  const activeStepData = currentSteps[activeStep] || currentSteps[0];

  return (
    <section className="section bg-tinted" id="how-it-works" style={{ padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Visual Workflow</span>
          <h2 className="h2">{title}</h2>
          <p className="text-muted" style={{ marginTop: '0.75rem', fontSize: '1.1rem', maxWidth: '800px', marginInline: 'auto' }}>
            {subtitle}
          </p>
        </div>

        {engineBanner && (
          <div className="workflow-engine-banner">
            <div className="workflow-engine-pill">
              <span className="workflow-engine-dot"></span>
              {engineBanner.tag || 'ORCHESTRATION ENGINE'}
            </div>
            <h3 className="workflow-engine-title">{engineBanner.title}</h3>
            {engineBanner.desc && <p className="workflow-engine-desc">{engineBanner.desc}</p>}
          </div>
        )}

        {workflowVisual && (
          <div className="seo-diagram-card" style={{ marginBottom: '3.5rem', maxWidth: '1000px', marginInline: 'auto' }}>
            <img 
              src={workflowVisual} 
              alt={workflowVisualAlt} 
              width="1200" 
              height="675" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
              loading="lazy" 
            />
          </div>
        )}

        {/* Visual Pipeline Progression Ribbon */}
        <div className="workflow-pipeline-wrapper">
          <div className="workflow-responsive-grid">
            {currentSteps.map((step, idx) => (
              <article
                key={step.stepNum}
                className={`workflow-card ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="workflow-card-top">
                  <div className="workflow-step-badge-wrap">
                    <span className="workflow-step-badge">{step.stepNum}</span>
                    <span className="workflow-cat-tag">{step.category}</span>
                  </div>
                  {idx < currentSteps.length - 1 && (
                    <span className="workflow-flow-arrow" aria-hidden="true">
                      <ArrowRight size={15} />
                    </span>
                  )}
                </div>
                <div className="workflow-icon-box">
                  {typeof step.icon === 'string' ? (
                    <img 
                      src={step.icon} 
                      alt="" 
                      aria-hidden="true" 
                      width="28" 
                      height="28" 
                      style={{ width: '28px', height: '28px', objectFit: 'contain', display: 'block', borderRadius: '6px' }} 
                      loading="lazy" 
                    />
                  ) : (
                    step.icon
                  )}
                </div>
                <h3 className="workflow-card-title">{step.title}</h3>
                <p className="workflow-card-desc">{step.desc}</p>
                <div className="workflow-card-progress-bar">
                  <div
                    className="workflow-card-progress-fill"
                    style={{ width: `${((idx + 1) / currentSteps.length) * 100}%` }}
                  ></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Connected Infrastructure / Integrations Ribbon */}
        {integrations && integrations.length > 0 && (
          <div className="workflow-integrations-ribbon">
            <span className="workflow-integrations-label">CONNECTED INFRASTRUCTURE:</span>
            <div className="workflow-integrations-grid">
              {integrations.map((item, i) => (
                <div key={i} className="workflow-integration-badge">
                  {item.icon && <span className="workflow-integration-icon">{item.icon}</span>}
                  <span className="workflow-integration-name">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Stage Detail Banner */}
        <div className="workflow-status-footer">
          <div className="workflow-status-left">
            <span className="workflow-status-pill">{footerLabel || `Step ${activeStepData.stepNum} · ${activeStepData.category}`}</span>
            <h4 className="workflow-status-heading">{footerTitle || activeStepData.title}</h4>
            <p className="workflow-status-text">{footerDesc || activeStepData.desc}</p>
          </div>
          <a href={footerBtnUrl} className="btn btn-outline workflow-status-btn">
            <span>{footerBtnText}</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
