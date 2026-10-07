import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck,
  MapPin
} from 'lucide-react';
import authorityData from '../data/authorityProfiles.json';
import ContactSection from '../components/ContactSection';
import FAQ from '../components/FAQ';
import './WhereToFindUsPage.css';

export default function WhereToFindUsPage() {
  const verifiedAssets = authorityData.existingAuthority;
  const acquisitionPlatforms = authorityData.recommendedAcquisitions;

  const faqs = [
    {
      q: 'What is the official canonical domain for Gyan VaniAi?',
      a: 'The sole canonical domain for all official product documentation, client dashboards, and public operations is https://www.gyanvaniai.com. All legacy domains permanently 301 redirect to this address.'
    },
    {
      q: 'How can partners verify Gyan VaniAi brand identity?',
      a: 'Partners and enterprise compliance teams can verify our public presence via our official GitHub organization (github.com/gyanvaniai), verified LinkedIn corporate profile, verified Google Maps entity (Gyan VaniAi Technologies), and direct outreach to contact@gyanvaniai.com.'
    },
    {
      q: 'Where can developers access Gyan VaniAi APIs and SDKs?',
      a: 'Developers can inspect documentation at /documentation and explore public code templates on our official GitHub organization.'
    },
    {
      q: 'Does Gyan VaniAi participate in third-party software reviews?',
      a: 'Yes, we are actively claiming and maintaining vendor profiles across G2, Capterra (Gartner Digital Markets), Product Hunt, and AlternativeTo. Verified client reviews are authentic and verified by corporate email.'
    }
  ];

  return (
    <div className="where-to-find-us-page">
      <SeoHead
        title="Official Brand Presence & Verified Listings | Where to Find Us | Gyan VaniAi"
        description="Verify official company profiles, office location on Google Maps, social channels, and B2B directories for Gyan VaniAi Technologies."
        canonical="https://www.gyanvaniai.com/resources/where-to-find-us"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Where to Find Gyan VaniAi - Official Brand Verification",
          "url": "https://www.gyanvaniai.com/resources/where-to-find-us",
          "description": "Directory of verified corporate profiles, developer resources, office location on Google Maps, and official listings for Gyan VaniAi.",
          "publisher": {
            "@type": "Organization",
            "name": "Gyan VaniAi",
            "url": "https://www.gyanvaniai.com",
            "logo": "https://www.gyanvaniai.com/logo.webp",
            "sameAs": [
              "https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6",
              "https://github.com/gyanvaniai",
              "https://www.linkedin.com/company/gyan-vaniai",
              "https://www.facebook.com/gyanvaniai/"
            ]
          }
        }}
      />

      {/* Hero Section */}
      <section className="where-hero">
        <div className="container">
          <div className="where-hero-badge">
            <ShieldCheck size={16} />
            <span>Official Brand Verification & Ecosystem Directory</span>
          </div>
          <h1 className="where-hero-title">Where to Find Gyan VaniAi</h1>
          <p className="where-hero-subtitle">
            A verified register of our official developer portals, corporate social profiles, and B2B software directory listings. Use this guide to ensure authentic communication and avoid spoofed domains.
          </p>
        </div>
      </section>

      {/* Brand Identity / NAP Consistency Panel */}
      <section className="where-nap-section">
        <div className="container">
          <div className="where-nap-card">
            <h2 className="where-nap-heading">
              <Building2 size={20} />
              <span>Official Entity & Contact Verification (NAP)</span>
            </h2>
            <div className="where-nap-grid">
              <div className="where-nap-item">
                <span className="where-nap-label">Brand & Entity Name</span>
                <strong className="where-nap-val">Gyan VaniAi Technologies</strong>
                <span className="where-nap-note">Standardized across all global profiles</span>
              </div>
              <div className="where-nap-item">
                <span className="where-nap-label">Office Headquarters</span>
                <strong className="where-nap-val">
                  <a href="https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6" target="_blank" rel="noopener noreferrer" className="where-link">Gyan VaniAi Technologies</a>
                </strong>
                <span className="where-nap-note">Verified Google Maps location</span>
              </div>
              <div className="where-nap-item">
                <span className="where-nap-label">Official Website URL</span>
                <strong className="where-nap-val">
                  <a href="https://www.gyanvaniai.com" className="where-link">https://www.gyanvaniai.com</a>
                </strong>
                <span className="where-nap-note">Canonical HTTPS WWW production origin</span>
              </div>
              <div className="where-nap-item">
                <span className="where-nap-label">Official Primary Email</span>
                <strong className="where-nap-val">
                  <a href="mailto:contact@gyanvaniai.com" className="where-link">contact@gyanvaniai.com</a>
                </strong>
                <span className="where-nap-note">Direct engineering & sales inquiries</span>
              </div>
              <div className="where-nap-item">
                <span className="where-nap-label">Official WhatsApp Helpline</span>
                <strong className="where-nap-val">
                  <a href="https://wa.me/918700620913" target="_blank" rel="noopener noreferrer" className="where-link">+91 87006 20913</a>
                </strong>
                <span className="where-nap-note">Live WhatsApp Coexistence demo number</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location & Google Maps Interactive Embed Section */}
      <section className="where-map-section">
        <div className="container">
          <div className="where-map-card">
            <div className="where-map-header">
              <div>
                <span className="where-pill-live">
                  <MapPin size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  Physical Headquarters
                </span>
                <h2 className="where-map-title">Gyan VaniAi Technologies Office Location</h2>
                <p className="where-map-desc">
                  Find our office location on Google Maps or navigate directly to our registered headquarters. Verified software company location.
                </p>
              </div>
              <div className="where-map-actions">
                <a
                  href="https://maps.app.goo.gl/Ts3kKh9L8fe4m9AP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary where-map-directions-btn"
                >
                  <MapPin size={16} />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="where-map-frame-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920171.8511723293!2d85.42869444687501!3d25.723578000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee23cee9501acf%3A0x7df9bbd4bdd9f93c!2sGyan%20VaniAi%20Technologies!5e0!3m2!1sen!2sin!4v1791388084453!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Gyan VaniAi Technologies Office Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Verified Live Profiles */}
      <section className="where-profiles-section">
        <div className="container">
          <div className="where-section-header">
            <span className="where-pill-live">Verified Channels</span>
            <h2 className="where-section-title">Official Corporate & Developer Profiles</h2>
            <p className="where-section-desc">
              These channels are owned, maintained, and actively verified by the core Gyan VaniAi engineering and operations team.
            </p>
          </div>

          <div className="where-cards-grid">
            {verifiedAssets.map((asset, idx) => (
              <div key={idx} className="where-profile-card live">
                <div className="where-card-top">
                  <span className="where-platform-name">{asset.platform}</span>
                  <span className="where-status-live">
                    <CheckCircle2 size={12} />
                    <span>LIVE</span>
                  </span>
                </div>
                <p className="where-card-desc">{asset.description}</p>
                <div className="where-card-meta">
                  <span><strong>Category:</strong> {asset.category}</span>
                </div>
                <div className="where-card-footer">
                  <a href={asset.profileUrl} target="_blank" rel="noopener noreferrer" className="where-action-btn">
                    <span>Visit Profile</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Directory Listings & Ecosystem Profiles */}
      <section className="where-ecosystem-section">
        <div className="container">
          <div className="where-section-header">
            <span className="where-pill-target">B2B SaaS Ecosystem</span>
            <h2 className="where-section-title">Software Directories & Ecosystem Verification</h2>
            <p className="where-section-desc">
              We maintain active profiles and submission tracking across international SaaS marketplaces, enterprise software review sites, and AI discovery hubs.
            </p>
          </div>

          <div className="where-cards-grid">
            {acquisitionPlatforms.map((plat, idx) => (
              <div key={idx} className="where-profile-card opportunity">
                <div className="where-card-top">
                  <span className="where-platform-name">{plat.platform}</span>
                  <span className="where-status-target">{plat.status}</span>
                </div>
                <p className="where-card-desc">{plat.description}</p>
                <div className="where-card-meta">
                  <div><strong>Category:</strong> {plat.category}</div>
                  <div><strong>Official Listing Page:</strong> <code>{plat.targetPage}</code></div>
                </div>
                <div className="where-card-footer">
                  <a href={plat.submissionUrl} target="_blank" rel="noopener noreferrer" className="where-action-btn secondary">
                    <span>Directory Hub</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Navigation links to related hubs */}
      <section className="where-nav-section">
        <div className="container">
          <div className="where-nav-box">
            <h3 className="where-nav-heading">Related Engineering & Architecture Resources</h3>
            <div className="where-nav-links">
              <Link to="/about" className="where-nav-link">About Gyan VaniAi</Link>
              <Link to="/documentation" className="where-nav-link">Developer Documentation</Link>
              <Link to="/security" className="where-nav-link">Security & Trust Center</Link>
              <Link to="/pricing" className="where-nav-link">Transparent Pricing</Link>
              <Link to="/services/whatsapp-coexistence" className="where-nav-link">WhatsApp Coexistence</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on Brand Verification" />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
