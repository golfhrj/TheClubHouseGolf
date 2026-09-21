"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// A tee-to-hole arc, in a 0-100 x 0-65 coordinate space - the ball rises off
// the tee, peaks mid-flight, and drops into the hole on the right.
const PATH_D = "M 8 56 Q 46 10 90 46";
const HOLE = { x: 90, y: 46 };
const START_DELAY_MS = 200;
const TRAVEL_MS = 1700;
const TOTAL_MS = START_DELAY_MS + TRAVEL_MS;
export const LOADER_SESSION_KEY = "chg-loader-shown";

/**
 * A one-time-per-session, full-screen golf intro: a ball flies a curved
 * path into the hole while a percentage counts up in lockstep with it, then
 * the hole "opens" - a circular mask growing from the hole's exact screen
 * position - to reveal the site underneath.
 *
 * Always rendered in the initial HTML (no client-only mount gate) so it
 * paints before hydration, with zero flash of the page underneath - a
 * beforeInteractive script (see layout.tsx) sets data-loader-skip on <html>
 * before first paint if this session already played it, and CSS hides this
 * overlay instantly for that case.
 */
export function SiteLoader() {
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dropped, setDropped] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ballMotionRef = useRef<SVGAnimateMotionElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.documentElement.hasAttribute("data-loader-skip")) {
      // CSS already hides the overlay instantly via that same attribute;
      // this just detaches it from the React tree once hydrated.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(false);
      return;
    }

    sessionStorage.setItem(LOADER_SESSION_KEY, "1");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setActive(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    let timer: ReturnType<typeof setTimeout>;

    // The ball's SMIL animateMotion is set to begin="indefinite" and kicked
    // off here, from the exact same clock as the percentage tick below.
    // Rendering this overlay unconditionally in the SSR HTML (so there's no
    // flash of the page underneath) means a declarative `begin="200ms"`
    // would otherwise start the ball moving as soon as the raw HTML parses -
    // well before hydration and before this effect's own timer starts -
    // leaving it frozen at the hole, "stuck", while the percentage (which
    // starts later) slowly catches up.
    const ballStartTimer = setTimeout(() => {
      ballMotionRef.current?.beginElement();
    }, START_DELAY_MS);

    // setTimeout rather than requestAnimationFrame - rAF fully stops in
    // backgrounded tabs, which would leave the site permanently hidden
    // (body overflow stuck, loader never resolving) if the tab loses focus
    // mid-intro.
    function tick() {
      const elapsed = performance.now() - start;
      const travelElapsed = Math.max(0, elapsed - START_DELAY_MS);
      setProgress(Math.min(100, Math.round((travelElapsed / TRAVEL_MS) * 100)));
      if (elapsed < TOTAL_MS) {
        timer = setTimeout(tick, 30);
      } else {
        setDropped(true);
      }
    }
    tick();

    // Hard safety net: whatever else happens (a stalled tween, a browser
    // that throttles timers harder than expected), never leave the site
    // permanently hidden behind the overlay with scroll locked.
    const safety = setTimeout(() => {
      document.body.style.overflow = "";
      setActive(false);
    }, TOTAL_MS + 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safety);
      clearTimeout(ballStartTimer);
    };
  }, []);

  useEffect(() => {
    if (!dropped) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const maxR = Math.hypot(window.innerWidth, window.innerHeight);
    const cx = `${HOLE.x}%`;
    const cy = `${HOLE.y}%`;
    const state = { r: 0 };

    const applyMask = () => {
      const mask = `radial-gradient(circle at ${cx} ${cy}, transparent 0, transparent ${state.r}px, black ${state.r + 2}px, black 100%)`;
      overlay.style.maskImage = mask;
      overlay.style.webkitMaskImage = mask;
    };
    applyMask();

    const tween = gsap.to(state, {
      r: maxR,
      duration: 0.85,
      delay: 0.3,
      ease: "power3.inOut",
      onUpdate: applyMask,
      onComplete: () => {
        document.body.style.overflow = "";
        setActive(false);
      },
    });

    return () => {
      tween.kill();
    };
  }, [dropped]);

  function skip() {
    document.body.style.overflow = "";
    setActive(false);
  }

  return (
    <div
      ref={overlayRef}
      id="site-loader"
      data-active={active ? "1" : "0"}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0b0b] data-[active=0]:hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(245,241,231,0.6) 0px, rgba(245,241,231,0.6) 2px, transparent 2px, transparent 90px)",
        }}
      />

      <svg
        viewBox="0 0 100 65"
        preserveAspectRatio="xMidYMid meet"
        className="h-[42vh] w-[92vw] max-w-2xl"
        aria-hidden="true"
      >
        <path
          d={PATH_D}
          fill="none"
          stroke="#f5f1e7"
          strokeOpacity="0.2"
          strokeWidth="0.4"
          strokeDasharray="0.8 1.8"
          strokeLinecap="round"
        />

        {/* Tee marker - where the ball starts */}
        <circle
          cx="8"
          cy="56"
          r="0.9"
          fill="none"
          stroke="#f5f1e7"
          strokeOpacity="0.35"
          strokeWidth="0.3"
        />

        {/* Hole + flag */}
        <ellipse
          cx={HOLE.x}
          cy={HOLE.y + 1.5}
          rx="2.6"
          ry="1"
          fill="#0a0b0b"
          stroke="#C49A43"
          strokeWidth="0.35"
        />
        <line
          x1={HOLE.x - 0.2}
          y1={HOLE.y - 12}
          x2={HOLE.x - 0.2}
          y2={HOLE.y + 1.2}
          stroke="#f5f1e7"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <path
          d={`M${HOLE.x - 0.2} ${HOLE.y - 12} L${HOLE.x + 4.2} ${HOLE.y - 10.5} L${HOLE.x - 0.2} ${HOLE.y - 9} Z`}
          fill="#C49A43"
        />

        {/* Ball - flies the path, then plops into the hole */}
        <circle r="1.15" fill="#f5f1e7">
          <animateMotion
            ref={ballMotionRef}
            id="loaderMotion"
            dur={`${TRAVEL_MS}ms`}
            begin="indefinite"
            fill="freeze"
            path={PATH_D}
          />
          <animate
            attributeName="r"
            begin="loaderMotion.end"
            dur="0.28s"
            values="1.15;1.6;0"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            begin="loaderMotion.end"
            dur="0.28s"
            values="1;1;0"
            fill="freeze"
          />
        </circle>
      </svg>

      <div className="mt-8 text-center">
        <p className="font-mono text-[2.75rem] font-semibold tabular-nums tracking-widest text-accent">
          {progress}%
        </p>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#f5f1e7]/55">
          Teeing off
        </p>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-6 right-6 text-[0.65rem] uppercase tracking-[0.2em] text-[#f5f1e7]/40 transition-colors hover:text-[#f5f1e7]/80"
      >
        Skip
      </button>
    </div>
  );
}
