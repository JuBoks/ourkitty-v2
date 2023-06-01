import React, { useState, useEffect } from "react";
import Regist from "../components/dish/Regist";
import MyDish from "../components/dish/MyDish";
import ManageLog from "../components/dish/ManageLog";
import DishWeight from "../components/chart/DishWeight";
import HeatMapChart from "../components/chart/HeatMapChart";
import CatButton from "../components/chart/CatButton";
import MainChart from "./../components/chart/MainChart";
import Battery from "./../components/chart/Battery";
import { dishInfo } from "../recoil/dish";
import { getCatNum } from "../apis/api/chart";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

export default function DashBoard() {
  const selectedButton = useRecoilState(dishInfo)[0];
  const [foodAmountList, setFoodAmountList] = useState([]);
  const [batteryAmountList, setBatteryAmountList] = useState([]);
  const [catCountList, setCatCountList] = useState([]);
  const [noTnrCountList, setNoTnrCountList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getCatNum", selectedButton],
    queryFn: () => getCatNum(selectedButton.dishId),
  });

  useEffect(() => {
    if (data !== undefined) {
      setFoodAmountList(data["foodAmountList"]);
      setBatteryAmountList(data["batteryAmountList"]);
      setCatCountList(data["catCountList"]);
      setNoTnrCountList(data["noTnrCountList"]);
    }
  }, [data, selectedButton]);

  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-[45%] h-full flex flex-col gap-2">
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MyDish />
        </div>
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <ManageLog />
        </div>
      </div>
      <div className="w-[50%] bg-white p-1 rounded-lg dark:bg-DarkBackground2 dark:text-white">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <MainChart
              catCountList={catCountList}
              noTnrCountList={noTnrCountList}
            />
          </div>
          <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <DishWeight foodAmountList={foodAmountList} />
          </div>
          <div className="w-full h-[33%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
            <Battery batteryAmountList={batteryAmountList} />
          </div>
        </div>
      </div>
    </div>
  );
}
