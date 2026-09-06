import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import AdminHeader from '../../components/admin/AdminHeader';
import ContentRefreshModal from '../../components/admin/ContentRefreshModal';
import { RefreshCw, Sparkles } from 'lucide-react';
import '../../components/admin/AdminCMS.css';

export default function ContentRefresh() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected article for AI refresh modal
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isRefreshModalOpen, setIsRefreshModalOpen] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const q = query(collection(db, 'blogs'));
        const snap = await getDocs(q);
        const docs = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(b => b.status === 'published');

        // Calculate age status and refresh priorities
        const processed = docs.map(blog => {
          const pubDate = blog.publishedAt?.toDate ? blog.publishedAt.toDate() : new Date(blog.createdAt?.toDate ? blog.createdAt.toDate() : Date.now());
          const ageMonths = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);

          let freshnessStatus = 'Fresh';
          let freshnessClass = 'fresh';
          if (ageMonths > 18) {
            freshnessStatus = 'Stale (18m+)';
            freshnessClass = 'stale';
          } else if (ageMonths > 6) {
            freshnessStatus = 'Aging (6-18m)';
            freshnessClass = 'aging';
          }

          // Calculate refresh priority based on real heuristics (age, missing image, missing excerpt)
          let priority = 'Low';
          const reasons = [];

          if (ageMonths > 18) {
            priority = 'High';
            reasons.push('Article published over 18 months ago');
          } else if (ageMonths > 6) {
            priority = 'Medium';
            reasons.push('Article published over 6 months ago');
          }

          if (!blog.imageUrl) {
            reasons.push('Missing cover image');
          }
          if (!blog.excerpt || blog.excerpt.length < 50) {
            reasons.push('Short or missing excerpt');
          }

          // Check real P3 traffic signals if available
          const pageViews = blog.views || blog.analytics?.pageViews || 0;
          const trafficSignal = pageViews > 0 ? `${pageViews} total views` : 'Insufficient traffic data';

          return {
            ...blog,
            pubDate,
            ageMonths: Math.round(ageMonths),
            freshnessStatus,
            freshnessClass,
            priority,
            reasons: reasons.length > 0 ? reasons.join(' • ') : 'Content up to date',
            trafficSignal
          };
        });

        // Sort highest priority and oldest articles first
        processed.sort((a, b) => b.ageMonths - a.ageMonths);
        setBlogs(processed);
      } catch (err) {
        console.error('Failed to load blogs for Content Refresh:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleOpenRefreshModal = (article) => {
    setSelectedArticle(article);
    setIsRefreshModalOpen(true);
  };

  return (
    <div className="admin-cms-container">
      <AdminHeader
        title="Content Refresh Dashboard"
        subtitle="Identify aging articles, audit content health, and apply AI-assisted refreshes safely to working drafts"
      />

      <div className="admin-cms-content" style={{ padding: '2rem' }}>
        <div className="admin-cms-card" style={{ marginBottom: '1.5rem' }}>
          <div className="refresh-banner-header">
            <div className="refresh-banner-title">
              <RefreshCw size={20} className="text-teal-600" />
              <div>
                <h3>Content Freshness & Decay Monitoring</h3>
                <p>Articles published 6+ months ago are flagged for editorial review and AI refreshment.</p>
              </div>
            </div>
            <div className="refresh-stats-badges">
              <span className="refresh-stat-badge stale">
                Stale (18m+): {blogs.filter(b => b.freshnessClass === 'stale').length}
              </span>
              <span className="refresh-stat-badge aging">
                Aging (6-18m): {blogs.filter(b => b.freshnessClass === 'aging').length}
              </span>
              <span className="refresh-stat-badge fresh">
                Fresh (&lt;6m): {blogs.filter(b => b.freshnessClass === 'fresh').length}
              </span>
            </div>
          </div>
        </div>

        <div className="admin-cms-card">
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading content freshness audit...</div>
          ) : blogs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No published articles found in library.</div>
          ) : (
            <table className="admin-cms-table">
              <thead>
                <tr>
                  <th>Article Title</th>
                  <th>Category</th>
                  <th>Published Date</th>
                  <th>Freshness Status</th>
                  <th>Refresh Reason</th>
                  <th>Traffic Signal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{blog.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>/blog/{blog.slugId}</div>
                    </td>
                    <td>
                      <span className="brief-tag secondary">{blog.category || 'General'}</span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>
                      {blog.pubDate.toLocaleDateString()} ({blog.ageMonths}m ago)
                    </td>
                    <td>
                      <span className={`review-status-badge ${blog.freshnessClass}`}>
                        {blog.freshnessStatus}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569', maxWidth: '280px' }}>
                      {blog.reasons}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {blog.trafficSignal}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          type="button"
                          className="admin-cms-btn-primary small"
                          onClick={() => handleOpenRefreshModal(blog)}
                        >
                          <Sparkles size={13} />
                          <span>AI Refresh</span>
                        </button>
                        <Link
                          to={`/admin/edit/${blog.id}`}
                          className="admin-cms-btn-secondary small"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* AI Refresh Proposal Modal */}
      {selectedArticle && (
        <ContentRefreshModal
          isOpen={isRefreshModalOpen}
          onClose={() => setIsRefreshModalOpen(false)}
          article={selectedArticle}
          onApplyRefreshToEditor={(_updatedData) => {
            setIsRefreshModalOpen(false);
            navigate(`/admin/edit/${selectedArticle.id}`);
          }}
        />
      )}
    </div>
  );
}
