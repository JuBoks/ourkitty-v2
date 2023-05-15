import React, { useEffect } from "react";

export default function ClusteringChartImage({ selectedImg }: any) {
  useEffect(() => {
    console.log("selected", selectedImg)
  }, [selectedImg]);

  return (
    <div className="flex flex-row justify-center w-full h-full">
      <img src={selectedImg.image} className="w-full h-full" />
    </div>
  )
}