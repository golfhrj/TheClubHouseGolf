import { notFound } from "next/navigation";
import { ReportTabs } from "@/components/reports/report-tabs";
import { findSection } from "@/lib/reports";

export default async function ReportSectionLayout({
  children,
  params,
}: LayoutProps<"/reports/[section]">) {
  const section = findSection((await params).section);
  if (!section) notFound();

  return (
    <>
      <ReportTabs
        label={`${section.label} reports`}
        level="report"
        tabs={section.reports.map((r) => ({
          label: r.label,
          href: `/reports/${section.slug}/${r.slug}/`,
        }))}
      />
      {children}
    </>
  );
}
