import { getClusterStatus } from "apis/api/cluster";
import { getKRTime } from "apis/utils/common";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  selectedButtonState,
  selectedDateState,
  selectedSerialNumberState,
} from "recoil/chart";

export default function ChartCalendar() {
  const [selectedButton, setSelectedButton] =
    useRecoilState(selectedButtonState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(
    selectedSerialNumberState
  );
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedDateObj, setSelectedDateObj] = useState<Date>();

  // useEffect
  useEffect(() => {
    // Date 오늘로 초기화
    const date_obj = new Date();
    const { date_str } = getKRTime(new Date());
    setSelectedDate(date_str);
    setSelectedDateObj(date_obj);
  }, [selectedButton]);

  // get Data
  const { data, isLoading } = useQuery({
    queryKey: ["getClusterStatus", selectedSerialNumber],
    queryFn: () => getClusterStatus(selectedSerialNumber),
  });

  const onClickHandling = (value: Date) => {
    const { date_obj, date_str } = getKRTime(value);
    setSelectedDateObj(date_obj);
    setSelectedDate(date_str);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (data === undefined) return null;

    const { date_str } = getKRTime(date);
    if (data[date_str] === 1) {
      return <div className="dot green"></div>;
    } else if (data[date_str] === 0) {
      return <div className="dot red"></div>;
    }

    return null;
  };

  return (
    <div className="w-[60%] h-full bg-white p-0.5 rounded-lg dark:bg-DarkBackground2 dark:text-white">
      <Calendar
        className="custom-calendar h-[100%]"
        value={selectedDateObj}
        onClickDay={onClickHandling}
        tileContent={tileContent}
      />
    </div>
  );
}
