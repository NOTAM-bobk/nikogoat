export default function robots() {
  const siteUrl = "https://nikoschultz.com"; // TODO: replace with the live domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
