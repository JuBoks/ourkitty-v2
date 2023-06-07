import React from "react";
import LogTable from "./LogTable";

export default function ManageLog() {
  return (
    <div className="w-full h-full flex flex-col gap-1 relative overflow-y-auto">
      <h1 className="text-[1.3rem] font-bold mb-2">관리 일지</h1>
      <div className="flex flex-row gap-2 mt-1 px-2 bg-LightMain text-white font-bold absolute right-0 dark:bg-DarkMain">
        <div className="flex flex-row gap-1">
          <div className="w-4 h-4 mt-1 bg-State1 rounded-[50%]"></div>
          <span>정상</span>
        </div>
        <div className="flex flex-row gap-1">
          <div className="w-4 h-4 mt-1 bg-State2 rounded-[50%]"></div>
          <span>더러움</span>
        </div>
        <div className="flex flex-row gap-1">
          <div className="w-4 h-4 mt-1 bg-State3 rounded-[50%]"></div>
          <span>파손</span>
        </div>
        <div className="flex flex-row gap-1">
          <div className="w-4 h-4 mt-1 bg-State4 rounded-[50%]"></div>
          <span>분실</span>
        </div>
      </div>
      <div className="w-full h-full bg-white">
        <LogTable />
      </div>
    </div>
  );
}
