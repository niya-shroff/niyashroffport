/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)', 
        },
        accent: {
          emerald: 'rgb(var(--color-accent-emerald) / <alpha-value>)',
          crimson: 'rgb(var(--color-accent-crimson) / <alpha-value>)',
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)', 
        surfaceHover: 'rgb(var(--color-surface-hover) / <alpha-value>)', 
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'grid-pattern': "url('/subtle-grid.svg')",
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
