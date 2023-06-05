import React, { useState } from "react";
import Swal from "sweetalert2";
import UserCard from "../common/UserCard";
import ModifyForm from "./ModifyForm";
import Modal from "../common/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { selectedUserState } from "../../recoil/user";
import { isUserStateChange } from "../../recoil/user";
import { useQuery, useMutation } from "react-query";
import { getClientIdList, modifyClientState } from "../../apis/api/user";

interface UserInfo {
  clientAddress: string;
  clientDescription: string;
  clientEmail: string;
  clientId: number;
  clientName: string;
  clientNickname: string;
  clientPhone: string;
  clientProfileImagePath: string;
  createdDate: string;
  dishList: [
    {
      dishId: number;
      dishName: string;
    }
  ];
  isDeleted: boolean;
  lastPostingDate: string;
  locationCode: string;
  updatedDate: string;
  userCode: string;
  userState: string;
}

export default function ActivateUserItem({
  dishId,
  searchKey,
  searchWord,
}: any) {
  const isDark = useRecoilState(darkState)[0];
  const [userId, setUserId] = useRecoilState(selectedUserState);
  const [isChange, setIsChange] = useRecoilState(isUserStateChange);
  const [clientId, setClientId] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "#2ECA45"
              : isDark
              ? "#29325B"
              : "#9FA9D8",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  // 비활성화 요청
  const inactivate = useMutation(
    ["modifyClientState"],
    (formData: FormData) => modifyClientState(clientId, formData),
    {
      onSuccess: () => {
        setIsChange((cur: boolean) => !cur);
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
          title: "임시차단되었습니다.",
        });
      },
    }
  );
  // 사용자 활성화 & 비활성화
  const handleUserActivate = (name: string) => {
    Swal.fire({
      title: `'${name}'을 임시차단하시겠습니까?`,
      text: "차단 일수를 입력해주세요",
      input: "number",
      inputPlaceholder: "차단 일수",
      width: "550px",
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
        const duration = Number(result.value);

        let startDate = new Date();
        const endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + duration,
          startDate.getHours(),
          startDate.getMinutes(),
          startDate.getSeconds()
        );

        const year = endDate.getFullYear();
        const month = endDate.getMonth() + 1;
        const day = endDate.getDate();
        const hour = endDate.getHours();
        const minute = endDate.getMinutes();
        const second = endDate.getSeconds();

        const releaseDate = `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }T${hour < 10 ? "0" + hour : hour}:${
          minute < 10 ? "0" + minute : minute
        }:${second < 10 ? "0" + second : second}`;

        Swal.fire({
          title: `차단 사유를 입력해주세요`,
          input: "text",
          inputPlaceholder: "차단 사유",
          width: "550px",
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
            const reason = result.value;
            const formData = new FormData();
            formData.append("unBlockDate", releaseDate);
            formData.append("clientDescription", reason);

            inactivate.mutate(formData);
          }
        });
      }
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getClientIdList", dishId, searchKey, searchWord, isChange],
    queryFn: () => getClientIdList(dishId, searchKey, searchWord),
  });

  if (isLoading || data === undefined) return null;

  return (
    <div className="w-[74rem] h-full px-4 flex flex-row gap-8 overflow-x-scroll">
      {data.data.activeList.map((item: UserInfo) => (
        <div key={item.clientId}>
          <UserCard>
            <button
              className="absolute top-2 right-[-12px]"
              onClick={() => {
                setClientId(item.clientId);
                handleUserActivate(item.clientName);
              }}
            >
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label=""
              />
            </button>

            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-center">
                {item.clientProfileImagePath === "" ? (
                  <AccountCircleIcon
                    sx={{
                      fontSize: "5rem",
                      color: `${isDark ? "#29325B" : "#9FA9D8"}`,
                    }}
                  />
                ) : (
                  <img
                    src={item.clientProfileImagePath}
                    alt=""
                    className="w-[5rem] h-[5rem] rounded-[50%]"
                  />
                )}
              </div>
              <div className="flex flex-row justify-center gap-2 mt-3 mb-5">
                <div className="text-[1rem] font-bold">{item.clientName}</div>
                <div className="text-[1rem] text-gray-400">
                  ({item.clientNickname})
                </div>
              </div>
              <div className="flex flex-row gap-6 justify-center ml-2">
                <div className="flex text-[0.8rem] flex-col gap-1">
                  <div>이메일</div>
                  <div>연락처</div>
                  <div>주소</div>
                  <div>최근 활동</div>
                </div>
                <div className="flex flex-col text-[0.8rem]  gap-1 font-bold w-[170px]">
                  <div className="truncate">: {item.clientEmail}</div>
                  <div className="truncate">: {item.clientPhone}</div>
                  <div className="truncate">: {item.clientAddress}</div>
                  <div className="truncate">
                    : {item.lastPostingDate.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="flex flex-row gap-3 absolute bottom-2 right-2"
              title="설정"
              onClick={() => {
                setUserId(item.clientId);
                openModal();
              }}
            >
              <ManageAccountsIcon
                className="text-LightMain hover:text-[45px] dark:text-DarkMain"
                sx={{ fontSize: "40px" }}
              />
            </button>
            <Modal open={modalOpen} close={closeModal} header="회원 정보 수정">
              <ModifyForm setModalOpen={setModalOpen} />
            </Modal>
          </UserCard>
        </div>
      ))}
    </div>
  );
}
