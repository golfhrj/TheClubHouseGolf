"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LAUNCH = new Date("2026-10-15T00:00:00+05:30").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getRemaining() {
  const now = Date.now();
  const d = Math.max(0, LAUNCH - now);
  return {
    days: pad(Math.floor(d / 86400000)),
    hours: pad(Math.floor((d % 86400000) / 3600000)),
    mins: pad(Math.floor((d % 3600000) / 60000)),
    secs: pad(Math.floor((d % 60000) / 1000)),
  };
}

function Field({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
    );
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <div className="overflow-hidden">
        <span
          ref={ref}
          className="block font-mono text-4xl font-medium tabular-nums text-ink sm:text-5xl"
        >
          {value}
        </span>
      </div>
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  // Start at "00:00:00:00" on both server and first client render to avoid a
  // hydration mismatch (the real value depends on Date.now()); the effect
  // below fills it in immediately after mount.
  const [remaining, setRemaining] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  useEffect(() => {
    // Sync from Date.now() on mount, then every second — deliberately
    // sequenced after the pure server render above to avoid a hydration
    // mismatch, so the immediate set here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-6 sm:gap-10">
      <Field value={remaining.days} label="Days" />
      <Field value={remaining.hours} label="Hours" />
      <Field value={remaining.mins} label="Minutes" />
      <Field value={remaining.secs} label="Seconds" />
    </div>
  );
}
