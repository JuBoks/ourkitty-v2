import React, { useEffect } from "react";

export default function ClusteringChartImage({ selectedImg }: any) {
  return (
    <div className="flex flex-row justify-center w-full h-[calc(100%-55px)]">
      <img src={selectedImg.image} className="w-full h-full" />
    </div>
  )
}