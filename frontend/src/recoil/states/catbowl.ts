import { atom } from "recoil";

export const catbowlInfo = atom({
  key: "catbowlInfo",
  default: {
    serial: "",
    name: "",
    content: "",
    img1: "",
    img2: "",
    latlng: {
      lat: 0,
      lng: 0,
    },
  },
});
