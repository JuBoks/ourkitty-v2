import { atom } from "recoil";

export const selectSido = atom({
  key: "selectSidoRec",
  default: { sidoCode: "", sidoName: "", data1: [], data2: [] },
});
