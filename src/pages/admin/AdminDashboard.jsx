import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, getDocs, deleteDoc, updateDoc, doc, query, orderBy, serverTimestamp, addDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import {
  PenLine,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  FileText,
  AlertTriangle,
  Loader2,
  Layers,
  ChevronDown,
  ChevronUp,
  Send,
  CalendarX,
  CheckCircle2,
  Archive,
  ArchiveRestore,
  Copy,
  Activity,
  RefreshCw,
  X,
  ArrowUpDown
} from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { pingBlogIndexNow } from '../../utils/pingBlogIndexNow';
import { logActivity } from '../../utils/auditLogger';
import ContentIntelligencePanel from '../../components/admin/ContentIntelligencePanel';
import '../../components/admin/AdminCMS.css';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'published' | 'scheduled' | 'draft' | 'archived'
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedReviewStatus, setSelectedReviewStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);

  // P2 Bulk Selection State
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const toggleAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredBlogs.map(b => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Activity Tracker State
  const [activityLogs, setActivityLogs] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const q = query(collection(db, 'blog_activity'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        const logs = snap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 40);
        setActivityLogs(logs);
      } catch (err) {
        console.error('Failed to load activity logs', err);
      }
    }
    if (showActivityModal) {
      fetchActivity();
    }
  }, [showActivityModal]);

  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const blogsList = querySnapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            // Legacy blogs without status default to published
            status: data.status || 'published',
            tags: Array.isArray(data.tags) ? data.tags : [],
            tagLabels: Array.isArray(data.tagLabels) ? data.tagLabels : [],
          };
        });
        setBlogs(blogsList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchBlogs();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Close delete modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showDeleteModal) {
        setShowDeleteModal(false);
        setBlogToDelete(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDeleteModal]);

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'blogs', blogToDelete.id));
      setBlogs((prev) => prev.filter((b) => b.id !== blogToDelete.id));
      showToast(`"${blogToDelete.title}" deleted.`);
      logActivity(blogToDelete.id, 'DELETED', { title: blogToDelete.title });
    } catch (error) {
      console.error('Error deleting blog: ', error);
      alert('Failed to delete blog post.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  // Immediate Publish Action for a Scheduled or Draft post directly from dashboard
  const handlePublishNow = async (blog) => {
    const confirmPub = window.confirm(`Publish "${blog.title}" immediately to the live site?`);
    if (!confirmPub) return;

    try {
      const docRef = doc(db, 'blogs', blog.id);
      await updateDoc(docRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: 'published' } : b))
      );

      showToast(`"${blog.title}" is now published!`);
      logActivity(blog.id, 'PUBLISHED', { title: blog.title });

      // Ping IndexNow
      const slug = blog.slugId || blog.id;
      pingBlogIndexNow(`https://www.gyanvaniai.online/blog/${slug}`).catch(() => {});
    } catch (err) {
      console.error('Error publishing post:', err);
      alert('Failed to publish post: ' + err.message);
    }
  };

  // Cancel Schedule Action (Returns post to Draft without deleting content)
  const handleCancelSchedule = async (blog) => {
    const confirmCancel = window.confirm(`Cancel schedule for "${blog.title}" and return to Drafts?`);
    if (!confirmCancel) return;

    try {
      const docRef = doc(db, 'blogs', blog.id);
      await updateDoc(docRef, {
        status: 'draft',
        scheduledAt: null,
        scheduledDate: null,
        scheduledTime: null,
        updatedAt: serverTimestamp(),
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: 'draft', scheduledAt: null } : b))
      );

      showToast(`Schedule canceled. "${blog.title}" reverted to Draft.`);
    } catch (err) {
      console.error('Error canceling schedule:', err);
      alert('Failed to cancel schedule: ' + err.message);
    }
  };

  // Archive Action (Returns post to Archived)
  const handleArchive = async (blog) => {
    const confirmArchive = window.confirm(`Archive "${blog.title}"? It will no longer be visible publicly.`);
    if (!confirmArchive) return;

    try {
      const docRef = doc(db, 'blogs', blog.id);
      await updateDoc(docRef, {
        status: 'archived',
        archivedAt: serverTimestamp(),
        archivedBy: auth.currentUser.uid,
        scheduledAt: null, // Clear schedule if applicable
        updatedAt: serverTimestamp(),
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: 'archived', scheduledAt: null } : b))
      );

      logActivity(blog.id, 'ARCHIVED', { title: blog.title });
      showToast(`"${blog.title}" has been archived.`);
    } catch (err) {
      console.error('Error archiving post:', err);
      alert('Failed to archive post: ' + err.message);
    }
  };

  // Unarchive Action (Returns post to Draft)
  const handleUnarchive = async (blog) => {
    const confirmUnarchive = window.confirm(`Unarchive "${blog.title}"? It will be moved to Drafts.`);
    if (!confirmUnarchive) return;

    try {
      const docRef = doc(db, 'blogs', blog.id);
      await updateDoc(docRef, {
        status: 'draft',
        archivedAt: null,
        archivedBy: null,
        updatedAt: serverTimestamp(),
      });

      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: 'draft' } : b))
      );

      showToast(`"${blog.title}" has been unarchived to Drafts.`);
    } catch (err) {
      console.error('Error unarchiving post:', err);
      alert('Failed to unarchive post: ' + err.message);
    }
  };

  // Duplicate Action (Creates a new draft clone)
  const handleDuplicate = async (blog) => {
    try {
      const newBlog = {
        ...blog,
        title: `${blog.title} (Copy)`,
        slugId: `${blog.slugId || blog.id}-copy`,
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: null,
        scheduledAt: null,
        scheduledDate: null,
        scheduledTime: null,
        archivedAt: null,
        archivedBy: null
      };
      delete newBlog.id; // Remove original ID

      const docRef = await addDoc(collection(db, 'blogs'), newBlog);
      setBlogs(prev => [{ id: docRef.id, ...newBlog }, ...prev]);
      showToast(`"${blog.title}" duplicated successfully!`);
    } catch (err) {
      console.error('Error duplicating post:', err);
      alert('Failed to duplicate post: ' + err.message);
    }
  };

  // Bulk Archive Action — uses allSettled for partial failure reporting
  const handleBulkArchive = async () => {
    const confirmArchive = window.confirm(`Archive ${selectedIds.length} selected articles?`);
    if (!confirmArchive) return;
    const results = await Promise.allSettled(selectedIds.map(async (id) => {
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        status: 'archived',
        archivedAt: serverTimestamp(),
        archivedBy: auth.currentUser?.uid,
        scheduledAt: null,
        updatedAt: serverTimestamp(),
      });
      return id;
    }));
    const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').length;
    setBlogs(prev => prev.map(b => succeeded.includes(b.id) ? { ...b, status: 'archived', scheduledAt: null } : b));
    setSelectedIds([]);
    if (failed > 0) {
      showToast(`${succeeded.length} archived, ${failed} failed.`, 'error');
    } else {
      showToast(`${succeeded.length} articles archived.`);
    }
  };

  // Bulk Delete Action — uses allSettled for partial failure reporting
  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm(`PERMANENTLY delete ${selectedIds.length} selected articles? This cannot be undone.`);
    if (!confirmDelete) return;
    const results = await Promise.allSettled(selectedIds.map(async (id) => {
      await deleteDoc(doc(db, 'blogs', id));
      return id;
    }));
    const succeeded = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').length;
    setBlogs(prev => prev.filter(b => !succeeded.includes(b.id)));
    setSelectedIds([]);
    if (failed > 0) {
      showToast(`${succeeded.length} deleted, ${failed} failed.`, 'error');
    } else {
      showToast(`${succeeded.length} articles deleted.`);
    }
  };

  // Extract all unique tags across the blog collection for the tag filter dropdown
  const allAvailableTags = useMemo(() => {
    const map = new Map();
    blogs.forEach((b) => {
      if (Array.isArray(b.tags)) {
        b.tags.forEach((slug, idx) => {
          const label = b.tagLabels?.[idx] || slug;
          if (!map.has(slug)) map.set(slug, label);
        });
      }
    });
    return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }));
  }, [blogs]);

  // Tab counts
  const publishedCount = useMemo(
    () => blogs.filter((b) => b.status === 'published').length,
    [blogs]
  );
  const scheduledCount = useMemo(
    () => blogs.filter((b) => b.status === 'scheduled').length,
    [blogs]
  );
  const draftCount = useMemo(
    () => blogs.filter((b) => b.status === 'draft').length,
    [blogs]
  );
  const archivedCount = useMemo(
    () => blogs.filter((b) => b.status === 'archived').length,
    [blogs]
  );

  // All unique categories for the filter dropdown
  const allAvailableCategories = useMemo(() => {
    const cats = new Set();
    blogs.forEach(b => { if (b.category) cats.add(b.category); });
    return Array.from(cats).sort();
  }, [blogs]);

  // Toggle sort: same field flips direction, new field defaults to desc
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  // Combined Filtering + Sorting (plain derivation — React Compiler handles memoization)
  let filteredBlogs = blogs.filter((blog) => {
    if (activeTab === 'published' && blog.status !== 'published') return false;
    if (activeTab === 'scheduled' && blog.status !== 'scheduled') return false;
    if (activeTab === 'draft' && blog.status !== 'draft') return false;
    if (activeTab === 'archived' && blog.status !== 'archived') return false;
    if (selectedTag && (!blog.tags || !blog.tags.includes(selectedTag))) return false;
    if (selectedCategory && (blog.category || '') !== selectedCategory) return false;
    if (selectedReviewStatus) {
      const rStatus = blog.reviewStatus || 'none';
      if (selectedReviewStatus === 'stale') {
        const isStale = blog.reviewStatus === 'approved' && (blog.approvedVersionId && blog.currentVersionId && blog.approvedVersionId !== blog.currentVersionId);
        if (!isStale) return false;
      } else if (rStatus !== selectedReviewStatus) {
        return false;
      }
    }
    if (dateFrom) {
      const from = new Date(dateFrom);
      const blogDate = blog.createdAt?.toDate ? blog.createdAt.toDate() : new Date(blog.createdAt);
      if (blogDate < from) return false;
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      const blogDate = blog.createdAt?.toDate ? blog.createdAt.toDate() : new Date(blog.createdAt);
      if (blogDate > to) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (blog.title || '').toLowerCase().includes(q);
      const matchCategory = (blog.category || '').toLowerCase().includes(q);
      const matchAuthor = (blog.author || '').toLowerCase().includes(q);
      const matchTag = (blog.tagLabels || []).some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchAuthor || matchTag;
    }
    return true;
  });

  filteredBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortField === 'title') {
      const va = (a.title || '').toLowerCase();
      const vb = (b.title || '').toLowerCase();
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    if (sortField === 'status') {
      const va = a.status || '';
      const vb = b.status || '';
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    const getTs = (v) => v?.toMillis ? v.toMillis() : (v ? new Date(v).getTime() : 0);
    const va = getTs(a[sortField]);
    const vb = getTs(b[sortField]);
    return sortDir === 'asc' ? va - vb : vb - va;
  });

  return (
    <div className="admin-cms-page">
      <Helmet>
        <title>Blog CMS Dashboard | GyanVaniAi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminHeader />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-cms-toast ${toastMessage.type}`}>
          <CheckCircle2 size={16} />
          <span>{toastMessage.message}</span>
        </div>
      )}

      <main className="admin-cms-dashboard-container">
        {/* Dashboard Hero */}
        <div className="admin-dashboard-hero">
          <div>
            <h1 className="admin-dashboard-title">Blog Articles</h1>
            <p className="admin-dashboard-subtitle">
              Manage, compose, schedule, draft, and publish your B2B SaaS articles.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/admin/blog/refresh" className="admin-cms-btn-secondary" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <RefreshCw size={15} />
              <span>Content Refresh</span>
            </Link>
            <button
              onClick={() => setShowActivityModal(true)}
              className="admin-cms-btn-secondary"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <Activity size={16} />
              <span>Activity</span>
            </button>
            <Link to="/admin/create" className="admin-cms-btn-primary">
              <PenLine size={16} />
              <span>Create New Article</span>
            </Link>
          </div>
        </div>

        {/* Content Intelligence Panel (analytics summary) */}
        <ContentIntelligencePanel posts={blogs} />

        {/* Dashboard Toolbar: Tabs & Search & Tag Filter */}
        <div className="admin-dashboard-toolbar">
          <div className="admin-dashboard-tabs">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <span>All Posts</span>
              <span className="admin-tab-count">{blogs.length}</span>
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              <span>Published</span>
              <span className="admin-tab-count">{publishedCount}</span>
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              <span>Scheduled</span>
              <span className="admin-tab-count">{scheduledCount}</span>
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'draft' ? 'active' : ''}`}
              onClick={() => setActiveTab('draft')}
            >
              <span>Drafts</span>
              <span className="admin-tab-count">{draftCount}</span>
            </button>
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
              onClick={() => setActiveTab('archived')}
            >
              <span>Archived</span>
              <span className="admin-tab-count">{archivedCount}</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {/* Category Filter */}
            {allAvailableCategories.length > 0 && (
              <select
                className="admin-panel-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', width: 'auto', minWidth: '130px', fontSize: '0.8rem' }}
              >
                <option value="">All Categories</option>
                {allAvailableCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}

            {/* Tag Filter Dropdown */}
            {allAvailableTags.length > 0 && (
              <select
                className="admin-panel-select"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                style={{ padding: '0.45rem 0.75rem', width: 'auto', minWidth: '120px', fontSize: '0.8rem' }}
              >
                <option value="">All Tags</option>
                {allAvailableTags.map((tag) => (
                  <option key={tag.slug} value={tag.slug}>#{tag.label}</option>
                ))}
              </select>
            )}

            {/* Editorial Review Status Filter */}
            <select
              className="admin-panel-select"
              value={selectedReviewStatus}
              onChange={(e) => setSelectedReviewStatus(e.target.value)}
              style={{ padding: '0.45rem 0.75rem', width: 'auto', minWidth: '140px', fontSize: '0.8rem' }}
            >
              <option value="">All Review States</option>
              <option value="none">Not Reviewed</option>
              <option value="in_review">In Review</option>
              <option value="changes_requested">Changes Requested</option>
              <option value="approved">Approved</option>
              <option value="stale">Stale Approval</option>
            </select>

            {/* Date Range */}
            <input
              type="date"
              className="admin-panel-select"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              title="From date"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
            />
            <input
              type="date"
              className="admin-panel-select"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              title="To date"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', width: 'auto' }}
            />

            {/* Search Input */}
            <div className="admin-search-wrapper">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search by title, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="admin-bulk-actions-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600 }}>{selectedIds.length} article{selectedIds.length > 1 ? 's' : ''} selected</span>
            <button onClick={handleBulkArchive} className="admin-cms-btn-secondary small">Archive Selected</button>
            <button onClick={handleBulkDelete} className="admin-cms-btn-secondary small" style={{ color: 'var(--error-color)' }}>Delete Selected</button>
            <button onClick={() => setSelectedIds([])} className="admin-cms-btn-secondary small">Cancel Selection</button>
          </div>
        )}

        {/* Posts Table or Empty State */}
        {loading ? (
          <div className="admin-cms-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <Loader2 size={32} className="spinner-icon" style={{ margin: '0 auto 1rem', color: 'var(--cms-brand)' }} />
            <p style={{ color: 'var(--cms-text-muted)' }}>Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="admin-table-container">
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <FileText size={28} />
              </div>
              <h3 className="admin-empty-title">
                {searchQuery || selectedTag
                  ? 'No matching articles found'
                  : activeTab === 'scheduled'
                  ? 'No scheduled posts'
                  : activeTab === 'draft'
                  ? 'No draft posts yet'
                  : 'No blog posts found'}
              </h3>
              <p className="admin-empty-subtitle">
                {searchQuery || selectedTag
                  ? 'Try clearing your search or tag filters.'
                  : 'Start writing your next article with our rich text editor.'}
              </p>
              {!searchQuery && !selectedTag && (
                <Link to="/admin/create" className="admin-cms-btn-primary">
                  <PenLine size={15} />
                  <span>Create First Post</span>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-cms-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      onChange={toggleAll} 
                      checked={selectedIds.length === filteredBlogs.length && filteredBlogs.length > 0} 
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ width: '38%', cursor: 'pointer' }} onClick={() => handleSort('title')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Article <ArrowUpDown size={13} /></span>
                  </th>
                  <th style={{ width: '15%' }}>Category / Tags</th>
                  <th style={{ width: '13%', cursor: 'pointer' }} onClick={() => handleSort('status')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Status <ArrowUpDown size={13} /></span>
                  </th>
                  <th style={{ width: '12%', cursor: 'pointer' }} onClick={() => handleSort('createdAt')}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Date <ArrowUpDown size={13} /></span>
                  </th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className={selectedIds.includes(blog.id) ? 'selected-row' : ''}>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(blog.id)} 
                        onChange={() => toggleSelection(blog.id)} 
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>
                      <div className="admin-post-cell">
                        <img
                          src={blog.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'}
                          alt={blog.title}
                          className="admin-post-thumb"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <Link
                            to={`/admin/edit/${blog.id}`}
                            className="admin-post-title-link"
                          >
                            {blog.title || 'Untitled Post'}
                          </Link>
                          <div className="admin-post-excerpt-snippet">
                            {blog.seoDescription || blog.excerpt || 'No summary provided.'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.45rem', background: '#f1f5f9', borderRadius: '4px', color: '#334155', width: 'fit-content' }}>
                          {blog.category || 'General'}
                        </span>
                        {blog.tagLabels && blog.tagLabels.length > 0 && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--cms-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                            {blog.tagLabels.slice(0, 2).map((t) => `#${t}`).join(' ')}
                            {blog.tagLabels.length > 2 ? ` +${blog.tagLabels.length - 2}` : ''}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className={`admin-cms-badge ${blog.status}`}>
                          {blog.status === 'published'
                            ? '● Published'
                            : blog.status === 'scheduled'
                            ? '◷ Scheduled'
                            : '○ Draft'}
                        </span>
                        {blog.status === 'scheduled' && (
                          <div style={{ fontSize: '0.72rem', color: '#6b21a8', marginTop: '0.25rem', fontWeight: 500 }}>
                            {blog.scheduledDate} · {blog.scheduledTime}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ color: 'var(--cms-text-muted)', fontSize: '0.825rem' }}>
                      {blog.date || 'Recently'}
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        {/* If scheduled, provide quick Publish Now and Cancel Schedule buttons */}
                        {blog.status === 'scheduled' && (
                          <>
                            <button
                              type="button"
                              className="admin-row-action-btn"
                              onClick={() => handlePublishNow(blog)}
                              title="Publish Now (Bypass Schedule)"
                              style={{ color: '#0d9488' }}
                            >
                              <Send size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-row-action-btn"
                              onClick={() => handleCancelSchedule(blog)}
                              title="Cancel Schedule (Revert to Draft)"
                              style={{ color: '#d97706' }}
                            >
                              <CalendarX size={14} />
                            </button>
                          </>
                        )}

                        {blog.status === 'archived' ? (
                          <button
                            type="button"
                            className="admin-row-action-btn"
                            onClick={() => handleUnarchive(blog)}
                            title="Unarchive (Move to Drafts)"
                            style={{ color: '#10b981' }}
                          >
                            <ArchiveRestore size={15} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-row-action-btn"
                            onClick={() => handleArchive(blog)}
                            title="Archive Article"
                            style={{ color: '#64748b' }}
                          >
                            <Archive size={15} />
                          </button>
                        )}

                        <button
                          type="button"
                          className="admin-row-action-btn"
                          onClick={() => navigate(`/admin/edit/${blog.id}`)}
                          title="Edit article"
                        >
                          <Edit3 size={15} />
                        </button>

                        {blog.slugId && blog.status === 'published' && (
                          <a
                            href={`/blog/${blog.slugId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-row-action-btn"
                            title="View on live site"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}

                        <button
                          type="button"
                          className="admin-row-action-btn"
                          onClick={() => handleDuplicate(blog)}
                          title="Duplicate article"
                          style={{ color: '#4f46e5' }}
                        >
                          <Copy size={15} />
                        </button>

                        <button
                          type="button"
                          className="admin-row-action-btn delete"
                          onClick={() => handleDeleteClick(blog)}
                          title="Delete article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Collapsible Utility Panel (Theme Settings) */}
        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--cms-border)', paddingTop: '1.5rem' }}>
          <button
            type="button"
            className="admin-cms-btn-secondary"
            onClick={() => setShowAnalyticsPanel(!showAnalyticsPanel)}
            style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Layers size={15} />
            <span>Site Utilities</span>
            {showAnalyticsPanel ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showAnalyticsPanel && (
            <div style={{ marginTop: '1rem' }}>
              <div className="admin-cms-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Theme Settings</h3>
                <ThemeSwitcher />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && blogToDelete && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-badge danger">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3>Delete Article</h3>
                <p className="admin-modal-subtitle">
                  Are you sure you want to delete &ldquo;{blogToDelete.title}&rdquo;? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-cms-btn-secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-cms-btn-danger"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tracker Modal */}
      {showActivityModal && (
        <div className="admin-modal-overlay" onClick={() => setShowActivityModal(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="admin-modal-icon-badge">
                  <Activity size={20} />
                </div>
                <h3>Recent Activity Log</h3>
              </div>
              <button onClick={() => setShowActivityModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-summary-box" style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {activityLogs.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>No recent activity found. Activity is logged when posts are created, published, archived, or deleted.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activityLogs.map((log) => {
                    const actionColor = {
                      CREATED: '#22c55e', PUBLISHED: '#3b82f6', ARCHIVED: '#f59e0b',
                      DELETED: '#ef4444', UPDATED: '#8b5cf6', RESTORED: '#06b6d4',
                      SCHEDULED: '#f97316',
                    }[log.action] || '#6b7280';
                    return (
                      <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                            {log.details?.title || log.blogId}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ padding: '0.15rem 0.5rem', background: actionColor, color: 'white', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                              {log.action}
                            </span>
                            <span>by {log.userEmail || 'Admin'}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                          {log.timestamp?.toDate().toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
