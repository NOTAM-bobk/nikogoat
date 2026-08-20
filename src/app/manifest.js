export default function manifest() {
  return {
    name: "Niko Schultz | Puerto Rico 800m Runner",
    short_name: "Niko Schultz",
    description:
      "Niko Schultz: Puerto Rico-eligible 800m runner, Penn State student-athlete, race results, videos, and athlete updates.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EFE4",
    theme_color: "#B76849",
    icons: [
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
