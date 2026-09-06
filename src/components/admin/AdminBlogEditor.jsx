import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, query } from 'firebase/firestore';
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Layers,
  Loader2,
  ChevronDown,
  ChevronUp,
  Search,
  Share2,
  Tag as TagIcon,
  AlertTriangle,
  Sliders,
  X,
  RotateCcw,
  Sparkles,
  FileText,
  ShieldCheck,
  MessageSquare,
  Link as LinkIcon
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import FeaturedImageUpload from './FeaturedImageUpload';
import AdminHeader from './AdminHeader';
import GoogleSearchPreview from './GoogleSearchPreview';
import SocialSharePreview from './SocialSharePreview';
import TagsInput from './TagsInput';
import AiContentAssistant from './AiContentAssistant';
import AiSeoPanel from './AiSeoPanel';
import ContentBriefModal from './ContentBriefModal';
import '../../pages/BlogPost.css';
import EditorialReviewPanel from './EditorialReviewPanel';
import EditorialComments from './EditorialComments';
import InternalLinkPanel from './InternalLinkPanel';
import AiHistoryPanel from './AiHistoryPanel';
import { pingBlogIndexNow } from '../../utils/pingBlogIndexNow';
import { sanitizeBlogHtml } from '../../utils/sanitizeBlogHtml';
import { slugify } from '../../utils/slugify';
import { logActivity } from '../../utils/auditLogger';
import {
  sanitizePlainText,
  isValidWebUrl,
  getSeoTitleStatus,
  getSeoDescriptionStatus
} from '../../utils/seoValidator';
import '../../pages/BlogPost.css';
import './AdminCMS.css';

const DEFAULT_CATEGORIES = [
  'WhatsApp CRM',
  'AI Automation',
  'Sales Growth',
  'Customer Support',
  'Engineering',
  'Product Updates',
  'Case Studies'
];

export default function AdminBlogEditor({
  initialData = {},
  isEditing = false,
  postId = null
}) {
  const navigate = useNavigate();

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    publishing: true,
    editorialReview: true,
    aiAssistant: true,
    internalLinks: true,
    featuredImage: true,
    tags: false,
    seo: false,
    settings: false,
    comments: true,
    aiHistory: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Selection tracking for AI Assistant
  const [selectedText, setSelectedText] = useState('');
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const handleUseBriefInEditor = ({ title, metaDescription, tags, content: briefContent }) => {
    if (title) handleChange('title', title);
    if (metaDescription) {
      setIsSeoDescCustom(true);
      handleChange('seoDescription', metaDescription);
    }
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      handleChange('tags', tagArray);
      handleChange('tagLabels', tagArray);
    }
    if (briefContent) {
      setContent(briefContent);
      setIsDirty(true);
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const text = selection.toString().trim();
        if (text) setSelectedText(text);
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    author: initialData.author || 'GyanVaniAi Editorial',
    category: initialData.category || 'WhatsApp CRM',
    customCategory: '',
    readTime: initialData.readTime || '',
    imageUrl: initialData.imageUrl || '',
    date: initialData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    status: initialData.status || 'draft',
    // P1 SEO Fields
    seoTitle: initialData.seoTitle || '',
    seoDescription: initialData.seoDescription || '',
    slug: initialData.slugId || '',
    canonicalUrl: initialData.canonicalUrl || '',
    ogImageUrl: initialData.ogImageUrl || '',
    // P1 Tags
    tags: Array.isArray(initialData.tags) ? initialData.tags : [],
    tagLabels: Array.isArray(initialData.tagLabels) ? initialData.tagLabels : [],
    // P1 Scheduling
    publishingMode: initialData.status === 'scheduled' ? 'schedule' : initialData.status === 'published' ? 'publish' : 'draft',
    scheduledDate: initialData.scheduledDate || '',
    scheduledTime: initialData.scheduledTime || '09:00',
    scheduledTimezone: initialData.scheduledTimezone || 'Asia/Kolkata (IST)',
    // P4-D Editorial Review Fields
    reviewStatus: initialData.reviewStatus || 'none',
    submittedAt: initialData.submittedAt || null,
    submittedBy: initialData.submittedBy || null,
    reviewedAt: initialData.reviewedAt || null,
    reviewedBy: initialData.reviewedBy || null,
    approvedVersionId: initialData.approvedVersionId || null,
    changesRequestedReason: initialData.changesRequestedReason || '',
    // P5-D CTA Configuration Fields
    ctaType: initialData.ctaType || 'book_demo',
    ctaTitle: initialData.ctaTitle || '',
    ctaDescription: initialData.ctaDescription || '',
    ctaLabel: initialData.ctaLabel || '',
    ctaUrl: initialData.ctaUrl || '',
    ctaPosition: initialData.ctaPosition || 'end',
  });

  const [content, setContent] = useState(initialData.content || '');

  // Flags to prevent auto-generation from continuously overwriting manual edits
  const [isSeoTitleCustom, setIsSeoTitleCustom] = useState(Boolean(initialData.seoTitle));
  const [isSeoDescCustom, setIsSeoDescCustom] = useState(Boolean(initialData.seoDescription));
  const [isSlugCustom, setIsSlugCustom] = useState(Boolean(initialData.slugId));

  // UI state
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [customCategoryActive, setCustomCategoryActive] = useState(false);

  // Autosave tracking
  const [autosaveStatus, setAutosaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'dirty' | 'error'
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [timeAgoLabel, setTimeAgoLabel] = useState('');
  const autosaveTimerRef = useRef(null);
  const saveSequenceRef = useRef(0);
  const [activePostId, setActivePostId] = useState(postId);

  // AI Assistant suggestion application handlers
  const handleInsertAiSuggestion = useCallback((suggestionHtml) => {
    const sanitized = sanitizeBlogHtml(suggestionHtml);
    const formattedHtml = /^\s*<(h[1-6]|p|ul|ol|blockquote|div|pre)/i.test(sanitized.trim())
      ? sanitized.trim()
      : `<p>${sanitized.trim()}</p>`;
    setContent((prev) => (prev ? `${prev}\n${formattedHtml}` : formattedHtml));
    setIsDirty(true);
    setAutosaveStatus('dirty');
  }, []);

  const handleReplaceSelection = useCallback((suggestionHtml) => {
    const sanitized = sanitizeBlogHtml(suggestionHtml);
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const div = document.createElement('div');
      div.innerHTML = sanitized;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = div.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);

      const editorEl = document.querySelector('.rte-editor-content');
      if (editorEl) {
        setContent(editorEl.innerHTML);
        setIsDirty(true);
        setAutosaveStatus('dirty');
      }
    } else {
      handleInsertAiSuggestion(suggestionHtml);
    }
  }, [handleInsertAiSuggestion]);

  const handleApplySeoTitle = useCallback((newTitle) => {
    setFormData((prev) => ({ ...prev, seoTitle: newTitle }));
    setIsSeoTitleCustom(true);
    setIsDirty(true);
    setAutosaveStatus('dirty');
  }, []);

  const handleApplyMetaDesc = useCallback((newDesc) => {
    setFormData((prev) => ({ ...prev, seoDescription: newDesc }));
    setIsSeoDescCustom(true);
    setIsDirty(true);
    setAutosaveStatus('dirty');
  }, []);

  // Close publish modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showPublishModal) {
        setShowPublishModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPublishModal]);

  // Sync initialData when loaded (especially for edit page)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      queueMicrotask(() => {
        const draft = initialData.workingDraft || {};
        
        setFormData((prev) => ({
        ...prev,
        title: draft.title || initialData.title || prev.title,
        excerpt: draft.excerpt || initialData.excerpt || prev.excerpt,
        author: draft.author || initialData.author || prev.author,
        category: draft.category || initialData.category || prev.category,
        categoryId: draft.categoryId || initialData.categoryId || prev.categoryId,
        readTime: draft.readTime || initialData.readTime || prev.readTime,
        imageUrl: draft.imageUrl || initialData.imageUrl || prev.imageUrl,
        date: draft.date || initialData.date || prev.date,
        status: initialData.status || prev.status, // Keep original main status
        seoTitle: draft.seoTitle || initialData.seoTitle || draft.title || initialData.title || '',
        seoDescription: draft.seoDescription || initialData.seoDescription || draft.excerpt || initialData.excerpt || '',
        slug: draft.slugId || initialData.slugId || slugify(draft.title || initialData.title || ''),
        canonicalUrl: draft.canonicalUrl || initialData.canonicalUrl || '',
        ogImageUrl: draft.ogImageUrl || initialData.ogImageUrl || '',
        tags: Array.isArray(draft.tags) ? draft.tags : (Array.isArray(initialData.tags) ? initialData.tags : []),
        tagLabels: Array.isArray(draft.tagLabels) ? draft.tagLabels : (Array.isArray(initialData.tagLabels) ? initialData.tagLabels : []),
        publishingMode: initialData.status === 'scheduled' ? 'schedule' : initialData.status === 'published' ? 'publish' : 'draft',
        scheduledDate: initialData.scheduledDate || '',
        scheduledTime: initialData.scheduledTime || '09:00',
        scheduledTimezone: initialData.scheduledTimezone || 'Asia/Kolkata (IST)',
      }));

      const contentToLoad = draft.content || initialData.content;
      if (contentToLoad) {
        setContent(contentToLoad);
      }
      
      const categoryToLoad = draft.category || initialData.category;
      if (categoryToLoad && !DEFAULT_CATEGORIES.includes(categoryToLoad)) {
        setCustomCategoryActive(true);
        setFormData((prev) => ({ ...prev, customCategory: categoryToLoad }));
      }
      
        if (draft.seoTitle || initialData.seoTitle) setIsSeoTitleCustom(true);
        if (draft.seoDescription || initialData.seoDescription) setIsSeoDescCustom(true);
        if (draft.slugId || initialData.slugId) setIsSlugCustom(true);
        setActivePostId(postId);
      });
    }
  }, [initialData, postId]);

  const [categories, setCategories] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);
  const [showVersionHistoryModal, setShowVersionHistoryModal] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const q = query(collection(db, 'categories'));
        const snap = await getDocs(q);
        setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadVersionHistory() {
      if (!postId) return;
      try {
        const q = query(collection(db, 'blog_versions'));
        const snap = await getDocs(q);
        const versions = snap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(v => v.blogId === postId)
          .sort((a, b) => b.publishedAt?.toMillis() - a.publishedAt?.toMillis());
        setVersionHistory(versions);
      } catch (err) {
        console.error("Failed to load version history", err);
      }
    }
    loadVersionHistory();
  }, [postId]);

  // Live timer updates for "Saved X seconds ago"
  useEffect(() => {
    if (!lastSavedAt) return;
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - lastSavedAt.getTime()) / 1000);
      if (seconds < 5) {
        setTimeAgoLabel('just now');
      } else if (seconds < 60) {
        setTimeAgoLabel(`${seconds}s ago`);
      } else {
        const mins = Math.floor(seconds / 60);
        setTimeAgoLabel(`${mins}m ago`);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  // Window beforeunload protection if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Field change handler with SEO auto-suggestion
  const handleChange = (field, value) => {
    setIsDirty(true);
    setAutosaveStatus('dirty');

    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      // SEO Auto-suggestion from title
      if (field === 'title') {
        const cleanTitle = sanitizePlainText(value);
        if (!isSeoTitleCustom) {
          next.seoTitle = cleanTitle;
        }
        if (!isSlugCustom) {
          next.slug = slugify(cleanTitle);
        }
      }

      // SEO Auto-suggestion from excerpt
      if (field === 'excerpt') {
        const cleanDesc = sanitizePlainText(value);
        if (!isSeoDescCustom) {
          next.seoDescription = cleanDesc;
        }
      }

      return next;
    });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setIsDirty(true);
    setAutosaveStatus('dirty');

    // Auto-calculate read time if not manually edited
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const estimatedMinutes = Math.max(1, Math.ceil(words / 200));
    setFormData((prev) => ({
      ...prev,
      readTime: `${estimatedMinutes} min read`
    }));
  };

  // Extract table of contents from content for preview
  const previewHeadings = useMemo(() => {
    if (!content) return [];
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = [];
      doc.querySelectorAll('h2, h3').forEach((heading, idx) => {
        headings.push({
          id: `heading-preview-${idx}`,
          level: parseInt(heading.tagName[1]),
          text: heading.textContent || ''
        });
      });
      return headings;
    } catch {
      return [];
    }
  }, [content]);

  // Core Save Executor (shared by Manual Save, Autosave, and Pre-Publish)
  const executeSave = useCallback(async (targetStatus = 'draft', isBackgroundAutosave = false) => {
    if (!formData.title.trim()) {
      if (!isBackgroundAutosave) alert('Please enter a Post Title before saving.');
      return false;
    }

    const currentSequence = ++saveSequenceRef.current;
    if (isBackgroundAutosave) {
      setAutosaveStatus('saving');
    } else {
      setIsSaving(true);
    }

    try {
      const activeCategory = customCategoryActive
        ? formData.customCategory.trim() || 'General'
        : formData.category;

      const slugId = formData.slug ? slugify(formData.slug) : slugify(formData.title);

      // Validate Canonical URL if provided
      let cleanCanonical = formData.canonicalUrl.trim();
      if (cleanCanonical && !isValidWebUrl(cleanCanonical)) {
        cleanCanonical = '';
      }

      // Validate OG Image URL if provided
      let cleanOgImage = formData.ogImageUrl.trim();
      if (cleanOgImage && !isValidWebUrl(cleanOgImage)) {
        cleanOgImage = '';
      }

      // Compute UTC timestamp if scheduled
      let scheduledUtcTimestamp = null;
      if (targetStatus === 'scheduled' && formData.scheduledDate && formData.scheduledTime) {
        scheduledUtcTimestamp = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`).toISOString();
      }

      let safeImageUrl = formData.imageUrl ? formData.imageUrl.trim() : '';
      if (safeImageUrl.startsWith('data:') && safeImageUrl.length > 500000) {
        safeImageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
      }

      let safeOgImage = cleanOgImage;
      if (safeOgImage.startsWith('data:') && safeOgImage.length > 500000) {
        safeOgImage = '';
      }

      const postPayload = {
        title: sanitizePlainText(formData.title),
        excerpt: sanitizePlainText(formData.excerpt),
        author: sanitizePlainText(formData.author) || 'GyanVaniAi Editorial',
        category: activeCategory,
        categoryId: formData.categoryId || '',
        readTime: formData.readTime || '3 min read',
        imageUrl: safeImageUrl,
        date: formData.date,
        content: content,
        slugId: slugId,
        status: targetStatus,
        updatedAt: serverTimestamp(),
        // P1 SEO Fields
        seoTitle: sanitizePlainText(formData.seoTitle) || sanitizePlainText(formData.title),
        seoDescription: sanitizePlainText(formData.seoDescription) || sanitizePlainText(formData.excerpt),
        canonicalUrl: cleanCanonical,
        ogImageUrl: safeOgImage,
        // P1 Tags
        tags: formData.tags || [],
        tagLabels: formData.tagLabels || [],
        // P1 Scheduling
        scheduledDate: formData.scheduledDate || null,
        scheduledTime: formData.scheduledTime || null,
        scheduledTimezone: formData.scheduledTimezone || 'Asia/Kolkata (IST)',
        scheduledAt: scheduledUtcTimestamp,
        // P5-D CTA Configuration Fields
        ctaType: formData.ctaType || 'book_demo',
        ctaTitle: sanitizePlainText(formData.ctaTitle || ''),
        ctaDescription: sanitizePlainText(formData.ctaDescription || ''),
        ctaLabel: sanitizePlainText(formData.ctaLabel || ''),
        ctaUrl: formData.ctaUrl ? formData.ctaUrl.trim() : '',
        ctaPosition: formData.ctaPosition || 'end',
      };


      const activeDocId = activePostId || postId;
      const isPublished = initialData?.status === 'published';

      if (activeDocId) {
        const docRef = doc(db, 'blogs', activeDocId);
        if (isPublished && targetStatus === 'draft') {
          // Saving intermediate edits on a published post
          await updateDoc(docRef, { workingDraft: postPayload });
        } else {
          // Normal save
          await updateDoc(docRef, postPayload);
          if (!isBackgroundAutosave) {
            logActivity(activeDocId, 'UPDATED', { title: postPayload.title });
          }
        }
      } else {
        postPayload.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'blogs'), postPayload);
        setActivePostId(docRef.id);
        logActivity(docRef.id, 'CREATED', { title: postPayload.title });
        // Seamlessly update browser URL without reload
        navigate(`/admin/edit/${docRef.id}`, { replace: true });
      }

      // Race condition check: Only apply if this is still the newest request
      if (currentSequence === saveSequenceRef.current) {
        setIsDirty(false);
        setAutosaveStatus('saved');
        setLastSavedAt(new Date());
        setTimeAgoLabel('just now');
        setFormData((prev) => ({ ...prev, status: targetStatus }));

        if (!isBackgroundAutosave) {
          showToast(targetStatus === 'scheduled' ? 'Post scheduled successfully!' : 'Draft saved successfully!');
        }
      }
      return true;
    } catch (err) {
      console.error('Error executing save:', err);
      if (currentSequence === saveSequenceRef.current) {
        setAutosaveStatus('error');
        if (!isBackgroundAutosave) {
          alert('Failed to save: ' + (err.message || 'Unknown error'));
        }
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [activePostId, content, customCategoryActive, formData, initialData?.status, navigate, postId]);

  // Debounced Autosave Effect (Triggers 1.5s after user stops typing)
  useEffect(() => {
    if (!isDirty || !formData.title.trim()) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      // Autosave preserves the current document status (draft or scheduled)
      const targetStatus = formData.status === 'scheduled' ? 'scheduled' : 'draft';
      executeSave(targetStatus, true);
    }, 1500);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [formData, content, isDirty, executeSave]);

  // Manual Save Draft Trigger
  const handleSaveDraft = async () => {
    if (isSaving || isPublishing) return;
    try {
      await executeSave('draft', false);
    } catch (e) {
      console.error('Error saving draft:', e);
    }
  };

  // Submit for Review Handler (P4-D)
  const handleSubmitForReview = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title before submitting for review.');
      return;
    }
    const user = auth.currentUser;
    const userInfo = {
      uid: user?.uid || 'admin',
      email: user?.email || 'admin@gyanvaniai.online',
      name: user?.displayName || user?.email || 'Editorial Staff'
    };

    await executeSave(formData.status === 'published' ? 'published' : 'draft', false);

    const reviewPayload = {
      reviewStatus: 'in_review',
      submittedAt: new Date().toISOString(),
      submittedBy: userInfo
    };

    setFormData(prev => ({ ...prev, ...reviewPayload }));
    const activeDocId = activePostId || postId;
    if (activeDocId) {
      await updateDoc(doc(db, 'blogs', activeDocId), reviewPayload);
      logActivity(activeDocId, 'review_submitted', { author: userInfo.name });
    }
    showToast('Article submitted for editorial review!');
  };

  // Update Review Status Handler (P4-D)
  const handleUpdateReviewStatus = async (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    const activeDocId = activePostId || postId;
    if (activeDocId) {
      await updateDoc(doc(db, 'blogs', activeDocId), updates);
    }
  };

  // Publish / Schedule Click Handler
  const handlePublishClick = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a Post Title before publishing.');
      return;
    }

    // If scheduling is selected, validate future date/time and open modal
    if (formData.publishingMode === 'schedule') {
      if (!formData.scheduledDate || !formData.scheduledTime) {
        alert('Please choose both a publication date and time.');
        return;
      }
      const scheduledUtc = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`);
      if (scheduledUtc.getTime() <= new Date().getTime()) {
        alert('Choose a future publication time. Scheduled time cannot be in the past.');
        return;
      }
      setShowPublishModal(true);
      return;
    }

    // Directly publish when Publish Now is selected
    await handleConfirmPublishOrSchedule();
  };

  // Confirm Publish / Schedule in Modal
  const handleConfirmPublishOrSchedule = async () => {
    if (isPublishing || isSaving) return;
    if (!formData.title.trim()) {
      alert('Please enter a Post Title.');
      return;
    }

    setIsPublishing(true);

    try {
      const isScheduling = formData.publishingMode === 'schedule';
      const targetStatus = isScheduling ? 'scheduled' : 'published';

      const activeCategory = customCategoryActive
        ? formData.customCategory.trim() || 'General'
        : formData.category;

      const slugId = formData.slug ? slugify(formData.slug) : slugify(formData.title);

      let cleanCanonical = formData.canonicalUrl.trim();
      if (cleanCanonical && !isValidWebUrl(cleanCanonical)) cleanCanonical = '';

      let cleanOgImage = formData.ogImageUrl.trim();
      if (cleanOgImage && !isValidWebUrl(cleanOgImage)) cleanOgImage = '';

      let scheduledUtcTimestamp = null;
      if (isScheduling && formData.scheduledDate && formData.scheduledTime) {
        scheduledUtcTimestamp = new Date(`${formData.scheduledDate}T${formData.scheduledTime}:00`).toISOString();
      }

      const postPayload = {
        title: sanitizePlainText(formData.title),
        excerpt: sanitizePlainText(formData.excerpt),
        author: sanitizePlainText(formData.author) || 'GyanVaniAi Editorial',
        category: activeCategory,
        readTime: formData.readTime || '3 min read',
        imageUrl: formData.imageUrl.trim(),
        date: formData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: content,
        slugId: slugId,
        status: targetStatus,
        updatedAt: serverTimestamp(),
        seoTitle: sanitizePlainText(formData.seoTitle) || sanitizePlainText(formData.title),
        seoDescription: sanitizePlainText(formData.seoDescription) || sanitizePlainText(formData.excerpt),
        canonicalUrl: cleanCanonical,
        ogImageUrl: cleanOgImage,
        tags: formData.tags || [],
        tagLabels: formData.tagLabels || [],
        scheduledDate: formData.scheduledDate || null,
        scheduledTime: formData.scheduledTime || null,
        scheduledTimezone: formData.scheduledTimezone || 'Asia/Kolkata (IST)',
        scheduledAt: scheduledUtcTimestamp,
      };

      if (!isScheduling) {
        postPayload.publishedAt = serverTimestamp();
      }

      const activeDocId = activePostId || postId;

      if (activeDocId) {
        // Save previous version if it was already published
        if (initialData?.status === 'published' && !isScheduling) {
          const versionPayload = {
            blogId: activeDocId,
            title: initialData.title,
            content: initialData.content,
            publishedAt: initialData.publishedAt || initialData.updatedAt || serverTimestamp(),
            archivedAt: serverTimestamp(),
            authorId: auth.currentUser?.uid,
            authorName: auth.currentUser?.displayName || 'Admin'
          };
          await addDoc(collection(db, 'blog_versions'), versionPayload);
        }

        const docRef = doc(db, 'blogs', activeDocId);
        await updateDoc(docRef, { ...postPayload, workingDraft: null });
        logActivity(activeDocId, isScheduling ? 'SCHEDULED' : 'PUBLISHED', { title: postPayload.title, slugId });
      } else {
        postPayload.createdAt = serverTimestamp();
        const newDocRef = await addDoc(collection(db, 'blogs'), postPayload);
        logActivity(newDocRef.id, isScheduling ? 'SCHEDULED' : 'PUBLISHED', { title: postPayload.title, slugId });
      }

      // Ping IndexNow if published immediately
      if (!isScheduling) {
        try {
          await pingBlogIndexNow(`https://www.gyanvaniai.online/blog/${slugId}`);
        } catch (e) {
          console.warn('IndexNow ping notice (non-fatal):', e);
        }
      }

      setShowPublishModal(false);
      setIsDirty(false);
      setFormData((prev) => ({ ...prev, status: targetStatus }));

      showToast(isScheduling ? 'Post scheduled successfully!' : 'Post published to the live site!');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error in publish/schedule:', err);
      alert('Action failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsPublishing(false);
    }
  };

  // Safe navigation back to dashboard with unsaved changes prompt
  const handleBackToDashboard = () => {
    if (isDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/admin/dashboard');
  };

  // SEO status calculations
  const seoTitleLen = formData.seoTitle.length;
  const seoTitleStatus = getSeoTitleStatus(seoTitleLen);
  const seoDescLen = formData.seoDescription.length;
  const seoDescStatus = getSeoDescriptionStatus(seoDescLen);

  // Check if changing slug on existing published blog
  const isSlugChangedOnPublished = isEditing && initialData.status === 'published' && formData.slug !== initialData.slugId;

  return (
    <div className="admin-cms-page">
      <AdminHeader />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-cms-toast ${toastMessage.type}`}>
          <CheckCircle2 size={16} />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Editor Sub-Header Action Bar */}
      <div className="admin-cms-subbar">
        <div className="admin-cms-subbar-left">
          <button
            type="button"
            className="admin-cms-back-btn"
            onClick={handleBackToDashboard}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>

          <div className="admin-cms-divider-v" />

          <div className="admin-cms-status-indicator">
            <span className={`admin-cms-badge ${formData.status}`}>
              {formData.status === 'published'
                ? (isDirty ? '● Published (Editing Working Draft)' : '● Published')
                : formData.status === 'scheduled'
                ? '◷ Scheduled'
                : '○ Draft'}
            </span>

            {/* P1 Autosave Indicator */}
            {autosaveStatus === 'saving' && (
              <span className="autosave-pill saving">
                <Loader2 size={12} className="spinner-icon" />
                <span>Saving...</span>
              </span>
            )}
            {autosaveStatus === 'saved' && (
              <span className="autosave-pill saved" title="All changes saved to cloud">
                <CheckCircle2 size={12} />
                <span>Saved {timeAgoLabel}</span>
              </span>
            )}
            {autosaveStatus === 'dirty' && (
              <span className="autosave-pill dirty" title="Unsaved edits pending">
                <span>● Unsaved changes</span>
              </span>
            )}
            {autosaveStatus === 'error' && (
              <span className="autosave-pill error">
                <AlertTriangle size={12} />
                <span>Couldn&apos;t save changes.</span>
                <button
                  type="button"
                  className="autosave-retry-btn"
                  onClick={() => executeSave('draft', false)}
                >
                  Retry
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="admin-cms-subbar-right">
          <button
            type="button"
            className="admin-cms-btn-secondary"
            onClick={() => setIsBriefModalOpen(true)}
            title="Generate AI SEO Content Brief"
          >
            <FileText size={15} />
            <span>Content Brief</span>
          </button>

          {versionHistory.length > 0 && (
            <button
              type="button"
              className="admin-cms-btn-secondary"
              onClick={() => setShowVersionHistoryModal(true)}
              title="View past versions"
            >
              <Clock size={15} />
              <span>History ({versionHistory.length})</span>
            </button>
          )}

          <button
            type="button"
            className={`admin-cms-btn-secondary ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? (
              <>
                <EyeOff size={15} />
                <span>Back to Editor</span>
              </>
            ) : (
              <>
                <Eye size={15} />
                <span>Preview</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="admin-cms-btn-secondary"
            onClick={handleSaveDraft}
            disabled={isSaving || isPublishing}
          >
            {isSaving ? (
              <>
                <Loader2 size={15} className="spinner-icon" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Save Draft</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="admin-cms-btn-primary"
            onClick={handlePublishClick}
            disabled={isSaving || isPublishing}
          >
            {isPublishing ? (
              <>
                <Loader2 size={15} className="spinner-icon" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>
                  {formData.publishingMode === 'schedule'
                    ? 'Schedule Post'
                    : formData.status === 'published'
                    ? 'Update Post'
                    : 'Publish'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MAIN BODY: Either Preview Mode or Two-Column Editor */}
      {isPreview ? (
        /* ================= IN-EDITOR PREVIEW MODE ================= */
        <div className="admin-preview-container">
          <div className="admin-preview-banner">
            <div className="admin-preview-banner-text">
              <Eye size={16} />
              <span>
                <strong>Article Preview Mode</strong> — Visual fidelity replica of public blog rendering.
              </span>
            </div>
            <div className="admin-preview-banner-actions">
              <button
                type="button"
                className="admin-cms-btn-secondary small"
                onClick={() => setIsPreview(false)}
              >
                Exit Preview
              </button>
              <button
                type="button"
                className="admin-cms-btn-primary small"
                onClick={() => {
                  setIsPreview(false);
                  handlePublishClick();
                }}
              >
                {formData.publishingMode === 'schedule' ? 'Schedule Now' : 'Publish Now'}
              </button>
            </div>
          </div>

          <article className="blog-editorial-article blog-post-preview-wrapper" style={{ paddingTop: '2.5rem', background: '#ffffff' }}>
            <div className="blog-editorial-container" style={{ maxWidth: '900px', marginInline: 'auto' }}>
              <header className="blog-editorial-header" style={{ paddingTop: 0 }}>
                {formData.category && (
                  <div className="blog-category-wrap">
                    <span className="blog-category-badge">
                      {customCategoryActive ? formData.customCategory : formData.category}
                    </span>
                  </div>
                )}
                <h1 className="blog-article-h1">
                  {formData.title || 'Untitled Post'}
                </h1>

                {formData.excerpt && (
                  <p className="blog-article-excerpt">
                    {formData.excerpt}
                  </p>
                )}

                <div className="blog-editorial-meta">
                  <div className="meta-item">
                    <User size={15} className="meta-icon" />
                    <span>{formData.author || 'GyanVaniAi Editorial'}</span>
                  </div>
                  <span className="meta-dot">•</span>
                  <div className="meta-item">
                    <Calendar size={15} className="meta-icon" />
                    <span>{formData.date}</span>
                  </div>
                  <span className="meta-dot">•</span>
                  <div className="meta-item">
                    <Clock size={15} className="meta-icon" />
                    <span>{formData.readTime || '3 min read'}</span>
                  </div>
                </div>
              </header>

              {formData.imageUrl && (
                <div className="blog-hero-image-wrap" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
                  <div className="blog-hero-image-frame">
                    <img
                      src={formData.imageUrl}
                      alt={formData.title}
                      className="blog-hero-image"
                    />
                  </div>
                </div>
              )}

              {/* Table of Contents in Preview */}
              {previewHeadings.length > 0 && (
                <div className="blog-sticky-toc-box" style={{ margin: '2rem 0' }}>
                  <div className="toc-sidebar-header">
                    <Layers size={15} className="toc-icon" />
                    <span>ON THIS PAGE ({previewHeadings.length} SECTIONS)</span>
                  </div>
                  <ul className="toc-sidebar-list">
                    {previewHeadings.map((h, i) => (
                      <li
                        key={i}
                        className={`toc-sidebar-item level-${h.level}`}
                        style={{ paddingLeft: h.level === 3 ? '0.85rem' : '0' }}
                      >
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Body HTML Sanitized */}
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(content || '<p><em>No content written yet.</em></p>') }}
              />

              {/* Public Tags Display in Preview */}
              {formData.tags && formData.tags.length > 0 && (
                <div className="blog-tags-footer">
                  <span className="tags-label">Tags:</span>
                  <div className="tags-list">
                    {formData.tags.map((tSlug, idx) => (
                      <span key={tSlug} className="blog-tag-pill">
                        #{formData.tagLabels[idx] || tSlug}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      ) : (
        /* ================= TWO-COLUMN CMS EDITOR ================= */
        <div className="admin-cms-editor-grid">
          {/* LEFT: Main Content Workspace */}
          <main className="admin-cms-main-column">
            <div className="admin-cms-card">
              {/* Title input */}
              <div className="admin-field-group">
                <input
                  type="text"
                  placeholder="Post title..."
                  className="admin-cms-title-input"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  autoFocus={!isEditing}
                />
              </div>

              {/* Excerpt input */}
              <div className="admin-field-group">
                <textarea
                  placeholder="Short excerpt or meta summary (shown on blog listing and search results)..."
                  className="admin-cms-excerpt-input"
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  rows={2}
                />
              </div>

              {/* Rich Text Editor */}
              <div className="admin-field-group" style={{ marginTop: '1.25rem' }}>
                <RichTextEditor
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Tell your story... Write paragraphs, add headers, format quotes, or insert screenshots."
                />
              </div>
            </div>
          </main>

          {/* RIGHT: Publishing & Settings Sidebar with Collapsible Panels */}
          <aside className="admin-cms-sidebar">
            {/* 1. Publishing & Scheduling Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('publishing')}
              >
                <div className="panel-header-title-wrap">
                  <Send size={15} />
                  <h3>Publishing</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.publishing ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.publishing && (
                <div className="admin-panel-body">
                  {/* Mode Selector */}
                  <div className="publishing-options-segmented">
                    <label className={`publishing-radio-item ${formData.publishingMode === 'draft' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="publishingMode"
                        value="draft"
                        checked={formData.publishingMode === 'draft'}
                        onChange={(e) => handleChange('publishingMode', e.target.value)}
                      />
                      <div>
                        <span className="publishing-radio-title">● Save as Draft</span>
                        <span className="publishing-radio-desc">Visible only to admins</span>
                      </div>
                    </label>

                    <label className={`publishing-radio-item ${formData.publishingMode === 'publish' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="publishingMode"
                        value="publish"
                        checked={formData.publishingMode === 'publish'}
                        onChange={(e) => handleChange('publishingMode', e.target.value)}
                      />
                      <div>
                        <span className="publishing-radio-title">● Publish Now</span>
                        <span className="publishing-radio-desc">Immediately live on website</span>
                      </div>
                    </label>

                    <label className={`publishing-radio-item ${formData.publishingMode === 'schedule' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="publishingMode"
                        value="schedule"
                        checked={formData.publishingMode === 'schedule'}
                        onChange={(e) => handleChange('publishingMode', e.target.value)}
                      />
                      <div>
                        <span className="publishing-radio-title">◷ Schedule</span>
                        <span className="publishing-radio-desc">Publish automatically at a future time</span>
                      </div>
                    </label>
                  </div>

                  {/* Scheduled Inputs Box */}
                  {formData.publishingMode === 'schedule' && (
                    <div className="schedule-controls-box">
                      <div className="schedule-grid-2col">
                        <div>
                          <label className="admin-panel-label">Publish Date</label>
                          <input
                            type="date"
                            className="admin-panel-input"
                            value={formData.scheduledDate}
                            onChange={(e) => handleChange('scheduledDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="admin-panel-label">Time</label>
                          <input
                            type="time"
                            className="admin-panel-input"
                            value={formData.scheduledTime}
                            onChange={(e) => handleChange('scheduledTime', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="schedule-timezone-note">
                        <Clock size={12} />
                        <span>Timezone: <strong>{formData.scheduledTimezone}</strong></span>
                      </div>
                    </div>
                  )}

                  <div className="admin-sidebar-actions">
                    <button
                      type="button"
                      className="admin-cms-btn-secondary full-width"
                      onClick={handleSaveDraft}
                      disabled={isSaving || isPublishing}
                    >
                      {isSaving ? <Loader2 size={14} className="spinner-icon" /> : <Save size={14} />}
                      <span>Save Draft</span>
                    </button>

                    <button
                      type="button"
                      className="admin-cms-btn-primary full-width"
                      onClick={handlePublishClick}
                      disabled={isSaving || isPublishing}
                    >
                      <Send size={14} />
                      <span>
                        {formData.publishingMode === 'schedule'
                          ? 'Schedule Post'
                          : formData.status === 'published'
                          ? 'Update Live Post'
                          : 'Publish Post'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Editorial Review Workflow Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('editorialReview')}
              >
                <div className="panel-header-title-wrap">
                  <ShieldCheck size={15} style={{ color: '#0d9488' }} />
                  <h3>Editorial Review Workflow</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.editorialReview ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.editorialReview && (
                <div className="admin-panel-body">
                  <EditorialReviewPanel
                    reviewData={{
                      blogId: postId,
                      reviewStatus: formData.reviewStatus,
                      submittedAt: formData.submittedAt,
                      submittedBy: formData.submittedBy,
                      reviewedAt: formData.reviewedAt,
                      reviewedBy: formData.reviewedBy,
                      approvedVersionId: formData.approvedVersionId,
                      changesRequestedReason: formData.changesRequestedReason
                    }}
                    isDirty={isDirty}
                    currentVersionId={versionHistory[0]?.id || 'v1'}
                    onSubmitForReview={handleSubmitForReview}
                    onUpdateReviewStatus={handleUpdateReviewStatus}
                  />
                </div>
              )}
            </div>

            {/* 2. AI Content Assistant Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('aiAssistant')}
              >
                <div className="panel-header-title-wrap">
                  <Sparkles size={15} style={{ color: '#0d9488' }} />
                  <h3>AI Content Assistant</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.aiAssistant ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.aiAssistant && (
                <div className="admin-panel-body">
                  <AiContentAssistant
                    articleContext={{
                      title: formData.title,
                      category: customCategoryActive ? formData.customCategory : formData.category,
                      excerpt: formData.excerpt,
                      content: content,
                    }}
                    selectedText={selectedText}
                    onInsertSuggestion={handleInsertAiSuggestion}
                    onReplaceSelection={handleReplaceSelection}
                    onApplySeoTitle={handleApplySeoTitle}
                    onApplyMetaDesc={handleApplyMetaDesc}
                  />
                </div>
              )}
            </div>

            {/* Internal Link Recommendations Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('internalLinks')}
              >
                <div className="panel-header-title-wrap">
                  <LinkIcon size={15} style={{ color: '#0d9488' }} />
                  <h3>Internal Link Recommendations</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.internalLinks ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.internalLinks && (
                <div className="admin-panel-body">
                  <InternalLinkPanel
                    currentBlogId={postId}
                    category={customCategoryActive ? formData.customCategory : formData.category}
                    tags={formData.tags}
                    content={content}
                    onInsertLinkToDraft={(cleanHtmlLink) => handleInsertAiSuggestion(cleanHtmlLink, 'append')}
                  />
                </div>
              )}
            </div>

            {/* Editorial Notes & Comments Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('comments')}
              >
                <div className="panel-header-title-wrap">
                  <MessageSquare size={15} style={{ color: '#0d9488' }} />
                  <h3>Editorial Notes & Comments</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.comments ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.comments && (
                <div className="admin-panel-body">
                  <EditorialComments
                    blogId={postId}
                    versionId={versionHistory[0]?.id || null}
                  />
                </div>
              )}
            </div>

            {/* AI Audit Activity Log (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('aiHistory')}
              >
                <div className="panel-header-title-wrap">
                  <Sparkles size={15} style={{ color: '#0d9488' }} />
                  <h3>AI Audit Activity Log</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.aiHistory ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.aiHistory && (
                <div className="admin-panel-body">
                  <AiHistoryPanel blogId={postId} />
                </div>
              )}
            </div>

            {/* 2. Featured Cover Image (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('featuredImage')}
              >
                <div className="panel-header-title-wrap">
                  <Share2 size={15} />
                  <h3>Featured Image</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.featuredImage ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.featuredImage && (
                <div className="admin-panel-body">
                  <FeaturedImageUpload
                    value={formData.imageUrl}
                    onChange={(url) => handleChange('imageUrl', url)}
                  />
                </div>
              )}
            </div>

            {/* 3. Tags Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('tags')}
              >
                <div className="panel-header-title-wrap">
                  <TagIcon size={15} />
                  <h3>Tags ({formData.tags?.length || 0})</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.tags ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.tags && (
                <div className="admin-panel-body">
                  <TagsInput
                    tags={formData.tags}
                    tagLabels={formData.tagLabels}
                    onChange={(nextTags, nextLabels) => {
                      handleChange('tags', nextTags);
                      handleChange('tagLabels', nextLabels);
                    }}
                  />
                </div>
              )}
            </div>

            {/* P5-D CTA Configuration Panel (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('cta')}
              >
                <div className="panel-header-title-wrap">
                  <Sparkles size={15} style={{ color: 'var(--primary-color)' }} />
                  <h3>Conversion CTA Settings</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.cta ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.cta && (
                <div className="admin-panel-body">
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">CTA Type</label>
                    <select
                      className="admin-panel-input"
                      value={formData.ctaType}
                      onChange={(e) => handleChange('ctaType', e.target.value)}
                    >
                      <option value="book_demo">Book Demo</option>
                      <option value="contact_us">Contact Us</option>
                      <option value="get_started">Get Started</option>
                      <option value="request_consultation">Request Consultation</option>
                      <option value="newsletter">Newsletter Signup</option>
                      <option value="download">Download Guide</option>
                      <option value="learn_more">Learn More</option>
                    </select>
                  </div>

                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Custom CTA Headline (Optional)</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      placeholder="Custom headline override..."
                      value={formData.ctaTitle}
                      onChange={(e) => handleChange('ctaTitle', e.target.value)}
                    />
                  </div>

                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Custom Button Label (Optional)</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      placeholder="e.g. Schedule Free Demo"
                      value={formData.ctaLabel}
                      onChange={(e) => handleChange('ctaLabel', e.target.value)}
                    />
                  </div>

                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Custom Target URL (Optional)</label>
                    <input
                      type="url"
                      className="admin-panel-input"
                      placeholder="https://... or /services/..."
                      value={formData.ctaUrl}
                      onChange={(e) => handleChange('ctaUrl', e.target.value)}
                    />
                  </div>

                  <div className="admin-panel-field">
                    <label className="admin-panel-label">CTA Placement</label>
                    <select
                      className="admin-panel-input"
                      value={formData.ctaPosition}
                      onChange={(e) => handleChange('ctaPosition', e.target.value)}
                    >
                      <option value="end">End of Article</option>
                      <option value="middle">Middle of Article</option>
                      <option value="after_intro">After Introduction</option>
                    </select>
                  </div>
                </div>
              )}
            </div>


            {/* 4. SEO Settings & Search Previews (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('seo')}
              >
                <div className="panel-header-title-wrap">
                  <Search size={15} />
                  <h3>SEO Settings</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.seo ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.seo && (
                <div className="admin-panel-body">
                  {/* SEO Title */}
                  <div className="admin-panel-field">
                    <div className="seo-label-row">
                      <label className="admin-panel-label" style={{ margin: 0 }}>SEO Title</label>
                      <span className="seo-char-counter" style={{ color: seoTitleStatus.color }}>
                        {seoTitleLen}/60 • {seoTitleStatus.label}
                      </span>
                    </div>
                    <input
                      type="text"
                      className="admin-panel-input"
                      placeholder="Title tag for search engines..."
                      value={formData.seoTitle}
                      onChange={(e) => {
                        setIsSeoTitleCustom(true);
                        handleChange('seoTitle', e.target.value);
                      }}
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="admin-panel-field">
                    <div className="seo-label-row">
                      <label className="admin-panel-label" style={{ margin: 0 }}>Meta Description</label>
                      <span className="seo-char-counter" style={{ color: seoDescStatus.color }}>
                        {seoDescLen}/160 • {seoDescStatus.label}
                      </span>
                    </div>
                    <textarea
                      className="admin-panel-input"
                      rows={3}
                      placeholder="Search snippet description..."
                      value={formData.seoDescription}
                      onChange={(e) => {
                        setIsSeoDescCustom(true);
                        handleChange('seoDescription', e.target.value);
                      }}
                    />
                  </div>

                  {/* URL Slug */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">URL Slug</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      placeholder="e.g. how-ai-agents-transform-sales"
                      value={formData.slug}
                      onChange={(e) => {
                        setIsSlugCustom(true);
                        handleChange('slug', slugify(e.target.value));
                      }}
                    />
                    {isSlugChangedOnPublished && (
                      <div className="seo-slug-warning">
                        <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Changing the URL may break existing external links and bookmarks.</span>
                      </div>
                    )}
                  </div>

                  {/* Canonical URL */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Canonical URL (Optional)</label>
                    <input
                      type="url"
                      className="admin-panel-input"
                      placeholder="https://..."
                      value={formData.canonicalUrl}
                      onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                    />
                  </div>

                  {/* Social / OG Image URL Override */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Social / OG Image URL (Optional)</label>
                    <input
                      type="url"
                      className="admin-panel-input"
                      placeholder="Defaults to cover image..."
                      value={formData.ogImageUrl}
                      onChange={(e) => handleChange('ogImageUrl', e.target.value)}
                    />
                  </div>

                  {/* Live Google Preview */}
                  <GoogleSearchPreview
                    title={formData.seoTitle || formData.title}
                    description={formData.seoDescription || formData.excerpt}
                    slug={formData.slug || slugify(formData.title)}
                  />

                  {/* Live Social Share Preview */}
                  <SocialSharePreview
                    title={formData.seoTitle || formData.title}
                    description={formData.seoDescription || formData.excerpt}
                    imageUrl={formData.ogImageUrl || formData.imageUrl}
                  />

                  {/* AI SEO & Intelligence Audit Panel */}
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
                    <AiSeoPanel
                      formData={formData}
                      content={content}
                      onApplySeoTitle={handleApplySeoTitle}
                      onApplyMetaDesc={handleApplyMetaDesc}
                      onApplySlug={(slug) => {
                        setIsSlugCustom(true);
                        handleChange('slug', slugify(slug));
                      }}
                      onInsertContent={(newHtml) => handleInsertAiSuggestion(newHtml, 'append')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 5. Post Organization & Settings (Collapsible) */}
            <div className="admin-cms-panel-card">
              <div
                className="admin-panel-header collapsible"
                onClick={() => toggleSection('settings')}
              >
                <div className="panel-header-title-wrap">
                  <Sliders size={15} />
                  <h3>Post Settings</h3>
                </div>
                <div className="panel-collapse-icon">
                  {openSections.settings ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>

              {openSections.settings && (
                <div className="admin-panel-body">
                  {/* Category Selection */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Category</label>
                    {!customCategoryActive ? (
                      <select
                        className="admin-panel-select"
                        value={formData.categoryId || formData.category}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setCustomCategoryActive(true);
                          } else {
                            const selectedCat = categories.find(c => c.id === e.target.value);
                            setFormData(prev => ({
                              ...prev,
                              categoryId: selectedCat?.id || '',
                              category: selectedCat?.name || e.target.value
                            }));
                          }
                        }}
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="__custom__">+ Custom Category...</option>
                      </select>
                    ) : (
                      <div className="admin-custom-cat-row">
                        <input
                          type="text"
                          placeholder="Enter category name"
                          className="admin-panel-input"
                          value={formData.customCategory}
                          onChange={(e) => handleChange('customCategory', e.target.value)}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="admin-btn-cat-revert"
                          onClick={() => {
                            setCustomCategoryActive(false);
                            handleChange('customCategory', '');
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Author Selection */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Author Name</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      value={formData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      placeholder="e.g. GyanVaniAi Editorial"
                    />
                  </div>

                  {/* Read Time */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Read Time</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      value={formData.readTime}
                      onChange={(e) => handleChange('readTime', e.target.value)}
                      placeholder="e.g. 5 min read"
                    />
                  </div>

                  {/* Published Date */}
                  <div className="admin-panel-field">
                    <label className="admin-panel-label">Display Date</label>
                    <input
                      type="text"
                      className="admin-panel-input"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ================= PUBLISH / SCHEDULE CONFIRMATION MODAL ================= */}
      {showPublishModal && (
        <div className="admin-modal-overlay" onClick={() => setShowPublishModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-badge">
                <Send size={20} />
              </div>
              <div>
                <h3>
                  {formData.publishingMode === 'schedule'
                    ? 'Schedule Publication?'
                    : formData.status === 'published'
                    ? 'Update Published Post?'
                    : 'Ready to Publish?'}
                </h3>
                <p className="admin-modal-subtitle">
                  {formData.publishingMode === 'schedule'
                    ? `This article will be automatically published on ${formData.scheduledDate} at ${formData.scheduledTime} (${formData.scheduledTimezone}).`
                    : formData.status === 'published'
                    ? 'Your updates will immediately be reflected on the live website.'
                    : 'This article will immediately go live on the public blog feed.'}
                </p>
              </div>
            </div>

            <div className="admin-modal-summary-box">
              <div className="admin-summary-item">
                <span className="summary-label">Title:</span>
                <span className="summary-value"><strong>{formData.title || 'Untitled'}</strong></span>
              </div>
              <div className="admin-summary-item">
                <span className="summary-label">Slug:</span>
                <span className="summary-value">/{formData.slug || slugify(formData.title)}</span>
              </div>
              <div className="admin-summary-item">
                <span className="summary-label">Category:</span>
                <span className="summary-value">
                  {customCategoryActive ? formData.customCategory || 'General' : formData.category}
                </span>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="admin-summary-item">
                  <span className="summary-label">Tags:</span>
                  <span className="summary-value">{formData.tags.join(', ')}</span>
                </div>
              )}
              {formData.publishingMode === 'schedule' && (
                <div className="admin-summary-item">
                  <span className="summary-label">Scheduled Time:</span>
                  <span className="summary-value" style={{ color: '#7e22ce', fontWeight: 600 }}>
                    {formData.scheduledDate} · {formData.scheduledTime} ({formData.scheduledTimezone})
                  </span>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-cms-btn-secondary"
                onClick={() => setShowPublishModal(false)}
                disabled={isPublishing}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-cms-btn-primary"
                onClick={handleConfirmPublishOrSchedule}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <Loader2 size={15} className="spinner-icon" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    <span>
                      {formData.publishingMode === 'schedule'
                        ? 'Confirm & Schedule'
                        : formData.status === 'published'
                        ? 'Confirm & Update'
                        : 'Confirm & Publish'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ================= VERSION HISTORY MODAL ================= */}
      {showVersionHistoryModal && (
        <div className="admin-modal-overlay" onClick={() => setShowVersionHistoryModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="admin-modal-icon-badge">
                  <Clock size={20} />
                </div>
                <h3>Version History</h3>
              </div>
              <button onClick={() => setShowVersionHistoryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-summary-box" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {versionHistory.length === 0 ? (
                <p>No version history available.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {versionHistory.map((version) => (
                    <div key={version.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{version.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Published on {version.publishedAt?.toDate().toLocaleString()}
                        </div>
                      </div>
                      <button
                        className="admin-cms-btn-secondary small"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to restore this version? Your current unsaved changes will be lost.')) {
                            setFormData(prev => ({ ...prev, title: version.title }));
                            setContent(version.content);
                            setIsDirty(true);
                            setShowVersionHistoryModal(false);
                            showToast('Version restored in editor. Review and Publish to apply.');
                          }
                        }}
                      >
                        <RotateCcw size={14} /> <span>Restore</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Brief Modal */}
      <ContentBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        onUseBriefInEditor={handleUseBriefInEditor}
        defaultCategory={customCategoryActive ? formData.customCategory : formData.category}
      />
    </div>
  );
}
