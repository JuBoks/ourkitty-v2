import React from "react";
import { DateInfo, DateInfoArray } from "types";
import DateListElement from "./DateListElement";


export default function DateList() {


  const status_dummy = [0, 1, -1, 1, 1, 0, 1]
  let dummy: DateInfoArray = []
  for (let i = 0; i < 7; i++) {
    let obj: DateInfo = { 'date': i, status: status_dummy[i] }
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