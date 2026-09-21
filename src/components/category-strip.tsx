// Everything the marketplace will carry - clubs, apparel, tech, and services.
const CATEGORIES = [
  "Drivers",
  "Fairway Woods",
  "Hybrids",
  "Irons & Sets",
  "Wedges",
  "Putters",
  "Golf Balls",
  "Golf Bags",
  "Push Carts & Trolleys",
  "Apparel",
  "Footwear",
  "Gloves",
  "Headwear",
  "Rangefinders & GPS",
  "Simulators",
  "Training Aids",
  "Club Fittings",
  "Used & Trade-In Clubs",
  "Junior Equipment",
  "Travel Covers & Accessories",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap border border-border bg-background px-3.5 py-2 text-[0.76rem] font-medium text-ink-muted shadow-sm transition-colors hover:border-accent/60 hover:text-ink sm:px-5 sm:py-2.5 sm:text-body">
      {label}
    </span>
  );
}

/** Continuous auto-scrolling marquee, one line, all breakpoints - never wraps. */
export function CategoryStrip() {
  return (
    <section
      id="catalogue"
      className="relative scroll-mt-32 overflow-hidden border-y border-border-subtle bg-surface py-5 sm:py-7"
    >
      <p className="mb-3 px-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-accent sm:mb-4 sm:text-caption">
        Everything golf. One clubhouse.
      </p>
      <div className="marquee-track flex w-max items-center gap-2.5 px-4 sm:gap-3.5 sm:px-10">
        {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
          <Pill key={`${c}-${i}`} label={c} />
        ))}
      </div>
      {/* Edge fades so the marquee reads as continuous, not clipped */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent sm:w-24" />
    </section>
  );
}
