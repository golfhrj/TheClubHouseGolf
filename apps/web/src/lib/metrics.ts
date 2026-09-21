import type { WaitlistEntry } from "@/lib/waitlist-store";

const DAY_MS = 24 * 60 * 60 * 1000;

function withinDays(iso: string, days: number, now: number): boolean {
  return now - new Date(iso).getTime() < days * DAY_MS;
}

/** Percentage change from `previous` to `current`, rounded to a whole number. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 100);
}

export function waitlistMetrics(entries: WaitlistEntry[], now: number = Date.now()) {
  const today = entries.filter((e) => withinDays(e.createdAt, 1, now)).length;
  const last7Days = entries.filter((e) => withinDays(e.createdAt, 7, now)).length;
  const prev7Days =
    entries.filter((e) => withinDays(e.createdAt, 14, now)).length - last7Days;
  const last30Days = entries.filter((e) => withinDays(e.createdAt, 30, now)).length;

  const oldestMs = entries.length
    ? Math.min(...entries.map((e) => new Date(e.createdAt).getTime()))
    : now;
  const ageDays = Math.max(1, Math.ceil((now - oldestMs) / DAY_MS));
  const avgPerDay = entries.length ? Math.round((entries.length / ageDays) * 10) / 10 : 0;

  return {
    total: entries.length,
    today,
    last7Days,
    last30Days,
    weekOverWeekChange: percentChange(last7Days, prev7Days),
    avgPerDay,
  };
}

/** Signups per day for the last `days` days, oldest first - for a bar chart. */
export function dailySeries(
  entries: WaitlistEntry[],
  days = 14,
  now: number = Date.now(),
): { date: string; label: string; count: number }[] {
  const buckets = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * DAY_MS);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const e of entries) {
    const key = e.createdAt.slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries()).map(([date, count]) => ({
    date,
    label: new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    count,
  }));
}

/** Counts grouped by `source`, largest first. */
export function sourceBreakdown(entries: WaitlistEntry[]): { source: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    counts.set(e.source, (counts.get(e.source) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

/** Top email domains, largest first. */
export function domainBreakdown(entries: WaitlistEntry[], limit = 5): { domain: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const domain = e.email.split("@")[1]?.toLowerCase() ?? "unknown";
    counts.set(domain, (counts.get(domain) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
