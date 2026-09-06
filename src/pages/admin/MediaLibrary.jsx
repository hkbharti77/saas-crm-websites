import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { UploadCloud, Trash2, Edit3, Search, X, Loader2, Image as ImageIcon, Copy } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import '../../components/admin/AdminCMS.css';
import { useNavigate } from 'react-router-dom';

export default function MediaLibrary({ isModal = false, onSelect = null, onClose = null }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit State
  const [editingMedia, setEditingMedia] = useState(null);
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const mediaList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedia(mediaList);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !isModal) {
        navigate('/admin/login');
      } else if (user) {
        fetchMedia();
      }
    });
    return () => unsubscribe();
  }, [navigate, isModal]);



  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file format. Use JPG, PNG, WebP or GIF.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const imageBase64 = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64,
            fileName: file.name,
            contentType: file.type,
          }),
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        if (data.url) {
          // Save to Firestore
          await addDoc(collection(db, 'media'), {
            url: data.url,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            altText: '',
            caption: '',
            createdAt: serverTimestamp(),
            createdBy: auth.currentUser.uid
          });
          fetchMedia();
        }
      } catch (err) {
        console.error('Error uploading:', err);
        alert('Upload failed.');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
  };

  const handleSaveMetadata = async () => {
    if (!editingMedia) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, 'media', editingMedia.id);
      await updateDoc(docRef, { altText, caption });
      setMedia(prev => prev.map(m => m.id === editingMedia.id ? { ...m, altText, caption } : m));
      setEditingMedia(null);
    } catch (error) {
      console.error('Error saving metadata:', error);
      alert('Failed to save metadata');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete ${item.filename}? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'media', item.id));
      setMedia(prev => prev.filter(m => m.id !== item.id));
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete media');
    }
  };

  const filteredMedia = media.filter(m => 
    (m.filename || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (m.altText || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const renderContent = () => (
    <div className="admin-media-library">
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-title">
          <h1><ImageIcon size={28} /> Media Library</h1>
          <p>Manage all uploaded images for your blogs</p>
        </div>
        <div className="admin-dashboard-actions">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/png, image/jpeg, image/webp, image/gif" 
            style={{ display: 'none' }} 
          />
          <button className="admin-btn-primary" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            {isUploading ? <Loader2 size={18} className="spinner-icon" /> : <UploadCloud size={18} />}
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      <div className="admin-dashboard-controls">
        <div className="admin-search-wrapper">
          <Search className="admin-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by filename or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-state">
          <Loader2 className="admin-spinner" size={40} />
          <p>Loading media...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="admin-empty-state">
          <ImageIcon className="admin-empty-icon" size={48} />
          <h3>No media found</h3>
          <p>Upload some images to get started.</p>
        </div>
      ) : (
        <div className="admin-media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {filteredMedia.map(item => (
            <div key={item.id} className="admin-media-item" style={{ border: '1px solid var(--cms-border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-card)' }}>
              <div 
                className="admin-media-thumb" 
                style={{ height: '150px', backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: onSelect ? 'pointer' : 'default' }}
                onClick={() => onSelect && onSelect(item)}
              />
              <div className="admin-media-info" style={{ padding: '0.75rem', fontSize: '0.8rem' }}>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', marginBottom: '0.5rem' }} title={item.filename}>
                  {item.filename}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                  <button className="admin-icon-btn" onClick={() => copyToClipboard(item.url)} title="Copy URL">
                    <Copy size={14} />
                  </button>
                  <button className="admin-icon-btn" onClick={() => { setEditingMedia(item); setAltText(item.altText || ''); setCaption(item.caption || ''); }} title="Edit Metadata">
                    <Edit3 size={14} />
                  </button>
                  <button className="admin-icon-btn admin-icon-btn-danger" onClick={() => handleDelete(item)} title="Delete Image">
                    <Trash2 size={14} />
                  </button>
                  {isModal && (
                    <button className="admin-btn-primary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }} onClick={() => onSelect(item)}>
                      Select
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingMedia && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            <div className="admin-modal-header">
              <h2>Edit Image Info</h2>
              <button className="admin-modal-close" onClick={() => setEditingMedia(null)}><X size={20}/></button>
            </div>
            <div className="admin-modal-body">
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <img src={editingMedia.url} alt="preview" style={{ maxHeight: '150px', borderRadius: '4px' }} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Alt Text</label>
                <input type="text" className="admin-form-input" value={altText} onChange={e => setAltText(e.target.value)} placeholder="Describe image for accessibility" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Caption (Optional)</label>
                <input type="text" className="admin-form-input" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Visible caption under image" />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-secondary" onClick={() => setEditingMedia(null)}>Cancel</button>
              <button className="admin-btn-primary" onClick={handleSaveMetadata} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Info'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="admin-modal-overlay" style={{ zIndex: 10000 }}>
        <div className="admin-modal-content" style={{ width: '90%', maxWidth: '1000px', height: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10, borderBottom: '1px solid var(--cms-border)', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Select Image</h2>
            <button className="admin-icon-btn" onClick={onClose}><X size={24} /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1 }}>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Media Library | Admin</title>
      </Helmet>
      <AdminHeader />
      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
}
