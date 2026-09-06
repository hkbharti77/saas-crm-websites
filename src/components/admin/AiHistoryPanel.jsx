import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Clock, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export default function AiHistoryPanel({ blogId = null }) {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAiHistory() {
      setLoading(true);
      try {
        const q = query(collection(db, 'ai_history'), orderBy('createdAt', 'desc'), limit(30));
        const snap = await getDocs(q);
        const docs = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(item => !blogId || item.blogId === blogId);
        setHistoryItems(docs);
      } catch (err) {
        console.error('Failed to load AI history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAiHistory();
  }, [blogId]);

  return (
    <div className="ai-history-panel">
      <div className="ai-history-header">
        <Sparkles size={16} className="text-teal-600" />
        <h4>AI Operation Audit History ({historyItems.length})</h4>
      </div>

      {loading ? (
        <div className="ai-history-loading">Loading AI activity log...</div>
      ) : historyItems.length === 0 ? (
        <div className="ai-history-empty">No AI operations recorded yet.</div>
      ) : (
        <div className="ai-history-list">
          {historyItems.map(item => (
            <div key={item.id} className="ai-history-item">
              <div className="ai-history-item-header">
                <span className="ai-history-op">{item.operation}</span>
                <span className={`ai-history-status ${item.status}`}>
                  {item.status === 'success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  <span>{item.status}</span>
                </span>
              </div>
              <p className="ai-history-summary">{item.summary}</p>
              <div className="ai-history-meta">
                <Clock size={12} />
                <span>
                  {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Recent'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
