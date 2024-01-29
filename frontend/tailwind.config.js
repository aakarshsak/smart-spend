/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(242, 250, 255, 0.2)",
        secondary: "rgba(242, 250, 255, .45)",
        tertiary: "#d4deec",
        accent: "#7486bf",
        word: "#4f2488",
        proxy: "#9b9791",
        disabled: "#cdcdcd",
        button: "#b091ff",
        "button-word": "#f8ffac",
        highlight: "#48cf99",
        warning: "#fdb87b",
        error: "#ff4848",
        dark: "#36215b",
        "dark-secondary": "",
      },
      width: {},
    },
  },
  plugins: [],
};
