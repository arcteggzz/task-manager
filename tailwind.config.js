/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7f56d9",
      },
      boxShadow: {
        card: "0 8px 24px rgba(127, 86, 217, 0.15)",
        header: "0 8px 24px rgba(230, 220, 250, 0.15)",
      },
    },
  },
  plugins: [],
};
