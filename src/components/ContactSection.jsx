import React, { useState, useEffect } from 'react';
import { CheckCircle, Check, XCircle } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { trackContactFormSubmit, trackEmailClick } from '../utils/analytics';

export default function ContactSection() {
  const [phone, setPhone] = useState();
  const [values, setValues] = useState({ name: '', email: '', message: '' });

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

  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
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
      newErrors.name = 'Name must be between 2 and 66 characters';
    }
    if (touched.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266)) {
      newErrors.email = 'Invalid email format or too long';
    }
    if (touched.phone && phone && !isValidPhoneNumber(phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    return newErrors;
  };

  const errors = getErrors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ name: true, email: true, phone: true });
    
    const submitErrors = {};
    if (values.name.trim().length < 2 || values.name.length > 66) submitErrors.name = 'Name must be between 2 and 66 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 266) submitErrors.email = 'Invalid email format or too long';
    if (phone && !isValidPhoneNumber(phone)) submitErrors.phone = 'Invalid phone number';
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
        alert("Oops! There was a problem submitting your form");
      }
    } catch {
      alert("Oops! There was a problem submitting your form");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="contact-section section" id="contact" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="contact-grid">
          
          <div className="contact-info premium-card">
            <h3 className="h3" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Ready to Transform Your Business?</h3>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Let's build software that helps your business grow faster, automate operations, and deliver exceptional customer experiences.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 className="h4" style={{ marginBottom: '0.25rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>Email</h4>
                <p className="text-muted">
                  <a
                    href="mailto:contact@gyanvaniai.online"
                    id="link-email-contact"
                    style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}
                    onClick={() => trackEmailClick('contact-section')}
                  >
                    contact@gyanvaniai.online
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container premium-card">
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <CheckCircle size={64} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 className="h3" style={{ marginBottom: '1rem' }}>Message Sent!</h3>
                <p className="text-muted">Thank you for reaching out. A member of our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Name
                    {touched.name && !errors.name && <Check size={16} color="#10b981" />}
                    {touched.name && errors.name && <XCircle size={16} color="#ec4899" />}
                  </label>
                  <input type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Your name" maxLength={66} required />
                  {errors.name && <span style={{ color: '#ec4899', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Work Email
                    {touched.email && !errors.email && <Check size={16} color="#10b981" />}
                    {touched.email && errors.email && <XCircle size={16} color="#ec4899" />}
                  </label>
                  <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="name@company.com" maxLength={266} required />
                  {errors.email && <span style={{ color: '#ec4899', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Phone Number (Optional)
                    {touched.phone && phone && !errors.phone && <Check size={16} color="#10b981" />}
                    {touched.phone && errors.phone && <XCircle size={16} color="#ec4899" />}
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={(val) => { setPhone(val); setTouched(prev => ({...prev, phone: true})); }}
                    onBlur={() => setTouched(prev => ({...prev, phone: true}))}
                    name="phone"
                    className={`form-input-phone ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <span style={{ color: '#ec4899', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>How can we help?</span>
                  </label>
                  <div className="textarea-wrapper">
                    <textarea name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} className="form-textarea" rows="4" placeholder="Tell us about your current workflow challenges..." maxLength={1000} required></textarea>
                    <span className="char-counter" style={{ color: values.message.length > 1000 ? '#ec4899' : 'var(--text-muted)' }}>
                      {values.message.length}/1000
                    </span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
