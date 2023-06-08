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
    <div className="w-full h-full px-4 flex flex-row gap-8 overflow-auto">
      {data.data.inactiveList.map((item: UserInfo) => (
        <div
          className="bg-BlockUser w-[17rem] h-[17rem] rounded-[0.4rem]"
          key={item.clientId}
          onClick={() => {
            setUserId(item.clientId);
            openModal();
          }}
        >
          <UserCard>
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
              <div className="flex flex-row justify-center gap-2 mt-3 mb-2">
                <div className="text-[0.8rem] font-bold text-gray-500 dark:text-white">
                  {item.clientName}
                </div>
                <div className="text-[0.8rem] text-gray-300">
                  ({item.clientNickname})
                </div>
              </div>
              <div className="flex flex-col justify-end self-center text-[0.8rem] ml-2">
                <div className="flex flex-row justify-between mb-2">
                  <div className="font-semibold">이메일:</div>
                  <div className="truncate">{item.clientEmail}</div>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <div className="font-semibold">연락처:</div>
                  <div className="truncate">{item.clientPhone}</div>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <div className="font-semibold">주소:</div>
                  <div className="truncate">{item.clientAddress}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="font-semibold">최근 활동:</div>
                  <div className="truncate">
                    {item.lastPostingDate.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
            <Modal open={modalOpen} close={closeModal} header="회원 정보 수정">
              <ModifyForm setModalOpen={setModalOpen} />
            </Modal>
          </UserCard>
        </div>
      ))}
    </div>
  );
}
