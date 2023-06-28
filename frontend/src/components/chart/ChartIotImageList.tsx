import React, { useEffect, useState } from "react";
import ChartIoTImage from "./ChartIoTImage";
import { selectedDateState, selectedSerialNumberState } from "recoil/chart";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { getClusterInfo } from "apis/api/cluster";

export default function ChartIoTImageList() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedSerialNumber, setSelectedSerialNumber] = useRecoilState(
    selectedSerialNumberState
  );
  const [imageList, setImageList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["getClusterInfo", selectedSerialNumber, selectedDate],
    queryFn: () => getClusterInfo(selectedSerialNumber, selectedDate),
  });

  useEffect(() => {
    if (data === undefined || (data && data.content === null)) {
      setImageList([]);
      return;
    }

    setImageList(data.content.representative_images);
  }, [data]);

  return (
    <div className="w-full h-[90%] p-1 flex flex-row gap-4 overflow-auto">
      {imageList.length === 0 ? (
        <>
          <div>이미지가 없습니다.</div>
        </>
      ) : (
        <>
          {imageList.map((info, index) => {
            const imageUrl = info[1];
            return <ChartIoTImage imageUrl={imageUrl} key={index} />;
          })}
        </>
      )}
    </div>
  );
}
