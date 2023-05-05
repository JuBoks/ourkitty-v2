import React from "react";
import BatteryStatus from "../components/chart/BatteryStatus";
import HeatMapForUsage from "../components/chart/HeatMapForUsage";
import NumOfCat from "../components/chart/NumOfCat";
import MainChart from './../components/chart/MainChart';
import NoTNR from './../components/chart/NoTNR';

export default function Chart() {
  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-[70%] h-full flex flex-col gap-2">
        <div className="w-full h-[60%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MainChart />
        </div>
        <div className="w-full h-[40%] flex flex-row">
          <div className="w-full h-full flex flex-row gap-2">
            <div className="w-[50%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <NumOfCat/>
            </div>
            <div className="w-[50%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <NoTNR/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col gap-2">
        <div className="w-full h-[60%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <HeatMapForUsage/>
        </div>
        <div className="w-full h-[40%] flex flex-row">
          <div className="w-full h-full flex flex-row gap-2">
            <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <BatteryStatus/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
