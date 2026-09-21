import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReportTabs } from "@/components/reports/report-tabs";
import { REPORT_SECTIONS } from "@/lib/reports";

export const metadata: Metadata = {
  // A plain string here would stop the root "%s | Clubhouse Golf" template
  // reaching the section and report pages below.
  title: { default: "Reports", template: "%s | Clubhouse Golf" },
  description: "Clubhouse Golf reports.",
};

export default function ReportsLayout({ children }: LayoutProps<"/reports">) {
  return (
    <div className="flex min-h-full flex-col bg-background text-ink">
      <Navbar solid />

      <main className="relative flex-1 px-4 pb-16 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-accent">
            Clubhouse Golf
          </p>
          <h1 className="mt-2 font-display text-h1 text-ink">Reports</h1>

          <div className="mt-6">
            <ReportTabs
              label="Report sections"
              level="section"
              tabs={REPORT_SECTIONS.map((s) => ({
                label: s.label,
                href: `/reports/${s.slug}/`,
              }))}
            />
          </div>

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
