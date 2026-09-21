import Link from "next/link";
import { formatReportDate, type ReportSection } from "@/lib/reports";

/** Card grid linking to each report in the given sections. */
export function ReportList({ sections }: { sections: ReportSection[] }) {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.slug}>
          <h2 className="font-display text-h3 text-ink">{section.label}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.reports.map((r) => (
              <Link
                key={r.slug}
                href={`/reports/${section.slug}/${r.slug}/`}
                className="group flex flex-col border border-border-subtle bg-surface p-6 transition-colors hover:border-accent/60"
              >
                <p className="text-eyebrow uppercase tracking-[0.16em] text-accent">
                  {r.label}
                </p>
                <p className="mt-2 font-display text-h3 text-ink">{r.title}</p>
                <p className="mt-2 text-body text-ink-muted">{r.summary}</p>
                <p className="mt-auto pt-4 text-caption text-ink-faint">
                  {formatReportDate(r.date)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
