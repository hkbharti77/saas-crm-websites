import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Admin.css';

const AdminEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: '',
    readTime: '',
    imageUrl: '',
    date: ''
  });
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            category: data.category || '',
            readTime: data.readTime || '',
            imageUrl: data.imageUrl || '',
            date: data.date || ''
          });
          setContent(data.content || '');
        } else {
          alert("Post not found!");
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
        alert("Failed to fetch post.");
      } finally {
        setFetching(false);
      }
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchPost();
      }
    });
    return () => unsubscribe();
  }, [navigate, id]);



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
      
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        ...formData,
        slugId,
        content
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update post. See console for error.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="admin-container">Loading post data...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Edit Blog Post</h2>
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
            <input
              type="url"
              name="imageUrl"
              placeholder="Featured Image URL"
              className="admin-input"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
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
            {loading ? 'Updating...' : 'Update Blog Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditPost;
