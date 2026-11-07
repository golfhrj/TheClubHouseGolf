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
        title: "Clubhouse Golf Marketing Strategy Report V3 - Sept 21 2026",
        summary:
          "Product marketing context and the full competitive landscape - 12 direct and 8 indirect competitors - updated for Phase 1's community and game-improvement scope.",
        date: "2026-09-21",
        file: "/reports/marketing/strategy-report-v3-2026-09-21.html",
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
      {
        slug: "membership",
        label: "Membership",
        title: "Membership Approach - Phase 1",
        summary:
          "Three membership models were on the table. This brief recommends one for 15 October - Founding Member, partner-funded, free - built as a badge and an account flag only.",
        date: "2026-09-22",
        details: [
          { label: "Decision by", value: "29 Sep (feature freeze)" },
          { label: "Recommends", value: "Founding Member - free" },
          { label: "Phase 1 build", value: "Badge + account flag only" },
        ],
        file: "/reports/marketing/membership-approach-2026-09-22.html",
      },
      {
        slug: "website-feedback",
        label: "Website Feedback",
        title: "Website Feedback Report",
        summary:
          "A red-teamed, live-tested review of chgolfco.com - the five fixes that deliver about 80% of the impact, the full section-by-section feedback with replacement copy, and an SEO audit of what must change before launch for the site to be indexed.",
        date: "2026-09-24",
        details: [
          { label: "Source", value: "www.chgolfco.com" },
          { label: "Top fixes", value: "5 changes, ~80% of impact" },
          { label: "Status", value: "Draft v6 - not approved" },
        ],
        file: "/reports/marketing/website-feedback-report-2026-09-24.html",
      },
      {
        slug: "rebrand-ideas",
        label: "REBRAND Ideas",
        title: "Rebrand Ideas",
        summary:
          "Four brand directions for Clubhouse Golf - Clubhouse Modern, Yardage Book, Sunday Sessions and Range Data - red-teamed against the brand voice and the live branding of 15 competitors and same-name businesses, with a launch recommendation.",
        date: "2026-09-30",
        details: [
          { label: "Directions", value: "4 concepts, 1 ruled out" },
          { label: "Launch risk", value: "Clubhouse Golf NYC lookalike" },
          { label: "Status", value: "Draft v2 - red-teamed" },
        ],
        file: "/reports/marketing/rebrand-ideas-2026-09-30.html",
      },
      {
        slug: "golfer-personas",
        label: "Golfer Personas",
        title: "Golfer Personas & Caddy AI Application",
        summary:
          "The golfer audience mapped end to end - the four core personas plus three new segments (Social, Equipment Enthusiast, Improver) and two overlays (Women, Gifters), each with a marketing-psychology lever and a Caddy AI behaviour pattern.",
        date: "2026-10-03",
        details: [
          { label: "Personas", value: "4 core + 3 new + 2 overlays" },
          { label: "Lenses", value: "Customer research + Marketing psychology" },
          { label: "Status", value: "Draft v1 - proxy-sourced" },
        ],
        file: "/reports/marketing/golfer-personas-caddy-ai-2026-10-03.html",
      },
      {
        slug: "revenue-conversation",
        label: "Revenue Conversation",
        title: "Revenue Conversation with the Founders",
        summary:
          "The blunt 90-day revenue brief, then every premise in it verified against the platform code and the affiliate networks' own payment terms. The conclusion holds - the next 90 days won't produce meaningful revenue - but the ordering, two of the numbers and one of the five recommendations don't survive.",
        date: "2026-11-01",
        details: [
          { label: "Window", value: "1 Nov 2026 - 30 Jan 2027" },
          { label: "Claims checked", value: "9 - 3 false or overstated" },
          { label: "Biggest gap", value: "Peak season missed by the plan" },
          { label: "Status", value: "Draft v1 - repo-sourced" },
        ],
        file: "/reports/marketing/revenue-conversation-2026-11-01.html",
      },
      {
        slug: "live-site-audit",
        label: "Live Site Audit",
        title: "Live Site Audit - chgolfco.com",
        summary:
          "A live walk-through of the launched site, then every finding re-tested before publication. Five P0 issues - no server-rendered content, one title tag on every page, a sitemap of eight legal URLs, uncrawlable product cards, and a strikethrough price above Callaway's own MSRP - plus the seven v1 findings that did not survive verification, retracted in full.",
        date: "2026-11-07",
        details: [
          { label: "Source", value: "www.chgolfco.com (live)" },
          { label: "Findings", value: "14 held - 7 retracted" },
          { label: "Worst metric", value: "LCP 24.1s mobile / 7.6s desktop" },
          { label: "Status", value: "Draft v2 - red-teamed" },
        ],
        file: "/reports/marketing/live-site-audit-2026-11-07.html",
      },
      {
        slug: "strategy-vs-shipped",
        label: "Strategy vs Shipped",
        title: "Strategy vs. Shipped",
        summary:
          "Strategy V3 named owned checkout as a Phase 1 requirement and warned that without it every item is a referral and the checkout promise is empty. Three weeks after launch that warning is the shipped product. Combines the gap analysis, a psychology layer for all nine golfer personas, and the instrumentation tickets that would let any of it be measured - each part red-teamed.",
        date: "2026-11-07",
        details: [
          { label: "Sources", value: "Live site + Strategy V3 + Personas + Site Audit" },
          { label: "Biggest gap", value: "Owned checkout never shipped" },
          { label: "Start with", value: "Equipment Enthusiast" },
          { label: "Status", value: "Draft v1 - red-teamed" },
        ],
        file: "/reports/marketing/strategy-vs-shipped-2026-11-07.html",
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
