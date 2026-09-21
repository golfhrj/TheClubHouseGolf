"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; href: string };

/**
 * A row of navigation tabs for the Reports area. The active tab is derived
 * from the URL, so each level (section, report) only needs its own links.
 */
export function ReportTabs({
  label,
  tabs,
  level,
}: {
  label: string;
  tabs: Tab[];
  level: "section" | "report";
}) {
  const pathname = usePathname();
  const primary = level === "section";

  return (
    <nav
      aria-label={label}
      className={`flex gap-1 overflow-x-auto ${
        primary ? "border-b border-border-subtle" : "mt-4"
      }`}
    >
      {tabs.map((t) => {
        const active = pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={
              primary
                ? `-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-caption font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-muted hover:text-ink"
                  }`
                : `whitespace-nowrap border px-3.5 py-1.5 text-caption font-medium transition-colors ${
                    active
                      ? "border-accent bg-accent text-cta-ink"
                      : "border-border-subtle text-ink-muted hover:border-accent/60 hover:text-ink"
                  }`
            }
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
