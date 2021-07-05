const plugin = require("tailwindcss/plugin");
const spinner = require("./tailwindPlugins/spinner.js");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  plugins: [plugin(spinner)],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FF444F",
        },
        line: {
          500: "#EDEDED",
        },
        wallet: {
          500: "#F8F8F8",
        },
        box: {
          500: "#F1F1F1",
        },
        info: {
          200: "#A9D0FF",
          500: "#459AFE",
        },
        success: {
          200: "#eefaf7",
          500: "#12b782",
        },
        warn: {
          200: "#FFDCA3",
          500: "#FFB53B",
        },
        error: {
          200: "#FAA59E",
          500: "#F44336",
        },
      },
      borderRadius: {
        "4xl": "2.25rem",
      },
    },
    fontFamily: {
      sans: [
        '"Exo"',
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        "sans-serif",
      ],
    },
  },
  variants: {
    extend: {},
    opacity: ["responsive", "hover", "focus", "disabled"],
    backgroundColor: ["responsive", "hover", "focus", "disabled"],
    cursor: ["responsive", "hover", "focus", "disabled"],
  },
};
