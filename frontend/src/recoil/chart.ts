import { atom } from "recoil";


export const selectedButtonState = atom({
  key: "selectedButtonState",
  default: 1,
});

export const selectedSerialNumberState = atom({
  key: "selectedSerialNumberState",
  default: "",
});

export const selectedDateState = atom({
  key: "selectedDateState",
  default: "",
});
