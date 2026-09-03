import React from 'react';
import { 
  PhoneCall, 
  Mic, 
  BrainCircuit, 
  Bot, 
  Activity, 
  Calendar, 
  Headset, 
  Database,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import './VoiceAIEngineArchitecture.css';

const architectureStages = [
  {
    stepNum: '01',
    title: 'Call Capture',
    desc: 'Inbound & outbound telephony ingestion',
    category: 'Telephony',
    icon: <PhoneCall size={28} aria-hidden="true" />
  },
  {
    stepNum: '02',
    title: 'Speech Recognition',
    desc: 'Real-time streaming speech-to-text',
    category: 'Speech ASR',
    icon: <Mic size={28} aria-hidden="true" />
  },
  {
    stepNum: '03',
    title: 'Intent Detection',
    desc: 'NLU intent & entity classification',
    category: 'NLP Intent',
    icon: <BrainCircuit size={28} aria-hidden="true" />
  },
  {
    stepNum: '04',
    title: 'AI Conversation',
    desc: 'Contextual full-duplex dialogue reasoning',
    category: 'LLM Reasoning',
    icon: <Bot size={28} aria-hidden="true" />
  },
  {
    stepNum: '05',
    title: 'Lead Qualification',
    desc: 'Dynamic scoring & criteria evaluation',
    category: 'Lead Scoring',
    icon: <Activity size={28} aria-hidden="true" />
  },
  {
    stepNum: '06',
    title: 'Appointment / Action',
    desc: 'Live calendar booking & task execution',
    category: 'Automation',
    icon: <Calendar size={28} aria-hidden="true" />
  },
  {
    stepNum: '07',
    title: 'Human Handoff',
    desc: 'Contextual live agent transfer with summary',
    category: 'Human Escalation',
    icon: <Headset size={28} aria-hidden="true" />
  },
  {
    stepNum: '08',
    title: 'CRM Follow-up',
    desc: 'Automated CRM sync, recordings & logs',
    category: 'CRM Sync',
    icon: <Database size={28} aria-hidden="true" />
  }
];

export default function VoiceAIEngineArchitecture() {
  return (
    <section className="section bg-tinted voice-engine-section" id="engine-architecture" aria-labelledby="voice-engine-heading">
      <div className="container" style={{ maxWidth: '1360px' }}>
        
        {/* Section Header */}
        <div className="section-header section-header--center" style={{ marginBottom: '2.5rem' }}>
<h2 id="voice-engine-heading" className="h2" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', marginBottom: '0.75rem' }}>
            Voice AI Conversational Engine
          </h2>
          <p className="text-muted" style={{ fontSize: '1.08rem', maxWidth: '820px', marginInline: 'auto', lineHeight: '1.6' }}>
            From incoming calls to qualified leads and completed actions, every conversation moves through an intelligent, low-latency voice workflow.
          </p>
        </div>

        {/* Master Architecture Visual Board */}
        <div className="voice-arch-board">
          
          {/* Overarching Engine Header Banner */}
          <div className="voice-arch-orchestrator-wrap">
            <div className="voice-arch-orchestrator-pill">
              <span className="voice-arch-pulse-dot" aria-hidden="true"></span>
              <span className="voice-arch-pill-text">Voice AI Conversational Engine — Low Latency Architecture</span>
            </div>
            <div className="voice-arch-bracket-line" aria-hidden="true"></div>
          </div>

          {/* 8-Stage Horizontal Pipeline Cards */}
          <div className="voice-arch-pipeline-scroll-container">
            <div className="voice-arch-pipeline-track">
              {architectureStages.map((stage, idx) => (
                <div key={stage.stepNum} className="voice-arch-step-column">
                  
                  {/* Step Card */}
                  <article className="voice-arch-step-card">
                    <div className="voice-arch-step-header">
                      <span className="voice-arch-step-prefix">STEP</span>
                      <span className="voice-arch-step-digit">{stage.stepNum}</span>
                    </div>

                    <h3 className="voice-arch-step-title">{stage.title}</h3>

                    <div className="voice-arch-step-icon-wrap">
                      {stage.icon}
                    </div>

                    <div className="voice-arch-category-badge">
                      <span>{stage.category}</span>
                    </div>

                    <p className="voice-arch-step-desc">{stage.desc}</p>
                  </article>

                  {/* Flow Arrow to next step */}
                  {idx < architectureStages.length - 1 && (
                    <div className="voice-arch-flow-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Bottom Supporting System Layer Connections */}
            <div className="voice-arch-integrations-row">
              
              {/* Connector 1: Telephony -> Stage 01 */}
              <div className="voice-arch-connector-node node-step-1">
                <div className="voice-arch-connector-stem" aria-hidden="true"></div>
                <div className="voice-arch-integration-box">
                  <div className="voice-arch-integration-icon">
                    <PhoneCall size={18} />
                  </div>
                  <div className="voice-arch-integration-content">
                    <span className="voice-arch-int-name">Telephony Trunk</span>
                    <span className="voice-arch-int-sub">SIP / WebRTC / PSTN</span>
                  </div>
                </div>
              </div>

              {/* Connector 2: LLM Reasoning -> Stage 04 */}
              <div className="voice-arch-connector-node node-step-4">
                <div className="voice-arch-connector-stem" aria-hidden="true"></div>
                <div className="voice-arch-integration-box">
                  <div className="voice-arch-integration-icon">
                    <BrainCircuit size={18} />
                  </div>
                  <div className="voice-arch-integration-content">
                    <span className="voice-arch-int-name">LLM Reasoning Engine</span>
                    <span className="voice-arch-int-sub">NLU Context & Dialog</span>
                  </div>
                </div>
              </div>

              {/* Connector 3: CRM Sync -> Stage 06 */}
              <div className="voice-arch-connector-node node-step-6">
                <div className="voice-arch-connector-stem" aria-hidden="true"></div>
                <div className="voice-arch-integration-box">
                  <div className="voice-arch-integration-icon">
                    <Database size={18} />
                  </div>
                  <div className="voice-arch-integration-content">
                    <span className="voice-arch-int-name">CRM Sync & Actions</span>
                    <span className="voice-arch-int-sub">Calendar & Pipeline</span>
                  </div>
                </div>
              </div>

              {/* Connector 4: SMS / WhatsApp -> Stage 08 */}
              <div className="voice-arch-connector-node node-step-8">
                <div className="voice-arch-connector-stem" aria-hidden="true"></div>
                <div className="voice-arch-integration-box">
                  <div className="voice-arch-integration-icon">
                    <MessageSquare size={18} />
                  </div>
                  <div className="voice-arch-integration-content">
                    <span className="voice-arch-int-name">SMS / WhatsApp Follow-up</span>
                    <span className="voice-arch-int-sub">Instant Confirmations</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
