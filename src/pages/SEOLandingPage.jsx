import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import Process from '../components/Process';
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
    overview: 'Gyan VaniAi develops custom AI agents that execute multi-step business tasks: qualifying leads, answering from your knowledge base, updating CRM records, and escalating to humans with full context. Our agents use RAG, tool calling, and workflow orchestration so they act on your systems, not just chat.',
    whoFor: 'Teams drowning in repetitive support tickets, lead follow-ups, or internal ops tasks who want autonomous agents without sacrificing brand voice or data control.',
    deliverables: ['Single & multi-agent architectures', 'Tool/API calling agents', 'CRM & WhatsApp-connected agents', 'Escalation & audit trails', 'Latency-optimized RAG retrieval'],
    benefits: ['Multi-Agent Systems', 'Workflow Automation', 'Natural Language Processing', 'Cost Reduction'],
    image: '/portfolio_ai.webp',
    imageAlt: 'AI agent development workflow by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ai-development', text: 'AI Software Development' },
      { url: '/services/whatsapp-coexistence', text: 'WhatsApp Coexistence Agents' }
    ],
    faqs: [
      { q: 'What is an AI agent vs a chatbot?', a: 'A chatbot mainly answers questions. An AI agent can plan steps, call tools/APIs, update records, and complete workflows end-to-end with escalation rules.' },
      { q: 'Can AI agents connect to our CRM?', a: 'Yes. We connect agents to custom CRMs, WhatsApp Business API, and third-party systems so they can read/write leads, tickets, and customer history.' }
    ]
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
    image: '/portfolio_ai.webp',
    imageAlt: 'AI Voice Bot Assistant dashboard by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ai-chatbots', text: 'AI Chatbot Development' },
      { url: '/services/phone-call-agent', text: 'Phone Call Agent Assistant' }
    ],
    faqs: [
      { q: 'Can the voice bot handle interruptions?', a: 'Yes. Our advanced voice AI models support full duplex communication, meaning users can interrupt the bot naturally, just like a human conversation.' }
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
    metaTitle: 'Enterprise IT & Custom Software Solutions | Gyan VaniAi',
    metaDescription: 'Enterprise IT solutions: custom software, AI integrations, CRM, and automation platforms for large-scale organizations.',
    h1: 'Enterprise IT Solutions',
    subtitle: 'Custom software, AI, and automation platforms engineered for scale, security, and multi-team delivery.',
    overview: 'Gyan VaniAi partners with enterprises to design and deliver custom IT solutions (from AI-enabled CRM and knowledge systems to internal portals and automation platforms) with architecture suited to multi-team rollout.',
    whoFor: 'Large organizations needing dedicated software partners for digital transformation initiatives.',
    deliverables: ['Solution architecture', 'Custom platforms', 'AI integrations', 'Migration & integrations', 'Ongoing support'],
    benefits: ['Scalable Architecture', 'High Performance', 'Custom AI Integration', 'Dedicated Support'],
    image: '/hero_dashboard.webp',
    imageAlt: 'Enterprise software solutions by Gyan VaniAi',
    relatedLinks: [
      { url: '/services/ai-development', text: 'AI Software Development' },
      { url: '/services/crm-development', text: 'CRM Development' }
    ],
    faqs: [
      { q: 'Do you work with enterprise procurement and SLAs?', a: 'Yes. We support structured delivery, documentation, and ongoing maintenance agreements.' }
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

      <div>
        <section className="hero" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
          <div className="container">
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
                <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li>{isIndustry ? 'Industries' : 'Services'}</li>
                <li aria-hidden="true">/</li>
                <li style={{ color: 'var(--text-primary)' }}>{pageData.h1}</li>
              </ol>
            </nav>

            <div className="seo-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h1 className="h1" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  {pageData.h1}
                </h1>
                <p className="text-lg text-muted" style={{ marginBottom: '2rem' }}>
                  {pageData.subtitle}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {pageData.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle2 size={20} color="var(--primary-color)" aria-hidden="true" />
                      <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get a Free Consultation <ArrowRight size={20} />
                </button>
              </div>
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
            </div>
          </div>
        </section>

        {/* GEO citeable content blocks */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 className="h2" style={{ marginBottom: '1rem' }}>Overview</h2>
            <p className="seo-overview text-muted" style={{ lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.05rem' }}>
              {pageData.overview}
            </p>

            <h2 className="h2" style={{ marginBottom: '1rem' }}>Who it&apos;s for</h2>
            <p className="seo-who-for text-muted" style={{ lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.05rem' }}>
              {pageData.whoFor}
            </p>

            {pageData.deliverables?.length > 0 && (
              <>
                <h2 className="h2" style={{ marginBottom: '1rem' }}>What you get</h2>
                <ul style={{ margin: '0 0 2rem', paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {pageData.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {pageFaqs.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h2 className="h2" style={{ marginBottom: '1.25rem' }}>Common questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pageFaqs.map((faq) => (
                    <div key={faq.q} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                      <h3 className="h3" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{faq.q}</h3>
                      <p className="text-muted" style={{ margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Process />
        <FAQ includeSchema={false} />

        {pageData.relatedLinks?.length > 0 && (
          <section className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
            <div style={{ padding: '2rem', background: 'color-mix(in srgb, var(--primary-color) 6%, transparent)', borderRadius: '1rem' }}>
              <h2 className="h3" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Related services</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {pageData.relatedLinks.map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {link.text} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactSection />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .seo-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}
