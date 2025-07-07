// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Not 'media'
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // ✅ Adjust if needed
  theme: {
    extend: {},
  },
  plugins: [],
};
