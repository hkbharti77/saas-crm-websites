import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Bot, 
  Terminal, 
  ArrowRight, 
  Database, 
  Lock,
  Zap
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './GuidesAndResources.css';

export default function McpToolCallingGuidePage() {
  const aiSummaryItems = [
    {
      question: "What is the Model Context Protocol (MCP)?",
      answer: "An open standard created by Anthropic that provides a unified, secure protocol for LLMs and autonomous AI agents to connect to external databases, enterprise tools, and API environments without custom per-tool glue code."
    },
    {
      question: "How does Gyan VaniAi use MCP in autonomous CRM agents?",
      answer: "Gyan VaniAi utilizes MCP client-server architecture to enable AI agents on WhatsApp and Voice channels to inspect live inventory, query customer CRM profiles, book calendar meetings, and dispatch transactional notifications securely."
    },
    {
      question: "What are the core protocol primitives of MCP?",
      answer: "1) Tools (executable functions that perform actions like updating a deal or creating a task), 2) Resources (file-like read-only data sources like logs or customer files), and 3) Prompts (reusable parameterized prompt templates)."
    },
    {
      question: "How is security and data isolation enforced in MCP tool calling?",
      answer: "Every MCP server operates with least-privilege scoping, token authentication, and schema validation. Critical actions (such as issuing refunds, executing bulk broadcasts, or updating access permissions) mandate explicit human-in-the-loop authorization."
    }
  ];

  const mcpPillars = [
    {
      icon: <Terminal size={22} />,
      title: "1. Standardized JSON-RPC 2.0 Communication",
      desc: "MCP standardizes bi-directional message exchange over stdin/stdout or Server-Sent Events (SSE), eliminating the need to write bespoke API client adapters for each LLM provider."
    },
    {
      icon: <Database size={22} />,
      title: "2. Live Enterprise Context & Resource Inspection",
      desc: "Agents inspect CRM contact histories, e-commerce catalog states, and knowledge base documents on-demand, preventing context window bloat and eliminating hallucinations."
    },
    {
      icon: <Zap size={22} />,
      title: "3. Safe Deterministic Tool Execution",
      desc: "Models generate structured JSON arguments validated against JSON Schema specifications before execution. If arguments fail validation, the agent self-corrects without crashing."
    },
    {
      icon: <Lock size={22} />,
      title: "4. Human-in-the-Loop Safeguards",
      desc: "For sensitive CRM operations (changing contract values, executing bulk campaigns, updating permissions), the MCP runtime requests explicit human agent confirmation."
    }
  ];

  const faqs = [
    {
      q: "Can I connect custom proprietary internal APIs as MCP servers?",
      a: "Yes. Gyan VaniAi allows developers to register custom MCP servers using Python or TypeScript SDKs, granting AI agents access to internal ERP or PostgreSQL databases."
    },
    {
      q: "Does MCP replace REST and GraphQL APIs?",
      a: "No. MCP acts as the abstraction protocol between AI agents and existing REST/GraphQL services. An MCP server translates the LLM tool call into standard REST or database queries."
    },
    {
      q: "How does MCP improve multi-agent orchestration?",
      a: "Different specialized agents (e.g. Sales Qualification Agent, Support Triaging Agent, Billing Agent) can connect to the same shared MCP servers, ensuring consistent business logic and permission enforcement."
    }
  ];

  const techSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Model Context Protocol (MCP) & AI Agent Tool Calling: Enterprise Engineering Guide',
    description: 'Comprehensive guide to building autonomous AI agents with Anthropic MCP (Model Context Protocol), secure tool calling, and live CRM data connectivity.',
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
    url: 'https://www.gyanvaniai.com/resources/mcp-ai-agent-tool-calling',
    datePublished: '2026-10-07'
  };

  return (
    <div className="guide-page">
      <SeoHead
        title="MCP & AI Agent Tool Calling Guide 2026 | Enterprise Protocol | Gyan VaniAi"
        description="Engineering reference for Anthropic Model Context Protocol (MCP). How autonomous AI agents use secure tool calling to connect to CRMs, databases, and APIs."
        canonical="https://www.gyanvaniai.com/resources/mcp-ai-agent-tool-calling"
        schema={techSchema}
        keywords="Model Context Protocol, MCP AI Agent, Tool Calling Guide, Autonomous Agent Architecture, MCP Server Enterprise"
      />

      <section className="guide-hero">
        <div className="container">
          <div className="guide-hero-badge">
            <Bot size={16} />
            <span>AI Systems Architecture Guide</span>
          </div>
          <h1 className="guide-hero-title">
            Model Context Protocol (MCP) & AI Agent Tool Calling
          </h1>
          <p className="guide-hero-subtitle">
            An engineering guide to connecting autonomous AI agents to enterprise databases, WhatsApp APIs, and CRM pipelines using Anthropic’s open Model Context Protocol.
          </p>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="Executive Summary: Model Context Protocol Architecture" />

      {/* MCP Architecture Pillars */}
      <section className="guide-steps-section">
        <div className="container">
          <div className="guide-section-header">
            <span className="guide-pill">Protocol Specification</span>
            <h2 className="guide-section-title">The 4 Foundation Pillars of MCP Integration</h2>
            <p className="guide-section-desc">
              How standard JSON-RPC, schema-validated tool calling, and resource discovery eliminate brittle LLM integrations.
            </p>
          </div>

          <div className="guide-steps-list">
            {mcpPillars.map((pillar, idx) => (
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
            <h3 className="guide-cluster-title">Related AI Architecture & Telemetry Guides</h3>
            <div className="guide-cluster-links">
              <Link to="/services/ai-agent-development" className="guide-link-pill">
                <span>AI Agent Development</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/resources/voice-ai-latency-benchmark" className="guide-link-pill">
                <span>Voice AI Latency Benchmark</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/ai-chatbots" className="guide-link-pill">
                <span>Enterprise AI Chatbots</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/documentation" className="guide-link-pill">
                <span>Developer Documentation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on Model Context Protocol" />
      </div>

      <ContactSection />
    </div>
  );
}
