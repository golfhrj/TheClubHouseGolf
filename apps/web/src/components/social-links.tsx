const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/clubhouse-golf-co/posts/?feedView=all",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <rect x="3" y="9" width="4" height="12" fill="currentColor" />
        <circle cx="5" cy="4.5" r="2.3" fill="currentColor" />
        <path
          d="M11 9h4v2.1c.7-1.4 2.1-2.4 4.1-2.4 3.3 0 4.9 2 4.9 5.8V21h-4v-6c0-1.7-.6-2.9-2.2-2.9-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V21h-4V9Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/clubhousegolfco_/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@clubhousegolfco",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
        <path
          d="M15.5 3.5c.4 2.3 2 3.9 4.3 4.1v3.1c-1.5.1-2.9-.4-4.3-1.3v6.3c0 3.3-2.6 5.8-5.9 5.8-3.2 0-5.8-2.5-5.8-5.8 0-3.2 2.6-5.7 5.8-5.7.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.5 0-2.7 1.2-2.7 2.6 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.2 2.8-2.7V3.5h3.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

/** Fixed bottom-right social cluster, present across the whole site at all times. */
export function SocialLinks() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-2.5">
      <p className="max-w-[9rem] text-right text-[0.62rem] uppercase leading-tight tracking-[0.1em] text-ink-muted sm:max-w-[11rem] sm:text-[0.65rem]">
        Live updates before launch, on our socials
      </p>
      <div className="flex items-center gap-2 sm:gap-2.5">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="flex h-11 w-11 items-center justify-center border border-border-subtle bg-background/70 text-ink-muted backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent sm:h-12 sm:w-12"
          >
            {l.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
