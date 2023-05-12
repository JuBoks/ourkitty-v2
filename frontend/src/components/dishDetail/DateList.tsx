import React from "react";
import { DateInfo, DateInfoArray } from "types";
import DateListElement from "./DateListElement";


export default function DateList() {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (index + 1));
    const month = date.toLocaleDateString('ko-KR', { month: 'short' });
    const day = date.toLocaleDateString('ko-KR', { day: 'numeric' });
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' });
    return `${month} ${day} ${weekday}`;
  }).reverse();

  const status_dummy = [0, 1, -1, 1, 1, 0, 1]
  let dummy: DateInfoArray = []
  for (let i = 0; i < 7; i++) {
    let obj: DateInfo = { 'date': dates[i], status: status_dummy[i] }
    dummy.push(obj)
  }

  return (
    <div className="w-full h-full gap-1 flex flex-row">
      {dummy.map(({ date, status }) =>
        <DateListElement date={date} status={status} />
      )}
    </div>
  );
}