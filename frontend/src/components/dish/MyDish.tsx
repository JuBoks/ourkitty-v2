import React from "react";
import MyDishKakaoMap from "./MyDishKakaoMap";

export default function MyDish() {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <h1 className="text-[1.3rem] font-bold">관할 냥그릇</h1>
      <div className="w-full h-full">
        <MyDishKakaoMap />
      </div>
    </div>
  );
}
