import React, { useState, useEffect, useRef } from "react";
import DefaultDiv from "../common/DefaultDiv";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../recoil/states/page";
import { catbowlInfo } from "../../recoil/states/catbowl";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import KakaoMapClick from "../common/KakaoMapClick";

export default function RegistCatBowl() {
  const isDark = useRecoilState(darkModeState)[0];
  const [info, setInfo] = useRecoilState(catbowlInfo);

  const file1 = useRef() as React.MutableRefObject<HTMLInputElement>;
  const file2 = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [serialNum, setSerialNum] = useState("");
  const [bowlName, setBowlName] = useState("");
  const [addContent, setAddContent] = useState("");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
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
    const Toast = Swal.mixin({
      toast: true, // 토스트 형식
      position: "bottom-end", // 알림 위치
      showConfirmButton: false, // 확인버튼 생성 유무
      timer: 2000, // 지속 시간
      timerProgressBar: true, // 지속시간바 생성 여부
    });

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

        // 초기화
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setInfo({
              serial: "",
              name: "",
              content: "",
              img1: "",
              img2: "",
              latlng: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        } else {
          console.log("Geolocation Error");
        }
        Toast.fire({
          icon: "success",
          title: "등록/수정되었습니다.",
        });
      }
    });
  };

  useEffect(() => {
    setSerialNum(info.serial);
    setBowlName(info.name);
    setAddContent(info.content);
    setPosition({ lat: info.latlng.lat, lng: info.latlng.lng });
    setImage1(info.img1);
    setImage2(info.img2);
  }, [info]);

  useEffect(() => {
    // 초기화
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInfo({
          serial: "",
          name: "",
          content: "",
          img1: "",
          img2: "",
          latlng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      console.log("Geolocation Error");
    }
  }, []);

  const handleSerialNum = (e: any) => {
    setSerialNum(e.target.value);
  };

  const handleName = (e: any) => {
    setBowlName(e.target.value);
  };

  const handleContent = (e: any) => {
    setAddContent(e.target.value);
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
              value={serialNum}
              type="text"
              className="w-[620px] h-10 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
              onChange={handleSerialNum}
            />
            <input
              value={bowlName}
              type="text"
              className="w-[620px] h-10 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
              onChange={handleName}
            />
            <input
              value={addContent}
              type="textarea"
              className="w-[620px] h-40 bg-LightGray outline-none pl-2 rounded-xl dark:bg-Gray"
              onChange={handleContent}
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
                    <CancelIcon />
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
                    <CancelIcon />
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
              <KakaoMapClick pos={position} />
            </div>
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
