import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Cpu, 
  ArrowRight, 
  Radio, 
  Server, 
  Volume2 
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './GuidesAndResources.css';

export default function VoiceAiInfrastructurePage() {
  const aiSummaryItems = [
    {
      question: "What is the Gyan VaniAi Voice AI Infrastructure?",
      answer: "A distributed cloud-native infrastructure stack designed to orchestrate low-latency, full-duplex conversational voice AI agents at enterprise scale, handling WebRTC audio streaming, acoustic echo cancellation, fast interruption (barge-in), and CRM context retrieval."
    },
    {
      question: "How does the infrastructure handle user barge-in and interruptions?",
      answer: "Acoustic streams pass through real-time energy and neural VAD (Voice Activity Detection) filters running in parallel with the playback buffer. When user speech is verified, the playback socket is truncated within 40ms, halting active audio and instructing the LLM to process the interruption context immediately."
    },
    {
      question: "What hardware and network topology powers the voice engine?",
      answer: "Distributed edge clusters deployed across Mumbai, Delhi, Singapore, and Frankfurt running containerized streaming media brokers connected directly to low-latency inference hardware (Groq LPUs and NVIDIA TensorRT-LLM)."
    },
    {
      question: "How are calls logged and stored for compliance?",
      answer: "Audio streams are captured, scrubbed of sensitive PII (via automated regex/NER token masking), transcribed into timestamped dialog turns, and synced to customer records in Gyan VaniAi CRM."
    }
  ];

  const infraLayers = [
    {
      icon: <Radio size={22} />,
      title: "Layer 1: Real-Time Audio Transport & Edge Ingestion",
      desc: "WebRTC and Secure WebSocket (WSS) gateways terminate inbound voice streams at the nearest edge pop. Adaptive jitter buffers compensate for cellular packet loss and packet reordering."
    },
    {
      icon: <Volume2 size={22} />,
      title: "Layer 2: Acoustic Processing & Interruption Control",
      desc: "Neural acoustic echo cancellation (AEC) and background noise suppression (RNNoise) strip ambient noise. Streaming VAD monitors for user barge-in, cutting AI playback under 40ms."
    },
    {
      icon: <Cpu size={22} />,
      title: "Layer 3: Speculative Low-Latency Inference & RAG",
      desc: "LLMs operate with speculative decoding, streaming context chunks from tenant-isolated vector stores and CRM customer histories to begin generating tokens in sub-80ms."
    },
    {
      icon: <Server size={22} />,
      title: "Layer 4: Chunked Audio Synthesis & Playback",
      desc: "Streaming TTS synthesizes speech audio phrase-by-phrase upon detecting semantic punctuation boundaries, feeding the caller's audio buffer before the sentence is completed."
    }
  ];

  const faqs = [
    {
      q: "What bandwidth is required for a stable Voice AI call?",
      a: "Our Opus codec configuration adapts dynamically between 16 kbps to 40 kbps, ensuring crystal-clear audio quality even on low-bandwidth 3G or unstable cellular connections."
    },
    {
      q: "How does the system ensure zero data leakage between enterprise tenants?",
      a: "All voice sessions run within ephemeral, tenant-isolated containers with encrypted memory buffers. No customer audio is used to train public foundation models."
    },
    {
      q: "Can voice agents query real-time CRM databases during a live call?",
      a: "Yes. Through the Model Context Protocol (MCP) and secure tool calling, voice agents can check order status, verify account balances, and book calendar appointments in under 120ms during the conversation."
    }
  ];

  const techSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Voice AI Infrastructure Engineering: Building Scalable Conversational Speech Systems',
    description: 'Technical engineering reference on WebRTC audio gateways, barge-in interruption handling, speculative LLM inference, and low-latency TTS architecture.',
    author: {
      '@type': 'Organization',
      name: 'Gyan VaniAi'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gyan VaniAi',
      url: 'https://www.gyanvaniai.com',
      logo: 'https://www.gyanvaniai.com/logo.webp'
    },
    url: 'https://www.gyanvaniai.com/resources/voice-ai-infrastructure',
    datePublished: '2026-10-07'
  };

  return (
    <div className="guide-page">
      <SeoHead
        title="Voice AI Infrastructure Guide 2026 | Full-Duplex Architecture | Gyan VaniAi"
        description="Engineering reference for full-duplex Voice AI infrastructure: WebRTC streaming, acoustic echo cancellation, 40ms barge-in handling, and streaming TTS."
        canonical="https://www.gyanvaniai.com/resources/voice-ai-infrastructure"
        schema={techSchema}
        keywords="Voice AI Infrastructure, Full-Duplex Voice Bot, WebRTC Audio Gateway, Acoustic Echo Cancellation, Streaming Conversational AI"
      />

      <section className="guide-hero">
        <div className="container">
          <div className="guide-hero-badge">
            <Server size={16} />
            <span>Infrastructure Engineering Guide</span>
          </div>
          <h1 className="guide-hero-title">
            Voice AI Infrastructure: Engineering Full-Duplex Speech Systems
          </h1>
          <p className="guide-hero-subtitle">
            An architectural breakdown of the distributed systems, WebRTC media gateways, barge-in logic, and low-latency inference pipelines required to host real-time conversational agents at scale.
          </p>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="Executive Summary: Voice AI Infrastructure" />

      {/* Infrastructure Layers */}
      <section className="guide-steps-section">
        <div className="container">
          <div className="guide-section-header">
            <span className="guide-pill">System Architecture</span>
            <h2 className="guide-section-title">The 4-Layer Real-Time Voice Stack</h2>
            <p className="guide-section-desc">
              How edge audio transport, neural signal processing, and low-latency LLM inference collaborate to produce natural conversations.
            </p>
          </div>

          <div className="guide-steps-list">
            {infraLayers.map((layer, idx) => (
              <div key={idx} className="guide-step-card">
                <div className="guide-icon-box">{layer.icon}</div>
                <div className="guide-step-content">
                  <h3 className="guide-step-title">{layer.title}</h3>
                  <p className="guide-step-desc">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cluster Navigation */}
      <section className="guide-cluster-section">
        <div className="container">
          <div className="guide-cluster-card">
            <h3 className="guide-cluster-title">Related Technical Benchmarks & Telephony Guides</h3>
            <div className="guide-cluster-links">
              <Link to="/resources/voice-ai-latency-benchmark" className="guide-link-pill">
                <span>Voice AI Latency Benchmark</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/resources/sip-architecture" className="guide-link-pill">
                <span>SIP Architecture Guide</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/resources/mcp-ai-agent-tool-calling" className="guide-link-pill">
                <span>MCP & AI Tool Calling</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/voice-bot-assistant" className="guide-link-pill">
                <span>Voice Bot Assistants</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on Voice AI Infrastructure" />
      </div>

      <ContactSection />
    </div>
  );
}
