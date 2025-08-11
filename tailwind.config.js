/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        in: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        in: 'in 0.6s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      },
      fontFamily: {
        sans: [
          "Mona Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ],
      },
      colors: {
        "dark-200": "#475467",
        "light-blue-100": "#c1d3f81a",
        "light-blue-200": "#a7bff14d",
        "badge-green": "#d5faf1",
        "badge-red": "#f9e3e2",
        "badge-yellow": "#fceed8",
        "badge-green-text": "#254d4a",
        "badge-red-text": "#752522",
        "badge-yellow-text": "#73321b",
      },
    },
  },
  plugins: [],
};
