import { BrandMark } from "@/components/brand-mark";
import { SOCIAL_LINKS } from "@/components/social-links";

const CONTACT_EMAIL = "hello@chgolfco.com";

const CURRENT_YEAR = new Date().getFullYear();

const EXPLORE_LINKS = [
  { label: "The Course", href: "#course" },
  { label: "Shop", href: "#catalogue" },
  { label: "What's Coming", href: "#whats-coming" },
  { label: "The Team", href: "#team" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <div id="contact" className="scroll-mt-32">
            <h3 className="font-display text-h3 text-ink">Contact us</h3>
            <p className="mt-3 text-body text-ink-muted">
              Questions before we launch? We&apos;re reading every message.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block border border-accent bg-accent px-4 py-2.5 text-caption font-semibold uppercase tracking-wide text-[#1A1508] transition-colors hover:bg-accent-hover"
            >
              Email us
            </a>
            <p className="mt-3 text-caption text-ink-muted">{CONTACT_EMAIL}</p>
          </div>

          <div>
            <h3 className="font-display text-h3 text-ink">Explore</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-body text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-h3 text-ink">Follow along</h3>
            <p className="mt-3 text-body text-ink-muted">
              Launch news and updates, first on our socials.
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border-subtle pt-10">
          <span className="flex items-center gap-2 font-display text-body font-medium uppercase tracking-[0.14em] text-ink">
            <BrandMark className="h-5 w-5" />
            Clubhouse Golf
          </span>
          <p className="text-caption text-ink-faint">
            © {CURRENT_YEAR} Clubhouse Golf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
