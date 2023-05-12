import React, { useState } from "react";
import UserCard from "../common/UserCard";
import ModifyForm from "./ModifyForm";
import Modal from "../common/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { selectedUserState } from "../../recoil/user";
import { isUserStateChange } from "../../recoil/user";
import { useQuery } from "react-query";
import { getClientIdList } from "../../apis/api/user";

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

export default function DeactivateUserItem({
  dishId,
  searchKey,
  searchWord,
}: any) {
  const isDark = useRecoilState(darkState)[0];
  const [userId, setUserId] = useRecoilState(selectedUserState);
  const isChange = useRecoilState(isUserStateChange)[0];

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getClientIdList", dishId, searchKey, searchWord, isChange],
    queryFn: () => getClientIdList(dishId, searchKey, searchWord),
  });

  if (isLoading || data === undefined) return null;

  return (
    <div className="w-full h-full px-4 flex flex-row gap-8 overflow-x-scroll">
      {data.data.inactiveList.map((item: UserInfo) => (
        <div
          className="bg-BlockUser w-[350px] h-[350px] rounded-[0.4rem]"
          key={item.clientId}
        >
          <UserCard>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-center">
                {item.clientProfileImagePath === "" ? (
                  <AccountCircleIcon
                    sx={{
                      fontSize: "150px",
                      color: `${isDark ? "#29325B" : "#9FA9D8"}`,
                    }}
                  />
                ) : (
                  <img
                    src={item.clientProfileImagePath}
                    alt=""
                    className="w-[150px] h-[150px] rounded-[50%]"
                  />
                )}
              </div>
              <div className="flex flex-row justify-center gap-2 mb-5">
                <div className="text-[1.2rem] font-bold text-gray-500 dark:text-white">
                  {item.clientName}
                </div>
                <div className="text-[1.2rem] text-gray-300">
                  ({item.clientNickname})
                </div>
              </div>
              <div className="flex flex-row gap-8 justify-center">
                <div className="flex flex-col gap-2">
                  <div>이메일</div>
                  <div>연락처</div>
                  <div>주소</div>
                  <div>최근 활동</div>
                </div>
                <div className="flex flex-col gap-2 font-bold text-CancelBtn w-[170px]">
                  <div className="truncate">: {item.clientNickname}</div>
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
