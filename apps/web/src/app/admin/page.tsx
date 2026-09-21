import { isAdminAuthed } from "@/lib/require-admin";
import { listWaitlist } from "@/lib/waitlist-store";
import { listContactMessages } from "@/lib/contact-store";
import {
  dailySeries,
  domainBreakdown,
  sourceBreakdown,
  waitlistMetrics,
} from "@/lib/metrics";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminLoginForm } from "./login-form";

export const dynamic = "force-dynamic";

const MONTH_LABEL = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

function StatCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "border border-accent bg-accent p-6"
          : "border border-border-subtle bg-surface p-6"
      }
    >
      <p
        className={`text-caption uppercase tracking-wide ${
          highlight ? "text-[#1A1508]/70" : "text-ink-faint"
        }`}
      >
        {label}
      </p>
      <p className={`mt-2 font-mono text-h1 ${highlight ? "text-[#1A1508]" : "text-ink"}`}>
        {value}
      </p>
      {hint && (
        <p className={`mt-1 text-caption ${highlight ? "text-[#1A1508]/70" : "text-ink-faint"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    return <AdminLoginForm />;
  }

  const [entries, messages] = await Promise.all([listWaitlist(), listContactMessages()]);
  const m = waitlistMetrics(entries);
  const series = dailySeries(entries, 14);
  const sources = sourceBreakdown(entries);
  const domains = domainBreakdown(entries);
  const maxDaily = Math.max(1, ...series.map((d) => d.count));

  const activity = [
    ...entries.map((e) => ({
      type: "signup" as const,
      title: e.email,
      detail: `Joined the waitlist via ${e.source}`,
      at: e.createdAt,
    })),
    ...messages.map((msg) => ({
      type: "message" as const,
      title: msg.name,
      detail: msg.message.length > 80 ? `${msg.message.slice(0, 80)}...` : msg.message,
      at: msg.createdAt,
    })),
  ]
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 8);

  return (
    <AdminShell messageCount={messages.length}>
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-h1 text-ink text-balance">Good to see you.</p>
        <p className="mt-2 text-body text-ink-muted">Studio activity for {MONTH_LABEL}.</p>

        {/* Primary stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total signups" value={String(m.total)} hint="All time" highlight />
          <StatCard label="Today" value={String(m.today)} />
          <StatCard
            label="Last 7 days"
            value={String(m.last7Days)}
            hint={
              m.weekOverWeekChange === null
                ? undefined
                : `${m.weekOverWeekChange >= 0 ? "+" : ""}${m.weekOverWeekChange}% vs prior week`
            }
          />
          <StatCard label="Last 30 days" value={String(m.last30Days)} />
        </div>

        {/* Secondary stats */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard label="Avg. signups / day" value={String(m.avgPerDay)} />
          <StatCard label="Contact messages" value={String(messages.length)} />
          <div className="border border-border-subtle bg-surface p-6">
            <p className="text-caption uppercase tracking-wide text-ink-faint">Email sending</p>
            <p className="mt-2 text-body font-medium text-ink">
              {process.env.RESEND_API_KEY ? (
                <span className="text-success">Resend connected</span>
              ) : (
                <span className="text-warning">Not configured</span>
              )}
            </p>
            <p className="mt-1 text-caption text-ink-faint">
              {process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}
            </p>
          </div>
        </div>

        {/* Daily activity chart */}
        <div className="mt-10">
          <h2 className="text-h3 text-ink">Signups, last 14 days</h2>
          <div className="mt-4 flex h-40 items-end gap-1.5 border border-border-subtle bg-surface p-6 sm:gap-2.5">
            {series.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full bg-accent transition-all"
                  style={{ height: `${Math.max(4, (d.count / maxDaily) * 96)}px` }}
                  title={`${d.label}: ${d.count}`}
                />
                <span className="hidden text-[0.6rem] text-ink-faint sm:block">
                  {d.label.split(" ")[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdowns */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-h3 text-ink">By source</h2>
            <div className="mt-4 flex flex-col gap-2">
              {sources.length === 0 && (
                <p className="text-caption text-ink-faint">No data yet.</p>
              )}
              {sources.map((s) => (
                <div
                  key={s.source}
                  className="flex items-center justify-between border border-border-subtle bg-surface px-4 py-3"
                >
                  <span className="text-body text-ink">{s.source}</span>
                  <span className="font-mono text-body text-ink-muted">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-h3 text-ink">Top email domains</h2>
            <div className="mt-4 flex flex-col gap-2">
              {domains.length === 0 && (
                <p className="text-caption text-ink-faint">No data yet.</p>
              )}
              {domains.map((d) => (
                <div
                  key={d.domain}
                  className="flex items-center justify-between border border-border-subtle bg-surface px-4 py-3"
                >
                  <span className="text-body text-ink">{d.domain}</span>
                  <span className="font-mono text-body text-ink-muted">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-10">
          <h2 className="text-h3 text-ink">Recent activity</h2>
          <div className="mt-4 border border-border-subtle bg-surface">
            {activity.length === 0 && (
              <p className="px-4 py-8 text-center text-caption text-ink-faint">
                Nothing yet.
              </p>
            )}
            {activity.map((a, i) => (
              <div
                key={`${a.type}-${a.at}-${i}`}
                className="flex items-start justify-between gap-4 border-b border-border-subtle px-4 py-3 last:border-0"
              >
                <div>
                  <p className="text-body text-ink">
                    <span
                      className={`mr-2 inline-block px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide ${
                        a.type === "signup"
                          ? "bg-accent-subtle text-accent"
                          : "bg-brand-sage/20 text-brand-sage"
                      }`}
                    >
                      {a.type === "signup" ? "Signup" : "Message"}
                    </span>
                    {a.title}
                  </p>
                  <p className="mt-1 text-caption text-ink-muted">{a.detail}</p>
                </div>
                <p className="shrink-0 whitespace-nowrap text-caption text-ink-faint">
                  {new Date(a.at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full waitlist */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-h3 text-ink">All entries</h2>
          <a
            href="/api/admin/export"
            className="border border-border px-4 py-2 text-caption font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Export CSV
          </a>
        </div>

        <div className="mt-4 overflow-x-auto border border-border-subtle">
          <table className="w-full min-w-[480px] text-left text-body">
            <thead>
              <tr className="border-b border-border-subtle bg-surface text-caption uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-ink-faint">
                    No signups yet.
                  </td>
                </tr>
              )}
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-border-subtle last:border-0">
                  <td className="px-4 py-3 text-ink">{e.email}</td>
                  <td className="px-4 py-3 text-ink-muted">{e.source}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {new Date(e.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
