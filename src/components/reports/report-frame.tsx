"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a standalone HTML report. The iframe keeps the report's own styles
 * and scripts isolated from the site; because it's same-origin, the site's
 * light/dark choice is mirrored onto the report (which supports data-theme).
 */
export function ReportFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;

    function syncTheme() {
      const doc = frame?.contentDocument;
      if (!doc?.documentElement) return;
      const dark =
        document.documentElement.getAttribute("data-theme") === "dark";
      doc.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }

    syncTheme();
    frame.addEventListener("load", syncTheme);
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      frame.removeEventListener("load", syncTheme);
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      className="block h-[calc(100dvh-10rem)] min-h-[560px] w-full border border-border-subtle bg-surface"
    />
  );
}
