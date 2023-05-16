import React from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "recoil/chart";
import { DateInfo, DateInfoArray } from "types";
import DateListElement from "./DateListElement";

type Props = {
  statusList: DateInfoArray
}

export default function DateList({ statusList }: Props) {
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

  console.log('tttt', dates)

  return (
    <div className="w-full h-full gap-1 flex flex-row">
      {dates && dates.map((el) =>
        <DateListElement date={1} status={1} dateDisplay={el} />
      )}
    </div>
  );
}