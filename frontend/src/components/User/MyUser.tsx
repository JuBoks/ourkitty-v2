import React from "react";
import DefaultDiv from "../common/DefaultDiv";
import UserCard from "../common/UserCard";

export default function MyUser() {
  return (
    <>
      <DefaultDiv>
        <div className="relative flex flex-col gap-2 my-2 h-[98%] rounded-xl dark:bg-WebDarkBackground2 p-2">
          <h1 className="mx-5 my-2 text-[2rem] font-bold dark:text-white">
            관할 사용자
          </h1>
          <div className="mx-5 outline-none">
            <select name="" id="" className="w-36">
              <option value="">관할 냥그릇</option>
            </select>
          </div>
          <div className="grid-rows-4 mx-5 gap-20 justify-center">
            <UserCard isDisabled={false} />
            <UserCard isDisabled={false} />
            <UserCard isDisabled={false} />
            <UserCard isDisabled={false} />
          </div>
        </div>
      </DefaultDiv>
    </>
  );
}
