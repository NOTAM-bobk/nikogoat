import { Big_Shoulders_Display, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

// Display face — condensed, stadium-signage energy for headlines & big numbers
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Body face — friendly, rounded, easy to read at length
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Utility/data face — for split times, stats, scoreboard-style numbers
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://nikoschultz.com"; // TODO: replace with the live domain

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Niko Schultz | 800m Runner",
    template: "%s | Niko Schultz",
  },
  description:
    "Official portfolio of Niko Schultz, professional 800m runner — personal bests, race schedule, results, and press.",
  keywords: [
    "Niko Schultz",
    "800m runner",
    "middle distance",
    "track and field",
    "athlete portfolio",
  ],
  authors: [{ name: "Niko Schultz" }],
  openGraph: {
    title: "Niko Schultz | 800m Runner",
    description:
      "Official portfolio of Niko Schultz, professional 800m runner — personal bests, race schedule, results, and press.",
    url: siteUrl,
    siteName: "Niko Schultz",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Niko Schultz — 800m Runner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niko Schultz | 800m Runner",
    description:
      "Official portfolio of Niko Schultz, professional 800m runner — personal bests, race schedule, results, and press.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${plusJakarta.variable} ${spaceMono.variable}`}>
      <body className="bg-cream text-ink font-body antialiased">{children}</body>
    </html>
  );
}
