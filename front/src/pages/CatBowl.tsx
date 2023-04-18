import React from "react";
import RegistCatBowl from "../components/common/CatBowl/RegistCatBowl";
import MyCatBowl from "../components/common/CatBowl/MyCatBowl";
import AdminLog from "../components/common/CatBowl/AdminLog";

export default function CatBowl() {
  return (
    <div className="flex flex-row gap-5 mx-5 w-full h-full overflow-x-auto overflow-y-hidden px-1">
      <RegistCatBowl />
      <div className="flex flex-col my-2 gap-2 h-full w-[950px] rounded-xl dark:bg-WebDarkBackground2">
        <div className="h-[48.7%]">
          <MyCatBowl />
        </div>
        <div className="h-[48.7%]">
          <AdminLog />
        </div>
      </div>
    </div>
  );
}
