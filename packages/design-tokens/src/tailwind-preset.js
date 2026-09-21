/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#0A0D0C",
        surface: "#10140F",
        "surface-high": "#171D16",
        border: {
          DEFAULT: "#252B28",
          subtle: "#171A17",
        },
        ink: {
          DEFAULT: "#F2EFE8",
          muted: "#A6A79A",
          faint: "#6B6D62",
        },
        brand: {
          green: "#0B2F24",
          sage: "#53695C",
          charcoal: "#252B28",
        },
        accent: {
          DEFAULT: "#C49A43",
          hover: "#AD8636",
          subtle: "#2A2214",
        },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        display: ["Unbounded", "Arial Narrow", "sans-serif"],
        sans: ["Manrope", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "3.75rem", letterSpacing: "-0.03em", fontWeight: "600" }],
        h1: ["2.5rem", { lineHeight: "2.75rem", letterSpacing: "-0.025em", fontWeight: "600" }],
        h2: ["1.75rem", { lineHeight: "2.125rem", letterSpacing: "-0.02em", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.625rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.625rem" }],
        body: ["0.9375rem", { lineHeight: "1.375rem" }],
        caption: ["0.8125rem", { lineHeight: "1.125rem", letterSpacing: "0.01em" }],
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.4)",
        raised: "0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 40px rgba(0,0,0,0.5)",
      },
      transitionTimingFunction: {
        "ease-out-sharp": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};
