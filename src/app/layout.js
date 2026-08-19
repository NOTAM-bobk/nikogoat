import { DynaPuff, Rubik_Spray_Paint, Space_Mono } from "next/font/google";
import "./globals.css";

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

const siteUrl = "https://nikoschultz.com"; // Replace when the public domain changes.
const seoDescription =
  "Niko Schultz is a Puerto Rico-eligible 800m runner, Penn State student-athlete, NCAA First-Team All-American, and 1:45.24 performer. Explore race results, videos, milestones, and athlete updates.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Niko Schultz | Puerto Rico 800m Runner",
    template: "%s | Niko Schultz",
  },
  description: seoDescription,
  applicationName: "Niko Schultz",
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
  authors: [{ name: "Niko Schultz", url: siteUrl }],
  creator: "Niko Schultz",
  publisher: "Niko Schultz",
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
    description: seoDescription,
    url: siteUrl,
    siteName: "Niko Schultz",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Niko Schultz — Puerto Rico-eligible 800m runner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niko Schultz | Puerto Rico 800m Runner",
    description: seoDescription,
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
        {children}
      </body>
    </html>
  );
}
