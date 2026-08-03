import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Admin.css';

const AdminCreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: '',
    readTime: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });
  const [content, setContent] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const imageBase64 = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64,
            fileName: file.name,
            contentType: file.type
          })
        });

        if (!res.ok) {
          const text = await res.text();
          let errData;
          try { errData = JSON.parse(text); } catch (err) {}
          alert(errData?.error || `Upload failed with HTTP status ${res.status}`);
          setUploadingImage(false);
          return;
        }

        const data = await res.json();
        if (data.url) {
          setFormData(prev => ({ ...prev, imageUrl: data.url }));
        } else {
          alert(data.error || 'Failed to upload image to S3');
        }
        setUploadingImage(false);
      };
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image file.");
      setUploadingImage(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      alert("Please write some content for the blog post.");
      return;
    }

    setLoading(true);
    try {
      const slugId = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      await addDoc(collection(db, 'blogs'), {
        ...formData,
        slugId,
        content,
        createdAt: serverTimestamp()
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to create post. See console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Create New Blog Post</h2>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-edit">
          Cancel
        </button>
      </div>

      <div className="editor-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            className="admin-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <textarea
            name="excerpt"
            placeholder="Short Excerpt (shows on blog list page)"
            className="admin-input"
            rows="3"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              className="admin-input"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., AI Technology)"
              className="admin-input"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              name="readTime"
              placeholder="Read Time (e.g., 5 min read)"
              className="admin-input"
              value={formData.readTime}
              onChange={handleChange}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="text"
                name="imageUrl"
                placeholder="Featured Image URL (or upload below)"
                className="admin-input"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label className="btn-edit" style={{ cursor: 'pointer', display: 'inline-block', padding: '0.4rem 0.8rem', fontSize: '0.9rem', textAlign: 'center' }}>
                  {uploadingImage ? 'Uploading to S3...' : '📁 Upload Image to S3'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={uploadingImage}
                  />
                </label>
                {formData.imageUrl && (
                  <span style={{ color: '#10b981', fontSize: '0.85rem' }}>✓ Image ready (Masked URL)</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'white' }}>Blog Content (HTML allowed)</label>
            <textarea 
              className="admin-input"
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              style={{ height: '300px', width: '100%', resize: 'vertical' }}
              placeholder="Write your blog content here..."
            />
          </div>

          <button type="submit" className="admin-button" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Publishing...' : 'Publish Blog Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreatePost;
