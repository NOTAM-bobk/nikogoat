import { DynaPuff, Rubik_Spray_Paint, Space_Mono } from "next/font/google";
import "./globals.css";
import { site } from "../lib/site";

const rubikSprayPaint = Rubik_Spray_Paint({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      description: site.description,
      inLanguage: site.language,
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#niko-schultz`,
      name: "Niko Schultz",
      url: `${site.url}/`,
      jobTitle: "800m Runner",
      description:
        "Puerto Rico-eligible 800m runner, Penn State student-athlete, NCAA First-Team All-American, and 1:45.24 performer.",
      sameAs: [
        site.social.worldAthletics,
        site.social.tfrrs,
        site.social.youtube,
        site.social.instagram,
        site.social.tiktok,
        site.social.linktree,
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: `${site.url}/`,
      name: "Niko Schultz | Puerto Rico 800m Runner",
      description: site.description,
      inLanguage: site.language,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#niko-schultz` },
    },
  ],
};

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Niko Schultz | Puerto Rico 800m Runner",
    template: "%s | Niko Schultz",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Niko Schultz",
    "Niko Schultz 800m",
    "Niko Schultz Penn State",
    "Niko Schultz Puerto Rico",
    "Niko Schultz 1:45.24",
    "800m runner",
    "Puerto Rico track and field",
    "Penn State track and field",
    "NCAA 800m runner",
    "middle distance running",
  ],
  authors: [{ name: "Niko Schultz", url: site.url }],
  creator: "Niko Schultz",
  publisher: "Independent Niko Schultz profile resource",
  category: "Sports",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: "Niko Schultz | Puerto Rico 800m Runner",
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Niko Schultz — Puerto Rico-eligible 800m runner",
      },
    ],
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niko Schultz | Puerto Rico 800m Runner",
    description: site.description,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${rubikSprayPaint.variable} ${dynaPuff.variable} ${spaceMono.variable}`}
    >
      <body className="bg-cream text-ink font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
