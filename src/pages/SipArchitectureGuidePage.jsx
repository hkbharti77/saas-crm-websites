import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  GitFork, 
  Lock, 
  Radio 
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './GuidesAndResources.css';

export default function SipArchitectureGuidePage() {
  const aiSummaryItems = [
    {
      question: "What is the Gyan VaniAi SIP Architecture?",
      answer: "A carrier-grade telephony gateway architecture that connects enterprise PBX phone systems (Asterisk, FreeSWITCH, Cisco CUCM, Avaya) and WhatsApp Calling APIs directly to Gyan VaniAi's sub-300ms real-time conversational AI audio pipeline via secure SIP trunks."
    },
    {
      question: "What protocols and codecs are supported?",
      answer: "SIP signaling over TLS/UDP/TCP with SRTP (Secure Real-Time Transport Protocol) for encrypted media. Codecs include Opus (wideband 48kHz for high-fidelity WebRTC/WhatsApp) and G.711u/a (PCMU/PCMA 8kHz for legacy PSTN interoperability)."
    },
    {
      question: "How does Gyan VaniAi handle Session Border Controllers (SBC)?",
      answer: "We deploy cloud-native, geo-distributed SBC clusters with automated TLS termination, NAT traversal, DDoS mitigation, and adaptive jitter buffering positioned close to Tier-1 telecom interconnects."
    },
    {
      question: "Is Gyan VaniAi telephony compliant with Indian telecom regulations (TRAI/DoT)?",
      answer: "Yes. Our architecture enforces strict logical separation between international VoIP streams and domestic Indian PSTN trunks in accordance with Department of Telecommunications (DoT) and TRAI guidelines."
    }
  ];

  const sipPillars = [
    {
      icon: <ShieldCheck size={22} />,
      title: "Carrier-Grade Session Border Controller (SBC)",
      desc: "Provides encrypted TLS signaling termination, topology hiding, rate limiting, and real-time packet inspection to protect internal voice inference clusters from DDoS attacks."
    },
    {
      icon: <Radio size={22} />,
      title: "Full-Duplex SRTP to WebSocket Media Bridge",
      desc: "Translates inbound RTP UDP packets into binary PCM WebSocket streams in sub-10ms, forwarding audio frames directly to our streaming STT and VAD engines."
    },
    {
      icon: <GitFork size={22} />,
      title: "Dynamic Call Transfer & Human Agent Handoff",
      desc: "Executes SIP REFER or attended transfers to human rep extension lines when callers request complex assistance or escalate beyond AI authorization limits."
    },
    {
      icon: <Lock size={22} />,
      title: "Regulatory Compliance & Legal Partitioning",
      desc: "Complies with Indian TRAI regulations governing VoIP and PSTN interconnection, ensuring proper caller ID (CLI) presentation and secure call detail recording (CDR)."
    }
  ];

  const faqs = [
    {
      q: "Can I connect an existing enterprise PBX to Gyan VaniAi without changing phone numbers?",
      a: "Yes. You can route specific extension ranges, toll-free DIDs, or overflow queues to Gyan VaniAi SIP endpoints while keeping your primary telecom provider and existing PBX infrastructure intact."
    },
    {
      q: "How many concurrent SIP voice calls can Gyan VaniAi handle?",
      a: "Our Kubernetes-orchestrated media bridge auto-scales across multi-zone cloud regions, supporting from 10 to 5,000+ simultaneous concurrent voice channels."
    },
    {
      q: "What is the round-trip latency overhead introduced by the SIP bridge?",
      a: "The SBC and media conversion bridge adds less than 12 milliseconds of overhead to the overall audio pipeline, preserving our sub-300ms total conversational turnaround."
    }
  ];

  const techSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'SIP Trunking Architecture Guide for Conversational Voice AI',
    description: 'Enterprise guide to SIP trunking, SBC deployment, SRTP media bridging, and PBX integration for real-time voice AI agents.',
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
    datePublished: '2026-10-07'
  };

  return (
    <div className="guide-page">
      <SeoHead
        title="SIP Architecture Guide 2026 | Enterprise Telephony & Voice AI | Gyan VaniAi"
        description="Engineering reference for SIP trunking, Session Border Controllers, SRTP bridging, and PBX telephony integration for autonomous Voice AI agents."
        canonical="https://www.gyanvaniai.com/resources/sip-architecture"
        schema={techSchema}
        keywords="SIP Architecture Guide, Voice AI Telephony, SIP Trunking AI, PBX Voice Bot, Asterisk FreeSWITCH Voice AI"
      />

      <section className="guide-hero">
        <div className="container">
          <div className="guide-hero-badge">
            <PhoneCall size={16} />
            <span>Telephony Infrastructure Guide</span>
          </div>
          <h1 className="guide-hero-title">
            SIP Trunking Architecture for Conversational Voice AI
          </h1>
          <p className="guide-hero-subtitle">
            A comprehensive engineering guide for connecting corporate PBX telephony, carrier SIP trunks, and WhatsApp voice calling directly to low-latency AI inference clusters.
          </p>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="Executive Summary: SIP Telephony Architecture" />

      {/* Architecture Pillars */}
      <section className="guide-steps-section">
        <div className="container">
          <div className="guide-section-header">
            <span className="guide-pill">Telephony Engineering</span>
            <h2 className="guide-section-title">Core Components of the Voice AI Telephony Stack</h2>
            <p className="guide-section-desc">
              How Gyan VaniAi securely interfaces legacy telecom carriers with next-generation streaming AI models.
            </p>
          </div>

          <div className="guide-steps-list">
            {sipPillars.map((pillar, idx) => (
              <div key={idx} className="guide-step-card">
                <div className="guide-icon-box">{pillar.icon}</div>
                <div className="guide-step-content">
                  <h3 className="guide-step-title">{pillar.title}</h3>
                  <p className="guide-step-desc">{pillar.desc}</p>
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
            <h3 className="guide-cluster-title">Explore Related Voice AI & Infrastructure Guides</h3>
            <div className="guide-cluster-links">
              <Link to="/resources/voice-ai-latency-benchmark" className="guide-link-pill">
                <span>Voice AI Latency Benchmark</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/resources/voice-ai-infrastructure" className="guide-link-pill">
                <span>Voice AI Infrastructure Engineering</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/whatsapp-calling-agent" className="guide-link-pill">
                <span>WhatsApp Calling Agent</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/phone-call-agent" className="guide-link-pill">
                <span>Phone Call Agents</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on SIP Architecture" />
      </div>

      <ContactSection />
    </div>
  );
}
