/**
 * Schema.org Structured Data Generator
 * Optimized for Google, Bing, Yandex, and AI search engines
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://www.gyanvaniai.online/#organization",
  "name": "Gyan VaniAi",
  "alternateName": "Gyan Vani AI",
  "url": "https://www.gyanvaniai.online/",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://www.gyanvaniai.online/#logo",
    "url": "https://www.gyanvaniai.online/logo.png",
    "contentUrl": "https://www.gyanvaniai.online/logo.png",
    "width": 512,
    "height": 512,
    "caption": "Gyan VaniAi Logo"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://www.gyanvaniai.online/hero_dashboard.webp",
    "width": 1200,
    "height": 630
  },
  "description": "Leading AI CRM and automation platform specializing in WhatsApp Business API, AI chatbots, voice bots, and enterprise software solutions for business growth.",
  "slogan": "Build AI-Powered Software That Grows Your Business",
  "email": "contact@gyanvaniai.online",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Global"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "United States"
    },
    {
      "@type": "Country",
      "name": "United Kingdom"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "Country",
      "name": "China"
    },
    {
      "@type": "Country",
      "name": "Singapore"
    },
    {
      "@type": "Country",
      "name": "Australia"
    },
    "Worldwide"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "0",
      "longitude": "0"
    },
    "geoRadius": "20000000"
  },
  "priceRange": "$$",
  "founder": {
    "@type": "Person",
    "name": "Gyan VaniAi Team"
  },
  "foundingDate": "2024",
  "knowsAbout": [
    "Artificial Intelligence",
    "CRM Development",
    "WhatsApp Business API",
    "AI Chatbots",
    "Voice AI",
    "Enterprise Software",
    "Sales Automation",
    "Lead Management",
    "RAG Pipelines",
    "AI Agent Development"
  ],
  "sameAs": [
    "https://www.facebook.com/gyanvaniai/",
    "https://www.linkedin.com/company/gyan-vaniai"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.gyanvaniai.online/#website",
  "url": "https://www.gyanvaniai.online/",
  "name": "Gyan VaniAi",
  "description": "Enterprise AI CRM, WhatsApp Automation, and Custom Software Development Platform",
  "publisher": {
    "@id": "https://www.gyanvaniai.online/#organization"
  },
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.gyanvaniai.online/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.gyanvaniai.online/#localbusiness",
  "name": "Gyan VaniAi",
  "image": "https://www.gyanvaniai.online/hero_dashboard.webp",
  "url": "https://www.gyanvaniai.online/",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "contact@gyanvaniai.online",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const serviceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://www.gyanvaniai.online${service.url}#service`,
  "serviceType": service.name,
  "name": service.name,
  "description": service.description,
  "provider": {
    "@id": "https://www.gyanvaniai.online/#organization"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": service.name,
    "itemListElement": service.features?.map((feature) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": feature
      }
    })) || []
  },
  "image": service.image,
  "url": `https://www.gyanvaniai.online${service.url}`
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": ["Article", "BlogPosting"],
  "@id": `https://www.gyanvaniai.online/blog/${article.id}#article`,
  "headline": article.title,
  "description": article.excerpt || article.description,
  "image": article.image || "https://www.gyanvaniai.online/hero_dashboard.webp",
  "datePublished": article.publishDate || article.createdAt,
  "dateModified": article.updatedAt || article.publishDate || article.createdAt,
  "author": {
    "@type": "Organization",
    "@id": "https://www.gyanvaniai.online/#organization"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.gyanvaniai.online/#organization",
    "name": "Gyan VaniAi",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://www.gyanvaniai.online/#logo"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.gyanvaniai.online/blog/${article.id}`
  },
  "keywords": article.tags?.join(", ") || article.keywords,
  "articleSection": article.category || "Technology",
  "inLanguage": "en-US",
  "url": `https://www.gyanvaniai.online/blog/${article.id}`
});

export const videoSchema = (video) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.title,
  "description": video.description,
  "thumbnailUrl": video.thumbnail,
  "uploadDate": video.uploadDate,
  "contentUrl": video.url,
  "embedUrl": video.embedUrl,
  "duration": video.duration
});

export const howToSchema = (howTo) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.title,
  "description": howTo.description,
  "image": howTo.image,
  "totalTime": howTo.duration,
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": howTo.cost || "0"
  },
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.description,
    "image": step.image,
    "url": step.url
  }))
});

export const softwareAppSchema = (app) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": app.name,
  "description": app.description,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": app.price || "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": app.rating || "4.8",
    "ratingCount": app.ratingCount || "127"
  },
  "author": {
    "@id": "https://www.gyanvaniai.online/#organization"
  }
});

// Service definitions for structured data
export const services = [
  {
    name: "WhatsApp Business API Integration",
    url: "/services/whatsapp-automation",
    description: "Official WhatsApp Business API with cloud hosting, interactive buttons, automated campaigns, and team inbox management.",
    image: "https://www.gyanvaniai.online/whatsapp-features-new.webp",
    features: ["Official WhatsApp API", "Interactive Buttons", "Broadcast Campaigns", "Team Inbox", "Automation Workflows"]
  },
  {
    name: "WhatsApp Coexistence Platform",
    url: "/services/whatsapp-coexistence",
    description: "Keep your personal WhatsApp app while running business automation on the same number. Meta Tech Provider certified solution.",
    image: "https://www.gyanvaniai.online/whatsapp_coexistence_light.webp",
    features: ["Dual Surface Support", "Meta Certified", "Personal + Business", "Same Phone Number", "Zero Disruption"]
  },
  {
    name: "AI CRM Development",
    url: "/services/crm-development",
    description: "Custom CRM systems with lead management, pipeline tracking, automated follow-ups, and revenue analytics.",
    image: "https://www.gyanvaniai.online/hero_dashboard.webp",
    features: ["Lead Management", "Pipeline Tracking", "Sales Automation", "Analytics Dashboard", "Team Collaboration"]
  },
  {
    name: "AI Chatbot Development",
    url: "/services/ai-chatbots",
    description: "Intelligent AI chatbots powered by RAG pipelines, answering from your knowledge base with sub-300ms latency.",
    image: "https://www.gyanvaniai.online/service-ai-chatbot.webp",
    features: ["RAG Architecture", "Custom Knowledge Base", "Multi-Channel Support", "Natural Language Processing", "24/7 Availability"]
  },
  {
    name: "Voice AI & Calling Agents",
    url: "/services/whatsapp-calling-agent",
    description: "Autonomous voice bots for inbound support and outbound campaigns with human-like conversations.",
    image: "https://www.gyanvaniai.online/voice-bot-hero.webp",
    features: ["Natural Voice AI", "Inbound & Outbound", "Call Recording", "Sentiment Analysis", "Live Handoff"]
  },
  {
    name: "AI Agent Development",
    url: "/services/ai-agent-development",
    description: "Multi-agent orchestration systems that automate complex business workflows with reasoning and tool usage.",
    image: "https://www.gyanvaniai.online/ai-agent-hero.webp",
    features: ["Multi-Agent Systems", "Tool Integration", "Reasoning Engine", "Workflow Automation", "Self-Learning"]
  },
  {
    name: "Sales Automation Platform",
    url: "/services/sales-automation",
    description: "End-to-end sales automation with lead capture, qualification, enrichment, scoring, and intelligent assignment.",
    image: "https://www.gyanvaniai.online/hero_slide_2_light.webp",
    features: ["Lead Capture", "Auto-Enrichment", "AI Scoring", "Smart Routing", "Conversion Tracking"]
  },
  {
    name: "Lead Management System",
    url: "/services/lead-management",
    description: "Centralized lead database with source tracking, funnel analytics, and automated nurturing campaigns.",
    image: "https://www.gyanvaniai.online/lead-hero.webp",
    features: ["Source Attribution", "Funnel Analytics", "Lead Scoring", "Nurture Campaigns", "ROI Tracking"]
  }
];
