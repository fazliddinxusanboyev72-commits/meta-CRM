import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#070910",
          secondary: "#0B1020",
          panel: "#111827",
          elevated: "#151D30",
        },
        primary: {
          DEFAULT: "#8957FF",
          purple: "#8957FF",
          blue: "#438BFF",
          cyan: "#45D9FF",
        },
        text: {
          main: "#F8FAFC",
          secondary: "#A1AABD",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "#263149",
          light: "#334155",
        },
        status: {
          success: "#28C98B",
          warning: "#F4B942",
          error: "#F06474",
          info: "#438BFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(137, 87, 255, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(69, 217, 255, 0.35)",
        "glow-blue": "0 0 25px -5px rgba(67, 139, 255, 0.35)",
        panel: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
