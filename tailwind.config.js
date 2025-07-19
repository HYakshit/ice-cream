// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // ✅ Not 'media'
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // ✅ Adjust if needed
  theme: {
    extend: {},
  },
  plugins: [],
};
