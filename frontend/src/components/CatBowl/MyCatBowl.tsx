import React, { useState } from "react";
import DefaultDiv from "../common/DefaultDiv";
import KakaoMap from "../common/KakaoMap";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";

export default function MyCatBowl() {
  const LIMIT = 8;
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["getDishList"],
    queryFn: () => getDishList(LIMIT, offset),
  });

  if (isLoading) return null;

  console.log(data);
  return (
    <DefaultDiv>
      <div className="flex flex-col h-full w-[950px] rounded-xl dark:bg-WebDarkBackground2">
        <h1 className="m-3 text-[2rem] font-bold dark:text-white">
          관할 냥그릇
        </h1>
        <div className="m-3 rounded-xl w-full h-full">
          <KakaoMap />
        </div>
      </div>
    </DefaultDiv>
  );
}
