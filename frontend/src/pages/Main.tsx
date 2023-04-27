import React from "react";
import { useRecoilState } from "recoil";
import { categoryState } from "../recoil/page";
import DashBoard from "./DashBoard";
import User from "./User";
import Dish from "./Dish";
import Report from "./Report";
import Chart from "./Chart";

export default function Main() {
  const category = useRecoilState(categoryState)[0];

  return (
    <div>
      {category[0] ? (
        <DashBoard />
      ) : category[1] ? (
        <User />
      ) : category[2] ? (
        <Dish />
      ) : category[3] ? (
        <Report />
      ) : (
        <Chart />
      )}
    </div>
  );
}
