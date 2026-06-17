import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────
      colors: {
        brand: {
          // Primary – Deep Royal Blue
          50:  "#EFF4FF",
          100: "#DBE8FE",
          200: "#BFD4FD",
          300: "#93B4FB",
          400: "#6090F8",
          500: "#3B6EF4",
          600: "#2563EB", // Royal Blue – primary
          700: "#1D4ED8",
          800: "#1E3A8A", // Deep Blue – dark variant
          900: "#1E3064",
          950: "#172554",
          DEFAULT: "#2563EB",
        },
        teal: {
          // Secondary – Vibrant Teal
          50:  "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6", // Teal – secondary
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          950: "#042F2E",
          DEFAULT: "#14B8A6",
        },
        accent: {
          // Accent – Warm Orange
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316", // Orange – accent / CTA
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
          DEFAULT: "#F97316",
        },
        // Neutral Palette
        slate: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A", // Dark slate
          950: "#020617",
        },
        // shadcn/ui semantic tokens (CSS var driven)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      // ─── Typography ─────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Satoshi", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs:   ["0.75rem",  { lineHeight: "1rem" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem",     { lineHeight: "1.5rem" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",   { lineHeight: "2rem" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
        "5xl":["3rem",     { lineHeight: "1.1" }],
        "6xl":["3.75rem",  { lineHeight: "1.05" }],
        "7xl":["4.5rem",   { lineHeight: "1" }],
        "8xl":["6rem",     { lineHeight: "1" }],
      },

      // ─── Spacing ────────────────────────────────────────────────
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "68":  "17rem",
        "84":  "21rem",
        "88":  "22rem",
        "92":  "23rem",
        "100": "25rem",
        "104": "26rem",
        "108": "27rem",
        "112": "28rem",
        "116": "29rem",
        "120": "30rem",
      },

      // ─── Border Radius ──────────────────────────────────────────
      borderRadius: {
        none:  "0",
        sm:    "0.25rem",
        DEFAULT:"0.375rem",
        md:    "0.5rem",
        lg:    "0.75rem",
        xl:    "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full:  "9999px",
      },

      // ─── Box Shadow ─────────────────────────────────────────────
      boxShadow: {
        xs:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm:  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        DEFAULT:"0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
        md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg:  "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
        xl:  "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
        "2xl":"0 25px 50px -12px rgb(0 0 0 / 0.15)",
        "3xl":"0 35px 60px -15px rgb(0 0 0 / 0.2)",
        // Brand-tinted glow shadows
        "brand-sm":  "0 4px 14px 0 rgb(37 99 235 / 0.25)",
        "brand-md":  "0 8px 25px 0 rgb(37 99 235 / 0.3)",
        "brand-lg":  "0 15px 40px 0 rgb(37 99 235 / 0.35)",
        "teal-sm":   "0 4px 14px 0 rgb(20 184 166 / 0.25)",
        "accent-sm": "0 4px 14px 0 rgb(249 115 22 / 0.3)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none:  "none",
      },

      // ─── Background Image ────────────────────────────────────────
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #14B8A6 100%)",
        "gradient-brand-subtle":
          "linear-gradient(135deg, #EFF4FF 0%, #F0FDFA 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 40%, #0D9488 100%)",
        "gradient-dark":
          "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
        "radial-brand":
          "radial-gradient(ellipse at top, #2563EB22 0%, transparent 60%)",
      },

      // ─── Animation ──────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%":   { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-brand": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(37 99 235 / 0.4)" },
          "50%":       { boxShadow: "0 0 0 8px rgb(37 99 235 / 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "fade-in":        "fade-in 0.4s ease-out",
        "fade-up":        "fade-up 0.5s ease-out",
        "fade-up-slow":   "fade-up 0.8s ease-out",
        "fade-down":      "fade-down 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "scale-in":       "scale-in 0.3s ease-out",
        shimmer:          "shimmer 2s linear infinite",
        "pulse-brand":    "pulse-brand 2s ease-in-out infinite",
        float:            "float 3s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },

      // ─── Transition ─────────────────────────────────────────────
      transitionTimingFunction: {
        smooth:   "cubic-bezier(0.4, 0, 0.2, 1)",
        spring:   "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      },
      transitionDuration: {
        "0":   "0ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
        "1000":"1000ms",
      },

      // ─── Screen Breakpoints ──────────────────────────────────────
      screens: {
        xs:   "375px",
        sm:   "640px",
        md:   "768px",
        lg:   "1024px",
        xl:   "1280px",
        "2xl":"1400px",
        "3xl":"1600px",
      },

      // ─── Container ───────────────────────────────────────────────
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm:  "1.5rem",
          lg:  "2rem",
          xl:  "2.5rem",
          "2xl":"3rem",
        },
      },

      // ─── Aspect Ratio ────────────────────────────────────────────
      aspectRatio: {
        "product": "3 / 4",
        "banner":  "16 / 6",
        "card":    "4 / 3",
        "square":  "1 / 1",
      },

      // ─── Z-Index ─────────────────────────────────────────────────
      zIndex: {
        "-1": "-1",
        "0":  "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "modal":    "1000",
        "toast":    "1100",
        "tooltip":  "1200",
        "overlay":  "1300",
        "dropdown": "200",
        "sticky":   "100",
        "fab":      "500",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
