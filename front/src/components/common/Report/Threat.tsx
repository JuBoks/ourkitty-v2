import React, { useState } from "react";
import DefaultDiv from "../DefaultDiv";
import { Pagination } from "@mui/material";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";
import Swal from "sweetalert2";

interface reportContent {
  id: number;
  author: string;
  images: string[];
  title: string;
  content: string;
  date: string;
  state: string;
}
export default function Threat() {
  const isDark = useRecoilState(darkModeState)[0];
  const [clickData, setClickData] = useState({
    id: 0,
    author: "",
    images: [""],
    title: "",
    content: "",
    date: "",
    state: "",
  });
  const data = [
    {
      id: 1,
      author: "작성자1",
      images: [""],
      title: "제목 1",
      content: "내용1",
      date: "2023.04.18",
      state: "진행중",
    },
    {
      id: 2,
      author: "작성자2",
      images: [""],
      title: "제목 2",
      content: "내용2",
      date: "2023.04.18",
      state: "완료",
    },
    {
      id: 3,
      author: "작성자3",
      images: [""],
      title: "제목 3",
      content: "내용3",
      date: "2023.04.18",
      state: "진행중",
    },
    {
      id: 4,
      author: "작성자4",
      images: [""],
      title: "제목 4",
      content: "내용4",
      date: "2023.04.18",
      state: "진행중",
    },
    {
      id: 5,
      author: "작성자5",
      images: [""],
      title: "제목 5",
      content: "내용5",
      date: "2023.04.18",
      state: "완료",
    },
    {
      id: 6,
      author: "작성자6",
      images: [""],
      title: "제목 6",
      content: "내용6",
      date: "2023.04.18",
      state: "진행중",
    },
    {
      id: 7,
      author: "작성자7",
      images: [""],
      title: "제목 7",
      content: "내용7",
      date: "2023.04.18",
      state: "진행중",
    },
    {
      id: 8,
      author: "작성자8",
      images: [""],
      title: "제목 8",
      content: "내용8",
      date: "2023.04.18",
      state: "진행중",
    },
  ];

  const handleReport = (item: reportContent) => {
    setClickData({
      id: item.id,
      author: item.author,
      images: item.images,
      title: item.title,
      content: item.content,
      date: item.date,
      state: item.state,
    });
  };

  const handleComplete = () => {
    const reportId = clickData.id;

    const Toast = Swal.mixin({
      toast: true, // 토스트 형식
      position: "bottom-end", // 알림 위치
      showConfirmButton: false, // 확인버튼 생성 유무
      timer: 2000, // 지속 시간
      timerProgressBar: true, // 지속시간바 생성 여부
    });

    Toast.fire({
      icon: "success",
      title: "완료처리되었습니다.",
    });

    setClickData({
      id: 0,
      author: "",
      images: [""],
      title: "",
      content: "",
      date: "",
      state: "",
    });
  };

  const handleDoneReport = () => {
    const Toast = Swal.mixin({
      toast: true, // 토스트 형식
      position: "bottom-end", // 알림 위치
      showConfirmButton: false, // 확인버튼 생성 유무
      timer: 2000, // 지속 시간
      timerProgressBar: true, // 지속시간바 생성 여부
    });

    Toast.fire({
      icon: "warning",
      title: "이미 처리된 민원입니다.",
    });
  };
  return (
    <DefaultDiv>
      <div className="relative flex flex-col gap-2 my-2 h-[98%] w-[950px] rounded-xl dark:bg-WebDarkBackground2 p-2">
        <h1 className="mx-5 my-2 text-[2rem] font-bold dark:text-white">
          테러 / 위협
        </h1>
        <div className="h-[50%]">
          <div className="m-3 w-full">
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row justify-center">
                  <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    작성자
                  </th>
                  <th className="w-[400px] py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    제목
                  </th>
                  <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    작성일자
                  </th>
                  <th className="w-36 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <tr
                        className="w-full flex flex-row justify-center w-[864px] m-auto hover:bg-[#5D6DBEAA] dark:text-white"
                        key={item.id}
                        onClick={() =>
                          item.state === "완료"
                            ? handleDoneReport()
                            : handleReport(item)
                        }
                      >
                        <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black">
                          {item.author}
                        </td>
                        <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate dark:border-black">
                          {item.title}
                        </td>
                        <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black">
                          {item.date}
                        </td>
                        <td className="w-36 py-2 border-x-2 border-white text-center dark:border-black">
                          {item.state}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        className="w-full flex flex-row justify-center m-auto w-[864px] bg-[#9FA9D555] hover:bg-[#5D6DBEAA] dark:bg-[#29325B55] dark:text-white dark:hover:bg-[#5D6DBEAA]"
                        key={item.id}
                        onClick={() =>
                          item.state === "완료"
                            ? handleDoneReport()
                            : handleReport(item)
                        }
                      >
                        <td className="w-40 py-2 border-x-2 border-white text-center  dark:border-black">
                          {item.author}
                        </td>
                        <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate  dark:border-black">
                          {item.title}
                        </td>
                        <td className="w-40 py-2 border-x-2 border-white text-center  dark:border-black">
                          {item.date}
                        </td>
                        <td className="w-36 py-2 border-x-2 border-white text-center dark:border-black">
                          {item.state}
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
        <hr />
        <div className="h-[50%] m-3">
          <div className="w-full h-full">
            <div className="relative flex flex-row gap-10">
              <div className="h-12 text-[1.2rem] font-bold dark:text-white">
                {clickData.title}
              </div>
              <div className="mt-1 dark:text-white">{clickData.author}</div>
              <div
                className="absolute right-0 bg-WebMain px-5 py-2 rounded-xl opacity-70 font-bold hover:opacity-100 dark:bg-WebDarkMain dark:text-white"
                onClick={() => handleComplete()}
              >
                완료
              </div>
            </div>
            <div className="flex flex-row gap-3 w-full h-full justify-center">
              <div className="flex flex-col gap-3 w-[50%]">
                <div className="h-[60%] rounded-xl">
                  이미지1
                  <img src={clickData.images[0]} alt="" />
                </div>
                <div className="flex flex-row gap-3 h-[40%]">
                  <div className="w-[50%] rounded-xl">
                    이미지2
                    <img src={clickData.images[1]} alt="" />
                  </div>
                  <div className="w-[50%] rounded-xl">
                    이미지3
                    <img src={clickData.images[2]} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-[50%] h-[90%] bg-LightGray rounded-xl text-[1.2rem] p-2 dark:bg-WebDarkBackground dark:text-white">
                {clickData.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
