import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportFrame } from "@/components/reports/report-frame";
import { REPORT_SECTIONS, findReport, formatReportDate } from "@/lib/reports";
import { asset } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return REPORT_SECTIONS.flatMap((s) =>
    s.reports.map((r) => ({ section: s.slug, report: r.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/reports/[section]/[report]">): Promise<Metadata> {
  const { section, report } = await params;
  const found = findReport(section, report);
  if (!found) return { title: "Reports" };
  return {
    title: `${found.report.title} - ${found.section.label}`,
    description: found.report.summary,
  };
}

export default async function ReportPage({
  params,
}: PageProps<"/reports/[section]/[report]">) {
  const { section: sectionSlug, report: reportSlug } = await params;
  const found = findReport(sectionSlug, reportSlug);
  if (!found) notFound();
  const { report } = found;
  const src = asset(report.file);

  return (
    <article className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-caption text-ink-faint">
            {formatReportDate(report.date)}
          </p>
          <h2 className="mt-1 font-display text-h2 text-ink">{report.title}</h2>
          <p className="mt-2 max-w-2xl text-body text-ink-muted">
            {report.summary}
          </p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border border-border px-4 py-2 text-caption font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Open full screen ↗
        </a>
      </div>

      <div className="mt-6">
        <ReportFrame src={src} title={report.title} />
      </div>
    </article>
  );
}
