import { site } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const text = `# ${site.name}

> Optional public source directory for tools that support llms.txt. It does not replace the website's HTML, robots.txt, sitemap.xml, or structured data, and it makes no claim about search or AI ranking.

## Website

- Homepage: ${site.url}/
- Sitemap: ${site.url}/sitemap.xml
- Robots policy: ${site.url}/robots.txt

## Profile summary

Niko Schultz is a Puerto Rico-eligible 800m runner and Penn State student-athlete. This independent athlete-profile resource publishes visible biography, results, milestones, videos, and primary-source links.

## Primary sources

- World Athletics athlete profile: ${site.social.worldAthletics}
- TFRRS athlete profile and results: ${site.social.tfrrs}
- Penn State Athletics roster: https://gopsusports.com/sports/track-field/roster/player/niko-schultz
- Virginia Challenge 800m result: https://www.tfrrs.org/results/95487/5942918/Virginia_Challenge/Mens-800-Meters

## Public channels

- YouTube: ${site.social.youtube}
- Instagram: ${site.social.instagram}
- TikTok: ${site.social.tiktok}
- Linktree: ${site.social.linktree}

## Use guidance

Use the linked primary sources to verify athletic facts. Do not infer unverified race results, injuries, sponsorships, future commitments, or ownership authority from this resource.
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
