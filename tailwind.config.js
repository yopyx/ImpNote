/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: { max: "320px" },
      sm: { max: "576px" },
      md: { max: "768px" },
      lg: { max: "992px" },
      xl: { max: "1200px" },
      "2xl": { max: "1536px" },
    },
  },
  plugins: [],
};
