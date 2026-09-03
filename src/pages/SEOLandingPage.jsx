import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, X, Check, Inbox, Filter, Star, UserCheck, Mail, Trophy, PhoneCall, Mic, BrainCircuit, Bot, Calendar, Headset, Database, Building2, ShieldCheck, Zap, Layers, BarChart3, Users } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Process from '../components/Process';
import VoiceAIEngineArchitecture from '../components/VoiceAIEngineArchitecture';
import SalesAutomationPage from './SalesAutomationPage';
import AIChatbotsPage from './AIChatbotsPage';
import WhatsAppCallingAgentPage from './WhatsAppCallingAgentPage';
import NotFound from './NotFound';

const SITE = 'https://www.gyanvaniai.online';

const seoDataMap = {
  'ai-development': {
    metaTitle: 'AI Software Development Company | Custom AI Solutions | Gyan VaniAi',
    metaDescription: 'Hire Gyan VaniAi for custom AI software development: LLM apps, chatbots, RAG systems, and autonomous agents that automate operations and grow revenue.',
    h1: 'Custom AI Software Development',
    subtitle: 'Build AI agents, chatbots, and automation workflows that save time and increase revenue, engineered for production, not demos.',
    overview: 'Gyan VaniAi is an AI software development company that designs and ships production-ready artificial intelligence systems for businesses. We build LLM-powered applications, retrieval-augmented generation (RAG) pipelines, customer-facing chatbots, and autonomous agents that integrate with your CRM, WhatsApp, and internal tools.',
    whoFor: 'Founders, operations leaders, and enterprise IT teams who need AI that works inside real business workflows (sales, support, onboarding, and internal knowledge) with security and measurable ROI.',
    deliverables: ['Custom LLM applications', 'Secure RAG knowledge systems', 'AI chatbots with human handoff', 'Workflow automation agents', 'API integrations & dashboards'],
    benefits: ['Custom AI Models', 'Seamless Integration', '24/7 Automation', 'Data Security'],
    image: '/portfolio_ai.webp',
    imageAlt: 'AI software development dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'Custom CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' },
      { url: '/services/ai-agent-development', text: 'RAG & AI Agent Solutions' }
    ],
    faqs: [
      { q: 'What AI software does Gyan VaniAi build?', a: 'We build custom AI chatbots, RAG knowledge systems, multi-agent workflows, voice agents, and LLM applications integrated with CRM and WhatsApp.' },
      { q: 'How long does a custom AI project take?', a: 'Most AI MVP projects ship in 3-6 weeks. Enterprise multi-agent or RAG systems typically take 6-12 weeks depending on data readiness and integrations.' }
    ]
  },
  'ai-agent-development': {
    metaTitle: 'Custom AI Agent Development Company | Gyan VaniAi',
    metaDescription: 'Deploy autonomous AI agents for sales, support, and operations. Multi-agent systems with RAG, tool use, and CRM/WhatsApp integration by Gyan VaniAi.',
    h1: 'Custom AI Agent Development',
    subtitle: 'Deploy intelligent AI agents that handle sales, support, and operations autonomously, with human oversight when it matters.',
    overview: 'Build AI agents that understand business context, use connected tools, and automate repetitive workflows.',
    whoFor: 'Growing businesses • Operations teams • Sales teams • Customer support teams',
    deliverables: ['AI agent architecture', 'Workflow automation', 'Knowledge/RAG integration', 'API and tool integrations', 'Human handoff'],
    benefits: ['Multi-Agent Systems', 'Workflow Automation', 'Natural Language Processing', 'Custom Integrations'],
    image: '/ai-agent-hero.webp',
    imageAlt: 'Autonomous AI Agent Orchestration Platform by Gyan VaniAi',
    capabilitiesVisual: '/ai-agent-capabilities.webp',
    vsChatbotVisual: '/ai-agent-vs-chatbot.webp',
    workflowVisual: '/ai-agent-workflow.webp',
    ctaVisual: '/ai-agent-cta.webp',
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development', icon: '/service-crm-development.webp' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence', icon: '/service-whatsapp-coexistence.webp' },
      { url: '/services/voice-bot-assistant', text: 'Voice AI', icon: '/service-voice-ai.webp' },
      { url: '/services/ai-chatbots', text: 'AI Chatbot Development', icon: '/service-ai-chatbot.webp' }
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
      { q: 'Why build a custom CRM instead of Salesforce or HubSpot?', a: 'Custom CRM fits your workflow, pricing model, and channels (like WhatsApp Coexistence) without forcing your team into rigid templates or unused modules.' },
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
    image: '/portfolio_ai.webp',
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
    h1: 'WhatsApp CRM & Automation',
    subtitle: 'Official WhatsApp Business API automation with Coexistence, Embedded Signup, broadcasts, and AI replies, without losing your mobile app.',
    overview: 'Gyan VaniAi provides WhatsApp automation for businesses using the official Meta WhatsApp Business Platform. Features include Coexistence mode, 1-click Embedded Signup, bulk broadcasts, interactive messages, AI auto-replies, and a multi-agent shared inbox for sales and support teams.',
    whoFor: 'Retail, real estate, healthcare, education, and service businesses that close deals and support customers primarily on WhatsApp.',
    deliverables: ['Cloud API + Coexistence setup', 'Broadcast & template campaigns', 'AI FAQ auto-replies', 'Team shared inbox', 'CRM lead sync'],
    benefits: ['Built-in WhatsApp Coexistence', '1-Click Embedded Signup', 'Official Meta API Integration', 'Instant Replies & Broadcasts'],
    image: '/portfolio_crm.webp',
    imageAlt: 'WhatsApp automation CRM dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/whatsapp-coexistence', text: 'Full WhatsApp Coexistence Guide' },
      { url: '/services/crm-development', text: 'Custom CRM Development' }
    ],
    faqs: [
      { q: 'Is this official WhatsApp Business API?', a: 'Yes. Gyan VaniAi integrates the official Meta WhatsApp Business Cloud API with Coexistence and Embedded Signup, not unofficial or banned scrapers.' },
      { q: 'Can I keep using WhatsApp on my phone?', a: 'Yes, with Coexistence mode. Your WhatsApp Business mobile app and our CRM run on the same number with real-time sync.' }
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
    metaTitle: 'Custom ERP Software Development | Gyan VaniAi',
    metaDescription: 'Custom ERP development to unify inventory, finance, procurement, and operations in one scalable system built for your processes.',
    h1: 'Custom ERP Software Development',
    subtitle: 'Unify inventory, finance, supply chain, and operations in one ERP shaped to how your business actually runs.',
    overview: 'Gyan VaniAi builds custom Enterprise Resource Planning (ERP) software that connects inventory, procurement, finance, and operations. Unlike rigid packaged ERPs, we model your workflows first, then deliver modules that scale with multi-location and multi-role access.',
    whoFor: 'Manufacturers, distributors, and multi-branch businesses that need operational visibility without forcing staff into unsuitable ERP packages.',
    deliverables: ['Inventory & warehouse modules', 'Finance & reporting', 'Procurement workflows', 'Multi-branch dashboards', 'Third-party integrations'],
    benefits: ['Inventory Management', 'Financial Reporting', 'Supply Chain Visibility', 'Operational Efficiency'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Enterprise resource planning dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/hrms-development', text: 'HRMS Software Development' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    faqs: [
      { q: 'Do you replace SAP/Oracle or extend them?', a: 'Both. We build greenfield ERPs for mid-market teams and integrate or extend existing enterprise systems where a full replacement is unnecessary.' }
    ]
  },
  'web-development': {
    metaTitle: 'Custom Web Application Development | Gyan VaniAi',
    metaDescription: 'Enterprise web application development: fast, SEO-ready business portals, dashboards, and SaaS frontends with secure API architecture.',
    h1: 'Custom Web Application Development',
    subtitle: 'High-performance web apps and business portals that load fast, rank well, and convert visitors into customers.',
    overview: 'Gyan VaniAi builds custom web applications and business websites with modern React architectures, SEO foundations, and secure backend APIs. From marketing sites to multi-tenant SaaS dashboards, we optimize for speed, accessibility, and conversion.',
    whoFor: 'Companies launching digital products, customer portals, or marketing sites that need more than a template builder can deliver.',
    deliverables: ['Responsive web apps', 'Admin & customer portals', 'SEO & Core Web Vitals focus', 'API-first backends', 'Analytics & conversion tracking'],
    benefits: ['Responsive Design', 'Fast Loading Speeds', 'SEO Optimized', 'High Conversion Rates'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Custom business web application by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/mobile-app-development', text: 'Mobile App Development' },
      { url: '/services/ai-development', text: 'AI Software Development' }
    ],
    faqs: [
      { q: 'Do you build SEO-friendly websites?', a: 'Yes. We implement semantic HTML, meta tags, structured data, sitemaps, and performance best practices for search and AI discovery.' }
    ]
  },
  'mobile-app-development': {
    metaTitle: 'Business Mobile App Development | React Native & Flutter | Gyan VaniAi',
    metaDescription: 'Custom Android and iOS mobile app development with React Native and Flutter. Scalable business apps with CRM, AI, and API integrations.',
    h1: 'Mobile App Development',
    subtitle: 'Native-quality Android and iOS apps (cross-platform with React Native or Flutter) built for business workflows.',
    overview: 'Gyan VaniAi develops business mobile applications for Android and iOS using React Native and Flutter. Apps connect to CRM, WhatsApp workflows, payments, and internal APIs so field teams and customers get a fast mobile experience.',
    whoFor: 'Businesses that need customer apps, field-force tools, or companion apps for CRM/ERP systems.',
    deliverables: ['iOS & Android apps', 'Push notifications', 'Offline-friendly UX', 'CRM/API integration', 'Store submission support'],
    benefits: ['iOS & Android', 'React Native / Flutter', 'High Performance', 'Scalable Architecture'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Business mobile application development by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/web-development', text: 'Web Application Development' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    faqs: [
      { q: 'Native or cross-platform?', a: 'We typically recommend React Native or Flutter for speed and shared codebase, and native when platform-specific performance or SDKs require it.' }
    ]
  },
  'ai-chatbots': {
    metaTitle: 'AI Chatbot Development Company | RAG Chatbots | Gyan VaniAi',
    metaDescription: 'Custom AI chatbots with RAG, human handoff, and CRM/WhatsApp integration. Sub-300ms answers from your business knowledge base.',
    h1: 'AI Chatbot Development',
    subtitle: 'Intelligent chatbots that answer from your data, hand off to humans with context, and plug into WhatsApp and CRM.',
    overview: 'Gyan VaniAi builds AI chatbots powered by RAG so answers come from your documents and policies, not hallucinations. Chatbots support multi-language conversations, sentiment-aware routing, and seamless escalation to live agents.',
    whoFor: 'Support and sales teams that want 24/7 coverage without sacrificing accuracy or brand tone.',
    deliverables: ['RAG-grounded chatbots', 'WhatsApp & web widgets', 'Human handoff protocols', 'Analytics dashboards', 'Knowledge base ingestion'],
    benefits: ['RAG Knowledge Answers', 'Human Handoff', 'Multi-language Support', 'CRM Sync'],
    image: '/portfolio_ai.webp',
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
    metaTitle: 'AI Voice Bot Assistant | Conversational AI Voice Agents | Gyan VaniAi',
    metaDescription: 'Deploy human-like conversational AI voice bots for customer support, sales, and appointment booking with seamless CRM integration.',
    h1: 'AI Voice Bot Assistants',
    subtitle: 'Human-like conversational AI voice bots for customer support, sales, and appointment booking.',
    overview: 'Gyan VaniAi builds intelligent Voice Bot Assistants that understand natural language, handle interruptions, and provide instant resolutions over voice channels without wait times. Our voice agents are designed for natural conversational flow and minimal latency.',
    whoFor: 'Customer support teams and sales departments looking to automate inbound queries, outbound campaigns, and appointment bookings 24/7.',
    deliverables: ['Conversational AI models', 'Multi-language support', 'CRM integration', 'Transcription & analytics'],
    benefits: ['No Wait Times', 'Natural Conversations', 'Scalable Support', 'Real-time CRM Updates'],
    image: '/voice-bot-hero.webp',
    imageAlt: 'Enterprise AI Voice Bot Assistant real-time call dashboard with audio waveform, live transcript, and CRM sync by Gyan VaniAi',
    engineBanner: {
      tag: 'VOICE AI ENGINE · REAL-TIME ORCHESTRATION',
      title: 'Ultra-Low Latency Conversational Voice Pipeline',
      desc: 'Sub-500ms full-duplex speech recognition, contextual reasoning, and immediate CRM synchronization.'
    },
    integrations: [
      { label: 'Telephony Trunk (SIP / WebRTC / PSTN)', icon: <PhoneCall size={15} /> },
      { label: 'LLM Reasoning & NLU Engine', icon: <BrainCircuit size={15} /> },
      { label: 'Bi-Directional CRM Database Sync', icon: <Database size={15} /> },
      { label: 'Instant SMS & WhatsApp Confirmations', icon: <Mail size={15} /> }
    ],
    workflowHeading: 'How Conversational Voice AI Works',
    workflowSubtitle: 'From incoming telephony audio to CRM synchronization in under 500ms.',
    workflowFooter: {
      label: 'VOICE AI ENGINE',
      title: 'Autonomous Voice Pipeline Execution',
      desc: 'Stream ultra-low latency voice recognition, understand caller intent with NLP, hold natural multi-turn conversations, book appointments, and sync data directly to your CRM.',
      btnText: 'Deploy Voice AI Agent',
      btnUrl: '#contact'
    },
    customSteps: [
      { stepNum: '01', category: 'Capture', icon: <PhoneCall size={20} />, title: 'Call Capture', desc: 'Accept inbound calls or initiate automated outbound campaigns across SIP trunks, WebRTC, or WhatsApp Voice.' },
      { stepNum: '02', category: 'ASR', icon: <Mic size={20} />, title: 'Speech Recognition', desc: 'Real-time Automatic Speech Recognition (ASR) converts caller speech to text with sub-150ms transcription latency.' },
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
    contactSubtitle: 'Tell us about your call volume, use cases, and telephony stack. We will architect a sub-500ms voice AI pipeline for your business.',
    relatedLinks: [
      { url: '/services/ai-agent-development', text: 'AI Agent Development', icon: '/service-ai-agent-development.webp' },
      { url: '/services/sales-automation', text: 'Sales Automation', icon: '/service-sales-automation.webp' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence', icon: '/service-whatsapp-coexistence.webp' },
      { url: '/services/crm-development', text: 'Custom CRM Development', icon: '/service-crm-development.webp' }
    ],
    customFaqs: [
      { question: 'Can callers interrupt the AI voice bot naturally?', answer: 'Yes. Our voice bots support full-duplex communication with active interruption handling (barge-in). The bot stops speaking instantly when the user talks, creating a natural human-like conversation.' },
      { question: 'What is the voice response latency?', answer: 'Our voice pipeline achieves sub-500ms end-to-end latency using optimized streaming ASR, high-speed LLM inference, and low-latency voice synthesis (TTS).' },
      { question: 'Can the voice bot book appointments directly?', answer: 'Yes. The bot integrates with Google Calendar, Microsoft Outlook, and Calendly to check real-time availability and book appointments during the call.' },
      { question: 'How does human agent handoff work?', answer: 'When the AI encounters an out-of-scope query or high-value caller, it initiates a live SIP/telephony transfer to a human agent, providing the rep with the full call summary and transcript.' },
      { question: 'Does the voice bot integrate with our CRM?', answer: 'Yes. Post-call automation logs complete transcripts, audio recordings, structured call summaries, sentiment scores, and lead qualification data directly into your CRM.' },
      { question: 'What languages and accents are supported?', answer: 'We support over 30 languages and regional accents with natural inflection, customizable tone, and domain-specific vocabulary.' },
      { question: 'Can we use our existing business phone numbers?', answer: 'Yes. We connect with your existing telephony via SIP trunking, Twilio, Vonage, Plivo, or direct PBX integration without requiring number changes.' },
      { question: 'How do you ensure enterprise security and compliance?', answer: 'All voice streams and transcripts are encrypted in transit (TLS) and at rest (AES-256) with strict role-based access controls and configurable retention policies.' }
    ],
    faqs: [
      { q: 'Can callers interrupt the AI voice bot naturally?', a: 'Yes. Our voice bots support full-duplex communication with active interruption handling (barge-in). The bot stops speaking instantly when the user talks, creating a natural human-like conversation.' },
      { q: 'What is the voice response latency?', a: 'Our voice pipeline achieves sub-500ms end-to-end latency using optimized streaming ASR, high-speed LLM inference, and low-latency voice synthesis (TTS).' },
      { q: 'Can the voice bot book appointments directly?', a: 'Yes. The bot integrates with Google Calendar, Microsoft Outlook, and Calendly to check real-time availability and book appointments during the call.' },
      { q: 'How does human agent handoff work?', a: 'When the AI encounters an out-of-scope query or high-value caller, it initiates a live SIP/telephony transfer to a human agent, providing the rep with the full call summary and transcript.' },
      { q: 'Does the voice bot integrate with our CRM?', a: 'Yes. Post-call automation logs complete transcripts, audio recordings, structured call summaries, sentiment scores, and lead qualification data directly into your CRM.' },
      { q: 'What languages and accents are supported?', a: 'We support over 30 languages and regional accents with natural inflection, customizable tone, and domain-specific vocabulary.' },
      { q: 'Can we use our existing business phone numbers?', a: 'Yes. We connect with your existing telephony via SIP trunking, Twilio, Vonage, Plivo, or direct PBX integration without requiring number changes.' },
      { q: 'How do you ensure enterprise security and compliance?', a: 'All voice streams and transcripts are encrypted in transit (TLS) and at rest (AES-256) with strict role-based access controls and configurable retention policies.' }
    ]
  },
  'whatsapp-calling-agent': {
    metaTitle: 'WhatsApp Calling Agent Bot | WhatsApp Voice AI | Gyan VaniAi',
    metaDescription: 'Automate customer interactions directly over WhatsApp voice calls with AI agents for support, sales, and proactive outreach.',
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
    metaTitle: 'Phone Call AI Agent Assistant | AI Calling System | Gyan VaniAi',
    metaDescription: '24/7 AI phone agents that sound human and resolve complex customer inquiries over standard phone lines and SIP.',
    h1: 'Phone Call AI Agent Assistants',
    subtitle: '24/7 AI phone agents that sound human and resolve complex customer inquiries.',
    overview: 'Replace rigid phone menus with natural, conversational AI agents that can qualify leads, troubleshoot issues, and take reservations over standard phone lines. We integrate directly with your existing PBX or cloud telephony provider.',
    whoFor: 'Call centers, clinics, and enterprises drowning in repetitive inbound calls who want to provide zero-wait-time resolutions.',
    deliverables: ['SIP/PSTN trunking integration', 'Natural voice synthesis (TTS)', 'Intent recognition', 'Automated follow-up texts'],
    benefits: ['Zero Hold Times', 'High Intent Recognition', 'Human-like Voices', 'Telephony Integration'],
    image: '/hero_dashboard.webp',
    imageAlt: 'Phone Call AI Agent telephony dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ivr-solutions', text: 'Smart IVR Solutions' },
      { url: '/services/human-handoff-systems', text: 'AI to Human Handoff' }
    ],
    faqs: [
      { q: 'Can it transfer calls to a real human?', a: 'Absolutely. If the AI detects a complex issue or an angry customer, it can instantly route the call to a live human agent via SIP transfer.' }
    ]
  },
  'ivr-solutions': {
    metaTitle: 'Smart IVR Solutions | Intelligent Call Routing | Gyan VaniAi',
    metaDescription: 'Intelligent Interactive Voice Response systems built for modern customer journeys with CRM data-dips and speech recognition.',
    h1: 'Smart IVR Solutions',
    subtitle: 'Intelligent Interactive Voice Response systems built for modern customer journeys.',
    overview: 'Gyan VaniAi develops dynamic IVR systems that use voice recognition and data-dips into your CRM to personalize routing, drastically reducing customer frustration. Skip the "Press 1 for Sales" menus and let customers speak naturally.',
    whoFor: 'Medium to large enterprises that want to modernize their aging IVR trees and improve first-call resolution (FCR) rates.',
    deliverables: ['Dynamic call routing', 'CRM database integration', 'Multi-level menus', 'Speech recognition (ASR)'],
    benefits: ['Personalized Routing', 'Speech Recognition', 'CRM Data-Dips', 'Improved FCR'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Smart IVR call routing flow by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/phone-call-agent', text: 'Phone Call AI Agents' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    faqs: [
      { q: 'Can the IVR identify callers automatically?', a: 'Yes. By dipping into your CRM database, the IVR can recognize the caller ID, greet them by name, and predict why they are calling based on recent tickets or orders.' }
    ]
  },
  'human-handoff-systems': {
    metaTitle: 'AI to Human Handoff Systems | Agent Escalation | Gyan VaniAi',
    metaDescription: 'Seamless escalation from AI bots to human agents with full context retention. Connect chat, voice, and WhatsApp to live support.',
    h1: 'AI to Human Handoff Systems',
    subtitle: 'Seamless escalation from AI bots to human agents with full context retention.',
    overview: 'Provide the perfect balance of automation and human empathy. Our handoff systems detect frustration or complex queries and route the chat or call to the right human agent instantly, along with the full conversation history.',
    whoFor: 'Customer experience teams that use AI for deflection but require a fail-safe escalation path for high-value clients or complex issues.',
    deliverables: ['Sentiment analysis triggers', 'Skill-based agent routing', 'Omnichannel shared inbox', 'Live supervisor dashboards'],
    benefits: ['Context Retention', 'Sentiment Detection', 'Skill-based Routing', 'Omnichannel Inbox'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Human handoff agent inbox by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ai-chatbots', text: 'AI Chatbots' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' }
    ],
    faqs: [
      { q: 'Do agents see what the AI discussed?', a: 'Yes. The entire AI conversation transcript is passed to the human agent’s interface before they even accept the chat or call, ensuring the customer never has to repeat themselves.' }
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
    image: '/portfolio_crm.webp',
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
    metaDescription: 'Custom education software: student information systems, learning portals, attendance, and parent communication for schools and EdTech.',
    h1: 'Education Software Development',
    subtitle: 'Student portals, attendance, and learning systems designed for schools, universities, and EdTech companies.',
    overview: 'Gyan VaniAi develops education software including student information systems (SIS), learning portals, attendance tracking, and parent/student communication via web and WhatsApp.',
    whoFor: 'Schools, coaching institutes, universities, and EdTech startups needing scalable digital platforms.',
    deliverables: ['Student portals', 'Attendance systems', 'E-learning integrations', 'Parent messaging', 'Admin dashboards'],
    benefits: ['Student Portals', 'Attendance Tracking', 'E-Learning Integration', 'Data Security'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Education software development by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/web-development', text: 'Web Development' },
      { url: '/services/mobile-app-development', text: 'Mobile Apps' }
    ],
    faqs: [
      { q: 'Do you build for schools and EdTech startups?', a: 'Yes. We deliver both institution systems (SIS, portals) and productized EdTech platforms.' }
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
    metaTitle: 'Manufacturing Software & ERP Solutions | Gyan VaniAi',
    metaDescription: 'Manufacturing ERP and automation software for inventory, production tracking, and supply chain visibility. Custom systems by Gyan VaniAi.',
    h1: 'Manufacturing Software Solutions',
    subtitle: 'Inventory, production, and supply-chain software that gives plant and ops teams a single source of truth.',
    overview: 'Gyan VaniAi delivers manufacturing software and ERP modules for inventory control, production tracking, procurement, and operational dashboards, tailored to factory and multi-warehouse workflows.',
    whoFor: 'Manufacturers and industrial SMEs replacing spreadsheets with connected operational systems.',
    deliverables: ['Inventory management', 'Production tracking', 'Procurement workflows', 'Shop-floor dashboards', 'ERP integrations'],
    benefits: ['Inventory Management', 'Supply Chain Tracking', 'Process Automation', 'Cost Reduction'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Manufacturing software dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/erp-development', text: 'ERP Development' },
      { url: '/services/ai-agent-development', text: 'AI Agents for Ops' }
    ],
    faqs: [
      { q: 'Can you connect machines or warehouse systems?', a: 'Yes. We integrate via APIs and connectors to warehouse, barcode, and existing ERP tools where available.' }
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
    image: '/hero-enterprise-crm.svg',
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
    image: '/portfolio_crm.webp',
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
    image: '/portfolio_crm.webp',
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
    metaTitle: 'Logistics Software & Tracking Systems | Gyan VaniAi',
    metaDescription: 'Logistics software for shipment tracking, dispatcher workflows, and customer WhatsApp updates. Custom systems for fleets and 3PLs by Gyan VaniAi.',
    h1: 'Logistics Software Solutions',
    subtitle: 'Shipment visibility, dispatcher tools, and automated customer updates that cut “where is my order?” tickets.',
    overview: 'Gyan VaniAi develops logistics software for tracking, dispatch coordination, and automated customer notifications. WhatsApp and portal updates keep shippers and consignees informed without manual status calls.',
    whoFor: 'Fleet operators, 3PLs, and delivery businesses needing operational software and customer communication.',
    deliverables: ['Tracking portals', 'Dispatcher dashboards', 'WhatsApp status updates', 'Route/ops workflows', 'API integrations'],
    benefits: ['Shipment Tracking', 'Dispatcher Tools', 'Customer Updates', 'Ops Automation'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Logistics tracking software by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/erp-development', text: 'ERP Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Updates' }
    ],
    faqs: [
      { q: 'Can customers get delivery updates on WhatsApp?', a: 'Yes. Status events can trigger automated WhatsApp templates for pickup, transit, and delivery.' }
    ]
  },
  hospitality: {
    metaTitle: 'Hospitality CRM & Booking Automation | Gyan VaniAi',
    metaDescription: 'Hospitality CRM for hotels and restaurants: reservations, WhatsApp booking confirmations, guest messaging, and review follow-ups.',
    h1: 'Hospitality Software Solutions',
    subtitle: 'Reservations, guest messaging, and WhatsApp confirmations that keep rooms and tables full.',
    overview: 'Gyan VaniAi builds hospitality CRM and automation for hotels, restaurants, and venues: reservation workflows, guest communication on WhatsApp, and post-stay follow-ups that improve reviews and repeat bookings.',
    whoFor: 'Hotels, restaurants, and hospitality groups managing bookings and guest communication at scale.',
    deliverables: ['Reservation CRM', 'WhatsApp confirmations', 'Guest messaging', 'Feedback workflows', 'Staff dashboards'],
    benefits: ['Booking Automation', 'Guest Messaging', 'WhatsApp Confirmations', 'Review Follow-ups'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Hospitality CRM software by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' }
    ],
    faqs: [
      { q: 'Can guests book or confirm via WhatsApp?', a: 'Yes. We automate booking confirmations, reminders, and upsell messages through official WhatsApp Business API.' }
    ]
  },
  legal: {
    metaTitle: 'Legal Practice CRM & Client Intake Software | Gyan VaniAi',
    metaDescription: 'Legal CRM for client intake, matter tracking, and secure communication. Automate follow-ups and document workflows for law firms.',
    h1: 'Legal Software Solutions',
    subtitle: 'Client intake, matter tracking, and secure follow-ups so firms spend less time on admin and more on cases.',
    overview: 'Gyan VaniAi develops legal practice CRM and intake software for law firms: lead capture, matter stages, reminders, and controlled client communication, with architecture oriented toward confidentiality.',
    whoFor: 'Law firms and legal consultancies that need structured intake and matter management without heavy legacy tools.',
    deliverables: ['Client intake CRM', 'Matter pipelines', 'Reminder automation', 'Document workflow hooks', 'Secure access roles'],
    benefits: ['Client Intake', 'Matter Tracking', 'Reminder Automation', 'Access Control'],
    image: '/portfolio_stock.webp',
    imageAlt: 'Legal practice CRM by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/web-development', text: 'Web Portals' }
    ],
    faqs: [
      { q: 'Is the system suitable for confidential client data?', a: 'We design with role-based access, audit-friendly logs, and secure hosting practices appropriate for professional services data.' }
    ]
  },
  travel: {
    metaTitle: 'Travel Agency CRM & Booking Automation | Gyan VaniAi',
    metaDescription: 'Travel CRM with itinerary workflows, WhatsApp booking updates, and lead automation for agencies and tour operators.',
    h1: 'Travel Software Solutions',
    subtitle: 'Lead-to-booking CRM and WhatsApp updates for agencies and tour operators who sell trips over chat.',
    overview: 'Gyan VaniAi builds travel CRM and booking automation for agencies and tour operators: lead pipelines, itinerary coordination, and WhatsApp updates that keep travelers informed from inquiry to return.',
    whoFor: 'Travel agencies, tour operators, and OTAs needing operational CRM plus customer messaging.',
    deliverables: ['Travel CRM pipelines', 'Itinerary workflows', 'WhatsApp updates', 'Agent dashboards', 'Payment integrations'],
    benefits: ['Lead Pipelines', 'Itinerary Workflows', 'WhatsApp Updates', 'Agent Dashboards'],
    image: '/portfolio_crm.webp',
    imageAlt: 'Travel agency CRM by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/crm-development', text: 'CRM Development' },
      { url: '/services/whatsapp-automation', text: 'WhatsApp Automation' }
    ],
    faqs: [
      { q: 'Can travelers get itinerary updates on WhatsApp?', a: 'Yes. Booking and itinerary events can send automated WhatsApp notifications to customers.' }
    ]
  },
  government: {
    metaTitle: 'Government & Public Sector Software Solutions | Gyan VaniAi',
    metaDescription: 'Custom government software: citizen portals, workflow automation, and secure reporting systems for public-sector digital services.',
    h1: 'Government Software Solutions',
    subtitle: 'Citizen portals, workflow automation, and reporting systems built for transparency and operational clarity.',
    overview: 'Gyan VaniAi develops public-sector software including citizen-facing portals, internal workflow systems, and reporting dashboards. Solutions emphasize accessibility, auditability, and reliable delivery.',
    whoFor: 'Government departments, public agencies, and partners delivering digital citizen services.',
    deliverables: ['Citizen portals', 'Workflow automation', 'Reporting dashboards', 'Secure role access', 'Integration with existing systems'],
    benefits: ['Citizen Portals', 'Workflow Automation', 'Secure Access', 'Reporting'],
    image: '/hero_dashboard.webp',
    imageAlt: 'Government digital services software by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/web-development', text: 'Web Development' },
      { url: '/services/ai-development', text: 'AI Solutions' }
    ],
    faqs: [
      { q: 'Do you support phased government rollouts?', a: 'Yes. We typically deliver in modules with documentation, training, and staged go-lives.' }
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

  if (pageId === 'whatsapp-calling-agent' || pageId === 'whatsapp-calling-agent-bots') {
    return <WhatsAppCallingAgentPage />;
  }

  if (!hasKnownPage) {
    return <NotFound />;
  }

  const pageData = seoDataMap[pageId];

  const pathPrefix = isIndustry ? 'industries' : 'services';
  const pageUrl = `${SITE}/${pathPrefix}/${pageId}`;
  const ogImage = `${SITE}${pageData.image}`;

  const pageFaqs = pageData.faqs || [];
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
        item: isIndustry ? `${SITE}/#industries` : `${SITE}/`
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
      <Helmet>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content="Gyan VaniAi" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={pageData.metaTitle} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metaTitle} />
        <meta name="twitter:description" content={pageData.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify([primarySchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])])}
        </script>
      </Helmet>

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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {pageData.ctaButtonText || 'Get a Free Consultation'} <ArrowRight size={20} />
                </button>
              </div>
              {pageId === 'enterprise' ? (
                <div className="hero-visual" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  <img
                    src="/hero-enterprise-crm.svg"
                    alt="Enterprise Multi-Tenant CRM Platform Dashboard by Gyan VaniAi"
                    width="1000"
                    height="750"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    fetchPriority="high"
                  />
                </div>
              ) : (
                <div className="hero-visual" style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                  <img
                    src={pageData.image}
                    alt={pageData.imageAlt}
                    width="800"
                    height="600"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    fetchPriority="high"
                    decoding="async"
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
            footerBtnText={pageData.workflowFooter?.btnText}
            footerBtnUrl={pageData.workflowFooter?.btnUrl}
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

        <FAQ includeSchema={false} customFaqs={pageData.customFaqs} />

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
