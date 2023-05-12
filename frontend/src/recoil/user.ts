import { atom } from "recoil";

export const isUserStateChange = atom({
  key: "isUserStateChange",
  default: false,
});

export const selectedUserState = atom({
  key: "selectedUserState",
  default: 0,
});
