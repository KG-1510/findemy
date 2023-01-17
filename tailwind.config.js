/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primaryblack: "#1C1D1F",
        findemypurple: "#A435EF",
      },
    },
  },
  plugins: [],
};
