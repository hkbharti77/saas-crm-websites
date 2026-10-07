import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck
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
      a: 'Partners and enterprise compliance teams can verify our public presence via our official GitHub organization (github.com/gyanvaniai), verified LinkedIn corporate profile, and direct outreach to contact@gyanvaniai.com.'
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
        description="Verify official company profiles, social channels, developer repositories, and B2B directories for Gyan VaniAi. Official entity verification and contact data."
        canonical="https://www.gyanvaniai.com/resources/where-to-find-us"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Where to Find Gyan VaniAi - Official Brand Verification",
          "url": "https://www.gyanvaniai.com/resources/where-to-find-us",
          "description": "Directory of verified corporate profiles, developer resources, and official listings for Gyan VaniAi.",
          "publisher": {
            "@type": "Organization",
            "name": "Gyan VaniAi",
            "url": "https://www.gyanvaniai.com",
            "logo": "https://www.gyanvaniai.com/logo.webp"
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
                <strong className="where-nap-val">Gyan VaniAi</strong>
                <span className="where-nap-note">Standardized across all global profiles</span>
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
