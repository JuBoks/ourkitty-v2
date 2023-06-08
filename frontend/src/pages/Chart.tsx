import React, { useState, useEffect } from "react";
import DishWeight from "../components/chart/DishWeight";
import HeatMapChart from "../components/chart/HeatMapChart";
import CatButton from "../components/chart/CatButton";
import MainChart from './../components/chart/MainChart';
import ChartCalendar from './../components/chart/ChartCalendar';
import Battery from './../components/chart/Battery';
import { selectedButtonState } from "../recoil/chart";
import { getCatNum } from "../apis/api/chart";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import Loading from "../components/common/LoadingHeatMap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import "../css/Calendar.css";

export default function Chart() {

  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  const [foodAmountList, setFoodAmountList] = useState([])
  const [batteryAmountList, setBatteryAmountList] = useState([])
  const [catCountList, setCatCountList] = useState([])
  const [noTnrCountList, setNoTnrCountList] = useState([])

  const { data, isLoading } = useQuery({
    queryKey: ["getCatNum", selectedButton],
    queryFn: () => getCatNum(selectedButton),
  });

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (data !== undefined) {
      setFoodAmountList(data["foodAmountList"])
      setBatteryAmountList(data["batteryAmountList"])
      setCatCountList(data["catCountList"])
      setNoTnrCountList(data["noTnrCountList"])
    }
  }, [data, selectedButton]);

  if (isLoading || data === undefined) return (<div><Loading/></div>);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-2">
      <div className="w-[16%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <CatButton/>
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-[33%] flex flex-row gap-2">
          <div className="w-[60%] h-full bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <Calendar className="custom-calendar" value={value} />
          </div>
          <div className="w-[40%] h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            정보
          </div>
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          촬영된 고양이
          <button className="check">
              x
          </button>
        </div>
        <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MainChart catCountList={catCountList} noTnrCountList={noTnrCountList}/>
        </div>
      </div>
      <div className="w-[42%] h-full flex flex-col gap-2">
        <div className="w-full h-full bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <HeatMapChart/>
        </div>
      </div>
    </div>
  );
}
