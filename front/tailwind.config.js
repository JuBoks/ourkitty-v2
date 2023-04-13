/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        WebMain: "#9FA9D8",
        WebDarkMain: "#29325B",
        WebDarkBackground: "#262D33",
        WebDarkBackground2: "#585858",
        LightGray: "#F5F5F5",
        Gray: "#B0B0B0",
      },
    },
  },
  plugins: [],
};
