/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        date: "#6B7280",
        focus: "#6A64F1",
      },
      width: {
        "12/24": "12/24",
      },
    },
  },
  plugins: [],
};
