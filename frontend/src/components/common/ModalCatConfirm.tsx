import React, { useState, useEffect } from "react";
import tnrImage from "../../assets/TNR_IMAGE.png";


export default function ModalCatConfirm(props: any) {
  const { open, close, header } = props;
  const [neutered, setNeutered] = useState(false);

  const handleNeuteredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeutered(event.target.value === "yes");
  };

  return (
    <div className={open ? "openModal modal relative" : "modal relative"}>
      {open ? (
        <section className="w-[60%] h-[80%] flex flex-col bg-white rounded-lg dark:bg-DarkBackground2">
          <header className="h-[50px] text-[1.5rem] bg-gray-100 dark:bg-DarkMain flex items-center justify-between px-4">
            <span>{header}</span>
            <button className="close" onClick={close}>
              x
            </button>
          </header>
          <main className="flex flex-row flex-grow dark:text-white">
            <div className="w-[60%] h-[90%]  p-4">
              {props.children}
            </div>
            <div className="flex flex-col justify-center px-4 gap-4 ml-8">
              <div className="text-[2rem] font-medium mb-2">중성화 됐나요?</div>
              <div className="flex flex-row gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={neutered === true}
                    onChange={handleNeuteredChange}
                  />
                  <span className="ml-2">예</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={neutered === false}
                    onChange={handleNeuteredChange}
                  />
                  <span className="ml-2">아니요</span>
                </label>
              </div>
              <div>
                <img src={tnrImage} />
              </div>
            </div>
          </main>
          <footer className="h-[70px] bg-gray-100 dark:bg-DarkBackground2 flex justify-end items-center px-4">
            <button
              className="w-[80px] h-[50px] close bg-LightMain opacity-70 hover:opacity-100 dark:bg-DarkMain mr-4"
              onClick={close}
            >
              삭제
            </button>
            <button
              className="w-[80px] h-[50px] close bg-LightMain opacity-70 hover:opacity-100 dark:bg-DarkMain"
              onClick={close}
            >
              완료
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
