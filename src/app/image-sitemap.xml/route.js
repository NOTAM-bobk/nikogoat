import { site } from "../../lib/site";

export const dynamic = "force-static";

const homepageImagePaths = [
  "/images/hero.jpg",
  "/images/profile.jpg",
  "/images/IMG_2203.jpeg",
  "/images/IMG_2207.jpeg",
  "/images/IMG_2208.jpeg",
  "/images/IMG_2209.jpeg",
  "/images/IMG_2210.jpeg",
  "/images/IMG_2211.jpeg",
];

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => {
    const entities = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export function GET() {
  const homepageUrl = `${site.url}/`;
  const imageEntries = homepageImagePaths
    .map(
      (imagePath) =>
        `    <image:image><image:loc>${escapeXml(`${site.url}${imagePath}`)}</image:loc></image:image>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(homepageUrl)}</loc>
${imageEntries}
  </url>
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
