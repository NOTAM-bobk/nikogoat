export default function robots() {
  const siteUrl = "https://nikoschultz.com"; // Replace when the public domain changes.

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
