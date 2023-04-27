import React from "react";
import DefaultDiv from "../common/DefaultDiv";

export default function DisabledUser() {
  return (
    <>
      <DefaultDiv>
        <div className="relative flex flex-col gap-2 my-2 h-[98%] w-[962px] rounded-xl dark:bg-WebDarkBackground2 p-2">
          <h1 className="mx-5 my-2 text-[2rem] font-bold dark:text-white">
            비활성 사용자
          </h1>
        </div>
      </DefaultDiv>
    </>
  );
}
