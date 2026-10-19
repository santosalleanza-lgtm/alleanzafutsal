import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0C", 900: "#0B0B0C", 800: "#141517", 700: "#1C1E21", 600: "#26292D", 500: "#3A3E44" },
        chalk: { DEFAULT: "#F5F5F2", muted: "#B9BCC1", dim: "#8A8E95" },
        lime: { DEFAULT: "#C6F432", 400: "#D4F865", 600: "#A9D61C", ink: "#0B0B0C" },
        danger: "#FF6B5B",
        warn: "#F5B841",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "76rem" },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .6s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
} satisfies Config;
