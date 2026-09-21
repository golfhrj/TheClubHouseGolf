import { BrandMark } from "@/components/brand-mark";
import { WaitlistForm } from "@/components/waitlist-form";
import { ContactForm } from "@/components/contact-form";

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
            <div className="mt-4">
              <ContactForm />
            </div>
            <a
              href="mailto:hello@chgolfco.com"
              className="mt-3 inline-block text-caption font-medium text-accent transition-colors hover:text-accent-hover"
            >
              or email hello@chgolfco.com directly
            </a>
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
            <h3 className="font-display text-h3 text-ink">Stay in the loop</h3>
            <p className="mt-3 text-body text-ink-muted">
              We&apos;ll email you the moment the new site goes live.
            </p>
            <div className="mt-4">
              <WaitlistForm />
            </div>
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
