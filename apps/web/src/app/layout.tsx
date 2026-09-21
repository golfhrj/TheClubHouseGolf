import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CursorProvider } from "@/components/cursor-provider";
import { SiteLoader } from "@/components/site-loader";
import { siteUrl } from "@/lib/site";

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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "Clubhouse Golf | Everything Golf. One Clubhouse.";
const DESCRIPTION =
  "Clubhouse Golf is the new home for everything golf - equipment, apparel, an AI caddie, tournaments, and a members' community from every partner brand, in one storefront and one app. Founding members launch 15 October 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
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
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
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
      { url: "/brand/logo.svg", type: "image/svg+xml" },
      { url: "/brand/logo-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
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
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script id="loader-init" strategy="beforeInteractive">
          {LOADER_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD),
          }}
        />
        <CursorProvider />
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
