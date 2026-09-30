import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Fraunces,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor-provider";
import { SiteLoader } from "@/components/site-loader";
import { BrandToggle } from "@/components/brand-toggle";
import { BRAND_INIT_SCRIPT, DEFAULT_BRAND } from "@/lib/brand";
import { asset, siteUrl } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Sunday Sessions brand direction (see lib/brand.ts).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "Clubhouse Golf | Everything Golf. One Clubhouse.";
const DESCRIPTION =
  "Clubhouse Golf is the new home for everything golf - equipment, apparel, an AI caddie, tournaments, and a members' community from every partner brand, in one storefront and one app. Founding members launch 15 October 2026.";

export const metadata: Metadata = {
  // Origin only - Next adds the base path to file-based metadata (the OG
  // image) itself, so a path here would double it.
  metadataBase: new URL(new URL(siteUrl()).origin),
  title: {
    default: TITLE,
    template: "%s | Clubhouse Golf",
  },
  description: DESCRIPTION,
  applicationName: "Clubhouse Golf",
  keywords: [
    "Clubhouse Golf",
    "golf marketplace",
    "golf equipment",
    "golf apparel",
    "AI golf caddie",
    "golf community",
    "golf app",
    "buy sell used golf clubs",
  ],
  authors: [{ name: "Clubhouse Golf" }],
  creator: "Clubhouse Golf",
  publisher: "Clubhouse Golf",
  alternates: {
    canonical: asset("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: asset("/"),
    siteName: "Clubhouse Golf",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: asset("/brand/logo.svg"), type: "image/svg+xml" },
      {
        url: asset("/brand/logo-512.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: asset("/favicon.ico"),
    apple: asset("/brand/apple-touch-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2f24",
};

// Organization structured data - lets search engines show Clubhouse Golf's
// name, logo, and social links directly in rich results.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Clubhouse Golf",
  url: siteUrl(),
  logo: `${siteUrl()}/brand/logo-512.png`,
  sameAs: [
    "https://www.linkedin.com/company/clubhouse-golf-co/posts/?feedView=all",
    "https://www.instagram.com/clubhousegolfco_/",
    "https://www.tiktok.com/@clubhousegolfco",
  ],
};

// Applies the saved theme before first paint so there's no light-then-dark
// flash. Light is the default whenever nothing is saved yet.
const THEME_INIT_SCRIPT = `
try {
  var saved = localStorage.getItem("chg-theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
} catch (e) {}
`;

// Marks <html> before first paint if the golf intro already played this
// session, so the CSS in globals.css can hide it instantly - with zero
// flash of either the loader or the page underneath.
const LOADER_INIT_SCRIPT = `
try {
  if (sessionStorage.getItem("chg-loader-shown")) {
    document.documentElement.setAttribute("data-loader-skip", "1");
  }
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-brand={DEFAULT_BRAND}
      className={`${fraunces.variable} ${manrope.variable} ${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Plain inline scripts, not next/script: App Router queues
            beforeInteractive scripts and runs them after the page is first
            styled, which flashed the default theme and brand (and animated
            every transition-colors element) on each load. These run while
            the HTML is parsed, before first paint. */}
        <script
          id="pre-paint-init"
          dangerouslySetInnerHTML={{
            __html: THEME_INIT_SCRIPT + BRAND_INIT_SCRIPT + LOADER_INIT_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <CursorProvider />
        <SiteLoader />
        {children}
        <BrandToggle />
      </body>
    </html>
  );
}
