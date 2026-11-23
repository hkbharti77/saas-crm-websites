import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  Lock,
  Radio,
  Volume2,
  Database,
  CheckCircle2,
  Layers,
  Globe,
  Activity,
  Sliders,
  PhoneForwarded,
  Network,
  Mic,
  BrainCircuit
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import SpotlightCard from '../components/ui/SpotlightCard';
import './SipArchitectureGuidePage.css';

export default function SipArchitectureGuidePage() {
  const [channels, setChannels] = useState(100);
  const [selectedCodec, setSelectedCodec] = useState('opus');

  // Calculation for Telephony Bandwidth Sizing
  const codecBitrate = selectedCodec === 'opus' ? 40 : 80; // kbps including IP/UDP/RTP headers
  const totalBandwidthMbps = ((channels * codecBitrate * 2) / 1000).toFixed(1); // Full-duplex
  const packetsPerSecond = (channels * 100).toLocaleString(); // 50 pps each direction = 100 pps
  const requiredSbcCores = Math.max(2, Math.ceil(channels / 250));
  const estimatedMonthlyMinutes = (channels * 30 * 8 * 60).toLocaleString(); // 8 hrs/day utilization

  const aiSummaryItems = [
    {
      question: "What is the Enterprise SIP Architecture for Conversational Voice AI?",
      answer: "Gyan VaniAi's SIP Architecture is a carrier-grade telephony gateway that bridges legacy enterprise telecom infrastructure (PSTN, PBX, SIP trunks) and WhatsApp Voice APIs directly with low-latency streaming Voice AI models. Operating via geo-distributed Session Border Controllers (SBC), it translates inbound SRTP audio packets into binary PCM WebSocket streams in under 12ms, enabling full-duplex conversations with human-like latency under 300ms.",
      bullets: [
        "Carrier-Grade Session Border Controllers (SBC) handle TLS 1.3 termination, topology hiding, and DDoS flood protection",
        "Sub-10ms full-duplex media translation bridges SRTP UDP packets directly into binary PCM WebSockets for neural VAD and streaming STT",
        "Complies with Indian telecom regulations (DoT & TRAI) by strictly separating domestic Indian PSTN trunks from international VoIP routing",
        "Supports warm human handoff via SIP REFER with contextual CRM payloads injected into custom SIP headers (X-GyanVani-CRM-Data)",
        "Broad PBX interoperability tested with Asterisk PJSIP, FreeSWITCH, Cisco CUCM, Avaya Aura, and Twilio Elastic SIP Trunking",
        "Hardware-accelerated zero-transcoding bypass for Opus 48kHz and G.711u preserves crystal-clear speech quality and sub-300ms turnaround"
      ]
    },
    {
      question: "What is the Gyan VaniAi SIP Architecture?",
      answer: "A carrier-grade telephony gateway architecture that connects enterprise PBX phone systems (Asterisk, FreeSWITCH, Cisco CUCM, Avaya) and WhatsApp Calling APIs directly to Gyan VaniAi's sub-300ms real-time conversational AI audio pipeline via secure SIP trunks."
    },
    {
      question: "What protocols and codecs are supported?",
      answer: "SIP signaling over TLS 1.3/UDP/TCP with SRTP (Secure Real-Time Transport Protocol) for encrypted media. Codecs include Opus (wideband 48kHz for high-fidelity WebRTC/WhatsApp) and G.711u/a (PCMU/PCMA 8kHz for legacy PSTN interoperability)."
    },
    {
      question: "How does Gyan VaniAi handle Session Border Controllers (SBC)?",
      answer: "We deploy cloud-native, geo-distributed SBC clusters (Kamailio & FreeSWITCH B2BUA) with automated TLS termination, NAT traversal, DDoS mitigation, and adaptive jitter buffering positioned close to Tier-1 telecom interconnects."
    },
    {
      question: "Is Gyan VaniAi telephony compliant with Indian telecom regulations (TRAI/DoT)?",
      answer: "Yes. Our architecture enforces strict logical separation between international VoIP streams and domestic Indian PSTN trunks in accordance with Department of Telecommunications (DoT) and TRAI guidelines."
    },
    {
      question: "How does human agent handoff work over SIP?",
      answer: "When escalation is triggered, our SBC issues a SIP REFER or attended re-INVITE to the corporate PBX, passing full conversation context, transcript summaries, and customer intent scores via custom SIP headers (X-GyanVani-CRM-Data) for zero-context loss."
    }
  ];

  const sipPillars = [
    {
      stepNum: "01",
      icon: <Network size={24} />,
      title: "Carrier Ingestion & Redundant Trunks",
      desc: "Connects directly to Tier-1 telco providers (Airtel, Tata Tele, Jio, Twilio) and official WhatsApp Voice endpoints with Anycast IP failover.",
      specs: ["RFC 3261 SIP 2.0 Compliance", "Dual-Homed SIP Trunks", "Sub-5ms Carrier Interconnect"]
    },
    {
      stepNum: "02",
      icon: <ShieldCheck size={24} />,
      title: "Carrier-Grade Session Border Controller",
      desc: "Terminates mTLS signaling and SRTP media, enforces topology hiding, protects core AI clusters from DDoS flood attacks, and manages NAT traversal.",
      specs: ["TLS 1.3 & AES-256 SRTP", "Topology Hiding & Rate Limiting", "Geo-Distributed Anycast Nodes"]
    },
    {
      stepNum: "03",
      icon: <Radio size={24} />,
      title: "Full-Duplex SRTP to WebSocket Bridge",
      desc: "Translates inbound RTP UDP audio packets into binary PCM WebSocket streams in under 10ms, forwarding audio chunks directly into our streaming engines.",
      specs: ["Sub-10ms Packet Translation", "Opus <-> PCM 16kHz/48kHz", "Adaptive Jitter Buffer & PLC"]
    },
    {
      stepNum: "04",
      icon: <Activity size={24} />,
      title: "Neural Acoustic Processing & Fast VAD",
      desc: "Real-time energy and neural Silero VAD monitors acoustic channels. When caller speech is detected, active audio output is cut within 40ms.",
      specs: ["<40ms Barge-In Interruption", "Neural Echo Cancellation (AEC)", "RNNoise Ambient Filtering"]
    },
    {
      stepNum: "05",
      icon: <Mic size={24} />,
      title: "Streaming Speech-to-Text (ASR) Engine",
      desc: "Converts binary audio frames into text tokens in real time, yielding partial transcripts before the caller finishes speaking.",
      specs: ["Deepgram Nova-2 / Whisper", "Sub-90ms Partial Inference", "Indian Accents & Multilingual"]
    },
    {
      stepNum: "06",
      icon: <BrainCircuit size={24} />,
      title: "Speculative LLM Reasoning & Tool Calling",
      desc: "Processes RAG context chunks, prompt constraints, and CRM profiles using high-throughput LPU inference hardware to yield first response tokens.",
      specs: ["Sub-80ms First Token (TTFT)", "Groq LPUs & TensorRT-LLM", "Model Context Protocol (MCP)"]
    },
    {
      stepNum: "07",
      icon: <Volume2 size={24} />,
      title: "Chunked Streaming Voice Synthesis (TTS)",
      desc: "Synthesizes speech audio phrase-by-phrase upon detecting semantic punctuation boundaries, feeding outbound audio before sentence completion.",
      specs: ["Cartesia Sonic & ElevenLabs", "Sub-70ms First Audio Chunk", "Opus 48kHz HD Audio Stream"]
    },
    {
      stepNum: "08",
      icon: <PhoneForwarded size={24} />,
      title: "Dynamic Call Transfer & Human Handoff",
      desc: "Executes SIP REFER attended transfers to human agent PBX extensions with structured CRM lead context injected directly into SIP headers.",
      specs: ["SIP REFER (RFC 3515)", "Custom SIP X-Headers", "DoT/TRAI OSP Compliance"]
    }
  ];

  const protocolSequenceSteps = [
    {
      num: "01",
      method: "INVITE",
      type: "invite",
      arrow: "Carrier PBX ➔ Gyan VaniAi SBC",
      desc: "Inbound call initiation with SDP offer detailing supported codecs (Opus, G.711u), crypto keys, and caller ID (CLI)."
    },
    {
      num: "02",
      method: "100 Trying",
      type: "status",
      arrow: "Gyan VaniAi SBC ➔ Carrier PBX",
      desc: "Immediate provisional response confirming receipt of signaling and preventing carrier retransmissions."
    },
    {
      num: "03",
      method: "183 Session Progress",
      type: "status",
      arrow: "Gyan VaniAi SBC ➔ Carrier PBX",
      desc: "Early Media negotiation enabling immediate AI greeting or dynamic ringback audio before billable connect time."
    },
    {
      num: "04",
      method: "200 OK (SDP Answer)",
      type: "ok",
      arrow: "Gyan VaniAi SBC ➔ Carrier PBX",
      desc: "Call answered; SDP answer confirms selected codec (Opus 48kHz or PCMU 8kHz) and SRTP cryptographic parameters."
    },
    {
      num: "05",
      method: "ACK",
      type: "invite",
      arrow: "Carrier PBX ➔ Gyan VaniAi SBC",
      desc: "Three-way handshake completed. Media path is officially locked and established."
    },
    {
      num: "06",
      method: "Bidirectional SRTP Media",
      type: "rtp",
      arrow: "Caller ⇄ AI Media Bridge (Sub-10ms)",
      desc: "Encrypted full-duplex audio stream active. Inbound speech feeds neural VAD/STT; AI synthesis streams outbound chunks."
    },
    {
      num: "07",
      method: "SIP REFER (Warm Transfer)",
      type: "refer",
      arrow: "Gyan VaniAi SBC ➔ Corporate PBX",
      desc: "Escalates conversation to live human agent extension with X-GyanVani-CRM-Data header containing lead context & summary."
    },
    {
      num: "08",
      method: "BYE & 200 OK",
      type: "ok",
      arrow: "Carrier PBX ⇄ Gyan VaniAi SBC",
      desc: "Call teardown upon hangup. Session metrics, dual-channel audio recordings, and CDR analytics are synced to CRM."
    }
  ];

  const codecComparison = [
    {
      codec: "Opus",
      type: "Wideband / Fullband",
      sampleRate: "48,000 Hz",
      bitrate: "16 – 64 kbps",
      algorithmicDelay: "5.0 ms",
      mosScore: "4.4 / 5.0",
      status: "Recommended for WebRTC & WhatsApp",
      badgeClass: "rec"
    },
    {
      codec: "G.711u (PCMU)",
      type: "Narrowband",
      sampleRate: "8,000 Hz",
      bitrate: "64 kbps",
      algorithmicDelay: "0.125 ms",
      mosScore: "4.1 / 5.0",
      status: "Universal Standard (India/US PSTN)",
      badgeClass: "std"
    },
    {
      codec: "G.711a (PCMA)",
      type: "Narrowband",
      sampleRate: "8,000 Hz",
      bitrate: "64 kbps",
      algorithmicDelay: "0.125 ms",
      mosScore: "4.1 / 5.0",
      status: "Europe / International PSTN",
      badgeClass: "std"
    },
    {
      codec: "G.722",
      type: "Wideband HD",
      sampleRate: "16,000 Hz",
      bitrate: "64 kbps",
      algorithmicDelay: "0.125 ms",
      mosScore: "4.2 / 5.0",
      status: "Enterprise IP-PBX Trunks",
      badgeClass: "std"
    },
    {
      codec: "AMR-WB (G.722.2)",
      type: "Wideband Mobile",
      sampleRate: "16,000 Hz",
      bitrate: "12.65 – 23.85 kbps",
      algorithmicDelay: "20.0 ms",
      mosScore: "4.3 / 5.0",
      status: "Carrier VoLTE Direct Interconnect",
      badgeClass: "std"
    }
  ];

  const faqs = [
    {
      q: "Can I connect an existing enterprise PBX to Gyan VaniAi without changing phone numbers?",
      a: "Yes. You can route specific extension ranges, toll-free DIDs, or overflow queues to Gyan VaniAi SIP endpoints while keeping your primary telecom provider and existing PBX infrastructure intact."
    },
    {
      q: "How many concurrent SIP voice calls can Gyan VaniAi handle?",
      a: "Our Kubernetes-orchestrated media bridge auto-scales across multi-zone cloud regions, supporting from 10 to 5,000+ simultaneous concurrent voice channels per SBC cluster."
    },
    {
      q: "What is the round-trip latency overhead introduced by the SIP bridge?",
      a: "The SBC and media conversion bridge adds less than 12 milliseconds of overhead to the overall audio pipeline, preserving our sub-300ms total conversational turnaround."
    },
    {
      q: "How does Gyan VaniAi comply with Indian telecom regulations (TRAI & DoT)?",
      a: "Under the Department of Telecommunications (DoT) guidelines for Other Service Providers (OSPs), our cloud SBC enforces logical data partitioning: domestic Indian PSTN traffic is strictly isolated from international VoIP streams to eliminate illegal toll bypass."
    },
    {
      q: "What happens when an AI voice agent needs to escalate to a human representative?",
      a: "The SBC executes a standard SIP REFER (RFC 3515) attended transfer to your call center PBX. The transfer packet includes custom headers (such as X-GyanVani-CRM-Data) containing the caller's CRM profile, sentiment score, and dialog transcript, triggering an instant screen pop for the receiving agent."
    },
    {
      q: "How does the SIP architecture handle firewalls and NAT traversal?",
      a: "Our Session Border Controllers feature built-in STUN/ICE and symmetric RTP pinning. Inbound RTP packets from behind enterprise NAT firewalls are automatically detected, latching onto the media stream without requiring opening insecure inbound port ranges."
    },
    {
      q: "Can Gyan VaniAi bridge official WhatsApp Voice Calling with traditional SIP trunks?",
      a: "Yes. Our media converter seamlessly bridges WebRTC Opus streams from the official WhatsApp Calling API directly into SIP/SRTP trunks, allowing you to route WhatsApp voice callers into existing contact center queues or AI voice bots."
    },
    {
      q: "Are voice calls encrypted end-to-end?",
      a: "Yes. Signaling is encrypted via TLS 1.3 with mutual authentication (mTLS), and media packets are protected with AES-128 or AES-256 SRTP encryption. Unencrypted RTP over public networks is strictly rejected."
    }
  ];

  const techSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'SIP Architecture Guide 2026: Carrier-Grade Telephony & Autonomous Voice AI',
    image: 'https://www.gyanvaniai.com/hero_dashboard.webp',
    description: 'Comprehensive engineering guide for connecting corporate PBX telephony, carrier SIP trunks, and WhatsApp voice calling directly to sub-300ms Voice AI inference clusters.',
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
    url: 'https://www.gyanvaniai.com/resources/sip-architecture',
    datePublished: '2026-10-07',
    dateModified: '2026-11-18'
  };

  const allFaqItems = [
    ...aiSummaryItems,
    ...faqs.map(f => ({ question: f.q, answer: f.a }))
  ];

  return (
    <div className="sip-guide-page">
      <SeoHead
        title="SIP Architecture Guide 2026 | Enterprise Telephony & Voice AI | Gyan VaniAi"
        description="Engineering reference for SIP trunking, Session Border Controllers, SRTP media bridging, and PBX telephony integration for autonomous Voice AI agents."
        canonical="https://www.gyanvaniai.com/resources/sip-architecture"
        schema={techSchema}
        keywords="SIP Architecture Guide 2026, Voice AI Telephony, SIP Trunking AI, PBX Voice Bot, Asterisk FreeSWITCH Voice AI, SBC Session Border Controller, SRTP Opus WebRTC, DoT TRAI Telephony Compliance"
      />

      <div className="sip-hero-bg-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="sip-hero">
        <div className="sip-container">
          <Breadcrumbs />

          <div className="sip-hero-badge">
            <span className="pulse-dot" />
            <span>RFC 3261 • Enterprise Telephony & Voice AI 2026</span>
          </div>

          <h1 className="sip-hero-title">
            Carrier-Grade <span className="gradient-text">SIP Trunking Architecture</span> for Conversational Voice AI
          </h1>

          <p className="sip-hero-subtitle">
            A battle-tested engineering blueprint for connecting corporate PBX systems (Asterisk, FreeSWITCH, Cisco, Avaya), carrier SIP trunks, and WhatsApp Voice APIs directly to sub-300ms real-time AI speech inference clusters.
          </p>

          {/* Telephony Metrics Bar */}
          <div className="sip-metrics-grid">
            <div className="sip-metric-card">
              <div className="sip-metric-val">&lt; 12ms</div>
              <div className="sip-metric-label">SBC Bridge Latency</div>
            </div>
            <div className="sip-metric-card">
              <div className="sip-metric-val">5,000+</div>
              <div className="sip-metric-label">Channels / Cluster</div>
            </div>
            <div className="sip-metric-card">
              <div className="sip-metric-val">TLS 1.3 / SRTP</div>
              <div className="sip-metric-label">Zero-Trust Encryption</div>
            </div>
            <div className="sip-metric-card">
              <div className="sip-metric-val">Sub-300ms</div>
              <div className="sip-metric-label">Voice AI Turnaround</div>
            </div>
            <div className="sip-metric-card">
              <div className="sip-metric-val">DoT & TRAI</div>
              <div className="sip-metric-label">Legal Partitioning</div>
            </div>
          </div>

          <div className="sip-hero-actions">
            <a href="#architecture-stack" className="sip-btn-primary">
              <Layers size={18} />
              <span>Explore Architecture Stack</span>
            </a>
            <a href="#codec-matrix" className="sip-btn-secondary">
              <Volume2 size={18} />
              <span>Codec & Quality Matrix</span>
            </a>
            <a href="#telephony-calculator" className="sip-btn-secondary">
              <Sliders size={18} />
              <span>Bandwidth Calculator</span>
            </a>
          </div>
        </div>
      </section>

      {/* Background AI Citation & Structured Search Engine Metadata (Invisible on UI) */}
      <AiAnswerSummaryBlock items={allFaqItems} title="Executive Summary: SIP Telephony Architecture for Voice AI" />

      {/* Multi-Tier Architecture Engine Visualizer */}
      <section className="sip-section" id="architecture-stack">
        <div className="sip-container">
          <div className="sip-section-header">
            <div className="sip-eyebrow">
              <Network size={14} />
              <span>System Topology</span>
            </div>
            <h2 className="sip-section-title">The 8-Tier Voice AI Telephony Architecture</h2>
            <p className="sip-section-desc">
              How Gyan VaniAi securely interfaces carrier-grade telecom switches with ultra-fast neural speech pipelines.
            </p>
          </div>

          <div className="sip-arch-grid">
            {sipPillars.map((pillar, idx) => (
              <SpotlightCard key={idx} className="sip-arch-card" spotlightColor="rgba(45, 212, 191, 0.15)">
                <div className="sip-arch-card-badge">TIER {pillar.stepNum}</div>
                <div className="sip-arch-icon">{pillar.icon}</div>
                <h3 className="sip-arch-title">{pillar.title}</h3>
                <p className="sip-arch-desc">{pillar.desc}</p>
                <ul className="sip-arch-specs">
                  {pillar.specs.map((spec, sIdx) => (
                    <li key={sIdx}>
                      <CheckCircle2 size={14} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Ladder / Signaling Sequence Visualizer */}
      <section className="sip-section" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
        <div className="sip-container">
          <div className="sip-section-header">
            <div className="sip-eyebrow">
              <Activity size={14} />
              <span>Call Signaling & Media Lifecycle</span>
            </div>
            <h2 className="sip-section-title">SIP Protocol Ladder & Handshake Sequence</h2>
            <p className="sip-section-desc">
              Step-by-step RFC 3261 signaling flow from initial carrier INVITE to early media, full-duplex SRTP streaming, and warm agent transfer.
            </p>
          </div>

          <div className="sip-ladder-wrap">
            <div className="sip-ladder-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  End-to-End SIP Call Signaling Sequence
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.25rem 0 0' }}>
                  Compliant with RFC 3261, RFC 3550 (RTP), RFC 3711 (SRTP), and RFC 3515 (REFER)
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="sip-method-pill invite">Signaling</span>
                <span className="sip-method-pill status">Provisional</span>
                <span className="sip-method-pill rtp">Encrypted SRTP</span>
                <span className="sip-method-pill refer">Escalation</span>
              </div>
            </div>

            <div className="sip-ladder-entity-row">
              <div>Carrier PBX / PSTN Gateway</div>
              <div>Gyan VaniAi Edge SBC</div>
              <div>Voice AI Inference Engine</div>
            </div>

            <div className="sip-ladder-steps">
              {protocolSequenceSteps.map((step) => (
                <div key={step.num} className="sip-ladder-item">
                  <div className="sip-ladder-step-num">STEP {step.num}</div>
                  <div className="sip-ladder-center">
                    <div className="sip-ladder-signal">
                      <span className={`sip-method-pill ${step.type}`}>{step.method}</span>
                      <span>{step.arrow}</span>
                    </div>
                    <p className="sip-ladder-desc">{step.desc}</p>
                  </div>
                  <div className="sip-ladder-direction">{step.type.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Codec Negotiation & Transcoding Matrix */}
      <section className="sip-section" id="codec-matrix" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
        <div className="sip-container">
          <div className="sip-section-header">
            <div className="sip-eyebrow">
              <Volume2 size={14} />
              <span>Audio Fidelity & Quality</span>
            </div>
            <h2 className="sip-section-title">Codec Negotiation & Transcoding Matrix</h2>
            <p className="sip-section-desc">
              Compare bitrates, latency overhead, and Mean Opinion Scores (MOS) across supported carrier codecs.
            </p>
          </div>

          <div className="sip-table-wrap">
            <table className="sip-table">
              <thead>
                <tr>
                  <th>Codec</th>
                  <th>Audio Profile</th>
                  <th>Sample Rate</th>
                  <th>Bitrate</th>
                  <th>Algorithmic Delay</th>
                  <th>MOS Quality</th>
                  <th>Interoperability Scope</th>
                </tr>
              </thead>
              <tbody>
                {codecComparison.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.codec}</strong></td>
                    <td>{row.type}</td>
                    <td><code>{row.sampleRate}</code></td>
                    <td>{row.bitrate}</td>
                    <td><code>{row.algorithmicDelay}</code></td>
                    <td><strong style={{ color: '#2dd4bf' }}>{row.mosScore}</strong></td>
                    <td>
                      <span className={`sip-badge-tag ${row.badgeClass}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'rgba(15, 118, 110, 0.1)', border: '1px solid rgba(45, 212, 191, 0.25)', borderRadius: '12px' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1', lineHeight: '1.6' }}>
              💡 <strong>Zero-Transcoding Latency Optimization:</strong> Gyan VaniAi negotiates native <strong>Opus (48kHz)</strong> for WebRTC and WhatsApp callers to preserve crystal-clear audio fidelity with zero transcoding delay. When communicating with legacy PSTN switches, G.711u/a is handled via hardware-accelerated integer resampling, adding under 0.8ms to total pipeline latency.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Sizing & Telephony Bandwidth Calculator */}
      <section className="sip-section" id="telephony-calculator">
        <div className="sip-container">
          <div className="sip-section-header">
            <div className="sip-eyebrow">
              <Sliders size={14} />
              <span>Capacity Planning Tool</span>
            </div>
            <h2 className="sip-section-title">Interactive Telephony Bandwidth & Sizing Calculator</h2>
            <p className="sip-section-desc">
              Estimate required dedicated bandwidth, packet rates, and SBC compute allocations based on your anticipated concurrent call volume.
            </p>
          </div>

          <div className="sip-calc-card">
            <div className="sip-calc-controls">
              <div className="sip-calc-field">
                <label>Target Concurrent Voice Channels:</label>
                <div className="sip-calc-options">
                  {[25, 50, 100, 250, 500, 1000].map((val) => (
                    <button
                      key={val}
                      className={`sip-calc-opt-btn ${channels === val ? 'active' : ''}`}
                      onClick={() => setChannels(val)}
                    >
                      {val} Calls
                    </button>
                  ))}
                </div>
              </div>

              <div className="sip-calc-field">
                <label>Preferred Media Codec:</label>
                <div className="sip-calc-options">
                  <button
                    className={`sip-calc-opt-btn ${selectedCodec === 'opus' ? 'active' : ''}`}
                    onClick={() => setSelectedCodec('opus')}
                  >
                    Opus 48kHz (Wideband ~40 kbps)
                  </button>
                  <button
                    className={`sip-calc-opt-btn ${selectedCodec === 'g711' ? 'active' : ''}`}
                    onClick={() => setSelectedCodec('g711')}
                  >
                    G.711u / PCMU (8kHz ~80 kbps)
                  </button>
                </div>
              </div>
            </div>

            <div className="sip-calc-results">
              <div className="sip-calc-stat">
                <div className="sip-calc-stat-val">{totalBandwidthMbps} Mbps</div>
                <div className="sip-calc-stat-label">Full-Duplex Bandwidth</div>
              </div>
              <div className="sip-calc-stat">
                <div className="sip-calc-stat-val">{packetsPerSecond}</div>
                <div className="sip-calc-stat-label">Packets / Sec (RTP)</div>
              </div>
              <div className="sip-calc-stat">
                <div className="sip-calc-stat-val">{requiredSbcCores} Cores</div>
                <div className="sip-calc-stat-label">SBC Compute Nodes</div>
              </div>
              <div className="sip-calc-stat">
                <div className="sip-calc-stat-val">~{estimatedMonthlyMinutes}</div>
                <div className="sip-calc-stat-label">Monthly Mins Capacity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Telecom Regulations & Legal Compliance (DoT / TRAI) */}
      <section className="sip-section" style={{ background: 'rgba(0, 0, 0, 0.25)' }}>
        <div className="sip-container">
          <div className="sip-section-header">
            <div className="sip-eyebrow">
              <Lock size={14} />
              <span>Legal & Regulatory Framework</span>
            </div>
            <h2 className="sip-section-title">DoT & TRAI Indian Telecom Compliance</h2>
            <p className="sip-section-desc">
              Architectural safeguards ensuring 100% compliance with Department of Telecommunications (DoT) and Telecom Regulatory Authority of India (TRAI) mandates.
            </p>
          </div>

          <div className="sip-reg-grid">
            <div className="sip-reg-card">
              <div className="sip-reg-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="sip-reg-title">OSP Logical Partitioning</h3>
                <p className="sip-reg-desc">
                  Strict logical separation between domestic Indian PSTN trunks and international VoIP traffic, preventing illegal toll bypass and complying with Revised OSP guidelines.
                </p>
              </div>
            </div>

            <div className="sip-reg-card">
              <div className="sip-reg-icon">
                <PhoneCall size={22} />
              </div>
              <div>
                <h3 className="sip-reg-title">CLI Verification & Anti-Spoofing</h3>
                <p className="sip-reg-desc">
                  Mandates cryptographic P-Asserted-Identity (PAI) and Remote-Party-ID (RPID) presentation, ensuring only authorized enterprise DIDs are transmitted on outbound AI calls.
                </p>
              </div>
            </div>

            <div className="sip-reg-card">
              <div className="sip-reg-icon">
                <Database size={22} />
              </div>
              <div>
                <h3 className="sip-reg-title">Tamper-Proof CDR Archival</h3>
                <p className="sip-reg-desc">
                  Call Detail Records (CDRs) containing IP addresses, timestamps, codecs, and routing paths are cryptographically signed and stored in Indian cloud regions for audit inspection.
                </p>
              </div>
            </div>

            <div className="sip-reg-card">
              <div className="sip-reg-icon">
                <Globe size={22} />
              </div>
              <div>
                <h3 className="sip-reg-title">In-Country Media Processing</h3>
                <p className="sip-reg-desc">
                  Edge media gateways located in Mumbai and Delhi ensure citizen audio data is processed and stored strictly within Indian borders in adherence with DPDP data localization requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cluster Navigation & Related Guides */}
      <section className="sip-section">
        <div className="sip-container">
          <div className="sip-cluster-card">
            <h3 className="sip-cluster-title">Explore Related Voice AI & Infrastructure Engineering Guides</h3>
            <div className="sip-cluster-links">
              <Link to="/resources/voice-ai-latency-benchmark" className="sip-cluster-pill">
                <span>Voice AI Latency Benchmark (Sub-300ms)</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/resources/voice-ai-infrastructure" className="sip-cluster-pill">
                <span>Voice AI Infrastructure Engineering</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/services/whatsapp-calling-agent" className="sip-cluster-pill">
                <span>WhatsApp Calling Agent Bots</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/services/phone-call-agent" className="sip-cluster-pill">
                <span>Phone Call Agents & Inbound IVR</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/guides/crm-migration" className="sip-cluster-pill">
                <span>CRM Migration & Telephony Sync</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="sip-container" style={{ margin: '2rem auto 4rem' }}>
        <FAQ items={faqs} includeSchema={false} title="Frequently Asked Questions on SIP Telephony & Voice AI" />
      </div>

      {/* Contact & Consultation Section */}
      <ContactSection />
    </div>
  );
}
