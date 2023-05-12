import React from "react";
import MyDishButtons from "../common/MyDishButton3";

export default function CatButton() {


  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold" >관할 냥그릇</h1>
      <div className="h-[90%] w-full" style={{marginTop: '2rem'}}>
        <MyDishButtons/>
      </div>
    </div>
  );
}
