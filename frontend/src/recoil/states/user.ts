import { atom } from "recoil";

export const userInfoState = atom({
  key: "recoilUserInfo",
  default: {},
});

export const isLoginState = atom({
  key: "recoilIsLogin",
  default: false,
});
