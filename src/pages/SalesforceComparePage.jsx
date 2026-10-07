import React from 'react';
import ComparisonPageTemplate from '../components/ComparisonPageTemplate';
import { competitorComparisons } from '../data/competitorComparisons';

export default function SalesforceComparePage() {
  return <ComparisonPageTemplate data={competitorComparisons.salesforce} />;
}
