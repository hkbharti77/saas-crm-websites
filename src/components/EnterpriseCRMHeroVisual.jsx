import React from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Activity, 
  Check, 
  Zap, 
  Layers, 
  Lock, 
  Clock,
  Briefcase
} from 'lucide-react';
import './EnterpriseCRMHeroVisual.css';

export default function EnterpriseCRMHeroVisual() {
  return (
    <div className="ent-hero-mockup-wrap">
      <div className="ent-hero-mockup-card">
        {/* Window Top Bar */}
        <div className="ent-mockup-header">
          <div className="ent-mockup-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="ent-mockup-title">
            <Building2 size={14} color="var(--primary-color)" />
            <span>Gyan VaniAi Enterprise CRM · Multi-Tenant Platform</span>
          </div>
          <div className="ent-mockup-role-pill">
            <ShieldCheck size={13} />
            <span>RBAC: Enterprise Admin</span>
          </div>
        </div>

        <div className="ent-mockup-body">
          {/* Top Metrics Row */}
          <div className="ent-mockup-stats-grid">
            <div className="ent-mockup-stat-box">
              <div className="ent-mockup-stat-lbl">Enterprise ARR Pipeline</div>
              <div className="ent-mockup-stat-val">$2.4M <span className="ent-mockup-stat-sub">+24% YoY</span></div>
            </div>
            <div className="ent-mockup-stat-box">
              <div className="ent-mockup-stat-lbl">Connected Workspaces</div>
              <div className="ent-mockup-stat-val">18 Units <span className="ent-mockup-stat-sub">Multi-Team</span></div>
            </div>
            <div className="ent-mockup-stat-box">
              <div className="ent-mockup-stat-lbl">Cross-Team SLA Rate</div>
              <div className="ent-mockup-stat-val">99.4% <span className="ent-mockup-stat-sub">Standardized</span></div>
            </div>
          </div>

          {/* Active Enterprise Account Card */}
          <div className="ent-mockup-account-card">
            <div className="ent-mockup-account-top">
              <div>
                <div className="ent-mockup-org-name">Global Holdings & Logistics Corp</div>
                <div className="ent-mockup-org-sub">Parent Account · 14 Subsidiaries · APAC & EMEA Divisions</div>
              </div>
              <div className="ent-mockup-health-badge">
                <Activity size={13} />
                <span>Account Health: 98/100</span>
              </div>
            </div>

            {/* Team Roles & Ownership */}
            <div className="ent-mockup-team-tags">
              <span className="ent-mockup-tag">
                <Briefcase size={12} /> Sales Pod: Strategic Enterprise
              </span>
              <span className="ent-mockup-tag">
                <Users size={12} /> Support: Tier-3 Dedicated
              </span>
              <span className="ent-mockup-tag">
                <Lock size={12} /> Access: Multi-Department RBAC
              </span>
            </div>

            {/* Enterprise Pipeline Progression */}
            <div className="ent-mockup-pipeline-bar">
              <div className="ent-mockup-pipe-step done">
                <Check size={12} /> Account Intake
              </div>
              <div className="ent-mockup-pipe-step done">
                <Check size={12} /> Security Review
              </div>
              <div className="ent-mockup-pipe-step active">
                <Zap size={12} /> Contract & SLA
              </div>
              <div className="ent-mockup-pipe-step">
                <span>ERP & Ops Sync</span>
              </div>
            </div>
          </div>

          {/* Centralized Activity & Operations Feed */}
          <div className="ent-mockup-stream">
            <div className="ent-mockup-stream-title">
              <Clock size={13} />
              <span>Centralized Cross-Team Activity Stream</span>
            </div>

            <div className="ent-mockup-stream-item">
              <div className="ent-mockup-stream-left">
                <Zap size={14} color="var(--primary-color)" />
                <span>Contract executed ($180,000 ARR) — Triggered ERP billing hook</span>
              </div>
              <span className="ent-mockup-stream-time">14:02</span>
            </div>

            <div className="ent-mockup-stream-item">
              <div className="ent-mockup-stream-left">
                <Layers size={14} color="var(--primary-color)" />
                <span>Account SLA policy assigned to EMEA Support & Success team</span>
              </div>
              <span className="ent-mockup-stream-time">14:05</span>
            </div>

            <div className="ent-mockup-stream-item">
              <div className="ent-mockup-stream-left">
                <Building2 size={14} color="var(--primary-color)" />
                <span>Unified 360° timeline synchronized across 8 regional branches</span>
              </div>
              <span className="ent-mockup-stream-time">14:10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
