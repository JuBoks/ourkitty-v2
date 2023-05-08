import React, { useState } from "react";
import Swal from "sweetalert2";
import MyDishButtons from "../common/MyDishButtons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { isUserStateChange } from "../../recoil/user";
import { useMutation } from "react-query";
import { registClient, checkPhone, checkEmail } from "../../apis/api/user";

interface buttonState {
  dishId: number;
  state: boolean;
}

export default function RegistForm({ setModalOpen }: any) {
  const isDark = useRecoilState(darkState)[0];
  const [isChange, setIsChange] = useRecoilState(isUserStateChange);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [buttons, setButtons] = useState([] as buttonState[]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone1(e.target.value);
  };
  const handlePhone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone2(e.target.value);
  };
  const handlePhone3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone3(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setNickname(e.target.value.split("@")[0]);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  // 연락처 중복 확인 요청
  const phoneCheck = useMutation(
    ["checkPhone"],
    (formData: FormData) => checkPhone(formData),
    {
      onSuccess: () => {
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "success",
          title: "사용가능한 연락처입니다.",
        });
      },
      onError: () => {
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "warning",
          title: "이미 등록된 연락처입니다.",
        });
      },
    }
  );

  // 연락처 중복 확인
  const handleCheckPhone = () => {
    const formData = new FormData();
    formData.append("clientPhone", phone1 + "-" + phone2 + "-" + phone3);
    phoneCheck.mutate(formData);
  };

  // 이메일 중복 확인 요청
  const emailCheck = useMutation(
    ["checkEmail"],
    (formData: FormData) => checkEmail(formData),
    {
      onSuccess: () => {
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "success",
          title: "사용가능한 이메일입니다.",
        });
      },
      onError: () => {
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "warning",
          title: "이미 등록된 이메일입니다.",
        });
      },
    }
  );

  // 이메일 중복 확인
  const handleCheckEmail = () => {
    const formData = new FormData();
    formData.append("clientEmail", email);
    emailCheck.mutate(formData);
  };

  // 등록 요청
  const regist = useMutation(
    ["registDish"],
    (formData: FormData) => registClient(formData),
    {
      onSuccess: () => {
        setModalOpen(false);
        const Toast = Swal.mixin({
          toast: true, // 토스트 형식
          position: "bottom-end", // 알림 위치
          showConfirmButton: false, // 확인버튼 생성 유무
          timer: 1500, // 지속 시간
          timerProgressBar: true, // 지속시간바 생성 여부
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
        });
        Toast.fire({
          icon: "success",
          title: "등록되었습니다.",
        });
        setIsChange((cur: boolean) => !cur);
      },
    }
  );

  // 사용자 등록
  const handleRegistClient = () => {
    const Toast = Swal.mixin({
      toast: true, // 토스트 형식
      position: "bottom-end", // 알림 위치
      showConfirmButton: false, // 확인버튼 생성 유무
      timer: 1500, // 지속 시간
      timerProgressBar: true, // 지속시간바 생성 여부
      background: isDark ? "#262D33" : "white",
      color: isDark ? "white" : "black",
    });

    name === ""
      ? Toast.fire({
          icon: "warning",
          title: "이름을 입력해주세요.",
        })
      : nickname === ""
      ? Toast.fire({
          icon: "warning",
          title: "닉네임을 입력해주세요.",
        })
      : phone1 === "" || phone2 === "" || phone3 === ""
      ? Toast.fire({
          icon: "warning",
          title: "연략처를 입력해주세요.",
        })
      : email === ""
      ? Toast.fire({
          icon: "warning",
          title: "이메일을 입력해주세요.",
        })
      : password === ""
      ? Toast.fire({
          icon: "warning",
          title: "초기 비밀번호를 입력해주세요.",
        })
      : address === ""
      ? Toast.fire({
          icon: "warning",
          title: "주소를 입력해주세요.",
        })
      : Swal.fire({
          title: "현재 정보로 등록하시겠습니까?",
          icon: "info",
          background: isDark ? "#262D33" : "white",
          color: isDark ? "white" : "black",
          showCancelButton: true,
          confirmButtonColor: isDark ? "#29325B" : "#9FA9D8",
          cancelButtonColor: "#B0B0B0",
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            const dishes = [];
            for (let i = 0; i < buttons.length; i++) {
              if (buttons[i].state === true) {
                dishes.push(buttons[i].dishId);
              }
            }

            const formData = new FormData();
            formData.append("clientName", name);
            formData.append("clientNickname", nickname);
            formData.append(
              "clientPhone",
              phone1 + "-" + phone2 + "-" + phone3
            );
            formData.append("clientEmail", email);
            formData.append("clientPassword", password);
            formData.append("clientAddress", address);
            formData.append("dishList", String(dishes));

            regist.mutate(formData);
          }
        });
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      <button
        className="absolute right-10 px-4 py-2 rounded-lg text-[1.5rem] text-white bg-LightMainHover hover:bg-LightMain dark:bg-DarkMainHover dark:hover:bg-DarkMain"
        onClick={handleRegistClient}
      >
        등록
      </button>
      <div className="flex justify-center">
        <AccountCircleIcon
          sx={{ fontSize: "250px", color: isDark ? "#29325B" : "#9FA9D8" }}
        />
      </div>
      <div className="flex flex-row justify-center gap-28">
        <div className="flex flex-col gap-7 text-[1.3rem] mt-2">
          <div>이름</div>
          <div>연락처</div>
          <div>이메일</div>
          <div>비밀번호</div>
          <div>주소</div>
          <div>담당 냥그릇</div>
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            className="w-[300px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
            onChange={handleName}
            value={name}
          />
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-1">
              <input
                type="text"
                className="w-[70px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
                onChange={handlePhone1}
                value={phone1}
              />
              <span className="leading-[40px]">-</span>
              <input
                type="text"
                className="w-[100px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
                onChange={handlePhone2}
                value={phone2}
              />
              <span className="leading-[40px]">-</span>
              <input
                type="text"
                className="w-[100px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
                onChange={handlePhone3}
                value={phone3}
              />
            </div>
            <button
              className="w-[100px] h-[40px] bg-LightMainHover text-white hover:bg-LightMain rounded-lg dark:bg-DarkMainHover dark:hover:bg-DarkMain"
              onClick={handleCheckPhone}
            >
              중복확인
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <input
              type="text"
              className="w-[300px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
              onChange={handleEmail}
              value={email}
            />
            <button
              className="w-[100px] h-[40px] bg-LightMainHover text-white hover:bg-LightMain rounded-lg dark:bg-DarkMainHover dark:hover:bg-DarkMain"
              onClick={handleCheckEmail}
            >
              중복확인
            </button>
          </div>

          <input
            type="text"
            className="w-[300px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
            onChange={handlePassword}
            value={password}
          />
          <input
            type="text"
            className="w-[300px] h-[40px] pl-2 bg-LightInput rounded-lg outline-none dark:bg-DarkInput"
            onChange={handleAddress}
            value={address}
          />
          <div className="w-[300px] h-[35px]">
            <MyDishButtons buttons={buttons} setButtons={setButtons} />
          </div>
        </div>
      </div>
    </div>
  );
}
