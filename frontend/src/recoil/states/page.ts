import { atom } from "recoil";

export const darkModeState = atom({
  key: "recoilDarkMode",
  default: false,
});

export const categoryState = atom({
  key: "recoilSelectCategory",
  default: [true, false, false, false, false],
});
