import React, { useState } from 'react';
import { X, CheckCircle, Check, XCircle } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { trackContactFormSubmit } from '../utils/analytics';

export default function ContactModal({ isOpen, onClose, prefillMessage = '' }) {
  const [phone, setPhone] = useState();
  const [values, setValues] = useState({ name: '', email: '', message: prefillMessage });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSuccess(false);
      setPhone();
      setValues({ name: '', email: '', message: prefillMessage });
      setTouched({ name: false, email: false, phone: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        <h3 className="h3" style={{ marginBottom: '0.25rem', fontSize: '1.5rem' }}>Book a Demo</h3>
        <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
          Schedule a tailored walkthrough of our CRM and AI Chatbot solutions.
        </p>
        
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
            <h4 className="h4" style={{ marginBottom: '0.5rem' }}>Thank You!</h4>
            <p className="text-muted">Your request has been sent successfully. We will be in touch shortly.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '2rem' }}>Close</button>
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
                <textarea name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} className="form-textarea" rows="3" placeholder="Tell us about your current workflow challenges..." maxLength={1000} required></textarea>
                <span className="char-counter" style={{ color: values.message.length > 1000 ? '#ef4444' : 'var(--text-muted)' }}>
                  {values.message.length}/1000
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Request Demo'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
