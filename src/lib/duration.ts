// Date-range helpers for experience tenures + total career experience.
// Runs at build time (Astro/Node), so the site's "years of experience" refreshes
// on every deploy. This replaces the fragile per-page inline scripts on the old
// site, and — unlike the old total — counts every role, including the AMD stint.

import type { Experience } from '../data/experience';

/** Parse "YYYY", "YYYY-MM", or "YYYY-MM-DD" into a Date (first-of-month/year). */
function parse(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** Whole-month count between two dates (inclusive of the start month). */
function monthsBetween(start: Date, end: Date): number {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() >= start.getDate()) months += 1;
  return Math.max(0, months);
}

/** Human tenure like "4 yrs 2 mos" / "8 mos" for a single role. */
export function formatTenure(start: string, end: string | null): string {
  const from = parse(start);
  const to = end ? parse(end) : new Date();
  const total = monthsBetween(from, to);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '0 mos';
}

/** "May 2026" style label; "Present" when end is null. */
export function formatRange(start: string, end: string | null): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  const s = parse(start).toLocaleDateString('en-US', opts);
  const e = end ? parse(end).toLocaleDateString('en-US', opts) : 'Present';
  return `${s} — ${e}`;
}

/**
 * Total professional experience across all roles, summed by actual tenure
 * (so employment gaps aren't counted). Returned as whole years, e.g. "10 years".
 */
export function totalExperience(roles: Experience[]): string {
  const totalMonths = roles.reduce(
    (sum, r) => sum + monthsBetween(parse(r.start), r.end ? parse(r.end) : new Date()),
    0,
  );
  const years = Math.floor(totalMonths / 12);
  return `${years} year${years === 1 ? '' : 's'}`;
}
