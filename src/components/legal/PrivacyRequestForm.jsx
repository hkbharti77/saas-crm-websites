import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { API_BASE_URL } from '../../config/apiConfig';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  workspaceName: '',
  requestType: 'Data Access Request',
  description: '',
};

export default function PrivacyRequestForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [honeypot, setHoneypot] = useState('');
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyTicket = async (ticketId) => {
    if (!ticketId || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    } catch {
      setCopiedTicket(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setResultData(null);
    setCopiedTicket(false);

    const workspaceContext = formData.workspaceName.trim();
    const fullDescription = workspaceContext
      ? `[Workspace / Business: ${workspaceContext}]\n${formData.description.trim()}`
      : formData.description.trim();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/public/privacy-requests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            requestType: formData.requestType,
            description: fullDescription,
            _hp_company: honeypot,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResultData(data);
        setFormData(INITIAL_FORM_STATE);
      } else {
        setErrorMessage(
          data.error ||
            'Failed to submit privacy request. Please retry or email our Grievance Officer at contact@gyanvaniai.com.'
        );
      }
    } catch {
      setErrorMessage(
        'Network connection error. Please verify your connection or email our Grievance Officer directly at contact@gyanvaniai.com.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trust-ed-form" noValidate={false}>
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="_hp_company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="trust-ed-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="trust-ed-form-grid">
        <div className="trust-ed-field">
          <label htmlFor="dsr-name" className="trust-ed-label">
            Full Name *
          </label>
          <input
            id="dsr-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="trust-ed-input"
          />
        </div>

        <div className="trust-ed-field">
          <label htmlFor="dsr-email" className="trust-ed-label">
            Email Address *
          </label>
          <input
            id="dsr-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@company.com"
            className="trust-ed-input"
          />
        </div>
      </div>

      <div className="trust-ed-form-grid">
        <div className="trust-ed-field">
          <label htmlFor="dsr-phone" className="trust-ed-label">
            Phone or WhatsApp Number{' '}
            <span className="trust-ed-hint">(Optional)</span>
          </label>
          <input
            id="dsr-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98XXXXXXXX"
            className="trust-ed-input"
          />
        </div>

        <div className="trust-ed-field">
          <label htmlFor="dsr-workspace" className="trust-ed-label">
            Workspace or Business Name{' '}
            <span className="trust-ed-hint">(If tenant-related)</span>
          </label>
          <input
            id="dsr-workspace"
            type="text"
            name="workspaceName"
            value={formData.workspaceName}
            onChange={handleChange}
            placeholder="Business you interacted with"
            className="trust-ed-input"
          />
        </div>
      </div>

      <div className="trust-ed-field">
        <label htmlFor="dsr-type" className="trust-ed-label">
          Request Type *
        </label>
        <select
          id="dsr-type"
          name="requestType"
          value={formData.requestType}
          onChange={handleChange}
          required
          className="trust-ed-select"
        >
          <option value="Data Access Request">Data Access Request</option>
          <option value="Data Deletion Request">Data Deletion Request</option>
          <option value="Data Correction Request">
            Data Correction Request
          </option>
          <option value="Consent Withdrawal">Consent Withdrawal</option>
          <option value="Right to Nominate">Right to Nominate (DPDP §14)</option>
          <option value="Privacy Complaint">
            Privacy Complaint / Grievance
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="trust-ed-field">
        <label htmlFor="dsr-description" className="trust-ed-label">
          Request Details *
        </label>
        <textarea
          id="dsr-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe the records, channel, or action you are requesting. For tenant-related queries, include any helpful reference such as your order or booking ID."
          className="trust-ed-textarea"
        />
      </div>

      <div className="trust-ed-form-footer">
        <p className="trust-ed-form-sla">
          Acknowledged within 24 hours · Target resolution within 15 business
          days
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="trust-ed-submit-btn"
        >
          {isLoading ? 'Submitting Request...' : 'Submit Privacy Request'}
        </button>
      </div>

      {errorMessage && (
        <div className="trust-ed-alert-error" role="alert">
          <strong>Submission notice:</strong> {errorMessage}
        </div>
      )}

      {resultData && (
        <div className="trust-ed-ticket-box" role="status" aria-live="polite">
          <div className="trust-ed-ticket-head">
            <p className="trust-ed-ticket-status">
              Statutory Privacy Request Registered (DPDP Act, 2023)
            </p>
          </div>
          {resultData.ticketId && (
            <div className="trust-ed-ticket-row">
              <span>Official Reference Ticket:</span>
              <code className="trust-ed-ticket-code">
                {resultData.ticketId}
              </code>
              <button
                type="button"
                onClick={() => handleCopyTicket(resultData.ticketId)}
                className="trust-ed-copy-btn"
              >
                {copiedTicket ? (
                  <>
                    <Check size={14} aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>Copy Ticket ID</span>
                  </>
                )}
              </button>
            </div>
          )}
          {resultData.message && (
            <p className="trust-ed-panel-body">{resultData.message}</p>
          )}
          {resultData.slaResolutionDueAt && (
            <p className="trust-ed-form-sla">
              Statutory Resolution Due Date:{' '}
              <strong>
                {new Date(resultData.slaResolutionDueAt).toLocaleDateString(
                  'en-IN',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </strong>{' '}
              (within 15 business days). Keep your ticket ID for future
              correspondence.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
