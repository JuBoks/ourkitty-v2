import React, { useState } from "react";
import { Pagination } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRecoilState } from "recoil";
import {
  selectReportDishId,
  selectReportCategoryId,
  selectReportSearchKey,
  inputReportSearchWord,
  reportDetailId,
  isReportStateChange,
} from "../../recoil/report";
import { useQuery } from "react-query";
import { getReportList } from "../../apis/api/report";

interface doList {
  client: {
    clientAddress: string;
    clientEmail: string;
    clientId: number;
    clientName: string;
    clientNickname: string;
    clientProfileImagePath: string;
    createdDate: string;
    isDeleted: boolean;
    lastPostingDate: string;
    locationCode: string;
    updateCode: string;
    userCode: string;
  };
  createdDate: string;
  dishId: number;
  isDeleted: boolean;
  reportCategory: string;
  reportContent: string;
  reportId: number;
  reportImageList: {
    createdDate: string;
    imagePath: string;
    isDeleted: boolean;
    reportImageId: number;
    updatedDate: string;
  };
  reportState: string;
  reportTitle: string;
  updatedDate: string;
}
export default function ReportTable() {
  const [selectedReportId, setSelectReportId] = useRecoilState(reportDetailId);

  const dishId = useRecoilState(selectReportDishId)[0];
  const categoryId = useRecoilState(selectReportCategoryId)[0];
  const searchKey = useRecoilState(selectReportSearchKey)[0];
  const searchWord = useRecoilState(inputReportSearchWord)[0];
  const isChange = useRecoilState(isReportStateChange)[0];

  const LIMIT = selectedReportId === 0 ? 8 : 18;
  const [offset, setOffset] = useState(1);
  const [isAscending, setIsAscending] = useState(true); // 정렬

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setOffset(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "getReportList",
      offset,
      dishId,
      categoryId,
      searchKey,
      searchWord,
      isChange,
    ],
    queryFn: () =>
      getReportList(
        LIMIT,
        LIMIT * (offset - 1),
        dishId,
        categoryId,
        searchKey,
        searchWord
      ),
  });

  if (isLoading || data === undefined) return null;

  const totalPage = Math.ceil(data.data.totalCount / LIMIT);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="absolute right-0 top-3">
        {isAscending ? (
          <button onClick={() => setIsAscending(false)}>
            <ArrowDropUpIcon sx={{ color: "white", fontSize: "40px" }} />
          </button>
        ) : (
          <button onClick={() => setIsAscending(true)}>
            <ArrowDropDownIcon sx={{ color: "white", fontSize: "40px" }} />
          </button>
        )}
      </div>

      <table className="mt-3 w-full">
        <thead className="w-full">
          <tr className="w-full flex flex-row justify-center bg-LightMain text-white dark:bg-DarkMain">
            <th className="text-sm w-[10%] py-2 px-2">작성자</th>
            <th className="text-sm w-[25%] py-2 px-2">제목</th>
            <th className="text-sm w-[35%] py-2 px-2 text-left">내용</th>
            <th className="text-sm w-[15%] py-2 px-2">작성일자</th>
            <th className="text-sm w-[10%] py-2 px-2">상태</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {isAscending ? (
            <>
              {data.data.todoList.map((item: doList, index: number) => (
                <tr
                  key={item.reportId}
                  className={`w-full flex flex-row justify-center hover:bg-LightMainHover dark:hover:bg-DarkMainHover cursor-pointer ${
                    index % 2 === 1 ? "bg-gray-100 dark:bg-zinc-500" : null
                  }`}
                  onClick={() => setSelectReportId(item.reportId)}
                >
                  <td className="w-[10%] text-center py-1.5 px-2">
                    {item.client.clientName}
                  </td>
                  <td className="w-[25%] text-center py-1.5 px-2 truncate">
                    {item.reportTitle}
                  </td>
                  <td className="w-[35%] py-1.5 px-2 truncate">
                    {item.reportContent}
                  </td>
                  <td className="w-[15%] text-center py-1.5 px-2">
                    {item.updatedDate.split("T")[0]}
                  </td>
                  <td className="w-[10%] text-center font-bold py-1.5 px-2">
                    미완료
                  </td>
                </tr>
              ))}
              {data.data.doneList.map((item: doList, index: number) => (
                <tr
                  key={item.reportId}
                  className={`w-full flex flex-row justify-center hover:bg-LightMainHover dark:hover:bg-DarkMainHover cursor-pointer ${
                    index % 2 === 1 ? "bg-gray-100 dark:bg-zinc-500" : null
                  }`}
                  onClick={() => setSelectReportId(item.reportId)}
                >
                  <td className="w-[10%] text-center py-1.5 px-2">
                    {item.client.clientName}
                  </td>
                  <td className="w-[25%] text-center py-1.5 px-2">
                    {item.reportTitle}
                  </td>
                  <td className="w-[35%] py-1.5 px-2 truncate">
                    {item.reportContent}
                  </td>
                  <td className="w-[15%] text-center py-1.5 px-2">
                    {item.updatedDate.split("T")[0]}
                  </td>
                  <td className="w-[10%] text-center font-bold py-1.5 px-2">
                    완료
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {data.data.doneList.map((item: doList, index: number) => (
                <tr
                  key={item.reportId}
                  className={`w-full flex flex-row justify-center hover:bg-LightMainHover dark:hover:bg-DarkMainHover cursor-pointer ${
                    index % 2 === 1 ? "bg-gray-100 dark:bg-zinc-500" : null
                  }`}
                  onClick={() => setSelectReportId(item.reportId)}
                >
                  <td className="w-[10%] text-center py-1.5 px-2">
                    {item.client.clientName}
                  </td>
                  <td className="w-[25%] text-center py-1.5 px-2">
                    {item.reportTitle}
                  </td>
                  <td className="w-[35%] py-1.5 px-2 truncate">
                    {item.reportContent}
                  </td>
                  <td className="w-[15%] text-center py-1.5 px-2">
                    {item.updatedDate.split("T")[0]}
                  </td>
                  <td className="w-[10%] text-center font-bold py-1.5 px-2">
                    완료
                  </td>
                </tr>
              ))}
              {data.data.todoList.map((item: doList, index: number) => (
                <tr
                  key={item.reportId}
                  className={`w-full flex flex-row justify-center hover:bg-LightMainHover dark:hover:bg-DarkMainHover cursor-pointer ${
                    index % 2 === 1 ? "bg-gray-100 dark:bg-zinc-500" : null
                  }`}
                  onClick={() => setSelectReportId(item.reportId)}
                >
                  <td className="w-[10%] text-center py-1.5 px-2">
                    {item.client.clientName}
                  </td>
                  <td className="w-[25%] text-center py-1.5 px-2">
                    {item.reportTitle}
                  </td>
                  <td className="w-[35%] py-1.5 px-2 truncate">
                    {item.reportContent}
                  </td>
                  <td className="w-[15%] text-center py-1.5 px-2">
                    {item.updatedDate.split("T")[0]}
                  </td>
                  <td className="w-[10%] text-center font-bold py-1.5 px-2">
                    미완료
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="absolute left-[40%] bottom-0">
        <Pagination
          count={totalPage}
          sx={{ color: "#9FA9D8" }}
          page={offset}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
