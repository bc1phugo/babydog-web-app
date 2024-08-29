import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      "2xs": "380x",
      xs: "500px",
      // => @media (min-width: 500px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    letterSpacing: {
      tight: "-0.01em",
    },
    fontSize: {
      xs: ["0.75rem", "1rem"], // 12px, 16px
      sm: ["0.875rem", "1.25rem"], // 14px, 20px
      base: ["1rem", "1.375rem"], // 16px, 22px
      md: ["1.125rem", "1.5rem"], // 18px, 24px
      lg: ["1.25rem", "1.5rem"], // 20px, 24px
      xl: ["1.5rem", "2rem"], // 24px, 32px
      "2xl": ["1.5rem", "2rem"], // 24px, 32px
      "3xl": ["1.75rem", "2.875rem"], // 28px, 46px
      "4xl": ["2.375rem", "2.875rem"],
      "5xl": ["48px", "1"],
      "6xl": ["60px", "1"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        customGreen: {
          DEFAULT: "hsl(var(--chart-2))",
        },
        customOrange: {
          DEFAULT: "hsla(30, 100%, 64%, 1)",
          deep: "hsla(30, 100%, 50%, 1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        landing: "url('../public/images/image_background_landing.webp')",
      },
      transitionDelay: {
        3000: "3000ms",
      },
    },
  },
} satisfies Config;

export default config;
