import React from "react";
import { ClusterRepresentative } from "types/Clusters";
import ClusteringResultList from "./ClusteringResultList";

type Props = {
  data?: ClusterRepresentative[];
};

export default function ClusteringResult({ data }: Props) {

  return (
    <div className="w-full h-full gap-1">
      <h1 className="text-[1.3rem] font-bold" >분류된 이미지</h1>
      <ClusteringResultList data={data} />
    </div>
  );
}
