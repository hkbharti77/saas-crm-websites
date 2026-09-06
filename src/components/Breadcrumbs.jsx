import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

/**
 * Breadcrumbs Component
 * Improves navigation, user experience, and SEO with structured breadcrumb navigation
 * Includes Schema.org BreadcrumbList markup
 */
export default function Breadcrumbs({ customPaths = null }) {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show breadcrumbs on home page or admin pages
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  // Use custom paths if provided, otherwise generate from URL
  let paths = customPaths;
  
  if (!paths) {
    const segments = pathname.split('/').filter(Boolean);
    paths = segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { label, path };
    });
  }

  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.gyanvaniai.online/"
      },
      ...paths.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://www.gyanvaniai.online${item.path}`
      }))
    ]
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Visual Breadcrumbs */}
      <nav 
        className="breadcrumbs" 
        aria-label="Breadcrumb"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="breadcrumbs-list">
          <li 
            className="breadcrumb-item"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <Link 
              to="/" 
              className="breadcrumb-link"
              itemProp="item"
            >
              <Home size={16} />
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
            <ChevronRight size={16} className="breadcrumb-separator" />
          </li>

          {paths.map((item, index) => {
            const isLast = index === paths.length - 1;
            return (
              <li 
                key={item.path}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span 
                    className="breadcrumb-current"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      to={item.path} 
                      className="breadcrumb-link"
                      itemProp="item"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                    <ChevronRight size={16} className="breadcrumb-separator" />
                  </>
                )}
                <meta itemProp="position" content={index + 2} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
