import React from "react";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";
import UserCard from "../common/UserCard";

interface detailData {
  createdData: string;
  dishAddress: string;
  dishCatCount: number;
  dishId: number;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSerialNum: string;
  dishTnrCount: number;
  dishWeight: number;
  isDeleted: boolean;
  locationCode: string;
  updatedDate: string;
}

export default function UserHistory() {
  const { data, isLoading } = useQuery({
    queryKey: "getDishList",
    queryFn: () => getDishList(),
  });

  if (isLoading || data === undefined) return null;
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-row gap-5 pt-1 pl-3">
        <h1 className="text-[1.3rem] font-bold">회원 탈퇴 신청</h1>
        <select
          name="selectDish"
          id="selectDish"
          className="w-[150px] outline-none dark:bg-DarkBackground2"
        >
          <option value="0">전체</option>
          {data.data.map((item: detailData) => (
            <option key={item.dishId} value={item.dishId}>
              {item.dishName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-full px-4 flex flex-row gap-8 overflow-x-scroll">
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
        <UserCard></UserCard>
      </div>
    </div>
  );
}
