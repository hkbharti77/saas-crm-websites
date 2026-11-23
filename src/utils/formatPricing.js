/**
 * Shared pricing format helpers that dynamically render single- and dual-currency
 * (INR / USD) values across Engineering Partnerships, SaaS Plans, Add-ons, and
 * individual Plan Detail pages.
 */

function isValidAmount(value) {
  return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value));
}

/**
 * Formats a single currency amount using locale-appropriate digit grouping.
 * - INR uses Indian numbering format (e.g. ₹24,999, ₹1,00,000)
 * - USD uses standard US grouping (e.g. $299, $1,200)
 */
export function formatCurrencyAmount(amount, currency = 'INR') {
  if (!isValidAmount(amount)) return null;
  const numeric = Number(amount);
  if (currency === 'INR') {
    return `₹${numeric.toLocaleString('en-IN')}`;
  }
  return `$${numeric.toLocaleString('en-US')}`;
}

/**
 * Formats an INR + USD price pair into a unified dual-currency string
 * such as "₹24,999 / $299" or falls back cleanly for custom-scoped tiers.
 */
export function formatDualCurrencyPrice(
  priceInr,
  priceUsd,
  { separator = ' / ', fallback = 'Custom' } = {}
) {
  const formattedInr = formatCurrencyAmount(priceInr, 'INR');
  const formattedUsd = formatCurrencyAmount(priceUsd, 'USD');

  if (formattedInr && formattedUsd) {
    return `${formattedInr}${separator}${formattedUsd}`;
  }
  if (formattedInr) return formattedInr;
  if (formattedUsd) return formattedUsd;
  return fallback;
}

/**
 * Resolves and formats a SaaS plan's monthly or yearly price object
 * ({ monthlyInr, yearlyInr, monthlyUsd, yearlyUsd }) as a dual-currency string.
 */
export function formatPlanDualPrice(price, billing = 'monthly', options = {}) {
  if (!price) {
    return options.fallback ?? 'Custom';
  }
  const inr = billing === 'yearly' ? price.yearlyInr : price.monthlyInr;
  const usd = billing === 'yearly' ? price.yearlyUsd : price.monthlyUsd;
  return formatDualCurrencyPrice(inr, usd, options);
}

/**
 * Computes formatted dual-currency annual total and annual savings for a SaaS plan.
 */
export function formatPlanYearlyTotals(price) {
  if (!price) return { annualTotal: null, annualSavings: null, hasSavings: false };

  const annualInr = isValidAmount(price.yearlyInr) ? Number(price.yearlyInr) * 12 : null;
  const annualUsd = isValidAmount(price.yearlyUsd) ? Number(price.yearlyUsd) * 12 : null;
  const savingsInr =
    isValidAmount(price.monthlyInr) && isValidAmount(price.yearlyInr)
      ? Math.max(0, (Number(price.monthlyInr) - Number(price.yearlyInr)) * 12)
      : null;
  const savingsUsd =
    isValidAmount(price.monthlyUsd) && isValidAmount(price.yearlyUsd)
      ? Math.max(0, (Number(price.monthlyUsd) - Number(price.yearlyUsd)) * 12)
      : null;

  const hasSavings = Boolean((savingsInr && savingsInr > 0) || (savingsUsd && savingsUsd > 0));

  return {
    annualTotal: formatDualCurrencyPrice(annualInr, annualUsd, { fallback: null }),
    annualSavings: hasSavings
      ? formatDualCurrencyPrice(savingsInr, savingsUsd, { fallback: null })
      : null,
    hasSavings,
  };
}
