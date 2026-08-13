/**
 * Helpers for dynamic blog SEO (Firestore-backed posts).
 */

const SITE = 'https://www.gyanvaniai.online';

export function blogPostUrl(slugId) {
  return `${SITE}/blog/${slugId}`;
}

export function stripHtml(html = '') {
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toIsoDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === 'function') {
    try {
      return value.toDate().toISOString();
    } catch {
      return null;
    }
  }
  if (typeof value === 'object' && value.seconds != null) {
    return new Date(value.seconds * 1000).toISOString();
  }
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  return null;
}

/** Prefer Firestore timestamps; fall back to human-readable `date` string. */
export function resolvePostDates(post) {
  const published =
    toIsoDate(post?.createdAt) ||
    toIsoDate(post?.date) ||
    new Date().toISOString();
  const modified =
    toIsoDate(post?.updatedAt) ||
    toIsoDate(post?.createdAt) ||
    published;
  return { published, modified };
}

export function resolveDescription(post) {
  const excerpt = (post?.excerpt || '').trim();
  if (excerpt) return excerpt.slice(0, 160);
  const fromBody = stripHtml(post?.content || '').slice(0, 160);
  return fromBody || 'Insights on AI, CRM, and automation from Gyan VaniAi.';
}

export function buildBlogPostingSchema(post, slugId) {
  const { published, modified } = resolvePostDates(post);
  const description = resolveDescription(post);
  const url = blogPostUrl(slugId);
  const image = post.imageUrl || `${SITE}/hero_dashboard.webp`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description,
    image: [image],
    inLanguage: 'en',
    datePublished: published,
    dateModified: modified,
    author: {
      '@type': 'Person',
      name: post.author || 'Gyan VaniAi Team',
    },
    publisher: { '@id': `${SITE}/#organization` },
    isPartOf: {
      '@type': 'Blog',
      name: 'Gyan VaniAi Blog',
      url: `${SITE}/blog`,
    },
    ...(post.category ? { articleSection: post.category } : {}),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.blog-post-header', '.blog-post-content'],
    },
  };
}

export function buildBlogBreadcrumbSchema(post, slugId) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: blogPostUrl(slugId),
      },
    ],
  };
}

export function buildBlogIndexSchema(posts = []) {
  const itemListElement = posts.slice(0, 50).map((post, index) => {
    const slug = post.slugId || post.id;
    return {
      '@type': 'ListItem',
      position: index + 1,
      url: blogPostUrl(slug),
      name: post.title,
    };
  });

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Gyan VaniAi Blog',
      url: `${SITE}/blog`,
      description:
        'Insights on AI orchestration, secure RAG pipelines, WhatsApp automation, and CRM workflows by Gyan VaniAi.',
      publisher: { '@id': `${SITE}/#organization` },
      isPartOf: { '@id': `${SITE}/#website` },
      ...(itemListElement.length
        ? {
            blogPost: posts.slice(0, 20).map((post) => {
              const slug = post.slugId || post.id;
              const { published } = resolvePostDates(post);
              return {
                '@type': 'BlogPosting',
                headline: post.title,
                url: blogPostUrl(slug),
                datePublished: published,
                description: resolveDescription(post),
              };
            }),
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      ],
    },
    ...(itemListElement.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Latest Gyan VaniAi Blog Posts',
            itemListOrder: 'https://schema.org/ItemListOrderDescending',
            numberOfItems: itemListElement.length,
            itemListElement,
          },
        ]
      : []),
  ];
}
