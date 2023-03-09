/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0f0f0f',
        'gr': '#222222',
        'border-bg': '#2d2b2b',
        'border-bg-h': '#3f3f3f',
      },
    },
  },
  plugins: [],
}