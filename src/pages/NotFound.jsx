import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Gyan VaniAi</title>
        <meta name="description" content="The page you are looking for does not exist." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <section className="section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <div className="container">
          <h1 className="h1" style={{ fontSize: '6rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>404</h1>
          <h2 className="h2" style={{ marginBottom: '1.5rem' }}>Page Not Found</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Oops! It seems we can't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', padding: '0.8rem 2rem' }}>
            <ArrowLeft size={18} /> Return Home
          </Link>
        </div>
      </section>
    </>
  );
}
