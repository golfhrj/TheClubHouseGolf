import { ReportList } from "@/components/reports/report-list";
import { REPORT_SECTIONS } from "@/lib/reports";

export default function ReportsIndexPage() {
  return <ReportList sections={REPORT_SECTIONS} />;
}
