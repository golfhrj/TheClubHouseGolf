import { describe, expect, it } from "vitest";
import {
  REPORT_SECTIONS,
  findReport,
  formatReportDate,
} from "../../src/lib/reports";

describe("formatReportDate()", () => {
  it("formats a full date", () => {
    expect(formatReportDate("2026-09-20")).toBe("20 September 2026");
  });

  it("formats a month-only date without a day", () => {
    expect(formatReportDate("2026-09")).toBe("September 2026");
  });
});

describe("report registry", () => {
  it("finds reports by section and slug", () => {
    expect(findReport("marketing", "strategy")?.report.title).toBe(
      "Clubhouse Golf Marketing Strategy Report V2 - Sept 20 2026",
    );
    expect(
      findReport("marketing", "demographics-device-mix")?.report.label,
    ).toBe("Demographics · Device Mix");
    expect(findReport("marketing", "nope")).toBeUndefined();
    expect(findReport("nope", "strategy")).toBeUndefined();
  });

  it("has unique slugs, valid dates, and files under public/reports/<section>", () => {
    const sections = REPORT_SECTIONS.map((s) => s.slug);
    expect(new Set(sections).size).toBe(sections.length);
    for (const s of REPORT_SECTIONS) {
      const slugs = s.reports.map((r) => r.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const r of s.reports) {
        expect(r.file).toMatch(
          new RegExp(`^/reports/${s.slug}/[\\w.-]+\\.html$`),
        );
        expect(r.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
      }
    }
  });
});
