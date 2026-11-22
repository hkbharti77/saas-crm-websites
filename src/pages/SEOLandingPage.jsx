import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { ArrowRight, CheckCircle2, X, Check, Inbox, Filter, Star, UserCheck, UserPlus, Mail, Trophy, PhoneCall, Mic, BrainCircuit, Bot, Calendar, Headset, Database, Building2, ShieldCheck, Zap, Layers, BarChart3, Users, MessageSquare, Truck, Plane, Utensils, GraduationCap, Factory, Smartphone, Landmark, Sliders, Globe, Server, Clock, FileText, Shield, PhoneForwarded, Cpu, Boxes, Send, Award, Workflow, Laptop } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Process from '../components/Process';
import VoiceAIEngineArchitecture from '../components/VoiceAIEngineArchitecture';
import SalesAutomationPage from './SalesAutomationPage';
import AIChatbotsPage from './AIChatbotsPage';
import WhatsAppCallingAgentPage from './WhatsAppCallingAgentPage';
import HealthcarePage from './HealthcarePage';
import RealEstatePage from './RealEstatePage';
import RetailPage from './RetailPage';
import FinancePage from './FinancePage';
import IvrSolutionsPage from './IvrSolutionsPage';
import LegalPage from './LegalPage';
import NotFound from './NotFound';

const SITE = 'https://www.gyanvaniai.com';

const seoDataMap = {
    'ai-development': {
    metaTitle: 'AI Software Development Company | Custom AI Solutions | Gyan VaniAi',
    metaDescription: 'Hire Gyan VaniAi for custom AI software development: LLM apps, chatbots, RAG systems, and autonomous agents that automate operations and grow revenue.',
    heroEyebrow: 'ENTERPRISE ARTIFICIAL INTELLIGENCE',
    h1: 'Custom AI Software Development',
    subtitle: 'Architecting production-ready LLM applications, tenant-isolated RAG pipelines, autonomous agents, and custom fine-tuned models engineered for verifiable business ROI.',
    overviewTitle: 'Production-Grade AI Applications Engineered for Real Operations',
    overview: 'Gyan VaniAi is a custom artificial intelligence software development company that designs, builds, and deploys production-grade AI systems for enterprises, high-growth startups, and operational teams. While generic AI demos fail under real-world data complexity, we engineer resilient AI architectures: tenant-isolated Retrieval-Augmented Generation (RAG) knowledge systems, autonomous multi-agent operational workflows, domain-fine-tuned Large Language Models (LLMs), conversational voice agents, and seamless API integrations with your CRM, ERP, and WhatsApp stacks.',
    whoForTitle: 'Engineered for Operations Directors and Enterprise CTOs',
    whoFor: 'Enterprise IT leaders, product founders, and operations directors who require secure, observable artificial intelligence that executes inside real commercial workflows—sales qualification, customer service, internal document intelligence, and automated operations—with deterministic guardrails and verifiable security.',
    deliverablesTitle: 'AI Engineering Deliverables',
    deliverables: [
      'Tenant-Isolated Retrieval-Augmented Generation (RAG) Knowledge Engines',
      'Custom LLM Applications & Autonomous Multi-Agent Workflows',
      'Conversational AI Chatbots & Voice Bots with Contextual Human Handoff',
      'Proprietary Model Fine-Tuning & Quantized On-Premise/Private Cloud Deployments',
      'Bidirectional CRM, ERP & WhatsApp Business API Connectors',
      'AI Guardrails, Deterministic Output Validation & Token Cost Optimization',
      'Comprehensive Observability, Step Tracking & Immutable Audit Logging'
    ],
    benefits: [
      'Production-Grade Architecture',
      'Tenant-Isolated RAG Security',
      '24/7 Multi-Agent Automation',
      'Zero Data Leakage Guarantee'
    ],
    image: '/portfolio_ai.webp',
    imageAlt: 'AI software development dashboard and agent orchestration by Gyan VaniAi',
    capabilitiesTitle: 'Core Custom AI Engineering Capabilities',
    capabilities: [
      { title: 'Enterprise RAG & Vector Knowledge Bases', desc: 'Transform static internal PDFs, databases, and policies into real-time semantic search pipelines with sub-second retrieval and strict tenant access control.' },
      { title: 'Autonomous Multi-Agent Orchestration', desc: 'Deploy specialized agents collaborating across multi-step business logic: data intake, validation, research, and automated backend action execution.' },
      { title: 'Tool Calling & Function Execution', desc: 'Equip models with deterministic API tool calling to query SQL databases, generate invoices, update CRM records, and trigger external webhooks.' },
      { title: 'Deterministic Guardrails & Output Validation', desc: 'Enforce JSON schema validation, hallucination detection, prompt injection defense, and PII anonymization before outputs reach users.' },
      { title: 'Model Fine-Tuning & Private Cloud Hosting', desc: 'Fine-tune open-source models (Llama 3, Mistral) on your proprietary domain data, hosted on private sovereign cloud instances with zero third-party training.' },
      { title: 'LLM Observability & Latency Optimization', desc: 'Monitor every inference step, token expenditure, latency metric, and cache hit rate in real time with comprehensive audit logging.' }
    ],
    workflowHeading: 'The Enterprise AI Engineering & Deployment Lifecycle',
    workflowSubtitle: 'From raw domain data ingestion and RAG vector indexing to model deployment and verified workflow execution.',
    engineBanner: {
      tag: 'AI ORCHESTRATION ENGINE',
      title: 'Production-Grade AI Execution Pipeline',
      desc: 'Transform enterprise knowledge and workflows into secure, autonomous AI systems that take verified action.'
    },
    customSteps: [
      { stepNum: '01', category: 'Ingestion', icon: <Database size={20} />, title: 'Enterprise Data Ingestion & Sanitization', desc: 'Ingest unstructured business documentation, databases, and knowledge bases with automated PII masking and chunking.' },
      { stepNum: '02', category: 'Embedding', icon: <Cpu size={20} />, title: 'Semantic Vector Embedding & Indexing', desc: 'Generate dense vector embeddings stored in tenant-isolated vector databases with hybrid keyword-semantic search capabilities.' },
      { stepNum: '03', category: 'Reasoning', icon: <BrainCircuit size={20} />, title: 'Intent Analysis & Context Routing', desc: 'Classify user intent, determine required permissions, and assemble relevant historical context for prompt augmentation.' },
      { stepNum: '04', category: 'Tool Calling', icon: <Workflow size={20} />, title: 'Deterministic API & Tool Execution', desc: 'Agent evaluates business logic, selects verified external API tools, queries databases, and compiles verified payload actions.' },
      { stepNum: '05', category: 'Guardrails', icon: <ShieldCheck size={20} />, title: 'Guardrail Verification & Schema Check', desc: 'Output is validated against strict JSON schemas, hallucination filters, and company compliance policies before dispatch.' },
      { stepNum: '06', category: 'Integration', icon: <Zap size={20} />, title: 'Omnichannel Action Dispatch', desc: 'Deliver verified responses and execute actions across WhatsApp, web portals, mobile apps, and enterprise CRM dashboards.' },
      { stepNum: '07', category: 'Telemetry', icon: <BarChart3 size={20} />, title: 'Continuous Observability & Evaluation', desc: 'Log latency, token consumption, retrieval accuracy, and human feedback to iteratively refine model performance.' }
    ],
    outcomesTitle: 'Measurable Enterprise Impact & AI Productivity',
    outcomesSubtitle: 'Designed to replace manual operational bottlenecks with scalable, secure, and accurate artificial intelligence.',
    outcomes: [
      { title: '80% Reduction in Routine Operational Drag', desc: 'Automate repetitive data retrieval, client intake, and multi-step record updates across internal software tools.' },
      { title: 'Sub-300ms Retrieval Latency', desc: 'Optimized hybrid search and prompt caching deliver instantaneous, context-rich answers to user queries.' },
      { title: '100% Data Isolation & Confidentiality', desc: 'Your private corporate data is never passed to public AI models or used for model training.' },
      { title: '5x Return on Operational Investment', desc: 'Measurable cost reductions in customer support, back-office document processing, and manual data entry.' }
    ],
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/ai-agent-development', text: 'RAG & AI Agent Solutions' },
      { url: '/services/lead-management', text: 'Lead Management & Pipelines' }
    ],
    customFaqs: [
      { question: 'What types of custom AI software does Gyan VaniAi develop?', answer: 'We develop custom AI solutions across four core pillars: (1) Enterprise Retrieval-Augmented Generation (RAG) systems that search and synthesize company documentation with citation accuracy, (2) Autonomous AI Agents that execute multi-step business workflows across CRMs, ERPs, and APIs, (3) Conversational AI Chatbots and Voice Agents with sub-300ms latency and contextual human handoff, and (4) Fine-tuned proprietary models deployed on private cloud or on-premise infrastructure.' },
      { question: 'How do you ensure our proprietary corporate data is never leaked or used to train third-party AI models?', answer: 'Security and data sovereignty are paramount. We architect enterprise systems using zero-data-retention API agreements, dedicated private VPC endpoints, tenant-isolated vector databases, and client-owned cloud deployments. Your data is strictly quarantined, encrypted at rest and in transit, and never utilized for training public commercial LLMs.' },
      { question: 'How long does a custom AI development project typically take from conception to deployment?', answer: 'A production-ready MVP (such as an enterprise RAG knowledge engine or customer-facing AI agent) typically ships in 3 to 5 weeks. More complex multi-agent architectures featuring custom fine-tuning and bidirectional ERP/telephony integrations are delivered in 6 to 10 weeks with continuous staging validation.' },
      { question: 'What is the difference between an AI demo and a production-grade AI system?', answer: 'Demos typically rely on fragile single-prompt wrappers that hallucinate, break when edge cases arise, and lack security guardrails. Production-grade systems incorporate deterministic JSON schema enforcement, multi-step fallback logic, hallucination detection, rate limiting, token cost observability, comprehensive audit logging, and seamless human-in-the-loop escalation.' },
      { question: 'Can our custom AI software integrate with existing internal CRMs, databases, and WhatsApp?', answer: 'Yes. Our AI architectures are API-first and built with standard tool-calling protocols. We natively connect AI agents to custom CRMs, PostgreSQL, SAP, Salesforce, HubSpot, and official WhatsApp Business Cloud APIs to read live data and execute business actions autonomously.' },
      { question: 'Do you offer on-premise or sovereign private cloud deployment options?', answer: 'Yes. For government entities, financial institutions, and healthcare providers requiring on-premise hosting, we deploy quantized open-source models (such as Llama 3, Mistral, and DeepSeek) on dedicated GPU infrastructure behind your corporate firewall.' }
    ],
    faqs: [
      { q: 'What types of custom AI software does Gyan VaniAi develop?', a: 'We develop custom AI solutions across four core pillars: (1) Enterprise Retrieval-Augmented Generation (RAG) systems that search and synthesize company documentation with citation accuracy, (2) Autonomous AI Agents that execute multi-step business workflows across CRMs, ERPs, and APIs, (3) Conversational AI Chatbots and Voice Agents with sub-300ms latency and contextual human handoff, and (4) Fine-tuned proprietary models deployed on private cloud or on-premise infrastructure.' },
      { q: 'How do you ensure our proprietary corporate data is never leaked or used to train third-party AI models?', a: 'Security and data sovereignty are paramount. We architect enterprise systems using zero-data-retention API agreements, dedicated private VPC endpoints, tenant-isolated vector databases, and client-owned cloud deployments. Your data is strictly quarantined, encrypted at rest and in transit, and never utilized for training public commercial LLMs.' },
      { q: 'How long does a custom AI development project typically take from conception to deployment?', a: 'A production-ready MVP (such as an enterprise RAG knowledge engine or customer-facing AI agent) typically ships in 3 to 5 weeks. More complex multi-agent architectures featuring custom fine-tuning and bidirectional ERP/telephony integrations are delivered in 6 to 10 weeks with continuous staging validation.' },
      { q: 'What is the difference between an AI demo and a production-grade AI system?', a: 'Demos typically rely on fragile single-prompt wrappers that hallucinate, break when edge cases arise, and lack security guardrails. Production-grade systems incorporate deterministic JSON schema enforcement, multi-step fallback logic, hallucination detection, rate limiting, token cost observability, comprehensive audit logging, and seamless human-in-the-loop escalation.' },
      { q: 'Can our custom AI software integrate with existing internal CRMs, databases, and WhatsApp?', a: 'Yes. Our AI architectures are API-first and built with standard tool-calling protocols. We natively connect AI agents to custom CRMs, PostgreSQL, SAP, Salesforce, HubSpot, and official WhatsApp Business Cloud APIs to read live data and execute business actions autonomously.' },
      { q: 'Do you offer on-premise or sovereign private cloud deployment options?', a: 'Yes. For government entities, financial institutions, and healthcare providers requiring on-premise hosting, we deploy quantized open-source models (such as Llama 3, Mistral, and DeepSeek) on dedicated GPU infrastructure behind your corporate firewall.' }
    ],
    contactEyebrow: 'BUILD PRODUCTION AI',
    contactTitle: 'Ready to Architect Your Custom AI Solution?',
    contactSubtitle: 'Schedule a consultation with our AI software architects to evaluate technical feasibility, model selection, and integration timelines.',
    contactChecklist: [
      'Tenant-Isolated Enterprise RAG Architecture',
      'Autonomous Multi-Agent Workflow Orchestration',
      'Deterministic Guardrails & Output Validation',
      'Private Cloud & Zero-Data-Leakage Guarantee'
    ]
  },
  'ai-agent-development': {
    metaTitle: 'Custom AI Agent Development Company | Gyan VaniAi',
    metaDescription: 'Deploy autonomous AI agents for sales, support, and operations. Multi-agent systems with RAG, tool calling, and CRM integration by Gyan VaniAi.',
    h1: 'Custom AI Agent Development',
    subtitle: 'Deploy intelligent AI agents that handle sales, support, and operations autonomously, with human oversight when it matters.',
    overview: 'Gyan VaniAi architects and deploys custom autonomous AI agents designed to automate complex, multi-step business workflows across sales, customer support, and revenue operations. Our AI agents go beyond basic chatbots by using context-aware reasoning, tenant-isolated Retrieval-Augmented Generation (RAG), and secure API tool calling to query databases, update CRM records, and execute business actions independently while maintaining human-in-the-loop oversight.',
    whoFor: 'Operations leaders, engineering directors, and revenue teams needing AI that executes multi-step workflows across CRMs, messaging channels, and backend APIs.',
    deliverables: ['AI agent architecture', 'Workflow automation', 'Knowledge/RAG integration', 'API and tool integrations', 'Human handoff'],
    benefits: ['Multi-Agent Systems', 'Workflow Automation', 'Natural Language Processing', 'Custom Integrations'],
    image: '/ai-agent-hero.webp',
    imageAlt: 'Autonomous AI Agent Orchestration Platform by Gyan VaniAi',
    capabilitiesVisual: '/ai-agent-capabilities.webp',
    vsChatbotVisual: '/ai-agent-vs-chatbot.webp',
    workflowVisual: '/ai-agent-workflow.webp',
    ctaVisual: '/ai-agent-cta.webp',
    relatedLinks: [
      { url: '/services/ai-chatbots', text: 'AI Chatbot Development', icon: '/service-ai-chatbot.webp' },
      { url: '/services/voice-bot-assistant', text: 'Voice AI Assistants', icon: '/service-voice-ai.webp' },
      { url: '/services/sales-automation', text: 'Sales Automation', icon: '/service-sales-automation.webp' },
      { url: '/services/crm-development', text: 'CRM Development', icon: '/service-crm-development.webp' }
    ],
    capabilities: [
      { title: 'Autonomous Reasoning', desc: 'Agents can break down complex tasks into sequential steps and execute them dynamically.' },
      { title: 'Workflow Automation', desc: 'Trigger actions across your CRM, email, and messaging platforms without human input.' },
      { title: 'Natural Language Processing', desc: 'Understand intent, extract entities, and summarize unstructured data accurately.' },
      { title: 'Tool & API Integration', desc: 'Connect to external APIs, databases, and business tools to read/write real-time data.' },
      { title: 'Knowledge / RAG', desc: 'Retrieve accurate answers from your secure, tenant-isolated vector databases.' },
      { title: 'Human Handoff', desc: 'Detect frustration or complex requirements and escalate seamlessly to a live agent.' }
    ],
    workflowHeading: 'How AI Agents Power Your Workflows',
    workflowSubtitle: 'From context analysis to tool execution and verified outcomes in real time.',
    workflowFooter: {
      label: 'AI AGENT EXECUTION',
      title: 'AI Agent Execution Flow',
      desc: 'Understand the request, retrieve relevant context, reason over the available information, select the right tools, execute the action, and verify the result.',
      btnText: 'Explore AI Agent Architecture →',
      btnUrl: '#contact'
    },
    customFaqs: [
      { question: 'What is an AI agent?', answer: 'An AI agent is software that can understand context, plan multi-step workflows, call tools and APIs, update records, and complete business tasks autonomously within defined rules.' },
      { question: 'How is an AI agent different from a chatbot?', answer: 'Traditional chatbots mainly answer basic questions based on scripts. AI agents can analyze context, retrieve internal knowledge, select and execute tools, and complete multi-step business actions across systems.' },
      { question: 'Can AI agents integrate with our existing CRM?', answer: 'Yes. We connect AI agents to custom CRMs, WhatsApp Business API, and third-party systems via secure APIs and webhooks to synchronize lead data, conversation context, and customer records.' },
      { question: 'Can AI agents use our internal business knowledge?', answer: 'Yes. We use Retrieval-Augmented Generation (RAG) with tenant-isolated data pipelines to ensure the agent retrieves accurate answers from your approved documentation, product catalogs, and policies.' },
      { question: 'Can AI agents connect to external APIs and tools?', answer: 'Yes. We equip agents with function calling and tool integrations so they can query databases, schedule calendar events, trigger webhooks, and execute actions across your business software stack.' },
      { question: 'Can an AI agent hand conversations to a human?', answer: 'Yes. Our agents detect complex requirements, sentiment shifts, or policy escalations and smoothly transfer the conversation to human team members along with the complete interaction summary.' },
      { question: 'Can AI agents automate multi-step workflows?', answer: 'Yes. We design multi-agent architectures where specialized agents collaborate to handle intake, qualification, research, data entry, and follow-ups across complex business processes.' },
      { question: 'How do you monitor AI agent workflows?', answer: 'We implement detailed audit logging, step tracking, and observability tools so your team can monitor every decision, tool call, and execution step with full transparency.' },
      { question: 'How long does an AI agent project take?', answer: 'Initial MVP deployments typically ship in 3-5 weeks, while comprehensive multi-agent architectures with complex integrations take 6-10 weeks depending on workflow scope.' },
      { question: 'Can the solution be customized for our business?', answer: 'Every AI agent workflow is custom-architected around your specific business logic, role permissions, integrations, and operational requirements.' }
    ],
    customSteps: [
      { stepNum: '01', category: 'Intent', icon: '/agent-intent-detection.webp', title: 'Intent Detection', desc: "Understand the user's request, intent, and available business context." },
      { stepNum: '02', category: 'RAG', icon: '/agent-knowledge-retrieval.webp', title: 'Knowledge Retrieval', desc: 'Retrieve relevant information from approved business knowledge sources.' },
      { stepNum: '03', category: 'Logic', icon: '/agent-reasoning.webp', title: 'Agent Reasoning', desc: 'Determine the next step based on the available context and workflow rules.' },
      { stepNum: '04', category: 'Tools', icon: '/agent-tool-selection.webp', title: 'Tool Selection', desc: 'Choose the appropriate connected API, CRM action, or business tool.' },
      { stepNum: '05', category: 'Action', icon: '/agent-action-execution.webp', title: 'Action Execution', desc: 'Perform the required workflow action through connected systems.' },
      { stepNum: '06', category: 'Escalate', icon: '/agent-human-handoff.webp', title: 'Human Handoff', desc: 'Escalate to a human when the workflow requires review or intervention.' },
      { stepNum: '07', category: 'Audit', icon: '/agent-data-verification.webp', title: 'Data Verification', desc: 'Check the outcome before completing the workflow.' },
      { stepNum: '08', category: 'Done', icon: '/agent-workflow-completion.webp', title: 'Workflow Completion', desc: 'Record the result and move the process to its next state.' }
    ],
    contactTitle: 'Ready to Build Your AI Agent?',
    contactSubtitle: "Tell us about your workflows, systems, and automation goals. We'll help identify where AI agents can create the most practical impact."
  },
  'crm-development': {
    metaTitle: 'Custom CRM Software Development | AI CRM Company | Gyan VaniAi',
    metaDescription: 'Custom CRM development with AI, lead pipelines, and WhatsApp Coexistence. Build a CRM fitted to your sales process, not the other way around.',
    h1: 'Custom CRM Software Development',
    subtitle: 'A CRM shaped around your sales process, with WhatsApp Coexistence, Meta Tech Provider signup, and built-in automation.',
    overview: 'Gyan VaniAi builds custom CRM software for businesses that outgrew spreadsheets and generic SaaS. We deliver lead management, pipeline automation, shared team inboxes, analytics, and optional WhatsApp Business API / Coexistence so sales and support live in one system.',
    whoFor: 'SMEs and enterprises that need a CRM matching their exact stages, roles, and channels, especially teams selling and supporting customers on WhatsApp.',
    deliverables: ['Multi-tenant or single-tenant CRM', 'Lead scoring & drip campaigns', 'WhatsApp shared inbox', 'Role-based dashboards', 'ERP/payment integrations'],
    benefits: ['Meta Tech Provider Coexistence', '1-Click Embedded Signup', 'Custom Sales Workflows', 'Advanced Lead Analytics'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Custom AI CRM dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence Mode' },
      { url: '/services/ai-development', text: 'AI Software Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp CRM Automation' }
    ],
    faqs: [
      { q: 'Why build a custom CRM instead of off-the-shelf platforms?', a: 'A custom CRM fits your exact workflow, pricing model, and channels (like WhatsApp Coexistence) without forcing your team into rigid templates or unused modules.' },
      { q: 'Does your CRM support WhatsApp?', a: 'Yes. We offer official WhatsApp Business API integration with Coexistence so mobile app and CRM work on the same number.' }
    ]
  },
  'lead-management': {
    metaTitle: 'Lead Management Software | Capture & Convert | Gyan VaniAi',
    metaDescription: 'Lead management software to capture, qualify, assign, and track leads. Automate your pipeline and improve conversion rates with AI workflows.',
    h1: 'Lead Management Software',
    subtitle: 'Capture, qualify, assign, track, and convert leads from a single intelligent CRM workflow.',
    overview: 'Gyan VaniAi provides robust Lead Management Software designed to stop lead leakage. We consolidate leads from all channels (web, WhatsApp, social) into one unified pipeline, applying AI-assisted prioritization and automated assignment so your team can focus on closing deals.',
    whoFor: 'Sales teams and revenue operations leaders who need to track lead activity, automate routing, and gain full visibility into conversion metrics without wrestling with clunky spreadsheets.',
    deliverables: ['Lead capture & qualification', 'AI-assisted lead scoring', 'Automated lead routing & assignment', 'Pipeline management dashboards', 'WhatsApp & CRM workflow integration'],
    benefits: ['Automated Lead Routing', 'AI Lead Scoring', 'Pipeline Visibility', 'WhatsApp Integration'],
    image: '/lead-hero.webp',
    imageAlt: 'Lead pipeline management dashboard showing New, Contacted, Qualified, and Converted stages with lead scores and conversion analytics by Gyan VaniAi',
    capabilitiesTitle: 'Lead Management Capabilities',
    capabilitiesVisual: '/lead-capabilities.webp',
    capabilitiesVisualAlt: 'Lead Management System Capabilities and Ingestion Architecture',
    engineBanner: {
      tag: 'LEAD ORCHESTRATION ENGINE',
      title: 'Omnichannel Ingestion & Smart Routing Pipeline',
      desc: 'Capture leads across all channels, score with predictive AI, and distribute to the right rep in real time.'
    },
    integrations: [
      { label: 'Multi-Channel Webhooks & Form APIs', icon: <Inbox size={15} /> },
      { label: 'AI Behavioral Scoring Engine', icon: <Star size={15} /> },
      { label: 'Automated Round-Robin Routing', icon: <UserCheck size={15} /> },
      { label: 'Real-Time Pipeline Analytics Sync', icon: <Database size={15} /> }
    ],
    ctaVisual: '/lead-cta.webp',
    ctaVisualAlt: 'Lead Management CRM Dashboard and Growth Analytics',
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development', icon: '/service-crm-development.webp' },
      { url: '/services/sales-automation', text: 'Sales Automation', icon: '/service-sales-automation.webp' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence', icon: '/service-whatsapp-coexistence.webp' },
      { url: '/services/ai-agent-development', text: 'AI Agent Development', icon: '/service-ai-agent-development.webp' }
    ],
    capabilities: [
      { title: 'Lead Capture', desc: 'Consolidate leads from web forms, WhatsApp, social media, landing pages, and third-party APIs into one unified inbox automatically.' },
      { title: 'Lead Scoring', desc: 'Assign priority scores using behavioral signals and demographic attributes so your team focuses on the highest-intent prospects first.' },
      { title: 'Lead Enrichment', desc: 'Automatically enrich lead profiles with third-party data, validate contact information, and fill missing fields to improve data quality.' },
      { title: 'Lead Tracking', desc: 'Track every touchpoint across email, WhatsApp, calls, and website visits with a complete activity timeline for each lead.' },
      { title: 'Smart Assignment', desc: 'Route leads to the right sales rep using territory rules, skill-based matching, round-robin distribution, and SLA escalation policies.' },
      { title: 'Workflow Automation', desc: 'Trigger automated follow-ups, task creation, notifications, and stage transitions based on lead behavior and pipeline rules.' },
      { title: 'Analytics and Reports', desc: 'Monitor pipeline health, conversion rates, rep performance, and source attribution with real-time dashboards and scheduled reports.' },
      { title: 'Conversion Optimization', desc: 'Identify bottlenecks in your funnel, analyze stage drop-off rates, and run data-driven experiments to improve close rates.' }
    ],
    workflowHeading: 'How Lead Management Powers Your Pipeline',
    workflowSubtitle: 'From first touch to closed deal, every lead moves through a structured, trackable workflow.',
    workflowFooter: {
      label: 'PIPELINE ORCHESTRATION',
      title: 'Lead Pipeline Execution Flow',
      desc: 'Capture leads from all channels, validate and score them automatically, route to the right rep, nurture with automated sequences, and convert with full visibility.',
      btnText: 'See How It Works',
      btnUrl: '#contact'
    },
    customFaqs: [
      { question: 'Can this integrate with our existing lead sources?', answer: 'Yes. We provide APIs, webhooks, and direct integrations to capture leads automatically from your website, Facebook Lead Ads, Google Ads, landing page builders, and WhatsApp.' },
      { question: 'How does AI lead scoring work?', answer: 'Our system analyzes lead attributes (job title, company size, industry) and interaction history (email opens, page visits, form submissions) to assign a priority score, ensuring your sales reps focus on the highest-intent prospects first.' },
      { question: 'Can leads be assigned automatically?', answer: 'Yes. We support round-robin distribution, territory-based routing, skill-based matching, and weighted assignment rules. Leads can also be escalated automatically if response SLAs are not met.' },
      { question: 'What channels can capture leads?', answer: 'Website forms, WhatsApp Business API, Facebook Lead Ads, Google Ads, email campaigns, chatbots, landing pages, manual entry, CSV imports, and third-party webhook integrations.' },
      { question: 'Can I track lead activity across channels?', answer: 'Yes. Every interaction (email opens, WhatsApp messages, website visits, form submissions, calls) is logged in a unified activity timeline on the lead profile.' },
      { question: 'Does it support automated follow-ups?', answer: 'Yes. You can configure automated email sequences, WhatsApp message templates, task creation, and internal notifications triggered by lead behavior, stage changes, or time-based rules.' },
      { question: 'What reports and dashboards are available?', answer: 'Pipeline health, conversion funnel analysis, lead source attribution, rep performance scorecards, response time tracking, and scheduled email reports with custom filters.' },
      { question: 'How long does implementation take?', answer: 'Basic lead management setup ships in 2-3 weeks. Full implementations with custom scoring models, multi-channel integrations, and advanced workflow automation typically take 4-6 weeks.' },
      { question: 'Can the system prevent duplicate leads?', answer: 'Yes. We implement deduplication rules based on email, phone number, and configurable matching criteria to merge duplicate records and keep your pipeline clean.' },
      { question: 'Is it customizable for our sales process?', answer: 'Every pipeline stage, scoring model, assignment rule, and automation workflow is fully customizable to match your specific sales methodology and team structure.' }
    ],
    customSteps: [
      { stepNum: '01', category: 'Capture', icon: <Inbox size={20} />, title: 'Lead Capture', desc: 'Collect leads from web forms, WhatsApp, social ads, and third-party sources into one unified pipeline.' },
      { stepNum: '02', category: 'Qualify', icon: <Filter size={20} />, title: 'Lead Qualification', desc: 'Validate lead data, check for duplicates, and verify contact information automatically.' },
      { stepNum: '03', category: 'Score', icon: <Star size={20} />, title: 'Lead Scoring', desc: 'Assign priority scores based on demographics, behavior, and engagement signals.' },
      { stepNum: '04', category: 'Assign', icon: <UserCheck size={20} />, title: 'Lead Assignment', desc: 'Route qualified leads to the right sales rep using smart distribution rules.' },
      { stepNum: '05', category: 'Nurture', icon: <Mail size={20} />, title: 'Lead Nurturing', desc: 'Engage prospects with automated email sequences, WhatsApp follow-ups, and scheduled tasks.' },
      { stepNum: '06', category: 'Convert', icon: <Trophy size={20} />, title: 'Lead Conversion', desc: 'Move leads through your pipeline stages and track the complete journey to closed deal.' }
    ],
    faqs: [
      { q: 'Can this integrate with our existing lead sources?', a: 'Yes. We provide APIs, webhooks, and direct integrations to capture leads automatically from your website, Facebook Lead Ads, Google Ads, landing page builders, and WhatsApp.' },
      { q: 'How does AI lead scoring work?', a: 'Our system analyzes lead attributes (job title, company size, industry) and interaction history (email opens, page visits, form submissions) to assign a priority score, ensuring your sales reps focus on the highest-intent prospects first.' },
      { q: 'Can leads be assigned automatically?', a: 'Yes. We support round-robin distribution, territory-based routing, skill-based matching, and weighted assignment rules. Leads can also be escalated automatically if response SLAs are not met.' },
      { q: 'What channels can capture leads?', a: 'Website forms, WhatsApp Business API, Facebook Lead Ads, Google Ads, email campaigns, chatbots, landing pages, manual entry, CSV imports, and third-party webhook integrations.' },
      { q: 'Can I track lead activity across channels?', a: 'Yes. Every interaction (email opens, WhatsApp messages, website visits, form submissions, calls) is logged in a unified activity timeline on the lead profile.' },
      { q: 'Does it support automated follow-ups?', a: 'Yes. You can configure automated email sequences, WhatsApp message templates, task creation, and internal notifications triggered by lead behavior, stage changes, or time-based rules.' },
      { q: 'What reports and dashboards are available?', a: 'Pipeline health, conversion funnel analysis, lead source attribution, rep performance scorecards, response time tracking, and scheduled email reports with custom filters.' },
      { q: 'How long does implementation take?', a: 'Basic lead management setup ships in 2-3 weeks. Full implementations with custom scoring models, multi-channel integrations, and advanced workflow automation typically take 4-6 weeks.' },
      { q: 'Can the system prevent duplicate leads?', a: 'Yes. We implement deduplication rules based on email, phone number, and configurable matching criteria to merge duplicate records and keep your pipeline clean.' },
      { q: 'Is it customizable for our sales process?', a: 'Every pipeline stage, scoring model, assignment rule, and automation workflow is fully customizable to match your specific sales methodology and team structure.' }
    ],
    contactTitle: 'Ready to Transform Your Lead Pipeline?',
    contactSubtitle: "Tell us about your lead volume, sales process, and conversion goals. We will design a pipeline that captures every opportunity."
  },
  'sales-automation': {
    metaTitle: 'Sales Automation Software | Workflow & Pipeline | Gyan VaniAi',
    metaDescription: 'Automate repetitive sales workflows, prioritize opportunities, and close deals faster with AI-driven sales automation software.',
    h1: 'Sales Automation Software',
    subtitle: 'Automate repetitive sales workflows, prioritize opportunities, and help your team move leads through the pipeline faster.',
    overview: 'Gyan VaniAi builds Sales Automation Software that eliminates manual data entry and repetitive follow-ups. By automating lead assignments, task creation, and outreach notifications, we empower your sales team to focus on high-value conversations that drive revenue.',
    whoFor: 'High-velocity sales teams that want to scale their outreach and pipeline management without adding administrative overhead.',
    deliverables: ['Automated lead follow-ups', 'Sales pipeline automation', 'Opportunity tracking', 'Task & workflow automation', 'Conversion & activity reporting'],
    benefits: ['Automated Follow-ups', 'Pipeline Automation', 'AI Qualification', 'Real-time Notifications'],
    image: '/service-sales-automation.webp',
    imageAlt: 'Sales automation workflow by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/lead-management', text: 'Lead Management' },
      { url: '/services/crm-development', text: 'Custom CRM Software Development' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence' },
      { url: '/services/ai-agent-development', text: 'AI Agent Development' }
    ],
    faqs: [
      { q: 'What kind of sales tasks can be automated?', a: 'We automate lead assignment, email/WhatsApp follow-ups, meeting reminders, task generation upon stage changes, and data entry updates.' },
      { q: 'Will automation make our outreach feel robotic?', a: 'No. Our systems support highly personalized templates and AI-assisted drafting, ensuring your outreach remains relevant and human.' }
    ]
  },
    'whatsapp-automation': {
    metaTitle: 'WhatsApp Automation & CRM | Meta Business API | Gyan VaniAi',
    metaDescription: 'WhatsApp automation with official Meta Cloud API, Coexistence, broadcasts, AI replies, and shared inbox. Connect your number in minutes with Gyan VaniAi.',
    heroEyebrow: 'META TECH PROVIDER PLATFORM',
    h1: 'WhatsApp CRM & Automation',
    subtitle: 'Official Meta WhatsApp Business Cloud API automation with Coexistence, 1-click Embedded Signup, broadcasts, and conversational AI replies without losing your mobile phone app.',
    overviewTitle: 'Official WhatsApp Business Cloud API & Coexistence Automation',
    overview: 'Gyan VaniAi is a Meta Tech Provider certified partner delivering enterprise WhatsApp Business API automation for fast-growing businesses. Unlike unofficial scrapers or risky third-party wrappers that result in permanent phone number bans, we integrate the official Meta WhatsApp Business Cloud API. Our platform features exclusive WhatsApp Coexistence mode—allowing your sales and support teams to keep using the standard WhatsApp mobile application on your existing phone number while our CRM runs automated broadcasts, multi-agent shared inboxes, and conversational AI replies simultaneously.',
    whoForTitle: 'Engineered for High-Conversion Commercial Teams',
    whoFor: 'Retail brands, real estate brokers, healthcare clinics, educational institutions, and high-velocity B2B sales teams who close deals, capture leads, and support customers primarily on WhatsApp.',
    deliverablesTitle: 'WhatsApp Automation Deliverables',
    deliverables: [
      'Official Meta Cloud API Setup with 1-Click Embedded Signup',
      'Patented WhatsApp Coexistence Mode (Keep phone app + CRM running on one number)',
      'Multi-Agent Shared Team Inbox with Role-Based Routing & Internal Notes',
      'Bulk Broadcast & Segmented Campaign Engine with Zero Markup on Meta Fees',
      'Conversational AI FAQ Auto-Replies & Contextual Handoff to Live Agents',
      'Interactive WhatsApp Product Catalogs with In-Chat Checkout & UPI Links',
      'Bidirectional CRM Synchronization & Webhook Data Ingestion'
    ],
    benefits: [
      'Official Meta Tech Provider API',
      'WhatsApp Coexistence Mode',
      'Multi-Agent Shared Inbox',
      'Interactive Catalogs & Payments'
    ],
    image: '/service-whatsapp-coexistence.webp',
    imageAlt: 'WhatsApp automation CRM dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core WhatsApp Business Platform Capabilities',
    capabilities: [
      { title: 'Official Meta Cloud API Infrastructure', desc: '100% compliant, ban-free WhatsApp Business messaging built directly on Meta\'s enterprise cloud infrastructure with tier-4 throughput.' },
      { title: 'WhatsApp Coexistence Mode', desc: 'Run your personal or business mobile phone app on your existing number while simultaneously connecting the number to our web CRM shared inbox.' },
      { title: 'Multi-Agent Shared Team Inbox', desc: 'Multiple sales and support team members can answer chats from the same official WhatsApp number with agent assignment and collision detection.' },
      { title: 'Interactive Message Formats', desc: 'Deploy quick-reply buttons, call-to-action link buttons, list pickers, and interactive product catalogs that drive 3x higher response rates than plain text.' },
      { title: 'Automated Broadcast Campaigns', desc: 'Schedule personalized marketing broadcasts to opted-in customer lists with dynamic custom variables and real-time read/click tracking.' },
      { title: 'Native UPI & Payment Gateways', desc: 'Enable customers to browse products, select services, and complete payments via UPI and credit cards without ever leaving the WhatsApp chat.' }
    ],
    workflowHeading: 'The WhatsApp Business Automation Lifecycle',
    workflowSubtitle: 'From inbound customer message and conversational AI qualification to agent handoff and CRM closure.',
    engineBanner: {
      tag: 'WHATSAPP ORCHESTRATION ENGINE',
      title: 'Official Meta Cloud API Automation Pipeline',
      desc: 'Scale high-converting sales conversations and 24/7 customer support over WhatsApp with official Meta technology.'
    },
    customSteps: [
      { stepNum: '01', category: 'Inbound', icon: <MessageSquare size={20} />, title: 'Inbound Chat Initiation', desc: 'Customer initiates conversation via website click-to-chat button, social media ad, QR code, or direct message.' },
      { stepNum: '02', category: 'AI Reply', icon: <Bot size={20} />, title: 'Autonomous AI First Response', desc: 'Conversational AI greets the customer instantly, answers common questions, and qualifies buyer intent.' },
      { stepNum: '03', category: 'Catalog', icon: <Boxes size={20} />, title: 'Interactive Catalog & Options', desc: 'AI presents interactive product collections, pricing cards, or appointment availability directly inside the chat.' },
      { stepNum: '04', category: 'Routing', icon: <Users size={20} />, title: 'Smart Team Inbox Assignment', desc: 'High-intent inquiries or complex requests route to the appropriate live sales representative with desktop alerts.' },
      { stepNum: '05', category: 'Coexistence', icon: <Smartphone size={20} />, title: 'Coexistence Mobile & Web Sync', desc: 'Reps can respond from the office web CRM or directly on the road from their mobile WhatsApp application with real-time sync.' },
      { stepNum: '06', category: 'Payment', icon: <CheckCircle2 size={20} />, title: 'In-Chat Payment Settlement', desc: 'Customer completes secure payment via integrated UPI or payment links, receiving instant digital invoices on WhatsApp.' },
      { stepNum: '07', category: 'CRM Sync', icon: <Database size={20} />, title: 'Automated CRM Record Update', desc: 'Lead status, conversation history, and payment details are automatically logged into your central CRM database.' }
    ],
    outcomesTitle: 'Quantifiable WhatsApp Sales & Support Performance',
    outcomesSubtitle: 'Designed to accelerate sales velocity, lower cost per lead, and deliver instant customer satisfaction on their favorite messaging app.',
    outcomes: [
      { title: '98% Message Open Rate', desc: 'Cut through crowded email inboxes with WhatsApp messages that are read within 3 minutes of delivery.' },
      { title: '3x Higher Lead Conversion', desc: 'Interactive buttons, instant AI responses, and frictionless chat checkout drive dramatic conversion improvements.' },
      { title: 'Zero Risk of Number Banning', desc: 'Official Meta Tech Provider certification guarantees strict compliance with WhatsApp Business policies.' },
      { title: '80% Lower First Response Time', desc: 'Instant AI auto-replies ensure prospective buyers never wait for information during peak sales hours.' }
    ],
    relatedLinks: [
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence Mode' },
      { url: '/services/whatsapp-calling-agent', text: 'WhatsApp Calling Agent Bots' },
      { url: '/pricing', text: 'WhatsApp CRM Pricing' },
      { url: '/blog/whatsapp-business-api-automation', text: 'Meta WhatsApp Cloud API Guide' },
      { url: '/services/lead-management', text: 'Lead Management & Pipelines' },
      { url: '/services/crm-development', text: 'Custom CRM Development' }
    ],
    customFaqs: [
      { question: 'What is WhatsApp Coexistence mode and why is it unique to Gyan VaniAi?', answer: 'Standard WhatsApp Business API platforms require you to delete or abandon your WhatsApp mobile app, forcing you to use only their desktop software. With Gyan VaniAi\'s Meta Tech Provider certified Coexistence mode, you keep your existing phone number active on your physical WhatsApp mobile app while simultaneously connecting the number to our multi-agent CRM inbox. Both systems synchronize messages in real time with zero conflict.' },
      { question: 'Is this an official Meta WhatsApp solution or an unofficial scraper?', answer: 'This is 100% official Meta WhatsApp Business Cloud API technology. We use official Meta Embedded Signup and comply with all Meta developer policies. Your business number will never be banned for using unauthorized automation or scraping tools.' },
      { question: 'How does WhatsApp conversation pricing work for Indian and international businesses?', answer: 'Meta charges businesses based on 24-hour conversation categories (Utility, Authentication, Marketing, and Service). With Gyan VaniAi, our platform subscription plans start at ₹1,999/month for Indian businesses ($49/month international), and all Meta conversation fees are billed directly at official Meta pass-through rates with zero markup.' },
      { question: 'How many team members can use the WhatsApp shared team inbox at the same time?', answer: 'Our Starter plan includes 3 team members, Growth includes 10, Scale includes 25, and Enterprise plans support unlimited team agents with granular role permissions, department routing, and collision detection to prevent two agents from answering the same message.' },
      { question: 'Can we send bulk broadcast messages to our customers on WhatsApp?', answer: 'Yes. You can send personalized broadcast campaigns to opted-in customer contact lists using pre-approved Meta message templates, complete with image headers, quick-reply buttons, and dynamic variables (such as customer name and order number).' },
      { question: 'Can customers buy products and pay directly inside WhatsApp?', answer: 'Yes. We support official Meta WhatsApp product catalogs, single/multi-product messages, and integrated payment gateway links (UPI, Razorpay, Stripe) allowing customers to browse, select items, and complete checkout within the WhatsApp interface.' }
    ],
    faqs: [
      { q: 'Is this official WhatsApp Business API?', a: 'Yes. Gyan VaniAi integrates the official Meta WhatsApp Business Cloud API with Coexistence and Embedded Signup, not unofficial or banned scrapers.' },
      { q: 'Can I keep using WhatsApp on my phone?', a: 'Yes, with Coexistence mode. Your WhatsApp Business mobile app and our CRM run on the same number with real-time sync.' },
      { q: 'Can we send WhatsApp product catalogs and interactive button messages?', a: 'Yes. We support official Meta WhatsApp Catalogs, single-product and multi-product messages, quick-reply buttons, and call-to-action link buttons directly in automated customer flows.' },
      { q: 'How does WhatsApp message pricing work for Indian businesses?', a: 'Meta bills conversations by category (Utility, Authentication, Marketing, Service). With Gyan VaniAi, platform subscription plans start at ₹1,999/month, and Meta messaging fees are billed directly at official Meta pass-through rates in INR with zero markup.' },
      { q: 'How many agents can use the WhatsApp shared team inbox?', a: 'Starter plans include 3 team members, Growth includes 10, Scale includes 25, and Enterprise plans support unlimited agents with role-based permissions and team routing.' }
    ],
    contactEyebrow: 'SCALE ON WHATSAPP',
    contactTitle: 'Ready to Automate Your WhatsApp Business Sales?',
    contactSubtitle: 'Schedule a consultation with our WhatsApp API specialists to connect your number with Coexistence mode and launch your shared inbox.',
    contactChecklist: [
      'Official Meta Cloud API & Coexistence Mode',
      'Multi-Agent Shared Team Inbox with Collision Detection',
      'Conversational AI Auto-Replies & Product Catalogs',
      'Direct Pass-Through Meta Messaging Rates with Zero Markup'
    ]
  },
  'hrms-development': {
    metaTitle: 'HRMS Software Development | Custom HR Systems | Gyan VaniAi',
    metaDescription: 'Custom HRMS software for payroll, attendance, leave, and recruitment. Automate HR operations with a system built for your workforce policies.',
    h1: 'HRMS Software Development',
    subtitle: 'Streamline payroll, attendance, leave, and recruitment with HR software built around your policies, not generic templates.',
    overview: 'Gyan VaniAi develops custom Human Resource Management Systems (HRMS) that centralize employee data, attendance, leave, payroll workflows, and performance tracking. Systems are tailored to local compliance needs and integrate with existing ERP or finance tools.',
    whoFor: 'Growing companies and enterprises that need HR automation beyond spreadsheets or rigid off-the-shelf HR suites.',
    deliverables: ['Employee self-service portals', 'Attendance & leave modules', 'Payroll workflows', 'Recruitment pipelines', 'Role-based HR analytics'],
    benefits: ['Payroll Automation', 'Leave Management', 'Employee Self-Service', 'Performance Tracking'],
    image: '/portfolio_stock.webp',
    imageAlt: 'HRMS employee management software by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/erp-development', text: 'Custom ERP Software' },
      { url: '/services/web-development', text: 'Web Application Development' }
    ],
    faqs: [
      { q: 'Can HRMS integrate with our ERP?', a: 'Yes. We commonly connect HRMS modules to finance, ERP, and biometric attendance systems via secure APIs.' }
    ]
  },
    'erp-development': {
    metaTitle: 'Custom ERP Software Development | Scalable Enterprise Operations | Gyan VaniAi',
    metaDescription: 'Custom ERP development to unify inventory, finance, procurement, and operations in one scalable system built for your processes. Zero recurring per-user fees.',
    heroEyebrow: 'ENTERPRISE RESOURCE PLANNING',
    h1: 'Custom ERP Software Development',
    subtitle: 'Architecting custom, modular ERP platforms that unify inventory, procurement, multi-warehouse operations, and finance without the bloat or recurring per-seat fees of legacy systems.',
    overviewTitle: 'Modular, Scalable Enterprise ERP Built for Your Exact Processes',
    overview: 'Gyan VaniAi engineers tailor-made Enterprise Resource Planning (ERP) software designed for mid-market businesses, wholesale distributors, and multi-location enterprises. While off-the-shelf software like SAP or NetSuite enforces rigid, pre-packaged workflows and exorbitant per-seat recurring subscriptions, our custom ERP platforms are architected around your unique business rules. We unite multi-branch inventory tracking, purchase order approval hierarchies, general ledger accounting, accounts payable/receivable, and supply chain logistics into a single, high-performance web dashboard.',
    whoForTitle: 'Built for Expanding Mid-Market Enterprises',
    whoFor: 'Wholesale distributors, multi-warehouse supply chain operators, engineering procurement companies, and high-growth commercial enterprises that have outgrown accounting tools like QuickBooks or Tally and need end-to-end operational visibility.',
    deliverablesTitle: 'Custom ERP Solution Architecture',
    deliverables: [
      'Multi-Warehouse Inventory & Barcode Tracking System (WMS)',
      'Purchase Requisition & Multi-Tier Vendor Management Workflow',
      'General Ledger, Multi-Currency Invoicing & Tax Compliance Engine',
      'Inter-Branch Stock Transfer & Dynamic Reorder Level Telemetry',
      'Real-Time Operational Telemetry, Gross Margin & Cash Flow Dashboards',
      'Open REST/GraphQL API Connectivity with Existing CRMs & Logistics Providers',
      'Granular Role-Based Access Governance (RBAC) & Verifiable Audit Trails'
    ],
    benefits: [
      'Zero Per-User Licensing Fees',
      '100% Custom Business Logic',
      'Real-Time Multi-Branch Sync',
      'Enterprise Data Ownership'
    ],
    image: '/erp_development_hero.jpg',
    imageAlt: 'Custom Enterprise Resource Planning ERP Dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core Custom ERP Capabilities',
    capabilities: [
      { title: 'Modular Microservices Architecture', desc: 'Deploy precisely what your operations require: Inventory, Procurement, Finance, Asset Management, or Sales, without unnecessary legacy overhead.' },
      { title: 'Multi-Location Inventory Control', desc: 'Real-time visibility into stock levels, reserved units, transit quantities, and automated safety-stock reorder thresholds across all branches.' },
      { title: 'Hierarchical Procurement Approvals', desc: 'Purchase orders route automatically through customized multi-tier approval chains based on department budgets, spend amounts, and role hierarchies.' },
      { title: 'Automated 3-Way Invoicing Match', desc: 'Systematically cross-checks vendor invoices against purchase orders and warehouse Goods Receipt Notes (GRN) to prevent overbilling.' },
      { title: 'End-to-End Audit & Governance', desc: 'Every ledger adjustment, inventory transfer, and price override is cryptographically logged with timestamps and user identities for complete auditability.' },
      { title: 'Full Data Ownership & Cloud Freedom', desc: 'Own your complete intellectual property, source code, and relational databases hosted on your choice of AWS, Azure, Google Cloud, or on-premise servers.' }
    ],
    workflowHeading: 'The End-to-End Enterprise ERP Operational Flow',
    workflowSubtitle: 'From initial purchase requisition to inventory fulfillment, accounts settlement, and executive financial reporting.',
    engineBanner: {
      tag: 'ENTERPRISE RESOURCE PLANNING',
      title: 'Connected Multi-Branch Operational Engine',
      desc: 'Eliminate departmental silos and synchronize procurement, inventory, warehouse dispatch, and general ledger in real time.'
    },
    customSteps: [
      { stepNum: '01', category: 'Requisition', icon: <FileText size={20} />, title: 'Purchase Requisition & Budget Check', desc: 'Department managers submit digital purchase requisitions with automated verification against departmental budgets.' },
      { stepNum: '02', category: 'Approval', icon: <UserCheck size={20} />, title: 'Multi-Tier Hierarchical Approval', desc: 'Requisitions over designated monetary thresholds route through designated executive approval levels with mobile push alerts.' },
      { stepNum: '03', category: 'PO Dispatch', icon: <Send size={20} />, title: 'Purchase Order Dispatch', desc: 'Approved requisitions convert automatically to vendor POs with contract price lock-ins dispatched via email and EDI.' },
      { stepNum: '04', category: 'Receiving', icon: <Boxes size={20} />, title: 'Goods Receipt & QC Verification', desc: 'Warehouse dock staff scan barcoded shipments, verify quantities against PO, and log quality control inspection reports.' },
      { stepNum: '05', category: 'Allocation', icon: <Database size={20} />, title: 'Inventory Allocation & Reorder Sync', desc: 'Stock is instantly credited to warehouse bins, updating branch availability and triggering inter-branch transfer orders if needed.' },
      { stepNum: '06', category: 'Accounts', icon: <ShieldCheck size={20} />, title: '3-Way Match & Accounts Payable', desc: 'Automated reconciliation of PO, GRN, and vendor invoice schedules payment releases according to negotiated credit terms.' },
      { stepNum: '07', category: 'Reporting', icon: <BarChart3 size={20} />, title: 'General Ledger & Executive Telemetry', desc: 'Real-time financial posting to balance sheets, P&L statements, tax filings, and executive gross margin dashboards.' }
    ],
    outcomesTitle: 'Quantifiable Enterprise ROI & Operational Efficiency',
    outcomesSubtitle: 'Designed to streamline complex operations, eliminate duplicate manual data entry, and reduce annual software licensing expenditure.',
    outcomes: [
      { title: '45% Faster Month-End Financial Closing', desc: 'Automate journal reconciliations, depreciation, and inter-company ledger balances for rapid financial reporting.' },
      { title: '99.4% Multi-Warehouse Inventory Precision', desc: 'Eliminate stock discrepancies and unauthorized shrinkage using barcoded goods receipt and automated dispatch manifests.' },
      { title: '30% Reduction in Procurement Turnaround', desc: 'Digital requisition workflows and automated vendor PO generation remove administrative friction from purchasing.' },
      { title: 'Zero Recurring Per-Seat Software Fees', desc: 'Eliminate recurring monthly per-user licensing fees charged by traditional ERP vendors like SAP or NetSuite.' }
    ],
    relatedLinks: [
      { url: '/services/hrms-development', text: 'HRMS Software Development' },
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/industries/manufacturing', text: 'Manufacturing ERP Solutions' },
      { url: '/industries/logistics', text: 'Logistics & Tracking Systems' }
    ],
    customFaqs: [
      { question: 'How is a custom ERP solution better than off-the-shelf software like SAP, NetSuite, or Odoo?', answer: 'Packaged ERP platforms force your company into rigid, generalized processes, take 12-18 months of expensive consultant hours to customize, and charge punitive per-user monthly subscription fees that escalate as you grow. A custom ERP from Gyan VaniAi is built directly around your operational workflow, gives you 100% source code ownership, and supports unlimited users on your own cloud with zero recurring license tax.' },
      { question: 'Can our custom ERP integrate with our existing accounting software like Tally or QuickBooks?', answer: 'Yes. We build bidirectional API connectors and automated sync services for legacy accounting software like Tally Prime, QuickBooks, and Zoho Books, allowing your finance team to continue their familiar accounting workflows while your operations team scales on the ERP.' },
      { question: 'Does the ERP system support barcode and QR code scanning for warehouse staff?', answer: 'Yes. The warehouse and inventory module is mobile-responsive and supports Bluetooth handheld barcode scanners and mobile phone camera scanning for receiving goods, put-away, picking, cycle counts, and dispatch verification.' },
      { question: 'How long does it take to develop and deploy a custom enterprise ERP system?', answer: 'Most core custom ERP MVP implementations (Inventory, Procurement, and Invoicing) are designed and launched within 8 to 12 weeks. Additional specialized modules (Asset tracking, advanced manufacturing BOM, multi-currency accounting) are delivered in staged phases without disrupting ongoing business.' },
      { question: 'How does the ERP handle multi-company, multi-currency, and multi-branch operations?', answer: 'The system is engineered with native multi-entity data architecture. You can manage multiple corporate subsidiaries, independent warehouses, and retail branches with consolidated or segregated financial reporting and real-time inter-branch stock transfers.' },
      { question: 'Who owns the intellectual property and source code of the custom ERP?', answer: 'You do. Upon project completion, full intellectual property rights, database schemas, and source code repositories are completely transferred to your organization with zero proprietary vendor lock-in.' }
    ],
    faqs: [
      { q: 'Do you replace SAP/Oracle or extend them?', a: 'Both. We build greenfield ERPs for mid-market teams and integrate or extend existing enterprise systems where a full replacement is unnecessary.' },
      { q: 'Can our custom ERP integrate with existing accounting software like Tally or QuickBooks?', a: 'Yes. We build bidirectional API connectors and automated sync services for Tally Prime, QuickBooks, and Zoho Books.' },
      { q: 'Who owns the intellectual property and source code of the custom ERP?', a: 'You do. Full source code, database schemas, and intellectual property are 100% transferred to your organization.' }
    ],
    contactEyebrow: 'BUILD YOUR CUSTOM ERP',
    contactTitle: 'Ready to Unify Your Business Operations?',
    contactSubtitle: 'Schedule an architectural consultation to scope your custom ERP requirements, warehouse modules, and data migration plan.',
    contactChecklist: [
      '100% Source Code & IP Ownership',
      'Custom Multi-Warehouse & WMS Architecture',
      'Automated 3-Way Invoicing & Accounting',
      'Zero Recurring Per-User Licensing Fees'
    ]
  },
    'web-development': {
    metaTitle: 'Custom Web Application Development | Enterprise SaaS Portals | Gyan VaniAi',
    metaDescription: 'Enterprise web application development: fast, SEO-ready business portals, dashboards, and SaaS frontends with secure API architecture and sub-second loading.',
    heroEyebrow: 'FULL-STACK WEB ENGINEERING',
    h1: 'Custom Web Application Development',
    subtitle: 'High-performance web apps, multi-tenant SaaS dashboards, and enterprise portals engineered for sub-second speeds, top search visibility, and maximum user conversion.',
    overviewTitle: 'High-Performance Web Applications Built for Scalability and Conversion',
    overview: 'Gyan VaniAi engineers bespoke, production-ready web applications, enterprise client portals, and modern SaaS frontends engineered with modern React, Next.js, and Vite architectures. We don\'t build generic WordPress or template sites. We engineer high-velocity, scalable digital web platforms focused on sub-second load times, perfect 100/100 Core Web Vitals, semantic search engine optimization (SEO), Answer Engine Optimization (AEO) for AI search discoverability, and rock-solid backend API integrations.',
    whoForTitle: 'Engineered for Digital Founders and Enterprise Brands',
    whoFor: 'SaaS founders launching modern software platforms, enterprise organizations modernizing legacy client portals, and commercial enterprises seeking high-converting, accessible digital web products that rank at the top of search and convert visitors into qualified buyers.',
    deliverablesTitle: 'Web Engineering Deliverables',
    deliverables: [
      'Responsive Modern React & Next.js Web Applications',
      'Multi-Tenant SaaS Dashboards & Role-Based Client Portals',
      'Perfect Core Web Vitals Optimization (Sub-Second First Contentful Paint)',
      'Semantic SEO & Structured Schema Architecture (JSON-LD, OpenGraph)',
      'High-Throughput Backend REST & GraphQL API Microservices',
      'Interactive Data Visualizations & High-Performance UI Components',
      'Comprehensive Security Hardening (SOC2 readiness, CSP headers, OWASP)'
    ],
    benefits: [
      'Sub-Second Page Load Speeds',
      '100/100 Core Web Vitals',
      'Semantic SEO & AEO Architecture',
      'Scalable React & API Stack'
    ],
    image: '/web_development_hero.jpg',
    imageAlt: 'Custom business web application and dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core Web Engineering Capabilities',
    capabilities: [
      { title: 'Modern React Component Architecture', desc: 'Modular, maintainable, and type-safe frontends utilizing modern React hooks, state management, and reusable UI design systems.' },
      { title: 'Edge Caching & Performance Optimization', desc: 'Asset optimization, code splitting, image preloading, and edge CDN distribution delivering lightning-fast global load times.' },
      { title: 'Semantic SEO & AI Discovery Architecture', desc: 'Structured data schemas (JSON-LD), semantic HTML hierarchies, and server-side pre-rendering engineered for Google and AI search engines.' },
      { title: 'Role-Based Client Portals & Dashboards', desc: 'Secure customer self-service portals with multi-tenant workspaces, granular access permissions, and interactive data visualization.' },
      { title: 'API-First Backend Connectivity', desc: 'Seamless bidirectional integration with payment gateways (Stripe, Razorpay), custom CRMs, third-party webhooks, and headless CMS platforms.' },
      { title: 'Enterprise Security & Compliance', desc: 'Strict Content Security Policy (CSP), cross-site scripting (XSS) defense, CSRF mitigation, and GDPR/DPDP Act compliance standards.' }
    ],
    workflowHeading: 'The Web Application Engineering Lifecycle',
    workflowSubtitle: 'From Figma design systems and component engineering to edge optimization and global deployment.',
    engineBanner: {
      tag: 'WEB DEVELOPMENT ENGINE',
      title: 'High-Performance Web Architecture Pipeline',
      desc: 'Ship secure, lightning-fast digital web platforms engineered for search prominence and conversion.'
    },
    customSteps: [
      { stepNum: '01', category: 'Architecture', icon: <Laptop size={20} />, title: 'UX Wireframing & Design Systems', desc: 'Develop atomic Figma component systems, accessible user journeys, and responsive mobile-first layouts.' },
      { stepNum: '02', category: 'Frontend', icon: <Cpu size={20} />, title: 'Modern React Frontend Development', desc: 'Build responsive, accessible interfaces with client-side state hydration, code splitting, and fluid micro-interactions.' },
      { stepNum: '03', category: 'APIs', icon: <Server size={20} />, title: 'Backend API & Microservices Integration', desc: 'Connect frontends to secure, high-concurrency RESTful APIs, GraphQL resolvers, and webhook ingestion services.' },
      { stepNum: '04', category: 'SEO & AEO', icon: <Globe size={20} />, title: 'Structured Data & Search Optimization', desc: 'Implement schema markup, dynamic meta tags, canonical link architecture, and Core Web Vitals performance tuning.' },
      { stepNum: '05', category: 'Security', icon: <ShieldCheck size={20} />, title: 'Security Audit & Compliance Testing', desc: 'Execute OWASP vulnerability assessments, CSP header hardening, and cross-browser accessibility validations.' },
      { stepNum: '06', category: 'Optimization', icon: <Zap size={20} />, title: 'Global Edge CDN Deployment', desc: 'Deploy assets to global edge networks with automated Brotli compression, caching headers, and DNS optimization.' },
      { stepNum: '07', category: 'Analytics', icon: <BarChart3 size={20} />, title: 'Analytics & Conversion Telemetry', desc: 'Integrate event tracking, privacy-compliant user analytics, conversion funnels, and real-time performance monitoring.' }
    ],
    outcomesTitle: 'Measurable Business & Search Performance',
    outcomesSubtitle: 'Designed to maximize organic search visibility, eliminate bounce rates, and turn web visitors into revenue.',
    outcomes: [
      { title: '<1s Global First Contentful Paint', desc: 'Exceptional loading speeds that keep visitors engaged and reduce mobile bounce rates.' },
      { title: '95+ Lighthouse Performance Score', desc: 'Top-tier Core Web Vitals metrics that boost organic search rankings across Google and AI search engines.' },
      { title: '40% Higher Lead Conversion Rate', desc: 'Intuitive user flows, clear calls-to-action, and frictionless form completion maximize conversions.' },
      { title: 'Zero Legacy CMS Vulnerabilities', desc: 'Modern decoupled architectures eliminate WordPress plugin hacks, database exploits, and sluggish maintenance drag.' }
    ],
    relatedLinks: [
      { url: '/services/mobile-app-development', text: 'Mobile App Development' },
      { url: '/services/ai-development', text: 'AI Software Development' },
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/lead-management', text: 'Lead Management & Pipelines' }
    ],
    customFaqs: [
      { question: 'Why choose custom React web development over WordPress or website builders like Webflow?', answer: 'Template builders like WordPress and Webflow are bloated with third-party plugins that degrade page load speeds, create severe security vulnerabilities, and enforce rigid technical limitations. Custom React applications provide sub-second load times, bespoke business logic, seamless backend API integrations, enterprise-grade security, and 100% intellectual property ownership with zero recurring platform fees.' },
      { question: 'How do you guarantee that our web application ranks well on Google and AI search engines?', answer: 'We build websites with an SEO/AEO-first foundation: server-side pre-rendering (SSG/SSR) for instant crawler indexing, semantic HTML hierarchies, comprehensive JSON-LD structured schema markup (Organization, Service, FAQ, WebPage), perfect Core Web Vitals performance, and direct Answer Engine Optimization (AEO) to ensure your brand is cited by Gemini, ChatGPT, and Perplexity.' },
      { question: 'Can our custom web portal integrate with our internal CRM, ERP, and payment gateways?', answer: 'Yes. We build robust REST and GraphQL API connectors to integrate your web portal with any internal software, including custom CRMs, SAP, Salesforce, Stripe, Razorpay, WhatsApp Business API, and automated email services with real-time webhooks.' },
      { question: 'What security standards do your web applications follow?', answer: 'We adhere to OWASP Top 10 security guidelines, enforce strict Content Security Policies (CSP), implement HTTPS/HSTS encryption, protect against SQL injection and Cross-Site Scripting (XSS), and design architectures ready for SOC2 and GDPR compliance.' },
      { question: 'Do you provide post-launch maintenance, updates, and hosting management?', answer: 'Yes. We offer continuous DevOps and maintenance agreements covering automated security patches, cloud hosting management (AWS, Vercel, Cloudflare), uptime monitoring, database backups, and feature enhancements.' },
      { question: 'What is the typical timeline for developing a custom enterprise web application?', answer: 'A custom corporate website or digital product landing architecture typically ships in 3 to 5 weeks. Complex multi-tenant SaaS dashboards, customer portals, and enterprise web applications with backend databases take 6 to 10 weeks.' }
    ],
    faqs: [
      { q: 'Do you build SEO-friendly websites?', a: 'Yes. We implement semantic HTML, meta tags, structured data, sitemaps, and performance best practices for search and AI discovery.' },
      { q: 'Why choose custom React web development over WordPress?', a: 'Custom React frontends provide sub-second load times, perfect Core Web Vitals, enterprise security, and bespoke business logic with zero plugin vulnerabilities.' }
    ],
    contactEyebrow: 'BUILD YOUR WEB PLATFORM',
    contactTitle: 'Ready to Build a High-Performance Web Application?',
    contactSubtitle: 'Schedule a consultation with our web architects to discuss your digital vision, technical stack, and performance requirements.',
    contactChecklist: [
      'Modern React & Next.js Frontend Architecture',
      'Sub-Second Page Speed & Core Web Vitals Focus',
      'Comprehensive JSON-LD Semantic SEO & AEO',
      'Enterprise API & Database Integration'
    ]
  },
    'mobile-app-development': {
    metaTitle: 'Business Mobile App Development | React Native & Flutter | Gyan VaniAi',
    metaDescription: 'Custom Android and iOS mobile app development with React Native and Flutter. Scalable business apps with offline sync, CRM, AI, and API integrations.',
    heroEyebrow: 'REACT NATIVE & FLUTTER ENGINEERING',
    h1: 'Mobile App Development',
    subtitle: 'Engineering high-performance, cross-platform Android and iOS mobile applications with native 60fps responsiveness, offline-first data sync, and enterprise backend integrations.',
    overviewTitle: 'Native-Quality Cross-Platform Mobile Applications Built for Business',
    overview: 'Gyan VaniAi develops production-grade business mobile applications for Android and iOS using modern React Native and Flutter frameworks. Rather than building and maintaining two disconnected, expensive native codebases, our engineering methodology delivers a unified cross-platform architecture that matches native performance while halving maintenance overhead. From customer-facing on-demand mobile portals and mobile commerce apps to internal field-service technician tools equipped with offline data caching, camera OCR scanning, and biometric authentication, we engineer apps that perform flawlessly under real-world conditions.',
    whoForTitle: 'Engineered for Digital Ventures and Enterprise Teams',
    whoFor: 'Tech startups launching consumer mobile products, enterprise CTOs equipping field service teams, logistics operators deploying driver applications, and retail brands building high-conversion mobile shopping experiences.',
    deliverablesTitle: 'Mobile App Engineering Deliverables',
    deliverables: [
      'Cross-Platform Android & iOS Applications from a Unified Codebase',
      'Offline-First Local Storage Architecture with Automatic Background Sync',
      'Biometric Authentication (Face ID, Touch ID, Fingerprint) & OAuth Security',
      'Push Notification Engine with Deep Linking (Firebase Cloud Messaging, APNs)',
      'Native Hardware Integration (GPS Geolocation, Camera OCR, Bluetooth BLE)',
      'High-Throughput Backend REST & GraphQL Microservices Architecture',
      'Complete App Store & Google Play Store Submission and Compliance Clearance'
    ],
    benefits: [
      'iOS & Android Single Codebase',
      'Native 60 FPS Performance',
      'Offline-First Local Sync',
      'Full App Store Approval Support'
    ],
    image: '/mobile_app_dev_hero.jpg',
    imageAlt: 'Business Mobile Application Development on iOS and Android by Gyan VaniAi',
    capabilitiesTitle: 'Core Mobile Engineering Capabilities',
    capabilities: [
      { title: 'React Native & Flutter Specialization', desc: 'Leverage modern frameworks to deliver fluid native micro-interactions, 60fps animations, and platform-specific UI nuances on both iOS and Android.' },
      { title: 'Offline-First Architecture', desc: 'Field teams can continue recording inspections, updating customer records, and taking photos without internet; data auto-syncs when connectivity resumes.' },
      { title: 'Real-Time Hardware & Sensor Access', desc: 'Direct integration with native camera for QR/barcode scanning, background GPS for driver telemetry, and Bluetooth BLE for IoT devices.' },
      { title: 'Omnichannel Push Notification Workflows', desc: 'Intelligent push notification pipelines using FCM and Apple APNs with deep linking directly into specific app screens and tasks.' },
      { title: 'Enterprise Security & Sandboxing', desc: 'Secure token storage in iOS Keychain and Android KeyStore with SSL pinning and obfuscation to safeguard sensitive corporate data.' },
      { title: 'App Store Optimization & Release Management', desc: 'Complete management of developer accounts, test distributions via TestFlight/Internal Testing, and compliance clearance on Google Play and Apple App Store.' }
    ],
    workflowHeading: 'The Mobile Application Engineering Lifecycle',
    workflowSubtitle: 'From interactive Figma wireframes and offline data architecture to multi-device testing and App Store launch.',
    engineBanner: {
      tag: 'MOBILE APP DEVELOPMENT ENGINE',
      title: 'Cross-Platform Mobile Engineering Pipeline',
      desc: 'Ship feature-rich, scalable iOS and Android apps twice as fast with unified cross-platform architecture and zero compromises.'
    },
    customSteps: [
      { stepNum: '01', category: 'Design', icon: <Smartphone size={20} />, title: 'UX Prototyping & User Flows', desc: 'Craft intuitive Figma wireframes, component libraries, and interactive click-through prototypes validated against platform human interface guidelines.' },
      { stepNum: '02', category: 'Architecture', icon: <Layers size={20} />, title: 'Offline-First Data Modeling', desc: 'Architect local SQLite/WatermelonDB state stores, background synchronization workers, and tokenized API communication.' },
      { stepNum: '03', category: 'Build', icon: <Cpu size={20} />, title: 'Component & Screen Development', desc: 'Develop responsive, pixel-perfect screens in React Native or Flutter with high-performance list virtualization and 60fps animations.' },
      { stepNum: '04', category: 'Hardware', icon: <Zap size={20} />, title: 'Native Device Integration', desc: 'Integrate native camera barcode scanning, background GPS geofencing, push notification services, and biometric Face/Touch ID.' },
      { stepNum: '05', category: 'APIs', icon: <Server size={20} />, title: 'Backend & CRM/ERP Integration', desc: 'Connect the mobile client to high-availability REST or GraphQL endpoints, webhooks, and third-party payment gateways.' },
      { stepNum: '06', category: 'Testing', icon: <ShieldCheck size={20} />, title: 'Multi-Device Test Matrix', desc: 'Execute automated UI and stress tests across 50+ real physical Android and iOS handsets covering varied screen sizes and OS versions.' },
      { stepNum: '07', category: 'Launch', icon: <Trophy size={20} />, title: 'App Store Clearance & Monitoring', desc: 'Manage Google Play and Apple App Store submission, privacy policy audits, and launch telemetry with Sentry and Firebase Crashlytics.' }
    ],
    outcomesTitle: 'Quantifiable Mobile Engineering Results',
    outcomesSubtitle: 'Engineered to accelerate your time-to-market, maximize app store adoption, and ensure uninterrupted field productivity.',
    outcomes: [
      { title: '50% Faster Time-to-Market', desc: 'Deliver concurrent iOS and Android applications from a unified shared codebase without engineering twice.' },
      { title: '99.9% Crash-Free User Sessions', desc: 'Rigorous architectural decoupling, typed codebases, and proactive crash logging guarantee stability.' },
      { title: '100% Offline Field Productivity', desc: 'Remote technicians, drivers, and sales reps can complete essential workflows with zero network dependency.' },
      { title: '4.8+ Average App Store User Ratings', desc: 'Smooth performance, instant loading speeds, and responsive native touch controls delight end users.' }
    ],
    relatedLinks: [
      { url: '/services/web-development', text: 'Web Application Development' },
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/ai-development', text: 'AI Software Development' }
    ],
    customFaqs: [
      { question: 'Should we choose React Native, Flutter, or native iOS (Swift) and Android (Kotlin)?', answer: 'For over 90% of commercial and enterprise applications, React Native or Flutter is the optimal choice. They allow a single unified codebase to serve both iOS and Android with near-native performance, halving development and maintenance costs. We only recommend pure native development for applications requiring heavy 3D game engines, specialized AR/VR hardware shaders, or deep proprietary kernel modifications.' },
      { question: 'How does offline-first data synchronization work when field staff lose cellular connectivity?', answer: 'Our mobile apps are engineered with local encrypted databases (such as SQLite or WatermelonDB). When offline, users can continue capturing form data, inspecting equipment, taking photos, and completing tasks. A background sync worker continuously detects network availability and automatically reconciles cached changes with your cloud servers without data collisions.' },
      { question: 'Do you manage the entire Apple App Store and Google Play Store submission process?', answer: 'Yes. We manage the end-to-end publishing lifecycle, including certificate provisioning, bundle signing, privacy declaration questionnaires, screenshot asset generation, TestFlight beta distribution, and resolving any App Store review inquiries until your app is live.' },
      { question: 'Can the mobile app integrate with our existing backend CRM, ERP, and databases?', answer: 'Yes. We build secure RESTful APIs, GraphQL endpoints, and WebSockets to integrate the mobile application seamlessly with your custom CRM, SAP, Salesforce, Postgres database, or third-party webhooks with zero data lag.' },
      { question: 'How do you safeguard sensitive enterprise data stored on mobile devices?', answer: 'We employ multi-layered security protocols: AES-256 local database encryption, biometric authentication (Face ID / Fingerprint), token storage inside the secure enclave (iOS Keychain and Android KeyStore), SSL certificate pinning to prevent man-in-the-middle attacks, and code obfuscation to prevent reverse engineering.' },
      { question: 'What is the typical development timeline for a custom business mobile application?', answer: 'A standard business mobile MVP with core authentication, workflows, push notifications, and API integrations typically takes 6 to 10 weeks to develop, test, and submit to the app stores. Complex enterprise platforms with offline sync and hardware integration take 10 to 14 weeks.' }
    ],
    faqs: [
      { q: 'Native or cross-platform?', a: 'We typically recommend React Native or Flutter for speed and shared codebase, and native when platform-specific performance or SDKs require it.' },
      { q: 'Do you support offline mode in mobile apps?', a: 'Yes. We build offline-first mobile apps using local encrypted SQLite databases that automatically synchronize changes when internet connectivity is restored.' }
    ],
    contactEyebrow: 'BUILD YOUR MOBILE APP',
    contactTitle: 'Ready to Build Your iOS & Android Mobile App?',
    contactSubtitle: 'Schedule a consultation with our mobile architects to discuss your feature roadmap, cross-platform architecture, and launch timeline.',
    contactChecklist: [
      'React Native & Flutter Cross-Platform Architecture',
      'Offline-First Local Database & Background Sync',
      'Biometric Authentication & Native Hardware Access',
      'Complete App Store & Google Play Submission'
    ]
  },
  'ai-chatbots': {
    metaTitle: 'Custom AI Chatbot Development (Sub-300ms RAG) | Gyan VaniAi',
    metaDescription: 'Build custom AI chatbots grounded in your business database. Zero hallucination RAG architecture, sub-300ms responses & WhatsApp/web widget integration.',
    h1: 'AI Chatbot Development',
    subtitle: 'Intelligent chatbots that answer from your data, hand off to humans with context, and plug into WhatsApp and CRM.',
    overview: 'Gyan VaniAi builds AI chatbots powered by RAG so answers come from your documents and policies, not hallucinations. Chatbots support multi-language conversations, sentiment-aware routing, and seamless escalation to live agents.',
    whoFor: 'Support and sales teams that want 24/7 coverage without sacrificing accuracy or brand tone.',
    deliverables: ['RAG-grounded chatbots', 'WhatsApp & web widgets', 'Human handoff protocols', 'Analytics dashboards', 'Knowledge base ingestion'],
    benefits: ['RAG Knowledge Answers', 'Human Handoff', 'Multi-language Support', 'CRM Sync'],
    image: '/service-ai-chatbot.webp',
    imageAlt: 'AI chatbot development by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ai-agent-development', text: 'AI Agent Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' }
    ],
    faqs: [
      { q: 'How do you prevent chatbot hallucinations?', a: 'We use Retrieval-Augmented Generation (RAG) with tenant-isolated vector stores so the model answers from your approved knowledge base.' }
    ]
  },
  'voice-bot-assistant': {
    metaTitle: 'AI Voice Bot Assistant | Conversational Voice AI | Gyan VaniAi',
    metaDescription: 'Build conversational AI voice bot assistants for customer support, inbound call handling, and automated phone campaigns with real-time CRM integration.',
    h1: 'AI Voice Bot Assistants',
    subtitle: 'Human-like conversational AI voice bots for customer support, sales, and appointment booking.',
    overview: 'Gyan VaniAi builds intelligent Voice Bot Assistants that understand natural language, handle interruptions, and provide instant resolutions over voice channels. Our voice agents are engineered for low-latency conversational flow, streaming speech recognition, and bi-directional CRM integration.',
    whoFor: 'Customer support teams and sales departments looking to automate inbound queries, outbound campaigns, and appointment bookings 24/7.',
    deliverables: ['Conversational AI models', 'Multi-language support', 'CRM integration', 'Transcription & analytics'],
    benefits: ['Reduced Queue Times', 'Natural Conversations', 'Scalable Support', 'Real-time CRM Updates'],
    image: '/voice-bot-hero.webp',
    imageAlt: 'Enterprise AI Voice Bot Assistant real-time call dashboard with audio waveform, live transcript, and CRM sync by Gyan VaniAi',
    engineBanner: {
      tag: 'VOICE AI ENGINE · REAL-TIME ORCHESTRATION',
      title: 'Low-Latency Conversational Voice Pipeline',
      desc: 'Streaming full-duplex speech recognition, contextual reasoning, and immediate CRM synchronization.'
    },
    integrations: [
      { label: 'Telephony Trunk (SIP / WebRTC / PSTN)', icon: <PhoneCall size={15} /> },
      { label: 'LLM Reasoning & NLU Engine', icon: <BrainCircuit size={15} /> },
      { label: 'Bi-Directional CRM Database Sync', icon: <Database size={15} /> },
      { label: 'Instant SMS & WhatsApp Confirmations', icon: <Mail size={15} /> }
    ],
    workflowHeading: 'How Conversational Voice AI Works',
    workflowSubtitle: 'From incoming telephony audio to CRM synchronization in real time.',
    workflowFooter: {
      label: 'VOICE AI ENGINE',
      title: 'Autonomous Voice Pipeline Execution',
      desc: 'Stream real-time voice recognition, understand caller intent with NLP, hold natural multi-turn conversations, book appointments, and sync data directly to your CRM.',
      btnText: 'Deploy Voice AI Agent',
      btnUrl: '#contact'
    },
    customSteps: [
      { stepNum: '01', category: 'Capture', icon: <PhoneCall size={20} />, title: 'Call Capture', desc: 'Accept inbound calls or initiate automated outbound campaigns across SIP trunks, WebRTC, or WhatsApp Voice.' },
      { stepNum: '02', category: 'ASR', icon: <Mic size={20} />, title: 'Speech Recognition', desc: 'Streaming Automatic Speech Recognition (ASR) converts caller speech to text in real time.' },
      { stepNum: '03', category: 'NLP', icon: <BrainCircuit size={20} />, title: 'Intent Detection', desc: 'Natural language understanding parses caller intent, urgency, sentiment, and entity parameters.' },
      { stepNum: '04', category: 'Voice AI', icon: <Bot size={20} />, title: 'AI Conversation', desc: 'LLM dialogue engine generates human-like, contextual responses with natural full-duplex interruption support.' },
      { stepNum: '05', category: 'Qualify', icon: <Filter size={20} />, title: 'Lead Qualification', desc: 'Dynamically assesses prospect qualification criteria, budget, timeline, and decision-maker status during the call.' },
      { stepNum: '06', category: 'Action', icon: <Calendar size={20} />, title: 'Appointment / Action', desc: 'Books meetings directly into Google Calendar or Outlook, triggers SMS confirmations, and executes workflow tasks.' },
      { stepNum: '07', category: 'Handoff', icon: <Headset size={20} />, title: 'Human Handoff', desc: 'Smoothly transfers complex calls or VIP prospects to live sales reps with full conversation transcripts and context.' },
      { stepNum: '08', category: 'CRM Sync', icon: <Database size={20} />, title: 'CRM & Follow-up', desc: 'Automatically logs call recording, structured summary, sentiment score, and next-step actions into your CRM.' }
    ],
    ctaVisual: '/voice-ai-analytics.webp',
    ctaVisualAlt: 'Voice AI performance metrics, audio analytics, and call resolution analytics dashboard',
    contactTitle: 'Ready to Deploy Your AI Voice Assistant?',
    contactSubtitle: 'Tell us about your call volume, use cases, and telephony stack. We will architect a low-latency voice AI pipeline for your business.',
    relatedLinks: [
      { url: '/services/whatsapp-calling-agent', text: 'WhatsApp Calling Agent', icon: '/service-voice-ai.webp' },
      { url: '/services/phone-call-agent', text: 'Phone Call Agent', icon: '/service-voice-ai.webp' },
      { url: '/services/ai-agent-development', text: 'AI Agent Development', icon: '/service-ai-agent-development.webp' },
      { url: '/services/crm-development', text: 'Custom CRM Development', icon: '/service-crm-development.webp' }
    ],
    customFaqs: [
      { question: 'Can callers interrupt the AI voice bot naturally?', answer: 'Yes. Our voice bots support full-duplex communication with active interruption handling (barge-in). The bot pauses instantly when the user speaks, ensuring natural conversational flow.' },
      { question: 'What is the voice response performance?', answer: 'Our streaming voice pipeline achieves fast end-to-end responsiveness using optimized ASR speech recognition, LLM reasoning, and low-latency text-to-speech synthesis.' },
      { question: 'Can the voice bot book appointments directly?', answer: 'Yes. The bot integrates with Google Calendar, Microsoft Outlook, and Calendly to check real-time availability and book appointments during the call.' },
      { question: 'How does human agent handoff work?', answer: 'When the AI encounters an out-of-scope query or high-value caller, it initiates a live SIP transfer to a human agent, providing the rep with a complete call transcript.' },
      { question: 'Does the voice bot integrate with our CRM?', answer: 'Yes. Post-call automation logs complete transcripts, call summaries, sentiment scores, and lead qualification data directly into your CRM.' },
      { question: 'What languages and accents are supported?', answer: 'We support over 30 languages and regional accents with natural inflection, customizable tone, and domain-specific vocabulary.' },
      { question: 'Can we use our existing business phone numbers?', answer: 'Yes. We connect with your existing telephony via SIP trunking, Twilio, Vonage, Plivo, or direct PBX integration without requiring number changes.' },
      { question: 'How do you ensure enterprise security and compliance?', answer: 'All voice streams and transcripts are encrypted in transit (TLS) and at rest (AES-256) with strict role-based access controls and configurable retention policies.' }
    ],
    faqs: [
      { q: 'Can callers interrupt the AI voice bot naturally?', a: 'Yes. Our voice bots support full-duplex communication with active interruption handling (barge-in). The bot pauses instantly when the user speaks, ensuring natural conversational flow.' },
      { q: 'What is the voice response performance?', a: 'Our streaming voice pipeline achieves fast end-to-end responsiveness using optimized ASR speech recognition, LLM reasoning, and low-latency text-to-speech synthesis.' },
      { q: 'Can the voice bot book appointments directly?', a: 'Yes. The bot integrates with Google Calendar, Microsoft Outlook, and Calendly to check real-time availability and book appointments during the call.' },
      { q: 'How does human agent handoff work?', a: 'When the AI encounters an out-of-scope query or high-value caller, it initiates a live SIP transfer to a human agent, providing the rep with a complete call transcript.' },
      { q: 'Does the voice bot integrate with our CRM?', a: 'Yes. Post-call automation logs complete transcripts, call summaries, sentiment scores, and lead qualification data directly into your CRM.' },
      { q: 'What languages and accents are supported?', a: 'We support over 30 languages and regional accents with natural inflection, customizable tone, and domain-specific vocabulary.' },
      { q: 'Can we use our existing business phone numbers?', a: 'Yes. We connect with your existing telephony via SIP trunking, Twilio, Vonage, Plivo, or direct PBX integration without requiring number changes.' },
      { q: 'How do you ensure enterprise security and compliance?', a: 'All voice streams and transcripts are encrypted in transit (TLS) and at rest (AES-256) with strict role-based access controls and configurable retention policies.' }
    ]
  },
  'whatsapp-calling-agent': {
    metaTitle: 'AI WhatsApp Calling Agent Bot (Sub-300ms Voice) | Gyan VaniAi',
    metaDescription: 'Automate customer interactions directly over WhatsApp voice calls with sub-300ms AI agents. Instant CRM logging, 24/7 outbound campaigns & live human handoff.',
    h1: 'WhatsApp Calling Agent Bots',
    subtitle: 'Automate customer interactions directly over WhatsApp voice calls with conversational AI.',
    overview: 'Reach your customers where they are. Our WhatsApp Calling Agent Bots handle inbound and outbound voice calls natively within WhatsApp, providing seamless support and sales automation without requiring traditional telecom infrastructure.',
    whoFor: 'Retail, Real Estate, and Service businesses that interact heavily with their user base on WhatsApp and want to scale voice communications globally.',
    deliverables: ['WhatsApp Voice API integration', 'Outbound campaign dialing', 'Inbound call routing', 'Contextual AI responses'],
    benefits: ['Native WhatsApp Experience', 'Global Reach', 'Reduced Telecom Costs', 'Automated Campaigns'],
    image: '/portfolio_crm.webp',
    imageAlt: 'WhatsApp Calling Agent interface by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/whatsapp-automation', text: 'WhatsApp CRM Automation' },
      { url: '/services/voice-bot-assistant', text: 'AI Voice Bot Assistants' }
    ],
    faqs: [
      { q: 'Does this use standard WhatsApp numbers?', a: 'We utilize official WhatsApp Business APIs that support voice calling capabilities for authorized business numbers.' }
    ]
  },
    'phone-call-agent': {
    metaTitle: 'AI Phone Call Agent Assistant | SIP & PBX Telephony | Gyan VaniAi',
    metaDescription: 'Deploy AI phone agents to handle inbound calls, answer customer inquiries, and route sales leads across standard phone lines, SIP trunks, and PBX systems with sub-300ms latency.',
    heroEyebrow: 'CONVERSATIONAL VOICE AI',
    h1: 'AI Phone Call Agent Assistants',
    subtitle: 'Deploy autonomous, natural-sounding AI phone agents that answer inbound calls, qualify prospects, and route escalations across standard PSTN lines and enterprise SIP trunks with sub-300ms latency.',
    overviewTitle: 'Human-Sounding Autonomous AI Phone Agents Engineered for Business',
    overview: 'Gyan VaniAi engineers enterprise AI Phone Call Agent Assistants that sound indistinguishable from human customer support and sales representatives. Operating directly over standard telephone lines, cloud PBX systems, and enterprise SIP trunks, our voice agents answer inbound calls with sub-300ms latency, resolve complex customer inquiries, schedule appointments directly in your calendar, qualify inbound sales leads, and seamlessly transfer high-stakes calls to human agents with full conversation context preserved.',
    whoForTitle: 'Engineered for High-Volume Call Operations',
    whoFor: 'Contact center directors, customer support operations heads, healthcare scheduling desks, real estate agencies, and financial services firms handling heavy inbound call volumes who need to eliminate hold queues, reduce cost per call, and provide 24/7 conversational phone support.',
    deliverablesTitle: 'AI Phone Agent Deliverables',
    deliverables: [
      'Sub-300ms Low-Latency Speech-to-Speech (STT / LLM / TTS) Pipeline',
      'Direct Enterprise SIP Trunk, PSTN & Cloud PBX (Asterisk, Twilio, FreePBX) Integration',
      'Autonomous Inbound Call Resolution & Appointment Scheduling',
      'Intelligent Outbound Qualification & Proactive Reminder Campaigns',
      'Real-Time Sentiment Monitoring & Live SIP Call Transfer to Human Agents',
      'Post-Call Audio Recording, AI Transcription & CRM Field Population',
      'Multilingual Voice Capabilities Supporting 20+ Languages & Natural Dialects'
    ],
    benefits: [
      'Sub-300ms Conversational Latency',
      'Enterprise SIP & PBX Connectivity',
      'Zero Customer Call Hold Times',
      'Context-Rich Live Human Transfer'
    ],
    image: '/service-voice-ai.webp',
    imageAlt: 'Phone Call AI Agent telephony dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core AI Phone Telephony Capabilities',
    capabilities: [
      { title: 'Ultra-Low Latency Voice Pipeline', desc: 'Streaming speech recognition (STT) and synthesized voice generation (TTS) operate in tandem to achieve human-conversational response times under 300ms.' },
      { title: 'Direct SIP & PBX Integration', desc: 'Seamlessly connects to your existing phone infrastructure, telecom SIP trunks, Asterisk PBX, FreePBX, or cloud telephony providers without changing phone numbers.' },
      { title: 'Natural Conversational Interruptibility', desc: 'Callers can speak naturally and interrupt the AI agent mid-sentence; the voice agent instantly pauses and adapts to the caller\'s new input.' },
      { title: 'Automated CRM Sync & Scheduling', desc: 'During the call, the AI queries live calendar availability, books appointments, and populates CRM contact records with verified details.' },
      { title: 'Live SIP Warm Transfer', desc: 'When complex issues or upset callers are identified, the agent initiates a live SIP transfer to human agents, transmitting an instant call briefing.' },
      { title: 'Automated Post-Call SMS & WhatsApp Follow-Ups', desc: 'Immediately following the call, the system sends confirmation details, payment links, or reference numbers to the caller via WhatsApp or SMS.' }
    ],
    workflowHeading: 'The Autonomous AI Phone Call Journey',
    workflowSubtitle: 'From incoming ring and real-time voice synthesis to automated CRM logging and human escalation.',
    engineBanner: {
      tag: 'TELEPHONY AI ENGINE',
      title: 'Autonomous Inbound & Outbound Voice Pipeline',
      desc: 'Deliver human-like telephone support with sub-second response times and enterprise SIP connectivity.'
    },
    customSteps: [
      { stepNum: '01', category: 'Telephony', icon: <PhoneCall size={20} />, title: 'Inbound Call Ring & SIP Handshake', desc: 'Inbound telephone call connects via enterprise SIP trunk or cloud PBX with instant call setup and zero queue waiting.' },
      { stepNum: '02', category: 'Speech', icon: <Mic size={20} />, title: 'Streaming Speech-to-Text (STT)', desc: 'Caller speech is transcribed into text in real time using ultra-fast streaming acoustic models trained on telephonic audio.' },
      { stepNum: '03', category: 'Intent', icon: <BrainCircuit size={20} />, title: 'Contextual Intent & Knowledge Lookup', desc: 'Conversational LLM analyzes caller intent, retrieves approved company answers, and plans the appropriate response.' },
      { stepNum: '04', category: 'Synthesis', icon: <Zap size={20} />, title: 'Low-Latency Neural Voice Synthesis (TTS)', desc: 'Response is converted into natural human-like voice audio with emotive inflection and sub-300ms latency.' },
      { stepNum: '05', category: 'Action', icon: <Calendar size={20} />, title: 'Real-Time Action & Calendar Booking', desc: 'Agent executes actions: checks appointment availability, updates customer records, or triggers dispatch alerts.' },
      { stepNum: '06', category: 'Escalation', icon: <PhoneForwarded size={20} />, title: 'Seamless Live SIP Transfer', desc: 'If human intervention is needed, the call transfers instantly to human staff along with an automated screen pop summary.' },
      { stepNum: '07', category: 'Follow-Up', icon: <MessageSquare size={20} />, title: 'Post-Call Summary & Multi-Channel SMS', desc: 'Call recording is archived, transcript synced to CRM, and an automated WhatsApp confirmation message is dispatched.' }
    ],
    outcomesTitle: 'Quantifiable Contact Center Efficiency & ROI',
    outcomesSubtitle: 'Designed to eliminate caller wait times, handle peak call surges gracefully, and lower cost per call.',
    outcomes: [
      { title: 'Zero Caller Hold Queues', desc: 'Scale instantly to handle 1,000+ concurrent inbound calls simultaneously without busy tones or waiting.' },
      { title: '70% Reduction in Cost Per Call', desc: 'Resolve routine tier-1 inquiries, appointment bookings, and status checks at a fraction of human staffing cost.' },
      { title: 'Sub-300ms Human Latency', desc: 'Fluid conversational cadence that prevents unnatural pauses and robotic interruptions.' },
      { title: '100% Consistent Call Logging', desc: 'Every phone conversation is transcribed, summarized by AI, and automatically synchronized with your CRM.' }
    ],
    relatedLinks: [
      { url: '/services/voice-bot-assistant', text: 'AI Voice Bot Assistants', icon: '/service-voice-ai.webp' },
      { url: '/services/whatsapp-calling-agent', text: 'WhatsApp Calling Agent', icon: '/service-voice-ai.webp' },
      { url: '/services/lead-management', text: 'Lead Management', icon: '/lead-hero.webp' },
      { url: '/services/crm-development', text: 'CRM Development', icon: '/service-crm-development.webp' }
    ],
    customFaqs: [
      { question: 'How natural does the AI phone agent sound? Does it sound robotic?', answer: 'Our voice agents use state-of-the-art neural speech synthesis and ultra-low-latency acoustic pipelines that sound remarkably human. They feature natural conversational inflections, breath pauses, and realistic tonality. Callers frequently assume they are conversing with a human agent.' },
      { question: 'Can callers interrupt the AI phone agent while it is speaking?', answer: 'Yes. Full-duplex conversational interruptibility is built directly into our telephony pipeline. If a caller interjects with "Wait, let me change that" while the AI is speaking, the agent immediately stops talking and responds to the new statement in real time.' },
      { question: 'How does the AI phone agent connect to our existing phone numbers and PBX system?', answer: 'We connect directly to your existing telecom infrastructure via standard Session Initiation Protocol (SIP) trunking. Whether you use Asterisk, FreePBX, Cisco, Avaya, Twilio, Exotel, or standard landline providers, we can route calls to and from our voice engine without changing your business phone numbers.' },
      { question: 'Can the phone agent transfer a call to a live human representative?', answer: 'Yes. If a caller requests a human, expresses high frustration, or presents a complex edge case, the AI agent performs a warm SIP transfer to your human team queue. Before connecting the call, our system can whisper an automated 5-second voice summary of the customer\'s issue to the receiving agent.' },
      { question: 'What happens after the call ends?', answer: 'The audio recording is securely archived, an AI-generated call summary and full transcript are saved to the customer\'s CRM timeline, and follow-up confirmation messages (such as calendar invites or payment links) are automatically dispatched via SMS or WhatsApp.' },
      { question: 'Does the voice agent support multiple languages and accents?', answer: 'Yes. We support over 20 languages and distinct regional accents, including American, British, and Australian English, Indian English, Hindi, Hinglish, Spanish, French, and German, with automatic language detection.' }
    ],
    faqs: [
      { q: 'Can it transfer calls to a real human?', a: 'Absolutely. If the AI detects a complex issue or an angry customer, it can instantly route the call to a live human agent via SIP transfer.' },
      { q: 'Can callers interrupt the voice agent mid-sentence?', a: 'Yes. Full-duplex conversational interruptibility allows callers to speak naturally and interrupt without breaking the call flow.' }
    ],
    contactEyebrow: 'DEPLOY AI PHONE AGENTS',
    contactTitle: 'Ready to Deploy Your Autonomous AI Phone Agent?',
    contactSubtitle: 'Schedule an interactive live voice demonstration to experience our sub-300ms latency and SIP telephony integration firsthand.',
    contactChecklist: [
      'Sub-300ms Low-Latency Neural Voice Pipeline',
      'Direct SIP Trunk, Cloud PBX & PSTN Compatibility',
      'Full-Duplex Conversational Interruptibility',
      'Instant Warm SIP Transfer to Human Staff'
    ]
  },
  'ivr-solutions': {
    metaTitle: 'Smart IVR Solutions & Conversational Call Routing | Gyan VaniAi',
    metaDescription: 'Enterprise Conversational IVR systems with real-time speech recognition (ASR), CRM database-dips, and sub-second SIP call escalation.',
    h1: 'Smart IVR & Conversational Voice Routing',
    subtitle: 'Replace rigid "Press 1 for Sales" phone trees with natural voice speech recognition, real-time CRM database dips, and sub-second SIP call escalation.',
    overview: 'Gyan VaniAi architects enterprise-grade Conversational IVR systems that understand natural spoken intent, query live CRM customer databases instantaneously, and dynamically route callers to the right agent or autonomous voice resolution. No frustrating multi-level touch-tone keypads—customers speak naturally in over 40+ languages, receive instant answers to routine queries, and escalate with full conversational context.',
    whoFor: 'Enterprises, high-volume contact centers, healthcare networks, financial institutions, and service providers handling hundreds of calls daily and aiming to increase First Contact Resolution (FCR) while reducing telecom hold times.',
    deliverables: [
      'Natural Language ASR & Intent Extraction',
      'Sub-200ms CRM Data-Dip Customer Identification',
      'Dynamic Contextual Call Steering & SIP Trunk Routing',
      'Omnichannel WhatsApp & SMS Follow-up Automation',
      'Real-time Telephony Sentiment & Agent Queue Telemetry',
      'Zero-Drop Human Handoff with Full Call Audio & Transcript Briefings'
    ],
    benefits: [
      'Natural Spoken Speech Recognition (No DTMF keypad frustration)',
      'Real-time CRM Data-Dip Personalization',
      'Instant SIP Handoff with Complete Context',
      '40%+ Reduction in Average Handle Time (AHT)'
    ],
    image: '/ivr-solutions-hero.webp',
    imageAlt: 'Gyan VaniAi Smart IVR and Intelligent Call Routing System Dashboard',
    capabilitiesTitle: 'Core Smart IVR Capabilities',
    capabilities: [
      { title: 'Adaptive Speech Recognition (ASR)', desc: 'Transcribes accents, dialects, and ambient noise in real-time, matching spoken caller requests directly to knowledge bases.' },
      { title: 'Instant CRM Data-Dip', desc: 'Recognizes caller phone numbers on pickup, fetching account tier, open support tickets, and recent purchases within milliseconds.' },
      { title: 'Dynamic Priority Queuing', desc: 'Automatically prioritizes VIP clients, active high-priority escalations, and revenue-generating inquiries ahead of standard hold queues.' },
      { title: 'Deflection to WhatsApp & SMS', desc: 'Allows callers to seamlessly transition repetitive transactions (receipts, tracking links, document uploads) to WhatsApp while on the call.' },
      { title: 'Multi-Language Conversational AI', desc: 'Communicates fluently in English, Hindi, and 40+ regional dialects without requiring rigid pre-recorded voice menus.' },
      { title: 'SIP Trunking & Softswitch Telephony', desc: 'Engineered on standards-compliant SIP protocols, FreeSWITCH, Asterisk, Twilio, and cloud telecom carriers for 99.99% uptime.' }
    ],
    workflowHeading: 'How Gyan VaniAi Smart IVR Resolves & Routes Calls',
    workflowSubtitle: 'From carrier SIP ingestion to acoustic intent triage, CRM database dips, and instant live agent transfer.',
    customSteps: [
      { stepNum: '01', category: 'Telephony', title: 'Carrier Ingestion', desc: 'Inbound call connects via high-throughput SIP trunk with caller ID ingestion.' },
      { stepNum: '02', category: 'ASR', title: 'Acoustic Speech-to-Text', desc: 'Caller speaks naturally; neural ASR transcribes intent with sub-180ms latency.' },
      { stepNum: '03', category: 'CRM Dip', title: 'Real-Time CRM Data Dip', desc: 'Instant database lookup fetches customer tier, ticket history, and recent orders.' },
      { stepNum: '04', category: 'Logic', title: 'Smart Intent Steering', desc: 'Resolves self-service requests or calculates the optimal routing path.' },
      { stepNum: '05', category: 'Handoff', title: 'Context-Rich SIP Transfer', desc: 'Transfers call to a live specialist along with audio summary and customer briefing.' }
    ],
    outcomesTitle: 'Measurable Telephony ROI & Operational Impact',
    outcomesSubtitle: 'Modernizing legacy IVRs delivers immediate operational savings and superior customer satisfaction.',
    outcomes: [
      { title: '70% Call Deflection', desc: 'Automate repetitive status inquiries, appointments, and password resets directly through intelligent voice self-service.' },
      { title: 'Sub-400ms Turnaround', desc: 'Engineered with high-throughput WebSockets and optimized SIP signaling for zero perceptible lag.' },
      { title: 'Zero Repetition for Callers', desc: 'Live agents receive the caller’s full issue summary on screen before answering, eliminating repetitive customer explanations.' },
      { title: 'Omnichannel Continuation', desc: 'Dispatch WhatsApp confirmation links, receipts, and PDFs directly during or immediately after the voice call.' }
    ],
    relatedLinks: [
      { url: '/services/phone-call-agent', text: 'Phone Call AI Agents' },
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/human-handoff-systems', text: 'Human Handoff Systems' }
    ],
    customFaqs: [
      { question: 'Can the Smart IVR identify callers automatically?', answer: 'Yes. By dipping into your CRM database via real-time API or webhook, the IVR recognizes the caller phone number, greets them by name, and anticipates the call purpose based on open tickets, recent bookings, or deliveries.' },
      { question: 'How is Conversational IVR different from traditional touch-tone IVR?', answer: 'Traditional IVRs force callers through rigid, nested DTMF menus ("Press 1 for Sales, Press 2 for Billing"). Our Conversational IVR lets callers speak freely in their natural language, understands context, answers routine questions immediately, or transfers to the exact right queue.' },
      { question: 'What telephony providers and PBX systems do you support?', answer: 'We support all standard SIP trunking providers, Asterisk, FreeSWITCH, Twilio, Exotel, Tata Tele, Cisco Webex, and Microsoft Teams Phone, ensuring seamless integration with your existing telephony infrastructure.' },
      { question: 'Can the IVR transfer calls to human agents with full context?', answer: 'Yes. Using SIP REFER or warm transfers, the call is transferred to your contact center agents alongside a screen-pop showing the caller transcript, verified identity, and sentiment analysis so customers never have to repeat themselves.' },
      { question: 'Can callers switch from voice to WhatsApp during the call?', answer: 'Yes. Our IVR can automatically send an interactive WhatsApp message (e.g., payment links, address verification, document upload forms) while the caller remains on the line or after hanging up.' }
    ]
  },
    'human-handoff-systems': {
    metaTitle: 'AI to Human Handoff Systems | Agent Escalation | Gyan VaniAi',
    metaDescription: 'Seamless escalation from AI bots to human agents with full context retention. Connect chat, voice, and WhatsApp to live support with real-time sentiment detection.',
    heroEyebrow: 'INTELLIGENT AGENT ESCALATION',
    h1: 'AI to Human Handoff Systems',
    subtitle: 'Architecting seamless, context-preserving handoffs from AI chatbots, voice agents, and WhatsApp bots to live human support agents with real-time sentiment detection.',
    overviewTitle: 'Zero-Context-Loss AI Escalation & Unified Agent Consoles',
    overview: 'Gyan VaniAi engineers enterprise AI-to-Human Handoff and Intelligent Escalation systems designed to eliminate customer frustration and protect high-value relationships. When an AI chatbot, WhatsApp agent, or voice bot encounters complex edge cases, regulatory boundaries, or customer frustration, our system triggers an instant, seamless transfer to live human specialists. The human agent receives the incoming interaction in a unified omnichannel console, complete with the full conversation transcript, an AI-synthesized 3-bullet issue summary, verified customer account data, and recommended resolution playbooks—ensuring the customer never has to repeat themselves.',
    whoForTitle: 'Engineered for Customer Experience & Revenue Leaders',
    whoFor: 'Customer support vice presidents, contact center operations directors, high-ticket sales teams, healthcare helplines, and financial service desks that utilize AI for tier-1 automation but require a fail-safe, context-rich escalation path for high-value clients or complex inquiries.',
    deliverablesTitle: 'Human Handoff System Deliverables',
    deliverables: [
      'Real-Time Frustration & Sentiment NLP Escalation Triggers',
      'Zero-Context-Loss Conversation Transfer (Full transcript + AI issue briefing)',
      'Skill-Based, Language-Based & Tiered Agent Routing Engine',
      'Unified Agent Console (Web Chat, WhatsApp, Voice, Email in one view)',
      'Live Supervisor Command Dashboard (Whisper coaching, Barge-in, Takeover)',
      'Graceful Queue Management with Estimated Wait Time Announcements',
      'Agent AI Co-Pilot (Suggested canned macros, knowledge base lookups, and ticket sync)'
    ],
    benefits: [
      'Zero Conversation Context Loss',
      'Real-Time Sentiment Triggers',
      'Unified Omnichannel Inbox',
      'Live Supervisor Whisper & Takeover'
    ],
    image: '/agent-human-handoff.webp',
    imageAlt: 'AI to Human Handoff Unified Support Agent Console by Gyan VaniAi',
    capabilitiesTitle: 'Core AI-to-Human Escalation Capabilities',
    capabilities: [
      { title: 'Predictive Sentiment Monitoring', desc: 'Real-time NLP continuously monitors customer phrasing for signs of anger, profanity, repeated questions, or explicit "agent" requests to trigger escalation proactively.' },
      { title: '3-Second AI Context Briefing', desc: 'Before a human agent clicks "accept", the system generates an executive summary: customer identity, main issue, attempted solutions, and verified order numbers.' },
      { title: 'Skill-Based & Tiered Routing', desc: 'Directs complex billing questions to finance specialists, high-value enterprise accounts to senior account managers, and technical bugs to tier-2 engineering.' },
      { title: 'Unified Omnichannel Workspace', desc: 'Live agents manage web chat, WhatsApp conversations, email threads, and incoming voice calls from a single responsive browser interface.' },
      { title: 'Supervisor Whisper & Call Barge-in', desc: 'Team leads can monitor ongoing conversations in real time, type private coaching whispers visible only to the agent, or immediately take over critical accounts.' },
      { title: 'Bi-Directional Handoff & Bot Return', desc: 'Once a human agent resolves the complex problem, they can return the customer to the AI agent to execute post-resolution surveys or schedule calendar reminders.' }
    ],
    workflowHeading: 'The Intelligent AI-to-Human Escalation Workflow',
    workflowSubtitle: 'From bot sentiment monitoring and issue synthesis to live agent handoff and issue resolution.',
    engineBanner: {
      tag: 'ESCALATION ORCHESTRATION ENGINE',
      title: 'Real-Time Context-Preserving Handoff Pipeline',
      desc: 'Eliminate customer frustration by connecting automated bots and human agents with complete contextual continuity.'
    },
    customSteps: [
      { stepNum: '01', category: 'Monitoring', icon: <BrainCircuit size={20} />, title: 'Real-Time Sentiment Monitoring', desc: 'AI engine analyzes incoming user messages for frustration markers, policy boundaries, or explicit requests to speak with a human.' },
      { stepNum: '02', category: 'Trigger', icon: <Zap size={20} />, title: 'Intelligent Escalation Trigger', desc: 'When confidence falls below threshold or frustration is detected, the system initiates a seamless transfer sequence.' },
      { stepNum: '03', category: 'Synthesis', icon: <FileText size={20} />, title: 'AI Issue Summary Generation', desc: 'LLM generates an instant 3-bullet briefing card: customer pain point, attempts made, and current sentiment score.' },
      { stepNum: '04', category: 'Routing', icon: <Users size={20} />, title: 'Skill & Tier-Based Agent Matching', desc: 'Engine matches the conversation to the most qualified available agent based on language, technical skill, and VIP priority.' },
      { stepNum: '05', category: 'Handoff', icon: <Headset size={20} />, title: 'Instant Agent Acceptance & Context Load', desc: 'Human agent accepts the interaction; their screen instantly renders the full chat transcript and pre-populated customer CRM records.' },
      { stepNum: '06', category: 'Co-Pilot', icon: <Bot size={20} />, title: 'Live Agent Interaction & AI Co-Pilot', desc: 'Agent assists customer with live AI-recommended knowledge articles, macro response suggestions, and CRM action shortcuts.' },
      { stepNum: '07', category: 'Closure', icon: <CheckCircle2 size={20} />, title: 'Ticket Resolution & Return to Bot', desc: 'Human agent resolves the query, logs notes in CRM, and optionally transfers the user back to the AI bot for a CSAT feedback survey.' }
    ],
    outcomesTitle: 'Quantifiable Customer Experience & Support Efficiency',
    outcomesSubtitle: 'Designed to maximize automation savings while maintaining high customer satisfaction on complex interactions.',
    outcomes: [
      { title: '100% Elimination of "Please Repeat Yourself" Friction', desc: 'Complete transcript and issue synthesis delivered to the human agent before greeting the customer.' },
      { title: '42% Faster Average Resolution Time (AHT)', desc: 'Pre-loaded AI issue briefings allow human agents to skip diagnostic Q&A and resolve customer tickets immediately.' },
      { title: '38% Increase in Net CSAT & Retention', desc: 'Customers appreciate fast AI answers for simple tasks and instant, graceful human support when things get complicated.' },
      { title: 'Zero Lost Escalations Across Channels', desc: 'Reliable queuing and omnichannel routing ensure customers are never disconnected during transfer.' }
    ],
    relatedLinks: [
      { url: '/services/ai-chatbots', text: 'AI Chatbots' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/voice-bot-assistant', text: 'Voice Bot Assistants' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    customFaqs: [
      { question: 'How does the AI determine the exact moment a conversation should be transferred to a human agent?', answer: 'The system uses a multi-layered detection matrix: (1) Explicit keyword recognition (e.g., "talk to human", "speak to an agent"), (2) Real-time sentiment analysis detecting customer frustration, urgency, or irritation, (3) Confidence score thresholds where the AI recognizes the query is outside approved documentation, and (4) Pre-set business rules (e.g., immediate escalation for refund requests over $500 or VIP enterprise accounts).' },
      { question: 'What information is presented to the human agent when an escalation occurs?', answer: 'When the human agent accepts the transfer, their unified console displays: (1) The full chronological conversation transcript, (2) An AI-generated 3-bullet executive summary highlighting the customer\'s core problem, (3) Customer CRM history, account tier, and past orders, and (4) Recommended resolution actions or knowledge base articles suggested by the AI Co-Pilot.' },
      { question: 'Does the customer have to repeat their issue after being transferred to a human agent?', answer: 'No, never. Because the entire conversation history and AI diagnostic summary are pre-loaded into the human agent\'s screen, the agent can greet the customer by name and immediately address their specific issue (e.g., "Hi Alex, I see you were asking about tracking order #4028. Let me check the carrier status for you right away.").' },
      { question: 'Can the system route escalations based on agent skills, department, or spoken language?', answer: 'Yes. Our intelligent routing engine allows you to configure skill-based, language-based, and VIP tier routing rules. For instance, billing inquiries can be routed directly to the finance team, while Spanish-speaking customers are routed to fluent bilingual support agents.' },
      { question: 'What happens if all human agents are busy or offline when an escalation is triggered?', answer: 'If human agents are unavailable, the system gracefully informs the customer of the estimated wait time, collects their preferred callback channel (WhatsApp, phone, or email), and logs an urgent prioritized ticket in your CRM so an agent can follow up the moment they are back online.' },
      { question: 'Can human agents transfer the customer back to the AI bot after resolving the issue?', answer: 'Yes. Once the human agent resolves the complex portion of the interaction, they can click "Return to AI", allowing the bot to send a customer satisfaction (CSAT) survey, share relevant documentation links, or close the ticket automatically.' }
    ],
    faqs: [
      { q: 'Do agents see what the AI discussed?', a: 'Yes. The entire AI conversation transcript is passed to the human agent’s interface before they even accept the chat or call, ensuring the customer never has to repeat themselves.' },
      { q: 'What happens if all human agents are offline?', a: 'The system gracefully informs the customer, collects their preferred callback method, and logs an urgent prioritized CRM ticket for immediate follow-up.' }
    ],
    contactEyebrow: 'ELEVATE CUSTOMER EXPERIENCE',
    contactTitle: 'Ready to Implement Zero-Friction AI to Human Handoff?',
    contactSubtitle: 'Schedule a technical demo to see our sentiment detection engine, unified agent console, and supervisor live telemetry in action.',
    contactChecklist: [
      'Real-Time NLP Frustration & Sentiment Triggers',
      'Zero-Context-Loss Executive Issue Synthesis',
      'Unified Omnichannel Agent Console',
      'Live Supervisor Whisper & Takeover Telemetry'
    ]
  },

  // Industries
  healthcare: {
    metaTitle: 'Healthcare CRM & Patient Automation Software | Gyan VaniAi',
    metaDescription: 'Healthcare CRM with appointment automation, patient portals, and WhatsApp reminders. Secure systems for clinics and hospitals by Gyan VaniAi.',
    h1: 'Healthcare CRM Solutions',
    subtitle: 'Patient management, appointment automation, and WhatsApp reminders, built with security and clinical workflows in mind.',
    overview: 'Gyan VaniAi builds healthcare CRM and patient engagement software for clinics and hospitals. Solutions include appointment scheduling, WhatsApp reminders, patient portals, and staff workflows designed around privacy and operational reliability.',
    whoFor: 'Clinics, diagnostic centers, and hospital groups that need fewer no-shows and clearer patient communication.',
    deliverables: ['Patient CRM & portals', 'Appointment automation', 'WhatsApp reminders', 'Staff role access', 'EMR/API integrations where required'],
    benefits: ['Patient Portals', 'Appointment Automation', 'Data Security', 'EMR Integration'],
    image: '/healthcare_hero_platform.jpg',
    imageAlt: 'Healthcare CRM system by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' }
    ],
    faqs: [
      { q: 'Can patients book and get reminders on WhatsApp?', a: 'Yes. We automate appointment confirmations, reminders, and follow-ups over official WhatsApp Business API.' }
    ]
  },
    education: {
    metaTitle: 'Education Software Development | SIS & Learning Portals | Gyan VaniAi',
    metaDescription: 'Custom education software: student information systems, learning portals, attendance, and parent communication for schools and EdTech. Automated WhatsApp fee collection.',
    heroEyebrow: 'EDTECH & INSTITUTIONAL CAMPUS CRM',
    h1: 'Education Software Development',
    subtitle: 'Empowering private schools, universities, coaching institutes, and EdTech startups with Student Information Systems (SIS), automated fee collection on WhatsApp, and academic portals.',
    overviewTitle: 'Unified Student Information Systems & Campus Automation',
    overview: 'Gyan VaniAi engineers tailor-made Student Information Systems (SIS), Learning Management Systems (LMS), and automated campus administration portals for K-12 private schools, colleges, test prep institutes, and EdTech ventures. By replacing disconnected spreadsheets and manual paperwork, our platforms centralize the entire academic journey: digital inquiry intake, student admissions, automated WhatsApp fee reminders with integrated payment gateway links, biometric and mobile attendance tracking, dynamic gradebook management, automated CBSE/ICSE report card compilation, and structured parent-teacher communication.',
    whoForTitle: 'Engineered for School Leaders and EdTech Innovators',
    whoFor: 'School principals, university administrative registrars, coaching institute directors, and EdTech founders who need to eliminate manual fee collection chasing, automate academic report cards, and deliver a frictionless digital portal for students and parents.',
    deliverablesTitle: 'Education Software Platform Deliverables',
    deliverables: [
      'Centralized Student Information System (SIS) & Permanent Academic Archives',
      'Digital Student Admissions & Online Application Inquiry Pipeline',
      'Automated WhatsApp Fee Payment Reminders, Receipts & Online Reconciliation',
      'Biometric & Teacher Mobile Attendance Tracking with Automated Absence Alerts',
      'Dynamic Gradebook, Examination Management & Multi-Board Report Card Engine',
      'Parent-Teacher Communication Portal & Official WhatsApp Broadcast Channel',
      'Faculty Workload Scheduler, Timetable Planner & Staff Leave Governance'
    ],
    benefits: [
      'Automated WhatsApp Fee Collection',
      'Multi-Board Digital Report Cards',
      'Instant Parent Absence Alerts',
      'Multi-Branch Campus Management'
    ],
    image: '/education_sis_hero.jpg',
    imageAlt: 'Education Software Development and Student Information System by Gyan VaniAi',
    capabilitiesTitle: 'Core Educational Institution Capabilities',
    capabilities: [
      { title: 'Complete Student Lifecycle Record', desc: 'Maintain permanent digital student records from initial prospective inquiry and admission through academic progression and alumni archives.' },
      { title: 'Zero-Friction WhatsApp Fee Collection', desc: 'Dispatches automated monthly or quarterly fee demand slips over WhatsApp with UPI/card payment links and instant digital receipt generation.' },
      { title: 'Automated Real-Time Absence Alerts', desc: 'When teachers mark attendance on their mobile device or biometric machines, parents of absent students receive an automated WhatsApp notification within minutes.' },
      { title: 'Custom Multi-Board Report Card Generator', desc: 'Generates customized, print-ready digital report cards compliant with CBSE, ICSE, Cambridge, or State Board grading frameworks with one click.' },
      { title: 'Multi-Campus Administrative Control', desc: 'Manage multiple school branches, academic divisions, or franchise coaching centers from a single master executive dashboard.' },
      { title: 'FERPA & DPDP Act Data Safeguards', desc: 'Protect sensitive minor and student academic records with role-based staff access controls, encrypted databases, and strict privacy compliance.' }
    ],
    workflowHeading: 'The Complete Student Academic & Campus Lifecycle',
    workflowSubtitle: 'From online inquiry and admissions enrollment to fee collection, attendance alerts, and final graduation.',
    engineBanner: {
      tag: 'CAMPUS AUTOMATION ENGINE',
      title: 'End-to-End Institutional Education Pipeline',
      desc: 'Unify admissions, tuition fee billing, academic grading, and parent messaging into a single automated administrative system.'
    },
    customSteps: [
      { stepNum: '01', category: 'Inquiry', icon: <UserPlus size={20} />, title: 'Online Admission Inquiry', desc: 'Prospective parents or students submit inquiry forms via the institution website or WhatsApp with automated counselor assignment.' },
      { stepNum: '02', category: 'Registration', icon: <FileText size={20} />, title: 'Document Upload & Seat Booking', desc: 'Applicants upload birth certificates, past transcripts, and photographs into a digital portal with online registration fee collection.' },
      { stepNum: '03', category: 'Enrollment', icon: <GraduationCap size={20} />, title: 'Student Profile & Roll Provisioning', desc: 'Automated generation of student roll numbers, section allocations, digital ID cards, and parent portal credentials.' },
      { stepNum: '04', category: 'Attendance', icon: <Clock size={20} />, title: 'Daily Attendance & Absence Dispatch', desc: 'Classroom mobile app or biometric attendance triggers instant WhatsApp absence notifications to parents of absent pupils.' },
      { stepNum: '05', category: 'Assessments', icon: <BrainCircuit size={20} />, title: 'Continuous Assessment & Grading', desc: 'Faculty enter term test scores, homework ratings, and qualitative behavioral remarks into a unified digital gradebook.' },
      { stepNum: '06', category: 'Fee Billing', icon: <CheckCircle2 size={20} />, title: 'Automated Fee Reminders & Payments', desc: 'Quarterly tuition fee notices dispatched via WhatsApp; payments settle automatically into the school bank ledger with instant digital receipts.' },
      { stepNum: '07', category: 'Promotion', icon: <Trophy size={20} />, title: 'Batch Report Cards & Year-End Promotion', desc: 'One-click batch generation of branded PDF report cards and seamless academic promotion to the next school year.' }
    ],
    outcomesTitle: 'Proven Institutional Efficiency & Parent Trust',
    outcomesSubtitle: 'Designed to recover delayed tuition fees, eliminate paper grading drudgery, and foster strong parent engagement.',
    outcomes: [
      { title: '92% On-Time Tuition Fee Collection', desc: 'Automated WhatsApp payment alerts with direct UPI links eliminate awkward manual fee reminder calls.' },
      { title: '70% Reduction in Report Card Admin Hours', desc: 'Batch compute percentiles, GPA, and teacher remarks, generating hundreds of formatted report cards in minutes.' },
      { title: '100% Elimination of Manual Absence Calling', desc: 'Automated morning WhatsApp alerts immediately notify parents if a student misses morning roll call.' },
      { title: 'Unified Governance Across Multiple Campuses', desc: 'School trust trustees and founders gain instant visibility into enrollment, fee collections, and staff attendance across all branches.' }
    ],
    relatedLinks: [
      { url: '/services/web-development', text: 'Web Development' },
      { url: '/services/mobile-app-development', text: 'Mobile Apps' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/crm-development', text: 'Custom CRM Development' }
    ],
    customFaqs: [
      { question: 'Can the education software integrate with our existing biometric attendance machines?', answer: 'Yes. Our attendance module connects via local LAN/cloud APIs to major biometric fingerprint and facial recognition attendance terminals (such as eSSL, Matrix, and ZKTeco), automatically syncing pupil and staff attendance records in real time.' },
      { question: 'How does automated tuition fee collection work over WhatsApp for schools?', answer: 'On designated billing dates, the system automatically sends a personalized WhatsApp message to parents with a breakdown of tuition fees, transport charges, and late dues, accompanied by a secure 1-click UPI/netbanking payment link. Upon successful payment, a digital school receipt is instantly generated and delivered on WhatsApp.' },
      { question: 'Can the software generate custom report cards compliant with CBSE, ICSE, or State board standards?', answer: 'Yes. Our examination engine supports customizable grading rules, subject weighting, scholastic and co-scholastic matrices, attendance percentages, and principal remarks tailored to CBSE (Continuous and Comprehensive Evaluation), ICSE, IB, or state education guidelines.' },
      { question: 'Does the portal support multiple branches or franchises of an education group?', answer: 'Yes. The software features multi-tier tenant architecture. You can administer multiple schools, colleges, or franchise coaching centers from a centralized master dashboard while providing each branch principal and staff isolated access to their respective campus data.' },
      { question: 'Can teachers access the gradebook and mark attendance from their smartphones?', answer: 'Yes. Teachers have a responsive, mobile-first teacher portal where they can take classroom attendance in under 30 seconds, enter test marks, assign homework tasks, and share circulars with parents without needing desktop computers.' },
      { question: 'How is student personal data and academic records protected?', answer: 'We implement bank-grade encryption at rest and in transit, role-based access control (preventing unauthorized staff from viewing financial or disciplinary records), daily automated database backups, and strict compliance with the Indian Digital Personal Data Protection (DPDP) Act 2023 and global student privacy standards.' }
    ],
    faqs: [
      { q: 'Do you build for schools and EdTech startups?', a: 'Yes. We deliver both institution systems (SIS, portals) and productized EdTech platforms.' },
      { q: 'Can parents pay school fees directly on WhatsApp?', a: 'Yes. Parents receive automated fee notices with direct UPI and payment gateway links on WhatsApp, generating instant digital receipts upon payment.' }
    ],
    contactEyebrow: 'MODERNIZE YOUR CAMPUS',
    contactTitle: 'Ready to Digitize Your School or College Operations?',
    contactSubtitle: 'Schedule an interactive demonstration to explore our Student Information System, WhatsApp fee collection, and report card generator.',
    contactChecklist: [
      'Automated WhatsApp Fee Billing & Receipts',
      'Biometric & Mobile Daily Attendance Sync',
      'Custom CBSE / ICSE Report Card Generator',
      'Multi-Campus Master Executive Dashboard'
    ]
  },
  finance: {
    metaTitle: 'Financial Software Development | FinTech & ERP | Gyan VaniAi',
    metaDescription: 'Secure financial software development for FinTech platforms, reporting, and ERP. Compliance-aware architecture by Gyan VaniAi.',
    h1: 'Financial Software Development',
    subtitle: 'Secure, high-performance software for finance teams and FinTech products: analytics, workflows, and ERP modules.',
    overview: 'Gyan VaniAi builds financial and FinTech software with security-first architecture: transaction workflows, reporting dashboards, customer portals, and ERP finance modules designed for auditability and scale.',
    whoFor: 'FinTech startups, lenders, and finance departments that need custom systems with strong access control and reporting.',
    deliverables: ['Secure web/mobile apps', 'Reporting dashboards', 'Workflow automation', 'ERP finance modules', 'API integrations'],
    benefits: ['High Security', 'Regulatory Compliance', 'Real-time Analytics', 'Custom ERP'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Financial software development dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/erp-development', text: 'ERP Development' },
      { url: '/services/ai-development', text: 'AI Development' }
    ],
    faqs: [
      { q: 'How do you approach security in finance apps?', a: 'We use role-based access, encryption in transit, audit logs, and architecture patterns suited to regulated financial workflows.' }
    ]
  },
    manufacturing: {
    metaTitle: 'Manufacturing Software & ERP Solutions | MES & Shop-Floor Telemetry | Gyan VaniAi',
    metaDescription: 'Manufacturing ERP and execution software (MES) for multi-level BOMs, shop-floor job cards, OEE machine telemetry, and lot traceability. Custom systems by Gyan VaniAi.',
    heroEyebrow: 'MANUFACTURING EXECUTION & OPERATIONS',
    h1: 'Manufacturing Software Solutions',
    subtitle: 'Empowering discrete and process manufacturers with real-time shop-floor execution (MES), multi-level Bill of Materials (BOM), machine OEE telemetry, and lot traceability.',
    overviewTitle: 'Digitize Shop-Floor Operations, Machine Telemetry & Production Scheduling',
    overview: 'Gyan VaniAi delivers specialized Manufacturing Execution Systems (MES) and industrial ERP software designed for plant managers, production heads, and industrial operations directors. We bridge the critical gap between plant machinery, shop-floor workers, and executive planning. Our solutions eliminate paper job cards, resolve production scheduling bottlenecks, track machine downtime (Overall Equipment Effectiveness - OEE), automate raw material reordering to prevent assembly halts, and provide end-to-end lot and batch traceability from raw material receipt to finished goods dispatch.',
    whoForTitle: 'Engineered for Plant Managers and Industrial Operators',
    whoFor: 'Discrete manufacturers, automotive component makers, precision machine shops, chemical and plastic processing units, and industrial fabricators looking to digitize shop-floor execution, optimize machine utilization, and maintain audit-proof quality compliance.',
    deliverablesTitle: 'Manufacturing Software Platform Deliverables',
    deliverables: [
      'Multi-Level Bill of Materials (BOM) & Formula/Recipe Engineering',
      'Master Production Scheduling & Work Order Routing (MRP II)',
      'Shop-Floor Digital Job Card Tracking with Touchscreen Terminals',
      'Machine Downtime & Overall Equipment Effectiveness (OEE) Telemetry',
      'Raw Material Stockout Prevention & Just-In-Time (JIT) Procurement Triggers',
      'Lot / Batch Traceability with Barcode & QR Serialization',
      'Quality Control (QC) Gates for Inward, In-Process, and Final Inspection'
    ],
    benefits: [
      'Real-Time Machine OEE Telemetry',
      'Multi-Level BOM Explosion',
      'End-to-End Lot Traceability',
      'Zero Paper Shop-Floor Job Cards'
    ],
    image: '/manufacturing_mes_hero.jpg',
    imageAlt: 'Manufacturing Software and Shop Floor Execution System Dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core Manufacturing & Shop-Floor Capabilities',
    capabilities: [
      { title: 'Dynamic Capacity & Work Center Routing', desc: 'Balance work orders dynamically against available machine centers, tooling capacity, and operator work shifts to avoid production bottlenecks.' },
      { title: 'Multi-Level BOM & Scrap Accounting', desc: 'Manage complex multi-tier assemblies and track scrap percentages at each production stage for precise unit cost accounting.' },
      { title: 'Live Shop-Floor Operator Terminals', desc: 'Intuitive tablet and ruggedized touchscreen interfaces allowing machine operators to log cycle times, unit counts, and downtime causes in real time.' },
      { title: 'End-to-End Batch Traceability', desc: 'Instantly trace every finished product back to specific raw material heat numbers, vendor batches, machine operators, and inspection timestamps.' },
      { title: 'Quality Inspection Gateways', desc: 'Enforce mandatory tolerance measurements and visual inspection checklists before intermediate parts can advance to the next workstation.' },
      { title: 'Preventive Machine Maintenance', desc: 'Monitor runtime hours and cycle counts to trigger predictive maintenance tasks before equipment breakdowns cause costly unplanned halts.' }
    ],
    workflowHeading: 'The Complete Industrial Production Lifecycle',
    workflowSubtitle: 'From sales order BOM explosion to shop-floor machining, quality verification, and finished goods warehousing.',
    engineBanner: {
      tag: 'MANUFACTURING EXECUTION SYSTEM',
      title: 'Connected Shop-Floor & Production Engine',
      desc: 'Link machine telemetry, operator job cards, raw material inventory, and quality assurance into one live operational picture.'
    },
    customSteps: [
      { stepNum: '01', category: 'Order', icon: <FileText size={20} />, title: 'Sales Order & Production Schedule', desc: 'Customer purchase orders automatically generate master production schedules and forecast completion timelines.' },
      { stepNum: '02', category: 'BOM', icon: <Boxes size={20} />, title: 'Multi-Level BOM Explosion', desc: 'System explodes the multi-tier Bill of Materials, calculating exact raw material, sub-assembly, and hardware needs against warehouse stock.' },
      { stepNum: '03', category: 'Routing', icon: <Workflow size={20} />, title: 'Work Order Routing & Scheduling', desc: 'Jobs are dispatched to specific machine centers, stamping presses, and CNC routers based on live shift capacity.' },
      { stepNum: '04', category: 'Execution', icon: <Factory size={20} />, title: 'Shop-Floor Job Card Execution', desc: 'Machine operators log production runs, cycle durations, and downtime reasons via rugged touchscreen stations.' },
      { stepNum: '05', category: 'QC Gate', icon: <CheckCircle2 size={20} />, title: 'In-Process Quality Inspection', desc: 'Quality control technicians record dimensional measurements against technical drawings with automatic go/no-go tolerances.' },
      { stepNum: '06', category: 'Serialization', icon: <Database size={20} />, title: 'Finished Goods Serialization', desc: 'Approved units receive unique serialized barcode/QR labels linking them back to specific raw material heat batches.' },
      { stepNum: '07', category: 'Dispatch', icon: <Truck size={20} />, title: 'Warehouse Transfer & Invoicing', desc: 'Completed pallets transfer to finished goods inventory, updating stock availability and generating customer dispatch manifests.' }
    ],
    outcomesTitle: 'Proven Manufacturing Productivity & Plant Efficiency',
    outcomesSubtitle: 'Designed to maximize shop-floor throughput, eliminate raw material wastage, and maintain spotless compliance during customer quality audits.',
    outcomes: [
      { title: '22% Higher Machine OEE', desc: 'Identify and resolve micro-stoppages and unrecorded machine changeover times with live telemetry.' },
      { title: '35% Reduction in Unplanned Downtime', desc: 'Predictive maintenance triggers based on runtime hours prevent unexpected tooling and motor failures.' },
      { title: '99.8% Lot Traceability Audit Compliance', desc: 'Produce comprehensive batch genealogy reports in seconds during ISO, IATF, and customer quality audits.' },
      { title: '18% Savings in Raw Material Scrap Costs', desc: 'Real-time scrap logging and variance tracking empower plant supervisors to address fabrication defects immediately.' }
    ],
    relatedLinks: [
      { url: '/services/erp-development', text: 'Custom ERP Development' },
      { url: '/services/ai-agent-development', text: 'AI Agents for Ops' },
      { url: '/industries/logistics', text: 'Logistics Software Solutions' }
    ],
    customFaqs: [
      { question: 'What is the distinction between a Manufacturing Execution System (MES) and standard ERP software?', answer: 'Standard ERP software handles high-level administrative tasks such as accounting, payroll, and purchase orders on monthly or quarterly cycles. A Manufacturing Execution System (MES) operates in real time on the factory floor, monitoring active machine runs, tracking job cards minute by minute, enforcing quality checkpoints, and providing live visibility into assembly operations.' },
      { question: 'Can the manufacturing software handle complex, multi-level Bills of Materials (BOM)?', answer: 'Yes. The system natively supports multi-tier hierarchical BOMs with sub-assemblies, raw material scrap allowances, optional substitute components, and revision history tracking, ensuring engineering changes propagate instantly to active work orders.' },
      { question: 'How do shop-floor workers interact with the system without computer literacy challenges?', answer: 'We design intuitive, visual touchscreen interfaces and tablet layouts with oversized buttons, multilingual labels, and barcode scanner integration. Operators simply scan job card barcodes and tap presets to report completed units, downtime causes, or scrap.' },
      { question: 'Does the software support lot and batch tracking for ISO and customer quality audits?', answer: 'Yes. Every work order generates serialized lot tags that record the raw material heat numbers, machine operator IDs, workstation numbers, and quality inspection sign-offs, enabling instant forward and backward traceability.' },
      { question: 'Can the software track sub-contracting and job-work processes sent to outside vendors?', answer: 'Yes. The system features a dedicated job-work module that creates outward challans for external operations (e.g., heat treatment, electroplating, powder coating), tracks vendor turnaround times, and verifies inward quality before parts re-enter assembly.' },
      { question: 'Can our manufacturing software connect directly to PLCs or weighing scales?', answer: 'Yes. We develop edge connectors and IoT gateway integrations using Modbus, OPC-UA, MQTT, and RS-232 serial protocols to ingest real-time cycle counts, temperature telemetry, and scale weights directly from industrial equipment.' }
    ],
    faqs: [
      { q: 'Can you connect machines or warehouse systems?', a: 'Yes. We integrate via APIs and connectors to warehouse, barcode, and existing ERP tools where available.' },
      { q: 'Does the software support lot and batch tracking for ISO audits?', a: 'Yes. Every work order generates serialized lot tags that track raw material heats, operator IDs, and inspection sign-offs.' }
    ],
    contactEyebrow: 'OPTIMIZE FACTORY OPERATIONS',
    contactTitle: 'Ready to Digitize Your Manufacturing Plant?',
    contactSubtitle: 'Book a technical call with our industrial software engineers to discuss machine OEE telemetry, BOM management, and shop-floor digitization.',
    contactChecklist: [
      'Multi-Level BOM & Scrap Accounting',
      'Live Machine OEE & Downtime Telemetry',
      'Digital Shop-Floor Job Card Terminals',
      'End-to-End Lot & Batch Traceability'
    ]
  },
  enterprise: {
    metaTitle: 'Enterprise CRM Software | Scalable Organization Platform | Gyan VaniAi',
    metaDescription: 'Scalable Enterprise CRM software for large organizations: centralize customer data, multi-team workflows, role-based governance, and business integrations.',
    heroEyebrow: 'ENTERPRISE CRM',
    h1: 'Enterprise CRM Solutions',
    subtitle: 'Scalable CRM infrastructure for large organizations to manage customers, teams, workflows, and revenue operations from one connected platform.',
    overviewLabel: '01 OVERVIEW',
    overviewTitle: 'Connected Enterprise CRM',
    overview: 'Centralize customer data, account activity, sales operations, support workflows, and team collaboration in one scalable CRM environment.',
    whoForLabel: "02 WHO IT'S FOR",
    whoForTitle: 'Built for Growing Organizations',
    whoFor: 'Designed for enterprises managing multiple teams, business units, customer accounts, complex workflows, and large volumes of CRM data.',
    deliverablesLabel: '03 WHAT YOU GET',
    deliverablesTitle: 'Enterprise-Ready Operations',
    deliverables: [
      'Centralized Customer Data',
      'Role-Based Access',
      'Workflow Automation',
      'Custom Integrations'
    ],
    benefits: [
      'Scalable CRM Architecture',
      'Custom Workflow Automation',
      'Multi-Team Collaboration',
      'Enterprise Integrations'
    ],
    ctaButtonText: 'Get Free Consultation',
    image: '/gyan_vaniai_crm_hero.webp',
    imageAlt: 'Enterprise CRM multi-team operations, account hierarchy, and customer management dashboard by Gyan VaniAi',
    workflowHeading: 'How Enterprise CRM Operations Work',
    workflowSubtitle: 'Connect customer data, teams, workflows, and business systems through one centralized CRM platform.',
    engineBanner: {
      tag: 'ENTERPRISE CRM WORKFLOW',
      title: 'Centralized Enterprise Operations Engine',
      desc: 'Connect customer data, teams, workflows, and business systems through one centralized CRM platform.'
    },
    customSteps: [
      { stepNum: '01', category: 'Customer Data', icon: <Database size={20} />, title: 'Customer Data Centralization', desc: 'Centralize customer and account information from across departments into a unified source of truth.' },
      { stepNum: '02', category: 'Accounts', icon: <Building2 size={20} />, title: 'Account Management', desc: 'Manage organizations, contacts, opportunities, and multi-tier relationship hierarchies.' },
      { stepNum: '03', category: 'Teams', icon: <Users size={20} />, title: 'Team Collaboration', desc: 'Coordinate sales, support, operations, and account teams in shared workspaces.' },
      { stepNum: '04', category: 'Automation', icon: <Zap size={20} />, title: 'Workflow Automation', desc: 'Automate repetitive business processes, multi-stage approvals, and operational handoffs.' },
      { stepNum: '05', category: 'Connectors', icon: <Layers size={20} />, title: 'Business Integrations', desc: 'Connect CRM data with external business systems, ERPs, APIs, and communication channels.' },
      { stepNum: '06', category: 'Analytics', icon: <BarChart3 size={20} />, title: 'Operational Analytics', desc: 'Track pipeline health, customer activity, team performance, and operational metrics.' },
      { stepNum: '07', category: 'Governance', icon: <ShieldCheck size={20} />, title: 'Governance & Access Control', desc: 'Apply roles, permissions, tenant controls, and operational policies.' },
      { stepNum: '08', category: 'Success', icon: <Trophy size={20} />, title: 'Customer Success Operations', desc: 'Create a consistent, high-touch customer experience across the organization.' }
    ],
    capabilitiesEyebrow: 'ENTERPRISE CAPABILITIES',
    capabilitiesTitle: 'Built Around How Enterprise Teams Work',
    capabilities: [
      { title: 'Centralized Customer Data', desc: 'Maintain a unified view of accounts, contacts, activities, and customer relationships.' },
      { title: 'Role-Based Access', desc: 'Control access and responsibilities across enterprise teams and organizational roles.' },
      { title: 'Workflow Automation', desc: 'Automate repetitive processes, approvals, assignments, and operational tasks.' },
      { title: 'Multi-Team Collaboration', desc: 'Connect sales, support, operations, and management through shared CRM workflows.' },
      { title: 'Business Integrations', desc: 'Connect CRM operations with external systems, APIs, communication channels, and business tools.' },
      { title: 'Analytics & Visibility', desc: 'Give teams and leadership a clearer view of customers, operations, and business performance.' }
    ],
    outcomesEyebrow: 'WHY ENTERPRISE TEAMS USE CRM',
    outcomesTitle: 'Create One Operational View of the Customer',
    outcomesSubtitle: 'Unify operations, standardize team processes, and gain clearer visibility into customer relationships.',
    outcomes: [
      { title: 'Centralized Customer Data', desc: 'One connected source of customer information across all touchpoints and departments.' },
      { title: 'Operational Consistency', desc: 'Standardize processes, deal stages, and customer communication across teams and business units.' },
      { title: 'Scalable Workflows', desc: 'Support growing teams, expanding customer accounts, and increasingly complex operations.' },
      { title: 'Better Visibility', desc: 'Give teams and leadership clearer operational insight into pipeline, activity, and customer health.' }
    ],
    customFaqs: [
      { question: 'How does an Enterprise CRM support large organizations?', answer: 'An enterprise CRM provides the scalability, data architecture, and multi-departmental workflow support required to manage thousands of customer accounts, diverse team roles, and high-volume business operations from a single unified platform.' },
      { question: 'Can the CRM support multiple teams and business units?', answer: 'Yes. The platform supports multi-team hierarchies, departmental workspaces, and customized pipeline views tailored to sales, customer success, support, and operations.' },
      { question: 'Can enterprise workflows be customized?', answer: 'Every workflow—from multi-tier deal approvals and SLA escalations to automated notifications and stage transitions—is custom-architected to match your organization\'s exact business logic.' },
      { question: 'How are roles and permissions managed?', answer: 'Granular role-based access control (RBAC) allows administrators to define view/edit permissions, team hierarchies, department boundaries, and audit logging to protect sensitive business data.' },
      { question: 'Can the CRM integrate with existing business systems?', answer: 'Yes. Our enterprise CRM is built with an API-first architecture, enabling seamless bidirectional integration with ERP systems, accounting software, custom databases, webhooks, and communication channels.' },
      { question: 'Can customer data and account activity be centralized?', answer: 'Yes. All customer touchpoints—emails, WhatsApp conversations, notes, support tickets, proposals, and call logs—are consolidated into a single unified timeline for every account.' },
      { question: 'Can enterprise CRM workflows be automated?', answer: 'Yes. You can automate repetitive tasks, cross-department handoffs, follow-up sequences, SLA triggers, and record updates while maintaining human approval checkpoints where needed.' },
      { question: 'Can the platform scale as the organization grows?', answer: 'The system is built on scalable, modular cloud architecture designed to handle expanding team headcount, increasing data volume, and additional business units without performance degradation.' }
    ],
    faqs: [
      { q: 'How does an Enterprise CRM support large organizations?', a: 'An enterprise CRM provides the scalability, data architecture, and multi-departmental workflow support required to manage thousands of customer accounts, diverse team roles, and high-volume business operations from a single unified platform.' },
      { q: 'Can the CRM support multiple teams and business units?', a: 'Yes. The platform supports multi-team hierarchies, departmental workspaces, and customized pipeline views tailored to sales, customer success, support, and operations.' },
      { q: 'Can enterprise workflows be customized?', a: 'Every workflow—from multi-tier deal approvals and SLA escalations to automated notifications and stage transitions—is custom-architected to match your organization\'s exact business logic.' },
      { q: 'How are roles and permissions managed?', a: 'Granular role-based access control (RBAC) allows administrators to define view/edit permissions, team hierarchies, department boundaries, and audit logging to protect sensitive business data.' },
      { q: 'Can the CRM integrate with existing business systems?', a: 'Yes. Our enterprise CRM is built with an API-first architecture, enabling seamless bidirectional integration with ERP systems, accounting software, custom databases, webhooks, and communication channels.' },
      { q: 'Can customer data and account activity be centralized?', a: 'Yes. All customer touchpoints—emails, WhatsApp conversations, notes, support tickets, proposals, and call logs—are consolidated into a single unified timeline for every account.' },
      { q: 'Can enterprise CRM workflows be automated?', a: 'Yes. You can automate repetitive tasks, cross-department handoffs, follow-up sequences, SLA triggers, and record updates while maintaining human approval checkpoints where needed.' },
      { q: 'Can the platform scale as the organization grows?', a: 'The system is built on scalable, modular cloud architecture designed to handle expanding team headcount, increasing data volume, and additional business units without performance degradation.' }
    ],
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development', icon: '/service-crm-development.webp' },
      { url: '/services/sales-automation', text: 'Sales Automation', icon: '/service-sales-automation.webp' },
      { url: '/services/lead-management', text: 'Lead Management', icon: '/service-crm-development.webp' },
      { url: '/services/ai-agent-development', text: 'AI Agent Development', icon: '/service-ai-agent-development.webp' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence', icon: '/service-whatsapp-coexistence.webp' }
    ],
    contactEyebrow: 'BUILD FOR SCALE',
    contactTitle: 'Ready to Build Your Enterprise CRM?',
    contactSubtitle: 'Design a CRM environment around your teams, workflows, integrations, and customer operations.',
    contactChecklist: [
      'Custom CRM Architecture',
      'Enterprise Workflow Automation',
      'Multi-Team Operations',
      'Business System Integrations'
    ]
  },
  'real-estate': {
    metaTitle: 'Real Estate CRM & WhatsApp Lead Software | Gyan VaniAi',
    metaDescription: 'Real estate CRM with WhatsApp lead capture, property matching, and agent pipelines. Automate follow-ups and site-visit booking with Gyan VaniAi.',
    h1: 'Real Estate CRM Solutions',
    subtitle: 'Capture property leads on WhatsApp, assign agents, and automate follow-ups until the site visit is booked.',
    overview: 'Gyan VaniAi builds real estate CRM systems that centralize buyer/seller leads, property inventory, agent assignment, and WhatsApp communication. Automations reduce missed follow-ups and speed up site-visit conversions.',
    whoFor: 'Brokers, developers, and realty teams managing high lead volume across multiple projects and agents.',
    deliverables: ['Lead CRM & pipelines', 'WhatsApp automation', 'Property matching', 'Agent mobile workflows', 'Campaign broadcasts'],
    benefits: ['Lead Capture', 'Agent Assignment', 'WhatsApp Follow-ups', 'Visit Scheduling'],
    image: '/real_estate_hero_platform.jpg',
    imageAlt: 'Real estate CRM software by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence' }
    ],
    faqs: [
      { q: 'Can buyers inquire on WhatsApp and enter the CRM automatically?', a: 'Yes. Inbound WhatsApp messages can create or update leads and trigger assignment and drip sequences.' }
    ]
  },
  retail: {
    metaTitle: 'Retail CRM & WhatsApp Commerce Software | Gyan VaniAi',
    metaDescription: 'Retail CRM and WhatsApp commerce automation: catalogs, order updates, abandoned-cart recovery, and customer support for stores and D2C brands.',
    h1: 'Retail Software Solutions',
    subtitle: 'WhatsApp catalogs, order updates, and CRM for retailers who sell and support customers on messaging channels.',
    overview: 'Gyan VaniAi builds retail CRM and WhatsApp commerce workflows: product catalogs, order status updates, promotional broadcasts, and support inboxes that keep customers engaged after the first purchase.',
    whoFor: 'Retailers, D2C brands, and multi-store businesses selling through WhatsApp and online channels.',
    deliverables: ['Customer CRM', 'WhatsApp catalogs & broadcasts', 'Order notifications', 'Support inbox', 'Loyalty/offer workflows'],
    benefits: ['Catalog Messaging', 'Order Updates', 'Campaign Broadcasts', 'Shared Support Inbox'],
    image: '/retail_hero_platform.jpg',
    imageAlt: 'Retail WhatsApp CRM by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    faqs: [
      { q: 'Do you support WhatsApp product catalogs?', a: 'Yes. We integrate official catalog and interactive message features via the WhatsApp Business Platform.' }
    ]
  },
    logistics: {
    metaTitle: 'Logistics Software & Tracking Systems | Fleet Telematics & TMS | Gyan VaniAi',
    metaDescription: 'Logistics software for shipment tracking, dispatcher workflows, route optimization, and customer WhatsApp updates. Custom TMS systems by Gyan VaniAi.',
    heroEyebrow: 'LOGISTICS & FLEET TELEMATICS CRM',
    h1: 'Logistics Software Solutions',
    subtitle: 'Empowering 3PLs, freight forwarders, and interstate fleet operators with real-time GPS tracking, automated consignee WhatsApp alerts, dynamic vehicle routing, and digital Proof of Delivery.',
    overviewTitle: 'End-to-End Transportation Management & Automated Dispatcher Telematics',
    overview: 'Gyan VaniAi engineers specialized Transportation Management Systems (TMS), dispatcher command portals, and consignee delivery tracking automation for third-party logistics (3PL) providers, freight brokers, and commercial fleet owners. By integrating vehicle GPS hardware, driver mobile applications, dynamic multi-stop route optimization, and official WhatsApp Business tracking links, our software slashes fuel consumption, eliminates lost paperwork, cuts "Where is my shipment?" support inquiries, and provides real-time digital Proof of Delivery (e-POD) with photos and signatures.',
    whoForTitle: 'Engineered for Fleet Owners and Freight Forwarders',
    whoFor: 'Interstate freight carriers, 3PL logistics companies, express parcel couriers, cold chain transport operators, and industrial dispatch managers managing high-velocity commercial shipments and distributed vehicle fleets.',
    deliverablesTitle: 'Logistics Software Platform Deliverables',
    deliverables: [
      'Centralized Dispatcher Command Center & Live Fleet Telemetry Dashboard',
      'Automated Consignee WhatsApp Tracking Links & Milestone Alerts',
      'Driver Mobile Application with Offline Digital Proof of Delivery (e-POD)',
      'GPS Telematics & IoT Hardware Integration (Fuel sensors, temperature loggers)',
      'Dynamic Multi-Stop Vehicle Route Optimization & Load Balancing',
      'Lorry Receipt (LR / Bilty) Generator, Trip Expense Ledger & Driver Advances',
      'Corporate Consignor Self-Service Tracking & Freight Invoicing Portal'
    ],
    benefits: [
      'Live GPS Fleet Telemetry',
      'WhatsApp Milestone Tracking',
      'Paperless Digital POD (e-POD)',
      'Automated Freight Invoicing'
    ],
    image: '/logistics_tms_hero.jpg',
    imageAlt: 'Logistics Management Software and Fleet Tracking Telematics Dashboard by Gyan VaniAi',
    capabilitiesTitle: 'Core Transportation & Fleet Capabilities',
    capabilities: [
      { title: 'Live Fleet Command Center', desc: 'Real-time interactive map interface tracking vehicle speed, location, geofence breaches, and idle ignition times across hundreds of trucks simultaneously.' },
      { title: 'Automated WhatsApp Consignee Alerts', desc: 'Consignees receive automated WhatsApp updates when goods are picked up, in transit, out for delivery, and completed, eliminating manual status phone calls.' },
      { title: 'Digital Proof of Delivery (e-POD)', desc: 'Drivers capture recipient signatures, unloading photos, and exact GPS coordinates via mobile app, working even in low-connectivity rural zones.' },
      { title: 'Trip Expense & Diesel Advance Ledger', desc: 'Track driver trip advances, diesel fuel receipts, toll plaza fees, and vehicle maintenance costs to calculate net profitability per freight trip.' },
      { title: 'Dynamic Route Optimization Engine', desc: 'Calculate the most fuel-efficient delivery routes taking into account vehicle payload capacity, bridge weight limits, and customer delivery windows.' },
      { title: 'Compliance-Ready Lorry Receipt (LR) Generator', desc: 'Instantly generate compliant digital Lorry Receipts (LR/Bilty) with automated GST calculation, consignment barcodes, and driver manifests.' }
    ],
    workflowHeading: 'The Complete Freight Dispatch & Delivery Journey',
    workflowSubtitle: 'From initial consignment booking to vehicle load planning, in-transit telematics, and digital POD invoicing.',
    engineBanner: {
      tag: 'TRANSPORTATION MANAGEMENT SYSTEM',
      title: 'Connected Fleet Dispatch & Delivery Pipeline',
      desc: 'Coordinate consignors, dispatchers, truck drivers, and consignees with real-time GPS telematics and automated WhatsApp updates.'
    },
    customSteps: [
      { stepNum: '01', category: 'Booking', icon: <Boxes size={20} />, title: 'Consignment Booking & Manifesting', desc: 'Inward shipment orders captured via customer portal, ERP API, or manual entry with weight and cargo dimensions.' },
      { stepNum: '02', category: 'Routing', icon: <Workflow size={20} />, title: 'Vehicle Load & Route Optimization', desc: 'Algorithm clusters consignments by destination route, matching truck weight capacity and axle load limits.' },
      { stepNum: '03', category: 'Dispatch', icon: <FileText size={20} />, title: 'Digital Lorry Receipt (LR) & Trip Assignment', desc: 'System generates barcoded Lorry Receipts (LR / Bilty) and assigns the manifest directly to the driver mobile terminal.' },
      { stepNum: '04', category: 'Telematics', icon: <Truck size={20} />, title: 'Departure Geofence & Live Tracking', desc: 'As the truck crosses warehouse geofences, an automated WhatsApp tracking link is dispatched to consignor and consignee.' },
      { stepNum: '05', category: 'Transit', icon: <Clock size={20} />, title: 'In-Transit Milestone Monitoring', desc: 'GPS telematics monitor route adherence, unexpected halt durations, and cold chain temperature thresholds in real time.' },
      { stepNum: '06', category: 'Delivery', icon: <CheckCircle2 size={20} />, title: 'Unloading & Digital Proof of Delivery (e-POD)', desc: 'Driver collects receiver signature and uploads cargo condition photographs through the mobile app at the unloading dock.' },
      { stepNum: '07', category: 'Settlement', icon: <BarChart3 size={20} />, title: 'Instant Freight Invoicing & Driver Settlement', desc: 'Confirmed e-POD upload triggers automatic customer freight invoice generation and reconciles driver trip expense advances.' }
    ],
    outcomesTitle: 'Quantifiable Fleet Efficiency & Operational Margins',
    outcomesSubtitle: 'Designed to reduce fleet operating costs, stop customer status calls, and accelerate freight billing cash flow.',
    outcomes: [
      { title: '60% Fewer Inbound "Where Is My Order?" Calls', desc: 'Proactive WhatsApp tracking links with live maps answer customer delivery questions automatically.' },
      { title: '18% Fuel Savings via Dynamic Route Optimization', desc: 'Optimized routing and reduced empty backhaul miles substantially lower monthly diesel expenditure.' },
      { title: 'Instant Zero-Lag Customer Freight Invoicing', desc: 'Replace physical paper POD transit delays with instant digital e-POD uploads, accelerating billing cycles by weeks.' },
      { title: '99.2% Real-Time Fleet Visibility', desc: 'Dispatcher command center eliminates blind spots across interstate highways and remote logistics hubs.' }
    ],
    relatedLinks: [
      { url: '/services/erp-development', text: 'Custom ERP Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Updates' },
      { url: '/industries/manufacturing', text: 'Manufacturing Software Solutions' }
    ],
    customFaqs: [
      { question: 'Can the logistics software connect to our existing vehicle GPS trackers and IoT sensors?', answer: 'Yes. Our platform connects via standard APIs and telemetry protocols with major GPS hardware manufacturers (including Teltonika, Concox, and Fleetmatics) as well as fuel level sensors and cold-chain temperature data loggers.' },
      { question: 'How do customers track their consignments without having to download an application?', answer: 'Consignees receive an automated WhatsApp notification containing a secure, short tracking link. Clicking the link opens a responsive live mobile tracking map displaying truck location, estimated time of arrival (ETA), and shipment milestones with zero login or app installation required.' },
      { question: 'How does digital Proof of Delivery (e-POD) function in rural areas with poor cellular data connectivity?', answer: 'The driver mobile app is engineered with offline-first data caching. Drivers can record recipient digital signatures, take delivery photographs, and log GPS coordinates completely offline. The moment the phone reconnects to a cellular signal, the verified e-POD data synchronizes automatically with the central dispatch dashboard.' },
      { question: 'Can the software handle complex multi-stop pickup and multi-drop delivery trips?', answer: 'Yes. The route optimization engine supports dynamic multi-stop dispatching, allowing drivers to execute sequential drops while the system recalculates ETAs and dispatches automated WhatsApp arrival alerts to each subsequent consignee.' },
      { question: 'Does the software generate compliant Lorry Receipts (LR/Bilty) and loading manifests?', answer: 'Yes. You can generate legally compliant, printable or digital Lorry Receipts (LR/Bilty) with automated GST calculation, consignment barcodes, risk insurance clauses, and driver trip manifests in single-click batch operations.' },
      { question: 'Can we give corporate clients access to track their own enterprise freight shipments?', answer: 'Yes. The system includes a dedicated corporate consignor portal where enterprise clients can log in, view live GPS tracking for their contracted vehicles, download historical e-PODs, and view freight billing statements.' }
    ],
    faqs: [
      { q: 'Can customers get delivery updates on WhatsApp?', a: 'Yes. Status events can trigger automated WhatsApp templates for pickup, transit, and delivery.' },
      { q: 'How does digital Proof of Delivery (e-POD) work offline?', a: 'The driver mobile app stores photos and signatures offline in an encrypted database, automatically syncing when network connection is restored.' }
    ],
    contactEyebrow: 'OPTIMIZE FLEET OPERATIONS',
    contactTitle: 'Ready to Automate Your Logistics & Dispatch Operations?',
    contactSubtitle: 'Schedule a consultation to see our live dispatcher command center, WhatsApp consignee tracking, and digital e-POD app in action.',
    contactChecklist: [
      'Live GPS Fleet Command Center',
      'Automated Consignee WhatsApp Tracking Links',
      'Driver Mobile App with Offline Digital e-POD',
      'Dynamic Multi-Stop Route & Fuel Optimization'
    ]
  },
    hospitality: {
    metaTitle: 'Hospitality CRM & Booking Automation | Guest Experience Platform | Gyan VaniAi',
    metaDescription: 'Hospitality CRM for hotels and restaurants: reservations, WhatsApp booking confirmations, in-stay guest concierge, and automated Google/TripAdvisor reviews.',
    heroEyebrow: 'HOSPITALITY & GUEST INTELLIGENCE',
    h1: 'Hospitality Software Solutions',
    subtitle: 'Empower hotels, luxury resorts, and restaurant chains to drive direct bookings, automate 24/7 guest concierge over WhatsApp, and eliminate OTA commissions.',
    overviewTitle: 'Direct Booking Engine & Autonomous Guest Concierge',
    overview: 'Gyan VaniAi engineers tailor-made Hospitality CRM platforms and guest messaging automation systems designed to bypass expensive OTA intermediary commissions and elevate the guest stay journey. By establishing a unified operational bridge between your Property Management System (PMS) such as Opera, Cloudbeds, or Hotelogix and the official WhatsApp Business Platform, our system enables frictionless direct reservations, pre-arrival registration cards, contactless mobile check-in, real-time in-stay room service ordering, and automated post-stay reputation management.',
    whoForTitle: 'Engineered for Modern Hospitality Operators',
    whoFor: 'Boutique hotel collections, luxury eco-resorts, serviced apartment operators, multi-location fine dining restaurant groups, and banquet venue managers who demand lower OTA dependency, accelerated front-desk throughput, and higher direct repeat bookings.',
    deliverablesTitle: 'Hospitality CRM Platform Deliverables',
    deliverables: [
      'Direct WhatsApp Reservation & Dynamic Room Quotation Engine',
      'Real-Time Bidirectional Property Management System (PMS) Connector',
      'Autonomous In-Stay Guest Concierge (Room service, housekeeping, amenities)',
      'Contactless Mobile Pre-Arrival Check-In & Digital Registration Cards',
      'Table Booking & Banquet Inquiry Lead Management with Deposit Collection',
      'Automated Review Filtration Engine (Directing 5-star guests to Google/TripAdvisor)',
      'Guest Preference History & Personalized Repeat Stay Loyalty Campaigns'
    ],
    benefits: [
      'Direct Booking Boost (Cut OTA Fees)',
      'Instant 24/7 WhatsApp Concierge',
      'Contactless Digital Check-in',
      'Proactive Reputation Management'
    ],
    image: '/hospitality_crm_hero.jpg',
    imageAlt: 'Hospitality CRM and Guest Experience Automation Platform by Gyan VaniAi',
    capabilitiesTitle: 'Core Hospitality & Guest Experience Capabilities',
    capabilities: [
      { title: 'PMS & Channel Manager Sync', desc: 'Real-time synchronization with Opera, Cloudbeds, and channel managers ensures zero double-bookings and dynamic room rate updates.' },
      { title: 'Conversational WhatsApp Booking', desc: 'Travelers can browse room categories, check real-time availability, select dates, and complete secure advance deposits without leaving WhatsApp.' },
      { title: 'Contactless Digital Registration', desc: 'Send automated pre-arrival registration forms 24 hours prior to check-in, collecting guest ID proof and digital signatures to eliminate front-desk queues.' },
      { title: 'In-Stay AI Concierge', desc: 'Guests order food and beverages, request extra towels, ask for Wi-Fi credentials, or book spa appointments via automated NLP that notifies duty staff instantly.' },
      { title: 'F&B & Banquet Event Pipeline', desc: 'Centralize high-value banquet, wedding, and corporate dining inquiries into an organized pipeline with automated quote generation and milestone billing.' },
      { title: 'Review Recovery & Sentiment Routing', desc: 'Automated post-departure checkouts send a satisfaction survey. Positive feedback prompts instant Google Reviews; dissatisfied guests alert the GM for immediate service recovery.' }
    ],
    workflowHeading: 'The Modern Guest Experience & Direct Booking Lifecycle',
    workflowSubtitle: 'From initial room discovery to contactless stay and post-checkout loyalty engagement.',
    engineBanner: {
      tag: 'HOSPITALITY ORCHESTRATION ENGINE',
      title: 'Direct Reservation & Autonomous Guest Concierge Pipeline',
      desc: 'Unify PMS inventory, direct guest messaging, in-stay requests, and post-checkout review boosting into a single automated system.'
    },
    customSteps: [
      { stepNum: '01', category: 'Inquiry', icon: <Utensils size={20} />, title: 'Direct Guest Inquiry', desc: 'Prospective guests inquire via WhatsApp, website booking widget, or social campaign with travel dates and room requirements.' },
      { stepNum: '02', category: 'Inventory', icon: <Database size={20} />, title: 'Live PMS Inventory Check', desc: 'System queries the hotel PMS in real time to fetch live room availability, seasonal packages, and best available dynamic rates.' },
      { stepNum: '03', category: 'Booking', icon: <Calendar size={20} />, title: 'Direct Reservation & Deposit', desc: 'Guest selects room category and settles booking token via integrated secure payment gateway, instantly generating PMS reservation vouchers.' },
      { stepNum: '04', category: 'Pre-Arrival', icon: <UserCheck size={20} />, title: 'Digital Registration Card', desc: 'Automated WhatsApp reminder 24 hours before arrival collects government IDs, arrival times, and dietary preferences to bypass front-desk queues.' },
      { stepNum: '05', category: 'In-Stay', icon: <Bot size={20} />, title: 'Autonomous In-Stay Concierge', desc: 'Guests order dining, request housekeeping, or ask for local excursion advice via WhatsApp with automated routing to hotel operations.' },
      { stepNum: '06', category: 'Checkout', icon: <Clock size={20} />, title: 'Contactless Checkout & Folio', desc: 'Instant itemized invoice dispatch, digital room settlement, and automated concierge assistance for luggage and airport transfers.' },
      { stepNum: '07', category: 'Reputation', icon: <Star size={20} />, title: 'Reputation & Review Capture', desc: 'Intelligent sentiment scan directs delighted guests to Google Reviews or TripAdvisor, while escalating grievances privately to the General Manager.' }
    ],
    outcomesTitle: 'Measurable Hospitality ROI & Direct Revenue Growth',
    outcomesSubtitle: 'Engineered to reduce third-party booking commissions and transform first-time visitors into lifelong direct booking guests.',
    outcomes: [
      { title: '34% Increase in Direct Bookings', desc: 'Recapture high margins by converting lookers into bookers directly over WhatsApp, slashing OTA commission fees.' },
      { title: '90% Faster Concierge Turnaround', desc: 'Deliver sub-minute responses for common guest requests like room amenities, Wi-Fi info, and breakfast timings.' },
      { title: '4.2x Growth in 5-Star Online Reviews', desc: 'Systematically solicit verified reviews from satisfied guests at the peak of checkout delight.' },
      { title: 'Zero Front-Desk Check-In Delays', desc: 'Pre-arrival ID uploads and digital registration cards reduce physical front-desk processing to under 45 seconds.' }
    ],
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/industries/travel', text: 'Travel Agency CRM' }
    ],
    customFaqs: [
      { question: 'Can Gyan VaniAi Hospitality CRM integrate with our existing Property Management System (PMS)?', answer: 'Yes. Our platform connects bidirectionally via secure APIs with leading Property Management Systems including Oracle Hospitality Opera, Cloudbeds, Hotelogix, eZee Frontdesk, and Stayflexi, ensuring real-time room availability, rate plan parity, and instant reservation synchronization.' },
      { question: 'How does the WhatsApp direct booking engine operate without an OTA?', answer: 'Guests can initiate a booking directly via WhatsApp through a link on your website, Google Business profile, or social ads. The AI agent asks for their travel dates and guest count, displays rich image cards of available suites with live pricing, and sends a secure UPI/card checkout link to finalize the booking instantly.' },
      { question: 'Can guests order room service and request amenities over WhatsApp?', answer: 'Yes. We provide interactive WhatsApp catalog menus and natural language understanding. When a guest texts "Can I get two extra towels and room service coffee in room 402?", the system identifies the room, creates an operational task in the housekeeping/kitchen dashboard, and confirms the request to the guest with an estimated delivery time.' },
      { question: 'How does the system prevent negative reviews from appearing on public review sites?', answer: 'During checkout, the system automatically sends a private 1-to-5 star sentiment rating inquiry. If the guest gives 4 or 5 stars, they are greeted with a direct one-click link to your Google Business or TripAdvisor profile. If they rate 1 to 3 stars, their feedback is kept private and an urgent SMS/WhatsApp alert is sent to the hotel General Manager for immediate recovery.' },
      { question: 'Does the CRM manage table reservations and banquet hall inquiries?', answer: 'Yes. For hotel restaurants and event venues, the CRM maintains dedicated kanban pipelines for banquet bookings, wedding inquiries, and table reservations, complete with automated quotation generation, tasting schedule appointments, and advance deposit collection.' },
      { question: 'Can we broadcast promotional packages and seasonal festival offers to past guests?', answer: 'Yes. Using official Meta WhatsApp Business Cloud API with pre-approved marketing templates, you can broadcast seasonal holiday packages, monsoon offers, and loyalty discounts to opted-in guest databases with segmented personalization and zero risk of phone number banning.' }
    ],
    faqs: [
      { q: 'Can guests book or confirm via WhatsApp?', a: 'Yes. We automate booking confirmations, reminders, and upsell messages through official WhatsApp Business API.' },
      { q: 'Can Gyan VaniAi integrate with our existing PMS?', a: 'Yes. We integrate bidirectionally with Oracle Opera, Cloudbeds, Hotelogix, and major channel managers.' }
    ],
    contactEyebrow: 'SCALE DIRECT HOSPITALITY REVENUE',
    contactTitle: 'Ready to Automate Your Hotel or Restaurant CRM?',
    contactSubtitle: 'Schedule a technical walkthrough to see our PMS integration, WhatsApp direct booking engine, and autonomous guest concierge in action.',
    contactChecklist: [
      'Direct Booking WhatsApp Engine',
      'Bidirectional PMS Synchronization',
      'Autonomous Guest In-Stay Concierge',
      'Google & TripAdvisor Review Automation'
    ]
  },
  legal: {
    metaTitle: 'Legal Practice CRM & Case Management Software | Gyan VaniAi',
    metaDescription: 'Legal CRM for client intake, matter tracking, and privileged communication. Automate follow-ups, conflict checks, and document workflows for law firms.',
    h1: 'Legal Practice CRM & Case Management Software',
    subtitle: 'Streamline client intake, automate matter tracking pipelines, and ensure strict privilege confidentiality for modern law firms and legal advisors.',
    overview: 'Gyan VaniAi builds tailor-made Legal Practice CRM and Matter Management platforms engineered for high-velocity law practices, legal consultancies, and corporate counsel teams. Replace disjointed spreadsheets and cumbersome legacy tools with an intuitive, unified platform: digitized client intake, automated conflict-of-interest checks, milestone-based matter pipelines, court deadline calendaring, and encrypted WhatsApp/client portal communication.',
    whoFor: 'Boutique law firms, corporate legal departments, litigation practices, intellectual property consultancies, and independent legal counsels managing growing caseloads.',
    deliverables: [
      'Interactive Case Pipeline & Kanban Matter Boards',
      'Self-Service Client Intake Portals with Document Vaults',
      'Automated Conflict-of-Interest & KYC Screening',
      'Statutory Deadline & Court Hearing Calendar Alerts',
      'Privileged Communication Channel via Encrypted WhatsApp & Portals',
      'Billable Hours Telemetry, Retainer Balances & Invoicing Sync'
    ],
    benefits: [
      'Role-Based Privilege & 256-Bit Encryption',
      'Zero-Friction WhatsApp Client Intake',
      'Automated Hearing Reminders & Deadlines',
      'Transparent Matter Stages & Real-Time Telemetry'
    ],
    image: '/legal-crm-hero.webp',
    imageAlt: 'Gyan VaniAi Legal Practice CRM and Case Pipeline Dashboard',
    capabilitiesTitle: 'Core Legal CRM Capabilities',
    capabilities: [
      { title: 'Matter Stage Pipelines', desc: 'Custom kanban boards for intake, discovery, pre-trial preparation, settlement negotiations, and active litigation stages.' },
      { title: 'Privileged Document Repository', desc: 'Encrypted document vault with version control, automatic metadata tagging, and strict role-based access governance.' },
      { title: 'WhatsApp Legal Notices & Updates', desc: 'Automated, secure dispatch of upcoming hearing dates, fee invoices, and document sign-off requests via official WhatsApp API.' },
      { title: 'Statutory Deadline & Court Calendaring', desc: 'Automated rule-based computation of limitation periods, court filing deadlines, and sync with Google/Outlook calendars.' },
      { title: 'Time & Retainer Ledger', desc: 'One-click billable hour timers, trust accounting logs, and automated monthly retainer balance reports for clients.' },
      { title: 'Audit-Ready Compliance & Security', desc: 'Granular access logs documenting every matter view, document export, and client communication timestamp with 256-bit encryption.' }
    ],
    workflowHeading: 'The Lifecycle of a Legal Matter in Gyan VaniAi CRM',
    workflowSubtitle: 'From initial prospective inquiry to conflict verification, retainer signing, and case resolution.',
    customSteps: [
      { stepNum: '01', category: 'Intake', title: 'Digital Client Intake', desc: 'Prospective clients submit matter details and documents via encrypted intake portals or official WhatsApp.' },
      { stepNum: '02', category: 'Conflict', title: 'Conflict-of-Interest Verification', desc: 'Automated scans cross-check adverse parties against historical firm records to ensure ethical clearance.' },
      { stepNum: '03', category: 'Retainer', title: 'Engagement Letter & E-Sign', desc: 'Dispatch custom retainer agreements with instant e-signatures and digital retainer deposit collection.' },
      { stepNum: '04', category: 'Matter', title: 'Case Milestones & Discovery', desc: 'Associate attorneys collaborate on discovery tasks, evidence logs, and court hearing preparation.' },
      { stepNum: '05', category: 'Closure', title: 'Resolution & Audit Archive', desc: 'Automated final billing statement generation, trust account reconciliation, and secure encrypted archiving.' }
    ],
    outcomesTitle: 'Measurable Law Firm Productivity & Client Trust',
    outcomesSubtitle: 'Designed to free partners and associates from administrative drag so they can focus on winning cases.',
    outcomes: [
      { title: '80% Faster Client Intake', desc: 'Automated intake questionnaires and document checklists eliminate endless preliminary email exchanges.' },
      { title: 'Zero Missed Court Deadlines', desc: 'Automated multi-channel reminders (SMS, WhatsApp, Calendar) alert attorneys and clients ahead of crucial filings.' },
      { title: 'Complete Confidentiality', desc: 'Strict tenant isolation, role-based permissions, and immutable access audit trails protect attorney-client privilege.' },
      { title: '25% Higher Billable Capture', desc: 'Integrated activity and communication timers ensure all consultation and drafting time is accurately recorded.' }
    ],
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/web-development', text: 'Secure Web Portals' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Client Updates' }
    ],
    customFaqs: [
      { question: 'Is Gyan VaniAi Legal CRM compliant with client confidentiality and privilege standards?', answer: 'Yes. We architect every legal CRM with end-to-end 256-bit encryption at rest and in transit, strict role-based access controls, tenant isolation, and detailed immutable audit logs to protect attorney-client privilege.' },
      { question: 'Can clients submit case details and documents via WhatsApp?', answer: 'Yes. Clients can initiate inquiries, receive appointment reminders, and safely submit PDF documents, contracts, or identification proof through official WhatsApp Business API integrated with your CRM repository.' },
      { question: 'Does the CRM perform automated conflict-of-interest checks?', answer: 'Yes. When a new prospect or opposing party is entered, the system searches existing matters, contacts, and adverse party databases to flag potential ethical conflicts immediately.' },
      { question: 'Can the system handle trust accounting and retainer billing?', answer: 'Yes. The platform tracks billable hours by attorney or paralegal, maintains separate trust/operating account ledgers, and generates itemized legal invoices compliant with standard accounting practices.' },
      { question: 'Can we migrate our existing matters from legacy systems or spreadsheets?', answer: 'Yes. We provide complete data migration services, securely importing your historical matters, contacts, active documents, and notes into your modern Gyan VaniAi Legal CRM.' }
    ]
  },
    travel: {
    metaTitle: 'Travel Agency CRM & Booking Automation | Tour Operator System | Gyan VaniAi',
    metaDescription: 'Travel CRM with itinerary workflows, WhatsApp booking updates, milestone payments, and lead automation for agencies, DMCs, and tour operators.',
    heroEyebrow: 'TRAVEL & TOUR OPERATOR CRM',
    h1: 'Travel Software Solutions',
    subtitle: 'Empower tour operators, travel agencies, and DMCs to capture high-intent trip leads, generate branded day-wise itineraries, and automate payment milestones over WhatsApp.',
    overviewTitle: 'End-to-End Travel Lead Management & Automated Itinerary Workflows',
    overview: 'Gyan VaniAi engineers specialized Travel Agency CRM and tour booking automation systems tailored for outbound tour operators, destination management companies (DMCs), and boutique travel curators. Consolidate travel leads from Google Search, Meta ads, and website inquiries into a central booking pipeline. Our software automates dynamic day-by-day itinerary creation, supplier cost calculation, multi-currency quotations, staggered milestone payment collection (token, 50% deposit, departure balance) via WhatsApp, and encrypted traveler passport/visa document storage.',
    whoForTitle: 'Engineered for Modern Travel Curators',
    whoFor: 'Outbound holiday planners, inbound destination management companies (DMCs), corporate travel desks, luxury experiential tour operators, and visa consultancies managing customized FIT and group travel itineraries.',
    deliverablesTitle: 'Travel CRM Platform Deliverables',
    deliverables: [
      'Omnichannel Travel Lead Ingestion (Google, Meta Ads, Website, WhatsApp)',
      'Interactive Web & Dynamic PDF Day-by-Day Itinerary Builder',
      'Automated WhatsApp Milestone Payment Reminder Engine',
      'Secure Traveler Document Vault (Passports, Visas, Flight Tickets)',
      'Supplier & Vendor Costing Ledger (Hoteliers, Transporters, Local Guides)',
      'Pre-Departure Flight Status Telemetry & Automated Destination Briefings',
      'Post-Tour Travel Review & Photo Referral Marketing Sequences'
    ],
    benefits: [
      'Instant Itinerary Assembly',
      'WhatsApp Milestone Billing',
      'Centralized Passport Vault',
      'Supplier Costing Ledger'
    ],
    image: '/travel_crm_hero.jpg',
    imageAlt: 'Travel Agency CRM and Itinerary Booking Platform by Gyan VaniAi',
    capabilitiesTitle: 'Core Travel CRM & Tour Operator Capabilities',
    capabilities: [
      { title: 'Lead-to-Itinerary Pipeline', desc: 'Organize trip leads into visual stages: New Inquiry, Itinerary Shared, Negotiation, Deposit Received, Vouchers Dispatched, and In-Transit.' },
      { title: 'Dynamic Itinerary Generator', desc: 'Create visually stunning day-by-day itineraries with destination photos, hotel star ratings, transfer details, and meal plans in minutes.' },
      { title: 'Automated Payment Milestones', desc: 'Dispatches automated WhatsApp payment links for initial token, mid-trip balance, and final settlement before flight voucher issuance.' },
      { title: 'Supplier & Net Margin Engine', desc: 'Compute exact markup margins by tracking net rates from local DMCs, ground transport operators, and airline consolidators.' },
      { title: 'Encrypted Traveler Document Vault', desc: 'Travelers securely upload passport scans, visa approvals, and vaccination records into an encrypted portal with automated expiration checks.' },
      { title: 'In-Transit Emergency Broadcasts', desc: 'Broadcast real-time flight rescheduling alerts, weather advisories, and 24/7 emergency concierge contact details to active tour batches.' }
    ],
    workflowHeading: 'The Complete Traveler Journey & Booking Lifecycle',
    workflowSubtitle: 'From prospect holiday inquiry to itinerary generation, payment collection, and in-transit traveler support.',
    engineBanner: {
      tag: 'TRAVEL PIPELINE ORCHESTRATION',
      title: 'Automated Tour Lead to Departure Engine',
      desc: 'Accelerate inquiry response, automate quotation creation, and ensure zero missed payment deadlines across all holiday bookings.'
    },
    customSteps: [
      { stepNum: '01', category: 'Capture', icon: <Plane size={20} />, title: 'Inbound Trip Intake', desc: 'Prospective travelers submit destination, dates, traveler count, and hotel category preferences via web forms or WhatsApp.' },
      { stepNum: '02', category: 'Costing', icon: <Sliders size={20} />, title: 'Supplier Costing & Assembly', desc: 'Agency selects verified local hotels, transfers, and excursions to calculate net rates, commission markups, and taxes.' },
      { stepNum: '03', category: 'Itinerary', icon: <FileText size={20} />, title: 'Interactive Itinerary Dispatch', desc: 'Client receives a mobile-optimized day-by-day itinerary link and PDF brochure directly on WhatsApp within 15 minutes.' },
      { stepNum: '04', category: 'Token', icon: <CheckCircle2 size={20} />, title: 'Deposit & Slot Reservation', desc: 'Traveler settles booking token via integrated payment gateway, triggering instant reservation holds with local hoteliers.' },
      { stepNum: '05', category: 'Documents', icon: <Shield size={20} />, title: 'Passport & Visa Ingestion', desc: 'Client uploads passport copies and ID proofs into a private encrypted vault with automated expiry date validation.' },
      { stepNum: '06', category: 'Balance', icon: <Clock size={20} />, title: 'Milestone Balance Collection', desc: 'Automated WhatsApp payment alerts collect the remaining balance 15 days prior to departure before final voucher release.' },
      { stepNum: '07', category: 'Vouchers', icon: <Award size={20} />, title: 'Voucher Release & In-Transit Care', desc: 'Dispatch confirmed flight tickets, hotel vouchers, and emergency contact numbers, backed by 24/7 AI travel support.' }
    ],
    outcomesTitle: 'Measurable Growth in Tour Bookings & Margin Protection',
    outcomesSubtitle: 'Designed to help travel agencies close holiday packages faster and eliminate the administrative burden of manual follow-ups.',
    outcomes: [
      { title: '65% Faster Itinerary Creation', desc: 'Assemble customized multi-day itineraries in under 10 minutes using pre-saved destination templates and hotel libraries.' },
      { title: '28% Increase in Booking Conversions', desc: 'Beat competitors to the customer with instant WhatsApp quote delivery while the lead is hot.' },
      { title: 'Zero Delayed Balance Settlements', desc: 'Automated WhatsApp milestone payment reminders ensure 100% of tour fees are collected before flight voucher issuance.' },
      { title: '100% Elimination of Lost Documents', desc: 'Centralized document repository prevents missing passport attachments or expired visa surprises at immigration.' }
    ],
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/industries/hospitality', text: 'Hospitality Software Solutions' }
    ],
    customFaqs: [
      { question: 'Can the travel CRM generate branded day-wise PDF itineraries with hotel photos?', answer: 'Yes. The built-in itinerary builder allows agents to select destinations, add day-by-day activities, insert high-resolution photos, specify meal inclusions, and export a branded, mobile-friendly PDF or interactive web link in minutes.' },
      { question: 'How does WhatsApp automation help travel agencies close more holiday packages?', answer: 'Rather than sending lengthy emails that go unread, our system sends interactive WhatsApp messages with quotation summaries, dynamic itinerary links, and quick-reply buttons allowing clients to approve proposals or request changes instantly.' },
      { question: 'Can the system track staggered milestone payments for international tour packages?', answer: 'Yes. You can configure custom payment schedules (e.g., 20% booking token, 40% after visa approval, and 40% 15 days before flight departure). The CRM automatically tracks outstanding balances and sends timely WhatsApp payment reminders with integrated checkout links.' },
      { question: 'How does the secure document vault handle client passports and visas?', answer: 'Clients receive a secure upload link via WhatsApp where they can submit passport scans and visa documents. The system automatically performs OCR to extract passport numbers and expiry dates, flagging any document that expires within 6 months of the travel date.' },
      { question: 'Can we manage rates and booking confirmations from local DMCs and ground suppliers?', answer: 'Yes. The supplier management module records net rates, contact details, and payment schedules for local DMCs, ground transport providers, and activity vendors, tracking both your gross revenue and net profit margins per booking.' },
      { question: 'Does the CRM support multi-currency payments for international travelers?', answer: 'Yes. The platform integrates with international gateways such as Stripe, Razorpay International, and PayPal, allowing agencies to invoice in USD, EUR, GBP, AED, or INR with real-time currency conversion rates.' }
    ],
    faqs: [
      { q: 'Can travelers get itinerary updates on WhatsApp?', a: 'Yes. Booking and itinerary events can send automated WhatsApp notifications to customers.' },
      { q: 'Does the travel CRM support staggered milestone payments?', a: 'Yes. The platform automates payment schedules for booking token, visa clearance, and pre-departure balance.' }
    ],
    contactEyebrow: 'GROW TRAVEL AGENCY REVENUE',
    contactTitle: 'Ready to Modernize Your Travel Agency Workflows?',
    contactSubtitle: 'Schedule a personalized demo to see our itinerary builder, WhatsApp payment automation, and DMC supplier management in action.',
    contactChecklist: [
      'Interactive Day-by-Day Itinerary Builder',
      'WhatsApp Milestone Payment Automation',
      'Encrypted Passport & Visa Vault',
      'Supplier Net Costing & Margin Engine'
    ]
  },
    government: {
    metaTitle: 'Government & Public Sector Software Solutions | e-Governance & Citizen Portals | Gyan VaniAi',
    metaDescription: 'Custom government software: accessible citizen portals, automated grievance redressal, file tracking systems, and sovereign cloud infrastructure by Gyan VaniAi.',
    heroEyebrow: 'DIGITAL PUBLIC INFRASTRUCTURE & CIVIC TECH',
    h1: 'Government Software Solutions',
    subtitle: 'Architecting secure citizen self-service portals, automated grievance redressal systems, file tracking workflows, and sovereign cloud e-governance infrastructure.',
    overviewTitle: 'Mission-Critical Digital Governance & Citizen Service Automation',
    overview: 'Gyan VaniAi develops sovereign, accessible, and high-availability public sector software solutions for municipal corporations, state departments, public sector undertakings (PSUs), and civic utility boards. Engineered with strict adherence to Web Content Accessibility Guidelines (WCAG 2.1 AA), domestic cloud residency mandates (NIC / MeitY-empanelled data centers), digital identity authentication (eSign, DigiLocker, Aadhaar), and hierarchical bureaucratic File Tracking Systems (FTS), our platforms replace administrative paper file backlogs with transparent, audit-immutable civic workflows and automated Service Level Agreement (SLA) escalations.',
    whoForTitle: 'Engineered for Public Sector Leadership and Digital Mission Directors',
    whoFor: 'Government department secretaries, municipal commissioners, public sector enterprise CIOs, and technology system integrators delivering mission-critical digital public infrastructure (DPI) and citizen-facing e-governance platforms.',
    deliverablesTitle: 'Government Software Platform Deliverables',
    deliverables: [
      'Multilingual Citizen Self-Service Portals (Permits, Licenses, Welfare Applications)',
      'Omnichannel Citizen Grievance Redressal (Web, WhatsApp Bot, Toll-Free IVR)',
      'Bureaucratic File Tracking System (FTS) with Hierarchical e-Sign Approvals',
      'Automated Service Level Agreement (SLA) Escalation & Officer Performance Telemetry',
      'MeitY / GovCloud Sovereign Data Residency Architecture & STQC Security Compliance',
      'Full Web Content Accessibility Guidelines (WCAG 2.1 AA) Interface Certification',
      'Departmental Revenue, Civic Utility Billing & Treasury Payment Gateway Integration'
    ],
    benefits: [
      'MeitY Sovereign Cloud Security',
      'WCAG 2.1 AA Accessibility',
      'Automated SLA Escalation',
      'Multi-Channel Grievance Redressal'
    ],
    image: '/government_portal_hero.jpg',
    imageAlt: 'Government and Public Sector Digital Services Software Platform by Gyan VaniAi',
    capabilitiesTitle: 'Core Public Sector & e-Governance Capabilities',
    capabilities: [
      { title: 'Strict Sovereign Data Sovereignty', desc: 'Deploy within MeitY-empanelled domestic cloud data centers (NIC, AWS GovCloud, Yotta) ensuring complete national data residency.' },
      { title: 'Hierarchical File Tracking & e-Sign', desc: 'Replicate official bureaucratic gazetted hierarchies with digital noting, green-sheet file endorsements, and digital signature certificates (DSC).' },
      { title: 'Automated Grievance SLA Escalation', desc: 'Citizen grievances carry statutory resolution timers; unresolved tickets escalate automatically to senior district magistrates and department heads.' },
      { title: 'Universal Accessibility (WCAG 2.1 AA)', desc: 'Screen reader optimization, high-contrast visual modes, and keyboard navigation certified for citizens with visual or motor disabilities.' },
      { title: 'Multilingual Regional Language Support', desc: 'Citizen portals, SMS notices, and WhatsApp bots operate concurrently across 10+ official regional languages with real-time translation.' },
      { title: 'Immutable Cryptographic Audit Trails', desc: 'Every file access, document modification, and sanction approval is stamped with cryptographic hashes for statutory audit and RTI compliance.' }
    ],
    workflowHeading: 'The Modern Citizen Public Service Delivery Lifecycle',
    workflowSubtitle: 'From online citizen application intake to departmental verification, gazetted officer approval, and digital certificate delivery.',
    engineBanner: {
      tag: 'E-GOVERNANCE WORKFLOW ENGINE',
      title: 'Secure Public Sector Service Delivery Pipeline',
      desc: 'Accelerate citizen service delivery, eliminate physical office lines, and enforce strict administrative transparency.'
    },
    customSteps: [
      { stepNum: '01', category: 'Intake', icon: <Landmark size={20} />, title: 'Citizen Application / Grievance Intake', desc: 'Citizen submits application or civic grievance via multilingual web portal, WhatsApp bot, or local CSC kiosk.' },
      { stepNum: '02', category: 'Token', icon: <FileText size={20} />, title: 'Automated Token & SLA Assignment', desc: 'System generates an immutable tracking token with an SMS/WhatsApp acknowledgement and statutory SLA target date.' },
      { stepNum: '03', category: 'Routing', icon: <Workflow size={20} />, title: 'Smart Departmental Dispatch', desc: 'Intelligent NLP classifies the request and routes the digital file directly to the competent nodal officer desk.' },
      { stepNum: '04', category: 'Verification', icon: <ShieldCheck size={20} />, title: 'Document & Field Verification', desc: 'Field officers verify identity against national registries or upload geo-tagged physical inspection reports via mobile app.' },
      { stepNum: '05', category: 'Approval', icon: <UserCheck size={20} />, title: 'Hierarchical Desk Endorsement', desc: 'Digital file progresses through assistant, deputy, and joint commissioner desks with secure cryptographic digital signatures (DSC).' },
      { stepNum: '06', category: 'Delivery', icon: <Award size={20} />, title: 'Digital Certificate / Sanction Issuance', desc: 'Citizen receives digitally signed permit, sanction, or certificate delivered instantly via WhatsApp, DigiLocker, and portal.' },
      { stepNum: '07', category: 'Audit', icon: <Database size={20} />, title: 'Statutory Audit Archiving & Feedback', desc: 'Case file permanently archived with immutable cryptographic timestamps, followed by automated citizen satisfaction polling.' }
    ],
    outcomesTitle: 'Demonstrated Civic Governance Impact & Citizen Trust',
    outcomesSubtitle: 'Designed to make public service delivery faster, accountable, and accessible to every citizen.',
    outcomes: [
      { title: '75% Faster Citizen Application Processing', desc: 'Replace slow physical paper file routing with automated digital desk routing and online identity verification.' },
      { title: '100% Statutory Audit & RTI Compliance', desc: 'Every administrative decision and document modification carries verifiable cryptographic timestamps.' },
      { title: '85% of Routine Inquiries Automated on WhatsApp', desc: 'Citizens check application status, scheme eligibility, and office hours via automated WhatsApp self-service bots.' },
      { title: 'WCAG 2.1 AA Certified Equal Access', desc: 'Certified accessible digital interfaces guarantee seamless service delivery for elderly citizens and persons with disabilities.' }
    ],
    relatedLinks: [
      { url: '/services/web-development', text: 'Secure Web Portals' },
      { url: '/services/ai-development', text: 'AI Public Sector Solutions' },
      { url: '/services/crm-development', text: 'Custom CRM Development' }
    ],
    customFaqs: [
      { question: 'Can the government software be hosted on NIC or MeitY-empanelled sovereign cloud infrastructure?', answer: 'Yes. Our architectures strictly adhere to government procurement and security norms, designed for deployment in National Informatics Centre (NIC) data centers, state government data centers (SDC), or MeitY-empanelled cloud service providers (such as AWS GovCloud, Yotta, or Microsoft Azure India) guaranteeing complete national data sovereignty.' },
      { question: 'Does the citizen portal comply with WCAG 2.1 AA accessibility standards for people with disabilities?', answer: 'Yes. Every public interface is engineered in accordance with Web Content Accessibility Guidelines (WCAG 2.1 Level AA) and the Guidelines for Indian Government Websites (GIGW), including screen reader compatibility, high-contrast modes, scalable font controls, and complete keyboard navigability.' },
      { question: 'How does the software handle citizen grievances and officer SLA escalations?', answer: 'Every registered grievance is assigned a unique tracking token and an automated SLA countdown timer based on citizen charter mandates. If a nodal officer does not review or resolve the issue within the statutory window, the file automatically escalates to senior supervisory officers with red-flag dashboard alerts.' },
      { question: 'Does the platform support multiple regional languages concurrently?', answer: 'Yes. We support true multilingual localization across 10+ official languages (including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, and Kannada). Citizen web portals, SMS notifications, and interactive WhatsApp workflows dynamically adapt to the citizen\'s preferred language.' },
      { question: 'Does the solution integrate with government payment systems, DigiLocker, and Aadhaar eSign?', answer: 'Yes. We provide pre-built integration modules for digital public infrastructure including Bharat Bill Payment System (BBPS), localized treasury payment gateways, DigiLocker document verification APIs, and Aadhaar-based OTP / biometric eSign services.' },
      { question: 'What security standards and cybersecurity vulnerability audits (CERT-In) are supported?', answer: 'All public sector applications undergo rigorous static and dynamic application security testing (SAST/DAST) adhering to OWASP Top 10 standards, engineered to pass mandatory CERT-In empanelled third-party security audits and STQC compliance certifications before production go-live.' }
    ],
    faqs: [
      { q: 'Do you support phased government rollouts?', a: 'Yes. We typically deliver in modules with documentation, training, and staged go-lives.' },
      { q: 'Can the system be deployed in sovereign NIC / MeitY-empanelled data centers?', a: 'Yes. We deploy in certified domestic sovereign cloud data centers ensuring full data residency.' }
    ],
    contactEyebrow: 'DIGITIZE PUBLIC SECTOR SERVICES',
    contactTitle: 'Ready to Architect Modern e-Governance Infrastructure?',
    contactSubtitle: 'Schedule a briefing with our government technology specialists to discuss citizen portals, file tracking systems, and sovereign cloud deployment.',
    contactChecklist: [
      'MeitY Sovereign Cloud Architecture',
      'WCAG 2.1 AA Accessibility Certification',
      'Bureaucratic Hierarchical File Tracking System',
      'Multilingual Citizen WhatsApp Automation'
    ]
  }
};

export default function SEOLandingPage() {
  const { serviceId, industryId } = useParams();
  const pageId = serviceId || industryId || 'ai-development';
  const isIndustry = Boolean(industryId);
  const hasKnownPage = Boolean(seoDataMap[pageId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  if (pageId === 'sales-automation') {
    return <SalesAutomationPage />;
  }

  if (pageId === 'ai-chatbots') {
    return <AIChatbotsPage />;
  }

  if (pageId === 'whatsapp-calling-agent') {
    return <WhatsAppCallingAgentPage />;
  }

  if (pageId === 'healthcare') {
    return <HealthcarePage />;
  }

  if (pageId === 'real-estate') {
    return <RealEstatePage />;
  }

  if (pageId === 'retail') {
    return <RetailPage />;
  }

  if (pageId === 'finance' || pageId === 'fintech') {
    return <FinancePage />;
  }

  if (pageId === 'ivr-solutions') {
    return <IvrSolutionsPage />;
  }

  if (pageId === 'legal') {
    return <LegalPage />;
  }

  if (!hasKnownPage) {
    return <NotFound />;
  }

  const pageData = seoDataMap[pageId];

  const pathPrefix = isIndustry ? 'industries' : 'services';
  const pageUrl = `${SITE}/${pathPrefix}/${pageId}`;
  const ogImage = `${SITE}${pageData.image}`;

  const rawPageFaqs = pageData.customFaqs || pageData.faqs || [];
  const pageFaqs = rawPageFaqs.map((faq) => ({
    q: faq.question || faq.q,
    a: faq.answer || faq.a
  }));
  const faqSchema = pageFaqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      }
    : null;

  const primarySchema = isIndustry
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: pageData.h1,
        description: pageData.metaDescription,
        url: pageUrl,
        isPartOf: { '@id': `${SITE}/#website` },
        publisher: { '@id': `${SITE}/#organization` },
        about: { '@type': 'Thing', name: pageData.h1 },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.seo-overview', '.seo-who-for']
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: pageData.h1,
        serviceType: pageData.h1,
        provider: { '@id': `${SITE}/#organization` },
        areaServed: ['Europe', 'Asia', 'Africa', 'Worldwide'],
        description: pageData.metaDescription,
        url: pageUrl,
        image: ogImage
      };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: isIndustry ? 'Industries' : 'Services',
        item: `${SITE}/`
      },
      { '@type': 'ListItem', position: 3, name: pageData.h1, item: pageUrl }
    ]
  };

  const pageKeywords = pageData.keywords || [
    pageData.h1,
    ...(pageData.benefits || []),
    ...(pageData.deliverables || []).slice(0, 3),
    isIndustry ? `${pageData.h1} Software` : `${pageData.h1} Solutions`,
    'Enterprise AI',
    'Gyan VaniAi'
  ].join(', ');

  return (
    <>
      <SeoHead
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        keywords={pageKeywords}
        canonical={pageUrl}
        image={ogImage}
        schema={faqSchema ? [primarySchema, breadcrumbSchema, faqSchema] : [primarySchema, breadcrumbSchema]}
        preloadImage={pageId === 'enterprise' ? '/gyan_vaniai_crm_hero.webp' : pageData.image}
        aeoQuestion={`What is ${pageData.h1}?`}
        aeoAnswer={pageData.overview}
      />

      <div className="seo-landing-page">
        <section className="hero" style={{ paddingTop: '3.25rem', paddingBottom: '4rem' }}>
          <div className="container" style={{ maxWidth: '1240px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: '500' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>{isIndustry ? 'Industries' : 'Services'}</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: 'var(--primary-color)' }}>{pageData.h1}</li>
              </ol>
            </nav>

            <div className="seo-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                {pageData.heroEyebrow && (
                  <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-color)', marginBottom: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'color-mix(in srgb, var(--primary-color) 12%, transparent)' }}>
                    {pageData.heroEyebrow}
                  </span>
                )}
                <h1 className="h1" style={{ fontSize: 'clamp(2.75rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
                  {pageData.h1}
                </h1>
                <p className="text-muted" style={{ fontSize: '1.125rem', lineHeight: '1.65', marginBottom: '2.5rem' }}>
                  {pageData.subtitle}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                  {pageData.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={22} color="var(--primary-color)" aria-hidden="true" />
                      <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}
                  >
                    {pageData.ctaButtonText || 'Get a Free Consultation'} <ArrowRight size={20} />
                  </button>
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.85rem 1.6rem',
                      borderRadius: 'var(--radius-md, 12px)',
                      background: '#25D366',
                      color: '#ffffff',
                      fontWeight: '700',
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                      transition: 'transform 0.2s ease, background 0.2s ease'
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp AI Demo</span>
                  </a>
                </div>
              </div>
              {pageId === 'enterprise' ? (
                <div className="hero-visual" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  <img
                    src="/gyan_vaniai_crm_hero.webp"
                    alt="Enterprise Multi-Tenant CRM Platform Dashboard by Gyan VaniAi"
                    width="1000"
                    height="750"
                    style={{ width: '100%', height: 'auto', display: 'block', filter: 'none' }}
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
              ) : (
                <div className="hero-visual" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <img
                    src={pageData.image}
                    alt={pageData.imageAlt}
                    width="1000"
                    height="562"
                    style={{ width: '100%', height: 'auto', display: 'block', filter: 'none' }}
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* GEO citeable content blocks */}
        <section className="section" style={{ padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '1240px' }}>
            <div className="seo-content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              <div className="seo-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                <h2 className="h2" style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{pageData.overviewTitle || 'Overview'}</h2>
                <p className="seo-overview text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {pageData.overview}
                </p>
              </div>

              <div className="seo-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                <h2 className="h2" style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{pageData.whoForTitle || "Who it's for"}</h2>
                <p className="seo-who-for text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  {pageData.whoFor}
                </p>
              </div>

              {pageData.deliverables?.length > 0 && (
                <div className="seo-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>

                  <h2 className="h2" style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{pageData.deliverablesTitle || 'What you get'}</h2>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {pageData.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {pageData.capabilities ? (
              <div style={{ marginTop: '4rem' }}>

                <h2 className="h2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2.5rem', textAlign: 'center' }}>
                  {pageData.capabilitiesTitle || (pageId === 'ai-agent-development' ? 'AI Agent Capabilities' : 'Core Capabilities')}
                </h2>
                
                {pageData.capabilitiesVisual && (
                  <div className="seo-diagram-card" style={{ marginBottom: '3rem', maxWidth: '960px', marginInline: 'auto' }}>
                    <img 
                      src={pageData.capabilitiesVisual} 
                      alt={pageData.capabilitiesVisualAlt || (pageId === 'ai-agent-development' ? 'Autonomous AI Agent Architecture and 6 Core Capabilities' : 'System Capabilities Architecture')} 
                      width="960" 
                      height="720" 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                      loading="lazy" 
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {pageData.capabilities.map((cap) => (
                    <div key={cap.title} style={{ background: 'var(--bg-card)', padding: '1.75rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 className="h3" style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{cap.title}</h3>
                      <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {(pageId === 'ai-agent-development' || pageData.vsChatbotVisual) && (
              <div style={{ marginTop: '5rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', marginInline: 'auto', marginBottom: '3rem' }}>
                  <h2 className="h2" style={{ fontSize: 'clamp(2.125rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>AI Agents That Actually Take Action</h2>
                  <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                    Traditional chatbots primarily respond to questions. AI agents can understand context, retrieve business knowledge, use connected tools, execute workflows, and hand tasks to human teams when needed.
                  </p>
                </div>

                {pageData.vsChatbotVisual && (
                  <div className="seo-diagram-card" style={{ marginBottom: '3rem', maxWidth: '1000px', marginInline: 'auto' }}>
                    <img 
                      src={pageData.vsChatbotVisual} 
                      alt="Side-by-side comparison of Traditional Chatbots versus Autonomous AI Agents" 
                      width="1200" 
                      height="675" 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                      loading="lazy" 
                    />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', marginInline: 'auto' }}>
                  <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <X size={24} color="var(--error-color, #ef4444)" />
                      <h3 className="h3" style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>Traditional Chatbot</h3>
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      <li>• Answers questions</li>
                      <li>• Limited workflow execution</li>
                      <li>• Mostly conversational</li>
                      <li>• Limited tool usage</li>
                    </ul>
                  </div>
                  <div style={{ background: 'color-mix(in srgb, var(--primary-color) 12%, var(--bg-card))', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--primary-color)', boxShadow: '0 8px 24px -4px color-mix(in srgb, var(--primary-color) 20%, transparent)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <Check size={24} color="var(--primary-color)" />
                      <h3 className="h3" style={{ fontSize: '1.25rem', margin: 0, color: 'var(--primary-color)' }}>AI Agent</h3>
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      <li>• Understands business context</li>
                      <li>• Uses knowledge and connected tools</li>
                      <li>• Executes multi-step workflows</li>
                      <li>• Can hand work to humans</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {pageId === 'voice-bot-assistant' ? (
          <VoiceAIEngineArchitecture />
        ) : (
          <Process 
            title={pageData.workflowHeading} 
            subtitle={pageData.workflowSubtitle}
            steps={pageData.customSteps}
            engineBanner={pageData.engineBanner}
            integrations={pageData.integrations}
            workflowVisual={pageData.workflowVisual}
            workflowVisualAlt={pageData.workflowVisualAlt || (pageId === 'ai-agent-development' ? 'AI Agent Workflow Orchestration and Branching Execution Architecture' : 'Workflow Architecture')}
            footerLabel={pageData.workflowFooter?.label}
            footerTitle={pageData.workflowFooter?.title}
            footerDesc={pageData.workflowFooter?.desc}
            footerBtnText={pageData.workflowFooter?.btnText || `Explore ${pageData.h1} Architecture`}
            footerBtnUrl={pageData.workflowFooter?.btnUrl || '#contact'}
          />
        )}

        {pageData.outcomes?.length > 0 && (
          <section className="section" style={{ padding: '4.5rem 0' }}>
            <div className="container" style={{ maxWidth: '1240px' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
<h2 className="h2" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.5rem)', marginBottom: '0.75rem' }}>
                  {pageData.outcomesTitle || 'Create One Operational View of the Customer'}
                </h2>
                {pageData.outcomesSubtitle && (
                  <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '750px', marginInline: 'auto' }}>
                    {pageData.outcomesSubtitle}
                  </p>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {pageData.outcomes.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-card)', padding: '2rem 1.75rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 className="h3" style={{ fontSize: '1.15rem', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQ 
          includeSchema={false} 
          customFaqs={pageData.customFaqs || pageData.faqs}
          title={pageData.faqTitle || `${pageData.h1} FAQs`}
          subtitle={pageData.faqSubtitle || `Everything you need to know about our ${pageData.h1.toLowerCase()} capabilities, security, and integrations.`}
        />

        {pageData.relatedLinks?.length > 0 && (
          <section className="section" style={{ padding: '3.5rem 0 2rem' }}>
            <div className="container" style={{ maxWidth: '1240px' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
<h2 className="h2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>Related Services</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {pageData.relatedLinks.map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    className="related-service-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.15rem 1.35rem',
                      background: 'var(--bg-card)',
                      borderRadius: '0.85rem',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.98rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {link.icon && (
                      <img 
                        src={link.icon} 
                        alt="" 
                        aria-hidden="true" 
                        width="36" 
                        height="36" 
                        style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'contain', flexShrink: 0 }} 
                        loading="lazy" 
                      />
                    )}
                    <span style={{ flex: 1 }}>{link.text}</span>
                    <ArrowRight size={18} color="var(--primary-color)" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactSection 
          eyebrow={pageData.contactEyebrow}
          title={pageData.contactTitle} 
          subtitle={pageData.contactSubtitle} 
          checklist={pageData.contactChecklist}
          ctaImage={pageData.ctaVisual}
          ctaImageAlt={pageData.ctaVisualAlt || 'Enterprise Solution Connected Architecture'}
        />
      </div>

      <style>{`
        .related-service-card:hover {
          border-color: var(--primary-color) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .seo-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-visual {
            order: -1;
          }
        }
        @media (max-width: 768px) {
          .seo-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
