/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        LightMain: "#9FA9D8",
        LightMainHover: "#9FA9D899",
        DarkMain: "#29325B",
        DarkMainHover: "#29325B88",
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
        ButtonDelete: "#FC5230",
        LightGray: "#F5F5F5",
        State1: "#7DB249",
        State2: "#FFCD4A",
        State3: "#FC5230",
        State3Hover: "#FC523099",
        State4: "#9A30AE",
        BlockUser: "#A7A7A755",
      },
    },
  },
  plugins: [],
};
