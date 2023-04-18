import React from "react";
import DefaultDiv from "../DefaultDiv";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";

export default function RegistCatBowl() {
  const isDark = useRecoilState(darkModeState)[0];

  const handleConfirmBtn = () => {
    Swal.fire({
      title: "등록/수정 하시겠습니까?",
      icon: "success",
      background: isDark ? "#262D33" : "white",
      color: isDark ? "white" : "black",
      showCancelButton: true,
      confirmButtonColor: "#5D6DBE",
      cancelButtonColor: "#B0B0B0",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 기기 등록/수정 API 요청 전송
      }
    });
  };

  return (
    <DefaultDiv>
      <div className="relative flex flex-col my-2 h-[98%] w-[950px] rounded-xl dark:bg-WebDarkBackground2">
        <div className="absolute flex flex-row gap-5 top-5 right-10">
          <div
            className="px-8 py-3 bg-WebMain rounded-xl text-white font-bold hover:bg-WebMain2 dark:bg-WebDarkMain dark:hover:bg-WebDarkMain2"
            onClick={handleConfirmBtn}
          >
            등록/수정
          </div>
        </div>
        <h1 className="m-5 text-[2rem] font-bold dark:text-white">기기관리</h1>
        <div className="flex flex-row gap-5 justify-center">
          <div className="flex flex-col text-right text-[1rem] font-bold gap-8 mt-3 dark:text-white">
            <span>시리얼 번호</span>
            <span>냥그릇 이름</span>
            <span>비고</span>
            <span className="mt-32">사진 등록</span>
            <span className="mt-52">위치 등록</span>
          </div>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-[620px] h-10 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
            />
            <input
              type="text"
              className="w-[620px] h-10 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
            />
            <input
              type="textarea"
              className="w-[620px] h-40 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
            />
            <div className="flex flex-row gap-5 mt-2">
              <div className="w-[300px] h-60 bg-LightGray rounded-xl dark:bg-Gray"></div>
              <div className="w-[300px] h-60 bg-LightGray rounded-xl dark:bg-Gray"></div>
            </div>
            <div className="w-[620px] h-[350px] bg-black rounded-xl">
              카카오맵
            </div>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
