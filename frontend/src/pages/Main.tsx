import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginState } from "../recoil/states/user";
import { categoryState } from "../recoil/states/page";
import DashBoard from "./DashBoard";
import User from "./User";
import CatBowl from "./CatBowl";
import Report from "./Report";
import Chart from "./Chart";

export default function Main() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const isLogin = useRecoilState(isLoginState)[0];
  const currentCategory = useRecoilState(categoryState)[0];

  const handleUserId = (e: any) => {
    setUserId(e.target.value);
  };

  const handleUserPw = (e: any) => {
    setUserPw(e.target.value);
  };

  return (
    <>
      {isLogin ? (
        currentCategory[0] ? (
          <DashBoard />
        ) : currentCategory[1] ? (
          <User />
        ) : currentCategory[2] ? (
          <CatBowl />
        ) : currentCategory[3] ? (
          <Report />
        ) : (
          <Chart />
        )
      ) : (
        <div className="flex flex-col gap-10 justify-center w-screen">
          <div className="w-[80%] h-60 flex flex-col mx-auto rounded-xl max-w-[1000px] shadow-xl justify-center dark:bg-WebDarkBackground2">
            <div className="flex flex-row gap-8">
              <div className="flex flex-col basis-1/5 text-right gap-[53px] mt-3 text-WebMain font-bold dark:text-white">
                <span>ID</span>
                <span>PW</span>
              </div>
              <div className="flex flex-col basis-3/5 gap-10">
                <input
                  className="w-[80%] h-10 bg-LightGray rounded-xl bg-pghtGray outpne-none pl-2"
                  type="text"
                  onChange={handleUserId}
                />
                <input
                  className="w-[80%] h-10 bg-LightGray rounded-xl bg-pghtGray outpne-none pl-2"
                  type="password"
                  onChange={handleUserPw}
                />
              </div>
              <div className="login-btn opacity-80 flex flex-col w-[130px] h-[120px] mr-16 justify-center text-center rounded-[50%] bg-WebMain text-white font-bold cursor-pointer hover:opacity-100 dark:bg-WebDarkMain dark:hover:opacity-100">
                로그인
              </div>
            </div>
          </div>
          <div className="w-[80%] h-[70%] flex flex-col mx-auto max-w-[1000px] justify-center rounded-xl dark:bg-WebDarkBackground2">
            <h1 className="text-WebMain text-[2rem] font-bold ml-5 dark:text-WebDarkMain">
              냥그릇 등록 절차
            </h1>
            <div className="flex flex-col gap-10 text-[1.5rem] ml-10 mt-10 font-semibold dark:text-white">
              <p>1. 설치 장소로 이동 후 IoT 기기를 켠다.</p>
              <p>2. 냥그릇 관리 탭으로 이동한다.</p>
              <p>3. 시리얼 번호, 급식소 이름, 기타 비고 정보를 입력한다.</p>
              <p>4. 현재 위치를 재점검한다.</p>
              <p>5. 설치된 급식소 사진을 촬영 후 업로드 한다.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
