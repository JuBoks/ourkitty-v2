import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState, selectedDateIndex } from "recoil/chart";

type Props = {
  statusInfo: any;
};

export default function DateList({ statusInfo }: Props) {
  const today = new Date();
  let _dates: string[] = [];

  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (index + 1));

    const _year = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("ko-KR", { month: "short" });
    const _month = date.toLocaleDateString("en-US", { month: "2-digit" });
    const day = date.toLocaleDateString("ko-KR", { day: "numeric" });
    const _day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "long" });

    _dates.unshift(`${_year}-${_month}-${_day}`);
    return `${month} ${day} ${weekday}`;
  }).reverse();

  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [buttonSelected, setButtonSelected] = useRecoilState(selectedDateIndex);
  const [buttonIndex, setButtonIndex] = useRecoilState(selectedDateIndex);
  const [buttonState, setButtonState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClick = (date: string, index: number) => {
    const newButtons: boolean[] = [];
    for (let i = 0; i < 7; i++) {
      newButtons.push(false);
    }

    newButtons[index] = true;
    setButtonState([...newButtons]);
    setButtonSelected(index);
    setButtonIndex(statusInfo[_dates[index]]);
    setSelectedDate(date);
  };

  return (
    <div className="w-full h-full gap-1 flex flex-row">
      {dates &&
        dates.map((el, index) => (
          <button
            key={index}
            onClick={() => handleClick(_dates[index], index)}
            className={`w-full h-full rounded-md text-[1.2rem] gap-1 text-center basis-1/7 opacity-70 font-medium hover:opacity-100 hover:font-semibold ${statusInfo[_dates[index]] === 0
              ? "bg-red-200 dark:bg-red-500 py-1"
              : statusInfo[_dates[index]] === 1
                ? "bg-LightMainHover dark:bg-DarkMainHover"
                : "bg-LightInput dark:bg-DarkInput"
              } ${buttonState[index] ? "opacity-100 font-semibold outline-none ring ring-purple-300 " : "opacity-70"
              }`}
          >
            {el}
          </button>
        ))}
    </div>
  );
}
