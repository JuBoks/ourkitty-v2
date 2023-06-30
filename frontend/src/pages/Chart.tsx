import CatButton from "components/chart/CatButton";
import DishInfo from "components/chart/DishInfo";
import HeatMapChart from "components/chart/HeatMapChart";
import MainChart from "components/chart/MainChart";

import ChartCalendar from "components/chart/ChartCalendar";
import ChartIoTImageList from "components/chart/ChartIotImageList";
import "css/Calendar.css";
import "react-calendar/dist/Calendar.css";

export default function Chart() {
  return (
    <div className="w-[1240px] h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton />
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-[33%] flex flex-row gap-2">
          <ChartCalendar />
          <div className="w-[40%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <DishInfo />
          </div>
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <ChartIoTImageList />
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MainChart />
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <HeatMapChart />
        </div>
      </div>
    </div>
  );
}
