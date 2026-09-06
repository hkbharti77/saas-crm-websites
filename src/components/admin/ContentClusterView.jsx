import React, { useState } from 'react';
import { Layers, FileText, Sparkles, ChevronRight, ChevronDown } from 'lucide-react';

export default function ContentClusterView({ clusters = [] }) {
  const [expandedClusters, setExpandedClusters] = useState(
    clusters.reduce((acc, c) => ({ ...acc, [c.pillarName]: true }), {})
  );

  const toggleCluster = (pillarName) => {
    setExpandedClusters(prev => ({ ...prev, [pillarName]: !prev[pillarName] }));
  };

  if (!clusters || clusters.length === 0) {
    return (
      <div className="cluster-view-empty">
        No topic clusters generated yet. Publish articles across categories to build content trees.
      </div>
    );
  }

  return (
    <div className="content-cluster-view">
      <div className="cluster-view-header">
        <Layers size={18} className="text-teal-600" />
        <div>
          <h4>Pillar Topic Clusters & Content Architecture</h4>
          <p>Hierarchical view of pillar categories, published content, and identified gaps</p>
        </div>
      </div>

      <div className="cluster-tree-list">
        {clusters.map(cluster => {
          const isOpen = expandedClusters[cluster.pillarName] !== false;
          return (
            <div key={cluster.pillarName} className="cluster-tree-node">
              <div
                className="cluster-node-header"
                onClick={() => toggleCluster(cluster.pillarName)}
              >
                <div className="cluster-node-title">
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="cluster-node-icon">🏛️</span>
                  <strong>{cluster.pillarName}</strong>
                  <span className="cluster-article-count">
                    {cluster.articles.length} article(s)
                  </span>
                </div>
                {cluster.gaps.length > 0 && (
                  <span className="cluster-gap-badge">
                    {cluster.gaps.length} Gap Identified
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="cluster-node-body">
                  <div className="cluster-branch">
                    <small className="branch-label">Published Articles</small>
                    {cluster.articles.length === 0 ? (
                      <div className="branch-empty">No published articles in this pillar yet.</div>
                    ) : (
                      <ul className="branch-list">
                        {cluster.articles.map(art => (
                          <li key={art.id} className="branch-item article">
                            <FileText size={13} className="text-blue-600" />
                            <a href={`/blog/${art.slugId}`} target="_blank" rel="noreferrer">
                              {art.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {cluster.gaps.length > 0 && (
                    <div className="cluster-branch gap">
                      <small className="branch-label gap">Identified Topic Gaps</small>
                      <ul className="branch-list">
                        {cluster.gaps.map(g => (
                          <li key={g.id} className="branch-item gap">
                            <Sparkles size={13} className="text-amber-500" />
                            <div>
                              <strong>{g.topic}</strong>
                              <p className="branch-gap-desc">{g.reason}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
