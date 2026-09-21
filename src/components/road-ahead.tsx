import { ScrollReveal } from "@/components/scroll-reveal";
import { FlagIcon } from "@/components/golf-field";

// The long-term roadmap, kept light on purpose (this isn't the full feature
// list - just the shape of where Clubhouse is headed), reimagined as a
// golf-course routing map: a fairway line running hole-to-hole with a ball
// traveling the course.
const MILESTONES = [
  {
    hole: "01",
    title: "Foundation",
    subtitle: "Discover. Compare. Shop. - Fall 2026",
  },
  {
    hole: "02",
    title: "Personalization",
    subtitle: "Smarter recommendations, member profiles, coaching connections",
  },
  {
    hole: "03",
    title: "Complete Clubhouse",
    subtitle: "Courses, travel, tournaments and community",
  },
];

// Three waypoints in a 0-100 x 0-40 coordinate space - a gentle rise and
// fall, like a shot arcing down the fairway toward the green.
const POINTS = [
  { x: 8, y: 30 },
  { x: 50, y: 8 },
  { x: 92, y: 30 },
];

function buildPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const PATH_D = buildPath(POINTS);

export function RoadAhead() {
  return (
    <section
      id="road-ahead"
      className="relative overflow-hidden bg-[#0a0b0b] py-20 sm:py-28"
    >
      {/* Mowing-stripe texture, echoing the hero fairway */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(245,241,231,0.6) 0px, rgba(245,241,231,0.6) 2px, transparent 2px, transparent 90px)",
        }}
        aria-hidden="true"
      />
      {/* Faint contour rings, echoing the site-wide GolfField watermark */}
      <svg
        className="pointer-events-none absolute -right-32 -top-40 h-[36rem] w-[36rem] opacity-[0.06] sm:-right-20"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="190" stroke="#F5F1E7" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" stroke="#F5F1E7" strokeWidth="1" />
        <circle cx="200" cy="200" r="70" stroke="#C49A43" strokeWidth="1" />
      </svg>

      <ScrollReveal className="relative text-center">
        <p className="text-eyebrow uppercase tracking-[0.3em] text-accent">
          The road ahead
        </p>
        <h2 className="mt-4 font-display text-h1 text-[#f5f1e7] text-balance">
          Building the Clubhouse, one hole at a time.
        </h2>
      </ScrollReveal>

      {/* Desktop / tablet - routing-map zigzag with a traveling ball */}
      <div className="relative mt-14 hidden px-6 sm:block sm:h-[420px] sm:px-10 lg:h-[460px]">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            id="road-path"
            d={PATH_D}
            fill="none"
            stroke="#f5f1e7"
            strokeOpacity="0.22"
            strokeWidth="0.35"
            strokeDasharray="0.6 1.6"
            strokeLinecap="round"
          />
          {/* Traveling ball - animateMotion moves it exactly along road-path,
              in the same coordinate space, so it never drifts off the line
              regardless of how the SVG gets stretched to fill the section. */}
          <circle r="1" fill="#C49A43">
            <animateMotion dur="14s" repeatCount="indefinite" path={PATH_D} />
          </circle>
          <circle r="1" fill="#C49A43" opacity="0.35">
            <animate
              attributeName="r"
              values="1;2.6;1"
              dur="14s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.35;0;0.35"
              dur="14s"
              repeatCount="indefinite"
            />
            <animateMotion dur="14s" repeatCount="indefinite" path={PATH_D} />
          </circle>
        </svg>

        {POINTS.map((p, i) => {
          const m = MILESTONES[i];
          const labelBelow = p.y < 20;
          return (
            <div
              key={m.hole}
              className="road-marker absolute flex flex-col items-center text-center"
              style={{
                left: `${p.x}%`,
                top: `${(p.y / 40) * 100}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              {!labelBelow && (
                <div className="mb-3 w-[150px] lg:w-[170px]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#f5f1e7]">
                    {m.title}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-[#f5f1e7]/50">
                    {m.subtitle}
                  </p>
                </div>
              )}

              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-[#0a0b0b] text-accent shadow-[0_0_0_4px_rgba(10,11,11,1)]">
                <FlagIcon className="h-5 w-5" />
                <span className="absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent font-mono text-[0.6rem] font-semibold text-[#0a0b0b]">
                  {m.hole}
                </span>
              </div>

              {labelBelow && (
                <div className="mt-3 w-[150px] lg:w-[170px]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#f5f1e7]">
                    {m.title}
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-snug text-[#f5f1e7]/50">
                    {m.subtitle}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile - vertical scorecard, still hole-numbered and flagged */}
      <div className="relative mt-12 space-y-0 px-6 sm:hidden">
        {MILESTONES.map((m, i) => (
          <ScrollReveal
            key={m.hole}
            delay={i * 0.06}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent">
                <FlagIcon className="h-4 w-4" />
              </div>
              {i < MILESTONES.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-gradient-to-b from-[#f5f1e7]/25 to-transparent" />
              )}
            </div>
            <div className="pt-1.5">
              <p className="font-mono text-[0.65rem] text-accent">
                Hole {m.hole}
              </p>
              <p className="mt-0.5 text-body font-semibold uppercase tracking-wide text-[#f5f1e7]">
                {m.title}
              </p>
              <p className="mt-1 text-caption text-[#f5f1e7]/50">
                {m.subtitle}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
