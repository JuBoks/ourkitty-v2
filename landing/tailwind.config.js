/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        MainColor: "#9FA9D8",
      },
    },
    fontFamily: {
      noto: ["Noto Serif KR", "serif"],
    },
  },
  plugins: [],
};
