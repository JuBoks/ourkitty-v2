import React from "react";
import { DateInfo } from "types";
import { useRecoilState } from "recoil";
import { selectedDateState } from "recoil/chart";

export default function DateListElement({ date, statusInfo, dateDisplay }: DateInfo) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleClick = (date: string) => {
    setSelectedDate(date);
  };

  let color = 'bg-LightInput'
  if (statusInfo) {
    if (statusInfo[date] === 0) {
      color = "bg-pink-200"
    } else if (statusInfo[date] === 1) {
      color = "bg-blue-200"
    }
  }

  return (
    <button onClick={() => handleClick(date)} className={`w-full h-full box-border border-2 rounded-md border-LightMain text-[1.2rem] gap-1 text-center basis-1/7 font-semibold ${color}`}>
      {dateDisplay}
    </button>
  );
}
