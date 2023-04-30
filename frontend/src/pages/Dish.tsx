import React from "react";
import Regist from "../components/dish/Regist";
import MyDish from "../components/dish/MyDish";
import ManageLog from "../components/dish/ManageLog";

export default function Dish() {
  return (
    <div className="w-full h-full flex flex-row gap-[15px] p-3">
      <div className="w-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
        <Regist />
      </div>
      <div className="w-[50%] h-full flex flex-col gap-2">
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <MyDish />
        </div>
        <div className="w-full h-[50%] bg-white p-3 rounded-lg dark:bg-DarkBackground2 dark:text-white">
          <ManageLog />
        </div>
      </div>
    </div>
  );
}
