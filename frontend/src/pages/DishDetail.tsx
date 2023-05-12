import React from "react";
import CatButton from "../components/chart/CatButton";
import ClusteringChart from "../components/dishDetail/ClusteringChart";
import DateList from "../components/dishDetail/DateList";
import ClusteringResult from '../components/dishDetail/ClusteringResult';

export default function DishDetail() {
  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton />
        </div>
      </div>
      <div className="w-[84%] h-full flex flex-col gap-2">
        <div className="w-full h-[60px] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <DateList />
        </div>
        <div className="w-full h-[calc(100%-60px)] flex flex-row gap-2">
          <div className="w-[70%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ClusteringChart />
          </div>
          <div className="w-[30%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <ClusteringResult />
          </div>
        </div>
      </div>
    </div>
  );
}
