import { ScrollReveal } from "@/components/scroll-reveal";

const SCATTERED = [
  "Equipment",
  "Apparel",
  "Used clubs",
  "Training",
  "Courses",
  "Coaches",
  "Travel",
  "Technology",
  "Events",
  "Communities",
];

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
function ExperienceIcon() {
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
    title: "Discover",
    body: "Find products, brands, services, people and experiences.",
    icon: <DiscoverIcon />,
  },
  {
    title: "Decide",
    body: "Compare options and get smarter, more personalized recommendations.",
    icon: <DecideIcon />,
  },
  {
    title: "Experience",
    body: "Connect with more of the game - coaches, courses, events, travel, community.",
    icon: <ExperienceIcon />,
  },
];

/** Dashed flight-path arrow connecting problem -> answer, matching the
 *  site's golf-shot motif elsewhere. Horizontal on desktop, vertical on
 *  mobile (two separate SVGs so it always reads left-to-right / top-down). */
function ConnectorArrow() {
  return (
    <>
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="hidden h-full w-16 shrink-0 self-stretch text-accent lg:block"
        aria-hidden="true"
      >
        <line
          x1="2"
          y1="10"
          x2="88"
          y2="10"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
        <path d="M84 4 L96 10 L84 16 Z" fill="currentColor" opacity="0.7" />
      </svg>
      <svg
        viewBox="0 0 20 60"
        preserveAspectRatio="none"
        className="mx-auto block h-16 w-8 text-accent lg:hidden"
        aria-hidden="true"
      >
        <line
          x1="10"
          y1="2"
          x2="10"
          y2="48"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
        <path d="M4 44 L10 56 L16 44 Z" fill="currentColor" opacity="0.7" />
      </svg>
    </>
  );
}

export function ProblemAnswer() {
  return (
    <section className="relative mx-auto max-w-6xl scroll-mt-32 px-4 py-20 sm:px-10 sm:py-28">
      <div className="flex flex-col items-stretch lg:flex-row">
        {/* The problem */}
        <ScrollReveal className="flex-1 text-center lg:text-left">
          <p className="text-eyebrow uppercase tracking-widest text-accent">
            The problem
          </p>
          <h2 className="mt-4 font-display text-h1 text-ink text-balance">
            Golf is scattered everywhere.
          </h2>
          <p className="mt-6 text-body text-ink-muted">
            {SCATTERED.map((item, i) => (
              <span key={item}>
                {item}
                {i < SCATTERED.length - 1 && (
                  <span className="mx-1.5 text-ink-faint">·</span>
                )}
              </span>
            ))}
          </p>
          <p className="mt-4 text-body text-ink-muted">
            All disconnected - so golfers end up bouncing between brands,
            retailers, websites and apps just to get started.
          </p>
          <p className="mt-8 font-display text-h3 italic text-ink text-balance">
            Golf doesn&apos;t need another store.
            <br />
            It needs one place to start.
          </p>
        </ScrollReveal>

        <ConnectorArrow />

        {/* The Clubhouse answer */}
        <ScrollReveal delay={0.1} className="flex-1 text-center lg:text-left">
          <p className="text-eyebrow uppercase tracking-widest text-accent">
            The Clubhouse answer
          </p>
          <h2 className="mt-4 font-display text-h1 text-ink text-balance">
            Built around the golfer, not one retailer.
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex items-start justify-center gap-4 lg:justify-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                  <div className="h-5 w-5">{p.icon}</div>
                </div>
                <div className="text-left">
                  <h3 className="font-display text-h3 text-ink">{p.title}</h3>
                  <p className="mt-1 text-body text-ink-muted">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-display text-h3 italic text-ink text-balance">
            Whatever you need for your game, start at Clubhouse.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
