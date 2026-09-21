import { ScrollReveal } from "@/components/scroll-reveal";

const PARTNERS = [
  { title: "Brands", body: "Reach golfers in a place built for discovery." },
  {
    title: "Courses",
    body: "Connect with players looking for somewhere to play.",
  },
  {
    title: "Coaches & pros",
    body: "Help golfers find the right people to improve their game.",
  },
  {
    title: "Creators",
    body: "Bring trusted voices and content into the Clubhouse.",
  },
  {
    title: "Local golf",
    body: "Give great local businesses a bigger platform.",
  },
  { title: "Golfers", body: "One place to access more of the game." },
];

export function PartnerEcosystem() {
  return (
    <section className="relative scroll-mt-32 px-4 py-20 sm:px-10 sm:py-28">
      <ScrollReveal className="text-center">
        <p className="text-eyebrow uppercase tracking-widest text-accent">
          Partner ecosystem
        </p>
        <h2 className="mt-4 font-display text-h1 text-ink text-balance">
          We&apos;re on everyone&apos;s team.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body text-ink-muted">
          Clubhouse wins by helping golfers discover great businesses, products,
          people and experiences - not by trying to replace them.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
        {PARTNERS.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.05} className="text-center">
            <h3 className="font-display text-h3 text-ink">{p.title}</h3>
            <p className="mt-1.5 text-caption text-ink-muted">{p.body}</p>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3} className="mt-12 text-center">
        <a
          href="#contact"
          className="inline-block border border-accent bg-accent px-6 py-3 text-caption font-semibold uppercase tracking-wide text-[#1A1508] transition-colors hover:bg-accent-hover"
        >
          Partner with Clubhouse
        </a>
      </ScrollReveal>
    </section>
  );
}
