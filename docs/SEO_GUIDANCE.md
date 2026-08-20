# SEO and Generative-AI Visibility Guidance

## What is implemented

The website now uses `src/lib/site.js` as the single source for its configured canonical origin, public description, and verified profile links. Root metadata, JSON-LD, `robots.txt`, `sitemap.xml`, and the optional `llms.txt` route all read from this shared configuration.

The homepage emits one server-rendered `WebSite` / `Person` / `WebPage` schema graph. The hero H1 is present as **Niko Schultz — Puerto Rico 800m Runner** in the initial rendered HTML; the typewriter effect is retained as a progressive enhancement after loading. The sitemap lists only the current canonical homepage and does not generate an artificial `lastModified` timestamp on each build.

## Required owner decisions before launch

| Decision | Required action |
| --- | --- |
| Canonical hostname | Set `NEXT_PUBLIC_SITE_URL` in Vercel to `https://nikogoat.vercel.app`. Permanently redirect every alternate production hostname to it. |
| Authority status | Confirm whether this is an authorized official athlete site or an independent profile resource. The current code uses the more conservative independent-resource description. |
| Factual approval | Confirm the public biography, results, affiliations, profile links, partner statements, images, contact details, terms, support links, and videos. |
| Public routes | Add `/about/`, `/results/`, `/media/`, or update pages only when each has permanent, approved, original, source-backed content. |

## Content and AI-search principles

Generative-AI visibility is earned through ordinary crawlability, clear authorship, visible content, source-backed claims, useful page experience, and accurate structured data. It is not a separate crawler tactic. The optional `/llms.txt` directory is descriptive only; it does not improve Google AI results by itself and must not be treated as a replacement for HTML, schema, `robots.txt`, or the sitemap.

For every new performance mark, race update, partnership, or athlete claim, present clean visible text and link to the most direct available primary source. Avoid hidden prompts, keyword stuffing, fake questions, thin generated recaps, invented citations, misleading schema, or unverified ownership claims.

## Post-launch validation

1. Run `pnpm build` before publishing.
2. Confirm that `/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return successfully on the final hostname.
3. Inspect the rendered homepage HTML for a full H1, identity paragraph, canonical URL, Open Graph metadata, robots directive, and one JSON-LD graph.
4. Check each sitemap entry returns `200` and uses the same canonical hostname.
5. Validate structured data only after factual approval.
6. Verify the final domain in Google Search Console and Bing Webmaster Tools, then submit the sitemap.
7. Review indexing, coverage, branded queries, page experience, and crawl errors at 30, 60, and 90 days; do not create low-value pages in response to short-term ranking changes.
