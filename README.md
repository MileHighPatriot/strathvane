# Strathvane

Strathvane is a fictional Colorado roofing contractor for the Denver metro. This repository is a concept showcase site, not a real company. Every phone number, price, review, license, and photo is made up and labeled that way.

The live site is https://milehighpatriot.github.io/strathvane/

## Build

Install dependencies, then build the static export:

```bash
npm ci
npm run build
npm run lint
npm run check
```

`npm run build` writes the site to `out/`. GitHub Actions deploys that folder to GitHub Pages.

## Brand photos

The kit WebP files belong in `public/brand/`. The site build expects these 17 files and no substitutes:

- hero-160.webp, hero-240.webp, hero-1200.webp, hero-1600.webp, hero-2048.webp
- drone-160.webp, drone-240.webp, drone-1200.webp
- storm-160.webp, storm-240.webp, storm-1200.webp
- install-160.webp, install-240.webp, install-1200.webp
- roofline-160.webp, roofline-240.webp, roofline-1200.webp
