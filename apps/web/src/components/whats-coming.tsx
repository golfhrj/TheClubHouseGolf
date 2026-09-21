import { ScrollReveal } from "@/components/scroll-reveal";

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M7 8V6a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="4"
        y="8"
        width="16"
        height="12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M4 20V10M11 20V4M18 20v-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M7 4h10v5a5 5 0 0 1-10 0V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5A3.5 3.5 0 0 1 16.5 11"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 14v4M9 21h6M9 21c0-1.7 1.3-3 3-3s3 1.3 3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle
        cx="17"
        cy="9.5"
        r="2.3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 20c.6-3.4 2.9-5.5 5.5-5.5s4.9 2.1 5.5 5.5M14.5 20c.4-2.5 1.9-4.2 4-4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PILLARS = [
  {
    title: "Shop",
    body: "Products, equipment, apparel, technology, new + used.",
    icon: <BagIcon />,
  },
  {
    title: "Improve",
    body: "Coaching, fittings, training, performance and recommendations.",
    icon: <ChartIcon />,
  },
  {
    title: "Play",
    body: "Courses, tee times, tournaments, leagues and competitions.",
    icon: <TrophyIcon />,
  },
  {
    title: "Experience",
    body: "Travel, events, activations and golf experiences.",
    icon: <PinIcon />,
  },
  {
    title: "Community",
    body: "Golfers, brands, creators, coaches, courses and local communities.",
    icon: <PeopleIcon />,
  },
];

export function WhatsComing() {
  return (
    <section
      id="whats-coming"
      className="relative mx-auto max-w-5xl scroll-mt-32 px-4 py-20 sm:px-10 sm:py-28"
    >
      <ScrollReveal className="text-center">
        <p className="text-eyebrow uppercase tracking-widest text-accent">
          Long-term vision
        </p>
        <h2 className="mt-4 font-display text-h1 text-ink text-balance">
          The goal isn&apos;t to own every part of golf. It&apos;s to connect
          it.
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5 sm:gap-6">
        {PILLARS.map((p, i) => {
          const isLastOdd =
            PILLARS.length % 2 === 1 && i === PILLARS.length - 1;
          return (
            <ScrollReveal
              key={p.title}
              delay={i * 0.06}
              className={`text-center ${isLastOdd ? "col-span-2 mx-auto w-1/2 min-w-[9rem] sm:col-span-1 sm:mx-0 sm:w-auto" : ""}`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
                <div className="h-5 w-5">{p.icon}</div>
              </div>
              <h3 className="mt-3 font-display text-h3 text-ink">{p.title}</h3>
              <p className="mt-1.5 text-caption text-ink-muted">{p.body}</p>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
