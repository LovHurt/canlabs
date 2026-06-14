import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "site-bg": "#f8fafc",
        "site-bg-subtle": "#f1f5f9",
        card: "rgba(255,255,255,0.97)",
        "card-border": "rgba(15,23,54,0.08)",
        ink: "#0f172a",
        muted: "#64748b",
        primary: "#1e40af",
        "primary-light": "#3b82f6",
        "primary-dark": "#1e3a8a",
        accent: "#0ea5e9",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,23,54,0.05), 0 8px 32px rgba(15,23,54,0.08)",
        "card-hover":
          "0 4px 16px rgba(15,23,54,0.12), 0 24px 64px rgba(15,23,54,0.10)",
        btn: "0 4px 14px rgba(30,64,175,0.25)",
        "btn-hover": "0 6px 20px rgba(30,64,175,0.35)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(14,165,233,0.07) 0%, transparent 50%)",
        "grid-pattern":
          "linear-gradient(rgba(15,23,54,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,54,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-size": "48px 48px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "bar-grow": "bar-grow 1s ease-out forwards",
        blink: "blink 1.1s step-end infinite",
        "pulse-ring": "pulse-ring 2.5s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "bar-grow": {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
