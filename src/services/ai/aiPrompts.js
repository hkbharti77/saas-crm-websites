/**
 * aiPrompts.js
 * Centralized prompt templates for controlled AI Content Assistant operations.
 * Validates allowed operation identifiers and constructs safe server-side prompts.
 */

export const ALLOWED_OPERATIONS = new Set([
  'improve_writing',
  'rewrite',
  'concise',
  'expand',
  'change_tone',
  'grammar',
  'introduction',
  'conclusion',
  'headings',
  'faq',
  'summary',
  'social_post',
  'seo_title',
  'meta_description',
  'cta',
  'image_prompts',
  'aiImagePrompts',
  // P4-C SEO & Brief Operations
  'aiSeoAnalyze',
  'aiSeoTitleSuggestions',
  'aiMetaDescriptionSuggestions',
  'aiSlugSuggestions',
  'aiHeadingAnalysis',
  'aiSearchIntent',
  'aiContentBrief',
  'aiFaqSuggestions',
]);

export const TONE_OPTIONS = [
  'Professional',
  'Friendly',
  'Conversational',
  'Technical',
  'Concise',
  'Persuasive',
];

/**
 * Build prompt and system instructions for a controlled operation.
 * @param {string} operation
 * @param {string} text - Selected text or input snippet
 * @param {Object} context - Article metadata (title, category, excerpt, existingContent)
 * @param {string} tone - Target tone if operation is change_tone
 */
export function buildAssistPrompt(opParam, textParam = '', contextParam = {}, toneParam = 'Professional') {
  let operation, text, context, tone;
  if (typeof opParam === 'object' && opParam !== null) {
    ({ operation, text = '', context = {}, tone = 'Professional' } = opParam);
  } else {
    operation = opParam;
    text = textParam;
    context = contextParam;
    tone = toneParam;
  }

  if (!ALLOWED_OPERATIONS.has(operation)) {
    throw new Error(`Unsupported AI operation: "${operation}"`);
  }

  const { title = '', category = '', excerpt = '', existingContent = '', slug = '', audience = '' } = context;

  // Build minimal context header (non-PII)
  const contextHeader = [
    title ? `Article Title: "${title}"` : '',
    category ? `Category: "${category}"` : '',
    excerpt ? `Excerpt: "${excerpt}"` : '',
    slug ? `Slug: "${slug}"` : '',
  ].filter(Boolean).join('\n');

  let instructions;
  let systemPrompt = 'You are an expert enterprise AI blog editor and content strategist. Produce high-quality, professional, well-structured output. Return clean HTML-formatted output (<p>, <h2>, <h3>, <strong>, <ul>, <li>). Do NOT use raw markdown formatting symbols such as **, ###, or markdown codeblocks.';
  let outputType = 'text';

  if (['image_prompts', 'aiImagePrompts', 'aiSeoAnalyze', 'aiSeoTitleSuggestions', 'aiMetaDescriptionSuggestions', 'aiSlugSuggestions', 'aiHeadingAnalysis', 'aiSearchIntent', 'aiContentBrief', 'aiFaqSuggestions'].includes(operation)) {
    outputType = 'json';
  }

  const contextInfo = contextHeader ? `Article Context:\n${contextHeader}\n\n` : '';

  switch (operation) {
    case 'improve_writing':
      instructions = `${contextInfo}Improve the writing quality, flow, and clarity of the following text for this article while preserving its core meaning:\n\n"${text}"`;
      break;
    case 'rewrite':
      instructions = `${contextInfo}Rewrite the following text from a fresh perspective for this article while keeping the key message intact:\n\n"${text}"`;
      break;
    case 'concise':
      instructions = `${contextInfo}Make the following text concise, punchy, and direct by eliminating fluff:\n\n"${text}"`;
      break;
    case 'expand':
      instructions = `${contextInfo}Expand the following snippet into a thorough, high-quality, 2-3 paragraph section with relevant enterprise details and examples for this article:\n\n"${text}"`;
      break;
    case 'change_tone':
      instructions = `${contextInfo}Rewrite the following text in a ${tone} tone for this article:\n\n"${text}"`;
      break;
    case 'grammar':
      instructions = `${contextInfo}Fix all spelling, grammar, punctuation, and syntax errors in the following text:\n\n"${text}"`;
      break;
    case 'introduction':
      instructions = `Write an engaging, hook-driven introduction paragraph for this blog post.${contextHeader ? `\n\nContext:\n${contextHeader}` : ''}${text ? `\n\nStarting draft/notes: "${text}"` : ''}`;
      break;
    case 'conclusion':
      instructions = `Write a strong, memorable conclusion with a summary of key takeaways and next steps.${contextHeader ? `\n\nContext:\n${contextHeader}` : ''}${existingContent ? `\n\nArticle Content Summary:\n${existingContent.slice(0, 2000)}` : ''}`;
      break;
    case 'headings':
      instructions = `Generate 4-6 SEO-optimized H2/H3 subheadings for an article with title "${title || text}". Format as clean HTML headers (e.g. <h2>...</h2>).`;
      break;
    case 'faq':
      instructions = `Generate a Frequently Asked Questions (FAQ) section with 3-5 Q&A pairs relevant to article title "${title || text}". Format with <h3> for questions and <p> for answers.`;
      break;
    case 'summary':
      instructions = `Write a concise 2-3 sentence executive summary of this article.${contextHeader ? `\n\nContext:\n${contextHeader}` : ''}${text ? `\n\nContent:\n${text}` : ''}`;
      break;
    case 'social_post':
      instructions = `Create a compelling LinkedIn & Twitter social media share post promoting this blog article.${contextHeader ? `\n\nContext:\n${contextHeader}` : ''}`;
      break;
    case 'seo_title':
      instructions = `Generate a compelling, click-worthy SEO Meta Title under 60 characters for an article titled "${title || text}". Output ONLY the plain text title.`;
      break;
    case 'meta_description':
      instructions = `Generate an engaging SEO Meta Description between 140-155 characters for an article titled "${title || text}". Output ONLY the plain text description.`;
      break;
    case 'cta':
      instructions = `Generate an engaging Call to Action (CTA) paragraph encouraging readers to book a free demo or contact sales.${contextHeader ? `\n\nContext:\n${contextHeader}` : ''}`;
      break;

    case 'image_prompts':
    case 'aiImagePrompts':
      systemPrompt = 'You are a creative AI visual director specializing in generating high-converting, realistic, and artistic image generation prompts for blog posts (for Midjourney v6, DALL-E 3, Stable Diffusion XL, and FLUX). Return ONLY a valid raw JSON object.';
      instructions = `Generate 3 to 4 post-related image generation prompts for an article titled "${title || text}".\n\nContext:\n${contextHeader}\n\nBody snippet:\n${existingContent.slice(0, 2500)}\n\nReturn JSON in this format:\n{\n  "prompts": [\n    {\n      "id": "hero_banner",\n      "purpose": "Featured Banner / Hero Image",\n      "prompt": "Detailed 3D glassmorphic render of an enterprise AI dashboard with glowing nodes, vibrant teal and indigo palette, cinematic lighting, ultra detailed, 8k --ar 16:9",\n      "style": "3D Glassmorphism",\n      "aspectRatio": "16:9"\n    },\n    {\n      "id": "section_concept",\n      "purpose": "Section 1 Concept Illustration",\n      "prompt": "Clean isometric vector illustration of automated digital CRM workflows, modern tech aesthetic, soft gradient shadows --ar 4:3",\n      "style": "Isometric Vector Illustration",\n      "aspectRatio": "4:3"\n    },\n    {\n      "id": "diagram_visual",\n      "purpose": "Infographic / Diagram Concept",\n      "prompt": "Sleek data visualization chart with glowing analytics connections, dark mode UI aesthetic, hyper realistic tech detail --ar 16:9",\n      "style": "Modern Data Visualization",\n      "aspectRatio": "16:9"\n    }\n  ]\n}`;
      break;

    // P4-C Operations
    case 'aiSeoAnalyze':
      systemPrompt = 'You are an expert technical SEO auditor. Return ONLY a valid raw JSON object adhering to the schema.';
      instructions = `Analyze this blog post for SEO quality based strictly on the provided content.\n\nContext:\n${contextHeader}\n\nBody snippet:\n${existingContent.slice(0, 3000)}\n\nReturn JSON in this format:\n{\n  "score": 85,\n  "strengths": ["Clear title", "Good H2 structure"],\n  "issues": ["SEO title could be shorter", "Missing FAQ section"],\n  "recommendations": ["Optimize meta description to 150 chars", "Add 3 FAQ questions"]\n}`;
      break;

    case 'aiSeoTitleSuggestions':
      systemPrompt = 'You are an SEO headline specialist. Return ONLY a valid raw JSON array of 3 to 5 items.';
      instructions = `Generate 3 to 5 SEO title suggestions for an article titled "${title || text}". Each title must be under 60 characters.\n\nContext:\n${contextHeader}\n\nReturn JSON array format:\n[\n  { "title": "...", "characterCount": 54, "reason": "Includes target keyword and strong action verb" }\n]`;
      break;

    case 'aiMetaDescriptionSuggestions':
      systemPrompt = 'You are an SEO copywriting specialist. Return ONLY a valid raw JSON array of 3 to 5 items.';
      instructions = `Generate 3 to 5 SEO meta description suggestions for an article titled "${title || text}". Each description must be between 135 and 155 characters.\n\nContext:\n${contextHeader}\n\nReturn JSON array format:\n[\n  { "description": "...", "characterCount": 146, "reason": "Compelling hook with CTA" }\n]`;
      break;

    case 'aiSlugSuggestions':
      systemPrompt = 'You are a web URL slug specialist. Return ONLY a valid raw JSON array of 3 to 4 items.';
      instructions = `Generate 3 to 4 URL slug options for an article titled "${title || text}". Slugs must be lowercase, hyphen-separated, and URL-safe.\n\nContext:\n${contextHeader}\n\nReturn JSON array format:\n[\n  { "slug": "enterprise-ai-crm-guide", "reason": "Concise and keyword-focused" }\n]`;
      break;

    case 'aiHeadingAnalysis':
      systemPrompt = 'You are an article structure specialist. Return ONLY a valid raw JSON object.';
      instructions = `Analyze the heading structure of this article content.\n\nContent:\n${existingContent.slice(0, 3000)}\n\nReturn JSON format:\n{\n  "status": "Good",\n  "recommendations": ["Add H2 before section 2", "Break down long paragraph under H2"]\n}`;
      break;

    case 'aiSearchIntent':
      systemPrompt = 'You are an intent classification specialist. Return ONLY a valid raw JSON object.';
      instructions = `Classify the primary search intent for an article titled "${title || text}".\n\nContext:\n${contextHeader}\n\nReturn JSON format:\n{\n  "intent": "Informational",\n  "confidence": "High",\n  "reason": "Article explains core concepts, architectural guides, and implementation steps"\n}`;
      break;

    case 'aiContentBrief':
      systemPrompt = 'You are a senior SEO content strategist. Return ONLY a valid raw JSON object.';
      instructions = `Generate a concise SEO Content Brief for Topic: "${text || title}".
Target Audience: "${audience || 'B2B Enterprise Decision Makers'}"
Category: "${category || 'AI Automation'}"

Return JSON format:
{
  "suggestedTitle": "SEO Friendly Title",
  "targetAudience": "Target Audience",
  "primaryKeywords": ["keyword 1", "keyword 2"],
  "secondaryKeywords": ["concept 1", "concept 2"],
  "searchIntent": "Informational",
  "estimatedWordCount": "1200-1500 words",
  "outline": [
    {
      "heading": "H2: Key Benefit 1",
      "keyPoints": ["Point A", "Point B"],
      "estimatedWords": "300"
    },
    {
      "heading": "H2: Implementation Steps",
      "keyPoints": ["Point C", "Point D"],
      "estimatedWords": "400"
    }
  ],
  "keyQuestions": ["Question 1?", "Question 2?"],
  "differentiator": "Unique angle focusing on enterprise security and CRM integration.",
  "ctaRecommendation": "Schedule a live demo."
}`;
      break;

    case 'aiFaqSuggestions':
      systemPrompt = 'You are a FAQ generator. Return ONLY a valid raw JSON array of 3 to 5 items.';
      instructions = `Generate 3 to 5 relevant FAQ questions and answer outlines for an article titled "${title || text}".\n\nContext:\n${contextHeader}\n\nReturn JSON array format:\n[\n  { "question": "...", "whyItHelps": "Address key buyer question", "answerOutline": "..." }\n]`;
      break;

    default:
      instructions = `Process the following text:\n\n"${text}"`;
  }

  return {
    systemPrompt,
    prompt: instructions,
    userPrompt: instructions,
    outputType,
  };
}

export const buildAiPrompt = buildAssistPrompt;
