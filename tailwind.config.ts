import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces — near-black navy, never pure black
        ink: {
          950: "#0B0E14",
          900: "#0F131C",
          800: "#12161F",
          700: "#181D29",
          600: "#232838",
        },
        paper: {
          100: "#E8EAF0",
          300: "#C4C9D6",
          500: "#8B93A7",
        },
        // Signal lanes — one accent per discipline, used consistently everywhere
        lane: {
          web: "#3ED6C4", // cyan-teal — code / terminal
          webDim: "#1E4842",
          mobile: "#A78BFA", // violet — device glass
          mobileDim: "#332A55",
          design: "#F5A962", // amber — canvas / ink
          designDim: "#4A3520",
        },
        // Cursor-companion / hover-glow pink — used by the hero spotlight text
        // and the blurred cursor blob once past the hero
        glow: {
          pink: "#FF8FCB",
          pinkSoft: "#FFC2E6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "drift-a": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-24px) scale(1.08)" },
        },
        "drift-b": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-28px,26px) scale(1.05)" },
        },
        "drift-c": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(22px,18px) scale(0.94)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.1", transform: "scale(0.8)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "drift-a": "drift-a 17s ease-in-out infinite",
        "drift-b": "drift-b 21s ease-in-out infinite",
        "drift-c": "drift-c 25s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
