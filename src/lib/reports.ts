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
  /** When the report was produced: "YYYY-MM-DD", or "YYYY-MM" if only the month is known. */
  date: string;
  /** Optional key facts shown with the report, e.g. who it was prepared for. */
  details?: { label: string; value: string }[];
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
        title: "Clubhouse Golf Marketing Strategy Report V2 - Sept 20 2026",
        summary:
          "Product marketing context and the full competitive landscape - 10 direct and 5 indirect competitors - in one document.",
        date: "2026-09-20",
        file: "/reports/marketing/strategy-report-v2-2026-09-20.html",
      },
      {
        slug: "demographics-device-mix",
        label: "Demographics · Device Mix",
        title: "Demographics · Device Mix",
        summary:
          "Who's buying golf gear, where they buy it, and which phone is in their hand when they do - carded for the Clubhouse Golf app build.",
        date: "2026-09",
        details: [
          { label: "Prepared for", value: "Clubhouse Golf (chgolfco)" },
          { label: "Carded", value: "September 2026" },
          { label: "Holes played", value: "3 + the 19th" },
        ],
        file: "/reports/marketing/demographics-device-mix-2026-09.html",
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

/** "2026-09-20" -> "20 September 2026"; "2026-09" -> "September 2026". */
export function formatReportDate(date: string): string {
  const monthOnly = /^\d{4}-\d{2}$/.test(date);
  return new Date(
    `${monthOnly ? `${date}-01` : date}T00:00:00Z`,
  ).toLocaleDateString("en-GB", {
    ...(monthOnly ? {} : { day: "numeric" as const }),
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
