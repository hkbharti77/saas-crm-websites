import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { Trash2, Edit2, Plus, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import './BlogManager.css';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false,
    imageUrl: '',
    author: 'Gyan VaniAi Team',
    status: 'draft'
  });

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const fetchBlogs = React.useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const blogsList = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      }));
      setBlogs(blogsList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showMessage('Failed to load blog posts', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchBlogs();
    });
  }, [fetchBlogs]);

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featured: false,
      imageUrl: '',
      author: 'Gyan VaniAi Team',
      status: 'draft'
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags?.join(', ') || '',
      featured: blog.featured || false,
      imageUrl: blog.imageUrl || '',
      author: blog.author,
      status: blog.status || 'draft'
    });
    setEditing(blog.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      showMessage('Title is required', 'error');
      return;
    }
    if (!formData.excerpt.trim()) {
      showMessage('Excerpt is required', 'error');
      return;
    }
    if (!formData.content.trim()) {
      showMessage('Content is required', 'error');
      return;
    }

    try {
      const slugId = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        featured: formData.featured,
        imageUrl: formData.imageUrl,
        author: formData.author,
        status: formData.status,
        slugId,
        updatedAt: new Date()
      };

      if (editing) {
        // Update existing
        await updateDoc(doc(db, 'blogs', editing), postData);
        showMessage('Blog post updated successfully!');
      } else {
        // Create new
        await addDoc(collection(db, 'blogs'), {
          ...postData,
          createdAt: new Date()
        });
        showMessage('Blog post created successfully!');
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      showMessage('Failed to save blog post', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'blogs', id));
      showMessage('Blog post deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      showMessage('Failed to delete blog post', 'error');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog Manager - Gyan VaniAi Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="blog-manager-container">
        <div className="blog-manager-header">
          <div>
            <h1>Blog Manager</h1>
            <p className="blog-manager-subtitle">Create, edit, and manage blog posts</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="btn btn-primary"
          >
            <Plus size={18} />
            <span>{showForm ? 'Cancel' : 'New Post'}</span>
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`blog-manager-alert alert-${message.type}`}>
            {message.type === 'success' ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="blog-manager-form-section">
            <h2>{editing ? 'Edit Post' : 'Create New Post'}</h2>

            <div className="blog-form-group">
              <label>Title *</label>
              <input
                type="text"
                placeholder="e.g., The Future of AI in CRM"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="blog-form-input"
              />
            </div>

            <div className="blog-form-group">
              <label>Excerpt *</label>
              <textarea
                placeholder="Short summary (50-160 characters)"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                className="blog-form-textarea"
              />
              <small className="form-hint">
                {formData.excerpt.length} characters
              </small>
            </div>

            <div className="blog-form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="blog-form-select"
              >
                <option value="">Select a category</option>
                <option value="AI Technology">AI Technology</option>
                <option value="Data Security">Data Security</option>
                <option value="Product Updates">Product Updates</option>
                <option value="Best Practices">Best Practices</option>
                <option value="Customer Success">Customer Success</option>
              </select>
            </div>

            <div className="blog-form-group">
              <label>Tags</label>
              <input
                type="text"
                placeholder="Comma-separated tags: ai, crm, automation"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="blog-form-input"
              />
            </div>

            <div className="blog-form-group">
              <label>Featured Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="blog-form-input"
              />
            </div>

            <div className="blog-form-group">
              <label>Content (HTML) *</label>
              <textarea
                placeholder="Write your content here. You can use HTML tags."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={12}
                className="blog-form-textarea"
              />
              <small className="form-hint">
                Supported: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;,
                &lt;strong&gt;, &lt;a&gt;
              </small>
            </div>

            <div className="blog-form-row">
              <div className="blog-form-group">
                <label>Author</label>
                <input
                  type="text"
                  placeholder="Author name"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="blog-form-input"
                />
              </div>

              <div className="blog-form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="blog-form-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="blog-form-group blog-form-checkbox">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              <label htmlFor="featured">Mark as Featured</label>
            </div>

            <div className="blog-form-actions">
              <button onClick={handleSave} className="btn btn-primary">
                <Save size={18} />
                <span>{editing ? 'Update Post' : 'Create Post'}</span>
              </button>
              <button onClick={resetForm} className="btn btn-outline">
                <X size={18} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Blog List Section */}
        <div className="blog-manager-list-section">
          <h2>Published & Draft Posts ({blogs.length})</h2>

          {loading ? (
            <div className="blog-manager-loading">Loading posts...</div>
          ) : blogs.length === 0 ? (
            <div className="blog-manager-empty">
              <p>No blog posts yet. Click "New Post" to create one.</p>
            </div>
          ) : (
            <div className="blog-manager-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id} className={`status-${blog.status}`}>
                      <td className="blog-title-cell">
                        <span className="blog-featured-badge-small">
                          {blog.featured ? '★' : ''}
                        </span>
                        {blog.title}
                      </td>
                      <td>{blog.category || '-'}</td>
                      <td>
                        <span className={`status-badge status-${blog.status}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>{blog.author}</td>
                      <td>{formatDate(blog.createdAt)}</td>
                      <td className="blog-actions-cell">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="btn-icon btn-icon-edit"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="btn-icon btn-icon-delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
