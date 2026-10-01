"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { BrandMark } from "@/components/brand-mark";
import { Countdown } from "@/components/countdown";
import { FoundingTeam } from "@/components/founding-team";
import { PartnerEcosystem } from "@/components/partner-ecosystem";
import { ThemeToggle } from "@/components/theme-toggle";
import { asset } from "@/lib/site";
import {
  ArrowRight,
  BagIcon,
  BallIcon,
  CapIcon,
  CartIcon,
  ChartIcon,
  ChevronLeft,
  ChevronRight,
  ClubIcon,
  CompassIcon,
  FlagIcon,
  GloveIcon,
  GolfBagIcon,
  HomeIcon,
  PeopleIcon,
  PlaneIcon,
  RefreshIcon,
  ScaleIcon,
  ScreenIcon,
  SearchIcon,
  ShirtIcon,
  ShoeIcon,
  SparkIcon,
  StarIcon,
  TargetIcon,
  WrenchIcon,
} from "@/components/golfmerce/icons";

/*
 * The home page laid out the way golfmerce.com lays out its storefront:
 * sticky search header with icon tabs, a rounded hero card with a feature
 * strip, round category tiles, promo tiles, card carousels and a community
 * banner. Colours are the site's own tokens (whichever palette is active);
 * all copy is Clubhouse Golf's - no GolfMerce content or invented listings.
 */

const TABS = [
  { label: "Home", href: "/#course", section: "course", Icon: HomeIcon },
  { label: "Shop", href: "/#catalogue", section: "catalogue", Icon: BagIcon },
  {
    label: "What's Coming",
    href: "/#whats-coming",
    section: "whats-coming",
    Icon: SparkIcon,
  },
  { label: "The Team", href: "/#team", section: "team", Icon: PeopleIcon },
  { label: "Reports", href: "/reports/", section: null, Icon: ChartIcon },
] as const;

// Same list as the standard layout's category strip, with search keywords.
const CATEGORIES = [
  { label: "Drivers", Icon: ClubIcon, tags: "clubs woods" },
  { label: "Fairway Woods", Icon: ClubIcon, tags: "clubs" },
  { label: "Hybrids", Icon: ClubIcon, tags: "clubs rescue" },
  { label: "Irons & Sets", Icon: ClubIcon, tags: "clubs" },
  { label: "Wedges", Icon: ClubIcon, tags: "clubs short game" },
  { label: "Putters", Icon: ClubIcon, tags: "clubs putting" },
  { label: "Golf Balls", Icon: BallIcon, tags: "" },
  { label: "Golf Bags", Icon: GolfBagIcon, tags: "stand cart" },
  { label: "Push Carts & Trolleys", Icon: CartIcon, tags: "" },
  { label: "Apparel", Icon: ShirtIcon, tags: "clothing polo" },
  { label: "Footwear", Icon: ShoeIcon, tags: "shoes" },
  { label: "Gloves", Icon: GloveIcon, tags: "" },
  { label: "Headwear", Icon: CapIcon, tags: "hats caps" },
  { label: "Rangefinders & GPS", Icon: TargetIcon, tags: "technology tech" },
  { label: "Simulators", Icon: ScreenIcon, tags: "technology tech indoor" },
  { label: "Training Aids", Icon: FlagIcon, tags: "practice" },
  { label: "Club Fittings", Icon: WrenchIcon, tags: "services fitting" },
  {
    label: "Used & Trade-In Clubs",
    Icon: RefreshIcon,
    tags: "preowned second hand",
  },
  { label: "Junior Equipment", Icon: StarIcon, tags: "kids youth" },
  { label: "Travel Covers & Accessories", Icon: PlaneIcon, tags: "travel" },
];

const FEATURES = [
  {
    title: "Discover",
    body: "Products, brands, services, people and experiences.",
    Icon: CompassIcon,
  },
  {
    title: "Decide",
    body: "Compare options with smarter, personal picks.",
    Icon: ScaleIcon,
  },
  {
    title: "Shop",
    body: "Equipment, apparel and tech - new + used.",
    Icon: BagIcon,
  },
  {
    title: "Experience",
    body: "Coaches, courses, events, travel, community.",
    Icon: FlagIcon,
  },
];

const COMING = [
  {
    title: "Marketplace",
    pillar: "Shop",
    body: "Products, equipment, apparel, technology, new + used.",
    image: "whats-marketplace",
    status: "Launching 15 Oct",
  },
  {
    title: "Caddy AI",
    pillar: "Improve",
    body: "An AI caddie with recommendations for your game.",
    image: "whats-caddy-ai",
    status: "Coming soon",
  },
  {
    title: "Performance",
    pillar: "Improve",
    body: "Coaching, fittings, training and performance.",
    image: "whats-performance",
    status: "Coming soon",
  },
  {
    title: "Courses & tee times",
    pillar: "Play",
    body: "Courses, tee times, tournaments, leagues and competitions.",
    image: "whats-technology",
    status: "Coming soon",
  },
  {
    title: "Experiences",
    pillar: "Experience",
    body: "Travel, events, activations and golf experiences.",
    image: "whats-experiences",
    status: "Coming soon",
  },
  {
    title: "Community",
    pillar: "Community",
    body: "Golfers, brands, creators, coaches and local communities.",
    image: "whats-community",
    status: "Coming soon",
  },
  {
    title: "Memberships",
    pillar: "Community",
    body: "A members' community from every partner brand.",
    image: "whats-memberships",
    status: "Coming soon",
  },
];

const ROAD = [
  {
    phase: "Phase 01",
    title: "Foundation",
    body: "Discover. Compare. Shop. - Fall 2026",
    image: "hero-aerial-sunset",
  },
  {
    phase: "Phase 02",
    title: "Personalization",
    body: "Smarter recommendations, member profiles, coaching connections",
    image: "hero-course-sunset",
  },
  {
    phase: "Phase 03",
    title: "Complete Clubhouse",
    body: "Courses, travel, tournaments and community",
    image: "hero-treelined-fairway",
  },
];

const gm = (name: string) => asset(`/images/gm/${name}.webp`);

/* ---------- small building blocks ---------- */

function useCarousel() {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return { ref, edges, scroll, update };
}

function ArrowButtons({
  label,
  edges,
  scroll,
}: {
  label: string;
  edges: { start: boolean; end: boolean };
  scroll: (dir: -1 | 1) => void;
}) {
  const cls =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink";
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        className={cls}
        onClick={() => scroll(-1)}
        disabled={edges.start}
        aria-label={`Scroll ${label} back`}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className={cls}
        onClick={() => scroll(1)}
        disabled={edges.end}
        aria-label={`Scroll ${label} forward`}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function SectionHead({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]">
          {title}
        </h2>
        {sub && <p className="mt-1 text-body text-ink-muted">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

const SHELL = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10";
const BTN =
  "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-caption font-semibold transition-colors sm:text-body";

/* ---------- header ---------- */

function SearchBox({
  query,
  onQuery,
  className = "",
}: {
  query: string;
  onQuery: (q: string) => void;
  className?: string;
}) {
  const id = useId();
  function submit(e: FormEvent) {
    e.preventDefault();
    document.getElementById("catalogue")?.scrollIntoView({ block: "start" });
  }
  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex h-11 items-center rounded-full border border-border bg-surface pl-4 pr-1 focus-within:border-accent ${className}`}
    >
      <label className="sr-only" htmlFor={id}>
        Search categories
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search clubs, bags, apparel..."
        className="min-w-0 flex-1 bg-transparent text-[16px] text-ink placeholder:text-ink-faint focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Show matching categories"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta text-cta-ink hover:bg-cta-hover"
      >
        <SearchIcon className="h-4.5 w-4.5" />
      </button>
    </form>
  );
}

function Tabs({
  active,
  compact = false,
}: {
  active: string;
  compact?: boolean;
}) {
  return (
    <nav aria-label="Main">
      <ul
        className={`flex ${compact ? "scrollbar-hide gap-1 overflow-x-auto px-2" : "items-stretch"}`}
      >
        {TABS.map(({ label, href, section, Icon }) => {
          const on = section === active;
          return (
            <li key={label} className="shrink-0">
              <Link
                href={href}
                aria-current={on ? "location" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 text-[0.72rem] font-medium transition-colors xl:px-4 ${
                  compact ? "h-14" : "h-[72px]"
                } ${on ? "text-accent" : "text-ink-muted hover:text-ink"}`}
              >
                <Icon className="h-5 w-5" />
                <span className="whitespace-nowrap">{label}</span>
                {on && (
                  <span
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function GmHeader({
  query,
  onQuery,
  active,
}: {
  query: string;
  onQuery: (q: string) => void;
  active: string;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-md">
        <div
          className={`${SHELL} flex h-16 items-center gap-4 lg:h-[72px] lg:gap-6`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 text-ink">
            <BrandMark className="h-7 w-7" />
            <span className="font-logo text-[0.8rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.95rem]">
              Clubhouse Golf
            </span>
          </Link>
          <SearchBox
            query={query}
            onQuery={onQuery}
            className="hidden flex-1 md:flex lg:max-w-sm"
          />
          <div className="hidden flex-1 justify-center lg:flex">
            <Tabs active={active} />
          </div>
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <ThemeToggle className="opacity-90 transition-opacity hover:opacity-100" />
            <Link
              href="/#contact"
              className={`${BTN} bg-cta text-cta-ink hover:bg-cta-hover`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>
      {/* Phones and tablets: search and tabs sit under the bar and scroll away. */}
      <div className="border-b border-border-subtle bg-background lg:hidden">
        <div className={`${SHELL} pt-3 md:hidden`}>
          <SearchBox query={query} onQuery={onQuery} className="flex" />
        </div>
        <Tabs active={active} compact />
      </div>
    </>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section id="course" className={`${SHELL} scroll-mt-24 pt-4 sm:pt-6`}>
      <div className="relative overflow-hidden rounded-[20px] bg-brand-green text-[color:var(--color-ink-on-photo)]">
        <Image
          src={gm("hero-golden-fairway")}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/85 to-brand-green/40 lg:bg-gradient-to-r lg:from-brand-green lg:via-brand-green/80 lg:to-brand-green/10" />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:p-12">
          <div>
            <p className="text-eyebrow uppercase opacity-85">
              The front door to golf
            </p>
            <h1 className="mt-3 font-display text-[2.4rem] leading-[1.02] sm:text-[3.25rem] lg:text-[3.75rem]">
              Everything golf.
              <span className="block text-highlight">One clubhouse.</span>
            </h1>
            <p className="mt-4 text-[1.15rem] font-bold opacity-90 sm:text-[1.3rem]">
              Discover. Compare. Shop.
            </p>
            <p className="mt-3 max-w-lg text-body opacity-85 sm:text-body-lg">
              Find the products, brands, people and experiences that make your
              game better - all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className={`${BTN} bg-accent-fill text-on-accent-fill hover:bg-accent-fill-hover`}
              >
                Get in touch
              </Link>
              <Link
                href="/#whats-coming"
                className={`${BTN} border border-[color:var(--color-hairline-on-photo)] hover:bg-white/10`}
              >
                See what&apos;s coming
              </Link>
            </div>
          </div>

          <div className="self-start lg:justify-self-end">
            <div className="rounded-2xl border border-[color:var(--color-hairline-on-photo)] bg-brand-green/55 px-5 py-4 backdrop-blur-md">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] opacity-80">
                Launching in
              </p>
              <div className="mt-2 [&_span]:text-[color:var(--color-ink-on-photo)] [&_span.block]:text-2xl sm:[&_span.block]:text-3xl">
                <Countdown />
              </div>
            </div>
          </div>
        </div>

        <ul className="relative mx-6 mb-6 grid grid-cols-2 gap-4 rounded-2xl border border-[color:var(--color-hairline-on-photo)] bg-brand-green/55 p-4 backdrop-blur-md sm:mx-10 sm:mb-10 sm:grid-cols-2 lg:mx-12 lg:mb-12 lg:grid-cols-4 lg:p-5">
          {FEATURES.map(({ title, body, Icon }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-ink-on-photo)]/10 text-highlight">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-body font-bold">{title}</span>
                {/* Titles only on phones, so the hero stays compact. */}
                <span className="hidden text-caption opacity-80 sm:block">
                  {body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Categories({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  const q = query.trim().toLowerCase();
  const shown = q
    ? CATEGORIES.filter((c) => `${c.label} ${c.tags}`.toLowerCase().includes(q))
    : CATEGORIES;
  const { ref, edges, scroll, update } = useCarousel();
  useEffect(update, [shown.length, update]);

  return (
    <section
      id="catalogue"
      className={`${SHELL} scroll-mt-24`}
      aria-labelledby="gm-cat-title"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2
            id="gm-cat-title"
            className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]"
          >
            Shop by Category
          </h2>
          <p className="mt-1 text-body text-ink-muted" aria-live="polite">
            {q ? (
              <>
                {shown.length} of {CATEGORIES.length} categories match &ldquo;
                {query.trim()}&rdquo;.{" "}
                <button
                  type="button"
                  onClick={onClear}
                  className="font-semibold text-accent underline underline-offset-2"
                >
                  Clear
                </button>
              </>
            ) : (
              "Everything we'll carry when the shop opens on 15 October."
            )}
          </p>
        </div>
        <ArrowButtons label="categories" edges={edges} scroll={scroll} />
      </div>

      {shown.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-background px-5 py-8 text-center text-body text-ink-muted">
          Nothing matches yet - try &ldquo;putter&rdquo;, &ldquo;shoes&rdquo; or
          &ldquo;GPS&rdquo;.
        </p>
      ) : (
        <ul
          ref={ref}
          className="scrollbar-hide -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 sm:gap-5"
        >
          {shown.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex w-24 shrink-0 snap-start flex-col items-center gap-2 text-center sm:w-28"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-border-subtle bg-background text-accent shadow-sm sm:h-24 sm:w-24">
                <Icon className="h-8 w-8" />
              </span>
              <span className="text-caption font-medium text-ink">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PromoTiles() {
  return (
    <section className={SHELL} aria-labelledby="gm-first-title">
      <div className="mb-5">
        <h2
          id="gm-first-title"
          className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]"
        >
          Launching first
        </h2>
        <p className="mt-1 text-body text-ink-muted">
          Our first job is simple: make golf easier to navigate.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="relative flex min-h-[240px] overflow-hidden rounded-[20px] bg-brand-green text-[color:var(--color-ink-on-photo)]">
          <Image
            src={gm("cat-irons-bag")}
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green/85 to-brand-green/30" />
          <div className="relative flex max-w-sm flex-col justify-center p-6 sm:p-8">
            <p className="text-eyebrow uppercase text-highlight">Shop</p>
            <h3 className="mt-2 font-display text-[1.6rem] leading-tight">
              New + used, all in one place
            </h3>
            <p className="mt-2 text-body opacity-85">
              Equipment, apparel and technology, plus new and used clubs.
            </p>
            <Link
              href="/#contact"
              className={`${BTN} mt-5 self-start border border-[color:var(--color-hairline-on-photo)] hover:bg-white/10`}
            >
              Get early access
            </Link>
          </div>
        </article>

        <article className="relative flex min-h-[240px] overflow-hidden rounded-[20px] border border-border-subtle bg-background">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:max-w-[60%] sm:p-8">
            <p className="text-eyebrow uppercase text-accent">Discover</p>
            <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-ink">
              Brands you know - and ones you don&apos;t yet
            </h3>
            <p className="mt-2 text-body text-ink-muted">
              Established brands, emerging brands and local businesses.
            </p>
            <Link
              href="/#whats-coming"
              className={`${BTN} mt-5 self-start bg-cta text-cta-ink hover:bg-cta-hover`}
            >
              See what&apos;s coming
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 hidden w-[40%] sm:block">
            <Image
              src={gm("cat-golf-balls")}
              alt=""
              fill
              sizes="(min-width: 1024px) 240px, 40vw"
              className="object-cover"
            />
          </div>
        </article>

        <article className="relative flex min-h-[200px] overflow-hidden rounded-[20px] bg-brand-green text-[color:var(--color-ink-on-photo)] lg:col-span-2">
          <Image
            src={gm("lifestyle-woodland")}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green/80 to-brand-green/10" />
          <div className="relative flex w-full flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-lg">
              <p className="text-eyebrow uppercase text-highlight">Decide</p>
              <h3 className="mt-2 font-display text-[1.6rem] leading-tight">
                Compare before you buy
              </h3>
              <p className="mt-2 text-body opacity-85">
                Side-by-side options, buying guides and product comparisons.
              </p>
            </div>
            <Link
              href="/#contact"
              className={`${BTN} shrink-0 self-start bg-accent-fill text-on-accent-fill hover:bg-accent-fill-hover sm:self-center`}
            >
              Get in touch
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

function ComingCarousel() {
  const { ref, edges, scroll } = useCarousel();
  return (
    <section id="whats-coming" className={`${SHELL} scroll-mt-24`}>
      <SectionHead
        title="What's Coming"
        sub="The goal isn't to own every part of golf. It's to connect it."
      >
        <ArrowButtons label="what's coming" edges={edges} scroll={scroll} />
      </SectionHead>
      <ul
        ref={ref}
        className="scrollbar-hide -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2"
      >
        {COMING.map((c) => (
          <li
            key={c.title}
            className="w-[220px] shrink-0 snap-start rounded-2xl border border-border-subtle bg-background p-2.5 shadow-sm sm:w-[250px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-high">
              <Image
                src={gm(c.image)}
                alt=""
                fill
                sizes="250px"
                className="object-cover object-top"
              />
            </div>
            <div className="px-1.5 pb-1 pt-3">
              <p className="text-caption text-ink-muted">{c.pillar}</p>
              <h3 className="mt-0.5 text-body font-bold text-ink">{c.title}</h3>
              <p className="mt-1 line-clamp-2 text-caption text-ink-muted">
                {c.body}
              </p>
              <p className="mt-2 text-caption font-bold text-accent">
                {c.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RoadAheadCards() {
  return (
    <section className={SHELL} aria-labelledby="gm-road-title">
      <div className="mb-5">
        <h2
          id="gm-road-title"
          className="font-display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]"
        >
          The Road Ahead
        </h2>
        <p className="mt-1 text-body text-ink-muted">
          The shape of where Clubhouse is headed.
        </p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-3">
        {ROAD.map((r) => (
          <li
            key={r.title}
            className="relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[20px] bg-night text-on-night"
          >
            <Image
              src={gm(r.image)}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/15" />
            <div className="relative p-5">
              <span className="inline-block rounded-full border border-on-night/30 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-highlight">
                {r.phase}
              </span>
              <h3 className="mt-3 font-display text-[1.4rem] leading-tight">
                {r.title}
              </h3>
              <p className="mt-1 text-caption text-on-night/85">{r.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CommunityBanner() {
  return (
    <section className={SHELL} aria-labelledby="gm-join-title">
      <div className="relative overflow-hidden rounded-[20px] bg-brand-green text-[color:var(--color-ink-on-photo)]">
        <Image
          src={gm("hero-treelined-fairway")}
          alt=""
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green/85 to-brand-green/20" />
        <div className="relative flex flex-col gap-5 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="gm-join-title"
              className="font-display text-[1.75rem] leading-tight sm:text-[2.25rem]"
            >
              Join the Clubhouse
            </h2>
            <p className="mt-2 max-w-md text-body opacity-85 sm:text-body-lg">
              Founding members launch 15 October 2026. Be the first through the
              door.
            </p>
          </div>
          <Link
            href="/#contact"
            className={`${BTN} shrink-0 self-start bg-accent-fill text-on-accent-fill hover:bg-accent-fill-hover lg:self-center`}
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export function GolfmerceHome() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("course");

  // Highlight the tab for whichever section is mid-screen.
  useEffect(() => {
    const ids = TABS.flatMap((t) => (t.section ? [t.section] : []));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-1 flex-col bg-surface">
      <GmHeader query={query} onQuery={setQuery} active={active} />
      <main className="relative flex flex-1 flex-col gap-12 pb-4 sm:gap-16">
        <Hero />
        <Categories query={query} onClear={() => setQuery("")} />
        <PromoTiles />
        <ComingCarousel />
        <RoadAheadCards />
        <CommunityBanner />
        <div className="mx-auto grid w-full max-w-7xl gap-x-4 lg:grid-cols-2">
          <PartnerEcosystem />
          <FoundingTeam />
        </div>
      </main>
    </div>
  );
}
