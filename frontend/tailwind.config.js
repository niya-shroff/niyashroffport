/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#34d399', // emerald-400
          hover: '#10b981', // emerald-500
        },
        background: '#111827', // gray-900
        surface: '#1f2937', // gray-800
        surfaceHover: '#374151', // gray-700
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
