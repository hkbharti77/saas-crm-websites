import React, { useState } from 'react';
import { INTEGRATION_FLOW_TABS } from '../../config/legalDocumentsConfig';

export default function IntegrationFlowExplorer() {
  const [activeTabId, setActiveTabId] = useState(INTEGRATION_FLOW_TABS[0].id);

  const activeTab =
    INTEGRATION_FLOW_TABS.find((tab) => tab.id === activeTabId) ||
    INTEGRATION_FLOW_TABS[0];

  const handleKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      (index + delta + INTEGRATION_FLOW_TABS.length) %
      INTEGRATION_FLOW_TABS.length;
    setActiveTabId(INTEGRATION_FLOW_TABS[nextIndex].id);
  };

  return (
    <div className="trust-ed-explorer">
      <div
        className="trust-ed-tablist"
        role="tablist"
        aria-label="Connected service data flows"
      >
        {INTEGRATION_FLOW_TABS.map((tab, index) => {
          const selected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`integration-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`integration-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="trust-ed-tab"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`integration-panel-${activeTab.id}`}
        aria-labelledby={`integration-tab-${activeTab.id}`}
        className="trust-ed-tabpanel"
      >
        <p className="trust-ed-tabpanel-eyebrow">{activeTab.eyebrow}</p>
        <h3 className="trust-ed-tabpanel-title">{activeTab.title}</h3>
        <p className="trust-ed-tabpanel-intro">{activeTab.intro}</p>

        <dl className="trust-ed-dl">
          {activeTab.flows.map((flow) => (
            <div key={flow.name} className="trust-ed-dl-row">
              <dt className="trust-ed-dl-term">{flow.name}</dt>
              <dd className="trust-ed-dl-desc">{flow.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="trust-ed-tabpanel-footnote">
          <p className="trust-ed-tabpanel-footnote-title">
            {activeTab.complianceNoteTitle}
          </p>
          <p className="trust-ed-tabpanel-footnote-body">
            {activeTab.complianceNote}
          </p>
        </div>
      </div>
    </div>
  );
}
