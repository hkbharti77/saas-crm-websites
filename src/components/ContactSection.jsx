import React, { useState, useEffect } from 'react';
import { CheckCircle, Check, XCircle } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { trackContactFormSubmit, trackEmailClick } from '../utils/analytics';

const WhatsAppIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.888 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
      <div className="container" style={{ maxWidth: '1120px' }}>
        <div className="contact-grid">
          
          <div className="contact-info premium-card">
            <h2 className="h2" style={{ marginBottom: '1rem', lineHeight: '1.25' }}>Ready to Transform Your Business?</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Let's build software that helps your business grow faster, automate operations, and deliver exceptional customer experiences.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 className="h3" style={{ marginBottom: '0.25rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>WhatsApp Direct</h3>
                <p className="text-muted">
                  <a
                    href="https://wa.me/918700620913?text=Hi%20Gyan%20VaniAi%2C%20I%20would%20like%20to%20connect%20regarding%20your%20AI%20CRM%20solutions."
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-whatsapp-contact"
                    style={{ color: '#25D366', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                  >
                    <WhatsAppIcon size={18} color="#25D366" />
                    <span>+91 87006 20913</span>
                  </a>
                </p>
              </div>
              <div>
                <h3 className="h3" style={{ marginBottom: '0.25rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>Email</h3>
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
                    {touched.name && errors.name && <XCircle size={16} color="#ef4444" />}
                  </label>
                  <input type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Your name" maxLength={66} required />
                  {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Work Email
                    {touched.email && !errors.email && <Check size={16} color="#10b981" />}
                    {touched.email && errors.email && <XCircle size={16} color="#ef4444" />}
                  </label>
                  <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="name@company.com" maxLength={266} required />
                  {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Phone Number (Optional)
                    {touched.phone && phone && !errors.phone && <Check size={16} color="#10b981" />}
                    {touched.phone && errors.phone && <XCircle size={16} color="#ef4444" />}
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
                  {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>How can we help?</span>
                  </label>
                  <div className="textarea-wrapper">
                    <textarea name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} className="form-textarea" rows="4" placeholder="Tell us about your current workflow challenges..." maxLength={1000} required></textarea>
                    <span className="char-counter" style={{ color: values.message.length > 1000 ? '#ef4444' : 'var(--text-muted)' }}>
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
