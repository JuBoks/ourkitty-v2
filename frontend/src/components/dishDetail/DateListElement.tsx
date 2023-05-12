import React from "react";
import { DateInfo } from "types";
import { useRecoilState } from "recoil";
import { selectedDateState } from "../../recoil/chart";

export default function DateListElement({ date, status }: DateInfo) {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (index + 1));
    const month = date.toLocaleDateString('ko-KR', { month: 'short' });
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' });
    return `${month} ${day} ${weekday}`;
  }).reverse();
  
  let color = 'bg-LightInput'
  if (status === 0) {
    color = "bg-pink-200"
  } else if (status === 1) {
    color = "bg-blue-200"
  }

  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  
  const handleClick = (date : number) => {
    setSelectedDate(date);
  };


  return (
    <button onClick={() => handleClick(date)} className={`w-full h-full box-border border-2 rounded-md border-LightMain text-[1.2rem] gap-1 text-center basis-1/7 font-semibold ${color}`}>
      {dates[date]}
    </button>
  );
}
