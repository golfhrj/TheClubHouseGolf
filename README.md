# Clubhouse Golf — Phase 1 platform

Monorepo for the Clubhouse Golf website and mobile app (Phase 1 scope: unified
affiliate catalogue, Stripe checkout, wallet/refunds, partnership directory,
YouTube content layer, and Clubhouse Buddy base infrastructure).

## Stack

| Layer | Choice | Why |
|---|---|---|
| Web | Next.js (App Router) on Vercel | Server rendering for SEO on a commerce catalogue; headless CMS friendly. |
| Mobile | React Native / Expo, single codebase | One TypeScript codebase for iOS + Android, sharing types/API client/business logic with the web app — one engineering team instead of two stacks (ruled out Flutter for this reason). |
| Styling | Tailwind v4 (web), theme tokens + StyleSheet (mobile) | Both consume the same `@chg/design-tokens` source of truth. |
| Monorepo | pnpm workspaces + Turborepo | Shared packages, cached builds. |

## Structure

```
apps/
  web/              Next.js storefront
  mobile/           Expo app (iOS + Android)
packages/
  design-tokens/    Single source of truth for color, type, spacing, radius —
                     consumed by web's Tailwind theme and mobile's theme.ts
```

## Design system — "Modern Tour"

True black base, near-white ink, a single sharp red accent used sparingly
(CTAs, price emphasis, status). Matches the current chgolfco.com's minimal,
tech-forward direction. Full token values live in
`packages/design-tokens/src/index.ts`; the web app mirrors them as CSS custom
properties in `apps/web/src/app/globals.css` (Tailwind v4 reads CSS, not JS).

| Token | Value |
|---|---|
| `color.black` | `#0A0A0A` |
| `color.ink` | `#FAFAFA` |
| `color.red` | `#DC2626` |
| `font.sans` | Geist |
| `font.mono` | Geist Mono |

## Getting started

```bash
pnpm install
pnpm dev:web      # Next.js on localhost:3000
pnpm dev:mobile   # Expo dev server / QR
```

## Status

Repo scaffolding + design system in place. Backend (catalogue schema, wallet,
Stripe, auth) not yet started — see `context/proposal.md` in the client
folder for full Phase 1 scope and the 15 Oct 2026 timeline.
