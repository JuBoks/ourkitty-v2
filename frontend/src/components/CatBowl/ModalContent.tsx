import React from "react";

export default function ModalContent({ logId }: any) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row gap-5 mb-5">
        <div className="text-[1.5rem] font-bold">냥그릇 이름</div>
        <div className="w-8 h-8 bg-[yellow] rounded-[50%] mt-[3px]"></div>
      </div>
      <div className="flex flex-row m-auto gap-5">
        <div className="w-[400px] h-[410px] rounded-xl bg-black">이미지1</div>
        <div className="flex flex-col gap-[10px]">
          <div className="w-[300px] h-[200px] rounded-xl bg-black">이미지2</div>
          <div className="w-[300px] h-[200px] rounded-xl bg-black">이미지3</div>
        </div>
      </div>
      <div
        className="w-[720px] h-[150px] m-auto bg-LightGray mt-5 rounded-xl p-2 text-[1.2rem] overflow-y-auto dark:bg-WebDarkBackground2"
        dangerouslySetInnerHTML={{
          __html:
            "<div>제목</div><div>내용</div><div>제목</div><div>내용</div><div>제목</div><div>내용</div>",
        }}
      ></div>
    </div>
  );
}
