import type { NextConfig } from "next";

// The site is exported as plain static files and hosted on GitHub Pages.
// A project page lives under a sub-path (golfhrj.github.io/TheClubHouseGolf),
// so the deploy workflow sets NEXT_PUBLIC_BASE_PATH. Leave it unset locally
// or when serving from the root of a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  basePath,
  trailingSlash: true,
  // GitHub Pages is a static host - no on-the-fly image optimisation.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
