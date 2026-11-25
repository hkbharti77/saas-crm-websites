import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import TrustCenterShell from '../components/legal/TrustCenterShell';
import {
  LEGAL_META,
  TERMS_SECTIONS,
  TERMS_SUMMARY_STRIP,
} from '../config/legalDocumentsConfig';

const SECTION_BY_ID = Object.fromEntries(
  TERMS_SECTIONS.map((section) => [section.id, section])
);

function SectionHeading({ id }) {
  const meta = SECTION_BY_ID[id];
  return (
    <div className="trust-ed-section-header">
      <span className="trust-ed-section-num">Chapter {meta.number}</span>
      <h2 className="trust-ed-h2">{meta.title}</h2>
    </div>
  );
}

export default function TermsConditions() {
  const termsWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions | Gyan VaniAi',
    url: 'https://www.gyanvaniai.com/terms',
    dateModified: '2026-06-14',
    description:
      'Terms of Service, acceptable use, AI output governance, billing, and fair-dealing guidelines for Gyan VaniAi platforms.',
    publisher: {
      '@id': 'https://www.gyanvaniai.com/#organization',
    },
  };

  const officer = LEGAL_META.grievanceOfficer;

  return (
    <>
      <SeoHead
        title="Terms & Conditions | Gyan VaniAi"
        description="Terms of Service, acceptable use, AI output review obligations, Razorpay/Stripe/WhatsApp Native billing, and CCPA fair-dealing guidelines for Gyan VaniAi."
        canonical="https://www.gyanvaniai.com/terms"
        schema={termsWebPageSchema}
      />

      <TrustCenterShell
        activeDocId="terms"
        kicker="Gyan VaniAi Trust Center · Platform Service Agreement"
        title="Terms of Service"
        deck="Commercial terms, acceptable use standards, AI governance responsibilities, subscription billing rules, and statutory consumer protections governing access to Gyan VaniAi."
        summaryStrip={TERMS_SUMMARY_STRIP}
        sections={TERMS_SECTIONS}
        quickActions={[
          {
            label: 'Read Privacy Policy',
            to: '/privacy',
          },
          {
            label: 'View Pricing Plans',
            to: '/pricing',
          },
        ]}
      >
        {({ matchedIds, hasActiveSearch }) => {
          const isVisible = (id) => !hasActiveSearch || matchedIds.has(id);

          return (
            <>
              <div className="trust-ed-notice-box">
                <p className="trust-ed-notice-title">
                  Binding Platform Agreement
                </p>
                <p className="trust-ed-notice-text">
                  These Terms of Service govern your use of the{' '}
                  <strong>{LEGAL_META.brandName}</strong> website, enterprise AI
                  CRM workspaces, omnichannel messaging, voice automation, and
                  related software services operated by{' '}
                  <strong>{LEGAL_META.legalEntity}</strong>. By creating a
                  workspace, accepting these Terms during onboarding, or using
                  the service, you agree to be bound by them.
                </p>
              </div>

              {isVisible('agreement') && (
                <section id="agreement" className="trust-ed-section">
                  <SectionHeading id="agreement" />
                  <p className="trust-ed-prose">
                    These Terms form a legal agreement between you (or the
                    organization you represent) and{' '}
                    <strong>{LEGAL_META.legalEntity}</strong> (
                    {LEGAL_META.operatingModel}; all official notices handled
                    electronically).
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Business Authority:</strong> If you accept these
                      Terms on behalf of a company or organization, you confirm
                      that you have legal authority to bind that entity.
                    </li>
                    <li>
                      <strong>Workspace Administration:</strong> Workspace
                      administrators control team invitations, role permissions,
                      IP allowlists, and connected third-party integrations and
                      are responsible for activity under their workspace
                      accounts.
                    </li>
                    <li>
                      <strong>Credential Security:</strong> Keep login
                      credentials, API keys, and webhook secrets confidential
                      and notify{' '}
                      <a href={`mailto:${officer.email}`}>{officer.email}</a>{' '}
                      promptly upon suspecting unauthorized account access.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('acceptable-use') && (
                <section id="acceptable-use" className="trust-ed-section">
                  <SectionHeading id="acceptable-use" />
                  <p className="trust-ed-prose">
                    Gyan VaniAi provides customer relationship management,
                    WhatsApp Business Cloud API &amp; Coexistence, Telegram, web
                    chat, email/SMS workflows, appointment scheduling, support
                    ticketing, commerce order management, voice AI, and RAG
                    automation tools. Available features depend on your
                    subscribed plan and enabled integrations.
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Lawful Use &amp; Zero Spam:</strong> You must use
                      the service lawfully and strictly within your permissions.
                      You must not send unsolicited bulk messages (spam), upload
                      unlawfully obtained contact lists, impersonate third
                      parties, upload malicious payloads, or attempt
                      unauthorized access to another workspace.
                    </li>
                    <li>
                      <strong>Messaging Opt-In &amp; TRAI / Meta Rules:</strong>{' '}
                      When communicating with end-customers over WhatsApp, SMS,
                      or email, you warrant that you hold verifiable prior
                      opt-in consent in compliance with Meta WhatsApp Business
                      Messaging Policies, TRAI regulations (TCCCPR 2018), and
                      the DPDP Act, 2023. Recipients may opt out instantly by
                      replying <code className="trust-ed-code">STOP</code>,{' '}
                      <code className="trust-ed-code">UNSUBSCRIBE</code>, or{' '}
                      <code className="trust-ed-code">CANCEL</code>.
                    </li>
                    <li>
                      <strong>
                        Campaign, Tracking &amp; Call-Recording Notices:
                      </strong>{' '}
                      Businesses enabling outbound campaigns, conversion
                      tracking, microphone capture, or WhatsApp/voice call
                      recording are solely responsible for displaying clear
                      point-of-collection privacy notices and obtaining all
                      legally required permissions and recording consents from
                      participants.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('customer-data-ai') && (
                <section id="customer-data-ai" className="trust-ed-section">
                  <SectionHeading id="customer-data-ai" />
                  <p className="trust-ed-prose">
                    You retain all ownership rights in customer data, knowledge
                    documents, and content you submit to your workspace. You
                    grant {LEGAL_META.legalEntity} a limited right to host,
                    process, and transmit that content solely to provide,
                    secure, and support the service in accordance with our{' '}
                    <Link to="/privacy" className="trust-ed-link">
                      Privacy Policy
                    </Link>{' '}
                    and any executed Data Processing Agreement (DPA).
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Customer Lawful Basis:</strong> You are
                      responsible for maintaining accurate customer privacy
                      notices (including configuring your own Privacy Policy
                      URL, Terms URL, and grievance email on embedded web
                      widgets) and holding lawful instructions for all customer
                      records imported or processed.
                    </li>
                    <li>
                      <strong>Third-Party Integrations:</strong> Optional
                      integrations—including Google Workspace (Calendar, Meet,
                      Gmail, Contacts, Tasks, Drive, Sheets), Meta/WhatsApp,
                      Cloudinary, and payment gateways—depend on third-party
                      provider uptime, API permissions, and terms.
                    </li>
                    <li>
                      <strong>Mandatory Human Review of AI Outputs:</strong>{' '}
                      Generative AI responses, voice transcriptions, and
                      automated workflow outputs may occasionally contain
                      inaccuracies. You must configure appropriate guardrails
                      and review AI-generated replies before relying on them for
                      legal, financial, medical, or binding customer
                      commitments. Each workspace business remains solely
                      responsible for its own products, services, and
                      communications with its customers.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('billing-refunds') && (
                <section id="billing-refunds" className="trust-ed-section">
                  <SectionHeading id="billing-refunds" />
                  <p className="trust-ed-prose">
                    Current subscription tiers, Transparent Engineering
                    Partnership milestones, and applicable add-ons are published
                    on our{' '}
                    <Link to="/pricing" className="trust-ed-link">
                      Pricing page
                    </Link>
                    . Prices exclude applicable taxes (such as GST) unless
                    expressly stated at checkout.
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Active Payment Gateways:</strong> Platform
                      subscriptions and supported merchant checkouts operate via{' '}
                      <strong>
                        Razorpay, Stripe, and WhatsApp Native Payments
                      </strong>
                      . Checkout disclosures, receipts, and tax invoices are
                      issued electronically.
                    </li>
                    <li>
                      <strong>Billing Cycles &amp; Renewal:</strong> Monthly or
                      annual SaaS subscriptions bill in advance for each billing
                      cycle. Renewal terms and upcoming billing dates are
                      clearly surfaced in your workspace billing panel prior to
                      renewal.
                    </li>
                    <li>
                      <strong>Frictionless Cancellation:</strong> You may cancel
                      a SaaS subscription at any time from workspace billing
                      settings or by emailing{' '}
                      <a href={`mailto:${officer.email}`}>{officer.email}</a>{' '}
                      before the next billing cycle. Cancellation takes effect
                      at the end of your current paid period with no dark-pattern
                      obstacles.
                    </li>
                    <li>
                      <strong>Refund Policy:</strong> Fees paid for completed
                      billing cycles, consumed third-party messaging/telephony
                      usage, or delivered custom engineering sprint milestones
                      are non-refundable except in cases of duplicate billing,
                      material non-delivery attributable to Gyan VaniAi, or
                      where mandatory consumer protection law requires a refund.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('demo-sandbox') && (
                <section id="demo-sandbox" className="trust-ed-section">
                  <SectionHeading id="demo-sandbox" />
                  <p className="trust-ed-prose">
                    Gyan VaniAi offers a public evaluation sandbox hosted at{' '}
                    <a
                      href={LEGAL_META.demoPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {LEGAL_META.demoPortalUrl}
                    </a>
                    . By using the Live Demo environment, you agree that:
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>7-Day Evaluation Lifecycle:</strong> Demo
                      workspaces are provisioned strictly for non-production
                      evaluation and architectural testing without commercial
                      SLA guarantees.
                    </li>
                    <li>
                      <strong>Automatic Purpose-Exhaustion Purge:</strong>{' '}
                      Unless upgraded to an active subscription before expiry,
                      demo records, mock leads, chat threads, and configurations
                      are permanently purged after{' '}
                      <strong className="trust-ed-tabular">7 days</strong>.
                    </li>
                    <li>
                      <strong>No Live PII in Public Sandboxes:</strong> You must
                      not upload unredacted production customer PII, health
                      data, or live payment credentials into public demo
                      accounts. Export any test data you wish to retain prior to
                      expiry.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('suspension-export') && (
                <section id="suspension-export" className="trust-ed-section">
                  <SectionHeading id="suspension-export" />
                  <p className="trust-ed-prose">
                    We aim to give advance written notice before restricting
                    workspace access, except where immediate intervention is
                    necessary to protect platform security, prevent spam or
                    abuse, or comply with legal orders.
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Grounds for Suspension or Termination:</strong>{' '}
                      Overdue invoices following a grace notice, verified spam
                      or acceptable-use violations, compromised credentials,
                      unauthorized cross-tenant probing, or binding regulatory
                      directives.
                    </li>
                    <li>
                      <strong>Customer Data Export:</strong> Active workspaces
                      can export contacts, leads, and operational reports (for
                      example via CSV or connected Google Sheets) at any time.
                      Upon standard subscription termination, we provide a
                      reasonable export window of{' '}
                      <strong className="trust-ed-tabular">30 days</strong>{' '}
                      before scheduled workspace deletion.
                    </li>
                    <li>
                      <strong>Post-Closure Records &amp; Backups:</strong> After
                      the export window closes, active workspace records are
                      deleted or anonymized in accordance with our{' '}
                      <Link to="/privacy" className="trust-ed-link">
                        Privacy Policy retention schedule
                      </Link>
                      . Encrypted disaster-recovery backups expire automatically
                      on rolling security cycles, and statutory tax invoices are
                      retained strictly as required by law.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('ip-license') && (
                <section id="ip-license" className="trust-ed-section">
                  <SectionHeading id="ip-license" />
                  <p className="trust-ed-prose">
                    All Gyan VaniAi platform software, user interface designs,
                    AI orchestration frameworks, trademarks, and documentation
                    are owned exclusively by{' '}
                    <strong>{LEGAL_META.legalEntity}</strong> or its licensors.
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>SaaS License:</strong> Your active subscription
                      grants a non-exclusive, non-transferable, revocable right
                      to access and use Gyan VaniAi for your internal business
                      operations during the subscription term. You may not
                      reverse-engineer, sublicense, or resell access without
                      written authorization.
                    </li>
                    <li>
                      <strong>Custom Engineering Partnerships (MSA):</strong>{' '}
                      Where you engage Gyan VaniAi under a separate executed
                      Master Services Agreement or Transparent Engineering
                      Partnership statement of work, intellectual property
                      ownership of bespoke deliverables transfers as specified
                      in that signed agreement upon full payment.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('liability-dark-patterns') && (
                <section
                  id="liability-dark-patterns"
                  className="trust-ed-section"
                >
                  <SectionHeading id="liability-dark-patterns" />
                  <p className="trust-ed-prose">
                    Except as expressly warranted in a signed SLA or preserved
                    by mandatory statute, Gyan VaniAi is provided on an
                    &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. We
                    do not warrant uninterrupted third-party network delivery
                    (such as Meta Cloud API, telecom carriers, or upstream cloud
                    outages) or error-free generative AI outputs.
                  </p>
                  <p className="trust-ed-prose">
                    <strong>Limitation of Liability:</strong> To the maximum
                    extent permitted by applicable law, neither party shall be
                    liable for indirect, incidental, punitive, or consequential
                    damages, and Gyan VaniAi&apos;s aggregate liability arising
                    out of these Terms shall not exceed the total service fees
                    paid by you to Gyan VaniAi in the{' '}
                    <strong className="trust-ed-tabular">12 months</strong>{' '}
                    preceding the event giving rise to the claim. Nothing in
                    these Terms excludes or limits any liability that cannot be
                    excluded under applicable statutory law.
                  </p>

                  <h3 className="trust-ed-h3">
                    Prohibition of Dark Patterns &amp; Fair Dealing (CCPA 2023)
                  </h3>
                  <p className="trust-ed-prose">
                    In adherence to the Central Consumer Protection
                    Authority&apos;s{' '}
                    <em>
                      Guidelines for Prevention and Regulation of Dark Patterns,
                      2023
                    </em>
                    , Gyan VaniAi maintains:
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>No False Urgency or Basket Sneaking:</strong> No
                      fabricated scarcity countdowns or hidden checkout add-ons.
                    </li>
                    <li>
                      <strong>No Confirm Shaming or Forced Action:</strong>{' '}
                      Cookie banner and marketing opt-out options use neutral
                      language, and public site content is never gated behind
                      unnecessary tracking consent.
                    </li>
                    <li>
                      <strong>Verifiable Consent Audit Logging:</strong> Cookie
                      banner choices are logged solely for DPDP §6 / GDPR Art.
                      7(1) statutory proof, retained for{' '}
                      <strong className="trust-ed-tabular">12 months</strong>,
                      and never used for advertising profiling.
                    </li>
                    <li>
                      <strong>Easy Cancellation:</strong> Cancelling a plan or
                      withdrawing consent is as straightforward as signing up.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('governing-grievance') && (
                <section id="governing-grievance" className="trust-ed-section">
                  <SectionHeading id="governing-grievance" />
                  <p className="trust-ed-prose">
                    <strong>Governing Law &amp; Disputes:</strong> These Terms
                    are governed by the laws of the Republic of India, including
                    the Information Technology Act, 2000, the Digital Personal
                    Data Protection Act, 2023, the Consumer Protection Act,
                    2019, and the Indian Contract Act, 1872. Subject to
                    mandatory statutory rights, disputes shall be subject to the
                    exclusive jurisdiction of competent courts in{' '}
                    <strong>New Delhi, India</strong>.
                  </p>
                  <p className="trust-ed-prose">
                    <strong>Changes to These Terms:</strong> We may update these
                    Terms to reflect new features, regulatory developments, or
                    security practices. For material changes, we will provide at
                    least{' '}
                    <strong className="trust-ed-tabular">
                      15 days&apos; advance notice
                    </strong>{' '}
                    via email or an in-product notice before the updated Terms
                    take effect. Continued use after the effective date
                    constitutes acceptance of the updated Terms.
                  </p>

                  <div className="trust-ed-dossier">
                    <p className="trust-ed-panel-label">
                      Legal Desk &amp; Grievance Redressal (DPDP §13 / Rule 11)
                    </p>
                    <h3 className="trust-ed-panel-title">
                      Grievance Redressal Officer Contact Dossier
                    </h3>
                    <div className="trust-ed-dossier-grid">
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Officer Name
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.name}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Designation
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.designation}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Support &amp; Legal Email
                        </span>
                        <span className="trust-ed-dossier-value">
                          <a
                            href={`mailto:${officer.email}`}
                            className="trust-ed-link"
                          >
                            {officer.email}
                          </a>
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Telephone
                        </span>
                        <span className="trust-ed-dossier-value">
                          <a
                            href={officer.phoneHref}
                            className="trust-ed-link"
                          >
                            {officer.phoneDisplay}
                          </a>{' '}
                          ({officer.hours})
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Operating Mode
                        </span>
                        <span className="trust-ed-dossier-value">
                          {LEGAL_META.operatingModel}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Official Correspondence
                        </span>
                        <span className="trust-ed-dossier-value">
                          {LEGAL_META.correspondenceMode}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Acknowledgment
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.acknowledgmentSla}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Statutory Resolution
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.resolutionSla}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          );
        }}
      </TrustCenterShell>
    </>
  );
}
