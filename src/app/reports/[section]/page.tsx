import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportList } from "@/components/reports/report-list";
import { REPORT_SECTIONS, findSection } from "@/lib/reports";

export const dynamicParams = false;

export function generateStaticParams() {
  return REPORT_SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/reports/[section]">): Promise<Metadata> {
  const section = findSection((await params).section);
  return { title: section ? `${section.label} reports` : "Reports" };
}

export default async function ReportSectionPage({
  params,
}: PageProps<"/reports/[section]">) {
  const section = findSection((await params).section);
  if (!section) notFound();
  return <ReportList sections={[section]} />;
}
