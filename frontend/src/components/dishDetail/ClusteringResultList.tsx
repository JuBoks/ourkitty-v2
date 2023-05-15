import React from "react";
import { ClusterRepresentative } from "types/Clusters";

type Props = {
  data?: ClusterRepresentative[];
};

export default function ClusteringResultList({ data }: Props) {

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {!data || data.length === 0 ?
        <div className="grid grid-cols-3 gap-2 p-3">사진 없음</div>
        :
        data.map((el, index) => (
          <div key={index} className="w-full">
            <img src={el.image} className="w-full h-full" />
          </div>
        ))
      }
    </div>
  );
}
