/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9', // electric blue
          hover: '#0284c7', 
        },
        accent: {
          emerald: '#10b981', // neon emerald
          crimson: '#e11d48', // crimson red
        },
        background: '#0a0a0a', // deep obsidian
        surface: '#121212', 
        surfaceHover: '#1c1c1c', 
        muted: '#525252',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'grid-pattern': "url('/subtle-grid.svg')",
      },
    },
  },
  plugins: [],
};
