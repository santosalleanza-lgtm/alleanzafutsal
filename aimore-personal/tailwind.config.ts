import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0907", 900: "#0A0907", 800: "#13110D", 700: "#1B1814", 600: "#26221B", 500: "#3B352B" },
        chalk: { DEFAULT: "#F6F2EA", muted: "#C2BAAC", dim: "#8E8678" },
        gold: { DEFAULT: "#D4AF61", 300: "#F2DDA6", 400: "#E3C27E", 600: "#A8823C", 700: "#7A5C26", ink: "#0A0907" },
        danger: "#FF6B5B",
        warn: "#F5B841",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "76rem" },
      letterSpacing: { luxe: "0.42em" },
      backgroundImage: {
        "gold-metal": "linear-gradient(135deg, #F2DDA6 0%, #D4AF61 38%, #A8823C 70%, #E8CB8C 100%)",
        "gold-sheen": "linear-gradient(110deg, transparent 20%, rgba(242,221,166,.12) 45%, transparent 70%)",
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .6s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
} satisfies Config;
