import React, { useState } from "react";
import DefaultDiv from "../common/DefaultDiv";
import { Pagination } from "@mui/material";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../recoil/states/page";
import Modal from "../common/Modal";
import ModalContent from "./ModalContent";

export default function AdminLog() {
  const isDark = useRecoilState(darkModeState)[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [logId, setLogId] = useState(0);

  const data = [
    {
      id: 1,
      author: "작성자1",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 2,
      author: "작성자2",
      state: "양호",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 3,
      author: "작성자3",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 4,
      author: "작성자4",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 5,
      author: "작성자5",
      state: "좋음",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 6,
      author: "작성자6",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 7,
      author: "작성자7",
      state: "양호",
      content: "내용",
      date: "2023.04.18",
    },
    {
      id: 8,
      author: "작성자8",
      state: "나쁨",
      content: "내용",
      date: "2023.04.18",
    },
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return (
    <>
      <DefaultDiv>
        <div className="relative flex flex-col h-full w-[950px] rounded-xl dark:bg-WebDarkBackground2">
          <h1 className="m-3 text-[2rem] font-bold dark:text-white">
            관리 로그
          </h1>
          <select
            className="absolute top-8 right-5 w-40 h-[40px] outline-none rounded-xl bg-WebMain text-white font-bold opacity-80 dark:bg-WebDarkMain"
            name="selectCatbowl"
            id="selectCatbowl"
          >
            <option value="">냥그릇1</option>
            <option value="">냥그릇2</option>
            <option value="">냥그릇3</option>
          </select>
          <div className="m-3 w-full">
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row justify-center">
                  <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    작성자
                  </th>
                  <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    상태
                  </th>
                  <th className="w-[400px] py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    내용
                  </th>
                  <th className="w-40 py-2 border-x-2 border-white bg-WebMain text-white dark:border-black dark:bg-WebDarkMain">
                    작성일자
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <tr
                        className="w-[880px] hover:bg-[#9FA9D8] m-auto flex flex-row justify-center"
                        key={item.id}
                        onClick={() => {
                          setLogId(item.id);
                          openModal();
                        }}
                      >
                        <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black dark:text-white">
                          {item.author}
                        </td>
                        <td className="w-40 py-2 border-x-2  border-white text-center dark:border-black dark:text-white">
                          {item.state === "좋음" ? (
                            <div className="w-5 h-5 bg-[green] m-auto rounded-[50%]"></div>
                          ) : item.state === "양호" ? (
                            <div className="w-5 h-5 bg-[yellow] m-auto rounded-[50%]"></div>
                          ) : (
                            <div className="w-5 h-5 bg-[red] m-auto rounded-[50%]"></div>
                          )}
                        </td>
                        <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate dark:border-black dark:text-white">
                          {item.content}
                        </td>
                        <td className="w-40 py-2 border-x-2 border-white text-center dark:border-black dark:text-white">
                          {item.date}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        className="w-[880px] hover:bg-[#9FA9D8] flex flex-row m-auto justify-center"
                        key={item.id}
                        onClick={() => {
                          setLogId(item.id);
                          openModal();
                        }}
                      >
                        <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                          {item.author}
                        </td>
                        <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                          {item.state === "좋음" ? (
                            <div className="w-5 h-5 bg-[green] m-auto rounded-[50%]"></div>
                          ) : item.state === "양호" ? (
                            <div className="w-5 h-5 bg-[yellow] m-auto rounded-[50%]"></div>
                          ) : (
                            <div className="w-5 h-5 bg-[red] m-auto rounded-[50%]"></div>
                          )}
                        </td>
                        <td className="w-[400px] py-2 px-2 border-x-2 border-white truncate bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                          {item.content}
                        </td>
                        <td className="w-40 py-2 border-x-2 border-white text-center bg-[#9FA9D555] dark:bg-[#29325B55] dark:text-white dark:border-black">
                          {item.date}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-5">
              {isDark ? (
                <Pagination count={10} color="secondary" />
              ) : (
                <Pagination count={10} color="primary" />
              )}
            </div>
          </div>
        </div>
      </DefaultDiv>
      <Modal open={modalOpen} close={closeModal} header="관리 일지 상세">
        <ModalContent logId={logId} />
      </Modal>
    </>
  );
}
