// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // ✅ Not 'media'
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Adjust if needed
  theme: {
    extend: {
      fontSize: {
        heading: "2rem",
        subheading: "1.5rem",
        paragraph: "1rem",
      },
        fontFamily: {
        dancingFont: ['"Dancing Script"', 'cursive'],
        bodyFont: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
