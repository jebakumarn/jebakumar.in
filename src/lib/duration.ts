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

interface Ymd {
  years: number;
  months: number;
  days: number;
}

/**
 * Exact calendar difference between two dates as years/months/days, borrowing
 * from real month lengths (so e.g. 29 Nov 2021 → 30 Apr 2026 = 4y 5m 1d).
 */
function calendarDiff(from: Date, to: Date): Ymd {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    // Days in the month preceding `to` (handles year wrap automatically).
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}

/** Join a y/m/d breakdown, dropping any leading zero parts ("3 months 4 days"). */
function joinYmd({ years, months, days }: Ymd, { padZeros = false } = {}): string {
  const parts: string[] = [];
  if (years || padZeros) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (months || padZeros || years) parts.push(`${months} month${months === 1 ? '' : 's'}`);
  parts.push(`${days} day${days === 1 ? '' : 's'}`);
  return parts.join(' ');
}

/** "4 yrs 2 mos" / "8 mos" for a single role (compact; used where space is tight). */
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

/** Exact "4 years 5 months 1 day" tenure for a single role (drops zero leads). */
export function formatTenureFull(start: string, end: string | null): string {
  return joinYmd(calendarDiff(parse(start), end ? parse(end) : new Date()));
}

/** "May 2026" style label; "Present" when end is null. */
export function formatRange(start: string, end: string | null): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  const s = parse(start).toLocaleDateString('en-US', opts);
  const e = end ? parse(end).toLocaleDateString('en-US', opts) : 'Present';
  return `${s} — ${e}`;
}

/** "29 Nov 2021 — 30 Apr 2026" full-date label; "Present" when end is null. */
export function formatRangeFull(start: string, end: string | null): string {
  const fmt = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const mon = d.toLocaleDateString('en-US', { month: 'short' });
    return `${day} ${mon} ${d.getFullYear()}`;
  };
  const s = fmt(parse(start));
  const e = end ? fmt(parse(end)) : 'Present';
  return `${s} — ${e}`;
}

/**
 * Total professional experience summed across roles by actual tenure (so
 * employment gaps aren't counted). Each role is measured as an exact calendar
 * diff, then the parts are summed and rolled up (30-day months, 12-month years).
 */
function totalExperienceParts(roles: Experience[]): Ymd {
  let years = 0;
  let months = 0;
  let days = 0;
  for (const r of roles) {
    const d = calendarDiff(parse(r.start), r.end ? parse(r.end) : new Date());
    years += d.years;
    months += d.months;
    days += d.days;
  }
  months += Math.floor(days / 30);
  days %= 30;
  years += Math.floor(months / 12);
  months %= 12;
  return { years, months, days };
}

/** Whole-year total, e.g. "10 years" (concise; used in the homepage hero). */
export function totalExperience(roles: Experience[]): string {
  const { years } = totalExperienceParts(roles);
  return `${years} year${years === 1 ? '' : 's'}`;
}

/** Detailed total, e.g. "10 years, 7 months, 27 days" (used in about.md). */
export function totalExperienceDetailed(roles: Experience[]): string {
  const parts = totalExperienceParts(roles);
  return joinYmd(parts, { padZeros: true }).replace(/ (?=\d)/g, ', ');
}
