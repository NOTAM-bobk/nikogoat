# Niko Schultz — Athlete Profile Website

This repository contains a Next.js 14 App Router website for a public **independent athlete-profile resource** about Niko Schultz. It is not represented in the codebase as an official athlete website unless the owner receives and records that authorization.

## Canonical origin and deployment

The canonical origin is controlled in `src/lib/site.js` through `NEXT_PUBLIC_SITE_URL`. Set this Vercel environment variable to the one approved HTTPS production hostname before deploying, for example:

```text
NEXT_PUBLIC_SITE_URL=https://your-approved-domain.example
```

The same origin powers canonical metadata, Open Graph URLs, Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`, and `llms.txt`. Do not point these surfaces at a Vercel preview URL. Redirect all alternate production hostnames permanently to the selected canonical hostname before submitting the sitemap to search platforms.

## SEO and AI-discovery policy

Search and generative-AI visibility are built through crawlable pages, useful first-party content, verified primary sources, clear page ownership, and accurate structured data. The optional `/llms.txt` endpoint is only a public source directory for tools that choose to read it; it does not replace the rendered HTML, `robots.txt`, `sitemap.xml`, or structured data, and it does not promise search or AI placement.

The site emits one server-rendered JSON-LD graph containing `WebSite`, `Person`, and `WebPage` entities. Keep every claim visible on the site, approved by the relevant owner, and supported by the linked source material. Do not add deceptive schema, hidden keyword blocks, fake FAQs, generated recaps, or unsupported ownership claims.

## Source and content approval

Before publishing or expanding public content, confirm the accuracy and authorization of the athlete biography, affiliations, personal bests, race results, social channels, photographs, partner references, contact routes, terms, and support links. Link result claims to primary sources such as World Athletics, TFRRS, meet-result providers, or university athletics pages.

Only add standalone routes such as `/about/`, `/results/`, `/media/`, `/videos/[slug]/`, or `/updates/[slug]/` when each page has a permanent audience purpose, original approved content, and a stable canonical URL. Include only final indexable routes in `src/app/sitemap.js`.

## Local development

```bash
pnpm install
pnpm dev
```

## Release checklist

| Check                  | Expected outcome                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | One approved HTTPS production origin is configured in Vercel.                                                                                        |
| Production build       | `pnpm build` completes without route, metadata, image, or server/client-boundary errors.                                                             |
| Rendered HTML          | The initial response contains a complete H1, visible identity description, canonical link, robots directive, Open Graph tags, and one JSON-LD graph. |
| Crawler routes         | `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return from the canonical hostname.                                                                   |
| URL integrity          | Every sitemap entry returns `200` and has a self-referential canonical URL.                                                                          |
| Structured data        | Significant schema properties are visible, accurate, approved, and source-backed.                                                                    |
| Social cards           | The Open Graph image, title, description, and URL accurately describe the deployed site.                                                             |
| Search platforms       | Verify the final domain in Google Search Console and Bing Webmaster Tools only after the production audit is complete.                               |

## Visual system

The interface uses a crème background, track-inspired dividers, scoreboard-style personal-best cards, contextual primary-source links, and optional motion enhancements. Animations, the canvas grid, counters, sharing, and visitor analytics must remain progressive enhancements: they may enrich the experience but must not delay or hide the factual title, biography, result links, contact route, or core images.
