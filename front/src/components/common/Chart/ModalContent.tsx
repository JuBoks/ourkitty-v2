import React from "react";

export default function ModalContent({ day, time }: any) {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <div className="flex flex-col">
        <h1 className="text-[1.5rem] font-bold">고양이 ID</h1>
        <div className="flex flex-row gap-3 m-auto w-[970px] h-[300px] overflow-x-auto">
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 12:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 13:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 14:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 15:13</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-[1.5rem] font-bold">고양이 ID</h1>
        <div className="flex flex-row gap-3 m-auto w-[970px] h-[300px] overflow-x-auto">
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 12:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 13:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 14:13</div>
          </div>
          <div className="flex flex-col min-w-[280px] h-[280px] rounded-xl">
            <div className="w-[90%] h-[90%] bg-black rounded-xl mx-auto"></div>
            <div className="text-center text-[1.2rem]">2023.04.19 15:13</div>
          </div>
        </div>
      </div>
    </div>
  );
}
