import React from "react";
import BowlChart from "../components/common/Chart/BowlChart";
import CatChart from "../components/common/Chart/CatChart";
export default function Chart() {
  return (
    <div className="flex flex-row gap-5 mx-5 w-full h-full overflow-x-auto overflow-y-hidden px-1">
      <CatChart />
      <BowlChart />
    </div>
  );
}
