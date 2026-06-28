import React from 'react';
import './Statistics.css';

export default function Statistics() {
  return (
    <section className="section statistics">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <h2 className="stat-number">98%</h2>
            <p className="stat-label">Customer Satisfaction</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">10M+</h2>
            <p className="stat-label">Leads Processed</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">3x</h2>
            <p className="stat-label">Average ROI</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">24/7</h2>
            <p className="stat-label">AI Support Coverage</p>
          </div>
        </div>
      </div>
    </section>
  );
}
