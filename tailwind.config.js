/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens — Niko Schultz / 800m portfolio
        cream: {
          DEFAULT: "#F4EFE4", // requested primary background
          soft: "#ECE5D5", // card / section alt background
          line: "#DED4C0", // hairline / divider on cream
        },
        ink: {
          DEFAULT: "#1E2622", // near-black, slight green cast — body copy
          soft: "#4B5750", // secondary text
        },
        clay: {
          DEFAULT: "#C1440E", // track-surface red-orange — primary accent
          dark: "#9A360B",
          light: "#E2703B",
        },
        sage: {
          DEFAULT: "#5B7A5E", // infield green — secondary accent
          dark: "#4159443",
          light: "#8AA98C",
        },
        gold: {
          DEFAULT: "#C79A3C", // medal gold — tertiary / highlight accent
          light: "#E0C374",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "lane-lines":
          "repeating-linear-gradient(to right, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
