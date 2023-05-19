/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF2E1",
        red: "#F41406",
        yellow: "#FFCD4A",
      },
      backgroundImage: {
        page1: "url('/src/assets/screen.png')",
      },
    },
    fontFamily: {
      noto: ["Noto Serif KR", "serif"],
    },
    animation: {
      floating: "floating 3s infinite ease-in-out",
      floating2: "floating 2s infinite ease-in-out",
    },
    keyframes: {
      floating: {
        "0%": { transform: "translate(0, 0px)" },
        "50%": { transform: "translate(0, 8px)" },
        "100%": { transform: "translate(0, -0px)" },
      },
    },
  },
  plugins: [],
};
