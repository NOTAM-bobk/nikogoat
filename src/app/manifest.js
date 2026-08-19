export default function manifest() {
  return {
    name: "Niko Schultz | 800m Runner",
    short_name: "Niko Schultz",
    description:
      "Official portfolio of Niko Schultz, professional 800m runner — personal bests, race schedule, results, and press.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E7",
    theme_color: "#C1440E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
