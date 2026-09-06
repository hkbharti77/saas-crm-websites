import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { Search, Plus, Edit2, Trash2, Tag, Loader2, AlertTriangle, X } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import { slugify } from '../../utils/slugify';
import '../../components/admin/AdminCMS.css';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ name: '', slug: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete protection state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'categories'), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch post counts for each category
      const blogQ = query(collection(db, 'blogs'));
      const blogSnapshot = await getDocs(blogQ);
      const counts = {};
      blogSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.categoryId) {
          counts[data.categoryId] = (counts[data.categoryId] || 0) + 1;
        }
      });

      setCategories(catList.map(c => ({ ...c, postCount: counts[c.id] || 0 })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchCategories();
      }
    });
    return () => unsubscribe();
  }, [navigate]);



  const handleOpenCreateModal = () => {
    setCurrentCategory({ name: '', slug: '', description: '' });
    setIsEditing(false);
    setErrorMsg('');
    setShowModal(true);
  };

  const handleOpenEditModal = (category) => {
    setCurrentCategory({ ...category });
    setIsEditing(true);
    setErrorMsg('');
    setShowModal(true);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setCurrentCategory(prev => ({
      ...prev,
      name,
      slug: !isEditing ? slugify(name) : prev.slug // auto-generate slug on create
    }));
  };

  const handleSaveCategory = async () => {
    setErrorMsg('');
    const { name, slug, description, id } = currentCategory;
    
    if (!name.trim()) return setErrorMsg('Category name is required.');
    if (!slug.trim()) return setErrorMsg('Category slug is required.');

    setIsSaving(true);
    try {
      // Check slug uniqueness
      const q = query(collection(db, 'categories'), where('slug', '==', slug));
      const snap = await getDocs(q);
      const exists = snap.docs.find(d => d.id !== id);
      if (exists) {
        setErrorMsg('Slug must be unique.');
        setIsSaving(false);
        return;
      }

      if (isEditing) {
        const docRef = doc(db, 'categories', id);
        await updateDoc(docRef, {
          name, slug, description,
          updatedAt: serverTimestamp(),
          updatedBy: auth.currentUser.uid
        });
      } else {
        await addDoc(collection(db, 'categories'), {
          name, slug, description,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser.uid,
          updatedAt: serverTimestamp()
        });
      }
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      setErrorMsg('Failed to save category.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAttemptDelete = (category) => {
    setCategoryToDelete(category);
    if (category.postCount > 0) {
      setDeleteWarning(`This category is used by ${category.postCount} post(s). Please reassign them before deleting this category.`);
    } else {
      setDeleteWarning('');
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    if (categoryToDelete.postCount > 0) return; // Protected

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'categories', categoryToDelete.id));
      setShowDeleteModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Category Management | Admin</title>
      </Helmet>
      <AdminHeader />

      <main className="admin-main">
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-title">
            <h1><Tag size={28} /> Category Management</h1>
            <p>Organize your blog content with unified categories</p>
          </div>
          <div className="admin-dashboard-actions">
            <button className="admin-btn-primary" onClick={handleOpenCreateModal}>
              <Plus size={18} /> New Category
            </button>
          </div>
        </div>

        <div className="admin-dashboard-controls">
          <div className="admin-search-wrapper">
            <Search className="admin-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading-state">
            <Loader2 className="admin-spinner" size={40} />
            <p>Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="admin-empty-state">
            <Tag className="admin-empty-icon" size={48} />
            <h3>No categories found</h3>
            <p>{searchQuery ? 'Try adjusting your search.' : 'Create your first category to get started.'}</p>
          </div>
        ) : (
          <div className="admin-cms-card">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Description</th>
                    <th>Posts</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map(cat => (
                    <tr key={cat.id}>
                      <td className="admin-col-title">
                        <strong>{cat.name}</strong>
                      </td>
                      <td><code>{cat.slug}</code></td>
                      <td className="admin-col-date" style={{maxWidth: '300px'}}>{cat.description || '-'}</td>
                      <td>
                        <span className="admin-cms-badge" style={{ background: 'var(--bg-card)', color: 'var(--text-color)' }}>
                          {cat.postCount}
                        </span>
                      </td>
                      <td className="admin-col-actions">
                        <button className="admin-icon-btn" onClick={() => handleOpenEditModal(cat)} title="Edit Category">
                          <Edit2 size={16} />
                        </button>
                        <button className="admin-icon-btn admin-icon-btn-danger" onClick={() => handleAttemptDelete(cat)} title="Delete Category">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h2>{isEditing ? 'Edit Category' : 'Create Category'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="admin-modal-body">
              {errorMsg && (
                <div className="admin-warning-banner" style={{marginBottom: '1rem'}}>
                  <AlertTriangle size={18}/> {errorMsg}
                </div>
              )}
              <div className="admin-form-group">
                <label className="admin-form-label">Category Name *</label>
                <input type="text" className="admin-form-input" value={currentCategory.name} onChange={handleNameChange} placeholder="e.g. Artificial Intelligence" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">URL Slug *</label>
                <input type="text" className="admin-form-input" value={currentCategory.slug} onChange={(e) => setCurrentCategory({...currentCategory, slug: slugify(e.target.value)})} placeholder="e.g. artificial-intelligence" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description (Optional)</label>
                <textarea className="admin-form-input" value={currentCategory.description} onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})} rows={3} placeholder="Brief description of this category..." />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn-primary" onClick={handleSaveCategory} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h2>Confirm Deletion</h2>
            </div>
            <div className="admin-modal-body">
              {deleteWarning ? (
                <div className="admin-warning-banner" style={{ background: 'var(--danger-color)', color: 'white' }}>
                  <AlertTriangle size={24} style={{ marginRight: '1rem' }} />
                  <div>
                    <strong>Cannot delete category</strong>
                    <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>{deleteWarning}</p>
                  </div>
                </div>
              ) : (
                <p>Are you sure you want to delete the category <strong>"{categoryToDelete?.name}"</strong>? This action cannot be undone.</p>
              )}
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-secondary" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>Cancel</button>
              {!deleteWarning && (
                <button className="admin-btn-danger" onClick={confirmDelete} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
