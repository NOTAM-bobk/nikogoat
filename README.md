# Niko Schultz — Portfolio

Next.js 14 (App Router) + Tailwind CSS scaffold for an 800m runner's
portfolio site. Crème light-mode, track/scoreboard-inspired design system.
Content and images are placeholders — swap them out, then layer in the
scroll/hover animations mentioned in the brief.

## Design tokens (see tailwind.config.js)
- `cream` — background (#F6F1E7) / `cream-soft` — card bg / `cream-line` — hairlines
- `ink` — body text & dark chips (#1E2622)
- `clay` — primary accent, track-surface red-orange (#C1440E)
- `sage` — secondary accent, infield green (#5B7A5E)
- `gold` — tertiary/highlight accent (#C79A3C)
- Fonts: Big Shoulders Display (headlines), Plus Jakarta Sans (body), Space Mono (splits/stats)

## Signature elements
- `.lane-divider` — dashed clay/sage rule standing in for lane markings, used between sections
- `.split-chip` / `.split-time` — scoreboard-style stat blocks for personal bests
- `.bib-label` — pill-shaped eyebrow tag styled like a race bib

## Getting started
```bash
npm install
npm run dev
```

## To do next
- Swap placeholder copy and images in `public/images/` and `src/app/page.js`
  (hero.jpg, profile.jpg, gallery-01..06.jpg)
- Update `siteUrl` in layout.js, sitemap.js, and robots.js to the real domain
- Add scroll-triggered reveals, hover micro-interactions, and a hero load
  sequence (kept intentionally minimal for now, per the brief)
- Replace favicon.ico / opengraph-image.png placeholders with final art
