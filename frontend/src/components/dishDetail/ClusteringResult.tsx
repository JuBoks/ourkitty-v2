import React, { useState, useEffect } from "react";
import { ClusterRepresentative } from "types/Clusters";
import ClusteringResultList from "./ClusteringResultList";
import { useRecoilState } from "recoil";
import { selectedDateIndex } from "recoil/chart";
type Props = {
  data?: ClusterRepresentative[];
};

export default function ClusteringResult({ data }: Props) {
  const selected = useRecoilState(selectedDateIndex)[0];
  const [resultData, setResultData] = useState(data);

  useEffect(() => {
    if (selected === undefined || selected === -1) {
      setResultData([]);
    } else {
      setResultData(data);
    }
  }, [selected, data]);

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold">분류된 이미지</h1>
      <ClusteringResultList data={resultData} />
    </div>
  );
}
