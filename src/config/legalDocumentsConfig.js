import { CANONICAL_ENTITY } from './entityIdentityConfig';

/**
 * Single source of truth for Gyan VaniAi's Legal & Trust Center (/privacy and /terms).
 * Aligned with the verified platform backend & web-widget data inventory,
 * canonical corporate identity, and active production payment gateways.
 */

export const LEGAL_META = {
  brandName: CANONICAL_ENTITY.brandName,
  legalEntity: CANONICAL_ENTITY.legalName,
  websiteUrl: CANONICAL_ENTITY.domain,
  effectiveDate: 'June 14, 2026',
  jurisdiction: 'India & Global B2B',
  operatingModel: 'Remote-First / Virtual Operations (India)',
  correspondenceMode:
    'Electronic correspondence via contact@gyanvaniai.com (no walk-in physical office)',
  demoPortalUrl: 'https://connect.gyanvaniai.online/',
  grievanceOfficer: {
    name: 'Himanshu Bharti',
    designation: 'Lead Privacy Compliance Officer & Grievance Redressal Officer',
    email: CANONICAL_ENTITY.email,
    phoneDisplay: '+91 87006 20913',
    phoneHref: 'tel:+918700620913',
    hours: 'Mon–Fri, 10:00–18:00 IST',
    acknowledgmentSla: 'Within 24 hours',
    resolutionSla: '15 business days (up to 30 days for complex erasures)',
  },
  activePaymentGateways: ['Razorpay', 'Stripe', 'WhatsApp Native Payments'],
};

export const TRUST_HUB_LINKS = [
  { id: 'privacy', label: 'Privacy Policy', to: '/privacy' },
  { id: 'terms', label: 'Terms of Service', to: '/terms' },
  { id: 'security', label: 'Security', to: '/security' },
];

export const PRIVACY_SUMMARY_STRIP = [
  { label: 'Legal Roles', value: 'Data Fiduciary & Processor' },
  { label: 'Grievance Officer', value: 'Himanshu Bharti' },
  { label: 'DSR Target SLA', value: '24h Ack · 15 Business Days' },
  { label: 'Live Demo Sandbox', value: '7-Day Automatic Purge' },
];

export const TERMS_SUMMARY_STRIP = [
  { label: 'Contracting Entity', value: 'Gyan VaniAi Technologies' },
  { label: 'Active Gateways', value: 'Razorpay · Stripe · WhatsApp' },
  { label: 'Governing Law', value: 'India (New Delhi Courts)' },
  { label: 'Fair Dealing', value: 'CCPA Dark Patterns 2023' },
];

export const PRIVACY_SECTIONS = [
  {
    id: 'role',
    number: '01',
    title: 'Who We Are & Dual Data Roles',
    shortTitle: 'Who We Are & Roles',
    summary: 'How Gyan VaniAi acts as a Data Fiduciary for platform accounts and a Data Processor for tenant customer records.',
    keywords: ['fiduciary', 'processor', 'controller', 'gyan vaniai', 'tenant', 'dpdp', 'role', 'remote', 'virtual', 'india'],
  },
  {
    id: 'inventory',
    number: '02',
    title: 'Information We Collect & Platform Inventory',
    shortTitle: 'Platform Data Inventory',
    summary: 'Verified inventory covering workspaces, business profiles, login security, customer enquiries, bookings, omnichannel chats, voice, AI, and campaigns.',
    keywords: [
      'account', 'staff', 'workspace', 'password', 'business profile', 'coordinates', 'ip', 'session',
      'biometrics', 'billing', 'contacts', 'enquiries', 'bookings', 'appointments', 'tickets', 'orders',
      'webchat', 'telegram', 'sms', 'email', 'voice', 'microphone', 'transcripts', 'rag', 'ai training',
      'campaigns', 'tracking', 'cloudinary',
    ],
  },
  {
    id: 'integrations',
    number: '03',
    title: 'Connected Services & Integration Data Flows',
    shortTitle: 'Integration Data Flows',
    summary: 'Interactive breakdown of Google Sign-In & Workspace scopes, Meta & WhatsApp Business flows, Razorpay/Stripe/WhatsApp Native payments, and browser storage.',
    keywords: [
      'google', 'oauth', 'calendar', 'meet', 'gmail', 'contacts', 'people api', 'tasks', 'drive', 'sheets',
      'limited use', 'meta', 'whatsapp', 'embedded signup', 'waba', 'webhook', 'deauthorization', 'conversion api',
      'razorpay', 'stripe', 'whatsapp native', 'payments', 'refund', 'widget', 'localstorage',
    ],
  },
  {
    id: 'cookies-telemetry',
    number: '04',
    title: 'Cookies, Browser Storage & Consent Audit Records',
    shortTitle: 'Cookies & Telemetry',
    summary: 'Immutable consent audit records, bundled widget localStorage keys, and tiered website analytics under Google Consent Mode v2 and GPC.',
    keywords: ['cookies', 'consent audit', 'vercel', 'cloudflare', 'ga4', 'google analytics', 'clarity', 'gpc', 'localstorage', 'ttl'],
  },
  {
    id: 'lawful-consent',
    number: '05',
    title: 'Lawful Grounds, Consent & Ease of Withdrawal',
    shortTitle: 'Consent & Lawful Grounds',
    summary: 'Legal bases under India DPDP Act 2023 and GDPR, zero-spam messaging rules, and frictionless withdrawal mechanisms.',
    keywords: ['consent', 'withdrawal', 'lawful basis', 'gdpr', 'dpdp', 'trai', 'stop', 'unsubscribe', 'opt-out', 'marketing'],
  },
  {
    id: 'subprocessors',
    number: '06',
    title: 'Sub-Processors & Cross-Border Transfers',
    shortTitle: 'Sub-Processors & Transfers',
    summary: 'Vetted infrastructure, messaging, media storage, AI, and payment recipients with cross-border transfer safeguards under DPDP §16 and GDPR.',
    keywords: ['subprocessor', 'aws', 'google cloud', 'cloudflare', 'cloudinary', 'meta', 'vercel', 'microsoft', 'cross-border', 'transfer', 'scc'],
  },
  {
    id: 'retention',
    number: '07',
    title: 'Data Retention, Archival & Erasure Scope',
    shortTitle: 'Retention & Erasure',
    summary: 'Category-by-category retention schedules, 90-day automated archival, 7-day demo purge, and the distinction between widget clearing and CRM erasure.',
    keywords: ['retention', 'deletion', 'erasure', 'archive', '90 days', '7 days', 'demo', 'backup', 'widget clear', 'ttl', 'cert-in'],
  },
  {
    id: 'security',
    number: '08',
    title: 'Security Safeguards & Breach Intimation',
    shortTitle: 'Security & Breach Protocol',
    summary: 'Encryption in transit and at rest, encrypted OAuth token storage, RBAC, IP allowlists, and CERT-In / DPDP Board incident reporting.',
    keywords: ['security', 'tls', 'aes-256', 'encryption', 'rbac', 'allowlist', 'breach', 'cert-in', '6 hours', 'mfa'],
  },
  {
    id: 'children',
    number: '09',
    title: "Children's & Sensitive Data Protection",
    shortTitle: "Children's Data (§9)",
    summary: 'B2B 18+ audience boundary, prohibition on behavioral tracking or targeted ads for minors, and tenant guidance for sensitive free-text forms.',
    keywords: ['children', 'minor', '18', 'parental', 'health', 'sensitive', 'section 9'],
  },
  {
    id: 'rights',
    number: '10',
    title: 'Your Privacy Rights & Escalation Routes',
    shortTitle: 'Your Rights (DPDP & GDPR)',
    summary: 'Access, correction, erasure, consent withdrawal, nomination, data portability, and supervisory authority escalation routes.',
    keywords: ['rights', 'access', 'correction', 'erasure', 'nominate', 'portability', 'object', 'restrict', 'dpdp board', 'gdpr'],
  },
  {
    id: 'grievance-dsr',
    number: '11',
    title: 'Grievance Officer, Updates & Live DSR Portal',
    shortTitle: 'Grievance Officer & DSR Form',
    summary: 'Designated Grievance Officer contact dossier, 15-day notice for material policy updates, and live Data Subject Request submission form.',
    keywords: ['grievance', 'himanshu bharti', 'contact', 'dsr', 'form', 'ticket', 'sla', 'changes', 'updates'],
  },
];

export const PLATFORM_DATA_INVENTORY = [
  {
    group: 'Platform Accounts & Workspaces',
    rows: [
      {
        category: 'Account & Staff Membership',
        fields: 'Email, display name, phone number, account and workspace IDs, roles, permissions, account status, onboarding consent timestamp, and staff availability/last-seen timestamps. Password-based accounts store salted cryptographic password hashes only.',
        purpose: 'Provision workspaces, authenticate team members, enforce role-based permissions, and route live conversations.',
        basis: 'Contract performance & verifiable consent (DPDP §6)',
      },
      {
        category: 'Business Profile & Configured Location',
        fields: 'Business name, industry type and subtype, postal address, logo, public profile content, and workspace-configured latitude/longitude coordinates.',
        purpose: 'Display business identity across customer-facing booking and chat touchpoints. Saved coordinates represent a business profile field, not passive end-user device GPS tracking.',
        basis: 'Contract performance',
      },
      {
        category: 'Login, Device & Security Events',
        fields: 'Device name, IP address, session and token identifiers, sign-in timestamps, login alert triggers, and workspace IP allowlists where enabled. User preferences may record a biometrics-enabled toggle; Gyan VaniAi does not collect or store biometric samples or templates.',
        purpose: 'Prevent unauthorized access, investigate security incidents, enforce workspace allowlists, and preserve forensic integrity.',
        basis: 'Reasonable security safeguards & legitimate interests (DPDP §7 / §8(5); GDPR Art. 6(1)(f))',
      },
      {
        category: 'Subscription & Platform Billing',
        fields: 'Plan tier, billing cycle, amount, currency, payment status, provider transaction references (Razorpay or Stripe), and invoice delivery status.',
        purpose: 'Administer SaaS subscriptions, issue tax invoices, reconcile settlements, and answer billing enquiries.',
        basis: 'Contract performance & statutory tax/accounting obligations',
      },
    ],
  },
  {
    group: 'Business Customers, Prospects & Website Visitors',
    rows: [
      {
        category: 'Contacts & Lead Enquiries',
        fields: 'Name, email, phone or WhatsApp identifier, lead source, tags, and assigned agent. Depending on fields configured by a business tenant, forms or imports may also capture company, service category, requirement, budget, city, country, age, gender, address, postcode, preferred date, and message notes.',
        purpose: 'Respond to enquiries, qualify leads, and manage customer relationships under the instructing business workspace.',
        basis: 'Processed on tenant instructions (Data Processor); verifiable consent for Gyan VaniAi direct enquiries',
      },
      {
        category: 'Bookings, Appointments, Support & Orders',
        fields: 'Scheduling details, custom form answers, meeting links, support ticket descriptions, conversation threads, resolution status, and commerce order or payment references.',
        purpose: 'Schedule consultations, fulfill service bookings, resolve support tickets, and reconcile customer orders.',
        basis: 'Processed on tenant instructions; businesses must review sensitive free-text fields before enabling regulated workflows',
      },
      {
        category: 'Omnichannel Communications',
        fields: 'Website chat messages, sender details, session timestamps, and enabled channel payloads across WhatsApp, Telegram (Telegram ID, first/last name, username, language), email, and SMS, together with delivery receipts, attachments, and bot-to-human handoff history.',
        purpose: 'Deliver conversational responses, preserve thread continuity across channels, and route escalations to human agents.',
        basis: 'Verifiable consent / tenant instruction',
      },
      {
        category: 'Voice, AI Workflows & Knowledge Base',
        fields: 'When voice features are enabled, browser microphone input, call identifiers, call timing, audio, transcripts, WhatsApp call recording metadata with Cloudinary asset references, and tenant-supplied knowledge-base documents stored in isolated vector indexes.',
        purpose: 'Power real-time voice conversations, call summaries, and retrieval-augmented responses strictly for the owning workspace. Customer data is never used to train public foundation AI models.',
        basis: 'Explicit feature enablement, notice at call/voice onset, and tenant instruction',
      },
      {
        category: 'Campaigns, Consent & Interaction Events',
        fields: 'Channel opt-in/opt-out preferences, consent audit events, campaign delivery logs, email opens and link clicks, WhatsApp tracked link clicks, and Meta conversion events when configured by a workspace.',
        purpose: 'Respect recipient preferences, measure campaign delivery, and attribute conversions where legally authorized.',
        basis: 'Separate affirmative opt-in consent & one-step opt-out controls',
      },
    ],
  },
];

export const INTEGRATION_FLOW_TABS = [
  {
    id: 'google',
    label: 'Google Workspace',
    eyebrow: 'OAuth 2.0 & Limited Use',
    title: 'Google Sign-In & Workspace Integrations',
    intro:
      'When you sign in with Google or connect an optional Google Workspace integration, Gyan VaniAi requests only the scopes needed for the specific workflow you enable. OAuth access and refresh tokens are stored encrypted at rest alongside granted scopes, expiry timestamps, revocation state, and API audit logs (tenant/user/connection ID, operation, request ID, outcome, latency, retries, and timestamp).',
    flows: [
      {
        name: 'Google Sign-In',
        detail: 'Reads the verified Google ID token subject ID, email address, and display name solely to authenticate or link your Gyan VaniAi account.',
      },
      {
        name: 'Calendar & Google Meet',
        detail: 'Sends appointment title, date, time, duration, and attendee email to create calendar events and Meet links, and can delete synced events using the Google event ID.',
      },
      {
        name: 'Gmail (Send Scope)',
        detail: 'Transmits outbound messages you initiate from the connected account using recipient, optional CC/BCC, subject, and HTML body, with an optional CRM record reference for activity logging.',
      },
      {
        name: 'Contacts (People API Import)',
        detail: 'Reads People API connections upon workspace import to extract the Google person resource ID and first available display name, email, and phone number. Workspaces are responsible for lawful basis before importing third-party contacts.',
      },
      {
        name: 'Google Tasks',
        detail: 'Lists, creates, and marks tasks complete inside the connected account’s default task list using task IDs, titles, notes, due dates, and completion status.',
      },
      {
        name: 'Google Drive (File Scope)',
        detail: 'Uploads files, creates folders, and lists files strictly within the granted per-file Drive scope, storing file ID, name, MIME type, size, timestamps, and view/download links.',
      },
      {
        name: 'Google Sheets (Export & Import)',
        detail: 'Exports lead references, contact names, WhatsApp/mobile numbers, emails, statuses, sources, and creation dates to a new spreadsheet owned by your Google account, or imports rows from a spreadsheet ID and range you specify. Exported sheets create a separate copy governed by your Google account.',
      },
    ],
    complianceNoteTitle: 'Google API Services User Data Policy (Limited Use) & Disconnection',
    complianceNote:
      'Gyan VaniAi’s use and transfer of information received from Google APIs strictly adheres to the Google API Services User Data Policy (including the Limited Use requirements) and the Google Workspace API User Data and Developer Policy. We never sell Google user data, never use Workspace data for advertising, and never transfer Workspace data to train generalized AI/ML models. You can disconnect Google at any time from Workspace Settings → Integrations (which revokes stored tokens) and from your Google Account Security → Third-party apps & services panel.',
  },
  {
    id: 'meta',
    label: 'Meta & WhatsApp',
    eyebrow: 'Official Cloud API & Coexistence',
    title: 'Meta & WhatsApp Business Data Flows',
    intro:
      'Meta and WhatsApp integrations involve three distinct operational flows affecting workspace administrators and end-customers differently:',
    flows: [
      {
        name: '1. Business Onboarding (Embedded Signup)',
        detail: 'A workspace administrator completes Meta Embedded Signup and supplies an authorization code exchanged for an access token. Gyan VaniAi retrieves business ownership metadata, WhatsApp Business Account (WABA) IDs, phone-number IDs, display numbers, verified names, quality ratings, webhook subscriptions, and optional dataset IDs to enable Graph API operations.',
      },
      {
        name: '2. Customer Communications & Call Metadata',
        detail: 'Inbound webhooks deliver customer WhatsApp identifiers, message content and IDs, interaction/delivery statuses, supported media, and call session metadata (participants, timing, and optional Cloudinary recording references) into the tenant CRM. Outbound messages transmit the recipient identifier and selected message or order payload to WhatsApp.',
      },
      {
        name: '3. Meta Deauthorization vs. CRM Erasure Scope',
        detail: 'Meta deauthorization and deletion callbacks identify a connected Meta user ID to revoke platform credentials and disconnect the integration. Because credential revocation has a narrower scope than erasing a business’s historical CRM records, end-customers seeking erasure of stored leads, chats, or tickets should submit a request to the business or through our DSR Portal below.',
      },
      {
        name: '4. Advertising Measurement (Meta Conversions API)',
        detail: 'Only when a workspace explicitly configures Meta conversion measurement, Gyan VaniAi constructs dataset events containing event name, event ID, timestamp, WABA ID, messaging channel, and click-to-WhatsApp attribution identifiers, logging delivery status and diagnostics. Workspaces remain responsible for obtaining required consent and disclosing conversion measurement in their customer privacy notice.',
      },
    ],
    complianceNoteTitle: 'Zero-Spam & TRAI / Meta Policy Enforcement',
    complianceNote:
      'Transactional confirmations fulfill explicit inquiries, while promotional broadcasts require separate affirmative opt-in consent. Any recipient can stop WhatsApp messages immediately by replying STOP, CANCEL, or UNSUBSCRIBE.',
  },
  {
    id: 'payments',
    label: 'Payments & Webhooks',
    eyebrow: 'Razorpay · Stripe · WhatsApp Native',
    title: 'Active Payment Gateways & Webhook Reconciliation',
    intro:
      'Platform subscriptions (paid by workspace customers to Gyan VaniAi) and merchant customer orders (paid by end-customers to a business using Gyan VaniAi) are processed exclusively through our active production gateways: Razorpay, Stripe, and WhatsApp Native Payments.',
    flows: [
      {
        name: 'Razorpay (Subscriptions & Direct Payment Links)',
        detail: 'Transmits amount, currency, order reference, receipt/notes, description, and customer name and WhatsApp contact when provided. Supports cryptographic signature verification and refund dispatch (amount and reason).',
      },
      {
        name: 'Stripe (Global Subscriptions & Checkout)',
        detail: 'Transmits order reference, currency, amount, item description, return URL, and an idempotency key to prevent duplicate charges. Card and banking credentials are handled directly inside Stripe’s PCI-DSS environment.',
      },
      {
        name: 'WhatsApp Native Payments',
        detail: 'Initiates orders via WhatsApp order-details messages containing WhatsApp ID, customer name, item references, quantities, prices, taxes, discounts, shipping, and totals. Provider status updates reconcile against the order reference, and refunds route via the connected merchant gateway.',
      },
      {
        name: 'Provider Webhook Persistence & Reconciliation',
        detail: 'When a payment gateway sends an asynchronous webhook callback, our payment processor persists structured transaction fields (provider IDs, checkout URL, status, failure reason, payment time) and may retain raw provider webhook payloads to reconcile settlements, verify signatures, and investigate disputes. Access is restricted to authorized billing/security systems.',
      },
    ],
    complianceNoteTitle: 'Merchant Configuration & Gateway Notices',
    complianceNote:
      'Merchant gateway keys and webhook secrets are stored encrypted and isolated per workspace. Payment processors independently govern checkout payment-instrument data under their own privacy notices and PCI-DSS frameworks.',
  },
  {
    id: 'widget',
    label: 'Widget & Browser Storage',
    eyebrow: 'Client-Side State & Consent',
    title: 'Bundled Web Chat Widget & Browser Storage',
    intro:
      'When you interact with the Gyan VaniAi web chat widget embedded on our website or a tenant storefront, the widget uses browser localStorage strictly to maintain continuity and honor your interface preferences.',
    flows: [
      {
        name: 'Session & Conversation Continuity',
        detail: 'Stores a session identifier and up to 50 recent chat messages locally in your browser so your conversation does not disappear on page reload.',
      },
      {
        name: 'Preferences & Consent State',
        detail: 'Stores your selected visual theme, local widget consent acknowledgment, live-agent handoff state, and visit state.',
      },
      {
        name: 'Scope of Clearing a Widget Chat',
        detail: 'Using the widget’s clear/reset control removes the active browser chat session and selected web-chat messages. Clearing local browser storage does not automatically delete separate CRM lead records, support tickets, or invoices held by the business; submit a DSR request below for full record erasure.',
      },
      {
        name: 'Website Cookies & Global Privacy Control (GPC)',
        detail: 'Essential site functionality operates without advertising cookies. Optional analytics (GA4) and UX diagnostics (Microsoft Clarity) remain blocked by default until affirmative consent is granted via our Cookie Preferences control, and Global Privacy Control (GPC) browser signals are honored.',
      },
    ],
    complianceNoteTitle: 'Tenant Widget Configuration',
    complianceNote:
      'Business tenants embedding the Gyan VaniAi widget configure their own Privacy Policy URL, Terms URL, and grievance email so end-customers always see purpose-specific disclosures at the point of collection.',
  },
];

export const TELEMETRY_PROVIDERS = [
  {
    provider: 'Vercel Web Analytics',
    dataFlow: 'Aggregate page paths, OS, and browser family with query parameters stripped.',
    storage: 'Cookieless; 24h rotating request-derived hash. Zero persistent client storage.',
    basis: 'Legitimate Interest (Operational reliability)',
    revocation: 'Honors browser privacy signals & opt-out controls.',
  },
  {
    provider: 'Cloudflare Web Analytics',
    dataFlow: 'Aggregate Core Web Vitals (LCP, INP, CLS) and HTTP response latency.',
    storage: 'Cookieless beacon reading browser Performance APIs. No cross-site identifiers.',
    basis: 'Legitimate Interest (Service availability)',
    revocation: 'Non-profiling telemetry; honors Global Privacy Control (GPC).',
  },
  {
    provider: 'Google Analytics 4 (GA4)',
    dataFlow: 'Page navigation metrics. Cookieless pings in default denied state; full session analytics only after opt-in.',
    storage: 'Default: Cookieless. Consented: _ga cookies (up to 14 months).',
    basis: 'Google Consent Mode v2 (Default Denied → Affirmative Opt-In)',
    revocation: 'Toggle off anytime in Cookie Preferences to restore denied state.',
  },
  {
    provider: 'Microsoft Clarity',
    dataFlow: 'Scroll depth, click heatmaps, and UX trajectories with automatic masking of sensitive form inputs.',
    storage: 'Consented only: _clck (1 year), _clsk (24 hours).',
    basis: 'Explicit Consent (DPDP §6 / GDPR Art. 6(1)(a))',
    revocation: 'Gated behind Session Replay opt-in; revocation calls clarity("consent", false).',
  },
];

export const RETENTION_SCHEDULES = [
  {
    classification: 'Live Demo Sandbox Accounts',
    period: '7 days from provisioning',
    action: 'Automatic purpose-exhaustion purge of mock leads, chats, and workspace settings.',
  },
  {
    classification: 'Unconfirmed Newsletter Leads',
    period: '30 days from sign-up',
    action: 'Permanent deletion if double opt-in is not completed.',
  },
  {
    classification: 'Eligible Closed Operational Records',
    period: '90-day automated archival cycle',
    action: 'Database retention job archives eligible inactive records per tenant retention policy; deletion honored via verified DSR.',
  },
  {
    classification: 'Cookie Consent Audit Logs',
    period: '12 months (365 days)',
    action: 'Automated database TTL index purge.',
  },
  {
    classification: 'Security & Forensic Audit Trails',
    period: '12 months minimum (CERT-In)',
    action: 'Append-only tamper-resistant storage for statutory cybersecurity compliance.',
  },
  {
    classification: 'Commercial & Demo Inquiries',
    period: 'Up to 24 months from last correspondence',
    action: 'Cryptographic anonymization or permanent deletion.',
  },
  {
    classification: 'Subscription Invoices & Tax Records',
    period: 'Up to 8 years (Indian tax/accounting law)',
    action: 'Archived strictly for statutory audit obligations, isolated from active marketing or AI workflows.',
  },
];

export const TERMS_SECTIONS = [
  {
    id: 'agreement',
    number: '01',
    title: 'Agreement, Authority & Workspace Accounts',
    shortTitle: 'Agreement & Accounts',
    summary: 'Contract formation with Gyan VaniAi Technologies, business authority warranty, workspace administration, and credential security.',
    keywords: ['agreement', 'accounts', 'authority', 'workspace', 'administrator', 'credentials', 'unauthorized', 'access'],
  },
  {
    id: 'acceptable-use',
    number: '02',
    title: 'Platform Services, Messaging & Acceptable Use',
    shortTitle: 'Services & Acceptable Use',
    summary: 'Permitted CRM, messaging, scheduling, voice, and automation usage; zero-spam rules; and customer responsibility for campaign and call-recording notices.',
    keywords: ['services', 'acceptable use', 'spam', 'contact lists', 'whatsapp', 'sms', 'trai', 'tcccpr', 'recording', 'campaign', 'opt-in', 'stop'],
  },
  {
    id: 'customer-data-ai',
    number: '03',
    title: 'Customer Data, Third-Party Integrations & AI Governance',
    shortTitle: 'Customer Data & AI Review',
    summary: 'Customer ownership of submitted data, third-party integration dependencies, and mandatory human review of AI-generated outputs.',
    keywords: ['customer data', 'dpa', 'integrations', 'google', 'meta', 'ai', 'hallucination', 'human review', 'automated outputs', 'rag'],
  },
  {
    id: 'billing-refunds',
    number: '04',
    title: 'Plans, Payments, Cancellation & Refunds',
    shortTitle: 'Plans, Payments & Refunds',
    summary: 'Transparent pricing, taxes, renewal behavior across Razorpay, Stripe, and WhatsApp Native Payments, frictionless cancellation, and refund rules.',
    keywords: ['pricing', 'plans', 'billing', 'razorpay', 'stripe', 'whatsapp native', 'gst', 'taxes', 'renewal', 'cancel', 'cancellation', 'refunds'],
  },
  {
    id: 'demo-sandbox',
    number: '05',
    title: 'Live Demo Platform & 7-Day Retention',
    shortTitle: 'Live Demo & 7-Day Purge',
    summary: 'Non-production rules for connect.gyanvaniai.online, 7-day automatic purge, and prohibition on uploading live customer PII into public sandboxes.',
    keywords: ['demo', 'sandbox', '7 days', 'trial', 'evaluation', 'connect.gyanvaniai.online', 'purge'],
  },
  {
    id: 'suspension-export',
    number: '06',
    title: 'Suspension, Termination & Data Export',
    shortTitle: 'Suspension & Data Export',
    summary: 'Conditions for suspension or termination, notice standards, pre-closure export options (CSV/Google Sheets), and post-closure deletion and backup expiry.',
    keywords: ['suspension', 'termination', 'export', 'csv', 'sheets', 'closure', 'backups', 'deletion'],
  },
  {
    id: 'ip-license',
    number: '07',
    title: 'Intellectual Property & Platform License',
    shortTitle: 'Intellectual Property',
    summary: 'Ownership of Gyan VaniAi software, agents, and trademarks; subscription usage license; and custom engineering IP transfer under executed MSAs.',
    keywords: ['intellectual property', 'ip', 'license', 'msa', 'trademarks', 'reverse engineering', 'ownership'],
  },
  {
    id: 'liability-dark-patterns',
    number: '08',
    title: 'Warranties, Limitation of Liability & Fair Dealing',
    shortTitle: 'Liability & Dark Patterns',
    summary: 'Commercial warranty boundaries, 12-month fee liability cap preserving mandatory statutory rights, and CCPA Dark Patterns 2023 compliance.',
    keywords: ['warranty', 'liability', 'indemnification', 'dark patterns', 'ccpa', 'consumer protection', 'cookies', 'consent audit'],
  },
  {
    id: 'governing-grievance',
    number: '09',
    title: 'Governing Law, Updates & Grievance Redressal',
    shortTitle: 'Governing Law & Contact',
    summary: 'Laws of India (New Delhi courts), advance notice for material Terms updates, and designated Grievance Redressal Officer contact dossier.',
    keywords: ['governing law', 'india', 'new delhi', 'disputes', 'changes', 'updates', 'grievance', 'himanshu bharti', 'contact'],
  },
];

/**
 * Pure client-side section filter used by the Executive Trust Center sidebar search.
 */
export function filterLegalSections(sections, rawQuery) {
  const query = String(rawQuery || '').trim().toLowerCase();
  if (!query) return sections;

  const terms = query.split(/\s+/).filter(Boolean);
  return sections.filter((section) => {
    const haystack = [
      section.number,
      section.title,
      section.shortTitle,
      section.summary,
      ...(section.keywords || []),
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
