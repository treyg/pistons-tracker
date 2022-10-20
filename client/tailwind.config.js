const colors = require("tailwindcss/colors");

module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      "primary-dark": "#041E42",
      "primary-light": "#1d42ba",
      red: "#C8102E;",
      green: "#48bb78",
      "stons-black": "#23262d",
    },

    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
    },
  },
  plugins: [],
};
