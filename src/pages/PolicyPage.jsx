import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import TrustCenterShell from '../components/legal/TrustCenterShell';
import IntegrationFlowExplorer from '../components/legal/IntegrationFlowExplorer';
import PrivacyRequestForm from '../components/legal/PrivacyRequestForm';
import {
  LEGAL_META,
  PLATFORM_DATA_INVENTORY,
  PRIVACY_SECTIONS,
  PRIVACY_SUMMARY_STRIP,
  RETENTION_SCHEDULES,
  TELEMETRY_PROVIDERS,
} from '../config/legalDocumentsConfig';

const SECTION_BY_ID = Object.fromEntries(
  PRIVACY_SECTIONS.map((section) => [section.id, section])
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

export default function PolicyPage() {
  const privacyWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | Gyan VaniAi',
    url: 'https://www.gyanvaniai.com/privacy',
    dateModified: '2026-06-14',
    description:
      'Privacy Policy, platform data inventory, connected integration disclosures, and Data Subject Request portal for Gyan VaniAi Technologies.',
    publisher: {
      '@id': 'https://www.gyanvaniai.com/#organization',
    },
  };

  const officer = LEGAL_META.grievanceOfficer;

  return (
    <>
      <SeoHead
        title="Privacy Policy | Gyan VaniAi"
        description="Privacy Policy, verified platform data inventory, Google Workspace & Meta WhatsApp disclosures, and live DPDP/GDPR privacy request portal for Gyan VaniAi."
        canonical="https://www.gyanvaniai.com/privacy"
        schema={privacyWebPageSchema}
      />

      <TrustCenterShell
        activeDocId="privacy"
        kicker="Gyan VaniAi Trust Center · Legal & Data Governance"
        title="Privacy Policy"
        deck="How Gyan VaniAi Technologies collects, processes, protects, and deletes personal data across our website, enterprise AI CRM workspaces, omnichannel messaging, voice workflows, and connected third-party integrations."
        summaryStrip={PRIVACY_SUMMARY_STRIP}
        sections={PRIVACY_SECTIONS}
        quickActions={[
          {
            label: 'Submit Privacy Request',
            href: '#privacy-contact',
            sectionId: 'grievance-dsr',
          },
          {
            label: 'Read Terms of Service',
            to: '/terms',
          },
        ]}
      >
        {({ matchedIds, hasActiveSearch, jumpTo }) => {
          const isVisible = (id) => !hasActiveSearch || matchedIds.has(id);

          return (
            <>
              <div className="trust-ed-notice-box">
                <p className="trust-ed-notice-title">
                  Statutory Compliance Notice
                </p>
                <p className="trust-ed-notice-text">
                  This Privacy Policy explains how{' '}
                  <strong>{LEGAL_META.legalEntity}</strong> handles personal
                  information when you visit{' '}
                  <strong>{LEGAL_META.websiteUrl}</strong>, operate a Gyan
                  VaniAi workspace, or interact with a business using Gyan
                  VaniAi. It aligns with India&apos;s{' '}
                  <strong>
                    Digital Personal Data Protection Act, 2023 (DPDP Act)
                  </strong>{' '}
                  (subject to notified statutory phase-in schedules), the{' '}
                  <strong>DPDP Rules, 2025</strong>, the{' '}
                  <strong>Information Technology Act, 2000</strong>, and
                  applicable international privacy frameworks including the{' '}
                  <strong>EU/UK GDPR</strong>. Upon written request to our
                  Grievance Officer, this notice can be made available in Hindi
                  or any of the 22 languages specified in the Eighth Schedule of
                  the Constitution of India.
                </p>
              </div>

              {isVisible('role') && (
                <section id="role" className="trust-ed-section">
                  <SectionHeading id="role" />
                  <p className="trust-ed-prose">
                    <strong>{LEGAL_META.legalEntity}</strong> operates in{' '}
                    <strong>{LEGAL_META.operatingModel}</strong>, serving
                    businesses across India and globally without walk-in
                    physical offices. All legal, privacy, and support
                    correspondence is handled electronically. Because businesses
                    deploy Gyan VaniAi to manage their own customer enquiries,
                    bookings, conversations, and orders, our legal role depends
                    on the processing context:
                  </p>

                  <div className="trust-ed-role-grid">
                    <div className="trust-ed-surface-panel">
                      <p className="trust-ed-panel-label">
                        Platform &amp; Website Operations
                      </p>
                      <h3 className="trust-ed-panel-title">
                        As a Data Fiduciary (Controller)
                      </h3>
                      <p className="trust-ed-panel-body">
                        We determine the purpose and means of processing for
                        visitors browsing <strong>gyanvaniai.com</strong>,
                        demo enquiries, workspace account administration,
                        subscription billing, platform security, fraud
                        prevention, cookie preferences, and direct support
                        tickets.
                      </p>
                    </div>

                    <div className="trust-ed-surface-panel">
                      <p className="trust-ed-panel-label">
                        Tenant Customer Records
                      </p>
                      <h3 className="trust-ed-panel-title">
                        As a Data Processor
                      </h3>
                      <p className="trust-ed-panel-body">
                        When a business workspace uses Gyan VaniAi CRM,
                        WhatsApp, Telegram, web chat, voice agents, or commerce
                        tools to serve its own end-customers, that business acts
                        as the Data Fiduciary and its privacy notice governs its
                        purposes and choices. We process those records strictly
                        on documented business instructions and assist in
                        routing verified end-user requests.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {isVisible('inventory') && (
                <section id="inventory" className="trust-ed-section">
                  <SectionHeading id="inventory" />
                  <p className="trust-ed-prose">
                    Actual personal data collected depends on the forms
                    submitted, workspace configuration, and enabled
                    integrations. Below is the verified inventory of data
                    categories supported by the Gyan VaniAi platform and bundled
                    web chat widget:
                  </p>

                  {PLATFORM_DATA_INVENTORY.map((group) => (
                    <div key={group.group}>
                      <h3 className="trust-ed-h3">{group.group}</h3>
                      <div className="trust-ed-table-wrap">
                        <table className="trust-ed-table">
                          <thead>
                            <tr>
                              <th>Data Category</th>
                              <th>Fields &amp; Scope</th>
                              <th>Purpose &amp; Lawful Basis</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.rows.map((row) => (
                              <tr key={row.category}>
                                <td>
                                  <strong>{row.category}</strong>
                                </td>
                                <td>{row.fields}</td>
                                <td>
                                  <div>{row.purpose}</div>
                                  <div className="trust-ed-basis-line">
                                    <strong>Basis:</strong> {row.basis}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  <div className="trust-ed-surface-panel">
                    <p className="trust-ed-panel-label">
                      AI &amp; Model Training Commitment
                    </p>
                    <h3 className="trust-ed-panel-title">
                      Zero Public Foundation Model Training on Customer Data
                    </h3>
                    <p className="trust-ed-panel-body">
                      We do <strong>not</strong> use your personal information,
                      business workflows, voice transcripts, or customer
                      conversations to train, retrain, or fine-tune public
                      foundation AI models. AI and retrieval-augmented
                      generation (RAG) workflows operate strictly inside
                      tenant-isolated vector indexes and enterprise API
                      endpoints configured for your workspace.
                    </p>
                  </div>
                </section>
              )}

              {isVisible('integrations') && (
                <section id="integrations" className="trust-ed-section">
                  <SectionHeading id="integrations" />
                  <p className="trust-ed-prose">
                    Workspaces may connect optional third-party services to
                    synchronize calendars, messaging, spreadsheets, or payment
                    checkout flows. Select a category below to inspect exact
                    data fields, permissions, reconciliation storage, and
                    disconnection rights:
                  </p>

                  <IntegrationFlowExplorer />
                </section>
              )}

              {isVisible('cookies-telemetry') && (
                <section id="cookies-telemetry" className="trust-ed-section">
                  <span id="cookie-consent-data" aria-hidden="true" />
                  <SectionHeading id="cookies-telemetry" />
                  <p className="trust-ed-prose">
                    When you interact with our website cookie banner (Accept
                    All, Reject All, Essential Only, or Manage Preferences), we
                    record an immutable consent audit log to establish statutory
                    proof of consent under DPDP Act §6 and GDPR Article 7(1):
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Network &amp; Approximate Geolocation:</strong>{' '}
                      Public IP address and derived city, region, and country at
                      the time of your selection.
                    </li>
                    <li>
                      <strong>Browser Environment:</strong> Browser family,
                      operating system, and language preference.
                    </li>
                    <li>
                      <strong>Explicit Category Choices:</strong> Accepted,
                      rejected, or customized selections across functional,
                      analytics, session replay, and marketing categories,
                      together with the page URL and UTC timestamp.
                    </li>
                    <li>
                      <strong>Non-Profiling &amp; 12-Month TTL:</strong> Consent
                      audit logs are never used for advertising or profiling and
                      are automatically purged after{' '}
                      <strong className="trust-ed-tabular">
                        12 months (31,536,000 seconds)
                      </strong>
                      .
                    </li>
                  </ul>

                  <h3 className="trust-ed-h3">
                    Website Telemetry &amp; Measurement Framework
                  </h3>
                  <div className="trust-ed-table-wrap">
                    <table className="trust-ed-table">
                      <thead>
                        <tr>
                          <th>Provider</th>
                          <th>Data Collected</th>
                          <th>Device Storage</th>
                          <th>Lawful Basis &amp; Revocation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TELEMETRY_PROVIDERS.map((item) => (
                          <tr key={item.provider}>
                            <td>
                              <strong>{item.provider}</strong>
                            </td>
                            <td>{item.dataFlow}</td>
                            <td>{item.storage}</td>
                            <td>
                              <div>{item.basis}</div>
                              <div>{item.revocation}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {isVisible('lawful-consent') && (
                <section id="lawful-consent" className="trust-ed-section">
                  <SectionHeading id="lawful-consent" />
                  <p className="trust-ed-prose">
                    Where processing relies on consent, we obtain it through an
                    explicit, unbundled affirmative action—never via pre-ticked
                    boxes. For direct platform services, we rely on contract
                    performance for workspace delivery, legal obligation for
                    invoicing and statutory audit trails, documented legitimate
                    interests (under GDPR) and reasonable security safeguards
                    (under DPDP §7 / §8(5)) for fraud prevention and platform
                    security, and affirmative opt-in consent for optional
                    analytics or marketing updates.
                  </p>
                  <h3 className="trust-ed-h3">
                    Frictionless Consent Withdrawal (DPDP §6(4))
                  </h3>
                  <p className="trust-ed-prose">
                    You may withdraw consent at any time as easily as it was
                    granted:
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      Use the <strong>Manage Cookies</strong> control in our
                      website footer to revoke optional analytics or session
                      replay immediately.
                    </li>
                    <li>
                      Reply <code className="trust-ed-code">STOP</code>,{' '}
                      <code className="trust-ed-code">CANCEL</code>, or{' '}
                      <code className="trust-ed-code">UNSUBSCRIBE</code> to any
                      WhatsApp or SMS message, or visit{' '}
                      <Link to="/unsubscribe" className="trust-ed-link">
                        gyanvaniai.com/unsubscribe
                      </Link>
                      .
                    </li>
                    <li>
                      Disconnect third-party OAuth integrations directly from
                      Workspace Settings → Integrations or your provider
                      security console.
                    </li>
                    <li>
                      Submit a request via our{' '}
                      <a
                        href="#privacy-contact"
                        onClick={(e) => jumpTo(e, 'grievance-dsr')}
                      >
                        live Data Subject Request Portal
                      </a>{' '}
                      below or email{' '}
                      <a href={`mailto:${officer.email}`}>{officer.email}</a>.
                    </li>
                  </ul>
                  <p className="trust-ed-prose">
                    Upon verified withdrawal, we cease non-essential processing
                    within{' '}
                    <strong className="trust-ed-tabular">
                      7 business days
                    </strong>
                    , except where retention is required by law or active
                    dispute resolution.
                  </p>
                </section>
              )}

              {isVisible('subprocessors') && (
                <section id="subprocessors" className="trust-ed-section">
                  <SectionHeading id="subprocessors" />
                  <p className="trust-ed-prose">
                    Gyan VaniAi never sells, rents, or trades personal data. We
                    disclose data only to authorized workspace staff, vetted
                    infrastructure and feature providers bound by written data
                    processing commitments, or authorities where compelled by
                    applicable law:
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Cloud Hosting &amp; Edge Security:</strong> Amazon
                      Web Services (AWS), Google Cloud, Vercel Inc., and
                      Cloudflare (hosting, serverless compute, CDN, DDoS
                      protection, TLS 1.3 encryption).
                    </li>
                    <li>
                      <strong>Messaging &amp; Media Storage:</strong> Meta
                      Platforms, Inc. (WhatsApp Cloud API), enabled Telegram /
                      SMS / telephony providers configured by the workspace, and
                      Cloudinary (media assets and optional WhatsApp call
                      recording references).
                    </li>
                    <li>
                      <strong>Payment Processing:</strong> Razorpay, Stripe, and
                      WhatsApp Native Payments (platform subscriptions and
                      configured merchant order checkouts).
                    </li>
                    <li>
                      <strong>
                        Consent Auditing &amp; Consented Measurement:
                      </strong>{' '}
                      ipapi.co (approximate IP geolocation for consent audit
                      logs), Google LLC (GA4 under Consent Mode v2), and
                      Microsoft Corporation (Clarity strictly upon explicit
                      session-replay consent).
                    </li>
                  </ul>
                  <h3 className="trust-ed-h3">
                    Cross-Border Data Transfers (DPDP §16 &amp; GDPR)
                  </h3>
                  <p className="trust-ed-prose">
                    Where cloud infrastructure or enabled third-party APIs
                    process data outside India or the EEA/UK, transfers are
                    governed by Standard Contractual Clauses (SCCs), binding
                    data processing agreements, and end-to-end encryption. We
                    strictly adhere to Section 16 of the DPDP Act, 2023 and
                    never transfer personal data to any jurisdiction restricted
                    by the Central Government of India. Contact our Grievance
                    Officer to obtain details of applicable transfer safeguards.
                  </p>
                </section>
              )}

              {isVisible('retention') && (
                <section id="retention" className="trust-ed-section">
                  <SectionHeading id="retention" />
                  <p className="trust-ed-prose">
                    We retain personal data only as long as required to deliver
                    contracted services, honor workspace settings, resolve
                    disputes, and satisfy statutory obligations:
                  </p>

                  <div className="trust-ed-table-wrap">
                    <table className="trust-ed-table">
                      <thead>
                        <tr>
                          <th>Data Classification</th>
                          <th>Retention Period</th>
                          <th>Post-Retention Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RETENTION_SCHEDULES.map((row) => (
                          <tr key={row.classification}>
                            <td>
                              <strong>{row.classification}</strong>
                            </td>
                            <td className="trust-ed-tabular">{row.period}</td>
                            <td>{row.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="trust-ed-prose">
                    <strong>Accurate Erasure Scope:</strong> Clearing a
                    conversation inside the web chat widget removes the selected
                    browser session and web-chat messages only. Lead records,
                    CRM contacts, support tickets, invoices, connected vendor
                    copies (such as exported Google Sheets), and encrypted
                    disaster-recovery backups follow their own retention
                    lifecycles; submit a verified erasure request below or
                    contact the relevant business workspace for complete
                    deletion. Encrypted backups expire automatically on rolling
                    security schedules.
                  </p>
                </section>
              )}

              {isVisible('security') && (
                <section id="security" className="trust-ed-section">
                  <SectionHeading id="security" />
                  <p className="trust-ed-prose">
                    We maintain technical and organizational safeguards aligned
                    with DPDP Act §8(5) and modern enterprise cloud security
                    standards (see also our{' '}
                    <Link to="/security" className="trust-ed-link">
                      Security Architecture
                    </Link>{' '}
                    page):
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Encryption:</strong> TLS 1.3 for data in transit
                      and AES-256 / KMS encryption for sensitive credentials,
                      OAuth tokens, and merchant webhook secrets at rest.
                    </li>
                    <li>
                      <strong>Access &amp; Tenant Isolation:</strong> Logical
                      multi-tenant workspace isolation, Role-Based Access
                      Control (RBAC), workspace IP allowlists, login alerts, and
                      salted cryptographic password hashing.
                    </li>
                    <li>
                      <strong>Tamper-Resistant Audit Logs:</strong> Security and
                      consent logs reject unauthorized modification to preserve
                      forensic integrity.
                    </li>
                    <li>
                      <strong>Breach Intimation Protocol:</strong> Verified
                      personal data breaches are notified to the Data Protection
                      Board of India and affected Data Principals under DPDP Act
                      §8(6), and critical cybersecurity incidents are reported
                      to CERT-In within{' '}
                      <strong className="trust-ed-tabular">6 hours</strong>{' '}
                      pursuant to CERT-In Directions (2022).
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('children') && (
                <section id="children" className="trust-ed-section">
                  <SectionHeading id="children" />
                  <p className="trust-ed-prose">
                    Gyan VaniAi is a B2B enterprise platform intended solely for
                    businesses and professionals aged 18 and older. In
                    compliance with Section 9 of the DPDP Act, 2023:
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      We do not knowingly solicit or process personal data of
                      individuals under 18 without verifiable parental or
                      guardian consent.
                    </li>
                    <li>
                      We strictly prohibit behavioral tracking, monitoring, or
                      targeted advertising directed at children.
                    </li>
                    <li>
                      Business workspaces configuring custom booking, support,
                      or enquiry forms must assess whether free-text fields may
                      collect health, financial, or minors&apos; data and obtain
                      all legally required consents before enabling those flows.
                    </li>
                  </ul>
                  <p className="trust-ed-prose">
                    Parents, guardians, or users who believe a minor&apos;s data
                    was submitted in error should email{' '}
                    <a href={`mailto:${officer.email}`}>{officer.email}</a> or
                    use the DSR Portal below for expedited erasure.
                  </p>
                </section>
              )}

              {isVisible('rights') && (
                <section id="rights" className="trust-ed-section">
                  <SectionHeading id="rights" />
                  <p className="trust-ed-prose">
                    Depending on your jurisdiction and whether Gyan VaniAi acts
                    as Data Fiduciary or Data Processor, you may exercise the
                    following rights (subject to identity verification):
                  </p>
                  <ul className="trust-ed-list">
                    <li>
                      <strong>Access &amp; Transparency (DPDP §11):</strong>{' '}
                      Request a summary of personal data processed, processing
                      activities, and categories of recipients.
                    </li>
                    <li>
                      <strong>Correction &amp; Completion (DPDP §12):</strong>{' '}
                      Correct inaccurate or misleading information and complete
                      incomplete records.
                    </li>
                    <li>
                      <strong>Erasure &amp; Withdrawal (DPDP §12):</strong>{' '}
                      Request deletion of personal data no longer needed for its
                      purpose or upon consent withdrawal.
                    </li>
                    <li>
                      <strong>
                        Objection, Restriction &amp; Portability (GDPR):
                      </strong>{' '}
                      Where GDPR applies, object to legitimate-interest
                      processing, request processing restriction, or obtain a
                      structured portable copy of your data.
                    </li>
                    <li>
                      <strong>Right to Nominate (DPDP §14):</strong> Nominate an
                      individual to exercise your rights in the event of death
                      or incapacity.
                    </li>
                    <li>
                      <strong>Grievance &amp; Supervisory Escalation:</strong>{' '}
                      Contact our Grievance Officer first; if unresolved, you
                      may escalate to the{' '}
                      <strong>Data Protection Board of India</strong> (once
                      operationalized under the DPDP Act) or your local data
                      protection supervisory authority.
                    </li>
                  </ul>
                </section>
              )}

              {isVisible('grievance-dsr') && (
                <section id="grievance-dsr" className="trust-ed-section">
                  <SectionHeading id="grievance-dsr" />
                  <p className="trust-ed-prose">
                    We publish updates to this Privacy Policy on this page with
                    an updated effective date. For material changes affecting
                    your rights, we provide{' '}
                    <strong className="trust-ed-tabular">
                      15 days&apos; advance notice
                    </strong>{' '}
                    via platform notices or email.
                  </p>

                  <div id="privacy-contact" className="trust-ed-dossier">
                    <p className="trust-ed-panel-label">
                      Statutory Escalation Contact (DPDP §5(2), §8(9) &amp; §13)
                    </p>
                    <h3 className="trust-ed-panel-title">
                      Designated Grievance Redressal Officer
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
                          Grievance Email
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
                          Compliance Telephone
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
                          Acknowledgment SLA
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.acknowledgmentSla}
                        </span>
                      </div>
                      <div className="trust-ed-dossier-item">
                        <span className="trust-ed-dossier-label">
                          Resolution Target
                        </span>
                        <span className="trust-ed-dossier-value">
                          {officer.resolutionSla}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="trust-ed-h3">
                    Submit a Data Subject Request (DSR) or Grievance
                  </h3>
                  <p className="trust-ed-prose">
                    Use this form to submit a verifiable access, correction,
                    erasure, nomination, consent withdrawal, or grievance
                    request. If your request relates to a business that uses
                    Gyan VaniAi, include that business&apos;s name so we can
                    route your ticket accurately.
                  </p>
                  <PrivacyRequestForm />
                </section>
              )}
            </>
          );
        }}
      </TrustCenterShell>
    </>
  );
}