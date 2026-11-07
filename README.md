# Strathvane

Strathvane is a fictional Colorado roofing contractor for the Denver metro. This repository is a concept showcase site, not a real company. Every phone number, price, review, license, storm path, and photo on it is made up and labeled that way.

Live site: https://milehighpatriot.github.io/strathvane/

## Build

```bash
npm ci
npm run build   # static export to out/
npm run lint
npm run check   # copy and rules scan of out/ and the source
```

GitHub Actions (`.github/workflows/deploy.yml`) builds, checks, and deploys `out/` to GitHub Pages on every push to main.

## Where things live

- Brand tokens: `app/globals.css` (CSS custom properties), `lib/brand.ts` (the same colors for TypeScript and WebGL), `components/BrandMark.tsx` (the mark), `app/icon.svg` (favicon).
- Copy shared across pages: `lib/content.ts`.
- Hero WebGL scene: `lib/hero-scene.ts`, loaded lazily by `components/HeroScene.tsx`; the static poster is `components/HeroPoster.tsx`.
- Brand photos: the 17 kit WebP files in `public/brand/`.
