import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, ChevronDown, Check, XCircle } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { trackContactFormSubmit } from '../utils/analytics';
import { API_BASE_URL } from '../config/apiConfig';
import './ContactModal.css';

const WhatsAppIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.888 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const INQUIRY_OPTIONS = [
  'WhatsApp Coexistence & Multi-Agent CRM',
  'Custom AI CRM Development',
  'Autonomous AI Workflow Agents',
  'WhatsApp Calling Agent (Voice AI)',
  'Voice AI & Calling Bots',
  'Omnichannel Support Architecture',
  'Enterprise Consultation',
  'General Inquiry'
];

export default function ContactModal({ isOpen, onClose, prefillMessage = '' }) {
  const [phone, setPhone] = useState();
  const [values, setValues] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: prefillMessage || ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    inquiryType: false,
    message: false
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (prefillMessage && !values.message) {
        setValues(prev => ({ ...prev, message: prefillMessage }));
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, prefillMessage]);

  const handleClose = () => {
    setIsSuccess(false);
    setPhone();
    setValues({ name: '', email: '', inquiryType: '', message: prefillMessage || '' });
    setTouched({ name: false, email: false, phone: false, inquiryType: false, message: false });
    setConsentGiven(false);
    setConsentError(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getErrors = () => {
    const newErrors = {};
    if (touched.name && (values.name.trim().length < 2 || values.name.length > 66)) {
      newErrors.name = 'Name must be between 2 and 66 characters';
    }
    if (touched.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266)) {
      newErrors.email = 'Please provide a valid work email';
    }
    if (touched.phone && phone && !isValidPhoneNumber(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (touched.inquiryType && !values.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }
    if (touched.message && (values.message.trim().length < 5 || values.message.length > 1000)) {
      newErrors.message = 'Message must be between 5 and 1000 characters';
    }
    return newErrors;
  };

  const errors = getErrors();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      inquiryType: true,
      message: true
    });

    if (!consentGiven) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const submitErrors = {};
    if (values.name.trim().length < 2 || values.name.length > 66) {
      submitErrors.name = 'Name must be between 2 and 66 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266) {
      submitErrors.email = 'Please provide a valid work email';
    }
    if (phone && !isValidPhoneNumber(phone)) {
      submitErrors.phone = 'Please enter a valid phone number';
    }
    if (!values.inquiryType) {
      submitErrors.inquiryType = 'Please select an inquiry type';
    }
    if (values.message.trim().length < 5 || values.message.length > 1000) {
      submitErrors.message = 'Message must be between 5 and 1000 characters';
    }

    if (Object.keys(submitErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const cmsApiBase = API_BASE_URL;
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: phone || '',
        subject: `[${values.inquiryType || 'General'}] Website Inquiry`,
        message: values.message.trim(),
        channel: 'crm',
        source: 'website_connect_modal',
        consent: consentGiven,
        consentVersion: 'DPDP-2023-v1',
        _hp_company: honeypot,
      };

      const response = await fetch(`${cmsApiBase}/api/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        trackContactFormSubmit();
      } else {
        alert(data.error || 'Oops! There was a problem submitting your request. Please try again.');
      }
    } catch (err) {
      console.error('Contact modal submission error:', err);
      alert(err?.message ? `Network error: ${err.message}. Please verify the backend is running.` : 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enterprise-modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="connect-modal-title">
      <div className="enterprise-modal-card" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="enterprise-modal-close"
          onClick={handleClose}
          aria-label="Close dialog"
          type="button"
        >
          <X size={17} />
        </button>

        {isSuccess ? (
          <div className="enterprise-modal-success">
            <div className="enterprise-success-icon-badge">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="enterprise-success-title">Request Received!</h3>
            <p className="enterprise-success-desc">
              Thank you for reaching out. A dedicated solution architect from Gyan VaniAi will review your requirements and connect with you shortly.
            </p>
            <button
              type="button"
              className="enterprise-submit-btn"
              onClick={handleClose}
              style={{ margin: '0 auto' }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header with Brand Logo, Title & Subtitle */}
            <div className="enterprise-modal-header">
              <div className="enterprise-modal-brand">
                <img
                  src="/logo.webp"
                  alt="Gyan VaniAi"
                  width="22"
                  height="22"
                  className="enterprise-modal-brand-logo"
                />
                <span className="enterprise-modal-brand-name">Gyan VaniAi</span>
              </div>
              <h2 className="enterprise-modal-title" id="connect-modal-title">Let&apos;s Connect</h2>
              <p className="enterprise-modal-subtitle">Our experts are here to help you.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_hp_company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="enterprise-modal-grid">
                {/* YOUR NAME */}
                <div className="enterprise-field-group">
                  <label className="enterprise-field-label" htmlFor="connect-name">
                    <span className="enterprise-field-label-left">
                      Your Name <span className="enterprise-required-star">*</span>
                    </span>
                    {touched.name && !errors.name && <Check size={12} color="#10b981" />}
                    {touched.name && errors.name && <XCircle size={12} color="#ef4444" />}
                  </label>
                  <input
                    id="connect-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`enterprise-input ${errors.name ? 'field-error' : ''}`}
                    placeholder="John Doe"
                    maxLength={66}
                    required
                  />
                  {errors.name && (
                    <span className="enterprise-field-error-msg">{errors.name}</span>
                  )}
                </div>

                {/* EMAIL ADDRESS */}
                <div className="enterprise-field-group">
                  <label className="enterprise-field-label" htmlFor="connect-email">
                    <span className="enterprise-field-label-left">
                      Email Address <span className="enterprise-required-star">*</span>
                    </span>
                    {touched.email && !errors.email && <Check size={12} color="#10b981" />}
                    {touched.email && errors.email && <XCircle size={12} color="#ef4444" />}
                  </label>
                  <input
                    id="connect-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`enterprise-input ${errors.email ? 'field-error' : ''}`}
                    placeholder="john@example.com"
                    maxLength={266}
                    required
                  />
                  {errors.email && (
                    <span className="enterprise-field-error-msg">{errors.email}</span>
                  )}
                </div>

                {/* PHONE NUMBER */}
                <div className="enterprise-field-group enterprise-phone-wrapper">
                  <label className="enterprise-field-label" htmlFor="connect-phone">
                    <span className="enterprise-field-label-left">
                      Phone Number
                    </span>
                    {touched.phone && phone && !errors.phone && <Check size={12} color="#10b981" />}
                    {touched.phone && errors.phone && <XCircle size={12} color="#ef4444" />}
                  </label>
                  <PhoneInput
                    id="connect-phone"
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={(val) => {
                      setPhone(val);
                      setTouched(prev => ({ ...prev, phone: true }));
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                    name="phone"
                    className={errors.phone ? 'field-error' : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className="enterprise-field-error-msg">{errors.phone}</span>
                  )}
                </div>

                {/* INQUIRY TYPE */}
                <div className="enterprise-field-group">
                  <label className="enterprise-field-label" htmlFor="connect-inquiry">
                    <span className="enterprise-field-label-left">
                      Inquiry Type <span className="enterprise-required-star">*</span>
                    </span>
                    {touched.inquiryType && !errors.inquiryType && <Check size={12} color="#10b981" />}
                    {touched.inquiryType && errors.inquiryType && <XCircle size={12} color="#ef4444" />}
                  </label>
                  <div className="enterprise-select-wrapper">
                    <select
                      id="connect-inquiry"
                      name="inquiryType"
                      value={values.inquiryType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`enterprise-select ${errors.inquiryType ? 'field-error' : ''}`}
                      required
                    >
                      <option value="" disabled>Select inquiry type</option>
                      {INQUIRY_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="enterprise-select-chevron" />
                  </div>
                  {errors.inquiryType && (
                    <span className="enterprise-field-error-msg">{errors.inquiryType}</span>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="enterprise-field-group enterprise-modal-col-span-2">
                  <label className="enterprise-field-label" htmlFor="connect-message">
                    <span className="enterprise-field-label-left">
                      Message <span className="enterprise-required-star">*</span>
                    </span>
                    {touched.message && !errors.message && <Check size={12} color="#10b981" />}
                    {touched.message && errors.message && <XCircle size={12} color="#ef4444" />}
                  </label>
                  <div className="enterprise-textarea-wrapper">
                    <textarea
                      id="connect-message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`enterprise-textarea ${errors.message ? 'field-error' : ''}`}
                      rows="2"
                      placeholder="Write your message here..."
                      maxLength={1000}
                      required
                    />
                    <span className="enterprise-char-count">
                      {values.message.length}/1000
                    </span>
                  </div>
                  {errors.message && (
                    <span className="enterprise-field-error-msg">{errors.message}</span>
                  )}
                </div>
              </div>

              {/* Consent and Submit Button */}
              <div className="enterprise-modal-footer">
                <label className="enterprise-terms-label">
                  <input
                    type="checkbox"
                    className="enterprise-checkbox"
                    checked={consentGiven}
                    onChange={(e) => {
                      setConsentGiven(e.target.checked);
                      if (e.target.checked) setConsentError(false);
                    }}
                    required
                  />
                  <span>
                    I agree to the Gyan VaniAi <a href="/privacy" target="_blank" rel="noopener noreferrer" className="enterprise-terms-link">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener noreferrer" className="enterprise-terms-link">Terms</a> <span className="enterprise-required-star">*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  className="enterprise-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
                  <Send size={13} />
                </button>
              </div>

              {consentError && (
                <span className="enterprise-field-error-msg" style={{ marginTop: '0.35rem' }}>
                  Please agree to the Privacy Policy and Terms to submit your request.
                </span>
              )}

              {/* Instant WhatsApp Option */}
              <div className="enterprise-instant-chat">
                <span>Prefer instant chat?</span>
                <a
                  href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20connect%20regarding%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise-whatsapp-link"
                >
                  <WhatsAppIcon size={12} color="#25D366" />
                  Chat on WhatsApp (+91 87006 20913)
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
