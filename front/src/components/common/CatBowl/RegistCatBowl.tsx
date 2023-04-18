import React, { useState, useRef } from "react";
import DefaultDiv from "../DefaultDiv";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../../recoil/states/page";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import KakaoMapClick from "../KakaoMapClick";

export default function RegistCatBowl() {
  const isDark = useRecoilState(darkModeState)[0];
  const file1 = useRef() as React.MutableRefObject<HTMLInputElement>;
  const file2 = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const imagePreview1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setImage1(URL.createObjectURL(e.target.files[0]));
  };

  const deleteImage1 = (e: any) => {
    e.stopPropagation();
    URL.revokeObjectURL(image1);
    setImage1("");
  };

  const imagePreview2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setImage2(URL.createObjectURL(e.target.files[0]));
  };

  const deleteImage2 = (e: any) => {
    e.stopPropagation();
    URL.revokeObjectURL(image2);
    setImage2("");
  };

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
              <div
                className="relative w-[300px] h-60 bg-LightGray rounded-xl dark:bg-Gray"
                onClick={() => file1.current.click()}
              >
                {image1 ? (
                  <div
                    className="absolute right-2 top-2"
                    onClick={deleteImage1}
                  >
                    <CancelIcon sx={{ color: "white" }} />
                  </div>
                ) : (
                  <div className="absolute top-[40%] right-[40%]">
                    <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                  </div>
                )}
                {image1 && (
                  <img
                    src={image1}
                    alt="img1"
                    className="w-full h-full rounded-xl"
                  />
                )}
              </div>
              <input
                ref={file1}
                className="hidden"
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                onChange={imagePreview1}
              />
              <div
                className="relative w-[300px] h-60 bg-LightGray rounded-xl dark:bg-Gray"
                onClick={() => file2.current.click()}
              >
                {image2 ? (
                  <div
                    className="absolute right-2 top-2"
                    onClick={deleteImage2}
                  >
                    <CancelIcon sx={{ color: "white" }} />
                  </div>
                ) : (
                  <div className="absolute top-[40%] right-[40%]">
                    <AddPhotoAlternateIcon sx={{ fontSize: "50px" }} />
                  </div>
                )}
                {image2 && (
                  <img
                    src={image2}
                    alt="img2"
                    className="w-full h-full rounded-xl"
                  />
                )}
              </div>
              <input
                ref={file2}
                className="hidden"
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                onChange={imagePreview2}
              />
            </div>
            <div className="w-[620px] h-[350px] rounded-xl">
              <KakaoMapClick />
            </div>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
