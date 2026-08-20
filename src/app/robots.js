import { site } from "../lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: site.url,
    sitemap: [
      `${site.url}/sitemap.xml`,
      `${site.url}/image-sitemap.xml`,
    ],
  };
}
