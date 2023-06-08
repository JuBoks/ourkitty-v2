import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";

export default function ChartCalendar() {

  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar  value={value} />
    </div>
  );
}
