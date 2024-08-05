/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      "small-screen": "460px",
      "middle-screen": "760px",
      "tablet-screen": "950px",
    },
    extend: {},
  },
  plugins: [],
};
