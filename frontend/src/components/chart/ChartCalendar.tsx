import { getClusterStatus } from "apis/api/cluster";
import { getKRTime } from "apis/utils/common";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { selectedButtonState, selectedDateState, selectedSerialNumberState, selectedTnrState } from "recoil/chart";

export default function ChartCalendar() {
  const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(selectedSerialNumberState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedDateObj, setSelectedDateObj] = useState<Date>();
  const [selectedTnr, setSelectedTnr] = useRecoilState(selectedTnrState);

  // useEffect
  useEffect(() => {
    // Date 오늘로 초기화
    const date_obj = new Date();
    const { date_str } = getKRTime(new Date());
    setSelectedDate(date_str);
    setSelectedDateObj(date_obj);
  }, [selectedButton]);

  // Get Calendar Status Data
  const { data, isLoading } = useQuery({
    queryKey: ["getClusterStatus", selectedSerialNumber, selectedTnr],
    queryFn: () => getClusterStatus(selectedSerialNumber),
  });

  const onClickHandling = (value: Date) => {
    const { date_obj, date_str } = getKRTime(value);
    setSelectedDateObj(date_obj);
    setSelectedDate(date_str);
  };

  const tileContent = ({ date }: { date: Date }) => {
    if (data === undefined) return <div className="dot white"></div>;

    const { date_str } = getKRTime(date);
    if (data[date_str] === 1) {
      return <div className="dot green"></div>;
    } else if (data[date_str] === 0) {
      return <div className="dot red"></div>;
    }

    return <div className="dot white"></div>;
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
