import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "AutoCRM completely transformed how we handle inbound leads. Our response time went from hours to seconds, and conversions are up 40%.",
    author: "Sarah Jenkins",
    role: "VP of Sales, TechCorp",
    avatar: "S"
  },
  {
    quote: "The WhatsApp automation bot they built for us handles 80% of our tier-1 support queries. Incredible ROI within just two months.",
    author: "David Chen",
    role: "Customer Success Lead, RetailPro",
    avatar: "D"
  },
  {
    quote: "Their team didn't just build a CRM; they engineered a complete growth engine tailored perfectly to our unique sales process.",
    author: "Emily Martinez",
    role: "Founder, GrowthStart",
    avatar: "E"
  }
];

export default function Testimonials() {
  return (
    <section className="section bg-alt testimonials">
      <div className="container">
        <h2 className="h2 text-center" style={{ marginBottom: '4rem' }}>Loved by Revenue Teams</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
              </div>
              <p className="testimonial-quote">"{item.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{item.avatar}</div>
                <div>
                  <h4 className="author-name">{item.author}</h4>
                  <p className="author-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
