import React from "react";
import { DateInfo } from "types";
import { useRecoilState } from "recoil";
import { selectedDateState } from "../../recoil/chart";

export default function DateListElement({ date, status }: DateInfo) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const today = new Date();
  let _dates: string[] = [];
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (index + 1));

    const _year = date.toLocaleDateString('en-US', { year: 'numeric' });
    const month = date.toLocaleDateString('ko-KR', { month: 'short' });
    const _month = date.toLocaleDateString('en-US', { month: '2-digit' });
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    const _day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' });

    _dates.unshift(`${_year}-${_month}-${_day}`);
    return `${month} ${day} ${weekday}`;
  }).reverse();

  let color = 'bg-LightInput'
  // if (status === 0) {
  //   color = "bg-pink-200"
  // } else if (status === 1) {
  //   color = "bg-blue-200"
  // }



  const handleClick = (date: number) => {
    setSelectedDate(_dates[date]);
  };


  return (
    <button onClick={() => handleClick(date)} className={`w-full h-full box-border border-2 rounded-md border-LightMain text-[1.2rem] gap-1 text-center basis-1/7 font-semibold ${color}`}>
      {dates[date]}
    </button>
  );
}
