import { Navbar } from "@/components/navbar";
import { Countdown } from "@/components/countdown";
import { WaitlistForm } from "@/components/waitlist-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FairwayHeroBg } from "@/components/fairway-hero-bg";
import { GolfField } from "@/components/golf-field";
import { WhatsComing } from "@/components/whats-coming";
import { SocialLinks } from "@/components/social-links";
import { CategoryStrip } from "@/components/category-strip";
import { ProblemAnswer } from "@/components/problem-answer";
import { LaunchingFirst } from "@/components/launching-first";
import { RoadAhead } from "@/components/road-ahead";
import { PartnerEcosystem } from "@/components/partner-ecosystem";
import { FoundingTeam } from "@/components/founding-team";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div
      id="top"
      className="relative flex min-h-full flex-col overflow-hidden bg-background text-ink"
    >
      <GolfField />
      <Navbar />
      <SocialLinks />

      <main className="relative flex-1">
        {/* Hero - full-bleed, auto-rotating photo carousel behind the transparent navbar. */}
        <section
          id="course"
          className="relative flex min-h-screen flex-col justify-end overflow-hidden"
        >
          <FairwayHeroBg />

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center sm:px-6 sm:pt-32">
            <ScrollReveal y={12}>
              <p className="text-eyebrow uppercase tracking-[0.3em] text-[color:var(--color-ink-on-photo)]/80">
                The front door to golf
              </p>
            </ScrollReveal>
            <ScrollReveal y={18} delay={0.08}>
              <h1 className="mt-4 max-w-3xl font-display text-display font-medium leading-[1.04] text-[color:var(--color-ink-on-photo)] text-balance">
                Everything golf. One clubhouse.
              </h1>
            </ScrollReveal>
            <ScrollReveal y={14} delay={0.14}>
              <p className="mt-5 max-w-xl text-body-lg text-[color:var(--color-ink-on-photo)]/85">
                Discover products, compare your options, and find the brands,
                people and experiences that make your game better - all in one
                place.
              </p>
            </ScrollReveal>
          </div>

          {/* Floating widget bar - countdown + waitlist, boxed like a booking bar */}
          <ScrollReveal
            y={24}
            delay={0.2}
            className="relative z-10 px-3 pb-8 sm:px-8 sm:pb-14"
          >
            <div className="mx-auto flex max-w-4xl flex-col divide-y divide-[color:var(--color-hairline-on-photo)] border border-[color:var(--color-hairline-on-photo)] bg-brand-green/40 backdrop-blur-md sm:flex-row sm:divide-x sm:divide-y-0">
              <div className="flex-1 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-on-photo)]/70">
                  Launching in
                </p>
                <div className="mt-2 [&_span]:text-[color:var(--color-ink-on-photo)] [&_span.block]:text-2xl sm:[&_span.block]:text-3xl">
                  <Countdown />
                </div>
              </div>
              <div
                id="waitlist"
                className="scroll-mt-32 px-4 py-4 sm:flex-[1.4] sm:px-6 sm:py-5"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-on-photo)]/70">
                  Be first to know when we launch
                </p>
                <div className="mt-2 [&_input]:border-[color:var(--color-hairline-on-photo)] [&_input]:bg-transparent [&_input]:text-[color:var(--color-ink-on-photo)] [&_input]:placeholder:text-[color:var(--color-ink-on-photo)]/50 [&_p]:text-[color:var(--color-ink-on-photo)]/70">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ProblemAnswer />

        <LaunchingFirst />

        <CategoryStrip />

        <WhatsComing />

        <RoadAhead />

        <div className="mx-auto grid max-w-7xl gap-x-4 lg:grid-cols-2">
          <PartnerEcosystem />
          <FoundingTeam />
        </div>
      </main>

      <Footer />
    </div>
  );
}
