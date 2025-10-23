/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* light gray */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* deep forest green */
        background: "var(--color-background)", /* soft off-white with green undertones */
        foreground: "var(--color-foreground)", /* dark blue-gray */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep forest green */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* lighter sage green */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* clear red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* very light gray-green */
          foreground: "var(--color-muted-foreground)", /* medium gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* warm orange */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* dark blue-gray */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* dark blue-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* vibrant green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* clear red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideDown: {
          from: { 
            opacity: "0",
            transform: "translateY(-8px)"
          },
          to: { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "slide-down": "slideDown 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(45, 90, 39, 0.1)',
        'elevation-2': '0 4px 12px rgba(45, 90, 39, 0.12)',
        'elevation-3': '0 8px 16px rgba(45, 90, 39, 0.15)',
        'modal': '0 16px 32px rgba(45, 90, 39, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}