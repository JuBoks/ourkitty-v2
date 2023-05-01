import { atom } from "recoil";

export const selectReportDishId = atom({
  key: "selectReportDishId",
  default: 0,
});

export const selectReportCategoryId = atom({
  key: "selectReportCategoryId",
  default: "",
});

export const selectReportSearchKey = atom({
  key: "selectReportSearchKey",
  default: "0001",
});

export const inputReportSearchWord = atom({
  key: "inputReportSearchWord",
  default: "",
});

export const reportDetailId = atom({
  key: "reportDetailId",
  default: 0,
});

export const isReportStateChange = atom({
  key: "isReportStateChange",
  default: false,
});
