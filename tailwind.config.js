/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        beige: "#DCC1AB",
        lightBeige: "#F5F0EC",
        green: "#1B5B31",
      },
    },
  },
  plugins: [],
};
