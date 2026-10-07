import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { 
  ShoppingBag, 
  RefreshCw, 
  ArrowRight, 
  Zap, 
  Database, 
  Users, 
  CreditCard
} from 'lucide-react';
import AiAnswerSummaryBlock from '../components/AiAnswerSummaryBlock';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import './WhatsAppCatalogCrmPage.css';

export default function WhatsAppCatalogCrmPage() {

  const aiSummaryItems = [
    {
      question: "What is Gyan VaniAi WhatsApp Catalog CRM?",
      answer: "A specialized CRM module that synchronizes your e-commerce product catalog directly with Meta WhatsApp Cloud API, enabling customers to browse inventory, add items to a native WhatsApp cart, and checkout without leaving the chat."
    },
    {
      question: "Who is this solution for?",
      answer: "Direct-to-consumer (D2C) brands, retailers, wholesalers, and sales teams who sell products via WhatsApp and need real-time inventory sync and automated order logging in their CRM."
    },
    {
      question: "What problem does it solve?",
      answer: "It eliminates manual product sharing via PDF catalogs, resolves out-of-stock order errors through live inventory webhooks, and replaces fragmented chat sales with automated CRM deal tracking."
    },
    {
      question: "How does it work?",
      answer: "Your product catalog (Shopify, WooCommerce, or custom ERP) connects via API to Meta Commerce Manager. When a user chats with your WhatsApp number, AI agents or human reps dispatch interactive single-product or multi-product catalog cards. Carts convert to orders directly inside Gyan VaniAi CRM."
    },
    {
      question: "How is it different from alternatives?",
      answer: "Unlike basic chat broadcast tools that redirect buyers to external websites, Gyan VaniAi supports native WhatsApp checkout, coexistence with your mobile app, and sub-300ms AI customer support on the same number."
    },
    {
      question: "What is the pricing?",
      answer: "Catalog CRM is included in Gyan VaniAi Growth (₹4,999/mo) and Scale (₹9,999/mo) plans. Standard Meta conversation fees apply directly without markup."
    }
  ];

  const features = [
    {
      icon: <RefreshCw size={22} />,
      title: "Real-Time Inventory Sync",
      desc: "Automatically sync SKU counts, prices, and variant descriptions from Shopify, WooCommerce, or custom databases to Meta Commerce Manager."
    },
    {
      icon: <ShoppingBag size={22} />,
      title: "Native In-Chat Catalog Cards",
      desc: "Send interactive Single-Product Messages (SPM) or Multi-Product Messages (MPM) with rich images, pricing, and Add-to-Cart actions."
    },
    {
      icon: <Zap size={22} />,
      title: "Automated Cart Recovery",
      desc: "Trigger automated follow-up messages within 1-2 hours when a shopper adds items to their WhatsApp cart but does not place an order."
    },
    {
      icon: <CreditCard size={22} />,
      title: "In-Chat Payments & UPI",
      desc: "Generate native payment links, WhatsApp Pay requests, or Razorpay UPI QR codes directly inside the conversation thread."
    },
    {
      icon: <Database size={22} />,
      title: "Unified Customer Order History",
      desc: "Every placed order, repeat purchase, and cart event is logged against the customer's CRM profile for personalized follow-ups."
    },
    {
      icon: <Users size={22} />,
      title: "Multi-Agent Order Routing",
      desc: "Route high-value wholesale inquiries to senior sales reps while letting AI handle routine catalog browsing and shipping status checks."
    }
  ];

  const faqs = [
    {
      q: "Can I use WhatsApp Catalog CRM while keeping my mobile WhatsApp Business app?",
      a: "Yes. Gyan VaniAi's flagship Coexistence architecture allows your team to use the standard mobile WhatsApp Business app on iOS/Android while the Catalog CRM and Cloud API operate on the exact same number."
    },
    {
      q: "How many products can I host in a WhatsApp Catalog?",
      a: "Meta Commerce Manager supports catalogs with up to 100,000 products. Gyan VaniAi syncs your collections, categories, and inventory counts automatically."
    },
    {
      q: "Does this require an official Meta WhatsApp Business API account?",
      a: "Yes. Gyan VaniAi provides 1-Click Embedded Meta Signup, enabling you to connect your verified WhatsApp Business Account (WABA) in under 5 minutes."
    },
    {
      q: "Which e-commerce platforms are supported?",
      a: "We offer native integrations with Shopify, WooCommerce, Magento, and custom REST API webhooks for proprietary ERP or inventory databases."
    }
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'WhatsApp Catalog CRM & In-Chat Commerce',
    serviceType: 'E-commerce WhatsApp CRM Automation',
    provider: {
      '@type': 'Organization',
      name: 'Gyan VaniAi',
      url: 'https://www.gyanvaniai.com'
    },
    areaServed: 'Worldwide',
    description: 'Sync product catalogs with WhatsApp Cloud API for native cart checkout, automated inventory updates, and CRM order management.',
    url: 'https://www.gyanvaniai.com/services/whatsapp-catalog-crm'
  };

  return (
    <div className="catalog-crm-page">
      <SeoHead
        title="WhatsApp Catalog CRM | In-Chat Product Orders & Sync | Gyan VaniAi"
        description="Sync e-commerce catalogs with WhatsApp Cloud API. Enable native in-chat carts, automated inventory sync, and CRM order pipelines on one WhatsApp number."
        canonical="https://www.gyanvaniai.com/services/whatsapp-catalog-crm"
        schema={serviceSchema}
        keywords="WhatsApp Catalog CRM, WhatsApp Commerce, WhatsApp E-commerce, Meta Commerce Manager CRM, In-Chat Checkout"
      />

      {/* Hero Section */}
      <section className="catalog-hero">
        <div className="container">
          <div className="catalog-hero-badge">
            <ShoppingBag size={16} />
            <span>Commerce & Catalog Module</span>
          </div>
          <h1 className="catalog-hero-title">
            WhatsApp Catalog CRM & In-Chat Commerce
          </h1>
          <p className="catalog-hero-subtitle">
            Turn WhatsApp into a high-converting storefront. Synchronize real-time inventory from your store, send interactive product cards, and capture orders directly in your CRM pipeline.
          </p>
          <div className="catalog-hero-actions">
            <a href="/#contact" className="btn btn-primary">
              <span>Book Catalog Demo</span>
              <ArrowRight size={16} />
            </a>
            <Link to="/pricing" className="btn btn-secondary">
              <span>View Pricing Plans</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Direct AI Answer Extraction Block */}
      <AiAnswerSummaryBlock items={aiSummaryItems} title="WhatsApp Catalog CRM: Technical & Architectural Facts" />

      {/* Features Grid */}
      <section className="catalog-features-section">
        <div className="container">
          <div className="catalog-section-header">
            <span className="catalog-pill">Core Capabilities</span>
            <h2 className="catalog-section-title">Engineered for Frictionless WhatsApp Selling</h2>
            <p className="catalog-section-desc">
              Everything required to operate an automated WhatsApp product showroom with multi-agent support and CRM deal telemetry.
            </p>
          </div>

          <div className="catalog-grid">
            {features.map((f, idx) => (
              <div key={idx} className="catalog-feature-card">
                <div className="catalog-icon-box">{f.icon}</div>
                <h3 className="catalog-card-title">{f.title}</h3>
                <p className="catalog-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links / Topical Cluster Nav */}
      <section className="catalog-cluster-nav">
        <div className="container">
          <div className="catalog-cluster-card">
            <h3 className="catalog-cluster-title">Explore Related WhatsApp & CRM Infrastructure</h3>
            <div className="catalog-cluster-links">
              <Link to="/services/whatsapp-coexistence" className="catalog-cluster-link">
                <span>WhatsApp Coexistence Mode</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/sales-automation" className="catalog-cluster-link">
                <span>Sales Automation Workflows</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/services/lead-management" className="catalog-cluster-link">
                <span>Lead Management CRM</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/tools/whatsapp-pricing-calculator" className="catalog-cluster-link">
                <span>WhatsApp Meta Pricing Calculator</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <FAQ items={faqs} title="Frequently Asked Questions on WhatsApp Catalog CRM" />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
