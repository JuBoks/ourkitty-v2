import React from "react";
import DefaultDiv from "../DefaultDiv";
import { Pagination } from "@mui/material";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";

export default function AdminLog() {
  const isDark = useRecoilState(darkModeState)[0];
  const data = [
    {
      id: 1,
      author: "작성자1",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 2,
      author: "작성자2",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 3,
      author: "작성자1",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 4,
      author: "작성자2",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 5,
      author: "작성자1",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 6,
      author: "작성자2",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 7,
      author: "작성자2",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 8,
      author: "작성자2",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
  ];
  return (
    <DefaultDiv>
      <div className="flex flex-col h-full w-[950px] rounded-xl dark:bg-WebDarkBackground2">
        <h1 className="m-3 text-[2rem] font-bold dark:text-white">관리 로그</h1>
        <div className="m-3 w-full">
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full flex flex-row justify-center">
                <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                  작성자
                </th>
                <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                  상태
                </th>
                <th className="w-[400px] py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                  내용
                </th>
                <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                  작성일자
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <tr
                      className="w-full flex flex-row justify-center"
                      key={item.id}
                    >
                      <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black dark:text-white">
                        {item.author}
                      </td>
                      <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black dark:text-white">
                        {item.state}
                      </td>
                      <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate dark:border-black dark:text-white">
                        {item.content}
                      </td>
                      <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black dark:text-white">
                        {item.date}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr
                      className="w-full flex flex-row justify-center"
                      key={item.id}
                    >
                      <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                        {item.author}
                      </td>
                      <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                        {item.state}
                      </td>
                      <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                        {item.content}
                      </td>
                      <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                        {item.date}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-5">
            {isDark ? (
              <Pagination count={10} color="secondary" />
            ) : (
              <Pagination count={10} color="primary" />
            )}
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
