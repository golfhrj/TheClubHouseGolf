import { ScrollReveal } from "@/components/scroll-reveal";

function ShopIcon() {
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
function DiscoverIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <line
        x1="20"
        y1="20"
        x2="15.8"
        y2="15.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DecideIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M5 12h6M5 7h9M5 17h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 16l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Shop",
    icon: <ShopIcon />,
    items: ["Equipment", "Apparel", "Technology", "New + used clubs"],
  },
  {
    title: "Discover",
    icon: <DiscoverIcon />,
    items: ["Established brands", "Emerging brands", "Local businesses"],
  },
  {
    title: "Decide",
    icon: <DecideIcon />,
    items: ["Side-by-side options", "Buying guides", "Product comparisons"],
  },
];

export function LaunchingFirst() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b0b] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(245,241,231,0.6) 0px, rgba(245,241,231,0.6) 2px, transparent 2px, transparent 90px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl scroll-mt-32 px-4 text-center sm:px-10">
        <ScrollReveal>
          <p className="text-eyebrow uppercase tracking-widest text-accent">
            What we&apos;re launching first
          </p>
          <h2 className="mt-4 font-display text-h1 text-[#f5f1e7] text-balance">
            Start here.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-[#f5f1e7]/70">
            Our first job is simple: make golf easier to navigate.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-6">
          {COLUMNS.map((c, i) => {
            const isLastOdd =
              COLUMNS.length % 2 === 1 && i === COLUMNS.length - 1;
            return (
              <ScrollReveal
                key={c.title}
                delay={i * 0.08}
                className={`text-left ${isLastOdd ? "col-span-2 mx-auto w-1/2 min-w-[10rem] sm:col-span-1 sm:mx-0 sm:w-auto" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                    <div className="h-4.5 w-4.5">{c.icon}</div>
                  </div>
                  <h3 className="font-display text-h3 text-[#f5f1e7]">
                    {c.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-col gap-1.5 border-t border-[#f5f1e7]/15 pt-4">
                  {c.items.map((item) => (
                    <li key={item} className="text-caption text-[#f5f1e7]/65">
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
