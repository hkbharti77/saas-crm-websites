import React from 'react';
import ComparisonPageTemplate from '../components/ComparisonPageTemplate';
import { competitorComparisons } from '../data/competitorComparisons';

export default function ZohoComparePage() {
  return <ComparisonPageTemplate data={competitorComparisons.zoho} />;
}
