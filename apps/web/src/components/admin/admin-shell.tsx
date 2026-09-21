"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { LogoutButton } from "@/app/admin/logout-button";

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="7.5"
        height="7.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="13"
        y="3.5"
        width="7.5"
        height="7.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="3.5"
        y="13"
        width="7.5"
        height="7.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="13"
        y="13"
        width="7.5"
        height="7.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 6.5 12 13l8.5-6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M4 12h16M4 18h10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 20c.6-3.4 2.9-5.5 5.5-5.5s4.9 2.1 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx="17"
        cy="9.5"
        r="2.3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path
        d="M3.5 8 12 4l8.5 4-8.5 4-8.5-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 8v8l8.5 4 8.5-4V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 12v8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LIVE_NAV = [
  { label: "Dashboard", href: "/admin", icon: <GridIcon /> },
  { label: "Messages", href: "/admin/messages", icon: <MailIcon /> },
  { label: "Product Feed", href: "/admin/product-feed", icon: <BoxIcon /> },
];

// Genuine roadmap items - shown so the shell reads complete, but disabled
// rather than linking anywhere, since these features don't exist yet.
const SOON_NAV = [
  { label: "Bookings", icon: <ListIcon /> },
  { label: "Payments", icon: <CardIcon /> },
  { label: "Members", icon: <PeopleIcon /> },
];

function SidebarContent({ messageCount }: { messageCount?: number }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-brand-green">
      <div className="px-6 pb-6 pt-7">
        <div className="flex items-center gap-2.5">
          <BrandMark className="h-7 w-7 text-accent" />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F1E7]">
            Clubhouse Golf
          </span>
        </div>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F1E7]/50">
          Control Panel
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        <p className="px-2 text-[0.65rem] uppercase tracking-[0.16em] text-[#F5F1E7]/40">
          Operations
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {LIVE_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 text-caption font-semibold transition-colors ${
                    active
                      ? "bg-accent text-[#1A1508]"
                      : "text-[#F5F1E7]/75 hover:bg-[#F5F1E7]/5 hover:text-[#F5F1E7]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.label === "Messages" && !!messageCount && (
                    <span
                      className={`px-1.5 py-0.5 text-[0.65rem] font-bold ${
                        active
                          ? "bg-[#1A1508] text-accent"
                          : "bg-accent text-[#1A1508]"
                      }`}
                    >
                      {messageCount}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-2 text-[0.65rem] uppercase tracking-[0.16em] text-[#F5F1E7]/40">
          Coming soon
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {SOON_NAV.map((item) => (
            <li key={item.label}>
              <span className="flex cursor-not-allowed items-center gap-3 px-3 py-2.5 text-caption text-[#F5F1E7]/35">
                {item.icon}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-[#F5F1E7]/10 p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center bg-accent text-caption font-bold text-[#1A1508]">
            A
          </div>
          <div className="leading-tight">
            <p className="text-caption font-medium text-[#F5F1E7]">Admin</p>
            <p className="text-[0.65rem] uppercase tracking-wide text-[#F5F1E7]/45">
              Owner
            </p>
          </div>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block px-2 py-1.5 text-caption text-[#F5F1E7]/70 transition-colors hover:text-[#F5F1E7]"
        >
          View live site
        </a>
        <div className="mt-1 px-2">
          <LogoutButton className="w-full py-1.5 text-left text-caption text-[#F5F1E7]/70 transition-colors hover:text-[#F5F1E7]" />
        </div>
      </div>
    </div>
  );
}

export function AdminShell({
  children,
  messageCount,
}: {
  children: ReactNode;
  /** Total contact messages, shown as a badge next to "Messages" in the nav. */
  messageCount?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-brand-green px-4 py-3.5 lg:hidden">
        <div className="flex items-center gap-2">
          <BrandMark className="h-5 w-5 text-accent" />
          <span className="font-display text-caption font-semibold uppercase tracking-[0.12em] text-[#F5F1E7]">
            Clubhouse Golf
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-[#F5F1E7]"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-raised">
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[#F5F1E7]/80"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="h-[calc(100%-52px)]">
              <SidebarContent messageCount={messageCount} />
            </div>
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <div className="fixed h-screen w-64">
            <SidebarContent messageCount={messageCount} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
