/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        LightMain: "#9FA9D8",
        DarkMain: "#29325B",
        LightBackground: "#EFEFEF",
        DarkBackground: "#262D33",
        DarkBackground2: "#585858",
        LightHeader1: "#535353",
        LightHeader2: "#6A6A6A",
        DarkHeader1: "#000000",
        DarkHeader2: "#262626",
        CancelBtn: "#B0B0B0",
        LightInput: "#F0F0F0",
        DarkInput: "#262D33",
      },
    },
  },
  plugins: [],
};
