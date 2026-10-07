import React from 'react';
import ComparisonPageTemplate from '../components/ComparisonPageTemplate';
import { competitorComparisons } from '../data/competitorComparisons';

export default function HubSpotComparePage() {
  return <ComparisonPageTemplate data={competitorComparisons.hubspot} />;
}
