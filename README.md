# Clubhouse Golf — website

The Clubhouse Golf brochure site. It's a Next.js app exported as plain static
files and hosted free on GitHub Pages — no server, database or backend.

**Live:** https://golfhrj.github.io/TheClubHouseGolf/

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build` writes the finished static site to `out/`.

## Deploying

Every push to `main` builds and publishes the site automatically
(`.github/workflows/deploy.yml`). One-time setup: in the repo on GitHub, go to
**Settings → Pages** and set **Source** to **GitHub Actions**.

The workflow fills in the sub-path (`/TheClubHouseGolf`) and site URL from
GitHub Pages itself, so nothing needs changing when you move to a custom domain
— add the domain under **Settings → Pages → Custom domain** and point your DNS
at GitHub.

## Structure

```
src/app/          page, layout, global styles, social-share image
src/components/   page sections (hero, what's coming, road ahead, team, footer…)
src/lib/site.ts   site URL + asset() helper for files in public/
public/           images, logos, cursors
```

Anything under `public/` referenced from code must go through `asset()` from
`src/lib/site.ts`, so it resolves under the GitHub Pages sub-path.

## Contact

The site has no forms. "Contact us" links go to `hello@chgolfco.com`
(set in `src/components/footer.tsx`).
