import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // The Vercel Hobby plan's image-optimization quota returns 402 once
  // exhausted, breaking every <Image> on the site (/_next/image). Source
  // images here are already reasonably sized, so serve them as-is instead
  // of relying on Vercel's paid on-the-fly resizing pipeline.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
