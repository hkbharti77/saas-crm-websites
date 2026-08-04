import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import './Admin.css';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const blogsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    }

    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchBlogs();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleDeleteClick = (id) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      await deleteDoc(doc(doc(db, 'blogs'), blogToDelete));
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
    } catch (error) {
      console.error("Error deleting blog: ", error);
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="admin-container">Loading dashboard...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/admin/create" className="admin-button" style={{ textDecoration: 'none' }}>
            + Create New Post
          </Link>
          <button onClick={handleLogout} className="btn-delete">Logout</button>
        </div>
      </div>

      {/* Admin Enterprise Theme Management Panel */}
      <ThemeSwitcher />

      <div className="admin-header" style={{ marginTop: '2rem' }}>
        <h3>Blog Posts Management</h3>
      </div>

      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blog posts found. Create your first post!</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <div>
                <h3>{blog.title}</h3>
                <p>{blog.date} | {blog.category}</p>
              </div>
              <div className="blog-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => navigate(`/admin/edit/${blog.id}`)} className="btn-edit" style={{ background: '#2563eb', color: 'white' }}>Edit</button>
                <button onClick={() => handleDeleteClick(blog.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Delete Blog Post</h3>
            <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
            <div className="admin-modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="btn-cancel">Cancel</button>
              <button onClick={confirmDelete} className="btn-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
