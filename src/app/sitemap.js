export default function sitemap() {
  const siteUrl = "https://nikoschultz.com"; // Replace when the public domain changes.

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
