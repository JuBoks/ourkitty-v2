import { atom } from "recoil";

export const dishInfo = atom({
  key: "dishInfo",
  default: {
    dishId: 0,
    dishAddress: "",
    dishLat: 0,
    dishLong: 0,
    dishName: "",
    dishSerialNum: "",
    file: "",
  },
});

export const dishRegist = atom({
  key: "dishRegist",
  default: true,
});

export const dishIdState = atom({
  key: "dishIdState",
  default: 0,
});

export const dishCountState = atom({
  key: "dishCountState",
  default: 0,
});
