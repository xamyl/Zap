/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        zap: {
          dark: "#0f0f10",
          darker: "#1a1a2e",
          card: "#232332",
          yellow: "#facc15",
        },
      },
    },
  },
  plugins: [],
};