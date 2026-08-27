import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Check, XCircle, CheckCircle2, Lock } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { trackContactFormSubmit, trackEmailClick } from '../utils/analytics';
import './ContactSection.css';

const WhatsAppIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.888 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ContactSection() {
  const [phone, setPhone] = useState();
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service && !values.message) {
       const serviceNames = {
         'crm-development': 'CRM Development',
         'ai-chatbots': 'AI Chatbots',
         'whatsapp-automation': 'WhatsApp Automation'
       };
       if(serviceNames[service]) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setValues(prev => ({...prev, message: `I am interested in your ${serviceNames[service]} services. Please provide more information.`}));
       }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [touched, setTouched] = useState({ name: false, email: false, company: false, phone: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      newErrors.name = 'Please enter your full name';
    }
    if (touched.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266)) {
      newErrors.email = 'Please enter a valid work email';
    }
    if (touched.phone && phone && !isValidPhoneNumber(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    return newErrors;
  };

  const errors = getErrors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ name: true, email: true, company: true, phone: true });
    
    const submitErrors = {};
    if (values.name.trim().length < 2 || values.name.length > 66) submitErrors.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266) submitErrors.email = 'Please enter a valid work email';
    if (phone && !isValidPhoneNumber(phone)) submitErrors.phone = 'Please enter a valid phone number';
    if (values.message.length > 1000) submitErrors.message = 'Message exceeds 1000 characters';

    if (Object.keys(submitErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/mzdqyerw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
        trackContactFormSubmit();
      } else {
        alert("Oops! There was a problem submitting your demo request. Please try again.");
      }
    } catch {
      alert("Oops! There was a problem submitting your demo request. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="contact-section section" id="contact" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1220px' }}>
        <div className="contact-grid">
          
          {/* Left Column: Heading, Description, Benefits, Direct Channels */}
          <div className="contact-info premium-card">
            <div>
              <span className="section-eyebrow" style={{ textAlign: 'left', margin: '0 0 0.4rem 0' }}>Get in Touch</span>
              <h2 className="contact-main-heading">Ready to transform your revenue operations?</h2>
              <p className="contact-main-desc">
                See how AI can automate your lead management, qualification, enrichment and customer conversations.
              </p>

              {/* Core Value Checklist */}
              <div className="contact-checklist">
                <div className="contact-check-item">
                  <CheckCircle2 size={18} className="contact-check-icon" />
                  <span>AI Lead Enrichment & Scoring</span>
                </div>
                <div className="contact-check-item">
                  <CheckCircle2 size={18} className="contact-check-icon" />
                  <span>Intelligent Skill-Based Assignment</span>
                </div>
                <div className="contact-check-item">
                  <CheckCircle2 size={18} className="contact-check-icon" />
                  <span>24/7 Autonomous AI Sales Agent</span>
                </div>
                <div className="contact-check-item">
                  <CheckCircle2 size={18} className="contact-check-icon" />
                  <span>Omnichannel Communication Hub</span>
                </div>
              </div>
            </div>

            <div className="contact-direct-channels">
              <div>
                <h3 className="h3 contact-channel-label">WhatsApp Direct</h3>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20connect%20regarding%20your%20AI%20CRM%20solutions."
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-whatsapp-contact"
                    className="contact-channel-link contact-channel-whatsapp"
                  >
                    <WhatsAppIcon size={18} color="#25D366" />
                    <span>+91 87006 20913</span>
                  </a>
                </p>
              </div>
              <div>
                <h3 className="h3 contact-channel-label">Email</h3>
                <p style={{ margin: 0 }}>
                  <a
                    href="mailto:contact@gyanvaniai.online"
                    id="link-email-contact"
                    className="contact-channel-link contact-channel-email"
                    onClick={() => trackEmailClick('contact-section')}
                  >
                    contact@gyanvaniai.online
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Compact, Content-Driven Form Card */}
          <div className="contact-form-container premium-card">
            {isSuccess ? (
              <div className="contact-success-box">
                <CheckCircle size={56} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                <h3 className="h3" style={{ marginBottom: '0.5rem', fontSize: '1.35rem' }}>Demo Request Received!</h3>
                <p className="text-muted" style={{ fontSize: '0.98rem', lineHeight: '1.55' }}>
                  Thank you for reaching out. A senior solutions architect will review your workflow and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Full Name */}
                <div className="form-group">
                  <label htmlFor="input-contact-name" className="form-label">
                    <span>Full Name</span>
                    {touched.name && !errors.name && <Check size={15} color="#10b981" />}
                    {touched.name && errors.name && <XCircle size={15} color="#ef4444" />}
                  </label>
                  <input
                    id="input-contact-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Jane Doe"
                    maxLength={66}
                    required
                  />
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                {/* 2. Work Email */}
                <div className="form-group">
                  <label htmlFor="input-contact-email" className="form-label">
                    <span>Work Email</span>
                    {touched.email && !errors.email && <Check size={15} color="#10b981" />}
                    {touched.email && errors.email && <XCircle size={15} color="#ef4444" />}
                  </label>
                  <input
                    id="input-contact-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="name@company.com"
                    maxLength={266}
                    required
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                {/* 3. Company Name */}
                <div className="form-group">
                  <label htmlFor="input-contact-company" className="form-label">
                    <span>Company Name</span>
                  </label>
                  <input
                    id="input-contact-company"
                    type="text"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                    placeholder="Acme Corp"
                    maxLength={100}
                  />
                </div>

                {/* 4. Phone Number (Optional) with Integrated Country Selector */}
                <div className="form-group">
                  <label htmlFor="input-contact-phone" className="form-label">
                    <span>Phone Number <span className="form-label-opt">(Optional)</span></span>
                    {touched.phone && phone && !errors.phone && <Check size={15} color="#10b981" />}
                    {touched.phone && errors.phone && <XCircle size={15} color="#ef4444" />}
                  </label>
                  <div className={`phone-input-unified ${errors.phone ? 'error' : ''}`}>
                    <PhoneInput
                      id="input-contact-phone"
                      international
                      defaultCountry="IN"
                      value={phone}
                      onChange={(val) => { setPhone(val); setTouched(prev => ({...prev, phone: true})); }}
                      onBlur={() => setTouched(prev => ({...prev, phone: true}))}
                      name="phone"
                      placeholder="Enter phone number"
                      className="form-input-phone"
                    />
                  </div>
                  {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                </div>

                {/* 5. What are you looking for? */}
                <div className="form-group">
                  <label htmlFor="input-contact-message" className="form-label" style={{ justifyContent: 'space-between' }}>
                    <span>What are you looking for?</span>
                  </label>
                  <div className="textarea-wrapper">
                    <textarea
                      id="input-contact-message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-textarea"
                      rows="3"
                      placeholder="Tell us about your team, CRM requirements, or automation goals..."
                      maxLength={1000}
                      required
                    ></textarea>
                    <span className="char-counter" style={{ color: values.message.length > 1000 ? '#ef4444' : 'var(--text-muted)' }}>
                      {values.message.length}/1000
                    </span>
                  </div>
                </div>

                {/* 6. CTA Button */}
                <button
                  id="btn-submit-contact-demo"
                  type="submit"
                  className="btn btn-primary contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking Demo...' : 'Book a Demo →'}
                </button>

                {/* 7. Trust Microcopy */}
                <p className="contact-trust-microcopy">
                  <Lock size={12} className="microcopy-lock-icon" />
                  <span>Your information is kept private under our <Link to="/privacy" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontWeight: '550' }}>Privacy Policy</Link>. No spam.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
