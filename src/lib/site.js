const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function normalizeSiteUrl(value) {
  const url = new URL(value || "https://nikogoat.vercel.app");
  url.pathname = "";
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/$/, "");
}

export const site = {
  name: "Niko Schultz",
  url: normalizeSiteUrl(configuredSiteUrl),
  description:
    "Niko Schultz is a Puerto Rico-eligible 800m runner. Explore verified results, milestones, videos, and official profile links.",
  locale: "en_US",
  language: "en-US",
  authority: "independent athlete-profile resource",
  social: {
    worldAthletics:
      "https://worldathletics.org/athletes/puerto-rico/niko-schultz-14972544",
    tfrrs:
      "https://www.tfrrs.org/athletes/9226487/Penn_State/Niko_Schultz.html",
    youtube: "https://www.youtube.com/@nikoschultz4306",
    instagram: "https://www.instagram.com/nikoschultzzz",
    tiktok: "https://www.tiktok.com/@nikojschultz",
    linktree: "https://linktr.ee/nikoschultzzz",
  },
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${site.url}/`).toString();
}

export const siteConfigurationNotice = configuredSiteUrl
  ? null
  : "Set NEXT_PUBLIC_SITE_URL in Vercel to https://nikogoat.vercel.app before launch.";
