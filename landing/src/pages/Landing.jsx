import React, { useState, useEffect, useReducer } from "react";
import Landing1 from "../components/Landing1";
import Landing2 from "../components/Landing2";
import Landing3 from "../components/Landing3";
import Landing4 from "../components/Landing4";
import LandingMenu from "../components/LandingMenu";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Arrow from "../assets/down-arrow.gif";
import { useRecoilState } from "recoil";
import { selectMenu } from "../recoil/landingState";

export default function Landing() {
  const [clickMenu, setClickMenu] = useState(false);
  const wholePage = document.getElementsByClassName("slider");
  const totalPageNumber = 4;
  const currentPage = useRecoilState(selectMenu)[0];

  const [currentInputs, setCurrentInputs] = useState({
    currentWindowHeight: window.innerHeight,
    currentPage: 0,
  });

  //윈도우 리사이즈 시, 윈도우 사이즈를 조정한다
  const setPageSize = () => {
    setCurrentInputs({
      currentWindowHeight: window.innerHeight,
      currentPage: currentInputs.currentPage,
    });
  };

  //현재 페이지가 몇페이지인지 구하는 함수
  const setPage = () => {
    for (var i = 1; i < totalPageNumber; i++) {
      if (window.scrollY < currentInputs.currentWindowHeight * i) {
        setCurrentInputs({ ...currentInputs, currentPage: i });
        return;
      }
    }
  };

  // Scroll Event와 Resize시 무한 반복 해결
  useEffect(() => {
    window.addEventListener("scroll", setPage);
    window.addEventListener("resize", setPageSize);
    return () => {
      window.removeEventListener("scroll", setPage);
      window.removeEventListener("resize", setPageSize);
    };
  });

  useEffect(() => {
    window.scrollTo(0, currentInputs.currentWindowHeight * currentPage);
  }, [currentPage]);
  window.addEventListener("wheel", (e) => {
    // 마우스 휠을 내릴때
    if (e.deltaY > 0) {
      let p = 1;
      while (p < totalPageNumber) {
        if (currentInputs.currentPage === p) {
          window.scrollTo({
            top: currentInputs.currentWindowHeight * p,
            behavior: "smooth",
          });
        }
        p++;
      }
    }
    // 마우스 휠을 올릴때
    if (e.deltaY < 0) {
      let p = 1;
      while (p < totalPageNumber) {
        if (currentInputs.currentPage === p) {
          window.scrollTo({
            top: currentInputs.currentWindowHeight * (p - 1),
            behavior: "smooth",
          });
        }
        p++;
      }
    }
  });

  return (
    <div className="lider w-screen h-screen transition ease-in-out duratioin-5000">
      {clickMenu ? (
        <LandingMenu setClickMenu={setClickMenu} />
      ) : (
        <div className="w-screen h-screen">
          <hr className="fixed w-screen top-[5vh] border-2 border-Yellow z-20" />
          <div
            className="fixed px-[50px] py-[62px] bg-Yellow rounded-full right-[1vw] top-[2vh] z-20 font-bold text-[1rem] cursor-pointer rotate-45 transition ease-in-out duratioin-5000 hover:transform-none"
            onClick={() => setClickMenu((cur) => !cur)}
          >
            MENU
          </div>
          <div className="fixed w-[10px] bg-Yellow top-0 bottom-0 right-[4vh] my-[5vh] opacity-40 z-20"></div>
          <Landing1 />
          <Landing2 />
          <Landing3 />
          <Landing4 />
          <div className="w-screen fixed bottom-[6vh] text-center z-10">
            <img className="m-auto w-[100px] h-[100px]" src={Arrow} alt="" />
          </div>
          <hr className="fixed w-screen bottom-[5%] border-2 border-Yellow z-20" />
          <p className="fixed w-screen text-white text-xl bottom-[1vh] font-noto">
            <span className=" ml-4 font-bold">catbowl@gmail.com</span>
          </p>
        </div>
      )}
    </div>
  );
}
