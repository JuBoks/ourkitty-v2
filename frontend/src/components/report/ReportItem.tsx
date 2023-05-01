import React, { useState } from "react";
import ReportTable from "./ReportTable";
import { useRecoilState } from "recoil";
import {
  selectReportDishId,
  selectReportCategoryId,
  selectReportSearchKey,
  inputReportSearchWord,
} from "../../recoil/report";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";

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

export default function ReportItem() {
  const [dishId, setDishId] = useRecoilState(selectReportDishId);
  const [categoryId, setCategoryId] = useRecoilState(selectReportCategoryId);
  const [searchKey, setSearchKey] = useRecoilState(selectReportSearchKey);
  const [searchWord, setSearchWord] = useRecoilState(inputReportSearchWord);
  const [isChange, setIsChange] = useState(false);

  // 냥그릇 아이디
  const handleDishId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDishId(Number(e.target.value));
  };

  // 민원 카테고리
  const handleCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  // 검색 키
  const handleSearchKey = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchKey(e.target.value);
  };

  // 검색어
  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getDishList"],
    queryFn: () => getDishList(),
  });

  if (isLoading || data === undefined) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row gap-4">
        <select
          className="w-36 h-10 outline-none dark:bg-DarkBackground2"
          name="selectDish"
          id="selectDish"
          value={dishId}
          onChange={handleDishId}
        >
          <option value="0">냥그릇 이름</option>
          {data.data.map((item: detailData) => (
            <option key={item.dishId} value={item.dishId}>
              {item.dishName}
            </option>
          ))}
        </select>
        <select
          className="w-36 h-10 outline-none dark:bg-DarkBackground2"
          name="selectCategory"
          id="selectCategory"
          value={categoryId}
          onChange={handleCategoryId}
        >
          <option value="">카테고리</option>
          <option value="0040001">장비 불량</option>
          <option value="0040002">테러/위협</option>
          <option value="0040003">분실 신고</option>
        </select>
        <div className="w-[430px] h-10 x-4 border-2 border-slate-300 flex flex-row gap-2 rounded-lg">
          <select
            className="border-r-2 border-slate-300 px-3 outline-none rounded-l-lg dark:bg-DarkBackground2"
            name=""
            id=""
            value={searchKey}
            onChange={handleSearchKey}
          >
            <option value="0070001">제목</option>
            <option value="0070002">내용</option>
          </select>
          <input
            className="outline-none dark:bg-DarkBackground2"
            type="text"
            value={searchWord}
            onChange={handleSearchWord}
          />
        </div>
      </div>
      <ReportTable />
    </div>
  );
}
