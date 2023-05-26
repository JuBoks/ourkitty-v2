import React, { useState } from "react";
import Modal from "../common/Modal2";
import addUserLight from "../../assets/add_user_light.svg";
import addUserDark from "../../assets/add_user_dark.svg";
import { useRecoilState } from "recoil";
import { darkState } from "../../recoil/page";
import { useQuery } from "react-query";
import { getDishList } from "../../apis/api/dish";
import ActivateUserItem from "./ActivateUserItem";
import RegistForm from "./RegistForm";

interface detailData {
  createdData: string;
  dishAddress: string;
  dishCatCount: number;
  dishId: number;
  dishLat: number;
  dishLong: number;
  dishName: string;
  dishProfileImagePath: string;
  dishSerialNum: string;
  dishTnrCount: number;
  dishWeight: number;
  isDeleted: boolean;
  locationCode: string;
  updatedDate: string;
}

export default function ActivateUser() {
  const isDark = useRecoilState(darkState)[0];
  const [dishId, setDishId] = useState(0);
  const [searchKey, setSearchKey] = useState("0090001");
  const [searchWord, setSearchWord] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleSelectDish = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDishId(Number(e.target.value));
  };

  const handleSelectSearchKey = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchKey(e.target.value);
  };

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: "getDishList",
    queryFn: () => getDishList(),
  });

  if (isLoading || data === undefined) return null;

  return (
    <div className="w-full h-full flex flex-col gap-2 relative">
      <div title="추가">
        <img
          src={`${isDark ? addUserDark : addUserLight}`}
          alt=""
          className="w-10 h-10 absolute right-3 cursor-pointer hover:top-[-2px]"
          onClick={openModal}
        />
      </div>
      <div className="flex flex-row gap-5 pt-1 pl-3">
        <h1 className="text-[1.4rem] font-bold">관할 회원</h1>
        <select
          name="selectDish"
          id="selectDish"
          className="w-[5rem] outline-none dark:bg-DarkBackground2"
          onChange={handleSelectDish}
        >
          <option value="0">전체</option>
          {data.data.map((item: detailData) => (
            <option key={item.dishId} value={item.dishId}>
              {item.dishName}
            </option>
          ))}
        </select>
        <div className="flex flex-row border-[2px] rounded-lg p-1 dark:border-DarkBackground">
          <select
            name="selectSearchKey"
            id="selectSearchKey"
            className="outline-none dark:bg-DarkBackground2"
            onChange={handleSelectSearchKey}
          >
            <option value="0090001">이름</option>
            <option value="0090002">닉네임</option>
            <option value="0090003">이메일</option>
            <option value="0090004">연락처</option>
            <option value="0090005">주소</option>
          </select>
          <input
            type="text"
            className="w-[10rem] outline-none pl-2 dark:bg-DarkBackground2"
            value={searchWord}
            onChange={handleSearchWord}
          />
        </div>
      </div>
      <ActivateUserItem
        dishId={dishId}
        searchKey={searchKey}
        searchWord={searchWord}
      />
      <Modal open={modalOpen} close={closeModal} header="회원 등록1">
        <RegistForm setModalOpen={setModalOpen} />
      </Modal>
    </div>
  );
}
