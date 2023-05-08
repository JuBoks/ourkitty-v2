import React from "react";
import DishWeight from "../components/chart/DishWeight";
import HeatMapForUsage from "../components/chart/HeatMapForUsage";
import CatButton from "../components/chart/CatButton";
import MainChart from './../components/chart/MainChart';
import Battery from '../components/chart/Battery';
import BowlChart from './../components/chart/BowlChart';

export default function Chartt() {
  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-[70%] h-full flex flex-col gap-2">
        <div className="w-full h-[65%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <HeatMapForUsage/>
        </div>
        <div className="w-full h-[35%] flex flex-row">
          {/* <div className="w-full h-full flex flex-row gap-2">
            <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <CatImages />
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col gap-2">
        <div className="w-full h-[65%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <BowlChart/>
        </div>
        <div className="w-full h-[35%] flex flex-row">
          <div className="w-full h-full flex flex-row gap-2">
            <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
              <MainChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
