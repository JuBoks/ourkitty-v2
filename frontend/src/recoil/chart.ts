import { atom } from "recoil";


export const selectedButtonState = atom({
  key: "selectedButtonState",
  default: 1,
});

export const selectedDateState = atom({
  key: "selectedDateState",
  default: 0,
});
