import { ScrollReveal } from "@/components/scroll-reveal";
import { asset } from "@/lib/site";

const FOUNDER = {
  name: "Zach",
  title: "Founder, Clubhouse Golf",
  quote: "Why isn't there one place for all of this?",
  bio: "I'm a golfer, and I found myself constantly bouncing between websites - researching products, comparing clubs, looking for apparel, finding training tools, courses and experiences. That's what we're building: one place for all of it.",
  stats: [
    { value: "25+", label: "Years of golf" },
    { value: "1", label: "Mission" },
  ],
};

export function FoundingTeam() {
  return (
    <section
      id="team"
      className="relative scroll-mt-32 px-4 py-16 sm:px-10 sm:py-32"
    >
      <ScrollReveal className="text-center">
        <p className="text-eyebrow uppercase tracking-widest text-accent">
          The people
        </p>
        <h2 className="mt-4 font-display text-h1 text-ink text-balance">
          Meet the founder
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-10 sm:mt-12">
        <div className="overflow-hidden border border-border-subtle bg-surface shadow-card">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-eyebrow uppercase tracking-widest text-accent">
              Featured
            </p>
            <h3 className="mt-3 font-display text-h2 text-ink">
              {FOUNDER.name}
            </h3>
            <p className="mt-1 text-caption uppercase tracking-wide text-ink-faint">
              {FOUNDER.title}
            </p>
            <blockquote className="mt-4 border-l-2 border-accent/60 pl-4 font-display text-h3 italic text-ink text-balance">
              &ldquo;{FOUNDER.quote}&rdquo;
            </blockquote>
            <p className="mt-4 max-w-md text-body text-ink-muted">
              {FOUNDER.bio}
            </p>

            <div
              aria-label="Zach's signature"
              className="mt-4 h-9 w-[80px] bg-ink"
              style={{
                WebkitMaskImage: `url(${asset("/brand/zach-signature.svg")})`,
                maskImage: `url(${asset("/brand/zach-signature.svg")})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />

            <div className="mt-6 flex gap-8 border-t border-border-subtle pt-6">
              {FOUNDER.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-h3 text-ink">{s.value}</p>
                  <p className="text-caption text-ink-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
