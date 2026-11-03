/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        higgs: {
          bg: '#07090e',
          surface: '#0d111a',
          card: '#121723',
          cardHover: '#171e2e',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(209, 254, 23, 0.35)',
          volt: '#d1fe17',
          voltHover: '#bce810',
          cyan: '#00f0ff',
          violet: '#8b5cf6',
          muted: '#8e9aa8',
          text: '#f1f5f9',
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        serif: ['"Lora"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
