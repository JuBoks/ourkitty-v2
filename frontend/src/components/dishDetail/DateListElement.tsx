import React from "react";
import { DateInfo } from "types";

export default function DateListElement({ date, status }: DateInfo) {
  let color = 'bg-LightInput'
  if (status === 0) {
    color = "bg-pink-200"
  } else if (status === 1) {
    color = "bg-blue-200"
  }
  
  const handleClick = () => {
    console.log(date)
  };


  return (
    <button onClick={() => handleClick()} className={`w-full h-full box-border border-2 rounded-md border-LightMain text-[1.2rem] gap-1 text-center basis-1/7 font-semibold ${color}`}>
      {date}
    </button>
  );
}
