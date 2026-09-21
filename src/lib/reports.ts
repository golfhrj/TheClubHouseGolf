/**
 * Every report shown under /reports. Adding one: drop the HTML file into
 * public/reports/<section>/ and add an entry below - the tabs and pages
 * are generated from this list.
 */
export type Report = {
  slug: string;
  /** Tab label. */
  label: string;
  title: string;
  summary: string;
  /** ISO date the report was produced. */
  date: string;
  /** Path under public/, passed through asset() when rendered. */
  file: string;
};

export type ReportSection = {
  slug: string;
  label: string;
  reports: Report[];
};

export const REPORT_SECTIONS: ReportSection[] = [
  {
    slug: "marketing",
    label: "Marketing",
    reports: [
      {
        slug: "strategy",
        label: "Strategy",
        title: "Marketing Strategy Report V2",
        summary:
          "Product marketing context and the full competitive landscape - 10 direct and 5 indirect competitors - in one document.",
        date: "2026-09-20",
        file: "/reports/marketing/strategy-report-v2-2026-09-20.html",
      },
    ],
  },
];

export function findSection(slug: string): ReportSection | undefined {
  return REPORT_SECTIONS.find((s) => s.slug === slug);
}

export function findReport(
  sectionSlug: string,
  reportSlug: string,
): { section: ReportSection; report: Report } | undefined {
  const section = findSection(sectionSlug);
  const report = section?.reports.find((r) => r.slug === reportSlug);
  return section && report ? { section, report } : undefined;
}

export function formatReportDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
