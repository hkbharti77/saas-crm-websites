import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { LayoutDashboard, PenLine, ExternalLink, LogOut, FileText, BarChart2 } from 'lucide-react';
import './AdminCMS.css';

export default function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isDashboard = location.pathname === '/admin/dashboard';
  const isCreate = location.pathname === '/admin/create';
  const isAnalytics = location.pathname.startsWith('/admin/blog/analytics') || location.pathname.startsWith('/admin/blog/opportunities');

  return (
    <header className="admin-cms-header">
      <div className="admin-cms-header-left">
        <Link to="/admin/dashboard" className="admin-cms-brand">
          <div className="admin-cms-logo-icon">
            <FileText size={18} />
          </div>
          <span className="admin-cms-brand-name">GyanVaniAi</span>
          <span className="admin-cms-brand-badge">CMS</span>
        </Link>

        <nav className="admin-cms-nav">
          <Link
            to="/admin/dashboard"
            className={`admin-cms-nav-item ${isDashboard ? 'active' : ''}`}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/create"
            className={`admin-cms-nav-item ${isCreate ? 'active' : ''}`}
          >
            <PenLine size={15} />
            <span>New Post</span>
          </Link>
          <Link
            to="/admin/blog/analytics"
            className={`admin-cms-nav-item ${isAnalytics ? 'active' : ''}`}
          >
            <BarChart2 size={15} />
            <span>Analytics</span>
          </Link>
          <Link
            to="/admin/blog/seo"
            className={`admin-cms-nav-item ${location.pathname === '/admin/blog/seo' ? 'active' : ''}`}
          >
            <FileText size={15} />
            <span>SEO Growth</span>
          </Link>

        </nav>
      </div>

      <div className="admin-cms-header-right">
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-cms-view-site"
          title="View public blog in new tab"
        >
          <span>Live Site</span>
          <ExternalLink size={13} />
        </a>

        {user && (
          <div className="admin-cms-user-pill" title={user.email}>
            <span className="admin-cms-user-avatar">
              {user.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </span>
            <span className="admin-cms-user-email">{user.email}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="admin-cms-logout-btn"
          title="Sign out of admin"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
