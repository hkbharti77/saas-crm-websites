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

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section bg-tinted" id="how-it-works">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-eyebrow">Visual Workflow</span>
          <h2 className="h2">How intelligent revenue automation works</h2>
          <p className="text-lg text-muted" style={{ marginTop: '0.85rem' }}>
            From raw prospect capture to closed-won revenue in seconds.
          </p>
        </div>

        {/* Visual Pipeline Progression Ribbon */}
        <div className="workflow-pipeline-wrapper">
          <div className="workflow-responsive-grid">
            {workflowSteps.map((step, idx) => (
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
                  {idx < workflowSteps.length - 1 && (
                    <span className="workflow-flow-arrow" aria-hidden="true">
                      <ArrowRight size={15} />
                    </span>
                  )}
                </div>
                <div className="workflow-icon-box">
                  {step.icon}
                </div>
                <h3 className="workflow-card-title">{step.title}</h3>
                <p className="workflow-card-desc">{step.desc}</p>
                <div className="workflow-card-progress-bar">
                  <div
                    className="workflow-card-progress-fill"
                    style={{ width: `${((idx + 1) / workflowSteps.length) * 100}%` }}
                  ></div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Selected Stage Detail Banner */}
        <div className="workflow-status-footer">
          <div className="workflow-status-left">
            <span className="workflow-status-pill">Step {workflowSteps[activeStep].stepNum} · {workflowSteps[activeStep].category}</span>
            <h4 className="workflow-status-heading">{workflowSteps[activeStep].title}</h4>
            <p className="workflow-status-text">{workflowSteps[activeStep].desc}</p>
          </div>
          <a href="/services/crm-development" className="btn btn-outline workflow-status-btn">
            <span>Explore Pipeline Architecture</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
