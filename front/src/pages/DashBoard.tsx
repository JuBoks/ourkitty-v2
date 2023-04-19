import React from "react";
import MyCatBowl from "../components/common/CatBowl/MyCatBowl";
import AdminLog from "../components/common/CatBowl/AdminLog";
import BowlChart from "../components/common/Chart/BowlChart";

export default function DashBoard() {
  return (
    <div className="flex flex-row gap-5 mx-5 w-full h-full overflow-x-auto overflow-y-hidden px-1">
      <div className="flex flex-col my-2 gap-2 h-full w-[950px] rounded-xl">
        <div className="h-[48.7%]">
          <MyCatBowl />
        </div>
        <div className="h-[48.7%]">
          <AdminLog />
        </div>
      </div>
      <BowlChart />
    </div>
  );
}
