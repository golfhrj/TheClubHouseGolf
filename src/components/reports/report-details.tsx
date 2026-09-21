import type { Report } from "@/lib/reports";

/** Key facts about a report ("Prepared for", "Carded", ...) as a label/value list. */
export function ReportDetails({
  details,
  className,
}: {
  details: NonNullable<Report["details"]>;
  className?: string;
}) {
  return (
    <dl className={`flex flex-wrap gap-x-8 gap-y-3 ${className ?? ""}`}>
      {details.map((d) => (
        <div key={d.label} className="flex flex-col gap-0.5">
          <dt className="text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
            {d.label}
          </dt>
          <dd className="text-caption font-semibold text-ink">{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}
